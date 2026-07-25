import { afterEach, describe, expect, it, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { Stat } from "./stat";

type ObserverCallback = (entries: Array<{ isIntersecting: boolean }>) => void;

class ControllableIntersectionObserver {
  static instances: ControllableIntersectionObserver[] = [];
  callback: ObserverCallback;

  constructor(callback: ObserverCallback) {
    this.callback = callback;
    ControllableIntersectionObserver.instances.push(this);
  }

  observe = vi.fn();
  disconnect = vi.fn();

  triggerIntersect(isIntersecting: boolean) {
    this.callback([{ isIntersecting }]);
  }
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

afterEach(() => {
  vi.unstubAllGlobals();
  ControllableIntersectionObserver.instances = [];
});

describe("Stat", () => {
  it("Ch.4 Ty-5: renders the numeral value and its label", () => {
    render(<Stat value="40%" label="faster lead response" />);
    expect(screen.getByText("40%")).toBeInTheDocument();
    expect(screen.getByText("faster lead response")).toBeInTheDocument();
  });

  it("renders the sm size variant", () => {
    render(<Stat value="12 hrs/week" label="saved on manual entry" size="sm" />);
    expect(screen.getByText("12 hrs/week")).toBeInTheDocument();
  });

  it("Ch.15 Mt-4 / no-JS safety: the real value is always present, never a '0' placeholder, before any animation runs", () => {
    stubMatchMedia(false);
    vi.stubGlobal("IntersectionObserver", ControllableIntersectionObserver);
    render(<Stat value="40%" label="faster first response" />);
    expect(screen.getByText("40%")).toBeInTheDocument();
    expect(screen.queryByText("0%")).not.toBeInTheDocument();
  });

  it("Ch.9.1 P4: a stat already on screen when JS attaches is never reset to 0 and re-counted", async () => {
    stubMatchMedia(false);
    vi.stubGlobal("IntersectionObserver", ControllableIntersectionObserver);
    render(<Stat value="40%" label="faster first response" />);

    const observer = ControllableIntersectionObserver.instances[0]!;
    observer.triggerIntersect(true); // first callback reports already-intersecting

    await waitFor(() => expect(observer.disconnect).toHaveBeenCalled());
    expect(screen.getByText("40%")).toBeInTheDocument();
    expect(screen.queryByText("0%")).not.toBeInTheDocument();
  });

  it("never animates a value with no sensible intermediate state (e.g. 'Same-day', '24/7') — no observer is even created", () => {
    stubMatchMedia(false);
    vi.stubGlobal("IntersectionObserver", ControllableIntersectionObserver);
    render(<Stat value="24/7" label="lead coverage, no gaps overnight" />);

    expect(ControllableIntersectionObserver.instances).toHaveLength(0);
    expect(screen.getByText("24/7")).toBeInTheDocument();
  });

  it("Ch.15 §9.5 reduced motion: never resets a countable value toward 0 when the visitor prefers reduced motion", async () => {
    stubMatchMedia(true);
    vi.stubGlobal("IntersectionObserver", ControllableIntersectionObserver);
    render(<Stat value="90%" label="fewer pricing errors" />);

    expect(ControllableIntersectionObserver.instances).toHaveLength(0);
    expect(screen.getByText("90%")).toBeInTheDocument();
  });
});
