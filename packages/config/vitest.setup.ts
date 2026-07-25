import "@testing-library/jest-dom/vitest";
import { afterEach, expect } from "vitest";
import { cleanup } from "@testing-library/react";
import * as axeMatchers from "vitest-axe/matchers";

// Vitest's `globals` mode is intentionally off (explicit imports are
// preferred, see eslint config) — so Testing Library's auto-cleanup, which
// relies on a global `afterEach`, is wired up explicitly here instead.
afterEach(() => {
  cleanup();
});

// Product Implementation Constitution Ch.18 §2 Layer 2 (unit-layer half,
// per Ch.48 §2): registered globally so both workspaces' test suites can use
// `expect(container).toHaveNoViolations()`. Only packages/ui's Milestone 7
// a11y suite (src/test/a11y.test.tsx) actually calls it today; that file
// separately imports "vitest-axe/extend-expect" for the matcher's TS types,
// since this setup file sits outside either workspace's own tsconfig
// `include` and so can't carry the type augmentation itself.
expect.extend(axeMatchers);

// jsdom doesn't implement IntersectionObserver — this baseline stub only
// prevents a hard crash for any component that constructs one (e.g. Reveal)
// in a test that isn't specifically exercising intersection behavior. A
// test that needs to control *when* intersection fires overrides this
// itself via `vi.stubGlobal("IntersectionObserver", ...)`, restored by
// `vi.unstubAllGlobals()` in its own `afterEach`.
if (typeof globalThis.IntersectionObserver === "undefined") {
  class NoopIntersectionObserver implements IntersectionObserver {
    readonly root = null;
    readonly rootMargin = "";
    readonly thresholds: ReadonlyArray<number> = [];
    observe() {}
    unobserve() {}
    disconnect() {}
    takeRecords(): IntersectionObserverEntry[] {
      return [];
    }
  }
  globalThis.IntersectionObserver = NoopIntersectionObserver as unknown as typeof IntersectionObserver;
}

// jsdom also doesn't implement matchMedia — same rationale as above
// (e.g. Stat's reduced-motion check). Defaults every query to `matches:
// false`; a test asserting reduced-motion behavior overrides this itself
// via `vi.stubGlobal("matchMedia", ...)`.
if (typeof globalThis.matchMedia === "undefined") {
  globalThis.matchMedia = ((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  })) as unknown as typeof window.matchMedia;
}
