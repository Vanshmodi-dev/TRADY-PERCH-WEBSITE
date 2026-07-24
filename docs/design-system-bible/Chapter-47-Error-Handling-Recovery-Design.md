# CHAPTER 47 — ERROR HANDLING & RECOVERY DESIGN

**Trady Perch Design System Bible · Volume III: Interaction & Behavior**

**Inherited From:** Master Vision §17.5 (Error states), §2.2 (Composed, Precise). Design System Bible Chapter 1 (P4), Chapter 3 (color, C-4), Chapter 21 (Forms, Fm-3), Chapter 39 (state model, Error).

---

## 1. INTRODUCTION

Chapter 39 defined Error's visual treatment; Chapter 21 defined its timing and single-location rule for forms specifically. This chapter is where recovery — what a user does *after* seeing an error — receives its complete specification, extended beyond forms to every error-capable surface in the system.

This chapter depends on Chapter 39 and Chapter 21 directly. It is depended on by Chapter 48 (Form Validation & Feedback Patterns), which is this chapter's fuller extension into cross-field and multi-step validation specifically.

---

## 2. PHILOSOPHY

The rejected alternative is treating error messaging as a purely informational obligation — state that something went wrong, technically satisfying accessibility and clarity requirements, without addressing what happens to the user's effort or state afterward. This was rejected because how an error is handled is disproportionately revealing of this brand's composure (Master Vision §2.2): panic or generic technical messaging at the moment something breaks undoes far more trust than the underlying bug itself, and a user who loses their work on top of encountering an error experiences a compounded, avoidable frustration.

---

## 3. CORE PRINCIPLES

### Er-1 — Every Error States What Happened, Why (If Known), and What to Do Next

**Purpose.** An error message always contains three parts, even briefly: what occurred, the reason if it's genuinely known and useful, and a specific next action — never just a bare description of the failure with no path forward.

**Reasoning.** Descends from Principle 4 and Master Vision §17.5's "specific, helpful correction guidance" requirement: a message stopping at "what happened" leaves the user to independently figure out what to do, which is an unnecessary tax on someone already experiencing friction.

**Examples.** "We couldn't save your changes. Your connection may have dropped. Please try again." — three parts, none of them padded, none of them omitted.

**When it applies.** To every error message in the system. **When it does not apply.** No exception, though the "why" component may be honestly omitted where the cause is genuinely unknown, per Master Vision Chapter 19's honesty-over-fabrication standard extended here — an invented, plausible-sounding cause is worse than admitting the cause is unclear.

### Er-2 — Recovery Never Requires Losing Already-Entered Work

**Purpose.** A failed submission (a form, an upload, a multi-step process) preserves every already-entered value so the user can retry without re-entering information they already provided.

**Reasoning.** Descends from Principle 4: forcing a user to redo work they already completed, on top of encountering the original error, compounds a small frustration into a genuinely damaging one, directly contradicting the calm experience this brand's entire interaction philosophy depends on.

**Examples.** A form submission that fails due to a network error retains every field's entered value; only the submit action needs repeating.

**When it applies.** To every multi-field or multi-step process capable of failing after user input. **When it does not apply.** No exception.

### Er-3 — Errors Are Never Attributed to the User's Mistake in Tone

**Purpose.** Error messages describe the situation neutrally ("This field requires a valid email address") rather than blaming the user ("You entered an invalid email address") — even where the underlying cause is, technically, a user input mistake.

**Reasoning.** Descends from Master Vision §2.2's composed register: a system that phrases every error as the user's fault reads as impatient or judgmental, which is a specific, avoidable tone failure distinct from the message's actual informational content.

**Examples.** "This field requires a valid email address" (neutral, describes the requirement). Not: "You didn't enter a valid email address" (attributes fault, even subtly).

**When it applies.** To every error message's phrasing. **When it does not apply.** No exception.

---

## 4. COMPLETE DESIGN SPECIFICATION

**Error message structure (Er-1):** What (one clause) → Why, if known (one clause, optional) → Next action (one clause, often a button or retry link). **Work preservation (Er-2):** every field-level value persists across a failed submission attempt at the same anatomy position it occupied before the error. **Tone (Er-3):** neutral, requirement-stated phrasing, never second-person fault attribution.

---

## 5. MEASUREMENTS

Maximum error message length: approximately one to two short sentences, consistent with Chapter 16's brevity doctrine extended from AI copy to system error copy generally.

---

## 6. STATE COVERAGE (per An-3)

This chapter elaborates Chapter 39's Error state specifically; its own coverage is the content and behavioral layer on top of that chapter's already-specified visual treatment (color, icon pairing, motion timing) — no new visual state is introduced here.

---

## 7. MOTION SPECIFICATION

No new motion beyond Chapter 39's existing Error-state entrance (Standard tier, Entrance curve) — this chapter governs content and recovery behavior, not additional visual timing.

---

## 8. ACCESSIBILITY

Er-1's three-part structure directly serves screen-reader users, who benefit even more than sighted users from a message that fully explains the situation and the recovery path in text, since they cannot supplement an incomplete message with surrounding visual context as readily.

---

## 9. RESPONSIVE BEHAVIOUR

No distinct responsive behavior — error content and recovery logic apply identically at every breakpoint.

---

## 10. AI & FUTURE INTERFACES

Master Vision §19.7 already specifies the AI's own error/apology behavior in detail — this chapter's Er-1 and Er-3 are the direct system-wide generalization of that same standard to every non-AI error surface, ensuring the AI's honest, blame-free error tone isn't a special exception but the system's actual universal default.

---

## 11. DO / 12. DON'T

**Do:** "We couldn't process your payment. Your card may have insufficient funds. Try a different card, or contact your bank." Three parts, neutral tone, a clear next action. **Don't:** "Error: Payment failed. Invalid input." — no next action, ambiguous cause, cold tone; fails Er-1 outright.

---

## 13. ANTI-PATTERNS

**Generic error copy.** Reaching for a default, technical error string ("An error occurred") because the specific cause felt like extra effort to articulate. This is detected by auditing every error message in the system for Er-1's three required parts, and fixed by rewriting to include what happened and a next action at minimum.

---

## 14. QUALITY ASSURANCE CHECKLIST

- [ ] Does every error message state what happened, why (if known), and what to do next? *(Er-1)*
- [ ] Does a failed submission preserve all already-entered values? *(Er-2)*
- [ ] Is every error phrased neutrally, without attributing fault to the user? *(Er-3)*

---

## 15. CROSS REFERENCES

Chapter 1 (P4). Chapter 3 (C-4). Chapter 16 (brevity parallel). Chapter 21 (Fm-3). Chapter 23 (Dialog error content). Chapter 39 (state model, Error). Chapter 48 (fuller cross-field extension). Master Vision §2.2, §17.5, §19.7.

---

## 16. FUTURE EXPANSION

No open questions currently identified.

---

*End of Chapter 47. The next and final Phase 4 chapter, per the authoring sequence, is Form Validation & Feedback Patterns.*
