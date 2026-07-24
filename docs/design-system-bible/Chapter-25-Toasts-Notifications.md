# CHAPTER 25 — TOASTS & NOTIFICATIONS

**Trady Perch Design System Bible · Volume II: Components**
*First-canonical-draft.*

**Inherited From:** Master Vision §17.5 (Loading, Success, Error States), §18.4 (Testimonials & Metrics — the "auto-advance, pause on interaction" logic this chapter borrows the spirit of for auto-dismiss timing). Design System Bible Chapter 1 (P2, P4), Chapter 3 (color, C-4), Chapter 15 (motion), Chapter 17 (anatomy standard), Chapter 39 (state model, Success/Error's primary confirmation surface).

---

## 1. INTRODUCTION

A Toast is where Chapter 18 (Buttons) and Chapter 23 (Dialogs) both pointed a successful or failed action's confirmation — the quiet, transient surface that reports what happened without demanding anything further from the user. This chapter specifies that surface completely.

This chapter depends on Chapter 39 directly, since Toasts are the primary real-world consumer of the Success and Error content states. It is depended on by nearly every component chapter that triggers an asynchronous action — Chapters 18, 21, 22, and 23 all reference this chapter as their action-result destination.

---

## 2. PHILOSOPHY

The rejected alternative is a Toast that behaves like a miniature Dialog — requiring a dismissal click, offering multiple action buttons, persisting until acknowledged. This was rejected because it misunderstands the component's actual job: a Toast reports a fact that has already happened; it does not ask the user to decide anything. A component asking for a decision is a Dialog (Chapter 23), regardless of how small or transient its container looks.

---

## 3. CORE PRINCIPLES

### Ts-1 — A Toast Confirms; It Never Asks

**Purpose.** A Toast may contain, at most, one link-style action — most commonly "Undo" — and never a full button pair requiring a genuine decision between two outcomes.

**Reasoning.** Descends from Principle 4 and the same reasoning that separates Chapter 23's Dialog from Chapter 24's Drawer: a component's interaction weight should match its actual job, and "confirm a fact" is a lighter job than "make a decision."

**Examples.** "Case study deleted. Undo" — one optional link, no decision required to dismiss it. Never "Case study deleted. Keep / Restore" as two competing buttons.

**When it applies.** To every Toast.

**When it does not apply.** No exception — content requiring an actual decision belongs in a Dialog, however tempting it is to compress it into a smaller surface.

### Ts-2 — One Toast Visible at a Time, Queued Never Stacked

**Purpose.** Only one Toast is visible at any moment. If a second is triggered while the first is still showing, it queues and appears after the first dismisses, rather than stacking visually above or beside it.

**Reasoning.** Descends from Principle 2: multiple simultaneous Toasts compete for the same brief moment of attention a single Toast is designed to hold cleanly.

**Examples.** Two rapid successive save actions produce two Toasts shown sequentially, each fully visible and legible in turn, never two overlapping banners at once.

**When it applies.** To every Toast trigger.

**When it does not apply.** No exception.

### Ts-3 — A Toast Dismisses Itself; It Never Requires User Action to Disappear

**Purpose.** Every Toast auto-dismisses after a fixed duration. A user may dismiss it early (a close control is available) but is never required to act for it to disappear.

**Reasoning.** Direct extension of Principle 4: a persistent notification that blocks part of the screen until acknowledged imposes exactly the kind of low-grade, ongoing demand for attention this brand's calm register (Master Vision §2.2) is built to avoid.

**Examples.** A success Toast displays for 4 seconds, then fades out automatically, whether or not the user has looked at it.

**When it applies.** To every Toast.

**When it does not apply.** No exception — a notification that must be manually dismissed to disappear is, by this chapter's definition, not a Toast; it should be evaluated as a Dialog instead.

### Ts-4 — Severity Determines Color Only, Never Position or Size

**Purpose.** Success, Error, and informational Toasts share identical position, size, and anatomy. Only their color (Chapter 3, C-4) and icon differ by severity.

**Reasoning.** Descends from Principle 2: a differently-positioned or differently-sized Error Toast would need to be relearned separately from the Success pattern a user already understands, adding cognitive cost for no real benefit — consistency of form, varied only in the one dimension (color/icon) that actually carries the meaning, is the more legible design.

**Examples.** A Success Toast and an Error Toast occupy the identical screen position and dimensions, differing only in `text.success`/`text.error` coloring and their respective icons.

**When it applies.** To every Toast regardless of severity.

**When it does not apply.** No exception.

---

## 4. COMPLETE DESIGN SPECIFICATION

**Anatomy** (per An-1): Icon (severity-indicating) → Message text → optional single link action (Ts-1) → close control.

**Variant axes** (per An-2): **Severity** — `success`, `error`, `info` (Chapter 3 colors, per Ts-4).

**Token consumption:** `semantic.color.text.success`/`text.error`, `semantic.color.text.secondary` (info severity), `semantic.elevation.overlay` (Chapter 9), Chapter 11 icons matched to severity.

---

## 5. MEASUREMENTS

- **Maximum simultaneously visible Toasts: 1.** *(Ts-2)* **Maximum action links per Toast: 1.** *(Ts-1)*
- **Auto-dismiss duration: 4 seconds** for Success/Info, **6 seconds** for Error (a longer window, since an error message often carries more to read and act on before it disappears).

---

## 6. STATE COVERAGE (per An-3)

Hover: pauses the auto-dismiss countdown, matching the "pause on interaction" logic Master Vision §18.4 establishes for testimonial carousels — a user actively reading the Toast should not have it disappear mid-read. Focus: the close control and any action link are keyboard-focusable with Chapter 39's default ring. Active/Disabled/Loading: not applicable to the Toast container itself. Error/Success: these are the Toast's own severity variants, not separate states layered on top. Empty: not applicable — a Toast with no message is not a valid instance.

---

## 7. MOTION SPECIFICATION

Entrance: Standard tier (300ms), Entrance curve, sliding or fading in from a fixed screen position (typically bottom-center or top-right, chosen once and applied consistently). Exit: Quick tier (150ms), Exit curve, per Master Vision §10.4.

---

## 8. ACCESSIBILITY

A Toast is announced to assistive technology via an appropriate live-region pattern the moment it appears, without requiring the user to have focus anywhere near its screen position — a purely visual notification a screen-reader user would otherwise miss entirely fails Master Vision §22 outright.

---

## 9. RESPONSIVE BEHAVIOUR

Position and sizing adapt to Chapter 8's breakpoints (typically full-width at Mobile, fixed-width at Desktop and above) while anatomy and severity-color rules remain constant.

---

## 10. AI & FUTURE INTERFACES

A voice interface's direct equivalent is a brief, spoken confirmation ("Done — case study deleted") with no expectation of a response, mirroring Ts-1's confirm-don't-ask logic exactly.

---

## 11. DO / 12. DON'T

**Do:** A Toast confirming "Message sent" that fades automatically after 4 seconds, with no action required to dismiss it. **Don't:** A Toast that persists indefinitely until manually closed, effectively functioning as an under-specified Dialog wearing a Toast's visual style — this should be rebuilt as an actual Dialog per Ts-3's definition.

---

## 13. ANTI-PATTERNS

**Toast overload.** Triggering a Toast for every minor system event (each autosave, each field validation) rather than reserving them for outcomes genuinely worth confirming. This is dangerous because frequent Toasts train users to ignore them, defeating Ts-4's entire premise that severity-color still carries meaning — it is detected by auditing Toast trigger frequency during a typical session, and fixed by reserving Toasts for user-initiated actions with a clear, meaningful outcome.

---

## 14. QUALITY ASSURANCE CHECKLIST

- [ ] Does the Toast contain at most one link action and no decision-requiring button pair? *(Ts-1)*
- [ ] Is only one Toast visible at a time, with additional triggers queued? *(Ts-2)*
- [ ] Does the Toast auto-dismiss without requiring user action? *(Ts-3)*
- [ ] Does severity vary only color and icon, never position or size? *(Ts-4)*
- [ ] Is the Toast announced to assistive technology via a live region?

---

## 15. CROSS REFERENCES

Chapter 1 (P2, P4). Chapter 3 (C-4). Chapter 9 (elevation). Chapter 15 (motion). Chapter 17 (anatomy standard). Chapter 18, 21, 22, 23 (all reference this chapter as their action-result destination). Chapter 39 (state model). Master Vision §17.5, §18.4.

---

## 16. FUTURE EXPANSION

**Documented limitations.** This chapter assumes a single global Toast position; a future dashboard with multiple independent panels may need to reconsider whether panel-scoped Toasts are warranted, which would require revisiting Ts-2's single-Toast-system-wide assumption.

---

*End of Chapter 25. The next chapter, per the authoring sequence, is Dropdowns, Menus & Popovers.*
