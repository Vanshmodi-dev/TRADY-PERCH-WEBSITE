import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Header } from "./header";
import type { NavItem } from "./header.types";

const items: NavItem[] = [
  {
    label: "Solutions",
    dropdown: [
      { label: "AI Agents", href: "/solutions/ai-agents" },
      { label: "Workflow Automation", href: "/solutions/workflow-automation" },
      { label: "Custom Integrations", href: "/solutions/custom-integrations" },
      { label: "Intelligent Systems", href: "/solutions/intelligent-systems" },
    ],
  },
  {
    label: "Industries",
    dropdown: [
      { label: "Real Estate", href: "/industries/real-estate" },
      { label: "Medical", href: "/industries/medical" },
    ],
    viewAllHref: "/industries",
    viewAllLabel: "View all industries",
  },
  { label: "Work", href: "/work" },
  { label: "Pricing", href: "/pricing" },
  { label: "Contact", href: "/contact" },
];

describe("Header", () => {
  it("Ch.20 Nv-1/Nv-3: renders all primary items plus a structurally separate CTA", () => {
    render(<Header items={items} ctaLabel="Book a Strategy Call" ctaHref="/contact" logoIconSrc="/icon.jpeg" />);
    for (const item of items) {
      expect(screen.getAllByText(item.label).length).toBeGreaterThan(0);
    }
    expect(screen.getAllByRole("link", { name: "Book a Strategy Call" }).length).toBeGreaterThan(0);
  });

  it("renders the logo linking home", () => {
    render(<Header items={items} ctaLabel="Book a Strategy Call" ctaHref="/contact" logoIconSrc="/icon.jpeg" />);
    expect(screen.getByRole("link", { name: "Trady Perch — home" })).toHaveAttribute("href", "/");
  });

  it("Ch.20 Nv-2: opens a dropdown on click, exposing its <=4 sub-items plus the View All escape hatch", async () => {
    const user = userEvent.setup();
    render(<Header items={items} ctaLabel="Book a Strategy Call" ctaHref="/contact" logoIconSrc="/icon.jpeg" />);
    const trigger = screen.getByRole("button", { name: /Industries/ });
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    await user.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "true");
    const navItemContainer = trigger.closest('[class*="navItem"]');
    expect(navItemContainer).not.toBeNull();
    const menu = within(navItemContainer as HTMLElement);
    // Plain links, not role="menuitem" — role="menu" implies arrow-key
    // navigation (Ch.42 Kb-4) this disclosure pattern doesn't implement;
    // applying the role without the behavior is a WAI-ARIA anti-pattern.
    expect(menu.getByRole("link", { name: "Real Estate" })).toBeInTheDocument();
    expect(menu.getByRole("link", { name: "View all industries" })).toBeInTheDocument();
  });

  it("Ch.42 Kb-4: Escape closes an open dropdown", async () => {
    const user = userEvent.setup();
    render(<Header items={items} ctaLabel="Book a Strategy Call" ctaHref="/contact" logoIconSrc="/icon.jpeg" />);
    const trigger = screen.getByRole("button", { name: /Solutions/ });
    await user.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "true");
    await user.keyboard("{Escape}");
    expect(trigger).toHaveAttribute("aria-expanded", "false");
  });

  it("Ch.20 §6: marks the current page's nav item as persistently active", () => {
    render(
      <Header
        items={items}
        ctaLabel="Book a Strategy Call"
        ctaHref="/contact"
        logoIconSrc="/icon.jpeg"
        currentPath="/pricing"
      />,
    );
    const pricingLinks = screen.getAllByRole("link", { name: "Pricing" });
    expect(pricingLinks.some((link) => link.className.includes("active"))).toBe(true);
  });

  it("keeps a flat item active on its own sub-routes, not only its exact path", () => {
    render(
      <Header
        items={items}
        ctaLabel="Book a Strategy Call"
        ctaHref="/contact"
        logoIconSrc="/icon.jpeg"
        currentPath="/work/case-studies/real-estate-brokerage"
      />,
    );
    const workLinks = screen.getAllByRole("link", { name: "Work" });
    expect(workLinks.some((link) => link.className.includes("active"))).toBe(true);
  });

  it("never activates a flat item for an unrelated route that merely shares its prefix", () => {
    const itemsWithSimilarPrefix: NavItem[] = [...items, { label: "Workshop", href: "/workshop" }];
    render(
      <Header
        items={itemsWithSimilarPrefix}
        ctaLabel="Book a Strategy Call"
        ctaHref="/contact"
        logoIconSrc="/icon.jpeg"
        currentPath="/work"
      />,
    );
    const workshopLinks = screen.getAllByRole("link", { name: "Workshop" });
    expect(workshopLinks.some((link) => link.className.includes("active"))).toBe(false);
  });

  it("Ch.11: marks the current section active inside the mobile drawer too, not only the desktop bar", async () => {
    const user = userEvent.setup();
    render(
      <Header
        items={items}
        ctaLabel="Book a Strategy Call"
        ctaHref="/contact"
        logoIconSrc="/icon.jpeg"
        currentPath="/solutions/ai-agents"
      />,
    );
    const trigger = screen.getByRole("button", { name: "Open menu" });
    await user.click(trigger);
    const drawer = screen.getByRole("dialog", { name: "Navigation menu" });
    const solutionsLabel = within(drawer).getByText("Solutions");
    expect(solutionsLabel.className).toMatch(/active/i);
  });

  it("Ch.20 Nv-3 / §9: a CTA instance exists outside the drawer — visible in the collapsed mobile bar itself, never hidden inside the menu — in addition to the one inside the open drawer", async () => {
    const user = userEvent.setup();
    render(<Header items={items} ctaLabel="Book a Strategy Call" ctaHref="/contact" logoIconSrc="/icon.jpeg" />);
    // Structural check only: Vitest+jsdom doesn't apply the real .module.css
    // stylesheet (CSS Modules resolve to class-name proxies, not injected
    // rules), so viewport-width visibility itself can't be asserted here —
    // that was verified with a real browser (headless Chromium screenshot
    // at a 390px viewport) during this milestone's manual QA pass. What
    // this test guards against is regressing back to a single CTA element
    // that only exists inside the drawer's DOM subtree.
    const ctaLinksBeforeOpen = screen.getAllByRole("link", { name: "Book a Strategy Call" });
    expect(ctaLinksBeforeOpen.length).toBeGreaterThanOrEqual(1);

    const trigger = screen.getByRole("button", { name: "Open menu" });
    await user.click(trigger);
    const drawer = screen.getByRole("dialog", { name: "Navigation menu" });
    const ctaInDrawer = within(drawer).getByRole("link", { name: "Book a Strategy Call" });
    expect(ctaInDrawer).toBeInTheDocument();

    // At least one CTA instance must exist OUTSIDE the drawer's DOM subtree
    // — that's the header-bar instance Ch.20 §9 requires to stay visible
    // even while the drawer is closed.
    const allCtaLinks = screen.getAllByRole("link", { name: "Book a Strategy Call" });
    const outsideDrawer = allCtaLinks.filter((link) => !drawer.contains(link));
    expect(outsideDrawer.length).toBeGreaterThanOrEqual(1);
  });

  describe("dev-time ceiling warnings", () => {
    const originalEnv = process.env.NODE_ENV;

    beforeEach(() => {
      vi.spyOn(console, "warn").mockImplementation(() => {});
      process.env.NODE_ENV = "development";
    });
    afterEach(() => {
      process.env.NODE_ENV = originalEnv;
      vi.restoreAllMocks();
    });

    it("Ch.20 Nv-1: warns when more than five primary items are passed", () => {
      const tooMany: NavItem[] = [...items, { label: "Extra", href: "/extra" }];
      render(<Header items={tooMany} ctaLabel="Book a Strategy Call" ctaHref="/contact" logoIconSrc="/icon.jpeg" />);
      expect(console.warn).toHaveBeenCalledWith(expect.stringContaining("Nv-1"));
    });

    it("Ch.20 Nv-2: warns when a dropdown exceeds four sub-items", () => {
      const tooManySubItems: NavItem[] = [
        {
          label: "Solutions",
          dropdown: [
            { label: "A", href: "/a" },
            { label: "B", href: "/b" },
            { label: "C", href: "/c" },
            { label: "D", href: "/d" },
            { label: "E", href: "/e" },
          ],
        },
      ];
      render(
        <Header items={tooManySubItems} ctaLabel="Book a Strategy Call" ctaHref="/contact" logoIconSrc="/icon.jpeg" />,
      );
      expect(console.warn).toHaveBeenCalledWith(expect.stringContaining("Nv-2"));
    });
  });
});
