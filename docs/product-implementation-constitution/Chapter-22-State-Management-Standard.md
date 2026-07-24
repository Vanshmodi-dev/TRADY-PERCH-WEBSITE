# CHAPTER 22 — STATE MANAGEMENT STANDARD

**Trady Perch Product Implementation Constitution · Part V: State, Data & API Architecture**

**Inherited From:** Design System Bible Chapter 39 (Complete State Model, as the state-shape vocabulary this chapter's client-state pattern uses); UX / Experience Blueprint Chapter 33 (Multi-Step Wizard Standard, for resumable state). Chapter 21 (State Management Philosophy) is this chapter's direct premise.

---

## 1. INTRODUCTION

Chapter 21 established three categories of state and a decision tree assigning any new value to exactly one. This chapter fixes the concrete pattern each category is implemented with, and — the harder, more consequential half of this chapter's job — the specific, non-negotiable threshold at which client state is promoted from a component-local concern into a shared, feature-level, or global one.

---

## 2. SERVER STATE: THE CACHING LAYER

Server state is managed exclusively through Chapter 25's data-fetching and caching layer — never through a general-purpose client-state store repurposed to hold API responses. A component never manually copies a fetch response into a separate state variable "to make it easier to work with" — it reads directly from the caching layer's own hook or accessor, so that Chapter 25's invalidation logic remains the single path through which that data can ever change in the frontend's view of it.

---

## 3. CLIENT STATE: THE THREE-TIER SCOPE MODEL

Client state exists at exactly one of three scopes, chosen by the smallest scope that correctly serves the need — never a broader scope chosen preemptively:

**Component-local state** — the default. A value used by exactly one component and its direct children is local state, full stop, with no promotion consideration needed.

**Feature-level state** — a value shared across multiple components within one feature folder per Chapter 8, but not needed outside it. Implemented as a feature-scoped context or store, colocated inside that feature's own folder, never in a global location.

**Global state** — a value genuinely needed across more than one feature, or across an entire app. This is the narrowest, most scrutinized tier, and the only one this chapter places an explicit, mandatory threshold in front of.

---

## 4. THE GLOBAL-STATE THRESHOLD

A value is promoted to global state only when **both** of the following are true, stated explicitly in the pull request introducing it:

1. **Two or more features, in two or more different folders per Chapter 8, currently and demonstrably need the same value** — not a plausible future second feature, per Chapter 1's IP3, but an actual, present second consumer.
2. **Passing the value down through props or lifting it to a common feature-level ancestor has been considered and specifically shown insufficient** — because the components needing it are too distant in the tree for prop-drilling to remain legible, per Chapter 1's IP4.

A pull request introducing a new global-state entry without explicitly addressing both conditions is rejected in review, citing this section directly — the exact mechanism behind this chapter's own success criterion: a reviewer needs no separate architectural debate, only a check against these two named conditions.

---

## 5. URL STATE: THE ROUTING LAYER

URL state, per Chapter 21 §4, is read and written exclusively through the routing layer's own URL-parameter mechanism — never mirrored into a `useState`-equivalent local variable that happens to be kept in sync with it. A component needing URL state reads it directly at render time from the current URL; updating it writes directly to the URL, through the one shared utility this chapter designates, never through a bespoke, per-feature synchronization function that risks drifting from the URL on some code path.

---

## 6. RESUMABLE FLOW STATE

Per UX / Experience Blueprint Chapter 33's multi-step wizard standard, a flow's current step and accumulated input are modeled as a combination of URL state (the current step, satisfying Chapter 40's shareability and refresh-survival requirement) and, where input must persist across a longer gap than a single session, explicitly persisted server state rather than client-only state that would be lost on tab close. A multi-step flow's state is never held purely in transient client state alone if UX / Experience Blueprint Chapter 33 requires it to survive a refresh — that requirement, per Chapter 21 §3's decision tree, is itself the signal the value belongs in the URL-state category, not client state, regardless of how tempting a simple `useState` implementation looks for a quick first version.

---

## 7. ENFORCEMENT & MEASUREMENT

Section 4's two-condition threshold is checked at code review per Chapter 54's checklist, and, where the tooling permits, partially mechanized: a static check can flag a new addition to the global store and require the pull request template's dedicated threshold-justification field to be filled before merge, making the omission itself, not only the substance, a blocking condition. Section 5's URL-state rule is mechanically enforced by a lint rule flagging any local state variable whose value is derived from and kept in sync with a URL parameter — a strong signal of the mirroring pattern Section 5 forbids.

---

## 8. BEHAVIORAL RULES

**Before adding to the global store.** Section 4's two conditions are checked and stated explicitly in the pull request — never assumed satisfied because the addition "feels global."

**When a component-local value starts being needed by a sibling.** It is lifted to the nearest common feature-level ancestor first, per Section 3's smallest-sufficient-scope rule — global promotion is considered only if Section 4's second condition (prop-drilling shown insufficient) is actually met.

**When a flow's state must survive a refresh.** Chapter 21 §3's decision tree already routes it to URL or persisted-server state; it is never implemented as transient client state "for now" with a plan to fix persistence later, which per Chapter 5's F2 rarely happens once a working, incorrect version already ships.

---

## 9. DO / DON'T

**Do** default every new state value to the narrowest scope in Section 3 that correctly serves it.

**Do** state both of Section 4's conditions explicitly in any pull request promoting a value to global state.

**Don't** copy a server-state response into a separate client-state variable to make it "easier to work with" — read directly from Chapter 25's caching layer.

**Don't** mirror a URL parameter into local component state kept manually in sync — read and write the URL directly through the shared utility.

---

## 10. ANTI-PATTERNS

**The reflexive global store entry.** A value is added to the global store because that's where "state usually goes" in this codebase, without either of Section 4's conditions being genuinely checked. This is dangerous because, per Chapter 11's "configuration creep" anti-pattern applied to state specifically, each individual addition looks small and locally reasonable, and the global store's total surface area — and the coupling it creates between otherwise-unrelated features — grows silently until nearly everything depends on nearly everything else. It is detected by Section 7's mandatory justification field being empty, vague, or unconvincing against Section 4's actual text. It is fixed by demoting the value back to feature-level or component-local scope and re-evaluating whether a genuine second consumer actually exists.

---

## 11. QUALITY ASSURANCE CHECKLIST

- [ ] Does every state value live at the narrowest scope from Section 3 that correctly serves its actual need?
- [ ] Does any global-state addition explicitly satisfy both of Section 4's conditions, stated in the pull request?
- [ ] Does URL state read and write exclusively through the shared routing utility, with zero local mirrors?
- [ ] Does resumable flow state route through URL or persisted-server state wherever UX / Experience Blueprint Chapter 33 requires survival across a refresh?

---

## 12. CROSS REFERENCES

**Within this Constitution:** Chapter 1 (IP3, IP4). Chapter 3 (duplicate-state detection, extended to Section 5's mirroring prohibition). Chapter 8 (feature-folder scope, the basis for Section 3's tiers). Chapter 21 (the decision tree and category definitions this chapter implements). Chapter 25 (Data Fetching & Caching Strategy, owning Section 2's server-state layer). Chapter 54 (Review Checklist, operationalizing Section 4's threshold check).

**Within the five documents above this Constitution:** Design System Bible Chapter 39; UX / Experience Blueprint Chapter 33, Chapter 40.

---

## 13. FUTURE EXPANSION

**Documented limitations.** Section 7's automated detection of Section 4 threshold violations remains partial — the justification field's *presence* is checkable, its *substance* still requires human review judgment, tracked as an ongoing, honest limitation rather than a solved problem.

---

*End of Chapter 22, and of this chapter's state model. The next chapter, API Integration Philosophy, addresses how server state in Section 2 actually arrives from outside this codebase in the first place.*
