/**
 * Límite de longitud de las respuestas del asistente.
 *
 * El prompt pide respuestas breves, pero el backend no depende únicamente de
 * que el modelo obedezca. Si la respuesta supera el presupuesto de palabras,
 * se recorta en un límite de línea o de frase para no devolver un ensayo.
 */
export const DEFAULT_MAX_REPLY_WORDS = 100;
export const DETAIL_MAX_REPLY_WORDS = 160;

const DETAIL_REQUEST_PATTERN =
  /\b(?:detall\w*|explica(?:r|me|ci[oó]n(?:es)?)?|expl[ií]came|c[oó]mo funciona|caracter[ií]sticas?|funcionalidades?|qu[eé] incluye|pasos|proceso|gu[ií]a)\b/i;

export function countWords(value) {
  if (typeof value !== 'string') return 0;

  const text = value.trim();
  return text ? text.split(/\s+/).length : 0;
}

export function isDetailRequest(message) {
  return typeof message === 'string' && DETAIL_REQUEST_PATTERN.test(message);
}

export function getReplyWordLimit(message) {
  return isDetailRequest(message)
    ? DETAIL_MAX_REPLY_WORDS
    : DEFAULT_MAX_REPLY_WORDS;
}

function addEllipsis(text) {
  const trimmed = text.trimEnd();
  if (!trimmed || trimmed.endsWith('…')) return trimmed;
  return `${trimmed}…`;
}

function splitSentences(line) {
  return (
    line.match(/[^.!?]+[.!?]+(?:["'”’»)]*)?(?:\s+|$)|[^.!?]+$/g) ?? [line]
  );
}

export function limitReplyLength(reply, message) {
  const text = typeof reply === 'string' ? reply.trim() : '';
  if (!text) return '';

  const maxWords = getReplyWordLimit(message);
  if (countWords(text) <= maxWords) return text;

  const lines = text.split('\n');
  const keptLines = [];
  let keptWords = 0;

  for (const line of lines) {
    const lineWords = countWords(line);
    if (keptWords + lineWords > maxWords) break;

    keptLines.push(line);
    keptWords += lineWords;
  }

  let limited = keptLines.join('\n').trim();

  // Si la primera línea ya supera el límite, se recorta por frases completas.
  if (!limited) {
    let keptSentences = '';

    for (const sentence of splitSentences(lines[0])) {
      const sentenceWords = countWords(sentence);
      if (countWords(keptSentences) + sentenceWords > maxWords) break;
      keptSentences += sentence;
    }

    limited = keptSentences.trim();
  }

  // Último recurso: texto sin puntuación clara. Se corta por palabras.
  if (!limited) {
    limited = text.split(/\s+/).slice(0, maxWords).join(' ');
  }

  if (limited.replace(/\s+/g, ' ').trim() === text.replace(/\s+/g, ' ').trim()) {
    return text;
  }

  return addEllipsis(limited);
}

/**
 * Cierra una respuesta que el proveedor cortó por límite de tokens. Si hay una
 * frase completa antes del corte, conserva hasta ahí; si no, deja el texto y
 * añade puntos suspensivos para no aparentar que la respuesta terminó.
 */
export function finishTokenTruncatedReply(reply) {
  const text = typeof reply === 'string' ? reply.trim() : '';
  if (!text || text.endsWith('…')) return text;

  if (/[.!?]$/.test(text)) return text;

  const lastSentenceEnd = Math.max(
    text.lastIndexOf('.'),
    text.lastIndexOf('!'),
    text.lastIndexOf('?'),
  );

  if (lastSentenceEnd > 0) {
    return `${text.slice(0, lastSentenceEnd + 1).trimEnd()}…`;
  }

  return `${text}…`;
}
