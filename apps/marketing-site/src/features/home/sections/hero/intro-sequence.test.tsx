import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { IntroSequence } from "./intro-sequence";

// Milestone 8: the overlay (and its text content) now renders
// unconditionally from the very first paint (see intro-sequence.module.css's
// .hidden), so "TRADY PERCH is in the document" / "the overlay is in the
// document" are no longer reliable proxies for "the async sessionStorage
// check has resolved" — both are now true on the very first render,
// before that. The skip-event listener effect is itself gated on that same
// check (it only registers once skippedThisSession resolves to false), so
// dispatching a skip event before this resolves is dispatched into a void.
// Waiting for .hidden to be gone is the actually-accurate signal.
async function waitUntilReady(container: HTMLElement) {
  await waitFor(() => {
    const overlay = container.querySelector('[role="presentation"]') as HTMLElement | null;
    expect(overlay?.className).not.toMatch(/hidden/);
  });
}

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

// Real timers throughout (not vi.useFakeTimers()) — this component chains
// several setTimeout-driven React state updates, which fake timers and
// React's act()-batched effects interact with unreliably. The real
// sequence is a few seconds long; these tests use short waitFor timeouts
// against the *early* phases only, so they stay fast without needing to
// simulate the full ~4s ceremony.

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
    const { container } = render(<IntroSequence />);
    await waitUntilReady(container);

    window.dispatchEvent(new KeyboardEvent("keydown"));

    await waitFor(() => expect(container).toBeEmptyDOMElement(), { timeout: 3000 });
    expect(sessionStorage.getItem("tp-intro-shown")).toBe("1");
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
    const { container } = render(<IntroSequence />);
    await waitFor(() => expect(screen.getByText("TRADY PERCH")).toBeInTheDocument());

    await waitFor(() => expect(container).toBeEmptyDOMElement(), { timeout: 3000 });
    expect(sessionStorage.getItem("tp-intro-shown")).toBe("1");
  });

  it("Milestone 5 review Finding #5 (Ch.40 Ag-2): skipping during silence never starts the mark's entrance animation", async () => {
    stubMatchMedia(false);
    const { container } = render(<IntroSequence />);
    await waitUntilReady(container);

    // Still in "silence" — the mark has never appeared. Skip immediately.
    window.dispatchEvent(new KeyboardEvent("keydown"));

    // The overlay should now be dissolving (or already gone), but at no
    // point should the mark have picked up its entrance class — that
    // would mean a fresh animation starting in the same instant the
    // overlay itself starts fading, stacking past Ag-2's 3-element ceiling.
    const mark = container.querySelector('[class*="mark"]');
    if (mark) {
      expect(mark.className).not.toMatch(/revealing/);
    }
    await waitFor(() => expect(container).toBeEmptyDOMElement(), { timeout: 3000 });
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
    const { container } = render(<IntroSequence />);
    await waitUntilReady(container);

    window.dispatchEvent(new KeyboardEvent("keydown"));

    await waitFor(() => {
      const overlay = container.querySelector('[role="presentation"]') as HTMLElement | null;
      expect(overlay?.className).toMatch(/dissolving/);
    });
  });
});
