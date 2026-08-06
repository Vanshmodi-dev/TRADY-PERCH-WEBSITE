"use client";

import { useEffect, useRef } from "react";
import { AmbientDust } from "./field-lines/ambient-dust";
import styles from "./hero-core.module.css";

/**
 * THE CORE — the hero's interactive object.
 *
 * A machined artefact: matte-black anodised housing, a precisely cut aperture,
 * brushed internals, and a gold element rotating behind it. The brand idea is
 * embedded in the construction — the housing is unremarkable and the gold is
 * *inside*. The value is in the system, not on its surface, and gold is not an
 * accent applied to a face but the light a working part emits.
 *
 * Interaction model: the pointer moves the LIGHT, never the object. Turning
 * the object to face the cursor is the conventional choice and it is the wrong
 * one — it reads as a toy, it is not what real objects do, and it reveals
 * nothing. Moving a key light across a machined surface reveals *material*,
 * which is the entire reason to have a machined surface.
 *
 * Damping is where the luxury lives. The light lerps toward the pointer with a
 * long tail, so it feels like swinging a heavy lamp rather than like a cursor
 * follower. Instant tracking would read as cheap no matter how good the
 * surface is.
 *
 * Everything that moves is a compositor-friendly transform, an opacity, or a
 * CSS custom property feeding a gradient position — no layout is read or
 * written in the pointer loop, so this holds frame rate under load.
 */

/** Lerp factor per frame toward the pointer target. Low on purpose. */
const LIGHT_DAMPING = 0.055;
/** Below this delta the loop parks itself — an idle hero costs nothing. */
const REST_EPSILON = 0.0006;

export function HeroCore() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const dustCanvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    // Coarse pointers have no hover to track, so the light stays at its
    // designed resting angle rather than jumping on every tap.
    const finePointer = window.matchMedia("(pointer: fine)");

    const dustCanvas = dustCanvasRef.current;
    const dust = dustCanvas ? new AmbientDust(dustCanvas) : null;
    let dustReady = false;

    const sizeDust = () => {
      if (!dust || !dustCanvas) return;
      const rect = root.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      const scale = Math.min(2, window.devicePixelRatio || 1);
      dustReady = dust.resize(rect.width, rect.height, scale);
    };

    sizeDust();

    // Resting light: upper-left, matching the key light the whole art
    // direction is built around.
    let targetX = -0.45;
    let targetY = -0.5;
    let currentX = targetX;
    let currentY = targetY;

    let frameId = 0;
    let running = false;

    const paint = () => {
      root.style.setProperty("--light-x", currentX.toFixed(4));
      root.style.setProperty("--light-y", currentY.toFixed(4));
      // Percentages for gradient positions, derived once here rather than in
      // four separate calc() expressions across the stylesheet.
      root.style.setProperty("--light-px", `${(currentX * 0.5 + 0.5) * 100}%`);
      root.style.setProperty("--light-py", `${(currentY * 0.5 + 0.5) * 100}%`);
      if (dust && dustReady) dust.render(currentX, currentY);
    };

    const tick = () => {
      const deltaX = targetX - currentX;
      const deltaY = targetY - currentY;

      if (Math.abs(deltaX) < REST_EPSILON && Math.abs(deltaY) < REST_EPSILON) {
        currentX = targetX;
        currentY = targetY;
        paint();
        running = false;
        return;
      }

      currentX += deltaX * LIGHT_DAMPING;
      currentY += deltaY * LIGHT_DAMPING;
      paint();
      frameId = requestAnimationFrame(tick);
    };

    const wake = () => {
      if (running) return;
      running = true;
      frameId = requestAnimationFrame(tick);
    };

    const onPointerMove = (event: PointerEvent) => {
      if (!finePointer.matches || reduceMotion.matches) return;
      const rect = root.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      // Normalised to -1..1 across the section, then softened so the light
      // never swings to a physically implausible grazing angle.
      targetX = ((event.clientX - rect.left) / rect.width - 0.5) * 1.6;
      targetY = ((event.clientY - rect.top) / rect.height - 0.5) * 1.4;
      wake();
    };

    const onPointerLeave = () => {
      targetX = -0.45;
      targetY = -0.5;
      wake();
    };

    let resizeFrame = 0;
    const onResize = () => {
      cancelAnimationFrame(resizeFrame);
      resizeFrame = requestAnimationFrame(() => {
        sizeDust();
        paint();
      });
    };

    paint();

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    root.addEventListener("pointerleave", onPointerLeave);
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(frameId);
      cancelAnimationFrame(resizeFrame);
      window.removeEventListener("pointermove", onPointerMove);
      root.removeEventListener("pointerleave", onPointerLeave);
      window.removeEventListener("resize", onResize);
      dust?.destroy();
    };
  }, []);

  return (
    <div ref={rootRef} className={styles.stage} aria-hidden="true">
      {/* Suspended dust — the flecks that never joined the wordmark. Sits
          behind the object and in front of the field, so the whole volume
          responds to the light rather than just the artefact. */}
      <canvas ref={dustCanvasRef} className={styles.dust} />

      {/* The volumetric key light, visible as a shaft because there is
          particulate in the air for it to strike. */}
      <div className={styles.beam} />

      <div className={styles.core}>
        {/* Depth layers. Each sits at its own translateZ and parallaxes by a
            different amount, which is what produces real dimensionality
            instead of a flat disc with a gradient on it. */}
        <div className={`${styles.layer} ${styles.housing}`} />
        <div className={`${styles.layer} ${styles.bezel}`} />
        <div className={`${styles.layer} ${styles.knurl}`} />
        <div className={`${styles.layer} ${styles.aperture}`}>
          {/* Gold from inside the machine: the working part, emitting
              outward through the cut. Not an accent on a surface. */}
          <div className={styles.emitter} />
          <div className={styles.rotor} />
        </div>
        <div className={`${styles.layer} ${styles.glass}`} />
        <div className={`${styles.layer} ${styles.rim}`} />
      </div>

      {/* Light spilling out of the aperture onto the air in front of the
          object. Anchored to the emitter, not to the pointer, so it stays
          physically consistent as the key light moves. */}
      <div className={styles.spill} />
    </div>
  );
}
