# CHAPTER 23 — LIGHTING PHILOSOPHY

**Trady Perch Hero Experience Bible · Part VI: The Sensory Language**
*First-canonical-draft. Implementation-independent.*

**Inherited From:** Master Vision §8.1 (one dominant soft-but-directional source, Rembrandt-style; deep shadow retained; highlights only where attention is wanted), §8.2 (cool-to-neutral grading; gold only as a genuine light source), §6.1 (near-black, never pure black). Design System Bible Ph-1, Rd-3, Ma-4.
**Governs:** How the hero is lit, and what its lighting communicates.
**Does Not Govern:** Colour values (DSB Ch. 3) or contrast obligations (Ch. 28) — see §5.

---

## 1. THE POSITION

In a hero built on a near-black field, **light is the only thing that makes anything visible, and therefore the only thing that decides what is seen.** In a light-background composition, light is ambient and unremarked; contrast is created by ink. In a dark composition, every visible element is visible *because light fell on it* — which means the lighting decision and the attention decision are the same decision. Chapter 7's saliency ladder and this chapter's lighting plan are two descriptions of one thing.

Master Vision's art direction is unusually specific here, and the specificity is a gift: most brands leave lighting to the individual asset; this one has made the structural decision already, and the hero's job is to apply it rather than re-derive it.

**One source, and what it buys.** §8.1 requires "one dominant, soft-but-directional light source per image (Rembrandt-style)"; Rd-3 extends it into three dimensions as a fixed rig. A single dominant source buys three things at once: **coherence** (multiple sources produce competing shadow directions, which read as an assembled scene — a Bp-3 failure delivered through physics); **attention control** (with one source the brightest region is chosen, and in a dark field the brightest region is the entry point); and **consistency across assets** (a rig reinvented per asset produces work that "individually look[s] considered but collectively feel[s] like [it] came from different studios" — a positioning matter for a brand whose credibility rests on consistency).

**Shadow is content.** §8.1 requires deep shadow to be **retained, not lifted in post** — the instruction most likely to be violated by a well-meaning correction, because lifting shadows is what every default image adjustment does. Two reasons it stays: **it is where the space comes from** (in a dark hero, unlit area *is* negative space; lifting the shadows fills the space, paying Ns-4's cost silently through a colour adjustment); and **it is the difference between "designed" and "default"** (§6.1 makes this point about the background specifically — near-black rather than pure black, so it reads as "designed, not default dark mode"). A uniformly lifted dark field reads as a dark theme; a field with genuine falloff reads as a photograph of somewhere.

**Gold is light, never paint.** §8.2: gold appears "only as a genuine light source/reflection, never a colour-grade filter"; Ma-4 requires any gold in a render to originate from an actual reflective or emitting surface. Painted gold is detectable — a gold overlay sits *on* the image; a gold reflection is *in* it, obeying the same falloff and occlusion as everything else. The honest version costs more and cannot be faked cheaply, which is exactly what makes it a signal. **Gold in the hero must have a physical explanation.** Gold that cannot be explained by the scene's own light is decoration, and decoration is where the gaudy drift starts.

---

## 2. CORE PRINCIPLES

**Li-1 — One dominant source.** The hero is lit by a single dominant, soft-but-directional source, with at most one subtle fill. *Not a rule for imagery only — it applies to the hero's overall luminance structure. Even a hero with no photograph and no render has a light direction, whether or not anyone chose it.*

**Li-2 — Highlights fall only where attention belongs.** The brightest region coincides with the element holding primary saliency. §8.1: "highlights fall only where the composition wants attention." In a dark field, luminance *is* saliency. A composition whose brightest area is not its focal point is fighting itself, and the visitor experiences the conflict as an inability to settle. *The requirement is that the brightest region and the entry point agree — not that the claim be the literal brightest pixel.*

**Li-3 — Shadow is retained.** Deep shadow is preserved as compositional content and never lifted to make readable a region that was not meant to be read. *Exception: accessibility. Where a text element's contrast is insufficient, the fix is compositional — move the text, adjust the light, change the crop — never a global shadow lift and never a reduction of the text's own contrast. Contrast obligations are absolute and lighting yields to them.*

**Li-4 — Gold must have a source.** Every appearance of gold in the composition has a physical explanation within it. *Exception: the interface's own gold — a CTA's fill, the logo mark — is an interface element rather than a lit surface, governed by colour tokens. The distinction is clean: gold* in the picture *needs a source; gold* in the interface *needs a token.*

**Li-5 — Light is consistent across every asset.** Every lit element shares one lighting logic — same direction, quality, and falloff behaviour. This becomes acute when a hero contains more than one lit thing, because inconsistency between two lit elements is far more detectable than any single element's absolute correctness. *The structure is fixed (one key, one fill, one direction); angle and intensity may vary with subject.*

**Li-6 — The field is near-black, never pure black.** A deep matte near-black with genuine tonal structure, never `#000000` and never a flat fill. §6.1: near-black "reads as 'designed,' not 'default dark mode.'" Pure black is also physically implausible — no real surface returns zero light — so it reads as an absence rather than a material, undermining every material claim made on top of it. *The values are the Design System Bible's; what this governs is that the field reads as a lit surface rather than void.*

---

## 3. THE LIGHTING PLAN

Every hero composition declares one. Four decisions, in order — each constrains the next.

| # | Decision | Constrained by | Failure if unstated |
|---|---|---|---|
| 1 | **Where is the source?** Direction and height of the single key | Li-1; soft-but-directional, not frontal | Flat, sourceless field — reads as a dark theme, not a scene |
| 2 | **What does it fall on?** The lit subject | Li-2; must coincide with primary saliency | Brightness and attention disagree; the eye oscillates |
| 3 | **What stays dark?** The retained shadow regions | Li-3; these are the composition's negative space | Uniform mid-dark field — space lost without a decision |
| 4 | **Where does gold appear, and why?** | Li-4; must trace to a source or an interface token | Unexplained warm areas; the beginning of gaudy drift |

**Why the order is fixed.** Decisions 2 and 3 are the same decision made twice — what is lit and what is not — and both depend on decision 1. Teams that start at decision 4 reliably produce a composition where the gold is the brightest thing and the claim is not: Li-2 inverted.

---

## 4. WHAT LIGHT COMMUNICATES

| Property | Toward | Reads as | Toward | Reads as | Hero position |
|---|---|---|---|---|---|
| **Source count** | One | Coherent, real, composed | Many | Assembled, artificial | One + one subtle fill |
| **Direction** | Directional, off-axis | Dimensional; reveals material | Frontal / flat | Flat; hides material | Off-axis, Rembrandt-style |
| **Quality** | Soft | Considered, expensive, calm | Hard | Dramatic, urgent, theatrical | Soft-but-directional |
| **Shadow depth** | Deep, retained | Designed; generous space | Lifted | Default dark mode; space lost | Retained |
| **Falloff** | Gradual | Physical, believable | Abrupt / none | Rendered by a filter, not a light | Gradual |
| **Highlight placement** | On the focal subject | Coherent; guides the eye | Elsewhere | Competing; unsettling | On primary saliency |
| **Colour temperature** | Cool-to-neutral | Composed, technical, calm | Warm overall | Consumer, informal | Cool-to-neutral |
| **Gold** | Reflection from a source | Material, honest, valuable | Overlay / grade | Painted; cheap; detectable | Sourced only |
| **Ground value** | Near-black with structure | Designed surface | Pure black | Void; undermines material | Near-black |

**On colour temperature.** Cool-to-neutral grading is what keeps gold legible as an *accent* rather than part of a warm palette. In a warm-graded hero, gold stops being an event and becomes the dominant temperature — spending the entire scarcity budget through a colour-grading decision nobody registers as a budget decision.

---

## 5. LIGHTING AND CONTRAST ARE NOT THE SAME OBLIGATION

Constantly conflated; only one is negotiable.

**Lighting** is a compositional choice governed by this chapter. It may be dramatic, deep, and unevenly distributed.

**Contrast** is an accessibility obligation governed by Chapter 28 and DSB Ch. 53 — WCAG AA minimum, AAA preferred for body copy. Not a compositional preference; it does not yield to art direction.

**Where they conflict, contrast wins and the composition changes.** Acceptable fixes are compositional: reposition the text into a region the light actually reaches, adjust the key's angle, re-crop, or introduce a legitimate surface for the text to sit on. Unacceptable: lowering the text's contrast to preserve mood, adding a semi-opaque scrim that flattens lighting into a filter, or lifting the whole field.

A hero whose text sits on an unpredictably-lit region is neither a lighting nor an accessibility problem — it is a composition that placed text somewhere the plan did not account for, and §3's decision 2 exists to prevent it.

---

## 6. DO / DON'T

**Do.** Declare the four decisions before any asset is produced or background treatment chosen — including for a hero with no photograph and no render. Even a purely material hero has a light direction; the only question is whether it was decided. A stated plan makes Li-2's coincidence of brightness and attention checkable rather than accidental.

**Don't.** Add a semi-opaque dark scrim over a hero image to make text readable. It flattens the lighting into a filter (defeating Li-1 and Li-3 at once), converts a lit scene into a graded one, and treats an accessibility failure as a post-production problem rather than the compositional problem it is. The scrim also tends to grow — each review finds the text slightly hard to read and increases the opacity — until the image beneath is decorative noise and the hero would have been stronger without it.

---

## 7. ANTI-PATTERNS

**Sourceless light.** Bright regions with no physical explanation — a glow with no emitter, a highlight with no direction. Detected by asking, of each bright region, where the light came from. Invisible to anyone who has not looked for it and unmistakable to anyone who has.

**Shadow lift by default.** Global tonal adjustment applied to "improve" a dark hero, usually in response to a reviewer perceiving dark regions as an error. Fixed by explaining §1's reasoning once, in advance, so the objection resolves before it becomes a change request.

**Gold as grade.** A warm colour treatment applied to make the hero feel "more premium." Detected by Li-4 — no source can be named. It simultaneously violates material honesty, spends the gold budget invisibly, and shifts the composition off the grading that makes gold legible in the first place.

**The scrim spiral.** Detected by tracking scrim opacity across releases; a value that has increased twice indicates the composition, not the scrim, is wrong.

---

## 8. ACCEPTANCE CRITERIA

- [ ] The four-decision lighting plan declared in writing before asset production. *(§3)*
- [ ] Exactly one dominant source, with at most one subtle fill. *(Li-1)*
- [ ] The brightest region coincides with the element holding primary saliency. *(Li-2, At-1)*
- [ ] Deep shadow retained; no global lift applied. *(Li-3)*
- [ ] Every appearance of gold traces to a named source, or is an interface token. *(Li-4)*
- [ ] All lit elements share one lighting logic, verified across breakpoint variants. *(Li-5)*
- [ ] The ground is a near-black with tonal structure, not pure black or a flat fill. *(Li-6)*
- [ ] No scrim is used to resolve a contrast failure. *(§5, §6)*
- [ ] Every contrast conflict was resolved compositionally, with contrast winning. *(§5)*

---

## 9. CROSS REFERENCES

Ch. 3 (Bp-3) · Ch. 7 (luminance as saliency) · Ch. 10 (Lx-4) · Ch. 20 (shadow as negative space) · Ch. 22 (the fixed rig in three dimensions) · Ch. 24 · Ch. 28 (contrast obligations). Master Vision §6.1, §8.1, §8.2, §8.5. Design System Bible Ch. 3, Ch. 10 (Ma-4), Ch. 12 (Ph-1), Ch. 14 (Rd-3), Ch. 53.

---

## 10. STATUS

The lighting plan in §3 is this Bible's own instrument — Master Vision fixes the lighting *rules* but does not require a declared plan per composition. It is proposed here because Li-2's coincidence requirement is otherwise unverifiable, and because the most common failure (§7's sourceless light) is a failure of omission rather than of judgment.

§4's interpretive table states directional readings well established in photographic and cinematographic practice, not measured against this brand's audience. The rows inherited directly from Master Vision (source count, shadow depth, colour temperature, gold, ground value) carry that document's authority; the rest are this chapter's own.

---

*End of Chapter 23. Chapter 24 addresses what the light is falling on.*
