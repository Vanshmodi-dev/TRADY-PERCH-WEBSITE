# CHAPTER 29 — AI IMPLEMENTATION PHILOSOPHY

**Trady Perch Product Implementation Constitution · Part VI: AI Implementation Workflow**

**Inherited From:** Design System Bible Chapter 71 (Designing AI-Native Interfaces); UX / Experience Blueprint Chapter 68 (AI Experience Philosophy). Chapter 4 (The AI-Built Product Doctrine) is this chapter's direct premise — this chapter operationalizes Chapter 4 §4's delegation boundary into a full, applicable decision framework.

---

## 1. INTRODUCTION

Chapter 4 stated, at a high level, that some work is safely delegated to an AI agent operating from written context alone, and some requires a human decision first. This chapter is the full decision framework behind that boundary — specific enough that a novel task can be classified against it in under a minute, per this chapter's own success criterion, rather than requiring a fresh judgment call each time a new kind of task appears.

---

## 2. THE THREE-FACTOR CLASSIFICATION

Every task is classified against three factors, each answerable from the task's own description without needing to execute any part of it first:

**Factor 1 — Does a checkable acceptance criterion exist?** Per Chapter 1's IP2, a task with a criterion a test, a lint rule, or a stated, specific outcome can verify is a fundamentally different kind of work than one whose "done" is a matter of taste or unstated judgment.

**Factor 2 — Is the decision space already bounded by an existing chapter?** A task that fits inside a pattern this Constitution already specifies — a new component per Chapter 12's template, a new endpoint per Chapter 24's contract discipline — is bounded. A task that would require inventing a new pattern this Constitution doesn't yet cover is unbounded.

**Factor 3 — Is the decision's cost of being wrong reversible, per Chapter 1's IP7?** A decision that's cheap to undo if it turns out mistaken carries a fundamentally different risk profile than one that commits the product to a hard-to-reverse path.

---

## 3. THE DELEGATION MATRIX

**Full AI delegation, no human decision required first:** Factor 1 yes, Factor 2 bounded, Factor 3 reversible. This is the large majority of routine implementation work — a component built to spec, a bug fix with a reproducible failing test, a test suite extension. Chapter 30's briefing standard governs how this work is handed off; Chapter 32's self-review is the AI agent's own quality gate before presenting it as complete.

**AI-drafted, human-decided:** Factor 1 yes, but Factor 2 unbounded or Factor 3 irreversible. The AI agent may produce a full proposal — a draft Architecture Decision Record per Chapter 62, a concrete implementation sketch — but a human makes the actual decision before it proceeds to full implementation. A new foundational dependency, a change to Chapter 2's surface architecture, and a database schema migration all fall here.

**Human-initiated, AI-executed:** Factor 1 unclear or absent, but the underlying work, once a human states the missing criterion explicitly, becomes ordinary bounded, reversible work. A vague feature request ("make the dashboard feel faster") is not directly delegable until a human or the agent, in dialogue, converts it into a checkable criterion (a specific Chapter 36 performance budget target) — at which point it re-classifies into the first category.

---

## 4. WHY REVERSIBILITY IS WEIGHTED SEPARATELY FROM BOUNDEDNESS

A task can be perfectly bounded by an existing chapter and still carry real, irreversible stakes — a Chapter 62-governed foundational technology choice is bounded by this Constitution's own ADR process, but the choice itself is exactly the kind of decision Chapter 1's IP3 already flags for more anticipatory human scrutiny. Factor 3 is kept as an independent check, not folded into Factor 2, specifically to catch this case: boundedness tells you whether a pattern exists to follow, reversibility tells you how much it costs if the pattern, once followed, turns out wrong.

---

## 5. THE RELATIONSHIP TO CHAPTER 1'S DERIVATION TEST

This chapter's three-factor classification is not a replacement for Chapter 1 §4's derivation test — it is a specific application of it, run against the question "should an AI agent execute this without a human decision first," using IP2, IP1 (via Factor 2's chapter-boundedness), and IP7 as the specific principles most load-bearing for that particular question. A task that clears this chapter's classification still, per Chapter 1's own standing rule, remains subject to every other principle during its actual execution.

---

## 6. ENFORCEMENT & MEASUREMENT

The three-factor classification is, in principle, partially mechanical: Factor 1 is checkable by whether a task's brief (per Chapter 30) names a specific test or measurable outcome; Factor 2 is checkable by whether the task cites a specific governing chapter per Chapter 3's translation discipline; Factor 3 is checkable against Chapter 62's own list of decisions requiring an ADR. A task briefing missing any of these three explicit answers fails Chapter 30's briefing-completeness check before it's ever handed to an agent.

---

## 7. BEHAVIORAL RULES

**Before assigning any task to an AI agent.** Section 2's three factors are answered explicitly, and Section 3's matrix determines the delegation category — never assumed by habit or by whoever happens to be available.

**When an agent, mid-task, discovers Factor 2 or Factor 3 was misjudged** — the task turns out to require an unbounded or irreversible decision not apparent at the outset. The agent escalates immediately per Chapter 33's collaboration model, rather than proceeding on its own judgment past the point this chapter's classification would have stopped it.

**When the same kind of task recurs frequently in the "AI-drafted, human-decided" category.** It is a signal that Chapter 1's IP3 threshold for writing a new, more specific chapter may have been met — converting an unbounded decision into a bounded one for future instances, per Chapter 1's own §16 process for adding new content.

---

## 8. DO / DON'T

**Do** answer all three of Section 2's factors explicitly before any task is delegated, using Chapter 30's briefing format to record the answers.

**Do** escalate immediately, per Chapter 33, if a task's actual scope turns out broader than its initial classification assumed.

**Don't** delegate a task with no checkable acceptance criterion (Factor 1 absent) on the assumption that "the agent will figure out what's needed" — convert it to a checkable criterion first.

**Don't** treat a bounded task (Factor 2 yes) as automatically safe for full delegation without also checking Factor 3's reversibility.

---

## 9. QUALITY ASSURANCE CHECKLIST

- [ ] Has the task been classified against all three factors from Section 2, explicitly and in writing?
- [ ] Does the delegation category from Section 3 match the task's actual classification, not merely convenience or habit?
- [ ] If Factor 2 or Factor 3 changes mid-task, was it escalated per Chapter 33 rather than resolved unilaterally?
- [ ] Does a recurring "AI-drafted, human-decided" task pattern warrant a new, more specific chapter per Chapter 1 §16?

---

## 10. CROSS REFERENCES

**Within this Constitution:** Chapter 1 (IP1, IP2, IP3, IP7 — and §4's derivation test, which this chapter specializes). Chapter 4 §4 (the delegation boundary this chapter operationalizes). Chapter 30 (AI Agent Briefing Standard, recording Section 2's answers). Chapter 32 (AI Self-Review Process, the quality gate for fully delegated work). Chapter 33 (Human-AI Collaboration Model, the escalation path). Chapter 62 (Architecture Decision Record Standard, the source of Factor 3's irreversibility list).

**Within the five documents above this Constitution:** Design System Bible Chapter 71; UX / Experience Blueprint Chapter 68.

---

## 11. FUTURE EXPANSION

**Documented limitations.** Section 6's "partially mechanical" checks currently require a human or AI reviewer to confirm a task briefing's answers are substantively correct, not merely present — full automation of factor-classification accuracy remains an open tooling gap, tracked honestly in Chapter 66 rather than claimed as solved.

---

*End of Chapter 29. The next chapter, AI Agent Briefing Standard, specifies the required structure of any task handed to an AI agent under this chapter's delegation framework.*
