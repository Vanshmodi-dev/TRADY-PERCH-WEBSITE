# CHAPTER 40 — TECHNICAL SEO STANDARD

**Trady Perch Product Implementation Constitution · Part VIII: SEO & Discoverability Implementation**

**Inherited From:** Design System Bible Chapter 56 (UX Writing & Microcopy System — the content-quality standard this chapter's generated copy fields must satisfy). Chapter 39 (SEO Implementation Philosophy) and Chapter 38 (Rendering Strategy Standard) are this chapter's direct premises.

---

## 1. INTRODUCTION

Chapter 39 established SEO as a structural, build-time property. This chapter is the concrete mechanics: meta tags, structured data, sitemap and robots configuration, and canonical URL handling, each generated automatically from a page's own content and template rather than manually authored per page — because manual, per-page authoring is exactly the kind of repeated, easy-to-forget task Chapter 1's IP2 favors replacing with a mechanical guarantee.

---

## 2. META TAG GENERATION

Every route's meta tags — title, description, Open Graph and social-preview fields — are generated from the same content source that renders the page itself, per Chapter 24's schema-first discipline extended to page metadata: a page's title tag is derived from its actual heading content plus a fixed site-name suffix, never independently hand-typed and left to drift from the page's real content. A page template that introduces a new content field affecting metadata (a case study's client name, for instance) updates the metadata-generation function in the same change, per Chapter 3's translation-ledger discipline — metadata generation is a consumer of the page's content schema, not a separately maintained parallel description of it.

Description and social-preview copy, where not directly derived from body content, follows Design System Bible Chapter 56's UX writing standard exactly — the same voice and brevity discipline governing any other user-facing copy in the product, because a meta description is copy a prospective visitor reads, in a search result, before ever reaching the brand's own controlled surface.

---

## 3. STRUCTURED DATA

Every page type generates its structured data (schema.org-equivalent markup) automatically from its template, per the same generation model as Section 2 — a case-study page's template knows it produces an Article-equivalent structured-data block; a pricing page's template knows it produces a Product-or-Service-equivalent block. This mapping is defined once per page template, not once per page instance, so that every new case study or new pricing tier inherits correct structured data automatically the moment it's created, with zero additional authoring required — the direct mechanism behind this chapter's own success criterion.

---

## 4. SITEMAP AND ROBOTS CONFIGURATION

The sitemap is generated automatically from the set of routes Chapter 38's rendering-strategy classification marks as intended for indexing — a route is included or excluded based on the same classification already made at that route's creation, per Chapter 38 §4, never maintained as a separately hand-edited list that could drift from the actual route set. The robots configuration follows the same generation model: a route's indexability is a property stated once, at the route level, and both the sitemap and the robots directives read from that single stated property rather than being independently configured in two places that could disagree.

---

## 5. CANONICAL URL HANDLING

Every route declares its own canonical URL, derived from UX / Experience Blueprint Chapter 20's information architecture per Chapter 39 §3 — never inferred implicitly from whatever URL happened to be requested, which risks a route being reachable through more than one URL pattern with no stated canonical among them, diluting its search relevance. Where a route is legitimately reachable through more than one URL (a filtered view of a data set, for instance), the canonical tag points to the unfiltered or default-filtered version, consistent with UX / Experience Blueprint Chapter 20's architecture rather than an arbitrary technical default.

---

## 6. ENFORCEMENT & MEASUREMENT

An automated schema validator, run in CI per Chapter 56, checks every route's generated structured data against the relevant schema.org-equivalent specification, failing the build on an invalid or incomplete block — the direct mechanism behind this chapter's own success criterion. A second check confirms every indexable route (per Section 4) appears in the generated sitemap and every non-indexable route is correctly excluded, with no manual sitemap edit ever required or permitted outside this generation process.

---

## 7. BEHAVIORAL RULES

**When creating a new page template.** Its metadata-generation mapping (Section 2) and structured-data mapping (Section 3) are defined as part of the template itself, before the first page instance using it ships — never retrofitted once several pages already exist without either.

**When a page's content schema changes.** Its metadata and structured-data generation functions are updated in the same change, per Chapter 3's translation-ledger discipline, never left silently out of sync with the new schema.

**When a route's indexability status changes.** It is updated at the route-level declaration per Section 4 — never patched directly in a hand-edited sitemap or robots file, which this chapter's generation model doesn't permit to exist as a separate, editable artifact.

---

## 8. DO / DON'T

**Do** derive every page's metadata and structured data from its own content schema and template, automatically, per Sections 2 and 3.

**Do** declare a route's canonical URL and indexability status once, at the route level, and let the sitemap and robots configuration read from that single source.

**Don't** hand-author meta tags or structured data per individual page instance — define the generation mapping once per template.

**Don't** maintain a hand-edited sitemap or robots file separate from the automated generation process.

---

## 9. QUALITY ASSURANCE CHECKLIST

- [ ] Does every route generate its meta tags automatically from its content schema, with zero manual per-page authoring?
- [ ] Does every page type's structured data pass the automated schema validator in CI?
- [ ] Does the generated sitemap include every indexable route and exclude every non-indexable one, per Section 4's single-source model?
- [ ] Does every route declare an explicit canonical URL derived from UX / Experience Blueprint Chapter 20's architecture?
- [ ] Does generated description and preview copy follow Design System Bible Chapter 56's UX writing standard?

---

## 10. CROSS REFERENCES

**Within this Constitution:** Chapter 3 (translation-ledger discipline behind Sections 2–3). Chapter 24 (schema-first discipline extended to metadata). Chapter 38 §4 (the indexability classification Section 4 reads from). Chapter 39 §3 (the information architecture Section 5 derives canonical URLs from). Chapter 56 (CI pipeline running Section 6's validator).

**Within the five documents above this Constitution:** Design System Bible Chapter 56; UX / Experience Blueprint Chapter 20.

---

## 11. FUTURE EXPANSION

**Documented limitations.** Section 3's structured-data mapping currently covers the page types Chapter 2's named surfaces already require; a genuinely new content type would need its own mapping defined at the point it's introduced, per Section 7's behavioral rule, not before.

---

*End of Chapter 40. The next chapter, AI-Search & Machine Discoverability Standard, extends this chapter's discipline to how the product is read and summarized by third-party AI systems rather than traditional search crawlers.*
