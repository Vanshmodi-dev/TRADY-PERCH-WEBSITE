# CHAPTER 61 — DESIGN QA STANDARDS & CHECKLISTS

**Trady Perch Design System Bible · Volume VI: Quality, Governance & Evolution**

**Inherited From:** Effectively all of Volumes I through V. Design System Bible Chapter 1 (P1–P8, in full — this chapter's Section 14 checklist directly extends Chapter 1's own).

---

## 1. INTRODUCTION

A 74-chapter Bible is not something a designer re-reads before every ship decision. This chapter is the compressed, actionable distillation that makes the rest of the Bible enforceable in daily practice — a checklist a reviewer can actually run, synthesized from every prior chapter's own Section 14, rather than a fresh invention.

This chapter depends on every chapter it synthesizes and is depended on by Chapter 62 (Visual Regression Testing) and Chapter 66 (Component Lifecycle's approval gates).

---

## 2. PHILOSOPHY

The rejected alternative is trusting that a reviewer familiar with the whole Bible will naturally check everything relevant during an ordinary review, without a consolidated tool. This was rejected because even a reviewer who has read every chapter cannot reliably hold seventy chapters' worth of specific checklist items in working memory during a single review pass — synthesis here is not a convenience, it is what makes thorough review actually achievable under real time constraints.

---

## 3. CORE PRINCIPLES

### Qa-1 — The Master Checklist Synthesizes; It Never Replaces Reading the Source Chapter

**Purpose.** This chapter's checklist (Section 4) is a first-pass screening tool — passing every item here does not certify full compliance with every nuance in the source chapters; a genuinely novel or high-stakes decision still requires reading the specific source chapter directly.

**Reasoning.** Descends from Chapter 41's Mi-1 citation discipline: a compressed checklist item ("does color pass contrast?") necessarily loses the specific reasoning and edge cases Chapter 3's full text provides — this principle prevents the checklist from being mistaken for a substitute for that depth.

**When it applies.** To every use of this chapter's checklist. **When it does not apply.** No exception.

### Qa-2 — Every Ship Decision Runs Chapter 1's Derivation Test First, Then This Checklist

**Purpose.** Chapter 1's own Section 14 checklist (the eight-principle check) is applied first, as the foundational pass; this chapter's more granular, component-and-category-specific checklist is applied second, as the detailed pass.

**Reasoning.** Descends from Chapter 1's own structural authority as the Tier 1 source every other principle in this Bible descends from — a review that skips straight to granular component checks without first confirming the foundational principles are satisfied risks passing a decision that is locally correct but globally wrong.

**When it applies.** To every design review. **When it does not apply.** No exception.

### Qa-3 — A Failed Item Blocks Ship; It Never Becomes an Unreviewed "Known Issue"

**Purpose.** Any checklist item that fails during review blocks shipping until resolved — it is never quietly logged as a "known issue" and shipped anyway without an explicit, documented exception decision (Chapter 65's governance process).

**Reasoning.** Descends from Principle 7 and Chapter 2's T-5 deprecation discipline applied in reverse: an unreviewed "known issue" is design debt (Chapter 69) accumulating silently, exactly the Premature Invention/shortcut pattern this Bible's anti-pattern catalogs warn against throughout.

**When it applies.** To every failed checklist item. **When it does not apply.** To an item explicitly exempted through Chapter 65's governance process, which is a deliberate, documented decision — categorically different from a silently-shipped known issue.

---

## 4. COMPLETE DESIGN SPECIFICATION — THE MASTER CHECKLIST

**Pass 1 — Foundational (Chapter 1, Section 14):** all eight items, run first.

**Pass 2 — Token & Visual:** Does every color trace to Chapter 3's palette? Does every spacing value trace to Chapter 5's scale? Does every type size match Chapter 4's eight steps? Does every corner radius match an established value (Chapter 18/19/27's populated scale)?

**Pass 3 — Component:** Does the component follow Chapter 17's anatomy standard? Does its state coverage table address all eight canonical states? Do its Tier 3 principles cite Tier 1 ancestry?

**Pass 4 — Motion:** Does every animation use one of Chapter 15's five tiers? Does it stay within Chapter 40's six permitted properties and three-element ceiling? Does it have a diegetic justification?

**Pass 5 — Accessibility:** Does the component satisfy its mapped criteria in Chapter 53? Are touch targets at or above 44px (Chapter 43)? Is focus visible and untrapped except in true modals (Chapter 42)?

**Pass 6 — Content:** Does copy pass Chapter 56's skeptical-reader test? Do error messages satisfy Chapter 47's three-part structure? Are numerals formatted per Chapter 57?

**Pass 7 — Platform:** Was Mobile verified first, per Chapter 49's Mb-1? Does the component work identically well at Tablet (Chapter 50) and Desktop (Chapter 51)?

---

## 5. MEASUREMENTS

Total checklist passes: 7, plus Chapter 1's own foundational pass, run first per Qa-2 — 8 total passes.

---

## 6. BEHAVIORAL RULES

**Before any ship decision.** Run all 8 passes in order. **Upon any failure.** Block ship per Qa-3, escalating to Chapter 65 only for a genuine, deliberate exception request.

---

## 7–10. MOTION / ACCESSIBILITY / RESPONSIVE / AI

Not independently specified — this chapter's own checklist (Section 4, Passes 4, 5, 7) already indexes these concerns across every source chapter; a dedicated section here would duplicate Section 4 rather than add new content.

---

## 11. DO / 12. DON'T

**Do:** Running all 8 passes on a new Dialog variant before shipping, catching a missing focus-trap release (Pass 5) that would otherwise have shipped unnoticed. **Don't:** Shipping a component because "it looks right" without running the checklist, then logging any later-discovered issue as a "known issue" to fix eventually — a direct Qa-3 violation.

---

## 13. ANTI-PATTERNS

**Checklist theater.** Running through the checklist quickly without genuinely verifying each item, treating it as a formality to complete rather than a real check. This is detected by spot-auditing shipped components against the specific items claimed passed, and fixed by re-running the check with genuine rigor.

---

## 14. QUALITY ASSURANCE CHECKLIST

*(This chapter's own Section 4 is its checklist — recursively, this chapter should itself be checked against Qa-1 through Qa-3 before being considered complete.)*

- [ ] Does this chapter's checklist cite source chapters rather than introducing new, unfounded criteria? *(Qa-1)*
- [ ] Is Chapter 1's foundational pass always run before this chapter's granular passes? *(Qa-2)*
- [ ] Does every failed item block ship absent an explicit governance exception? *(Qa-3)*

---

## 15. CROSS REFERENCES

Every chapter cited in Section 4. Chapter 1 (P1–P8, Section 14). Chapter 41 (Mi-1 citation discipline). Chapter 62 (Visual Regression, direct consumer). Chapter 65 (governance exception process). Chapter 66 (lifecycle approval gates). Chapter 69 (design debt).

---

## 16. FUTURE EXPANSION

This checklist should be updated whenever a new chapter is added to the Bible or an existing chapter's Section 14 changes — treated as a required step of any such revision, not a separate follow-up task.

---

*End of Chapter 61. The next chapter, per the authoring sequence, is Visual Regression & Consistency Testing Philosophy.*
