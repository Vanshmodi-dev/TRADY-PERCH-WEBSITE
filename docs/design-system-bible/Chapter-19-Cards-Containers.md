# CHAPTER 19 — CARDS & CONTAINERS

**Trady Perch Design System Bible · Volume II: Components**
*First-canonical-draft.*

**Inherited From:** Master Vision §17.2 (Cards), Chapter 13 (Homepage Blueprint, items 6, 8, 11 — Industries, Portfolio, Testimonials, the card's primary homes). Design System Bible Chapter 1 (P1, P2, P7), Chapter 9 (elevation), Chapter 12 (photography), Chapter 17 (anatomy standard), Chapter 39 (state model).

---

## 1. INTRODUCTION

Cards are this system's most reused container, appearing across more homepage sections than any other single component (Master Vision Chapter 13, items 6, 8, 11). A small inconsistency here is more visible, faster, than an equivalent inconsistency almost anywhere else in the system, simply because a visitor encounters cards repeatedly within a single scroll.

This chapter depends on Chapter 9 directly for its elevation behavior and Chapter 12 for any photographic media it contains. It is depended on by Chapter 32 (Charts, which frequently renders inside a card) and Chapter 33 (Badges, which frequently appears within a card's anatomy).

---

## 2. PHILOSOPHY

The rejected alternative is letting each homepage section invent its own card shape — a portfolio card with different corner treatment than a testimonial card, each individually reasonable. This was rejected on Principle 7 grounds identical to every other chapter: one card anatomy, populated differently per context, is what lets a visitor's eye recognize "this is a card" instantly and consistently, rather than relearning the pattern in every new section.

---

## 3. CORE PRINCIPLES

### Cd-1 — A Card Is Either Static or Interactive, Never Ambiguously Both

**Purpose.** Every card is explicitly one of two kinds: **Static** (informational, not clickable as a whole) or **Interactive** (the entire card is a single clickable target, per Chapter 18's Buttons reasoning extended to a larger surface). A card must never look interactive (via hover elevation, per Chapter 9) while functioning as static, or vice versa.

**Reasoning.** Descends from Principle 1: a card's visual affordance must match its actual behavior exactly, or a visitor's expectation, formed from the visual signal, is betrayed the moment they act on it.

**Examples.** A portfolio card: Interactive, the entire card links to the full case study, and shows Raised elevation on hover (Chapter 9) as confirmation. A testimonial card: Static, no hover elevation change, since clicking it does nothing.

**When it applies.** To every card in the system.

**When it does not apply.** No exception.

**Common misunderstandings.** Assuming an Interactive card needs its own visible button inside it to be clickable. Per Chapter 18's reasoning about large touch/click targets, the entire card surface is the target; an additional "Read more" link inside an Interactive card is permitted as a visual cue but is not required for the click to register.

### Cd-2 — Media Regions Follow Chapter 12/14's Rules, Never a Placeholder Block

**Purpose.** A card's optional Media region contains a real photograph (Chapter 12) or render (Chapter 14), never a flat placeholder color block used as a stand-in.

**Reasoning.** A placeholder block shipped to production (rather than used only during early design work) signals exactly the "thin, unproven state" Master Vision §14.2 and Chapter 27 forbid for entire pages, now occurring in miniature at the component level.

**Examples.** A case study card's Media region: an actual screenshot inside Chapter 8's future device-frame treatment (Master Vision §8.7). Never a solid gray rectangle left in place because the real asset wasn't ready yet.

**When it applies.** To every card with a Media region, at the moment it ships.

**When it does not apply.** To a card's design-time mockup, before real assets exist — this principle governs what ships, not what a designer works with mid-process.

**Common misunderstandings.** Assuming an abstract, on-brand gradient or pattern (rather than a photograph) is an acceptable permanent Media treatment. Master Vision §6.1 restricts gradients to "extremely subtle" depth effects, not decorative fills standing in for real content — a card with nothing real to show should omit the Media region entirely (an anatomy without it, per Chapter 17's An-1) rather than fill it with an abstract substitute.

### Cd-3 — One Card, One Primary-Emphasis Action

**Purpose.** A card's Footer/Actions region contains at most one Primary-emphasis button (Chapter 18); any additional action uses Secondary or Ghost emphasis.

**Reasoning.** Direct extension of Chapter 18's Bt-1 (Singular Focus applied to buttons) to the card level: a card offering two equally loud actions has the identical decision-fatigue problem a page with two Primary CTAs has, merely at a smaller scale.

**Examples.** A pricing card: one Primary "Choose This Plan" button; a "Compare Details" action, if present, uses Ghost emphasis.

**When it applies.** To every card with a Footer/Actions region.

**When it does not apply.** No exception.

**Common misunderstandings.** Assuming an Interactive card (Cd-1) whose entire surface is clickable cannot also contain a Primary button inside it. It can — the whole-card click and an internal Primary button may coexist, provided they lead to the same or compatible destinations, avoiding a confusing situation where clicking the card and clicking its internal button produce different outcomes.

### Cd-4 — Cards Within One Grid Share Identical Anatomy

**Purpose.** Every card appearing together within a single Structured Grid (Chapter 7) uses the same anatomy configuration — the same parts present or absent, in the same order — even if their content differs.

**Reasoning.** Descends from Principle 2: a grid where some cards have a Media region and others don't, or where footer actions appear in some but not others, breaks the grid's visual rhythm and makes comparison — the entire purpose of a Structured Grid pattern, per Chapter 7 — harder rather than easier.

**Examples.** An Industries grid where every card has an icon, a title, and a one-line description, with no card additionally carrying a Media photograph that its neighbors lack.

**When it applies.** To every card within a single, simultaneously-visible Structured Grid instance.

**When it does not apply.** To cards appearing in entirely separate grids elsewhere on the page (a Portfolio grid and a Testimonials grid may reasonably use different anatomy configurations from each other, since they are never compared side by side).

**Common misunderstandings.** Assuming this principle forbids any content-length variation between cards in the same grid. Text length may vary naturally; the *structural anatomy* — which named parts are present — must not.

---

## 4. COMPLETE DESIGN SPECIFICATION

**Anatomy** (per An-1): Container → optional Media region → Title → Body → optional Footer/Actions.

**Variant axes** (per An-2): **Interactivity** — `static`, `interactive` (Cd-1). **Density** — `standard`, `compact` (Chapter 5's Sp-4 whole-scale shift, never a one-off tightened padding).

**Token consumption:** `semantic.color.surface.card`/`card-hover`, `semantic.elevation.card`/`card-hover` (Interactive cards only, per Cd-1), `semantic.color.border.default` (Static cards, per Chapter 9's El-4 flush-boundary treatment), `semantic.space.padding.component-lg`, `core.radius.lg` (a new Core value, populated here: 16px, one step larger than Chapter 18's button radius of 10px, per Chapter 20's future Core-radius-scale consolidation note).

---

## 5. MEASUREMENTS

- **Anatomy parts: 5**, 2 optional (Media, Footer/Actions). *(An-1)*
- **Corner radius: 16px** (`core.radius.lg`) — larger than Chapter 18's button radius (10px), consistent with Chapter 2's implicit radius-scales-with-component-size logic, now given its first concrete example.
- **Maximum Primary-emphasis actions per card: 1.** *(Cd-3)*

---

## 6. STATE COVERAGE (per An-3)

| State | Treatment |
|---|---|
| **Hover** | Interactive cards only: Resting → Raised elevation (Chapter 9), Quick tier. Static cards: no change. |
| **Focus** | Interactive cards only (as a single tab-stop): Chapter 39 default gold ring around the full card container. |
| **Active** | Interactive cards only: 98% scale compression on click/tap, matching Chapter 18's button Active treatment. |
| **Disabled** | Rare; an Interactive card temporarily unavailable (a sold-out case study slot, hypothetically) uses Chapter 39's default opacity treatment. |
| **Loading** | A card awaiting its content (an async-loaded portfolio grid) uses Chapter 31's skeleton treatment matching this card's exact anatomy proportions. |
| **Error** | A card that failed to load its content shows a compact Error-state message replacing its Body region, per Chapter 3's C-4 text treatment. |
| **Success** | Not typically applicable to a card itself; a card's action's success is confirmed elsewhere (Chapter 25, Toasts) or via navigation to a new view. |
| **Empty** | Not applicable to an individual card; an empty *grid* of cards is governed by Chapter 38 (Empty States) at the container level, not by this chapter. |

---

## 7. MOTION SPECIFICATION

Hover elevation transitions use Chapter 15's Quick tier (150ms), Entrance curve, exactly matching Chapter 18's Button hover treatment for visual consistency between the two most common interactive surfaces in the system. A card's entrance into view on scroll (Chapter 7's Structured Grid pattern) uses Standard tier (300ms), staggered slightly across siblings per Chapter 15's animation-hierarchy guidance (§10.3), rather than all grid cards appearing simultaneously.

---

## 8. ACCESSIBILITY

An Interactive card is implemented as a genuine single interactive element (not a static container with an invisible overlapping link merely styled to look clickable), so that keyboard and screen-reader users receive one clear, correctly-announced target rather than an ambiguous region. A Static card containing its own separately-interactive elements (an internal link distinct from a whole-card click) is a distinct, more complex pattern requiring careful focus-order design, deferred to Chapter 42's fuller keyboard specification.

---

## 9. RESPONSIVE BEHAVIOUR

Card width resolves to its Chapter 6 grid span at each breakpoint — a three-column Structured Grid at Desktop typically collapsing to a single column at Mobile (Chapter 7, §9) — with Density (Section 4) remaining constant across breakpoints unless a specific, documented need (Chapter 22's future dense-table-adjacent card use) requires otherwise.

---

## 10. AI & FUTURE INTERFACES

A spatial environment (Chapter 73) would render a card as a genuinely depth-aware panel — Cd-1's static/interactive distinction remains directly relevant (a spatial surface should still clearly signal whether it responds to a gaze or gesture), while the Raised elevation hover cue (Chapter 9) would translate to real physical movement toward the viewer rather than a simulated shadow change.

---

## 11. DO

A Structured Grid of Industries cards, each sharing identical anatomy (icon, title, one-line description, no Media region, no Footer), each Static (since clicking an industry doesn't navigate anywhere in the current site architecture), satisfying Cd-1 and Cd-4 together.

## 12. DON'T

Giving one card in a Portfolio grid a Media photograph and Footer action while its neighboring cards in the same grid have neither, because that particular case study "had a great screenshot available." This violates Cd-4 directly — the correct response to an available asset is to source equivalent assets for the other cards in the same grid, not to let one card's anatomy diverge from its siblings.

---

## 13. ANTI-PATTERNS

**Anatomy drift within a grid.** Allowing individual cards within one Structured Grid to accumulate slightly different structures over time as new content is added by different contributors, each addition individually reasonable. This is dangerous because a grid's entire value as a comparison tool (Chapter 7) depends on structural consistency, and drift is, again, invisible card by card and only visible in aggregate. It is detected by comparing every card's anatomy checklist within a single grid instance side by side. It is fixed by normalizing every card in the grid to the same anatomy configuration, even if it means omitting an available asset from the one card that happens to have one.

---

## 14. QUALITY ASSURANCE CHECKLIST

- [ ] Is this card explicitly Static or Interactive, with its hover/elevation behavior matching that designation exactly? *(Cd-1)*
- [ ] Does any Media region contain a real photograph or render, never a placeholder block, at the point of shipping? *(Cd-2)*
- [ ] Does the card's Footer/Actions region contain at most one Primary-emphasis button? *(Cd-3)*
- [ ] Does every card within the same Structured Grid instance share identical anatomy? *(Cd-4)*
- [ ] Is an Interactive card implemented as one genuine interactive element for keyboard and screen-reader purposes?

---

## 15. CROSS REFERENCES

Chapter 1 (P1, P2, P7). Chapter 6 (grid span). Chapter 7 (Structured Grid pattern). Chapter 9 (elevation). Chapter 12 (photography, Media region). Chapter 15 (motion, stagger). Chapter 17 (anatomy standard). Chapter 18 (Button consistency, Bt-1 extended). Chapter 31 (skeleton loading treatment). Chapter 32 (Charts, frequent card occupant). Chapter 33 (Badges, frequent card occupant). Chapter 38 (Empty grid states). Chapter 39 (state model). Master Vision §17.2, Chapter 13.

---

## 16. FUTURE EXPANSION

**Documented limitations.** The `core.radius.lg` value (16px) populated here, alongside Chapter 18's `core.radius.md` (10px), suggests a Radius scale is emerging organically across component chapters rather than being defined once in Volume I as Chapter 2 originally intended — this should be consolidated into a proper, complete Radius chapter or section once enough components have populated their own needs to see the full required range, rather than continuing to populate it piecemeal indefinitely.

---

*End of Chapter 19. The next chapter, per the authoring sequence, is Navigation Systems.*
