# CHAPTER 49 — MOBILE DESIGN STANDARDS

**Trady Perch Design System Bible · Volume IV: Platform, Mode & Accessibility**

**Inherited From:** Master Vision Chapter 21 (Mobile & Responsive Philosophy, in full). Design System Bible Chapter 1 (P4), Chapter 8 (Responsive & Breakpoint System), Chapter 20 (Navigation, mobile collapse), Chapter 24 (Drawers), Chapter 43 (Touch & Gesture Standards).

---

## 1. INTRODUCTION

Chapter 8 defined the Mobile range's lower bound and general resolution mechanism. This chapter is where every component in Volume II gets its actual, complete Mobile-range resolution — not left as an implicit exercise for whoever eventually builds it, per Master Vision Chapter 21's explicit warning against exactly that gap.

This chapter depends on Chapter 8 directly and every Volume II component chapter, each of which already specifies its own Mobile behavior in its own §9 — this chapter consolidates and adds Mobile-specific rules that cut across multiple components at once.

---

## 2. PHILOSOPHY

The rejected alternative is trusting that each component chapter's individual §9 section, written in isolation, adds up to a coherent Mobile experience once assembled. This was rejected because cross-component Mobile concerns — how much vertical space a stacked page consumes, how navigation and content compete for limited screen real estate together — are not visible from within any single component's own chapter, and need a page-level, cross-component treatment this chapter provides.

---

## 3. CORE PRINCIPLES

### Mb-1 — Mobile Is Verified as a Complete Experience, Never a Compressed One

**Purpose.** Every page is designed and approved at Mobile range on its own terms, per Chapter 8's Re-2, before its Desktop resolution is treated as primary.

**Reasoning.** Direct restatement of Chapter 8's Re-2, elevated to this chapter's own first principle since Mobile Design Standards is where that process discipline is actually enforced end to end.

**When it applies.** To every page and component. **When it does not apply.** No exception.

### Mb-2 — Vertical Rhythm Compresses Proportionally, Never Uniformly to a Minimum

**Purpose.** Section and component spacing at Mobile range uses Chapter 5's defined Mobile-specific token values (already resolved per breakpoint in that chapter's own tables) — it never collapses further to an arbitrary tightened value chosen because Mobile "needs to save space."

**Reasoning.** Direct restatement of Master Vision §21 and Chapter 5's Section 2 philosophy: generous space remains a luxury signal at Mobile scale, recalibrated, never abandoned.

**When it applies.** To every spacing decision at Mobile range. **When it does not apply.** No exception.

### Mb-3 — The Intro Sequence Is Time-Compressed, Never Simplified in Content

**Purpose.** Chapter 9's intro sequence runs at a shorter total duration at Mobile range (approximately 60% of its Desktop Ceremonial-tier length) while retaining every content beat (black silence, line ignition, reflection, wordmark, tagline, pause, dissolve) — never dropping a beat to save time.

**Reasoning.** Descends from Master Vision §13's guidance that the intro should be "tuned for a shorter, still-impactful mobile-appropriate duration," resolved into a specific compression ratio rather than left as a vague direction re-interpreted per implementation.

**When it applies.** To the intro sequence at Mobile range specifically. **When it does not apply.** No exception.

---

## 4. COMPLETE DESIGN SPECIFICATION

**Navigation:** Chapter 20's five items collapse into Chapter 24's right-anchored Drawer, CTA remains visible in the collapsed bar (Chapter 20, Nv-3). **Spacing:** Chapter 5's Mobile-column values throughout, no further compression. **Intro:** approximately 60% of Desktop Ceremonial duration, all content beats retained. **Touch targets:** Chapter 43's 44px floor enforced throughout.

---

## 5. MEASUREMENTS

Intro duration compression: ~60% of Desktop length. Touch target: 44×44px minimum (Chapter 43).

---

## 6. BEHAVIORAL RULES

**Before approving any page.** Verify its complete Mobile rendering first, per Mb-1, independent of Desktop.

---

## 7. MOTION SPECIFICATION

All Chapter 15 tiers apply identically in duration at Mobile range except the intro's Ceremonial tier (Mb-3) — this is the one documented exception to Chapter 15's "duration does not change across breakpoints" rule, justified by the intro's unique, single-occurrence nature and Master Vision's own explicit guidance for it specifically.

---

## 8. ACCESSIBILITY

Mobile accessibility inherits every requirement from Chapter 53 in full; this chapter adds no reduced standard for Mobile — touch targets, contrast, and keyboard-equivalent (switch control) operability all apply at full rigor.

---

## 9. RESPONSIVE BEHAVIOUR

This chapter is itself the Mobile-range responsive specification; see Chapter 8 for the boundary definitions and Chapters 50–51 for the adjacent ranges.

---

## 10. AI & FUTURE INTERFACES

A mobile AI chat surface (Chapter 45) inherits this chapter's spacing and touch-target rules directly, with no mobile-specific exception to that chapter's own visual specification.

---

## 11. DO / 12. DON'T

**Do:** Approving a new homepage section by first checking its complete Mobile rendering, confirming spacing, navigation collapse, and touch targets all satisfy this chapter before ever opening a Desktop preview. **Don't:** Designing a section exclusively at Desktop width and patching Mobile issues after the fact — the exact anti-pattern Chapter 8's Section 13 already names.

---

## 13. ANTI-PATTERNS

See Chapter 8, Section 13 ("Desktop-first retrofitting") — this chapter inherits that anti-pattern directly rather than restating an independent version of it.

---

## 14. QUALITY ASSURANCE CHECKLIST

- [ ] Was this page's Mobile rendering verified complete before its Desktop rendering was treated as primary? *(Mb-1)*
- [ ] Does spacing use Chapter 5's defined Mobile values, with no further ad hoc compression? *(Mb-2)*
- [ ] Does the intro sequence retain every content beat at its compressed Mobile duration? *(Mb-3)*

---

## 15. CROSS REFERENCES

Chapter 1 (P4). Chapter 5 (spacing). Chapter 8 (breakpoint definition). Chapter 9 (intro sequence). Chapter 20 (navigation collapse). Chapter 24 (Drawer target). Chapter 43 (touch targets). Chapter 53 (full accessibility). Master Vision Chapter 21.

---

## 16. FUTURE EXPANSION

The 60% intro-compression ratio is this chapter's first-canonical proposal and should be validated against the real, built intro sequence once it exists.

---

*End of Chapter 49. The next chapter, per the authoring sequence, is Tablet Design Standards.*
