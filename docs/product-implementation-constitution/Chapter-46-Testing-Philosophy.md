# CHAPTER 46 — TESTING PHILOSOPHY

**Trady Perch Product Implementation Constitution · Part X: Testing & Quality Assurance**

**Inherited From:** Design System Bible Chapter 61 (Design QA Standards & Checklists — Qa-1 "The Master Checklist Synthesizes; It Never Replaces Reading the Source Chapter," Qa-2 "Every Ship Decision Runs Chapter 1's Derivation Test First," Qa-3 "A Failed Item Blocks Ship"). Chapter 1 (Implementation Principles) is this chapter's direct premise.

---

## 1. INTRODUCTION

A test suite can exist for two different reasons that are easy to conflate: to give confidence that code can be changed safely, or to satisfy a coverage-percentage target. This chapter states, explicitly, that this Constitution cares about the first and treats the second as, at best, a loose proxy for it — a proxy that can be gamed by writing tests that execute code without actually verifying its behavior, producing a high coverage number and zero additional confidence.

---

## 2. THE CONFIDENCE TEST

A proposed test is worth writing if, and only if, it would catch a plausible, realistic regression that isn't already caught by an existing test — this is the single criterion this chapter's own success criterion depends on. A test that merely exercises a line of code without asserting anything meaningful about its behavior, or that duplicates exactly what another test already verifies, fails this criterion regardless of its contribution to a coverage percentage.

---

## 3. TESTING THE PRODUCT, NOT THE FRAMEWORK

A test that verifies a third-party framework or library behaves as that framework's own documentation and test suite already guarantee — that a state-management library correctly updates state, that a routing library correctly matches a URL pattern — is testing the framework, not this product, and is not worth writing. This codebase's own tests exist to verify *this product's* logic: the specific business rules, the specific integration points, the specific edge cases unique to what Trady Perch actually does. The distinction is checkable by asking, for any proposed test, "would this test fail if the underlying framework had a bug, or only if our own code has one?" — a test that could only ever fail due to a framework bug belongs in that framework's own test suite, not this one.

---

## 4. THE RELATIONSHIP TO THIS CONSTITUTION'S OTHER CHAPTERS

Several chapters already require specific tests as a condition of completeness — Chapter 12 §6's minimum component-test floor, Chapter 25 §7's mandatory cache-invalidation assertion, Chapter 44 §8's mandatory deletion-mechanism test. This chapter's philosophy is what makes those specific requirements coherent rather than arbitrary: each one names a plausible, realistic regression (a component shipping with a broken state, a mutation leaving stale data visible, a deletion request silently failing to reach every store) that Section 2's confidence test says is worth guarding against specifically, not a generic coverage quota applied uniformly regardless of actual risk.

---

## 5. ENFORCEMENT & MEASUREMENT

Section 2 and Section 3's criteria are necessarily judgment-dependent at the point a test is proposed — no tool can fully automate "is this a plausible regression" — but the judgment is checked at code review per Chapter 54's checklist, using this chapter's own stated criteria rather than an unstated, personal sense of what "seems worth testing." A coverage-percentage metric may still be tracked, per Chapter 65's continuous-improvement cadence, but it is treated as a diagnostic signal (a sharp drop might indicate a genuine gap) never as a target pursued for its own sake, consistent with this chapter's own opening distinction.

---

## 6. BEHAVIORAL RULES

**When proposing a new test.** It is checked against Section 2's confidence test and Section 3's framework-versus-product distinction explicitly, not written reflexively to hit a coverage number.

**When a coverage tool flags a gap.** The gap is evaluated against Section 2 before a test is written to close it — a coverage gap in code that genuinely carries little regression risk (a trivial pass-through function, for instance) may legitimately remain uncovered, per this chapter's own criteria, rather than covered purely to satisfy the tool.

**When reviewing a pull request's tests.** A reviewer applies Section 3's distinction directly — a test verifying framework behavior is flagged for removal or reframing, not approved merely because it passes.

---

## 7. DO / DON'T

**Do** evaluate every proposed test against Section 2's confidence criterion — would it catch a plausible, realistic regression not already caught?

**Do** treat a coverage-percentage metric as a diagnostic signal, never a target pursued for its own sake.

**Don't** write a test that only verifies a third-party framework's own documented behavior.

**Don't** treat an uncovered, genuinely low-risk code path as automatically deficient — evaluate it against Section 2 first.

---

## 8. QUALITY ASSURANCE CHECKLIST

- [ ] Would this test catch a plausible, realistic regression not already caught by an existing test? *(Section 2)*
- [ ] Would this test only ever fail due to a framework bug, rather than a bug in this product's own code? *(Section 3)*
- [ ] Is a coverage-percentage number being treated as a diagnostic signal, not a target pursued for its own sake?

---

## 9. CROSS REFERENCES

**Within this Constitution:** Chapter 1 (the general principles this chapter specializes for testing). Chapter 12 §6, Chapter 25 §7, Chapter 44 §8 (specific test requirements this chapter's philosophy makes coherent). Chapter 47 (Testing Strategy & Pyramid, the concrete tooling and allocation this philosophy governs). Chapter 54 (review checklist applying Section 5's judgment). Chapter 65 (continuous-improvement tracking of coverage as a diagnostic signal).

**Within the five documents above this Constitution:** Design System Bible Chapter 61.

---

## 10. FUTURE EXPANSION

**Documented limitations.** Section 2 and Section 3's criteria remain judgment-dependent; a more mechanical proxy (mutation testing, which measures whether a test suite actually catches deliberately introduced bugs) is a plausible future addition once the team's testing maturity and tooling budget make it worth adopting, per Chapter 1's IP3.

---

*End of Chapter 46. The next chapter, Testing Strategy & Pyramid, fixes this philosophy into the concrete test-type allocation and tooling.*
