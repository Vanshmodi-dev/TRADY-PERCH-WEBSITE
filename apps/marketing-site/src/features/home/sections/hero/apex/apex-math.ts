/**
 * THE APEX — the maths, with no dependency on three.js or the DOM.
 *
 * Everything here is a pure function, which is deliberate: the placement of a
 * face plate and the settling of the key light are the two things that are
 * genuinely easy to get subtly wrong and impossible to eyeball, so they are
 * unit-tested rather than trusted.
 */

/** A point in a face plate's own 2D coordinate system. */
export interface Point2 {
  readonly x: number;
  readonly y: number;
}

export type Triangle = readonly [Point2, Point2, Point2];

/* ------------------------------------------------------------------ *
 * Shell geometry
 * ------------------------------------------------------------------ */

/**
 * The angle a face's outward normal makes with the horizon.
 *
 * For a right pyramid this collapses to atan(baseHalfWidth / height) — the
 * normal tilts up by exactly as much as the face leans in. A face rising at
 * 57° therefore has a normal 33° above horizontal.
 */
export function faceTilt(baseHalfWidth: number, height: number): number {
  return Math.atan(baseHalfWidth / height);
}

/** Slant height: the distance from a base-edge midpoint to the apex. */
export function faceSlant(baseHalfWidth: number, height: number): number {
  return Math.hypot(baseHalfWidth, height);
}

/** Which way face `index` looks, as a rotation about the vertical axis. */
export function faceAzimuth(index: number): number {
  return (index * Math.PI) / 2;
}

/**
 * The outward unit normal of face `index`. Face 0 faces +Z; each subsequent
 * face is a quarter turn anticlockwise about Y.
 */
export function faceNormal(index: number, tilt: number): [number, number, number] {
  const azimuth = faceAzimuth(index);
  const horizontal = Math.cos(tilt);
  return [horizontal * Math.sin(azimuth), Math.sin(tilt), horizontal * Math.cos(azimuth)];
}

/**
 * The midpoint of face `index`'s base edge, in shell space, with the base
 * plane at y = 0. This is the plate's anchor point: its local origin.
 */
export function faceAnchor(index: number, baseHalfWidth: number): [number, number, number] {
  const azimuth = faceAzimuth(index);
  return [baseHalfWidth * Math.sin(azimuth), 0, baseHalfWidth * Math.cos(azimuth)];
}

/* ------------------------------------------------------------------ *
 * Triangle inset — how the aperture is cut
 * ------------------------------------------------------------------ */

/** Side lengths opposite vertices a, b, c respectively. */
function sideLengths(triangle: Triangle): [number, number, number] {
  const [a, b, c] = triangle;
  return [Math.hypot(b.x - c.x, b.y - c.y), Math.hypot(c.x - a.x, c.y - a.y), Math.hypot(a.x - b.x, a.y - b.y)];
}

/**
 * The incentre — the one point equidistant from all three edges, and therefore
 * the only centre a uniform edge inset can be taken about.
 */
export function triangleIncentre(triangle: Triangle): Point2 {
  const [a, b, c] = triangle;
  const [la, lb, lc] = sideLengths(triangle);
  const perimeter = la + lb + lc;
  return {
    x: (la * a.x + lb * b.x + lc * c.x) / perimeter,
    y: (la * a.y + lb * b.y + lc * c.y) / perimeter,
  };
}

/** Radius of the inscribed circle: twice the area over the perimeter. */
export function triangleInradius(triangle: Triangle): number {
  const [a, b, c] = triangle;
  const [la, lb, lc] = sideLengths(triangle);
  const area = Math.abs((b.x - a.x) * (c.y - a.y) - (c.x - a.x) * (b.y - a.y)) / 2;
  return (2 * area) / (la + lb + lc);
}

/**
 * Move every edge of a triangle inward by the same perpendicular distance.
 *
 * The result is the original triangle scaled about its incentre — which is
 * why the incentre, and not the centroid, is the pivot. Using the centroid
 * gives an inset that is wrong by a different amount on each edge, and on a
 * tall isosceles face like this one the error is plainly visible as a band of
 * uneven width.
 *
 * Returns `null` when the margin would consume the triangle.
 */
export function insetTriangle(triangle: Triangle, margin: number): Triangle | null {
  const radius = triangleInradius(triangle);
  if (margin >= radius) return null;

  const centre = triangleIncentre(triangle);
  const scale = (radius - margin) / radius;

  return triangle.map((point) => ({
    x: centre.x + (point.x - centre.x) * scale,
    y: centre.y + (point.y - centre.y) * scale,
  })) as unknown as Triangle;
}

/**
 * A point at parameter `t` along the perpendicular from the incentre toward
 * vertex `index` — used to seat fastener heads in the middle of the frame
 * band, wherever the aperture inset happens to leave it.
 */
export function bandPoint(triangle: Triangle, index: number, t: number): Point2 {
  const centre = triangleIncentre(triangle);
  const vertex = triangle[index % 3] as Point2;
  return {
    x: centre.x + (vertex.x - centre.x) * t,
    y: centre.y + (vertex.y - centre.y) * t,
  };
}

/* ------------------------------------------------------------------ *
 * Critically damped motion
 * ------------------------------------------------------------------ */

export interface SpringState {
  value: number;
  velocity: number;
}

/**
 * Advance a critically damped spring by `dt` seconds, exactly.
 *
 * This is the closed-form solution of ẍ + 2ωẋ + ω²x = 0, not a per-frame lerp.
 * Two things follow, and both matter here:
 *
 *   1. It is frame-rate independent. A lerp of `x += (target - x) * 0.05` runs
 *      at a different speed on a 144Hz display than on a 60Hz one, which means
 *      the "heavy" feel this object depends on is a lie on half the hardware.
 *   2. It never overshoots. Critical damping is the boundary case — the
 *      fastest approach with no oscillation at all. A real 40kg instrument on
 *      a suspension does not bounce, and neither does anything here.
 *
 * `omega` is the natural frequency in rad/s; settling takes roughly 4/omega
 * seconds.
 */
export function stepSpring(
  state: SpringState,
  target: number,
  omega: number,
  dt: number,
): SpringState {
  // A backgrounded tab hands back a delta of seconds. Clamping keeps the
  // exponential in a sane range and makes the return-to-tab a settle rather
  // than a snap.
  const step = Math.min(Math.max(dt, 0), 0.1);
  const offset = state.value - target;
  const decay = Math.exp(-omega * step);
  const c = state.velocity + omega * offset;

  return {
    value: target + (offset + c * step) * decay,
    velocity: (state.velocity - c * omega * step) * decay,
  };
}

/** Whether a spring has arrived closely enough to stop integrating it. */
export function springAtRest(state: SpringState, target: number, epsilon = 1e-4): boolean {
  return Math.abs(state.value - target) < epsilon && Math.abs(state.velocity) < epsilon;
}

/* ------------------------------------------------------------------ *
 * The light, not the object
 * ------------------------------------------------------------------ */

export interface LightAim {
  /** Rotation about the vertical axis, radians, 0 = in front of the object. */
  azimuth: number;
  /** Height above the horizon, radians. Never negative. */
  elevation: number;
}

export interface LightAimRange {
  azimuthRange: number;
  high: number;
  low: number;
}

/**
 * Map a normalised pointer position onto the key light's aim.
 *
 * The pointer moves the LIGHT, never the object. Rotating an object toward the
 * cursor is the conventional choice and it is the wrong one: it reads as a toy,
 * it is not what real objects do, and it reveals nothing about the surface.
 * Raking a key light across machined metal reveals the machining, which is the
 * entire reason to machine it.
 *
 * Input is clamped rather than extrapolated, so a pointer far outside the
 * canvas parks the light at a designed grazing angle instead of swinging it
 * behind the object.
 */
export function aimFromPointer(x: number, y: number, range: LightAimRange): LightAim {
  const clampedX = Math.min(1, Math.max(-1, x));
  const clampedY = Math.min(1, Math.max(-1, y));
  // Screen-y grows downward; a pointer high in the frame should raise the key.
  const rise = (1 - clampedY) / 2;
  return {
    azimuth: clampedX * range.azimuthRange,
    elevation: range.low + (range.high - range.low) * rise,
  };
}

/** Cartesian position of a light aimed by `aim` at `distance` from the origin. */
export function aimToPosition(aim: LightAim, distance: number): [number, number, number] {
  const horizontal = Math.cos(aim.elevation) * distance;
  return [
    horizontal * Math.sin(aim.azimuth),
    Math.sin(aim.elevation) * distance,
    horizontal * Math.cos(aim.azimuth),
  ];
}

/* ------------------------------------------------------------------ *
 * Deterministic randomness
 * ------------------------------------------------------------------ */

/**
 * mulberry32 — a small, fast, well-distributed PRNG.
 *
 * Seeded on purpose. Every scratch on the housing and every fleck in the air
 * is in the same place on every visit, so the detail can be learned rather
 * than merely noticed. A surface that reshuffles on reload is a texture; one
 * that does not is an object.
 */
export function createSeededRandom(seed: number): () => number {
  let state = seed >>> 0;
  return () => {
    state = (state + 0x6d2b79f5) >>> 0;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
