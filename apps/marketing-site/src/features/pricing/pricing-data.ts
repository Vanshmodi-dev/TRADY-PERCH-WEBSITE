export interface PricingFactor {
  title: string;
  body: string;
}

/**
 * Master Vision Ch.13 item 12 / Ch.5.4: HOW pricing works, never a
 * specific number. Shared between the homepage teaser and the dedicated
 * /pricing page so the two can never drift.
 */
export const PRICING_FACTORS: PricingFactor[] = [
  {
    title: "Scope-based, not seat-based",
    body: "You pay for the system you need, not a per-user subscription that grows whether or not you're using it.",
  },
  {
    title: "Estimated before we start",
    body: "You'll know the investment before any work begins — no surprise invoices, no open-ended hourly billing.",
  },
  {
    title: "Sized to the problem",
    body: "A single automation and a company-wide system are priced differently, because they're genuinely different amounts of work.",
  },
];

export interface EngagementShape {
  title: string;
  body: string;
}

/**
 * Qualitative descriptions of how engagements typically differ in scope —
 * deliberately contains no dollar figures, ranges, or relative price
 * signals ("$" symbols, "budget-friendly," etc.), per Ch.5.4's blanket
 * rule against any price signal anywhere on the site, including a
 * "starting at" figure.
 */
export const ENGAGEMENT_SHAPES: EngagementShape[] = [
  {
    title: "A single automation",
    body: "One specific, well-defined piece of manual work — a quoting process, a lead-qualification flow — replaced end to end. The most common starting point for a first engagement.",
  },
  {
    title: "A multi-system buildout",
    body: "Several connected pieces of work across more of the business — automation plus the integrations that feed it — scoped and sequenced as one coordinated engagement.",
  },
  {
    title: "An ongoing partnership",
    body: "Continued support and new systems added over time, for businesses that have already seen the first engagement work and want a standing partner rather than a one-off project.",
  },
];
