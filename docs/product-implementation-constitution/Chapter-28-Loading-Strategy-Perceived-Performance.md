# CHAPTER 28 — LOADING STRATEGY & PERCEIVED PERFORMANCE IMPLEMENTATION

**Trady Perch Product Implementation Constitution · Part V: State, Data & API Architecture**

**Inherited From:** Design System Bible Chapter 31 (Skeleton Loaders & Loading Patterns); Motion Bible Chapter 5 (Motion Ethics), Chapters 54–56 (Loading State Philosophy). Chapter 14 (Motion Implementation Strategy) and Chapter 25 (Data Fetching & Caching Strategy) are this chapter's direct premises.

---

## 1. INTRODUCTION

Chapter 25 specified when data is fetched and how it's cached; Chapter 14 specified how motion is wired into code. This chapter connects them at the one point where a genuine wait is unavoidable: the code implementation of what a user sees while Chapter 25's fetch is in flight. Its most consequential requirement is a prohibition, inherited directly from Motion Bible's ethics chapter: no delay is ever fabricated to imply effort the product isn't actually expending.

---

## 2. THE SKELETON, WIRED TO REAL SHAPE

Per Design System Bible Sk-1, a skeleton's shape matches the real content's proportions. This chapter requires that match to be structural, not visually approximate: a skeleton component is generated from the same Chapter 24 schema the real content renders from, so that a schema change automatically produces a correctly updated skeleton rather than requiring a component author to separately, manually keep two representations in sync — the same single-source-of-truth discipline Chapter 13 already applies to tokens, applied here to loading placeholders.

---

## 3. THE PROHIBITION ON FABRICATED DELAY

No code path in this codebase ever adds delay to a loading state that isn't genuinely required by the underlying fetch or computation — no `setTimeout`, no artificial minimum-display-duration wrapper introduced to make a fast response "feel more substantial." This is Motion Bible Chapter 5's motion-ethics doctrine translated directly into a code-level rule: a fast, honest response is always preferred and never slowed down for perceptual effect, because doing so would mean the product's own loading state is, in a small but real way, lying about how much work it actually did.

The one narrow, explicitly permitted exception is a minimum-display-duration guard against visual flicker — preventing a skeleton from appearing and disappearing within a single frame for an extremely fast response, which is a perceptual-legibility fix, not a fabricated-effort deception, and is capped at a duration small enough (bounded by Chapter 14's Instant tier) that it could never be mistaken for the forbidden pattern.

---

## 4. ESCALating WAITS

Per Design System Bible Sk-3, an extended wait escalates its messaging rather than looping the same skeleton silently forever. This chapter's implementation exposes the elapsed-time signal Chapter 25 §5 already specifies, driving a staged message sequence: the initial skeleton, then, past a defined threshold, an explicit "this is taking longer than usual" state, then, past a second threshold, an explicit offer to cancel or retry — never an indefinite, unchanging skeleton with no escalation at all.

---

## 5. ENFORCEMENT & MEASUREMENT

A lint rule flags any `setTimeout`, `setInterval`, or equivalent artificial-delay construct found inside a loading-state code path, distinguishing it from Section 3's narrow, explicitly annotated flicker-guard exception — an unannotated delay fails this check by default. This is the direct mechanism behind this chapter's own success criterion. Section 2's schema-generated skeleton is verified by the same visual regression suite Chapter 15 §6 already runs per breakpoint, extended to assert skeleton and real-content proportions match within a defined tolerance.

---

## 6. BEHAVIORAL RULES

**When implementing any new loading state.** Its skeleton is generated from Chapter 24's schema per Section 2, never hand-built to visually approximate the real content from memory.

**When a fetch resolves faster than expected.** The result is shown immediately — never artificially delayed, per Section 3's prohibition, regardless of how briefly the skeleton would otherwise have been visible.

**When a fetch genuinely takes longer than expected.** Section 4's escalation sequence handles it automatically, using the elapsed-time signal already exposed by Chapter 25 — no bespoke, per-feature timeout logic is written independently.

---

## 7. DO / DON'T

**Do** generate every skeleton component from the same schema its real content renders from.

**Do** show a fast response immediately, with no artificial minimum display duration beyond Section 3's narrow flicker guard.

**Don't** add a `setTimeout`-style delay to make a fast response "feel more substantial" — this is forbidden without exception.

**Don't** let a loading state persist unchanged indefinitely — escalate per Section 4 once a defined threshold passes.

---

## 8. ANTI-PATTERNS

**The confidence-building delay.** A developer, worried a near-instant response will feel untrustworthy or "too easy," adds a small artificial delay before showing a result — often with good intentions, believing it improves perceived quality. This is dangerous precisely because it is well-intentioned and easy to defend informally ("it felt weird without it"), which is exactly why Motion Bible's ethics chapter and this chapter's own Section 3 close it off without exception rather than leaving it to case-by-case judgment. It is detected by Section 5's lint rule flagging the delay construct directly. It is fixed by removing it — a fast, honest response is always the correct outcome, and any genuine perceptual concern is addressed through Chapter 14's motion tiers on the transition itself, never through fabricated wait time.

---

## 9. QUALITY ASSURANCE CHECKLIST

- [ ] Is every skeleton generated from the same schema as its real content, per Section 2?
- [ ] Does the codebase contain zero unannotated artificial delays in any loading-state code path? *(Section 3)*
- [ ] Does an extended wait escalate its messaging per Section 4, rather than looping the same skeleton indefinitely? *(Sk-3)*
- [ ] Does a fast response render immediately, with no delay beyond Section 3's narrow, bounded flicker guard?

---

## 10. CROSS REFERENCES

**Within this Constitution:** Chapter 13 (single-source-of-truth model, mirrored in Section 2). Chapter 14 (motion tiers used for Section 3's flicker guard and transition motion). Chapter 15 §6 (visual regression suite, extended in Section 5). Chapter 24 (the schema Section 2 generates skeletons from). Chapter 25 §5 (the elapsed-time signal Section 4 consumes).

**Within the five documents above this Constitution:** Design System Bible Chapter 31 (in full, specifically Sk-1 and Sk-3); Motion Bible Chapter 5, Chapters 54–56.

---

## 11. FUTURE EXPANSION

**Documented limitations.** Section 4's specific escalation thresholds are not yet fixed to exact durations, deferred to Chapter 36's performance-budget process for the same reason Chapter 27 §13 defers its retry-budget numbers — tuned against real, measured data rather than an arbitrary starting guess.

---

*End of Chapter 28, and of Part V. Part VI, AI Implementation Workflow, is where this Constitution turns to how an AI agent actually executes everything Parts I through V specify.*
