// Every real, reachable route — shared by a11y-audit.mjs and
// performance-audit.mjs, extracted once a second script needed the
// identical list. Tier 1 (indexable, per app/sitemap.ts) + Tier 2
// (deferred-but-real, per ADR-0007 — a visitor can land on these today
// even though they're noindexed for SEO) + a genuine 404.
export const ROUTES = [
  "/",
  "/solutions",
  "/solutions/ai-agents",
  "/solutions/workflow-automation",
  "/solutions/custom-integrations",
  "/solutions/intelligent-systems",
  "/industries",
  "/industries/real-estate",
  "/industries/medical",
  "/industries/legal",
  "/industries/manufacturing",
  "/work",
  "/work/case-studies",
  "/work/case-studies/real-estate-brokerage",
  "/work/case-studies/manufacturing-supplier",
  "/work/case-studies/medical-practice",
  "/pricing",
  "/contact",
  "/faq",
  "/legal",
  "/privacy",
  "/terms",
  "/about",
  "/process",
  "/careers",
  "/resources",
  "/blog",
  "/search",
  "/this-route-does-not-exist-a11y-audit",
];
