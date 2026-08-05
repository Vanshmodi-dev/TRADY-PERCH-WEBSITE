"use client";

import { useCallback, useEffect, useRef, type ReactNode } from "react";

/**
 * Gives the project grid its pointer-reactive depth: a card tilts fractionally
 * toward the cursor and a specular highlight tracks it across the surface.
 *
 * ── Why one component wrapping the whole grid ─────────────────────────────
 *
 * The obvious implementation makes each card a client component with its own
 * `onMouseMove`. On a nine-card grid that is nine hydration roots and nine
 * listeners to support an effect only ever visible on one card at a time.
 *
 * This is a single client boundary with a single delegated `pointermove` on
 * the container. The cards themselves stay Server Components — they are
 * passed through as `children`, already rendered on the server, so none of
 * their markup, copy or SVG enters the client bundle. What ships is this
 * file.
 *
 * ── Why CSS custom properties rather than React state ─────────────────────
 *
 * Pointer position updates at display refresh rate. Routing that through
 * `useState` would re-render the subtree up to 120 times a second. Instead the
 * handler writes `--pointer-x`/`--pointer-y` straight onto the hovered card's
 * style, and the stylesheet does the rest — no React work per frame, and the
 * transform composites on the GPU.
 */

/** Peak tilt in degrees at a card's corner. Deliberately tiny: past about
 *  1.5deg the effect stops reading as depth and starts reading as a gimmick. */
const MAX_TILT_DEGREES = 1.4;

interface ProjectPointerFieldProps {
  children: ReactNode;
  className?: string;
}

export function ProjectPointerField({ children, className }: ProjectPointerFieldProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  /** The card currently carrying pointer variables, so it can be cleaned up
   *  when the pointer moves to a different card or leaves entirely. */
  const activeCardRef = useRef<HTMLElement | null>(null);
  /**
   * The active card's geometry, measured once when the pointer enters it.
   *
   * `getBoundingClientRect()` forces the browser to flush pending layout
   * before it can answer. Calling it on every `pointermove` — up to 120 times
   * a second on a high-refresh display — turns a cosmetic effect into a
   * per-frame synchronous reflow. The rect only changes when the card
   * changes, so it is read once per card and reused.
   */
  const boundsRef = useRef<DOMRect | null>(null);
  /** Coalesces bursts of pointermove into one write per animation frame. */
  const frameRef = useRef<number | null>(null);
  const pendingRef = useRef<{ card: HTMLElement; x: number; y: number } | null>(null);

  const clearCard = useCallback((card: HTMLElement | null) => {
    if (!card) return;
    card.style.removeProperty("--pointer-x");
    card.style.removeProperty("--pointer-y");
    card.style.removeProperty("--tilt-x");
    card.style.removeProperty("--tilt-y");
    card.removeAttribute("data-pointer-active");
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Ch.15 Mt-4 / Ag-3. A media query cannot switch off a JS listener, so
    // reduced motion is honoured here explicitly — and by subscribing to
    // `change` rather than reading once, so toggling the OS setting takes
    // effect without a reload.
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    // Coarse pointers (touch) fire pointermove only mid-drag, which would make
    // a card tilt while someone is trying to scroll past it. Hover-capable
    // devices only.
    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)");

    const isEnabled = () => canHover.matches && !reducedMotion.matches;

    const flush = () => {
      frameRef.current = null;
      const pending = pendingRef.current;
      if (!pending) return;
      const { card, x, y } = pending;

      card.style.setProperty("--pointer-x", `${(x * 100).toFixed(2)}%`);
      card.style.setProperty("--pointer-y", `${(y * 100).toFixed(2)}%`);
      // Rotation is inverted relative to the axis it reads from: pointer to
      // the right should push the card's right edge *away*, which is a
      // negative Y rotation. Getting this backwards produces an effect that
      // feels subtly wrong without being obviously broken.
      card.style.setProperty("--tilt-y", `${((x - 0.5) * 2 * MAX_TILT_DEGREES).toFixed(3)}deg`);
      card.style.setProperty("--tilt-x", `${((0.5 - y) * 2 * MAX_TILT_DEGREES).toFixed(3)}deg`);
      card.setAttribute("data-pointer-active", "true");
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (!isEnabled()) return;

      const target = event.target;
      const card =
        target instanceof Element ? target.closest<HTMLElement>("[data-project-card]") : null;

      if (card !== activeCardRef.current) {
        clearCard(activeCardRef.current);
        activeCardRef.current = card;
        // Measured once, on entry — see boundsRef.
        boundsRef.current = card?.getBoundingClientRect() ?? null;
      }
      if (!card) return;

      const bounds = boundsRef.current;
      if (!bounds || bounds.width === 0 || bounds.height === 0) return;

      pendingRef.current = {
        card,
        x: (event.clientX - bounds.left) / bounds.width,
        y: (event.clientY - bounds.top) / bounds.height,
      };
      frameRef.current ??= requestAnimationFrame(flush);
    };

    const handlePointerLeave = () => {
      clearCard(activeCardRef.current);
      activeCardRef.current = null;
      boundsRef.current = null;
      pendingRef.current = null;
    };

    /**
     * A DOMRect is viewport-relative, so scrolling or resizing invalidates the
     * cached one without any pointer event firing. Without this the tilt
     * drifts further from the cursor the more the page scrolls under it.
     *
     * Only the cache is dropped, not the active card: the next `pointermove`
     * re-measures, so this stays a single cheap write rather than a
     * measurement of its own on every scroll frame.
     */
    const invalidateBounds = () => {
      boundsRef.current = null;
    };

    // `passive` — this handler never calls preventDefault, and saying so lets
    // the browser keep scrolling off the main thread.
    container.addEventListener("pointermove", handlePointerMove, { passive: true });
    container.addEventListener("pointerleave", handlePointerLeave);
    // Tab-away leaves the last card stuck mid-tilt otherwise.
    window.addEventListener("blur", handlePointerLeave);
    reducedMotion.addEventListener("change", handlePointerLeave);
    window.addEventListener("scroll", invalidateBounds, { passive: true });
    window.addEventListener("resize", invalidateBounds, { passive: true });

    return () => {
      container.removeEventListener("pointermove", handlePointerMove);
      container.removeEventListener("pointerleave", handlePointerLeave);
      window.removeEventListener("blur", handlePointerLeave);
      reducedMotion.removeEventListener("change", handlePointerLeave);
      window.removeEventListener("scroll", invalidateBounds);
      window.removeEventListener("resize", invalidateBounds);
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
      clearCard(activeCardRef.current);
    };
  }, [clearCard]);

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
}
