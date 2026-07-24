# CHAPTER 62 — VISUAL REGRESSION & CONSISTENCY TESTING PHILOSOPHY

**Trady Perch Design System Bible · Volume VI: Quality, Governance & Evolution**

**Inherited From:** Master Vision §3.2 (consistency compounds trust). Design System Bible Chapter 1 (P7), Chapter 2 (token architecture), Chapter 61 (Design QA Standards).

---

## 1. INTRODUCTION

Consistency (Master Vision §3.2) compounds trust specifically because it is *maintained*, not because it is achieved once. This chapter names the ongoing discipline required to keep a system from degrading through a hundred individually invisible small edits — a button that quietly gained three pixels of padding, a color that drifted half a shade over six months of unrelated changes.

This chapter depends on Chapter 2's token architecture directly (drift is measured against documented token values) and is depended on by Chapter 64 (Versioning & Release Philosophy).

---

## 2. PHILOSOPHY

The rejected alternative is trusting that Chapter 61's QA checklist, run at each individual ship decision, is sufficient to prevent drift over time. This was rejected because QA at the point of a single change cannot catch *cumulative* drift across many separate, individually-approved changes — a padding value nudged by one pixel in five different, independently-reviewed changes can each pass Chapter 61's checklist while collectively producing a a five-pixel drift from the documented value that no single review ever caught.

---

## 3. CORE PRINCIPLES

### Vr-1 — Consistency Is Maintained Continuously, Never Assumed Permanent Once Achieved

**Purpose.** Every shipped component is re-verified against its documented token values on an ongoing basis, not only at its initial ship decision.

**Reasoning.** Descends from Principle 7 and Master Vision §3.2 directly: a system's consistency is a property of its current state, not a historical fact about how carefully it was originally built — ongoing verification is what keeps it true over time.

**When it applies.** To every shipped component, continuously. **When it does not apply.** No exception.

### Vr-2 — Any Deviation From a Documented Value Is a Regression, However Small

**Purpose.** A component rendering even one pixel off its documented spacing value, or one shade off its documented color, is treated as a genuine regression requiring correction — never dismissed as "close enough" because the deviation is visually subtle.

**Reasoning.** Descends from Chapter 1's Principle 1: a documented value that is not actually enforced is not really documented, it is aspirational — treating small deviations as real regressions is what keeps the documentation meaningful rather than decorative.

**When it applies.** To every measurable design property. **When it does not apply.** No exception.

### Vr-3 — Testing Cadence Follows Change Frequency, Not Only a Fixed Calendar

**Purpose.** Components under active, frequent revision are checked for regression more often than stable, rarely-touched components — cadence is risk-driven, not a uniform fixed schedule applied identically to everything.

**Reasoning.** Descends from Principle 7 applied to testing effort itself: a fixed calendar schedule wastes effort re-checking stable components as often as volatile ones, when the actual risk of drift correlates with change frequency, not time elapsed.

**When it applies.** To the scheduling of ongoing consistency checks. **When it does not apply.** No exception.

---

## 4. COMPLETE DESIGN SPECIFICATION

**Baseline capture:** every component's documented token values (per its own chapter's Section 4) serve as the baseline a regression check compares against. **Deviation threshold:** zero tolerance for token-value deviation (Vr-2) — this is a binary pass/fail check, not a graded severity scale, since any deviation indicates an untracked change worth investigating regardless of visual magnitude. **Cadence:** components changed within the last release cycle checked every cycle; stable components checked on a longer, but still recurring, interval.

---

## 5. MEASUREMENTS

Deviation tolerance: 0 (Vr-2). Cadence: risk-driven (Vr-3), not fixed.

---

## 6. BEHAVIORAL RULES

**On any detected deviation.** Treat as a genuine regression per Vr-2; investigate whether it was an undocumented intentional change (requiring Chapter 2's formal proposal process retroactively) or a genuine accidental drift (requiring correction back to the documented value).

---

## 7–10. MOTION / ACCESSIBILITY / RESPONSIVE / AI

Not independently specified — this chapter's testing philosophy applies uniformly across every category Chapters 1–60 already specify; it introduces no new category-specific content of its own.

---

## 11. DO / 12. DON'T

**Do:** Discovering a Button's padding has drifted 2px from its documented Chapter 5 value across several unrelated commits, and correcting it back to the documented value even though the visual difference is barely perceptible. **Don't:** Dismissing the same discovery as "not worth fixing" because it's visually subtle — a direct Vr-2 violation that, left unaddressed, compounds with the next similarly-dismissed small drift.

---

## 13. ANTI-PATTERNS

**Drift tolerance.** Accepting small, individually-subtle deviations from documented values because each one, considered alone, seems too minor to justify the correction effort. This is detected by systematic baseline comparison rather than visual inspection alone, and fixed by correcting every detected deviation regardless of its individual magnitude.

---

## 14. QUALITY ASSURANCE CHECKLIST

- [ ] Is this component's current rendering being checked against its documented baseline continuously, not only at initial ship? *(Vr-1)*
- [ ] Is any detected deviation, however small, treated as a genuine regression? *(Vr-2)*
- [ ] Does testing cadence reflect this component's actual change frequency? *(Vr-3)*

---

## 15. CROSS REFERENCES

Chapter 1 (P1, P7). Chapter 2 (token baseline). Chapter 61 (Design QA, point-in-time complement to this chapter's ongoing discipline). Chapter 64 (Versioning, direct dependent). Master Vision §3.2.

---

## 16. FUTURE EXPANSION

The specific cadence intervals in Section 4 are qualitative, pending real release-frequency data once the system is in active production use.

---

*End of Chapter 62. The next chapter, per the authoring sequence, is Versioning & Release Philosophy.*
