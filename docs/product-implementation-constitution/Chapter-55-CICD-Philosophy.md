# CHAPTER 55 — CI/CD PHILOSOPHY

**Trady Perch Product Implementation Constitution · Part XII: CI/CD & Deployment**

**Inherited From:** No direct upstream citation — a purely engineering-operations discipline, as stated in this chapter's own scope. Chapter 49 (Quality Gates Standard) is this chapter's direct premise.

---

## 1. INTRODUCTION

Chapter 49 fixed the gate sequence a change passes through. This chapter fixes the philosophy governing how often, and in what size, changes move through that sequence toward a running product: small and frequent, over large and infrequent, because Chapter 1's IP7 reversibility bias applies to deployment cadence exactly as it applies to any other implementation decision, and a deployment is, in the end, just another decision with a cost of being wrong.

---

## 2. WHY SMALL AND FREQUENT

A small, frequent change is cheaper to reason about, cheaper to review per Chapter 52's response-time expectation, and — the property most load-bearing for this chapter specifically — cheaper to roll back per Chapter 59, because a small change's blast radius is inherently narrower than a large one's. A large, infrequent release batches many changes together, and when something in that batch causes a regression, isolating which specific change caused it is measurably harder than it would have been had each change shipped and been verified independently. This is not a claim that large changes are never necessary — Chapter 1's IP3 already carves out foundational, anticipated-carefully decisions as a legitimate exception to a general small-steps default — it is a claim about the *default*, which favors small and frequent unless a specific reason justifies otherwise.

---

## 3. REVERSIBILITY AS THE CENTRAL DESIGN CRITERION

Every stage of this Part — Chapter 56's integration pipeline, Chapter 57's deployment workflow, Chapter 58's release process — is designed, first, around the question "how quickly and cleanly can this be undone if it turns out wrong," per Chapter 1's IP7, before being designed around how quickly it can ship something new. A deployment mechanism that optimizes purely for shipping speed at the expense of rollback speed has optimized the wrong variable, because the actual cost this Part exists to minimize is the cost of a bad change reaching, and remaining in front of, a real user or client.

---

## 4. EVALUATING A PROPOSED CHANGE TO THIS PHILOSOPHY

A proposal to batch releases, skip a pipeline stage, or otherwise deviate from Section 2's small-frequent default is evaluated against two explicit questions, per this chapter's own success criterion: does the proposal make a bad change more or less expensive to detect, and does it make a bad change, once detected, more or less expensive to undo? A proposal that improves shipping speed while measurably worsening either answer is not adopted merely because it "feels more efficient" — Chapter 1's IP6 and IP7 both outrank a raw efficiency argument here, exactly as they outrank a raw convenience argument elsewhere in this Constitution.

---

## 5. ENFORCEMENT & MEASUREMENT

This chapter's own success criterion is checked at the point any change to Chapter 56 or Chapter 57's actual pipeline configuration is proposed — the proposal is required to state its answer to Section 4's two questions explicitly, mirroring Chapter 35 §6 and Chapter 42 §6's design-time-statement pattern, before the configuration change is approved through Chapter 64's governance process.

---

## 6. BEHAVIORAL RULES

**When deciding how to size a change before it ships.** Section 2's small-frequent default applies unless Chapter 1 §3's IP3 exception (a genuinely foundational, anticipated-carefully decision) specifically justifies batching it with other changes.

**When a pipeline or deployment mechanism change is proposed.** Section 4's two questions are answered explicitly and in writing before the change is adopted.

**When shipping speed and rollback speed are in tension for a specific mechanism design.** Section 3's stated priority — rollback speed first — resolves the tension, not an ad hoc judgment call made differently each time it arises.

---

## 7. DO / DON'T

**Do** default to small, frequent changes, reserving batching for the specific, justified exception Chapter 1 §3 carves out.

**Do** design every deployment mechanism around rollback speed first, shipping speed second.

**Don't** adopt a pipeline change that improves shipping speed while worsening detection or rollback cost, without an explicit justification against Section 4's two questions.

**Don't** treat this chapter's philosophy as optional for a change that "feels safe enough to batch" — the evaluation in Section 4 is run regardless of how safe a specific case feels.

---

## 8. QUALITY ASSURANCE CHECKLIST

- [ ] Does this change default to small and frequent, or does a stated, IP3-consistent reason justify batching it?
- [ ] Was any proposed pipeline or deployment mechanism change evaluated against Section 4's two questions explicitly?
- [ ] Does the mechanism design prioritize rollback speed at least as highly as shipping speed, per Section 3?

---

## 9. CROSS REFERENCES

**Within this Constitution:** Chapter 1 (IP3, IP6, IP7 — the principles this chapter's entire stance derives from). Chapter 35 §6, Chapter 42 §6 (the design-time-statement pattern Section 5 mirrors). Chapter 49 (the gate sequence this Part's cadence moves changes through). Chapter 52 (review response-time expectations, served by small changes). Chapter 56 (Continuous Integration Standard, the literal pipeline). Chapter 57 (Deployment Workflow Standard). Chapter 58 (Release & Versioning Standard). Chapter 59 (Incident Response & Rollback Protocol, the direct beneficiary of Section 3's priority). Chapter 64 (governance process for Section 5's pipeline changes).

**Within the five documents above this Constitution:** None — purely an engineering-operations discipline, as stated in this chapter's own front matter.

---

## 10. FUTURE EXPANSION

**Documented limitations.** Section 4's evaluation remains qualitative; a more quantitative model (expected cost of a regression × its detection/rollback time) is a plausible future refinement once enough real incident data exists per Chapter 59 to calibrate one meaningfully.

---

*End of Chapter 55. The next chapter, Continuous Integration Standard, fixes this philosophy into the literal, staged pipeline.*
