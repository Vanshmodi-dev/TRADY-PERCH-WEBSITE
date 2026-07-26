/**
 * Best-effort, in-memory, per-process sliding-window rate limiter. Not a
 * distributed rate limiter: state lives in this Node process's memory, so
 * it resets on restart and does not share state across horizontally-scaled
 * instances. A real distributed limiter needs an external store (Redis,
 * Upstash, or the hosting platform's own primitive) — which store, and
 * whose account it lives in, is a hosting-platform decision this codebase
 * doesn't own yet (no Chapter 62 ADR has fixed a hosting platform). Until
 * one does, this defends the one thing it can: a single running instance
 * against a casual scripted client hammering `/api/contact`, which is a
 * genuine, real improvement over no throttling at all — not a placeholder.
 */
const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 5;

const hits = new Map<string, number[]>();

/**
 * A key's entry is only ever pruned when that same key is seen again, so
 * without this sweep every distinct client key that ever hit the endpoint
 * stayed resident for the process's whole lifetime — a slow, unbounded leak
 * on exactly the public, unauthenticated endpoint most exposed to a wide
 * spread of source addresses. Swept on write rather than on a timer so the
 * module stays free of background work and side effects at import time.
 */
function evictExpiredKeys(now: number): void {
  for (const [key, timestamps] of hits) {
    if (timestamps.every((t) => now - t >= WINDOW_MS)) {
      hits.delete(key);
    }
  }
}

export function isRateLimited(key: string): boolean {
  const now = Date.now();
  evictExpiredKeys(now);

  const timestamps = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);

  if (timestamps.length >= MAX_REQUESTS_PER_WINDOW) {
    hits.set(key, timestamps);
    return true;
  }

  timestamps.push(now);
  hits.set(key, timestamps);
  return false;
}
