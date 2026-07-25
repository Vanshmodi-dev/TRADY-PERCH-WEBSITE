"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import styles from "./stat.module.css";
import type { StatProps } from "./stat.types";

function classNames(...values: Array<string | false | undefined>): string {
  return values.filter(Boolean).join(" ");
}

interface CountablePart {
  target: number;
  suffix: string;
  decimals: number;
}

/** Only a clean number plus a short, unambiguous suffix counts up — "40%"
 * and "5x" do; "24/7", "12 hrs/wk", and "Same-day" don't, since there's no
 * sensible intermediate state between 0 and those values. Deliberately
 * conservative rather than trying to guess intent from an arbitrary string. */
const SAFE_SUFFIXES = new Set(["", "%", "x", "X", "+"]);

function parseCountable(value: string): CountablePart | null {
  const match = /^(\d+(?:\.\d+)?)([^\d]*)$/.exec(value);
  if (!match) return null;
  // Both groups are non-optional in the pattern above, so a successful
  // match guarantees both are present — TS can't narrow into individual
  // capture groups, hence the fallbacks.
  const numberStr = match[1] ?? "";
  const suffix = match[2] ?? "";
  if (!SAFE_SUFFIXES.has(suffix)) return null;
  const decimalPart = numberStr.split(".")[1];
  return { target: parseFloat(numberStr), suffix, decimals: decimalPart ? decimalPart.length : 0 };
}

/** Approximates the system's Entrance curve (fast start, generous
 * decelerating landing) for a JS-driven numeral tick, where a CSS
 * transition-timing-function can't apply — evaluating the exact
 * cubic-bezier(0.16, 1, 0.3, 1) point-for-point isn't worth a bespoke
 * solver for this; easeOutCubic produces the same qualitative shape
 * Ch.15 Mt-1 requires (never linear, decelerates into rest). */
function easeOutCubic(t: number): number {
  return 1 - (1 - t) ** 3;
}

/**
 * Master Vision §9.1 Principle 4 names a count-up numeral as its canonical
 * example of purposeful diegetic motion ("a number becoming real in front
 * of you is more persuasive than seeing it static"). Ch.15's Deliberate
 * tier (500ms): this is framed as a consciously significant moment, not
 * routine interface feedback.
 *
 * The displayed value always starts as the real, final value — never "0"
 * — so SSR output, no-JS visitors, and crawlers all see the correct
 * number unconditionally (Ch.15's own accessibility rule: motion may
 * never be the sole carrier of essential information). The animation is
 * a pure client-side enhancement layered on top: if this Stat is already
 * in the viewport the moment JS attaches, it's left alone rather than
 * flashing to 0 and re-counting (Ch.9.1 P4 — it was never actually
 * "revealed" by scrolling, so nothing should move). It only counts up the
 * first time it's scrolled into view after mount.
 */
export function Stat({ value, label, size = "md", className }: StatProps) {
  const countable = useMemo(() => parseCountable(value), [value]);
  const ref = useRef<HTMLParagraphElement>(null);
  const [displayValue, setDisplayValue] = useState(value);

  useEffect(() => {
    // displayValue's initial state already covers `value` — this effect
    // only ever needs to layer the count-up enhancement on top, not
    // re-sync it. A Stat isn't a controlled-after-mount component: a
    // caller that genuinely needs a fresh value should remount via
    // `key={value}` rather than rely on this effect to resync.
    if (!countable) return;
    const node = ref.current;
    if (!node) return;
    if (typeof window === "undefined" || typeof IntersectionObserver === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let isFirstCallback = true;
    let frameId: number | undefined;
    const durationMs = 500; // Deliberate tier (Ch.15 §4)

    const observer = new IntersectionObserver(
      ([entry]) => {
        const wasFirstCallback = isFirstCallback;
        isFirstCallback = false;
        if (!entry?.isIntersecting) return;
        observer.disconnect();
        if (wasFirstCallback) return; // already on screen at mount — leave as-is

        const startTime = performance.now();
        const tick = (now: number) => {
          const progress = Math.min((now - startTime) / durationMs, 1);
          const current = countable.target * easeOutCubic(progress);
          setDisplayValue(`${current.toFixed(countable.decimals)}${countable.suffix}`);
          if (progress < 1) frameId = requestAnimationFrame(tick);
        };
        frameId = requestAnimationFrame(tick);
      },
      { threshold: 0.5 },
    );
    observer.observe(node);
    return () => {
      observer.disconnect();
      if (frameId !== undefined) cancelAnimationFrame(frameId);
    };
  }, [countable]);

  return (
    <div className={classNames(styles.stat, styles[size], className)}>
      <p ref={ref} className={styles.value}>
        {displayValue}
      </p>
      <p className={styles.label}>{label}</p>
    </div>
  );
}
