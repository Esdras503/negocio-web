/**
 * Límite de solicitudes en memoria.
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
