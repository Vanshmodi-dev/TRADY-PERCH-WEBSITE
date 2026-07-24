# CHAPTER 34 — AI WORKFLOW TOOLING & PROMPTING STANDARDS

**Trady Perch Product Implementation Constitution · Part VI: AI Implementation Workflow**

**Inherited From:** No direct upstream citation — this chapter is the most purely operational in this Constitution, cited only by the chapters within this Part it supports. Chapter 30 (AI Agent Briefing Standard) and Chapter 33 (Human-AI Collaboration Model) are this chapter's direct premises.

---

## 1. INTRODUCTION

Parts I through VI specify what an AI agent must do and how it must be briefed. This chapter specifies the concrete toolchain that work runs on — deliberately kept separate from any specific AI vendor or model version, per this chapter's own scope boundary, because a model version changes faster than this Constitution should, and pinning one here would make this chapter stale on a timeline shorter than the rest of the document's.

---

## 2. WHAT THIS CHAPTER FIXES, AND WHAT IT DEFERS

This chapter fixes: the required *properties* any AI coding tool used on this codebase must have, and the prompting conventions this Constitution's own chapters (particularly Chapter 30's briefing format) assume. This chapter defers: the specific product or vendor satisfying those properties, which is recorded as a Chapter 62 Architecture Decision Record — reversible, per Chapter 1's IP7, and reviewed on a cadence per Chapter 65 rather than fixed permanently in this chapter's own text.

---

## 3. REQUIRED TOOL PROPERTIES

Any AI coding tool used on this codebase must be able to: read and cite this Constitution's chapters directly from the repository's `docs/` folder per Chapter 7 §5, rather than relying on a stale, separately maintained summary of it; execute the full test and lint suite locally per Chapter 32 §2's self-review requirement; and produce the structured handoff records Chapter 33 §4 requires in a durable, written form retrievable by a subsequent session. A tool lacking any of these three properties is not used for implementation work on this codebase, regardless of its other capabilities, because each property is load-bearing for a specific chapter already fixed elsewhere in this Constitution.

---

## 4. PROMPTING CONVENTIONS

Every task briefing, per Chapter 30, is provided to an agent as a written artifact — a file or a structured message — never solely as a verbal, synchronous instruction with no durable record, because a verbal-only briefing cannot be handed off per Chapter 33 §4 and fails Chapter 4's self-containment standard by construction. Where a conversational back-and-forth is used to arrive at a complete briefing (Chapter 29 §3's third delegation category), the resulting complete briefing is captured in writing before implementation work begins — the conversation is the drafting process, not the final artifact.

Prompts and briefings reference this Constitution's chapters by number, per Chapter 9's citation convention, rather than restating a chapter's content inline — restating invites drift between the copy and the source, exactly the duplicate-translation risk Chapter 3 already forbids for any other artifact type.

---

## 5. CONTEXT AND MEMORY MECHANISMS

Where an AI tool offers a persistent memory or context-retention feature across sessions, it is used to store genuinely durable, cross-session-relevant information consistent with this chapter's tool-agnostic stance — never as a substitute for Chapter 33 §4's written handoff record, which must remain readable by a different tool or a different agent instance that may not share the same memory mechanism. Memory features are a convenience layered on top of this chapter's written-artifact requirement, never a replacement for it.

---

## 6. ENFORCEMENT & MEASUREMENT

Section 3's required properties are verified once, when a tool is adopted, as part of its Chapter 62 ADR — not re-verified per task. Section 4's written-briefing requirement is enforced by Chapter 30's own briefing-completeness check, which structurally requires a written artifact to exist at all. Section 5's rule against memory-as-handoff-substitute is checked by Chapter 33 §7's handoff-record completeness check remaining tool-agnostic — a record readable only through one specific tool's memory feature fails that check by definition.

---

## 7. BEHAVIORAL RULES

**When evaluating a new AI coding tool for adoption.** Section 3's three required properties are checked explicitly, and the decision is recorded per Chapter 62, before the tool is used for any production implementation work.

**When a tool's memory feature could technically substitute for a written handoff record.** It is not used that way — Chapter 33 §4's written record is still produced, because the memory feature's durability and portability across tools and sessions cannot be assumed.

**When a specific model version changes underneath an already-adopted tool.** This chapter's requirements do not need re-verification unless the change measurably affects one of Section 3's three properties — a routine model upgrade is not, by itself, a trigger for a new ADR.

---

## 8. DO / DON'T

**Do** provide every task briefing as a durable, written artifact, even when arrived at through conversation.

**Do** cite this Constitution's chapters by number rather than restating their content inline in a prompt.

**Don't** adopt an AI coding tool that cannot satisfy all three of Section 3's required properties, regardless of other advantages it offers.

**Don't** rely on a tool-specific memory feature as a substitute for Chapter 33's written handoff record.

---

## 9. QUALITY ASSURANCE CHECKLIST

- [ ] Does the adopted AI tool satisfy all three of Section 3's required properties, recorded via a Chapter 62 ADR?
- [ ] Is every task briefing provided as a durable written artifact, not a verbal-only instruction?
- [ ] Do prompts cite this Constitution's chapters by number rather than restating their content?
- [ ] Is Chapter 33's written handoff record still produced even when a tool's memory feature could technically substitute?

---

## 10. CROSS REFERENCES

**Within this Constitution:** Chapter 1 (IP7). Chapter 3 (duplicate-translation risk, applied to Section 4's citation convention). Chapter 4 (self-containment standard behind Section 4). Chapter 7 §5 (`docs/`, the source this chapter's tools read from directly). Chapter 9 (citation convention). Chapter 30 (briefing format this chapter's tooling must support). Chapter 33 (handoff-record requirement Section 5 protects). Chapter 62 (ADR process recording the actual tool choice). Chapter 65 (review cadence for the tool decision).

**Within the five documents above this Constitution:** None — this chapter is purely operational, as stated in its own front matter.

---

## 11. FUTURE EXPANSION

**Documented limitations.** This chapter deliberately contains no specific product name or version, consistent with its own scope boundary; a reader looking for the actual currently-adopted tool should consult its Chapter 62 ADR, not this chapter, which would otherwise need constant revision to stay current.

---

*End of Chapter 34, and of Part VI. Part VII, Performance Engineering, is where Master Vision §23's claim that performance is a trust signal gets an actual number and a CI check attached to it.*
