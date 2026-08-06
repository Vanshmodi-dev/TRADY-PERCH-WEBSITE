"use client";

import { useEffect, useRef, useState } from "react";
import { formatCount } from "./project-format";

/**
 * Counts a figure up from zero when it first scrolls into view.
 *
 * ── Why not `AnimatedNumber` from the pricing feature ─────────────────────
 *
 * That component animates *between* values as a slider is dragged — it starts
 * from whatever is currently displayed and has no notion of visibility,
 * because a pricing calculator is always already on screen when it changes.
 * This one animates once, from zero, and only when the tile is seen. Sharing
 * one component would mean a `trigger` prop and two mutually exclusive code
 * paths inside a 40-line file.
 *
 * ── Why the true value is server-rendered first ───────────────────────────
 *
 * `useState(value)`, not `useState(0)`. The server renders the real figure
 * into the HTML; this component only drops to zero once it has confirmed, on
 * the client, that it is going to animate. Without that ordering a visitor
 * with JavaScript disabled — and every crawler — would be served a portfolio
 * reporting zero stars and zero projects.
 */

/** Ch.15 Ceremonial tier: this is a reveal, not a state change. */
const DURATION_MS = 1200;

/** Ch.15 Mt-2 Entrance curve, as a scalar rather than a CSS bezier. */
function easeOutExpo(t: number): number {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

interface CountUpProps {
  value: number;
}

export function CountUp({ value }: CountUpProps) {
  const [displayed, setDisplayed] = useState(value);
  const ref = useRef<HTMLSpanElement>(null);
  const hasRunRef = useRef(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || hasRunRef.current) return;

    // Ch.15 Mt-4 / Ag-3 — reduced motion collapses this to its end state
    // rather than to a shorter animation, because the end state *is* the
    // content and there is nothing to shorten.
    const reducedMotion =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reducedMotion || typeof IntersectionObserver === "undefined" || value === 0) {
      hasRunRef.current = true;
      return;
    }

    let frame: number | null = null;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting || hasRunRef.current) return;
        hasRunRef.current = true;
        // Fires once, then stops observing — a counter that replays every time
        // it re-enters the viewport is a gimmick, and Ch.9.1 P4 rules out
        // anything moving merely because it is on screen.
        observer.disconnect();

        const start = performance.now();
        const step = (now: number) => {
          const progress = Math.min(1, (now - start) / DURATION_MS);
          // Land exactly on the target on the final frame — easeOutExpo
          // approaches it asymptotically and would leave the tile one short.
          setDisplayed(progress === 1 ? value : Math.round(value * easeOutExpo(progress)));
          if (progress < 1) frame = requestAnimationFrame(step);
        };

        setDisplayed(0);
        frame = requestAnimationFrame(step);
      },
      // Well inside the viewport before it starts, so the count is not already
      // finished by the time the tile is comfortably readable.
      { threshold: 0.4 },
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
      if (frame !== null) cancelAnimationFrame(frame);
    };
  }, [value]);

  return (
    <span ref={ref}>
      {/*
        The animated glyphs are hidden from assistive technology and the final
        value is exposed separately. Without this, a live region or a
        re-reading screen reader announces every intermediate frame — "one,
        four, nine, seventeen…" — which is unusable.
      */}
      <span aria-hidden="true">{formatCount(displayed)}</span>
      <span
        style={{
          position: "absolute",
          width: 1,
          height: 1,
          padding: 0,
          margin: -1,
          overflow: "hidden",
          clip: "rect(0, 0, 0, 0)",
          whiteSpace: "nowrap",
          border: 0,
        }}
      >
        {value.toLocaleString("en-GB")}
      </span>
    </span>
  );
}
