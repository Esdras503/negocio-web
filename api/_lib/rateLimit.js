/**
 * Límite compartido opcional (Upstash Redis REST) con respaldo local en memoria.
 *
 * En Vercel cada instancia de la función mantiene su propio contador, por lo
 * que esta protección es básica y no sustituye un rate limit distribuido. Aun
 * así, evita ráfagas simples y mantiene acotado el consumo desde una misma IP.
 */
const WINDOW_MS = 60_000;
const MINUTE_LIMIT = 15;
const DAY_MS = 86_400_000;
const DAY_LIMIT = 100;
const MAX_BUCKETS = 5_000;
const REDIS_TIMEOUT_MS = 1_500;

const buckets = new Map();

function cleanup(now) {
  if (buckets.size <= MAX_BUCKETS) return;

  for (const [key, entry] of buckets) {
    if (now - entry.dayStart >= DAY_MS) buckets.delete(key);
  }

  while (buckets.size > MAX_BUCKETS) {
    const oldestKey = buckets.keys().next().value;
    if (!oldestKey) break;
    buckets.delete(oldestKey);
  }
}

export function checkRateLimit(key, now = Date.now()) {
  let entry = buckets.get(key);

  if (!entry || now - entry.dayStart >= DAY_MS) {
    entry = {
      windowStart: now,
      windowCount: 0,
      dayStart: now,
      dayCount: 0,
    };
    buckets.set(key, entry);
  }

  if (now - entry.windowStart >= WINDOW_MS) {
    entry.windowStart = now;
    entry.windowCount = 0;
  }

  entry.windowCount += 1;
  entry.dayCount += 1;

  const minuteBlocked = entry.windowCount > MINUTE_LIMIT;
  const dayBlocked = entry.dayCount > DAY_LIMIT;
  const resetAt = dayBlocked
    ? entry.dayStart + DAY_MS
    : entry.windowStart + WINDOW_MS;

  cleanup(now);

  return {
    allowed: !minuteBlocked && !dayBlocked,
    limit: MINUTE_LIMIT,
    remaining: minuteBlocked
      ? 0
      : Math.max(0, MINUTE_LIMIT - entry.windowCount),
    resetAt,
    retryAfter: Math.max(1, Math.ceil((resetAt - now) / 1000)),
  };
}

const REDIS_SCRIPT = `
local minute = redis.call('INCR', KEYS[1])
if minute == 1 then redis.call('EXPIRE', KEYS[1], tonumber(ARGV[1])) end
local day = redis.call('INCR', KEYS[2])
if day == 1 then redis.call('EXPIRE', KEYS[2], tonumber(ARGV[2])) end
return { minute, day, redis.call('TTL', KEYS[1]), redis.call('TTL', KEYS[2]) }
`;

/**
 * Usa contadores atómicos compartidos cuando se configuran las credenciales
 * de Upstash. Si Redis está configurado pero no disponible, falla en cerrado
 * para no volver a permitir tráfico ilimitado silenciosamente.
 */
export async function checkRateLimitAsync(key, now = Date.now()) {
  const url = process.env.UPSTASH_REDIS_REST_URL?.replace(/\/+$/, '');
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!url && !token) return checkRateLimit(key, now);
  if (!url || !token) {
    throw new Error('Both Upstash REST URL and token are required');
  }

  const minuteWindow = Math.floor(now / WINDOW_MS);
  const dayWindow = Math.floor(now / DAY_MS);
  const minuteTtl = Math.ceil((minuteWindow + 1) * WINDOW_MS / 1000 - now / 1000);
  const dayTtl = Math.ceil((dayWindow + 1) * DAY_MS / 1000 - now / 1000);
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REDIS_TIMEOUT_MS);

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify([
        'EVAL',
        REDIS_SCRIPT,
        '2',
        `nexobyte:chat:minute:${minuteWindow}:${key}`,
        `nexobyte:chat:day:${dayWindow}:${key}`,
        String(Math.max(1, minuteTtl)),
        String(Math.max(1, dayTtl)),
      ]),
      signal: controller.signal,
    });

    if (!response.ok) throw new Error(`Upstash rate limit returned ${response.status}`);
    const payload = await response.json();
    const [minuteCount, dayCount] = payload?.result ?? [];
    if (!Number.isFinite(minuteCount) || !Number.isFinite(dayCount)) {
      throw new Error('Upstash rate limit returned an invalid result');
    }

    const minuteBlocked = minuteCount > MINUTE_LIMIT;
    const dayBlocked = dayCount > DAY_LIMIT;
    const resetAt = dayBlocked
      ? (dayWindow + 1) * DAY_MS
      : (minuteWindow + 1) * WINDOW_MS;

    return {
      allowed: !minuteBlocked && !dayBlocked,
      limit: MINUTE_LIMIT,
      remaining: minuteBlocked
        ? 0
        : Math.max(0, MINUTE_LIMIT - minuteCount),
      resetAt,
      retryAfter: Math.max(1, Math.ceil((resetAt - now) / 1000)),
    };
  } finally {
    clearTimeout(timeout);
  }
}
