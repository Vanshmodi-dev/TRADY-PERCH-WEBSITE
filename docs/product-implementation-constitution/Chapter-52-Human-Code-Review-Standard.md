# CHAPTER 52 — HUMAN CODE REVIEW STANDARD

**Trady Perch Product Implementation Constitution · Part XI: Code Review & Collaboration Standards**

**Inherited From:** Design System Bible Chapter 65 (Governance Model & Decision Rights), Chapter 67 (Contribution Guidelines). Chapter 51 (Code Review Philosophy) is this chapter's direct premise.

---

## 1. INTRODUCTION

Chapter 51 named review's actual territory — architectural fit, genuine intent, systemic coupling. This chapter is the concrete procedure for a human reviewing another human's code against that territory: how many reviewers, how quickly, and what specifically must be checked beyond what Chapter 49's gates already verified, such that a sampled set of merged pull requests shows real evidence of that checking having happened, per this chapter's own success criterion — not merely an approval click with no substantive engagement behind it.

---

## 2. REVIEWER COUNT

Every pull request requires at least one approval from a reviewer who is not its author, before merge, for any change touching `packages/` per Chapter 7 §4's shared, foundational or composed tiers. A change touching a Chapter 6 §3-justified foundational package, or meeting Chapter 62's ADR significance threshold, requires two approvals — the second reviewer specifically because a foundational-package change's blast radius, per Chapter 1's IP7, is wide enough that a single reviewer's judgment carries more risk of an uncaught architectural-fit issue per Chapter 51 §4.

---

## 3. RESPONSE-TIME EXPECTATION

A pull request receives an initial review response — not necessarily a final approval, but a substantive first pass — within one business day of being marked ready for review. This expectation exists because a slow review cycle creates pressure to skip or rush review under accumulating deadline pressure, which is exactly the condition Chapter 42 §7 and Chapter 18 §8 already warn erodes a non-negotiable floor; a fast, predictable review cycle removes that pressure at its source rather than asking reviewers to resist it in the moment.

---

## 4. WHAT A REVIEWER MUST CHECK

Beyond Chapter 51's three territories, a reviewer explicitly works through Chapter 50's Definition of Done for the judgment-dependent items Section 5 of that chapter identifies as not fully gate-enforced — traceability's substantive correctness (does the cited chapter actually support this decision, per Chapter 1's own citation-laundering warning) and documentation quality. A reviewer who approves without having actually opened the cited chapters to verify support is, per Section 6 below, producing exactly the rubber-stamped approval this chapter's success criterion is designed to catch and discourage.

---

## 5. LEAVING EVIDENCE

A review's substantive engagement is left as visible evidence — specific comments referencing specific lines or decisions, or, where no comment is needed, an approval that follows a response-time gap consistent with actual reading having occurred rather than an implausibly instant approval on a large change. This is not a requirement to comment for its own sake — Chapter 51 §3 already discourages low-value, redundant comments — but a change with zero comments and an approval logged seconds after the pull request was opened is treated as a signal warranting a second look, not evidence of an unusually efficient reviewer.

---

## 6. ENFORCEMENT & MEASUREMENT

This chapter's own success criterion — a sampled set of merged pull requests showing evidence of actual review — is checked directly per Chapter 65's continuous-improvement cadence: a periodic sample of merged pull requests is examined for the evidence pattern Section 5 describes, and a pattern of rubber-stamped approvals (no comments, implausible response times, or approvals from a reviewer whose own later work reveals they hadn't actually understood the change) is treated as a defect in the review process itself, addressed structurally — revisiting Section 3's response-time pressure, Section 2's reviewer load — not treated as an individual reviewer's personal failing to quietly correct.

---

## 7. BEHAVIORAL RULES

**When assigned as a reviewer.** Chapter 51's three territories and Section 4's Definition of Done items are checked explicitly, within Section 3's response-time expectation — never approved based on the pull request's description alone without reading the actual diff.

**When a review would require more time than Section 3's expectation allows.** A partial, honest status update ("reviewed the core logic, still working through the test coverage") is left rather than either an artificially rushed full approval or silence past the deadline — per Chapter 1's IP4, an honest partial status is more useful than a complete one that isn't actually true.

**When two reviewers are required per Section 2 and they disagree.** The disagreement is resolved per Chapter 51 §8's routing — a substantive concern is addressed before merge; a standard-level disagreement is routed through Chapter 64.

---

## 8. DO / DON'T

**Do** provide a substantive first review response within Section 3's one-business-day expectation.

**Do** leave visible evidence of actual engagement — specific comments, or an approval timing consistent with real reading.

**Don't** approve a pull request based on its description without reading the actual diff against Chapter 51's three territories.

**Don't** treat an approval as a formality once Chapter 49's gates have already passed — Section 4's judgment-dependent items remain the reviewer's specific responsibility regardless.

---

## 9. ANTI-PATTERNS

**The rubber-stamped approval.** A reviewer approves a pull request within moments of its being opened, with no comments, on a change substantial enough that genuine review would plausibly take longer — often because review has become a perceived formality once Chapter 49's automated gates already passed. This is dangerous because it defeats Chapter 51's entire premise that review exists to catch what gates structurally cannot, while still producing the *appearance* of a completed process, which is worse than an honestly skipped step because it hides the gap from anyone checking merge history for compliance. It is detected by Section 6's periodic sampling, specifically checking for the evidence pattern Section 5 describes. It is fixed by addressing the underlying cause — usually Section 3's response-time pressure or an unsustainable Section 2 reviewer load — rather than by individually reprimanding a reviewer for a systemic condition.

---

## 10. QUALITY ASSURANCE CHECKLIST

- [ ] Does the pull request have the correct reviewer count per Section 2, based on its actual blast radius?
- [ ] Was a substantive initial response given within Section 3's one-business-day expectation?
- [ ] Did the reviewer explicitly check Chapter 51's three territories and Chapter 50's judgment-dependent items?
- [ ] Does the review thread show visible evidence of actual engagement, per Section 5?

---

## 11. CROSS REFERENCES

**Within this Constitution:** Chapter 1 (IP4, IP7, and the citation-laundering warning behind Section 4). Chapter 6 §3, Chapter 7 §4 (foundational-package tiering behind Section 2). Chapter 18 §8, Chapter 42 §7 (the urgency-exception prohibition behind Section 3). Chapter 49 (the gates preceding this chapter's review step). Chapter 50 §5 (the judgment-dependent items Section 4 checks). Chapter 51 (the philosophy and territories this chapter operationalizes). Chapter 62 (the ADR threshold triggering Section 2's second reviewer). Chapter 64 (routing for standard-level disagreement). Chapter 65 (continuous-improvement sampling behind Section 6).

**Within the five documents above this Constitution:** Design System Bible Chapter 65, Chapter 67.

---

## 12. FUTURE EXPANSION

**Documented limitations.** Section 5's "evidence of engagement" check remains a heuristic, not a precise measurement of review quality; a more rigorous method is a plausible future addition once enough sampled data per Section 6 exists to design one that doesn't itself become a metric reviewers game rather than a genuine quality signal.

---

*End of Chapter 52. The next chapter, AI-Output Review Reconciliation Standard, specifies the distinct procedure for a human reviewing an AI agent's already-self-reviewed work.*
