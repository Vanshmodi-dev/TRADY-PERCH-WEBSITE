# CHAPTER 63 — ONBOARDING & KNOWLEDGE TRANSFER DOCUMENTATION

**Trady Perch Product Implementation Constitution · Part XIII: Documentation Standards**

**Inherited From:** Brand Identity Manual Chapter 75 (New Hire Onboarding Identity) — a structural parallel for identity transmission, extended here to engineering knowledge transfer specifically. Chapter 61 (Code-Level Documentation Standard), Chapter 62 (Architecture Decision Record Standard), and Chapter 30 (AI Agent Briefing Standard) are this chapter's direct premises.

---

## 1. INTRODUCTION

Chapter 61 specified what belongs beside the code. Chapter 62 specified how a significant decision is recorded. This chapter is the front door: the documentation set that lets a new contributor — a human engineer's first week, or an AI agent's very first task on this codebase — become productive using only what's written, per Chapter 4's self-containment standard applied at the scale of an entire onboarding experience rather than a single task.

---

## 2. THE ONBOARDING DOCUMENT SET

A new contributor's path runs through exactly three layers, each linking to the next rather than duplicating its content, per Chapter 61 §3's anti-duplication standard extended here:

**The repository root README** — the single, mandatory front door, per Chapter 7's structure: what this product is, in brief, a link to this Constitution and the five documents above it, and a link to Section 3's getting-started guide. It does not attempt to explain the architecture itself — that's what the Constitution is for — only to orient a reader toward where that explanation lives.

**The getting-started guide** — the practical, step-by-step path from a fresh checkout to a running local environment and a first successful test run, using Chapter 10's configuration standard directly. This is the one document in this chapter explicitly permitted to be more procedural than Chapter 60 §2's why-versus-what test would otherwise favor, because a genuinely new contributor needs the "what" of environment setup at least once, explicitly, before Chapter 60's usual restraint applies to everything after it.

**This Constitution itself**, entered through Chapter 1, for the architectural and philosophical grounding neither of the first two documents attempts to duplicate.

---

## 3. THE FIRST-TASK PATH

Beyond environment setup, a new contributor's actual first task follows Chapter 29's delegation framework and Chapter 30's briefing standard exactly as any other task would — this chapter does not define a separate, simplified process for a first task. The getting-started guide instead points to a small, explicitly curated set of good first-task candidates (bounded, reversible, per Chapter 29 §3's full-delegation category) maintained as a living list, so a new contributor's first experience is calibrated to actually succeed using this Constitution's ordinary process, not a special onboarding-only shortcut that wouldn't teach them how work actually proceeds here afterward.

---

## 4. FOR AN AI AGENT SPECIFICALLY

An AI agent's "onboarding" is, in the fullest sense, every single session — per Chapter 4, there is no persistent tenure to onboard into. This chapter's contribution for an agent specifically is ensuring the same three-layer document set from Section 2 is the correct, sufficient entry point for a fully cold-start agent, verified by the same empirical test Chapter 4 §5 already establishes: a fresh agent, given only this chapter's document set, either can or cannot reach a first successful merged change without escalating for missing context.

---

## 5. ENFORCEMENT & MEASUREMENT

This chapter's own success criterion is checked directly and empirically, exactly as Chapter 4 §5 already prescribes for any self-containment claim: a new contributor — human or a fresh AI agent instance — is tracked from first checkout to first successful merged change, and any point where they needed undocumented, verbally-transmitted help is logged as a gap in this chapter's document set specifically, fed back through Chapter 65's continuous-improvement cadence exactly as Chapter 53 §6 already does for AI self-review gaps.

---

## 6. BEHAVIORAL RULES

**When a new contributor needs help this chapter's documents didn't provide.** The help is given, but the gap is logged immediately per Section 5 — never treated as a one-off, forgettable exception, since per Chapter 5's F1, an unwritten answer given verbally once is exactly how tribal knowledge accumulates.

**When the getting-started guide's steps no longer match the actual current setup process** (a tooling change since it was last verified). It is corrected in the same change that altered the setup process, per Chapter 60 §4's staleness standard, not left to be discovered stale by the next new contributor.

**When curating Section 3's first-task candidate list.** Each candidate is checked against Chapter 29 §3's full-delegation criteria explicitly — a task requiring undocumented context is removed from the list rather than left as a trap for whoever picks it up next.

---

## 7. DO / DON'T

**Do** keep the three-layer document set from Section 2 as the sole, non-duplicated onboarding path.

**Do** log any gap requiring undocumented, verbal help immediately, per Section 5.

**Don't** let the getting-started guide's steps drift out of sync with the actual current setup process.

**Don't** create a special, simplified onboarding-only task process that doesn't reflect how work actually proceeds afterward.

---

## 8. QUALITY ASSURANCE CHECKLIST

- [ ] Does the repository root README link to this Constitution and the getting-started guide, without duplicating either's content?
- [ ] Can a fresh checkout reach a running local environment and a first passing test using only the getting-started guide?
- [ ] Does Section 3's first-task candidate list contain only genuinely full-delegation-eligible tasks per Chapter 29 §3?
- [ ] Was any gap requiring undocumented help logged per Section 5, feeding Chapter 65's improvement cadence?

---

## 9. CROSS REFERENCES

**Within this Constitution:** Chapter 1 (root entry point). Chapter 4 §5 (the empirical self-containment test this chapter's own success criterion mirrors). Chapter 5 (F1, the risk behind Section 6's first rule). Chapter 7 (repository root, home of the README). Chapter 10 (configuration standard behind Section 2's getting-started guide). Chapter 29 §3, Chapter 30 (the delegation and briefing framework Section 3 and Section 4 both rely on). Chapter 53 §6 (the feedback-logging pattern Section 5 mirrors). Chapter 60 §4 (staleness standard behind Section 6). Chapter 61 §3 (anti-duplication standard behind Section 2). Chapter 65 (continuous-improvement cadence closing Section 5's loop).

**Within the five documents above this Constitution:** Brand Identity Manual Chapter 75.

---

## 10. FUTURE EXPANSION

**Documented limitations.** Section 3's first-task candidate list requires active maintenance to stay genuinely current and appropriately calibrated; a stale list pointing to tasks that no longer exist or are no longer good first candidates is a specific, named risk this chapter flags rather than assumes solved by its initial creation alone.

---

*End of Chapter 63, and of Part XIII. Part XIV, Governance & Continuous Improvement, is where this Constitution addresses how it stays honest as the team, the stack, and the product change.*
