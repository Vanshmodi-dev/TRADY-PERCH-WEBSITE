# CHAPTER 4 — THE AI-BUILT PRODUCT DOCTRINE

**Trady Perch Product Implementation Constitution · Part I: Implementation Philosophy**

**Inherited From:** Design System Bible Chapter 71 (Designing AI-Native Interfaces); UX / Experience Blueprint Chapter 68 (AI Experience Philosophy). This chapter is Chapter 1's IP5 (Self-Contained Context), extended from a single decision to the operating model of the entire engineering organization.

---

## 1. INTRODUCTION

This chapter states a fact about how Trady Perch is built, and derives from that fact a standard every chapter after it must meet. The fact: this product is substantially built and maintained by AI coding agents, working from this Constitution and the five documents above it, session to session, with no persistent memory of any prior conversation unless it is written down somewhere they can read it again. The derived standard: every chapter of this Constitution must be written as though its only reader has never spoken to anyone about this product before, because, in a very literal and recurring sense, that is exactly who its reader usually is.

This is not a chapter about tooling — which agent framework, which prompting convention — that is Chapter 34's job. This is the chapter that states why the tooling matters at all, and what it changes about how every other chapter in this Constitution must be authored, reviewed, and maintained.

---

## 2. THE DOCTRINE, STATED PLAINLY

An AI coding agent assigned a task in this codebase begins that task, in the overwhelming majority of cases, with no memory of any conversation that produced this Constitution, no memory of why a given pattern was chosen, and no ability to ask a clarifying question of the person who wrote the chapter it's reading — only the ability to ask a clarifying question of whoever is present in the current session, who may know less about the historical reasoning than the chapter itself should already contain. This is not a limitation to be worked around. It is the standing condition this entire Constitution is written under, and every chapter's quality is measured against it directly.

Three consequences follow, each restated from Chapter 1 at the scale this chapter governs rather than at the scale of a single decision.

**Machine-checkable over merely well-intentioned (IP2).** A standard an agent is supposed to "use good judgment" about is a standard that will be applied inconsistently across sessions, because "good judgment" without a stated criterion is reconstructed fresh, differently, each time. Where a judgment call is genuinely unavoidable, this Constitution says so explicitly (Chapter 51 names architectural fit as one such case) rather than pretending every decision is mechanical when it isn't.

**Explicit over assumed (IP4).** A convention that "everyone knows" is a convention only the humans who were in the room when it was decided actually know. An agent beginning cold has no access to what "everyone knows" — only to what is written.

**Self-contained over context-dependent (IP5).** A chapter that reads correctly only in light of a conversation that produced it has failed the one test that matters most for a document meant to outlive that conversation. This is restated here as the load-bearing consequence of this entire chapter, because it is the property every other chapter in this Constitution is checked against before it is considered finished.

---

## 3. WHAT THIS CHANGES ABOUT HOW CHAPTERS ARE WRITTEN

**No forward references to unwritten context.** A chapter may not assume the reader has seen a Slack conversation, a design review, or an earlier draft that isn't itself cited as a written artifact this Constitution or its upstream documents contain.

**No unstated defaults.** Where a decision could reasonably go more than one way, the chapter states which way it goes and why — "the obvious choice" is not a citation, per Chapter 3's translation procedure.

**No silent reliance on a specific tool's current behavior.** A chapter may describe what a category of tool must do (per Chapter 34's scope boundary, which deliberately avoids pinning a specific AI vendor); it may not assume a specific tool's idiosyncratic current behavior will still hold by the time an agent reads it.

**Every acceptance criterion is stated, not implied.** Chapter 30's AI Agent Briefing Standard formalizes this fully; this chapter establishes why it is non-negotiable — an agent cannot infer "done" from tone or context the way an experienced human collaborator sometimes can.

---

## 4. THE DELEGATION BOUNDARY

Not every kind of work is safely delegated to an AI agent operating from written context alone, and this chapter draws the line Chapter 29 (AI Implementation Philosophy) will later apply in operational detail.

**Safe for full delegation, given a correctly written chapter:** implementation work with a clear, checkable acceptance criterion — a component built to Chapter 12's template, a test suite built to Chapter 47's pyramid, a bug fix with a reproducible failing test.

**Requires a human decision first:** anything Chapter 62 would require an Architecture Decision Record for — a foundational technology choice, a change to Chapter 2's surface architecture, a trade-off between two of Chapter 1's principles that Section 4 of that chapter's own derivation test cannot resolve without new information a written chapter doesn't yet contain.

This boundary is not a statement of distrust in AI-authored work — Chapter 32's Self-Review Process and Chapter 53's reconciliation standard exist specifically because AI-authored work is held to the same bar as human-authored work, not a lower one. It is a statement about which kinds of decisions are, by their nature, under-specified by any document written in advance of the specific situation, regardless of who or what is executing them.

---

## 5. ENFORCEMENT & MEASUREMENT

The empirical test this chapter establishes, and which Chapter 1 §5 already previews: a fresh AI agent, given only a chapter's text and the files it references, either can or cannot complete the task the chapter describes without escalating for missing context. A rising rate of escalation on a given chapter is the direct, measurable signal that chapter has failed this doctrine — tracked per Chapter 32's self-review data and fed back into Chapter 65's continuous-improvement cadence.

---

## 6. BEHAVIORAL RULES

**When writing any new chapter.** The author — human or AI — runs the empirical test in Section 5 against a draft before it is considered complete, not only after a defect is reported.

**When an agent hits missing context.** The correct response is to escalate and, per Chapter 66, log the gap as debt against the specific chapter that should have contained it — not to guess plausibly and proceed silently, which manufactures exactly the kind of unrecorded tribal knowledge this chapter exists to prevent.

**When onboarding a new AI tool or framework.** The doctrine does not change; only Chapter 34's tooling specifics do. A new tool inherits the same standard every previous one was held to.

---

## 7. DO / DON'T

**Do** write every chapter assuming its reader has never seen this conversation, this repository's history, or any prior draft.

**Do** treat an agent's escalation for missing context as a signal about the chapter, not a shortcoming of the agent.

**Don't** write "as discussed" or "as previously established" without a specific citation to where it was established — Chapter 1's IP1 already forbids this at the level of a single decision; this chapter forbids it at the level of an entire chapter's framing.

**Don't** treat this doctrine as unique to AI agents. A human contributor returning after a long absence needs the same property; this chapter simply makes the requirement impossible to quietly ignore.

---

## 8. ANTI-PATTERNS

**The tribal-knowledge chapter.** A chapter that is technically complete but written in a shorthand only fully legible to whoever wrote it, relying on unstated context to fill the gaps. This is dangerous because it passes review by anyone who already has that context, and fails silently — as an escalation, not an error — for anyone who doesn't, meaning the defect is only discovered by the exact reader least equipped to fix it themselves. It is detected by Section 5's empirical test, run by someone who was not involved in writing the chapter. It is fixed by rewriting the gaps explicitly, not by verbally explaining them to the one agent that got stuck.

---

## 9. QUALITY ASSURANCE CHECKLIST

- [ ] Could an AI agent with zero memory of this conversation execute this chapter's instructions without escalating for missing context? *(IP5)*
- [ ] Does every acceptance criterion appear explicitly in the text, rather than being implied by tone or precedent?
- [ ] Are all forward references pointing to written, citable artifacts rather than unrecorded conversations?
- [ ] Is the delegation boundary from Section 4 respected — is this task actually safe for full AI delegation, or does it require a human decision first?

---

## 10. CROSS REFERENCES

**Within this Constitution:** Chapter 1 (IP2, IP4, IP5 — this chapter's direct source). Chapter 29 (AI Implementation Philosophy) operationalizes Section 4's delegation boundary. Chapter 30 (AI Agent Briefing Standard) formalizes Section 3's acceptance-criterion requirement. Chapter 32 (AI Self-Review Process) and Chapter 53 (AI-Output Review Reconciliation Standard) are the mechanisms that hold AI-authored work to the same bar as human-authored work. Chapter 62 names the decisions Section 4 reserves for humans. Chapter 65 closes the loop on Section 5's measurement.

**Within the five documents above this Constitution:** Design System Bible Chapter 71; UX / Experience Blueprint Chapter 68.

---

## 11. FUTURE EXPANSION

**Documented assumptions.** This doctrine assumes AI agents remain the primary implementers of routine work for the foreseeable operating horizon of this Constitution. Should that balance shift substantially toward human-only implementation, this chapter's standard would not be relaxed — the self-containment property it demands benefits any reader starting cold, human or AI — but its framing would merit revisiting to state the case in terms that don't read as AI-specific to a mostly-human team.

---

*End of Chapter 4. The next chapter, Anti-Philosophy, is this Part's deliberate inverse — a taxonomy of what happens when Chapters 1–4 are quietly abandoned.*
