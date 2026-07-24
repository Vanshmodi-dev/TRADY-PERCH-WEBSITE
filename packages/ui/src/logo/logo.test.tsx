import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Logo } from "./logo";

describe("Logo", () => {
  it("renders as a link to home by default", () => {
    render(<Logo iconSrc="/icon.jpeg" />);
    const link = screen.getByRole("link", { name: "Trady Perch — home" });
    expect(link).toHaveAttribute("href", "/");
  });

  it("renders the wordmark text and icon mark", () => {
    const { container } = render(<Logo iconSrc="/icon.jpeg" />);
    expect(screen.getByText("Trady Perch")).toBeInTheDocument();
    const img = container.querySelector("img");
    expect(img).toHaveAttribute("src", "/icon.jpeg");
  });

  it("respects a custom href", () => {
    render(<Logo iconSrc="/icon.jpeg" href="/en" />);
    expect(screen.getByRole("link", { name: "Trady Perch — home" })).toHaveAttribute("href", "/en");
  });
});
