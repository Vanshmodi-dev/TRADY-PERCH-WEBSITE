/**
 * FIELD LINES — ambient dust for the hero's resting state.
 *
 * These are the ~28% of flecks that never migrated into the wordmark during
 * the intro. Narratively they are the *same dust*, which is what makes the
 * hand-off from ceremony to hero read as continuous rather than as a cut.
 *
 * Deliberately motionless. The particles do not drift, loop, or breathe —
 * they hang in the volume exactly as suspended matter does, and the only
 * thing that changes is how the moving key light strikes them. That means
 * the canvas is redrawn only when the light actually moves, and not at all
 * while the pointer is still, which keeps an idle hero at zero cost.
 */

import { atlasIndexForAngle, createFleckAtlas, type FleckAtlas } from "./fleck-atlas";

const BASE_DESKTOP_COUNT = 320;
const BASE_MOBILE_COUNT = 130;
const MOBILE_BREAKPOINT = 768;
const ALPHA_BANDS = 5;

export class AmbientDust {
  private readonly canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D | null = null;
  private atlas: FleckAtlas | null = null;

  private width = 0;
  private height = 0;
  private scale = 1;

  private x = new Float32Array(0);
  private y = new Float32Array(0);
  private angle = new Float32Array(0);
  private depth = new Float32Array(0);
  private count = 0;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
  }

  resize(width: number, height: number, scale: number): boolean {
    this.width = width;
    this.height = height;
    this.scale = scale;

    this.canvas.width = Math.max(1, Math.floor(width * scale));
    this.canvas.height = Math.max(1, Math.floor(height * scale));
    this.canvas.style.width = `${width}px`;
    this.canvas.style.height = `${height}px`;

    this.ctx = this.canvas.getContext("2d", { alpha: true });
    if (!this.ctx) return false;
    this.ctx.setTransform(scale, 0, 0, scale, 0, 0);

    this.atlas = createFleckAtlas(scale, 6, 1.3);
    if (!this.atlas) return false;

    const count = width < MOBILE_BREAKPOINT ? BASE_MOBILE_COUNT : BASE_DESKTOP_COUNT;
    this.count = count;
    this.x = new Float32Array(count);
    this.y = new Float32Array(count);
    this.angle = new Float32Array(count);
    this.depth = new Float32Array(count);

    for (let index = 0; index < count; index += 1) {
      this.x[index] = Math.random() * width;
      this.y[index] = Math.random() * height;
      this.angle[index] = Math.random() * Math.PI * 2;
      // Depth drives both parallax offset and size, so the volume reads as
      // three-dimensional rather than as a flat sheet of specks.
      this.depth[index] = 0.35 + Math.random() * 0.9;
    }

    return true;
  }

  /**
   * Redraw for a light position expressed in normalised (-1..1) coordinates.
   * `parallax` shifts the field opposite the light, so the dust appears to sit
   * in front of and behind the object rather than pasted onto it.
   */
  render(lightX: number, lightY: number): void {
    const ctx = this.ctx;
    const atlas = this.atlas;
    if (!ctx || !atlas) return;

    ctx.clearRect(0, 0, this.width, this.height);
    ctx.globalCompositeOperation = "lighter";

    const { cell, half, steps } = atlas;
    const cssCell = cell / this.scale;
    const cssHalf = half / this.scale;

    // Light angle in the plane, used for the anisotropic flash.
    const lightAngle = Math.atan2(lightY, lightX);
    // Screen-space position of the key light, for distance falloff.
    const lightPixelX = (lightX * 0.5 + 0.5) * this.width;
    const lightPixelY = (lightY * 0.5 + 0.5) * this.height;
    const falloffRadius = Math.hypot(this.width, this.height) * 0.62;

    const buckets: number[][] = Array.from({ length: ALPHA_BANDS }, () => []);

    for (let index = 0; index < this.count; index += 1) {
      const depth = this.depth[index] ?? 1;
      const px = (this.x[index] ?? 0) - lightX * 14 * depth;
      const py = (this.y[index] ?? 0) - lightY * 10 * depth;

      const specular = Math.abs(Math.cos((this.angle[index] ?? 0) - lightAngle));
      const distance = Math.hypot(px - lightPixelX, py - lightPixelY);
      const proximity = Math.max(0, 1 - distance / falloffRadius);

      const brightness = (0.08 + Math.pow(specular, 3) * 0.92) * (0.25 + proximity * 0.75);
      if (brightness <= 0.03) continue;

      const band = Math.min(ALPHA_BANDS - 1, Math.floor(brightness * ALPHA_BANDS));
      buckets[band]?.push(index);
    }

    for (let band = 0; band < ALPHA_BANDS; band += 1) {
      const bucket = buckets[band];
      if (!bucket || bucket.length === 0) continue;
      ctx.globalAlpha = Math.min(1, ((band + 0.5) / ALPHA_BANDS) * 0.55);

      for (const index of bucket) {
        const depth = this.depth[index] ?? 1;
        const px = (this.x[index] ?? 0) - lightX * 14 * depth;
        const py = (this.y[index] ?? 0) - lightY * 10 * depth;
        const sprite = atlasIndexForAngle(this.angle[index] ?? 0, steps);
        const drawSize = cssCell * depth;
        ctx.drawImage(
          atlas.canvas,
          sprite * cell,
          0,
          cell,
          cell,
          px - cssHalf * depth,
          py - cssHalf * depth,
          drawSize,
          drawSize,
        );
      }
    }

    ctx.globalAlpha = 1;
    ctx.globalCompositeOperation = "source-over";
  }

  destroy(): void {
    this.ctx = null;
    this.atlas = null;
  }
}
