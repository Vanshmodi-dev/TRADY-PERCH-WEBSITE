import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { IndustriesHubPage } from "./industries-hub-page";
import { INDUSTRIES } from "./industries-data";

const WITH_DETAIL_PAGE = INDUSTRIES.filter((industry) => industry.detail !== undefined);
const WITHOUT_DETAIL_PAGE = INDUSTRIES.filter((industry) => industry.detail === undefined);

describe("IndustriesHubPage", () => {
  it("renders every industry once", () => {
    render(<IndustriesHubPage />);
    for (const industry of INDUSTRIES) {
      expect(screen.getByText(industry.title)).toBeInTheDocument();
    }
  });

  it("Ch.19 Cd-4: the four industries with a detail page are all Interactive, with a unique accessible name each", () => {
    render(<IndustriesHubPage />);
    for (const industry of WITH_DETAIL_PAGE) {
      const link = screen.getByRole("link", { name: new RegExp(industry.title) });
      expect(link).toHaveAttribute("href", `/industries/${industry.slug}`);
    }
    // Milestone 4 review Finding #3: a bare, repeated "Learn more" link
    // text is inaccessible in a screen reader's links list — every link's
    // accessible name must actually differ, not just its href.
    const names = WITH_DETAIL_PAGE.map(
      (industry) => screen.getByRole("link", { name: new RegExp(industry.title) }).textContent,
    );
    expect(new Set(names).size).toBe(names.length);
  });

  it("Ch.19 Cd-1/Cd-4: the three industries without a detail page render as Static cards, never as links", () => {
    render(<IndustriesHubPage />);
    for (const industry of WITHOUT_DETAIL_PAGE) {
      expect(screen.queryByRole("link", { name: new RegExp(industry.title) })).not.toBeInTheDocument();
    }
  });
});
