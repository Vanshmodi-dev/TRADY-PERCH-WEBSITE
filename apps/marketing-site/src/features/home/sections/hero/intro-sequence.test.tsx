import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { act, render, screen, waitFor } from "@testing-library/react";
import { IntroSequence } from "./intro-sequence";

// Note for anyone adding a test here: the overlay and its text render
// unconditionally from the first paint (Milestone 8 — see
// intro-sequence.module.css's .hidden), so "TRADY PERCH is in the document"
// is NOT a proxy for "the async sessionStorage/matchMedia check has
// resolved". It is true on the very first render, before that. The skip
// listener is gated on that same check, so a skip event dispatched before it
// resolves goes into a void. Use settleEnvironmentCheck() below.

function stubMatchMedia(prefersReducedMotion: boolean) {
  vi.stubGlobal(
    "matchMedia",
    vi.fn().mockImplementation((query: string) => ({
      matches: query.includes("prefers-reduced-motion") ? prefersReducedMotion : false,
      media: query,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    })),
  );
}

beforeEach(() => {
  sessionStorage.clear();
});

afterEach(() => {
  vi.unstubAllGlobals();
  sessionStorage.clear();
});

// Real timers for most tests here (not vi.useFakeTimers()) — this component
// chains several setTimeout-driven React state updates, and these tests use
// short waitFor timeouts against the *early* phases only, so they stay fast
// without simulating the full ~4s ceremony.
//
// EXCEPT the three that depend on a *deadline* — asserting a transient phase
// ("still in silence", a 400ms window; "currently dissolving", a 500ms window
// ending in unmount) or asserting that unmount has happened by some cutoff.
// Under real timers those race the wall clock: if the machine is loaded
// enough that the window elapses between the setup await and the assertion,
// the phase has moved on and the test fails with nothing wrong in the
// component. That was not hypothetical — a different one of the three failed
// on roughly one run in ten while the suite ran alongside other work, and all
// three passed in isolation, which is the worst possible signal to debug from.
// They drive the clock explicitly instead, so the phase under test is a fact
// rather than a hope. Verified deterministic over 20 consecutive runs.
async function withFakeTimers(body: () => Promise<void>) {
  vi.useFakeTimers();
  try {
    await body();
  } finally {
    vi.useRealTimers();
  }
}

/** Resolves the one-tick `setTimeout(0)` environment check (sessionStorage +
 *  matchMedia) that gates both the overlay's visibility and the skip
 *  listener's registration, without advancing into the next phase. */
async function settleEnvironmentCheck() {
  await act(async () => {
    await vi.advanceTimersByTimeAsync(0);
  });
}

/**
 * Runs the phase chain to its terminal `done`, at which point the component
 * unmounts itself.
 *
 * Deliberately not `advanceTimersByTime(<sum of the phase durations>)`: each
 * phase schedules its successor from inside an effect that runs partway
 * through the advance, so the successor's deadline is measured from that
 * later point and hand-summing the tiers silently under-advances.
 *
 * Also deliberately a loop rather than one `runAllTimersAsync()`: a phase's
 * timer callback only *queues* a React state update, and the effect that
 * registers the next phase's timer doesn't run until `act` flushes at the
 * end of the drain — so a single pass advances exactly one phase and then
 * finds no timers left. Looping until the overlay unmounts handles a chain
 * of any length (the full path is six phases, the reduced path two) without
 * encoding either length here. Bounded so a component that never completes
 * fails the assertion below rather than hanging the suite.
 */
async function runPhaseChainToCompletion(container: HTMLElement) {
  for (let pass = 0; pass < 12 && container.childElementCount > 0; pass++) {
    await act(async () => {
      await vi.runAllTimersAsync();
    });
  }
}

describe("IntroSequence", () => {
  it("Master Vision §9.2 governing constraint: never shows twice in one session", async () => {
    // Milestone 8 (Ch.36 LCP budget): the overlay markup — specifically
    // its <Image priority> — now renders unconditionally (see
    // intro-sequence.module.css's .hidden and its own comment for why:
    // the image needs to exist in server-rendered HTML for the browser to
    // discover and start fetching it immediately, rather than only after
    // a client-side sessionStorage check resolves). A returning visitor
    // therefore no longer gets an *empty* container — they get one that
    // stays permanently in the .hidden state instead, which is the
    // behavioral equivalent (never becomes visible, never animates).
    stubMatchMedia(false);
    sessionStorage.setItem("tp-intro-shown", "1");
    const { container } = render(<IntroSequence />);

    await waitFor(() => {
      const overlay = container.querySelector('[role="presentation"]') as HTMLElement | null;
      expect(overlay?.className).toMatch(/hidden/);
    });
    // Never advances past "silence" while hidden — confirms it's actually
    // suppressed, not merely unstyled.
    expect(screen.queryByText("TRADY PERCH")?.className).not.toMatch(/visible/);
  });

  it("shows the overlay on a first visit, hidden from assistive technology", async () => {
    stubMatchMedia(false);
    const { container } = render(<IntroSequence />);

    await waitFor(() => {
      const overlay = container.querySelector('[role="presentation"]');
      expect(overlay).toHaveAttribute("aria-hidden", "true");
    });
    expect(screen.getByText("TRADY PERCH")).toBeInTheDocument();
    expect(screen.getByText("Build. Automate. Grow.")).toBeInTheDocument();
  });

  it("is interruptible on any interaction and dissolves away, marking the session shown", async () => {
    stubMatchMedia(false);
    // Previously real-timered, and racy in a way that produced a confusing
    // failure: `waitUntilReady` polls the DOM, but the skip listener is
    // registered by an effect keyed on the same state that clears `.hidden`.
    // When the poll observed the class change before that effect had
    // flushed, the dispatched keydown hit no listener at all, the sequence
    // played its full ~4s ceremony instead of skipping, and the assertion's
    // 3s deadline expired — reported as a timeout, with nothing actually
    // wrong. Driving the clock through `act` guarantees effects have flushed
    // before the event is dispatched.
    await withFakeTimers(async () => {
      const { container } = render(<IntroSequence />);
      await settleEnvironmentCheck();

      await act(async () => {
        window.dispatchEvent(new KeyboardEvent("keydown"));
      });

      // The dissolve is the only phase left; draining it reaches unmount.
      await runPhaseChainToCompletion(container);

      expect(container).toBeEmptyDOMElement();
      expect(sessionStorage.getItem("tp-intro-shown")).toBe("1");
    });
  });

  it("Ch.15 §4 / §9.5: reduced motion renders the finished state immediately, with no wipe/reflection elements", async () => {
    // Milestone 8: "TRADY PERCH" text is no longer a reliable "state has
    // resolved" proxy (see waitUntilReady's own comment) — on the very
    // first render, before the async matchMedia check resolves,
    // `reducedMotion` still defaults to false, so wipeCover/reflection
    // *are* present initially regardless of stubMatchMedia(true) above.
    // Waiting directly for their absence (the actual thing this test
    // verifies) instead of an indirect, now-too-early proxy.
    stubMatchMedia(true);
    const { container } = render(<IntroSequence />);

    await waitFor(() => {
      expect(container.querySelector('[class*="wipeCover"]')).not.toBeInTheDocument();
      expect(container.querySelector('[class*="reflection"]')).not.toBeInTheDocument();
    });
    expect(screen.getByText("TRADY PERCH")).toBeInTheDocument();
  });

  it("Ch.15 §4 / §9.5: reduced motion still dissolves and marks the session shown, on a much shorter static hold", async () => {
    stubMatchMedia(true);
    // Same deterministic treatment as the skip tests: this asserts an
    // unmount that happens on a deadline, which is the shape of assertion
    // that races the wall clock under load. The reduced path is
    // hold (900ms) -> dissolving (150ms), and driving exactly that proves
    // the shorter timings are the ones actually in effect, which a generous
    // real-timer `waitFor` could not distinguish from the full sequence.
    await withFakeTimers(async () => {
      const { container } = render(<IntroSequence />);
      await settleEnvironmentCheck();

      // The overlay is up and the environment check has resolved. (What the
      // reduced path *renders* — the instant mark, and no wipe/reflection
      // elements — is the test above's subject; this one's is that the
      // sequence still completes and still marks the session.)
      expect(screen.getByText("TRADY PERCH")).toBeInTheDocument();

      await runPhaseChainToCompletion(container);

      expect(container).toBeEmptyDOMElement();
      expect(sessionStorage.getItem("tp-intro-shown")).toBe("1");
    });
  });

  it("Milestone 5 review Finding #5 (Ch.40 Ag-2): skipping during silence never starts the mark's entrance animation", async () => {
    stubMatchMedia(false);
    await withFakeTimers(async () => {
      const { container } = render(<IntroSequence />);
      await settleEnvironmentCheck();

      // Assert the precondition rather than assuming it: the skip listener
      // is registered (overlay no longer hidden) and silence's 400ms has
      // not elapsed, so this really is the case the test claims to cover.
      const overlay = container.querySelector('[role="presentation"]') as HTMLElement;
      expect(overlay.className).not.toMatch(/hidden/);
      expect(container.querySelector('[class*="mark"]')?.className).not.toMatch(/revealing/);

      await act(async () => {
        window.dispatchEvent(new KeyboardEvent("keydown"));
      });

      // The overlay is now dissolving, and at no point did the mark pick up
      // its entrance class — that would be a fresh animation starting in the
      // same instant the overlay begins fading, stacking past Ag-2's
      // 3-element ceiling.
      expect(container.querySelector('[class*="mark"]')?.className).not.toMatch(/revealing/);

      // Run the sequence out to unmount. `skippedFromSilence` must keep the
      // mark suppressed for the rest of the visit, not merely for the frame
      // the skip landed on — so the whole remaining chain is drained rather
      // than a single post-skip assertion being taken as proof.
      await runPhaseChainToCompletion(container);
      expect(container).toBeEmptyDOMElement();
    });
  });

  it("Milestone 5 review Finding #3: the overlay picks up its dissolving class immediately on skip", async () => {
    // jsdom never loads the real .module.css stylesheet (CSS Modules
    // resolve to class-name proxies only — see the M3 Header test notes),
    // so `pointer-events: none` itself can't be asserted via
    // getComputedStyle here; this checks the class that rule is keyed off
    // actually gets applied. The real property was confirmed applying
    // correctly via a real-browser Playwright pass during this
    // milestone's manual QA.
    stubMatchMedia(false);
    await withFakeTimers(async () => {
      const { container } = render(<IntroSequence />);
      await settleEnvironmentCheck();

      await act(async () => {
        window.dispatchEvent(new KeyboardEvent("keydown"));
      });

      // Asserted synchronously, in the same turn as the skip. The previous
      // `waitFor` here could poll for the first time *after* the 500ms
      // dissolve had already completed and unmounted the overlay, leaving
      // nothing to match — the class had been applied correctly and the test
      // still failed. "Immediately", which is what this test is named for,
      // is now actually what it checks.
      const overlay = container.querySelector('[role="presentation"]') as HTMLElement;
      expect(overlay.className).toMatch(/dissolving/);
    });
  });
});
