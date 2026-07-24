# CHAPTER 54 — REVIEW CHECKLIST & RUBRIC

**Trady Perch Product Implementation Constitution · Part XI: Code Review & Collaboration Standards**

**Inherited From:** Design System Bible Chapter 61 (Design QA Standards & Checklists). Chapter 50 (Definition of Done), Chapter 52 (Human Code Review Standard), and Chapter 53 (AI-Output Review Reconciliation Standard) are this chapter's direct premises — this chapter consolidates them into one applied, per-pull-request artifact.

---

## 1. INTRODUCTION

Chapters 50 through 53 each specify part of what a review covers. This chapter is the single literal checklist a reviewer — human or AI — actually works through on a real pull request, so that "was this properly reviewed" is answered by pointing at a completed, visible checklist rather than reconstructed after the fact from memory or from a bare approval click.

---

## 2. THE CHECKLIST

For every pull request, in order:

- [ ] **Gates.** Chapter 49 §2's full sequence shows a passing status. *(mechanical — verify presence, don't re-check substance, per Chapter 51 §3)*
- [ ] **Definition of Done.** Chapter 50 §2's closed list is worked through, with every item marked true, false, or explicitly not applicable.
- [ ] **Architectural fit.** Per Chapter 51 §4 — does this change belong where it's placed, per Chapters 2, 6, and 8?
- [ ] **Genuine intent.** Per Chapter 51 §5 — does this change actually satisfy its stated brief or objective, not a drifted adjacent version of it?
- [ ] **Systemic coupling.** Per Chapter 51 §6 — does this change introduce a coupling that will complicate some future, currently unplanned change?
- [ ] **If AI-authored:** Chapter 53 §2–§4's trust boundary applied — mechanical self-review findings trusted, judgment-dependent territories independently verified.
- [ ] **If a self-review gap is found:** Chapter 53 §6's log created, specific enough to identify the originating Chapter 32 step.
- [ ] **Evidence left.** Per Chapter 52 §5 — the review thread shows visible, substantive engagement, not a bare, instant approval.

---

## 3. HOW THIS CHECKLIST IS USED, NOT MERELY REFERENCED

Per Design System Bible Qa-1, this checklist synthesizes Chapters 50 through 53 — it does not replace reading them, and a reviewer relying on this chapter's compressed wording alone, without the fuller reasoning each cited chapter provides, risks exactly the kind of literal-compliance-without-substance failure Chapter 31 §7 already warns against for guardrails specifically. The checklist is the *tracked artifact*; the cited chapters are the *actual standard*.

---

## 4. ENFORCEMENT & MEASUREMENT

This chapter's own success criterion — every merged pull request has this checklist's items visibly addressed — is enforced by requiring the checklist itself (or an equivalent, automatically generated report covering the same items) to be attached to, or checked off within, every pull request before merge, mirroring Chapter 32 §5's self-review-report requirement structurally. A merged pull request with no corresponding completed checklist is treated as a Chapter 49 gate failure after the fact, logged per Chapter 66, even though the code itself may be correct — because the *process* failed to leave the evidence this chapter and Chapter 52 §5 both require.

---

## 5. BEHAVIORAL RULES

**Before approving any pull request.** This chapter's checklist is worked through explicitly, in the order given, with each item's status visible in the review thread or an equivalent report.

**When an item is not applicable.** It is marked so explicitly, per Chapter 50 §6's same standard — never silently omitted.

**When this checklist itself seems to be missing something a specific pull request needs checked.** That gap is raised through Chapter 64's governance process to potentially extend this chapter, per Chapter 50 §3's same closed-list discipline — not worked around informally for one specific case.

---

## 6. DO / DON'T

**Do** work through this checklist explicitly and visibly for every pull request, in order.

**Do** mark a not-applicable item explicitly rather than omitting it silently.

**Don't** treat this checklist as a replacement for reading the fuller chapters it synthesizes.

**Don't** merge a pull request with no completed checklist or equivalent report attached.

---

## 7. QUALITY ASSURANCE CHECKLIST

*(This chapter's own meta-check, since Section 2 is already the applied checklist.)*

- [ ] Is Section 2's checklist visibly completed for this pull request, in the review thread or an equivalent report?
- [ ] Was every item marked true, false, or explicitly not applicable, with none silently omitted?
- [ ] Does this checklist's use reflect actual engagement with the cited chapters, not compressed-wording-only compliance?

---

## 8. CROSS REFERENCES

**Within this Constitution:** Chapter 2, Chapter 6, Chapter 8 (architectural fit). Chapter 31 §7 (the literal-compliance risk Section 3 names). Chapter 32 §5 (the self-review-report requirement Section 4 mirrors). Chapter 49 (the gate sequence Section 2's first item verifies). Chapter 50 (the Definition of Done Section 2's second item applies). Chapter 51 (the three territories Section 2 draws from directly). Chapter 52 §5, Chapter 53 (the human and AI-reconciliation procedures this checklist operationalizes). Chapter 64 (governance for extending this closed checklist). Chapter 66 (debt-register logging for a missing checklist, per Section 4).

**Within the five documents above this Constitution:** Design System Bible Chapter 61.

---

## 9. FUTURE EXPANSION

**Possible future additions.** An automatically generated version of this checklist, populated directly from Chapter 49's gate statuses and Chapter 32's self-review report, reducing manual transcription — a plausible near-term tooling investment given how directly this chapter's own success criterion depends on the checklist actually being completed, not merely available.

---

*End of Chapter 54, and of Part XI. Part XII, CI/CD & Deployment, is where reviewed, gate-passing code safely becomes a running product.*
