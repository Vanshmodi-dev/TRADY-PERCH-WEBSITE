import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Link } from "./link";
import type { LinkComponent } from "./link.types";

describe("Link", () => {
  it("renders a plain anchor by default", () => {
    render(<Link href="/about">About</Link>);
    const link = screen.getByRole("link", { name: "About" });
    expect(link).toHaveAttribute("href", "/about");
    expect(link.tagName).toBe("A");
  });

  it("delegates rendering to an injected linkComponent", () => {
    const FakeFrameworkLink: LinkComponent = ({ href, children, ...rest }) => (
      <a href={href} data-framework-link="true" {...rest}>
        {children}
      </a>
    );
    render(
      <Link href="/contact" linkComponent={FakeFrameworkLink}>
        Contact
      </Link>,
    );
    const link = screen.getByRole("link", { name: "Contact" });
    expect(link).toHaveAttribute("href", "/contact");
    expect(link).toHaveAttribute("data-framework-link", "true");
  });

  it("forwards arbitrary anchor attributes", () => {
    render(
      <Link href="/external" target="_blank" rel="noreferrer">
        External
      </Link>,
    );
    const link = screen.getByRole("link", { name: "External" });
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noreferrer");
  });
});
