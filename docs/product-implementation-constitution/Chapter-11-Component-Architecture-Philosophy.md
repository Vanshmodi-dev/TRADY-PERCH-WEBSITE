# CHAPTER 11 — COMPONENT ARCHITECTURE PHILOSOPHY

**Trady Perch Product Implementation Constitution · Part III: Component Architecture & Design System Implementation**

**Inherited From:** Design System Bible Chapter 17 (Component Philosophy & Anatomy Standard, in full — An-1 "Every Component Documents Anatomy Before Variants," An-2 "Variants Live on Named, Orthogonal Axes," An-3 "Every Component Explicitly Addresses All Eight Canonical States," An-4 "A Component Chapter Opens With Its Own Tier-3 Principles") and Chapter 39 (Complete State Model, defining the eight states — hover, focus, active, disabled, loading, error, success, empty). Chapter 3 (The Translation Doctrine) and Chapter 8 (Folder Hierarchy Standard) are this chapter's direct premises.

*A note on terminology: Design System Bible Chapter 17's own section header reads "Seven Canonical States," while its body text and Chapter 39 both specify eight (hover, focus, active, disabled, loading, error, success, empty). This Constitution treats the body text and Chapter 39 as authoritative and uses "eight" throughout, per this chapter's own citation standard — a labeling inconsistency upstream is not propagated downstream once identified. This discrepancy is logged in Chapter 66's Engineering Debt Register as a correction owed to the Design System Bible itself.*

---

## 1. INTRODUCTION

Design System Bible Chapter 17 tells a designer how a component is documented: its anatomy first, its variants on named orthogonal axes, its seven canonical states, each addressed explicitly. This chapter tells an engineer how that same component becomes code — where its file boundary falls, how its props API is shaped, and how An-2's variant axes and An-3's state model translate into an actual type signature rather than a written specification. Part III exists precisely to make this translation, chapter by chapter; this is the first of them, and it sets the boundary every later Part III chapter inherits.

---

## 2. PHILOSOPHY: COMPOSITION OVER CONFIGURATION

A component's props API can grow in one of two directions. It can grow toward **configuration** — a small number of components, each accepting an increasing number of boolean and enum props that toggle internal behavior, until a single component's prop list becomes a de facto configuration language only its author fully understands. Or it can grow toward **composition** — a larger number of small, focused components, each with a narrow prop surface, combined together by whoever consumes them to produce the needed result.

This Constitution commits to composition as the default, for a reason directly descended from Chapter 1's IP4: a configuration flag's meaning is only as legible as its name and its interaction with every other flag on the same component, and that legibility degrades combinatorially as flags accumulate. A composed structure — several small, named components used together — states its own meaning through the shape of the composition itself, readable without needing to trace which combination of booleans produces which visual result.

Configuration is not forbidden outright. An-2's orthogonal variant axes are, correctly, implemented as props — `variant="primary"`, `size="compact"` — because a variant axis is a bounded, named, well-documented set of alternatives, not an open-ended toggle. The distinction this chapter draws is between a variant prop (a closed set, inherited directly and traceably from a Design System Bible chapter's own variant axis) and a configuration flag invented locally to avoid composing two smaller components together.

---

## 3. THE ANATOMY-TO-STRUCTURE MAPPING

An-1 requires every Design System Bible component chapter to document anatomy — the named parts a component is built from — before its variants. This chapter requires the code to mirror that anatomy directly: a component with a documented anatomy of icon, label, and container is implemented with those same three parts identifiable in its code structure, whether as internal sub-components, named render regions, or clearly delineated JSX/markup blocks — never flattened into an undifferentiated mass of markup that a reader has to reverse-engineer back into the anatomy Design System Bible Chapter 18, 19, or any later component chapter already named.

This mapping is what makes Chapter 3's translation ledger meaningful at component scale: a component's ledger entry cites not only its overall Design System Bible origin, but, where relevant, which documented anatomy part a specific piece of its internal structure corresponds to.

---

## 4. THE VARIANT-AXIS-TO-PROPS MAPPING

Each of An-2's named, orthogonal variant axes becomes exactly one prop, typed as a closed union of the axis's documented values — never a boolean per value (`isPrimary`, `isSecondary`) which allows invalid combinations (`isPrimary={true} isSecondary={true}`) that a closed union type structurally forbids. `variant: "primary" | "secondary" | "tertiary"` is correct; `isPrimary: boolean` alongside `isSecondary: boolean` is not, because it reintroduces exactly the combinatorial ambiguity Section 2 already rejects composition-over-configuration to avoid.

A proposed new prop that does not correspond to a documented Design System Bible variant axis is checked against Chapter 1's IP1 before being added — either the axis is genuinely missing from the upstream chapter and needs to be raised through that document's own governance process, or the prop is unjustified and the need is better served by composing existing components instead.

---

## 5. THE EIGHT-STATE MAPPING

An-3 requires every component to explicitly address all eight of Design System Bible Chapter 39's canonical states. This chapter requires every one of those eight states to have an explicit, typed representation in the component's implementation — never left to be implied by the absence of other props, which leaves at least one state unreachable or ambiguous in practice. Chapter 12 (Component Implementation Standard) specifies the exact mechanism; this chapter's contribution is the requirement that the mapping be complete and explicit, with no state silently unimplemented because it seemed unlikely to occur.

---

## 6. THE TIER-3 PRINCIPLE REQUIREMENT

An-4 requires every Design System Bible component chapter to open with its own Tier-3 principles, citing Tier-1 ancestry. This Constitution does not require every component's *code* to carry a redundant, separate restatement of those principles — the Design System Bible chapter is the principle's authoritative home, per Chapter 3's translation model, and restating it in code comments would itself be exactly the kind of duplicate translation Chapter 3 forbids. Instead, a component's code cites its originating Design System Bible chapter number directly in its translation ledger entry, and that citation is the traceable link back to An-4's Tier-3 principles — sufficient without repetition.

---

## 7. ENFORCEMENT & MEASUREMENT

A component's props type can be mechanically checked against An-2's documented variant axes once Design System Bible chapters are represented in a machine-readable form per Appendix A's tooling index — flagging a prop that doesn't correspond to any documented axis, or a documented axis with no corresponding prop, as a translation-ledger mismatch per Chapter 3. Until that tooling exists, the check is manual, performed at code review per Chapter 54's checklist, and its absence as an automated check is tracked in Chapter 66's debt register.

---

## 8. BEHAVIORAL RULES

**Before implementing a new component.** Its Design System Bible chapter is read in full first — anatomy, variant axes, and seven-state model — and Section 3 through 5's mappings are drafted before any code is written, per this chapter's own success criterion.

**When a prop feels like it wants to become a boolean flag.** That feeling is treated as a signal to check whether the underlying need is actually a missing variant axis (raised upstream) or a case better served by composing two components, per Section 2 — never resolved by adding the boolean directly.

---

## 9. DO / DON'T

**Do** implement each of An-3's eight canonical states with an explicit, typed representation, even for a state that seems unlikely to occur often in practice.

**Do** treat a component's documented anatomy as the literal outline for its internal code structure.

**Don't** add a boolean prop to toggle behavior that a documented variant axis or a compositional pattern already covers.

**Don't** flatten a component's anatomy into undifferentiated markup that no longer visibly corresponds to its Design System Bible documentation.

---

## 10. ANTI-PATTERNS

**Configuration creep.** A component that begins with a small, clean props API accumulates boolean flags over successive feature requests, each individually reasonable, until its props type is longer than its render logic and no single combination of flags has ever actually been tested. This is dangerous because, like Chapter 5's F4, each individual flag looked justified at the time it was added — the fragility is only visible in the accumulated total. It is detected by a props-count or boolean-count threshold flagged in review per Chapter 54, prompting a deliberate composition-over-configuration reassessment once crossed. It is fixed by decomposing the component into smaller, composed pieces per Section 2, not by better-documenting the existing flag combinations.

---

## 11. QUALITY ASSURANCE CHECKLIST

- [ ] Does the component's internal structure visibly mirror its Design System Bible anatomy? *(An-1)*
- [ ] Does every variant axis map to exactly one closed-union prop, with no boolean-per-value alternative in use? *(An-2)*
- [ ] Are all eight canonical states explicitly, typedly represented? *(An-3)*
- [ ] Does the component's translation ledger entry cite its originating Design System Bible chapter, carrying An-4's principle ancestry by reference? *(An-4)*
- [ ] Is any new prop a genuine variant axis or composed alternative, rather than an unjustified configuration flag?

---

## 12. CROSS REFERENCES

**Within this Constitution:** Chapter 1 (IP1, IP4). Chapter 3 (translation ledger mechanism, extended here to component anatomy). Chapter 8 (the feature/component folder structure this chapter's file boundaries live inside). Chapter 12 (Component Implementation Standard) fixes the literal template. Chapter 54 (Review Checklist) operationalizes Section 7's manual check. Chapter 66 (Engineering Debt Register) tracks Section 7's missing automation.

**Within the five documents above this Constitution:** Design System Bible Chapter 17 (in full), Chapter 39 (Complete State Model, cited via An-3).

---

## 13. FUTURE EXPANSION

**Possible future additions.** Automated anatomy-to-structure verification, once Design System Bible chapters are machine-readable, is the clearest near-term candidate for closing Section 7's manual-check gap — not built ahead of that prerequisite existing.

---

*End of Chapter 11. The next chapter, Component Implementation Standard, fixes this chapter's philosophy into an actual, literal code template.*
