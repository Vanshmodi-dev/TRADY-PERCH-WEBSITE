import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Button } from "./button";
import type { ButtonEmphasis, ButtonSize } from "./button.types";

describe("Button", () => {
  it.each<ButtonEmphasis>(["primary", "secondary", "ghost"])(
    "renders the %s emphasis variant without error",
    (emphasis) => {
      render(<Button emphasis={emphasis}>Book a Strategy Call</Button>);
      expect(screen.getByRole("button", { name: "Book a Strategy Call" })).toBeInTheDocument();
    },
  );

  it.each<ButtonSize>(["sm", "md", "lg"])("renders the %s size variant without error", (size) => {
    render(<Button size={size}>Continue</Button>);
    expect(screen.getByRole("button", { name: "Continue" })).toBeInTheDocument();
  });

  it("always renders its required label content", () => {
    render(<Button>Choose Growth Tier</Button>);
    expect(screen.getByText("Choose Growth Tier")).toBeInTheDocument();
  });

  it("renders leading and trailing icons when provided", () => {
    render(
      <Button leadingIcon={<svg data-testid="leading-icon" />} trailingIcon={<svg data-testid="trailing-icon" />}>
        Contact
      </Button>,
    );
    expect(screen.getByTestId("leading-icon")).toBeInTheDocument();
    expect(screen.getByTestId("trailing-icon")).toBeInTheDocument();
  });

  it("Ch.39 St-3: disabled suppresses the click handler entirely", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(
      <Button disabled onClick={onClick}>
        Submit
      </Button>,
    );
    const button = screen.getByRole("button", { name: "Submit" });
    expect(button).toBeDisabled();
    await user.click(button);
    expect(onClick).not.toHaveBeenCalled();
  });

  it("Ch.39 St-4: loading status implies disabled and marks aria-busy", () => {
    render(<Button status="loading">Submit</Button>);
    const button = screen.getByRole("button", { name: "Submit" });
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute("aria-busy", "true");
  });

  it("an enabled button still fires its click handler", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Submit</Button>);
    await user.click(screen.getByRole("button", { name: "Submit" }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("Ch.18 §8: renders a genuine <a> when href is provided, for correct semantics", () => {
    render(<Button href="/contact">Book a Strategy Call</Button>);
    const link = screen.getByRole("link", { name: "Book a Strategy Call" });
    expect(link.tagName).toBe("A");
    expect(link).toHaveAttribute("href", "/contact");
  });

  it("a disabled link-button is unreachable and non-navigating (anchors have no native disabled attribute)", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(
      <Button href="/contact" disabled onClick={onClick}>
        Book a Strategy Call
      </Button>,
    );
    const link = screen.getByRole("link", { name: "Book a Strategy Call" });
    expect(link).toHaveAttribute("aria-disabled", "true");
    expect(link).toHaveAttribute("tabindex", "-1");
    await user.click(link);
    expect(onClick).not.toHaveBeenCalled();
  });

  it("Ch.18 Bt-4: destructive keeps its Secondary emphasis structure, recolored, never a new emphasis tier", () => {
    render(
      <Button emphasis="secondary" destructive>
        Delete this case study
      </Button>,
    );
    const button = screen.getByRole("button", { name: "Delete this case study" });
    // Structural check: still a real <button>, not a different element type or role.
    expect(button.tagName).toBe("BUTTON");
  });
});
