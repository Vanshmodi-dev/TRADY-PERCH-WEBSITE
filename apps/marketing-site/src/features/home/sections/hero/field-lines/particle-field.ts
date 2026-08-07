/**
 * FIELD LINES — the particle field.
 *
 * Physics model, in the order the sequence uses it:
 *
 *   CHARGE   Dust is suspended, randomly oriented, unaffected by anything.
 *   ALIGN    The field energises. Particles ROTATE ONLY — no translation.
 *            This is the signature beat: thousands of slivers turning in
 *            unison, flashing as they pass through the light's angle.
 *   MIGRATE  Translation gain ramps in. Particles accelerate ALONG the local
 *            field vector, so they travel curved field lines rather than
 *            straight lines to a target. Density gathers into the letterform
 *            before the letterform is legible.
 *   SETTLE   Each participating particle closes on its assigned pole under a
 *            critically damped spring, producing one brief overshoot-and-seat
 *            rather than a soft fade into position.
 *   FORMED   Held. Non-participating dust remains suspended as ambience.
 *
 * Every stage transition is a GAIN RAMP, not a switch — the component tells
 * the field which stage it is in, and the gains ease toward that stage's
 * targets over a short time constant. Beats therefore cross-fade into one
 * another instead of stepping, which is most of the difference between
 * "cinematic" and "flashy".
 *
 * Performance strategy, because this is the constraint that decides whether
 * the effect reads premium or amateur:
 *   - Structure-of-arrays (Float32Array per attribute), not an array of
 *     objects, so the hot loop stays cache-coherent.
 *   - Pre-rotated sprite atlas; per particle the draw is one `drawImage`.
 *   - Particles bucketed into a few alpha bands per frame, so `globalAlpha`
 *     changes a handful of times rather than once per particle.
 *   - An adaptive governor that permanently sheds particles if the measured
 *     frame budget is missed. A stuttering field is worse than a smaller one.
 */

import { atlasIndexForAngle, createFleckAtlas, type FleckAtlas } from "./fleck-atlas";
import { buildFieldGrid, clamp, sampleField, sampleWordmarkPoles, type FieldGrid } from "./wordmark-field";

export type FieldStage = "charge" | "align" | "migrate" | "settle" | "formed";

interface StageGains {
  align: number;
  drift: number;
  settle: number;
  visibility: number;
}

const STAGE_TARGETS: Record<FieldStage, StageGains> = {
  charge: { align: 0, drift: 0, settle: 0, visibility: 1 },
  align: { align: 1, drift: 0, settle: 0, visibility: 1 },
  migrate: { align: 1, drift: 1, settle: 0, visibility: 1 },
  settle: { align: 1, drift: 0.25, settle: 1, visibility: 1 },
  formed: { align: 1, drift: 0, settle: 1, visibility: 1 },
};

/** Share of particles that migrate into the wordmark. The remainder stay
 *  suspended and become the hero's ambient dust — the same dust, which is what
 *  makes the transition read as continuous rather than as a cut. */
const PARTICIPATION = 0.72;

/** Alpha quantisation bands. Six is enough that banding is invisible against
 *  a near-black field, and few enough that `globalAlpha` is touched six times
 *  per frame instead of ~2600. */
const ALPHA_BANDS = 6;

const BASE_DESKTOP_COUNT = 2600;
const BASE_MOBILE_COUNT = 900;
const MOBILE_BREAKPOINT = 768;

/** Frame budget before the governor intervenes. 20ms leaves headroom under a
 *  60Hz 16.7ms target for the compositor and the rest of the page. */
const BUDGET_MS = 20;
const GOVERNOR_WINDOW = 45;
const MIN_COUNT_FACTOR = 0.4;

export interface ParticleFieldOptions {
  wordmark: string;
  /** Overrides the viewport-derived particle count. Tests use this. */
  count?: number;
  onReady?: () => void;
}

export class ParticleField {
  private readonly canvas: HTMLCanvasElement;
  private readonly options: ParticleFieldOptions;
  private ctx: CanvasRenderingContext2D | null = null;
  private atlas: FleckAtlas | null = null;
  private grid: FieldGrid | null = null;

  private width = 0;
  private height = 0;
  private scale = 1;

  private capacity = 0;
  private active = 0;

  private x = new Float32Array(0);
  private y = new Float32Array(0);
  private vx = new Float32Array(0);
  private vy = new Float32Array(0);
  private angle = new Float32Array(0);
  private spin = new Float32Array(0);
  private targetX = new Float32Array(0);
  private targetY = new Float32Array(0);
  private participates = new Uint8Array(0);
  private sizeJitter = new Float32Array(0);

  private gains: StageGains = { align: 0, drift: 0, settle: 0, visibility: 0 };
  private stage: FieldStage = "charge";

  /** Angle of the scene's key light. Drives the anisotropic flash. */
  private lightAngle = -0.6;
  /** Sweep bar position, 0..1 across the frame. Negative means inactive. */
  private sweep = -1;

  private rafId = 0;
  private lastTime = 0;
  private running = false;
  private frameSamples: number[] = [];
  private governorSteps = 0;
  private ready = false;

  constructor(canvas: HTMLCanvasElement, options: ParticleFieldOptions) {
    this.canvas = canvas;
    this.options = options;
  }

  /** True once poles were found and the field is renderable. When this stays
   *  false the caller must fall back to the static presentation. */
  isReady(): boolean {
    return this.ready;
  }

  resize(width: number, height: number, scale: number): void {
    this.width = width;
    this.height = height;
    this.scale = scale;

    this.canvas.width = Math.max(1, Math.floor(width * scale));
    this.canvas.height = Math.max(1, Math.floor(height * scale));
    this.canvas.style.width = `${width}px`;
    this.canvas.style.height = `${height}px`;

    this.ctx = this.canvas.getContext("2d", { alpha: true });
    if (!this.ctx) return;
    this.ctx.setTransform(scale, 0, 0, scale, 0, 0);

    this.atlas = createFleckAtlas(scale);

    const poles = sampleWordmarkPoles(this.options.wordmark, {
      width: Math.floor(width * scale),
      height: Math.floor(height * scale),
      scale,
      // Read off the live canvas rather than hard-coded: the canvas inherits
      // the document's font stack, so this resolves `next/font`'s generated
      // family name. See RasterTarget.fontFamily for why that matters.
      fontFamily: resolveFontFamily(this.canvas),
    });

    if (poles.length === 0 || !this.atlas) {
      this.ready = false;
      return;
    }

    this.grid = buildFieldGrid(poles, width, height);
    this.allocate(poles);
    this.ready = true;
    this.options.onReady?.();
  }

  private allocate(poles: ReadonlyArray<{ x: number; y: number }>): void {
    const base = this.width < MOBILE_BREAKPOINT ? BASE_MOBILE_COUNT : BASE_DESKTOP_COUNT;
    const requested = this.options.count ?? base;
    // Preserve any reduction the governor already applied across a resize —
    // the device has not become faster since.
    const factor = Math.max(MIN_COUNT_FACTOR, 1 - this.governorSteps * 0.25);
    const count = Math.max(1, Math.round(requested * factor));

    this.capacity = count;
    this.active = count;
    this.x = new Float32Array(count);
    this.y = new Float32Array(count);
    this.vx = new Float32Array(count);
    this.vy = new Float32Array(count);
    this.angle = new Float32Array(count);
    this.spin = new Float32Array(count);
    this.targetX = new Float32Array(count);
    this.targetY = new Float32Array(count);
    this.participates = new Uint8Array(count);
    this.sizeJitter = new Float32Array(count);

    for (let index = 0; index < count; index += 1) {
      this.x[index] = Math.random() * this.width;
      this.y[index] = Math.random() * this.height;
      this.vx[index] = 0;
      this.vy[index] = 0;
      this.angle[index] = Math.random() * Math.PI * 2;
      // A slow residual tumble so the charge beat is not perfectly inert.
      this.spin[index] = (Math.random() - 0.5) * 0.35;
      this.sizeJitter[index] = 0.6 + Math.random() * 0.75;

      const participating = Math.random() < PARTICIPATION;
      this.participates[index] = participating ? 1 : 0;
      // Assigning a specific pole rather than letting particles find the
      // nearest one is what keeps the finished wordmark evenly dense.
      const pole = poles[Math.floor(Math.random() * poles.length)];
      this.targetX[index] = pole?.x ?? this.width / 2;
      this.targetY[index] = pole?.y ?? this.height / 2;
    }
  }

  setStage(stage: FieldStage): void {
    this.stage = stage;
  }

  /** 0..1 across the frame; anything negative disables the bar. */
  setSweep(position: number): void {
    this.sweep = position;
  }

  setLightAngle(angle: number): void {
    this.lightAngle = angle;
  }

  start(): void {
    if (this.running || !this.ready) return;
    this.running = true;
    this.lastTime = 0;
    this.rafId = requestAnimationFrame(this.frame);
  }

  stop(): void {
    this.running = false;
    if (this.rafId) cancelAnimationFrame(this.rafId);
    this.rafId = 0;
  }

  destroy(): void {
    this.stop();
    this.ctx = null;
    this.atlas = null;
    this.grid = null;
  }

  private frame = (time: number): void => {
    if (!this.running) return;
    const previous = this.lastTime || time;
    // Clamped so a backgrounded tab returning does not integrate one enormous
    // step and fling every particle off-screen.
    const delta = Math.min(48, time - previous);
    this.lastTime = time;

    const started = performance.now();
    this.step(delta / 16.6667);
    this.render();
    this.govern(performance.now() - started);

    this.rafId = requestAnimationFrame(this.frame);
  };

  /** Sheds particles permanently if the measured frame cost misses budget.
   *  Ships fewer, correctly lit particles rather than a field that judders. */
  private govern(frameCost: number): void {
    if (this.governorSteps >= 2) return;
    this.frameSamples.push(frameCost);
    if (this.frameSamples.length < GOVERNOR_WINDOW) return;

    const total = this.frameSamples.reduce((sum, value) => sum + value, 0);
    const average = total / this.frameSamples.length;
    this.frameSamples = [];

    if (average > BUDGET_MS) {
      this.governorSteps += 1;
      this.active = Math.max(
        Math.round(this.capacity * MIN_COUNT_FACTOR),
        Math.round(this.active * 0.75),
      );
    }
  }

  private step(dt: number): void {
    const grid = this.grid;
    if (!grid) return;

    const target = STAGE_TARGETS[this.stage];
    // Gains ease toward the stage's targets rather than snapping, which is
    // what makes consecutive beats cross-fade.
    const ease = Math.min(1, 0.09 * dt);
    this.gains.align += (target.align - this.gains.align) * ease;
    this.gains.drift += (target.drift - this.gains.drift) * ease;
    this.gains.settle += (target.settle - this.gains.settle) * ease;
    this.gains.visibility += (target.visibility - this.gains.visibility) * ease;

    const { align, drift, settle } = this.gains;
    const damping = Math.pow(0.86, dt);

    for (let index = 0; index < this.active; index += 1) {
      const px = this.x[index] ?? 0;
      const py = this.y[index] ?? 0;
      const sample = sampleField(grid, px, py);

      // ORIENTATION — always integrated, gated by the align gain. Particles
      // rotate toward the local field angle along the shortest arc. The field
      // is undirected (a filing has no head or tail), so the target is
      // whichever of angle/angle+PI is nearer; without that, half the field
      // spins 180 degrees for no visible reason.
      const currentAngle = this.angle[index] ?? 0;
      const forward = shortestArc(currentAngle, sample.angle);
      const reverse = shortestArc(currentAngle, sample.angle + Math.PI);
      const arc = Math.abs(forward) < Math.abs(reverse) ? forward : reverse;

      const alignStrength = align * (0.1 + sample.magnitude * 0.5);
      const spin = this.spin[index] ?? 0;
      const residualSpin = spin * (1 - align);
      this.angle[index] = currentAngle + (arc * alignStrength + residualSpin * 0.02) * dt;

      // TRANSLATION — along the field vector, never straight at the target.
      let vx = this.vx[index] ?? 0;
      let vy = this.vy[index] ?? 0;

      if (drift > 0.001) {
        const force = drift * (0.06 + sample.magnitude * 0.5);
        vx += Math.cos(sample.angle) * force * dt;
        vy += Math.sin(sample.angle) * force * dt;
      }

      if (settle > 0.001 && this.participates[index] === 1) {
        // Critically damped approach to the assigned pole. The stiffness ramp
        // means the final seat is quick while the approach stays unhurried.
        const toX = (this.targetX[index] ?? px) - px;
        const toY = (this.targetY[index] ?? py) - py;
        const stiffness = settle * 0.055;
        vx += toX * stiffness * dt;
        vy += toY * stiffness * dt;
      }

      vx *= damping;
      vy *= damping;

      let nx = px + vx * dt;
      let ny = py + vy * dt;

      // Non-participating dust wraps rather than escaping, so ambience holds
      // an even density for the whole sequence.
      if (this.participates[index] === 0) {
        if (nx < -8) nx = this.width + 8;
        else if (nx > this.width + 8) nx = -8;
        if (ny < -8) ny = this.height + 8;
        else if (ny > this.height + 8) ny = -8;
      }

      this.vx[index] = vx;
      this.vy[index] = vy;
      this.x[index] = nx;
      this.y[index] = ny;
    }
  }

  private render(): void {
    const ctx = this.ctx;
    const atlas = this.atlas;
    if (!ctx || !atlas) return;

    ctx.clearRect(0, 0, this.width, this.height);
    ctx.globalCompositeOperation = "lighter";

    const { cell, half, steps } = atlas;
    const cssCell = cell / this.scale;
    const cssHalf = half / this.scale;
    const sweepX = this.sweep >= 0 ? this.sweep * this.width : Number.NaN;
    const sweepWidth = this.width * 0.16;

    // Bucket indices by alpha band, then draw band by band. One globalAlpha
    // write per band instead of one per particle.
    const buckets: number[][] = Array.from({ length: ALPHA_BANDS }, () => []);

    for (let index = 0; index < this.active; index += 1) {
      const particleAngle = this.angle[index] ?? 0;

      // Anisotropic specular: brushed metal flashes twice per revolution as
      // its grain crosses the light. Zero emission — this is the only source
      // of a fleck's brightness.
      const relative = particleAngle - this.lightAngle;
      const specular = Math.abs(Math.cos(relative));
      // Floor lowered from 0.16: an off-axis fleck should fall away into the
      // black rather than sit at a permanent readable grey. Only the flecks
      // actually catching the light are visible at any instant, which is both
      // how metal behaves and what keeps the frame from reading as grain.
      let brightness = 0.11 + Math.pow(specular, 3) * 0.89;

      if (!Number.isNaN(sweepX)) {
        const distance = Math.abs((this.x[index] ?? 0) - sweepX);
        if (distance < sweepWidth) {
          brightness += (1 - distance / sweepWidth) * 0.9;
        }
      }

      brightness *= this.gains.visibility;
      if (brightness <= 0.02) continue;

      const band = Math.min(ALPHA_BANDS - 1, Math.floor(brightness * ALPHA_BANDS));
      buckets[band]?.push(index);
    }

    for (let band = 0; band < ALPHA_BANDS; band += 1) {
      const bucket = buckets[band];
      if (!bucket || bucket.length === 0) continue;
      // Ceiling pulled down from 0.9. Under `lighter` compositing, flecks
      // overlapping inside the dense letterform stacked to pure white and
      // blew out the counters of the glyphs — which is precisely what made
      // the formed wordmark read as a bright smear instead of as type.
      ctx.globalAlpha = Math.min(1, ((band + 0.5) / ALPHA_BANDS) * 0.72);

      for (const index of bucket) {
        const sprite = atlasIndexForAngle(this.angle[index] ?? 0, steps);
        const jitter = this.sizeJitter[index] ?? 1;
        const drawSize = cssCell * jitter;
        ctx.drawImage(
          atlas.canvas,
          sprite * cell,
          0,
          cell,
          cell,
          (this.x[index] ?? 0) - cssHalf * jitter,
          (this.y[index] ?? 0) - cssHalf * jitter,
          drawSize,
          drawSize,
        );
      }
    }

    ctx.globalAlpha = 1;
    ctx.globalCompositeOperation = "source-over";
  }
}

/**
 * The document's own resolved font stack, for canvas shaping.
 *
 * Falls back to the token stack's literal names only when there is no
 * computed style to read (jsdom under test) — in a browser the computed value
 * always wins, because only it contains `next/font`'s generated family name.
 */
function resolveFontFamily(element: HTMLElement): string {
  if (typeof window === "undefined" || typeof window.getComputedStyle !== "function") {
    return 'system-ui, sans-serif';
  }
  const computed = window.getComputedStyle(element).fontFamily;
  return computed && computed.trim().length > 0 ? computed : "system-ui, sans-serif";
}

/** Signed shortest angular distance from `from` to `to`, in (-PI, PI]. */
export function shortestArc(from: number, to: number): number {
  let delta = (to - from) % (Math.PI * 2);
  if (delta > Math.PI) delta -= Math.PI * 2;
  if (delta < -Math.PI) delta += Math.PI * 2;
  return delta;
}

export { clamp };
