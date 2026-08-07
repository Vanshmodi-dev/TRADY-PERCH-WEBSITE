"use client";

/**
 * THE INTRO GATE — one flag that stops the two heaviest things on the page
 * from running at the same time.
 *
 * ── The problem it solves ─────────────────────────────────────────────────
 *
 * The intro overlay and the Apex renderer were both scheduling themselves
 * "when the main thread is idle", and both concluded that it was. The Apex's
 * `requestIdleCallback` fired roughly 2.4s into a 5s ceremony, three.js began
 * compiling shaders and building geometry, and the main thread was gone for
 * ten seconds.
 *
 * The ceremony's beat clock is a chain of timers, so a blocked thread does not
 * merely make it stutter — it *stretches* it. Measured on a production build:
 * a sequence designed to last 5.0s took 17.4s to reach the hero, with the last
 * twelve of those spent on a frozen frame. That is the site's first
 * impression, and it is the exact opposite of the one it is designed to make.
 *
 * ── Why a gate rather than a priority ─────────────────────────────────────
 *
 * There is nothing to prioritise. While the overlay is up it covers the
 * viewport completely — the Apex is behind an opaque black plate, at full
 * cost, rendering for nobody. Every frame of that work is waste no matter how
 * it is scheduled. The renderer should simply not begin until the overlay has
 * gone, and then it has the thread to itself.
 *
 * ── Shape ─────────────────────────────────────────────────────────────────
 *
 * Module scope rather than context: there is one intro and one Apex per page,
 * the value changes exactly once, and threading it through the tree would
 * couple two components that should not need to know about each other.
 *
 * It is held by default and released by whoever owns the overlay. The safety
 * release exists because "held forever" is the one failure this must not
 * have: on any route where the intro is not mounted at all, nothing would
 * ever call `releaseIntroGate` and the Apex would never load.
 */

type Listener = () => void;

/** Longest the gate will hold if nothing ever releases it. */
const SAFETY_RELEASE_MS = 6000;

let held = true;
const listeners = new Set<Listener>();
let safetyTimer: ReturnType<typeof setTimeout> | null = null;

function armSafetyRelease(): void {
  if (safetyTimer !== null || !held || typeof window === "undefined") return;
  safetyTimer = setTimeout(releaseIntroGate, SAFETY_RELEASE_MS);
}

/**
 * The overlay is gone (or was never going to appear). Idempotent — the intro
 * calls it from an effect that may run more than once.
 */
export function releaseIntroGate(): void {
  if (!held) return;
  held = false;
  if (safetyTimer !== null) {
    clearTimeout(safetyTimer);
    safetyTimer = null;
  }
  for (const listener of listeners) listener();
}

export function subscribeToIntroGate(onChange: Listener): () => void {
  listeners.add(onChange);
  armSafetyRelease();
  return () => {
    listeners.delete(onChange);
  };
}

export function isIntroGateHeld(): boolean {
  return held;
}

/**
 * Server snapshot is `false` — "not held".
 *
 * The gate only ever gates a client-side `import()`, which cannot happen
 * during a server render anyway, and reporting "held" on the server would
 * make the first client render disagree with the HTML for no benefit.
 */
export function introGateServerSnapshot(): boolean {
  return false;
}
