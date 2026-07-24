# CHAPTER 62 — ARCHITECTURE DECISION RECORD STANDARD

**Trady Perch Product Implementation Constitution · Part XIII: Documentation Standards**

**Inherited From:** Design System Bible Chapter 65 (Governance Model & Decision Rights). Chapter 60 (Documentation Philosophy) is this chapter's direct premise — an ADR is the "why"-native documentation type Chapter 61 §6 already distinguishes from an ordinary comment.

---

## 1. INTRODUCTION

This chapter has been cited, by name, throughout nearly every prior Part of this Constitution — as the required record for a foundational dependency (Chapter 6), a surface-architecture classification (Chapter 2 §6), a tool adoption (Chapter 34), a security exception (Chapter 45), and more. This chapter is where that repeated citation is finally, fully specified: the literal format, the significance threshold determining when one is required, and the filing timeline.

---

## 2. THE SIGNIFICANCE THRESHOLD

An ADR is required when a decision meets at least one of the following: it is expensive to reverse per Chapter 1's IP7 (a foundational technology or dependency choice); it establishes a pattern other, future decisions will be checked against (a new architectural boundary, a new package tier per Chapter 7 §4); or a specific chapter of this Constitution explicitly names it as requiring one (Chapter 2 §6's surface classification, Chapter 45 §2's dependency exception). A decision meeting none of these is not required to have an ADR — per Chapter 60's restraint principle applied here directly, an ADR for a routine, easily-reversed implementation choice would itself be exactly the kind of unnecessary documentation Chapter 60 §2 already discourages.

---

## 3. THE ADR FORMAT

Every ADR states, in a fixed structure: the decision being made, in one sentence; the context and constraints that made this decision necessary; the alternatives genuinely considered and why each was rejected, per Chapter 1's IP1 applied to the decision-recording process itself; the decision's actual reasoning; and its known consequences, including what becomes harder as a direct result of this choice, stated honestly rather than omitted. An ADR with no rejected-alternatives section is treated as incomplete, per the same logic Design System Bible Chapter 1 already applies to its own three-rejected-alternatives pattern used throughout this entire six-document hierarchy.

---

## 4. FILING TIMELINE

Per this chapter's own success criterion, an ADR is filed within one release cycle (per Chapter 58's release definition) of the decision actually being made — not indefinitely deferred, and not required before the decision can be acted on, since requiring the full ADR before any implementation could begin would create exactly the kind of process friction that tempts a team to skip it under time pressure. A decision acted on without its ADR yet filed is tracked as an open item, per Chapter 66's debt register, until the record is actually written.

---

## 5. WHERE ADRS LIVE

Every ADR is stored in `docs/adr/` per Chapter 7 §5, as a flat, chronologically numbered sequence — never nested inside the specific package or app the decision most directly affects, because an ADR's value depends on being discoverable as part of one complete sequence, not scattered across the repository requiring a reader to know where to look for a decision made in an unfamiliar part of the codebase.

---

## 6. AMENDING AN ADR

An ADR is never edited to reflect a later, changed decision — per Design System Bible Chapter 64's Vs-2 versioning discipline applied here, a changed decision gets a new ADR that explicitly supersedes the original, which remains in place, unedited, as an honest historical record of what was actually decided and why at the time. This mirrors Chapter 9 §8's name-retirement rule directly: an old decision's record is not silently rewritten any more than a retired name is silently reassigned.

---

## 7. ENFORCEMENT & MEASUREMENT

Section 2's threshold is checked at code review per Chapter 54's checklist — a pull request making a decision matching Section 2's criteria with no linked ADR is flagged, per the same completeness logic Chapter 30 already applies to task briefings. Section 4's filing timeline is tracked per Chapter 65's continuous-improvement cadence, measuring the actual gap between a threshold-meeting decision and its ADR's filing date, with a pattern of missed timelines treated as a process gap per Chapter 66, not an individual lapse to address case by case.

---

## 8. BEHAVIORAL RULES

**When making any decision.** Section 2's threshold is checked explicitly — if met, an ADR is planned for, per Section 4's timeline, even if the full record isn't written before implementation begins.

**When a previously ADR-recorded decision changes.** Section 6's supersession process is used — a new ADR is filed, and the original is left unedited and marked superseded, never rewritten in place.

**When reviewing a pull request that appears to meet Section 2's threshold with no linked ADR.** It is flagged per Section 7, and either an ADR is filed before merge or a Chapter 66 debt-register entry tracks its pending status explicitly.

---

## 9. DO / DON'T

**Do** check every decision against Section 2's threshold explicitly, rather than deciding informally whether it "feels significant enough."

**Do** file a superseding ADR for a changed decision, leaving the original unedited and marked superseded.

**Don't** edit an existing ADR to reflect a new, different decision.

**Don't** require a full ADR before implementation can begin — file it within Section 4's one-release-cycle window instead.

---

## 10. QUALITY ASSURANCE CHECKLIST

- [ ] Does this decision meet Section 2's significance threshold, and if so, is an ADR planned or filed?
- [ ] Does the ADR follow Section 3's format, including a genuine rejected-alternatives section?
- [ ] Was the ADR filed within Section 4's one-release-cycle window, or tracked as pending per Chapter 66?
- [ ] Does a changed decision have a new, superseding ADR, with the original left unedited?

---

## 11. CROSS REFERENCES

**Within this Constitution:** Chapter 1 (IP1, IP7). Chapter 2 §6 (a named ADR trigger). Chapter 6 §3 (foundational-dependency ADRs). Chapter 7 §5 (`docs/adr/`'s location). Chapter 9 §8 (the name-retirement rule mirrored in Section 6). Chapter 17, Chapter 58 (Vs-2 versioning discipline mirrored in Section 6). Chapter 30 (briefing-completeness logic mirrored in Section 7). Chapter 34, Chapter 45 §2 (other named ADR triggers). Chapter 54 (review checklist enforcing Section 7). Chapter 60–61 (the documentation philosophy this chapter's "why"-native format satisfies natively). Chapter 65 (continuous-improvement tracking of Section 4). Chapter 66 (debt register for pending ADRs).

**Within the five documents above this Constitution:** Design System Bible Chapter 64 (Vs-2), Chapter 65.

---

## 12. FUTURE EXPANSION

**Documented limitations.** Section 2's threshold remains partly judgment-dependent ("establishes a pattern other decisions will be checked against"); a fully mechanical trigger for every case is not attempted here, consistent with Chapter 60's own acceptance of judgment at the margins.

---

*End of Chapter 62. The next chapter, Onboarding & Knowledge Transfer Documentation, specifies the documentation set that lets a new contributor become productive without a live walkthrough.*
