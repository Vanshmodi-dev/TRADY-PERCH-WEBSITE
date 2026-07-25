import { afterEach, describe, expect, it, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { Reveal } from "./reveal";

type ObserverCallback = (entries: Array<{ isIntersecting: boolean }>) => void;

/** A controllable stand-in for the baseline jsdom stub (vitest.setup.ts) —
 * lets a test decide exactly when intersection fires, rather than never. */
class ControllableIntersectionObserver {
  static instances: ControllableIntersectionObserver[] = [];
  callback: ObserverCallback;

  constructor(callback: ObserverCallback) {
    this.callback = callback;
    ControllableIntersectionObserver.instances.push(this);
  }

  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();

  triggerIntersect(isIntersecting: boolean) {
    this.callback([{ isIntersecting }]);
  }
}

afterEach(() => {
  vi.unstubAllGlobals();
  ControllableIntersectionObserver.instances = [];
});

describe("Reveal", () => {
  it("always renders its children, even before intersection fires (no-JS/pre-hydration safety)", () => {
    vi.stubGlobal("IntersectionObserver", ControllableIntersectionObserver);
    render(
      <Reveal>
        <p>Section content</p>
      </Reveal>,
    );
    expect(screen.getByText("Section content")).toBeInTheDocument();
  });

  it("Ch.9.1 P4 / Ch.15 Mt-1: starts without the visible class, then adds it once the element intersects", async () => {
    vi.stubGlobal("IntersectionObserver", ControllableIntersectionObserver);
    const { container } = render(
      <Reveal>
        <p>Section content</p>
      </Reveal>,
    );
    const wrapper = container.firstElementChild as HTMLElement;
    expect(wrapper.className).not.toMatch(/visible/);

    const observer = ControllableIntersectionObserver.instances[0]!;
    observer.triggerIntersect(true);
    await waitFor(() => expect(wrapper.className).toMatch(/visible/));
  });

  it("disconnects the observer after the first reveal — content doesn't hide again on scrolling back up", () => {
    vi.stubGlobal("IntersectionObserver", ControllableIntersectionObserver);
    render(
      <Reveal>
        <p>Section content</p>
      </Reveal>,
    );
    const observer = ControllableIntersectionObserver.instances[0]!;
    observer.triggerIntersect(true);
    expect(observer.disconnect).toHaveBeenCalledTimes(1);
  });

  it("degrades to visible shortly after mount when IntersectionObserver isn't available at all", async () => {
    vi.stubGlobal("IntersectionObserver", undefined);
    const { container } = render(
      <Reveal>
        <p>Section content</p>
      </Reveal>,
    );
    const wrapper = container.firstElementChild as HTMLElement;
    await waitFor(() => expect(wrapper.className).toMatch(/visible/));
  });
});
