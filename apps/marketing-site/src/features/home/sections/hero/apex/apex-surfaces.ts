/**
 * THE APEX — procedural surfaces.
 *
 * The single most important file in this directory, and the least obvious.
 *
 * An untextured matte-black material renders as a flat charcoal silhouette no
 * matter how good the lighting is, because a perfectly uniform surface has
 * nothing for a moving light to find. Everything that makes this object read
 * as machined metal rather than as dark plastic lives in the micro-detail:
 * brushing that runs one way, scratches too fine to resolve until the key
 * rakes across them, laser etching that is invisible head-on and legible at a
 * grazing angle.
 *
 * All of it is generated from a seeded PRNG into a canvas at run time. No image
 * downloads, no texture atlas, byte-identical on every visit — so the
 * scratch a visitor noticed last week is still in the same place.
 *
 * Two maps come out of one height field:
 *
 *   ROUGHNESS  where the surface is polished or abraded. This is what makes
 *              anodising read as anodising: the specular breaks up rather than
 *              staying a clean blob.
 *   NORMAL     a Sobel derivative of the same field. Relief, at a scale far
 *              below what the geometry could ever carry.
 *
 * Deriving both from one field is not a shortcut — it is the physically
 * correct relationship. A scratch is a groove *and* a change in finish, and
 * authoring the two independently is exactly how surfaces end up looking
 * subtly fake.
 */

import { CanvasTexture, RepeatWrapping, type Texture } from "three";
import { createSeededRandom } from "./apex-math";

interface Surface {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
}

/**
 * Server rendering and jsdom both reach this file's importers; neither has a
 * 2D context. Returning null rather than throwing lets the materials render
 * untextured instead of taking the page down.
 */
function createSurface(size: number): Surface | null {
  if (typeof document === "undefined") return null;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  return ctx ? { canvas, ctx } : null;
}

/** Texture space has v running up; canvas space has y running down. */
function toCanvas(u: number, v: number, size: number): [number, number] {
  return [u * size, (1 - v) * size];
}

/* ------------------------------------------------------------------ *
 * The height field
 * ------------------------------------------------------------------ */

interface HeightFieldOptions {
  seed: number;
  size: number;
  /** Radians. The direction the brushing runs. */
  grain: number;
  scratchCount: number;
  /** Draws the etched markings and the monogram. One plate only. */
  marked: boolean;
}

function drawHeightField({ seed, size, grain, scratchCount, marked }: HeightFieldOptions): Surface | null {
  const surface = createSurface(size);
  if (!surface) return null;
  const { ctx } = surface;
  const random = createSeededRandom(seed);

  // Mid-grey is "unmodified stock". Everything below is a cut, everything
  // above is a burnished high spot.
  ctx.fillStyle = "#808080";
  ctx.fillRect(0, 0, size, size);

  // Grain — the anodising's own tooth, well below scratch scale. Without this
  // the specular is glassy and the whole part reads as injection-moulded.
  const noise = ctx.getImageData(0, 0, size, size);
  const pixels = noise.data;
  for (let i = 0; i < pixels.length; i += 4) {
    const value = 128 + (random() - 0.5) * 13;
    pixels[i] = value;
    pixels[i + 1] = value;
    pixels[i + 2] = value;
    pixels[i + 3] = 255;
  }
  ctx.putImageData(noise, 0, 0);

  // Brushing and scratches. Nearly all of them follow the grain, because a
  // brushed part is brushed in one direction; the few that do not are the
  // handling marks a real part picks up afterwards, and they are what stops
  // the surface looking like a procedural texture.
  ctx.lineCap = "round";
  for (let i = 0; i < scratchCount; i += 1) {
    const strays = random() < 0.06;
    const angle = strays ? random() * Math.PI * 2 : grain + (random() - 0.5) * 0.22;
    const length = strays ? 6 + random() * 34 : 24 + random() * (size * 0.42);
    const x = random() * size;
    const y = random() * size;
    // Half cut in, half burnished proud — a scratch has a lip.
    const cut = random() < 0.62;
    const strength = (0.012 + random() * 0.055) * (strays ? 1.6 : 1);

    ctx.strokeStyle = cut
      ? `rgba(0, 0, 0, ${strength.toFixed(4)})`
      : `rgba(255, 255, 255, ${(strength * 0.75).toFixed(4)})`;
    ctx.lineWidth = 0.5 + random() * (strays ? 0.9 : 1.5);
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + Math.cos(angle) * length, y + Math.sin(angle) * length);
    ctx.stroke();
  }

  // Precision grooves: a machined datum band running parallel to the base
  // edge, in the frame band below the aperture.
  ctx.lineWidth = 1.1;
  for (let i = 0; i < 5; i += 1) {
    const v = 0.118 - i * 0.0085;
    const [, y] = toCanvas(0, v, size);
    ctx.strokeStyle = `rgba(0, 0, 0, ${0.14 - i * 0.018})`;
    ctx.beginPath();
    ctx.moveTo(size * 0.12, y);
    ctx.lineTo(size * 0.88, y);
    ctx.stroke();
  }

  if (marked) drawEtchedMarks(ctx, size);

  return surface;
}

/**
 * Laser etching, on exactly one of the four plates.
 *
 * Etched into the roughness field, not painted on as colour — which is what
 * laser marking on anodised aluminium physically is. The consequence is the
 * point: these marks are invisible when the key is anywhere else and legible
 * only when it rakes across this face. They are not decoration to be read;
 * they are a reward for looking twice.
 */
function drawEtchedMarks(ctx: CanvasRenderingContext2D, size: number): void {
  const font = (px: number, weight = 500) =>
    `${weight} ${px}px ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif`;

  // A measuring scale: majors and minors, as on any calibrated instrument.
  const [, tickY] = toCanvas(0, 0.075, size);
  ctx.strokeStyle = "rgba(0, 0, 0, 0.3)";
  for (let i = 0; i <= 40; i += 1) {
    const major = i % 5 === 0;
    const x = size * 0.16 + (i / 40) * size * 0.68;
    ctx.lineWidth = major ? 1.4 : 0.8;
    ctx.beginPath();
    ctx.moveTo(x, tickY);
    ctx.lineTo(x, tickY - (major ? size * 0.019 : size * 0.009));
    ctx.stroke();
  }

  // The part number. Real, in the sense that it describes this part: four
  // plates, one assembly, the year the object was designed.
  ctx.fillStyle = "rgba(0, 0, 0, 0.26)";
  ctx.font = font(Math.round(size * 0.026), 600);
  ctx.textAlign = "left";
  const [markX, markY] = toCanvas(0.16, 0.043, size);
  ctx.fillText("TP—A1 · PLATE 04/04 · MMXXVI", markX, markY);

  // The monogram. Set deliberately small and at a quarter of the etching
  // strength of everything around it: findable, never announced.
  ctx.save();
  ctx.translate(...toCanvas(0.845, 0.052, size));
  ctx.font = font(Math.round(size * 0.05), 300);
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = "rgba(0, 0, 0, 0.16)";
  ctx.fillText("TP", 0, 0);
  ctx.strokeStyle = "rgba(0, 0, 0, 0.1)";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.arc(0, 0, size * 0.042, 0, Math.PI * 2);
  ctx.stroke();
  ctx.restore();
}

/* ------------------------------------------------------------------ *
 * Height field -> maps
 * ------------------------------------------------------------------ */

/**
 * Remap the height field into roughness. Cut surfaces scatter more than the
 * surrounding anodising, burnished ones scatter less, and the whole range is
 * kept narrow — a matte part with high-contrast roughness reads as dirty, not
 * as machined.
 */
function toRoughnessTexture(source: Surface, base: number, contrast: number): CanvasTexture | null {
  const { canvas, ctx } = source;
  const size = canvas.width;
  const target = createSurface(size);
  if (!target) return null;

  const height = ctx.getImageData(0, 0, size, size);
  const out = target.ctx.createImageData(size, size);
  const baseByte = base * 255;

  for (let i = 0; i < height.data.length; i += 4) {
    // Cuts (dark in the height field) are rougher; high spots are smoother.
    const delta = ((height.data[i] as number) - 128) * -contrast;
    const value = Math.min(255, Math.max(0, baseByte + delta));
    out.data[i] = value;
    out.data[i + 1] = value;
    out.data[i + 2] = value;
    out.data[i + 3] = 255;
  }

  target.ctx.putImageData(out, 0, 0);
  return new CanvasTexture(target.canvas);
}

/**
 * Sobel the height field into a tangent-space normal map.
 *
 * Sampled with wraparound so the derivative is continuous across the seam,
 * which matters because the plate texture is also used tiled on the plinth.
 */
function toNormalTexture(source: Surface, strength: number): CanvasTexture | null {
  const { canvas, ctx } = source;
  const size = canvas.width;
  const target = createSurface(size);
  if (!target) return null;

  const height = ctx.getImageData(0, 0, size, size).data;
  const out = target.ctx.createImageData(size, size);
  const at = (x: number, y: number) =>
    height[(((y + size) % size) * size + ((x + size) % size)) * 4] as number;

  for (let y = 0; y < size; y += 1) {
    for (let x = 0; x < size; x += 1) {
      // A 3x3 Sobel rather than a 2-tap difference: single-tap gradients turn
      // the PRNG's own pixel noise into a normal map of pure static.
      const tl = at(x - 1, y - 1);
      const tc = at(x, y - 1);
      const tr = at(x + 1, y - 1);
      const ml = at(x - 1, y);
      const mr = at(x + 1, y);
      const bl = at(x - 1, y + 1);
      const bc = at(x, y + 1);
      const br = at(x + 1, y + 1);

      const dx = (tr + 2 * mr + br - (tl + 2 * ml + bl)) / 1020;
      // Canvas y runs down and texture v runs up, so the row derivative is
      // already the negated v derivative the normal wants.
      const dy = (bl + 2 * bc + br - (tl + 2 * tc + tr)) / 1020;

      const nx = -dx * strength;
      const ny = dy * strength;
      const inverse = 1 / Math.sqrt(nx * nx + ny * ny + 1);

      const index = (y * size + x) * 4;
      out.data[index] = (nx * inverse * 0.5 + 0.5) * 255;
      out.data[index + 1] = (ny * inverse * 0.5 + 0.5) * 255;
      out.data[index + 2] = (inverse * 0.5 + 0.5) * 255;
      out.data[index + 3] = 255;
    }
  }

  target.ctx.putImageData(out, 0, 0);
  return new CanvasTexture(target.canvas);
}

/* ------------------------------------------------------------------ *
 * Public surfaces
 * ------------------------------------------------------------------ */

export interface MachinedSurface {
  roughnessMap: Texture | null;
  normalMap: Texture | null;
}

const EMPTY_SURFACE: MachinedSurface = { roughnessMap: null, normalMap: null };

/**
 * The housing: brushed, anodised, lightly handled. `marked` adds the etching
 * and the monogram, and is set on exactly one of the four plates.
 */
export function createMachinedSurface(seed: number, marked = false): MachinedSurface {
  const field = drawHeightField({
    seed,
    size: 512,
    // Brushing runs up the slope of the plate, the way a part this shape would
    // be drawn under the belt.
    grain: Math.PI / 2 + 0.08,
    scratchCount: 900,
    marked,
  });
  if (!field) return EMPTY_SURFACE;

  /*
   * 0.62 base, not 0.44. The difference is the difference between anodising
   * and brushed steel: at 0.44 the specular lobe is tight enough to cover a
   * whole plate in a single bright sheet, and the housing photographs as
   * stainless. At 0.62 the same light is spread until the plate stays dark and
   * only the bevels and the scratches come up — which is what the material
   * this object is supposed to be made of actually does.
   */
  const roughnessMap = toRoughnessTexture(field, 0.62, 0.78);
  const normalMap = toNormalTexture(field, 1.8);
  if (roughnessMap) roughnessMap.anisotropy = 8;
  if (normalMap) normalMap.anisotropy = 8;

  return { roughnessMap, normalMap };
}

/**
 * The mechanism: turned, not brushed. The grain runs around the part, so on a
 * lathe geometry's UV — u around the revolution, v along the profile — the
 * marks have to run along v.
 */
export function createTurnedSurface(seed: number): MachinedSurface {
  const field = drawHeightField({
    seed,
    size: 256,
    grain: Math.PI / 2,
    scratchCount: 420,
    marked: false,
  });
  if (!field) return EMPTY_SURFACE;

  const roughnessMap = toRoughnessTexture(field, 0.3, 0.7);
  const normalMap = toNormalTexture(field, 1.1);

  for (const map of [roughnessMap, normalMap]) {
    if (!map) continue;
    map.wrapS = RepeatWrapping;
    map.wrapT = RepeatWrapping;
    map.repeat.set(6, 1);
    map.anisotropy = 8;
  }

  return { roughnessMap, normalMap };
}

/**
 * A radial falloff sprite, used for the emitter's glow and for the pool of
 * light that anchors the object.
 *
 * The stops are deliberately not a linear ramp: a linear radial gradient has a
 * visible edge where it terminates, and one visible edge is all it takes for
 * the whole effect to read as a PNG with a gradient in it.
 */
export function createFalloffTexture(exponent: number, size = 128): CanvasTexture | null {
  const surface = createSurface(size);
  if (!surface) return null;
  const { canvas, ctx } = surface;

  const gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  const steps = 24;
  for (let i = 0; i <= steps; i += 1) {
    const t = i / steps;
    gradient.addColorStop(t, `rgba(255, 255, 255, ${Math.pow(1 - t, exponent).toFixed(4)})`);
  }

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);
  return new CanvasTexture(canvas);
}

/** Every texture this module hands out is owned by its caller. */
export function disposeSurface(surface: MachinedSurface): void {
  surface.roughnessMap?.dispose();
  surface.normalMap?.dispose();
}
