/**
 * THE PRICING PAGE'S ONE EDITING SURFACE.
 *
 * Every string, tier, feature row, slider bound, and FAQ entry rendered by
 * `/pricing` is declared here. The section components under `sections/` read
 * this file and contain no copy of their own, so changing what the page says
 * never means touching JSX.
 *
 * ── The price-figure rule ──────────────────────────────────────────────
 * Master Vision §5.4 forbids any price signal appearing before the Pricing
 * Philosophy section, and the synthesis (docs/_synthesis/00) records real
 * numbers as "deferred indefinitely from public display." The page is
 * therefore built to render figures but ships with them off:
 * `PRICING_SHOW_AMOUNTS` is the single switch. While it is false every tier
 * renders `investmentLabel` ("Custom Quote") instead of a rupee amount, and
 * `pricing-page.test.tsx` asserts that the shipped page contains no figure.
 *
 * To publish real prices later: fill in each tier's `startingFrom`, flip the
 * flag to true, and update the JSON-LD `offers` block in app/pricing/page.tsx.
 * Nothing else needs to change.
 *
 * Annotated `: boolean` rather than left to infer the literal `false`, so
 * TypeScript keeps the figure-rendering branch live and typechecked instead of
 * narrowing it to dead code that would rot unnoticed until the day it matters.
 */
export const PRICING_SHOW_AMOUNTS: boolean = false;

/** Currency the `startingFrom` amounts are denominated in. */
export const PRICING_CURRENCY = "INR" as const;

// ── Section 1 — Header ───────────────────────────────────────────────────

export const PRICING_HEADER = {
  eyebrow: "Pricing",
  heading: "Flexible pricing for businesses that want systems, not just websites.",
  description:
    "Every business is different. Every workflow is different. Every automation is different. Choose the package that fits your current stage — or let us design something built entirely around how you actually operate.",
} as const;

// ── Section 2 — Philosophy ───────────────────────────────────────────────

export type PrincipleIcon = "compass" | "ledger" | "blueprint" | "handshake";

export interface PricingPrinciple {
  id: string;
  icon: PrincipleIcon;
  title: string;
  body: string;
}

/**
 * Shown before any package, deliberately: §5.4's reasoning is that a price
 * encountered without an established frame gets judged against the cheapest
 * competitor rather than against the value demonstrated.
 */
export const PRICING_PRINCIPLES: PricingPrinciple[] = [
  {
    id: "custom-first",
    icon: "compass",
    title: "Built around your business",
    body: "We scope from how your work actually runs today, not from a template that decides what you need before we've spoken.",
  },
  {
    id: "no-hidden-costs",
    icon: "ledger",
    title: "No hidden costs",
    body: "The number you approve is the number you pay. No open-ended hourly billing, no surprise line items after delivery.",
  },
  {
    id: "enterprise-delivery",
    icon: "blueprint",
    title: "Enterprise-quality delivery",
    body: "Typed, tested, accessible, and measured against a written performance budget — the same standard whatever the tier.",
  },
  {
    id: "partnership",
    icon: "handshake",
    title: "A long-term partnership",
    body: "Most engagements continue past launch. We build systems we expect to keep improving, not projects we hand over and leave.",
  },
];

// ── Section 3 — Packages ─────────────────────────────────────────────────

export interface PackageCta {
  label: string;
  href: string;
}

export interface PricingPackage {
  id: string;
  name: string;
  /** One line under the tier name — who this is for. */
  positioning: string;
  /**
   * Rupee figure rendered as "Starting from ₹…" when PRICING_SHOW_AMOUNTS is
   * true. `null` while figures are unpublished. Whole rupees, no paise.
   */
  startingFrom: number | null;
  /** Rendered in place of the figure while figures are off. */
  investmentLabel: string;
  /** Always shown beneath the price slot, in both modes. */
  investmentNote: string;
  /** "Everything in Launch, plus…" — omitted on the first tier. */
  inheritsFrom?: string;
  features: string[];
  /** Delivery + support facts, shown as a small meta row. */
  timeline: string;
  support: string;
  cta: PackageCta;
  /** Exactly one tier may be featured. */
  featured?: boolean;
  featuredBadge?: string;
}

export const PRICING_PACKAGES: PricingPackage[] = [
  {
    id: "launch",
    name: "Launch",
    positioning: "For businesses establishing a serious presence for the first time.",
    startingFrom: null,
    investmentLabel: "Custom Quote",
    investmentNote: "Scoped in Discover, before any build work begins.",
    features: [
      "Premium custom website",
      "Fully responsive across every device",
      "Technical SEO foundation",
      "Contact forms with validated delivery",
      "Analytics and conversion tracking",
      "Performance optimisation to budget",
      "Defined delivery timeline",
      "Post-launch support period",
    ],
    timeline: "3–5 weeks",
    support: "30 days post-launch",
    cta: { label: "Book a strategy call", href: "/contact" },
  },
  {
    id: "growth",
    name: "Growth",
    positioning: "For businesses ready to automate the work that eats the week.",
    startingFrom: null,
    investmentLabel: "Custom Quote",
    investmentNote: "Scoped in Discover, before any build work begins.",
    inheritsFrom: "Launch",
    features: [
      "Workflow automation",
      "AI assistant trained on your business",
      "CRM integration",
      "Email and lifecycle automation",
      "Operational dashboard",
      "Third-party API integrations",
      "Scheduled analytics reporting",
      "Priority support",
    ],
    timeline: "6–10 weeks",
    support: "90 days post-launch",
    cta: { label: "Book a strategy call", href: "/contact" },
    featured: true,
    featuredBadge: "Most popular",
  },
  {
    id: "scale",
    name: "Scale",
    positioning: "For organisations running real operations on software they own.",
    startingFrom: null,
    investmentLabel: "Custom Quote",
    investmentNote: "Scoped in Discover, before any build work begins.",
    inheritsFrom: "Growth",
    features: [
      "Custom AI agents",
      "Internal business systems",
      "Multi-platform applications",
      "Advanced reporting dashboards",
      "Team training and handover",
      "Priority development capacity",
      "Dedicated support channel",
      "Long-term engineering partnership",
    ],
    timeline: "12 weeks onward",
    support: "Ongoing retainer",
    cta: { label: "Let's build together", href: "/contact" },
  },
];

// ── Section 4 — Comparison ───────────────────────────────────────────────

/**
 * `true`/`false` render as an included/excluded mark; a string renders as
 * literal text (used where a tier differs by degree rather than presence).
 */
export type ComparisonValue = boolean | string;

export interface ComparisonRow {
  id: string;
  label: string;
  /** Keyed by package id — every key in PRICING_PACKAGES must be present. */
  values: Record<string, ComparisonValue>;
}

export interface ComparisonGroup {
  id: string;
  label: string;
  rows: ComparisonRow[];
}

export const COMPARISON_GROUPS: ComparisonGroup[] = [
  {
    id: "foundation",
    label: "Foundation",
    rows: [
      {
        id: "website",
        label: "Custom website",
        values: { launch: true, growth: true, scale: true },
      },
      {
        id: "responsive",
        label: "Mobile responsive",
        values: { launch: true, growth: true, scale: true },
      },
      {
        id: "seo",
        label: "Search optimisation",
        values: { launch: "Technical", growth: "Technical + content", scale: "Full programme" },
      },
      {
        id: "cms",
        label: "Content management",
        values: { launch: false, growth: true, scale: true },
      },
      { id: "blog", label: "Blog / resources", values: { launch: false, growth: true, scale: true } },
      {
        id: "analytics",
        label: "Analytics",
        values: { launch: "Standard", growth: "Custom events", scale: "Warehoused" },
      },
    ],
  },
  {
    id: "automation",
    label: "Automation & intelligence",
    rows: [
      { id: "chatbot", label: "AI assistant", values: { launch: false, growth: true, scale: true } },
      {
        id: "workflow",
        label: "Workflow automation",
        values: { launch: false, growth: true, scale: true },
      },
      { id: "crm", label: "CRM integration", values: { launch: false, growth: true, scale: true } },
      {
        id: "email",
        label: "Email automation",
        values: { launch: false, growth: true, scale: true },
      },
      {
        id: "api",
        label: "API integrations",
        values: { launch: false, growth: "Standard", scale: "Unlimited" },
      },
      { id: "agents", label: "Custom AI agents", values: { launch: false, growth: false, scale: true } },
      {
        id: "dashboards",
        label: "Dashboards",
        values: { launch: false, growth: "Operational", scale: "Advanced" },
      },
      {
        id: "software",
        label: "Custom internal software",
        values: { launch: false, growth: false, scale: true },
      },
    ],
  },
  {
    id: "partnership",
    label: "Support & partnership",
    rows: [
      {
        id: "support",
        label: "Support period",
        values: { launch: "30 days", growth: "90 days", scale: "Ongoing" },
      },
      {
        id: "maintenance",
        label: "Maintenance",
        values: { launch: "Optional", growth: "Included", scale: "Included" },
      },
      { id: "training", label: "Team training", values: { launch: false, growth: false, scale: true } },
      {
        id: "priority",
        label: "Priority support",
        values: { launch: false, growth: true, scale: "Dedicated channel" },
      },
    ],
  },
];

// ── Section 5 — ROI calculator ───────────────────────────────────────────

export interface RoiInputConfig {
  id: RoiInputId;
  label: string;
  /** Short clarification rendered under the label for screen readers and sighted users alike. */
  hint: string;
  min: number;
  max: number;
  step: number;
  defaultValue: number;
  /** Appended to the live value readout, e.g. "hrs/week". */
  unit: string;
  /** True for money inputs so the readout renders in rupees. */
  currency?: boolean;
}

export type RoiInputId =
  | "employees"
  | "hoursPerWeek"
  | "hourlyCost"
  | "repetitiveShare"
  | "automationShare";

export const ROI_INPUTS: RoiInputConfig[] = [
  {
    id: "employees",
    label: "People doing this work",
    hint: "Team members whose week includes the process you want to automate.",
    min: 1,
    max: 100,
    step: 1,
    defaultValue: 6,
    unit: "people",
  },
  {
    id: "hoursPerWeek",
    label: "Hours each spends per week",
    hint: "Total working hours per person, before separating out repetitive work.",
    min: 1,
    max: 60,
    step: 1,
    defaultValue: 38,
    unit: "hrs/week",
  },
  {
    id: "hourlyCost",
    label: "Average hourly cost",
    hint: "Fully loaded cost per person-hour, not take-home salary.",
    min: 100,
    max: 5000,
    step: 50,
    defaultValue: 600,
    unit: "per hour",
    currency: true,
  },
  {
    id: "repetitiveShare",
    label: "Share that is repetitive",
    hint: "How much of those hours is manual, rule-based, and repeated.",
    min: 0,
    max: 100,
    step: 5,
    defaultValue: 40,
    unit: "%",
  },
  {
    id: "automationShare",
    label: "Share we can automate",
    hint: "Of the repetitive work, how much a system realistically absorbs.",
    min: 0,
    max: 100,
    step: 5,
    defaultValue: 70,
    unit: "%",
  },
];

export const ROI_COPY = {
  eyebrow: "ROI",
  heading: "Calculate what the manual work is costing you.",
  description:
    "Move the sliders to match your team. The figures update instantly — nothing is sent anywhere, and nothing is stored.",
  disclaimer:
    "An indicative model based on the values you enter, not a quote or a guarantee. Real recovery depends on which processes are automated and how consistently the system is adopted.",
} as const;

// ── Section 6 — FAQ ──────────────────────────────────────────────────────

/**
 * `answer` is a plain string, not the `ReactNode` the Ch.37 Accordion would
 * also accept — app/pricing/page.tsx projects these same items into FAQPage
 * JSON-LD, where the answer has to be serialisable text. Keeping the type
 * narrow means a future answer containing markup fails at the type level
 * rather than silently emitting "[object Object]" into structured data.
 */
export interface PricingFaqItem {
  id: string;
  question: string;
  answer: string;
}

export const PRICING_FAQ_COPY = {
  eyebrow: "Questions",
  heading: "What people ask before they book.",
} as const;

export const PRICING_FAQ_ITEMS: PricingFaqItem[] = [
  {
    id: "no-fixed-prices",
    question: "Why don't you display fixed prices?",
    answer:
      "Because a fixed price would be a guess. Two businesses asking for 'workflow automation' can differ tenfold in the number of systems involved, the state of their data, and how much has to be rebuilt before anything can be automated. Publishing a number that ignores all of that would either overcharge the simple case or under-scope the complex one. You get a specific figure during Discover, in writing, before any build work starts.",
  },
  {
    id: "timeline",
    question: "How long does a project take?",
    answer:
      "A Launch engagement typically runs three to five weeks. Growth runs six to ten. Scale starts around twelve and is sequenced into stages so value ships before the whole system is finished. Timelines are agreed at scoping, not estimated afterwards.",
  },
  {
    id: "maintenance",
    question: "Do you offer maintenance?",
    answer:
      "Yes. Every package includes a support period after launch, and maintenance is included outright from Growth upward. Beyond that, ongoing maintenance is available as a retainer — it is never bundled in silently to inflate a quote.",
  },
  {
    id: "existing-site",
    question: "Can you improve an existing website?",
    answer:
      "Often, yes. We audit what exists first: if the foundation is sound, improving it is faster and cheaper than a rebuild, and we will say so. If it is not, we will tell you that too, with the reasoning, rather than quietly charging you to renovate something that should be replaced.",
  },
  {
    id: "ai-agents",
    question: "Do you actually build AI agents?",
    answer:
      "Yes — agents that take real actions inside your systems, not a chat widget bolted onto a marketing page. That means integration with your CRM, your inbox, and your internal tools, with defined boundaries on what the agent is permitted to do and a human in the loop wherever the stakes justify one.",
  },
  {
    id: "long-term",
    question: "Can we hire you long term?",
    answer:
      "That is how most engagements end up. After the first system proves out, the usual next step is a standing arrangement — a defined amount of development capacity each month, spent on whatever the business needs most at the time.",
  },
  {
    id: "after-delivery",
    question: "What happens after delivery?",
    answer:
      "You own everything: the code, the infrastructure, the accounts, the documentation. We hand over a working system with a walkthrough for whoever will operate it, then stay available through the support period. There is no lock-in and nothing is held hostage to a subscription.",
  },
];

// ── Section 7 — Final CTA ────────────────────────────────────────────────

export const PRICING_CTA = {
  heading: "Ready to build something exceptional?",
  description:
    "Let's discuss your business, identify where automation actually pays, and design a system built specifically around your goals.",
  primary: { label: "Book a strategy call", href: "/contact" },
  secondary: { label: "View our work", href: "/work" },
} as const;
