import { describe, expect, it } from "vitest";
import {
  aimFromPointer,
  aimToPosition,
  createSeededRandom,
  faceAnchor,
  faceNormal,
  faceSlant,
  faceTilt,
  insetTriangle,
  springAtRest,
  stepSpring,
  triangleInradius,
  type SpringState,
  type Triangle,
} from "./apex-math";

/**
 * The Apex's maths, tested where it is genuinely unverifiable by eye.
 *
 * A face plate that is a degree out of true still looks like a pyramid; a
 * spring that overshoots by two percent still looks damped. These are the
 * failures that survive review and then read, indefinably, as "cheap" — so
 * they are asserted rather than inspected.
 */

const PLATE: Triangle = [
  { x: -1.2, y: 0 },
  { x: 1.2, y: 0 },
  { x: 0, y: 2.194 },
];

describe("shell geometry", () => {
  it("puts each face's normal perpendicular to the face it belongs to", () => {
    const baseHalfWidth = 1.2;
    const height = 1.84;
    const tilt = faceTilt(baseHalfWidth, height);

    for (let index = 0; index < 4; index += 1) {
      const [nx, ny, nz] = faceNormal(index, tilt);
      const [ax, , az] = faceAnchor(index, baseHalfWidth);

      // Two vectors that lie in the face's own plane: the base-edge midpoint
      // to the apex, and the base edge itself. A correct normal is orthogonal
      // to both — which a normal that is merely close to correct is not.
      const dotApex = nx * -ax + ny * height + nz * -az;
      const dotBase = nx * az + nz * -ax;

      expect(dotApex).toBeCloseTo(0, 10);
      expect(dotBase).toBeCloseTo(0, 10);
    }
  });

  it("keeps every face normal a unit vector pointing above the horizon", () => {
    const tilt = faceTilt(1.2, 1.84);
    for (let index = 0; index < 4; index += 1) {
      const [x, y, z] = faceNormal(index, tilt);
      expect(Math.hypot(x, y, z)).toBeCloseTo(1, 12);
      expect(y).toBeGreaterThan(0);
    }
  });

  it("measures slant height from the base edge, not from the base corner", () => {
    // The distance a plate actually has to span: base-edge midpoint to apex.
    expect(faceSlant(1.2, 1.84)).toBeCloseTo(Math.hypot(1.2, 1.84), 12);
  });
});

describe("aperture inset", () => {
  it("moves every edge inward by the same perpendicular distance", () => {
    const margin = 0.325;
    const inset = insetTriangle(PLATE, margin);
    expect(inset).not.toBeNull();
    // A uniform inset shrinks the inscribed circle by exactly the margin —
    // the property that fails the moment the centroid is used as the pivot.
    expect(triangleInradius(inset as Triangle)).toBeCloseTo(
      triangleInradius(PLATE) - margin,
      10,
    );
  });

  it("refuses a margin that would consume the plate", () => {
    expect(insetTriangle(PLATE, triangleInradius(PLATE))).toBeNull();
    expect(insetTriangle(PLATE, 99)).toBeNull();
  });

  it("leaves the inset triangle inside the original", () => {
    const inset = insetTriangle(PLATE, 0.325) as Triangle;
    for (const point of inset) {
      expect(point.y).toBeGreaterThan(0);
      expect(point.y).toBeLessThan(PLATE[2].y);
      expect(Math.abs(point.x)).toBeLessThan(1.2);
    }
  });
});

describe("critically damped motion", () => {
  const settle = (omega: number, dt: number, steps: number) => {
    let state: SpringState = { value: 0, velocity: 0 };
    const trace: number[] = [];
    for (let i = 0; i < steps; i += 1) {
      state = stepSpring(state, 1, omega, dt);
      trace.push(state.value);
    }
    return { state, trace };
  };

  it("never overshoots its target", () => {
    const { trace } = settle(3.05, 1 / 60, 600);
    for (const value of trace) expect(value).toBeLessThanOrEqual(1);
  });

  it("approaches monotonically — no oscillation, no ringing", () => {
    const { trace } = settle(3.05, 1 / 60, 400);
    for (let i = 1; i < trace.length; i += 1) {
      expect(trace[i] as number).toBeGreaterThanOrEqual(trace[i - 1] as number);
    }
  });

  it("settles to the same place regardless of frame rate", () => {
    // The property a per-frame lerp cannot have: one second of travel is one
    // second of travel whether the display runs at 30Hz, 60Hz or 144Hz.
    const at30 = settle(3.05, 1 / 30, 30).state.value;
    const at60 = settle(3.05, 1 / 60, 60).state.value;
    const at144 = settle(3.05, 1 / 144, 144).state.value;

    expect(at60).toBeCloseTo(at30, 4);
    expect(at144).toBeCloseTo(at60, 4);
  });

  it("clamps a backgrounded tab's delta into a settle rather than a snap", () => {
    const jump = stepSpring({ value: 0, velocity: 0 }, 1, 3.05, 45);
    expect(jump.value).toBeLessThan(1);
    expect(Number.isFinite(jump.value)).toBe(true);
  });

  it("reports rest only once both position and velocity have arrived", () => {
    let state: SpringState = { value: 0, velocity: 0 };
    expect(springAtRest(state, 1)).toBe(false);
    for (let i = 0; i < 600; i += 1) state = stepSpring(state, 1, 6, 1 / 60);
    expect(springAtRest(state, 1)).toBe(true);
  });
});

describe("the key light", () => {
  const range = { azimuthRange: 0.72, high: 0.98, low: 0.28 };

  it("raises the key when the pointer is high in the frame", () => {
    const high = aimFromPointer(0, -1, range);
    const low = aimFromPointer(0, 1, range);
    expect(high.elevation).toBeCloseTo(range.high, 10);
    expect(low.elevation).toBeCloseTo(range.low, 10);
  });

  it("clamps rather than extrapolating a pointer outside the viewport", () => {
    const far = aimFromPointer(-14, -14, range);
    const edge = aimFromPointer(-1, -1, range);
    expect(far.azimuth).toBeCloseTo(edge.azimuth, 12);
    expect(far.elevation).toBeCloseTo(edge.elevation, 12);
  });

  it("never drops the key below the horizon", () => {
    for (let x = -2; x <= 2; x += 0.25) {
      for (let y = -2; y <= 2; y += 0.25) {
        const [, height] = aimToPosition(aimFromPointer(x, y, range), 7.4);
        expect(height).toBeGreaterThan(0);
      }
    }
  });

  it("holds the light at a constant distance as it orbits", () => {
    for (let x = -1; x <= 1; x += 0.2) {
      const [px, py, pz] = aimToPosition(aimFromPointer(x, 0.3, range), 7.4);
      expect(Math.hypot(px, py, pz)).toBeCloseTo(7.4, 10);
    }
  });
});

describe("seeded randomness", () => {
  it("produces the same surface on every visit", () => {
    const first = Array.from({ length: 64 }, createSeededRandom(0x5a17));
    const second = Array.from({ length: 64 }, createSeededRandom(0x5a17));
    expect(first).toEqual(second);
  });

  it("produces a different surface for a different part", () => {
    const plate = createSeededRandom(0x5a17);
    const marked = createSeededRandom(0x2f91);
    expect(plate()).not.toBeCloseTo(marked(), 6);
  });

  it("stays inside the unit interval", () => {
    const random = createSeededRandom(1);
    for (let i = 0; i < 5000; i += 1) {
      const value = random();
      expect(value).toBeGreaterThanOrEqual(0);
      expect(value).toBeLessThan(1);
    }
  });
});
