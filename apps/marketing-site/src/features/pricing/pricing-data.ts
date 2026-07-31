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

/*
 * `ENGAGEMENT_SHAPES` used to live here, describing three qualitative
 * engagement scopes for the old /pricing page. It was removed when that page
 * was rebuilt around the named Launch/Growth/Scale packages in
 * `pricing-config.ts`, which say the same thing concretely and are the single
 * editing surface now. This file is kept solely for `PRICING_FACTORS`, which
 * the homepage teaser still renders.
 */
