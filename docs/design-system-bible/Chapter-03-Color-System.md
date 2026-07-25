# CHAPTER 3 — COLOR SYSTEM

**Trady Perch Design System Bible · Volume I: Foundations**
*First-canonical-draft: the exact values below are this system's first complete, decisive proposal for Trady Perch's palette. They are specified fully rather than left approximate, and they are subject to revision through the lifecycle process in Chapter 2 — but until formally revised, they are canon, and every chapter after this one may cite them as settled.*

**Inherited From:** Master Vision §6.1 (Color System & Rationale, in full), §7.4 (The Gold Budget), §22 (Accessibility Standards, contrast requirements). Design System Bible Chapter 1 (P1, P2, P3, P7, P8), Chapter 2 (the three-tier resolution model and Section 8's contrast-metadata requirement), Chapter 63 (naming casing).

---

## 1. INTRODUCTION

The Master Vision names the palette's identity — deep matte black, metallic gold used as a rare accent, a small set of supporting roles for text and state feedback — and gives the reasoning for each choice in full. It does not, and should not, specify an exact hex value; that resolution belongs here. This chapter turns §6.1's descriptive palette into the system's first fully specified Core color scale, the Semantic roles built on top of it, and the contrast obligations every pairing must satisfy before it ships.

This chapter depends on Chapter 1 in full and Chapter 2's resolution model directly — every value below is placed at Core, Semantic, or (rarely) Component tier using the Resolution Question, and named using Chapter 63's fixed casing. Nearly every subsequent chapter in this Bible depends on this one: Typography (Chapter 4) needs a text color to set against; Elevation (Chapter 9) needs a background to derive shadow tint from; every component chapter in Volume II consumes these Semantic roles directly; Chapter 32 (Charts) needs this chapter's neutral scale as the basis for a data-visualization sub-palette it will define on top of it; Chapter 52 (Dark Mode & Theming) inherits this chapter's contrast-metadata obligations in full.

---

## 2. PHILOSOPHY

A color system for this brand carries a constraint most color systems do not: it must be capable of *disciplined scarcity*, not merely *harmonious variety*. Most color-system philosophy is written for brands that want their palette used freely and often; Trady Perch's entire premium positioning depends on one color — gold — being used rarely enough to still mean something (§7.4, Principle 3). A color system built the way a typical consumer brand's is built, optimized for flexible, generous application, would be actively wrong here.

Three approaches were considered and two rejected. **A wide, expressive palette** — multiple accent hues, a broad range of tints for flexibility — was rejected outright; §6.1 is explicit that gold is the only accent, and a wide palette would immediately create pressure to use the "other" colors somewhere, diluting the very scarcity the brand depends on. **A minimal palette with no internal scale** — one exact value per named role, no steps — was rejected because it cannot represent hover, pressed, or disabled states without inventing ad hoc one-off values at the moment they're needed, which is exactly the Premature Invention anti-pattern Chapter 1 warns against. What remains, and what this chapter builds, is a **small, enumerated Core scale — seventeen values, not a hundred** — deep enough to cover every state a Semantic role will need, shallow enough that the full palette can be seen and audited in one sitting. (Sixteen at this chapter's original authoring; `emerald.400` was added in Milestone 7 through the exact justification process C-1 itself requires — see that principle's own note below.)

---

## 3. CORE PRINCIPLES

### C-1 — The Closed Core Palette

**Purpose.** The Core color tier consists of exactly seventeen values (sixteen at this chapter's original authoring; see the Milestone 7 note below), enumerated in Section 4. It is a closed set, not an open range.

**Reasoning.** Descends from P3 (a palette that can grow indefinitely cannot stay scarce) and P7 (a new value must be justified against every existing one before it is added).

**Examples.** A designer needing "a slightly different gray for this one context" checks the existing two gray steps first; if neither serves, the burden is on them to show why, not on the system to accommodate. `emerald.400` (Milestone 7) is the concrete case: `emerald.500` and `emerald.700` were both checked against the AA text-contrast need a new `surface.card` computation surfaced, both found insufficient (one too dark already, the other darker still), and only then was a new step added — see Chapter 53's accessibility conformance work and this chapter's own Section 8.

**When it applies.** To any proposed addition to the Core color tier.

**When it does not apply.** To Semantic or Component tier colors, which may reference the seventeen Core values in new combinations freely — the closure applies to raw values, not to the roles built from them.

**Common misunderstandings.** Assuming the count is an arbitrary round number. Sixteen was the specific count required to give every named role in Section 4 a working default plus one interactive-state step — not a target chosen for its own sake, and not a ceiling treated as sacred once a genuinely new role was proven necessary, which is exactly what happened once.

### C-2 — Gold Is Two Distinct Roles, Not One Hue With a Tint

**Purpose.** The Primary Accent (Gold 500) and the Secondary Accent (Champagne, Gold 300) are treated as two separate semantic roles, never used interchangeably even where visually similar.

**Reasoning.** §6.1 names them as separate roles with separate jobs — Gold 500 for CTAs and key numerals, Champagne for secondary emphasis "so the primary gold never has to compete with itself for attention within one screen." Collapsing them into "light gold / dark gold" variants of one role would erase that job separation and reintroduce exactly the competition §6.1 designed them to avoid.

**Examples.** A pricing tier's selected-state border: Gold 500. A subheadline's decorative underline: Champagne. Using Champagne for the CTA would under-signal it (P3 in reverse — using the *quieter* accent where the *loudest* one belongs); using Gold 500 for the underline would spend scarcity on a moment that does not need it.

**When it applies.** Anywhere either accent is used.

**When it does not apply.** To Core-tier definition itself, where both are legitimately part of the same hue family for the purpose of deriving one from the other visually — the distinction is a Semantic-tier, role-level one.

**Common misunderstandings.** Treating Champagne as "gold at lower opacity." It is a distinct Core value (Section 4), not an opacity transform of Gold 500 — an opacity-based approach would fail on any surface that isn't pure black, and would make the two roles' contrast behavior harder to reason about independently.

### C-3 — Every Text-on-Surface Pairing Ships With a Verified Ratio

**Purpose.** No Semantic text-color role is approved for use against a given Semantic surface without a calculated, recorded WCAG contrast ratio.

**Reasoning.** Operationalizes Chapter 2, Section 8's contrast-metadata requirement specifically for color. A palette can look tasteful and still fail real visibility for a meaningful share of visitors — recording the ratio is what turns "looks fine" into "verified."

**Examples.** Section 8 below records the ratio for every pairing this chapter defines; any future pairing must be recorded the same way before shipping.

**When it applies.** To every text-on-surface and icon-on-surface combination.

**When it does not apply.** To purely decorative color use with no informational content riding on it (a background gradient with no text over it, for instance) — contrast obligations apply to legibility, not to decoration that carries no reading task.

**Common misunderstandings.** Assuming a ratio only needs checking once, at design time, and not re-checked if a Core value is later refined. Any Core-tier edit that touches a value used in a recorded pairing invalidates that record until it is recalculated — this is one of the direct, ongoing costs of Chapter 2's cascade behavior, and it is a cost worth paying deliberately rather than discovering by accident.

### C-4 — State Colors Split Text-Weight From Accent-Weight

**Purpose.** Where a single conceptual color (error, success) must serve both as running text and as a lower-area accent (an icon, a border, a background tint), it is given two Core steps, not one — because WCAG's own threshold differs by use (4.5:1 for normal text, 3:1 for graphical objects and UI components).

**Reasoning.** Discovered directly while verifying this chapter's own pairings (Section 8): the single crimson value that reads correctly as a border or icon fails the stricter text threshold when set as running error copy. Rather than accept a failing pairing or force one value to serve two thresholds badly, this principle makes the split explicit and permanent.

**Examples.** Crimson 400 (lighter) is the Error *Text* role; Crimson 500 (the "true" brand crimson) remains the Error *Accent* role for icons, borders, and low-opacity backgrounds.

**When it applies.** To any state color used in more than one visual role.

**When it does not apply.** Where a state color is only ever used at one weight (a background tint that never carries text directly over it, for instance) — a single step suffices there, and adding a second would violate C-1's closure without cause.

**Common misunderstandings.** Assuming this split is a workaround or a compromise. It is the correct, precise application of WCAG's own differentiated thresholds — treating text and graphical accents as needing the same contrast floor is the actual imprecision this principle corrects.

### C-5 — No Screen May Exceed the Gold Budget

**Purpose.** Operationalize §7.4 and Principle 3 as an enforceable rule: gold (Gold 500 and Champagne combined) may never occupy more than roughly 10% of any single viewport's rendered surface area.

**Reasoning.** A principle stated only in prose is easy to violate gradually, one seemingly small addition at a time. This chapter makes the audit method concrete (Section 5) so the 10% ceiling is checkable, not merely aspirational.

**Examples.** A hero with a gold CTA and a gold underline beneath the headline is comfortably within budget; a hero that also adds a gold border around the entire viewport is very likely not, and should be measured before shipping, not assumed safe.

**When it applies.** To every shipped screen, checked at design-review time.

**When it does not apply.** To the intro sequence's one-time metallic reflection sweep (Master Vision §9.2, step 3), which is explicitly named as the system's one deliberate, unrepeated exception to ordinary scarcity rules — and which is, precisely because of that exception, never to be treated as a precedent for anything else.

**Common misunderstandings.** Measuring gold usage by counting *elements* rather than *area*. A single large gold element can exceed the budget on its own; several small gold accents (an underline, a numeral, a focus ring) can comfortably stay under it. Area, not count, is the correct unit.

---

## 4. COMPLETE DESIGN SPECIFICATION

### Core Tier — the seventeen values

| Token | Hex | Description |
|---|---|---|
| `core.color.black.950` | `#0B0B0D` | Primary background — the deepest, most neutral near-black in the system. |
| `core.color.black.900` | `#141416` | Secondary background — one perceptible step lighter, used to separate sections. |
| `core.color.black.850` | `#1C1C1F` | Card / graphite surface — resting state. |
| `core.color.black.800` | `#232327` | Card / graphite surface — raised or hovered state. |
| `core.color.white.050` | `#F5F4F1` | Primary text — warm-tinted off-white. |
| `core.color.gray.400` | `#A8A8AD` | Secondary text. |
| `core.color.gray.600` | `#6E6E74` | Tertiary text / disabled-state text. |
| `core.color.gold.300` | `#E7D9B8` | Champagne — Secondary Accent. |
| `core.color.gold.500` | `#C9A24B` | Gold — Primary Accent. |
| `core.color.gold.600` | `#B8903D` | Gold, pressed/active step. |
| `core.color.gold.900` | `#6B5324` | Gold, deepest step — reserved for rare high-contrast-on-light contexts (print, Chapter 60). |
| `core.color.emerald.400` | `#62BA98` | Success — Text role, added Milestone 7 (see Section 8): same hue/saturation as `emerald.500`, lightened by the same proportional step `crimson.500`→`crimson.400` already establishes, for text contexts `emerald.500` doesn't clear. |
| `core.color.emerald.500` | `#3E8C6E` | Success — Accent/border role. |
| `core.color.emerald.700` | `#2C6B53` | Success, pressed/active step. |
| `core.color.crimson.400` | `#C97873` | Error — Text role (see C-4). |
| `core.color.crimson.500` | `#A8443E` | Error — Accent role (icons, borders, low-opacity backgrounds). |
| `core.color.crimson.700` | `#7E332E` | Error, pressed/active step. |

### Semantic Tier — the roles built on the Core scale

| Token | References | Role |
|---|---|---|
| `semantic.color.background.primary` | `black.950` | Page background. |
| `semantic.color.background.secondary` | `black.900` | Section-separating background. |
| `semantic.color.surface.card` | `black.850` | Card resting surface. |
| `semantic.color.surface.card-hover` | `black.800` | Card raised/hover surface. |
| `semantic.color.text.primary` | `white.050` | Primary reading text. |
| `semantic.color.text.secondary` | `gray.400` | Supporting text, captions, metadata. |
| `semantic.color.text.tertiary` | `gray.600` | Disabled or de-emphasized text. |
| `semantic.color.accent.primary` | `gold.500` | CTAs, key numerals, active/selected indicators. |
| `semantic.color.accent.secondary` | `gold.300` | Subheadline emphasis, decorative underlines, hover glows. |
| `semantic.color.accent.pressed` | `gold.600` | Pressed/active state of any Gold 500 element. |
| `semantic.color.text.success` | `emerald.400` | Success confirmation copy. Re-pointed from `emerald.500` in Milestone 7 (see Section 8) — the original ref failed AA against `surface.card`. |
| `semantic.color.text.error` | `crimson.400` | Error copy (C-4 text role). |
| `semantic.color.border.error` | `crimson.500` | Error borders, icon fills (C-4 accent role). |
| `semantic.color.focus.ring` | `gold.500` | Keyboard focus indicator, per Chapter 2 §8. |
| `semantic.color.border.default` | `white.050` at 10% opacity | Hairline card and panel borders, per Master Vision §6.5. |

Component-tier color tokens are not pre-populated here; per Chapter 2's T-4, they are created only once a specific component chapter demonstrates the Semantic tier above is insufficient for its need.

---

## 5. MEASUREMENTS

- **Core palette size: exactly seventeen values** (sixteen at original authoring, plus `emerald.400` added Milestone 7). *(C-1)*
- **Gold Budget ceiling: 10% of rendered viewport area**, measured by summing the bounding area of every element using `accent.primary` or `accent.secondary` as a fill, stroke, or glow source, divided by total viewport area. Text set in a gold numeral counts by its rendered glyph area, not its full bounding box, per the spirit (not letter) of §7.4's ceiling.
- **Minimum contrast ratios:** 4.5:1 for normal text, 3:1 for large text (24px/18.66px bold and above) and graphical/UI-component contrast, per WCAG 2.1 AA — the floor this chapter's Section 8 verifies every pairing against, with AAA (7:1 / 4.5:1 respectively) preferred wherever achievable per Master Vision §22.
- **Core step count per hue family:** neutrals (black) — 4 steps; white — 1 step; gray — 2 steps; gold — 4 steps; emerald — 3 steps; crimson — 3 steps. No family exceeds 4 steps without a documented reason.

---

## 6. BEHAVIORAL RULES

**Before a new color is proposed.** The Resolution Question (Chapter 2) is run first: does this need a new Core value, or does an existing Semantic role already cover it? C-1's closure means the expected answer, in the overwhelming majority of cases, is the latter.

**During review.** Every text/surface pairing introduced by a new component is checked against Section 8's recorded ratios, or a new ratio is calculated and recorded if the pairing is genuinely new.

**Under a Core-tier edit.** Any change to one of the seventeen Core values invalidates every recorded contrast ratio built on it until recalculated (C-3) — this is treated as a mandatory, blocking step of the edit, not a follow-up task that can be deferred.

**Under a proposal to add a new Core value.** The proposer must show, specifically, which of the existing values (and which Semantic combination of them) was checked and found insufficient, per C-1 and Chapter 2's T-4/T-2 — exactly the record C-1's own Examples entry now keeps for `emerald.400`.

---

## 7. MOTION SPECIFICATION

Color does not itself specify motion, but two of its values are consumed directly by motion: `accent.primary`'s glow (Master Vision §6.5, §9.4) and the intro sequence's one-time metallic sweep (§9.2) are both color-sourced effects whose timing belongs to Chapter 15. This chapter's contribution is ensuring the glow's source color is exactly `gold.500` — never a separately defined "glow gold" — so that Chapter 15's motion values and this chapter's color values never drift apart into two slightly different-looking golds.

---

## 8. ACCESSIBILITY

The following ratios are calculated using the WCAG relative-luminance formula against this chapter's own Core values, and are recorded here as the first entries in the living contrast record Chapter 2, Section 8 requires:

| Pairing | Ratio | Verdict |
|---|---|---|
| `text.primary` (`white.050`) on `background.primary` (`black.950`) | **17.9 : 1** | Passes AAA. |
| `text.secondary` (`gray.400`) on `background.primary` | **8.3 : 1** | Passes AAA. |
| `accent.primary` (`gold.500`) on `background.primary` (numerals, icons) | **8.2 : 1** | Passes AAA. |
| `text.success` (`emerald.400`) on `background.primary` | **8.42 : 1** | Passes AAA (was recorded as 6.8:1 at first — recomputed and corrected during Milestone 7's own review). Re-pointed here from `emerald.500` in Milestone 7 — see the two rows immediately below. |
| `text.success` (`emerald.500`, superseded — kept for the historical record) on `background.primary` | **4.85 : 1** | Passed AA (normal text) here, but this was never the binding case — see the next row. |
| `text.success` (`emerald.500`, superseded) on `surface.card` | **4.19 : 1** | **Failed AA.** Not caught at authoring time because this chapter's own Section 8 had only ever checked `emerald.500` against `background.primary` — `surface.card` (a lighter resting-card tone) was never computed, and it's precisely where Milestone 7's automated review actually renders `text.success` (the Contact page's success-state card). Fixed by adding `emerald.400` (new row above) rather than by moving the affected panel off `surface.card`, preserving this chapter's established "cards sit one step lighter than the page" visual language. `emerald.400` was derived at the same hue/saturation, lightened by the same proportional step `crimson.500`→`crimson.400` already uses for the identical text-contrast need — not a new design language, an application of this chapter's own existing pattern to a hue that was still missing it. |
| `text.success` (`emerald.400`) on `surface.card` | **7.28 : 1** | Passes AAA (was recorded as 5.9:1 at first — recomputed and corrected during Milestone 7's own review) — confirms the fix clears not just the 4.5:1 floor that prompted it, but Ax-3's AAA target too. |
| `text.error` (`crimson.400`) on `background.primary` | **6.0 : 1** | Passes AA comfortably; near but not at AAA. |
| `border.error` (`crimson.500`) on `background.primary`, as a graphical element | **3.3 : 1** | Passes the 3:1 graphical/UI-component threshold; would fail if set as normal text — this is the exact case C-4 exists to prevent, and is precisely why `crimson.500` is restricted to the Accent role and never used for running text. |
| `border.error` (`crimson.500`) on `surface.card`, as a graphical element | **2.9 : 1** | **Fails the 3:1 threshold.** The same "Section 8 only checked `background.primary`" gap as `text.success` above, found by Milestone 7's automated review against `TextField`'s error-state input border (which sits on its own `surface.card` background) and `Badge`'s (then-unused) error variant. Fixed at the component level in both cases by substituting `text.error` (`crimson.400`, 5.2:1 here — comfortably clears even the stricter 4.5:1 text floor) for the border color, rather than by changing this token's Core value — `crimson.500` remains correct and unchanged everywhere it's checked against `background.primary`. |

The `background.primary`-only row is the clearest demonstration of why C-4 exists: `crimson.500` is a legitimate, verified choice for an error icon or border, and a genuine accessibility failure if a future contributor reaches for it as error *text* instead of `crimson.400`. Both values look like "the error color" at a glance; only one of them is correct for text. This is exactly the kind of mistake a contrast-metadata record (rather than visual inspection alone) is built to catch — and, per Milestone 7, the same mistake can recur one level down (Accent-role *border*, not Text-role *text*) simply by moving to a lighter surface. A future contributor should read both `crimson.500` rows above as one lesson, not two.

---

## 9. RESPONSIVE BEHAVIOUR

Color tokens do not vary by breakpoint — a Semantic role resolves to the same value on mobile, tablet, and desktop, consistent with Chapter 2, Section 9. What may reasonably vary is *density of gold usage* relative to the Gold Budget (Section 5): a smaller viewport has less total area, so a fixed-size gold element (a CTA, for instance) represents a proportionally larger share of the budget than the same element does on desktop. Mobile layouts should be checked against the 10% ceiling independently, not assumed safe because desktop passed.

---

## 10. AI & FUTURE INTERFACES

A voice-only interface has no color at all, and this chapter's principles translate there only by analogy — Chapter 72 will need its own equivalent of "scarce signal" for vocal emphasis, structurally similar to C-5 but with no color values to measure. A spatial or AR environment (Chapter 73) will need this chapter's seventeen Core values to survive translation into a lit, three-dimensional context — an untested claim, flagged honestly in Section 16, since color under simulated ambient lighting does not always read identically to color on a flat, backlit screen.

---

## 11. DO

Using `accent.primary` for a single case-study result numeral, and `accent.secondary` (Champagne) for the decorative rule beneath a section's eyebrow label on the same screen — two different accent weights, correctly matched to two different levels of emphasis, comfortably within the Gold Budget.

## 12. DON'T

Using `border.error` (`crimson.500`) as the color for a form field's inline error message text. This passes at a glance — it is unmistakably "the error color" — and fails Section 8's recorded 3.3:1 ratio the moment it's actually measured as text. The correct token for that context is `text.error` (`crimson.400`).

---

## 13. ANTI-PATTERNS

**Weight confusion.** Using a state color's Accent step where its Text step belongs, or vice versa — the C-4 failure mode, demonstrated directly in Section 8. It happens because both steps of a state color look, to the eye, like "the same red" or "the same green," and the difference only matters once measured. It is detected by checking any state-colored text against Section 8's recorded ratios specifically, not by visual inspection. It is fixed by substituting the correct step and re-verifying.

**Gold creep.** A succession of individually reasonable gold additions — a numeral here, a border there, a subtle background wash on a featured card — that, summed, exceed the 10% ceiling without any single addition looking like the offender. It happens because C-5 is checked per-addition in practice, rather than against the cumulative total. It is detected by the area-based audit method in Section 5, run against the finished screen, not against each element in isolation. It is fixed by removing or de-emphasizing the least-necessary gold element, typically the one added most recently and with the least specific justification.

---

## 14. QUALITY ASSURANCE CHECKLIST

- [ ] Is every new color value placed at the correct tier per the Resolution Question, and is it one of the seventeen existing Core values wherever possible? *(C-1)*
- [ ] Is Gold 500 and Champagne's role distinction respected — CTA/numeral versus secondary emphasis — rather than used interchangeably? *(C-2)*
- [ ] Does every new text/surface pairing have a recorded, calculated contrast ratio, not merely a visual impression of adequate contrast? *(C-3)*
- [ ] If a state color is used as both text and a graphical accent, are the correct, distinct steps used for each? *(C-4)*
- [ ] Has the finished screen's total gold coverage been checked against the 10% ceiling by area, not by element count? *(C-5)*

---

## 15. CROSS REFERENCES

Chapter 1 (P1, P2, P3, P7, P8). Chapter 2 (resolution model, contrast-metadata requirement). Chapter 63 (naming casing). Chapter 4 (Typography, which sets text against these surfaces). Chapter 9 (Elevation, which derives shadow tint from these backgrounds). Chapter 32 (Charts, which extends this neutral scale into a data-visualization sub-palette). Chapter 52 (Dark Mode & Theming, which inherits this chapter's contrast obligations for any future light-variant translation). Master Vision §6.1, §7.4, §22.

---

## 16. FUTURE EXPANSION

**Possible future additions.** An eighteenth Core value should only be added once a specific, documented case shows the existing seventeen insufficient — per C-1, this chapter expects that to be rare (it has happened exactly once so far, per C-1's `emerald.400` example).

**Documented assumptions.** This chapter assumes a single, dark-native palette with no light-mode equivalent in general use; Chapter 52 owns the question of whether and how any of these values translate to a light or print-safe context.

**Documented limitations.** The contrast ratios in Section 8 are calculated against solid Core-tier backgrounds. They have not yet been verified against a glass or blurred surface (Chapter 10), where a translucent panel's effective background may differ from the flat value assumed here — this should be re-verified once Chapter 10 is written.

**Future research areas.** Whether the seventeen-value Core palette holds up once real render and spatial-computing work (Chapters 14, 73) tests these colors under simulated three-dimensional lighting rather than flat screen display.

---

*End of Chapter 3. The next chapter, Typography System, sets the system's primary design tool — per Master Vision §3.2 — against the surfaces defined here.*
