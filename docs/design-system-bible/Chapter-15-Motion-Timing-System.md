# CHAPTER 15 — MOTION & TIMING SYSTEM

**Trady Perch Design System Bible · Volume I: Foundations**
*First-canonical-draft. This is the highest-difficulty chapter in Volume I — see the Architecture's own note that translating five qualitative tiers into coherent, non-arbitrary values is among the hardest single specifications in this Bible.*

**Inherited From:** Master Vision Chapter 9 (Motion Language, in full), Chapter 10 (Premium Motion System, in full — §10.1–§10.6), §9.5 (Reduced Motion Contract). Design System Bible Chapter 1 (P4, P6, P8), Chapter 2, §7 (motion as a Core category) and §8 (paired reduced-motion values, required here for the first time in practice).

---

## 1. INTRODUCTION

Master Vision Chapter 10 names five motion tiers — Instant, Quick, Standard, Deliberate, Ceremonial — and explains, in careful qualitative terms, what each is for and how they relate. It deliberately stops short of a single millisecond value or easing curve, because that resolution belongs to a system chapter, not a brand constitution. This chapter provides that resolution, in full, for the first time anywhere in this Bible.

This chapter depends on Chapter 1 directly — Principle 6 (Diegetic Motion) is the test every value here must satisfy, and Principle 8 governs the one deliberate exception (Ceremonial) this chapter grants to ordinary scarcity rules. It depends on Chapter 2, §7 and §8, which anticipated this chapter's exact job: populating the `motion-duration` and `motion-easing` Core categories, each duration paired with a reduced-motion companion from the moment it is defined. Nearly every remaining chapter in this Bible depends on this one — Chapter 40 (Animation Governance) enforces its budget; Chapter 41 (Microinteractions) applies its tiers per component; every component chapter in Volume II cites a tier from here for any motion it specifies.

---

## 2. PHILOSOPHY

The rejected alternative is a continuous duration range — "somewhere around 200 to 400 milliseconds, adjust to taste" — which is how most interface motion is actually specified in practice, and which fails for the same reason a continuous spacing or color range fails: it cannot be audited, and "adjust to taste" is exactly the opening Premature Invention (Chapter 1, Section 13) walks through. Five fixed durations, each with a fixed, named job, is what makes Master Vision §10.1's qualitative tiers real rather than aspirational.

A second alternative — one single easing curve, used everywhere, varied only by duration — was also rejected. Master Vision §10.4 requires entrances and exits to behave asymmetrically (a slower, more generous landing than launch), which a single symmetrical curve cannot express. This chapter accordingly defines a small family of curves, not one, each tied to a specific job exactly as this Bible's growing pattern (Chapter 9's blur steps, Chapter 4's type steps) already establishes for every other category.

---

## 3. CORE PRINCIPLES

### Mt-1 — Five Tiers, Fixed Durations, No Interpolation

**Purpose.** The system defines exactly five duration values (Section 4), matching Master Vision §10.1's five named tiers precisely. No value between two tiers is ever used.

**Reasoning.** Descends from Principle 7 and Master Vision §10.1's explicit "fixed count, not an open-ended range" instruction (Chapter 1, Section 5). A duration that sits between Quick and Standard because "Quick felt slightly too fast here" is a sign the element's actual importance was misjudged, not that a sixth tier is needed.

**Examples.** A tooltip appears at Quick (150ms); a section reveals at Standard (300ms). Nothing appears at, say, 220ms "to split the difference."

**When it applies.** To every timed transition, animation, or reveal in the system.

**When it does not apply.** No exception.

**Common misunderstandings.** Assuming a longer animation is always "more premium." Master Vision §10.1 is explicit that borrowing a slower tier than an element's actual importance warrants makes it feel sluggish, not expensive — the tiers only communicate weight because they are used honestly and differentially.

### Mt-2 — Entrances Decelerate, Exits Accelerate

**Purpose.** Every entrance uses the Entrance curve (a fast start, long, generous deceleration into rest); every exit uses the distinct Exit curve (a quicker, more even departure with no lingering deceleration) — never the same curve for both directions.

**Reasoning.** Direct restatement of Master Vision §10.2 (deceleration asymmetry) and §10.4 (entrance/exit asymmetry) resolved into two named, distinct curves rather than one curve applied symmetrically in both directions.

**Examples.** A dialog opening: Entrance curve, Standard duration. The same dialog closing: Exit curve, Quick duration — faster and without the generous landing its entrance used, per §10.4's explicit rule that an exit must never take equal or longer than its entrance.

**When it applies.** To every element that both enters and later exits (dialogs, toasts, dropdowns, tooltips).

**When it does not apply.** To one-directional reveals with no corresponding exit (a scroll-triggered section reveal that never "un-reveals") — only the Entrance curve applies there, since no exit exists to differentiate from.

**Common misunderstandings.** Assuming "exit accelerates" means exits should feel abrupt or careless. The Exit curve is quick and clean, not jarring — it simply withholds the generous, lingering landing an entrance is given, consistent with Master Vision §10.4's reasoning that a slow, ceremonial exit reads as the interface resisting the visitor's own action to leave.

### Mt-3 — Ceremonial Is a Single-Use Curve, Reserved for the Intro

**Purpose.** The Ceremonial duration and its own dedicated easing curve are used exclusively by the intro sequence (Master Vision §9.2). No other component, animation, or future feature may use the Ceremonial tier.

**Reasoning.** Direct restatement of Master Vision §10.1's own restriction, reinforced by Chapter 1's Principle 8: Ceremonial pacing used more than once per session stops being ceremonial and becomes an obstacle — the tier's entire value depends on its exclusivity.

**Examples.** The intro's black silence, golden line ignition, and metallic reflection sweep (§9.2) are the only sequence in the entire system permitted to use Ceremonial timing.

**When it applies.** Universally — this is the one tier with a hard, named, single legitimate consumer.

**When it does not apply.** No exception. A future stakeholder proposing "just one more" Ceremonial-tier moment (a particularly important case study reveal, for instance) should be redirected to Deliberate, the next tier down, which remains available for exactly this kind of emphasis without spending the intro's exclusivity.

**Common misunderstandings.** Assuming Deliberate is "not slow enough" for a genuinely important moment and reaching for Ceremonial instead. Deliberate (Section 4) is deliberately the system's second-slowest tier specifically so that genuine emphasis elsewhere in the product never needs to borrow the intro's exclusive pacing.

### Mt-4 — Every Duration Ships With a Reduced-Motion Pair

**Purpose.** Each of the five duration tokens is defined, from creation, as a pair: a standard value and a reduced-motion companion — never added as a later, separate override layer.

**Reasoning.** Direct operationalization of Chapter 2, §8's requirement, itself descending from Master Vision §9.5's Reduced Motion Contract: building the pair in from the start is what makes reduced-motion support automatic for every future consumer of a duration token, rather than a parallel system someone has to remember to also implement.

**Examples.** `motion-duration.standard`'s reduced-motion companion is a 100ms opacity-only crossfade with no transform or movement — content still changes, but nothing slides, scales, or travels across the screen.

**When it applies.** To all five duration tokens, without exception.

**When it does not apply.** No exception — this is one of the rules, alongside Mt-1 and Mt-3, that this chapter treats as fully closed.

**Common misunderstandings.** Assuming "reduced motion" means "no transition at all." A brief opacity crossfade is generally an acceptable and often preferable reduced-motion treatment over a hard, instant cut — this principle's reduced-motion pairs remove movement and scaling specifically, not all transition of any kind, consistent with common accessibility guidance on this exact distinction.

---

## 4. COMPLETE DESIGN SPECIFICATION

**The five duration tiers, with reduced-motion pairs:**

| Tier | Standard duration | Reduced-motion companion | Assigned job |
|---|---|---|---|
| `core.motion-duration.instant` | 80ms | 0ms (no animation) | Direct extensions of user input — button press, toggle, checkbox. |
| `core.motion-duration.quick` | 150ms | 60ms, opacity-only | Hover states, focus rings, tooltips. |
| `core.motion-duration.standard` | 300ms | 100ms, opacity-only | Default content motion — scroll reveals, card entrances, tab switches. |
| `core.motion-duration.deliberate` | 500ms | 150ms, opacity-only | Consciously significant moments — major section transitions, pricing-tier selection, case-study expansion. |
| `core.motion-duration.ceremonial` | 1200ms | Full static presentation, no animation (per Master Vision §9.5) | The intro sequence, exclusively. |

**The three easing curves:**

| Token | Curve | Use |
|---|---|---|
| `core.motion-easing.entrance` | `cubic-bezier(0.16, 1, 0.3, 1)` | Every entrance at Instant through Deliberate tiers. |
| `core.motion-easing.exit` | `cubic-bezier(0.4, 0, 1, 1)` | Every exit at Instant through Deliberate tiers. |
| `core.motion-easing.ceremonial` | `cubic-bezier(0.19, 1, 0.22, 1)` | The intro sequence, exclusively — paired one-to-one with the Ceremonial duration, per Mt-3. |

No linear or default-system easing curve is used anywhere in the system, consistent with Master Vision §9.1's explicit rejection of linear motion.

---

## 5. MEASUREMENTS

- **Duration tiers: 5.** Values: 80ms, 150ms, 300ms, 500ms, 1200ms.
- **Progression:** roughly ×1.9 (80→150), ×2 (150→300), ×1.67 (300→500), ×2.4 (500→1200) — not a single fixed ratio, chosen instead so each tier is clearly, perceptibly slower than the last without the progression becoming so extreme that Deliberate and Ceremonial collapse toward feeling similar.
- **Easing curves: 3** — Entrance, Exit, Ceremonial. **Curves shared across tiers:** Entrance and Exit apply identically across all four non-Ceremonial tiers; only Ceremonial has its own fully dedicated curve, consistent with Mt-3's exclusivity.

---

## 6. BEHAVIORAL RULES

**Before animating any element.** Identify its actual importance and select the matching tier from Section 4 — never a duration chosen by trial and error until it "feels right" outside these five values.

**Before animating any element that both enters and exits.** Apply Entrance curve/timing for the entrance and Exit curve/timing for the exit, per Mt-2, confirming the exit duration is equal to or shorter than the entrance duration, per Master Vision §10.4.

**Under any proposal to use Ceremonial timing outside the intro.** Rejected per Mt-3; redirect to Deliberate.

**Under a reduced-motion user preference.** Every duration automatically resolves to its paired companion value (Section 4) with no additional logic required per component, per Mt-4.

---

## 7. MOTION SPECIFICATION

This chapter is itself the system's motion specification — the values every other chapter's own "Motion Specification" section (Section 7 of each) has been pointing toward since Chapter 3. Its own diegetic justification, per Principle 6: every tier represents an actual, real distinction in how significant a change is, and the Entrance/Exit asymmetry represents the actual asymmetry between a visitor being welcomed toward new content and a visitor choosing to leave it, exactly as Master Vision §10.4 reasons.

---

## 8. ACCESSIBILITY

Every value in Section 4 is defined with its reduced-motion companion already attached, per Mt-4 and Chapter 2, §8 — there is no separate accessibility pass required after the fact. Beyond the paired durations, no animation defined using this chapter's tiers may be the sole carrier of essential information (Chapter 3, §8's color-and-icon pairing principle, extended to motion): a state change communicated only through motion, with no accompanying static indicator, fails this requirement regardless of which tier it uses.

---

## 9. RESPONSIVE BEHAVIOUR

Duration values do not change across breakpoints (Chapter 8) — a Standard-tier reveal is 300ms on both Mobile and Desktop. What may reasonably change is *which* tier a given interaction uses: a touch-driven interaction (Chapter 43) may reasonably use Quick where a desktop hover-driven equivalent used Instant, since touch feedback has different perceptual timing expectations than cursor-driven hover feedback.

---

## 10. AI & FUTURE INTERFACES

A voice interface (Chapter 72) has no visual duration, but its pacing needs a directly analogous fixed set of pause lengths — a "quick acknowledgment" pause, a "considering the question" pause, a "this is significant" pause — structurally parallel to Instant/Quick/Deliberate, resolved in actual milliseconds of silence rather than milliseconds of visual transition. A spatial environment (Chapter 73) can likely reuse these exact five duration values directly, since human perception of "how long is a natural response" does not obviously change based on whether the response is flat or three-dimensional — this is flagged as a reasonable expectation, not yet a verified one.

---

## 11. DO

A pricing tier's selection state changing at Deliberate (500ms), with the Entrance curve, while the tier card's routine hover-lift uses Quick (150ms) — two different, correctly matched tiers for two genuinely different levels of significance within the same component.

## 12. DON'T

Using the Ceremonial tier and its dedicated curve for a particularly dramatic case-study image reveal because the moment "felt like it deserved it." This is a direct Mt-3 violation — the correct tier for even a highly significant, non-intro moment is Deliberate, and using Ceremonial here spends the intro's one legitimate claim to a pacing register nothing else in the system is allowed to touch.

---

## 13. ANTI-PATTERNS

**Duration inflation.** Gradually reaching for a slower tier than an interaction's actual importance warrants, on the theory that slower always feels more premium. This is dangerous because it is precisely backward — Master Vision §10.1 is explicit that a hover state animated at the Deliberate tier feels sluggish, not expensive, and duration inflation, applied repeatedly across a growing component library, eventually makes the entire interface feel heavy and unresponsive rather than considered. It is detected by auditing any interaction's assigned tier against Section 4's assigned-job column — a hover state assigned anything slower than Quick is immediately suspect. It is fixed by reassigning to the correct, honestly-matched tier.

---

## 14. QUALITY ASSURANCE CHECKLIST

- [ ] Is the animation's duration one of the five defined tiers, matched honestly to the element's actual importance? *(Mt-1)*
- [ ] Does an entrance use the Entrance curve, and does its corresponding exit use the Exit curve at an equal-or-shorter duration? *(Mt-2)*
- [ ] Is the Ceremonial tier used exclusively by the intro sequence, with no other consumer anywhere in the system? *(Mt-3)*
- [ ] Does this duration token have its reduced-motion companion defined and functioning automatically? *(Mt-4)*
- [ ] Is this motion the sole carrier of any essential information, with no accompanying static indicator?

---

## 15. CROSS REFERENCES

Chapter 1 (P4, P6, P8). Chapter 2 (§7, §8 — the categories and pairing requirement this chapter populates). Chapters 3–11 (each chapter's own §7 defers its actual values to this one). Chapter 40 (Animation Governance, which enforces this chapter's budget system-wide). Chapter 41 (Microinteractions Catalog, which applies these tiers per component). Master Vision Chapter 9, Chapter 10 in full, §9.5.

---

## 16. FUTURE EXPANSION

**Documented limitations.** The specific millisecond values and curve parameters in Section 4 are this chapter's first-canonical proposal, reasoned from Master Vision's qualitative tier descriptions rather than derived from user testing — they should be validated against real interaction feel once built, and revised through Chapter 2's lifecycle process if testing reveals a tier feels miscalibrated, without changing the five-tier structure itself, which is considered settled independent of the exact numbers within it.

---

*End of Chapter 15. Volume I's remaining chapters — Photography, Illustration, 3D & Render, and Sound & Haptics — populate the artistic and sensory categories still open; a lightweight draft of Chapter 65's Governance Model follows next, per the authoring sequence, before Volume II begins.*
