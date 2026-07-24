# CHAPTER 27 — TABS & SEGMENTED CONTROLS

**Trady Perch Design System Bible · Volume II: Components**
*First-canonical-draft.*

**Inherited From:** Master Vision §18.3 (Pricing interaction philosophy — selected-state calm clarity). Design System Bible Chapter 1 (P2, P3), Chapter 3 (color, C-4), Chapter 15 (motion), Chapter 17 (anatomy standard), Chapter 39 (state model).

---

## 1. INTRODUCTION

Tabs and segmented controls let a user switch between mutually exclusive views of content within a single region — pricing-tier comparisons, case-study detail sections. This chapter specifies the one behavior every such control shares: exactly one selection, always visibly indicated, never ambiguous.

This chapter depends on Chapter 3 (C-4's color-pairing discipline) and Chapter 39 directly. It is depended on by any future component needing content-switching within a fixed region.

---

## 2. PHILOSOPHY

The rejected alternative is a Tab control where the active tab is indicated by color alone — a common, minimal-effort implementation that fails the moment a colorblind user, or simply a user glancing quickly, cannot distinguish a subtle color shift from the surrounding inactive tabs. This chapter requires a second, position-based signal (an underline or filled background) precisely because Master Vision §22 already forbids color-alone signaling everywhere else in the system, and Tabs are no exception merely because the convention is common elsewhere.

---

## 3. CORE PRINCIPLES

### Tc-1 — Exactly One Tab Is Active at Any Moment

**Purpose.** A Tab group has exactly one active tab; selecting a new tab deactivates the previous one atomically, with no transitional state where zero or multiple tabs appear active.

**Reasoning.** Descends from Principle 2 — a tab group represents a single region's content, and that region can only be showing one thing at a time by definition.

**When it applies.** To every Tab group. **When it does not apply.** No exception.

### Tc-2 — Five Tabs Maximum; Beyond That, Use a Dropdown

**Purpose.** A Tab group displays no more than five options. Content requiring more than five mutually exclusive views uses Chapter 26's Dropdown/Select pattern instead.

**Reasoning.** Descends from Principle 7 and Chapter 20's Nv-1 reasoning applied to a sibling problem: a row of many tabs either wraps awkwardly or shrinks illegibly, and a ceiling matched to Chapter 20's own navigation-item discipline (five) keeps the system's "how many horizontal choices is too many" answer consistent across components.

**When it applies.** To every Tab group. **When it does not apply.** No exception.

### Tc-3 — The Active Indicator Combines Position and Color, Never Color Alone

**Purpose.** The active tab is indicated by both a position-based signal (an underline beneath it, or a filled background distinguishing it from its siblings) and a color shift — never color alone.

**Reasoning.** Direct application of Master Vision §22's color-pairing requirement, restated here because Tab controls are a common site of exactly this violation in generic implementations.

**When it applies.** To every Tab group's active-state indicator. **When it does not apply.** No exception.

---

## 4. COMPLETE DESIGN SPECIFICATION

**Anatomy** (per An-1): Tab List Container → up to five Tab items (label, active indicator) → associated Content Panel (external to the control itself, referenced by the active tab).

**Variant axes** (per An-2): **Style** — `underline` (text label with an animated underline beneath the active item, the default), `segmented` (a pill-shaped container with a solid filled background sliding to the active item, used for tighter, button-like contexts like a pricing-period toggle).

**Token consumption:** `semantic.color.accent.primary` (active underline/fill), `semantic.color.text.primary`/`text.secondary` (active/inactive labels), `core.radius.full` (a new Core value populated here for the `segmented` variant's pill shape).

---

## 5. MEASUREMENTS

Maximum tabs: 5. Underline thickness: 2px, matching Chapter 39's focus-ring weight for visual family resemblance between the system's gold indicator lines.

---

## 6. STATE COVERAGE (per An-3)

Hover: inactive tabs show a subtle text-color shift toward `text.primary`, Quick tier. Focus: Chapter 39 default ring around the focused tab. Active (pressed): brief compression, matching Chapter 18. Disabled: an unavailable tab (content not yet ready) uses Chapter 39's default opacity, remaining visible but non-selectable. Loading/Error/Success: apply to the associated Content Panel, not the tab control itself. Empty: not applicable to the control.

---

## 7. MOTION SPECIFICATION

The active indicator slides (rather than jump-cuts) from the previous tab to the newly selected one, using Standard tier (300ms), so the change in selection is visually traceable rather than an instant, disorienting jump — a direct application of Master Vision §9.1's diegetic-motion standard, since the sliding motion represents the actual relationship between the old and new selection.

---

## 8. ACCESSIBILITY

Implemented with proper tab/tabpanel semantic roles so assistive technology announces the selected tab and its association with the corresponding panel. Arrow-key navigation moves between tabs; Enter/Space or automatic activation on arrow movement (per platform convention) selects.

---

## 9. RESPONSIVE BEHAVIOUR

At narrow Mobile widths, a five-tab row may need horizontal scroll affordance rather than shrinking labels illegibly — the tab count ceiling (Tc-2) does not change, but its rendered width must remain legible even if that means the row scrolls.

---

## 10. AI & FUTURE INTERFACES

A voice interface's equivalent is the AI stating available views plainly ("I can show you the monthly or annual pricing — which would you like?") — Tc-2's five-option ceiling applies with even more force in speech, where more than a couple of spoken options quickly becomes hard to track.

---

## 11. DO / 12. DON'T

**Do:** A monthly/annual pricing toggle using the `segmented` variant, sliding fill, both position and color indicating the active period. **Don't:** A seven-tab row for seven case-study categories, shrinking each label to fit — rebuild as a Dropdown per Tc-2.

---

## 13. ANTI-PATTERNS

**Color-only active state.** Shipping a Tab control where the only difference between active and inactive is a subtle text-color shift, with no underline or fill. This fails Tc-3 and Master Vision §22 simultaneously; it is detected by checking any Tab implementation for a position-based signal independent of color, and fixed by adding the missing underline or fill treatment.

---

## 14. QUALITY ASSURANCE CHECKLIST

- [ ] Is exactly one tab active at any moment, with no ambiguous transitional state? *(Tc-1)*
- [ ] Does the tab group contain five or fewer options? *(Tc-2)*
- [ ] Does the active indicator combine position and color, never color alone? *(Tc-3)*

---

## 15. CROSS REFERENCES

Chapter 1 (P2, P3, P7). Chapter 3 (C-4). Chapter 15 (motion). Chapter 17 (anatomy standard). Chapter 18 (segmented-variant kinship to buttons). Chapter 20 (Nv-1, the ceiling this chapter reuses). Chapter 26 (Dropdown, the overflow destination). Chapter 39 (state model). Master Vision §18.3, §22.

---

## 16. FUTURE EXPANSION

**Documented limitations.** The `segmented` variant's pill radius (`core.radius.full`) is this chapter's first population of that specific Core value — consistent with the piecemeal Radius-scale note already flagged in Chapters 18 and 19, this should be consolidated later.

---

*End of Chapter 27. The next chapter, per the authoring sequence, is Breadcrumbs & Wayfinding.*
