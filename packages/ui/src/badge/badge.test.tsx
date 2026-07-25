import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Badge } from "./badge";
import type { BadgeColor } from "./badge.types";

describe("Badge", () => {
  it.each<BadgeColor>(["neutral", "success", "error", "accent"])(
    "renders the %s color variant with its label text",
    (color) => {
      render(<Badge color={color}>Real Estate</Badge>);
      expect(screen.getByText("Real Estate")).toBeInTheDocument();
    },
  );

  it("Ch.33 §8: the label text itself carries the meaning, independent of color", () => {
    render(<Badge color="success">Active</Badge>);
    expect(screen.getByText("Active")).toBeInTheDocument();
  });

  it("renders an optional leading icon, hidden from assistive technology", () => {
    const { container } = render(<Badge icon={<svg data-testid="badge-icon" />}>Featured</Badge>);
    expect(screen.getByTestId("badge-icon")).toBeInTheDocument();
    const iconWrapper = container.querySelector('[aria-hidden="true"]');
    expect(iconWrapper).toBeInTheDocument();
  });
});
