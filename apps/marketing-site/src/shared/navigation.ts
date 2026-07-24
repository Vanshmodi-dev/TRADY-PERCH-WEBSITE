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
