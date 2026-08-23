import { describe, expect, it } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { PricingPage } from "./pricing-page";
import {
  COMPARISON_GROUPS,
  PRICING_FAQ_ITEMS,
  PRICING_PACKAGES,
  PRICING_SHOW_AMOUNTS,
} from "./pricing-config";

describe("PricingPage", () => {
  it("renders the page's one real heading", () => {
    render(<PricingPage />);
    const h1s = screen.getAllByRole("heading", { level: 1 });
    expect(h1s).toHaveLength(1);
    expect(h1s[0]).toHaveTextContent(/Flexible pricing/i);
  });

  it("renders all three packages with their CTAs", () => {
    render(<PricingPage />);
    for (const tier of PRICING_PACKAGES) {
      expect(screen.getByRole("heading", { level: 3, name: tier.name })).toBeInTheDocument();
      expect(
        screen.getByRole("link", { name: `${tier.cta.label} about the ${tier.name} package` }),
      ).toBeInTheDocument();
    }
  });

  it("marks exactly one package as featured", () => {
    expect(PRICING_PACKAGES.filter((tier) => tier.featured)).toHaveLength(1);
  });

  /**
   * Master Vision §5.4 / the synthesis's "real numbers deferred indefinitely
   * from public display". The page is BUILT to render figures — see
   * PRICING_SHOW_AMOUNTS in pricing-config.ts — but ships with them off, and
   * this asserts the shipped state rather than the capability.
   *
   * Deliberately guarded on the flag rather than deleted: whoever turns
   * figures on should get a green suite with the constraint's own record
   * still in front of them, not a red one they route around.
   */
  it("§5.4: no package states a price while PRICING_SHOW_AMOUNTS is off", () => {
    const { container } = render(<PricingPage />);
    const packages = container.querySelector('[aria-labelledby="pricing-packages-heading"]');
    expect(packages).not.toBeNull();
    const packagesText = packages?.textContent ?? "";

    if (PRICING_SHOW_AMOUNTS) {
      // The flag has been turned on deliberately. The rule that still holds is
      // §5.4's placement one: a figure may appear here, never before this page.
      expect(packagesText).toMatch(/Starting from/i);
      return;
    }

    expect(packagesText).not.toMatch(/₹/);
    expect(packagesText).not.toMatch(/\$\s?\d/);
    expect(packagesText.toLowerCase()).not.toMatch(/starting (at|from)/);
  });

  /**
   * Scoped to the packages section on purpose, and the distinction is
   * load-bearing rather than a loosened assertion.
   *
   * §5.4 governs the price of *our* services. The ROI calculator renders
   * rupee figures throughout — the visitor's own hourly cost, and the saving
   * their own inputs imply — none of which is a price signal for a Trady
   * Perch engagement. A blanket "no ₹ anywhere on the page" rule would
   * prohibit a savings calculator, which is not what the constraint is for
   * and not a reading its own rationale supports.
   *
   * So this asserts the other half explicitly: the ROI section is expected to
   * show currency, and if it ever stops doing so, that is a regression.
   */
  it("§5.4 does not reach the ROI calculator — the visitor's own figures are not our prices", () => {
    const { container } = render(<PricingPage />);
    const roi = container.querySelector('[aria-labelledby="pricing-roi-heading"]');
    expect(roi?.textContent ?? "").toMatch(/₹/);
  });

  it("§5.4: every package still states its investment terms rather than staying silent", () => {
    render(<PricingPage />);
    // "Vagueness here reads as evasiveness" — the absence of a number is only
    // defensible if the page says what happens instead. Asserted against the
    // config rather than a hardcoded phrase: what has to hold is that every
    // tier's investment slot is filled and rendered, so rewording the label is
    // a copy change rather than a test failure.
    for (const tier of PRICING_PACKAGES) {
      expect(tier.investmentLabel.trim()).not.toBe("");
      expect(tier.investmentNote.trim()).not.toBe("");
      expect(screen.getAllByText(tier.investmentLabel).length).toBeGreaterThan(0);
      expect(screen.getAllByText(tier.investmentNote).length).toBeGreaterThan(0);
    }
  });

  it("Ch.18 Bt-1: no button on the page is Primary emphasis — the nav's fixed CTA is the one exception", () => {
    render(<PricingPage />);
    const links = screen.getAllByRole("link");
    expect(links.length).toBeGreaterThan(0);
    for (const link of links) {
      expect(link.className).not.toMatch(/\bprimary\b/i);
    }
  });

  it("renders the comparison table as a real table with a column per package", () => {
    render(<PricingPage />);
    const table = screen.getByRole("table");
    const columnHeaders = within(table).getAllByRole("columnheader");
    for (const tier of PRICING_PACKAGES) {
      expect(columnHeaders.some((header) => header.textContent === tier.name)).toBe(true);
    }
  });

  it("every comparison row carries a value for every package — a missing key would silently render as excluded", () => {
    const tierIds = PRICING_PACKAGES.map((tier) => tier.id);
    for (const group of COMPARISON_GROUPS) {
      for (const row of group.rows) {
        for (const id of tierIds) {
          expect(
            Object.prototype.hasOwnProperty.call(row.values, id),
            `comparison row "${row.id}" is missing a value for tier "${id}"`,
          ).toBe(true);
        }
      }
    }
  });

  it("renders the ROI calculator's sliders as accessible range inputs", () => {
    render(<PricingPage />);
    const sliders = screen.getAllByRole("slider");
    expect(sliders).toHaveLength(5);
    for (const slider of sliders) {
      // Every slider must have an accessible name and a human-readable value —
      // a bare "600" is ambiguous between rupees, hours, and percent.
      expect(slider).toHaveAccessibleName();
      expect(slider).toHaveAttribute("aria-valuetext");
    }
  });

  it("answers the 'why is there no price' objection directly, and first", () => {
    render(<PricingPage />);
    expect(PRICING_FAQ_ITEMS[0]!.id).toBe("no-fixed-prices");
    expect(
      screen.getByRole("button", { name: /Why don't you display fixed prices/i }),
    ).toBeInTheDocument();
  });
});
