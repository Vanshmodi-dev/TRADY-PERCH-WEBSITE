# CHAPTER 37 — ASSET & BUNDLE OPTIMIZATION STANDARD

**Trady Perch Product Implementation Constitution · Part VII: Performance Engineering**

**Inherited From:** Design System Bible Chapter 12 (Photography System — the source-asset quality floor this chapter's compression pipeline must never compromise). Chapter 36 (Performance Budgets) is this chapter's direct premise.

---

## 1. INTRODUCTION

Chapter 36 fixed the numeric ceilings. This chapter is the technique catalog for actually hitting them: how an image is compressed without falling below Design System Bible Chapter 12's quality floor, where code-splitting boundaries fall, and how fonts load without blocking above-the-fold content, per Design System Bible Pf-3.

---

## 2. THE IMAGE PIPELINE

Every image asset passes through an automated compression pipeline before it can be committed — never hand-optimized ad hoc per image, which per Chapter 3's duplicate-effort risk would produce inconsistent results depending on who touched which asset. The pipeline generates modern, size-appropriate formats and multiple resolutions per Design System Bible Pf-1's "smallest size that still satisfies its quality bar" standard, with the quality bar itself set by Design System Bible Chapter 12's photography standard — this chapter's compression never crosses below that floor merely to hit a smaller file size, because Chapter 1's IP6 treats a brand-defined quality floor as non-negotiable in the same way it treats accessibility and security floors.

An image with no corresponding pipeline-generated output — a raw, uncompressed file committed directly — fails the check in Section 6.

---

## 3. CODE-SPLITTING BOUNDARIES

Every route, per Chapter 7's app structure, is its own code-splitting boundary by default — a route's JavaScript is not bundled with another route's unless both are genuinely needed simultaneously. Within a route, a feature per Chapter 8's colocation standard is a secondary splitting boundary for any component not needed on initial render — a modal, a rarely-used settings panel — loaded on demand rather than included in the route's initial bundle. This directly serves Chapter 36 §3's per-route ceiling: a route's initial bundle contains only what Design System Bible Pf-3 requires for above-the-fold content, with everything else deferred.

---

## 4. FONT LOADING

Per Design System Bible Pf-3, above-the-fold content never waits on below-the-fold assets — this chapter extends that rule to font loading specifically, historically one of the most common causes of either a layout shift (violating Chapter 36 §2's Cumulative Layout Shift budget) or a delayed first paint. Fonts used for above-the-fold text are preloaded and subset to the character set actually needed; a font-loading strategy that blocks first paint on a full font-family download is not permitted. A fallback font with matching metrics is specified for every custom font, so that the inevitable brief window before a custom font loads does not itself cause a layout shift when the swap occurs.

---

## 5. THIRD-PARTY SCRIPT DISCIPLINE

Any third-party script — an analytics tag, a Chapter 23 Class B integration's client-side snippet where one is unavoidable — is loaded in a way that cannot block or delay above-the-fold rendering, per Pf-3 extended to third-party code specifically. A third-party script's contribution to Chapter 36 §3's bundle budget is measured and counted exactly as first-party code is; no exception exists for "it's just a small analytics snippet," because Chapter 36's budget is a measured total, not a total that quietly excludes whichever category of code is currently most convenient to ignore.

---

## 6. ENFORCEMENT & MEASUREMENT

An automated check, run in CI per Chapter 56, verifies every image asset has passed Section 2's pipeline (rejecting any raw, unpiped image), verifies every font-loading declaration matches Section 4's preload-and-subset pattern, and verifies no route's initial bundle includes a component Section 3 designates as deferrable. This is the direct mechanism behind this chapter's own success criterion — every image and font asset passes an automated optimization check before merge, with no manual, case-by-case judgment required to catch a violation.

---

## 7. BEHAVIORAL RULES

**When adding any new image asset.** It is run through Section 2's pipeline before being committed — never committed raw with an intention to optimize it later, which per Chapter 5's F2 risks becoming a permanent, undocumented exception.

**When adding a new route or a large, conditionally-shown component.** Section 3's splitting boundaries are applied by default — the component is deferred unless a specific, stated reason requires it in the initial bundle.

**When integrating a new third-party script.** Its bundle contribution is measured against Chapter 36 §3 before integration, per Section 5, exactly as any first-party code addition would be.

---

## 8. DO / DON'T

**Do** run every image through the automated compression pipeline, at the quality floor Design System Bible Chapter 12 sets, never below it.

**Do** preload and subset fonts used above the fold, with a metrics-matched fallback specified for every custom font.

**Don't** commit a raw, unpiped image asset, even temporarily.

**Don't** exempt a third-party script from Chapter 36's bundle budget on the reasoning that it's small or important.

---

## 9. ANTI-PATTERNS

**The quality-floor-crossing compression.** Under pressure to hit Chapter 36's bundle budget, an image is compressed more aggressively than Design System Bible Chapter 12's quality floor permits, trading a non-negotiable floor for a numeric target this chapter's own logic treats as equally non-negotiable — the two floors are not supposed to be traded against each other. This is dangerous because it resolves one Chapter 1 IP6 violation by committing another, rather than genuinely optimizing. It is detected by Section 6's pipeline enforcing Design System Bible Chapter 12's quality floor as a hard constraint the compression step cannot cross, regardless of the size target. It is fixed by addressing the budget pressure through Section 3's splitting or Section 5's third-party discipline instead of degrading image quality below its floor.

---

## 10. QUALITY ASSURANCE CHECKLIST

- [ ] Has every image asset passed Section 2's automated pipeline, at or above Design System Bible Chapter 12's quality floor?
- [ ] Does every route apply Section 3's code-splitting boundaries by default, deferring non-critical components?
- [ ] Does font loading follow Section 4's preload-and-subset pattern with a metrics-matched fallback?
- [ ] Is every third-party script's bundle contribution measured against Chapter 36 §3, with no informal exemption?

---

## 11. CROSS REFERENCES

**Within this Constitution:** Chapter 1 (IP6). Chapter 3 (duplicate-effort risk behind Section 2). Chapter 7–8 (splitting boundaries in Section 3). Chapter 23 (Class B integrations, relevant to Section 5). Chapter 36 (the budgets this chapter's techniques serve). Chapter 56 (CI pipeline running Section 6's checks).

**Within the five documents above this Constitution:** Design System Bible Chapter 12, and Pf-1, Pf-3 from Chapter 55.

---

## 12. FUTURE EXPANSION

**Documented limitations.** Section 2's compression pipeline's specific format and quality targets are implementation details of whichever tooling Chapter 10 pins; this chapter fixes the requirement and the quality-floor constraint, not the literal tool, consistent with this Part's general framework-agnostic posture.

---

*End of Chapter 37. The next chapter, Rendering Strategy Standard, specifies the decision framework for choosing how a route actually renders in the first place.*
