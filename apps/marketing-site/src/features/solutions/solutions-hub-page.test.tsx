import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { SolutionsHubPage } from "./solutions-hub-page";
import { SOLUTIONS } from "./solutions-data";

describe("SolutionsHubPage", () => {
  it("renders all four solutions as Interactive cards linking to their real detail route", () => {
    render(<SolutionsHubPage />);
    for (const solution of SOLUTIONS) {
      const link = screen.getByRole("link", { name: new RegExp(solution.title) });
      expect(link).toHaveAttribute("href", `/solutions/${solution.slug}`);
    }
  });

  it("Ch.18 Bt-1: the page's own CTA is never Primary emphasis", () => {
    render(<SolutionsHubPage />);
    const cta = screen.getByRole("link", { name: "Book a strategy call" });
    expect(cta.className).not.toMatch(/\bprimary\b/i);
  });
});
