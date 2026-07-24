# CHAPTER 67 — ENGINEERING ANTI-PATTERN LIBRARY

**Trady Perch Product Implementation Constitution · Part XIV: Governance & Continuous Improvement**

**Inherited From:** Design System Bible Chapter 68 (Anti-Pattern Library). Chapter 5 (Anti-Philosophy) is this chapter's direct premise — this chapter is Chapter 5's exhaustive, living expansion into specific, named instances.

*Honest status note, in keeping with this Constitution's own standard against false completeness (mirroring the Design System Bible's own admission about its Chapter 70): this chapter's catalog, at the time of this writing, consists of the anti-patterns already identified individually throughout Chapters 1–66 during this Constitution's initial authoring — not yet a catalog built from real, observed production incidents, which do not yet exist for a product not yet built. Its current form is a compiled index, not yet a battle-tested library. That is a status, not a defect, and it is expected to grow substantially once Chapter 65's quarterly cadence begins feeding real incidents into it.*

---

## 1. INTRODUCTION

Chapter 5 named five philosophy-level failure modes — F1 through F5. This chapter is where those failure modes meet specific, concrete instances: each one identified already, in the specific chapter where it was first named, each traced back to which principle it violates, and each carrying the same dangerous/detected/fixed structure its origin chapter already gave it. This chapter does not re-derive any of them — per Chapter 3's duplicate-translation prohibition, it indexes and cross-references, pointing to each anti-pattern's authoritative, fuller treatment in its originating chapter.

---

## 2. THE INDEX, ORGANIZED BY PART

**Part I — Implementation Philosophy.** Citation laundering (Ch. 1 §13, F5), premature invention (Ch. 1 §13, F4), isolated excellence (Ch. 1 §13, F5).

**Part II — Repository & Project Architecture.** *(No anti-pattern yet independently named beyond Part I's general instances; Chapters 6–10 cite F1–F5 directly rather than naming new specific cases.)*

**Part III — Component Architecture & Design System Implementation.** Configuration creep (Ch. 11 §10, a specific F4 instance), simulated pseudo-states (Ch. 12 §10), the boolean explosion for content states (Ch. 12 §10), the parallel hand-maintained token file (Ch. 13 §9, F3), the bespoke inline animation (Ch. 14 §10, F1), desktop-first retrofitting (Ch. 15 §9), the reflexive theme toggle (Ch. 16 §8), the silent breaking minor (Ch. 17 §8).

**Part IV — Accessibility & Inclusive Engineering.** The disabled check (Ch. 18 §10, F2), div-button syndrome (Ch. 18 §10), the stale green checkmark (Ch. 19 §8).

**Part V — State, Data & API Architecture.** The reflexive global store entry (Ch. 22 §10), the latency-driven direct call (Ch. 23 §9, F2), the optimistic type assertion (Ch. 24 §9), the forgotten invalidation (Ch. 25 §10), the confidence-building delay (Ch. 28 §8).

**Part VI — AI Implementation Workflow.** The plausible-sounding workaround (Ch. 31 §7), the confirmation-biased re-read (Ch. 32 §8).

**Part VII — Performance Engineering.** The quality-floor-crossing compression (Ch. 37 §9).

**Part IX — Security Implementation.** The undocumented data copy (Ch. 44 §11).

**Part X — Testing & Quality Assurance.** The inverted pyramid (Ch. 47 §9).

**Part XI — Code Review & Collaboration Standards.** The rubber-stamped approval (Ch. 52 §9).

**Part XIII — Documentation Standards.** The narrating comment (Ch. 61 §10).

**Part XIV — Governance & Continuous Improvement.** Surface drift and trust-boundary erosion (Ch. 2 §11, filed here by cross-reference since both concern Part I/II's architectural boundary rather than a later Part specifically), architecting a surface no one has committed to (Ch. 2 §11).

---

## 3. HOW A NEW ENTRY IS ADDED

Per Chapter 5 §10's own future-expansion clause, mirrored here: a genuinely new anti-pattern — one observed in real, post-launch production behavior rather than anticipated during this initial authoring — is added to this index only once it's actually occurred, cited from wherever it's first documented (most often a Chapter 59 postmortem), traced back to the specific F1–F5 category it instantiates, or, if it fits none of them, flagged as a candidate for Chapter 5 §3's sixth failure-mode threshold.

---

## 4. WHY THIS CHAPTER DOESN'T DUPLICATE THE FULL TREATMENT

Each entry in Section 2 already has a complete dangerous/detected/fixed treatment in its own originating chapter — repeating that treatment here would be exactly the duplicate-translation failure Chapter 3 §4 already forbids, applied reflexively to this Constitution's own content. This chapter's value is the index itself: a single place to scan the full catalog by Part, cross-referenced back to each entry's authoritative source, per Chapter 1's IP1 applied to this chapter's own internal citations.

---

## 5. ENFORCEMENT & MEASUREMENT

Per this chapter's own success criterion, a code reviewer citing a specific, indexed entry from this library — by its originating chapter and section — is sufficient grounds for a change request, mirroring Chapter 5 §10's identical standard for its own five failure modes. This chapter's completeness (whether every anti-pattern named elsewhere in this Constitution is actually indexed here) is checked per Chapter 65's quarterly cadence, cross-referencing this index against every chapter's own "Anti-Patterns" section for a gap.

---

## 6. BEHAVIORAL RULES

**When a code review identifies behavior matching an indexed entry.** The entry is cited directly, by chapter and section, per Section 5 — sufficient on its own, without needing to re-argue the underlying reasoning already established in that entry's origin chapter.

**When a genuinely new anti-pattern is observed in production.** Section 3's addition process runs — traced to its F1–F5 category, or flagged as a sixth-category candidate per Chapter 5 §10's threshold — never informally noted without being added to this index.

**When this chapter's index is found out of sync with a chapter's own anti-pattern section** (a new entry added to a chapter without a corresponding index update here). It is corrected in the same change, per Chapter 60 §4's staleness standard.

---

## 7. DO / DON'T

**Do** cite a specific, indexed anti-pattern by chapter and section as sufficient grounds for a review request.

**Do** trace any newly observed anti-pattern back to its F1–F5 category, or flag it as a genuine sixth-category candidate.

**Don't** re-write an anti-pattern's full dangerous/detected/fixed treatment in this chapter — index and cross-reference it instead.

**Don't** claim this catalog is exhaustive — its current, honest status is a compiled starting index, per this chapter's own opening note.

---

## 8. QUALITY ASSURANCE CHECKLIST

- [ ] Is every anti-pattern named elsewhere in this Constitution indexed here, with no gap?
- [ ] Does a cited entry reference its specific originating chapter and section, rather than restating its full treatment?
- [ ] Was a newly observed production anti-pattern traced to its F1–F5 category, or flagged as a sixth-category candidate?

---

## 9. CROSS REFERENCES

**Within this Constitution:** Every chapter cited in Section 2, individually. Chapter 3 §4 (duplicate-translation prohibition behind Section 4). Chapter 5 (the F1–F5 taxonomy this entire index is organized against). Chapter 59 (postmortems, the most common source of a new entry). Chapter 60 §4 (staleness standard behind Section 6). Chapter 65 (quarterly cadence checking this chapter's own completeness).

**Within the five documents above this Constitution:** Design System Bible Chapter 68.

---

## 10. FUTURE EXPANSION

**Documented limitations, stated plainly per this chapter's own opening note.** This index is compiled, not yet battle-tested against real production incidents. Its growth, going forward, is expected to be substantially driven by Chapter 59's postmortems rather than by further anticipatory authoring — consistent with Chapter 1's IP3, which counsels against inventing further hypothetical anti-patterns ahead of genuine, observed need.

---

*End of Chapter 67. The next chapter, The Ten-Year Test for Implementation, is this Constitution's final chapter — the closing standard every other chapter, including this one, is ultimately held to.*
