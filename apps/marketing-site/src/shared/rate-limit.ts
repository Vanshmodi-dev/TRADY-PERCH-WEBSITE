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

export function isRateLimited(key: string): boolean {
  const now = Date.now();
  const timestamps = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);

  if (timestamps.length >= MAX_REQUESTS_PER_WINDOW) {
    hits.set(key, timestamps);
    return true;
  }

  timestamps.push(now);
  hits.set(key, timestamps);
  return false;
}
