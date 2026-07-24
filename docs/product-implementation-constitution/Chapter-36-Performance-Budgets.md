# CHAPTER 36 — PERFORMANCE BUDGETS

**Trady Perch Product Implementation Constitution · Part VII: Performance Engineering**

**Inherited From:** Master Vision Document §23 (Performance Standards); Motion Bible Chapter 17 (Animation Density & Motion Budget, once written — this chapter's animation frame-budget is a first-canonical proposal pending that chapter's full specification). Chapter 35 (Performance Philosophy) and Chapter 14 (Motion Implementation Strategy) are this chapter's direct premises.

*A note on status, in keeping with this Constitution's own honesty standard (mirroring the Design System Bible's own admitted first-canonical proposals): the specific numeric thresholds below are this chapter's first-canonical values, reasoned from Master Vision §23 and general Core Web Vitals guidance rather than derived from a yet-unwritten Motion Bible Chapter 17. They are binding as written, per Chapter 1's IP2, but flagged here as subject to revision once real, measured production data exists — tracked in Chapter 66's debt register as a value to revisit, not a value to treat as beyond question.*

---

## 1. INTRODUCTION

Chapter 35 established that performance is owned with the same non-negotiable-floor authority as accessibility. This chapter is where that authority gets an actual number: Core Web Vitals thresholds, bundle-size ceilings per route, and an animation frame budget, expressed as a machine-readable budget file that Chapter 49's quality gates enforce automatically.

---

## 2. CORE WEB VITALS THRESHOLDS, PER SURFACE

Per Chapter 2's surface architecture, budgets are set per surface, not uniformly, because a static Marketing Site page and an authenticated, data-dense Client Portal view have structurally different performance profiles and structurally different acceptable costs.

| Metric | Marketing Site | Client Portal |
|---|---|---|
| Largest Contentful Paint | ≤ 2.0s | ≤ 2.5s |
| Interaction to Next Paint | ≤ 150ms | ≤ 200ms |
| Cumulative Layout Shift | ≤ 0.05 | ≤ 0.1 |
| Time to First Byte | ≤ 400ms | ≤ 600ms |

The Marketing Site's tighter thresholds reflect Chapter 2 §4's static-first posture and Part VIII's SEO obligations, both of which directly reward faster load. The Client Portal's slightly more permissive thresholds reflect its authenticated, client-heavy posture per Chapter 2 §4 — still strict, but calibrated to a data-dense view's genuinely higher baseline cost rather than an identical target that would either be trivially easy for the Marketing Site or unrealistically tight for the Portal.

---

## 3. BUNDLE-SIZE CEILINGS

| Bundle | Ceiling (gzipped) |
|---|---|
| Marketing Site, per-route JavaScript | 100KB |
| Marketing Site, shared/vendor JavaScript | 150KB |
| Client Portal, per-route JavaScript | 180KB |
| Client Portal, shared/vendor JavaScript | 220KB |
| `packages/ui/`, full library | 80KB |

A route's total JavaScript cost is its per-route bundle plus its share of the shared/vendor bundle — both are tracked, because a per-route ceiling alone can be gamed by pushing weight into the shared bundle, and a shared-bundle ceiling alone permits an individual route to grow unboundedly as long as the average stays low.

---

## 4. THE ANIMATION FRAME BUDGET

Per Chapter 14 §6's central animation registry, no single view runs more than **three simultaneous animations at the Standard tier or above** — a first-canonical proposal, per this chapter's own status note, standing in for Motion Bible Chapter 17's eventual full density model. This ceiling exists to keep Chapter 14's shared primitive's central registry meaningful: a budget that permits unlimited simultaneous animations provides no actual constraint for that registry to enforce.

---

## 5. WHY PER-SURFACE, NOT UNIFORM

A single, uniform budget across both surfaces would either be too loose for the Marketing Site — where Part VIII's SEO and Master Vision §23's trust-signal reasoning both reward the tightest achievable numbers — or too tight for the Client Portal, where Chapter 2 §4 already establishes that interaction responsiveness within an authenticated session, not anonymous-visitor first-byte time, is the dominant cost being optimized. Per-surface budgets let each surface be held to the standard that actually matches its own architecture, rather than a compromise number that serves neither well.

---

## 6. THE MACHINE-READABLE BUDGET FILE

Sections 2 through 4's values exist as a single, versioned budget configuration file in `packages/config/` per Chapter 7 §4 — never restated informally in a separate document that could drift from the enforced values, per Chapter 3's duplicate-translation prohibition. Any change to a budget value is a change to this one file, reviewed with the same rigor as any other shared configuration change per Chapter 10.

---

## 7. ENFORCEMENT & MEASUREMENT

Every pull request's CI run, per Chapter 56, measures the actual bundle size and, via automated Lighthouse-equivalent testing per Chapter 48, the actual Core Web Vitals metrics for any affected route, comparing them directly against Section 6's budget file. A pull request that regresses any budget fails CI automatically, with the specific violated metric and its measured value named in the failure output — the direct mechanism behind this chapter's own success criterion. Chapter 14's animation-registry enforces Section 4's frame budget at runtime in development, warning immediately when a view would exceed three simultaneous Standard-tier-or-above animations.

---

## 8. BEHAVIORAL RULES

**When a pull request fails a budget check.** The regression is fixed before merge, using Chapter 37's optimization techniques — never waived, and never addressed by loosening the budget file itself without a Chapter 64-governed, explicitly justified revision.

**When a genuinely new surface is added per Chapter 2 §6.** It receives its own row in Section 2 and Section 3's tables, calibrated to its own rendering posture, rather than inheriting an existing surface's numbers by default.

**When production data reveals a budget was set wrong** — too loose to actually protect user experience, or too tight to be achievable without disproportionate engineering cost. It is revised through Chapter 64's governance process, with the revision and its reasoning recorded, rather than quietly adjusted in a single pull request with no visibility.

---

## 9. DO / DON'T

**Do** measure a route's total JavaScript cost as per-route plus its share of shared/vendor, per Section 3.

**Do** treat a budget-file change with the same review rigor as any other shared configuration change.

**Don't** waive a failing budget check to unblock a merge — fix the regression or formally revise the budget through governance.

**Don't** apply a uniform budget across surfaces with structurally different performance profiles.

---

## 10. QUALITY ASSURANCE CHECKLIST

- [ ] Does the pull request's measured Core Web Vitals stay within its surface's Section 2 thresholds?
- [ ] Does the affected route's total JavaScript (per-route plus shared share) stay within Section 3's ceiling?
- [ ] Does any view stay within Section 4's three-simultaneous-Standard-tier-animation budget?
- [ ] Is any budget-file change reviewed with the same rigor as other shared configuration, per Chapter 10?

---

## 11. CROSS REFERENCES

**Within this Constitution:** Chapter 1 (IP2, IP6). Chapter 2 (surface architecture behind Section 5's per-surface reasoning). Chapter 3 (duplicate-translation prohibition, behind Section 6). Chapter 7 §4, Chapter 10 (the config file's home and review process). Chapter 14 §6 (the animation registry enforcing Section 4). Chapter 35 (the authority this chapter's numbers operate under). Chapter 37 (optimization techniques for fixing a violation). Chapter 48 (automated Lighthouse-equivalent testing, running Section 7's checks). Chapter 49 (Quality Gates, giving this chapter's checks blocking authority). Chapter 56 (CI pipeline running Section 7). Chapter 64 (governance process for revising a budget value).

**Within the five documents above this Constitution:** Master Vision §23; Motion Bible Chapter 17 (pending).

---

## 12. FUTURE EXPANSION

**Documented limitations, stated plainly per this chapter's own opening note.** Every numeric value in Sections 2 through 4 is a first-canonical proposal, not yet validated against real production traffic or a completed Motion Bible Chapter 17. Revisiting these numbers against real data is logged as a standing Chapter 66 debt-register item, to be addressed once sufficient production measurement exists rather than left permanently unquestioned.

---

*End of Chapter 36. The next chapter, Asset & Bundle Optimization Standard, specifies the concrete techniques used to actually hit these budgets.*
