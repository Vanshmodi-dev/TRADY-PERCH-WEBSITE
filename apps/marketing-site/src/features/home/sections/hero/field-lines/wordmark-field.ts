/**
 * FIELD LINES — stage one: turn the wordmark into a magnetic field.
 *
 * The intro's central conceit is that "TRADY PERCH" is not assembled by
 * particles; it is the *shape of an invisible magnetic field* that the
 * particles reveal. That requires two artefacts, both built here, both once
 * per resize:
 *
 *   1. POLES — the letterform sampled down to a set of attractor points.
 *      Each participating particle is assigned one, so the finished wordmark
 *      is evenly dense rather than clumped wherever the physics happened to
 *      settle.
 *
 *   2. THE FIELD GRID — a coarse lattice storing, per cell, the direction and
 *      strength of the summed field from every pole. Particles sample this
 *      with bilinear interpolation, which is what produces genuinely *curved*
 *      migration paths (iron filings around a magnet) instead of the straight
 *      point-to-point tweening that makes conventional particle logos read as
 *      a script executing.
 *
 * Building the grid is O(cells x poles) — roughly 1.2M multiply-adds at the
 * default resolution. That is a few milliseconds, paid once on mount and once
 * per resize, never per frame. Per frame the cost is a single bilinear sample
 * per particle, which is what makes the whole effect affordable.
 */

export interface FieldPole {
  x: number;
  y: number;
}

export interface FieldGrid {
  cols: number;
  rows: number;
  cellWidth: number;
  cellHeight: number;
  /** Field direction per cell, radians. Indexed row-major. */
  angle: Float32Array;
  /** Field strength per cell, normalised 0..1. Indexed row-major. */
  magnitude: Float32Array;
}

/** Grid resolution. Coarse on purpose — the field is smooth, so interpolation
 *  between widely spaced samples loses nothing visible and keeps build cost
 *  linear in something small. */
const GRID_COLS = 80;
const GRID_ROWS = 40;

/**
 * Minimum squared distance used when accumulating 1/r^2 contributions. Without
 * a floor, a cell sitting exactly on a pole divides by ~0 and the resulting
 * direction is numerically meaningless (and renders as a visible singularity —
 * a pinwheel artefact right on the letterform).
 */
const SOFTENING = 24;

/**
 * How many poles the letterform is reduced to.
 *
 * The grid build is O(cells x poles) — 3,200 cells here — so this number is
 * the whole cost of the one expensive step in the effect. At 700 that is
 * ~2.2M multiply-adds, a few milliseconds, paid once on mount and once per
 * resize.
 *
 * It is also the density the finished wordmark is drawn at: every
 * participating particle is assigned one pole, so with ~1,900 participating
 * particles across 700 poles each stroke carries two or three particles per
 * sample point. Fewer poles and the letterform reads as dotted; many more and
 * the grid build becomes the slowest thing on the page.
 */
const TARGET_POLES = 700;

export interface RasterTarget {
  width: number;
  height: number;
  /** Device pixel ratio the caller is rendering at. */
  scale: number;
  /**
   * The *resolved* font stack to shape with, as read from the DOM.
   *
   * This must not be a hand-written family list. The primary face is loaded by
   * `next/font`, which mangles the family to a build-generated name
   * (`__Inter_36bd41`) — a literal `"Inter"` in a canvas font string therefore
   * matches nothing and silently falls through to `system-ui`. The particles
   * then formed a *different typeface* from the solid wordmark fading up
   * underneath them, and the two read as one blurred, doubled form. That is
   * the single largest source of the "noisy logo" this sequence was reported
   * for. Callers pass `getComputedStyle(element).fontFamily`.
   */
  fontFamily: string;
}

/**
 * Type metrics, shared by the rasteriser and the SVG wordmark.
 *
 * Both artefacts must agree to the pixel: the particles settle into the shape
 * described here, and the solid SVG lights up in exactly the same place. Any
 * disagreement in size, weight, tracking or centring shows up as a double
 * exposure. They are stated once, here, and the CSS mirrors them through
 * custom properties rather than restating the numbers.
 */
export const WORDMARK_TYPE = {
  /** Size is viewport-width driven so the wordmark holds a constant share of
   *  the frame at every breakpoint. Mirrored by `--tp-wordmark-size`. */
  sizeVwFactor: 0.082,
  sizeMin: 26,
  sizeMax: 104,
  /**
   * Tracking, in em. Tightened from 0.14: at 0.14 the letters stop reading as
   * a word and start reading as a row of characters, which is the difference
   * between a wordmark and a caption.
   */
  trackingEm: 0.115,
  /**
   * Weight. Up one step from 300 — 300 at display size renders with hairline
   * stems that a subpixel grid cannot resolve cleanly, which reads as
   * shimmer. 400 keeps the same light, stated character with stems thick
   * enough to land on the pixel grid.
   */
  weight: 400,
} as const;

/** The rendered type size for a given CSS viewport width. */
export function wordmarkFontSize(cssWidth: number): number {
  return clamp(cssWidth * WORDMARK_TYPE.sizeVwFactor, WORDMARK_TYPE.sizeMin, WORDMARK_TYPE.sizeMax);
}

/**
 * Sample the wordmark's glyph coverage into pole points.
 *
 * Rasterises the text to an offscreen canvas, then walks the alpha channel on
 * a fixed stride, keeping covered pixels. Stride rather than "every pixel"
 * because the pole count needs to be a few hundred (grid build is linear in
 * it) while glyph coverage at display size is tens of thousands.
 *
 * Returns an empty array when no 2D context is available — jsdom under test,
 * or a browser that has refused the context. Callers treat an empty pole set
 * as "cannot run the ceremony" and fall back to the static presentation,
 * which is the same path reduced-motion visitors take.
 */
export function sampleWordmarkPoles(
  text: string,
  target: RasterTarget,
  createCanvas: () => HTMLCanvasElement | null = defaultCanvasFactory,
): FieldPole[] {
  const canvas = createCanvas();
  if (!canvas) return [];

  const width = Math.max(1, Math.floor(target.width));
  const height = Math.max(1, Math.floor(target.height));
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) return [];

  // Metrics come from the shared spec so the particle form and the SVG form
  // are the same shape at the same size. `width` here is in device pixels, so
  // the CSS-space size is scaled back up to match.
  const fontSize = wordmarkFontSize(width / target.scale) * target.scale;
  const tracking = fontSize * WORDMARK_TYPE.trackingEm;

  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = "#fff";
  ctx.textAlign = "left";
  ctx.textBaseline = "middle";
  ctx.font = `${WORDMARK_TYPE.weight} ${fontSize}px ${target.fontFamily}`;

  // Manual letter spacing: `ctx.letterSpacing` is not available everywhere,
  // and the tracking here is wide enough to matter to the pole distribution.
  const characters = [...text];
  const advances = characters.map((character) => ctx.measureText(character).width);
  // Trailing track INCLUDED. CSS `letter-spacing` adds its value after every
  // character including the last, so a centred CSS/SVG run centres a box one
  // full track wider than the glyphs occupy. Measuring the same box here is
  // what makes the two centre identically — the previous `n - 1` measurement
  // left the particle form half a track (up to 6px) left of the solid one,
  // and the site compensated with a `text-indent` hack that over-corrected by
  // a further half track in the other direction.
  const totalWidth =
    advances.reduce((sum, advance) => sum + advance, 0) + tracking * characters.length;

  let penX = (width - totalWidth) / 2;
  const baselineY = height / 2;
  for (let index = 0; index < characters.length; index += 1) {
    ctx.fillText(characters[index] ?? "", penX, baselineY);
    penX += (advances[index] ?? 0) + tracking;
  }

  let pixels: Uint8ClampedArray;
  try {
    pixels = ctx.getImageData(0, 0, width, height).data;
  } catch {
    // Tainted or unavailable in some sandboxed contexts. Same fallback as a
    // missing context: the caller degrades to the static presentation.
    return [];
  }

  /*
   * ── Sampling, in two passes ───────────────────────────────────────────
   *
   * The stride must be FINER than the letterform's stems, or the scan
   * simply misses them. That was the defect here: at `fontSize / 9` the
   * stride ran wider than a stem at every size (23px against a 17px stem on a
   * 2x display), so a scan line crossed a stroke without landing on it more
   * often than not. The surviving poles were a sparse scatter that happened
   * to sit inside the word's bounding box — which is exactly what the
   * finished effect looked like: a diffuse cloud in the shape of a rectangle,
   * not of a wordmark.
   *
   * So: sample fine enough to resolve the strokes, then decimate the result
   * to the pole count the grid build can afford. Density is set by the
   * target, not by the raster size, so it is now genuinely constant across
   * viewports rather than approximately so.
   */
  const stride = Math.max(2, Math.round(fontSize / 46));
  const candidates: FieldPole[] = [];
  for (let y = 0; y < height; y += stride) {
    for (let x = 0; x < width; x += stride) {
      // Alpha channel of the RGBA quad for this pixel.
      const alpha = pixels[(y * width + x) * 4 + 3] ?? 0;
      if (alpha > 128) {
        candidates.push({ x: x / target.scale, y: y / target.scale });
      }
    }
  }

  if (candidates.length <= TARGET_POLES) return candidates;

  // Even decimation rather than random selection: a random subset clumps, and
  // clumping in the finished wordmark is the one artefact the pole assignment
  // exists to prevent. Striding the scan-ordered list keeps the coverage even
  // across every stroke.
  const step = candidates.length / TARGET_POLES;
  const poles: FieldPole[] = [];
  for (let index = 0; index < TARGET_POLES; index += 1) {
    const candidate = candidates[Math.floor(index * step)];
    if (candidate) poles.push(candidate);
  }

  return poles;
}

/**
 * Build the field lattice from a pole set.
 *
 * Each cell sums a 1/r^2 pull toward every pole — the same inverse-square
 * accumulation a real dipole field uses. The result is stored as
 * (angle, magnitude) rather than (x, y) because particles need the angle
 * directly for orientation, and storing it pre-resolved keeps the per-frame
 * sample down to two array reads and a lerp.
 */
export function buildFieldGrid(
  poles: readonly FieldPole[],
  width: number,
  height: number,
): FieldGrid {
  const cols = GRID_COLS;
  const rows = GRID_ROWS;
  const cellWidth = width / (cols - 1);
  const cellHeight = height / (rows - 1);
  const angle = new Float32Array(cols * rows);
  const magnitude = new Float32Array(cols * rows);

  if (poles.length === 0) {
    return { cols, rows, cellWidth, cellHeight, angle, magnitude };
  }

  let peak = 0;
  for (let row = 0; row < rows; row += 1) {
    for (let col = 0; col < cols; col += 1) {
      const cellX = col * cellWidth;
      const cellY = row * cellHeight;
      let sumX = 0;
      let sumY = 0;

      for (let index = 0; index < poles.length; index += 1) {
        const pole = poles[index];
        if (!pole) continue;
        const deltaX = pole.x - cellX;
        const deltaY = pole.y - cellY;
        const distanceSquared = deltaX * deltaX + deltaY * deltaY + SOFTENING;
        // 1/r^2 magnitude, applied along the unit vector: dividing the raw
        // delta by r^3 gives (delta / r) * (1 / r^2) in one step.
        const falloff = 1 / (distanceSquared * Math.sqrt(distanceSquared));
        sumX += deltaX * falloff;
        sumY += deltaY * falloff;
      }

      const strength = Math.hypot(sumX, sumY);
      const cellIndex = row * cols + col;
      angle[cellIndex] = Math.atan2(sumY, sumX);
      magnitude[cellIndex] = strength;
      if (strength > peak) peak = strength;
    }
  }

  if (peak > 0) {
    // Normalise to 0..1 with a gentle curve. sqrt lifts the weak outer field
    // enough that distant particles still visibly align during ignition —
    // linear normalisation leaves the frame edges looking inert.
    for (let index = 0; index < magnitude.length; index += 1) {
      magnitude[index] = Math.sqrt((magnitude[index] ?? 0) / peak);
    }
  }

  return { cols, rows, cellWidth, cellHeight, angle, magnitude };
}

export interface FieldSample {
  angle: number;
  magnitude: number;
}

/**
 * Bilinearly sample the grid at an arbitrary point.
 *
 * Angles are interpolated as unit vectors rather than as raw radians —
 * averaging 3.1 and -3.1 numerically yields ~0, which would point a particle
 * in exactly the wrong direction at every wrap boundary. Interpolating the
 * vector components and re-deriving the angle is wrap-safe by construction.
 */
export function sampleField(grid: FieldGrid, x: number, y: number): FieldSample {
  const { cols, rows, cellWidth, cellHeight, angle, magnitude } = grid;

  const gridX = clamp(x / cellWidth, 0, cols - 1);
  const gridY = clamp(y / cellHeight, 0, rows - 1);
  const col0 = Math.floor(gridX);
  const row0 = Math.floor(gridY);
  const col1 = Math.min(col0 + 1, cols - 1);
  const row1 = Math.min(row0 + 1, rows - 1);
  const fx = gridX - col0;
  const fy = gridY - row0;

  const topLeft = row0 * cols + col0;
  const topRight = row0 * cols + col1;
  const bottomLeft = row1 * cols + col0;
  const bottomRight = row1 * cols + col1;

  let vectorX = 0;
  let vectorY = 0;
  let strength = 0;

  const corners: Array<[number, number]> = [
    [topLeft, (1 - fx) * (1 - fy)],
    [topRight, fx * (1 - fy)],
    [bottomLeft, (1 - fx) * fy],
    [bottomRight, fx * fy],
  ];

  for (const [cornerIndex, weight] of corners) {
    const cornerAngle = angle[cornerIndex] ?? 0;
    const cornerMagnitude = magnitude[cornerIndex] ?? 0;
    vectorX += Math.cos(cornerAngle) * weight;
    vectorY += Math.sin(cornerAngle) * weight;
    strength += cornerMagnitude * weight;
  }

  return { angle: Math.atan2(vectorY, vectorX), magnitude: strength };
}

export function clamp(value: number, min: number, max: number): number {
  return value < min ? min : value > max ? max : value;
}

function defaultCanvasFactory(): HTMLCanvasElement | null {
  if (typeof document === "undefined") return null;
  return document.createElement("canvas");
}
