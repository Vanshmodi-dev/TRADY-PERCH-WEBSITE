/**
 * Presentation-only formatting for project cards.
 *
 * Deliberately free of any `server-only` import and of any GitHub credential:
 * these helpers are pure functions over already-public data, so both server
 * and client components can use them, and every one is directly unit-testable
 * without a network or an environment variable.
 */

const MINUTE = 60_000;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

/**
 * "3 days ago", "2 months ago", "just now".
 *
 * Formatted on the server as a *static string*, not with a live-updating
 * client timer: the page is ISR-cached for an hour, so a ticking relative
 * clock would be wrong between revalidations anyway, and rendering it
 * client-side would introduce a hydration mismatch for no benefit. Callers
 * pair this with a `<time dateTime>` element carrying the exact ISO value,
 * so assistive technology and crawlers get the precise timestamp regardless.
 *
 * `now` is injectable so tests are deterministic rather than clock-dependent.
 */
export function formatRelativeTime(isoDate: string, now: number = Date.now()): string {
  const timestamp = Date.parse(isoDate);
  if (!Number.isFinite(timestamp)) return "recently";

  const elapsed = now - timestamp;

  // A repo pushed "in the future" means clock skew between this server and
  // GitHub, not a real future date. Clamping to "just now" is more honest
  // than rendering "in -2 hours".
  if (elapsed < MINUTE) return "just now";
  if (elapsed < HOUR) return plural(Math.floor(elapsed / MINUTE), "minute");
  if (elapsed < DAY) return plural(Math.floor(elapsed / HOUR), "hour");

  const days = Math.floor(elapsed / DAY);
  if (days < 7) return plural(days, "day");
  if (days < 31) return plural(Math.floor(days / 7), "week");
  if (days < 365) return plural(Math.floor(days / 30), "month");
  return plural(Math.floor(days / 365), "year");
}

function plural(count: number, unit: string): string {
  const safe = Math.max(count, 1);
  return `${safe} ${unit}${safe === 1 ? "" : "s"} ago`;
}

/**
 * An absolute, unambiguous date for the `<time>` element's tooltip and for
 * screen-reader users, who should not have to infer a date from "3 months
 * ago". `en-GB` with a long month avoids the US/UK numeric-date ambiguity.
 */
export function formatAbsoluteDate(isoDate: string): string {
  const timestamp = Date.parse(isoDate);
  if (!Number.isFinite(timestamp)) return "date unknown";
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(timestamp);
}

/**
 * `1400` -> `1.4k`. Keeps a count pill to a fixed width as the figure grows.
 *
 * Named for counts generally rather than for stars: the card now renders forks
 * through the same function, and the detail page renders issues, pull requests
 * and commits. One abbreviation rule across every number on the page is what
 * stops "1.4k stars" sitting next to "1400 commits".
 */
export function formatCount(value: number): string {
  if (!Number.isFinite(value) || value < 0) return "0";
  if (value < 1000) return String(Math.floor(value));
  const thousands = value / 1000;
  // `10.4k` reads as noise; past 10k the tenth is not information anyone uses.
  return thousands >= 10 ? `${Math.floor(thousands)}k` : `${thousands.toFixed(1)}k`;
}

/**
 * A month and year — "July 2026".
 *
 * The detail page's timeline shows creation and last-push dates, where the day
 * is noise: what a reader takes from "created March 2025" is the age of the
 * project, and the exact day adds a digit without adding meaning. The full
 * date is still on the `<time>` element's `dateTime` attribute.
 */
export function formatMonthYear(isoDate: string): string {
  const timestamp = Date.parse(isoDate);
  if (!Number.isFinite(timestamp)) return "unknown";
  return new Intl.DateTimeFormat("en-GB", {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(timestamp);
}

/**
 * A whole-number percentage share, with a floor of `<1%` rather than `0%`.
 *
 * A language that is genuinely present in a repository should never be
 * labelled as zero percent of it — that reads as a rendering fault, and the
 * distinction between "absent" and "present but small" is the one thing a
 * language chart exists to show.
 */
export function formatShare(percentage: number): string {
  if (!Number.isFinite(percentage) || percentage <= 0) return "0%";
  if (percentage < 1) return "<1%";
  return `${percentage % 1 === 0 ? percentage : percentage.toFixed(1)}%`;
}

/**
 * The hostname of a live demo, for the button's accessible name — "Live demo
 * (opens modi-store.vercel.app)" tells a screen-reader user where the link
 * goes, which a bare "Live demo" repeated across nine cards does not.
 */
export function formatDemoHost(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return "external site";
  }
}

/**
 * Visitor-facing label and long-form meaning for each status.
 *
 * The label is two words at most so it fits the card's status marker without
 * wrapping; `srLabel` is what a screen reader announces, because "Live" alone
 * next to a project name is ambiguous out of visual context — it could mean a
 * livestream.
 */
export const STATUS_COPY = {
  live: { label: "Live", srLabel: "Status: live deployment available" },
  active: { label: "In development", srLabel: "Status: in active development" },
  maintained: { label: "Maintained", srLabel: "Status: complete and maintained" },
} as const;

/**
 * Fallback copy for a repository with no description.
 *
 * Rendering an empty paragraph would collapse the card and break the grid's
 * baseline alignment; inventing a description would be a false claim about
 * someone's work. This states the honest fact — the categories the repo was
 * classified into — and reads as intentional rather than missing.
 */
export function describeProject(description: string | null, categories: readonly string[]): string {
  if (description) return description;
  if (categories.length === 0) return "A project from the Trady Perch engineering account.";
  return `${categories.join(", ")} work from the Trady Perch engineering account.`;
}
