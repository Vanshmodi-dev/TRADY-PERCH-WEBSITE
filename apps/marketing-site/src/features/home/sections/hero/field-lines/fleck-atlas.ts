/**
 * FIELD LINES — the fleck sprite atlas.
 *
 * The single decision that separates "precision-machined metallic dust" from
 * glitter is that a filing is *elongated and oriented*, not a round dot. Round
 * particles read as sparkle no matter how they are coloured; oriented slivers
 * read as metal, because orientation is what lets them align to a field and
 * flash as they rotate through a light.
 *
 * Drawing that per particle with a path and a transform is far too expensive
 * at the counts this sequence needs. Instead every rotation the renderer will
 * ever use is pre-drawn once into a single strip, and each frame becomes a
 * flat run of `drawImage` calls against that strip — no path construction, no
 * per-particle matrix maths, no state changes beyond a handful of alpha bands.
 *
 * The flecks carry NO emission. Every unit of brightness they show at runtime
 * comes from the alpha the renderer applies, which is derived from the scene's
 * light. Glitter glows; metal reflects — so the sprite is painted as a neutral
 * warm highlight and is lit entirely from outside.
 */

/** Rotation steps baked into the atlas. 24 gives 7.5-degree granularity, which
 *  is below the threshold at which stepping is visible on a sliver this small,
 *  and keeps the strip narrow enough to stay in cache. */
export const ATLAS_STEPS = 24;

export interface FleckAtlas {
  canvas: HTMLCanvasElement;
  /** Width/height of one square cell in device pixels. */
  cell: number;
  /** Half a cell — the draw offset that centres a sprite on a point. */
  half: number;
  steps: number;
}

/**
 * Build the atlas at a given device-pixel scale.
 *
 * `length` and `thickness` are in CSS pixels; both are multiplied by `scale`
 * so the sprite is crisp on high-density displays instead of being upscaled at
 * draw time.
 */
export function createFleckAtlas(
  scale: number,
  length = 7.4,
  /**
   * Finer than it was. At 1.5 CSS px a fleck is wide enough to read as a dot
   * with a smear on it rather than as a filing, and a field of them reads as
   * grain over the frame — the "noisy" quality the sequence was reported for.
   * At 1.2 the same count reads as suspended metal.
   */
  thickness = 1.2,
  createCanvas: () => HTMLCanvasElement | null = defaultCanvasFactory,
): FleckAtlas | null {
  const canvas = createCanvas();
  if (!canvas) return null;

  const pixelLength = Math.max(2, length * scale);
  const pixelThickness = Math.max(1, thickness * scale);
  // The cell must contain the sprite at its worst-case diagonal, plus a pixel
  // of bleed so neighbouring cells never sample each other's edge antialiasing.
  const cell = Math.ceil(Math.hypot(pixelLength, pixelThickness)) + 2;
  const half = cell / 2;

  canvas.width = cell * ATLAS_STEPS;
  canvas.height = cell;

  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  for (let step = 0; step < ATLAS_STEPS; step += 1) {
    const angle = (step / ATLAS_STEPS) * Math.PI * 2;
    const centreX = step * cell + half;

    ctx.save();
    ctx.translate(centreX, half);
    ctx.rotate(angle);

    // A filing is brightest along its spine and falls off to nothing at the
    // tips — that gradient is what stops it reading as a hard dash.
    const gradient = ctx.createLinearGradient(-pixelLength / 2, 0, pixelLength / 2, 0);
    gradient.addColorStop(0, "rgba(231, 217, 184, 0)");
    gradient.addColorStop(0.5, "rgba(255, 246, 222, 1)");
    gradient.addColorStop(1, "rgba(231, 217, 184, 0)");
    ctx.fillStyle = gradient;

    ctx.beginPath();
    ctx.ellipse(0, 0, pixelLength / 2, pixelThickness / 2, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  return { canvas, cell, half, steps: ATLAS_STEPS };
}

/** Map an arbitrary angle (radians, unbounded) to an atlas cell index. */
export function atlasIndexForAngle(angle: number, steps: number = ATLAS_STEPS): number {
  const turns = angle / (Math.PI * 2);
  const wrapped = turns - Math.floor(turns);
  const index = Math.round(wrapped * steps);
  return index >= steps ? 0 : index;
}

function defaultCanvasFactory(): HTMLCanvasElement | null {
  if (typeof document === "undefined") return null;
  return document.createElement("canvas");
}
