# CHAPTER 21 — FORMS & INPUTS

**Trady Perch Design System Bible · Volume II: Components**
*First-canonical-draft.*

**Inherited From:** Master Vision §17.4 (Forms), §12.4 (Forms, Premium Interaction Library). Design System Bible Chapter 1 (P1, P4, P7), Chapter 3 (color, C-4), Chapter 4 (typography), Chapter 17 (anatomy standard), Chapter 39 (state model, especially Error and Disabled).

---

## 1. INTRODUCTION

Master Vision §17.4 names forms "a critical trust surface" and states that "a form that feels clunky undoes pages of premium positioning in ten seconds." Few components in this system carry that much reputational risk per pixel. This chapter turns §17.4's three specific commitments — generous touch targets, persistent visible labels, calm immediate validation — into a complete anatomy and behavior specification covering every input type the system will need.

This chapter depends on Chapter 39 directly and completely — Forms is the component where Chapter 39's Error state receives its fullest real-world workout, and this chapter does not redefine Error's color or motion treatment, only its precise timing and pairing rules specific to validation. It is depended on by Chapter 48 (Form Validation & Feedback Patterns), which extends this chapter's rules into fuller cross-field and multi-step behavior.

---

## 2. PHILOSOPHY

The rejected alternative is the still-common pattern of placeholder-as-label — text that occupies the label's visual position until the user starts typing, then disappears. This was rejected outright by Master Vision §17.4 itself, for good reason beyond aesthetics: a disappearing label creates a real usability problem (a user who pauses mid-form loses the context of what they were filling in) and a real accessibility problem (many placeholder implementations are invisible to assistive technology once populated, or carry insufficient contrast by design convention). A second rejected alternative — validating only on form submission — was rejected because it concentrates all of a user's correction work into one frustrating moment at the end, rather than letting them fix a mistake the moment it's made, which is both kinder and, per Master Vision Chapter 4's emotional-debt reasoning, prevents small frustrations from accumulating into a moment of real annoyance right before the point of conversion.

---

## 3. CORE PRINCIPLES

### Fm-1 — Labels Are Always Visible, Never Placeholder-Only

**Purpose.** Every input carries a persistent, visible label positioned above the input field, present before, during, and after the field is populated. Placeholder text, where used at all, supplements the label with a format example and never substitutes for it.

**Reasoning.** Direct restatement of Master Vision §17.4, reinforced by Principle 1: a label that disappears is a traceability failure at the interface level — the very information a user needs to confirm what they're looking at vanishes exactly when a brief pause makes them need it most.

**Examples.** "Email Address" as a persistent label above the field, with "you@company.com" as a lighter-weight placeholder inside the (still-labeled) field showing expected format — correct. "Email Address" appearing only as placeholder text that vanishes on focus — incorrect, regardless of how common this pattern is elsewhere.

**When it applies.** To every text-entry input in the system.

**When it does not apply.** To a small set of universally self-explanatory controls (a standalone search icon-button with no accompanying text field) where Chapter 18's Bt-3 icon-labeling rules apply instead.

**Common misunderstandings.** Assuming a floating label (one that starts inside the field and animates to a position above it on focus) satisfies this principle. It does, provided the label remains visible throughout the interaction — the specific animated positioning is a legitimate implementation choice; permanent disappearance is the actual violation.

### Fm-2 — Validation Is Calm, Immediate, and Field-Scoped

**PurPose.** A field validates as soon as the user has provided enough information to meaningfully check it (typically on blur, or after a brief pause during typing for format-checkable fields) — never deferred until the entire form is submitted, and never validated so aggressively that it fires on every keystroke before the user has finished.

**Reasoning.** Direct restatement of Master Vision §17.4's "calm, immediate inline validation" requirement, given exact timing guidance: too early (every keystroke) reads as impatient and produces a distracting, flickering error state on a field the user hasn't finished with; too late (submit-only) concentrates frustration and violates the emotional-debt reasoning in Master Vision Chapter 4.

**Examples.** An email field validates its format on blur (when focus leaves the field), not after every character typed. A required-field check similarly resolves on blur, not as the user is still in the process of typing their first character.

**When it applies.** To every validated input in the system.

**When it does not apply.** To real-time format constraints that genuinely benefit from immediate feedback as the user types (a credit-card number auto-formatting into groups, for instance) — this is immediate assistance, not premature error-flagging, and is a different behavior from validation proper.

**Common misunderstandings.** Assuming "immediate" means "instant, on every keystroke." The correct timing is on blur or after a genuine pause, per the exact guidance above — validating too eagerly is a specific, named failure mode this principle exists to prevent, not merely the absence of "immediate."

### Fm-3 — One Field, One Error, Stated Once

**Purpose.** A single invalid field displays exactly one error message, in exactly one place (directly below that field), never restated in a separate banner, modal, or summary alongside the inline message.

**Reasoning.** Direct application of Principle 4 (Restraint as Default) to validation feedback: repeating the same error in multiple locations does not make it more likely to be noticed or corrected — Master Vision §17.4 and Chapter 1's own Section 12 example both identify multi-channel repetition of the same message as a restraint failure, not a thoroughness win.

**Examples.** An invalid email field shows "Enter a valid email address" once, directly beneath the field. It is not also restated in a page-top banner or a submission-blocked modal.

**When it applies.** To any single field-level validation error.

**When it does not apply.** To a genuinely form-level error unrelated to any single field (a network failure on submission) — this legitimately needs its own, single, form-level message location (typically near the submit button), which is not a restatement of a field error but a distinct category of error entirely.

**Common misunderstandings.** Assuming a form-level summary listing every invalid field (useful for some longer forms, especially for accessibility purposes when many errors exist at once) violates this principle. A single, consolidated summary that itself does not duplicate each field's own inline message word-for-word — instead linking to each field — is a legitimate, single location, not a second restatement of the same content.

### Fm-4 — Every Input Type Shares One Container Anatomy

**Purpose.** Text inputs, selects, textareas, checkboxes, radios, and toggles all share the same three-part anatomy — Label, Input Region, Helper/Error Text — even though the Input Region's internal content differs by type.

**Reasoning.** Descends from Chapter 17's An-1 and Principle 7: treating each input type as an unrelated component would multiply documentation and risk each type drifting toward its own spacing, label treatment, and error-display convention independently — a single shared anatomy, populated differently per type, is what keeps a form's overall rhythm consistent regardless of how many different input types it mixes.

**Examples.** A checkbox's Input Region contains the checkbox control itself plus its inline label (checkboxes conventionally place their label beside, not above, the control); a text field's Input Region contains the text box. Both still report to a shared Helper/Error Text region directly beneath, in the same position relative to their own Input Region.

**When it applies.** To every input type in the system.

**When it does not apply.** No exception — even where a type's specific label placement convention differs (checkbox label beside vs. text-field label above), the *three-part structure itself* (Label, Input Region, Helper/Error) remains constant.

**Common misunderstandings.** Assuming this principle requires visually identical treatment across all input types. It requires structural consistency (three parts, in the same relative order and Helper/Error position), not visual sameness — a checkbox and a text field will and should look different, while still sharing the same underlying skeleton.

---

## 4. COMPLETE DESIGN SPECIFICATION

**Anatomy** (per An-1): Label (persistent, per Fm-1) → Input Region (type-specific content, per Fm-4) → Helper/Error Text (conditional, appears only when populated).

**Variant axes** (per An-2): **Type** — `text`, `email`, `password`, `textarea`, `select`, `checkbox`, `radio`, `toggle` (each with its own Input Region content, sharing the outer anatomy). **Size** — `sm`, `md`, `lg`, matching Chapter 18's Button size steps for visual rhythm consistency when buttons and inputs appear together in the same form.

**Token consumption:** `semantic.color.text.primary` (label), `semantic.color.text.secondary` (helper text, placeholder), `semantic.color.text.error`/`border.error` (error state, Chapter 3 C-4 respected), `semantic.color.border.default` (resting border), `semantic.color.focus.ring`, `semantic.opacity.disabled` (Chapter 39), `core.radius.md` (Chapter 18's first population, reused here rather than a separate input-specific radius).

---

## 5. MEASUREMENTS

- **Anatomy parts: 3** (Label, Input Region, Helper/Error). *(Fm-4)*
- **Validation timing:** on blur, or after a pause of approximately 500ms during active typing for format-checkable fields — chosen to be long enough that a user mid-entry is not interrupted, short enough that feedback still feels prompt once they pause.
- **Touch target height, all sizes:** minimum 44px, matching Chapter 18's button touch-target floor, regardless of the field's visual height at smaller size steps.

---

## 6. STATE COVERAGE (per An-3)

| State | Treatment |
|---|---|
| **Hover** | Border shifts from `border.default` to a slightly more visible step; no elevation change (inputs are flush, per Chapter 9's El-4, not elevated cards). |
| **Focus** | Chapter 39 default 2px gold ring, applied to the Input Region specifically, not the Label. |
| **Active** | Not distinctly styled beyond Focus — text inputs do not have a separate "pressed" moment distinct from gaining focus. |
| **Disabled** | Chapter 39 default opacity (0.4) applied to the full anatomy (Label, Input Region, and any Helper text together). |
| **Loading** | Applies to the form's submit button (Chapter 18), not to individual fields directly — fields themselves have no independent Loading state. |
| **Error** | Border and Helper Text switch to `border.error`/`text.error` (Chapter 3, C-4), always paired with a small error icon per Master Vision §22's color-pairing rule, per Fm-3's single-location rule. |
| **Success** | A field may show a brief `text.success`-colored confirmation (a validated, correctly-formatted field) but this is optional and never celebratory, per Master Vision §17.5 — most fields simply return to their resting border on successful validation without a distinct success flourish. |
| **Empty** | Not applicable to an individual field in the content-container sense — an empty *form* (no fields completed) is simply every field in its resting state, not a distinct Empty treatment. |

---

## 7. MOTION SPECIFICATION

Border and Helper/Error Text transitions use Chapter 15's Quick tier (150ms) — fast enough to feel responsive to the validation moment (Fm-2) without the more deliberate pacing Chapter 15 reserves for genuinely significant state changes. An error message's appearance uses the Entrance curve; its disappearance, once corrected, uses the Exit curve at the same Quick duration, per Master Vision §10.4's asymmetry rule applied even to this comparatively small-scale motion.

---

## 8. ACCESSIBILITY

Every Label is programmatically associated with its Input Region (not merely visually adjacent) so assistive technology announces the correct label when the field receives focus. Every Error message is programmatically associated with its field as well, so a screen-reader user is informed of the specific error without needing to separately locate and read the Helper/Error text region. Placeholder text, where used, never serves as the sole accessible name for a field, consistent with Fm-1's underlying reasoning.

---

## 9. RESPONSIVE BEHAVIOUR

Field width defaults to filling its available column (Chapter 6) at every breakpoint rather than a fixed pixel width, so a form remains comfortably usable within Chapter 7's Split Narrative or Centered Statement patterns at any viewport. Touch targets (Section 5) are enforced identically at every breakpoint, not only Mobile, since a desktop user may still interact via touch on a hybrid device.

---

## 10. AI & FUTURE INTERFACES

A voice interface (Chapter 72) replaces form-filling with conversational slot-filling — the AI asks for one piece of information at a time, which is the direct spoken equivalent of Fm-2's field-scoped, un-rushed validation timing: a voice interface that demands all information at once, then reports every problem in a single overwhelming response, would violate this chapter's reasoning just as surely as a submit-only web form would.

---

## 11. DO

An email field validating on blur, showing "Enter a valid email address" once, directly beneath the field, in `text.error` paired with a small error icon, with the Label ("Email Address") remaining visible throughout — every principle in this chapter satisfied simultaneously in one ordinary field interaction.

## 12. DON'T

Validating an email field on every keystroke, showing a red border the instant the user types "j" before they've had a chance to type "john@company.com" in full. This violates Fm-2's timing guidance directly and produces exactly the flickering, premature-error experience Master Vision §17.4's "calm" requirement was written to prevent.

---

## 13. ANTI-PATTERNS

**Validation eagerness.** Firing validation logic on every keystroke rather than on blur or after a genuine pause, typically introduced because it was the simplest technical implementation rather than the most calm one. This is dangerous because it actively punishes a user for the ordinary act of typing, turning routine form completion into a visually agitated experience that directly contradicts the "composed" brand trait (Master Vision §2.2) at one of the most consequential moments on the site — the point just before a conversion. It is detected by testing any form field by typing into it character by character and watching for premature error states. It is fixed by moving the validation trigger to blur or a defined pause, per Fm-2's exact guidance.

---

## 14. QUALITY ASSURANCE CHECKLIST

- [ ] Is every input's label persistently visible, never placeholder-only? *(Fm-1)*
- [ ] Does validation fire on blur or after a genuine pause, never on every keystroke and never deferred to submission only? *(Fm-2)*
- [ ] Does an invalid field show its error exactly once, in exactly one location? *(Fm-3)*
- [ ] Does every input type share the same three-part anatomy, regardless of its type-specific Input Region content? *(Fm-4)*
- [ ] Is every label and error message programmatically associated with its field for assistive technology?
- [ ] Does every field meet the 44px touch-target floor at every size step and breakpoint?

---

## 15. CROSS REFERENCES

Chapter 1 (P1, P4, P7). Chapter 3 (color, C-4). Chapter 4 (typography). Chapter 15 (motion). Chapter 17 (anatomy standard). Chapter 18 (size-step and radius consistency). Chapter 39 (state model, in full). Chapter 47 (Error Handling & Recovery Design, fuller behavioral extension). Chapter 48 (Form Validation & Feedback Patterns, direct successor chapter). Master Vision §17.4, §12.4, Chapter 4.

---

## 16. FUTURE EXPANSION

**Documented limitations.** This chapter's guidance has been reasoned for single-step forms (a contact form, a demo request); multi-step forms and cross-field validation (a password-confirmation match, for instance) are explicitly deferred to Chapter 48, which should be read as this chapter's direct continuation rather than a competing specification.

---

*End of Chapter 21. The next chapter, per the authoring sequence, is Cards & Containers — this system's most frequently reused component.*
