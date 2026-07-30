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

export interface RasterTarget {
  width: number;
  height: number;
  /** Device pixel ratio the caller is rendering at. */
  scale: number;
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

  // Type size is driven by viewport width so the wordmark occupies a
  // consistent share of the frame at every breakpoint, rather than being a
  // fixed px size that dominates a phone and floats on a wide desktop.
  const fontSize = clamp(width * 0.082, 26, 104);
  const tracking = fontSize * 0.14;

  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = "#fff";
  ctx.textAlign = "left";
  ctx.textBaseline = "middle";
  ctx.font = `300 ${fontSize}px "General Sans", "Inter", system-ui, sans-serif`;

  // Manual letter spacing: `ctx.letterSpacing` is not available everywhere,
  // and the tracking here is wide enough to matter to the pole distribution.
  const characters = [...text];
  const advances = characters.map((character) => ctx.measureText(character).width);
  const totalWidth =
    advances.reduce((sum, advance) => sum + advance, 0) + tracking * (characters.length - 1);

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

  // Stride is derived from the raster size so pole density stays roughly
  // constant across viewports — a fixed stride would yield ~5x more poles on
  // a wide desktop than on a phone, and the grid build cost scales with it.
  const stride = Math.max(3, Math.round(fontSize / 9));
  const poles: FieldPole[] = [];
  for (let y = 0; y < height; y += stride) {
    for (let x = 0; x < width; x += stride) {
      // Alpha channel of the RGBA quad for this pixel.
      const alpha = pixels[(y * width + x) * 4 + 3] ?? 0;
      if (alpha > 128) {
        poles.push({ x: x / target.scale, y: y / target.scale });
      }
    }
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
