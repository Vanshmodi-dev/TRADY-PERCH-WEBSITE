# CHAPTER 4 — TYPOGRAPHY SYSTEM

**Trady Perch Design System Bible · Volume I: Foundations**
*First-canonical-draft: the typeface, scale, and pairing decisions below are this system's first complete, decisive proposal, offered in full rather than as options, per this chapter's own reasoning in Section 2.*

**Inherited From:** Master Vision §3.2 (typography as the primary design tool, not decoration), §6.2 (Typography System, in full), §20.8 (Typography Scale philosophy). Design System Bible Chapter 1 (P1, P2, P4, P7), Chapter 2 (resolution model), Chapter 3 (the text colors this scale is set against).

---

## 1. INTRODUCTION

Master Vision §3.2 makes an unusually strong claim for a brand document to make: that typography is "the primary design tool, not decoration." A claim that strong requires a specification equally strong to back it up, and §6.2 sets the direction — a refined geometric sans, extra-large and light rather than bold, no more than four sizes per viewport, generously tracked capitals, a constrained reading measure, oversized gold numerals. What it does not do, correctly, is name an actual typeface or commit to an actual pixel scale. That is this chapter's job.

This chapter depends on Chapter 1 directly (P2's four-size ceiling is a direct constraint on the scale defined here) and Chapter 3 (every type color is a Semantic token defined there). Nearly everything in Volume II depends on this chapter in turn — no component chapter can specify a label, a heading, or a button's text without a settled scale to draw from. Chapter 56 (UX Writing & Microcopy System) depends on this chapter's line-length and hierarchy rules to know what a "short enough" microcopy string actually means in practice.

---

## 2. PHILOSOPHY

A typography chapter for most brands is a comfort — pick a well-regarded typeface, apply a reasonable scale, move on. For a brand whose own constitution states that type is doing "the majority of the emotional work" in a near-monochrome, largely non-illustrative visual system (§3.2), that comfort is not available. Every decision here carries more weight than it would elsewhere, because there is less other decoration around to share the burden.

Two approaches were rejected. **Deferring the actual typeface choice** — describing only the *character* of a suitable family and leaving the specific selection to whichever designer eventually builds the first real screen — was rejected because it reintroduces exactly the "each contributor invents their own local convention" failure Chapter 2 already rejected for tokens. A brand whose primary design tool is typography cannot afford for that tool to be chosen ad hoc. **A strict, single-ratio geometric scale, applied uniformly from Display down to Caption** — mathematically elegant, and common practice in many type systems — was rejected for a more specific reason: §3.2's demand that Display and Headline sizes be "extra-large... light-to-regular weight," chosen for visual impact, is a different design goal from Body and Caption sizes being chosen for comfortable, sustained reading (§6.2's 60–75 character measure). Forcing both goals under one uniform mathematical ratio would compromise one to satisfy the other. This chapter accordingly builds two related but independently tuned progressions — a display-weighted upper range and a reading-optimized lower range — joined at Body-Large, rather than pretending a single ratio serves both jobs equally well.

---

## 3. CORE PRINCIPLES

### Ty-1 — The Eight-Step Scale, Four-Per-Viewport Ceiling

**Purpose.** The full type system contains exactly eight named steps (Section 4). Any single viewport may show no more than four of them simultaneously, per Master Vision §6.2 and Principle 2.

**Reasoning.** Descends from P2 directly. Eight steps give every component in Volume II a step to draw from without inventing a ninth; the four-per-viewport ceiling is what actually protects visual hierarchy, since a page could technically use all eight steps *somewhere* without ever showing more than four at once.

**Examples.** A hero viewport correctly uses Display, Body-Large, Caption, and Label — four steps. Adding H2 to that same viewport, even briefly, would make it five and would need to be justified as an exception, not treated as a minor addition.

**When it applies.** To any single, simultaneously visible viewport.

**When it does not apply.** To the full page considered end to end — a homepage moving from a Display-scale hero to an H2-headed FAQ section further down uses more than four steps in total across the scroll, which is expected and correct; the ceiling is a per-viewport constraint, not a per-page one.

**Common misunderstandings.** Counting weight or color variations of the same size as separate "steps" — they are not; a Body-sized string in `text.primary` and a Body-sized string in `text.secondary` are one type step used twice, not two.

### Ty-2 — Light-and-Large Is Deliberate, Never Bold-and-Large

**Purpose.** Wherever a type size reaches Display or H1 scale, its weight defaults to Light or Regular. Bold is never paired with the two largest steps in this system.

**Reasoning.** Direct restatement of §6.2: "Large and light is the specific combination that reads as confident rather than shouting." Bold-and-large is available to every template-driven competitor; light-and-large requires the confidence this brand claims to have, since a large, heavy headline reads as urgent, and urgency is forbidden by Principle 4 and Master Vision §5.5 alike.

**Examples.** The hero headline: Display, weight 300 (Light). A case-study result's oversized figure: set at H1 scale but in the numeral treatment defined by Ty-5, never rendered in a bold display headline weight.

**When it applies.** To Display and H1 steps specifically.

**When it does not apply.** To H2 and below, where a heavier weight (500–600) is permitted and, in fact, expected for genuine emphasis within body-adjacent content — the "never bold" rule is scoped to the two largest, most brand-carrying sizes, not to the whole scale.

**Common misunderstandings.** Assuming "light" means "thin to the point of poor legibility." Weight 300 at Display scale (56px and above) remains highly legible; the same weight at Caption scale would not be, which is exactly why this principle is scoped to the largest sizes only.

### Ty-3 — One Typeface Family, No Serif Register

**Purpose.** The system uses exactly one typeface family for all text, at every size, in every weight it offers. No serif, script, or secondary display face is introduced anywhere.

**Reasoning.** Direct application of §3.3: this brand's luxury register is precision-instrument, not editorial-fashion, and a serif accent face — however tastefully used — pulls toward the "heritage fashion house" register §3.3 explicitly rejects. One family, used consistently, is also a direct expression of P7: a second family would need to prove the first insufficient, and no such case exists.

**Examples.** A pull-quote in a future case study is set in the same family, at a larger size and lighter weight, never in an italic serif "quote face" the way editorial sites conventionally do.

**When it applies.** To every text element in the system, without exception.

**When it does not apply.** To code-formatted or tabular-data contexts (Chapter 22, Tables) where a monospaced numeral treatment may be considered — and even there, the *family*, not just the figure style, should be evaluated against this principle before a separate monospace face is introduced.

**Common misunderstandings.** Believing variety within one family (weight, size, tracking) is somehow less expressive than a second family would be. §3.2 states the opposite directly: constraint in typeface choice is what forces the *scale itself* to carry the expressive weight, which is the entire point.

### Ty-4 — Tracking Widens Only as Size Shrinks and Case Rises

**Purpose.** Letter-spacing (tracking) is added only at small sizes and/or all-caps treatments — Label and Caption steps, and any all-caps rendering of another step. Display through Body steps carry no added tracking.

**Reasoning.** §6.2: "a small amount of extra air on capital letters is a classic luxury-brand signature," specifically because tight tracking on small capitals looks cramped. The same logic does not apply to large, lowercase, mixed-case text, where added tracking would loosen letterforms that are already large enough to read comfortably and would begin to look like a display effect rather than a legibility aid.

**Examples.** The tagline "BUILD. AUTOMATE. GROW." — Label step, uppercase, +0.1em tracking. A Display-scale hero headline — no added tracking at all.

**When it applies.** To Label and Caption steps, and to any other step specifically rendered in all-caps.

**When it does not apply.** To Display, H1, H2, H3, and Body steps in their normal mixed-case rendering.

**Common misunderstandings.** Applying a uniform small positive tracking value "for polish" across the entire scale. This flattens exactly the distinction this principle is built to preserve — tracking is a signal reserved for small caps, not a general finishing touch.

### Ty-5 — Numerals Are Always Proof Points, Never Ambient

**Purpose.** Any numeral presented as a result, metric, or measurable claim (a percentage, a dollar figure, an hours-saved count) is set one step larger than its surrounding text, in `accent.primary` gold, using tabular figures — never rendered as ordinary body-colored, body-sized text.

**Reasoning.** Direct extension of §6.2's numeral rule and Master Vision Chapter 15's claim that measurable results are "the single highest-trust content type on the entire website." A numeral that looks like ordinary text is easy to skim past; this treatment makes it structurally impossible to miss.

**Examples.** "40% faster" inside a Body-set sentence: the "40%" is set at Body-Large scale in `accent.primary`, tabular, while the surrounding words remain Body scale in `text.primary`.

**When it applies.** To any numeral functioning as a business proof point (Master Vision Chapter 15's "Measurable Results").

**When it does not apply.** To incidental numerals with no proof-point function — a page number, a phone number, a year in a copyright line — which remain ordinary text at their surrounding step and color.

**Common misunderstandings.** Applying this treatment to every numeral indiscriminately, which would violate Principle 3 (The Scarce Signal) by turning a rare, meaningful gold accent into ambient decoration. The treatment is reserved specifically for numerals doing persuasive work, not numerals that merely happen to be numbers.

---

## 4. COMPLETE DESIGN SPECIFICATION

**Typeface.** Primary family: **General Sans** (a refined geometric grotesque with a light-to-semibold optical range), used at every weight the system requires. Fallback stack, for performance-critical or unlicensed contexts: **Inter**, followed by the operating system's default UI sans-serif. Both stacks share close enough metrics that a fallback substitution does not meaningfully disrupt the scale below. Numerals use the family's tabular figure OpenType feature wherever Ty-5 applies.

**The eight-step scale:**

| Step | Desktop size | Mobile size | Weight | Line-height | Tracking |
|---|---|---|---|---|---|
| Display | 96px | 56px | 300 (Light) | 1.05 | 0 |
| H1 | 56px | 36px | 400 (Regular) | 1.10 | 0 |
| H2 | 36px | 28px | 500 (Medium) | 1.20 | 0 |
| H3 | 24px | 20px | 500 (Medium) | 1.30 | 0 |
| Body-Large | 20px | 18px | 400 (Regular) | 1.50 | 0 |
| Body | 17px | 16px | 400 (Regular) | 1.60 | 0 |
| Caption | 14px | 13px | 400 (Regular) | 1.50 | 0 |
| Label | 12px | 12px | 600 (Semibold), uppercase | 1.40 | +0.10em |

**Maximum reading measure:** 68 characters (`ch` units), applied to Body and Body-Large text blocks, sitting inside Master Vision §6.2's stated 60–75 character range at a fixed, specific value rather than left as a loose target.

**Numeral treatment (Ty-5):** one scale step larger than surrounding text, `semantic.color.accent.primary`, tabular figures enabled.

---

## 5. MEASUREMENTS

- **Total named steps:** 8. **Maximum simultaneous steps per viewport:** 4. *(Ty-1)*
- **Display-to-H1 ratio:** 96:56 ≈ 1.71. **H1-to-H2:** 56:36 ≈ 1.56. **H2-to-H3:** 36:24 = 1.5. **H3-to-Body-Large:** 24:20 = 1.2. **Body-Large-to-Body:** 20:17 ≈ 1.18. **Body-to-Caption:** 17:14 ≈ 1.21. **Caption-to-Label:** 14:12 ≈ 1.17. The ratio compresses as size decreases — wider jumps at the display end (chosen for visual impact, per Section 2), tighter jumps toward the reading end (chosen for comfortable, granular hierarchy in body-adjacent content).
- **Reading measure:** 68ch maximum for Body/Body-Large blocks.
- **Tracking:** 0 for Display through Body; +0.10em for Label and any all-caps rendering.
- **Weight range in use:** 300, 400, 500, 600 — four of the family's available weights, not its full range, per Ty-1's discipline extended to weight as an implicit fifth dimension worth constraining the same way size is.

---

## 6. BEHAVIORAL RULES

**Before setting any text.** Identify its step from the eight defined here; do not interpolate a custom size "close to" an existing step.

**During review.** Count simultaneously visible steps in the viewport under review; flag anything exceeding four per Ty-1.

**Under a proof-point numeral.** Apply Ty-5's treatment automatically — this is not a discretionary enhancement, it is the required default the moment a numeral is functioning as a measurable claim.

**Under fallback-font substitution.** If General Sans fails to load, Inter substitutes automatically at identical size/weight/line-height values; no separate scale is maintained for the fallback stack, per Ty-3's one-family discipline extended to failure states.

---

## 7. MOTION SPECIFICATION

Type does not move on its own within this chapter's scope, but two motion-adjacent behaviors are fixed here for Chapter 15 to time: the letter-spacing "settling into place" during the intro sequence's wordmark resolution (Master Vision §9.2, step 4) animates the Label step's tracking value from 0 to +0.10em, never the reverse or any other value; and Ty-5's numeral count-up animation (Master Vision §18.4) always animates toward the exact tabular figure defined here, never an intermediate approximation.

---

## 8. ACCESSIBILITY

All eight steps inherit their color contrast obligations directly from Chapter 3, Section 8 — this chapter does not restate those ratios, since type and color are verified as a pair, not independently. Two additional, type-specific requirements: no Body or Body-Large text may be set below 16px on any viewport (the Mobile column in Section 4 already enforces this as a floor, not merely a suggestion), and line-height at Body/Body-Large (1.5–1.6) meets WCAG's minimum recommended spacing for readers with low vision or reading disabilities, consistent with Master Vision §22's readability requirement.

---

## 9. RESPONSIVE BEHAVIOUR

Each step carries both a desktop and mobile value in Section 4's table; tablet resolves to an interpolated value between the two, owned formally by Chapter 8 (Responsive & Breakpoint System). The *step itself* — which of the eight is used for a given piece of content — never changes across breakpoints; only its resolved size does, consistent with Chapter 2, Section 9's rule that a token's name never forks by context.

---

## 10. AI & FUTURE INTERFACES

A voice interface has no typography, but Ty-2's "light-and-large is confident, bold-and-large is urgent" logic has a direct pacing analogue Chapter 72 will need to resolve: a slower, more measured spoken cadence functions, for voice, the way a light Display weight functions for a hero headline. A spatial environment (Chapter 73) will need this eight-step scale re-verified at real, physical apparent sizes rather than flat pixel values — a Display-scale headline floating in a spatial environment does not automatically preserve its flat-screen proportions, and this is flagged as untested in Section 16.

---

## 11. DO

Setting a hero headline in Display, weight 300, with a Body-Large subheadline directly beneath it in `text.secondary` — two steps, clearly hierarchical, both within the four-step viewport ceiling with room to spare for a Label-step eyebrow above the headline if needed.

## 12. DON'T

Setting a hero headline in Display at weight 700 "for more impact." This directly violates Ty-2 — the added weight does not communicate more confidence, it communicates urgency, which contradicts the composed register Master Vision §2.2 requires at exactly the moment the brand is making its first impression.

---

## 13. ANTI-PATTERNS

**Scale interpolation.** Choosing a custom size "between H2 and H3" because neither felt quite right for a specific headline. This is dangerous because it is the typographic equivalent of Premature Invention (Chapter 1, Section 13) — a ninth, undocumented step that will be copied by the next contributor who sees it and assumes it's sanctioned. It is detected by auditing any font-size value that does not match one of the eight steps in Section 4 exactly. It is fixed by moving the content to the nearest correct step and adjusting surrounding hierarchy if the fit still feels wrong, rather than inventing a size to paper over a hierarchy problem.

**Ambient gold numerals.** Applying Ty-5's proof-point treatment to every number on a page — a copyright year, a phone number, a step count in a numbered list — rather than reserving it for genuine measurable claims. This is dangerous because it is a direct violation of Principle 3 at the typographic layer: gold numerals stop reading as significant the moment they appear everywhere. It is detected by checking whether a given gold numeral is actually functioning as a business proof point per Master Vision Chapter 15, or merely happens to be a number. It is fixed by demoting non-proof-point numerals to ordinary body-colored text at their surrounding step.

---

## 14. QUALITY ASSURANCE CHECKLIST

- [ ] Does every visible viewport use four or fewer of the eight type steps simultaneously? *(Ty-1)*
- [ ] Is Display or H1 ever paired with a bold weight? If so, has it been corrected to Light/Regular? *(Ty-2)*
- [ ] Is every text element set in the single primary family (or its defined fallback), with no secondary or serif face introduced? *(Ty-3)*
- [ ] Is added tracking present only at Label/Caption or all-caps renderings, never at Display through Body? *(Ty-4)*
- [ ] Is every proof-point numeral set one step larger, in `accent.primary`, tabular — and is every non-proof-point numeral correctly left untreated? *(Ty-5)*
- [ ] Does every Body/Body-Large block respect the 68ch maximum measure?

---

## 15. CROSS REFERENCES

Chapter 1 (P2, P4, P7). Chapter 2 (resolution model). Chapter 3 (text colors this scale is set against; Section 8's contrast obligations). Chapter 8 (tablet interpolation, Section 9). Chapter 15 (motion timing for the two type-adjacent animations named in Section 7). Chapter 56 (UX Writing & Microcopy, which depends on this chapter's hierarchy to know what "short enough" means in practice). Master Vision §3.2, §6.2, §20.8.

---

## 16. FUTURE EXPANSION

**Possible future additions.** A ninth step may eventually be warranted for a genuinely new context (a dense dashboard's micro-label, smaller than Caption) — added only once shown insufficient against the existing eight, per Ty-1's own logic applied reflexively.

**Documented assumptions.** This chapter assumes General Sans is licensable for Trady Perch's actual production use; if licensing proves impractical, the fallback stack (Inter) should be evaluated as a full primary-family replacement using this exact scale, rather than triggering a scale redesign — the numbers in Section 4 were chosen to work for either family's metrics.

**Documented limitations.** The scale has been verified for legibility reasoning and contrast (Section 8) but not yet tested against real multi-line reading fatigue at the 68ch measure across a full case study's length — a genuine future usability check, not assumed by this chapter's reasoning alone.

**Future research areas.** Whether this scale's proportions hold under Chapter 54's future internationalization work, where non-Latin scripts or significantly longer translated strings may strain the fixed 68ch measure and the tighter reading-end ratios defined in Section 5.

---

*End of Chapter 4. The next chapter, Spacing System, defines the rhythm this scale sits inside.*
