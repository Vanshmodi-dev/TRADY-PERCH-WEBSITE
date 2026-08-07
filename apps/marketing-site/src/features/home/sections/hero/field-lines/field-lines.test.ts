import { describe, expect, it } from "vitest";
import { buildFieldGrid, sampleField, sampleWordmarkPoles } from "./wordmark-field";
import { atlasIndexForAngle, createFleckAtlas, ATLAS_STEPS } from "./fleck-atlas";
import { shortestArc } from "./particle-field";

/**
 * The field maths is the part of FIELD LINES that has to be correct rather
 * than merely convincing — a wrong sign or a bad angle wrap does not look
 * slightly off, it sends half the dust in the opposite direction. It is also
 * pure, so it is tested directly rather than through the DOM.
 */

describe("shortestArc", () => {
  it("returns the signed short way round", () => {
    expect(shortestArc(0, 1)).toBeCloseTo(1);
    expect(shortestArc(1, 0)).toBeCloseTo(-1);
  });

  it("wraps rather than taking the long way", () => {
    // 0.1 -> 6.1 rad is 0.28 rad backwards, not 6.0 forwards.
    const arc = shortestArc(0.1, 6.1);
    expect(arc).toBeLessThan(0);
    expect(Math.abs(arc)).toBeLessThan(Math.PI);
  });

  it("stays within (-PI, PI] for arbitrary input", () => {
    for (let i = 0; i < 50; i += 1) {
      const from = (Math.random() - 0.5) * 40;
      const to = (Math.random() - 0.5) * 40;
      const arc = shortestArc(from, to);
      expect(arc).toBeGreaterThan(-Math.PI - 1e-6);
      expect(arc).toBeLessThanOrEqual(Math.PI + 1e-6);
    }
  });
});

describe("buildFieldGrid", () => {
  it("produces a grid with no poles without throwing", () => {
    const grid = buildFieldGrid([], 800, 400);
    expect(grid.angle.length).toBe(grid.cols * grid.rows);
    expect(grid.magnitude.every((value) => value === 0)).toBe(true);
  });

  it("normalises magnitude into 0..1", () => {
    const grid = buildFieldGrid([{ x: 400, y: 200 }], 800, 400);
    for (const value of grid.magnitude) {
      expect(value).toBeGreaterThanOrEqual(0);
      expect(value).toBeLessThanOrEqual(1 + 1e-6);
    }
  });

  it("is strongest nearest a pole", () => {
    const grid = buildFieldGrid([{ x: 400, y: 200 }], 800, 400);
    const near = sampleField(grid, 400, 200);
    const far = sampleField(grid, 10, 10);
    expect(near.magnitude).toBeGreaterThan(far.magnitude);
  });

  it("points toward the pole, which is what makes migration curve inward", () => {
    const grid = buildFieldGrid([{ x: 700, y: 200 }], 800, 400);
    // Sampled to the pole's left, the field should point right (angle ~0).
    const sample = sampleField(grid, 200, 200);
    expect(Math.cos(sample.angle)).toBeGreaterThan(0.6);
  });

  it("interpolates angles as vectors so the +/-PI seam does not invert", () => {
    // Two poles either side produce a seam between them; a naive radian
    // average would yield ~0 (pointing right) in the middle instead of a
    // continuous field.
    const grid = buildFieldGrid(
      [
        { x: 50, y: 200 },
        { x: 750, y: 200 },
      ],
      800,
      400,
    );
    const left = sampleField(grid, 200, 200);
    const right = sampleField(grid, 600, 200);
    // Left of centre pulls left, right of centre pulls right.
    expect(Math.cos(left.angle)).toBeLessThan(0);
    expect(Math.cos(right.angle)).toBeGreaterThan(0);
  });
});

describe("sampleField", () => {
  it("clamps out-of-bounds sampling instead of reading past the array", () => {
    const grid = buildFieldGrid([{ x: 400, y: 200 }], 800, 400);
    const sample = sampleField(grid, -5000, 9999);
    expect(Number.isFinite(sample.angle)).toBe(true);
    expect(Number.isFinite(sample.magnitude)).toBe(true);
  });
});

describe("atlasIndexForAngle", () => {
  it("maps a full turn back to the first sprite", () => {
    expect(atlasIndexForAngle(0)).toBe(0);
    expect(atlasIndexForAngle(Math.PI * 2)).toBe(0);
  });

  it("never returns an out-of-range index for negative or large angles", () => {
    for (const angle of [-0.01, -12.5, 0, 3.3, 99]) {
      const index = atlasIndexForAngle(angle);
      expect(index).toBeGreaterThanOrEqual(0);
      expect(index).toBeLessThan(ATLAS_STEPS);
    }
  });

  it("advances roughly linearly through the strip", () => {
    expect(atlasIndexForAngle(Math.PI)).toBe(ATLAS_STEPS / 2);
  });
});

describe("graceful degradation", () => {
  it("returns no poles when a canvas cannot be created", () => {
    const poles = sampleWordmarkPoles("TRADY PERCH", { width: 800, height: 400, scale: 1, fontFamily: "sans-serif" }, () => null);
    expect(poles).toEqual([]);
  });

  it("returns no atlas when a canvas cannot be created", () => {
    expect(createFleckAtlas(1, 7, 1.5, () => null)).toBeNull();
  });

  it("returns no poles when the context is unavailable, so the caller falls back to static", () => {
    // jsdom has no real 2D context; this is the production path a browser
    // takes when it refuses the context under memory pressure.
    const fakeCanvas = {
      width: 0,
      height: 0,
      getContext: () => null,
    } as unknown as HTMLCanvasElement;
    const poles = sampleWordmarkPoles("TRADY PERCH", { width: 800, height: 400, scale: 1, fontFamily: "sans-serif" }, () => fakeCanvas);
    expect(poles).toEqual([]);
  });
});
