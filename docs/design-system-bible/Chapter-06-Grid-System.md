# CHAPTER 6 — GRID SYSTEM

**Trady Perch Design System Bible · Volume I: Foundations**
*First-canonical-draft.*

**Inherited From:** Master Vision §6.3 (Spacing & Grid Philosophy). Design System Bible Chapter 1 (P2, P7), Chapter 2 (resolution model), Chapter 5 (the spacing scale gutters and margins must be drawn from).

---

## 1. INTRODUCTION

Master Vision §6.3 permits — prefers — "asymmetric, intentional column spans... rather than perfectly even thirds, which tend to look like a generic template grid," and names a 5/7 split as an example. It does not fix the actual column count, gutter, or container width that split operates within. This chapter fixes them.

This chapter depends on Chapter 5 directly: every gutter and margin value used here must be a Core spacing step, never an independently chosen number. Chapter 7 (Layout) builds page-level composition on top of the grid defined here; Chapter 8 (Responsive) owns how this grid's values shift across breakpoints.

---

## 2. PHILOSOPHY

A grid system exists to make composition *fast and consistent*, not to make it *rigid*. The rejected alternative was a grid that only offers even, symmetrical divisions — halves, thirds, quarters — which is simpler to implement but produces exactly the "generic template" look §6.3 warns against by default, because even divisions are the path of least resistance for any grid system and therefore the signature of one that was never art-directed. This chapter's twelve-column base is chosen specifically because it divides asymmetrically (5/7, 4/8, 3/9) at least as easily as it divides symmetrically (6/6), which keeps the *interesting* splits equally convenient rather than requiring extra effort to reach for.

---

## 3. CORE PRINCIPLES

### Gr-1 — Twelve Columns, Asymmetric by Default

**Purpose.** The grid is twelve columns wide. The default, unmarked choice for any two-region layout is an asymmetric span (5/7, 4/8, 3/9) rather than an even one.

**Reasoning.** Descends from Master Vision §6.3 directly and Principle 2: an asymmetric split more naturally establishes which region is dominant, satisfying Singular Focus at the layout level; an even split withholds that signal by default.

**Examples.** A Solutions section pairing a headline with a supporting visual: 5 columns of text, 7 of visual (or the reverse), not 6/6.

**When it applies.** To any two-region horizontal composition.

**When it does not apply.** To compositions of three or more genuinely equal regions where symmetry itself is the intended message (see Gr-2) or to single-region, full-width (12/12) content, which is not a "split" at all.

**Common misunderstandings.** Assuming "asymmetric by default" forbids 6/6 outright. It does not — see Gr-2's exception clause. It sets the *default assumption* a designer starts from, which a genuine case for symmetry can override.

### Gr-2 — Even Thirds Requires Justification

**Purpose.** A three-way, even 4/4/4 division is permitted only where the content is genuinely, intentionally equal in weight — never used as a default convenience layout for "three things that happen to exist."

**Reasoning.** Master Vision §6.3 names even thirds specifically as the pattern that reads as generic. This principle makes that specific warning into a checkable gate: a designer reaching for 4/4/4 must be able to state why these three things are equal, not simply that there happen to be three of them.

**Examples.** Three pricing tiers, before a visitor has expressed a preference, are correctly, intentionally equal — this is one of the few legitimate 4/4/4 (or similar even) contexts in the entire system, and it is directly named as an exception in Chapter 1's own discussion of Principle 2. Three "How We Work" process steps sharing a row, by contrast, usually are not equal in the same sense — an earlier step often deserves more visual weight as an anchor — and should default to an asymmetric or sequential (not grid-parallel) treatment instead.

**When it applies.** To any three-or-more-region horizontal composition being considered for even division.

**When it does not apply.** To content already established elsewhere in this Bible as intentionally symmetric (pricing tiers, per Chapter 1's own P2 exception).

**Common misunderstandings.** Treating "three items exist" as sufficient justification on its own. The justification must be about the *relationship* between the items, not their count.

### Gr-3 — Gutters and Margins Are Spacing-Scale Citizens

**Purpose.** Every gutter and outer margin value used by the grid is one of Chapter 5's eleven Core spacing steps — never a value chosen independently for grid purposes alone.

**Reasoning.** Direct extension of Chapter 5's Sp-1 and Principle 7: a grid system with its own separate spacing scale would immediately fragment the single spacing discipline Chapter 5 exists to establish.

**Examples.** Desktop gutter: `core.space.6` (24px). Desktop outer margin: `core.space.8` (32px).

**When it applies.** To every gutter and margin value the grid defines, at every breakpoint.

**When it does not apply.** No exception — this is a closed application of an already-closed rule.

**Common misunderstandings.** Assuming a "grid gutter" is conceptually different enough from a "spacing gap" to warrant its own scale. It is not — both are instances of the same underlying relationship (space between siblings) that Chapter 5 already governs.

### Gr-4 — The Container Has Exactly Two Widths

**Purpose.** Content is laid out inside one of exactly two container types: a **Content container**, capped at a maximum width, and a **Canvas container**, which runs full-bleed edge to edge.

**Reasoning.** Descends from Principle 7 applied to container width specifically: an unlimited number of "slightly different max-widths for slightly different sections" is exactly the kind of proliferation Chapter 2's T-4 exists to prevent, generalized here to layout rather than color or spacing.

**Examples.** Body copy, cards, and most section content sit inside the Content container (max 1280px). A hero's background treatment or an image intended to bleed to the viewport edge sits inside the Canvas container, with its actual readable content still constrained to the Content width nested inside it.

**When it applies.** To every section's outer container choice.

**When it does not apply.** No exception — a section that seems to need a third, intermediate width is a signal that its Content-container padding needs adjusting (Chapter 5), not that a new container type is warranted.

**Common misunderstandings.** Believing "full-bleed" means "text also runs edge to edge." A Canvas-container section nearly always still nests a Content-container region inside it for anything meant to be read, per Chapter 4's 68ch measure — the Canvas width governs backgrounds and imagery, not reading text.

---

## 4. COMPLETE DESIGN SPECIFICATION

- **Columns:** 12.
- **Content container max-width:** 1280px.
- **Canvas container:** 100vw (full viewport width), no maximum.
- **Desktop gutter:** `core.space.6` (24px). **Desktop outer margin:** `core.space.8` (32px).
- **Mobile gutter:** `core.space.4` (16px). **Mobile outer margin:** `core.space.4` (16px).
- **Preferred two-region spans:** 5/7, 7/5, 4/8, 8/4, 3/9, 9/3 — asymmetric pairs summing to 12.
- **Permitted symmetric spans:** 6/6 (two genuinely equal regions), 4/4/4 (three genuinely equal regions, per Gr-2's gate).

---

## 5. MEASUREMENTS

- Column count: 12. Content max-width: 1280px.
- Gutter-to-margin ratio (desktop): 24:32 = 0.75. (mobile): 16:16 = 1.0 — margins and gutters converge to equal size on mobile, where the distinction between "space around content" and "space within content" matters less at a narrow viewport.
- Column width at max content width, 12 columns, 24px gutters: (1280 − 11×24) ⁄ 12 ≈ 84.7px per column at its narrowest calculated share — the exact rendered width in practice depends on box-sizing implementation, tracked here as a reference figure rather than a literal implementation instruction.

---

## 6. BEHAVIORAL RULES

**Before laying out any two-region section.** Default to an asymmetric span (Gr-1); require a stated reason to use 6/6.

**Before laying out any three-region section.** Apply Gr-2's justification gate before defaulting to 4/4/4.

**Under a proposal for a new container width.** Apply Gr-4's closed-set rule — the answer is almost always "adjust padding within the existing Content or Canvas container," not "add a third width."

---

## 7. MOTION SPECIFICATION

Grid-based layout shifts (a column reflowing at a breakpoint change, per Chapter 8) animate using Chapter 15's Standard timing tier, consistent with Chapter 5's Section 7 treatment of the same concern — grid and spacing motion are one behavior, specified once and referenced from both chapters rather than duplicated.

---

## 8. ACCESSIBILITY

Column reflow at narrow viewports must preserve reading order — a visually reordered column (common in CSS grid implementations, where visual order can diverge from source order) must never diverge from the logical document order a screen reader traverses, a requirement Chapter 53 will formalize in full but which this chapter's grid must be capable of satisfying by construction.

---

## 9. RESPONSIVE BEHAVIOUR

The twelve-column count itself does not change across breakpoints — what changes, owned by Chapter 8, is how many of those columns a given region spans (a 5/7 desktop split may collapse to a stacked 12/12 on mobile) and the gutter/margin values specified in Section 4.

---

## 10. AI & FUTURE INTERFACES

A spatial environment (Chapter 73) has no flat grid, but the same asymmetric-by-default reasoning (Gr-1) should govern how content is distributed across depth planes — an evenly-spaced arrangement of three-dimensional panels is exactly as generic-feeling, in a spatial context, as an evenly-thirded flat layout is here, and Chapter 73 should inherit this principle's reasoning rather than treat spatial composition as an unrelated problem.

---

## 11. DO

A case-study layout pairing a 7-column result narrative with a 5-column pull-quote or metric callout — asymmetric, with the wider column carrying the primary reading content, correctly signaling which region is dominant per Gr-1.

## 12. DON'T

Laying out three feature callouts in an even 4/4/4 row by default, simply because there are three of them, without asking whether they are actually equal in weight per Gr-2 — the generic "three-up feature grid" this pattern produces is precisely what §6.3 warns against.

---

## 13. ANTI-PATTERNS

**Default symmetry.** Reaching for 6/6 or 4/4/4 as the path of least resistance whenever a layout has two or three regions, rather than considering an asymmetric split first. This is dangerous because it is the single most common way a page ends up feeling like an unstyled template despite every individual section being competently designed — evenness is what every default grid tool offers, and resisting it requires an active choice this principle exists to prompt. It is detected by auditing the ratio of symmetric to asymmetric layouts across a finished page; a page with more even splits than asymmetric ones should be reviewed. It is fixed by revisiting each even split against Gr-1/Gr-2's justification requirement.

---

## 14. QUALITY ASSURANCE CHECKLIST

- [ ] Does a two-region layout default to an asymmetric span, with any 6/6 use specifically justified? *(Gr-1)*
- [ ] Does a three-region layout pass Gr-2's equal-weight justification before using 4/4/4?
- [ ] Are all gutters and margins drawn from Chapter 5's Core spacing scale, with no independently chosen grid-specific value? *(Gr-3)*
- [ ] Is every section using either the Content or Canvas container, with no third width introduced? *(Gr-4)*
- [ ] Does column reflow at any breakpoint preserve logical reading order?

---

## 15. CROSS REFERENCES

Chapter 1 (P2, P7). Chapter 2 (resolution model). Chapter 5 (spacing scale this chapter's gutters/margins are drawn from). Chapter 7 (Layout, built on this grid). Chapter 8 (breakpoint-specific span and gutter resolution). Chapter 53 (reading-order accessibility requirement). Master Vision §6.3.

---

## 16. FUTURE EXPANSION

**Possible future additions.** A dashboard context (Chapter 22) may eventually need a denser column count for tabular data specifically — this would be evaluated as a Component-tier exception to this chapter's page-level grid, not a change to the twelve-column base itself.

**Documented limitations.** The column-width reference calculation in Section 5 assumes a single, standard box-sizing model; it has not been verified against every possible implementation approach and should be treated as a reference figure, not an exact implementation guarantee.

---

*End of Chapter 6. The next chapter, Layout System, composes whole sections from the columns defined here.*
