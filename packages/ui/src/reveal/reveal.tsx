"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./reveal.module.css";
import type { RevealProps } from "./reveal.types";

function classNames(...values: Array<string | false | undefined>): string {
  return values.filter(Boolean).join(" ");
}

/**
 * Master Vision §9.1 Principle 4 / §9.3 (Scroll Choreography): sections
 * reveal with restrained opacity/position settling as they're scrolled to,
 * rather than appearing all at once with the rest of the page. Ch.15
 * Standard tier + Entrance curve; Ch.40 Ag-2's "no more than three
 * elements animate simultaneously" is satisfied by construction as long
 * as this wraps whole sections (which enter the viewport one at a time on
 * ordinary scroll) rather than individual list items.
 *
 * Fires once per element, then disconnects — content that already
 * revealed doesn't hide again on scrolling back up (Ch.9.1 P4: "nothing
 * should move just because it's on screen").
 *
 * No-JS safety net: `app/layout.tsx` ships a `<noscript>` rule forcing
 * `.reveal` to its fully-visible end state, so content is never truly
 * hidden from a visitor (or a crawler) without JavaScript — only the
 * *animation* of arriving is a progressive enhancement, never the content
 * itself, mirroring the same principle Master Vision §9.5 states for the
 * intro sequence.
 */
export function Reveal({ children, className }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (typeof IntersectionObserver === "undefined") {
      // No external system to subscribe to here, but setState still needs
      // to happen inside a callback rather than synchronously in the
      // effect body (react-hooks/set-state-in-effect) — a 0ms timeout is
      // the standard way to satisfy that without any visible delay.
      const timeoutId = window.setTimeout(() => setVisible(true), 0);
      return () => window.clearTimeout(timeoutId);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.1 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      // Plain, unscoped attribute (CSS Modules hashes styles.reveal's actual
      // class name per build) — the consuming app's global noscript
      // fallback targets this instead, since it can't reference a hashed
      // name it doesn't know at author time.
      data-reveal="true"
      className={classNames(styles.reveal, visible && styles.visible, className)}
    >
      {children}
    </div>
  );
}
