import { describe, expect, it } from "vitest";
import { currentStreakFrom, longestStreakFrom } from "./github-contributions";
import type { ContributionDay } from "./github-detail-types";

/**
 * Streak arithmetic.
 *
 * Isolated from the network layer because the interesting behaviour is
 * entirely in the boundary conditions — and a streak that is off by one is
 * both easy to write and impossible to notice on a rendered page.
 */

function days(counts: readonly number[]): ContributionDay[] {
  return counts.map((count, index) => ({
    date: `2026-01-${String(index + 1).padStart(2, "0")}`,
    count,
    level: count === 0 ? 0 : 2,
  }));
}

describe("currentStreakFrom", () => {
  it("counts back from the most recent day", () => {
    expect(currentStreakFrom(days([0, 0, 1, 1, 1]))).toBe(3);
  });

  /**
   * The boundary that matters. At 00:01 today has no commits yet, and
   * reporting the streak as broken every morning would be both wrong and
   * demoralising — so an empty *final* day is skipped and the count runs from
   * yesterday.
   */
  it("does not break the streak on a still-empty today", () => {
    expect(currentStreakFrom(days([1, 1, 1, 0]))).toBe(3);
  });

  it("does break on an empty day that is not the last one", () => {
    expect(currentStreakFrom(days([1, 1, 0, 1]))).toBe(1);
  });

  it("returns zero when the last two days are both empty", () => {
    expect(currentStreakFrom(days([1, 1, 0, 0]))).toBe(0);
  });

  it("handles an empty calendar", () => {
    expect(currentStreakFrom([])).toBe(0);
  });

  it("handles a calendar with no contributions at all", () => {
    expect(currentStreakFrom(days([0, 0, 0]))).toBe(0);
  });

  it("counts a fully active calendar in full", () => {
    expect(currentStreakFrom(days([1, 1, 1, 1, 1]))).toBe(5);
  });
});

describe("longestStreakFrom", () => {
  it("finds the longest run anywhere in the window", () => {
    expect(longestStreakFrom(days([1, 1, 1, 0, 1, 1, 0, 1]))).toBe(3);
  });

  it("returns zero for an empty or inactive calendar", () => {
    expect(longestStreakFrom([])).toBe(0);
    expect(longestStreakFrom(days([0, 0]))).toBe(0);
  });

  it("counts a run that ends on the final day", () => {
    expect(longestStreakFrom(days([1, 0, 1, 1, 1, 1]))).toBe(4);
  });
});
