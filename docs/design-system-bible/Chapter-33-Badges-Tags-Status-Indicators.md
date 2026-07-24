# CHAPTER 33 — BADGES, TAGS & STATUS INDICATORS

**Trady Perch Design System Bible · Volume II: Components**
*First-canonical-draft.*

**Inherited From:** Design System Bible Chapter 1 (P3, P7), Chapter 3 (color, C-1's closed palette), Chapter 17 (anatomy standard), Chapter 39 (state model).

---

## 1. INTRODUCTION

Badges are small, high-frequency labels — industry tags on case studies, status indicators in a future dashboard, "active" markers throughout the system. Their small size and high frequency make them the component most vulnerable to uncontrolled color proliferation: a new status here, a new tag category there, each reasonably wanting its own color, until the system has quietly grown a second palette nobody approved.

This chapter depends on Chapter 3's C-1 directly — every Badge color must be one of the sixteen Core values, no exceptions. It is depended on by Chapter 15 (Portfolio & Case Study Philosophy's industry tags), Chapter 22 (Tables' status cells, per Tb-4), and Chapter 32 (Charts, for legend labeling).

---

## 2. PHILOSOPHY

The rejected alternative — letting each new status or category earn its own distinct color as it's introduced — was rejected on the same Principle 3 grounds Chapter 3 already establishes for the system generally: a badge system with an ever-growing color vocabulary cannot stay legible, because a user encountering a color they haven't seen before has no way to infer its meaning. A closed, small set of Badge colors, each with a fixed, memorized meaning, is what keeps the vocabulary learnable at all.

---

## 3. CORE PRINCIPLES

### Bd-1 — Exactly Four Badge Colors, Each With One Fixed Meaning

**Purpose.** Badges use exactly four color treatments, each permanently assigned one meaning: `neutral` (a category label, no status implication), `success` (a positive/complete status), `error` (a negative/failed status), `accent` (a rare, gold-highlighted "featured" or "recommended" marker).

**Reasoning.** Descends from Principle 3 and Chapter 3's C-1: four fixed meanings are memorable and auditable; an open-ended set is neither.

**Examples.** An industry tag ("Real Estate"): `neutral`. A dashboard row's "Active" status: `success`. A "Failed" status: `error`. A "Recommended" pricing-tier marker: `accent`, used rarely per Chapter 3's own gold-scarcity discipline.

**When it applies.** To every Badge in the system. **When it does not apply.** No exception.

### Bd-2 — Accent Badges Are Rarer Than Any Other Badge Color

**Purpose.** The `accent` (gold) Badge treatment is reserved for genuinely singular emphasis — at most one per view, mirroring Chapter 18's Bt-1 one-Primary-button logic.

**Reasoning.** Direct extension of Chapter 3's Gold Budget (C-5) and Principle 3 to this specific component: a grid of case-study cards where every card has a gold "Featured" badge has no featured card at all, in the sense that matters.

**When it applies.** To every use of the `accent` Badge treatment. **When it does not apply.** No exception.

### Bd-3 — A Badge Never Substitutes for a Full Sentence

**Purpose.** Badge label text is a short word or two-word phrase — never a sentence, never punctuated as prose.

**Reasoning.** Descends from Principle 2: a Badge's entire value is instant, at-a-glance categorization; a long label defeats that by requiring the same reading effort as ordinary body text while occupying a visually different, smaller-scale treatment.

**When it applies.** To every Badge label. **When it does not apply.** No exception.

---

## 4. COMPLETE DESIGN SPECIFICATION

**Anatomy** (per An-1): Container (small, pill or rounded-rectangle) → Label text → optional leading Icon (Chapter 11, 16px step).

**Variant axes** (per An-2): **Color** — `neutral`, `success`, `error`, `accent` (Bd-1). **Size** — `sm`, `md` (two sizes only, since Badges rarely need Chapter 18's full three-step range).

**Token consumption:** `semantic.color.text.secondary`/`border.default` (`neutral`), `semantic.color.text.success` (`success`), `semantic.color.text.error`/`border.error` (`error`), `semantic.color.accent.primary` (`accent`), `core.radius.full` (Chapter 27's population, reused here for the pill shape).

---

## 5. MEASUREMENTS

Badge color count: 4 (Bd-1). Maximum `accent` badges per view: 1 (Bd-2). Maximum label length: approximately two words.

---

## 6. STATE COVERAGE (per An-3)

Badges are typically non-interactive display elements; Hover/Focus/Active apply only where a Badge is explicitly made clickable (a filterable tag, per Chapter 24's Drawer filter panel), using Chapter 39 defaults identically to any small interactive element. Disabled/Loading/Error/Success/Empty are not applicable to the Badge component itself — `error` and `success` here are color *variants* representing external status, not the Badge's own internal state.

---

## 7. MOTION SPECIFICATION

A Badge's appearance (a status changing from `neutral` to `success`, for instance) transitions using Chapter 15's Quick tier (150ms), a brief color crossfade — never a bounce or scale flourish, consistent with Master Vision §17.5's "never celebratory" success-state guidance extended to this small component.

---

## 8. ACCESSIBILITY

Color is always paired with the label text itself carrying the meaning ("Active," "Failed") — never a color-only status dot with no text, satisfying Master Vision §22's color-pairing requirement by construction rather than as an added afterthought.

---

## 9. RESPONSIVE BEHAVIOUR

Badge size and label length remain constant across breakpoints; where horizontal space is genuinely constrained (a dense Mobile table row), the `sm` size variant is used rather than truncating label text unpredictably.

---

## 10. AI & FUTURE INTERFACES

A voice interface's equivalent is a brief spoken status qualifier ("this one's marked as active") — Bd-1's four-meaning discipline translates directly, since a spoken interface benefits even more than a visual one from a small, memorable, consistent vocabulary of status words.

---

## 11. DO / 12. DON'T

**Do:** An industry tag row using `neutral` badges for every category, with a single `accent` badge reserved for one genuinely featured case study across the whole grid. **Don't:** Introducing a fifth badge color (a distinct blue for "in progress") because neither `neutral` nor `success` felt quite right — resolve within the existing four per Bd-1, likely as `neutral` with a clarifying label ("In Progress") rather than a new color.

---

## 13. ANTI-PATTERNS

**Status-color sprawl.** Introducing a new badge color for each new status category as a dashboard's status vocabulary grows organically over time. This is detected by auditing the full set of colors in use across all Badge instances, and fixed by remapping any off-palette color to the nearest of the four fixed meanings, adjusting label text for clarity if the color alone was doing too much of the communicating.

---

## 14. QUALITY ASSURANCE CHECKLIST

- [ ] Does the Badge use one of exactly four fixed colors, each with its permanent assigned meaning? *(Bd-1)*
- [ ] Is the `accent` treatment used at most once per view? *(Bd-2)*
- [ ] Is the label a short word or phrase, never a full sentence? *(Bd-3)*
- [ ] Does the label text itself carry the meaning, independent of color?

---

## 15. CROSS REFERENCES

Chapter 1 (P2, P3, P7). Chapter 3 (C-1, C-5). Chapter 11 (icon). Chapter 15 (Portfolio tags). Chapter 17 (anatomy standard). Chapter 18 (Bt-1 parallel). Chapter 22 (Tb-4, mandatory status treatment). Chapter 24 (filterable tag use). Chapter 27 (radius population). Chapter 32 (chart legends). Chapter 39 (state model).

---

## 16. FUTURE EXPANSION

Should a genuine fifth meaning be identified, it must be shown insufficient against all four existing colors first, per Bd-1 and Principle 7 — this has not yet occurred.

---

*End of Chapter 33. The next chapter, per the authoring sequence, is Pagination & Disclosure Controls.*
