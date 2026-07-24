# CHAPTER 60 — DOCUMENTATION PHILOSOPHY

**Trady Perch Product Implementation Constitution · Part XIII: Documentation Standards**

**Inherited From:** Design System Bible Chapter 59 (Documentation & Help Content Design) — a structural parallel for user-facing documentation, extended here to engineering documentation. Chapter 1 (Implementation Principles) is this chapter's direct premise.

---

## 1. INTRODUCTION

A codebase over-documented with stale, redundant comments is as much a hazard as one under-documented — a stale comment actively misleads, where no comment merely requires reading the code itself. This chapter extends Chapter 1's IP3 restraint principle to documentation specifically: something is documented because it explains a genuinely non-obvious *why*, never because documentation, in the abstract, feels like a virtuous default.

---

## 2. THE WHY-VERSUS-WHAT TEST

Per this chapter's own success criterion, any proposed piece of documentation is evaluated against one question: does it explain a non-obvious *why* — a hidden constraint, a rejected alternative, a subtle invariant — or does it restate an obvious *what* that well-named code, per this Constitution's own system-level standard against unnecessary comments, already communicates on its own? Documentation that fails this test, restating what the code already says in plainer terms, is not neutral — it is a liability the moment the code changes and the restatement doesn't change with it, becoming actively wrong rather than merely redundant.

---

## 3. WHY THIS APPLIES DIFFERENTLY ACROSS DOCUMENTATION TYPES

A code comment (Chapter 61) is held to the why-versus-what test most strictly, because it sits directly beside the code it could easily just restate. An Architecture Decision Record (Chapter 62) is, by its very nature, entirely "why" — it exists specifically to record a decision's reasoning, so the test is nearly always satisfied by its intended purpose. Onboarding documentation (Chapter 63) sits in between — it legitimately restates some "what" for a reader who genuinely doesn't yet know the codebase's shape, but is still checked against Section 2 for content that has drifted into explaining what well-organized code (per Chapter 7–8) should already make self-evident to someone reading it directly.

---

## 4. THE STALENESS RISK

Per Chapter 1's IP5, documentation that goes stale is worse than absent documentation, because it actively misleads a reader — human or AI — who trusts it over the current, actual code. This chapter's restraint principle is partly a direct hedge against this risk: less documentation, held to a stricter standard, is less documentation that can go stale, and what remains is disproportionately the kind (ADRs, recorded historical reasoning) that doesn't need to track a moving target the way an inline comment describing current behavior does.

---

## 5. ENFORCEMENT & MEASUREMENT

Section 2's why-versus-what test is applied at code review per Chapter 54's checklist — a reviewer flags a comment or documentation addition that merely restates adjacent code, per Chapter 61's own specific lint-rule enforcement of this exact test. This chapter's own success criterion is satisfied directly: any documentation proposal can be justified or rejected using Section 2 alone, without a separate, unstated aesthetic judgment about whether documentation "seems like enough."

---

## 6. BEHAVIORAL RULES

**Before writing any comment or documentation.** Section 2's test is applied explicitly — if the content would be equally clear from well-named code and structure alone, it is not written.

**When existing documentation is found to have gone stale.** It is corrected or removed in the same change that touches the code it describes, per Chapter 1's IP5 — never left as a known, tolerated inaccuracy.

**When documentation feels obligatory rather than genuinely useful** (writing a comment because "this function should probably have one"). That feeling is treated as a signal to apply Section 2 more rigorously, not as a reason to write something regardless of whether it passes the test.

---

## 7. DO / DON'T

**Do** write documentation that explains a hidden constraint, a rejected alternative, or a non-obvious invariant.

**Do** correct or remove stale documentation in the same change that touches the code it describes.

**Don't** write a comment or document that merely restates what well-named code already communicates.

**Don't** document something because it feels like a best practice in the abstract, without checking it against Section 2 first.

---

## 8. QUALITY ASSURANCE CHECKLIST

- [ ] Does this documentation explain a non-obvious *why*, rather than restating an obvious *what*?
- [ ] Would this content be equally clear from well-named code and structure alone — and if so, was it still written anyway?
- [ ] Is any documentation touched by this change updated to match the change, with no staleness left behind?

---

## 9. CROSS REFERENCES

**Within this Constitution:** Chapter 1 (IP3, IP5). Chapter 54 (review checklist applying Section 5). Chapter 61 (Code-Level Documentation Standard, the strictest application of Section 2). Chapter 62 (ADR Standard, the "why"-native documentation type). Chapter 63 (Onboarding Documentation, the intermediate case per Section 3).

**Within the five documents above this Constitution:** Design System Bible Chapter 59.

---

## 10. FUTURE EXPANSION

**Documented limitations.** Section 2's test remains a judgment call at the margins — a constraint that feels non-obvious to a junior contributor might feel obvious to a senior one. This chapter accepts that calibration gap rather than attempting to resolve it with a false precision the underlying judgment doesn't actually have.

---

*End of Chapter 60. The next chapter, Code-Level Documentation Standard, applies this philosophy's strictest form to comments, README files, and type signatures.*
