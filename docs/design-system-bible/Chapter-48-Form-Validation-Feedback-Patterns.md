# CHAPTER 48 — FORM VALIDATION & FEEDBACK PATTERNS

**Trady Perch Design System Bible · Volume III: Interaction & Behavior**
*Closes Volume III (Interaction & Behavior) in full.*

**Inherited From:** Master Vision §17.4 (Forms). Design System Bible Chapter 1 (P1, P4), Chapter 21 (Forms & Inputs, in full — this chapter is its direct continuation), Chapter 39 (state model), Chapter 47 (Error Handling, in full).

---

## 1. INTRODUCTION

Chapter 21 specified single-field validation completely. This chapter is its explicit continuation into the two cases Chapter 21 deferred: validation across multiple related fields (a password and its confirmation), and validation across multiple sequential steps (a multi-page form or wizard).

This chapter depends on Chapter 21 and Chapter 47 directly and completely — it introduces no new visual treatment, only new timing and sequencing rules for content Chapter 21 and Chapter 39 already specify visually.

---

## 2. PHILOSOPHY

The rejected alternative is applying Chapter 21's single-field timing rules naively to cross-field and multi-step cases without adaptation — validating a password-confirmation field the instant it differs from the password field, even while the user is still mid-keystroke on their first attempt at the original password. This was rejected because it produces exactly the premature, agitating error state Chapter 21's Fm-2 was written to prevent, merely relocated to a slightly more complex validation relationship.

---

## 3. CORE PRINCIPLES

### Fv-1 — Cross-Field Validation Waits for Both Fields to Be Genuinely Complete

**Purpose.** A validation rule spanning two or more fields (password/confirmation match, date-range start-before-end) fires only once every field it depends on has been blurred at least once — never while any dependent field is still being actively edited for the first time.

**Reasoning.** Direct extension of Chapter 21's Fm-2 to a multi-field relationship: the same "don't validate before the user has finished" reasoning applies, now requiring *all* relevant fields to have reached a completed-enough state, not just one.

**Examples.** A "Confirm Password" field does not show a mismatch error until both the original Password field and the Confirm field have each been blurred at least once.

**When it applies.** To every cross-field validation rule. **When it does not apply.** No exception.

### Fv-2 — Each Step Validates Before Advancing; Errors Never Wait for the Final Step

**Purpose.** A multi-step form validates the current step's fields before allowing advancement to the next step — it never defers all validation to a final submission at the end of the last step.

**Reasoning.** Descends from Master Vision Chapter 4's emotional-debt reasoning applied to a multi-step process specifically: discovering, at step five, that step one contained an error compounds frustration far more than catching it immediately, and directly echoes why Master Vision §17.4 rejects submit-only validation in the first place — this chapter generalizes that rejection across step boundaries, not only within a single step.

**Examples.** A three-step demo-request wizard validates step one's required fields before its "Next" button becomes available, rather than allowing progression through all three steps and only then revealing that step one was incomplete.

**When it applies.** To every multi-step form. **When it does not apply.** No exception.

### Fv-3 — A Step Summary Always Names the Specific Field Needing Attention

**Purpose.** Where a form provides an overview of multiple steps (a review screen, a progress Stepper per Chapter 36), any incomplete or invalid step is linked directly to the specific field requiring attention — never a generic "Step 2 has an error" with no further detail.

**Reasoning.** Direct extension of Chapter 21's Fm-3 (one field, one error, stated once) to the summary level: a summary vague enough to require the user to re-scan an entire step to find the actual problem reintroduces the friction Fm-3 already eliminates at the single-field level.

**Examples.** "Step 2: Email address is missing" with a direct link back to that specific field, not merely "Step 2: incomplete."

**When it applies.** To every multi-step form's summary or review screen. **When it does not apply.** No exception.

---

## 4. COMPLETE DESIGN SPECIFICATION

**Cross-field timing (Fv-1):** validation fires only after all dependent fields have each been blurred once. **Step-advancement gating (Fv-2):** the "Next" action (Chapter 18) is disabled until the current step's required fields pass Chapter 21's validation, using Chapter 39's default Disabled treatment rather than allowing advancement and retroactively flagging the issue. **Summary linking (Fv-3):** each flagged issue in a review screen is an active link scrolling/navigating directly to its specific field.

---

## 5. MEASUREMENTS

No new measurements — this chapter reuses Chapter 21's exact timing values (approximately 500ms pause, or blur-triggered) applied to the multi-field and multi-step relationships specified here.

---

## 6. STATE COVERAGE (per An-3)

No new states beyond Chapter 39's existing eight — this chapter governs *sequencing* of Error and Disabled states across multiple fields and steps, not new state categories.

---

## 7. MOTION SPECIFICATION

Step transitions (advancing from step 1 to step 2) use Chapter 15's Standard tier (300ms), consistent with Chapter 7's page-level section-transition reasoning applied at the scale of a single multi-step form.

---

## 8. ACCESSIBILITY

A step-advancement gate (Fv-2) must announce why the "Next" control is disabled to assistive technology, not merely present it as inertly unavailable with no explanation — a sighted user can infer the reason from visible field errors; a screen-reader user needs the same inference made explicit.

---

## 9. RESPONSIVE BEHAVIOUR

No distinct responsive behavior beyond Chapter 21 and Chapter 8's existing rules.

---

## 10. AI & FUTURE INTERFACES

A voice interface's multi-step equivalent is the AI confirming each piece of information before moving to the next question ("Got it — and what's the best email to reach you at?") — Fv-2's step-gating logic translates directly into never accumulating several pieces of unconfirmed information before checking any of them.

---

## 11. DO / 12. DON'T

**Do:** A three-step wizard that won't advance past step one until its required fields validate, with a review screen linking any remaining issue directly to its field. **Don't:** A wizard allowing full progression through all three steps, only revealing at final submission that step one's email field was invalid — forcing the user back through steps they believed were complete.

---

## 13. ANTI-PATTERNS

**Deferred multi-step validation.** Implementing step advancement with no per-step validation gate, deferring all error-checking to the final submit action, because it was simpler to build one validation pass at the end than several gated checks along the way. This is detected by attempting to advance through a multi-step form with deliberately invalid data at an early step, and fixed by adding Fv-2's per-step gate.

---

## 14. QUALITY ASSURANCE CHECKLIST

- [ ] Does cross-field validation wait for all dependent fields to be blurred at least once? *(Fv-1)*
- [ ] Does each step validate before advancement is allowed? *(Fv-2)*
- [ ] Does a summary or review screen link each issue to its specific field? *(Fv-3)*

---

## 15. CROSS REFERENCES

Chapter 1 (P1, P4). Chapter 4 (Emotional Journey, emotional-debt reasoning). Chapter 7 (transition timing parallel). Chapter 15 (motion). Chapter 18 (Next button gating). Chapter 21 (this chapter's direct foundation). Chapter 36 (Stepper, step-summary consumer). Chapter 39 (state model). Chapter 47 (this chapter's other direct foundation). Master Vision §17.4.

---

## 16. FUTURE EXPANSION

No open questions currently identified.

---

*End of Chapter 48. This closes Volume III (Interaction & Behavior) in full. The next chapters, per the authoring sequence, open Volume IV: Platform, Mode & Accessibility, beginning with Chapter 49, Mobile Design Standards.*
