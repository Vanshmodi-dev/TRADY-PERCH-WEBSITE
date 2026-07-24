# CHAPTER 51 — DESKTOP DESIGN STANDARDS

**Trady Perch Design System Bible · Volume IV: Platform, Mode & Accessibility**

**Inherited From:** Master Vision §3.3 (precision-instrument register, most naturally read at desktop scale). Design System Bible Chapter 1 (P7), Chapter 8 (Responsive & Breakpoint System), Chapter 44 (Cursor & Pointer Behavior).

---

## 1. INTRODUCTION

Most of this Bible is implicitly written Desktop-first already, even though Chapter 8's Re-2 correctly mandates a Mobile-first *design process*. This chapter exists to make that implicit default explicit and to catalog exactly which patterns are Desktop-exclusive by considered decision, not by oversight.

This chapter depends on Chapter 44 directly for its cursor-exclusive behaviors and is depended on by Chapter 55 (Performance-Conscious Design Patterns, Desktop-tier animation budget).

---

## 2. PHILOSOPHY

The rejected alternative is assuming Desktop simply "gets everything" by default, with no specific catalog of what is genuinely exclusive to it. This was rejected because an undocumented assumption is exactly what erodes over time — a future contributor unaware that cursor-magnetic effects (Chapter 44) are deliberately Desktop-exclusive might attempt to port them to touch, producing a broken, laggy approximation Chapter 43 already correctly forbids.

---

## 3. CORE PRINCIPLES

### Ds-1 — Desktop-Exclusive Patterns Are Named, Not Assumed

**Purpose.** Every pattern exclusive to Desktop range — cursor-aware effects (Chapter 44), hover-dependent reveals with no touch equivalent by design (Chapter 30's Tooltip, per Tt-3's intentional absence) — is explicitly cataloged here rather than left as an implicit consequence of "Desktop has a mouse."

**Reasoning.** Descends from Principle 1: an undocumented exclusivity is easy to violate accidentally by a future contributor who doesn't know it was ever a deliberate decision.

**When it applies.** To every genuinely Desktop-exclusive pattern in the system. **When it does not apply.** No exception.

### Ds-2 — Additional Space Is Used for Breathing Room, Never Merely to Fill It

**Purpose.** The additional horizontal and vertical space available at Desktop range (versus Mobile/Tablet) is spent on Chapter 5's generous spacing philosophy at its fullest expression, never on cramming additional content that wouldn't otherwise fit at a smaller viewport.

**Reasoning.** Descends from Principle 4 and Master Vision §3.2: more available space is a temptation to add more content, and this principle names that temptation directly as something to resist rather than something Desktop's extra room is "for."

**When it applies.** To every Desktop-range layout decision. **When it does not apply.** No exception.

---

## 4. COMPLETE DESIGN SPECIFICATION

**Desktop-exclusive patterns (Ds-1):** Chapter 44's cursor-aware ambient effects (Hero, Intro zones only). Chapter 30's Tooltip (present at Desktop, intentionally absent at Mobile per Tt-3). Chapter 20's full horizontal navigation bar (versus the Drawer collapse below it). **Space usage (Ds-2):** Chapter 7's Layout patterns retain their full column-span proportions at Desktop without adding a fourth column or additional simultaneous content beyond what the Tablet/Mobile version already specifies with fewer columns.

---

## 5. MEASUREMENTS

No new measurements — this chapter's contribution is cataloging existing Desktop-scoped values from Chapters 44, 30, and 20, not introducing new ones.

---

## 6. STATE COVERAGE / 7. MOTION / 8. ACCESSIBILITY / 9. RESPONSIVE

Inherited from Chapter 8 and each relevant component chapter directly.

---

## 10. AI & FUTURE INTERFACES

No Desktop-specific consideration beyond Chapter 44's own AI/Future Interfaces section.

---

## 11. DO / 12. DON'T

**Do:** Confirming, when adding a new hover-dependent feature, whether it belongs on this chapter's Desktop-exclusive list or needs Chapter 43's touch-equivalent treatment — treating the decision explicitly either way. **Don't:** Adding a fourth column to a Desktop Structured Grid simply because Desktop has room for it, when the Tablet/Mobile versions of the same grid show fewer, larger cards — a direct Ds-2 violation that adds content density Desktop's extra space wasn't meant to invite.

---

## 13. ANTI-PATTERNS

**Space-filling content creep.** Adding additional cards, columns, or content blocks at Desktop range simply because the viewport has room, rather than maintaining the same generous proportions the Mobile/Tablet versions already establish at their own scale. This is detected by comparing a Desktop layout's actual information density against its Mobile equivalent, and fixed by restoring the same generous, restrained density at Desktop scale.

---

## 14. QUALITY ASSURANCE CHECKLIST

- [ ] Is this Desktop-exclusive pattern explicitly documented, not merely assumed? *(Ds-1)*
- [ ] Is Desktop's additional space spent on breathing room rather than additional content density? *(Ds-2)*

---

## 15. CROSS REFERENCES

Chapter 1 (P4, P7). Chapter 5 (spacing philosophy). Chapter 7 (layout proportions). Chapter 8 (breakpoint definition). Chapter 20 (navigation). Chapter 30 (tooltip). Chapter 44 (cursor effects). Chapter 55 (animation budget, dependent). Master Vision §3.2, §3.3.

---

## 16. FUTURE EXPANSION

No open questions currently identified.

---

*End of Chapter 51. The next chapter, per the authoring sequence, is Dark Mode & Theming Architecture.*
