# CHAPTER 64 — QUALITY GOVERNANCE MODEL & DECISION RIGHTS

**Trady Perch Product Implementation Constitution · Part XIV: Governance & Continuous Improvement**

**Inherited From:** Design System Bible Chapter 65 (Governance Model & Decision Rights, in full — Gov-1 "One Named Authority for Routine Decisions," Gov-2 "Escalation Requires a Documented Disagreement," Gov-3 "No Retroactive Invalidation," Gov-4 "Decision Authority Scales With Blast Radius," Gov-5 "Tier 1 Principles Amend Only Through Unanimous Review Board Consent," Gov-6 "The Review Board Forms From Active Contributors"). Chapter 1 (Implementation Principles) is this chapter's direct premise.

---

## 1. INTRODUCTION

This chapter has been cited throughout this Constitution as the routing mechanism for every disagreement, exception, and proposed amendment Parts I through XIII deferred rather than resolved inline. It extends Design System Bible Chapter 65's governance model, unchanged in its underlying structure, to engineering-standard decisions specifically — because a governance model, like a naming convention or a citation syntax, is exactly the kind of system-wide mechanism Chapter 1's IP3 says should be reused rather than reinvented per document.

---

## 2. THE SIX INHERITED PRINCIPLES, APPLIED TO ENGINEERING

**Gov-1, One Named Authority for Routine Decisions.** Every chapter of this Constitution has a named owner — the role or person accountable for its currency — exactly as Design System Bible Chapter 65 already requires for its own chapters. A routine question about how a chapter applies is routed to that chapter's owner first, not escalated broadly.

**Gov-2, Escalation Requires a Documented Disagreement.** A disagreement about how this Constitution applies is escalated only once it's written down — what the disagreement actually is, per Chapter 1 §4's derivation test having already been run — never escalated as a vague, undocumented feeling that something seems wrong.

**Gov-3, No Retroactive Invalidation.** A decision made correctly under this Constitution's standard at the time it was made is not retroactively treated as a violation once the standard changes — exactly as Chapter 62 §6 already applies to a superseded ADR, itself a direct instance of this principle.

**Gov-4, Decision Authority Scales With Blast Radius.** A decision's approval requirement scales with its reversibility cost per Chapter 1's IP7 — Chapter 29 §2's ownership split and Chapter 52 §2's two-reviewer threshold for foundational-package changes are both direct, engineering-specific instances of this principle already in force.

**Gov-5, Amendment of the Most Foundational Layer Requires Full Consent.** Chapter 1's seven principles (IP1–IP7) amend only through the same unanimous review-board consent Design System Bible Chapter 65 requires for its own Tier 1 principles — the highest bar in this Constitution, reserved for the layer everything else inherits from.

**Gov-6, The Review Board Forms From Active Contributors, Not a Fixed Permanent Body.** This Constitution's own review authority is not a fixed, named committee frozen at the document's founding — it is whoever is an active contributor to this codebase at the time a decision requires board-level consent, mirroring Design System Bible Chapter 65's own anti-ossification reasoning exactly.

---

## 3. THE DECISION-RIGHTS MAP

Per this chapter's own success criterion, any proposed exception routes to exactly one of the following, determined mechanically by what kind of change is being proposed:

- **An exception to a specific chapter's standard, for one specific case** (a temporary, logged deviation) → that chapter's named owner, per Gov-1, recorded in Chapter 66's debt register.
- **A change to a chapter's standard itself** (not an exception, a genuine revision) → Gov-4's blast-radius scaling: a narrow, low-priority chapter's revision needs its owner's approval alone; a chapter cited as a dependency by many others (Chapter 2, Chapter 7, Chapter 12) needs review-board consent per Gov-6.
- **A change to one of Chapter 1's seven principles** → full review-board unanimous consent, per Gov-5, without exception.
- **A new chapter proposal** → routed the same way as a revision to an existing chapter of comparable dependency weight, per Gov-4.

---

## 4. THE RELATIONSHIP TO THE FIVE DOCUMENTS ABOVE

This chapter's authority is bounded, per this Constitution's own §0.1 standing rule: it governs decisions about this Constitution's own content, never a decision that would contradict the Master Vision, the Design System Bible, the Motion Bible, the UX / Experience Blueprint, or the Brand Identity Manual. A proposed change that would require contradicting one of those five documents is not within this chapter's governance authority at all — it is routed to whatever governance mechanism those documents' own Chapter 65-equivalents specify, since this Constitution has no authority to amend anything above it in the inheritance order.

---

## 5. ENFORCEMENT & MEASUREMENT

This chapter's own success criterion — any proposed exception routable using only this chapter's map — is checked directly: Section 3's map is a closed decision tree with no ambiguous branch, and a proposal that doesn't cleanly route through it is itself treated as a signal the map has a gap, addressed through Chapter 65's continuous-improvement cadence rather than resolved by an ad hoc, one-off judgment call that doesn't update the map for the next similar case.

---

## 6. BEHAVIORAL RULES

**When proposing any exception, revision, or new chapter.** Section 3's map is consulted first, and the proposal is routed accordingly — never brought informally to whoever seems most available or most senior.

**When a disagreement arises about how this Constitution applies.** Gov-2's documentation requirement is satisfied first — the disagreement is written down, run through Chapter 1 §4's derivation test, before any escalation.

**When Chapter 1's seven principles are proposed for amendment.** Gov-5's unanimous-consent bar applies without exception, regardless of how urgent or well-reasoned the proposed change seems.

---

## 7. DO / DON'T

**Do** consult Section 3's decision-rights map before raising any proposed exception, revision, or new chapter.

**Do** document a disagreement fully, per Gov-2, before escalating it.

**Don't** treat a decision made correctly under a since-changed standard as retroactively invalid, per Gov-3.

**Don't** attempt to amend Chapter 1's seven principles through anything less than Gov-5's full review-board consent.

---

## 8. QUALITY ASSURANCE CHECKLIST

- [ ] Was Section 3's decision-rights map consulted, and did the proposal route through exactly one clear path?
- [ ] Is any escalated disagreement documented per Gov-2, with Chapter 1 §4's derivation test already run?
- [ ] Does the proposal's approval requirement match its actual blast radius, per Gov-4?
- [ ] If this proposal touches Chapter 1's seven principles, has full review-board unanimous consent been obtained, per Gov-5?

---

## 9. CROSS REFERENCES

**Within this Constitution:** Chapter 1 (IP3, IP7, §4's derivation test, and the seven principles Gov-5 protects). Chapter 29 §2, Chapter 52 §2 (existing Gov-4 instances). Chapter 62 §6 (Gov-3 instance). Chapter 65 (continuous-improvement cadence closing Section 5's loop). Chapter 66 (debt register recording Section 3's logged exceptions).

**Within the five documents above this Constitution:** Design System Bible Chapter 65 (in full).

---

## 10. FUTURE EXPANSION

**Documented limitations.** Section 4's boundary against the five documents above this Constitution assumes those documents' own governance chapters are themselves complete and reachable; where one of them is not yet written (as several currently are not), a proposal that would require their input is held pending rather than decided unilaterally within this chapter's own, narrower authority.

---

*End of Chapter 64. The next chapter, Continuous Improvement Workflow, specifies the recurring cadence by which this Constitution is checked against reality and revised through the mechanism this chapter just established.*
