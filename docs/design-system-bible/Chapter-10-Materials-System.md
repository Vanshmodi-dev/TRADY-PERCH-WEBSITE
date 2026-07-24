# CHAPTER 10 — MATERIALS: METAL, GLASS & SURFACE SYSTEM

**Trady Perch Design System Bible · Volume I: Foundations**
*First-canonical-draft.*

**Inherited From:** Master Vision §6.5 (Elevation, Depth, Glass & Glow), §8.5 (Materials & Surface Language), §20.6 (Blur Scale philosophy). Design System Bible Chapter 1 (P3, P7), Chapter 3 (color source), Chapter 9 (elevation logic this chapter extends into translucent surfaces).

---

## 1. INTRODUCTION

Master Vision §8.5 describes the brand's physical material vocabulary — brushed metal, dark smoked glass, matte black — for imagery and render work. §6.5 describes glass morphism's disciplined, functional-only use in the interface itself. This chapter is where those two descriptions meet: the actual blur, opacity, and grain values that let a UI surface (a navigation bar, a modal backdrop) legitimately earn the word "glass" this system uses so sparingly.

This chapter depends on Chapter 3 (every glass surface is a translucent version of an existing Core color, never an independently chosen tint) and Chapter 9 (glass surfaces still obey the elevation model — a glass nav bar is either flush or Resting, never exempt from that logic just because it's translucent). Chapter 20 (Navigation) and Chapters 23–24 (Dialogs, Drawers) are this chapter's primary near-term consumers.

---

## 2. PHILOSOPHY

Glassmorphism is, at the time of this writing, one of the most overused visual effects in template-driven interface design — applied as ambient decoration, layered under everything, regardless of whether it solves any actual problem. Master Vision §6.5 already forbids this outright: glass "must never be used as a decorative background texture layered under everything." The alternative this chapter rejects, accordingly, is any blur value or glass token defined without a named, specific job to do. What remains is a small set of blur steps, each one tied at the moment of its definition to the exact functional problem it exists to solve — never a general-purpose "frosted" aesthetic available for any designer to reach for when a screen feels like it needs more visual interest.

---

## 3. CORE PRINCIPLES

### Ma-1 — Glass Requires a Named Function, Never Decoration

**Purpose.** A blur/translucency treatment may only be applied where it solves a specific, statable legibility or context problem — never applied because it looks premium in isolation.

**Reasoning.** Direct restatement of Master Vision §6.5's central glass rule, made into a gate: before any glass token is used, the designer must be able to name the specific problem it solves (a sticky nav needing to stay legible over scrolling content beneath it, for instance).

**Examples.** Legitimate: the primary navigation bar, which must remain legible as arbitrary content scrolls beneath it. Illegitimate: a card given a frosted-glass background purely for visual variety, with nothing changing behind it that legibility needs to be preserved against.

**When it applies.** To every proposed use of blur or translucency.

**When it does not apply.** No exception.

**Common misunderstandings.** Assuming any *fixed-position* element automatically qualifies. A fixed sidebar over a static, unchanging background has no legibility problem to solve and does not automatically earn a glass treatment merely by virtue of being fixed — the test is whether content is actually changing behind it.

### Ma-2 — Three Blur Steps, Each Tied to One Job

**Purpose.** The system defines exactly three blur values — Subtle, Moderate, Pronounced (Section 4) — each pre-assigned to a specific class of use, not offered as a general-purpose intensity dial.

**Reasoning.** Descends from Principle 7 and Master Vision §20.6's two-or-three-step philosophy: an unbounded blur range invites exactly the ambient overuse Ma-1 forbids, since "just a little blur, tuned to taste" is a much easier habit to fall into than "select from three named, purpose-bound options."

**Examples.** Subtle → sticky navigation. Moderate → a rare, functionally-justified in-page glass panel (an in-context tooltip surface over dense content, for instance). Pronounced → modal and dialog backdrops (Chapter 23), where the entire page behind the dialog needs to visually recede.

**When it applies.** To every glass surface in the system.

**When it does not apply.** No exception — a fourth blur value requires the same Principle 7 justification as any other proposed addition.

**Common misunderstandings.** Assuming "Moderate" is a safe, all-purpose default. It is, if anything, the step least likely to be needed — most real glass needs in this system resolve to either Subtle (navigation) or Pronounced (backdrops); a genuine Moderate use case should be treated as unusual and double-checked against Ma-1 before being approved.

### Ma-3 — Grain Is a Fixed, System-Wide Constant

**Purpose.** Where film grain or noise texture is applied to imagery or render work (Master Vision §8.5), it uses one fixed intensity value across the entire system — never tuned per image to taste.

**Reasoning.** Descends from Principle 7 applied to a subtle, easily-inconsistent visual detail: grain intensity chosen per image, by eye, will drift across a growing image library in ways too subtle to notice individually but cumulatively damaging to the "one company, one hand" continuity Master Vision §25.10 requires.

**Examples.** Every rendered or photographic asset receives an identical, fixed grain overlay at the intensity defined in Section 4 — applied as a final, consistent post-process step, not adjusted image by image.

**When it applies.** To every photographic or rendered image the brand produces.

**When it does not apply.** To UI surfaces themselves (buttons, cards, backgrounds), which do not carry grain — grain is Chapter 8's Art Direction domain (imagery), not this chapter's UI-surface domain, and this principle exists specifically to prevent the two from blurring into each other inconsistently.

**Common misunderstandings.** Assuming a fixed grain value means every image looks identically textured regardless of its own content. The *intensity* is fixed; how visible that intensity reads varies naturally with an image's own contrast and color, which is expected and not a violation of this principle.

### Ma-4 — Reflections Require a Named Light Source

**Purpose.** Any specular highlight or reflection applied to a metal or glass surface must be traceable to a specific, stated light source within the scene — never a generic decorative sheen applied uniformly across a surface.

**Reasoning.** Direct restatement of Master Vision §8.5's reflection rule, extended from imagery into any future 3D or interface context that might reach for a reflection effect.

**Examples.** The intro sequence's one-time metallic reflection sweep (Master Vision §9.2, step 3) is motivated by a single, implied light source passing across the mark — legitimate, and explicitly named as this system's one deliberate exception to ordinary scarcity elsewhere (Chapter 3, C-5).

**When it applies.** To any reflection or specular effect in imagery, render work, or interface chrome.

**When it does not apply.** No exception.

**Common misunderstandings.** Treating a CSS gradient "shine" sweep on a button as a harmless UI flourish rather than a reflection subject to this principle. It is a reflection, it has no stated light source, and it is exactly the kind of decorative effect this principle and Master Vision Chapter 9's diegetic-motion standard both forbid together.

---

## 4. COMPLETE DESIGN SPECIFICATION

**Blur scale:**

| Token | Value | Assigned job |
|---|---|---|
| `core.blur.subtle` | 8px | Sticky navigation over scrolling content. |
| `core.blur.moderate` | 16px | Rare, justified in-page glass panels. |
| `core.blur.pronounced` | 32px | Modal/dialog backdrops. |

**Semantic glass surfaces:**

| Token | Composition |
|---|---|
| `semantic.surface.glass-nav` | `core.blur.subtle` + `core.color.black.900` at 72% opacity + `semantic.color.border.default` |
| `semantic.surface.glass-backdrop` | `core.blur.pronounced` + `core.color.black.950` at 80% opacity |

**Grain:** fixed intensity, applied to photographic and rendered imagery only (Chapter 8's domain), at a level calibrated to be perceptible on close inspection but not visible as texture at normal viewing distance — the exact numeric intensity is an asset-production parameter maintained alongside Chapter 8 rather than a CSS-resolvable token, since grain in this system's primary near-term use is a rendering/photography post-process, not a live interface effect.

---

## 5. MEASUREMENTS

- **Blur steps: 3.** Values: 8px, 16px, 32px — each roughly doubling the previous, a clean, memorable progression.
- **Glass nav opacity:** 72%. **Glass backdrop opacity:** 80% — the backdrop is more opaque than the nav, consistent with its job (visually receding the entire page behind a dialog) requiring a stronger effect than the nav's job (staying legible while still showing through to scrolling content).

---

## 6. BEHAVIORAL RULES

**Before applying any blur.** State the specific legibility or context problem it solves, per Ma-1; if none can be stated, do not apply it.

**Under a proposal for a fourth blur step.** Apply Principle 7 against the three existing steps first.

**Under any reflection or shine effect.** Name its light source explicitly, per Ma-4, before it is approved.

---

## 7. MOTION SPECIFICATION

A backdrop's blur and opacity fade in together as a dialog opens (Chapter 23), using Chapter 15's Standard tier — the backdrop's appearance is itself a state change (the page receding behind an active dialog) and therefore diegetic under Master Vision §9.1, not a decorative flourish.

---

## 8. ACCESSIBILITY

Text placed over any glass surface must independently satisfy Chapter 3's contrast requirements against the glass surface's *effective* rendered color (base color blended with its opacity), not against the base color alone — a glass nav's text must be checked against the 72%-opacity blended result, which may differ meaningfully from a contrast check against solid `black.900`.

---

## 9. RESPONSIVE BEHAVIOUR

Blur performance can degrade on lower-powered mobile devices; where a genuine performance conflict arises, the glass nav may degrade gracefully to a solid `semantic.color.background.secondary` fill with no blur, per Chapter 55's performance-conscious patterns, rather than force a struggling blur effect at the cost of scroll smoothness (Master Vision §23).

---

## 10. AI & FUTURE INTERFACES

A spatial environment (Chapter 73) has genuine physical depth and real light — its "glass" is not a simulated blur effect at all but an actual translucent material with real optical behavior, and Ma-4's named-light-source discipline becomes, in that context, a literal scene-lighting requirement rather than a metaphorical one. This chapter's reasoning transfers directly even though its exact implementation (a CSS blur value) does not.

---

## 11. DO

Applying `glass-nav` to the primary navigation bar specifically because content scrolls beneath it and legibility must be preserved — a textbook Ma-1-satisfying use.

## 12. DON'T

Applying a frosted glass background to a testimonial card "to make it feel more premium." Nothing changes behind the card that legibility needs preserving against; this is decoration wearing the vocabulary of function, and it fails Ma-1 outright regardless of how the result looks in isolation.

---

## 13. ANTI-PATTERNS

**Glass creep.** Applying glass surfaces to progressively more components over time because the effect looks appealing and the system technically supports it. This is dangerous because it is the exact overuse Master Vision §6.5 identifies as the most common way glassmorphism collapses into meaninglessness — once several unrelated components carry glass surfaces with no shared functional justification, the effect stops signaling "this needed to stay legible over something" and starts signaling "we like this effect," which is a different and much weaker brand statement. It is detected by auditing every glass surface in the system against Ma-1's named-function test. It is fixed by removing glass from any surface that fails the test, restoring a solid Semantic background instead.

---

## 14. QUALITY ASSURANCE CHECKLIST

- [ ] Can this glass surface's specific legibility or context function be named in one sentence? *(Ma-1)*
- [ ] Is the blur value one of the three defined steps, correctly matched to its assigned job? *(Ma-2)*
- [ ] If this asset carries grain, is it the one fixed system-wide intensity, not a per-image adjustment? *(Ma-3)*
- [ ] Does any reflection or shine effect trace to a named, stated light source? *(Ma-4)*
- [ ] Has text over this glass surface been contrast-checked against its actual blended, translucent color?

---

## 15. CROSS REFERENCES

Chapter 1 (P3, P7). Chapter 3 (base colors). Chapter 8 (grain and reflection's imagery-side counterpart, Art Direction Bible). Chapter 9 (elevation logic glass surfaces still obey). Chapter 20 (Navigation, primary glass consumer). Chapters 23–24 (Dialogs, Drawers). Chapter 55 (performance degradation path). Master Vision §6.5, §8.5, §20.6.

---

## 16. FUTURE EXPANSION

**Documented limitations.** The grain intensity described in Section 4 is specified qualitatively pending an actual production asset-pipeline decision (Chapter 12, Photography System) — a precise, numeric value should be finalized once real photography or render output exists to calibrate it against.

---

*End of Chapter 10. The next chapter, Iconography System, defines the system's line-based visual vocabulary.*
