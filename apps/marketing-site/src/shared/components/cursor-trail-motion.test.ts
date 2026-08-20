import { describe, expect, it } from "vitest";
import {
  ATTRACTION,
  LIFETIME_JITTER_MS,
  LIFETIME_MS,
  OPACITY_MAX,
  OPACITY_MIN,
  POOL_SIZE,
  SCALE_MAX,
  SCALE_MIN,
  SPAWN_SCATTER,
  SPAWN_SPEED_MAX,
} from "./cursor-trail-config";
import {
  advanceParticle,
  createTrailPool,
  emitParticle,
  nextSlot,
  particleAlpha,
  particleScale,
  type Random,
  type TrailParticle,
} from "./cursor-trail-motion";

/**
 * The trail's maths, tested where it is genuinely unverifiable by eye.
 *
 * Every assertion here is about restraint rather than about correctness in the
 * usual sense: a pull that is two pixels too strong still looks like a pull,
 * and a fade that lands on 0.04 instead of 0 still looks like a fade. Those
 * are the failures that survive review and then read, indefinably, as cheap —
 * so they are asserted rather than inspected.
 */

/** Deterministic uniform source, so a test never depends on Math.random. */
function seededRandom(seed: number): Random {
  let state = seed >>> 0;
  return () => {
    /* xorshift32 — plenty for choosing spawn angles in a test. */
    state ^= state << 13;
    state >>>= 0;
    state ^= state >>> 17;
    state ^= state << 5;
    state >>>= 0;
    return state / 0xffffffff;
  };
}

function particleAt(overrides: Partial<TrailParticle> = {}): TrailParticle {
  return {
    active: true,
    x: 0,
    y: 0,
    vx: 0,
    vy: 0,
    ageMs: 0,
    lifeMs: LIFETIME_MS,
    scale: 1,
    peak: 0.4,
    swirl: 0.4,
    ...overrides,
  };
}

/** Run a particle forward at a fixed 16.7ms step. */
function simulate(particle: TrailParticle, ms: number, pointerX: number, pointerY: number): void {
  const step = 16.7;
  for (let elapsed = 0; elapsed < ms; elapsed += step) {
    if (!advanceParticle(particle, step, pointerX, pointerY)) return;
  }
}

describe("particleAlpha", () => {
  it("is fully transparent at birth and at death", () => {
    expect(particleAlpha(particleAt({ ageMs: 0 }))).toBe(0);
    expect(particleAlpha(particleAt({ ageMs: LIFETIME_MS }))).toBe(0);
  });

  it("reaches its peak in the hold phase and never exceeds it", () => {
    const particle = particleAt({ peak: 0.4 });
    let highest = 0;
    for (let age = 0; age <= LIFETIME_MS; age += 5) {
      particle.ageMs = age;
      highest = Math.max(highest, particleAlpha(particle));
      expect(particleAlpha(particle)).toBeLessThanOrEqual(0.4 + 1e-9);
    }
    expect(highest).toBeCloseTo(0.4, 5);
  });

  it("never brightens once the fade has begun", () => {
    const particle = particleAt();
    let previous = Infinity;
    for (let age = LIFETIME_MS * 0.4; age <= LIFETIME_MS; age += 5) {
      particle.ageMs = age;
      const alpha = particleAlpha(particle);
      expect(alpha).toBeLessThanOrEqual(previous + 1e-9);
      previous = alpha;
    }
  });

  it("disappears imperceptibly — the fade's own tail is nearly flat", () => {
    /* This is the assertion a linear fade would fail, and it is the whole
       reason the curve is a smoothstep: what a visitor registers as a particle
       "popping out" is the size of the final step to zero. At peak 0.4 the
       last tenth of a life spans under 0.03 of absolute alpha, and the last
       thirtieth under 0.004. */
    const particle = particleAt({ peak: 0.4 });

    particle.ageMs = LIFETIME_MS * 0.9;
    expect(particleAlpha(particle)).toBeLessThan(0.4 * 0.07);

    particle.ageMs = LIFETIME_MS * 0.97;
    expect(particleAlpha(particle)).toBeLessThan(0.4 * 0.01);
  });
});

describe("particleScale", () => {
  it("grows in and then loses size, never exceeding its own base scale", () => {
    const particle = particleAt({ scale: 1 });
    particle.ageMs = 0;
    const born = particleScale(particle);
    particle.ageMs = LIFETIME_MS * 0.25;
    const settled = particleScale(particle);
    particle.ageMs = LIFETIME_MS * 0.95;
    const dying = particleScale(particle);

    expect(born).toBeLessThan(settled);
    expect(dying).toBeLessThan(settled);
    expect(settled).toBeLessThanOrEqual(1);
  });
});

describe("emitParticle", () => {
  const spawn = { x: 400, y: 300, dirX: 1, dirY: 0 };

  it("spawns inside the scatter radius of the spawn point", () => {
    const random = seededRandom(7);
    for (let run = 0; run < 50; run += 1) {
      const particle = particleAt({ active: false });
      emitParticle(particle, spawn, random);
      expect(Math.hypot(particle.x - spawn.x, particle.y - spawn.y)).toBeLessThanOrEqual(
        SPAWN_SCATTER + 1e-9,
      );
    }
  });

  it("leaves every particle behind the pointer, never ahead of it", () => {
    /* A particle thrown forwards would overtake the cursor and read as being
       emitted by it — the effect is dust left behind, not exhaust. */
    const random = seededRandom(11);
    for (let run = 0; run < 50; run += 1) {
      const particle = particleAt({ active: false });
      emitParticle(particle, spawn, random);
      expect(particle.vx * spawn.dirX + particle.vy * spawn.dirY).toBeLessThan(0);
    }
  });

  it("keeps size, opacity, lifetime and speed inside their configured ranges", () => {
    const random = seededRandom(23);
    for (let run = 0; run < 200; run += 1) {
      const particle = particleAt({ active: false });
      emitParticle(particle, spawn, random);

      expect(particle.active).toBe(true);
      expect(particle.ageMs).toBe(0);
      expect(particle.scale).toBeGreaterThanOrEqual(SCALE_MIN);
      expect(particle.scale).toBeLessThanOrEqual(SCALE_MAX);
      expect(particle.peak).toBeGreaterThanOrEqual(OPACITY_MIN);
      expect(particle.peak).toBeLessThanOrEqual(OPACITY_MAX);
      expect(particle.lifeMs).toBeGreaterThanOrEqual(LIFETIME_MS - LIFETIME_JITTER_MS);
      expect(particle.lifeMs).toBeLessThanOrEqual(LIFETIME_MS + LIFETIME_JITTER_MS);
      expect(Math.hypot(particle.vx, particle.vy)).toBeLessThanOrEqual(SPAWN_SPEED_MAX + 1e-9);
    }
  });
});

describe("advanceParticle", () => {
  it("retires the slot at the end of its life", () => {
    const particle = particleAt({ lifeMs: 100, ageMs: 80 });
    expect(advanceParticle(particle, 16.7, 0, 0)).toBe(true);
    expect(advanceParticle(particle, 16.7, 0, 0)).toBe(false);
    expect(particle.active).toBe(false);
  });

  it("drifts toward the pointer by only a few pixels over a whole lifetime", () => {
    /* The gravitational term is meant to be felt subconsciously and never
       seen. Over its entire life a still particle 200px away should close a
       single-digit fraction of that distance — if this ever reads in the tens
       of pixels the field has started chasing the cursor. */
    const particle = particleAt({ x: 200, y: 0 });
    const before = Math.hypot(particle.x, particle.y);
    simulate(particle, LIFETIME_MS - 20, 0, 0);
    const closed = before - Math.hypot(particle.x, particle.y);

    expect(closed).toBeGreaterThan(1);
    expect(closed).toBeLessThan(20);
  });

  it("barely pulls a particle that is already on the pointer", () => {
    /* The falloff is what prevents the collapse-and-orbit failure mode: the
       nearer a particle is, the less it is pulled, so nothing ever converges
       on the cursor and starts circling it. */
    const near = particleAt({ x: 4, y: 0 });
    const far = particleAt({ x: 200, y: 0 });
    simulate(near, 300, 0, 0);
    simulate(far, 300, 0, 0);

    expect(Math.hypot(near.vx, near.vy)).toBeLessThan(Math.hypot(far.vx, far.vy));
    /* And in absolute terms it stays a drift, not a dive. */
    expect(Math.hypot(near.vx, near.vy)).toBeLessThan(ATTRACTION * 0.5);
  });

  it("slows a fast particle down rather than letting it coast", () => {
    const particle = particleAt({ x: 0, y: 0, vx: 300, vy: 0 });
    simulate(particle, 500, 0, 0);
    expect(Math.abs(particle.vx)).toBeLessThan(300 * 0.4);
  });

  it("stays bounded — no term compounds over a long life", () => {
    const particle = particleAt({ x: 150, y: 90, vx: 40, vy: -20, lifeMs: 5000 });
    simulate(particle, 4800, 0, 0);
    expect(Math.hypot(particle.vx, particle.vy)).toBeLessThan(60);
    expect(Number.isFinite(particle.x)).toBe(true);
  });
});

describe("nextSlot", () => {
  it("takes a free slot before recycling anything", () => {
    const pool = createTrailPool(POOL_SIZE);
    expect(pool).toHaveLength(POOL_SIZE);
    const first = pool[0];
    if (!first) throw new Error("pool was not built");
    first.active = true;
    expect(nextSlot(pool)).toBe(1);
  });

  it("recycles the particle closest to the end of its life when saturated", () => {
    const pool = createTrailPool(3);
    pool.forEach((particle, index) => {
      particle.active = true;
      particle.lifeMs = 1000;
      particle.ageMs = index * 100;
    });
    expect(nextSlot(pool)).toBe(2);
  });
});
