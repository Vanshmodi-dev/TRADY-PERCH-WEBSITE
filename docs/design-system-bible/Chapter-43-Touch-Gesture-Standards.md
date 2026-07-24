# CHAPTER 43 — TOUCH & GESTURE STANDARDS

**Trady Perch Design System Bible · Volume III: Interaction & Behavior**

**Inherited From:** Master Vision §18.12 (Touch Interactions), Chapter 21 (Mobile & Responsive Philosophy — touch targets). Design System Bible Chapter 1 (P4), Chapter 16 (haptics mapping), Chapter 39 (state model, Hover's unavailability at touch ranges).

---

## 1. INTRODUCTION

Master Vision §18.12 already flags that every hover-dependent pattern in this system needs a deliberate touch equivalent. This chapter is where every one of Volume II's hover-dependent components — Cards, Navigation, Tooltips, Dropdowns — gets its actual touch equivalent specified, rather than left as a general principle each component chapter has to solve independently.

This chapter depends on Chapter 16's haptic mapping and Chapter 39's Hover-unavailability note directly. It is depended on by Chapters 49 (Mobile Design Standards).

---

## 2. PHILOSOPHY

The rejected alternative is assuming touch devices will "just work" once a component's desktop hover behavior is defined, on the theory that touch is close enough to a mouse click to need no separate consideration. This was rejected because hover has no touch equivalent at all — a touch interaction is either a tap (equivalent to a click) or nothing; there is no touch state that corresponds to "the pointer is near this element but hasn't activated it yet," which is precisely what hover communicates on desktop. Every hover-dependent pattern must therefore be redesigned, not merely ported, for touch.

---

## 3. CORE PRINCIPLES

### Tg-1 — 44×44px Minimum Touch Target, No Exceptions

**Purpose.** Every touch-interactive element provides at least a 44×44px effective touch area, even where its visible size is smaller — achieved with invisible padding extending the tappable region beyond the visual boundary if necessary.

**Reasoning.** This value, already referenced in Chapters 18 and 21, is formalized here as this chapter's own primary numeric commitment: below this size, mis-taps become common enough to meaningfully degrade the experience, particularly for users with limited dexterity.

**Examples.** A Chapter 18 `sm`-size icon button, visually 32px, still provides a 44px tappable area via padding.

**When it applies.** To every touch-interactive element at Mobile and Tablet ranges. **When it does not apply.** No exception.

### Tg-2 — Every Hover-Dependent Pattern Has a Defined Touch Equivalent

**Purpose.** Any component whose desktop specification includes a hover state (Chapter 19's Card elevation, Chapter 20's Navigation dropdown, Chapter 30's Tooltip) has an explicitly designed touch equivalent — never a silent absence of that behavior on touch devices.

**Reasoning.** Direct restatement of Master Vision §18.12.

**Examples.** Chapter 19's Interactive Card hover-elevation has no touch equivalent (touch has no "about to tap" state) — its Active (press) state alone carries the full tactile feedback burden on touch, which Chapter 39's state model already anticipates. Chapter 30's Tooltip, which depends on a hover delay with no touch equivalent, simply does not appear on touch per Chapter 30's own Tt-3 (never the sole carrier of essential information) — its content, being non-essential, is correctly omitted rather than forced into an awkward long-press substitute.

**When it applies.** To every hover-dependent component. **When it does not apply.** No exception — the "equivalent" may legitimately be "intentional absence," per Tt-3, but that absence must be a deliberate decision, not an oversight.

### Tg-3 — Gestures Are Additive Shortcuts, Never the Only Path

**PurPose.** Any gesture-based interaction (swipe-to-dismiss, pull-to-refresh) is always accompanied by an equally functional, visible button or control performing the same action — a gesture may exist as a faster shortcut, but never as the sole means of accomplishing a task.

**Reasoning.** Descends from Principle 1: a gesture is undiscoverable without prior knowledge (there is no visual affordance suggesting "swipe here"), and a user unaware of the gesture must have an equally complete alternative available.

**Examples.** A Toast (Chapter 25) may support swipe-to-dismiss as a shortcut, but its visible close control (already required by that chapter) remains the guaranteed, discoverable path.

**When it applies.** To every gesture-based interaction. **When it does not apply.** No exception.

---

## 4. COMPLETE DESIGN SPECIFICATION

**Touch target minimum:** 44×44px (Tg-1). **Hover-to-touch equivalent mapping:** Card/Button elevation-hover → Active/press only (Chapter 39). Navigation dropdown hover-open → tap-to-open, matching Chapter 26's `click` trigger type exactly rather than a separate touch-specific behavior. Tooltip hover-delay → intentional absence (Tt-3), or long-press where the underlying information is judged worth the exception. **Permitted gestures:** swipe-to-dismiss (Toasts, list items), pull-to-refresh (dashboard lists) — both always paired with a visible button equivalent, per Tg-3.

---

## 5. MEASUREMENTS

Touch target: 44×44px minimum. Touch target gap (Chapter 5, §8): 16px minimum between independently tappable elements.

---

## 6. BEHAVIORAL RULES

**Before shipping any touch-facing component.** Verify its effective touch target against the 44px floor directly, not against its visible size. **Before adding any gesture.** Confirm an equally functional, visible alternative already exists per Tg-3.

---

## 7. MOTION SPECIFICATION

Touch feedback (Active/press states) uses Chapter 15's Instant tier identically to pointer-driven Active states (Chapter 39) — touch does not need a slower or different timing than pointer interaction, only a different *trigger* (press rather than hover-then-click).

---

## 8. ACCESSIBILITY

Touch targets meeting the 44px floor directly serve users with limited fine-motor control, one of the most common and impactful accessibility improvements available at negligible design cost — this chapter treats the floor as a hard accessibility requirement, not merely a usability nicety.

---

## 9. RESPONSIVE BEHAVIOUR

This chapter's rules apply specifically at Mobile and Tablet ranges (Chapter 8) where touch is the primary or likely input; Desktop and Wide ranges assume pointer precision is available but should not assume touch is entirely absent (a touchscreen laptop), so touch targets should not be aggressively shrunk below this floor even at Desktop range where hover remains the primary expected interaction.

---

## 10. AI & FUTURE INTERFACES

A spatial environment (Chapter 73) replaces touch with hand-tracking or controller-based gesture — Tg-1's minimum-target reasoning translates directly into a minimum angular size for any selectable spatial object, and Tg-3's gesture-must-have-an-alternative principle applies with even more force in a medium where gesture vocabulary is far less standardized across platforms than touch gestures currently are.

---

## 11. DO / 12. DON'T

**Do:** A Toast supporting swipe-to-dismiss while its visible close (×) control remains fully present and functional. **Don't:** A mobile navigation Drawer that can only be closed by swiping it away, with no visible close control — a direct Tg-3 violation leaving any user unaware of the swipe gesture with no way to close the menu.

---

## 13. ANTI-PATTERNS

**Gesture-only interaction.** Shipping a feature whose only interaction path is an undiscoverable gesture, because it felt elegant and reduced visual clutter. This is detected by attempting every interaction using only taps on visible controls, with no gesture knowledge assumed, and fixed by adding the missing visible alternative per Tg-3.

---

## 14. QUALITY ASSURANCE CHECKLIST

- [ ] Does every touch-interactive element provide at least a 44×44px effective target? *(Tg-1)*
- [ ] Does every hover-dependent component have an explicitly designed touch equivalent, including deliberate absence where appropriate? *(Tg-2)*
- [ ] Does every gesture have an equally functional, visible alternative? *(Tg-3)*

---

## 15. CROSS REFERENCES

Chapter 1 (P1, P4). Chapter 5 (§8, gap minimum). Chapter 8 (breakpoint scope). Chapter 16 (haptic pairing). Chapter 18, 19, 20, 25, 30 (primary hover-to-touch translation consumers). Chapter 39 (state model). Chapter 49 (Mobile Design Standards, direct dependent). Master Vision §18.12, Chapter 21.

---

## 16. FUTURE EXPANSION

No open questions currently identified.

---

*End of Chapter 43. The next chapter, per the authoring sequence, is Cursor & Pointer Behavior.*
