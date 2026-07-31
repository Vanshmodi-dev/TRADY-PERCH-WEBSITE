"use client";

import { useEffect, useRef, useState } from "react";

interface AnimatedNumberProps {
  value: number;
  /** Turns the animated scalar into display text (rupees, hours, FTE). */
  format: (value: number) => string;
}

/** Ch.15 Standard tier — the same 300ms the rest of the system settles in. */
const DURATION_MS = 300;

/** Ch.15 Mt-2 Entrance curve, as a scalar easing rather than a CSS bezier. */
function easeOutExpo(t: number): number {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

function prefersReducedMotion(): boolean {
  return (
    typeof window !== "undefined" &&
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/**
 * Counts from whatever is currently on screen to the next value on a rAF loop.
 *
 * Why rAF rather than a CSS transition: the animated thing is the element's
 * *text content*, which is not a CSS-animatable property — Ch.40 Ag-1's closed
 * property list could not express this at all. No style is ever touched, so
 * Ag-1 is not being circumvented; it simply does not reach a number whose
 * glyphs change.
 *
 * Under `prefers-reduced-motion` the duration collapses to zero (Ag-3/Mt-4),
 * so the first frame commits the final value — the same structural collapse
 * packages/motion applies to every other duration, rather than a separate
 * branch a future edit could forget to keep in step.
 *
 * A drag fires this many times a second. Each run starts from the value
 * actually displayed when the previous run was cancelled, never from a stale
 * origin, so fast slider movement reads as one continuous count rather than a
 * series of snap-backs.
 */
export function AnimatedNumber({ value, format }: AnimatedNumberProps) {
  const [displayed, setDisplayed] = useState(value);
  const displayedRef = useRef(value);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    const from = displayedRef.current;
    if (from === value) return;

    if (typeof requestAnimationFrame === "undefined") {
      // Same shape as packages/ui's Reveal takes when IntersectionObserver is
      // absent: setState still has to happen inside a callback rather than
      // synchronously in the effect body (react-hooks/set-state-in-effect), and
      // a 0ms timeout satisfies that with no perceptible delay.
      const timeoutId = setTimeout(() => {
        displayedRef.current = value;
        setDisplayed(value);
      }, 0);
      return () => clearTimeout(timeoutId);
    }

    const duration = prefersReducedMotion() ? 0 : DURATION_MS;
    const start = performance.now();

    const step = (now: number) => {
      const elapsed = now - start;
      const progress = duration === 0 ? 1 : Math.min(1, elapsed / duration);
      // Land exactly on the target on the final frame — easeOutExpo approaches
      // it asymptotically and would otherwise leave a rounding artefact.
      const next = progress === 1 ? value : from + (value - from) * easeOutExpo(progress);

      displayedRef.current = next;
      setDisplayed(next);

      if (progress < 1) frameRef.current = requestAnimationFrame(step);
    };

    frameRef.current = requestAnimationFrame(step);

    return () => {
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    };
  }, [value]);

  return <>{format(displayed)}</>;
}
