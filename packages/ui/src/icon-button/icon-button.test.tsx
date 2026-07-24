import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { IconButton } from "./icon-button";

describe("IconButton", () => {
  it("Ch.18 §8: requires and exposes an accessible label since no visible label is present", () => {
    render(<IconButton icon={<svg />} aria-label="Close menu" />);
    expect(screen.getByRole("button", { name: "Close menu" })).toBeInTheDocument();
  });

  it("renders its icon content", () => {
    render(<IconButton icon={<svg data-testid="close-icon" />} aria-label="Close menu" />);
    expect(screen.getByTestId("close-icon")).toBeInTheDocument();
  });

  it("supports aria-expanded/aria-controls for use as a toggle trigger", () => {
    render(
      <IconButton
        icon={<svg />}
        aria-label="Open menu"
        aria-expanded={false}
        aria-controls="mobile-nav-drawer"
      />,
    );
    const button = screen.getByRole("button", { name: "Open menu" });
    expect(button).toHaveAttribute("aria-expanded", "false");
    expect(button).toHaveAttribute("aria-controls", "mobile-nav-drawer");
  });

  it("Ch.39 St-3: disabled suppresses the click handler", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<IconButton icon={<svg />} aria-label="Close menu" disabled onClick={onClick} />);
    const button = screen.getByRole("button", { name: "Close menu" });
    expect(button).toBeDisabled();
    await user.click(button);
    expect(onClick).not.toHaveBeenCalled();
  });

  it("fires its click handler when enabled", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<IconButton icon={<svg />} aria-label="Close menu" onClick={onClick} />);
    await user.click(screen.getByRole("button", { name: "Close menu" }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
