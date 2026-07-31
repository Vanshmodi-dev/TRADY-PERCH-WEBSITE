import { PRICING_CURRENCY } from "./pricing-config";

/**
 * Pure formatting + ROI arithmetic, deliberately separated from the React
 * tree so the numbers this page puts in front of a prospect are unit-testable
 * without rendering anything. No module-level state, no Date, no randomness.
 */

const RUPEES = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: PRICING_CURRENCY,
  maximumFractionDigits: 0,
});

const PLAIN = new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 });

/** Indian digit grouping (₹1,23,456) — `en-IN` groups by lakh/crore, not thousands. */
export function formatRupees(amount: number): string {
  return RUPEES.format(Math.round(amount));
}

export function formatCount(value: number): string {
  return PLAIN.format(Math.round(value));
}

/** One decimal place, trailing ".0" trimmed — used for FTE, where 2.5 is meaningful but 2.53 is false precision. */
export function formatDecimal(value: number): string {
  const rounded = Math.round(value * 10) / 10;
  return Number.isInteger(rounded) ? String(rounded) : rounded.toFixed(1);
}

export interface RoiInputs {
  employees: number;
  hoursPerWeek: number;
  hourlyCost: number;
  /** Percentage, 0–100. */
  repetitiveShare: number;
  /** Percentage, 0–100. */
  automationShare: number;
}

export interface RoiResult {
  /** Hours the team stops spending on repetitive work, per week. */
  hoursSavedPerWeek: number;
  monthlySavings: number;
  yearlySavings: number;
  /** Reclaimed hours expressed as full-time people, at FULL_TIME_WEEK hours. */
  fullTimeEquivalents: number;
}

/** A 40-hour week is the divisor for the FTE figure — stated, not implied. */
export const FULL_TIME_WEEK = 40;

const WEEKS_PER_YEAR = 52;
const MONTHS_PER_YEAR = 12;

function clampPercent(value: number): number {
  if (!Number.isFinite(value)) return 0;
  return Math.min(100, Math.max(0, value));
}

function clampNonNegative(value: number): number {
  if (!Number.isFinite(value)) return 0;
  return Math.max(0, value);
}

/**
 * Deliberately conservative chain: total hours are narrowed to the repetitive
 * share, then narrowed again to the share a system can realistically absorb.
 * Savings are never computed against a team's whole week — that is the
 * inflated-ROI trick this calculator exists not to play.
 */
export function calculateRoi(inputs: RoiInputs): RoiResult {
  const employees = clampNonNegative(inputs.employees);
  const hoursPerWeek = clampNonNegative(inputs.hoursPerWeek);
  const hourlyCost = clampNonNegative(inputs.hourlyCost);
  const repetitive = clampPercent(inputs.repetitiveShare) / 100;
  const automated = clampPercent(inputs.automationShare) / 100;

  const hoursSavedPerWeek = employees * hoursPerWeek * repetitive * automated;
  const yearlySavings = hoursSavedPerWeek * hourlyCost * WEEKS_PER_YEAR;

  return {
    hoursSavedPerWeek,
    monthlySavings: yearlySavings / MONTHS_PER_YEAR,
    yearlySavings,
    fullTimeEquivalents: hoursSavedPerWeek / FULL_TIME_WEEK,
  };
}

/**
 * Months for the yearly saving to cover a given investment. Returns null when
 * the inputs cannot produce a meaningful answer (no investment published, or
 * no saving at all), so a caller can omit the tile rather than print
 * "Infinity" or "0 months". Unused while PRICING_SHOW_AMOUNTS is false — it
 * exists so the ROI tile has a real answer the moment figures are published.
 */
export function calculatePaybackMonths(
  yearlySavings: number,
  investment: number | null,
): number | null {
  if (investment === null || investment <= 0) return null;
  if (!Number.isFinite(yearlySavings) || yearlySavings <= 0) return null;
  return (investment / yearlySavings) * MONTHS_PER_YEAR;
}
