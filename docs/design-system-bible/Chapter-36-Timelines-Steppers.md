# CHAPTER 36 — TIMELINES & STEPPERS

**Trady Perch Design System Bible · Volume II: Components**
*First-canonical-draft.*

**Inherited From:** Master Vision §18.5 (Timeline, "How We Work" treatment), §9.3 (Scroll Choreography — process-visualizing motion must match logical sequence). Design System Bible Chapter 1 (P6), Chapter 7 (Stacked Sequence pattern), Chapter 15 (motion), Chapter 17 (anatomy standard).

---

## 1. INTRODUCTION

Master Vision §18.5 already specifies this exact pattern for the "How We Work" section: each step's connecting line draws in only as the visitor scrolls to it, so the motion itself performs the promise of an orderly process. This chapter generalizes that specific treatment into a reusable component for any sequential content — a future onboarding flow, an audit-tool progress indicator.

This chapter depends on Chapter 7's Stacked Sequence pattern and Chapter 15 directly. It is depended on by any future multi-step process the roadmap introduces.

---

## 2. PHILOSOPHY

The rejected alternative is a Timeline whose steps simply appear all at once, styled attractively but with no relationship between the motion and the content's actual sequential meaning. Master Vision §9.3 already rejects this for "How We Work" specifically; this chapter's contribution is making sure the same reasoning is available, unmodified, the next time sequential content needs it.

---

## 3. CORE PRINCIPLES

### Tl-1 — The Connecting Line Draws in Sequence, Never All at Once

**Purpose.** A Timeline's connecting line (or a Stepper's progress indicator) animates its own drawing/filling in the same order the steps are read, triggered by scroll position or genuine process progress — never rendered complete instantly.

**Reasoning.** Direct restatement of Master Vision §18.5 and §9.3, and the clearest possible example of Principle 6 in this entire Bible: the animation does not decorate the process, it *is* the process, made visible.

**When it applies.** To every Timeline and Stepper. **When it does not apply.** No exception.

### Tl-2 — Every Step Is Exactly One of Three States: Complete, Current, or Upcoming

**Purpose.** Each step in a Timeline/Stepper shows one of exactly three states, each with a distinct visual treatment (Section 4) — never an ambiguous in-between state.

**Reasoning.** Descends from Principle 2: a user scanning a process needs to immediately locate where they are, which requires each step's status to be unambiguous at a glance.

**When it applies.** To every step. **When it does not apply.** No exception.

### Tl-3 — Six Steps Maximum; Beyond That, Group Into Phases

**Purpose.** A Timeline/Stepper displays at most six individual steps. A process with more granular steps groups them into phases, each phase shown as one Timeline step that expands to reveal its own sub-steps.

**Reasoning.** Descends from Principle 2 and Principle 7, consistent with this Bible's recurring small-ceiling pattern (Chapter 20's five, Chapter 26's four): a process too granular to fit six visible steps is more legible summarized into phases than crammed into an overlong single-level sequence.

**When it applies.** To any process exceeding six discrete steps. **When it does not apply.** To processes of six steps or fewer, shown in full.

---

## 4. COMPLETE DESIGN SPECIFICATION

**Anatomy** (per An-1): Connecting Line/Track → up to six Step Markers (icon or number) → Step Label/Description per marker.

**Variant axes** (per An-2): **Step state** — `complete` (filled marker, `accent.primary` or `text.success` depending on context, checkmark icon), `current` (outlined marker, `accent.primary`, pulsing per Chapter 39's Loading-adjacent treatment if the current step is actively processing), `upcoming` (outlined marker, `text.tertiary`, per Chapter 39's Disabled-adjacent opacity).

**Token consumption:** `semantic.color.accent.primary` (complete/current), `semantic.color.text.tertiary` (upcoming), Chapter 11 checkmark icon, Chapter 15's Standard tier for the drawing animation.

---

## 5. MEASUREMENTS

Maximum individual steps: 6 (Tl-3). Step states: 3, fixed (Tl-2).

---

## 6. STATE COVERAGE (per An-3)

This component's own "states" (Complete/Current/Upcoming, Tl-2) are the content states most other chapters treat as a single Content State layer — here they are the component's primary variant axis. Loading applies to a `current` step actively processing (Chapter 39's pulse, embedded in that step's marker). Error applies to a `current` step that failed, shown in `border.error` rather than `accent.primary`. Hover/Focus/Active apply only if steps are independently navigable (a Stepper allowing backward navigation to a completed step). Success: the final step reaching `complete` state. Empty: not applicable.

---

## 7. MOTION SPECIFICATION

The connecting line's fill animates using Chapter 15's Standard tier (300ms) per segment, triggered in sequence as either scroll position (Timeline) or actual process completion (Stepper) reaches each step — never all segments animating simultaneously, which would violate both Tl-1 and Chapter 40's Ag-2 ceiling.

---

## 8. ACCESSIBILITY

Each step's state (Complete/Current/Upcoming) is announced to assistive technology, not conveyed by marker color or fill alone — a screen-reader user must be able to determine process position without relying on the visual line-fill animation.

---

## 9. RESPONSIVE BEHAVIOUR

A horizontal Timeline (common for a short "How We Work" sequence) reflows to a vertical orientation at Mobile range (Chapter 8), preserving the same top-to-bottom or left-to-right reading order rather than requiring horizontal scroll.

---

## 10. AI & FUTURE INTERFACES

A voice interface's equivalent is the AI narrating process position aloud ("You're on step 2 of 4 — verifying your integration") — Tl-2's three-state clarity translates directly into spoken position-awareness.

---

## 11. DO / 12. DON'T

**Do:** The "How We Work" Timeline drawing its connecting line step by step as the visitor scrolls, each step clearly Complete, Current, or Upcoming. **Don't:** A Timeline that renders fully filled and complete on page load, with no relationship to scroll position — fails Tl-1 and the entire diegetic-motion premise this component exists to serve.

---

## 13. ANTI-PATTERNS

**Static timeline.** Building a visually timeline-styled component with no actual drawing animation, treating the design as purely decorative. This is detected by checking whether the connecting line's fill state ever changes in response to scroll or process progress, and fixed by implementing Tl-1's sequential draw.

---

## 14. QUALITY ASSURANCE CHECKLIST

- [ ] Does the connecting line draw in sequence, tied to scroll position or real process progress? *(Tl-1)*
- [ ] Is every step unambiguously Complete, Current, or Upcoming? *(Tl-2)*
- [ ] Does the component show six or fewer steps, with more granular processes grouped into phases? *(Tl-3)*

---

## 15. CROSS REFERENCES

Chapter 1 (P2, P6, P7). Chapter 7 (Stacked Sequence pattern). Chapter 11 (icons). Chapter 15 (motion). Chapter 17 (anatomy standard). Chapter 39 (state model, Loading/Error embedding). Chapter 40 (Ag-2 ceiling). Master Vision §9.3, §18.5.

---

## 16. FUTURE EXPANSION

The phase-grouping behavior for processes exceeding six steps (Tl-3) has not yet been tested against a real, long process and should be revisited once one exists.

---

*End of Chapter 36. The next chapter, per the authoring sequence, is Accordions & Expandable Content.*
