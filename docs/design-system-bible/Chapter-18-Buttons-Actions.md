# CHAPTER 18 — BUTTONS & ACTIONS

**Trady Perch Design System Bible · Volume II: Components**
*First-canonical-draft. First component chapter written under Chapter 17's Anatomy Standard.*

**Inherited From:** Master Vision §5.2–§5.3 (The Physics of a Single CTA; Why Gold Is the Only Legitimate CTA Color), §17.1 (Buttons), §18.1 (Hero interaction philosophy). Design System Bible Chapter 1 (P2, P3, P4, P7), Chapter 2 (token resolution; this chapter's first population of the Radius Core category), Chapter 3 (color), Chapter 9 (elevation), Chapter 15 (motion), Chapter 17 (anatomy standard), Chapter 39 (state model, in full).

---

## 1. INTRODUCTION

Buttons carry more strategic weight in this system than their visual simplicity suggests. Master Vision §5.2–§5.3 build an entire argument — the single-CTA doctrine, gold's exclusive claim on the call-to-action role — around this one component family. Getting Buttons right is not a matter of picking a pleasant corner radius; it is the component-level enforcement point for two of this brand's most load-bearing conversion principles.

This chapter depends on Chapter 39 in full — every state a button can be in is drawn directly from that chapter's defaults, not reinvented here. It is the first chapter to apply Chapter 17's Anatomy Standard in practice, and the first component chapter to populate the Radius Core category that Chapter 2, §4 assigned to "Chapter 6/7" but which neither of those chapters, focused on layout structure rather than component geometry, ended up needing to define — Buttons is the first component that genuinely requires it, and populates it properly here, with a note that Chapters 6 and 9 should absorb this population into their own token tables when next revised.

---

## 2. PHILOSOPHY

The rejected alternative — treating "how many buttons should a page have" as a per-page design judgment call, made fresh each time — was already rejected at the strategic level by Master Vision Chapter 5. This chapter's own design work is narrower: making sure the *component itself* cannot be used to quietly circumvent that strategic decision. A button component that makes it equally easy to create five visually loud, gold, "primary" buttons on one screen as it is to create one has not actually enforced anything — it has merely described a preference. This chapter's Emphasis axis (Section 4) is deliberately structured so that "primary" is not just a style choice but a scarce resource the component system itself makes awkward to overuse, mirroring at the component level what Master Vision §5.2 already argues at the page level.

---

## 3. CORE PRINCIPLES

### Bt-1 — Exactly One Primary-Emphasis Button Visible at Once

**Purpose.** At any single scroll position or view, no more than one button carries Primary emphasis (Section 4). Every other action visible at the same moment uses Secondary or Ghost emphasis.

**Reasoning.** Descends directly from P2 (Singular Focus) and Master Vision §5.2's single-CTA physics: a second Primary button in the same view does not add a second opportunity to convert, it splits the attention the one Primary button needed to do its job.

**Examples.** A pricing section showing three tiers may have three buttons ("Choose"), but only the recommended tier's button carries Primary emphasis — the other two use Secondary.

**When it applies.** To every view, at every scroll position.

**When it does not apply.** To buttons in entirely separate, non-simultaneously-visible contexts (a Primary button in the hero and a separate Primary button in the footer's contact section are never visible together and do not compete, per Chapter 7's page-length reasoning).

**Common misunderstandings.** Assuming "exactly one Primary" means every other button must be visually muted to the point of invisibility. Secondary emphasis (Section 4) remains clearly legible and clickable — the rule governs *emphasis level*, not the availability of other real actions.

### Bt-2 — Emphasis Is a Closed, Three-Value Axis

**Purpose.** A button's Emphasis is exactly one of Primary, Secondary, or Ghost. No fourth emphasis value exists.

**Reasoning.** Descends from Principle 7: a fourth emphasis level ("Tertiary," "Subtle") would blur the clean hierarchy Bt-1 depends on — the entire mechanism only works because there are few enough levels that "which one is loudest" is never ambiguous.

**Examples.** A destructive action (Section 4) is not a fourth emphasis value — it is Secondary or Primary emphasis with an Error-state color override (Bt-4), never a new emphasis tier of its own.

**When it applies.** To every button in the system.

**When it does not apply.** No exception.

**Common misunderstandings.** Assuming a visually "smaller" or "quieter" version of Secondary needed for a dense data table's row actions requires a new emphasis value. It requires the Size axis (Section 4) resolving to `sm`, not a new Emphasis value — size and emphasis are independent axes, per Chapter 17's An-2.

### Bt-3 — Icons Support the Label; They Never Replace It

**Purpose.** A button's meaning is always carried by its text label. An icon may accompany a label, but a button with no label at all is a distinct, narrowly-scoped variant (Icon Button, Section 4), never the default treatment of an ordinary action button.

**Reasoning.** A label-less button forces every user to learn or guess an icon's meaning with no textual confirmation, which directly contradicts Master Vision §16.1's demand for clarity a "skeptical, busy" reader shouldn't have to work for — extended here from copy to interface labeling.

**Examples.** "Book a Strategy Call" with a trailing arrow icon: correct. A bare arrow icon standing alone as the CTA, with no text: incorrect for a primary action; acceptable only under the narrowly-scoped Icon Button variant (Section 4), reserved for well-established, universally recognized actions (a close "×," for instance) in space-constrained contexts.

**When it applies.** To every button whose action is not already universally unambiguous from its icon alone.

**When it does not apply.** To the Icon Button variant specifically, and only for the small set of icons Section 4 names as sufficiently universal to stand alone.

**Common misunderstandings.** Assuming any icon a designer finds "obviously clear" qualifies for icon-only treatment. The bar is *universal* recognition, not personal or team-level familiarity — Section 4's named exceptions are deliberately few for exactly this reason.

### Bt-4 — Destructive Actions Override Color, Never Emphasis

**Purpose.** A destructive action (delete, remove, cancel-with-consequence) keeps its Primary or Secondary emphasis structure but overrides its color to Chapter 3's Error role (`border.error`/`text.error`, respecting C-4's text/accent split) rather than becoming a new emphasis category.

**Reasoning.** Descends from Bt-2 and Chapter 3's C-4: "destructive" is a color and meaning signal, not a level of visual loudness — keeping it within the existing Emphasis axis, recolored, preserves Bt-1's clean one-Primary-per-view logic even when the one visible Primary action happens to be destructive.

**Examples.** A "Delete this case study" button: Secondary emphasis structurally, recolored to Chapter 3's error tokens, per Master Vision §5.4's exception allowing more assertive treatment specifically for high-stakes, asymmetric-cost confirmations.

**When it applies.** To any button representing a destructive or high-consequence action.

**When it does not apply.** To an action that is merely negative in tone but not destructive in consequence ("Cancel," with no data loss) — this remains an ordinary Secondary or Ghost button with no color override.

**Common misunderstandings.** Assuming a destructive action should always be Primary emphasis "to make sure it's noticed." Master Vision §5.4 and Restraint as Default (P4) both argue the opposite in most cases — a destructive action is more often correctly Secondary, recolored, precisely so it does not read as the screen's encouraged, default next step.

---

## 4. COMPLETE DESIGN SPECIFICATION

**Anatomy** (per Chapter 17, An-1): Container (the clickable bounding region) → Label (required, except Icon Button) → optional Leading Icon → optional Trailing Icon.

**Variant axes** (per An-2):
- **Emphasis:** `primary` (solid `accent.primary` fill, `background.primary` text), `secondary` (outlined, `border.default` stroke, `text.primary` label), `ghost` (no fill or border, `text.primary` label, reveals a subtle underline on hover).
- **Size:** `sm` (Chapter 4 Caption-adjacent label sizing, `padding.component-sm`), `md` (Body label sizing, `padding.component-md`), `lg` (Body-Large label sizing, `padding.component-lg`).
- **Icon Button** (a distinct anatomy variant, not a fourth Emphasis or Size value): square container, single centered icon, no label, reserved for close (`×`), and no other icon by default without a specific, documented case per Bt-3.

**Radius** (first population of this Core category, per Chapter 2 §4's assignment): `core.radius.md` = 10px, applied to all button sizes — moderate rounding, deliberately neither sharp-cornered (which would read as severe) nor fully pill-shaped (which would read as consumer-casual), consistent with the brief's "sharp edges mixed with soft rounded corners where appropriate." This value is the first entry in what should become a full Radius scale; Chapter 6 and Chapter 9 should incorporate it into their own token tables when next revised.

**Token consumption** (per Chapter 17's required table): `semantic.color.accent.primary`, `semantic.color.accent.pressed`, `semantic.color.border.default`, `semantic.color.text.primary`, `semantic.color.background.primary`, `semantic.color.border.error`, `semantic.color.text.error`, `semantic.elevation.card` (Raised, on hover), `semantic.opacity.disabled`, `semantic.space.padding.component-sm/md/lg`, `core.radius.md`.

---

## 5. MEASUREMENTS

- **Emphasis values: 3.** **Size values: 3.** *(Bt-2, Chapter 17 An-2)*
- **Corner radius: 10px** for all sizes (a fixed value, not scaled per size, since 10px reads correctly across the sm/md/lg range without needing proportional adjustment).
- **Icon Button anatomy: square, side length matching the label-button's height at the same size step**, so an Icon Button and a labeled button of the same size align cleanly when placed adjacently.

---

## 6. STATE COVERAGE (per Chapter 17, An-3)

| State | Treatment |
|---|---|
| **Hover** | Chapter 39 default: Resting → Raised elevation for `primary`/`secondary`; underline reveal for `ghost`. |
| **Focus** | Chapter 39 default: 2px gold focus ring, unmodified. |
| **Active** | Chapter 39 default: 98% scale compression. |
| **Disabled** | Chapter 39 default: `semantic.opacity.disabled` (0.4) applied to the full button; per Chapter 39's St-3, suppresses Hover/Focus/Active entirely. |
| **Loading** | Chapter 39's St-4 combination: button enters Loading + Disabled together on trigger; label is replaced by Chapter 39's branded pulse treatment, sized to the button's existing dimensions so no layout shift occurs. |
| **Error** | Not a state a button itself enters (buttons trigger actions; they do not themselves validate) — a button's *result* may produce an Error state elsewhere (a form field, a toast), but the button returns to its resting state once Loading resolves. |
| **Success** | Same reasoning as Error: not applicable to the button itself; a successful action's confirmation appears elsewhere (Chapter 25, Toasts) while the button returns to resting. |
| **Empty** | Not applicable — a button is not a content container and has no empty condition. |

---

## 7. MOTION SPECIFICATION

Hover: Quick tier (150ms), Entrance curve, elevation and any color shift animating together. Active: Instant tier (80ms), no easing curve needed at this brief a duration. Loading pulse: Chapter 39's Standard-tier (300ms) looping treatment, sized within the button's existing footprint. Exit of the Loading state (returning to resting, or transitioning to a Success toast elsewhere) uses Chapter 15's Exit curve at Quick tier, per Master Vision §10.4's entrance/exit asymmetry.

---

## 8. ACCESSIBILITY

Every button is a genuine, semantically correct interactive element (not a styled generic container) so assistive technology announces it as a button by default. Icon Buttons (Section 4) require an accessible text label even though no visible label is present — the icon's meaning must still be available to a screen-reader user through this hidden label, satisfying the same requirement Bt-3 imposes visually. Disabled buttons remain perceivable to assistive technology as disabled buttons, not removed from the accessibility tree entirely, consistent with Chapter 39's St-3 note on this exact distinction.

---

## 9. RESPONSIVE BEHAVIOUR

Touch targets at Mobile/Tablet ranges (Chapter 8) meet or exceed the 16px minimum gap requirement from Chapter 5, §8, and the button's own tap target — even at the `sm` size step — never falls below 44×44px effective touch area, adding invisible padding beyond the visible container if the visual size alone would fall short. Hover has no effect at touch-primary ranges (Chapter 39, §9); Active alone carries the tactile feedback burden there.

---

## 10. AI & FUTURE INTERFACES

A voice interface (Chapter 72) has a direct conceptual equivalent to a button: a suggested next action the AI offers verbally ("Would you like me to have someone follow up?") — Bt-1's one-Primary-suggestion-at-a-time logic translates directly, since offering several competing next steps verbally creates the identical decision fatigue Master Vision §5.2 describes for visual CTAs. A spatial environment (Chapter 73) would render a button as a genuinely three-dimensional, depth-aware object; Bt-2's three-emphasis structure should transfer without needing revision, though its exact visual treatment (elevation becoming real depth) would not.

---

## 11. DO

A pricing section with three tier cards, each showing a "Choose [Tier]" button, where only the recommended tier's button uses Primary emphasis and the other two use Secondary — three real, equally functional actions, one clearly indicated as the encouraged path, satisfying Bt-1 exactly.

## 12. DON'T

Making all three pricing tier buttons Primary emphasis "so no tier feels less important than the others." This is a direct Bt-1 violation, and — per Chapter 5's own Conversion Psychology reasoning this chapter inherits — it does not make every tier feel equally encouraged; it makes the page provide no guidance at all, which research on considered purchases (Master Vision §5.2) suggests measurably increases decision fatigue rather than making every option feel valued.

---

## 13. ANTI-PATTERNS

**Emphasis inflation.** Gradually promoting more and more buttons to Primary emphasis over time, as each new feature's owner reasonably wants their own action to feel important. This is dangerous because it happens one small, individually defensible decision at a time and is only visible in aggregate — a page audited after a year of incremental additions may have five Primary buttons where it once had one, with no single change that looks wrong in isolation. It is detected by counting Primary-emphasis buttons visible in any single view, per Bt-1's exact test. It is fixed by demoting all but the genuinely most important action to Secondary, even where every individual demotion feels like a loss to whoever owns that particular feature.

---

## 14. QUALITY ASSURANCE CHECKLIST

- [ ] Is exactly one Primary-emphasis button visible at any single scroll position? *(Bt-1)*
- [ ] Does every button use one of exactly three Emphasis values, with no fourth invented? *(Bt-2)*
- [ ] Does every button (other than a defined Icon Button) carry a visible text label, not an icon alone? *(Bt-3)*
- [ ] Does a destructive action keep its normal Emphasis structure, recolored to Chapter 3's Error tokens, rather than inventing a new emphasis tier? *(Bt-4)*
- [ ] Does every button meet the 44×44px effective touch target at every size step, on touch devices?
- [ ] Does the Loading state combine correctly with Disabled, per Chapter 39's St-4, with no layout shift?

---

## 15. CROSS REFERENCES

Chapter 1 (P2, P3, P4, P7). Chapter 2 (Radius category, first populated here). Chapter 3 (color, C-4). Chapter 5 (padding, touch-gap minimum). Chapter 6 and Chapter 9 (should absorb this chapter's Radius population into their own tables). Chapter 15 (motion tiers). Chapter 17 (anatomy standard, applied here for the first time). Chapter 25 (Toasts, where a button's action result is confirmed). Chapter 39 (state model, in full — this chapter's entire Section 6). Chapter 43 (touch targets). Master Vision §5.2–§5.4, §16.1, §17.1.

---

## 16. FUTURE EXPANSION

**Possible future additions.** A fourth Icon Button exception beyond "close" may be proposed once a genuinely universal second icon is identified — added only with the same specific justification Bt-3 already requires, never speculatively.

**Documented limitations.** The Radius value populated here (10px) is this Bible's first-canonical proposal for that entire Core category — it should be revisited jointly with Chapter 6 and Chapter 9 the next time either is substantially revised, since a component chapter populating a Foundations-level category is an acknowledged, temporary inversion of this Bible's normal dependency order, done here only because Buttons could not otherwise proceed.

---

*End of Chapter 18. The next chapter, per the authoring sequence, is Forms & Inputs — the system's other highest-stakes component chapter, per Master Vision §17.4's "critical trust surface" framing.*
