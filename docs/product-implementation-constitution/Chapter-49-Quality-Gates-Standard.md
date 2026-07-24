# CHAPTER 49 — QUALITY GATES STANDARD

**Trady Perch Product Implementation Constitution · Part X: Testing & Quality Assurance**

**Inherited From:** Design System Bible Chapter 61 (Design QA Standards & Checklists — specifically Qa-3 "A Failed Item Blocks Ship; It Never Becomes an Unreviewed Known Issue"). Chapters 18, 36, 43, and 47–48 are this chapter's direct premises — this chapter consolidates their individual checks into one named, ordered sequence.

---

## 1. INTRODUCTION

Several chapters already establish their own blocking check: Chapter 18's accessibility gate, Chapter 36's performance budget, Chapter 43's SAST scan, Chapter 47–48's four-layer pyramid. This chapter does not add new content to any of them — it names the single, ordered sequence they collectively form, so "what does a change have to pass before it can merge" has one authoritative answer, checkable in one place, rather than requiring a reviewer to separately remember every chapter's individual requirement.

---

## 2. THE GATE SEQUENCE

In order, fastest and cheapest first, per Chapter 47 §4's cost-based reasoning applied to gate ordering itself — a change fails fast, at the cheapest applicable gate, rather than waiting through expensive checks to fail on something a fast check would have caught first:

1. **Static checks** — Chapter 9's naming lint, Chapter 13 §6's token-literal lint, Chapter 18 §2 Layer 1's accessibility static analysis, Chapter 43 §12's SAST scan, Chapter 45 §7's dependency vulnerability scan. All run in parallel, all fast, all catch a defect before any code executes.
2. **Unit and integration tests** — Chapter 47 §2's first two pyramid layers, including Chapter 18's unit/integration-layer accessibility checks per Chapter 48 §2, and Chapter 25 §7's cache-invalidation and Chapter 44 §8's deletion-mechanism assertions specifically.
3. **Build-time budget checks** — Chapter 36 §3's bundle-size ceilings, checked against the actual built output.
4. **End-to-end and performance tests** — Chapter 47 §2's top pyramid layer, including Chapter 48 §3's Lighthouse-equivalent Core Web Vitals measurement against Chapter 36 §2's thresholds.
5. **Visual regression** — Design System Bible Chapter 62's suite, per Chapter 48 §4, at every Chapter 15 §2 breakpoint.
6. **Human or AI review** — Chapter 51's review process, the one gate requiring judgment rather than automated pass/fail, run last because it is most valuably spent on a change already known to pass every mechanical gate before it.

---

## 3. WHY REVIEW IS LAST, NOT FIRST

Placing Chapter 51's review at the end of the sequence, rather than the start, is a deliberate application of Chapter 47 §4's cost reasoning to reviewer time specifically: a human or AI reviewer's judgment is the most expensive, least parallelizable resource in this sequence, and spending it on a change that hasn't yet passed Gates 1 through 5 risks the reviewer's attention being consumed by issues a mechanical gate would have caught anyway, or, worse, the reviewer approving a change on its substance before discovering it fails a mechanical gate regardless. Running the cheap, mechanical gates first means review time is spent exclusively on what only judgment can actually evaluate.

---

## 4. FAILURE IS BLOCKING, NEVER AN UNREVIEWED KNOWN ISSUE

Per Qa-3, a failed gate blocks merge — it never becomes a documented "known issue" merged anyway with a promise to fix it later, which per Chapter 5 §2 (F2, Undocumented Exception) is exactly the pattern that erodes a standard's actual force over time. The only path past a failing gate is fixing the underlying issue, or, for the narrow set of cases each originating chapter explicitly permits an exception (a Chapter 62-governed ADR, a Chapter 66 debt-register entry with an owner and a date), an explicit, governed exception — never an informal merge-anyway decision made unilaterally by whoever is blocked.

---

## 5. ENFORCEMENT & MEASUREMENT

This chapter's own success criterion — no pull request in the repository's history merges with a red gate — is enforced structurally, not by convention: branch-protection configuration requires every gate in Section 2 to report a passing status before the merge button is even available, with no routine contributor holding override permission. This is a mechanical guarantee, not a policy reviewers are trusted to enforce manually — the same distinction Chapter 1's IP2 draws between a machine-checked standard and a merely well-intentioned one, applied here to the gate sequence's own integrity.

---

## 6. BEHAVIORAL RULES

**When any gate in Section 2 fails.** The underlying issue is fixed, per that gate's own originating chapter, before the pull request proceeds — never bypassed, per Chapter 31's G4 guardrail.

**When a change is trivial or urgent.** The full gate sequence still runs — Chapter 42 §7 and Chapter 18 §8 already establish that no floor is waived for urgency, and this chapter's consolidated sequence carries that same standard forward without a "small change" exception, because gate failures are not reliably predictable by a change's apparent size.

**When branch-protection configuration itself is proposed to change.** It is treated as a Chapter 62-governed decision, given its direct bearing on this chapter's own success criterion — never adjusted informally to unblock a specific, individual pull request.

---

## 7. DO / DON'T

**Do** let a change fail at the cheapest applicable gate first, per Section 2's ordering.

**Do** treat every gate failure as blocking, with the only path past it being a fix or an explicit, governed exception.

**Don't** merge a change with a documented "known issue" standing in for an actual gate fix.

**Don't** grant routine override permission on branch protection to unblock an individual pull request.

---

## 8. QUALITY ASSURANCE CHECKLIST

- [ ] Did the change pass all six gates in Section 2's sequence, in order, with no bypass?
- [ ] Is branch-protection configuration structurally enforcing this sequence, with no routine override permission granted?
- [ ] Was any gate failure fixed at its source, rather than merged anyway as an undocumented known issue?
- [ ] Was review (Gate 6) reached only after Gates 1 through 5 already passed?

---

## 9. CROSS REFERENCES

**Within this Constitution:** Chapter 1 (IP2). Chapter 5 §2 (F2, the failure mode Section 4 prevents). Chapter 9, 13, 18, 25, 36, 43–45, 47–48 (the individual gates this chapter consolidates). Chapter 31 (G4, applied to Section 6). Chapter 51 (the review process at Gate 6). Chapter 56 (the CI pipeline implementing this sequence). Chapter 62 (governed exceptions and branch-protection changes). Chapter 66 (debt-register entries for governed exceptions).

**Within the five documents above this Constitution:** Design System Bible Chapter 61 (specifically Qa-3).

---

## 10. FUTURE EXPANSION

**Possible future additions.** A new chapter introducing its own blocking check is added to Section 2's sequence at the position matching its own cost profile per Section 3's reasoning, not appended automatically to the end regardless of how expensive or cheap it actually is to run.

---

*End of Chapter 49. The next chapter, Definition of Done, is the single, closed checklist spanning every Part's standard that determines whether any unit of work is actually complete.*
