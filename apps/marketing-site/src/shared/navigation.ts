import type { FooterColumn, FooterLink, NavItem } from "@trady-perch/ui";

/**
 * Single source of truth for site navigation, per
 * docs/adr/0006-sitemap-and-navigation-ia.md. Do not hand-edit a nav
 * structure elsewhere — extend this file and its governing ADR instead.
 */
export const PRIMARY_NAV_ITEMS: NavItem[] = [
  {
    label: "Solutions",
    dropdown: [
      { label: "AI Agents", href: "/solutions/ai-agents" },
      { label: "Workflow Automation", href: "/solutions/workflow-automation" },
      { label: "Custom Integrations", href: "/solutions/custom-integrations" },
      { label: "Intelligent Systems", href: "/solutions/intelligent-systems" },
    ],
    // Mirrors Industries below. Without it `/solutions` — a real, indexable
    // page carrying the second-highest sitemap priority on the site (0.9) —
    // was reachable from no global navigation at all: a link-graph pass over
    // the built HTML found 4 inbound internal links to it, against 28 for
    // every route the header or footer actually links, and none from either
    // the desktop dropdown or the mobile drawer, where "Solutions" was a
    // non-navigable group label. Ch.20 Nv-2's four-sub-item ceiling is
    // unaffected: this is the same structurally-separate "view all"
    // affordance Industries already uses, not a fifth sub-item.
    viewAllHref: "/solutions",
    viewAllLabel: "View all solutions",
  },
  {
    label: "Industries",
    dropdown: [
      { label: "Real Estate", href: "/industries/real-estate" },
      { label: "Medical", href: "/industries/medical" },
      { label: "Legal", href: "/industries/legal" },
      { label: "Manufacturing", href: "/industries/manufacturing" },
    ],
    viewAllHref: "/industries",
    viewAllLabel: "View all industries",
  },
  { label: "Work", href: "/work" },
  { label: "Pricing", href: "/pricing" },
  { label: "Contact", href: "/contact" },
];

export const PRIMARY_CTA = {
  label: "Book a Strategy Call",
  href: "/contact",
};

export const FOOTER_COLUMNS: FooterColumn[] = [
  {
    heading: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Process", href: "/process" },
      { label: "Careers", href: "/careers" },
    ],
  },
  {
    heading: "Resources",
    links: [
      { label: "Resources", href: "/resources" },
      { label: "Blog", href: "/blog" },
      { label: "FAQ", href: "/faq" },
    ],
  },
  {
    heading: "Work",
    links: [
      { label: "Portfolio", href: "/work" },
      { label: "Case Studies", href: "/work/case-studies" },
      { label: "Pricing", href: "/pricing" },
    ],
  },
];

export const FOOTER_LEGAL_LINKS: FooterLink[] = [
  { label: "Legal", href: "/legal" },
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
];
