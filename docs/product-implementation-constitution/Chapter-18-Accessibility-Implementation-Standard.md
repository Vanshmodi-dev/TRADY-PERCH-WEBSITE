# CHAPTER 18 — ACCESSIBILITY IMPLEMENTATION STANDARD

**Trady Perch Product Implementation Constitution · Part IV: Accessibility & Inclusive Engineering**

**Inherited From:** Master Vision Document §22 (Accessibility Standards); Design System Bible Chapter 53 (Accessibility Standards Deep Specification, in full — Ax-1 "Every Accessibility Rule Maps to a Named WCAG 2.1 Success Criterion," Ax-2 "This Chapter Consolidates; It Never Introduces an Unmapped New Rule," Ax-3 "AAA Is Pursued Wherever Achievable Without Compromising Brand Identity"), Chapter 42 (Keyboard Interaction Standards). Chapter 12 (Component Implementation Standard) is this chapter's direct premise.

---

## 1. INTRODUCTION

Chapter 1's IP6 states that accessibility is a non-negotiable floor, never a variable traded against convenience. This chapter is where that claim stops being a principle and becomes a build that literally cannot ship a violation. Design System Bible Chapter 53 maps every accessibility rule this system follows to a named WCAG 2.1 success criterion (Ax-1) and introduces nothing unmapped (Ax-2); this chapter's job is the mechanical translation of that mapped rule set into linting rules, required ARIA patterns, and automated test coverage wired directly into Chapter 56's CI pipeline.

---

## 2. THE THREE ENFORCEMENT LAYERS

Accessibility is enforced at three points, each catching what the layer before it structurally cannot:

**Layer 1 — Static analysis, at write time.** An accessibility-focused lint rule set, run on every file save and every commit, catches structural violations detectable from source alone: a missing `alt` attribute, an interactive element with no accessible name, an ARIA attribute used incorrectly. This layer is fast and immediate, giving the fastest possible feedback per Chapter 1's IP2.

**Layer 2 — Automated behavioral testing, in CI.** An axe-core-equivalent automated accessibility test runs against every component's rendered output and every page's full render, catching violations static analysis cannot see because they depend on actual computed styles, contrast ratios, or DOM structure post-render. This layer is Section 5's direct mechanism and this chapter's primary success-criterion enforcer.

**Layer 3 — Manual assistive-technology testing, per release cycle.** What neither automated layer can catch — genuine screen-reader usability, real keyboard-only task completion — is Chapter 19's distinct territory, run on a cadence rather than per commit, because it requires human judgment no automated check can substitute for.

This chapter owns Layers 1 and 2 in full; Layer 3 is Chapter 19's.

---

## 3. COMPONENT-LEVEL REQUIREMENTS

Every component built to Chapter 12's template carries, as a non-optional part of that template, an accessible name derived from its content props, correct semantic markup for its documented role (a button element for button-like interaction, never a styled `div` with a click handler), and — per Chapter 42's keyboard standard — full keyboard operability for every one of Chapter 12 §4's eight canonical states that involves interaction.

Focus visibility is treated exactly as Design System Bible Chapter 1 already establishes it in its own accessibility section: never traded against Chapter 1's IP3 restraint principle. Every focusable element in `packages/ui/` ships with a visible focus indicator by default, generated from Chapter 13's token pipeline, with no code path permitting a component to suppress it without an explicit, documented, Chapter 62-recorded exception for a case where a genuinely equivalent visible-focus treatment is provided instead.

---

## 4. ARIA AS A LAST RESORT, NOT A DEFAULT

Per the general engineering principle Ax-1 and Ax-2's WCAG mapping already implies — native semantic HTML satisfies more accessibility requirements automatically than ARIA attributes layered onto non-semantic markup ever can. This chapter requires native semantic elements be used wherever they exist for a given purpose; ARIA attributes are added only to fill a genuine gap native semantics cannot cover (a complex widget with no native equivalent), and every such addition is checked against Chapter 3's translation model — citing the specific WCAG success criterion per Ax-1 that the ARIA pattern satisfies, never added because it "seems more accessible" without a specific, named justification.

---

## 5. AUTOMATED TEST COVERAGE

Every component in `packages/ui/`, and every route in every app per Chapter 7, runs an automated accessibility test as part of Chapter 47's testing pyramid, checking at minimum: color contrast against Chapter 13's token-generated values, presence of accessible names for every interactive element, correct heading hierarchy, and correct ARIA usage where Section 4 requires it. This test suite is wired into Chapter 56's CI pipeline as a blocking gate — a pull request introducing a detected violation fails CI before a human reviewer ever sees it, which is this chapter's own stated success criterion, verbatim.

---

## 6. AAA WHERE ACHIEVABLE

Per Ax-3, this chapter's automated tests are configured to warn (not block) on AAA-level criteria beyond the AA floor Ax-1's WCAG mapping guarantees as a hard minimum, surfacing an opportunity to exceed the floor without treating every AAA gap as a release blocker — consistent with Chapter 1's IP6 framing of a floor as a minimum, not a ceiling a team is discouraged from exceeding.

---

## 7. ENFORCEMENT & MEASUREMENT

Layer 1 (Section 2) is enforced by a pre-commit hook and a CI lint stage; Layer 2 is enforced by Section 5's blocking CI gate. Both are tracked in Appendix A's tooling index per Chapter 1's IP2 — an accessibility rule from Design System Bible Chapter 53 with no corresponding automated check in either layer is logged as a Chapter 66 debt-register entry and, per Chapter 19, covered by manual testing in the interim rather than left entirely unchecked.

---

## 8. BEHAVIORAL RULES

**Before building any new component or page.** Its accessible name, semantic role, and keyboard operability are designed in from the start per Section 3 — never retrofitted after a visual-only implementation is already complete, which is measurably more expensive and more error-prone than building it in from the outset.

**When Layer 2's automated test fails.** The violation is fixed before merge, per Section 5 — never suppressed by disabling the specific check, which per Chapter 1's IP6 is treated with the same severity as disabling a security check would be.

**Under deadline pressure.** Exactly as Chapter 1 §7 already states in general terms: no accessibility floor from this chapter is waived for a launch date. If a genuine, temporary exception is unavoidable, it is logged in Chapter 66's debt register with an owner and a date, never silently shipped.

---

## 9. DO / DON'T

**Do** use native semantic HTML elements wherever one exists for the component's purpose, reserving ARIA for genuine gaps.

**Do** treat Layer 2's automated accessibility test exactly as seriously as a functional test failure — both block merge equally.

**Don't** suppress or skip an accessibility lint rule or automated test to unblock a merge — fix the underlying violation instead.

**Don't** add an ARIA attribute without citing the specific WCAG success criterion it satisfies, per Ax-1.

---

## 10. ANTI-PATTERNS

**The disabled check.** A failing accessibility test is silenced by adding it to a suppression list or disabling the specific rule, rather than fixing the actual violation, usually under the reasoning that the fix can happen "in a follow-up." This is dangerous for the exact reason Chapter 5's F2 (Undocumented Exception) already names, applied to a non-negotiable floor specifically: a suppressed check doesn't just skip one violation, it silently authorizes every future violation of the same rule until someone notices the suppression itself. It is detected by Section 7's Appendix A audit flagging any suppression entry with no corresponding Chapter 66 debt-register justification. It is fixed by removing the suppression and resolving the actual violation, treating the follow-up promise as already broken the moment the suppression was added without a tracked entry.

**Div-button syndrome.** A clickable element styled to look like a button but implemented as a non-semantic element with a click handler attached, bypassing native keyboard operability, focus handling, and screen-reader button semantics entirely. This is dangerous because it often looks and behaves correctly for a mouse user, hiding the defect from anyone not specifically testing keyboard or screen-reader access. It is detected by Layer 1's static lint rule flagging interactive handlers on non-interactive elements. It is fixed by using the native interactive element Section 4 already requires by default.

---

## 11. QUALITY ASSURANCE CHECKLIST

- [ ] Does every interactive element use native semantic HTML, with ARIA reserved for genuinely unmapped gaps? *(Ax-1, Ax-2)*
- [ ] Does every focusable element carry a visible focus indicator with no suppression, per Chapter 1's IP6?
- [ ] Does Layer 1's static lint pass with zero suppressed rules lacking a Chapter 66 justification?
- [ ] Does Layer 2's automated accessibility suite pass for this component or route, blocking merge on failure?
- [ ] Where an AAA-level opportunity exists, has it been considered per Ax-3, even where not mandatory?

---

## 12. CROSS REFERENCES

**Within this Constitution:** Chapter 1 (IP2, IP3, IP6 — the non-negotiable-floor framing this entire chapter operationalizes). Chapter 3 (translation model, extended to ARIA justification in Section 4). Chapter 12 §4 (the eight-state wiring this chapter's keyboard-operability requirement builds on). Chapter 19 (Assistive Technology Testing Protocol, Layer 3). Chapter 47 (Testing Strategy, incorporating Section 5's suite). Chapter 56 (Continuous Integration Standard, where Section 5's gate is wired). Chapter 66 (Engineering Debt Register, for any temporary, logged exception).

**Within the five documents above this Constitution:** Master Vision §22; Design System Bible Chapter 53 (in full), Chapter 42.

---

## 13. FUTURE EXPANSION

**Documented limitations.** Automated Layer 2 testing, however thorough, cannot fully substitute for Chapter 19's manual assistive-technology testing — a component can pass every automated check and still be genuinely difficult to use with a screen reader in practice, which is precisely why Chapter 19 exists as a distinct, non-optional layer rather than a nice-to-have supplement.

---

*End of Chapter 18. The next chapter, Assistive Technology Testing Protocol, specifies Layer 3 — what only a human tester can actually catch.*
