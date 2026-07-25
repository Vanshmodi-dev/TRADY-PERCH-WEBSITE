# ADR-0007: Reconciling Ch.14's launch/deferred pages with ADR-0006's full route list

**Status:** Accepted
**Date:** 2026-07-24
**Origin:** Master Vision Ch.14 (Page-by-Page Vision) §14.1/14.2; Ch.12.1 (Sitemap Philosophy); [[0006-sitemap-and-navigation-ia]]; Ch.15 (Portfolio & Case Study Philosophy).

## Context

ADR-0006 (Milestone 2) mapped the master prompt's ~18-page required list onto real routes so no nav/footer link would 404, with a `PageStub` placeholder on every route noting "Full page content arrives in Milestone 4."

Reading Master Vision Ch.14 in full for Milestone 4 surfaces a real tension that Milestone 2 hadn't yet encountered: Ch.14.1 names an explicit, short launch list — Homepage, Case Studies (index + detail), Privacy Policy, Terms of Service, and a dedicated Contact page. Ch.14.2 explicitly **defers** About, Blog/Resources, and Careers, each with a stated reason (About: "a thin About page... actively damages credibility more than having no About page at all"; Blog: "three blog posts from a year ago is worse for trust than no blog at all... signals abandonment"; Careers: "signals inflated size/ambition rather than genuine growth"). Ch.12.1 states the same principle at the IA level: "an agency site with a thin blog, an empty 'resources' page, and a placeholder 'careers' page communicates the opposite of premium."

The Master Vision Document explicitly claims interpretive supremacy over the rest of the system ("Where ambiguity exists later, this document resolves it" — front matter), so this isn't a peer disagreement between two equally-weighted sources; Ch.14 governs.

## Decision

Keep every route ADR-0006 created (no regression on "nothing 404s"), but split Milestone 4 build depth into two tiers instead of building all ~18 pages to homepage-grade depth:

**Tier 1 — full content, same rigor as Milestone 3** (either explicitly required by Ch.14.1, or directly reachable from the 5-item primary nav, which by construction cannot point at a hollow page):
`/solutions` + 4 detail routes, `/industries` + 4 detail routes, `/work`, `/work/case-studies` + detail routes, `/pricing`, `/contact`, `/privacy`, `/terms`. `/faq` is added to this tier despite not being named in Ch.14: it carries zero "thin content" risk (Q&A content doesn't suffer from "not enough has happened yet" the way a company story or blog does), and it costs little since it reuses the Accordion + an expanded version of the homepage's own FAQ data.

**Tier 2 — intentionally minimal, on-brand, honestly-labeled "not yet" page** (Ch.14.2's explicit deferrals, plus `/process` and `/search` which were never content Ch.14 asked for): `/about`, `/process`, `/careers`, `/resources`, `/blog`, `/search`. These stop promising "full content arrives in Milestone 4" (the current `PageStub` copy) and instead say, plainly, that the page is intentionally not built yet — the honest equivalent of Ch.14's own reasoning, applied to the page itself rather than silently building filler. This is a new `DeferredPageNotice` component, not a content page.

No footer links are removed. Ch.20's nav-ceiling anti-pattern reasoning (cited in ADR-0006) is about primary nav, not the footer; removing already-shipped M2 footer links to relitigate approved architecture is a bigger, riskier change than tiering content depth, and the honest Tier 2 treatment already satisfies Ch.14's actual concern (don't present thin content as finished).

## Consequences

- Milestone 4's real scope is 17 full pages (Solutions ×5, Industries ×5, Work, Case Studies index + detail routes, Pricing, Contact, Privacy, Terms, FAQ), not ~18 homepage-grade pages.
- `/about`, `/process`, `/careers`, `/resources`, `/blog`, `/search` get a new shared `DeferredPageNotice` treatment in this milestone (replacing the bare `PageStub` copy that over-promised) but no bespoke content — revisit only when a genuine content need exists (Ch.12.1), not on a future milestone's schedule by default.
- If real case studies, a hiring need, or a publishing cadence materializes later, Tier 2 pages move to Tier 1 individually — this is a per-page content-readiness decision, not an engineering blocker.
