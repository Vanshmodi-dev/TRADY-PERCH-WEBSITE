# CHAPTER 22 — TABLES & DATA GRIDS

**Trady Perch Design System Bible · Volume II: Components**
*First-canonical-draft. The component with the least direct Master Vision precedent of any in Volume II — the Master Vision was written for a marketing website with almost no tabular data. This chapter extends established principles into genuinely new territory rather than resolving an existing description, and should be read with that in mind.*

**Inherited From:** Master Vision §25.2 (Client Dashboard & Admin Panel — the future surface this chapter primarily serves). Design System Bible Chapter 1 (P2, P3, P7), Chapter 3 (color, C-4), Chapter 5, Sp-4 (density mode — this chapter is Sp-4's first real consumer), Chapter 17 (anatomy standard), Chapter 33 (Badges, the correct treatment for status cells), Chapter 39 (state model).

---

## 1. INTRODUCTION

The Master Vision's homepage has no tables — no dense, tabular data appears anywhere in the fifteen sections Chapter 13 specifies. But Master Vision §25.2 already commits the brand to a future client dashboard, and a dashboard without tables is not a realistic dashboard. This chapter exists to make sure that when tabular data does arrive, it arrives already governed by this system's existing discipline rather than reaching for whatever a generic data-grid library defaults to — which, almost universally, means dense borders, zebra-striping, and a color palette this brand's Chapter 3 does not contain.

This chapter depends on Chapter 5's Sp-4 directly — density mode was specified there in anticipation of exactly this chapter's need, and this chapter is where that anticipation is finally tested against a real component. It is depended on by Chapter 32 (Charts, which frequently pairs with tabular data in a dashboard context) and Chapter 28 (Breadcrumbs, whose primary near-term need is dashboard-level nested navigation this chapter's rows will often link into).

---

## 2. PHILOSOPHY

The rejected alternative is adopting a conventional data-grid visual language wholesale — heavy horizontal rules between every row, alternating row background colors (zebra striping) for scannability, a dense information architecture optimized purely for enterprise-software legibility with no attention to this brand's restraint principles. This is how nearly every dashboard looks, largely because data-grid libraries ship this look by default and few products deviate from it. This chapter rejects that default specifically because it is a default, per Principle 7 — Trady Perch's tables must be shown to actually need zebra-striping and heavy rules before adopting them, not inherit them merely because that's what tables "look like" elsewhere. What replaces it is a quieter table built from this system's existing hairline borders (Chapter 3) and generous, density-mode-governed spacing (Chapter 5) rather than a specialized, table-specific visual vocabulary.

---

## 3. CORE PRINCIPLES

### Tb-1 — Density Is Chapter 5's Whole-Scale Shift, Never a Bespoke Table Padding

**Purpose.** A table's "compact" or "standard" density is implemented exactly as Chapter 5's Sp-4 specifies: every relevant spacing role shifts one Core step uniformly, never as an independently invented, table-specific tight-padding value.

**Reasoning.** This is the direct fulfillment of the forward reference Chapter 5 made when it was written — Sp-4 existed specifically because this chapter's need was anticipated, and honoring that reference rather than reinventing density locally is Principle 7 applied to this Bible's own internal consistency, not merely to the product.

**Examples.** A dense financial table's row padding uses `semantic.space.padding.component-md` shifted one step down from its standard resolution, exactly as Chapter 5 defines the shift — never a custom `4px` row padding invented specifically for this table.

**When it applies.** To every table offering a density variant.

**When it does not apply.** To a table with only one density (no compact mode offered at all) — such a table simply uses standard spacing values directly, with no shift to apply.

**Common misunderstandings.** Assuming "compact" tables need a completely different visual language (thinner borders, smaller radius) beyond the spacing shift. Density, per Chapter 5's Sp-4, is specifically a spacing concept — border weight (Chapter 3) and other tokens remain constant across density variants unless independently justified.

### Tb-2 — Sort Direction Is Shown With Icon and Text Together, Never Icon Alone

**Purpose.** A sortable column header indicates its current sort state (ascending, descending, unsorted) with both an icon (Chapter 11) and, where space allows, a text label or accessible name — never relying on a small directional icon as the sole signal.

**Reasoning.** Direct extension of Master Vision §22's color-and-icon pairing rule into a new signal type this brand's existing content never had to specify: a small arrow icon alone is easy to misread at a glance (which direction does an upward arrow actually indicate — ascending or "currently sorted this way"?) and is exactly the kind of single-channel signal Chapter 39's Error/Success color-pairing logic already forbids for a different signal category.

**Examples.** A column header showing "Date ↓ (newest first)" as its accessible name, with the visible chevron icon (Chapter 11) as a quick visual scan aid layered on top of that unambiguous text.

**When it applies.** To every sortable column header.

**When it does not apply.** No exception.

**Common misunderstandings.** Assuming the icon alone is sufficient because "everyone knows what a down arrow means in a table." Familiarity with a convention is not the same as the convention being unambiguous or accessible — this principle requires the redundant, explicit signal regardless of how standard the icon convention has become elsewhere.

### Tb-3 — Row Actions Live in a Fixed, Rightmost Column

**Purpose.** Where a table row offers actions (edit, delete, view detail), those actions appear in a single, fixed column — always the rightmost column, at a consistent horizontal position across every row.

**Reasoning.** Descends from Principle 2: a user scanning down a column of actions relies on that column's horizontal position remaining constant; actions that shift position row to row (because, say, a row's label length pushes an inline action button around) force the eye to re-locate the target on every row rather than scanning a fixed position.

**Examples.** Every row's "View," "Edit," and "Delete" actions (Chapter 26, as an overflow menu if more than two actions exist, per Chapter 20's Nv-2-equivalent restraint) appear in a fixed-width final column, regardless of how long the row's other content runs.

**When it applies.** To every table offering row-level actions.

**When it does not apply.** No exception.

**Common misunderstandings.** Assuming a fixed-position action column must always be visible, even in a narrow viewport. Chapter 8's responsive rules may reasonably cause this column to become sticky (remaining visible while the rest of the row scrolls horizontally) rather than disappearing — the principle governs consistent position, not permanent visibility under all width constraints.

### Tb-4 — Status Cells Use Badges, Never Ad Hoc Cell Background Colors

**Purpose.** A cell representing a status (active, pending, error, complete) uses Chapter 33's Badge component, never an independently colored cell background.

**Reasoning.** Direct extension of Chapter 13's Il-4 diagram-color discipline and Chapter 3's C-1 closed palette to table cells specifically: an ad hoc "green background for active rows, red background for error rows" pattern — extremely common in generic data grids — would require exactly the kind of expanded, table-specific color set Chapter 3's closed sixteen-value palette exists to prevent.

**Examples.** A status column showing a small Badge component reading "Active" in `text.success` styling (Chapter 33), rather than tinting the entire row or cell background green.

**When it applies.** To every status-representing cell in any table.

**When it does not apply.** No exception.

**Common misunderstandings.** Assuming a very subtle, low-opacity background tint (rather than a bold fill) is a lesser violation and therefore acceptable. Any independently-defined cell background color, subtle or bold, still requires a token this chapter has not defined and Chapter 3 does not offer — the correct treatment is always the Badge component, regardless of how restrained the alternative might seem.

---

## 4. COMPLETE DESIGN SPECIFICATION

**Anatomy** (per An-1): Table Container → Header Row (column labels, optional sort controls per Tb-2) → Body Rows (data cells) → optional fixed Action Column (per Tb-3) → optional Footer Row (aggregate totals, pagination anchor per Chapter 35).

**Variant axes** (per An-2): **Density** — `standard`, `compact` (Chapter 5, Sp-4, per Tb-1). **Row interactivity** — `static` (data display only), `interactive` (row click navigates to a detail view, following Chapter 19's Cd-1 static/interactive distinction extended to rows).

**Token consumption:** `semantic.color.border.default` (row dividers, hairline only — no heavy rules), `semantic.color.text.primary`/`text.secondary` (primary data vs. metadata columns), `semantic.color.surface.card-hover` (interactive row hover, per Tb's extension of Cd-1), `semantic.space` roles per Chapter 5's density shift, Chapter 33's Badge tokens for any status cell.

---

## 5. MEASUREMENTS

- **Row divider weight:** hairline only (Chapter 3's `border.default`, ~10% opacity), never a heavier rule — consistent with this system's general avoidance of hard, high-contrast dividers (Chapter 6, §8's grid-line reasoning extended here).
- **Action column: fixed position, rightmost, consistent width across all rows.** *(Tb-3)*
- **Density shift:** exactly one Core spacing step down from standard, per Chapter 5's Sp-4 — never a custom, independently-chosen reduction.

---

## 6. STATE COVERAGE (per An-3)

| State | Treatment |
|---|---|
| **Hover** | Interactive rows only: `surface.card-hover` background tint, Quick tier. Static rows: no change. |
| **Focus** | Interactive rows: Chapter 39 default gold ring around the full row, in keyboard tab order. Sortable headers: gold ring on the header control. |
| **Active** | Interactive rows: brief background darkening on click, matching Chapter 19's card Active treatment. |
| **Disabled** | A row representing an unavailable record (Chapter 39 default opacity), typically paired with a Badge (Tb-4) explaining why. |
| **Loading** | The entire table body shows Chapter 31's skeleton treatment, row-shaped placeholders matching the real row height at the current density setting. |
| **Error** | A failed data fetch replaces the table body with a compact Error-state message (Chapter 3, C-4), never a table full of broken or blank rows. |
| **Success** | Not typically applicable to the table itself; a row-level action's success is confirmed via Chapter 25 (Toasts). |
| **Empty** | A table with no rows to display uses Chapter 38's Empty State treatment in place of the table body, never an empty white/black rectangle with only column headers visible. |

---

## 7. MOTION SPECIFICATION

Sort re-ordering animates row position changes using Chapter 15's Standard tier (300ms), so a user can visually track where each row moved to rather than experiencing an instant, disorienting re-shuffle. Row hover and focus transitions use Quick tier, matching Chapter 19's Card treatment for consistency between the system's two most common data-bearing surfaces.

---

## 8. ACCESSIBILITY

Tables use genuine semantic table markup (proper header associations, row/column relationships) so assistive technology can navigate cell-by-cell and announce column context correctly — a visually table-like grid built from generic, non-semantic containers fails this requirement regardless of how faithfully it reproduces the visual specification above. Sortable column controls are fully keyboard-operable, and their current sort state (Tb-2) is announced to assistive technology, not only shown visually.

---

## 9. RESPONSIVE BEHAVIOUR

At Mobile range (Chapter 8), a wide table with many columns either scrolls horizontally with the Action column remaining sticky (Tb-3's exception clause) or, where content permits, re-flows into a stacked card-per-row presentation (borrowing Chapter 19's Card anatomy) rather than forcing an unreadably compressed table onto a narrow viewport — this decision is made per-table based on its actual column count and content, not defaulted to one approach system-wide.

---

## 10. AI & FUTURE INTERFACES

A voice interface (Chapter 72) cannot meaningfully render a data grid at all — this chapter's Section 16 (Future Expansion) flags this honestly as a genuine translation gap rather than forcing a strained analogy; a voice-native equivalent to reviewing tabular data is closer to an AI agent proactively summarizing trends and outliers on the user's behalf than to any direct spoken rendering of rows and columns, which is a fundamentally different interaction pattern deferred to Chapter 71's future work.

---

## 11. DO

A compact-density client dashboard table showing case status, using a Chapter 33 Badge for the status column, hairline row dividers, a fixed rightmost action column, and Chapter 39's skeleton treatment while data loads — every principle in this chapter working together in one realistic future dashboard view.

## 12. DON'T

Applying a light-gray zebra-stripe background to alternating rows "for scannability," reasoning that it's a nearly universal table convention. This introduces a background tint Chapter 3's palette does not define for this purpose and privileges a generic convention over this chapter's own reasoning in Section 2 — the correct scannability aid in this system is generous row height and hairline dividers (Section 5), not alternating fills.

---

## 13. ANTI-PATTERNS

**Default data-grid inheritance.** Adopting whatever visual defaults a chosen data-grid library ships with — its borders, its zebra-striping, its status-color conventions — because building a fully custom table from this Bible's own tokens felt like unnecessary extra work for an internal-facing surface. This is dangerous for the same reason Chapter 16's "default inheritance" anti-pattern is dangerous: a dashboard is still a surface a client sees, and per Master Vision §25.10's One-Brand Test, a table that looks like it came from a generic admin-panel template rather than Trady Perch fails that test as surely as an unstyled invoice would. It is detected by checking any shipped table's borders, colors, and density against this chapter's specification directly, not against "does it look reasonable" in isolation. It is fixed by re-theming the table to this chapter's tokens before it ships to any client-visible surface.

---

## 14. QUALITY ASSURANCE CHECKLIST

- [ ] Does any density variant use Chapter 5's Sp-4 whole-scale shift, never a bespoke padding value? *(Tb-1)*
- [ ] Does every sortable column show its sort state with both icon and accessible text, never icon alone? *(Tb-2)*
- [ ] Are row actions in a fixed, rightmost column at a consistent position across every row? *(Tb-3)*
- [ ] Does every status cell use a Badge component rather than an ad hoc background color? *(Tb-4)*
- [ ] Does the table use genuine semantic markup rather than a visually-table-like but non-semantic layout?
- [ ] Does an empty table use Chapter 38's Empty State treatment rather than a bare header row with no body content?

---

## 15. CROSS REFERENCES

Chapter 1 (P2, P3, P7). Chapter 3 (color, C-4, C-1). Chapter 5 (Sp-4, this chapter's fulfillment of that forward reference). Chapter 8 (responsive stacking decision). Chapter 11 (sort icons). Chapter 13 (Il-4, the diagram-color discipline this chapter extends). Chapter 15 (motion). Chapter 17 (anatomy standard). Chapter 19 (Cd-1, row interactivity extension). Chapter 25 (Toasts, action-result confirmation). Chapter 26 (overflow action menus). Chapter 28 (Breadcrumbs, dashboard nesting). Chapter 31 (skeleton loading). Chapter 32 (Charts, frequent pairing). Chapter 33 (Badges, mandatory status treatment). Chapter 35 (Pagination, Footer Row anchor). Chapter 38 (Empty States). Chapter 39 (state model). Chapter 71 (AI-Native Interfaces, the voice-translation gap flagged here). Master Vision §25.2, §22.

---

## 16. FUTURE EXPANSION

**Documented limitations.** This entire chapter is reasoned in advance of any real client dashboard existing to test it against — every value and rule here should be treated as a strong first proposal, not a battle-tested specification, and revisited with real priority the first time an actual dashboard table is built.

**Documented assumptions.** This chapter assumes tabular data remains a secondary, dashboard-specific need rather than a primary marketing-site pattern — if a future homepage or case-study need for genuinely tabular content emerges, it should be evaluated against this chapter's rules rather than treated as an unrelated new pattern.

---

*End of Chapter 22. The next chapter, per the authoring sequence, is Dialogs & Modals.*
