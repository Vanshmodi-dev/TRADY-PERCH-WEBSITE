# CHAPTER 25 — DATA FETCHING & CACHING STRATEGY

**Trady Perch Product Implementation Constitution · Part V: State, Data & API Architecture**

**Inherited From:** Design System Bible Chapter 31 (Skeleton Loaders & Loading Patterns — Sk-1 "Skeleton Shape Matches the Real Content's Proportions," Sk-2 "The Pulse Is the System's One Loading Signature, Never a Spinner," Sk-3 "Extended Waits Escalate Their Messaging, Never Loop Silently Forever"), Chapter 22 (Tables & Data Grids, for paginated data); Motion Bible Chapter 54 (Loading State Philosophy). Chapters 22–24 of this Constitution are this chapter's direct premises.

---

## 1. INTRODUCTION

Chapter 22 §2 established that server state is managed through a caching layer, never copied into an ad hoc client variable. This chapter is that caching layer's full specification: when data is actually fetched, how long a cached copy is trusted before it's considered stale, how invalidation happens after a known mutation, and how the wait itself is surfaced to a user consistent with Design System Bible Chapter 31's skeleton-loading discipline. The visual treatment of a loading state is Chapter 28's and Design System Bible Chapter 31's territory; this chapter owns the underlying data lifecycle those visuals represent.

---

## 2. WHEN DATA IS FETCHED

Per Chapter 38's rendering strategy, applied per surface from Chapter 2: Marketing Site data, being largely static, is fetched at build time by default, with server-request-time fetching reserved for the specific, justified exceptions Chapter 38 names. Client Portal data is fetched at request or client time, per Chapter 2 §4's client-heavy posture for that surface, because its entire premise is per-account, current data that build-time fetching structurally cannot provide.

---

## 3. THE CACHE, WITH AN EXPLICIT STALENESS CONTRACT

Every cached server-state value carries an explicit staleness contract, declared at the point it's fetched: a duration after which it is considered stale and eligible for background refresh, and a duration after which it is considered hard-expired and must be refetched before being shown at all. No cached value has an implicit, undeclared staleness policy — Chapter 1's IP4 requires this contract to be explicit at the point of use, not left to whatever default the underlying fetching library happens to apply silently.

A stale-but-not-expired value is shown immediately, per standard stale-while-revalidate behavior, with a background refresh triggered automatically — this is a legitimate, common case and not itself a defect. A hard-expired value is never shown; the fetch is awaited, per Chapter 28's loading-state standard, before any content renders.

---

## 4. INVALIDATION AFTER A KNOWN MUTATION

The harder half of this chapter's job: when the Client Portal performs a mutation — a client updates a record, a status changes — every cached value that mutation could have affected is explicitly invalidated at the moment the mutation succeeds, not left to expire naturally on its own staleness timer. This invalidation is declared alongside the mutation itself, as a stated list of affected cache entries per Chapter 3's translation-ledger discipline applied to cache dependencies — a mutation with no stated invalidation list is treated as incomplete, per this chapter's own success criterion, exactly the same way an untested code path is treated as incomplete.

A mutation that invalidates a cache entry by broad, blunt invalidation of an entire cache is preferred, per Chapter 1's IP3, over a narrower invalidation that is incorrectly scoped and misses an affected entry — silently stale data after a known mutation is a worse outcome than an unnecessary refetch, and this chapter's default therefore errs toward over-invalidation until a specific, demonstrated performance need justifies a narrower scope.

---

## 5. SURFACING STALENESS AND WAIT TIME

Per Design System Bible Sk-1, a loading placeholder's shape matches the real content's proportions — this chapter's contribution is ensuring the caching layer exposes enough information (the expected shape of the data being fetched, per Chapter 24's schema) for a skeleton component to be built correctly against it, rather than a generic, shape-mismatched placeholder. Per Sk-2, the pulse animation, wired through Chapter 14's shared motion primitive, is the only loading signature used — no spinner is introduced anywhere this chapter's data layer drives a loading state. Per Sk-3, a fetch exceeding a defined duration threshold escalates its messaging automatically rather than looping the same skeleton indefinitely — this chapter's fetching layer exposes an elapsed-time signal specifically so the component layer can implement Sk-3's escalation without needing to independently track timing itself.

---

## 6. PAGINATED AND LARGE DATA SETS

Per Design System Bible Chapter 22's Tables precedent, a paginated data set's caching contract is scoped per page or per query, not as a single monolithic cache entry for the entire data set — a mutation affecting one record invalidates only the specific pages that could contain it where that scoping is reliably determinable, or the full paginated set per Section 4's over-invalidation default where it isn't.

---

## 7. ENFORCEMENT & MEASUREMENT

This chapter's own success criterion — a cache-invalidation bug catchable by an automated test — is satisfied by a required integration-test pattern per Chapter 47: every mutation's test suite includes an assertion that performs the mutation and then verifies every cache entry named in Section 4's invalidation list actually reflects the change, not merely that the mutation's own direct response was correct. A mutation shipped with no such assertion fails Chapter 49's quality gate. Section 3's staleness contract is checked by a lint rule flagging any data fetch with no explicit staleness declaration.

---

## 8. BEHAVIORAL RULES

**Before implementing any new mutation.** Its invalidation list per Section 4 is stated explicitly, before the mutation is considered complete — never added retroactively once a stale-data bug is reported in review or, worse, in production.

**When uncertain whether an invalidation scope is complete.** Chapter 1's IP3 restraint principle does not apply in the direction of narrower invalidation here — Section 4's over-invalidation default is the safe choice, revisited only once a specific performance cost is measured and justifies narrowing it.

**When a fetch is expected to take longer than Sk-3's escalation threshold.** The elapsed-time signal from Section 5 is wired into the component's messaging from the start, not added after a user complaint about an indefinitely spinning (structurally forbidden, per Sk-2) or silently stuck skeleton.

---

## 9. DO / DON'T

**Do** declare an explicit staleness contract for every cached value, with no reliance on an implicit library default.

**Do** state a mutation's full cache-invalidation list at the time the mutation is implemented, and prefer over-invalidation to an uncertain, narrow scope.

**Don't** show a hard-expired cached value while a fresh fetch is pending — await the fetch per Chapter 28's loading standard instead.

**Don't** use a spinner anywhere in this chapter's loading states — the pulse, per Sk-2, is the system's only loading signature.

---

## 10. ANTI-PATTERNS

**The forgotten invalidation.** A mutation is implemented and its own direct response renders correctly, but a related cached list elsewhere in the Client Portal — one that should have reflected the change — is never invalidated, and continues showing stale data until its normal staleness timer eventually expires, sometimes minutes later. This is dangerous specifically in the Client Portal context, per Chapter 21 §5's trust reasoning: a client seeing contradicted or stale account information is a direct trust failure, not merely a cosmetic bug. It is detected by Section 7's mandatory invalidation-assertion test, which fails immediately if any affected cache entry is missed. It is fixed by adding the missing entry to the mutation's invalidation list, and, per Section 4's default, erring toward a broader invalidation scope going forward for that mutation.

---

## 11. QUALITY ASSURANCE CHECKLIST

- [ ] Does every cached value carry an explicit staleness contract, with no implicit library default relied upon?
- [ ] Does every mutation state a complete cache-invalidation list, verified by an automated integration test per Section 7?
- [ ] Does every loading state use the pulse signature exclusively, with zero spinners? *(Sk-2)*
- [ ] Does a fetch exceeding Sk-3's threshold escalate its messaging rather than looping silently?
- [ ] Is a paginated data set's cache scoped per page or query, per Section 6, rather than as one monolithic entry?

---

## 12. CROSS REFERENCES

**Within this Constitution:** Chapter 1 (IP3, IP4). Chapter 3 (translation-ledger discipline, applied to Section 4's invalidation lists). Chapter 14 (the shared motion primitive driving Sk-2's pulse). Chapter 21–22 (the server-state category and caching-layer standard this chapter fully specifies). Chapter 24 (the schema Section 5 relies on for correctly shaped skeletons). Chapter 28 (Loading Strategy, the visual-layer consumer of this chapter's signals). Chapter 38 (Rendering Strategy, governing Section 2's fetch timing per surface). Chapter 47 (Testing Strategy, incorporating Section 7's mandatory assertion). Chapter 49 (Quality Gates, blocking a mutation with no invalidation test).

**Within the five documents above this Constitution:** Design System Bible Chapter 31 (in full), Chapter 22; Motion Bible Chapter 54.

---

## 13. FUTURE EXPANSION

**Documented limitations.** Section 6's per-page cache scoping assumes query parameters are a reliable proxy for what a page contains; a genuinely dynamic, real-time data set (a live-updating dashboard, per Chapter 2's Future Roadmap Surfaces) may need a different invalidation model entirely, deferred until that need is actually committed, per Chapter 1's IP3.

---

*End of Chapter 25. The next chapter, Error Handling Philosophy, addresses what happens the instant this chapter's fetch, per Section 3, fails to arrive at all.*
