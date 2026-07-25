import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { PricingPage } from "./pricing-page";

describe("PricingPage", () => {
  it("renders the page's one real heading", () => {
    render(<PricingPage />);
    expect(
      screen.getByRole("heading", { level: 1, name: /Roughly what this costs/ }),
    ).toBeInTheDocument();
  });

  it("Ch.5.4: never shows a price, range, or 'starting at' figure anywhere on the page", () => {
    const { container } = render(<PricingPage />);
    const text = container.textContent ?? "";
    expect(text).not.toMatch(/\$\s?\d/);
    expect(text.toLowerCase()).not.toMatch(/starting at/);
  });

  it("Ch.18 Bt-1: no button on the page is Primary emphasis — the nav's fixed CTA is the one exception", () => {
    render(<PricingPage />);
    const buttons = [...screen.getAllByRole("link")].filter((el) =>
      /^(Book a strategy call|Read the FAQ|See the full process)$/.test(el.textContent ?? ""),
    );
    expect(buttons.length).toBeGreaterThan(0);
    for (const button of buttons) {
      expect(button.className).not.toMatch(/\bprimary\b/i);
    }
  });
});
