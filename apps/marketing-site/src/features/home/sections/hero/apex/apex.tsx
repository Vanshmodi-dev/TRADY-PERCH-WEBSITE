"use client";

/**
 * THE APEX — the public component.
 *
 * Everything to do with *whether* the object renders lives here, and nothing
 * to do with what it looks like. The scene itself is a separate chunk that is
 * fetched only once four conditions hold:
 *
 *   1. The browser can actually give us a WebGL context.
 *   2. The hero is on screen, or nearly.
 *   3. The main thread is idle.
 *   4. The component is mounted on the client.
 *
 *   5. The intro overlay is no longer covering the screen.
 *
 * That ordering is deliberate and it is the whole performance argument. A
 * renderer is the heaviest thing this site ships; the claim, the qualifier and
 * both calls to action are server-rendered text that never waits for it, and
 * the object arrives afterwards, into a box that was already the right size.
 *
 * Condition 5 is the one that was missing, and its absence was expensive.
 * "Idle" was true 2.4s into the intro ceremony, so three.js began compiling
 * behind an opaque full-screen overlay — paying the full cost of a renderer
 * nobody could see, while starving the ceremony's own clock. See
 * ../intro-gate.ts for the measurement.
 *
 * Ch.22 Td-6: no render may gate, obscure or delay the primary claim. Ch.22
 * Td-5: the still frame carries the composition unaided — which is why the
 * poster is not a placeholder but a designed presentation in its own right.
 */

import dynamic from "next/dynamic";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import {
  introGateServerSnapshot,
  isIntroGateHeld,
  subscribeToIntroGate,
} from "../intro-gate";
import styles from "./apex.module.css";

const ApexScene = dynamic(() => import("./apex-scene"), { ssr: false });

/** How far ahead of the viewport the renderer starts loading. */
const PRELOAD_MARGIN = "220px";
/** Backstop for requestIdleCallback on a permanently busy main thread. */
const IDLE_TIMEOUT_MS = 2400;

/*
 * Reduced motion, as an external store rather than an effect that sets state.
 *
 * The preference is browser state, not React state, so it is subscribed to
 * rather than copied — which means a visitor who turns it on mid-session gets
 * the still immediately, with no reload and no cascading render. The server
 * snapshot is `false`: reduced motion cannot be known before hydration, and
 * the object's motion is additive, so guessing "moving" and correcting is the
 * safe direction to be wrong in.
 */
const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";
let reducedMotionQuery: MediaQueryList | null = null;

function reducedMotionMedia(): MediaQueryList {
  reducedMotionQuery ??= window.matchMedia(REDUCED_MOTION);
  return reducedMotionQuery;
}

function subscribeToReducedMotion(onChange: () => void): () => void {
  const query = reducedMotionMedia();
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(
    subscribeToReducedMotion,
    () => reducedMotionMedia().matches,
    () => false,
  );
}

function canRenderWebGl(): boolean {
  if (typeof document === "undefined") return false;
  try {
    const probe = document.createElement("canvas");
    return Boolean(
      probe.getContext("webgl2") ??
        probe.getContext("webgl") ??
        probe.getContext("experimental-webgl"),
    );
  } catch {
    // Some privacy configurations throw rather than returning null.
    return false;
  }
}

export function HeroApex() {
  const stageRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [ready, setReady] = useState(false);
  const [visible, setVisible] = useState(true);
  const [foreground, setForeground] = useState(true);

  /* Ch.15 Mt-4: motion is removed, the object is not. */
  const still = usePrefersReducedMotion();

  /* Held while the intro overlay is up. Subscribed rather than read once, so
     the observer below is re-armed the moment the ceremony ends. */
  const introHeld = useSyncExternalStore(
    subscribeToIntroGate,
    isIntroGateHeld,
    introGateServerSnapshot,
  );

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage || introHeld || !canRenderWebGl()) return;

    let idleHandle: number | null = null;
    let cancelled = false;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;
        setVisible(entry.isIntersecting);

        if (!entry.isIntersecting || idleHandle !== null) return;
        // Only ever scheduled once. The renderer is fetched when the main
        // thread has nothing better to do, so it competes with neither the
        // page's own hydration nor its first interaction.
        const schedule = window.requestIdleCallback?.bind(window);
        idleHandle = schedule
          ? schedule(() => !cancelled && setMounted(true), { timeout: IDLE_TIMEOUT_MS })
          : window.setTimeout(() => !cancelled && setMounted(true), 200);
      },
      { rootMargin: PRELOAD_MARGIN, threshold: 0 },
    );

    observer.observe(stage);

    const onVisibilityChange = () => setForeground(document.visibilityState === "visible");
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      cancelled = true;
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibilityChange);
      if (idleHandle !== null) {
        if (window.cancelIdleCallback) window.cancelIdleCallback(idleHandle);
        else window.clearTimeout(idleHandle);
      }
    };
  }, [introHeld]);

  return (
    /* `data-cursor="apex"` is what lets the cursor's own pyramid pick up this
       object's rotation direction while the pointer is over it. The two
       briefly turn the same way — a harmony that is felt rather than
       noticed. See shared/components/site-cursor.tsx. */
    <div ref={stageRef} className={styles.stage} aria-hidden="true" data-cursor="apex">
      {/* The designed still. First byte of HTML, never moves, and the only
          thing on screen if WebGL never arrives. */}
      <div className={styles.poster} data-ready={ready}>
        <div className={styles.pool} />
        <div className={styles.shell}>
          <div className={styles.aperture}>
            <div className={styles.core} />
          </div>
        </div>
        <div className={styles.plinth} />
      </div>

      {mounted && (
        <div className={styles.canvas} data-ready={ready}>
          <ApexScene
            still={still}
            active={visible && foreground}
            onReady={() => setReady(true)}
          />
        </div>
      )}
    </div>
  );
}
