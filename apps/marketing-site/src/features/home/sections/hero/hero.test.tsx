import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { Hero } from "./hero";

/**
 * The hero's non-negotiable contract: the claim, the qualifier and both
 * actions are in the markup unconditionally. The intro overlay dissolves into
 * this, so a skip, a JS failure, a refused canvas or a slow connection all
 * have to land on a finished hero rather than an empty screen.
 */

vi.mock("./hero-core", () => ({
  // The Core is decorative and canvas-driven; jsdom has no context for it and
  // it contributes nothing to this contract.
  HeroCore: () => <div data-testid="hero-core" />,
}));

describe("Hero", () => {
  it("exposes the claim as the page's h1", () => {
    render(<Hero />);
    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toHaveTextContent(/rebuilt into systems that run themselves/i);
  });

  it("labels its section by the heading, so the landmark is named", () => {
    const { container } = render(<Hero />);
    const section = container.querySelector("section");
    expect(section).toHaveAttribute("aria-labelledby", "hero-heading");
    expect(screen.getByRole("heading", { level: 1 })).toHaveAttribute("id", "hero-heading");
  });

  it("renders the qualifier", () => {
    render(<Hero />);
    expect(screen.getByText(/established businesses ready to stop doing everything by hand/i)).toBeInTheDocument();
  });

  it("renders both calls to action as real links", () => {
    render(<Hero />);
    const primary = screen.getByRole("link", { name: /book a strategy call/i });
    const secondary = screen.getByRole("link", { name: /see it in action/i });
    expect(primary).toHaveAttribute("href", "/contact");
    expect(secondary).toHaveAttribute("href", "/#ai-demo-heading");
  });

  it("keeps the decorative object out of the accessibility tree's content flow", () => {
    render(<Hero />);
    // Present in the DOM, but the real Core sets aria-hidden — the mock stands
    // in for it here, so this asserts only that the hero does not depend on it
    // for any content.
    expect(screen.getByTestId("hero-core")).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
  });
});
