# CHAPTER 19 — TYPOGRAPHY PHILOSOPHY

**Trady Perch Hero Experience Bible · Part VI: The Sensory Language**
*First-canonical-draft. Implementation-independent.*

**Inherited From:** Master Vision §6.2 (light-to-regular display weight, never bold; ≤4 type sizes per viewport; widened tracking on all-caps labels; 60–75 character measure; tabular gold numerals for metrics). Design System Bible Ch. 4.
**Governs:** What typography *means* in the hero — the posture it transmits and the reasoning behind the inherited constraints.
**Does Not Govern:** Sizes, line heights, families, weights, or tokens. This chapter issues none.

---

## 1. THE POSITION

In a hero built from material, light, space, and three lines of text, **typography is the only element that is simultaneously the content and the form.** The same marks carrying the claim carry the company's posture — and carry the posture first, since shape, weight, and spacing are perceived before meaning is parsed.

**Type as posture.** Heavy, tight, condensed type reads as insistent. Light, generously spaced type reads as composed. Large-and-bold raises the voice; large-and-light speaks normally from a position of confidence.

§6.2's most consequential instruction is a parenthetical: display and hero weight is **"light-to-regular (never bold)."** Bold display type is how a surface *insists*, and insistence is the visual form of eagerness. A claim at large size and light weight makes the same statement at the same prominence without raising its voice — §2.2's Composed trait ("never raises its voice") in the channel where it is most visible.

**The counterintuitive consequence: scale is available and weight is not.** The hero may be typographically large. It may not be typographically loud. Those are separable, and the separation is the brand's typographic signature.

**Restraint as a hierarchy instrument.** §6.2 caps distinct sizes at four; Chapter 15 showed three rungs plus one utility scale consumes that exactly. Hierarchy is communicated by *difference*, and difference is legible only against a small set: with four sizes the relationship between any two is immediately apparent; with seven the reader must infer an ordering from subtle differentials — a pre-attentive grouping failure. **A hero needing a fifth size has a hierarchy problem, not a typographic one.**

**Measure, and the wide-viewport trap.** §6.2 constrains body copy to roughly 60–75 characters per line "even on wide desktop viewports" — the emphasis is in the source, anticipating the failure it prevents. On a wide display a text block expands because nothing visibly breaks. But reading comfort collapses well before layout does: long lines make the return sweep error-prone, and the reader loses their place in a way they experience as difficulty with the *content*. A claim set at 130 characters per line is judged less credible than the identical claim at 65. **Measure is a credibility setting, and one whose violation is invisible to the person who chose it, because designers work at fixed widths and readers do not.**

---

## 2. CORE PRINCIPLES

**Ty-1 — Scale without weight.** Prominence comes from size, space, and contrast — never weight. Stated as a principle because the instinct to bolden is strongest at exactly the moment the constraint matters most: when a reviewer says the headline "isn't landing." *Weight may vary within the light-to-regular range to distinguish rungs; reaching outside it for emphasis is forbidden.*

**Ty-2 — Four sizes, and the fifth is a hierarchy failure.** No more than four distinct sizes in the hero viewport; a request for a fifth is treated as a hierarchy defect. *Four is a ceiling, not a target — three is common and often stronger.*

**Ty-3 — Measure is a credibility constraint.** Line length stays within 60–75 characters at every viewport width, including the widest. *Exception: a single short display line set as a phrase rather than reading text, where no return sweep occurs. A qualifier running 110 characters on a wide display is reading text and is subject to it.*

**Ty-4 — Optical correctness over mathematical correctness.** Type is judged by what the eye perceives as aligned and evenly spaced, not what measurements report. Misalignment is detected pre-attentively without being locatable. Optical adjustments — punctuation alignment, spacing around large display text, tracking at size — are among the clearest signals a surface was made by someone who looked at it rather than only specified it. *Optical correction operates within the system's tolerances — a refinement of the last few units, not a replacement for the scale.*

**Ty-5 — Type carries the reduced-motion personality.** Where motion is unavailable, typography becomes the primary carrier of brand personality and must be resolved to that standard. Under `prefers-reduced-motion` the Ceremonial tier resolves to full static presentation; everything Phase 2 would have transmitted through timing must be transmitted statically. *The same type, correctly set, suffices — the requirement is that it be good enough to carry the load alone, which is a test of the ordinary composition.*

---

## 3. WHAT EACH PROPERTY COMMUNICATES

| Property | Toward | Reads as | Toward | Reads as | Hero position |
|---|---|---|---|---|---|
| **Weight** | Light | Composed, confident, expensive | Bold | Insistent, urgent, commercial | Light-to-regular; bold forbidden |
| **Size** | Large | Important, self-assured | Small | Deferential, dense | Large permitted — the sanctioned prominence channel |
| **Tracking (display)** | Open | Deliberate, unhurried | Tight | Efficient, compressed, urgent | Open; tight reads as anxious |
| **Tracking (all-caps)** | Widened | Legible, considered | Default | Cramped — caps need more | Widened, per §6.2 |
| **Measure** | 60–75ch | Comfortable, credible | Long | Effortful; credibility cost | Constrained at all widths |
| **Leading** | Generous | Calm, spacious | Tight | Dense, technical, hurried | Generous |
| **Case** | Sentence | Human, direct | ALL CAPS in body | Shouting; slower to read | Caps reserved for small labels |
| **Alignment** | Left | Predictable, scannable | Centred | Ceremonial; harder to scan | Left for reading text; centring is a choice with a cost |
| **Size count** | ≤4 | Clear hierarchy | >4 | Ambiguous ordering | Four maximum |

**On centring** — the one row where ceremonial instinct and reading requirement genuinely conflict. Centred type is harder to scan because each line's starting position varies, costing fluency; it also reads as more formal and composed, serving the brand. This Bible does not resolve it — a composition decision — but names the trade so it is made knowingly rather than by default.

---

## 4. THE GOLD NUMERAL RULE, AND WHY IT DOES NOT APPLY HERE

§6.2 specifies numerals as "tabular, slightly oversized, **in gold**, wherever a metric/result appears." A strong, distinctive signature — and one the hero must not use:

- The hero carries no metric (Tb-3); there is no result for a numeral to express.
- Gold in the hero is at its minimum allocation (§7.4, Lx-5).
- A gold numeral here would spend the device's distinctiveness at the one location where it cannot be attached to evidence, weakening it at every proof moment below (Lx-1).

The gold numeral is a proof-section device; its power comes entirely from where it is *not* used.

---

## 5. DO / DON'T

**Do.** Solve a headline that "isn't landing" by increasing the space around it rather than its weight or size. Isolation is the strongest saliency channel in a restrained hero, costs nothing from any budget, strengthens as everything else quietens, and preserves the light-weight posture carrying the composure signal. Weight is the one channel that cannot be increased without changing what the hero says about itself.

**Don't.** Add a fifth type size to accommodate content that does not fit the existing four. The size is not the problem — the content is a fourth hierarchy rung, and it will also break the load budget and require a fifth grouping resolved pre-attentively. Three constraints from three chapters converge on the same verdict, which reliably indicates a structural rather than typographic decision.

---

## 6. ANTI-PATTERNS

**Emphasis by weight.** Reaching for a heavier weight when a line needs prominence. Detected by comparing hero type against the light-to-regular range. Dangerous because it works — the line does become more prominent — while changing the posture from composed to insistent, which no reviewer is likely to name in the moment.

**The designer's viewport.** Setting type at one comfortable width and never checking the extremes. Detected by resizing continuously and measuring characters-per-line at the widest supported width. The most common typographic defect in otherwise well-made heroes, because it is invisible to everyone who works at a fixed window size.

**Scale inflation across releases.** Display size creeping upward as each new stakeholder finds the hero "quiet." Detected by comparing releases. The complaint is almost never about size — a hero reading as quiet usually has a specificity problem in its claim, and enlarging a generic line makes the genericness more prominent.

---

## 7. ACCEPTANCE CRITERIA

- [ ] No type exceeds the light-to-regular weight range. *(Ty-1)*
- [ ] Four or fewer distinct sizes in the hero viewport, at every breakpoint. *(Ty-2)*
- [ ] Measure within 60–75 characters at every supported width, measured rather than assumed. *(Ty-3)*
- [ ] All-caps labels carry widened tracking. *(§6.2)*
- [ ] Optical alignment checked at display scale. *(Ty-4)*
- [ ] The reduced-motion hero carries full personality through type and space alone. *(Ty-5)*
- [ ] No gold numeral in the hero. *(§4)*
- [ ] Any request to enlarge or embolden was checked against the claim's specificity first. *(§6)*

---

## 8. CROSS REFERENCES

Ch. 3 (Bp-2, Bp-3) · Ch. 4 (fluency; pre-attentive grouping) · Ch. 6 (the reduced-motion variant) · Ch. 7 (isolation) · Ch. 15 (the convergent four-size budget) · Ch. 18 · Ch. 20 · Ch. 28 (contrast and zoom). Master Vision §2.2, §6.2, §7.4. Design System Bible Ch. 3, Ch. 4.

---

## 9. STATUS

**Known unresolved inheritance.** No typeface has been selected. §6.2 gives only a directional brief — "similar in spirit to" Inter, General Sans, or Neue Montreal. This chapter is written family-independent: every principle holds for any typeface satisfying the brief. When one is selected, its optical characteristics may require refinements belonging in the Design System Bible, not here.

§3's interpretive table states directional readings well established in typographic practice but not measured against this brand's audience. The strongest rows (weight, measure, case) are robust; the subtler ones describe tendencies whose thresholds vary by family and size.

---

*End of Chapter 19. Chapter 20 addresses the channel this one repeatedly defers to.*
