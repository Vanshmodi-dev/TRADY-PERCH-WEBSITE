# CHAPTER 24 — DRAWERS & SHEETS

**Trady Perch Design System Bible · Volume II: Components**
*First-canonical-draft.*

**Inherited From:** Master Vision §21 (Mobile & Responsive Philosophy — mobile navigation collapse). Design System Bible Chapter 1 (P2, P4, P7), Chapter 9 (elevation), Chapter 15 (motion), Chapter 17 (anatomy standard), Chapter 23 (Dialogs, the more interruptive sibling this chapter is defined against), Chapter 39 (state model).

---

## 1. INTRODUCTION

Chapter 23 named Drawers as the "softer sibling pattern" reserved for content that doesn't warrant a full Dialog's interruption. This chapter is where that distinction becomes an actual specification: a Drawer is anchored to a physical edge of the viewport, generally allows more peripheral awareness of the page behind it, and is the correct default for mobile navigation, filter panels, and contextual detail that supplements rather than blocks a user's current task.

This chapter depends on Chapter 23 directly — every rule here exists to differentiate this component from that one, not to duplicate it. It is depended on by Chapter 20 (Navigation, whose mobile collapse target this component provides) and Chapter 29 (Search, whose filter panel is a primary Drawer use case).

---

## 2. PHILOSOPHY

The rejected alternative is using a Dialog for every piece of secondary content, on the reasoning that one well-specified interruptive component is simpler to maintain than two. This was rejected because Chapter 23's own reasoning depends on Dialogs remaining rare and genuinely necessary (Dl-1) — if Dialogs are also used for routine, non-blocking content like a mobile nav menu or a filter panel, that rarity is lost, and the component's interruptive weight stops meaning anything. A distinct, lighter-weight Drawer is what lets Dialogs stay rare.

---

## 3. CORE PRINCIPLES

### Dw-1 — Drawers Slide From a Named Edge, Never Appear Centered

**Purpose.** A Drawer always enters from and remains anchored to one specific viewport edge — left, right, or bottom — never floating centered the way a Dialog does.

**Reasoning.** This is the core visual grammar distinguishing the two components at a glance: a centered, floating panel signals "this blocks your path" (Chapter 23); an edge-anchored panel signals "this supplements your current view without replacing it."

**Examples.** A mobile navigation menu slides in from the right edge; a filter panel slides in from the left; a "quick view" detail sheet slides up from the bottom.

**When it applies.** To every Drawer instance.

**When it does not apply.** No exception.

**Common misunderstandings.** Assuming a bottom-anchored Drawer that happens to cover most of the viewport height is "basically a Dialog." Its anatomy, dismissal behavior, and backdrop treatment (Section 4) remain Drawer rules regardless of how much vertical space it occupies — the edge-anchoring, not the coverage area, is what determines which component this is.

### Dw-2 — A Drawer's Backdrop Is Lighter Than a Dialog's, Reflecting Its Lower Interruption Level

**Purpose.** Where a Drawer uses a backdrop at all, it uses a lighter treatment than Chapter 23's Pronounced-blur dialog backdrop — either a lower-opacity dim with no blur, or, for content genuinely meant to be used alongside the visible page (a persistent filter panel), no backdrop at all.

**Reasoning.** Descends from Dw's whole purpose: a backdrop's visual weight should communicate how much the surface behind it actually needs to recede, and a Drawer's lesser interruption level (Section 2) should be reflected in a correspondingly lighter treatment, not Chapter 23's full Pronounced blur inherited by default.

**Examples.** A mobile nav Drawer: a moderate-opacity dim, no blur, since the underlying page truly is not usable while the nav is open. A desktop filter Drawer: no backdrop at all, since the underlying content grid remains visible and, in some implementations, may even update live as filters are adjusted.

**When it applies.** To every Drawer's backdrop treatment.

**When it does not apply.** No exception.

**Common misunderstandings.** Assuming "lighter than a Dialog" means Drawers should never use Chapter 10's blur tokens at all. A Drawer may use `core.blur.subtle` (Chapter 10's nav-specific step) where genuinely useful for legibility, but never `core.blur.pronounced`, which is reserved for Chapter 23's fuller interruption per Chapter 10's own Ma-2.

### Dw-3 — Drawer Size Is Determined by Content, Not a Fixed Default

**Purpose.** A Drawer's width (for left/right-anchored) or height (for bottom-anchored) is sized to its actual content's needs, within Chapter 6's grid logic, rather than defaulting to an arbitrary fraction of the viewport.

**Reasoning.** Descends from Principle 2: a narrow filter panel padded out to fill an unnecessarily wide Drawer wastes the very negative-space discipline (Chapter 5) this system otherwise applies carefully everywhere else, and a Drawer that's needlessly large reads as an unconsidered default rather than a deliberate size choice.

**Examples.** A simple filter panel: a narrow Drawer, perhaps 320px wide on desktop. A full mobile navigation menu: wide enough to comfortably show Chapter 20's five navigation items at a readable size, likely closer to 80% of viewport width at Mobile range.

**When it applies.** To every Drawer's sizing decision.

**When it does not apply.** No exception.

**Common misunderstandings.** Assuming a single fixed Drawer width should be reused everywhere for consistency, the way Chapter 18's button sizes are standardized. Content-appropriate sizing is the correct consistency principle here — every Drawer being sized to its own content need is the pattern to standardize, not a single shared pixel width.

### Dw-4 — Choose Drawer Over Dialog When Content Supplements Rather Than Blocks

**Purpose.** The deciding test for whether new content should use a Drawer or a Dialog (Chapter 23) is whether the content supplements the user's current view (Drawer) or requires their full, blocking attention before they can proceed (Dialog).

**Reasoning.** This is the practical decision procedure Chapters 23 and 24 together imply but neither states as a direct test — stated explicitly here so a future contributor never has to re-derive it from comparing the two chapters' philosophy sections independently.

**Examples.** A filter panel: supplements the visible grid, which remains present and often live-updating — Drawer. A destructive confirmation: must be resolved before anything else can proceed — Dialog.

**When it applies.** To every new piece of secondary content being designed.

**When it does not apply.** No exception.

**Common misunderstandings.** Assuming content that happens to be large or content-heavy automatically requires a Dialog. Size is not the deciding factor (Dw-1's misunderstanding note already addresses this from the sizing angle) — the deciding factor is exclusively whether the content blocks the user's ability to continue their current task.

---

## 4. COMPLETE DESIGN SPECIFICATION

**Anatomy** (per An-1): optional Backdrop (Dw-2) → Drawer Panel (Header, Body, optional Footer) — anatomically identical to Chapter 23's Dialog internal structure, differing only in the outer container's anchoring and backdrop treatment.

**Variant axes** (per An-2): **Anchor edge** — `left`, `right`, `bottom` (Dw-1). **Backdrop presence** — `dimmed` (moderate opacity, no blur), `none` (Dw-2).

**Token consumption:** `semantic.elevation.overlay` (Chapter 9, shared with Dialogs), `core.blur.subtle` (Chapter 10, where used), Chapter 6's grid for width/height sizing (Dw-3).

---

## 5. MEASUREMENTS

- **Anchor edges: 3** (left, right, bottom) — no top-anchored Drawer is defined, since a top-anchored panel has no established use case in this system yet and should not be added speculatively, per Principle 7.
- **Backdrop opacity (dimmed variant):** approximately 40%, no blur — lighter than Chapter 23's 80% Pronounced-blur backdrop, per Dw-2.

---

## 6. STATE COVERAGE (per An-3)

States follow Chapter 23's Dialog state table directly for all internal content (Hover, Focus, Active, Disabled, Loading, Error, Success on interior elements), with one difference: Focus trapping (Chapter 23, Section 6) applies only to Drawers with a backdrop present — a backdrop-less filter Drawer, since the underlying page remains genuinely interactive, does not trap focus, allowing a user to tab between the Drawer and the page content it's filtering. Empty is not applicable to the Drawer container itself, matching Chapter 23's reasoning.

---

## 7. MOTION SPECIFICATION

Entrance: slides in from its anchored edge using Standard tier (300ms), Entrance curve — a directional slide, not a fade, since the sliding motion itself communicates the edge-anchored relationship Dw-1 establishes. Exit: slides back out at Quick tier (150ms), Exit curve, per Master Vision §10.4's asymmetry, matching Chapter 23's identical reasoning.

---

## 8. ACCESSIBILITY

A backdrop-present Drawer traps focus exactly as Chapter 23 specifies for Dialogs. A backdrop-less Drawer does not trap focus, but must still be reachable and dismissible via keyboard (a defined close control, always present regardless of backdrop treatment) and must not create a confusing tab order that alternates unpredictably between Drawer and page content.

---

## 9. RESPONSIVE BEHAVIOUR

Chapter 20's mobile navigation collapse target is this component, right-anchored, with a dimmed backdrop, at Mobile and most Tablet ranges. At Desktop and Wide (Chapter 8), the same underlying navigation content may not need a Drawer at all, since Chapter 20's full horizontal bar has room to display directly — the Drawer pattern is specifically a narrow-viewport adaptation for navigation, not used at every breakpoint for every Drawer use case (a filter panel may legitimately use a Drawer at every breakpoint, including Desktop, if inline filters would otherwise consume too much layout space).

---

## 10. AI & FUTURE INTERFACES

A voice interface has no spatial edge to anchor a Drawer to; its closest equivalent is an aside remark the AI offers without ending the primary conversation flow — a supplementary, non-blocking addition, which is the same Dw-4 distinction (supplements vs. blocks) applied to a medium with no visual edges at all.

---

## 11. DO

A left-anchored filter Drawer with no backdrop, allowing a user to adjust filters while still seeing the case-study grid update live behind it — correctly chosen over a Dialog because the content supplements rather than blocks, per Dw-4, and correctly sized to its actual filter-control content rather than an arbitrary width, per Dw-3.

## 12. DON'T

Building the mobile navigation menu as a centered, floating Dialog instead of a right-anchored Drawer, reasoning that "it's just one more use of an existing component." This violates Dw-1's edge-anchoring distinction and, more importantly, misapplies Chapter 23's Dialog — a navigation menu supplements the user's ability to move through the site; it does not block a task requiring resolution, and using Dialog here would spend that component's rare interruption budget on a routine, frequent action.

---

## 13. ANTI-PATTERNS

**Component conflation.** Treating Drawers and Dialogs as interchangeable, using whichever is more convenient to implement in a given moment rather than applying Dw-4's actual decision test. This is dangerous because it erodes both components' distinct signaling value simultaneously — a Dialog stops meaning "this blocks you" and a Drawer stops meaning "this supplements you" the moment either is used for the other's job. It is detected by auditing any Drawer or Dialog instance against Dw-4's test directly: does this content block the user's current task, or supplement it? It is fixed by migrating the misapplied instance to the correct component.

---

## 14. QUALITY ASSURANCE CHECKLIST

- [ ] Does this Drawer slide from and remain anchored to a named edge, never appearing centered? *(Dw-1)*
- [ ] Is the backdrop treatment (or its absence) lighter than Chapter 23's Dialog backdrop, matching this component's lower interruption level? *(Dw-2)*
- [ ] Is the Drawer's size determined by its actual content, not an arbitrary default? *(Dw-3)*
- [ ] Was Dw-4's supplements-vs-blocks test applied before choosing Drawer over Dialog for this content? *(Dw-4)*

---

## 15. CROSS REFERENCES

Chapter 1 (P2, P4, P7). Chapter 6 (grid, sizing). Chapter 9 (elevation). Chapter 10 (backdrop blur tokens, Ma-2). Chapter 15 (motion). Chapter 17 (anatomy standard). Chapter 20 (Navigation, primary mobile consumer). Chapter 23 (Dialogs, the sibling this chapter is defined against throughout). Chapter 29 (Search, filter-panel consumer). Chapter 39 (state model). Master Vision Chapter 21.

---

## 16. FUTURE EXPANSION

**Documented limitations.** No top-anchored Drawer variant exists (Section 5); this should remain the case until a genuine use case is identified, per Principle 7, rather than being added preemptively for symmetry with the other three edges.

---

*End of Chapter 24. The next chapter, per the authoring sequence, is Toasts & Notifications.*
