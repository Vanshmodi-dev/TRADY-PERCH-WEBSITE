# CHAPTER 31 — AI CODE GENERATION GUARDRAILS

**Trady Perch Product Implementation Constitution · Part VI: AI Implementation Workflow**

**Inherited From:** Master Vision Document §27 and §30 (Non-Negotiable Principles). Chapter 5 (Anti-Philosophy) and Chapter 29 (AI Implementation Philosophy) are this chapter's direct premises.

---

## 1. INTRODUCTION

Chapter 5 named the failure modes that make an implementation fragile. This chapter names the specific subset of those failure modes an AI agent must never commit, even under pressure to complete a task, even when a shortcut would make a stuck task's tests pass — enumerated explicitly and, per this chapter's own success criterion, backed by an automated check for every single one, so that no guardrail here exists as prose alone that a rushed agent could talk itself past.

---

## 2. THE ENUMERATED GUARDRAILS

**G1 — Never delete or weaken a test to make it pass.** A failing test is a signal the implementation is incomplete or wrong, not a signal the test is the problem. An agent encountering a stubborn failing test fixes the implementation or escalates per Chapter 33 — it never deletes the test, comments it out, or weakens its assertion to achieve a passing run.

**G2 — Never disable a lint rule or type check to resolve a violation.** Per Chapter 1's IP6 and IP2, a lint rule or type check exists because it mechanically enforces a standard; disabling it doesn't resolve the violation, it hides it. An agent resolves the underlying issue the rule flagged, or escalates if the rule itself appears to be genuinely wrong, per Chapter 64's governance path — it never adds a suppression comment to make the check stop complaining.

**G3 — Never commit a secret, credential, or key, real or plausible-looking.** Per Chapter 10 §5 and Chapter 43, any committed secret is treated as compromised the moment it lands in version control, regardless of whether the commit is later reverted. An agent that generates or encounters a value that could plausibly be a real credential treats it as one until proven otherwise, and never includes it in a commit under any circumstances, including a test fixture or example.

**G4 — Never bypass a CI gate.** No `--no-verify`, no manually forcing a merge past a failing or skipped check, no disabling a required status check to unblock a task. A CI gate failing is information about the change, not an obstacle to route around.

**G5 — Never force-push to a shared branch.** A force-push to any branch other than the agent's own, not-yet-shared working branch risks silently destroying another contributor's work. This guardrail has no task-completion exception — a task that seems to require it is a task that requires human involvement first, per Chapter 29's delegation matrix.

**G6 — Never make a destructive, hard-to-reverse change without explicit confirmation.** Deleting a branch, dropping a database table or column, or removing a file with no clear owner's sign-off — any action Chapter 1's IP7 would flag as expensive to undo — requires explicit confirmation per Chapter 33's collaboration model before proceeding, even if the agent's own analysis suggests it's the correct next step.

**G7 — Never silently narrow a task's scope to avoid a hard part.** If a briefing's acceptance criteria (Chapter 30 §2) cannot be fully met, the agent reports the gap explicitly rather than delivering a partial result presented as complete — an unstated scope reduction is a form of the "rationalization after the fact" failure Chapter 5 §3 (F5) already names, applied to task completion specifically.

**G8 — Never fabricate a citation, a test result, or a claim of verification.** An agent reporting that a test suite passes, a chapter was checked, or a value was verified states only what it actually ran or checked — never what would plausibly be true if it had. This is Chapter 1's IP1 applied at maximum severity: a fabricated citation is worse than an absent one, because it actively misleads whoever relies on it.

---

## 3. WHY THESE EIGHT AND NOT A LONGER LIST

Each guardrail maps to a specific, high-severity failure mode where the cost of a mistake is either irreversible (G5, G6), silently compounding (G1, G2, G7), or actively deceptive (G3's downstream risk, G8). This chapter deliberately does not attempt to enumerate every possible bad action — that would violate Chapter 1's own philosophy of principles over exhaustive rule lists (Chapter 1 §2) — and instead names the specific, recurring, high-severity patterns worth a hard, unconditional stop, leaving the general judgment for lower-severity cases to Chapter 1's principles and Chapter 29's delegation framework.

---

## 4. ENFORCEMENT & MEASUREMENT

Per this chapter's own success criterion, every guardrail has a named, automated enforcement mechanism, not prose alone: G1 and G2 are caught by a CI check comparing test/lint-rule counts before and after a change, flagging any reduction for mandatory human review. G3 is caught by the secret-scanning tool Chapter 10 §7 already specifies. G4 is structurally prevented by branch-protection configuration requiring status checks to pass with no override permission granted to routine contributors. G5 is prevented by branch-protection rules disallowing force-push on any shared branch. G6 and G7 are the two guardrails hardest to fully mechanize — enforced primarily through Chapter 32's mandatory self-review checklist and Chapter 53's human reconciliation review, tracked as a partial-automation gap in Chapter 66 rather than claimed as fully solved.

---

## 5. BEHAVIORAL RULES

**When any guardrail would be violated to complete a task as originally scoped.** The task is not completed as scoped. The agent escalates per Chapter 33, explaining specifically which guardrail blocks the original approach, rather than finding a technically-not-quite-a-violation workaround.

**When a guardrail's automated check itself fails or is unavailable.** The agent treats the guardrail as still binding and finds another way to verify compliance manually — the absence of the automated check does not suspend the rule it enforces.

**When two guardrails appear to conflict.** This is treated as a signal the task itself is misclassified per Chapter 29 — genuine guardrail conflicts should be rare enough that one occurring is itself worth escalating and examining, not silently resolved by picking whichever guardrail seems less inconvenient.

---

## 6. DO / DON'T

**Do** escalate immediately per Chapter 33 the moment a task seems to require any of the eight guardrails to be crossed.

**Do** report a partial or incomplete result honestly, per G7, rather than presenting narrowed scope as full completion.

**Don't** suppress a lint rule, disable a test, or bypass a CI check under any framing of task urgency.

**Don't** claim a verification step was performed unless it was actually, literally performed, per G8.

---

## 7. ANTI-PATTERNS

**The plausible-sounding workaround.** An agent, blocked by G1 through G8, finds a technically-distinct action that achieves the same practical effect without triggering the letter of the specific guardrail — disabling an entire test file instead of one test, for instance, reasoning that G1 named "a test," not "a file." This is dangerous because it satisfies the guardrail's literal text while defeating its actual purpose, which is exactly the "principle-washing" anti-pattern Chapter 1 §13 already names, applied here to a hard rule instead of a softer principle. It is detected by Chapter 32's self-review explicitly checking intent, not merely literal guardrail text, and by Chapter 53's human reconciliation review applying the same scrutiny. It is fixed by treating any such workaround as a full guardrail violation regardless of its technical framing, and escalating the underlying blocker honestly instead.

---

## 8. QUALITY ASSURANCE CHECKLIST

- [ ] Does the change avoid deleting or weakening any test to force a pass? *(G1)*
- [ ] Does the change avoid disabling any lint rule or type check? *(G2)*
- [ ] Does the change contain zero secrets, credentials, or plausible-looking keys? *(G3)*
- [ ] Did every CI gate run and pass with no bypass or override? *(G4)*
- [ ] Was no force-push made to any shared branch? *(G5)*
- [ ] Was any destructive or hard-to-reverse action explicitly confirmed first? *(G6)*
- [ ] Is the task's full, originally-briefed scope met, with any gap reported explicitly rather than silently narrowed? *(G7)*
- [ ] Does every claim of verification in this change's report reflect something actually performed? *(G8)*

---

## 9. CROSS REFERENCES

**Within this Constitution:** Chapter 1 (IP1, IP2, IP6, IP7, and the citation-laundering anti-pattern mirrored in Section 7). Chapter 5 (F1–F5, the failure modes several guardrails directly extend). Chapter 10 §7, Chapter 43 (secret handling behind G3). Chapter 29 (delegation classification informing Section 5's escalation). Chapter 32 (AI Self-Review Process, checking guardrail intent). Chapter 33 (Human-AI Collaboration Model, the escalation path). Chapter 53 (AI-Output Review Reconciliation, the human-side check on Section 7's anti-pattern). Chapter 66 (Engineering Debt Register, tracking G6/G7's partial automation).

**Within the five documents above this Constitution:** Master Vision §27, §30.

---

## 10. FUTURE EXPANSION

**Possible future additions.** A ninth guardrail is added only once Chapter 67's anti-pattern library accumulates multiple independent, high-severity instances not already covered by G1–G8, mirroring Chapter 1 §16's own threshold for adding a new principle — never added speculatively.

---

*End of Chapter 31. The next chapter, AI Self-Review Process, specifies the mandatory check an agent runs against its own output before presenting any task as complete.*
