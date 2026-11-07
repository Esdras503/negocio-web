import { createHash, randomUUID } from 'node:crypto';
import { GoogleGenAI } from '@google/genai';
import { SYSTEM_PROMPT } from './_lib/nexobyteKnowledge.js';
import { checkRateLimit } from './_lib/rateLimit.js';
import {
  countWords,
  finishTokenTruncatedReply,
  getReplyWordLimit,
  limitReplyLength,
} from './_lib/responseLimit.js';
import { getTopicGuardReply } from './_lib/topicGuard.js';

const DEFAULT_MODEL = 'gemini-3.5-flash';
const MODEL_PATTERN = /^[a-z0-9][a-z0-9._-]*$/i;
const MAX_MESSAGE_LENGTH = 1_000;
const MAX_HISTORY_MESSAGES = 8;
const MAX_HISTORY_ITEM_LENGTH = 1_000;
const MAX_HISTORY_CHARS = 3_200;
const MAX_BODY_BYTES = 16 * 1024;
const MAX_OUTPUT_TOKENS = 180;
const REQUEST_TIMEOUT_MS = 22_000;

let cachedClient = null;
let cachedClientKey = '';

class HttpError extends Error {
  constructor(status, code, message) {
    super(message);
    this.name = 'HttpError';
    this.status = status;
    this.code = code;
  }
}

function getApiKey() {
  return process.env.GEMINI_API_KEY?.trim() ?? '';
}

function getModel() {
  const configured = process.env.GEMINI_MODEL?.trim();
  return configured && MODEL_PATTERN.test(configured)
    ? configured
    : DEFAULT_MODEL;
}

function getClient(apiKey) {
  if (!cachedClient || cachedClientKey !== apiKey) {
    cachedClient = new GoogleGenAI({ apiKey });
    cachedClientKey = apiKey;
  }
  return cachedClient;
}

function sendJson(res, status, payload, extraHeaders = {}) {
  if (res.writableEnded) return;

  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store, max-age=0');
  res.setHeader('X-Content-Type-Options', 'nosniff');

  for (const [name, value] of Object.entries(extraHeaders)) {
    res.setHeader(name, value);
  }

  res.end(JSON.stringify(payload));
}

function sendError(res, status, code, message, extraHeaders = {}) {
  sendJson(res, status, { error: { code, message } }, extraHeaders);
}

function normalizeText(value, maxLength) {
  const text = value
    .replaceAll('\u0000', '')
    .replaceAll('\r\n', '\n')
    .replaceAll('\r', '\n')
    .trim();

  return text.length > maxLength ? text.slice(0, maxLength) : text;
}

function parseBodyText(text) {
  if (!text.trim()) {
    throw new HttpError(
      400,
      'EMPTY_BODY',
      'Envía un mensaje para que el asistente pueda responder.',
    );
  }

  try {
    return JSON.parse(text);
  } catch {
    throw new HttpError(
      400,
      'INVALID_JSON',
      'La solicitud no tiene un formato válido.',
    );
  }
}

async function readJsonBody(req) {
  if (req.body !== undefined && req.body !== null) {
    if (typeof req.body === 'object' && !Buffer.isBuffer(req.body)) {
      let size;
      try {
        size = Buffer.byteLength(JSON.stringify(req.body), 'utf8');
      } catch {
        throw new HttpError(400, 'INVALID_BODY', 'La solicitud no es válida.');
      }

      if (size > MAX_BODY_BYTES) {
        throw new HttpError(
          413,
          'BODY_TOO_LARGE',
          'La solicitud es demasiado grande.',
        );
      }

      return req.body;
    }

    if (Buffer.isBuffer(req.body)) {
      if (req.body.length > MAX_BODY_BYTES) {
        throw new HttpError(
          413,
          'BODY_TOO_LARGE',
          'La solicitud es demasiado grande.',
        );
      }

      return parseBodyText(req.body.toString('utf8'));
    }

    if (typeof req.body === 'string') {
      if (Buffer.byteLength(req.body, 'utf8') > MAX_BODY_BYTES) {
        throw new HttpError(
          413,
          'BODY_TOO_LARGE',
          'La solicitud es demasiado grande.',
        );
      }

      return parseBodyText(req.body);
    }
  }

  const contentLength = Number(req.headers['content-length']);
  if (Number.isFinite(contentLength) && contentLength > MAX_BODY_BYTES) {
    throw new HttpError(
      413,
      'BODY_TOO_LARGE',
      'La solicitud es demasiado grande.',
    );
  }

  const chunks = [];
  let total = 0;

  try {
    for await (const chunk of req) {
      const buffer = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk);
      total += buffer.length;

      if (total > MAX_BODY_BYTES) {
        throw new HttpError(
          413,
          'BODY_TOO_LARGE',
          'La solicitud es demasiado grande.',
        );
      }

      chunks.push(buffer);
    }
  } catch (error) {
    if (error instanceof HttpError) throw error;
    throw new HttpError(
      400,
      'INVALID_BODY',
      'No se pudo leer la solicitud.',
    );
  }

  if (total === 0) {
    throw new HttpError(
      400,
      'EMPTY_BODY',
      'Envía un mensaje para que el asistente pueda responder.',
    );
  }

  return parseBodyText(Buffer.concat(chunks).toString('utf8'));
}

function normalizeHistory(rawHistory) {
  if (rawHistory === undefined || rawHistory === null) return [];

  if (!Array.isArray(rawHistory)) {
    throw new HttpError(
      400,
      'INVALID_HISTORY',
      'El historial de la conversación no es válido.',
    );
  }

  const items = [];

  for (const rawItem of rawHistory.slice(-MAX_HISTORY_MESSAGES)) {
    if (!rawItem || typeof rawItem !== 'object') continue;

    const role =
      rawItem.role === 'user'
        ? 'user'
        : rawItem.role === 'assistant' || rawItem.role === 'model'
          ? 'assistant'
          : null;

    if (!role || typeof rawItem.content !== 'string') continue;

    const content = normalizeText(rawItem.content, MAX_HISTORY_ITEM_LENGTH);
    if (!content) continue;

    items.push({ role, content });
  }

  let totalChars = items.reduce((sum, item) => sum + item.content.length, 0);
  while (items.length > 0 && totalChars > MAX_HISTORY_CHARS) {
    totalChars -= items[0].content.length;
    items.shift();
  }

  while (items.length > 0 && items[0].role !== 'user') {
    items.shift();
  }

  return items;
}

function validateRequest(payload) {
  if (!payload || typeof payload !== 'object' || Array.isArray(payload)) {
    throw new HttpError(
      400,
      'INVALID_BODY',
      'La solicitud debe incluir un mensaje.',
    );
  }

  if (typeof payload.message !== 'string') {
    throw new HttpError(
      400,
      'INVALID_MESSAGE',
      'Escribe un mensaje para que el asistente pueda responder.',
    );
  }

  const message = normalizeText(payload.message, MAX_MESSAGE_LENGTH + 1);

  if (!message) {
    throw new HttpError(
      400,
      'INVALID_MESSAGE',
      'Escribe un mensaje para que el asistente pueda responder.',
    );
  }

  if (message.length > MAX_MESSAGE_LENGTH) {
    throw new HttpError(
      400,
      'MESSAGE_TOO_LONG',
      `El mensaje no puede superar los ${MAX_MESSAGE_LENGTH} caracteres.`,
    );
  }

  return {
    message,
    history: normalizeHistory(payload.history),
  };
}

function buildContents(history, message) {
  const turns = [];

  for (const item of history) {
    const role = item.role === 'user' ? 'user' : 'model';
    const lastTurn = turns[turns.length - 1];

    if (lastTurn && lastTurn.role === role) {
      lastTurn.parts[0].text += `\n\n${item.content}`;
      continue;
    }

    turns.push({ role, parts: [{ text: item.content }] });
  }

  const lastTurn = turns[turns.length - 1];
  if (lastTurn?.role === 'user') {
    lastTurn.parts[0].text += `\n\n${message}`;
  } else {
    turns.push({ role: 'user', parts: [{ text: message }] });
  }

  return turns;
}

function getClientIp(req) {
  const forwarded = req.headers['x-forwarded-for'];
  const forwardedValue = Array.isArray(forwarded) ? forwarded[0] : forwarded;
  const realIp = req.headers['x-real-ip'];
  const realIpValue = Array.isArray(realIp) ? realIp[0] : realIp;

  const rawIp =
    forwardedValue?.split(',')[0]?.trim() ||
    realIpValue?.trim() ||
    req.socket?.remoteAddress ||
    'unknown';

  return createHash('sha256').update(rawIp).digest('hex').slice(0, 32);
}

function getProviderStatus(error) {
  const status = Number(error?.status ?? error?.code);
  return Number.isFinite(status) ? status : null;
}

function providerErrorResponse(error, wasAborted) {
  if (wasAborted) {
    return {
      status: 504,
      code: 'TIMEOUT',
      message:
        'La respuesta tardó demasiado. Intenta de nuevo o escríbenos por WhatsApp.',
    };
  }

  const providerStatus = getProviderStatus(error);

  if (providerStatus === 429) {
    return {
      status: 429,
      code: 'PROVIDER_RATE_LIMIT',
      message:
        'El asistente está recibiendo muchas consultas. Espera un momento e intenta de nuevo.',
    };
  }

  return {
    status: 503,
    code: 'PROVIDER_UNAVAILABLE',
    message:
      'No pude responder en este momento. Intenta de nuevo en unos segundos o escríbenos por WhatsApp.',
  };
}

export default async function handler(req, res) {
  const requestId = randomUUID();

  if (req.method !== 'POST') {
    sendError(
      res,
      405,
      'METHOD_NOT_ALLOWED',
      'Este recurso solo acepta solicitudes POST.',
      { Allow: 'POST' },
    );
    return;
  }

  const rateLimit = checkRateLimit(getClientIp(req));
  const rateHeaders = {
    'X-RateLimit-Limit': String(rateLimit.limit),
    'X-RateLimit-Remaining': String(rateLimit.remaining),
    'X-RateLimit-Reset': String(Math.ceil(rateLimit.resetAt / 1000)),
  };

  if (!rateLimit.allowed) {
    sendError(
      res,
      429,
      'RATE_LIMITED',
      'Has enviado varias consultas seguidas. Espera un momento e intenta de nuevo.',
      { ...rateHeaders, 'Retry-After': String(rateLimit.retryAfter) },
    );
    return;
  }

  const apiKey = getApiKey();
  if (!apiKey) {
    console.error('[api/chat] GEMINI_API_KEY is not configured', { requestId });
    sendError(
      res,
      503,
      'CHAT_NOT_CONFIGURED',
      'El asistente no está disponible en este momento. Puedes escribirnos por WhatsApp mientras lo habilitamos.',
      rateHeaders,
    );
    return;
  }

  let requestData;

  try {
    const body = await readJsonBody(req);
    requestData = validateRequest(body);
  } catch (error) {
    if (error instanceof HttpError) {
      sendError(res, error.status, error.code, error.message, rateHeaders);
      return;
    }

    console.error('[api/chat] could not parse request', {
      requestId,
      name: error?.name,
    });
    sendError(
      res,
      400,
      'INVALID_REQUEST',
      'No se pudo procesar la solicitud.',
      rateHeaders,
    );
    return;
  }

  const topicGuard = getTopicGuardReply(requestData.message);
  if (topicGuard) {
    console.info('[api/chat] topic guard applied', {
      requestId,
      kind: topicGuard.kind,
    });
    sendJson(res, 200, { reply: topicGuard.reply }, rateHeaders);
    return;
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const client = getClient(apiKey);
    const response = await client.models.generateContent({
      model: getModel(),
      contents: buildContents(requestData.history, requestData.message),
      config: {
        systemInstruction: SYSTEM_PROMPT,
        temperature: 0.3,
        topP: 0.8,
        maxOutputTokens: MAX_OUTPUT_TOKENS,
        thinkingConfig: { thinkingLevel: 'minimal' },
        abortSignal: controller.signal,
        httpOptions: { timeout: REQUEST_TIMEOUT_MS },
      },
    });

    const rawReply =
      typeof response.text === 'string' ? response.text.trim() : '';
    const candidate = response.candidates?.[0];
    const blockedFinish =
      candidate?.finishReason &&
      !['STOP', 'MAX_TOKENS', 'FINISH_REASON_UNSPECIFIED'].includes(
        candidate.finishReason,
      );

    if (!rawReply || blockedFinish) {
      console.warn('[api/chat] empty or blocked response', {
        requestId,
        finishReason: candidate?.finishReason ?? 'unavailable',
      });
      sendError(
        res,
        422,
        'EMPTY_RESPONSE',
        'No pude generar una respuesta para esa consulta. ¿Quieres preguntar algo sobre tu negocio o nuestras demos?',
        rateHeaders,
      );
      return;
    }

    const reply = limitReplyLength(rawReply, requestData.message);
    const finalReply =
      candidate?.finishReason === 'MAX_TOKENS'
        ? finishTokenTruncatedReply(reply)
        : reply;
    const replyLimit = getReplyWordLimit(requestData.message);

    if (!finalReply) {
      console.warn('[api/chat] empty response after length guard', {
        requestId,
      });
      sendError(
        res,
        422,
        'EMPTY_RESPONSE',
        'No pude generar una respuesta para esa consulta. ¿Quieres preguntar algo sobre tu negocio o nuestras demos?',
        rateHeaders,
      );
      return;
    }

    if (finalReply !== rawReply) {
      console.info('[api/chat] reply shortened to keep it concise', {
        requestId,
        originalWords: countWords(rawReply),
        limit: replyLimit,
        tokenLimited: candidate?.finishReason === 'MAX_TOKENS',
      });
    }

    sendJson(res, 200, { reply: finalReply }, rateHeaders);
  } catch (error) {
    const timedOut =
      controller.signal.aborted ||
      error?.name === 'AbortError' ||
      error?.name === 'TimeoutError' ||
      error?.code === 'ETIMEDOUT';
    const response = providerErrorResponse(error, timedOut);
    console.error('[api/chat] provider error', {
      requestId,
      name: error?.name,
      status: getProviderStatus(error),
    });
    sendError(
      res,
      response.status,
      response.code,
      response.message,
      rateHeaders,
    );
  } finally {
    clearTimeout(timeout);
  }
}
