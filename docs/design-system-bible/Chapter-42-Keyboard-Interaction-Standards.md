# CHAPTER 42 — KEYBOARD INTERACTION STANDARDS

**Trady Perch Design System Bible · Volume III: Interaction & Behavior**

**Inherited From:** Master Vision §17.7 (Keyboard Navigation), Chapter 22 (Accessibility Standards, in full). Design System Bible Chapter 1 (P1, P2), Chapter 3 (focus ring color), Chapter 39 (state model, Focus).

---

## 1. INTRODUCTION

Master Vision §17.7 states the requirement plainly: full site operability via keyboard alone, in a logical order, with no keyboard traps. This chapter is where that requirement receives full, per-component-type specification — the exact tab-order rules, the exact key bindings, and the exact focus-trap discipline every component in Volume II must satisfy.

This chapter depends on Chapter 39's Focus state directly and every Volume II component chapter, each of which references this chapter for its own full keyboard specification. It is depended on by Chapter 53 (Accessibility Standards, Deep Specification), which incorporates this chapter's rules into its full WCAG conformance mapping.

---

## 2. PHILOSOPHY

The rejected alternative is treating keyboard operability as a checklist verified after visual design is complete — "does this happen to work with a keyboard" rather than "was this designed to work with a keyboard from the start." This was rejected because keyboard operability retrofitted late routinely produces an illogical tab order that happens to reach every element without ever reaching them in a sensible sequence — technically compliant, practically unusable. This chapter requires tab order to be considered at the same time as visual layout, not after it.

---

## 3. CORE PRINCIPLES

### Kb-1 — Tab Order Always Matches Visual Reading Order

**Purpose.** The sequence in which Tab moves focus through a page matches the visual, left-to-right, top-to-bottom reading order a sighted user would naturally follow — never a DOM order that diverges from visual arrangement.

**Reasoning.** Direct restatement of Master Vision §17.7 and Chapter 6, §8's grid-reflow requirement generalized: a tab order that jumps unpredictably around the visual layout forces a keyboard user to build a mental map that doesn't match what they see, which is a fundamentally different and harder task than simply reading top to bottom.

**Examples.** A Split Narrative section (Chapter 7) with text on the left and a visual on the right: focus moves through the text's interactive elements before any interactive element within the visual, matching the reading-order convention Chapter 6, §8 already establishes for this exact layout pattern.

**When it applies.** To every page and component. **When it does not apply.** No exception.

### Kb-2 — Every Interactive Element Shows a Visible Focus Indicator, Without Exception

**Purpose.** Every element that can receive keyboard focus shows Chapter 39's default gold focus ring (or a component-specific equivalent, per that chapter's own exceptions) the instant it receives focus — never suppressed, hidden, or removed without an equally visible replacement.

**Reasoning.** Direct restatement of Chapter 1's own non-negotiable list and Master Vision §17.5/§22: removing focus visibility is explicitly named, in this Bible's own foundational chapter, as an accessibility defect rather than a stylistic choice available for debate.

**Examples.** A custom-styled checkbox (Chapter 21) still shows a clear, visible focus ring around its full clickable area when tabbed to, even though its default browser styling has been visually replaced.

**When it applies.** To every focusable element in the system. **When it does not apply.** No exception.

### Kb-3 — Focus Traps Exist Only for True Modals, and Always Release Cleanly

**Purpose.** Focus is trapped within a component only when that component is a genuine modal overlay (Chapter 23's Dialog, or a backdrop-present Chapter 24 Drawer) — never for any non-blocking component. On close, focus returns precisely to the element that opened the trap, never to the page's top or a default, unrelated position.

**Reasoning.** Descends from Chapter 23's Dl-4 reasoning applied to keyboard behavior specifically: a focus trap is appropriate exactly where a component blocks the rest of the page, and inappropriate everywhere else — trapping focus inside a non-blocking component (a backdrop-less filter Drawer, Chapter 24) would prevent a keyboard user from doing something a mouse user can still do freely (interact with the page behind it), which is a strictly worse experience for keyboard users than for pointer users.

**Examples.** Closing a Dialog returns focus to the button that opened it, never to the page's `<body>` or its first focusable element by default.

**When it applies.** To every modal, and every non-modal component that must therefore *not* trap focus. **When it does not apply.** No exception — the rule cuts both ways equally.

### Kb-4 — Standard Key Bindings Are Never Repurposed

**Purpose.** Escape always closes or cancels the nearest dismissible context. Enter/Space always activates the focused element. Arrow keys always navigate within a bounded group (a menu, a tab list, a radio group) — none of these bindings is ever repurposed for a different, unexpected behavior anywhere in the system.

**Reasoning.** Descends from Principle 1 and Principle 2: a keyboard user builds a mental model of what each key does across the entire system; a component that repurposes Escape for something other than dismissal (submitting a form, for instance) breaks that model in a way that is far more disorienting via keyboard than an equivalent visual inconsistency would be via mouse, since the keyboard user has no visual cue to notice the deviation before triggering it.

**Examples.** Pressing Escape while a Dropdown (Chapter 26) is open closes the Dropdown — it never, in any component, triggers a form submission or a destructive action instead.

**When it applies.** To every use of these four key bindings, system-wide. **When it does not apply.** No exception.

---

## 4. COMPLETE DESIGN SPECIFICATION

**Standard key bindings, fixed system-wide:** `Tab`/`Shift+Tab` — move focus forward/backward, per Kb-1's order. `Enter`/`Space` — activate the focused element. `Escape` — close/cancel the nearest dismissible context (Dialog, Drawer, Dropdown, Tooltip). `Arrow Up/Down/Left/Right` — navigate within a bounded group (menu items, tabs, radio options) without leaving that group until Tab is pressed.

**Focus-trap components:** Chapter 23 Dialogs (always), Chapter 24 Drawers (only when a backdrop is present, per Chapter 24's Dw-2).

---

## 5. MEASUREMENTS

Focus ring: Chapter 3's `semantic.color.focus.ring`, 2px width, 2px offset (Chapter 39, Section 5) — no component-specific variation permitted without a documented, T-4-style exception.

---

## 6. BEHAVIORAL RULES

**Before shipping any interactive component.** Verify its tab order against its visual layout directly, per Kb-1, not by assuming the DOM order is already correct. **Under any modal's close action.** Return focus explicitly to the triggering element, per Kb-3, rather than relying on default browser behavior, which does not reliably do this correctly on its own.

---

## 7. MOTION SPECIFICATION

Focus ring appearance uses Chapter 15's Instant tier (80ms, per Chapter 39's Section 7) — keyboard feedback must feel immediate, with no perceptible delay between a keypress and its visible result.

---

## 8. ACCESSIBILITY

This entire chapter is an accessibility specification; its distinct contribution beyond Chapter 39's state-level Focus treatment is the *sequence and behavior* layer — order, trapping, and key-binding consistency — that a single state's visual definition alone cannot address.

---

## 9. RESPONSIVE BEHAVIOUR

Keyboard operability is required at every breakpoint without exception — a touch-primary Mobile device with an attached keyboard, or a switch-control accessibility device navigating a mobile viewport, must receive the identical tab order and key-binding behavior specified here, not a diminished version.

---

## 10. AI & FUTURE INTERFACES

A voice interface has no keyboard, but Kb-4's "never repurpose a standard binding" logic has a direct conversational analogue: standard conversational commands ("stop," "cancel," "repeat that") should behave identically across every AI-driven surface, never repurposed contextually in a way that breaks a user's learned expectation — Chapter 72 should inherit this reasoning directly.

---

## 11. DO / 12. DON'T

**Do:** A Dialog that traps focus while open and returns it precisely to its triggering button on close, with Escape reliably dismissing it from any focus position inside. **Don't:** A custom dropdown that repurposes the Down arrow key to scroll the entire page instead of moving between menu items — a direct Kb-4 violation that breaks the standard, learned meaning of that key.

---

## 13. ANTI-PATTERNS

**Silent focus suppression.** Removing a browser's default focus outline via a blanket style reset, without providing Chapter 39's replacement ring anywhere. This is detected by tabbing through the entire interface and checking that every stop shows a visible indicator, and fixed by restoring the ring per Kb-2.

---

## 14. QUALITY ASSURANCE CHECKLIST

- [ ] Does tab order match visual reading order across every page and component? *(Kb-1)*
- [ ] Does every focusable element show a visible focus ring with no exceptions? *(Kb-2)*
- [ ] Are focus traps present only in true modals, and does focus return correctly to the trigger on close? *(Kb-3)*
- [ ] Are Escape, Enter/Space, and Arrow keys used only for their standard, system-wide meaning? *(Kb-4)*

---

## 15. CROSS REFERENCES

Chapter 1 (P1, P2, non-negotiables). Chapter 3 (focus ring token). Chapter 6 (§8, reading order). Chapter 22, 23, 24, 26 (primary consumers of trap and binding rules). Chapter 39 (state model, Focus). Chapter 53 (full WCAG mapping, incorporates this chapter). Master Vision §17.5, §17.7, §22.

---

## 16. FUTURE EXPANSION

No open questions currently identified beyond ordinary per-component verification as new components are added to Volume II.

---

*End of Chapter 42. The next chapter, per the authoring sequence, is Touch & Gesture Standards.*
