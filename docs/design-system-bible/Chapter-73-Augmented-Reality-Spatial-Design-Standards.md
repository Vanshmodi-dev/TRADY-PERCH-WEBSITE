# CHAPTER 73 — AUGMENTED REALITY & SPATIAL DESIGN STANDARDS

**Trady Perch Design System Bible · Volume VII: The Horizon**
*The furthest speculative reach in this Bible — a direct test of whether the material language defined in Volume I ports coherently into a fundamentally different medium.*

**Inherited From:** Master Vision Chapter 8 (Art Direction Bible, in full). Design System Bible Chapter 1 (P2, P3, P6), Chapter 9 (elevation), Chapter 10 (materials), Chapter 14 (3D & Render System, Rd-1 through Rd-4, in full), Chapter 44 (Cursor & Pointer Behavior).

---

## 1. INTRODUCTION

This chapter exists specifically to prove — or, honestly, to attempt to prove — that Chapter 10's metal-and-glass material system and Chapter 14's rendering discipline port coherently into a genuinely three-dimensional, depth-aware environment. If they cannot, that is itself useful information about how load-bearing those choices really are, and this chapter is written with that honest possibility acknowledged throughout.

This chapter depends on Chapters 9, 10, and 14 completely — it introduces no new material language of its own, only the spatial translation of what already exists. It has no further dependents within this Bible; it is one of Volume VII's four terminal chapters.

---

## 2. PHILOSOPHY

The rejected alternative is treating spatial computing as license to design an entirely new visual language suited to three dimensions, on the theory that a genuinely new medium deserves genuinely new rules. This was rejected for the identical reason Chapter 71 rejects it for AI-native interfaces: the medium is new, the brand is not, and Chapter 1's Principle 1 requires every rule here to trace to an existing origin rather than exist as a freestanding invention convenient to this one medium.

---

## 3. CORE PRINCIPLES

### Xr-1 — Material Realism Transfers Directly; Simulated Elevation Becomes Real Depth

**Purpose.** Chapter 10's brushed-metal, dark-glass, and matte-black materials render as genuinely physical materials with real optical behavior in a spatial environment — and Chapter 9's simulated shadow-based elevation model becomes actual physical placement at different real depths, rather than a shadow effect simulated on a flat plane.

**Reasoning.** Direct extension of Chapter 14's Rd-1 (material realism over geometric abundance): a spatial environment's entire advantage over a flat screen is that materials and depth can be *actually real* rather than simulated, and this principle simply asks the system to use that advantage rather than flatten it back into a simulated 2D-style treatment inside a 3D space.

**Examples.** A card's "Raised" elevation state (Chapter 9) becomes a real, small forward movement in physical space toward the viewer, rather than a rendered drop-shadow on a flat panel floating in the scene.

**When it applies.** To every material and depth-relationship translation into a spatial context. **When it does not apply.** No exception.

### Xr-2 — No More Than Three Depth Planes Compete for Attention

**Purpose.** At any moment, no more than three distinct depth planes hold the user's attention simultaneously — direct extension of both Principle 2 (Singular Focus) and Chapter 14's Rd-4 (three-object render ceiling) into the added dimension of depth itself.

**Reasoning.** A user surrounded by several competing planes of content at different apparent distances has had Principle 2 violated just as surely as a visitor looking at three competing headlines on a flat page — depth is an additional axis competing attention can be spent on, and this principle caps it at the same small number Chapter 14 already established for object count in a flat render.

**Examples.** A spatial case-study presentation: the primary content plane (closest, most detailed), a supporting context plane (mid-distance, the surrounding environment), and a background atmospheric plane (farthest, minimal detail) — three planes, at the ceiling.

**When it applies.** To every spatial composition. **When it does not apply.** No exception.

### Xr-3 — Interactivity Is Signaled by Gaze/Gesture, Following Chapter 44's Cursor Doctrine

**Purpose.** A spatial object's interactivity is signaled the same way Chapter 44 restricts cursor effects — subtly, only where genuine interactivity exists, never applied decoratively to a static object — translated from cursor proximity into gaze duration or hand-tracking proximity.

**Reasoning.** Direct translation of Chapter 44's Cu-2 (a cursor effect always clarifies interactivity, never only decorates) into a medium with no cursor at all: the same restraint discipline governs whichever input method the medium actually offers.

**Examples.** A spatial object subtly brightening as a user's gaze rests on it, mirroring Chapter 44's magnetic-pull subtlety ceiling (Cu-3) rather than an exaggerated highlight.

**When it applies.** To every interactive spatial object. **When it does not apply.** No exception.

---

## 4. COMPLETE DESIGN SPECIFICATION

**Material translation (Xr-1):** Chapter 10's metal/glass/matte-black rendered as genuinely physical materials; Chapter 9's three elevation steps (Resting/Raised/Lifted) become three real depth positions. **Depth-plane ceiling (Xr-2):** 3 planes maximum. **Interactivity signal (Xr-3):** gaze-duration or gesture-proximity brightening, matching Chapter 44's 8px-equivalent subtlety ceiling translated to spatial scale.

---

## 5. MEASUREMENTS

Maximum simultaneous depth planes: 3 (Xr-2), directly matching Chapter 14's Rd-4 object ceiling.

---

## 6. BEHAVIORAL RULES

**Before any spatial composition.** Confirm no more than three depth planes compete for attention, per Xr-2.

---

## 7. MOTION SPECIFICATION

Chapter 15's five motion tiers are, per Chapter 1's Section 10 reasoning already established there, expected to transfer directly to spatial timing without needing new values — this chapter does not propose new durations, only confirms Chapter 15's existing ones as the working assumption pending real spatial-environment testing.

---

## 8. ACCESSIBILITY

Spatial accessibility standards are, as of this writing, considerably less mature and less universally agreed upon than WCAG 2.1 for the flat web — this chapter defers to whatever the prevailing spatial-accessibility standard is at the time of actual implementation, applying Chapter 53's underlying methodology (map every rule to a named external standard) rather than inventing spatial-accessibility rules independently now.

---

## 9. RESPONSIVE BEHAVIOUR

Not applicable in Chapter 8's sense — a spatial environment has no breakpoints; its closest equivalent concern is scaling for different physical device capabilities (a headset's field of view, a phone's AR camera view), which this chapter does not yet specify in detail.

---

## 10. AI & FUTURE INTERFACES

This chapter is itself one of the "AI & Future Interfaces" extensions the rest of this Bible has been pointing toward since Chapter 1's Section 10 — its own further extension, should the AI agent and spatial environment ever combine (an AI presence rendered spatially), would need to satisfy Chapter 71's Ai-1 through Ai-3 translated into spatial terms, a combination this chapter does not yet attempt to resolve.

---

## 11. DO / 12. DON'T

**Do:** A spatial case-study presentation with the primary result rendered in real brushed-metal material at close depth, a supporting environment plane at mid-distance, and a soft atmospheric background — three planes, materials genuinely physical rather than simulated. **Don't:** Surrounding the user with five or six floating panels at different depths simultaneously "to make full use of the space" — a direct Xr-2 violation and the spatial equivalent of the cluttered flat layout Master Vision §3.2 has forbidden since the Master Vision's very first chapters.

---

## 13. ANTI-PATTERNS

**Depth-plane clutter.** Using a spatial environment's full depth range simply because it's available, surrounding the user with more simultaneous content than a flat page ever would. This is detected by counting distinct depth planes competing for attention at any moment, and fixed by consolidating down to Xr-2's three-plane ceiling.

---

## 14. QUALITY ASSURANCE CHECKLIST

- [ ] Do materials render as genuinely physical rather than simulated 2D-style effects in 3D space? *(Xr-1)*
- [ ] Do no more than three depth planes compete for attention at once? *(Xr-2)*
- [ ] Does interactivity signal subtly, via gaze or gesture, matching Chapter 44's restraint? *(Xr-3)*

---

## 15. CROSS REFERENCES

Chapter 1 (P1, P2, P3, P6). Chapter 9 (elevation, real-depth translation). Chapter 10 (materials, direct transfer). Chapter 14 (Rd-1, Rd-4, direct source). Chapter 15 (motion tiers, assumed transferable). Chapter 44 (Cu-2, Cu-3, direct translation source). Chapter 53 (accessibility methodology, deferred standard). Chapter 71 (spatial-AI combination, unresolved). Master Vision Chapter 8, in full.

---

## 16. FUTURE EXPANSION

**Documented limitations.** This entire chapter is the most speculative in the Bible — it has zero real spatial implementation to test against, and every principle here should be treated as a hypothesis about how this brand's material language behaves in a new medium, not a verified specification, until real spatial work exists to check it against.

---

*End of Chapter 73. The next and final chapter, per the authoring sequence, is The Ten-Year Test — written last so it can be judged against everything that came before it, not merely assert a standard in the abstract.*
