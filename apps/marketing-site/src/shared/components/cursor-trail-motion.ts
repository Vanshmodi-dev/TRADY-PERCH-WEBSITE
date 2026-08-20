/**
 * THE GOLDEN TRAIL — particle state and integration.
 *
 * Split from the component for the same reason apex-math.ts is: this is the
 * part that is genuinely unverifiable by eye. A fade that lands hard, a pull
 * that quietly compounds into an orbit, a recycler that steals a particle
 * while it is still visible — each of those survives review and then reads,
 * indefinably, as cheap. Here they are pure functions over plain objects, so
 * they can be asserted instead of inspected.
 *
 * Nothing in this file touches the DOM, `window`, or `performance`. Time
 * arrives as a delta argument; randomness arrives as an injected function.
 */

import {
  ATTRACTION,
  ATTRACTION_FALLOFF,
  BUOYANCY,
  DRAG_TAU_MS,
  HOLD_FRACTION,
  LIFETIME_JITTER_MS,
  LIFETIME_MS,
  OPACITY_MAX,
  OPACITY_MIN,
  RISE_FRACTION,
  SCALE_MAX,
  SCALE_MIN,
  SPAWN_BACKWARD_BIAS,
  SPAWN_SCATTER,
  SPAWN_SPEED_MAX,
  SPAWN_SPEED_MIN,
  SWIRL,
} from "./cursor-trail-config";

/** A source of uniform [0, 1) values. Injected so tests are deterministic. */
export type Random = () => number;

export interface TrailParticle {
  /** Slots are recycled, never allocated; this is what "in use" means. */
  active: boolean;
  x: number;
  y: number;
  /** Velocity, px/s. */
  vx: number;
  vy: number;
  ageMs: number;
  lifeMs: number;
  /** Size multiplier on the sprite. */
  scale: number;
  /** Peak opacity this particle reaches at the top of its lifecycle. */
  peak: number;
  /** Signed tangential bias — which way this particle's path bows. */
  swirl: number;
}

export interface SpawnPoint {
  x: number;
  y: number;
  /** Unit vector along the pointer's direction of travel. */
  dirX: number;
  dirY: number;
}

/** Build the pool once, at mount. */
export function createTrailPool(size: number): TrailParticle[] {
  return Array.from({ length: size }, () => ({
    active: false,
    x: 0,
    y: 0,
    vx: 0,
    vy: 0,
    ageMs: 0,
    lifeMs: LIFETIME_MS,
    scale: 1,
    peak: OPACITY_MIN,
    swirl: 1,
  }));
}

/**
 * Which slot the next particle should take.
 *
 * Free slots first. If the pool is genuinely saturated the oldest particle is
 * recycled rather than the emission dropped — with the pool sized against the
 * emission rate that branch should not be reached in practice, but a dropped
 * emission would thin the trail exactly when the pointer is moving fastest,
 * which is the wrong failure to choose.
 */
export function nextSlot(pool: readonly TrailParticle[]): number {
  let oldest = 0;
  let oldestProgress = -1;
  for (let index = 0; index < pool.length; index += 1) {
    const particle = pool[index];
    if (!particle) continue;
    if (!particle.active) return index;
    const progress = particle.ageMs / particle.lifeMs;
    if (progress > oldestProgress) {
      oldestProgress = progress;
      oldest = index;
    }
  }
  return oldest;
}

const lerp = (from: number, to: number, t: number) => from + (to - from) * t;

/**
 * Bring a slot to life at the spawn point.
 *
 * The initial velocity is mostly backwards along the direction of travel with
 * a sideways component mixed in — so the particle appears to be left behind
 * by the pointer rather than fired from it, and the trail has width without
 * anything being scattered.
 */
export function emitParticle(particle: TrailParticle, spawn: SpawnPoint, random: Random): void {
  const scatterAngle = random() * Math.PI * 2;
  const scatterRadius = random() * SPAWN_SCATTER;

  particle.x = spawn.x + Math.cos(scatterAngle) * scatterRadius;
  particle.y = spawn.y + Math.sin(scatterAngle) * scatterRadius;

  const speed = lerp(SPAWN_SPEED_MIN, SPAWN_SPEED_MAX, random());
  /* Perpendicular to the direction of travel, sign taken from the same draw
     that sets the swirl so a particle's initial sideways nudge and its later
     curve agree rather than fighting. */
  const side = random() < 0.5 ? -1 : 1;
  const lateral = 1 - SPAWN_BACKWARD_BIAS;
  particle.vx = (-spawn.dirX * SPAWN_BACKWARD_BIAS - spawn.dirY * side * lateral) * speed;
  particle.vy = (-spawn.dirY * SPAWN_BACKWARD_BIAS + spawn.dirX * side * lateral) * speed;

  particle.ageMs = 0;
  particle.lifeMs = LIFETIME_MS + (random() * 2 - 1) * LIFETIME_JITTER_MS;
  particle.scale = lerp(SCALE_MIN, SCALE_MAX, random());
  particle.peak = lerp(OPACITY_MIN, OPACITY_MAX, random());
  particle.swirl = side * SWIRL;
  particle.active = true;
}

/**
 * Integrate one particle by `deltaMs`, given where the pointer is now.
 *
 * Order matters: acceleration, then drag, then position. Applying drag last
 * would let a large frame delta inject a full frame of un-damped acceleration
 * into the position, which is how these fields develop a twitch on a dropped
 * frame.
 *
 * Returns false once the particle has expired, at which point the slot is
 * free again.
 */
export function advanceParticle(
  particle: TrailParticle,
  deltaMs: number,
  pointerX: number,
  pointerY: number,
): boolean {
  particle.ageMs += deltaMs;
  if (particle.ageMs >= particle.lifeMs) {
    particle.active = false;
    return false;
  }

  const seconds = deltaMs / 1000;

  const toX = pointerX - particle.x;
  const toY = pointerY - particle.y;
  const distance = Math.hypot(toX, toY);

  if (distance > 0.001) {
    const unitX = toX / distance;
    const unitY = toY / distance;
    /* Linear ramp to full strength, so a particle near the pointer is pulled
       almost not at all. Without this the closest particles accelerate hardest
       and the field visibly converges on the cursor. */
    const pull = ATTRACTION * Math.min(1, distance / ATTRACTION_FALLOFF);
    particle.vx += (unitX - unitY * particle.swirl) * pull * seconds;
    particle.vy += (unitY + unitX * particle.swirl) * pull * seconds;
  }

  particle.vy -= BUOYANCY * seconds;

  const damping = Math.exp(-deltaMs / DRAG_TAU_MS);
  particle.vx *= damping;
  particle.vy *= damping;

  particle.x += particle.vx * seconds;
  particle.y += particle.vy * seconds;
  return true;
}

/** Hermite smoothstep on [0, 1]: flat at both ends, which is the whole point. */
function smoothstep(t: number): number {
  const clamped = t < 0 ? 0 : t > 1 ? 1 : t;
  return clamped * clamped * (3 - 2 * clamped);
}

/**
 * Opacity at the particle's current age: rise, brief hold, smooth fade.
 *
 * The fade is `1 - smoothstep`, not a linear or quadratic ramp, so the curve
 * is flat where it matters at both ends — a particle neither appears as a dot
 * being switched on nor vanishes as one being switched off. The final tenth
 * of its life spans under a fifteenth of peak opacity, and the final
 * thirtieth under a hundredth of it.
 */
export function particleAlpha(particle: TrailParticle): number {
  const t = particle.ageMs / particle.lifeMs;
  if (t <= 0 || t >= 1) return 0;
  if (t < RISE_FRACTION) return particle.peak * smoothstep(t / RISE_FRACTION);
  if (t < HOLD_FRACTION) return particle.peak;
  return particle.peak * (1 - smoothstep((t - HOLD_FRACTION) / (1 - HOLD_FRACTION)));
}

/**
 * Size at the particle's current age.
 *
 * It expands into existence and then loses a little size as it goes: a dot
 * that only fades reads as a light being dimmed, where one that also
 * contracts reads as something dispersing.
 */
export function particleScale(particle: TrailParticle): number {
  const t = particle.ageMs / particle.lifeMs;
  const arrival = 0.62 + 0.38 * smoothstep(t / RISE_FRACTION);
  const dispersal = 1 - 0.22 * smoothstep(t);
  return particle.scale * arrival * dispersal;
}
