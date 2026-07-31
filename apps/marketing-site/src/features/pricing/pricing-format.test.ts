import { describe, expect, it } from "vitest";
import {
  FULL_TIME_WEEK,
  calculatePaybackMonths,
  calculateRoi,
  formatCount,
  formatDecimal,
  formatRupees,
} from "./pricing-format";

describe("formatRupees", () => {
  it("uses Indian lakh/crore digit grouping, not thousands", () => {
    // 1,23,456 — not 123,456. `en-IN` groups the first three digits, then
    // pairs; getting this wrong is the single most visible way an Indian
    // pricing page reads as foreign.
    expect(formatRupees(123456)).toBe("₹1,23,456");
    expect(formatRupees(10000000)).toBe("₹1,00,00,000");
  });

  it("renders whole rupees, never paise", () => {
    expect(formatRupees(1499.62)).toBe("₹1,500");
  });
});

describe("formatCount", () => {
  it("groups plain counts the Indian way and rounds to whole units", () => {
    expect(formatCount(1234567)).toBe("12,34,567");
    expect(formatCount(41.6)).toBe("42");
  });
});

describe("formatDecimal", () => {
  it("keeps one decimal place where it carries meaning", () => {
    expect(formatDecimal(2.54)).toBe("2.5");
  });

  it("drops a trailing .0 rather than implying false precision", () => {
    expect(formatDecimal(3)).toBe("3");
    expect(formatDecimal(2.98)).toBe("3");
  });
});

describe("calculateRoi", () => {
  it("narrows total hours twice — by repetitive share, then by automatable share", () => {
    // 10 people x 40h = 400h/week. Half is repetitive (200h). Half of that is
    // automatable (100h). The point of the double narrowing is that savings
    // are never computed against the team's whole week.
    const result = calculateRoi({
      employees: 10,
      hoursPerWeek: 40,
      hourlyCost: 500,
      repetitiveShare: 50,
      automationShare: 50,
    });

    expect(result.hoursSavedPerWeek).toBe(100);
    expect(result.yearlySavings).toBe(100 * 500 * 52);
    expect(result.monthlySavings).toBe((100 * 500 * 52) / 12);
    expect(result.fullTimeEquivalents).toBe(100 / FULL_TIME_WEEK);
  });

  it("returns zero across the board when nothing is automatable", () => {
    const result = calculateRoi({
      employees: 20,
      hoursPerWeek: 45,
      hourlyCost: 2000,
      repetitiveShare: 80,
      automationShare: 0,
    });

    expect(result.hoursSavedPerWeek).toBe(0);
    expect(result.monthlySavings).toBe(0);
    expect(result.yearlySavings).toBe(0);
    expect(result.fullTimeEquivalents).toBe(0);
  });

  it("clamps out-of-range percentages instead of producing impossible savings", () => {
    // A percentage above 100 would otherwise let the model claim more hours
    // saved than the team actually works.
    const overshoot = calculateRoi({
      employees: 5,
      hoursPerWeek: 40,
      hourlyCost: 100,
      repetitiveShare: 500,
      automationShare: 500,
    });
    const clamped = calculateRoi({
      employees: 5,
      hoursPerWeek: 40,
      hourlyCost: 100,
      repetitiveShare: 100,
      automationShare: 100,
    });

    expect(overshoot).toEqual(clamped);
    expect(overshoot.hoursSavedPerWeek).toBe(200);
  });

  it("treats negative and non-finite inputs as zero rather than propagating NaN", () => {
    const result = calculateRoi({
      employees: -5,
      hoursPerWeek: Number.NaN,
      hourlyCost: -100,
      repetitiveShare: -20,
      automationShare: 50,
    });

    expect(Number.isNaN(result.yearlySavings)).toBe(false);
    expect(result.yearlySavings).toBe(0);
  });
});

describe("calculatePaybackMonths", () => {
  it("returns the months of saving needed to cover the investment", () => {
    expect(calculatePaybackMonths(1200000, 300000)).toBe(3);
  });

  it("returns null when no investment is published", () => {
    expect(calculatePaybackMonths(1200000, null)).toBeNull();
  });

  it("returns null rather than Infinity when there is no saving", () => {
    expect(calculatePaybackMonths(0, 300000)).toBeNull();
  });
});
