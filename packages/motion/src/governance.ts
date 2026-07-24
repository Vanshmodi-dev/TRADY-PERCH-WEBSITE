// Hand-authored (not generated) — encodes Design System Bible Ch.40's
// Animation Governance Rules as machine-checkable constants and helpers.

/**
 * Ag-1 — the closed set of CSS properties that may ever animate, system-wide.
 * Named in camelCase (DOM/CSSOM style-property convention, e.g.
 * `element.style.backgroundColor`, matching what JS animation libraries
 * like Framer Motion accept) rather than kebab-case CSS syntax
 * (`background-color`) — this constant is for JS/TS consumers, not for
 * generating CSS strings.
 */
export const ANIMATABLE_PROPERTIES = [
  "opacity",
  "transform", // translate/scale only — never skew (Ag-1)
  "color",
  "backgroundColor",
  "borderColor",
  "boxShadow",
] as const;

export type AnimatableProperty = (typeof ANIMATABLE_PROPERTIES)[number];

/** Ag-2 — no more than three elements may animate simultaneously in one view. */
export const MAX_SIMULTANEOUS_ANIMATIONS = 3;

/** Mt-3 — the Ceremonial tier is reserved exclusively for the one-time intro sequence. */
export const CEREMONIAL_TIER_RESTRICTED_TO = "intro-sequence" as const;

export type MotionTier = "instant" | "quick" | "standard" | "deliberate" | "ceremonial";

/**
 * Ag-3 — reduced-motion compliance must be automatic and structural, never a
 * per-component decision a contributor could forget. Components should read
 * duration/easing through this helper (or the generated CSS custom
 * properties, which already resolve via `prefers-reduced-motion` media
 * queries in globals.css) rather than branching on their own.
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
