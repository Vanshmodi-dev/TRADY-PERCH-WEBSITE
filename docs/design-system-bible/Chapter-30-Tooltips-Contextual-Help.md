# CHAPTER 30 — TOOLTIPS & CONTEXTUAL HELP

**Trady Perch Design System Bible · Volume II: Components**
*First-canonical-draft.*

**Inherited From:** Master Vision §18.11 (Tooltips). Design System Bible Chapter 1 (P4), Chapter 15 (motion), Chapter 17 (anatomy standard), Chapter 39 (state model).

---

## 1. INTRODUCTION

Master Vision §18.11 already specifies this component in unusual detail for a brief written before this Bible existed: appear quickly after a deliberate hover delay, content must genuinely clarify rather than restate what's visible. This chapter's job is comparatively narrow — giving that existing specification exact values and a complete anatomy.

This chapter depends on Chapter 15 for timing and is depended on by Chapter 59 (Documentation & Help Content Design), which relies on tooltip patterns extensively for in-context help.

---

## 2. PHILOSOPHY

The rejected alternative — tooltips restating a button's visible label, or appearing instantly on the slightest hover — is already rejected directly by Master Vision §18.11. This chapter's contribution is resolving §18.11's qualitative timing guidance ("appears quickly after a deliberate hover delay... not too slowly") into an exact value.

---

## 3. CORE PRINCIPLES

### Tt-1 — Content Clarifies; It Never Restates

**Purpose.** Tooltip content must add information not already visible — defining a term, explaining an abbreviation, giving a reason — never simply repeating a button's own visible label back to the user.

**Reasoning.** Direct restatement of Master Vision §18.11 and Principle 4: a tooltip that adds no information is a small, ambient annoyance appearing on every hover for no benefit.

**When it applies.** To every tooltip. **When it does not apply.** No exception.

### Tt-2 — A Deliberate Delay In, Immediate Removal Out

**Purpose.** A tooltip appears after approximately 400ms of sustained hover (long enough to avoid firing on incidental cursor pass-through) and disappears immediately, with no delay, the moment the cursor leaves.

**Reasoning.** Resolves Master Vision §18.11's qualitative guidance into an exact value, and applies Chapter 15's entrance/exit asymmetry (Mt-2) at its most pronounced — a noticeable entrance delay paired with an effectively instant exit.

**When it applies.** To every tooltip's timing. **When it does not apply.** No exception.

### Tt-3 — Never the Sole Carrier of Essential Information

**Purpose.** No task can only be completed by reading a tooltip — any information essential to using a feature correctly must also be available through a persistent, non-hover-dependent channel (a label, a helper text per Chapter 21).

**Reasoning.** A tooltip is inherently unavailable on touch devices without a deliberate long-press equivalent, and unavailable to a keyboard-only user unless they happen to tab to the exact trigger — treating it as the only source of essential information excludes both groups.

**When it applies.** To every tooltip's content. **When it does not apply.** No exception.

---

## 4. COMPLETE DESIGN SPECIFICATION

**Anatomy** (per An-1): Trigger (external) → Tooltip Panel (short text, no interactive content, no buttons) → directional pointer/arrow indicating the trigger.

**Token consumption:** `semantic.color.surface.card` (Chapter 3), `semantic.color.text.primary`, `semantic.elevation.card-hover` (Chapter 9), Chapter 4's Caption type step.

---

## 5. MEASUREMENTS

Appear delay: 400ms. Disappear delay: 0ms (immediate). Maximum content length: roughly one short sentence — a tooltip requiring multiple sentences to explain something is a signal that the content belongs in Chapter 59's documentation instead, linked from a persistent help affordance rather than crammed into a hover panel.

---

## 6. STATE COVERAGE (per An-3)

Not applicable in the usual eight-state sense — a tooltip has only two states, Visible and Hidden, governed entirely by Section 3's timing rules. No Hover/Focus/Active/Disabled/Loading/Error/Success/Empty states apply to the tooltip itself (its trigger element has its own states, governed by that element's own chapter).

---

## 7. MOTION SPECIFICATION

Entrance: Quick tier (150ms) fade, beginning only after the 400ms delay has elapsed — the delay and the animation duration are distinct values, per Tt-2. Exit: near-instant, effectively Instant tier, no lingering fade.

---

## 8. ACCESSIBILITY

A tooltip's content is also available via `aria-describedby` or equivalent association so a screen-reader user focusing the trigger hears the same clarifying content, satisfying the intent behind Tt-3 for that specific user group even where visual hover isn't the interaction path.

---

## 9. RESPONSIVE BEHAVIOUR

On touch devices, a tooltip may trigger via long-press rather than hover, or — more commonly in this system — simply not appear at all, since Tt-3 already guarantees no essential information depends on it being available there.

---

## 10. AI & FUTURE INTERFACES

A voice interface's equivalent is a brief, optional spoken clarification offered only if asked ("What does 'workflow automation' mean in this context?") — never volunteered unprompted, mirroring Tt-1's restraint.

---

## 11. DO / 12. DON'T

**Do:** A tooltip on an abbreviated metric label ("MRR") reading "Monthly Recurring Revenue." **Don't:** A tooltip on a "Save" button reading "Save" — restates the visible label with no added information, violating Tt-1.

---

## 13. ANTI-PATTERNS

**Redundant tooltips.** Adding a tooltip to every interactive element by default, regardless of whether its label is already self-explanatory. This is detected by checking whether tooltip content differs meaningfully from the trigger's own visible label, and fixed by removing tooltips that add nothing.

---

## 14. QUALITY ASSURANCE CHECKLIST

- [ ] Does the tooltip's content add information not already visible? *(Tt-1)*
- [ ] Does it appear after the defined delay and disappear immediately on cursor exit? *(Tt-2)*
- [ ] Is the same information available through a non-hover-dependent channel for touch and keyboard users? *(Tt-3)*

---

## 15. CROSS REFERENCES

Chapter 1 (P4). Chapter 3 (color). Chapter 4 (typography). Chapter 9 (elevation). Chapter 15 (motion, Mt-2). Chapter 17 (anatomy standard). Chapter 21 (persistent helper-text alternative). Chapter 59 (Documentation, for content exceeding tooltip scope). Master Vision §18.11.

---

## 16. FUTURE EXPANSION

No open questions currently identified — this chapter is a comparatively complete resolution of an already well-specified Master Vision section.

---

*End of Chapter 30. The next chapter, per the authoring sequence, is Skeleton Loaders & Loading Patterns.*
