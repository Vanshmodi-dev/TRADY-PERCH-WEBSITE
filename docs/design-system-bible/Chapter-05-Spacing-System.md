# CHAPTER 5 — SPACING SYSTEM

**Trady Perch Design System Bible · Volume I: Foundations**
*First-canonical-draft.*

**Inherited From:** Master Vision §3.2 (generous negative space as a luxury signal), §6.3 (Spacing & Grid Philosophy), §20.2 (Spacing Scale philosophy). Design System Bible Chapter 1 (P2, P3, P7), Chapter 2 (resolution model).

---

## 1. INTRODUCTION

Spacing is the category most vulnerable to invisible drift, because unlike a color or a typeface, a spacing value can be "close enough" and still look acceptable in isolation — which is exactly why Master Vision §20.2 identifies it as needing a resolved scale before anything else. This chapter is where that scale gets an actual base unit and an actual set of steps, closing the last open variable Chapter 2's architecture needed before any layout work could begin honestly.

This chapter depends on Chapter 1 (P2's "generous negative space" principle, restated at token scale) and Chapter 2 directly. Chapter 6 (Grid) and Chapter 7 (Layout) both build directly on the scale defined here; nearly every component chapter in Volume II consumes it for internal padding and external margin alike.

---

## 2. PHILOSOPHY

Two approaches were rejected. **A continuous, freely-chosen spacing range** — any pixel value a designer judges to look right — was rejected outright; §20.2 already names this as the specific failure this chapter exists to prevent, since an unscaled system fragments into dozens of near-identical, non-reusable values within a year. **A scale with too many steps**, offering fine-grained control at every increment, was rejected on the same Principle 7 grounds Chapter 2 applies to tokens generally: a spacing scale a designer cannot hold in memory does not actually constrain anything, it just offers the illusion of discipline while functioning as a continuous range in practice.

What remains is a small, base-unit-derived scale, where every larger value is legible, at a glance, as a deliberate multiple of a smaller one — never an arbitrary number that merely happens to sit near it.

---

## 3. CORE PRINCIPLES

### Sp-1 — The Eleven-Step, Base-4 Scale

**Purpose.** Every spacing value in the system is one of eleven Core steps, each a whole multiple of a 4px base unit.

**Reasoning.** Descends from P7. A base-4 unit is small enough to allow fine adjustment at the low end (icon-to-label gaps) and scales cleanly to the generous section padding §3.2 calls for at the high end, without needing a second, unrelated unit system for either extreme.

**Examples.** 4, 8, 12, 16, 24, 32, 48, 64, 96, 128, 192 — eleven values, each a clean multiple of 4.

**When it applies.** To every spacing decision — padding, margin, gap — anywhere in the system.

**When it does not apply.** To optical nudges of one or two pixels used to correct a specific rendering artifact (a glyph's visual weight sitting slightly off-center in its box) — these are documented exceptions, not spacing decisions, and are never generalized into a system value.

**Common misunderstandings.** Assuming eleven steps means eleven equally-likely choices for any given gap. In practice, Sp-3 below narrows the realistic choice for most component-versus-section contexts considerably.

### Sp-2 — Semantic Names Describe the Relationship, Not the Pixel Count

**Purpose.** A Semantic spacing token names what two things' relationship is — `gap.related-items`, `gap.section` — never the number it currently resolves to.

**Reasoning.** Direct extension of Chapter 3's C-2-equivalent naming logic (itself extending Chapter 2's T-3) to spacing: a token named `space-16` embeds its own resolved value into its name, which becomes misleading the moment that value is ever tuned.

**Examples.** Correct: `semantic.space.gap.related-items` → `core.space.8` (32px). Incorrect: `semantic.space.32`.

**When it applies.** To every Semantic-tier spacing token.

**When it does not apply.** To Core-tier tokens, which are permitted — expected — to name their own literal value, per the same tier logic Chapter 2 established for color.

**Common misunderstandings.** Believing a relationship-based name is less precise than a numeric one. It is more precise about the thing that actually matters — why the gap exists — and the Core reference still carries the exact number for anyone who needs it.

### Sp-3 — Section Padding Is Always at Least One Step Larger Than Component Padding

**Purpose.** Whatever Core step a component's internal padding uses, the section or page-level spacing surrounding that component uses a step at least one position higher on the eleven-step scale.

**Reasoning.** Direct operationalization of §3.2's "generous negative space is a luxury signal" at a checkable, relative rule rather than an absolute one — this holds regardless of which specific step a given component happens to use, since the *relationship* between inner and outer space is what actually produces the "breathing room" feeling, not any single value in isolation.

**Examples.** A card with 24px (`core.space.6`) internal padding sits inside a section using at least 32px (`core.space.8`) of surrounding gap — never the reverse, and never equal.

**When it applies.** To the relationship between any component's internal spacing and the layout spacing immediately surrounding it.

**When it does not apply.** To two components of the same type placed directly adjacent within a grid (two cards side by side), where the gap between them is a distinct, third relationship — governed by Chapter 6 (Grid), not by this principle.

**Common misunderstandings.** Assuming "one step larger" means "twice as large." The eleven-step scale is not uniformly doubling at every step (see Section 5); "one step" refers to position on the defined scale, not a fixed multiplier.

### Sp-4 — Density Modes Shift the Whole Scale, Never Individual Values

**Purpose.** Where a genuinely denser context is needed (a data table, per future Chapter 22), density is expressed as a single, systemic shift — every Semantic spacing role resolves one Core step lower than its default — never as one-off tightened values chosen per component.

**Reasoning.** Descends from P7 and Sp-2 together: a one-off tightened padding value on a single component under deadline pressure is a direct instance of Premature Invention: it solves one screen's density problem while quietly breaking Sp-3's relative-spacing guarantee everywhere that component appears elsewhere in its default context.

**Examples.** A future dashboard's "compact" table view shifts every relevant Semantic role down one step uniformly — a card's padding, a row's internal gap — rather than the Tables chapter defining its own bespoke tight-padding values independent of this scale.

**When it applies.** To any future need for a systematically denser presentation of existing components.

**When it does not apply.** To a single component's isolated need for tighter spacing that has nothing to do with overall density — that need should be resolved through the Resolution Question (Chapter 2), not through an ad hoc density shift applied to one component alone.

**Common misunderstandings.** Treating "density mode" as a license to skip Sp-1's eleven-step scale. A density shift moves *which* step a role resolves to; it never introduces a twelfth, off-scale value to hit a specific tightness target.

---

## 4. COMPLETE DESIGN SPECIFICATION

**Core scale (base unit: 4px):**

| Token | Value |
|---|---|
| `core.space.1` | 4px |
| `core.space.2` | 8px |
| `core.space.3` | 12px |
| `core.space.4` | 16px |
| `core.space.6` | 24px |
| `core.space.8` | 32px |
| `core.space.12` | 48px |
| `core.space.16` | 64px |
| `core.space.24` | 96px |
| `core.space.32` | 128px |
| `core.space.48` | 192px |

**Semantic roles:**

| Token | References | Use |
|---|---|---|
| `semantic.space.gap.icon-label` | `core.space.2` | Icon-to-adjacent-label gap. |
| `semantic.space.gap.related-items` | `core.space.4` | Between closely related inline elements. |
| `semantic.space.padding.component-sm` | `core.space.4` | Small component internal padding (badges, tags). |
| `semantic.space.padding.component-md` | `core.space.6` | Standard component internal padding (buttons, inputs). |
| `semantic.space.padding.component-lg` | `core.space.8` | Card internal padding. |
| `semantic.space.gap.stack` | `core.space.6` | Vertical rhythm between stacked elements within one component. |
| `semantic.space.gap.grid` | `core.space.8` | Between grid siblings (cards in a row), owned jointly with Chapter 6. |
| `semantic.space.padding.section-sm` | `core.space.16` | Minimum section padding (mobile). |
| `semantic.space.padding.section-lg` | `core.space.24` | Standard desktop section padding. |
| `semantic.space.padding.hero` | `core.space.32` | Hero-specific generous padding. |
| `semantic.space.margin.page-max` | `core.space.48` | Maximum single-purpose spacing reserve (rare, large breathing moments). |

---

## 5. MEASUREMENTS

- **Base unit:** 4px. **Total Core steps:** 11.
- **Progression, step to step:** ×2 (4→8), ×1.5 (8→12), ×1.33 (12→16), ×1.5 (16→24), ×1.33 (24→32), ×1.5 (32→48), ×1.33 (48→64), ×1.5 (64→96), ×1.33 (96→128), ×1.5 (128→192). The ratio alternates between 1.33 and 1.5 rather than holding one constant multiplier — a deliberate choice that keeps the low end fine enough for icon-level adjustments while still reaching genuinely generous section-level values within eleven total steps.
- **Sp-3's minimum relative gap:** one full Core step between a component's internal padding and its surrounding section padding, at minimum — e.g., `component-lg` (32px) sitting inside `section-lg` (96px) is a three-step gap, comfortably exceeding the one-step floor.

---

## 6. BEHAVIORAL RULES

**Before setting any gap or padding.** Identify the relationship it represents (per Sp-2) and select the Semantic role matching that relationship; do not select a Core value directly except when defining a new Semantic role for the first time.

**During review.** Check any component-section pairing against Sp-3's one-step-minimum rule.

**Under a request for a denser layout.** Apply Sp-4's whole-scale shift, never a one-off tightened value.

---

## 7. MOTION SPECIFICATION

Spacing values themselves do not move, but layout shifts driven by responsive resizing (Chapter 8) should animate between Core steps using Chapter 15's Standard timing tier where the change is visually significant enough to warrant smoothing — a section's padding jumping between breakpoints should settle, not snap, consistent with Master Vision §9.1's diegetic-motion standard applied to a genuine state change (the viewport itself changing).

---

## 8. ACCESSIBILITY

Adequate spacing between interactive elements is a direct touch-target and motor-accessibility requirement, not merely an aesthetic one — `gap.related-items` (16px) is the minimum acceptable gap between two independently tappable elements, consistent with the touch-target guidance Chapter 43 will formalize in full; a gap smaller than this between two separate controls is treated as an accessibility defect, not a density choice.

---

## 9. RESPONSIVE BEHAVIOUR

Semantic roles resolve to different Core steps at different breakpoints where Section 4's table specifies a range (`section-sm` for mobile, `section-lg` for desktop) — the role name stays constant; only the resolved step changes, per Chapter 2, Section 9 and Chapter 8's ownership of the resolution mechanism itself.

---

## 10. AI & FUTURE INTERFACES

A voice interface has no spatial spacing, but its direct pacing analogue — the pause between a statement and a follow-up question — should be considered against the same base-unit logic in spirit: a small, defined set of pause durations, not a continuously variable pause chosen ad hoc per response. Chapter 72 owns the actual values; this chapter's contribution is the precedent that even a non-visual "space" deserves a small, disciplined scale rather than a free-form range.

---

## 11. DO

A pricing card using `padding.component-lg` (32px) internally, sitting inside a pricing section using `padding.section-lg` (96px) — a three-step gap, comfortably satisfying Sp-3 and producing the generous, breathing layout §3.2 describes.

## 12. DON'T

Tightening a single card's padding from 32px to 20px "just for this one dense section" without applying Sp-4's systemic shift. This is a one-off, off-scale value — a direct Sp-1 violation — that will be copied by the next contributor who sees it in the codebase and assumes 20px is a sanctioned option.

---

## 13. ANTI-PATTERNS

**Eyeballed spacing drift.** Nudging a padding value by a few pixels "until it looks right" rather than selecting the correct existing Core step. This is dangerous because each individual nudge looks harmless, and the cumulative effect, across dozens of components over time, is a system that has quietly stopped using its own scale. It is detected by auditing any spacing value in the codebase that is not one of the eleven Core steps. It is fixed by moving to the nearest correct step and accepting the small visual shift, rather than preserving the off-scale value because it "already looks fine."

---

## 14. QUALITY ASSURANCE CHECKLIST

- [ ] Is every spacing value one of the eleven Core steps, with no off-scale nudge outside a documented optical exception? *(Sp-1)*
- [ ] Does every Semantic spacing token name the relationship it represents, not its resolved pixel value? *(Sp-2)*
- [ ] Does every component sit inside a section using at least one Core step more spacing than the component's own internal padding? *(Sp-3)*
- [ ] If a denser presentation is needed, has it been implemented as a whole-scale shift rather than a one-off tightened value? *(Sp-4)*
- [ ] Is the gap between any two independently interactive elements at least 16px?

---

## 15. CROSS REFERENCES

Chapter 1 (P2, P3, P7). Chapter 2 (resolution model). Chapter 6 (Grid, which owns `gap.grid`'s cross-sibling behavior jointly with this chapter). Chapter 7 (Layout, built on this scale). Chapter 8 (breakpoint resolution). Chapter 22 (Tables, the primary near-term consumer of Sp-4's density mode). Chapter 43 (Touch & Gesture Standards, which formalizes the touch-target minimum referenced in Section 8). Master Vision §3.2, §6.3, §20.2.

---

## 16. FUTURE EXPANSION

**Possible future additions.** A twelfth Core step may be warranted if a genuinely new context (a full-bleed spatial environment, Chapter 73) needs a value outside the current 4–192px range — added only once shown insufficient, per Sp-1.

**Documented assumptions.** This scale assumes a desktop-to-mobile range consistent with typical web viewports; an ultra-wide or foldable context (Chapter 9's future responsive work) may test whether `margin.page-max` (192px) remains the correct practical ceiling.

**Documented limitations.** Sp-4's density-mode shift has not yet been tested against a real, built dense table — it is specified here as a principle in advance of Chapter 22 actually needing it, and should be revisited once that chapter is written.

---

*End of Chapter 5. The next chapter, Grid System, arranges content within the rhythm this scale defines.*
