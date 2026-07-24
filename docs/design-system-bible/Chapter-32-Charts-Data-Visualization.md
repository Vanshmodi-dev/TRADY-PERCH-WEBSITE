# CHAPTER 32 — CHARTS & DATA VISUALIZATION

**Trady Perch Design System Bible · Volume II: Components**
*First-canonical-draft. The most technically and visually complex single component chapter in the Bible, and deliberately the last written in Volume II, since it draws on more prior chapters than any other single component.*

**Inherited From:** Master Vision Chapter 15 (Portfolio & Case Study Philosophy — "Measurable Results," the single highest-trust content type this component exists to serve). Design System Bible Chapter 1 (P2, P3, P7), Chapter 3 (color, C-1's closed palette and this chapter's sanctioned extension of it), Chapter 4 (typography, numeral treatment), Chapter 13, Il-4 (diagram-color discipline, extended), Chapter 15 (motion), Chapter 17 (anatomy standard), Chapter 30 (tooltip behavior), Chapter 33 (Badges, legend treatment), Chapter 39 (state model).

---

## 1. INTRODUCTION

Charts will appear in case-study results (Master Vision Chapter 15's "Measurable Results," the single highest-trust content type on the entire site) and any future client dashboard. A chart rendered in a charting library's default rainbow palette is one of the fastest ways to visually contradict an otherwise disciplined black-and-gold system, because most charting libraries default to a wide, arbitrary color set this brand cannot use unmodified.

This chapter depends on nearly every prior chapter in this Bible — it is the component chapter most dependent on the system as a whole, which is exactly why it was written last within Volume II. It is depended on by Chapter 22 (Tables, frequent pairing) and any future dashboard work.

---

## 2. PHILOSOPHY

The rejected alternative is adopting a charting library's default categorical palette — typically five to ten saturated, arbitrary hues chosen for maximum mutual distinguishability with no reference to any brand palette. This was rejected outright by Chapter 3's C-1 closure and Principle 3: an unbounded, library-default color set is the single largest available threat to this system's entire color discipline, since a chart can introduce more off-palette color in one component than every other chapter combined. What replaces it is a small, deliberately ordered data-series palette, extending Chapter 3's existing sixteen values by exactly one new, carefully justified hue — never a wholesale second palette.

---

## 3. CORE PRINCIPLES

### Cv-1 — Three Data Series Maximum; Beyond That, Use Small Multiples

**Purpose.** A single chart displays at most three distinct data series. A comparison requiring more than three is built as several smaller charts (small multiples) shown side by side, each with fewer series, rather than one chart with four or more overlapping series.

**Reasoning.** Descends from Principle 2: a chart with many overlapping series becomes illegible well before it becomes technically impossible to render — three is the practical ceiling at which each series remains individually traceable at a glance, consistent with this Bible's recurring pattern of small, enforced ceilings (Chapter 20's five nav items, Chapter 26's four menu items, each independently derived and each landing in a comparably small range).

**Examples.** A revenue comparison across five regions is built as five small single-series charts in a grid, not one five-line chart.

**When it applies.** To every chart in the system. **When it does not apply.** No exception — a genuine need for more simultaneous series is a signal that small multiples, not an expanded ceiling, is the correct answer.

**Common misunderstandings.** Assuming small multiples are a lesser, "cheaper" solution than a single complex chart. For comparison tasks specifically, research on graphical perception generally supports small multiples as *more* legible than an equivalent single multi-series chart, not merely more disciplined — this is a genuine usability improvement, not only a restraint-driven compromise.

### Cv-2 — Series Color Order Is Fixed: Gold, Then Slate, Then Gray

**Purpose.** A chart's data series are colored, in order, from a fixed three-color sequence: the first (typically the "hero" or featured metric) uses `accent.primary` gold; the second uses a new Core value, `core.color.slate.500` (a muted, desaturated blue-gray, introduced by this chapter specifically for categorical chart differentiation); the third uses `text.secondary` gray.

**Reasoning.** Descends from Chapter 3's C-1 and Principle 7: the existing sixteen values cannot serve this need without misusing colors already assigned other meanings (using `emerald` or `crimson` for a series with no actual positive/negative connotation would misapply Chapter 3's C-4 state-color logic to a context where no state is being represented). One new, neutral, cool hue — `slate` — fills a genuine gap the existing palette cannot serve, added under the same T-1/T-2 discipline any other new Core value requires, and is a legitimate exception explicitly anticipated by Chapter 3, §16 and Chapter 33's Bd-1 note.

**Examples.** A chart comparing "This Client" against "Industry Average": Series 1 (This Client) in gold, Series 2 (Industry Average) in slate — the client's own result correctly reads as the hero series, the comparison point correctly reads as secondary.

**When it applies.** To every multi-series chart. **When it does not apply.** To a single-series chart, which uses gold alone, with no need to invoke the sequence.

**Common misunderstandings.** Assuming `slate` can be reused elsewhere in the system now that it exists, since Chapter 2's proposal process technically approved it. Its approved role is specifically categorical chart differentiation (Cv-2) — using it decoratively elsewhere would need its own separate justification against Chapter 2's T-4, exactly as any other token's reuse outside its approved role would.

### Cv-3 — Charts Are Flat; No 3D Perspective, No Decorative Depth

**Purpose.** Every chart renders in genuine two dimensions — no 3D-perspective bar or pie charts, no drop shadows or bevels applied to chart elements themselves for decorative effect.

**Reasoning.** Descends from Chapter 14's Rd-1 (material realism over geometric abundance) applied to data visualization specifically, and from the well-established finding that 3D perspective effects measurably distort a viewer's ability to accurately compare values (a "closer" 3D bar appears larger than an equal-value "farther" one) — this is a legibility failure, not merely a restraint preference, layered on top of this system's independent aesthetic reasons to avoid decorative depth.

**Examples.** A bar chart's bars are flat rectangles with Chapter 9's ordinary `elevation.card` treatment at most (a subtle, consistent shadow, never a chart-specific 3D extrusion).

**When it applies.** To every chart. **When it does not apply.** No exception.

### Cv-4 — Every Chart Has an Equivalent Text or Table Representation

**Purpose.** Every chart is accompanied by a text summary or an underlying data table containing the same information, available to any user who cannot perceive the visualization itself.

**Reasoning.** Direct extension of Master Vision §22's accessibility standard: a chart is an inherently visual medium, and Principle 8's "nothing important should rely on assumptions" (Chapter 1's Golden Rule, restated at the system level) requires that the same information remain available through a text-equivalent channel.

**Examples.** A "40% faster response time" chart is accompanied by the same figure stated in Chapter 4's numeral treatment as running text nearby — the chart illustrates a fact already stated in accessible text, rather than being the sole carrier of it.

**When it applies.** To every chart in the system. **When it does not apply.** No exception.

---

## 4. COMPLETE DESIGN SPECIFICATION

**Anatomy** (per An-1): Chart Title → Plot Area (axes, gridlines, data marks) → Legend (Chapter 33 Badge-style labels, per series) → optional Tooltip (Chapter 30, chart-specific hover behavior) → Text/Table Equivalent (Cv-4, may be visually adjacent or accessibly-hidden depending on context).

**Permitted chart types:** line, bar (vertical or horizontal), and a single-value "hero number" treatment (Chapter 4's Ty-5 numeral, technically not a chart but the most common "visualization" this brand actually needs). Pie and donut charts are permitted only for a genuinely part-of-whole relationship with three or fewer segments — beyond three segments, a bar chart is required instead, since pie/donut comparison accuracy degrades rapidly past a small segment count.

**Data-series palette (Cv-2), newly introduced:** `core.color.slate.500` = `#5B6B78` (a muted, desaturated blue-gray). Computed contrast against `core.color.black.950`: sufficient for graphical/UI-component use (3:1 threshold) but this value is never used for running text, consistent with Chapter 3's C-4 text/accent-weight split — a dedicated `slate.400` lighter step should be added under the same process if a future text use for this hue is ever justified.

**Axis and label typography:** Chapter 4's Caption step, `text.secondary`, tabular figures for any numeric axis.

**Token consumption:** `semantic.color.accent.primary` (Series 1), `core.color.slate.500` (Series 2), `semantic.color.text.secondary` (Series 3 and axis labels), Chapter 9's `elevation.card` (bar/plot-area shadow, per Cv-3), Chapter 33's Badge tokens (legend).

---

## 5. MEASUREMENTS

- **Maximum data series per chart: 3.** *(Cv-1)*
- **Series color sequence: gold → slate → gray, fixed order.** *(Cv-2)*
- **Maximum pie/donut segments: 3**, beyond which a bar chart is required.
- **New Core value introduced: 1** (`core.color.slate.500`), bringing Chapter 3's closed palette to seventeen values — the first addition since that chapter's original sixteen, made under full Chapter 2 T-1/T-2 discipline and explicitly anticipated by that chapter's own Section 16.

---

## 6. STATE COVERAGE (per An-3)

Loading: Chapter 31's skeleton treatment, shaped to the chart's approximate plot area rather than a generic rectangle. Error: a failed data fetch shows Chapter 3's Error text in place of the chart, with a retry action. Empty: Chapter 38's full Empty State treatment if there is genuinely no data to chart (distinct from an Error, per Chapter 39's St-2 and Chapter 38's Em-3). Hover: individual data points show Chapter 30's tooltip treatment (chart-specific: appears immediately on hover rather than Chapter 30's default 400ms delay, since hovering to inspect a specific data point is the chart's primary intended interaction, not an incidental pass-through). Focus/Active: apply to any interactive legend items (toggling a series' visibility). Disabled/Success: not typically applicable to the chart container itself.

---

## 7. MOTION SPECIFICATION

A metric numeral counting upward on first scroll into view (Chapter 4's Ty-5, Master Vision §18.4) uses Chapter 15's Deliberate tier (500ms) — a genuinely significant, one-time moment, never re-triggered on subsequent scroll past, per Master Vision §18.4's explicit warning against cheapening this exact animation through repetition. A line chart's line drawing in on first view uses Standard tier (300ms), left to right, matching Chapter 36's sequential-motion reasoning for a comparable "watch the value build" effect.

---

## 8. ACCESSIBILITY

Beyond Cv-4's text-equivalent requirement, every chart uses proper semantic markup (a table element for the underlying data, even if visually presented as a chart layered on top) so assistive technology can navigate the actual values directly. Color is never the sole differentiator between series — Chapter 33's Badge-style legend pairs each series' color with its name as text, and where practical, a secondary visual differentiator (line style: solid/dashed) reinforces the distinction for readers with color vision deficiency.

---

## 9. RESPONSIVE BEHAVIOUR

At Mobile range, a chart's plot area simplifies rather than shrinking illegibly — axis labels may reduce in frequency (showing every other tick rather than every tick), and a three-series chart may recommend its Cv-1 small-multiples treatment even more strongly at narrow widths, where three overlapping series become harder to distinguish in less horizontal space.

---

## 10. AI & FUTURE INTERFACES

A voice interface cannot render a chart at all — its equivalent, per Chapter 22's own honest flag on this exact gap, is an AI agent verbally summarizing the trend or headline figure a chart would otherwise show ("Response times have dropped 40% since the automation went live") rather than any attempt at a spoken rendering of a visual plot. This is the clearest instance in the entire Bible of a component with no meaningful direct translation to a non-visual medium, and Chapter 17's An-A10 requirement (an honest "no meaningful equivalent" answer) applies exactly here.

---

## 11. DO

A case study's "Response Time Improvement" section showing the 40% figure as a Ty-5 gold numeral in running text, accompanied by a simple two-series bar chart (Before: gray, After: gold) comparing the two values directly, with an accessible data table available beneath — Cv-1, Cv-2, and Cv-4 all satisfied together in the system's single most common real chart use case.

## 12. DON'T

Building a 3D-perspective donut chart with five segments in assorted bright colors to show a client's automation coverage across departments. This violates Cv-1 (five segments exceeds the three-segment pie/donut ceiling), Cv-2 (assorted bright colors ignore the fixed gold/slate/gray sequence entirely), and Cv-3 (3D perspective) simultaneously — essentially every principle in this chapter at once, and a strong signal the content should be rebuilt as a small-multiples bar treatment instead.

---

## 13. ANTI-PATTERNS

**Default library palette.** Shipping a chart using whatever color palette a charting library provides out of the box, because re-theming it to Chapter 3's tokens felt like unnecessary extra configuration for a single chart. This is dangerous for the identical reason Chapter 22's "default data-grid inheritance" anti-pattern is dangerous — a chart is one of the most visually prominent components in a case study, exactly the surface Master Vision Chapter 15 identifies as this brand's single highest-trust content type, and a library-default rainbow chart undermines that trust the instant it's seen. It is detected by checking any chart's rendered colors against Cv-2's fixed three-color sequence directly. It is fixed by re-theming to the correct tokens before the chart ships in any client-facing case study.

---

## 14. QUALITY ASSURANCE CHECKLIST

- [ ] Does the chart show three or fewer data series, with additional comparisons built as small multiples? *(Cv-1)*
- [ ] Does the series color sequence follow gold → slate → gray in that fixed order? *(Cv-2)*
- [ ] Is the chart rendered flat, with no 3D perspective or decorative depth effects? *(Cv-3)*
- [ ] Is an equivalent text summary or data table available for every chart? *(Cv-4)*
- [ ] Does a pie/donut chart contain three or fewer segments, with more complex part-of-whole data shown as a bar chart instead?
- [ ] Is color paired with a text legend and, where practical, a secondary visual differentiator?

---

## 15. CROSS REFERENCES

Chapter 1 (P2, P3, P7, P8). Chapter 2 (T-1/T-2, this chapter's new Core value). Chapter 3 (C-1, C-4, extended by exactly one value). Chapter 4 (Ty-5 numeral treatment). Chapter 9 (elevation). Chapter 13 (Il-4, extended). Chapter 14 (Rd-1 parallel). Chapter 15 (motion, Deliberate-tier numeral count-up). Chapter 17 (anatomy standard). Chapter 22 (Tables, frequent pairing and the voice-translation gap first flagged there). Chapter 30 (tooltip, chart-specific timing exception). Chapter 31 (loading skeleton). Chapter 33 (Badges, legend). Chapter 36 (line-drawing motion parallel). Chapter 38 (Empty State, distinct from Error per St-2). Chapter 39 (state model). Master Vision Chapter 15, §18.4, §22.

---

## 16. FUTURE EXPANSION

**Documented limitations.** The `slate.500` value and the three-series ceiling are this chapter's first-canonical proposals, reasoned in advance of any real chart having been built and shipped — both should be validated against an actual case-study chart at the earliest opportunity, since color visibility and series legibility are easier to verify against a real, rendered example than in specification alone.

**Documented assumptions.** This chapter assumes chart needs remain within the line/bar/simple-pie category described in Section 4; a genuinely novel visualization need (a network diagram, a geographic map) would require its own dedicated treatment, evaluated against this chapter's reasoning rather than forced into these three chart types.

---

*End of Chapter 32. This closes Volume II in full — every ordinary component the system currently anticipates now has a complete specification. The next chapters, per the authoring sequence, continue Volume III's Interaction & Behavior layer: Chapter 41, Microinteractions Catalog, followed by Chapters 42 through 48.*
