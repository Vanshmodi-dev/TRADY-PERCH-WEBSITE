import styles from "./intro-wordmark.module.css";

/**
 * THE WORDMARK — vector, not raster.
 *
 * ── Why this is an SVG and not styled HTML text ───────────────────────────
 *
 * The previous implementation was a `<p>` with a gradient clipped to the text
 * via `background-clip: text`. That technique is the reason the logo looked
 * noisy, and it is worth stating plainly because it is a common choice:
 *
 *   `background-clip: text` forces the glyph run through an alpha mask. In
 *   every current engine that mask is composited WITHOUT subpixel
 *   antialiasing — the text drops from LCD-optimised rendering to greyscale,
 *   and on a light-weight face at display size the stems visibly thin and
 *   fringe. Add an `opacity` transition and a `transform` on the ancestor
 *   (both of which the sequence has) and the element is promoted to its own
 *   layer, rasterised once at that layer's scale and then *resampled* for the
 *   rest of the animation. That resampling is the shimmer.
 *
 * Vector text in an inline `<svg>` has neither problem. The gradient is a real
 * paint server rather than a mask, so the glyphs are filled directly and stay
 * antialiased; and the element is re-rasterised at device resolution at every
 * step of a transform, so it stays sharp at any scale, on any pixel density,
 * through every frame of the pull-back.
 *
 * ── One run, not three ────────────────────────────────────────────────────
 *
 * Depth and glow are `drop-shadow()` filters on the single glyph run rather
 * than duplicated `<text>` layers behind it. Same result, a third of the
 * rasterisation, and — the reason it matters here — a filter operates on the
 * *rendered* glyphs, so the two effects can never drift out of register with
 * the face the way three independently positioned layers can.
 *
 * ── Alignment with the particle field ─────────────────────────────────────
 *
 * Size, weight and tracking are the CSS half of the contract stated in
 * field-lines/wordmark-field.ts (WORDMARK_TYPE) — the same numbers the
 * rasteriser shapes its poles from. The dust therefore settles into exactly
 * this outline.
 *
 * There is no `viewBox`: user units are CSS pixels, so the stylesheet's
 * `font-size` is the literal rendered size and matches the rasteriser's
 * metrics directly. A viewBox would put a scale factor between the two forms
 * and they would no longer sit on top of one another.
 */

export const WORDMARK = "TRADY PERCH";

/** Split for the per-letter reveal. */
const LETTERS = [...WORDMARK];

interface IntroWordmarkProps {
  /** True once the sweep has lit the solid form. */
  lit: boolean;
  /** Static (reduced-motion / no-canvas) presentation: no stagger at all. */
  immediate: boolean;
}

export function IntroWordmark({ lit, immediate }: IntroWordmarkProps) {
  return (
    <svg
      className={[styles.wordmark, lit && styles.lit, immediate && styles.immediate]
        .filter(Boolean)
        .join(" ")}
      /* The whole overlay is already `aria-hidden` and `role="presentation"`.
         The accessible name for this content is the real `<h1>` in the hero
         underneath, which is in the DOM from the first byte. */
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        {/* Brushed metal: cool at the shoulders, warm through the centre band.
            The band is what the sweep travels across — a flat fill has no
            grain for a raking light to find, and the sweep lands on nothing.
            Stop colours live in the stylesheet because `var()` does not
            resolve inside SVG presentation attributes. */}
        <linearGradient id="tp-wordmark-face" x1="0%" y1="0%" x2="100%" y2="26%">
          <stop className={styles.faceStopEdge} offset="0%" />
          <stop className={styles.faceStopMid} offset="38%" />
          <stop className={styles.faceStopCore} offset="50%" />
          <stop className={styles.faceStopMid} offset="62%" />
          <stop className={styles.faceStopEdge} offset="100%" />
        </linearGradient>
      </defs>

      <text
        className={styles.run}
        x="50%"
        y="50%"
        textAnchor="middle"
        /* `central` rather than `middle`: `middle` centres on the x-height's
           midpoint, which for an all-caps run sits noticeably above the
           optical centre. `central` uses the em box — which is also what the
           rasteriser's `textBaseline = "middle"` uses, so the two agree. */
        dominantBaseline="central"
        /* Without this, SVG's default whitespace handling collapses the
           single-space `<tspan>` between the words and the wordmark renders
           as "TRADYPERCH". */
        xmlSpace="preserve"
      >
        {LETTERS.map((letter, index) => (
          <tspan
            /* Index-keyed deliberately: this is a fixed literal string, so
               position IS identity — the "R" at 1 and the "R" at 8 are
               different letters carrying different delays. */
            key={`${letter}-${index}`}
            className={styles.letter}
            style={{ "--letter-index": index } as React.CSSProperties}
          >
            {letter}
          </tspan>
        ))}
      </text>
    </svg>
  );
}
