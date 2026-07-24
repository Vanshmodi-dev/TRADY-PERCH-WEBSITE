# CHAPTER 30 — AI AGENT BRIEFING STANDARD

**Trady Perch Product Implementation Constitution · Part VI: AI Implementation Workflow**

**Inherited From:** Design System Bible Chapter 71 (Designing AI-Native Interfaces); Brand Identity Manual Chapter 105 (AI-Native Brand Consistency — a structural parallel for briefing an external AI system, applied here to briefing an internal one). Chapter 29 (AI Implementation Philosophy) and Chapters 7–8 (Repository & Folder Structure) are this chapter's direct premises.

---

## 1. INTRODUCTION

Chapter 4 established that a chapter or task must be self-contained enough for an agent with zero prior context to execute it correctly. This chapter is where that requirement becomes a literal, mandatory template — the fixed set of fields every task briefing must include before it is handed to an AI agent, so that "done" is never a matter of the agent guessing what was meant.

---

## 2. THE MANDATORY BRIEFING FIELDS

Every task briefing includes, in this order, with no field left implicit:

1. **Objective** — the specific, concrete outcome, stated as a checkable fact per Chapter 29's Factor 1, never as a vague aspiration.
2. **Governing chapters** — every chapter of this Constitution the task must comply with, cited explicitly per Chapter 1's IP1, so the agent knows exactly which standards apply without having to search for them.
3. **Relevant files** — the specific files and folders, per Chapter 7 and Chapter 8's structure, the agent needs to read before starting, named explicitly rather than left to be discovered by exploration alone.
4. **Acceptance criteria** — the literal test, lint rule, or specific, observable condition that determines completion, per Chapter 29's Factor 1 requirement made concrete.
5. **Explicit non-goals** — what the task deliberately does not include, stated as plainly as what it does, preventing scope creep in either direction and giving the agent a clear boundary per Chapter 1's IP3.
6. **Delegation classification** — the Chapter 29 §3 category this task was classified into, and the three-factor reasoning behind it, so the agent (and any later reviewer) can verify the classification was correct without re-deriving it from scratch.

A briefing missing any of these six fields is incomplete, per this chapter's own definition, and is not handed to an agent until completed — the direct mechanism preventing exactly the kind of implicit, context-dependent task assignment Chapter 4 already forbids.

---

## 3. WHY EVERY FIELD IS MANDATORY, NOT OPTIONAL

A briefing that omits "explicit non-goals" because the objective "seems obviously scoped enough" is the single most common source of scope drift — an agent, acting reasonably on an underspecified brief, extends the work in a direction that seemed like a natural continuation of the objective but wasn't actually intended. Similarly, a briefing that omits "governing chapters" forces the agent to guess which standards apply, and a guess, however well-informed, is not the same claim as a citation — exactly the distinction Chapter 1's IP1 draws between a decision with a stated origin and a plausible-sounding rationalization.

---

## 4. THE REPRODUCIBILITY TEST

This chapter's own success criterion — two different agents, given the same briefing, produce implementations that pass the same acceptance criteria — is the practical test every briefing is checked against before use. A briefing that would plausibly produce two meaningfully different, both-defensible implementations from two different agents has not actually specified the objective and acceptance criteria (fields 1 and 4) with enough precision, and is revised until it passes this test, rather than handed off and left to chance which interpretation a given agent happens to land on.

---

## 5. BRIEFING FOR EACH DELEGATION CATEGORY

**Full AI delegation** briefings are complete against all six fields before work begins, per Section 2.

**AI-drafted, human-decided** briefings additionally state explicitly, in the objective field, that the deliverable is a proposal or draft ADR per Chapter 62 — not a final implementation — so the agent does not proceed past the boundary Chapter 29 §3 sets for this category.

**Human-initiated, AI-executed** briefings begin as a dialogue converting a vague request into a complete Section 2 briefing before any implementation work starts; the resulting complete briefing is what actually gets executed, and the original vague request is not treated as sufficient on its own.

---

## 6. ENFORCEMENT & MEASUREMENT

A briefing-completeness check, run before any task is handed to an agent, verifies all six of Section 2's fields are present and non-empty — a structural, mechanical check catching an omitted field immediately. The reproducibility test from Section 4 is harder to fully automate, and is checked empirically per Chapter 32's self-review data: a pattern of two agents producing meaningfully divergent results from nominally the same briefing is tracked as a signal that briefing template, or that class of task's briefing practice, needs revision.

---

## 7. BEHAVIORAL RULES

**Before assigning any task.** Section 2's six fields are completed in full — an agent is never hand ed a task with any field left to inference.

**When a briefing's objective is discovered to be ambiguous mid-task.** The agent stops and escalates per Chapter 33, rather than picking the interpretation that seems most reasonable and proceeding — Chapter 4's self-containment standard places the burden of clarity on the briefing, not on the agent's ability to guess well.

**When the same briefing is reused for a similar, recurring task.** It is treated as a template candidate — if the same six fields recur nearly unchanged across several tasks, that pattern is worth formalizing as a reusable briefing template, reducing the cost of writing field 2 and field 3 for the next instance.

---

## 8. DO / DON'T

**Do** complete all six of Section 2's fields explicitly, even when the task feels obvious enough that some fields seem redundant.

**Do** run the Section 4 reproducibility test mentally before handing off a briefing — would a different, equally competent agent land on the same result?

**Don't** hand off a briefing with an implicit non-goal, assuming the agent will infer the intended scope boundary correctly.

**Don't** treat a vague request as directly delegable — convert it to a complete briefing first, per Section 5's third category.

---

## 9. QUALITY ASSURANCE CHECKLIST

- [ ] Does the briefing include all six of Section 2's mandatory fields, none left implicit?
- [ ] Does the objective and acceptance-criteria pair pass the Section 4 reproducibility test?
- [ ] Does the briefing cite its Chapter 29 delegation classification and the reasoning behind it?
- [ ] For an "AI-drafted, human-decided" task, does the objective explicitly state the deliverable is a proposal, not a final implementation?

---

## 10. CROSS REFERENCES

**Within this Constitution:** Chapter 1 (IP1, IP3). Chapter 4 (the self-containment standard this chapter's template mechanically enforces). Chapter 7–8 (the structure Field 3 references). Chapter 29 (the delegation classification Field 6 records). Chapter 32 (AI Self-Review Process, consuming Section 6's reproducibility data). Chapter 33 (Human-AI Collaboration Model, the escalation path for Section 7). Chapter 62 (ADR Standard, referenced by "AI-drafted, human-decided" briefings).

**Within the five documents above this Constitution:** Design System Bible Chapter 71; Brand Identity Manual Chapter 105.

---

## 11. FUTURE EXPANSION

**Possible future additions.** A library of reusable briefing templates for recurring task classes (a new component, a new API endpoint), built once Section 7's "template candidate" signal accumulates enough repeated instances to justify formalizing, per Chapter 1's IP3.

---

*End of Chapter 30. The next chapter, AI Code Generation Guardrails, specifies the hard, enumerated stops on what an agent may never do even within a correctly scoped briefing.*
