# CHAPTER 17 — COMPONENT PHILOSOPHY & ANATOMY STANDARD

**Trady Perch Design System Bible · Volume II: Components**

**Inherited From:** Design System Bible Chapter 1 (all eight principles — this chapter is the first place they are checked against a real, assembled component rather than a token or a system rule), Chapters 2–16 in full (every component built after this chapter consumes their tokens exclusively). Master Vision §3.2, Chapter 13 (Homepage Blueprint, the eventual home of every component this Bible defines).

---

## 1. INTRODUCTION

Volume I defined the atomic materials — color, type, space, motion, and everything else a component is built *from*. Volume II is where those materials are assembled into the actual nouns a designer places on a screen: a button, a card, a dialog. Without a shared template, twenty-two component chapters, written by different contributors over what will likely be well over a year, will each organize themselves differently — one documenting states before variants, another skipping accessibility notes because "it seemed obvious," a third inventing its own principle-numbering scheme. The Bible would still contain the right information, scattered inconsistently across chapters that no longer feel like they belong to the same book.

This chapter is the mold every component chapter in Volume II — Chapters 18 through 38 — is cast from. It depends on every chapter in Volume I, since the anatomy standard defined here assumes those tokens already exist and are stable. It is depended on by every single component chapter that follows it, without exception, and by Chapter 39 (The Complete State Model), which this chapter's own state-coverage requirement (An-3) points to directly.

---

## 2. PHILOSOPHY

The rejected alternative is letting each component chapter's structure emerge organically from whatever its subject seems to call for — a natural instinct, since a Button and a Data Table genuinely are different enough that identical treatment might seem to serve neither well. This was rejected for the same reason Chapter 1 rejects a large, ungoverned rulebook: a reader moving from the Buttons chapter to the Tables chapter should not have to re-learn how information is organized every time, and a future contributor writing the Toasts chapter should not have to invent, from scratch, a documentation structure that dozens of components before it had already solved. What this chapter provides is not a constraint on *what* each component says — a Button and a Table will still specify very different anatomy — but a fixed constraint on *how* it says it, so the reader's cognitive overhead is spent understanding the component, never re-learning the document's own shape.

---

## 3. CORE PRINCIPLES

### An-1 — Every Component Documents Anatomy Before Variants

**Purpose.** Every component chapter names and diagrams its constituent parts — the fixed structure common to every version of the component — before it describes any variant, size, or state built on top of that structure.

**Reasoning.** Descends from Principle 2 (Singular Focus): a reader encountering a component's variants before understanding its anatomy has no stable frame to hang those variants on, and ends up learning the variants as a list of unrelated facts rather than as modifications of one shared structure.

**Examples.** The Buttons chapter (Chapter 18) opens by naming a Button's fixed parts — Container, Label, optional Leading Icon, optional Trailing Icon — before describing Primary, Secondary, or Ghost as variants of that same anatomy.

**When it applies.** To every component chapter in Volume II.

**When it does not apply.** No exception.

**Common misunderstandings.** Assuming "anatomy" only applies to visually complex components. Even a component as simple as a Badge has anatomy (a Container and a Label) worth naming explicitly, if only to establish that it has no optional parts — the discipline of stating this plainly is what this principle actually requires, not a minimum complexity threshold.

### An-2 — Variants Live on Named, Orthogonal Axes

**Purpose.** A component's variations are organized along a small number of independent, named axes — typically Emphasis (primary/secondary/ghost), Size (sm/md/lg), and, where relevant, a component-specific third axis — never combined into a single flat list of pre-combined variant names.

**Reasoning.** Descends from Chapter 63's N-1 (one grammar, many renderings) and Principle 2: a flat list of variant names (`PrimaryLarge`, `PrimarySmall`, `SecondaryLarge`...) grows combinatorially and obscures the fact that Emphasis and Size are actually independent choices a designer makes separately — naming the axes explicitly is what keeps that independence visible and keeps the total documented surface area from exploding as more axes are added.

**Examples.** A Button's variants are specified as Emphasis (`primary`, `secondary`, `ghost`) × Size (`sm`, `md`, `lg`) — nine combinations, but two named axes to actually learn, not nine unrelated names to memorize.

**When it applies.** To every component with more than one dimension of variation.

**When it does not apply.** To a component with only one meaningful axis of variation (a Toast's severity: `info`, `success`, `error`, with no independent size axis) — such a component names its one axis and stops, rather than inventing a second axis it does not need merely for symmetry with other components.

**Common misunderstandings.** Assuming every component must have both an Emphasis and a Size axis. Neither is mandatory — a component's actual axes are whatever independent choices its own real design questions require, named explicitly whatever they turn out to be.

### An-3 — Every Component Explicitly Addresses All Seven Canonical States

**Purpose.** Every component chapter states, for each of the eight canonical states defined in Chapter 39 (hover, focus, active, disabled, loading, error, success, empty), either how the component handles that state or an explicit statement that the state does not apply to this component and why.

**Reasoning.** Descends from Principle 1 (Traceable Inheritance): a state left unmentioned is ambiguous between "this component doesn't need to handle it" and "the author forgot to consider it," and a reader has no way to tell which. Requiring an explicit statement either way removes that ambiguity entirely.

**Examples.** A Breadcrumb component's chapter (Chapter 28) states plainly that Loading, Error, and Success states do not apply to it, because breadcrumbs display static navigational context with no asynchronous or validated behavior — a short, explicit dismissal, rather than silence.

**When it applies.** To every component chapter, for all eight states, without exception.

**When it does not apply.** No exception — even a "not applicable" determination must be stated, not implied by omission.

**Common misunderstandings.** Assuming "addressing" a state requires a unique, custom visual treatment. Many components correctly inherit their states' visual treatment directly from Chapter 39's cross-component defaults — "addressing" the state, in that case, means stating that inheritance explicitly, not inventing a bespoke treatment merely to have something distinctive to document.

### An-4 — A Component Chapter Opens With Its Own Tier-3 Principles, Citing Tier 1 Ancestry

**Purpose.** Every component chapter's own "Core Principles" section (Section 3 of the Universal Chapter Writing Prompt template) states principles specific to that component, each one explicitly naming which of Chapter 1's eight Tier 1 principles it descends from.

**Reasoning.** Direct application of Chapter 1, Section 4's three-tier principle model: a component-level principle with no stated Tier 1 ancestry is not a principle in this Bible's sense, it is an unexamined preference dressed in the language of one — this chapter enforces the citation requirement Chapter 1 already established, specifically at the point (Volume II) where it will be tested most often.

**Examples.** Chapter 18's principle that primary buttons never appear more than once per screen cites Principle 2 (Singular Focus) directly, rather than standing alone as an assertion.

**When it applies.** To every component chapter's Core Principles section.

**When it does not apply.** No exception.

**Common misunderstandings.** Assuming a component chapter cannot introduce any genuinely new idea not already implicit in Chapter 1. It can and should — the requirement is that the new idea be shown to *descend* from an existing Tier 1 principle applied to this component's specific circumstances, not that it be a mere restatement of one.

---

## 4. COMPLETE DESIGN SPECIFICATION

**The fixed component-chapter template**, binding on Chapters 18 through 38 in addition to the sixteen sections every Bible chapter already follows:

1. **Anatomy** (within Section 4, Complete Design Specification): a named list and, where useful, a simple text-described diagram of the component's fixed parts, per An-1.
2. **Variant axes** (within Section 4): each axis named explicitly, with its full set of values, per An-2.
3. **Token consumption table**: every Semantic-tier token (Chapters 2–16) the component consumes, listed explicitly; any new Component-tier token proposed, justified against Chapter 2's T-4 gate.
4. **State coverage table**: all eight canonical states from Chapter 39, each with a stated treatment or explicit non-applicability, per An-3.
5. **Core Principles ancestry**: every Tier 3 principle in Section 3 cites its Tier 1 parent explicitly, per An-4.

---

## 5. MEASUREMENTS

- **Required state coverage: 7 of 7**, with zero permitted omissions (an omission is only acceptable in the form of an explicit "not applicable" entry, which still counts as coverage, not omission).
- **Minimum variant axes documented: 1** (a component with only one dimension of variation still names it explicitly, per An-2's exception clause).
- **Maximum un-cited Tier 3 principles per component chapter: 0.**

---

## 6. BEHAVIORAL RULES

**Before writing any component chapter.** Draft the anatomy list first, per An-1, before any variant or state content.

**During review of a new component chapter.** Verify all eight states are addressed (An-3) and every Tier 3 principle cites a Tier 1 parent (An-4) before evaluating anything else about the chapter's content.

**Under a proposal for an eighth canonical state.** Route through Chapter 39, not through this chapter — this chapter enforces coverage of whatever the canonical state set is; it does not itself define that set.

---

## 7. MOTION SPECIFICATION

Not independently specified here — each component chapter's own Section 7 (per the Universal Chapter Writing Prompt) cites Chapter 15's tiers directly. This chapter's contribution is only the requirement that every component chapter *have* a Section 7 that does so, consistent with the sixteen-section template already binding on every Bible chapter.

---

## 8. ACCESSIBILITY

Every component chapter's own Section 8 must state, at minimum, the component's keyboard operability (forward-referencing Chapter 42), its focus-visibility treatment (Chapter 17's own token consumption of `semantic.color.focus.ring`, Chapter 3), and any ARIA pattern it requires — this chapter's contribution is requiring that every component chapter actually populate its Section 8 with component-specific content, rather than a generic restatement of Master Vision §22 that could apply equally to any component and therefore says nothing about this one specifically.

---

## 9. RESPONSIVE BEHAVIOUR

Every component chapter's Section 9 must state how each of its variant axes (An-2) behaves across Chapter 8's four breakpoint ranges — which sizes are available or default at which range, and whether any variant is suppressed entirely at a given range (a Ghost-emphasis button remaining fully available at every range, for instance, versus a dense Table density mode that may not apply at Mobile at all).

---

## 10. AI & FUTURE INTERFACES

Every component chapter's Section 10 must state, at minimum, whether the component has a plausible voice or spatial equivalent (Chapters 72–73) or whether it is inherently visual/pointer-bound with no meaningful translation — an honest "no meaningful voice equivalent exists for a Data Table's grid structure" is a complete, correct answer to this section's requirement, exactly as valid as a detailed translation would be for a component like Buttons that clearly does have one.

---

## 11. DO

Opening the future Cards chapter (Chapter 19) with an anatomy list (Container, optional Media region, Title, Body, optional Footer/Actions), followed by variant axes (Elevation: resting/interactive, per Chapter 9; Density: standard/compact, per Chapter 5's Sp-4), followed by a full eight-state table, followed by Core Principles each citing their Chapter 1 ancestry — in that fixed order, satisfying every requirement in Section 4 before any card-specific visual detail is discussed.

## 12. DON'T

Writing a component chapter that jumps directly into variant descriptions ("here are the three button styles") without first naming the shared anatomy those three styles are variations of. A reader can still technically extract the needed information, but they extract it as three disconnected facts rather than three modifications of one understood structure — exactly the failure An-1 exists to prevent.

---

## 13. ANTI-PATTERNS

**Silent state omission.** Writing a component chapter's state coverage table with some states simply missing, rather than explicitly marked not applicable. This is dangerous because a missing row is invisible in a way a stated "not applicable" is not — a reviewer scanning quickly will not notice an absence the way they would notice and evaluate an explicit dismissal, and the actual reasoning (was this state considered and ruled out, or genuinely forgotten?) is lost entirely. It is detected by counting table rows against Chapter 39's eight canonical states for every component chapter — any chapter with fewer than eight rows has failed this chapter's requirement regardless of how good its other content is. It is fixed by adding the missing rows, with genuine reasoning, before the chapter is considered complete.

---

## 14. QUALITY ASSURANCE CHECKLIST

- [ ] Does the chapter document anatomy before any variant or state content? *(An-1)*
- [ ] Are the component's variation dimensions organized into named, independent axes rather than a flat combined list? *(An-2)*
- [ ] Does the chapter's state coverage table contain all eight canonical states, each with a stated treatment or explicit non-applicability? *(An-3)*
- [ ] Does every Tier 3 principle in the chapter's Core Principles section cite a specific Tier 1 (P1–P8) ancestor? *(An-4)*
- [ ] Does the chapter include a token consumption table listing every Semantic token used and justifying any new Component-tier token against Chapter 2's T-4?

---

## 15. CROSS REFERENCES

Chapter 1 (all eight principles; the three-tier principle model this chapter enforces). Chapters 2–16 (every token this chapter's anatomy standard requires components to consume rather than reinvent). Chapter 18 through 38 (every chapter bound by this standard). Chapter 39 (the canonical eight-state set this chapter requires coverage of). Chapter 42 (keyboard operability, referenced by every component's Section 8). Master Vision §3.2, Chapter 13.

---

## 16. FUTURE EXPANSION

**Possible future additions.** Should Volume II eventually reveal a genuine need for an eighth documentation requirement beyond the five in Section 4, it should be added here, once, and applied retroactively to prior component chapters — never introduced piecemeal by an individual component chapter deciding, on its own, to document something extra its neighbors don't.

**Documented limitations.** This standard has not yet been tested against a genuinely unusual component (the Interactive AI Demo, for instance, which may not fit the anatomy/variant/state model as cleanly as a Button does) — the first such component chapter written should be treated as a real test of whether this standard generalizes as well as this chapter assumes.

---

*End of Chapter 17. The next chapter, The Complete State Model, defines the eight canonical states this chapter's An-3 requires every component to address — the last chapter written before Volume II's individual components can begin in earnest.*
