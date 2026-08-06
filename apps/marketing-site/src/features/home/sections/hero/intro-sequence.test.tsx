import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { act, render, screen, waitFor } from "@testing-library/react";
import { IntroSequence } from "./intro-sequence";

/**
 * FIELD LINES — behavioural contract.
 *
 * jsdom has no real canvas 2D context, so `ParticleField.isReady()` is always
 * false here and the component takes its documented static fallback path. That
 * is not a limitation of these tests — it is the single most important path to
 * cover, because it is what every visitor gets when the ceremony cannot run:
 * reduced motion, a refused context, or a device that cannot rasterise. The
 * field maths itself is tested directly in field-lines/field-lines.test.ts.
 */

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
  stubMatchMedia(false);
  // Model a refused 2D context explicitly rather than letting jsdom's
  // unimplemented getContext throw its own warning into the run. Same code
  // path either way — this just makes the intent of these tests ("the
  // ceremony cannot run; prove the fallback is complete") a stated condition
  // rather than an accident of the environment.
  vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockReturnValue(null);
});

afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
  vi.useRealTimers();
  sessionStorage.clear();
  document.body.style.overflow = "";
});

/** Resolves the one-tick environment check (sessionStorage + matchMedia) that
 *  gates the overlay's visibility and the skip listener. Nothing downstream is
 *  wired up until this has run. */
async function settleEnvironmentCheck() {
  await act(async () => {
    await Promise.resolve();
    vi.advanceTimersByTime(1);
  });
}

describe("IntroSequence", () => {
  it("renders the wordmark and tagline in the initial markup", () => {
    render(<IntroSequence />);
    expect(screen.getByText("TRADY PERCH")).toBeInTheDocument();
    expect(screen.getByText("Build. Automate. Grow.")).toBeInTheDocument();
  });

  it("is hidden from assistive technology — it is presentation, not content", () => {
    const { container } = render(<IntroSequence />);
    const overlay = container.firstElementChild;
    expect(overlay).toHaveAttribute("aria-hidden", "true");
    expect(overlay).toHaveAttribute("role", "presentation");
  });

  it("does not render a canvas when the ceremony cannot run", async () => {
    vi.useFakeTimers();
    const { container } = render(<IntroSequence />);
    await settleEnvironmentCheck();
    // jsdom cannot provide a 2D context, so the component must degrade rather
    // than hold an empty black overlay over the hero.
    expect(container.querySelector("canvas")).toBeNull();
  });

  it("locks scroll while the overlay is up and releases it afterwards", async () => {
    vi.useFakeTimers();
    render(<IntroSequence />);
    await settleEnvironmentCheck();
    expect(document.body.style.overflow).toBe("hidden");

    await act(async () => {
      vi.advanceTimersByTime(2000);
    });
    expect(document.body.style.overflow).toBe("");
  });

  it("dissolves on the static path and unmounts entirely", async () => {
    vi.useFakeTimers();
    const { container } = render(<IntroSequence />);
    await settleEnvironmentCheck();

    await act(async () => {
      vi.advanceTimersByTime(2000);
    });

    expect(container.firstChild).toBeNull();
  });

  it("marks the session so it never plays twice", async () => {
    vi.useFakeTimers();
    render(<IntroSequence />);
    await settleEnvironmentCheck();

    await act(async () => {
      vi.advanceTimersByTime(2000);
    });

    expect(sessionStorage.getItem("tp-intro-shown")).toBe("1");
  });

  it("never runs for a visitor who has already seen it this session", async () => {
    sessionStorage.setItem("tp-intro-shown", "1");
    vi.useFakeTimers();
    const { container } = render(<IntroSequence />);
    await settleEnvironmentCheck();

    // The overlay is present but hidden, and scroll is never locked.
    expect(document.body.style.overflow).toBe("");
    expect(container.querySelector("canvas")).toBeNull();
  });

  it("skips on a pointer gesture and unmounts", async () => {
    render(<IntroSequence />);
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 5));
    });

    await act(async () => {
      window.dispatchEvent(new Event("pointerdown"));
    });

    await waitFor(() => {
      expect(screen.queryByText("TRADY PERCH")).not.toBeInTheDocument();
    });
    expect(sessionStorage.getItem("tp-intro-shown")).toBe("1");
  });

  it("skips on a keyboard gesture — the skip is not pointer-only", async () => {
    render(<IntroSequence />);
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 5));
    });

    await act(async () => {
      window.dispatchEvent(new Event("keydown"));
    });

    await waitFor(() => {
      expect(screen.queryByText("TRADY PERCH")).not.toBeInTheDocument();
    });
  });

  it("releases the scroll lock when skipped, not only when it completes", async () => {
    render(<IntroSequence />);
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 5));
    });
    expect(document.body.style.overflow).toBe("hidden");

    await act(async () => {
      window.dispatchEvent(new Event("wheel"));
    });

    await waitFor(() => {
      expect(document.body.style.overflow).toBe("");
    });
  });

  it("presents statically under reduced motion, still delivering the content", async () => {
    stubMatchMedia(true);
    vi.useFakeTimers();
    const { container } = render(<IntroSequence />);
    await settleEnvironmentCheck();

    // Content present, no canvas, no ceremony.
    expect(screen.getByText("TRADY PERCH")).toBeInTheDocument();
    expect(container.querySelector("canvas")).toBeNull();

    await act(async () => {
      vi.advanceTimersByTime(2000);
    });
    expect(container.firstChild).toBeNull();
  });

  it("survives sessionStorage being unavailable", async () => {
    const getItem = vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => {
      throw new Error("blocked");
    });
    const setItem = vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw new Error("blocked");
    });

    vi.useFakeTimers();
    expect(() => render(<IntroSequence />)).not.toThrow();
    await settleEnvironmentCheck();

    await act(async () => {
      vi.advanceTimersByTime(2000);
    });

    getItem.mockRestore();
    setItem.mockRestore();
  });
});
