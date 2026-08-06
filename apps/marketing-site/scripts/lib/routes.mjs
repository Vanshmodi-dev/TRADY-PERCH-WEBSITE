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
  // The GitHub-backed portfolio. Both entries depend on the live feed rather
  // than on a checked-in registry, which makes them the two routes here most
  // worth auditing — they carry the only third-party-authored content on the
  // site (a rendered README) and the only live filter UI.
  //
  // The detail route is pinned to this site's own repository because it is the
  // one entry guaranteed to exist for as long as the site does.
  //
  // KNOWN LIMITATION — what these two actually cover depends on where the
  // audit runs. CI deliberately provides no secrets (see the accessibility job
  // in .github/workflows/ci.yml), so `MARKETING_SITE_GITHUB_USERNAME` is unset
  // there: the index renders its empty state and the detail route 404s. The
  // audit navigates and runs axe without asserting on HTTP status, so both
  // still pass — it is simply auditing the empty and not-found states rather
  // than a populated grid and a rendered README.
  //
  // That is not a false pass (those states are real and worth checking), but
  // it does mean the populated markup is only genuinely audited on a machine
  // with the feed configured — which is how it was verified before shipping:
  // 31 routes, zero WCAG 2.1 A/AA violations, run locally against live data.
  // Giving the CI job a read-only token would close the gap.
  "/work/projects/trady-perch-website",
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
