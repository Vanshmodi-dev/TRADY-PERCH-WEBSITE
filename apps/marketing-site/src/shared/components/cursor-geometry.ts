/**
 * THE CURSOR PYRAMID — geometry and behaviour profiles.
 *
 * Split from the component so the maths is testable and the numbers that
 * define the object's character sit in one readable block rather than being
 * scattered through a render loop.
 *
 * The pyramid is a real square-based pyramid projected to 2D every frame, not
 * a flat triangle that spins. That distinction is the whole effect: a spinning
 * triangle reads as a rotating sticker, while a projected solid reads as an
 * object turning in space — which is what makes it feel like the Apex in the
 * hero rather than like an icon.
 *
 * Proportion is borrowed deliberately from the hero object (apex-config.ts:
 * 1.2 base half-width to 1.84 height, a 57° rise). At cursor scale nobody
 * measures it, but the silhouette is the brand's one physical claim and the
 * cursor is the smallest place it appears.
 */

/** Base half-width, in CSS px. The object's whole size derives from this. */
export const PYRAMID_RADIUS = 9;

/** Height as a multiple of the base half-width — the hero object's own rise. */
const HEIGHT_RATIO = 1.533;

/**
 * How much of the depth axis folds into the vertical.
 *
 * This is the viewing elevation. At 0 the base collapses to a line and the
 * pyramid reads as a flat triangle; at 1 you are looking straight down at it.
 * 0.42 is roughly 25° above the horizon — the angle at which the base reads
 * unambiguously as a square in perspective and the two near hips still
 * separate from the two far ones.
 */
const TILT = 0.42;

export interface PyramidPaths {
  /** The four base edges, closed. */
  base: string;
  /** The four hips, apex to each base corner. */
  hips: string;
}

/**
 * Project the pyramid at a given yaw and return its two path strings.
 *
 * Five vertices, eight edges, no matrices — at this size a full 3D pipeline
 * would cost more to read than it could possibly save. Called once per frame;
 * the trigonometry is four sin/cos pairs.
 *
 * Coordinates are centred on (0, 0) so the object rotates about its own middle
 * and the wrapper's transform can place it directly on the pointer.
 */
export function projectPyramid(yaw: number, scale = 1): PyramidPaths {
  const radius = PYRAMID_RADIUS * scale;
  const height = radius * HEIGHT_RATIO;
  // Centred vertically about the object's own mid-height, so yaw does not
  // make it appear to rise and fall.
  const baseY = height / 2;
  const apexY = -height / 2;

  const corners: Array<[number, number]> = [];
  for (let index = 0; index < 4; index += 1) {
    // The quarter-turn offset puts a corner nearest the viewer at rest, which
    // is the three-quarter product-photography pose rather than the flat-on
    // one that makes a pyramid read as a triangle.
    const angle = yaw + index * (Math.PI / 2) + Math.PI / 4;
    corners.push([Math.cos(angle) * radius, baseY + Math.sin(angle) * radius * TILT]);
  }

  const [c0, c1, c2, c3] = corners as [
    [number, number],
    [number, number],
    [number, number],
    [number, number],
  ];

  const point = ([x, y]: [number, number]) => `${x.toFixed(2)} ${y.toFixed(2)}`;

  return {
    base: `M${point(c0)}L${point(c1)}L${point(c2)}L${point(c3)}Z`,
    hips: corners.map((corner) => `M0 ${apexY.toFixed(2)}L${point(corner)}`).join(""),
  };
}

/**
 * What the cursor looks like over a given kind of element.
 *
 * Every field is a multiplier or an absolute the render loop eases toward, so
 * no state ever snaps — crossing from a card onto a button is a blend, not a
 * cut.
 */
export interface CursorProfile {
  /** Size multiplier. The brief's +20% for interactive targets. */
  scale: number;
  /** Halo intensity multiplier. */
  glow: number;
  /** Wireframe opacity. */
  opacity: number;
  /** Yaw-rate multiplier — how fast the object turns. */
  spin: number;
  /** Pulls toward the target's centre when true. */
  magnetic: boolean;
  /** Shows the small rule beneath the pyramid. */
  underline: boolean;
}

const BASE: CursorProfile = {
  scale: 1,
  glow: 1,
  opacity: 0.82,
  spin: 1,
  magnetic: false,
  underline: false,
};

/**
 * Resolved in order, first match wins — so the primary CTA is recognised as a
 * CTA rather than as the generic link it also is.
 */
export const CURSOR_TARGETS: ReadonlyArray<{
  selector: string;
  profile: CursorProfile;
}> = [
  {
    /* The hero object. The cursor briefly turns the same way the Apex does —
       a harmony nobody consciously notices and everybody feels. */
    selector: "[data-cursor='apex']",
    profile: { ...BASE, scale: 1.25, glow: 1.7, opacity: 1, spin: 2.2, magnetic: false },
  },
  {
    /* The primary call to action. The brightest the cursor ever gets, and the
       only place it is pulled toward its target. */
    selector: "[data-emphasis='primary'], [data-cursor='cta']",
    profile: { ...BASE, scale: 1.24, glow: 2, opacity: 1, spin: 1.2, magnetic: true },
  },
  {
    /* Text entry. The cursor gets QUIETER, not louder: over a field the
       pointer's own I-beam is the meaningful shape, and a bright object
       hovering beside the caret competes with the thing being typed. */
    selector: "input:not([type='button']):not([type='submit']), textarea, select",
    profile: { ...BASE, scale: 0.8, glow: 0.35, opacity: 0.55, spin: 0.5, magnetic: false },
  },
  {
    /* Whole-surface cards — work, pricing, case studies. The object spins up
       and the halo warms: the panel is a destination, not a control. */
    selector: "[data-project-card], [data-cursor='card']",
    profile: { ...BASE, scale: 1.2, glow: 1.5, opacity: 1, spin: 2.8, magnetic: false },
  },
  {
    /* Navigation. Barely any scale — a nav bar is a row of small targets and
       a cursor that swells over each one in turn is a cursor that flickers. */
    selector: "[data-cursor='nav'], header nav a, header nav button",
    profile: { ...BASE, scale: 1.06, glow: 1.55, opacity: 1, spin: 1, underline: true },
  },
  {
    /* Everything else ordinarily clickable. */
    selector: "a[href], button:not(:disabled), [role='button'], summary, label[for]",
    profile: { ...BASE, scale: 1.2, glow: 1.35, opacity: 1, spin: 1.4, magnetic: false },
  },
];

export const DEFAULT_PROFILE = BASE;

/** One selector for the delegated `closest()` lookup. */
export const CURSOR_SELECTOR = CURSOR_TARGETS.map((target) => target.selector).join(", ");

/** Resolve which profile an element earns. */
export function profileFor(element: Element): CursorProfile {
  for (const target of CURSOR_TARGETS) {
    if (element.matches(target.selector)) return target.profile;
  }
  return BASE;
}
