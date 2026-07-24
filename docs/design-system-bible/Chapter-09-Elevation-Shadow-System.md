# CHAPTER 9 — ELEVATION & SHADOW SYSTEM

**Trady Perch Design System Bible · Volume I: Foundations**
*First-canonical-draft.*

**Inherited From:** Master Vision §6.5 (Elevation, Depth, Glass & Glow), §20.5 (Shadow & Elevation Scale philosophy). Design System Bible Chapter 1 (P2, P7), Chapter 2, §4 (required Core category), Chapter 3 (background colors shadows are derived from).

---

## 1. INTRODUCTION

Master Vision §20.5 names the shape of this chapter before this chapter exists: "a small number of discrete depth steps... rather than a continuous range." §6.5 adds the material character those steps must have — soft, diffuse, and background-derived, never a generic drop-shadow. This chapter resolves both into three named elevation steps with exact values.

This chapter depends on Chapter 3 directly, since every shadow's color is derived from the background palette defined there, not from an independent black. Chapter 19 (Cards) and Chapters 23–25 (Dialogs, Drawers, Toasts) — all elevation-dependent components — depend on this chapter in turn; Chapter 10 (Materials) builds its glass and metal surface language on top of the same depth logic.

---

## 2. PHILOSOPHY

The rejected alternative is a continuous elevation range — shadow intensity scaled freely to whatever "feels right" for a given component's perceived importance. This was rejected for the same reason Chapter 2 rejects continuous ranges generally: it cannot be audited, and it invites the exact one-off proliferation Principle 7 exists to prevent. Three discrete steps, matched to three genuinely distinct real-world depth relationships — flush, resting-but-separate, and floating-above — is enough resolution to cover every case this system needs without inviting a fourth "slightly deeper" shadow the moment someone feels like one component deserves to stand out a little more.

---

## 3. CORE PRINCIPLES

### El-1 — Three Depth Steps, No Fourth Without Cause

**Purpose.** The system recognizes exactly three elevation steps beyond flush: **Resting**, **Raised**, and **Lifted** (Section 4), corresponding to a card at rest, a card on hover or focus, and a floating overlay (dialog, popover, toast) respectively.

**Reasoning.** Direct restatement of Master Vision §20.5's own three-step model, resolved with actual values.

**Examples.** A card in its default state: Resting. The same card on hover: Raised. A dialog appearing above the page: Lifted.

**When it applies.** To every component that visually separates from its background.

**When it does not apply.** To elements deliberately flush with the page (most body text, most section backgrounds) — see El-4.

**Common misunderstandings.** Assuming every component needs its own dedicated elevation step. Most components reuse Resting/Raised/Lifted directly; a fourth step should only be proposed after these three are shown insufficient, per Principle 7.

### El-2 — Shadow Color Is Always Background-Derived, Never Generic Black

**Purpose.** Every shadow's color is a translucent version of `core.color.black.950` (Chapter 3), never an independently chosen black or gray.

**Reasoning.** Direct restatement of Master Vision §6.5: shadow should read "the way a slightly raised metal panel catches ambient light," which requires the shadow to feel like it belongs to *this* background specifically, not a generic, borrowed drop-shadow default most UI frameworks ship with.

**Examples.** `core.shadow.resting` uses `rgba(11, 11, 13, 0.35)` — `black.950`'s exact RGB values at partial opacity, not `rgba(0, 0, 0, 0.35)`.

**When it applies.** To every shadow value in the system.

**When it does not apply.** No exception.

**Common misunderstandings.** Assuming the difference between `black.950` and pure black is imperceptible and therefore not worth the discipline. At low opacity, the difference is genuinely subtle — the discipline matters because it keeps the *system* internally consistent (one true black, referenced everywhere, per Chapter 3's C-1) rather than because any single shadow's tint is independently noticeable.

### El-3 — Blur and Distance Scale Together, Never Independently

**Purpose.** Moving from Resting to Raised to Lifted increases both the shadow's blur radius and its vertical offset in the same direction — never one without the other.

**Reasoning.** Descends from Principle 2 applied to a single visual dimension (perceived depth): a shadow with high blur but low offset, or vice versa, reads as inconsistent or physically implausible, breaking the "one dominant, legible depth cue" a viewer should perceive at a glance.

**Examples.** Resting → Raised increases both offset (2px → 8px) and blur (8px → 20px) together; neither value moves alone.

**When it applies.** To the relationship between any two elevation steps.

**When it does not apply.** No exception — a shadow that violates this monotonic relationship is a specification error, not a legitimate style choice.

**Common misunderstandings.** Assuming opacity must scale identically to blur and offset. Opacity increases modestly across the three steps (Section 4) but is tuned independently for legibility against the dark background — the *shape* of the shadow (blur, offset) is what must move in lockstep; its darkness is a secondary, separately tunable variable.

### El-4 — Hairline Borders Substitute for Shadow at Flush Elevation

**Purpose.** An element with no elevation (flush with its background) that still needs a visible boundary uses `semantic.color.border.default` (Chapter 3) instead of a shadow.

**Reasoning.** A flush element, by definition, casts no shadow — using one anyway would misrepresent its actual depth relationship to the page. Master Vision §6.5 specifies hairline borders precisely for this case: definition without implying elevation that isn't real.

**Examples.** A section divider, or a flat input field before focus, uses a hairline border, never a faint shadow "just to add definition."

**When it applies.** To any flush-elevation element needing visible separation from its background.

**When it does not apply.** To an input field's focus state, which legitimately gains a small amount of Resting-level elevation as part of its focus treatment (Chapter 17) — at that point it is no longer flush, and El-1 through El-3 apply normally.

**Common misunderstandings.** Treating a border and a shadow as interchangeable stylistic choices. They represent two different physical claims — a border says "this is a distinct region on the same plane"; a shadow says "this is a separate plane, elevated above the one behind it" — and using the wrong one misrepresents the actual relationship.

---

## 4. COMPLETE DESIGN SPECIFICATION

| Token | Offset (y) | Blur | Color | Use |
|---|---|---|---|---|
| `core.shadow.resting` | 2px | 8px | `rgba(11, 11, 13, 0.35)` | Card, default state. |
| `core.shadow.raised` | 8px | 20px | `rgba(11, 11, 13, 0.45)` | Card hover/focus; button hover. |
| `core.shadow.lifted` | 20px | 48px | `rgba(11, 11, 13, 0.55)` | Dialogs, popovers, toasts, drawers. |

**Semantic roles:**

| Token | References |
|---|---|
| `semantic.elevation.card` | `core.shadow.resting` |
| `semantic.elevation.card-hover` | `core.shadow.raised` |
| `semantic.elevation.overlay` | `core.shadow.lifted` |

No shadow token is defined for flush elevation — per El-4, flush elements use `semantic.color.border.default` instead, which is a color token (Chapter 3), not a shadow token.

---

## 5. MEASUREMENTS

- **Elevation steps: 3**, plus flush (which is the absence of a shadow, not a fourth shadow value). *(El-1)*
- **Offset progression:** 2px → 8px → 20px (×4, then ×2.5). **Blur progression:** 8px → 20px → 48px (×2.5, then ×2.4) — both increase together at each step, per El-3, though not at an identical ratio to each other; blur consistently runs larger than offset at every step, which is what produces the soft, diffuse quality Master Vision §6.5 calls for rather than a harder, more directional shadow.
- **Opacity progression:** 0.35 → 0.45 → 0.55 — a modest, roughly linear increase, tuned for legibility against the near-black background rather than derived mathematically from the offset/blur progression.

---

## 6. BEHAVIORAL RULES

**Before adding elevation to any component.** Select Resting, Raised, or Lifted based on the component's actual depth relationship (at rest, interactively raised, or floating above the page) — never based on how much visual emphasis the component "deserves" independent of its real depth.

**Under a proposal for a fourth elevation step.** Apply Principle 7 — show that Resting, Raised, and Lifted together fail a specific, real case before proposing a new step.

---

## 7. MOTION SPECIFICATION

Transitions between elevation steps (Resting → Raised on hover) animate both shadow properties together, per El-3, using Chapter 15's Quick timing tier — fast enough to feel like immediate interactive feedback, per Master Vision §9.4's hover-state guidance, never slow enough to feel like a deliberate, ceremonial reveal.

---

## 8. ACCESSIBILITY

Elevation and shadow are supplementary depth cues, never the sole indicator of interactivity or state — a raised shadow on hover must always be paired with another signal (a border color shift, a cursor change) since shadow differences can be difficult to perceive for some low-vision users, consistent with Master Vision §22's requirement that meaning never rest on a single, easily-missed visual channel alone.

---

## 9. RESPONSIVE BEHAVIOUR

Shadow values do not change across breakpoints — a card's Resting shadow is identical on Mobile and Desktop. What may reasonably change is *which* elevation step a given interaction uses: touch interfaces (Chapter 43) have no hover state, so Raised may need to be reached via a press/active state instead of a hover state at Mobile and Tablet ranges (Chapter 8).

---

## 10. AI & FUTURE INTERFACES

A spatial environment (Chapter 73) will need this three-step model translated into genuine physical depth rather than a simulated 2D shadow — El-1's three named relationships (flush, resting, floating) map surprisingly directly onto real spatial placement, which suggests this chapter's conceptual model, if not its exact pixel values, should transfer with less friction than most Foundations chapters' visual specifics will.

---

## 11. DO

A pricing tier card at Resting elevation by default, gaining Raised elevation the moment it becomes the visitor's hovered or keyboard-focused choice — a legible, physically coherent depth change tied directly to a real interaction state.

## 12. DON'T

Giving a featured or "recommended" pricing tier a permanently Lifted shadow simply to make it stand out more than the other tiers, even though it is not actually floating above the page in any interactive sense. This misrepresents the component's real depth relationship per El-4's reasoning; the correct way to signal "recommended" is Chapter 3's `accent.primary` treatment (a gold border or highlight), not a mismatched elevation claim.

---

## 13. ANTI-PATTERNS

**Elevation-as-emphasis.** Using a higher elevation step than a component's actual depth relationship warrants, simply because "more shadow" reads as "more important." This is dangerous because it breaks the direct, learnable correspondence between shadow and real depth that makes the whole three-step system legible in the first place — once elevation stops reliably meaning depth, it stops communicating anything at all. It is detected by asking, for any Raised or Lifted element, whether it is actually elevated above its surroundings in an interactive or overlay sense, or merely intended to look emphasized. It is fixed by using color (Chapter 3) or typography (Chapter 4) for emphasis instead, reserving elevation strictly for genuine depth.

---

## 14. QUALITY ASSURANCE CHECKLIST

- [ ] Does this component's elevation step match its actual depth relationship to the page (flush, resting, raised, or floating)? *(El-1)*
- [ ] Is the shadow color derived from `core.color.black.950`, never an independently chosen black? *(El-2)*
- [ ] Do offset and blur increase together across any elevation transition, never independently? *(El-3)*
- [ ] Does a flush element needing visual separation use a hairline border rather than a shadow? *(El-4)*
- [ ] Is elevation paired with at least one other signal (color, cursor) rather than serving as the sole indicator of interactivity?

---

## 15. CROSS REFERENCES

Chapter 1 (P2, P7). Chapter 2 (Core category, §4). Chapter 3 (shadow color source; border token for El-4). Chapter 10 (Materials, built on this depth logic). Chapter 15 (transition timing). Chapter 19 (Cards). Chapters 23–25 (Dialogs, Drawers, Toasts). Master Vision §6.5, §20.5.

---

## 16. FUTURE EXPANSION

**Documented limitations.** These shadow values have been specified against a solid, flat background per Chapter 3. Their appearance against a glass or blurred surface (Chapter 10) has not yet been verified and should be re-checked once that chapter is written, since a translucent surface beneath a shadow may require a different opacity to read correctly.

---

*End of Chapter 9. The next chapter, Materials, builds the system's glass and metal surface language on top of the depth model defined here.*
