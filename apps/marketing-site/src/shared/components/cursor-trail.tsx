"use client";

import { useEffect, useRef, useState } from "react";
import {
  EMIT_DISTANCE,
  HOVER_INTERVAL_SCALE,
  HOVER_OPACITY_GAIN,
  HOVER_TAU_MS,
  IDLE_PARK_MS,
  INTERACTIVE_SELECTOR,
  MAX_FRAME_MS,
  MIN_EMIT_INTERVAL_MS,
  POOL_SIZE,
  TAIL_TAU_MS,
} from "./cursor-trail-config";
import {
  advanceParticle,
  createTrailPool,
  emitParticle,
  nextSlot,
  particleAlpha,
  particleScale,
} from "./cursor-trail-motion";
import styles from "./cursor-trail.module.css";

/**
 * THE GOLDEN TRAIL.
 *
 * A handful of very small gold particles, shed a beat behind the pointer and
 * drawn gently back toward it as they fade. It is the smallest brand gesture
 * on the site and the only one a visitor carries with them across every page.
 *
 * ── What it deliberately is not ───────────────────────────────────────────
 *
 * It does not replace the system cursor. Hiding the native pointer is the
 * usual version of this effect and it is a bad trade: the replacement runs a
 * frame behind on any loaded page, it vanishes over native UI (selects,
 * scrollbars, browser chrome), and a visitor who has set a large or
 * high-contrast pointer at the OS level — which people do for reasons — loses
 * it entirely. The real pointer keeps every one of its affordances; this is a
 * field of dust that it disturbs.
 *
 * That also makes the whole feature optional by construction. If it never
 * renders, nothing is missing — which is the test it has to pass, because on
 * touch devices and under reduced motion it never does.
 *
 * ── Why it reads as premium rather than as an effect ──────────────────────
 *
 * Three decisions, in order of how much they matter:
 *
 * 1. The particles are born at a point that LAGS the pointer, not at the
 *    pointer. The pointer stays exact and immediate; the field it leaves
 *    behind is soft and a beat late. That difference is the entire feeling.
 * 2. Density is capped in time, not only in space (MIN_EMIT_INTERVAL_MS), so
 *    a fast flick lengthens the trail instead of thickening it. Nothing the
 *    visitor can do produces a spray.
 * 3. Everything is small and dim enough to be missed on first glance. The
 *    effect is meant to be noticed after some seconds of moving the pointer,
 *    never on arrival.
 *
 * ── The frame budget ──────────────────────────────────────────────────────
 *
 * The loop performs NO layout reads. Not one — no `getBoundingClientRect`,
 * no `elementFromPoint`, no scroll listener, nothing that could force a
 * synchronous reflow. Positions come from `clientX`/`clientY` against a
 * `position: fixed` layer, so scrolling does not enter into it, and hover
 * state is resolved with `closest()` on the pointermove event's own target,
 * which is a tree walk rather than a hit test.
 *
 * Per frame the loop writes two composited properties — `transform` and
 * `opacity` — on at most POOL_SIZE 12px sprites that each already own their
 * layer. No React state is touched: the component renders once when the
 * environment qualifies and then never again.
 *
 * The loop parks itself as soon as the pointer is idle and the last particle
 * has died, so an unattended tab costs exactly zero frames.
 */
export function CursorTrail() {
  const [enabled, setEnabled] = useState(false);

  /*
   * Desktop pointers only, no reduced motion, and re-read live so a visitor
   * who plugs in a mouse — or changes the motion preference — gets the right
   * answer without a reload.
   *
   * `(pointer: fine) and (hover: hover)` is the real test for "has a mouse",
   * and it is a capability test rather than a width one: a tablet with a
   * stylus reports `fine` but not `hover`, a phone reports neither, and a
   * small desktop window reports both. Viewport width would get all three
   * wrong.
   *
   * Reduced motion removes the feature outright rather than damping it. What
   * is left after taking away the drift, the fade and the pull is a static
   * dot beside the pointer, which is not a quieter version of this effect —
   * it is a different and worse one.
   */
  useEffect(() => {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") return;

    const desktop = window.matchMedia("(pointer: fine) and (hover: hover)");
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const sync = () => setEnabled(desktop.matches && !motion.matches);
    sync();

    desktop.addEventListener("change", sync);
    motion.addEventListener("change", sync);
    return () => {
      desktop.removeEventListener("change", sync);
      motion.removeEventListener("change", sync);
    };
  }, []);

  if (!enabled) return null;
  return <TrailField />;
}

/**
 * Split from the gate so that every ref, listener and animation frame below
 * is created only once the environment has qualified — and torn down
 * completely, rather than left idling, if it stops qualifying.
 */
function TrailField() {
  const rootRef = useRef<HTMLDivElement>(null);
  const nodesRef = useRef<Array<HTMLSpanElement | null>>([]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const nodes = nodesRef.current;
    const pool = createTrailPool(POOL_SIZE);

    /** Live pointer position, in client coordinates. */
    const pointer = { x: 0, y: 0 };
    /** The lagging spawn point — see the note on TAIL_TAU_MS. */
    const tail = { x: 0, y: 0 };
    /** Last non-degenerate direction of travel, held so a particle emitted at
     *  the end of a movement still knows which way "backwards" was. */
    const heading = { x: 0, y: -1 };
    /** Where the pointer was when the last particle was shed. */
    const lastEmit = { x: 0, y: 0 };

    let hasPointer = false;
    let lastMove = 0;
    let lastEmitAt = 0;

    /** 0 → 1, eased. Interactive targets get a marginally warmer, marginally
     *  denser version of the same trail, never a different one. */
    let hover = 0;
    let hoverTarget = 0;

    let frame = 0;
    let running = false;
    let lastTime = 0;

    const stop = () => {
      running = false;
      cancelAnimationFrame(frame);
    };

    /* ── The loop ──────────────────────────────────────────────────────── */

    const tick = (now: number) => {
      const delta = Math.min(MAX_FRAME_MS, lastTime ? now - lastTime : 16.7);
      lastTime = now;

      /* Framerate-corrected exponential approach throughout: `1 - e^(-dt/tau)`
         settles in the same wall-clock time at any refresh rate, where a fixed
         per-frame fraction would make the trail four times snappier on a 240Hz
         panel than on a 60Hz one. */
      hover += (hoverTarget - hover) * (1 - Math.exp(-delta / HOVER_TAU_MS));

      const chase = 1 - Math.exp(-delta / TAIL_TAU_MS);
      tail.x += (pointer.x - tail.x) * chase;
      tail.y += (pointer.y - tail.y) * chase;

      /* ── Emission ── */
      if (hasPointer) {
        const travelled = Math.hypot(pointer.x - lastEmit.x, pointer.y - lastEmit.y);
        const interval = MIN_EMIT_INTERVAL_MS * (1 - hover * (1 - HOVER_INTERVAL_SCALE));

        if (travelled >= EMIT_DISTANCE && now - lastEmitAt >= interval) {
          /* Direction is taken from tail → pointer rather than from the raw
             pointer delta: the tail is already smoothed, so a jittery mouse
             cannot make consecutive particles fire in opposite directions. */
          const leadX = pointer.x - tail.x;
          const leadY = pointer.y - tail.y;
          const lead = Math.hypot(leadX, leadY);
          if (lead > 0.5) {
            heading.x = leadX / lead;
            heading.y = leadY / lead;
          }

          const index = nextSlot(pool);
          const particle = pool[index];
          const node = nodes[index];
          if (particle && node) {
            emitParticle(
              particle,
              { x: tail.x, y: tail.y, dirX: heading.x, dirY: heading.y },
              Math.random,
            );
            /* Written once per emission rather than per frame: the warmer
               sprite is a material choice made at birth, so this is ~17
               attribute writes a second at the very most, not 20 a frame. */
            node.dataset.hot = hover > 0.5 ? "1" : "0";
          }

          lastEmitAt = now;
          lastEmit.x = pointer.x;
          lastEmit.y = pointer.y;
        }
      }

      /* ── Integrate and draw ── */
      let active = 0;
      for (let index = 0; index < pool.length; index += 1) {
        const particle = pool[index];
        const node = nodes[index];
        if (!particle || !node || !particle.active) continue;

        if (!advanceParticle(particle, delta, pointer.x, pointer.y)) {
          /* The one write an expiring particle needs. Its alpha is already
             within a whisker of zero by here — this is bookkeeping, not the
             disappearance the visitor sees. */
          node.style.opacity = "0";
          continue;
        }

        active += 1;
        const alpha = particleAlpha(particle) * (1 + hover * (HOVER_OPACITY_GAIN - 1));
        node.style.opacity = alpha.toFixed(3);
        node.style.transform =
          `translate3d(${particle.x.toFixed(1)}px, ${particle.y.toFixed(1)}px, 0) ` +
          `scale(${particleScale(particle).toFixed(3)})`;
      }

      /* ── Park ── */
      if (active === 0 && (!hasPointer || now - lastMove > IDLE_PARK_MS)) {
        stop();
        return;
      }

      frame = requestAnimationFrame(tick);
    };

    const start = () => {
      if (running) return;
      running = true;
      lastTime = 0;
      frame = requestAnimationFrame(tick);
    };

    /** Return every slot to rest and blank every sprite. Used when the tab
     *  goes away, so coming back never reveals a frozen field. */
    const clear = () => {
      for (let index = 0; index < pool.length; index += 1) {
        const particle = pool[index];
        const node = nodes[index];
        if (particle) particle.active = false;
        if (node) node.style.opacity = "0";
      }
    };

    /* ── Listeners ─────────────────────────────────────────────────────── */

    const onPointerMove = (event: PointerEvent) => {
      /* A pen or a touch contact is not a mouse, and this is a mouse
         affordance. `(pointer: fine)` already gated the component, but a
         hybrid machine can produce all three kinds of event at once. */
      if (event.pointerType !== "mouse") return;

      pointer.x = event.clientX;
      pointer.y = event.clientY;
      lastMove = performance.now();

      if (!hasPointer) {
        /* Arrive where the pointer is rather than sweeping in from wherever
           the field was last parked. */
        hasPointer = true;
        tail.x = pointer.x;
        tail.y = pointer.y;
        lastEmit.x = pointer.x;
        lastEmit.y = pointer.y;
      }

      const element = event.target instanceof Element ? event.target : null;
      hoverTarget = element?.closest(INTERACTIVE_SELECTOR) ? 1 : 0;

      start();
    };

    const onPointerOut = (event: PointerEvent) => {
      /* Only when the pointer genuinely leaves the window, not when it
         crosses into a child element. */
      if (event.relatedTarget !== null) return;
      hasPointer = false;
      hoverTarget = 0;
      /* Deliberately no clear(): the particles already in the air finish
         their lifecycle and the field empties itself, exactly as it does
         every time the pointer stops moving. */
    };

    const onVisibility = () => {
      if (document.visibilityState === "visible") return;
      stop();
      clear();
      hasPointer = false;
      hover = 0;
      hoverTarget = 0;
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.addEventListener("pointerout", onPointerOut);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      stop();
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerout", onPointerOut);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <div ref={rootRef} className={styles.root} aria-hidden="true">
      {/* A fixed pool, never allocated per particle — a cursor effect that
          creates garbage on every mouse move is a cursor effect that causes a
          GC pause on every mouse move. Twenty 12px sprites is the entire DOM
          cost of the feature. */}
      {Array.from({ length: POOL_SIZE }, (_, index) => (
        <span
          key={index}
          ref={(node) => {
            nodesRef.current[index] = node;
          }}
          className={styles.particle}
          data-hot="0"
        />
      ))}
    </div>
  );
}
