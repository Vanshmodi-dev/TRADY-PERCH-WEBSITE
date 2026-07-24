# CHAPTER 32 — AI SELF-REVIEW PROCESS

**Trady Perch Product Implementation Constitution · Part VI: AI Implementation Workflow**

**Inherited From:** Design System Bible Chapter 61 (Design QA Standards & Checklists) — a structural parallel, extended here from design QA to an AI agent's own implementation output. Chapter 30 (AI Agent Briefing Standard) and Chapter 31 (AI Code Generation Guardrails) are this chapter's direct premises.

---

## 1. INTRODUCTION

An AI agent's work is not complete when the code appears to satisfy the task — it is complete once the agent has verified that it does, against the same standard a careful human reviewer would apply. This chapter specifies that verification as a mandatory, non-skippable procedure run before any task is presented as finished, so that Chapter 53's human reconciliation review begins from work that has already been checked once, rather than being the first check it receives.

---

## 2. THE SELF-REVIEW PROCEDURE

Before presenting any task as complete, the agent runs the following steps, in order, with no step skipped:

1. **Re-read the original briefing in full**, per Chapter 30's six mandatory fields, and re-read the actual diff produced — not from memory of having written it, but as a fresh read, checking the diff against the objective and acceptance criteria as an independent reviewer would.
2. **Run the full, relevant test and lint suite**, not a subset chosen because it seemed most relevant — the complete set of checks Chapter 49's quality gates will eventually run, executed proactively rather than left for CI to discover.
3. **Verify every acceptance criterion from the briefing's field 4, individually**, checking each one explicitly rather than a general impression that the task "seems done."
4. **Check the change against Chapter 31's eight guardrails, explicitly**, per that chapter's own anti-pattern warning against a technically-compliant workaround that defeats a guardrail's actual intent.
5. **Check the change against every governing chapter named in the briefing's field 2**, using each chapter's own Quality Assurance Checklist section where one exists, rather than a general sense of compliance.
6. **State explicitly what was and was not verified**, per Chapter 31's G8 — if a step could not be fully completed (a test environment was unavailable, a specific check couldn't run), this is reported honestly, not silently treated as passed.

---

## 3. WHY RE-READING PRECEDES RE-RUNNING

Step 1 is sequenced before Step 2 deliberately: an agent that runs tests first and passes them can develop a false sense of completion before ever checking the diff against the *original* objective, especially if the implementation drifted subtly during the course of the work. Re-reading the brief fresh, before re-confirming mechanically that tests pass, catches the case where the code is internally correct and well-tested but has quietly solved a slightly different problem than the one actually briefed — a defect no test suite written against the drifted understanding would ever catch, because the tests were written against the same drifted understanding as the code.

---

## 4. TREATING THE BRIEF, NOT MEMORY, AS AUTHORITATIVE

Per Chapter 4's self-containment doctrine, Step 1's re-read treats the written briefing as the authoritative statement of what was asked — not the agent's own accumulated sense, over the course of the task, of what it believes was intended. Where the two have diverged, the briefing wins, and a diverged implementation is corrected to match it, or, where the agent believes the briefing itself was wrong, this is raised explicitly per Chapter 33 rather than silently resolved by trusting the agent's own drifted interpretation over the written record.

---

## 5. ENFORCEMENT & MEASUREMENT

Every task submission includes a self-review report, structured around Section 2's six steps, as a required artifact — a submission with no self-review report attached is treated as incomplete per Chapter 30's own completeness standard, extended here to the output side of a task rather than only its input briefing. This chapter's own success criterion — a declining rate of post-submission corrections over time — is tracked per Chapter 65's continuous-improvement cadence: Chapter 53's human reconciliation review records which defects, if any, the self-review process should have caught but didn't, and that data feeds back into revising this chapter's own procedure, exactly as Chapter 1's IP5 empirical test is tracked for any chapter.

---

## 6. BEHAVIORAL RULES

**Before presenting any task as complete.** All six steps of Section 2 are run in full and in order — never abbreviated because the task felt simple enough to skip a step, since simplicity is itself an assessment the self-review process exists to verify rather than assume.

**When Step 3 reveals an unmet acceptance criterion.** The task is not presented as complete — it is either finished to meet the criterion, or the gap is reported explicitly per Chapter 31's G7, with the self-review report stating plainly which criterion remains unmet and why.

**When a post-submission correction reveals a defect the self-review process should have caught.** It is logged per Section 5, and Chapter 65's cadence uses the accumulated pattern to revise Section 2's procedure — a single miss is data, not yet evidence of a systemic gap, but a repeated pattern is treated as this chapter's own defect.

---

## 7. DO / DON'T

**Do** re-read the original briefing fresh, before re-running tests, per Section 3's sequencing.

**Do** report honestly what could and couldn't be verified, per Section 2 Step 6 and Chapter 31's G8.

**Don't** treat a passing test suite alone as sufficient evidence of completion — Step 1's brief-against-diff check catches what a test suite written against a drifted understanding cannot.

**Don't** skip or abbreviate any of Section 2's six steps because a task feels routine — the self-review process exists precisely to catch cases that felt routine but weren't.

---

## 8. ANTI-PATTERNS

**The confirmation-biased re-read.** An agent "re-reads" its own diff against the brief in Step 1, but does so already believing the work is correct, skimming for confirmation rather than genuinely checking for divergence. This is dangerous because it satisfies the letter of Section 2's procedure while defeating its purpose entirely — the step runs, but produces none of the actual verification it exists to provide. It is detected by Chapter 53's human reconciliation review finding a brief-diff mismatch the self-review report claimed to have checked. It is fixed by treating this specific failure pattern as a Chapter 65 debt-register entry against the self-review process itself, and by structuring Step 1 as an explicit, itemized comparison against Chapter 30's six briefing fields rather than a general impression-based re-read.

---

## 9. QUALITY ASSURANCE CHECKLIST

- [ ] Was the original briefing re-read fresh, before re-running tests, per Section 3's sequencing?
- [ ] Did the full, relevant test and lint suite run, not a subset chosen for convenience?
- [ ] Was every acceptance criterion checked individually and explicitly?
- [ ] Was the change checked against all eight of Chapter 31's guardrails, including intent, not only literal text?
- [ ] Does the self-review report state honestly what was and wasn't verified?
- [ ] Is a self-review report attached to this submission, per Section 5's completeness requirement?

---

## 10. CROSS REFERENCES

**Within this Constitution:** Chapter 1 (IP5, and the empirical-test model this chapter's own measurement mirrors). Chapter 4 (self-containment doctrine behind Section 4). Chapter 30 (the briefing fields Section 2 checks against). Chapter 31 (the guardrails Step 4 verifies). Chapter 49 (Quality Gates, whose checks Step 2 proactively runs). Chapter 53 (AI-Output Review Reconciliation, the human-side check this chapter's report feeds into). Chapter 65 (Continuous Improvement Workflow, closing the loop on Section 5's measurement).

**Within the five documents above this Constitution:** Design System Bible Chapter 61.

---

## 11. FUTURE EXPANSION

**Possible future additions.** A structured, machine-readable self-review report format (rather than free-form prose) is a plausible future addition once enough submissions exist to make the format's value, versus its added overhead, empirically clear — not adopted speculatively ahead of that evidence.

---

*End of Chapter 32. The next chapter, Human-AI Collaboration Model, specifies how work and context hand off between humans and agents, or between two agents, without loss.*
