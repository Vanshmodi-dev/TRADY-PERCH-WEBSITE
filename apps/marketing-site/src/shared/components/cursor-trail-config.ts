/**
 * THE GOLDEN TRAIL — tuning constants.
 *
 * Every number that defines how the effect *feels* lives here, in one block,
 * so a future visual pass is an edit to this file rather than an archaeology
 * expedition through a render loop. The loop itself (cursor-trail.tsx) reads
 * these and owns no magic numbers of its own.
 *
 * The governing instinct throughout is restraint. This is a micro-interaction
 * on a dark, gold-accented brand: it should be noticed some seconds after a
 * visitor starts moving the pointer, never on arrival. If a value here is
 * ever in doubt, the smaller one is correct.
 */

/* ── Budget ───────────────────────────────────────────────────────────── */

/**
 * Pool size. Never allocated per particle — the pool is built once and slots
 * are recycled, so a pointer moved for ten minutes creates exactly this many
 * objects and this many DOM nodes in total.
 *
 * Sized from the emission maths rather than picked: at one particle per
 * MIN_EMIT_INTERVAL_MS over a maximum lifetime of
 * LIFETIME_MS + LIFETIME_JITTER_MS, at most ~17 can be alive at once. The
 * spare slots mean the recycler never has to steal a particle that is still
 * visible, which is what a "pop" in a trail actually is.
 */
export const POOL_SIZE = 20;

/**
 * Floor on the gap between emissions, ms.
 *
 * This is the ceiling on density, and it is deliberately a *time* gate rather
 * than only a distance one: a fast flick across the viewport covers the
 * distance threshold every frame, and without this it would fire a particle
 * per frame and read as a spray. Fast movement therefore lengthens the trail
 * (the particles are spaced further apart) without thickening it.
 */
export const MIN_EMIT_INTERVAL_MS = 60;

/**
 * Distance the pointer must travel between emissions, px.
 *
 * The counterpart gate: it is what makes a slow, considered movement produce
 * a sparser trail than a brisk one, and what makes a stationary pointer
 * produce nothing at all.
 */
export const EMIT_DISTANCE = 18;

/* ── Lifetime ─────────────────────────────────────────────────────────── */

/** Median particle lifetime, ms. */
export const LIFETIME_MS = 880;
/** ± spread on the above, so particles never expire in lockstep. */
export const LIFETIME_JITTER_MS = 160;

/**
 * Lifecycle shape, as fractions of a particle's own lifetime.
 *
 * Rise → brief hold → fade. The fade uses a smoothstep rather than a linear
 * ramp specifically so its *end* is flat: the last tenth of a particle's life
 * spans under a fifteenth of its peak opacity — about 0.03 of absolute alpha
 * at the brightest a particle ever gets — which is what makes the
 * disappearance imperceptible rather than a dot switching off.
 */
export const RISE_FRACTION = 0.16;
export const HOLD_FRACTION = 0.34;

/* ── Spawn ────────────────────────────────────────────────────────────── */

/**
 * Time-to-settle of the lagging spawn point, ms.
 *
 * Particles are not born at the pointer; they are born at a point that chases
 * the pointer with this much lag. That single delay is most of the premium
 * feeling — the pointer itself stays exact and immediate, while the field it
 * disturbs is soft and a beat behind.
 */
export const TAIL_TAU_MS = 95;

/** Random scatter around the spawn point, px. Enough to read as a field. */
export const SPAWN_SCATTER = 3.4;

/** Initial speed range, px/s. Barely a drift. */
export const SPAWN_SPEED_MIN = 12;
export const SPAWN_SPEED_MAX = 34;

/**
 * How much of the initial velocity is aimed backwards along the pointer's
 * direction of travel versus scattered across it. 1 = straight back, 0 = pure
 * sideways. Mostly backwards, so the trail trails.
 */
export const SPAWN_BACKWARD_BIAS = 0.72;

/* ── Motion ───────────────────────────────────────────────────────────── */

/**
 * Velocity decay time constant, ms. Applied as `v *= e^(-dt/tau)`, so the
 * slowdown is framerate-independent — identical on a 60Hz panel and a 240Hz
 * one, where a per-frame multiplier would be four times as aggressive.
 */
export const DRAG_TAU_MS = 430;

/**
 * Peak acceleration toward the pointer, px/s².
 *
 * The "gravitational" term, and the value most likely to be over-tuned. At
 * this strength a particle's path bends by a few pixels over its whole life —
 * enough that the field reads as belonging to the pointer, far too little to
 * ever look like a chase or an orbit. Anything above ~60 starts to visibly
 * curve and the effect stops being subconscious.
 */
export const ATTRACTION = 32;

/**
 * Distance at which attraction reaches full strength, px. Below it the pull
 * scales down linearly toward zero — a particle sitting on the pointer is
 * pulled by nothing, which is what prevents the collapse-and-orbit failure
 * mode entirely rather than damping it after the fact.
 */
export const ATTRACTION_FALLOFF = 80;

/**
 * Fraction of the pull applied perpendicular to it, signed per particle.
 *
 * This is the whole difference between "dust being drawn along" and "dots on
 * a straight line". Kept well under half, so paths bow rather than spiral.
 */
export const SWIRL = 0.4;

/** Constant upward drift, px/s². Suspended dust settles up, not down. */
export const BUOYANCY = 7;

/* ── Material ─────────────────────────────────────────────────────────── */

/**
 * Size multiplier range on the base sprite, whose gold core is ~2.2px across.
 * Yields cores of roughly 1.2–2.5px: small enough that no single particle is
 * ever legible as a shape.
 */
export const SCALE_MIN = 0.56;
export const SCALE_MAX = 1.14;

/**
 * Peak opacity range. The sprite's own gradient is already sub-unity, so the
 * brightest a core ever gets against the page is around 0.4 — an accent on
 * the background, never a light source on top of it.
 */
export const OPACITY_MIN = 0.26;
export const OPACITY_MAX = 0.46;

/* ── Interactive targets ──────────────────────────────────────────────── */

/**
 * What counts as "interactive" for the hover lift.
 *
 * Resolved from the pointermove event's own target with `closest()` — a tree
 * walk, no layout read, no `elementFromPoint`. Deliberately the ordinary
 * semantics of interactivity rather than a bespoke attribute vocabulary: the
 * trail should not need the page to be annotated for it, and an effect that
 * has to be opted into element by element drifts out of sync with the markup
 * the first time a component is added.
 */
export const INTERACTIVE_SELECTOR =
  "a[href], button:not(:disabled), [role='button'], summary, label[for], " +
  "input:not([type='hidden']), textarea, select";

/**
 * The hover lift itself, and the reason it is stated as two multipliers
 * rather than as a second set of constants: over a button the trail is the
 * same trail, marginally warmer and marginally denser. A different animation
 * for interactive elements would be a different cursor, which is the thing
 * this replaced.
 */
export const HOVER_OPACITY_GAIN = 1.22;
export const HOVER_INTERVAL_SCALE = 0.86;

/** Time-to-settle when crossing on or off an interactive target, ms. */
export const HOVER_TAU_MS = 160;

/**
 * Idle grace before the animation loop parks itself, ms. Measured from the
 * last pointer movement, and only ever acted on once every particle has
 * finished its lifecycle — so an unattended tab runs no frames at all.
 */
export const IDLE_PARK_MS = 150;

/** Largest frame delta the integrator will accept, ms. A backgrounded tab or
 *  a long task must not teleport the field on the next frame. */
export const MAX_FRAME_MS = 48;
