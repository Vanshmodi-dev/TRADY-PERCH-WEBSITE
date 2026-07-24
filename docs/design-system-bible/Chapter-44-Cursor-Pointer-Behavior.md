# CHAPTER 44 — CURSOR & POINTER BEHAVIOR

**Trady Perch Design System Bible · Volume III: Interaction & Behavior**

**Inherited From:** Master Vision §10.6 (Cursor Behavior Doctrine), §5.4 (Micro-Motion Grammar — cursor-aware effects). Design System Bible Chapter 1 (P3), Chapter 15 (motion), Chapter 40 (animation budget).

---

## 1. INTRODUCTION

Master Vision §10.6 already restricts cursor-aware effects to "high-impact zones" as a principle. This chapter is where "high-impact zone" becomes an enumerated, specific list — closing the door on the gradual scope creep that phrase alone would otherwise invite.

This chapter depends on Chapter 1's Principle 3 (The Scarce Signal) directly, applying it to cursor behavior with the same discipline Chapter 3 applies to gold. It is depended on by Chapter 18 (Buttons, hero CTA magnetic effect).

---

## 2. PHILOSOPHY

The rejected alternative — applying cursor-aware effects broadly, wherever they might add a sense of polish — was already rejected by Master Vision §10.6's "must never be applied site-wide" instruction. This chapter's contribution is naming, exhaustively, exactly where that restriction's exception applies, so the exception cannot be quietly extended one component at a time the way Chapter 20's navigation-item ceiling could otherwise erode.

---

## 3. CORE PRINCIPLES

### Cu-1 — Cursor Effects Are Restricted to Exactly Two Named Zones

**Purpose.** Cursor-aware ambient effects (a soft trailing light, a magnetic pull toward an interactive element) are permitted only within the Hero section and the Intro sequence — nowhere else in the system.

**Reasoning.** Descends from Principle 3: naming the exact zones, rather than leaving "high-impact" as a judgment call, is what actually prevents the scope creep Master Vision §10.6 warns against — a future contributor proposing a cursor effect for a third zone must argue against this explicit, closed list, not merely against a vague guideline.

**Examples.** The hero's magnetic CTA effect: permitted (Cu-1's named zone). A cursor-following light added to a Testimonials section because it "matched the hero's feel": not permitted — Testimonials is not one of the two named zones, regardless of how tastefully the effect might be implemented there.

**When it applies.** To every proposed cursor-aware ambient effect. **When it does not apply.** To ordinary, non-ambient cursor behavior (the browser's default pointer-to-hand cursor change over a clickable element), which is a baseline affordance every browser provides and is not restricted by this chapter at all.

### Cu-2 — A Custom Cursor Effect Always Clarifies Interactivity, Never Only Decorates

**Purpose.** Within the two permitted zones, any custom cursor behavior must make clearer what is interactive — it may never appear identically over both interactive and static content.

**Reasoning.** Direct restatement of Master Vision §10.6: a cursor effect with no differentiating function has failed its one legitimate job and become pure decoration, which the zone restriction in Cu-1 does not, on its own, prevent.

**Examples.** The hero CTA's magnetic pull activates only as the cursor approaches the actual button — it does not pull toward empty background space nearby.

**When it applies.** To every cursor effect within the permitted zones. **When it does not apply.** No exception.

### Cu-3 — Magnetic Pull Has a Maximum Distance and Displacement

**Purpose.** A magnetic hover effect activates only within a defined proximity radius of the target element and displaces that element by no more than a small, defined maximum distance — never a large, obviously gimmick-reading movement.

**Reasoning.** Descends from Master Vision §10.6's "must remain subtle enough to read as polish, never so pronounced that they read as a gimmick" — resolved here into an actual, checkable ceiling rather than a subjective judgment applied inconsistently across implementations.

**Examples.** The hero CTA subtly shifts toward an approaching cursor within an 80px proximity radius, displacing itself by no more than 8px at maximum pull — a barely-perceptible refinement, not an obvious animation.

**When it applies.** To every magnetic effect within the permitted zones. **When it does not apply.** No exception.

---

## 4. COMPLETE DESIGN SPECIFICATION

**Permitted zones (Cu-1):** Hero section, Intro sequence — exactly two, closed list. **Magnetic effect parameters (Cu-3):** 80px proximity-activation radius, 8px maximum displacement. **Cursor-following light (where used in the permitted zones):** follows at Chapter 15's Quick-tier responsiveness (150ms lag), never instant (which would feel mechanical) nor Standard-tier or slower (which would feel unresponsive and laggy).

---

## 5. MEASUREMENTS

Permitted zones: 2. Magnetic proximity radius: 80px. Maximum displacement: 8px.

---

## 6. BEHAVIORAL RULES

**Before proposing any cursor effect.** Confirm it targets one of the two named zones per Cu-1 — a proposal for any other zone is rejected before any further design discussion.

---

## 7. MOTION SPECIFICATION

The magnetic effect's displacement animates using Chapter 15's Quick tier (150ms), Entrance curve, matching general hover-feedback timing elsewhere in the system for consistency, even though this specific effect is otherwise unique to its two zones.

---

## 8. ACCESSIBILITY

Cursor-aware effects are entirely absent on touch devices (Chapter 43) and must never be the sole means of discovering that an element is interactive — the underlying element's ordinary visual affordance (button styling, per Chapter 18) remains fully sufficient with the cursor effect removed entirely, satisfying the same "never the sole carrier" logic Chapter 30 applies to tooltips.

---

## 9. RESPONSIVE BEHAVIOUR

Not applicable below Desktop range (Chapter 8) — cursor effects require a genuine pointer device and do not apply at Mobile or most of Tablet range, where Chapter 43's touch equivalents (or intentional absence) govern instead.

---

## 10. AI & FUTURE INTERFACES

A spatial environment (Chapter 73) has a direct equivalent in gaze- or hand-tracking-based highlight effects — Cu-1's zone restriction and Cu-3's subtlety ceiling should both transfer directly, since the same scarcity-of-signal reasoning applies regardless of whether the pointer is a mouse cursor or a tracked hand position.

---

## 11. DO / 12. DON'T

**Do:** The hero CTA subtly shifting 6px toward an approaching cursor within its 80px activation radius, and nowhere else on the page. **Don't:** Adding the identical magnetic effect to every Primary-emphasis button across the site "for consistency" — this is a direct Cu-1 violation; consistency in this specific case means the effect staying exclusive to its two named zones, not being extended everywhere a similar component appears.

---

## 13. ANTI-PATTERNS

**Zone creep.** Extending a cursor effect from its originally approved zone to an adjacent section because the visual transition between the two felt inconsistent otherwise. This is detected by auditing every cursor-aware effect against Cu-1's exact two-zone list, and fixed by removing the effect from any zone beyond those two, addressing the felt inconsistency through ordinary visual design instead.

---

## 14. QUALITY ASSURANCE CHECKLIST

- [ ] Does this cursor effect exist only within the Hero or Intro zone? *(Cu-1)*
- [ ] Does it visibly differentiate interactive from static content, rather than applying uniformly? *(Cu-2)*
- [ ] Does any magnetic pull stay within the defined proximity radius and displacement ceiling? *(Cu-3)*
- [ ] Is the underlying element's interactivity still fully clear with the cursor effect removed?

---

## 15. CROSS REFERENCES

Chapter 1 (P3). Chapter 15 (motion). Chapter 18 (hero CTA, primary consumer). Chapter 40 (animation budget). Chapter 43 (touch equivalent, absence). Master Vision §5.4, §10.6.

---

## 16. FUTURE EXPANSION

A third zone may be proposed only with the same rigor Cu-1 already requires — none has been proposed as of this writing.

---

*End of Chapter 44. The next chapter, per the authoring sequence, is Conversational & Voice Interaction Patterns.*
