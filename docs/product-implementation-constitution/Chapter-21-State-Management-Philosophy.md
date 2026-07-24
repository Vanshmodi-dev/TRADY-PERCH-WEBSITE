# CHAPTER 21 — STATE MANAGEMENT PHILOSOPHY

**Trady Perch Product Implementation Constitution · Part V: State, Data & API Architecture**

**Inherited From:** UX / Experience Blueprint Chapter 30 (Flow Design Philosophy), Chapter 40 (Cross-Device Flow Continuity). Chapter 2 (Product Architecture Philosophy) is this chapter's direct premise, specifically its per-surface rendering model.

---

## 1. INTRODUCTION

"Where does this value live" is asked, implicitly or explicitly, for every piece of information a feature touches, and answered inconsistently across a codebase with no shared decision framework: sometimes in a global store because that's what was already imported, sometimes in local component state because it was the fastest thing to reach for, sometimes duplicated in both because nobody was sure which was correct. This chapter provides the framework so the question is answered the same way every time, by anyone, without a fresh debate per feature.

---

## 2. THE THREE CATEGORIES

**Server state** — data that originates from, and is owned by, a backend service: a client's invoice list, a project's status. Server state is never the source of truth in the frontend; the frontend holds a cached, possibly stale copy of it, per Chapter 25's data-fetching strategy, and mutations are always round-tripped through the server rather than optimistically assumed permanent without confirmation.

**Client state** — data that exists only in the current session and has no server-side representation: whether a dropdown is open, which tab is active, form input before submission. Client state's lifecycle is scoped to the component or feature that owns it, per Chapter 8's colocation standard, unless a genuine cross-feature need promotes it to `shared/`.

**URL state** — data that represents where the user is, and which per UX / Experience Blueprint Chapter 40's cross-device continuity standard, should survive a page refresh, a shared link, or a switch between devices: the current filter on a data table, the active step in a multi-step flow, the currently viewed record's identifier. URL state is never duplicated into client state — the URL is its single source of truth, read directly rather than mirrored into a separate store that could drift from it.

---

## 3. THE DECISION TREE

For any new piece of state, in order:

1. **Does this value originate from a backend service?** If yes, it is server state, governed by Chapter 25 — stop here.
2. **Should this value survive a refresh, be shareable via URL, or persist across a device switch, per UX / Experience Blueprint Chapter 40?** If yes, it is URL state — stop here.
3. **Otherwise, it is client state**, scoped as narrowly as Chapter 8's colocation standard allows, promoted to a shared or feature-level store only per Chapter 22's specific threshold.

This tree is exhaustive — every piece of state in this codebase falls into exactly one of the three categories, never split across two, and never left uncategorized. A value the tree cannot cleanly categorize is a signal the value itself is doing more than one job and should be decomposed into two separately-categorized values instead.

---

## 4. WHY URL STATE IS TREATED AS ITS OWN CATEGORY

Many state-management frameworks treat the URL as an afterthought — a routing detail synced awkwardly with an already-existing client store. This chapter treats it as a first-class, distinct category specifically because UX / Experience Blueprint Chapter 40's cross-device continuity standard depends on it: a user who copies a link, or continues a task on a second device, per that chapter's own experiential requirement, needs the product's state to travel with the URL rather than live only in one browser tab's memory. Modeling URL state as its own category, with the URL as sole source of truth, is what makes that continuity requirement structurally guaranteed rather than a feature that has to be separately, manually implemented and kept in sync per flow.

---

## 5. WHY SERVER STATE IS NEVER TRUSTED AS PERMANENT LOCAL TRUTH

Per Chapter 2's surface architecture, the Client Portal in particular displays data another party (Trady Perch's own backend, ultimately reflecting real project and account state) owns and can change independently of the current session. Treating a locally cached copy of that data as permanently authoritative — rather than as a cache subject to Chapter 25's invalidation rules — risks the Client Portal showing a client stale or contradicted information, a direct trust failure per UX / Experience Blueprint's own trust-architecture standard. This chapter's category boundary exists specifically to prevent server state from ever being promoted, by convenience, into a client-state store that no longer tracks its actual source of truth.

---

## 6. ENFORCEMENT & MEASUREMENT

Section 3's decision tree is, in principle, partially mechanical: a lint rule can flag a client-state store containing a value shape matching a known API response type from Chapter 24's contracts, a strong signal of miscategorized server state; a second check can flag duplicated state — the same logical value held in both a client store and read from the URL — as a Chapter 3 duplicate-translation violation applied to state specifically. Full automation of the categorization judgment itself remains a review-time check per Chapter 54, tracked as a partial-automation gap in Chapter 66's debt register.

---

## 7. BEHAVIORAL RULES

**When starting any new feature.** Every piece of state the feature introduces is run through Section 3's decision tree explicitly, before Chapter 22's specific library or pattern is chosen for it.

**When a value seems to resist categorization.** It is decomposed into its constituent parts per Section 3's own closing instruction, rather than forced into whichever category is most convenient to implement quickly.

**When two developers disagree about a value's category.** The decision tree in Section 3 is the tie-breaker, run explicitly and in writing — not resolved by whoever is more senior or more persistent.

---

## 8. DO / DON'T

**Do** run every new state value through Section 3's decision tree before implementing it.

**Do** treat the URL as the sole source of truth for URL-category state, read directly rather than mirrored into a parallel store.

**Don't** cache server state locally and treat it as permanently authoritative — it remains a cache, subject to Chapter 25's invalidation rules, for as long as it exists.

**Don't** split one logical value's storage across two of the three categories — decompose it into two distinct values instead, each cleanly categorized.

---

## 9. QUALITY ASSURANCE CHECKLIST

- [ ] Has every new state value been explicitly run through Section 3's decision tree?
- [ ] Is server state treated as a cache subject to Chapter 25's rules, never as locally-owned permanent truth?
- [ ] Does URL-category state read directly from the URL, with no parallel, potentially drifting mirror in client state?
- [ ] Is any value that resisted clean categorization decomposed into properly separated values?

---

## 10. CROSS REFERENCES

**Within this Constitution:** Chapter 2 (the surface architecture Section 5's trust reasoning depends on). Chapter 3 (duplicate-state detection in Section 6). Chapter 8 (colocation scope for client state). Chapter 22 (State Management Standard, the concrete library/pattern per category). Chapter 24 (API contracts, the shape used in Section 6's server-state detection). Chapter 25 (Data Fetching & Caching Strategy, governing server state's actual lifecycle).

**Within the five documents above this Constitution:** UX / Experience Blueprint Chapter 30, Chapter 40.

---

## 11. FUTURE EXPANSION

**Documented limitations.** Section 6's automated categorization checks remain partial; full detection of miscategorized state depends on tooling not yet specified in detail, tracked honestly as a debt-register gap rather than claimed as solved.

---

*End of Chapter 21. The next chapter, State Management Standard, fixes this decision tree into the specific library and pattern used per category.*
