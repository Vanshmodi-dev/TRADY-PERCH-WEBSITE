# CHAPTER 48 — ACCESSIBILITY & PERFORMANCE TEST AUTOMATION

**Trady Perch Product Implementation Constitution · Part X: Testing & Quality Assurance**

**Inherited From:** Master Vision Document §22–23 (Accessibility & Performance Standards); Design System Bible Chapter 53 (Accessibility Standards Deep Specification), Chapter 62 (Visual Regression & Consistency Testing). Chapter 18 (Accessibility Implementation Standard), Chapter 36 (Performance Budgets), and Chapter 47 (Testing Strategy & Pyramid) are this chapter's direct premises.

---

## 1. INTRODUCTION

Chapter 18 specified accessibility's automated Layer 2. Chapter 36 specified performance's numeric budgets. Chapter 47 specified the four-layer testing pyramid those and every other standard run inside. This chapter is where all three meet: the specific automated suites — accessibility, performance, and visual regression — wired directly into Chapter 47's pyramid, with a visible, blocking, per-check status on every pull request, per this chapter's own success criterion.

---

## 2. ACCESSIBILITY AUTOMATION, MAPPED TO THE PYRAMID

Chapter 18 §2's Layer 1 (static analysis) runs at commit time, outside Chapter 47's pyramid proper — it is a pre-condition, not a pyramid layer. Chapter 18 §2's Layer 2 (automated behavioral testing) maps onto Chapter 47's pyramid at two points: a single component's accessibility properties (accessible name, contrast, ARIA correctness per Chapter 18 §4) are checked at the **unit layer**, run alongside Chapter 12 §6's component test floor; a full page's accessibility properties (heading hierarchy, focus order across multiple components, landmark structure) are checked at the **integration layer**, run alongside Chapter 47 §3's boundary-cooperation tests, because heading hierarchy and focus order are properties that only exist once multiple components are actually assembled together.

---

## 3. PERFORMANCE AUTOMATION, MAPPED TO THE PYRAMID

Chapter 36's bundle-size ceilings are checked at build time, against every pull request, independent of Chapter 47's runtime-test layers — a static measurement, not a pyramid layer, mirroring Chapter 18's Layer 1 structurally. Chapter 36's Core Web Vitals thresholds are checked via automated Lighthouse-equivalent testing at the **end-to-end layer**, per Chapter 47 §2, because a genuine Largest Contentful Paint or Interaction to Next Paint measurement requires a real or near-real rendered environment, not an isolated unit or integration context — the same reasoning that places end-to-end tests at the top of Chapter 47's pyramid applies identically here.

---

## 4. VISUAL REGRESSION, MAPPED TO THE PYRAMID

Design System Bible Chapter 62's visual regression suite is Chapter 47 §2's fourth pyramid layer directly — run per component (mirroring the unit layer's granularity) and per full page (mirroring the integration layer's granularity), at every breakpoint Chapter 15 §2 defines, per Chapter 15 §6's own requirement. A component's visual regression baseline is updated only through an explicit, reviewed approval — never automatically accepted merely because a build ran, which would silently launder an unintended visual regression into the new baseline.

---

## 5. THE PER-CHECK VISIBILITY REQUIREMENT

Every pull request displays a distinct, individually visible status for accessibility (Section 2), performance (Section 3), and visual regression (Section 4) — never collapsed into a single, undifferentiated "checks passed" status that would hide which specific category failed. This is the direct mechanism behind this chapter's own success criterion: a reviewer or an AI agent per Chapter 32's self-review sees immediately which of the three failed, without needing to dig into CI logs to determine which standard was actually violated.

---

## 6. ENFORCEMENT & MEASUREMENT

All three suites are required, blocking status checks per Chapter 56's CI pipeline and Chapter 49's quality-gate sequence — none is advisory-only or skippable, mirroring Chapter 18 §5 and Chapter 36 §7's individual blocking-gate requirements, now unified under this chapter's shared visibility and wiring standard. A pull request cannot merge with any of the three showing a failing status, per Chapter 49, and per Chapter 31's G4 guardrail, no agent may bypass this requirement regardless of task urgency.

---

## 7. BEHAVIORAL RULES

**When a pull request's accessibility, performance, or visual regression check fails.** It is fixed before merge, using the specific chapter governing that failure (Chapter 18, Chapter 36–37, or Design System Bible Chapter 62 respectively) — never suppressed, per Chapter 31's G2 guardrail extended to these three suites specifically.

**When a visual regression baseline genuinely needs updating** (an intentional design change, not a bug). It is updated through the explicit, reviewed approval process from Section 4 — never accepted automatically as part of an unrelated change's build.

**When all three checks pass but a reviewer still has a concern.** Chapter 51's human review layer remains available for exactly this — Section 6's automated checks are a floor, not a ceiling, and passing them does not preclude a reviewer from raising a concern these specific suites weren't designed to catch.

---

## 8. DO / DON'T

**Do** map every accessibility and performance check to its correct Chapter 47 pyramid layer, per Sections 2 and 3.

**Do** display each of the three suites' status individually and visibly on every pull request.

**Don't** collapse accessibility, performance, and visual regression status into a single undifferentiated check.

**Don't** auto-accept a visual regression baseline update without explicit, reviewed approval.

---

## 9. QUALITY ASSURANCE CHECKLIST

- [ ] Does the pull request show individually visible status for accessibility, performance, and visual regression?
- [ ] Are accessibility checks correctly split between unit-layer (single component) and integration-layer (full page) per Section 2?
- [ ] Are Core Web Vitals measured at the end-to-end layer, per Section 3, against Chapter 36's thresholds?
- [ ] Was any visual regression baseline update explicitly, individually reviewed and approved, per Section 4?
- [ ] Do all three checks hold blocking, non-bypassable authority per Chapter 49 and Chapter 31's G4?

---

## 10. CROSS REFERENCES

**Within this Constitution:** Chapter 12 §6 (unit-layer component tests, alongside Section 2's accessibility checks). Chapter 15 §2, §6 (breakpoints Section 4's visual regression runs against). Chapter 18 (accessibility standard this chapter automates). Chapter 31 (G2, G4 guardrails applied to Section 7). Chapter 32 (self-review consuming Section 5's visibility). Chapter 36–37 (performance budgets and techniques behind Section 3). Chapter 47 (the pyramid this entire chapter maps onto). Chapter 49 (quality gates giving Section 6 blocking authority). Chapter 51 (human review, per Section 7's third rule). Chapter 56 (CI pipeline running all three suites).

**Within the five documents above this Constitution:** Master Vision §22–23; Design System Bible Chapter 53, Chapter 62.

---

## 11. FUTURE EXPANSION

**Documented limitations.** Section 3's Lighthouse-equivalent end-to-end performance testing is inherently slower than a unit or integration check; Chapter 47 §6's selective-triggering model applies to this chapter's suites as well, running full performance testing only against changes likely to affect it, tracked for accuracy per Chapter 65 rather than assumed perfectly calibrated from the start.

---

*End of Chapter 48. The next chapter, Quality Gates Standard, consolidates this chapter's checks and every other Part's individual checks into one named, ordered gate sequence.*
