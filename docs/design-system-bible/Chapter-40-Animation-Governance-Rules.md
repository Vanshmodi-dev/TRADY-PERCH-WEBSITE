# CHAPTER 40 — ANIMATION GOVERNANCE & RULES

**Trady Perch Design System Bible · Volume III: Interaction & Behavior**
*(Written in Phase 3, alongside the later Volume II components, per the authoring sequence — most useful once enough components exist to audit against.)*

**Inherited From:** Master Vision Chapter 9 (Motion Language, in full), Chapter 10 (Premium Motion System, in full). Design System Bible Chapter 1 (P6, P7, P8), Chapter 15 (Motion & Timing System, in full — this chapter enforces its budget rather than redefining its values).

---

## 1. INTRODUCTION

Chapter 15 gave motion its vocabulary — five tiers, three curves, every value fixed. This chapter is the discipline that keeps that vocabulary from being spent carelessly: the system-wide rulebook for *when* animation is permitted at all, an enforceable "animation budget" per view, and the closed list of properties allowed to animate. Without it, a well-intentioned contributor adding "just one more" scroll-triggered reveal, one component at a time, eventually produces the exact fade-and-slide-up-on-everything failure Master Vision §9.1 explicitly warns against — with no single addition ever looking like the offender.

This chapter depends on Chapter 15 completely and Chapter 1's Principle 6 (Diegetic Motion) directly, since every rule here exists to enforce that one principle mechanically rather than rely on individual judgment alone. It is depended on by Chapter 41 (Microinteractions Catalog) and every component chapter's own Motion Specification section, all of which operate within this chapter's budget.

---

## 2. PHILOSOPHY

The rejected alternative is trusting Chapter 15's tier discipline alone to prevent overuse, on the theory that a well-designed timing system is self-limiting. This was rejected because Chapter 15 governs *how* an approved animation behaves, not *whether* it should exist at all — a hundred individually well-timed, correctly-eased animations on one page is still a hundred too many, and Chapter 15's rigor does nothing to catch that on its own. This chapter is the missing enforcement layer: a closed list of what may animate, and a hard ceiling on how much may animate at once.

---

## 3. CORE PRINCIPLES

### Ag-1 — Only Six Properties May Animate, System-Wide

**Purpose.** Animation in this system is restricted to exactly six property categories: opacity, transform (scale/translate only, never skew), color, background-color, border-color, and box-shadow. No other visual property (filter effects, hue-rotation, blur radius outside Chapter 10's defined glass transitions, clip-path) may be animated anywhere in the system.

**Reasoning.** Descends from Principle 7: an unbounded set of animatable properties invites novel, decorative effects that Principle 6 would reject individually but that a closed list prevents from ever being proposed in the first place — restricting the vocabulary is cheaper than relying on every future review to catch every future violation.

**Examples.** A card's hover-lift: `transform: translateY` and `box-shadow` (Chapter 9's elevation steps) — both permitted. A logo animating through a hue-rotating rainbow sweep: forbidden outright, regardless of any diegetic justification offered for it.

**When it applies.** To every animation proposed anywhere in the system. **When it does not apply.** To the Chapter 9's own intro sequence's specifically-named metallic reflection sweep (Master Vision §9.2, step 3), which uses a defined, one-time gradient position animation explicitly named as this system's sole exception to ordinary scarcity and, by extension, to this closed property list — never treated as a precedent for anything else.

### Ag-2 — No More Than Three Elements Animate Simultaneously in One View

**Purpose.** At any single moment, no more than three distinct elements within one viewport may be actively animating at once.

**Reasoning.** Direct operationalization of Master Vision §10.3's Animation Hierarchy principle ("only one element on screen should be the primary subject of motion") extended into an enforceable count: one primary subject, at most two supporting elements trailing a beat behind it (Chapter 15's stagger logic), and nothing further — a fourth simultaneously-animating element has, by definition, stopped being a supporting motion and started being visual noise.

**Examples.** A Structured Grid's scroll-triggered card entrances (Chapter 19) stagger such that no more than three cards are mid-animation at any single instant, even if six cards enter the viewport together — the remaining three queue slightly behind, per Chapter 15's stagger timing.

**When it applies.** To every viewport, at every scroll position, at every moment. **When it does not apply.** No exception.

**Common misunderstandings.** Assuming this ceiling applies to hover states specifically, which are user-triggered and inherently one-at-a-time in normal use. The ceiling is aimed primarily at scroll-triggered and automatic entrance animation, where an ungoverned system could otherwise animate an entire viewport's worth of content simultaneously — a user hovering three things in rapid succession is not a violation, since each hover is a discrete, brief, user-caused event, not a simultaneous automatic reveal.

### Ag-3 — Reduced-Motion Compliance Is Automatic, Never a Per-Component Decision

**Purpose.** Every animation built from a Chapter 15 duration token automatically inherits its reduced-motion companion (Chapter 15, Mt-4) with no additional implementation step required per component — a component author cannot "forget" reduced-motion support, because it is not a separate feature to remember, it is built into the token itself.

**Reasoning.** Descends from Chapter 2, §8's original pairing requirement and Principle 7: relying on every future component author to remember a separate accessibility step, independently, guarantees eventual omission — building the pairing into the token's own definition removes the omission as a possibility rather than merely discouraging it.

**When it applies.** To every animated component in the system. **When it does not apply.** No exception.

### Ag-4 — Every Proposed Animation Cites Its Diegetic Justification Before Approval

**Purpose.** A new animation proposal must state, explicitly, what real relationship, state change, or sequence it represents (per Principle 6) before it is approved — "it looks good" or "it feels more premium" is not, on its own, a sufficient justification.

**Reasoning.** Direct enforcement mechanism for Principle 6 at the review stage, mirroring Chapter 1's own derivation-test discipline applied specifically to motion proposals.

**Examples.** A proposed subtle particle effect behind a hero background, when asked what it represents, has no answer beyond "texture" — rejected under this principle before any timing or property discussion is even relevant.

**When it applies.** To every new animation proposal. **When it does not apply.** No exception.

---

## 4. COMPLETE DESIGN SPECIFICATION

**Permitted animatable properties (Ag-1):** `opacity`, `transform` (translate/scale only), `color`, `background-color`, `border-color`, `box-shadow`.

**Simultaneous animation ceiling (Ag-2):** 3 elements per viewport per moment, with Chapter 15's stagger logic used to queue any excess rather than firing all elements at once.

**Proposal requirement (Ag-4):** every new animation's design documentation must include a one-sentence answer to "what does this represent?" before a timing tier (Chapter 15) is even assigned.

---

## 5. MEASUREMENTS

Animatable properties: 6, closed list. Simultaneous-animation ceiling: 3. Reduced-motion pairing coverage: 100% of Chapter 15 duration tokens, by construction (Ag-3).

---

## 6. BEHAVIORAL RULES

**Before proposing any animation.** State its diegetic justification (Ag-4) before discussing timing or easing. **During implementation.** Confirm the animated property is one of the six permitted (Ag-1) and that the reduced-motion pairing resolves automatically from the chosen Chapter 15 token (Ag-3). **During review of a scroll-heavy page.** Count simultaneously-animating elements at each scroll position against the ceiling of three (Ag-2).

---

## 7. MOTION SPECIFICATION

This chapter does not itself specify any duration or curve — it governs which of Chapter 15's already-specified values may be invoked, and how many times at once. Its own diegetic justification, per its own Ag-4 requirement applied reflexively: this chapter's rules represent the actual, real constraint that human attention can only track a small number of simultaneous changes at once — the ceiling in Ag-2 is not an arbitrary aesthetic preference, it is a legibility limit.

---

## 8. ACCESSIBILITY

Ag-3 is this chapter's primary accessibility mechanism — by making reduced-motion support structural rather than optional, this chapter closes the most common real-world failure mode in reduced-motion implementation, which is simply forgetting to wire it up on a per-component basis.

---

## 9. RESPONSIVE BEHAVIOUR

The simultaneous-animation ceiling (Ag-2) applies identically at every breakpoint, though a narrow Mobile viewport will naturally show fewer elements at once regardless, making the ceiling easier to satisfy there than on a wide Desktop view showing more content simultaneously.

---

## 10. AI & FUTURE INTERFACES

A voice interface has no properties to animate in Ag-1's sense, but its direct analogue is a closed list of permitted *vocal* variations (pace, pitch emphasis, pause) rather than an unbounded range of tonal effects — Chapter 72 should define its own closed list following this chapter's exact reasoning rather than treating voice as an unconstrained new medium.

---

## 11. DO / 12. DON'T

**Do:** A homepage section revealing three cards on scroll, staggered so no more than three are ever mid-animation simultaneously, each animating only `opacity` and `transform`. **Don't:** A hero background with a continuously animating gradient hue-shift "for visual interest" — fails Ag-1 (not a permitted property) and Ag-4 (no diegetic justification) simultaneously.

---

## 13. ANTI-PATTERNS

**Budget-blind addition.** Adding a new scroll-triggered animation to a page without checking how many other elements are already animating at that same scroll position. This is dangerous because Ag-2's ceiling is easy to violate exactly this way — one team adds an animation to Section A, another adds one to Section B, and neither individually realizes both fire together at a shared scroll position. It is detected by auditing full-page scroll behavior at every position, not by reviewing each new animation in isolation. It is fixed by re-timing or removing whichever addition pushes the count past three.

---

## 14. QUALITY ASSURANCE CHECKLIST

- [ ] Does the animation use only one of the six permitted properties? *(Ag-1)*
- [ ] Does the full page, checked at every scroll position, never exceed three simultaneously-animating elements? *(Ag-2)*
- [ ] Does the animation's reduced-motion pairing resolve automatically from a Chapter 15 token? *(Ag-3)*
- [ ] Has a one-sentence diegetic justification been stated and approved before implementation? *(Ag-4)*

---

## 15. CROSS REFERENCES

Chapter 1 (P6, P7, P8). Chapter 9 (the intro's one Ag-1 exception). Chapter 15 (the entire timing system this chapter enforces). Chapter 41 (Microinteractions Catalog, operates within this budget). Every component chapter's own Motion Specification section. Master Vision Chapter 9, Chapter 10 in full.

---

## 16. FUTURE EXPANSION

The three-element simultaneous ceiling (Ag-2) is this chapter's first-canonical proposal and should be tested against a real, fully-built page with multiple animated sections before being treated as definitively correct.

---

*End of Chapter 40. The next chapter, per the authoring sequence, is Timelines & Steppers.*
