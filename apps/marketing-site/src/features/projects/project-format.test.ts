import { describe, expect, it } from "vitest";
import {
  describeProject,
  formatAbsoluteDate,
  formatDemoHost,
  formatRelativeTime,
  formatStarCount,
} from "./project-format";

describe("formatRelativeTime", () => {
  const now = Date.parse("2026-07-31T12:00:00Z");

  it.each([
    ["2026-07-31T11:59:30Z", "just now"],
    ["2026-07-31T11:55:00Z", "5 minutes ago"],
    ["2026-07-31T11:00:00Z", "1 hour ago"],
    ["2026-07-31T09:00:00Z", "3 hours ago"],
    ["2026-07-30T12:00:00Z", "1 day ago"],
    ["2026-07-28T12:00:00Z", "3 days ago"],
    ["2026-07-20T12:00:00Z", "1 week ago"],
    // Weeks run up to 31 days, so a "1 month" case has to sit past that
    // boundary — 30 days genuinely reads better as "4 weeks ago".
    ["2026-07-01T12:00:00Z", "4 weeks ago"],
    ["2026-06-25T12:00:00Z", "1 month ago"],
    ["2026-06-01T12:00:00Z", "2 months ago"],
    ["2025-07-31T12:00:00Z", "1 year ago"],
  ])("renders %s as %s", (iso, expected) => {
    expect(formatRelativeTime(iso, now)).toBe(expected);
  });

  it("singularises and pluralises correctly", () => {
    expect(formatRelativeTime("2026-07-29T12:00:00Z", now)).toBe("2 days ago");
    expect(formatRelativeTime("2026-07-30T12:00:00Z", now)).toBe("1 day ago");
  });

  /**
   * Clock skew between this server and GitHub is routine and produces a
   * `pushed_at` fractionally in the future. Rendering "in -2 minutes" — or a
   * negative plural — on a production page is worse than rounding to now.
   */
  it("clamps a future timestamp to 'just now' rather than going negative", () => {
    expect(formatRelativeTime("2026-08-01T12:00:00Z", now)).toBe("just now");
  });

  it("degrades to 'recently' for an unparseable date rather than throwing", () => {
    expect(formatRelativeTime("not-a-date", now)).toBe("recently");
    expect(formatRelativeTime("", now)).toBe("recently");
  });
});

describe("formatAbsoluteDate", () => {
  it("renders an unambiguous long-form date", () => {
    expect(formatAbsoluteDate("2026-07-31T12:00:00Z")).toBe("31 July 2026");
  });

  /**
   * Pinned to UTC on purpose. Without `timeZone: "UTC"` this function returns
   * a different day depending on the machine's locale, which means the
   * server-rendered date and a re-render elsewhere could disagree.
   */
  it("formats in UTC, not the host timezone", () => {
    expect(formatAbsoluteDate("2026-07-31T23:30:00Z")).toBe("31 July 2026");
    expect(formatAbsoluteDate("2026-07-31T00:30:00Z")).toBe("31 July 2026");
  });

  it("degrades rather than throwing on an invalid date", () => {
    expect(formatAbsoluteDate("nonsense")).toBe("date unknown");
  });
});

describe("formatStarCount", () => {
  it.each([
    [0, "0"],
    [1, "1"],
    [999, "999"],
    [1000, "1.0k"],
    [1400, "1.4k"],
    [9999, "10.0k"],
    [10000, "10k"],
    [125_000, "125k"],
  ])("renders %i as %s", (stars, expected) => {
    expect(formatStarCount(stars)).toBe(expected);
  });

  it("never renders a negative or non-finite count", () => {
    expect(formatStarCount(-5)).toBe("0");
    expect(formatStarCount(Number.NaN)).toBe("0");
  });
});

describe("formatDemoHost", () => {
  it("returns the bare hostname", () => {
    expect(formatDemoHost("https://modi-store.vercel.app/path?q=1")).toBe("modi-store.vercel.app");
  });

  it("strips a leading www.", () => {
    expect(formatDemoHost("https://www.tradyperch.com")).toBe("tradyperch.com");
  });

  it("degrades to a generic label rather than throwing", () => {
    expect(formatDemoHost("nonsense")).toBe("external site");
  });
});

describe("describeProject", () => {
  it("uses the repository's own description when it has one", () => {
    expect(describeProject("Books appointments automatically.", ["AI"])).toBe(
      "Books appointments automatically.",
    );
  });

  /**
   * The account this feature ships against has no repository descriptions
   * set, so this fallback is the common path, not an edge case. It must read
   * as an intentional sentence and must never invent a claim about the work.
   */
  it("falls back to the matched categories when there is no description", () => {
    expect(describeProject(null, ["Website", "Business"])).toBe(
      "Website, Business work from the Trady Perch engineering account.",
    );
  });

  it("falls back again when there are no categories either", () => {
    expect(describeProject(null, [])).toBe(
      "A project from the Trady Perch engineering account.",
    );
  });
});
