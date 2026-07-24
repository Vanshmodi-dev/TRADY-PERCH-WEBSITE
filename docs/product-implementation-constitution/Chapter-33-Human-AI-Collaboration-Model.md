# CHAPTER 33 — HUMAN-AI COLLABORATION MODEL

**Trady Perch Product Implementation Constitution · Part VI: AI Implementation Workflow**

**Inherited From:** UX / Experience Blueprint Chapter 19 (Human Model Consistency Rules) — a structural parallel for arbitration, extended here from user-facing AI consistency to internal human-AI engineering collaboration. Chapter 29 (AI Implementation Philosophy) and Chapter 32 (AI Self-Review Process) are this chapter's direct premises.

---

## 1. INTRODUCTION

Chapter 29 classified which work belongs to an AI agent and which requires a human decision. This chapter specifies how the two actually work together in practice: who owns what kind of decision on an ongoing basis, how a human cleanly interrupts or redirects a task already in progress, and — the case most likely to silently lose information if left unspecified — how context survives a handoff between a human and an agent, or between two different agents working the same codebase at different times.

---

## 2. OWNERSHIP BY DECISION TYPE

**Humans own:** anything Chapter 29 §3 classifies as "AI-drafted, human-decided" — foundational technology choices, Chapter 2 surface-architecture changes, anything requiring a Chapter 62 ADR. Humans also own final authority over this Constitution itself, per Chapter 64's governance model.

**AI agents own:** execution of anything classified "full AI delegation" per Chapter 29 §3, including the specific implementation choices within a bounded task's scope that the briefing didn't need to specify because Chapter 12, Chapter 22, or another relevant chapter's standard already determines them.

**Shared, negotiated territory:** the conversion of a vague request into a complete Chapter 30 briefing — genuinely collaborative, per Chapter 29 §3's third category, with the human providing intent and the agent providing the technical translation into checkable criteria.

This ownership split is not a statement about capability — it is a statement about where Chapter 1's IP7 reversibility concern is highest, mirroring Chapter 29's own reasoning exactly.

---

## 3. CLEAN INTERRUPTION

A human may interrupt an in-progress AI task at any time, for any reason, without needing to justify the interruption to the agent. On interruption, the agent's immediate, mandatory response is to state its current state plainly: what has been completed, what is in progress, what remains, and any decision made so far that a resuming party — human or a different agent — would need to know to continue correctly. This state statement is not optional or deferred until asked for; it is produced automatically the moment an interruption occurs, per Chapter 4's self-containment standard applied to a mid-task handoff specifically.

An interrupted task is never left in a state where the codebase itself is inconsistent — a half-applied change, a test suite intentionally left failing mid-refactor — without that state being explicitly flagged in the same state statement, so an interruption never silently leaves the repository worse off than before the task began.

---

## 4. THE HANDOFF RECORD

Every interruption, task pause, or deliberate handoff between parties produces a **handoff record** — a written artifact, not a verbal or implicit understanding — containing: the original Chapter 30 briefing, the current state per Section 3, any decision made so far with its reasoning per Chapter 1's IP1, and any open question the resuming party needs answered before continuing. This is the direct mechanism behind this chapter's own success criterion: a receiving party — human or a different AI agent with zero memory of the original session — reads the handoff record and continues without needing to re-ask a question the record already answers.

A handoff record is checked against the same reproducibility test Chapter 30 §4 applies to an original briefing: would a different, equally competent party, given only this record, continue correctly? A handoff record that fails this test is incomplete, exactly as an original briefing missing a mandatory field is incomplete.

---

## 5. TWO AGENTS, SEQUENTIAL SESSIONS

Because Chapter 4 establishes that most AI work happens session to session with no persistent memory, a "handoff" is, in practice, the normal condition between any two work sessions on the same task, not only an unusual interruption. Every task that spans more than one session produces a Section 4 handoff record at the end of each session, whether or not a human was involved in causing the pause — the record's existence does not depend on whether the next session is worked by the same agent, a different agent, or a human, because per Chapter 4 the correct default assumption is always that the next reader has no memory of this one.

---

## 6. ARBITRATION UNDER DISAGREEMENT

Per UX / Experience Blueprint Chapter 19's structural approach to arbitrating consistency questions, a disagreement between a human's stated intent and an agent's technical recommendation is resolved by the ownership split in Section 2: within AI-owned execution territory, the agent's technical judgment holds unless the human explicitly overrides it; within human-owned decision territory, the human's decision holds regardless of the agent's own recommendation, though the agent states its reasoning for the record per Chapter 1's IP1 before deferring. Neither party's judgment is assumed correct by default outside its owned territory — the territory itself, from Section 2, is what determines whose call it is.

---

## 7. ENFORCEMENT & MEASUREMENT

Section 4's handoff-record requirement is checked structurally: a task marked paused or interrupted with no corresponding handoff record fails a completeness check mirroring Chapter 30's briefing-completeness check exactly. This chapter's own success criterion — zero lost context on handoff — is measured the same way Chapter 32 §5 measures self-review quality: a resuming party needing to ask a question the handoff record should have already answered is logged, and a recurring pattern feeds back into revising this chapter's own required record fields per Chapter 65.

---

## 8. BEHAVIORAL RULES

**When a human interrupts a task.** The agent produces Section 3's state statement immediately, without needing to be asked, before responding to whatever prompted the interruption.

**When a task will span more than one session.** A Section 4 handoff record is produced at the natural end of each session, treated as a standard, expected artifact rather than an exceptional one.

**When a resuming party finds a handoff record incomplete.** The gap is treated as a defect in the record, per Section 4's reproducibility test, and is filled by reconstructing the missing context as best possible — logged as a Chapter 66 debt-register entry against this chapter's own template if the gap recurs.

---

## 9. DO / DON'T

**Do** produce a state statement immediately on any interruption, without waiting to be asked.

**Do** treat a multi-session task's end-of-session handoff record as a standard, required artifact, not an optional nicety.

**Don't** leave an interrupted task in an inconsistent codebase state without explicitly flagging it in the handoff record.

**Don't** resolve a human-agent disagreement by whichever party is more persistent — use Section 2's ownership split.

---

## 10. QUALITY ASSURANCE CHECKLIST

- [ ] Does every interruption produce an immediate state statement per Section 3?
- [ ] Does every multi-session task produce a Section 4 handoff record at each session's natural end?
- [ ] Does the handoff record pass the Section 4 reproducibility test — could a different party continue correctly from it alone?
- [ ] Was any disagreement resolved per Section 2's ownership split, with reasoning recorded per Chapter 1's IP1?
- [ ] Is the codebase left in a consistent state, or is any inconsistency explicitly flagged, on every interruption?

---

## 11. CROSS REFERENCES

**Within this Constitution:** Chapter 1 (IP1, IP7). Chapter 4 (self-containment doctrine, the basis for Section 5's default assumption). Chapter 29 (the ownership split Section 2 is built on). Chapter 30 (briefing-completeness check mirrored in Section 7). Chapter 32 (the measurement model Section 7 mirrors). Chapter 65 (Continuous Improvement Workflow, closing the loop on Section 7's data). Chapter 66 (Engineering Debt Register, for recurring handoff-record gaps).

**Within the five documents above this Constitution:** UX / Experience Blueprint Chapter 19.

---

## 12. FUTURE EXPANSION

**Documented limitations.** Section 4's handoff record is currently a manually authored artifact; automated generation of a handoff record's factual sections (files touched, tests run) directly from session activity is a plausible future tooling addition, not yet built, tracked honestly rather than assumed.

---

*End of Chapter 33. The next chapter, AI Workflow Tooling & Prompting Standards, specifies the concrete toolchain this collaboration model runs on.*
