# CHAPTER 26 — DROPDOWNS, MENUS & POPOVERS

**Trady Perch Design System Bible · Volume II: Components**
*First-canonical-draft.*

**Inherited From:** Master Vision §17.3 (Navigation — dropdown behavior), §18.2 (Navigation & Cursor, Extended). Design System Bible Chapter 1 (P2, P7), Chapter 9 (elevation), Chapter 15 (motion), Chapter 17 (anatomy standard), Chapter 20 (Navigation, Nv-2's sub-item ceiling, generalized here), Chapter 39 (state model).

---

## 1. INTRODUCTION

This chapter covers every floating, trigger-anchored overlay smaller than a Dialog or Drawer — navigation sub-menus, select-input option lists, context menus, and simple informational popovers. Chapter 20 already established the sub-item ceiling for navigation dropdowns specifically; this chapter generalizes that discipline to every anchored overlay in the system.

This chapter depends on Chapter 20 directly for its ceiling logic and Chapter 9 for elevation. It is depended on by Chapter 21 (select-input option lists), Chapter 22 (row-action overflow menus), and Chapter 29 (search result popovers).

---

## 2. PHILOSOPHY

The rejected alternative is letting each context (navigation, a select input, a table row's action menu) define its own anchoring, sizing, and item-count logic independently, since each looks superficially like a different UI problem. This was rejected because all three are structurally the same component — a small floating panel anchored to a trigger — and treating them as unrelated invites exactly the inconsistency Chapter 17 exists to prevent.

---

## 3. CORE PRINCIPLES

### Dp-1 — A Popover Always Anchors to Its Trigger

**Purpose.** Every Dropdown, Menu, or Popover's position is computed relative to the element that opened it, repositioning automatically if the trigger moves or the viewport resizes — it never appears at a fixed, independent screen position.

**Reasoning.** Descends from Principle 1: an overlay whose position is disconnected from its trigger breaks the traceable relationship between "what I clicked" and "what appeared," which is the entire basis for this component category being legible at a glance.

**Examples.** A table row's action menu (Chapter 22) opens directly beneath or beside that specific row's action-column trigger, following the row if the table scrolls.

**When it applies.** To every instance of this component.

**When it does not apply.** No exception.

### Dp-2 — Menu Items Follow the Same Four-Item Ceiling as Navigation

**Purpose.** Any menu or dropdown list contains no more than four items before requiring a "View All" or scrollable overflow treatment, generalizing Chapter 20's Nv-2 beyond navigation specifically.

**Reasoning.** Descends from Principle 7: Chapter 20 already derived and justified this ceiling once; reusing it here rather than deriving an independent number for a structurally identical problem is the correct application of Reuse Before Invention.

**Examples.** A row's action menu (View, Edit, Duplicate, Delete): four items, at the ceiling.

**When it applies.** To any short, discrete-choice menu.

**When it does not apply.** To a genuinely long, searchable list (a select input with fifty country options) — this is governed by Chapter 29's search-within-list pattern instead, not this chapter's short-menu ceiling.

### Dp-3 — Opens on Direct Interaction, Closes on Selection, Escape, or Outside Interaction

**Purpose.** A menu opens only on a direct click or keyboard activation of its trigger (never on mere hover alone, except where Chapter 20's navigation-specific hover-open convenience applies) and closes immediately upon item selection, an Escape keypress, or a click/focus outside the menu.

**Reasoning.** Descends from Principle 4: a menu that lingers open after a selection has already been made, or that opens accidentally on incidental hover, adds friction rather than removing it.

**Examples.** Selecting "Edit" from a row's action menu closes the menu immediately and navigates to the edit view, rather than leaving the menu open until manually dismissed.

**When it applies.** To every Dropdown, Menu, or Popover.

**When it does not apply.** To Chapter 20's navigation dropdown, whose hover-open convenience is a specifically justified exception documented there, not a general license extended here.

### Dp-4 — No Menu Opens a Second Menu

**Purpose.** A menu item never opens a nested flyout sub-menu. Where a choice genuinely requires a second level of selection, it is presented as a second, sequential menu state (replacing the first) rather than a cascading flyout beside it.

**Reasoning.** Descends from Principle 2, mirroring Chapter 23's Dl-4 no-nested-dialogs rule at this component's scale: a cascading flyout menu is a common enterprise-software pattern this brand's restraint explicitly avoids, per the same "bureaucratic rather than premium" reasoning Master Vision §7.2 already applies to mega-menus.

**Examples.** A menu offering "Export as..." with multiple formats replaces its own content with the format list (with a "back" affordance) rather than opening a second flyout panel beside the first.

**When it applies.** To every menu in the system.

**When it does not apply.** No exception.

---

## 4. COMPLETE DESIGN SPECIFICATION

**Anatomy** (per An-1): Trigger (external to this component, but the anchor reference per Dp-1) → Panel Container → up to four Items (Dp-2) or a scrollable/searchable list.

**Variant axes** (per An-2): **Trigger type** — `click`, `hover` (navigation-only exception, Chapter 20). **Content type** — `action-menu` (discrete choices), `select-list` (Chapter 21 input options).

**Token consumption:** `semantic.elevation.card-hover`-equivalent (a Raised-tier shadow, since a popover floats above its context similarly to a raised card), `core.radius.md` (Chapter 18's population), Chapter 3's standard text/border tokens.

---

## 5. MEASUREMENTS

- **Item ceiling: 4**, before overflow/scroll treatment. *(Dp-2)*
- **Nesting depth: 1** (no second-level flyout). *(Dp-4)*

---

## 6. STATE COVERAGE (per An-3)

Hover/Focus/Active apply per-item within the menu, using Chapter 39 defaults identically to a list of buttons. Disabled applies to individual unavailable items (shown at reduced opacity, not removed, so their existence remains discoverable). Loading/Error/Success/Empty apply to select-list content specifically (a search-driven select list may show a Loading state while fetching options, or Empty per Chapter 38 if no options match).

---

## 7. MOTION SPECIFICATION

Open/close use Quick tier (150ms), Entrance/Exit curves respectively, matching Master Vision §17.3's "soft, fast fade/settle" requirement — never a slide animation resembling a mobile accordion, which Master Vision explicitly identifies as cheapening the desktop experience.

---

## 8. ACCESSIBILITY

Full keyboard operability: arrow keys move between items, Enter/Space selects, Escape closes and returns focus to the trigger. The panel is announced with appropriate role and the currently highlighted item is announced as focus moves through it.

---

## 9. RESPONSIVE BEHAVIOUR

At Mobile/Tablet ranges, a Dropdown/Menu may reasonably render as a bottom-anchored Drawer (Chapter 24) instead of a small floating popover, since precise anchored positioning is harder to interact with reliably via touch — this is a deliberate component substitution, not a responsive resize of the same component.

---

## 10. AI & FUTURE INTERFACES

A voice interface's equivalent is the AI offering a short, spoken list of options ("I can export this as PDF, CSV, or an image — which would you like?") — Dp-2's four-item ceiling translates directly, since a spoken list longer than four options becomes difficult to hold in mind by the time the user needs to respond.

---

## 11. DO / 12. DON'T

**Do:** A four-item row-action menu that closes immediately on selection and repositions correctly if the table scrolls beneath it. **Don't:** An "Export as..." menu item that opens a second flyout panel of format options beside the first menu — rebuild as a sequential, replacing menu state per Dp-4.

---

## 13. ANTI-PATTERNS

**Flyout creep.** Adding a nested sub-menu because a single menu item genuinely has several sub-choices and a flyout felt like the fastest implementation. This is dangerous because it reintroduces the exact bureaucratic, enterprise-software feel this brand's navigation principles were built to avoid, one plausible addition at a time. It is detected by auditing any menu item that itself opens another floating panel. It is fixed by converting to Dp-4's sequential, replacing-state pattern.

---

## 14. QUALITY ASSURANCE CHECKLIST

- [ ] Does the panel's position track its trigger, including on scroll and resize? *(Dp-1)*
- [ ] Does the menu contain four or fewer items before requiring overflow/search? *(Dp-2)*
- [ ] Does selection close the menu immediately, with Escape and outside-click also closing it? *(Dp-3)*
- [ ] Does any multi-level choice use a sequential replacing state rather than a nested flyout? *(Dp-4)*

---

## 15. CROSS REFERENCES

Chapter 1 (P2, P7). Chapter 9 (elevation). Chapter 15 (motion). Chapter 17 (anatomy standard). Chapter 20 (Nv-2, generalized here). Chapter 21 (select-list consumer). Chapter 22 (row-action consumer). Chapter 23 (Dl-4 parallel). Chapter 24 (mobile substitution). Chapter 29 (search-driven lists). Chapter 39 (state model). Master Vision §17.3, §18.2, §7.2.

---

## 16. FUTURE EXPANSION

**Documented limitations.** The Mobile substitution to Drawer (Section 9) has not yet been tested for every context this component appears in — a very short four-item menu might reasonably remain a compact popover even on Mobile, and this should be resolved case-by-case rather than as a system-wide rule once real mobile usage is observed.

---

*End of Chapter 26. The next chapter, per the authoring sequence, is Tabs & Segmented Controls.*
