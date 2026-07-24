# CHAPTER 47 — TESTING STRATEGY & PYRAMID

**Trady Perch Product Implementation Constitution · Part X: Testing & Quality Assurance**

**Inherited From:** Design System Bible Chapter 62 (Visual Regression & Consistency Testing). Chapter 46 (Testing Philosophy) is this chapter's direct premise.

---

## 1. INTRODUCTION

Chapter 46 established what makes a test worth writing. This chapter allocates that judgment across four distinct layers, each with a fixed responsibility boundary — so that "should this be tested, and at what layer" has a mechanical answer rather than a fresh debate per test, and so that a production incident's root cause can always be traced to the specific layer that should have caught it, per this chapter's own success criterion.

---

## 2. THE FOUR LAYERS

**Unit tests** — the base of the pyramid, by volume. Verify a single function, hook, or component's logic in isolation, with all external dependencies (network, other components) mocked or stubbed. Fast, numerous, and the first line of defense for Chapter 46's confidence test applied to the smallest unit of logic.

**Integration tests** — verify that multiple units correctly cooperate: a feature's data-fetching hook combined with its component, per Chapter 25's caching layer; a mutation's full effect including Chapter 25 §7's cache-invalidation assertion. Fewer than unit tests, but each one covers a boundary unit tests structurally cannot see across.

**End-to-end tests** — verify a complete user flow through a real or near-real environment, per UX / Experience Blueprint's flow-priority model (Chapter 19 §2's P0/P1 designation). Fewest in number, slowest to run, reserved for the flows whose failure would be most consequential — never used as a substitute for unit or integration coverage of logic that doesn't require a full environment to verify.

**Visual regression tests** — per Design System Bible Chapter 62, verify that a component or page's rendered appearance matches its approved baseline, run at every breakpoint per Chapter 15 §6, catching the specific class of defect none of the other three layers can see: a change that is logically correct but visually wrong.

---

## 3. THE RESPONSIBILITY BOUNDARY PER LAYER

Each layer owns a specific class of defect, and a defect is assigned to exactly one layer as its primary owner, even though multiple layers may incidentally also catch it:

- **Unit tests own:** pure logic correctness — a function's output for a given input, a hook's state transitions.
- **Integration tests own:** correct cooperation across a boundary — Chapter 21's state-category boundaries, Chapter 24's contract boundary, Chapter 25's cache-invalidation boundary.
- **End-to-end tests own:** whether a complete, real flow actually works from a user's perspective, including infrastructure and environment concerns no lower layer exercises.
- **Visual regression tests own:** rendered appearance correctness, independent of logical correctness.

This ownership model is what makes this chapter's success criterion actionable: a production incident is traced to the specific layer whose ownership it falls under, and the gap is closed by adding the missing test at that specific layer — not by reflexively adding an end-to-end test for every incident regardless of which layer actually should have caught it, which would invert the pyramid's cost structure for no corresponding gain in confidence.

---

## 4. THE PYRAMID SHAPE, AND WHY IT'S A PYRAMID

Layer volume decreases from unit to end-to-end, per the traditional testing-pyramid shape, for a direct, cost-based reason: a unit test is fast and cheap to write, run, and diagnose when it fails; an end-to-end test is slow, more brittle to unrelated changes, and harder to diagnose precisely when it fails, because more of the system is in play at once. Chapter 46's confidence-per-test principle is best satisfied by catching a defect at the cheapest layer capable of catching it — pushing coverage down the pyramid wherever a lower layer can provide the same confidence a higher one would, and reserving the expensive upper layers for what only they can verify.

---

## 5. WHERE CHAPTER 12'S COMPONENT TESTS AND CHAPTER 18'S ACCESSIBILITY TESTS FIT

Chapter 12 §6's minimum component-test floor is a unit-test-layer requirement — verifying a component's variant, state, and content-prop rendering in isolation. Chapter 18's Layer 2 automated accessibility testing (not to be confused with this chapter's own layer terminology) spans both the unit layer (a single component's accessible name) and the integration layer (a full page's heading hierarchy and focus order) — Chapter 48 specifies exactly how accessibility and performance testing map onto this chapter's four-layer pyramid in full detail.

---

## 6. ENFORCEMENT & MEASUREMENT

Every pull request's CI run, per Chapter 56, executes all four layers relevant to the change — a change touching only a single component's internal logic triggers unit tests and that component's visual regression; a change touching a data-fetching boundary additionally triggers the relevant integration tests; a change to a P0/P1 flow per Chapter 19 §2 triggers the relevant end-to-end suite. This selective-triggering model, rather than running every layer for every change unconditionally, keeps CI runtime proportionate to a change's actual scope, consistent with Chapter 1's IP3 applied to CI resource cost specifically.

This chapter's own success criterion — a production incident traceable to a specific layer, with the gap closed rather than merely noted — is operationalized by Chapter 59's incident postmortem template, which requires naming the specific layer per Section 3 that should have caught the incident, and requires a corresponding new test at that layer as a condition of closing the postmortem, not merely a narrative acknowledgment that testing "could be improved."

---

## 7. BEHAVIORAL RULES

**When writing any new feature.** Its test coverage is planned across the four layers using Section 3's ownership model — logic goes to unit tests, boundary cooperation goes to integration tests, the complete flow (if P0/P1) goes to end-to-end, appearance goes to visual regression — never all defect classes funneled into a single, catch-all end-to-end test out of expedience.

**When a production incident occurs.** Chapter 59's postmortem explicitly names the owning layer per Section 3 and requires a new test at that layer before the postmortem is closed, per Section 6.

**When a test is slow or flaky.** It is examined against Section 4's cost reasoning — a flaky end-to-end test covering something a unit or integration test could verify more cheaply and reliably is a signal the coverage belongs at a lower layer, not merely a signal to retry the flaky test more times.

---

## 8. DO / DON'T

**Do** assign every new test to the layer that owns its specific defect class, per Section 3.

**Do** push coverage to the cheapest layer capable of providing the needed confidence, per Section 4.

**Don't** rely on end-to-end tests to catch defects a unit or integration test could catch more cheaply and reliably.

**Don't** close a production-incident postmortem without a new test at the specific layer Section 3 identifies as the incident's owner.

---

## 9. ANTI-PATTERNS

**The inverted pyramid.** A codebase accumulates a large number of slow, brittle end-to-end tests covering logic that unit tests could verify far more cheaply, while genuine unit-level coverage remains thin, because writing one broad end-to-end test felt like it covered "more ground" than several narrow unit tests. This is dangerous because it produces a slow, flaky CI suite that erodes trust in test failures generally — a team that has learned to reflexively re-run a flaky end-to-end suite has, in practice, stopped treating a red build as reliable signal, which defeats Chapter 46's entire confidence-based rationale for testing at all. It is detected by tracking each layer's relative volume and runtime per Section 6, flagging a shape that has drifted from the pyramid toward an inverted or hourglass shape. It is fixed by identifying which end-to-end tests are actually covering unit- or integration-owned defect classes per Section 3, and replacing them with tests at the correct, cheaper layer.

---

## 10. QUALITY ASSURANCE CHECKLIST

- [ ] Is every new test assigned to the layer that owns its specific defect class, per Section 3?
- [ ] Does coverage sit at the cheapest layer capable of providing the needed confidence, per Section 4?
- [ ] Does the CI run trigger only the layers relevant to a given change's actual scope, per Section 6?
- [ ] Does every closed production-incident postmortem include a new test at the specific layer identified as responsible?
- [ ] Has the overall test suite's shape been checked against pyramid-inversion, per Section 9?

---

## 11. CROSS REFERENCES

**Within this Constitution:** Chapter 1 (IP3). Chapter 12 §6 (unit-layer component test floor). Chapter 15 §6 (visual regression breakpoint matrix). Chapter 18 (accessibility test-layer mapping, fully specified in Chapter 48). Chapter 19 §2 (P0/P1 flows, the end-to-end layer's scope). Chapter 21, Chapter 24, Chapter 25 §7 (integration-layer boundaries). Chapter 46 (the philosophy this chapter allocates). Chapter 48 (Accessibility & Performance Test Automation, extending this pyramid). Chapter 56 (CI pipeline running Section 6's selective triggering). Chapter 59 (incident postmortem, closing the loop per Section 6).

**Within the five documents above this Constitution:** Design System Bible Chapter 62.

---

## 12. FUTURE EXPANSION

**Documented limitations.** Section 6's selective-triggering model depends on reliably inferring a change's scope from the files it touches; a change with subtle, indirect effects outside its most obvious scope remains a risk this chapter's automation cannot fully eliminate, mitigated but not solved by Chapter 51's human review layer.

---

*End of Chapter 47. The next chapter, Accessibility & Performance Test Automation, wires Parts IV and VII's specific standards directly into this pyramid.*
