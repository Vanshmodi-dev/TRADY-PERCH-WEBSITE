"use client";

import { useEffect, useRef, useState } from "react";
import {
  CURSOR_SELECTOR,
  DEFAULT_PROFILE,
  PYRAMID_RADIUS,
  profileFor,
  projectPyramid,
  type CursorProfile,
} from "./cursor-geometry";
import styles from "./site-cursor.module.css";

/**
 * THE PYRAMID CURSOR.
 *
 * A holographic wireframe of the brand's own object, suspended beside the
 * pointer. It is the smallest place the Apex appears and the only one a
 * visitor carries with them across every page.
 *
 * ── What it deliberately is not ───────────────────────────────────────────
 *
 * It does not replace the system cursor. Hiding the native pointer is the
 * usual version of this effect and it is a bad trade: the replacement runs a
 * frame behind on any loaded page, it vanishes over native UI (selects,
 * scrollbars, browser chrome), and a visitor who has set a large or
 * high-contrast pointer at the OS level — which people do for reasons — loses
 * it entirely. The real pointer keeps every one of its affordances; this is
 * a second object that travels with it.
 *
 * That also makes the whole feature optional by construction. If it never
 * renders, nothing is missing.
 *
 * ── Why the pyramid is projected rather than drawn ────────────────────────
 *
 * See cursor-geometry.ts. Short version: a flat triangle that spins reads as
 * a rotating sticker; a projected solid reads as an object turning in space.
 * Five vertices per frame is the entire cost of the difference.
 *
 * ── The frame budget ──────────────────────────────────────────────────────
 *
 * Everything that moves is `transform` or `opacity` on an element that already
 * has its own compositor layer — no layout is read or written anywhere in the
 * loop except once per pointer-target change, when the new target's box is
 * measured for the magnetic pull.
 *
 * The one exception is the wireframe's own `d`, rewritten each frame because
 * there is no other way to rotate a projected solid. That dirties a 26px box
 * and nothing else: ~2,700 device pixels of raster, entirely inside a layer
 * that is already composited separately from the page.
 *
 * The loop parks itself whenever the pointer leaves the window or the tab
 * goes to the background, so an unattended tab costs nothing at all.
 */

/**
 * Motion time constants, in ms. Each is a time-to-settle, not a per-frame
 * fraction, so the feel is identical on a 60Hz panel and a 144Hz one.
 */
const FOLLOW_TAU = 68; /* The brief's 50–80ms trail. */
const PROFILE_TAU = 170; /* State blending — never a snap. */
const MAGNET_TAU = 190;

/** Idle → scanning. */
const IDLE_DELAY_MS = 2500;
/** Total length of one scan. Runs once, then waits for the pointer to move. */
const SCAN_MS = 2400;

/** Resting yaw rate, rad/s. ~18s per revolution: alive, not animated. */
const BASE_SPIN = 0.35;

/** Maximum magnetic pull toward a target's centre, px. */
const MAGNET_MAX = 8;

/**
 * Where the pyramid sits relative to the pointer's hotspot.
 *
 * It rides BESIDE the pointer, not on it, and that is the difference between
 * a companion and an obstruction. Centred on the hotspot — which is where
 * this first landed — a 22px object sits squarely on top of whatever is being
 * pointed at: over a button it covers two letters of the label, over a link it
 * covers the word. The visitor's own target is the one thing a cursor
 * affordance must never hide.
 *
 * Up and to the right specifically, because the system arrow's tip is the
 * hotspot and its body extends down-and-right from there. Up-right is the
 * quadrant the native pointer does not occupy, so the two never overlap and
 * the pair reads as one assembly rather than as two things colliding.
 */
const OFFSET_X = 17;
const OFFSET_Y = -15;

/** Click flash. */
const RIPPLE_MS = 160;

/** Trail. */
const PARTICLE_COUNT = 7;
const PARTICLE_LIFE_MS = 460;
/** Distance the pyramid must travel before another particle is shed. */
const PARTICLE_SPACING = 7;

interface Particle {
  x: number;
  y: number;
  born: number;
  /** 0 = white, 1 = blue. Alternating gives the trail two temperatures. */
  tone: number;
  alive: boolean;
}

export function SiteCursor() {
  const [enabled, setEnabled] = useState(false);
  const [reduced, setReduced] = useState(false);

  /*
   * Desktop only, and re-read live so a visitor who plugs in a mouse — or
   * changes the motion preference — gets the right answer without a reload.
   *
   * `(pointer: fine) and (hover: hover)` is the real test for "has a mouse".
   * A tablet with a stylus reports `fine` but not `hover`; a phone reports
   * neither. Neither should ever see this.
   */
  useEffect(() => {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") return;

    const desktop = window.matchMedia("(pointer: fine) and (hover: hover)");
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const sync = () => {
      setEnabled(desktop.matches);
      setReduced(motion.matches);
    };
    sync();

    desktop.addEventListener("change", sync);
    motion.addEventListener("change", sync);
    return () => {
      desktop.removeEventListener("change", sync);
      motion.removeEventListener("change", sync);
    };
  }, []);

  if (!enabled) return null;
  return <CursorField reduced={reduced} />;
}

/**
 * Split from the gate so that every ref, listener and animation frame below
 * is created only once the environment has qualified — and torn down
 * completely, rather than left idling, if it stops qualifying.
 */
function CursorField({ reduced }: { reduced: boolean }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const haloRef = useRef<HTMLSpanElement>(null);
  const rippleRef = useRef<HTMLSpanElement>(null);
  const glyphRef = useRef<SVGSVGElement>(null);
  const baseRef = useRef<SVGPathElement>(null);
  const hipsRef = useRef<SVGPathElement>(null);
  const bloomRef = useRef<SVGPathElement>(null);
  const ruleRef = useRef<SVGLineElement>(null);
  const particleRefs = useRef<Array<HTMLSpanElement | null>>([]);

  useEffect(() => {
    const root = rootRef.current;
    const body = bodyRef.current;
    const halo = haloRef.current;
    const ripple = rippleRef.current;
    const glyph = glyphRef.current;
    const base = baseRef.current;
    const hips = hipsRef.current;
    const bloom = bloomRef.current;
    const rule = ruleRef.current;
    if (!root || !body || !halo || !ripple || !glyph || !base || !hips || !bloom || !rule) return;

    /* Both `classList.add("")` and `.remove("")` throw a SyntaxError, and
       passing `undefined` silently inserts the literal string "undefined".
       Read and check once up front: if the stylesheet has not resolved, the
       cursor simply does not run — it is an optional affordance, and a
       half-styled one would be worse than none. */
    const visibleClass = styles.visible;
    const rippleClass = styles.rippleActive;
    if (!visibleClass || !rippleClass) return;

    /* ── State ─────────────────────────────────────────────────────────── */

    const pointer = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    /** Where the pyramid actually is — always trailing `pointer`. */
    const at = { x: pointer.x, y: pointer.y };
    /** Magnetic offset, eased separately so it blends rather than jumps. */
    const magnet = { x: 0, y: 0, targetX: 0, targetY: 0 };

    const current: CursorProfile = { ...DEFAULT_PROFILE };
    let target: CursorProfile = DEFAULT_PROFILE;
    /** Element under the pointer, kept so its box can be re-measured. */
    let magnetTarget: Element | null = null;
    /** Extra glow while inside the hero. */
    let zoneGlow = 1;
    /** Signed multiplier — the Apex turns one way, and so does the cursor. */
    let spinDirection = 1;

    let yaw = Math.PI * 0.12;
    let elapsed = 0;
    let lastMove = performance.now();
    let scanStart = 0;
    let rippleUntil = 0;

    const particles: Particle[] = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: 0,
      y: 0,
      born: 0,
      tone: 0,
      alive: false,
    }));
    let particleCursor = 0;
    let shedFrom = { x: at.x, y: at.y };

    let frame = 0;
    let running = false;
    let visible = false;

    /* ── Target resolution ─────────────────────────────────────────────── */

    const applyTarget = (node: EventTarget | null) => {
      const element = node instanceof Element ? node.closest(CURSOR_SELECTOR) : null;

      /* Hero glow is a zone, not a target: it applies to everything inside
         the section, including the empty space between the type and the
         object. Read from the raw node, not the resolved target. */
      const zone = node instanceof Element ? node.closest("[data-cursor-zone='hero']") : null;
      zoneGlow = zone ? 1.35 : 1;

      if (!element) {
        target = DEFAULT_PROFILE;
        magnetTarget = null;
        magnet.targetX = 0;
        magnet.targetY = 0;
        spinDirection = 1;
        return;
      }

      target = profileFor(element);
      /* The hero object turns anticlockwise (apex-config RATES.shellYaw is
         positive about Y, which projects as a leftward drift at this
         elevation). Matching its sign for as long as the pointer is over it
         is the whole "synchronise" effect — the two objects briefly agree. */
      spinDirection = element.matches("[data-cursor='apex']") ? -1 : 1;

      if (!target.magnetic) {
        magnetTarget = null;
        magnet.targetX = 0;
        magnet.targetY = 0;
        return;
      }
      magnetTarget = element;
    };

    /** One layout read, only while over a magnetic target. */
    const measureMagnet = () => {
      if (!magnetTarget) return;
      const box = magnetTarget.getBoundingClientRect();
      const toX = box.left + box.width / 2 - pointer.x;
      const toY = box.top + box.height / 2 - pointer.y;
      const distance = Math.hypot(toX, toY);
      if (distance < 0.5) {
        magnet.targetX = 0;
        magnet.targetY = 0;
        return;
      }
      /* Clamped to an absolute maximum rather than taken as a fraction of the
         distance: a fraction of a wide button's half-width is a large number,
         and a cursor that slides 40px off the pointer has stopped telling the
         visitor where they are pointing. */
      const pull = Math.min(MAGNET_MAX, distance * 0.35);
      magnet.targetX = (toX / distance) * pull;
      magnet.targetY = (toY / distance) * pull;
    };

    /* ── The loop ──────────────────────────────────────────────────────── */

    let lastTime = 0;

    const tick = (now: number) => {
      const delta = Math.min(48, lastTime ? now - lastTime : 16.7);
      lastTime = now;
      elapsed += delta;

      /* Framerate-corrected exponential approach. `1 - e^(-dt/tau)` gives the
         same settle time at any refresh rate, where a fixed per-frame
         fraction would make the cursor four times snappier on a 240Hz panel. */
      const follow = 1 - Math.exp(-delta / FOLLOW_TAU);
      const blend = 1 - Math.exp(-delta / PROFILE_TAU);
      const magnetBlend = 1 - Math.exp(-delta / MAGNET_TAU);

      /* ── Idle → scanning ── */
      let scanGlow = 0;
      let scanSpin = 0;
      if (!reduced) {
        const idleFor = now - lastMove;
        if (idleFor > IDLE_DELAY_MS) {
          if (scanStart === 0) scanStart = now;
          const t = (now - scanStart) / SCAN_MS;
          if (t < 1) {
            /* Four movements, deliberately gentle. Brighten, breathe twice,
               a short turn, then settle — the object noticing that nothing
               has happened, not an animation demanding attention. */
            if (t < 0.17) {
              scanGlow = (t / 0.17) * 0.55;
            } else if (t < 0.58) {
              const pulse = (t - 0.17) / 0.41;
              scanGlow = 0.55 + Math.sin(pulse * Math.PI * 2) * 0.3;
            } else if (t < 0.84) {
              scanGlow = 0.55;
              /* Eased in and out, so the scan turn starts and stops as
                 smoothly as it runs. */
              scanSpin = Math.sin(((t - 0.58) / 0.26) * Math.PI) * 2.6;
            } else {
              scanGlow = 0.55 * (1 - (t - 0.84) / 0.16);
            }
          }
        } else {
          scanStart = 0;
        }
      }

      /* ── Position ── */
      magnet.x += (magnet.targetX - magnet.x) * magnetBlend;
      magnet.y += (magnet.targetY - magnet.y) * magnetBlend;

      const goalX = pointer.x + magnet.x;
      const goalY = pointer.y + magnet.y;
      at.x += (goalX - at.x) * follow;
      at.y += (goalY - at.y) * follow;

      /* ── Profile blending ── */
      current.scale += (target.scale - current.scale) * blend;
      current.glow += (target.glow - current.glow) * blend;
      current.opacity += (target.opacity - current.opacity) * blend;
      current.spin += (target.spin - current.spin) * blend;

      /* ── Rotation and float ── */
      const seconds = delta / 1000;
      yaw += (BASE_SPIN * current.spin * spinDirection + scanSpin) * seconds;

      /* Two incommensurate periods, so the bob never repeats on a rhythm a
         visitor can learn. Suppressed entirely under reduced motion. */
      const bob = reduced
        ? 0
        : Math.sin(elapsed * 0.0019) * 0.9 + Math.sin(elapsed * 0.0011) * 0.5;
      const wobble = reduced ? 0 : Math.sin(elapsed * 0.00042) * 0.16;

      /* ── Write ── */
      /* The drawn position, offset off the hotspot so the object never covers
         the thing being pointed at. Everything that belongs to the pyramid —
         including the particles it sheds — is placed from here, so the trail
         leaves the object rather than the pointer. */
      const drawX = at.x + OFFSET_X;
      const drawY = at.y + bob + OFFSET_Y;

      body.style.transform = `translate3d(${drawX.toFixed(2)}px, ${drawY.toFixed(2)}px, 0)`;
      glyph.style.transform = `scale(${current.scale.toFixed(3)})`;
      glyph.style.opacity = current.opacity.toFixed(3);

      const paths = projectPyramid(yaw + wobble);
      base.setAttribute("d", paths.base);
      hips.setAttribute("d", paths.hips);
      bloom.setAttribute("d", paths.base + paths.hips);

      const clickGlow = now < rippleUntil ? 0.9 : 0;
      const glowStrength = current.glow * zoneGlow + scanGlow + clickGlow;
      halo.style.opacity = Math.min(1, glowStrength * 0.34).toFixed(3);
      halo.style.transform = `scale(${(0.75 + glowStrength * 0.34).toFixed(3)})`;

      rule.style.opacity = target.underline ? "0.85" : "0";
      rule.style.transform = `scaleX(${target.underline ? 1 : 0.2})`;

      /* ── Trail ── */
      if (!reduced) {
        const travelled = Math.hypot(at.x - shedFrom.x, at.y - shedFrom.y);
        if (travelled > PARTICLE_SPACING) {
          const particle = particles[particleCursor];
          if (particle) {
            particle.x = drawX;
            particle.y = drawY;
            particle.born = now;
            particle.tone = particleCursor % 2;
            particle.alive = true;
            /* Written here rather than in the frame loop below: the tone
               changes once per particle lifetime, so writing it every frame
               would be seven needless attribute mutations per frame. */
            const node = particleRefs.current[particleCursor];
            if (node) node.dataset.tone = String(particle.tone);
          }
          particleCursor = (particleCursor + 1) % PARTICLE_COUNT;
          shedFrom = { x: at.x, y: at.y };
        }

        for (let index = 0; index < PARTICLE_COUNT; index += 1) {
          const particle = particles[index];
          const node = particleRefs.current[index];
          if (!particle || !node) continue;
          if (!particle.alive) continue;

          const age = (now - particle.born) / PARTICLE_LIFE_MS;
          if (age >= 1) {
            particle.alive = false;
            node.style.opacity = "0";
            continue;
          }
          /* Quadratic fade and a shrink: a particle that fades linearly reads
             as a hard-edged dot switching off, where one that shrinks as it
             goes reads as dissipating. */
          const fade = (1 - age) * (1 - age);
          node.style.opacity = (fade * 0.42).toFixed(3);
          node.style.transform = `translate3d(${particle.x.toFixed(1)}px, ${particle.y.toFixed(1)}px, 0) scale(${(0.35 + fade * 0.65).toFixed(2)})`;
        }
      }

      frame = requestAnimationFrame(tick);
    };

    const start = () => {
      if (running) return;
      running = true;
      lastTime = 0;
      frame = requestAnimationFrame(tick);
    };

    const stop = () => {
      running = false;
      cancelAnimationFrame(frame);
    };

    /* ── Listeners ─────────────────────────────────────────────────────── */

    const onPointerMove = (event: PointerEvent) => {
      /* A pen or a touch contact is not a mouse. The pyramid is a mouse
         affordance and should not appear for either. */
      if (event.pointerType !== "mouse") return;

      pointer.x = event.clientX;
      pointer.y = event.clientY;
      lastMove = performance.now();
      scanStart = 0;

      applyTarget(event.target);
      measureMagnet();

      if (!visible) {
        visible = true;
        root.classList.add(visibleClass);
        /* Arrive at the pointer rather than flying in from wherever the
           object was parked. */
        at.x = pointer.x;
        at.y = pointer.y;
        shedFrom = { x: at.x, y: at.y };
      }
      start();
    };

    const onPointerDown = (event: PointerEvent) => {
      if (event.pointerType !== "mouse" || reduced) return;
      rippleUntil = performance.now() + RIPPLE_MS;
      /* Restarting a CSS animation requires the class to be removed, layout
         to be flushed, and the class re-added — without the reflow read the
         browser coalesces the two mutations and nothing replays. */
      ripple.classList.remove(rippleClass);
      void ripple.offsetWidth;
      ripple.classList.add(rippleClass);
    };

    const onPointerOut = (event: PointerEvent) => {
      /* Only when the pointer genuinely leaves the window, not when it
         crosses into a child element. */
      if (event.relatedTarget !== null) return;
      visible = false;
      root.classList.remove(visibleClass);
      stop();
    };

    /* The pointer can end up over a different element without moving — a
       scroll, or a menu opening under it. Re-resolving keeps the cursor
       honest about what it is actually over, and re-measures the magnet
       whose box has just moved.

       Coalesced into one animation frame, which is not a micro-optimisation:
       `elementFromPoint` performs a hit test and `getBoundingClientRect`
       reads geometry, and both force the browser to flush pending style and
       layout before they can answer. Run straight off the scroll event they
       do that on every scroll tick — up to 120 times a second on a
       high-refresh display — which is a synchronous reflow on the one code
       path where the main thread is already busiest. The scroll listener is
       `passive`, so this never blocked scrolling itself, but it did spend
       main-thread time against INP for a decorative affordance.

       This is the same rAF-coalescing shape `features/projects/
       project-pointer-field.tsx` already applies for exactly this reason;
       the cursor was the one place it was missing. */
    let scrollFrame = 0;
    const onScroll = () => {
      if (scrollFrame) return;
      scrollFrame = requestAnimationFrame(() => {
        scrollFrame = 0;
        applyTarget(document.elementFromPoint(pointer.x, pointer.y));
        measureMagnet();
      });
    };

    const onVisibility = () => {
      if (document.visibilityState === "visible") {
        if (visible) start();
      } else {
        stop();
      }
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerdown", onPointerDown, { passive: true });
    document.addEventListener("pointerout", onPointerOut);
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      stop();
      if (scrollFrame) cancelAnimationFrame(scrollFrame);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("pointerout", onPointerOut);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [reduced]);

  const extent = PYRAMID_RADIUS * 2.4;

  return (
    <div ref={rootRef} className={styles.root} aria-hidden="true">
      {/* The trail. A fixed pool, never allocated per particle — a cursor
          effect that creates garbage on every mouse move is a cursor effect
          that causes a GC pause on every mouse move. */}
      {!reduced &&
        Array.from({ length: PARTICLE_COUNT }, (_, index) => (
          <span
            key={index}
            ref={(node) => {
              particleRefs.current[index] = node;
            }}
            className={styles.particle}
            data-tone="0"
          />
        ))}

      <div ref={bodyRef} className={styles.body}>
        <span ref={haloRef} className={styles.halo} />
        <span ref={rippleRef} className={styles.ripple} />

        <svg
          ref={glyphRef}
          className={styles.glyph}
          viewBox={`${-extent} ${-extent} ${extent * 2} ${extent * 2}`}
          width={extent * 2}
          height={extent * 2}
          fill="none"
          focusable="false"
        >
          {/* Painted back to front: a wide, low-opacity blue pass under the
              wire gives the edges their bloom without a filter — the same
              read as a glow, at none of the per-frame cost, on an element
              whose geometry is already being rewritten every frame. */}
          <path ref={bloomRef} className={styles.bloom} />
          <path ref={baseRef} className={styles.base} />
          <path ref={hipsRef} className={styles.hips} />
          {/* Navigation hint — see site-cursor.module.css for why this lives
              on the cursor rather than on the nav link. */}
          <line
            ref={ruleRef}
            className={styles.rule}
            x1={-PYRAMID_RADIUS}
            y1={PYRAMID_RADIUS * 1.55}
            x2={PYRAMID_RADIUS}
            y2={PYRAMID_RADIUS * 1.55}
          />
        </svg>
      </div>
    </div>
  );
}
