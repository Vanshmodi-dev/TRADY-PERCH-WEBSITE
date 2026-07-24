# CHAPTER 53 — AI-OUTPUT REVIEW RECONCILIATION STANDARD

**Trady Perch Product Implementation Constitution · Part XI: Code Review & Collaboration Standards**

**Inherited From:** Design System Bible Chapter 71 (Designing AI-Native Interfaces). Chapter 32 (AI Self-Review Process) and Chapter 52 (Human Code Review Standard) are this chapter's direct premises — this chapter is the human-side half of the loop Chapter 32 begins.

---

## 1. INTRODUCTION

An AI agent's work arrives at human review already self-reviewed per Chapter 32 — a self-review report exists, stating what was checked and how. This chapter specifies what a human reviewer does with that report: what can be trusted from it directly, what must be independently re-verified regardless of what the report claims, and how a disagreement between the agent's self-assessment and the human's own judgment is resolved. Chapter 53's own success criterion — a declining rate of defects the self-review process should have caught — depends on this chapter's reconciliation loop actually feeding back into Chapter 32, not merely catching the same class of gap repeatedly without correcting its source.

---

## 2. WHAT THE SELF-REVIEW REPORT ESTABLISHES

The self-review report, per Chapter 32 §2, states which of its six steps were run and what each one found. A human reviewer treats a completed step's *mechanical* findings as reliable — if the report states the full test suite ran and passed, the reviewer does not need to independently re-run every test locally to confirm this, per Chapter 51 §3's redundancy warning applied here directly, exactly as a human reviewer doesn't re-check a gate Chapter 49 already passed.

---

## 3. WHAT THE HUMAN REVIEWER INDEPENDENTLY VERIFIES

What the self-review report cannot fully establish on its own — because Chapter 32 §2 Step 1's re-read is performed by the same agent that wrote the code, subject to the confirmation-bias risk Chapter 32 §8 already names — is exactly Chapter 51's three territories: architectural fit, genuine intent, and systemic coupling. A human reviewer's independent judgment on these three is never replaced by the agent's own self-assessment, regardless of how thorough that self-assessment claims to be, because an agent checking its own work against its own understanding of the brief cannot, by the nature of the check, catch a case where that understanding itself drifted — only a reader coming to the brief fresh can.

---

## 4. THE TRUST BOUNDARY, STATED PRECISELY

**Trusted from the self-review report:** mechanical facts — test results, lint status, which chapters were checked against Chapter 32 §2 Step 5. **Independently verified regardless of the report:** Chapter 51's three judgment-dependent territories, and Chapter 31's guardrail intent-check (per Chapter 31 §7's "plausible-sounding workaround" anti-pattern, which a self-review checking only literal guardrail text would miss exactly as an agent's own self-review might). This boundary is the direct, specific answer to this chapter's own framing question, and it is the same boundary, restated for a human evaluating an agent's report, that Chapter 46 §5 already draws between mechanically-checkable and judgment-dependent testing criteria.

---

## 5. RESOLVING DISAGREEMENT

When a human reviewer's judgment on one of Section 3's territories differs from what the agent's self-review report concluded, the human reviewer's judgment holds for the specific pull request — per Chapter 33 §6's ownership model, this is squarely human-owned territory. But per this chapter's own success criterion, the disagreement is not only resolved for this one instance — it is recorded and fed back into Chapter 32's own checklist per Section 6, so the same gap is less likely to recur on the next AI-authored change of a similar kind.

---

## 6. THE FEEDBACK LOOP

Every instance where human review catches a defect that Chapter 32's self-review process should have caught — a genuine architectural-fit miss, a guardrail workaround, a drifted-intent implementation — is logged with enough specificity to identify which of Chapter 32 §2's six steps should have caught it and didn't. This log is the direct input to Chapter 65's continuous-improvement cadence, which periodically reviews the accumulated pattern and revises Chapter 32's own checklist to close the specific, recurring gap — the concrete mechanism behind this chapter's own success criterion, and the reason this chapter's title is "reconciliation" rather than merely "review": the loop closes back into the process that should have caught the issue upstream, not only into the individual pull request downstream.

---

## 7. ENFORCEMENT & MEASUREMENT

Section 6's log is a required artifact of any human review that identifies a self-review gap — not an optional note left at a reviewer's discretion. Chapter 65's cadence tracks the rate of such logged instances over time per Chapter type of task, and this chapter's own success criterion — a declining rate — is measured directly from this data, distinguishing a genuinely declining rate (the feedback loop working) from a merely fluctuating one (insufficient data, or a loop that isn't actually closing).

---

## 8. BEHAVIORAL RULES

**When reviewing AI-authored work.** Section 2's mechanical trust and Section 3's independent verification are both applied explicitly — a reviewer neither re-checks what the self-review report already mechanically established, nor skips the judgment-dependent territories merely because a report exists claiming they were checked.

**When a self-review gap is found.** Section 6's log is created immediately, as part of the same review, specific enough to identify the originating Chapter 32 step — never deferred to "mention it sometime," which per Chapter 5 §2 risks becoming an undocumented, unaddressed pattern.

**When the same category of gap recurs after Chapter 65 has already revised Chapter 32's checklist once.** This is treated as a signal the revision itself was insufficient, and Chapter 65's next cadence cycle addresses it again, more specifically — not as evidence the feedback loop doesn't work.

---

## 9. DO / DON'T

**Do** trust the self-review report's mechanical findings without redundant manual re-verification, per Section 2.

**Do** independently verify Chapter 51's three judgment-dependent territories regardless of what the self-review report claims, per Section 3.

**Don't** treat a thorough-looking self-review report as a substitute for a human reviewer's own architectural-fit and intent judgment.

**Don't** resolve a self-review gap only for the current pull request without logging it per Section 6 for Chapter 32's feedback loop.

---

## 10. QUALITY ASSURANCE CHECKLIST

- [ ] Were the self-review report's mechanical findings trusted without redundant re-verification, per Section 2?
- [ ] Were Chapter 51's three judgment-dependent territories independently checked regardless of the report's claims, per Section 3?
- [ ] Is any found self-review gap logged per Section 6, specific enough to identify the originating Chapter 32 step?
- [ ] Does Chapter 65's tracked rate of logged gaps show a declining trend over time, per this chapter's own success criterion?

---

## 11. CROSS REFERENCES

**Within this Constitution:** Chapter 5 §2 (F2, the deferral risk behind Section 8). Chapter 31 §7 (the guardrail-intent check behind Section 4). Chapter 32 (the self-review process this chapter's human side completes). Chapter 33 §6 (ownership model behind Section 5). Chapter 46 §5 (the mechanical-versus-judgment boundary mirrored in Section 4). Chapter 51 (the three territories this chapter applies to AI-authored work specifically). Chapter 52 (the general human-review procedure this chapter specializes). Chapter 65 (the continuous-improvement cadence closing Section 6's loop).

**Within the five documents above this Constitution:** Design System Bible Chapter 71.

---

## 12. FUTURE EXPANSION

**Documented limitations.** Section 7's measurement depends on consistent, disciplined logging per Section 6; an incomplete logging habit would understate the true gap rate rather than overstate it, a specific, named risk this chapter flags rather than assumes away.

---

*End of Chapter 53. The next chapter, Review Checklist & Rubric, consolidates Chapters 50–53 into the single, literal checklist a reviewer actually works through per pull request.*
