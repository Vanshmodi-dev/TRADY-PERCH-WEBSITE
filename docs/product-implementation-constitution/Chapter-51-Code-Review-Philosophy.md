# CHAPTER 51 — CODE REVIEW PHILOSOPHY

**Trady Perch Product Implementation Constitution · Part XI: Code Review & Collaboration Standards**

**Inherited From:** Design System Bible Chapter 65 (Governance Model & Decision Rights). Chapter 49 (Quality Gates Standard) is this chapter's direct premise — specifically Gate 6, where review sits in that chapter's sequence.

---

## 1. INTRODUCTION

Chapter 49 §3 placed review last in the gate sequence deliberately, so a reviewer's attention is spent only on what remains after every mechanical gate has already passed. This chapter specifies what that remaining territory actually is: the things review exists to catch that no automated gate, by its structural nature, ever could — architectural fit, actual intent versus stated intent, and coupling that only becomes visible when a change is considered against the rest of the system rather than in isolation.

---

## 2. WHAT AN AUTOMATED GATE CANNOT SEE

A gate checks a change against a fixed, explicit rule: does this pass the accessibility suite, does this stay within budget, does this satisfy the schema. What no gate in Chapter 49 §2 can check is whether a change, despite passing every explicit rule, is actually the *right* change — whether it fits the architecture Chapter 2 and Chapter 6 establish, whether it solves the problem the task actually needed solved rather than a plausible-looking adjacent one, and whether it introduces a coupling between two parts of the system that will make a future, unrelated change harder than it should be. These three categories — architectural fit, genuine intent, and systemic coupling — are review's actual territory, and this chapter's job is naming them explicitly so a reviewer's attention goes there rather than re-checking what Chapter 49's gates already covered.

---

## 3. THE REDUNDANCY PROBLEM

A reviewer who re-checks accessibility, performance, or lint compliance manually — the exact things Chapter 49 §2's gates already verified mechanically before review was ever reached — is not adding safety, they are duplicating a machine's work less reliably and spending attention that Section 2's actual review territory needed instead. This chapter's own success criterion depends on a reviewer being able to distinguish the two categories cleanly: a comment re-litigating something a passing gate already settled is, by this chapter's own definition, a low-value comment, and a reviewer citing this chapter directly can decline to engage with it as a review blocker.

---

## 4. ARCHITECTURAL FIT

Does this change belong where it's placed, per Chapter 2's surface diagram and Chapter 6's package tiering — not merely does it work, but does it live in the right place, at the right layer, per the structure Parts II and III already establish? A change that works correctly but violates Chapter 8's feature-folder boundaries, or Chapter 22 §4's global-state threshold, is exactly the kind of defect no automated gate checks for directly (short of the specific structural linters those chapters name) and exactly what a reviewer's architectural judgment is for.

---

## 5. GENUINE INTENT

Does this change actually solve what Chapter 30's briefing (for AI-authored work) or the task's own stated objective (for human-authored work) asked for — not a plausible-looking, technically-passing adjacent solution that quietly narrowed or drifted from the original ask, per Chapter 31's G7 guardrail and Chapter 32 §3's brief-against-diff re-read. A reviewer checks the change against the *stated* objective directly, not against their own reconstruction of what the objective probably was.

---

## 6. SYSTEMIC COUPLING

Does this change introduce a dependency, a shared assumption, or a coupling between two parts of the system that will make some future, currently unplanned change more difficult — a Chapter 6 §3 package-boundary violation not yet caught by tooling, a Chapter 21 state category miscategorized in a way that only becomes a problem once a second feature needs the same value. This is the category most dependent on a reviewer's broader, whole-system view, since it is specifically about consequences outside the change's own immediate, visible scope.

---

## 7. ENFORCEMENT & MEASUREMENT

This chapter's own success criterion is checked, per Chapter 65's continuous-improvement cadence, by sampling review threads and flagging comments that re-litigate an already-passing gate — a recurring pattern of this kind of comment is treated as a signal that reviewers need clearer guidance distinguishing Section 2's categories from Chapter 49's gates, not merely an individual reviewer's habit to correct in isolation.

---

## 8. BEHAVIORAL RULES

**Before raising a review comment.** It is checked against Section 2's three categories — if it doesn't fit architectural fit, genuine intent, or systemic coupling, and it isn't a novel concern no existing gate covers, it's likely re-litigating an already-passed gate, per Section 3.

**When a reviewer disagrees with a passing gate's own standard** (believing, for instance, that a Chapter 36 budget is set wrong for this specific case). This is not raised as an ordinary review comment — it is routed through Chapter 64's governance process to revise the standard itself, keeping the distinction between "this change violates a standard" and "this standard itself needs revising" clean.

**When review surfaces a genuine architectural-fit or coupling concern.** It is addressed before merge, with the same blocking weight Chapter 49's gates carry — Section 2's territory is not lower-priority than a gate's territory merely because it depends on judgment rather than automation.

---

## 9. DO / DON'T

**Do** focus review attention on architectural fit, genuine intent, and systemic coupling, per Section 2.

**Do** decline to treat a comment re-litigating an already-passing gate as a valid review blocker, citing this chapter directly.

**Don't** manually re-check something Chapter 49's gates already verified mechanically.

**Don't** raise a disagreement with a standard's own value as an ordinary review comment — route it through Chapter 64 instead.

---

## 10. QUALITY ASSURANCE CHECKLIST

- [ ] Does this review comment address architectural fit, genuine intent, or systemic coupling, rather than re-litigating a passing gate?
- [ ] Was the change checked against its actual stated objective, not the reviewer's own reconstruction of it?
- [ ] Was any disagreement with a standard's own value routed through Chapter 64 rather than raised as an ordinary blocking comment?

---

## 11. CROSS REFERENCES

**Within this Constitution:** Chapter 2, Chapter 6 (architectural structure behind Section 4). Chapter 21 §4, Chapter 22 §4 (coupling concerns behind Section 6). Chapter 30, Chapter 31 (G7), Chapter 32 §3 (intent-verification behind Section 5). Chapter 49 (the gate sequence this chapter's territory sits after). Chapter 52 (Human Code Review Standard, the concrete procedure). Chapter 53 (AI-Output Review Reconciliation, the AI-specific application). Chapter 64 (governance process for standard-level disagreement). Chapter 65 (continuous-improvement tracking of Section 7).

**Within the five documents above this Constitution:** Design System Bible Chapter 65.

---

## 12. FUTURE EXPANSION

**Documented limitations.** Section 2's three-category model may not be exhaustive as this codebase's own architecture grows in ways not yet anticipated; a fourth category is added only once Chapter 67's anti-pattern library shows a recurring class of review-worthy concern that doesn't fit the existing three.

---

*End of Chapter 51. The next chapter, Human Code Review Standard, fixes this philosophy into the concrete procedure for human-to-human review.*
