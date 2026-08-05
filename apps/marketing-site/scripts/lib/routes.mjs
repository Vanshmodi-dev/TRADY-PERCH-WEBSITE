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
  // one entry guaranteed to exist for as long as the site does. If the feed is
  // unconfigured or failing, it 404s and the audit reports that rather than
  // silently skipping — which is the correct signal, not a false pass.
  "/work/projects",
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
