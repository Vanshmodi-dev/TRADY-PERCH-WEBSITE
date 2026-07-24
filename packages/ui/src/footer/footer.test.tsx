import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Footer } from "./footer";
import type { FooterColumn, FooterLink } from "./footer.types";

const columns: FooterColumn[] = [
  { heading: "Company", links: [{ label: "About", href: "/about" }, { label: "Careers", href: "/careers" }] },
  { heading: "Resources", links: [{ label: "Blog", href: "/blog" }] },
];
const legalLinks: FooterLink[] = [
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
];

describe("Footer", () => {
  it("renders every column heading and its links", () => {
    render(
      <Footer
        logoIconSrc="/icon.jpeg"
        columns={columns}
        legalLinks={legalLinks}
        copyrightText="© 2026 Trady Perch"
      />,
    );
    expect(screen.getByText("Company")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "About" })).toHaveAttribute("href", "/about");
    expect(screen.getByRole("link", { name: "Careers" })).toHaveAttribute("href", "/careers");
    expect(screen.getByText("Resources")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Blog" })).toHaveAttribute("href", "/blog");
  });

  it("renders legal links and the copyright text", () => {
    render(
      <Footer
        logoIconSrc="/icon.jpeg"
        columns={columns}
        legalLinks={legalLinks}
        copyrightText="© 2026 Trady Perch"
      />,
    );
    expect(screen.getByRole("link", { name: "Privacy" })).toHaveAttribute("href", "/privacy");
    expect(screen.getByRole("link", { name: "Terms" })).toHaveAttribute("href", "/terms");
    expect(screen.getByText("© 2026 Trady Perch")).toBeInTheDocument();
  });

  it("renders the logo linking home", () => {
    render(
      <Footer
        logoIconSrc="/icon.jpeg"
        columns={columns}
        legalLinks={legalLinks}
        copyrightText="© 2026 Trady Perch"
      />,
    );
    expect(screen.getByRole("link", { name: "Trady Perch — home" })).toHaveAttribute("href", "/");
  });

  it("labels each column as a distinct navigation landmark for assistive tech", () => {
    render(
      <Footer
        logoIconSrc="/icon.jpeg"
        columns={columns}
        legalLinks={legalLinks}
        copyrightText="© 2026 Trady Perch"
      />,
    );
    expect(screen.getByRole("navigation", { name: "Company" })).toBeInTheDocument();
    expect(screen.getByRole("navigation", { name: "Resources" })).toBeInTheDocument();
    expect(screen.getByRole("navigation", { name: "Legal" })).toBeInTheDocument();
  });
});
