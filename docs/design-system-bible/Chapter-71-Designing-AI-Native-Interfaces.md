# CHAPTER 71 — DESIGNING FOR AI-NATIVE INTERFACES

**Trady Perch Design System Bible · Volume VII: The Horizon**
*Written last among the ordinary chapters, per the authoring sequence — every Horizon chapter inherits the full, settled system from Volumes I through VI, and none may introduce a principle that couldn't already be justified by the Master Vision.*

**Inherited From:** Master Vision Chapter 19 (AI Personality Constitution). Design System Bible Chapter 1 (P1, P6, P8, in full), Chapter 25 (Toasts, the undo-path model this chapter extends), Chapter 39 (state model), Chapter 45 (Conversational Patterns), Chapter 46 (Trust, Privacy & Security Patterns).

---

## 1. INTRODUCTION

Trady Perch's own product is AI agents. It is a direct credibility risk for the company's own future tooling — a client dashboard, an internal admin panel — to still look like a traditional SaaS product with a chatbot icon bolted on, once agent-native interaction patterns become the category standard this company itself is helping define for clients. This chapter exists so that risk is addressed deliberately rather than discovered the first time Trady Perch builds a genuinely agentic feature for itself.

This chapter depends on Chapter 1's Principle 1 directly — every rule here must cite a Master Vision or Tier 1 origin, precisely because a genuinely new interface category is where a team is most tempted to import another company's conventions wholesale, the exact failure mode P1 exists to prevent. It has no further dependents within this Bible — it is one of Volume VII's four terminal chapters.

---

## 2. PHILOSOPHY

The rejected alternative is treating "AI-native" as license to invent a new visual and interaction language disconnected from everything Volumes I through VI already established, on the theory that agentic interfaces are a genuinely different medium deserving a fresh start. This was rejected because the medium is new, but the brand is not — Chapter 1's derivation test applies here exactly as it applies to a 2026 button, and every principle in this chapter is a direct extension of existing reasoning into a context Volumes I through VI didn't anticipate, never a freestanding new idea.

---

## 3. CORE PRINCIPLES

### Ai-1 — Proactive AI Actions Are Always Visually Distinguished From User-Initiated Ones

**Purpose.** Any action an AI agent takes on its own initiative (without a direct, immediate user request) carries a visible marker distinguishing it from an action the user directly triggered — using Chapter 34's Av-3 abstract AI mark as the differentiator.

**Reasoning.** Descends from Principle 1: a user reviewing a list of changes (to a dashboard, a document, a workflow) needs to be able to trace which changes they caused and which the agent caused on its own, or the system's actions become untraceable to their actual origin.

**Examples.** A dashboard log entry reading "Lead score updated" beside Chapter 34's AI mark (agent-initiated) versus the same entry with no mark (user-initiated, via a direct edit).

**When it applies.** To every proactive, agent-initiated action visible in any interface. **When it does not apply.** No exception.

### Ai-2 — An Agent's Confidence Is Always Visible, Never Implied by Tone Alone

**Purpose.** Where an AI agent takes an action or makes a recommendation based on uncertain or probabilistic information, the interface shows an explicit confidence indicator — never relying on the AI's own conversational tone (per Master Vision Chapter 19's composed register) to imply certainty or uncertainty.

**Reasoning.** Descends from Master Vision §19.9's Trust & Safety behavior and Principle 1: Chapter 19 already requires the AI's own words to state uncertainty honestly rather than hedge nervously — this principle ensures the *interface* backs that honesty with an explicit signal, since a composed, confident-sounding tone (correct per Chapter 19) could otherwise be mistaken for certainty about something the AI is not actually certain about.

**Examples.** A lead-qualification score shown with both the score itself and an explicit "Moderate confidence" label, rather than the score alone presented with no confidence context.

**When it applies.** To every AI-generated recommendation or classification presented with real-world consequence attached. **When it does not apply.** To low-stakes, easily-reversible suggestions where an explicit confidence label would add more noise than value.

### Ai-3 — Every Autonomous Action Has a Visible Undo Path

**Purpose.** Any action an AI agent takes autonomously is paired with a visible, easily-accessible undo action, following Chapter 25's Toast-based undo model directly.

**Reasoning.** Direct extension of Chapter 25's Ts-1 (a Toast confirms, it never asks) combined with the added stakes of autonomous action: a user who did not directly request an action deserves at least the same easy reversal path a user who made a mistake in their own direct action already receives.

**Examples.** "The agent moved 3 leads to 'Qualified.' Undo." — following Chapter 25's exact Toast anatomy and link-action pattern.

**When it applies.** To every reversible autonomous action. **When it does not apply.** To an action that is genuinely irreversible by nature (sending an email already delivered) — here, per Chapter 23's Dl-1 reasoning extended, the action should require upfront confirmation rather than offering an undo that cannot actually be honored.

---

## 4. COMPLETE DESIGN SPECIFICATION

**Agent-action marker (Ai-1):** Chapter 34's AI mark, small, beside any log entry or change record representing agent-initiated action. **Confidence indicator (Ai-2):** a text label (High/Moderate/Low confidence) paired with any consequential AI-generated value, following Chapter 33's Badge anatomy for visual consistency. **Undo path (Ai-3):** Chapter 25's Toast anatomy, extended to autonomous actions specifically.

---

## 5. MEASUREMENTS

Confidence levels: 3 (High/Moderate/Low), matching this Bible's recurring small-fixed-set pattern (Chapter 3's four Badge colors, Chapter 39's eight states) rather than a continuous, harder-to-scan percentage.

---

## 6. BEHAVIORAL RULES

**Before any autonomous agent action ships.** Confirm it satisfies Ai-1 through Ai-3 — marked, confidence-labeled where consequential, and undo-able where reversible.

---

## 7. MOTION SPECIFICATION

An agent-initiated change appearing in a live view (a dashboard updating in real time) uses Chapter 15's Standard tier, matching ordinary content-update motion — no special, more dramatic treatment is warranted for agent-originated changes; per Ai-1, the distinction is communicated through the visual marker, not through motion novelty, which would violate Chapter 1's Principle 6 if added without a diegetic reason.

---

## 8. ACCESSIBILITY

The agent-action marker (Ai-1) and confidence label (Ai-2) must both be available to assistive technology, not only sighted users — a screen-reader user reviewing a change log needs the same ability to distinguish agent-initiated from user-initiated actions.

---

## 9. RESPONSIVE BEHAVIOUR

No distinct responsive behavior beyond Chapter 33 (Badge) and Chapter 25 (Toast)'s existing rules, both of which this chapter reuses directly.

---

## 10. AI & FUTURE INTERFACES

This chapter *is* the AI & Future Interfaces treatment for its own subject matter; its own further extension is Chapter 72 (Voice), where the same three principles apply with no visual marker available — Chapter 72 must resolve Ai-1 through Ai-3 into spoken equivalents (an explicit verbal statement of agency, confidence, and reversibility) rather than a visual badge.

---

## 11. DO / 12. DON'T

**Do:** A dashboard showing "3 leads auto-qualified [AI mark] — Moderate confidence — Undo" as one coherent, traceable log entry. **Don't:** The same three leads silently re-categorized with no visual distinction from a manual edit, no confidence indication, and no undo path — a user reviewing the dashboard would have no way to know an autonomous decision, of uncertain confidence, had occurred at all.

---

## 13. ANTI-PATTERNS

**Invisible autonomy.** Shipping an agentic feature where autonomous actions are visually indistinguishable from user actions, because building the distinction felt like an unnecessary extra layer for an internal tool. This is dangerous because it is a direct trust violation exactly analogous to Chapter 46's "trust theater" — a company that builds AI automation for clients cannot credibly ship its own tooling without the same transparency it would insist a client's automation needs. It is detected by auditing any change log or action history for agent/user traceability, and fixed by adding Ai-1's marker retroactively.

---

## 14. QUALITY ASSURANCE CHECKLIST

- [ ] Is every proactive AI action visually distinguished from user-initiated ones? *(Ai-1)*
- [ ] Does every consequential AI recommendation show an explicit confidence level? *(Ai-2)*
- [ ] Does every reversible autonomous action offer a visible undo path? *(Ai-3)*

---

## 15. CROSS REFERENCES

Chapter 1 (P1, P6, P8). Chapter 23 (Dl-1, irreversibility exception). Chapter 25 (Ts-1, undo model). Chapter 33 (Badge, confidence label anatomy). Chapter 34 (Av-3, agent marker). Chapter 39 (state model). Chapter 45 (conversational patterns). Chapter 46 (trust patterns). Chapter 72 (Voice, direct dependent). Master Vision Chapter 19, in full.

---

## 16. FUTURE EXPANSION

**Documented limitations.** This chapter is reasoned entirely in advance of any real agentic feature being built for Trady Perch's own tooling — it should be treated as a strong first proposal, revisited with real priority the first time such a feature actually ships, per this Bible's own recurring honesty about untested, first-canonical chapters.

---

*End of Chapter 71. The next chapter, per the authoring sequence, is Voice Interface Design Standards.*
