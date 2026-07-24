# CHAPTER 39 — THE COMPLETE STATE MODEL

**Trady Perch Design System Bible · Volume III: Interaction & Behavior**
*(Written in Phase 2, well ahead of its Volume III reading-order position — see Chapter 1's own writing-order note: nearly every Volume II component chapter depends on this one directly, and none of them can be written correctly without it.)*

**Inherited From:** Master Vision §17.5 (Hover, Focus, Loading, Success, Error States), §22 (Accessibility Standards — color-and-icon pairing), Chapter 4 (The Emotional Journey, for the feeling each state should carry). Design System Bible Chapter 1 (P2, P4, P5, P8), Chapter 2 (resolution model — this chapter introduces one new Semantic token under full T-1–T-4 discipline), Chapter 3 (state colors, C-4's text/accent split), Chapter 9 (elevation transitions), Chapter 11 (icon color pairing), Chapter 15 (motion tiers), Chapter 17, An-3 (the requirement this chapter exists to satisfy).

---

## 1. INTRODUCTION

Master Vision §17.5 sketches five states — hover, focus, loading, success, error — at the level of philosophy: hover should be subtle, focus must be visible, loading should never be a generic spinner, success should feel reassuring rather than celebratory, error should be gentle but specific. Chapter 17's An-3 requires every component in Volume II to address a complete set of states explicitly. This chapter is where those two things meet: the single, unified, cross-component doctrine for exactly eight canonical states — Hover, Focus, Active, Disabled, Loading, Error, Success, and Empty — specified once, here, so that no component chapter has to reinvent what "disabled" looks like from first principles.

This chapter depends on nearly every chapter in Volume I, since every state's treatment is built from tokens already defined there. It is depended on by every single chapter in Volume II without exception, which is why — despite being numbered 39, deep into Volume III's reading order — it is written now, in Phase 2, before a single component chapter begins. Chapter 42 (Keyboard Interaction Standards) and Chapter 47 (Error Handling & Recovery Design) both extend this chapter's Focus and Error treatments respectively into fuller behavioral detail.

---

## 2. PHILOSOPHY

The rejected alternative is letting each component chapter define its own hover, focus, and error treatment independently, guided only by Master Vision §17.5's philosophy. This was rejected for the exact reason Chapter 17 exists at all: twenty-one independently-designed "disabled" states, each individually reasonable, will not agree with each other on opacity, color, or interaction suppression — and a system where disabled buttons, disabled inputs, and disabled cards each look disabled in a subtly different way has failed Principle 2 at the level of the entire product, not just one component.

A second alternative — defining states as simple, independent toggles with no relationship to each other — was also rejected. In practice, states interact: a loading button is very often also disabled, to prevent a second submission; a disabled element cannot simultaneously be hovered in any meaningful sense. This chapter accordingly treats the eight states as two related families — four **Interaction States** (Hover, Focus, Active, Disabled) driven by direct user input, and four **Content States** (Loading, Error, Success, Empty) driven by data or system status — with explicit precedence rules governing how they combine, rather than pretending all eight are always simultaneously independent.

---

## 3. CORE PRINCIPLES

### St-1 — Every State Has Exactly One Cross-Component Default

**Purpose.** Each of the eight canonical states has one default visual and motion treatment, specified in Section 4, applied identically by every component unless a specific exception is justified.

**Reasoning.** Descends from Principle 2 and Principle 7: a shared default is what makes "disabled" mean the same thing everywhere, and a component-specific exception must clear the same T-4-style bar Chapter 2 requires of any Component-tier token — shown insufficient, not merely different by preference.

**Examples.** Every disabled interactive element in the system — button, input, toggle — uses the identical `semantic.opacity.disabled` treatment defined in Section 4, not a per-component variation.

**When it applies.** To every component's implementation of any of the eight states.

**When it does not apply.** To a state that, per Chapter 17's An-3, has been explicitly and correctly determined not to apply to a given component at all (Breadcrumbs and Loading, for instance) — the default governs states a component actually has, not states it has correctly opted out of.

**Common misunderstandings.** Assuming a component with unusual visual character (say, a Card with a photographic background) is automatically exempt from the shared defaults. It is not — the default treatment must still be attempted first, with a genuine, documented reason required before any deviation, exactly as Chapter 2's T-4 requires for tokens.

### St-2 — Interaction States and Content States Follow Different Rules

**Purpose.** Hover, Focus, Active, and Disabled (Interaction States) are transient or input-driven and follow strict precedence rules (St-4). Loading, Error, Success, and Empty (Content States) are data-driven, persist independently of user input, and may combine with Interaction States under the rules in Section 4.

**Reasoning.** These two families behave differently enough in practice that treating them identically would produce contradictions — an Interaction State's whole premise (Hover) requires an active pointer; a Content State (Error) can be true whether or not anyone is currently pointing at anything. Naming the distinction explicitly prevents a component author from asking, for instance, "what does Hover look like combined with Error" as though the two were peers, when the real question is how Error's persistent treatment coexists with a transient Hover on top of it.

**Examples.** An input in the Error content state can still enter and exit the Hover and Focus interaction states normally — the two families layer, per Section 4's combination table, rather than one overriding the other by default.

**When it applies.** To reasoning about how any two states of a single component might combine.

**When it does not apply.** To the Disabled-suppresses-all-interaction rule (St-4), which is the one explicit, stated exception to otherwise-independent layering.

**Common misunderstandings.** Assuming Content States are always visually "louder" than Interaction States because they carry semantic information. Section 4's combination rules specify exactly how the two layer visually; neither family automatically wins by default.

### St-3 — Disabled Suppresses Every Interaction State

**Purpose.** A component in the Disabled state cannot simultaneously be in the Hover, Focus, or Active state. Disabled is the one Interaction State that takes unconditional precedence over the other three.

**Reasoning.** A disabled element, by definition, does not accept interaction — allowing it to still visually hover, focus, or press would misrepresent its actual, non-interactive status, violating Principle 1's traceability at the level of a single element's honesty about its own condition.

**Examples.** A disabled button shows no hover-lift, no focus ring, and no pressed-state compression under any pointer or keyboard interaction attempted against it.

**When it applies.** To every Disabled-state component.

**When it does not apply.** No exception.

**Common misunderstandings.** Assuming a disabled element should be entirely unreachable by keyboard navigation. Whether a disabled element remains in the tab order (and is announced as disabled by assistive technology rather than skipped silently) is an accessibility decision governed by Chapter 42, not a violation of this principle — this principle governs *visual and interactive state suppression*, not tab-order inclusion.

### St-4 — Loading Implies Disabled for Any Element That Triggers It

**Purpose.** When an interactive element (typically a button) triggers an asynchronous action, that element enters both the Loading and Disabled states simultaneously for the duration of the action, preventing repeated triggering.

**Reasoning.** Direct extension of Principle 4 (Restraint as Default) and ordinary interaction safety: a submit button that remains clickable while its own submission is still processing invites duplicate actions, which is both a functional risk and a violation of the calm, controlled feeling Master Vision Chapter 4 requires throughout the experience.

**Examples.** A form's submit button, on click, immediately shows its Loading treatment (Section 4) and is simultaneously Disabled until the request resolves into either Success, Error, or a return to its resting state.

**When it applies.** To any interactive element that directly triggers an asynchronous action.

**When it does not apply.** To a passive Loading state with no triggering element to disable — a skeleton loader representing a page's initial data fetch, for instance, has no button to suppress and this principle simply does not engage.

**Common misunderstandings.** Assuming the Disabled visual treatment (reduced opacity) is what should display during this combined state. The Loading treatment (Section 4) takes visual precedence in this specific combination — the element looks like it's loading, not like it's generically disabled, even though it is technically both simultaneously.

---

## 4. COMPLETE DESIGN SPECIFICATION

### Interaction States

| State | Trigger | Visual treatment | Motion tier |
|---|---|---|---|
| **Hover** | Pointer over element (pointer-capable devices only, Chapter 8/43) | Elevation Resting → Raised (Chapter 9); or `text.secondary` → `text.primary` for text-only elements; never scale or rotation (Master Vision §5.4) | Quick (150ms), Entrance curve |
| **Focus** | Keyboard focus (always visible; never suppressed) | 2px `semantic.color.focus.ring` (Chapter 3), 2px offset from element edge | Instant (80ms) |
| **Active** | Pointer-down or touch-down, momentary | Slight compression (98% scale) or shift to `semantic.color.accent.pressed` for gold elements | Instant (80ms) |
| **Disabled** | Element explicitly disabled | `semantic.opacity.disabled` (new Semantic token, defined below) applied to the whole element; suppresses Hover/Focus/Active per St-3 | None (no transition into/out of disabled beyond the state change itself) |

**New Semantic token introduced by this chapter:** `semantic.opacity.disabled`, referencing a new Core value `core.opacity.400` = 0.4. Per Chapter 2's T-1/T-4 discipline: no existing opacity value was defined for this purpose (Chapter 9's shadow opacities and Chapter 10's glass opacities are tier-specific to their own domains), so this is a legitimate new Core+Semantic pair, not a violation of Reuse Before Invention.

### Content States

| State | Trigger | Visual treatment | Motion tier |
|---|---|---|---|
| **Loading** | Asynchronous action in progress | Branded skeleton pattern (Chapter 31) for content regions; a slow, looping pulse (not a generic spinner, per Master Vision §17.5) for inline elements, built from a repeating Standard-tier (300ms) opacity cycle | Standard (300ms), looping |
| **Error** | Validation or system failure | `semantic.color.text.error` for message text, `semantic.color.border.error` for the element's border/icon (Chapter 3, C-4's split respected); always paired with an icon, never color alone (Master Vision §22) | Standard (300ms), Entrance curve |
| **Success** | Confirmed positive outcome | `semantic.color.text.success`; calm, no bounce, no celebratory motion (Master Vision §17.5) | Standard (300ms), Entrance curve |
| **Empty** | No data to display | Chapter 11's 48px icon step in `text.secondary`, supporting message in `text.secondary`, optional CTA in standard button treatment; never uses Error's color or iconography | Standard (300ms), Entrance curve |

### Combination rules

- Disabled suppresses Hover, Focus, Active (St-3) unconditionally.
- Loading implies Disabled for any triggering element (St-4); Loading's visual treatment takes precedence over Disabled's during the overlap.
- Error and Success are mutually exclusive for a single element at a single moment — a field cannot be simultaneously correct and incorrect — but either may combine normally with Hover and Focus (St-2).
- Empty is a container-level state (applies to a list, grid, or region as a whole) and does not combine with per-element Interaction States at all, since there is no element present to hover or focus.

---

## 5. MEASUREMENTS

- **Canonical states: 8**, in two families of four.
- **`semantic.opacity.disabled`: 0.4** (40% opacity).
- **Active-state compression: 98% scale** (a 2% reduction) — small enough to feel tactile, per Master Vision §5.4, never large enough to read as a layout shift.
- **Focus ring: 2px width, 2px offset.**

---

## 6. BEHAVIORAL RULES

**Before implementing any component's states.** Apply Section 4's defaults directly; only deviate with a documented, T-4-style justification per St-1.

**Under a Disabled state.** Suppress Hover/Focus/Active entirely, per St-3, regardless of what triggers the attempt to interact.

**Under an asynchronous action.** Apply Loading and Disabled simultaneously to the triggering element, per St-4, with Loading's visual treatment taking precedence.

**Under a validation result.** Resolve to exactly one of Error or Success, never both, per Section 4's mutual-exclusivity rule — a field correcting from Error to Success transitions directly, never passing through an ambiguous combined state.

---

## 7. MOTION SPECIFICATION

Every state transition's tier is fixed in Section 4's tables, all drawn directly from Chapter 15 — no state introduces a new duration or curve. Loading's looping treatment is the one qualified exception to Chapter 15's otherwise-discrete tier model: it is a *repeating* Standard-tier cycle rather than a single Standard-tier transition, which is why Chapter 15 itself did not need to define a sixth tier for it — looping is a distinct *pattern* built from an existing duration, not a new duration value.

---

## 8. ACCESSIBILITY

Every state that carries semantic meaning (Error, Success, Disabled) pairs its color signal with a second channel — an icon for Error and Success, a genuine `disabled` attribute (not merely a visual style) for Disabled — satisfying Master Vision §22's requirement that meaning never rest on color alone. Focus is never suppressed or hidden by any component under any circumstance; a component that removes the default focus ring without providing this chapter's replacement treatment has produced an accessibility defect, not a stylistic choice, per Chapter 1's own non-negotiable list (Master Vision §17.5, Chapter 27).

---

## 9. RESPONSIVE BEHAVIOUR

Hover, as a state, is unavailable at touch-primary ranges (Mobile, most of Tablet — Chapter 8, Chapter 43); components must ensure their Active state alone is sufficient to communicate "this responded to your touch" without depending on a Hover state that will never fire on those devices. Focus remains fully required at every breakpoint, since keyboard and switch-control navigation are not limited to desktop.

---

## 10. AI & FUTURE INTERFACES

A voice interface (Chapter 72) has a direct equivalent for four of these eight states — Loading ("processing" pacing, Chapter 15/16's pacing equivalent), Error, Success, and Empty ("I don't have anything for that") all translate naturally into spoken responses. Hover, Focus, Active, and Disabled have no obvious voice equivalent, since they describe a relationship to a pointer or a discrete interactive element neither of which exists in a voice-only exchange — this is flagged honestly rather than forced into a strained translation.

---

## 11. DO

A submit button entering Loading-and-Disabled together on click, its Loading pulse using the exact Standard-tier looping treatment from Section 4, resolving cleanly into either the Success or Error state on completion — never a moment where the button is ambiguously between states.

## 12. DON'T

Designing a custom, component-specific "grayed out" treatment for one particular component's disabled state because the default 40% opacity "didn't look quite right" against that component's background. This is a direct St-1 violation without the required T-4-style justification — the correct response to a default that seems visually wrong against a specific background is to re-examine that background's contrast against Chapter 3, not to fork the disabled treatment.

---

## 13. ANTI-PATTERNS

**State fragmentation.** Each component chapter defining its own hover, focus, or disabled treatment independently, each one individually reasonable, none of them identical to the others. This is dangerous because it is invisible within any single component's own documentation — a component chapter that never references this chapter's defaults looks complete on its own terms while quietly disagreeing with twenty other components elsewhere in the system. It is detected by auditing every component chapter's state-treatment values against Section 4's defaults directly, not by reading each chapter's prose description in isolation. It is fixed by replacing the fragmented treatment with this chapter's shared default, or, if a genuine exception is warranted, documenting it explicitly per St-1.

---

## 14. QUALITY ASSURANCE CHECKLIST

- [ ] Does this component's treatment of each applicable state match Section 4's defaults, or carry an explicit, documented justification for any deviation? *(St-1)*
- [ ] Is Disabled correctly suppressing Hover, Focus, and Active on this component? *(St-3)*
- [ ] Does any triggering element correctly enter Loading-and-Disabled together, with Loading's visual treatment taking precedence? *(St-4)*
- [ ] Are Error and Success mutually exclusive for this component, with no ambiguous combined state?
- [ ] Does every Error, Success, or Disabled state pair its color signal with a second, non-color channel?
- [ ] Is Focus visible and unsuppressed under every circumstance, at every breakpoint?

---

## 15. CROSS REFERENCES

Chapter 1 (P2, P4, P5, P8). Chapter 2 (resolution model; the new `semantic.opacity.disabled` token's T-1–T-4 justification). Chapter 3 (state colors, C-4). Chapter 9 (elevation transitions). Chapter 11 (icon pairing). Chapter 15 (motion tiers, all of them, in full). Chapter 17 (An-3, the requirement this chapter satisfies). Chapter 31 (Skeleton Loaders, Loading's primary content-region treatment). Chapter 42 (Keyboard Interaction Standards, Focus's fuller behavioral specification). Chapter 43 (Touch & Gesture Standards, Hover's unavailability at touch ranges). Chapter 47 (Error Handling & Recovery Design, Error's fuller behavioral specification). Every component chapter in Volume II, without exception. Master Vision §17.5, §22, Chapter 4.

---

## 16. FUTURE EXPANSION

**Possible future additions.** A ninth canonical state may eventually be warranted (an "offline" state, for a future client dashboard with real-time data, per Master Vision Chapter 25) — added only once shown insufficient against the existing eight, per Principle 7 applied reflexively to this chapter's own scope, exactly as Chapter 1 requires for itself.

**Documented limitations.** The Loading state's looping treatment (Section 4, Section 7) has been specified in principle but not yet verified against a real, extended loading duration (a slow network request lasting several seconds) — this should be checked for visual fatigue once real implementation exists, since a pulse acceptable for two seconds may need reconsideration if loading states routinely run much longer.

---

*End of Chapter 39. Every component chapter in Volume II — beginning with Chapter 18, Buttons & Actions — can now be written against a complete, stable Foundations volume and a complete, stable state model.*
