# CHAPTER 67 — CONTRIBUTION GUIDELINES

**Trady Perch Design System Bible · Volume VI: Quality, Governance & Evolution**

**Inherited From:** Design System Bible Chapter 1 (Section 4's derivation test), Chapter 17 (anatomy standard), Chapter 61 (QA checklist), Chapter 65 (approval tiers), Chapter 66 (lifecycle).

---

## 1. INTRODUCTION

A Bible with no contribution path either ossifies (nobody dares propose anything against seventy chapters of established precedent) or fragments (everyone works around it locally instead). This chapter is the middle path — a practical, step-by-step process for proposing a change, from first idea to merged documentation.

This chapter depends on nearly every governance chapter that precedes it in this Volume. It is depended on by Chapter 69 (Design Debt Register), which is partly populated by contributions that were reasonable shortcuts at the time but never completed this chapter's full process.

---

## 2. PHILOSOPHY

The rejected alternative is an informal contribution process — propose a change however seems natural, get informal buy-in, ship it. This was rejected because informality is exactly how the small, individually-reasonable drift Chapter 62 exists to catch actually enters the system in the first place: a formal, lightweight process is cheap insurance against a much more expensive later cleanup.

---

## 3. CORE PRINCIPLES

### Cg-1 — Every Contribution Documents Its Derivation Test Before Any Visual Work

**Purpose.** A contribution proposal states, in writing, its answer to Chapter 1's derivation test (which principles apply, how they were satisfied) before any mockup, prototype, or visual exploration begins.

**Reasoning.** Descends from Principle 1: documenting reasoning after the fact, once a preferred visual direction already exists, risks the reasoning being shaped to justify a conclusion already reached rather than genuinely deriving one.

**When it applies.** To every new contribution. **When it does not apply.** No exception.

### Cg-2 — Review Checks Chapter 17's Anatomy Standard Before Visual Polish

**PurPose.** A contribution's review process checks its anatomy, variant axes, and state coverage (Chapter 17) before evaluating its visual refinement — structural correctness is reviewed first, aesthetic quality second.

**Reasoning.** Descends from Principle 2: a beautifully polished component with an incomplete state-coverage table is a bigger problem than a structurally complete component with rough visual polish, since the latter is a finishing task and the former is a foundational gap.

**When it applies.** To every contribution review. **When it does not apply.** No exception.

### Cg-3 — Rejected Proposals Are Recorded, Never Silently Discarded

**Purpose.** Every rejected contribution is recorded with its reasoning — what was proposed, why it was rejected, which principle it failed — rather than simply disappearing from any record once declined.

**Reasoning.** Direct extension of Chapter 68's Anti-Pattern Library reasoning (institutional memory prevents re-litigating settled questions) applied at the individual-proposal level, before a pattern of rejections even accumulates into a formal anti-pattern entry.

**When it applies.** To every rejected proposal. **When it does not apply.** No exception.

---

## 4. COMPLETE DESIGN SPECIFICATION

**Contribution steps, in order:** (1) Identify the specific gap or need. (2) Run Chapter 1's derivation test, documenting the result (Cg-1). (3) Classify the proposal's tier per Chapter 65's Gov-4. (4) Draft the proposal following Chapter 17's anatomy standard (Cg-2), before visual exploration. (5) Submit for review at the appropriate tier. (6) On approval, the component enters Chapter 66's Proposed state. (7) On rejection, record the reasoning per Cg-3.

---

## 5. MEASUREMENTS

Contribution steps: 7, in fixed order.

---

## 6. BEHAVIORAL RULES

**Before any visual exploration.** Complete steps 1–3 first, per Cg-1. **Upon rejection.** Complete step 7's recording requirement before considering the proposal closed.

---

## 7–10. MOTION / ACCESSIBILITY / RESPONSIVE / AI

Not applicable — this chapter governs contribution process.

---

## 11. DO / 12. DON'T

**Do:** Drafting a new component proposal's derivation-test answer and anatomy structure before opening a design tool to explore its visual treatment. **Don't:** Building a polished, visually complete mockup first, then retroactively writing a derivation-test justification to match — inverts Cg-1's required order and risks motivated reasoning.

---

## 13. ANTI-PATTERNS

**Retroactive justification.** Building the visual solution first, then writing the principle-based reasoning afterward to support it. This is detected by checking whether a proposal's documented reasoning predates its first visual exploration, and fixed by requiring the derivation test's documentation as a formal, timestamped first step.

---

## 14. QUALITY ASSURANCE CHECKLIST

- [ ] Was the derivation test documented before any visual exploration began? *(Cg-1)*
- [ ] Was anatomy and state coverage reviewed before visual polish? *(Cg-2)*
- [ ] If rejected, was the reasoning recorded rather than silently discarded? *(Cg-3)*

---

## 15. CROSS REFERENCES

Chapter 1 (Section 4, derivation test). Chapter 17 (anatomy standard). Chapter 61 (QA checklist). Chapter 65 (approval tiers). Chapter 66 (lifecycle entry point). Chapter 68 (anti-pattern institutional memory, parallel). Chapter 69 (design debt, direct dependent).

---

## 16. FUTURE EXPANSION

No open questions currently identified.

---

*End of Chapter 67. The next chapter, per the authoring sequence, is the Anti-Pattern Library — deliberately scheduled near the end so it can draw on real mistakes rather than only hypothetical ones.*
