"use client";

import { useEffect, useRef, useState } from "react";

/**
 * A metric that counts up as it scrolls into view.
 *
 * ── Why the final value is always in the DOM ──────────────────────────────
 *
 * The rendered text starts at the *final* value and is replaced by the
 * animation only once the effect runs. That ordering is deliberate: the
 * server-rendered HTML therefore contains "372", not "0", so a crawler, a
 * no-JS visitor, and anyone whose JavaScript fails all read the real number.
 * The count is a decoration on a fact that is already present — never the
 * mechanism by which the fact arrives.
 *
 * ── Reduced motion ────────────────────────────────────────────────────────
 *
 * Under `prefers-reduced-motion` the effect returns immediately, leaving the
 * final value untouched. A counter has no meaningful "shortened" form; the
 * correct reduced version is the number, stated.
 */

/** Long enough to read as deliberate, short enough not to make anyone wait. */
const DURATION_MS = 1100;

/** Decelerating curve — fast start, long settle. Matches the entrance easing
 *  used across the site rather than running linear, which reads mechanical. */
function easeOut(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

interface CaseStudyCounterProps {
  /** The real value. Rendered as-is until the animation takes over. */
  value: number;
  suffix?: string;
}

export function CaseStudyCounter({ value, suffix = "" }: CaseStudyCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [displayed, setDisplayed] = useState(value);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // No IntersectionObserver (or a test environment): leave the real number.
    if (typeof IntersectionObserver === "undefined") return;

    let frame = 0;
    let start = 0;

    const step = (now: number) => {
      start ||= now;
      const progress = Math.min((now - start) / DURATION_MS, 1);
      setDisplayed(Math.round(easeOut(progress) * value));
      if (progress < 1) frame = requestAnimationFrame(step);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        // Fires once, then stops observing — a number that re-counts every
        // time it scrolls back into view is a distraction, not a flourish.
        observer.disconnect();
        setDisplayed(0);
        frame = requestAnimationFrame(step);
      },
      { threshold: 0.4 },
    );

    observer.observe(node);
    return () => {
      observer.disconnect();
      if (frame) cancelAnimationFrame(frame);
    };
  }, [value]);

  return (
    <span ref={ref}>
      {/* `tabular-nums` is applied by the consuming stylesheet so the width
          does not jitter as digits change during the count. */}
      {displayed.toLocaleString("en-GB")}
      {suffix}
    </span>
  );
}
