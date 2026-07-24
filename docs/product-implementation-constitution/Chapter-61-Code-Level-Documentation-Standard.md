# CHAPTER 61 — CODE-LEVEL DOCUMENTATION STANDARD

**Trady Perch Product Implementation Constitution · Part XIII: Documentation Standards**

**Inherited From:** No direct upstream citation — a purely engineering-craft concern, as stated in this chapter's own scope. Chapter 60 (Documentation Philosophy) is this chapter's direct premise.

---

## 1. INTRODUCTION

Chapter 60 established the why-versus-what test. This chapter applies it at its strictest, most granular level: what belongs in a code comment, a README, or a type signature, and — the more consequential half of this chapter — what belongs in none of them, because well-named code per Chapter 9 already communicates it on its own.

---

## 2. WHAT BELONGS IN A CODE COMMENT

Exactly what Chapter 60 §2 permits: a hidden constraint (a specific browser quirk being worked around), a rejected alternative (why a simpler approach was tried and abandoned), or a non-obvious invariant (a value that must stay in sync with something not visible from the immediate code). A comment stating what a function does, when the function's own name and parameter types already state it, does not belong — this is the direct, literal application of this chapter's own success criterion: a linter can flag exactly this pattern.

---

## 3. WHAT BELONGS IN A README

A `packages/` or `apps/` folder's README, where one exists, states what a reader needs to know *before* reading the code — its purpose within Chapter 7's structure, and any setup step genuinely not inferable from the code itself. It does not restate the folder's internal structure if Chapter 8's colocation standard already makes that structure self-evident by convention, and it does not duplicate content Chapter 63's onboarding documentation already covers at the repository level — a per-folder README states only what's specific to that folder.

---

## 4. WHAT BELONGS IN A TYPE SIGNATURE

Per this Constitution's own emphasis on explicit, checkable structure (Chapter 1's IP2 and IP4), a type signature itself is documentation — a well-typed function's signature states its contract more reliably than a prose comment could, because a type signature is checked by the compiler and a comment is not. Where a type signature can express a constraint (a union of specific allowed values, a required versus optional field), it does so directly rather than deferring that information to a comment describing what the type "should" be but doesn't structurally enforce.

---

## 5. WHAT BELONGS NOWHERE

The specific, most common failure this chapter names: a comment restating a function's behavior in prose beside a well-named function whose signature already states the same thing. `// fetches the client's invoices` above a function named `fetchClientInvoices()` returning a typed `ClientInvoice[]` belongs nowhere — it satisfies Chapter 60 §2's "what" category exactly, adding no information a reader didn't already have from the code itself, and it becomes actively wrong the moment the function's behavior changes and the comment isn't updated to match, per Chapter 60 §4's staleness risk.

---

## 6. DOCUMENTATION VS. THE TRANSLATION LEDGER

Chapter 3's translation ledger is not, itself, prose documentation in this chapter's sense — it is structured, machine-checkable metadata (an origin citation, an artifact name, a verification method), held to Chapter 1's IP2 rather than to this chapter's why-versus-what test. Where a translation ledger entry and a code comment might seem to serve a similar purpose, the ledger entry is the authoritative, structured record; a comment additionally explaining *why* that specific translation was made the way it was (not merely citing its origin) may still pass Section 2's test independently, but the two are not redundant with each other by design.

---

## 7. ENFORCEMENT & MEASUREMENT

A lint rule, per this chapter's own success criterion, flags a comment whose content substantially overlaps with its adjacent function or variable name and type signature — a textual-similarity check between the comment and the identifier plus its type, flagging a high-overlap case for human confirmation rather than automatic deletion, since the check cannot fully distinguish a redundant "what" comment from a legitimately concise "why" comment that happens to share vocabulary with the code. Section 3's README scope is checked at review per Chapter 54's checklist, verifying a folder's README doesn't duplicate content Chapter 8's convention or Chapter 63's onboarding documentation already covers.

---

## 8. BEHAVIORAL RULES

**Before writing any code comment.** Chapter 60 §2's test is applied explicitly — if the comment would restate what the function's own name and type signature already convey, it is not written; the name or type is improved instead if the code itself isn't yet clear enough without one.

**When a type signature could express a constraint currently only stated in a comment.** The constraint is moved into the type system directly, per Section 4, and the now-redundant comment is removed.

**When writing a per-folder README.** Only content specific to that folder, not inferable from Chapter 7–8's conventions or already covered by Chapter 63, is included.

---

## 9. DO / DON'T

**Do** use a comment for a hidden constraint, a rejected alternative, or a non-obvious invariant.

**Do** express a constraint in the type system directly wherever possible, rather than only in a comment beside it.

**Don't** write a comment that restates what a well-named function and its type signature already state.

**Don't** duplicate repository-level onboarding content in a per-folder README — link to it instead.

---

## 10. ANTI-PATTERNS

**The narrating comment.** A function accumulates a comment above nearly every line, each restating in prose what the adjacent line of code already does, typically added under the belief that more comments signal more thoroughness or care. This is dangerous specifically because of Chapter 60 §4's staleness risk multiplied by volume — a function with ten narrating comments has ten places that can silently drift from the code the next time someone edits the logic without remembering to update every comment beside it, and a reader trusting the comments over the code is misled ten times over instead of once. It is detected by Section 7's lint rule flagging the pattern at scale. It is fixed by removing the narrating comments and, where the code's intent genuinely isn't clear from its structure alone, improving names and decomposition per Chapter 1's IP4 instead of compensating for unclear code with prose beside it.

---

## 11. QUALITY ASSURANCE CHECKLIST

- [ ] Does every comment explain a hidden constraint, rejected alternative, or non-obvious invariant, per Chapter 60 §2?
- [ ] Does the lint rule from Section 7 pass with zero flagged, unconfirmed redundant comments?
- [ ] Does every constraint expressible in the type system live there, rather than only in a comment?
- [ ] Does a per-folder README contain only content specific to that folder, with no duplication of Chapter 63's content?

---

## 12. CROSS REFERENCES

**Within this Constitution:** Chapter 1 (IP2, IP4). Chapter 3 §2 (translation ledger, distinguished in Section 6). Chapter 7–8 (structure a README doesn't need to restate, per Section 3). Chapter 9 (naming standard behind Section 5). Chapter 54 (review checklist enforcing Section 3). Chapter 60 (the philosophy this chapter applies strictly). Chapter 63 (onboarding documentation, the boundary Section 3 respects).

**Within the five documents above this Constitution:** None — purely an engineering-craft concern, as stated in this chapter's own front matter.

---

## 13. FUTURE EXPANSION

**Documented limitations.** Section 7's lint rule cannot fully distinguish a redundant comment from a legitimately concise "why" comment sharing vocabulary with its code — it flags for human confirmation rather than auto-removing, an honest limitation of textual-similarity detection rather than a claim of perfect automated judgment.

---

*End of Chapter 61. The next chapter, Architecture Decision Record Standard, specifies how a significant, hard-to-reverse decision is recorded — the "why"-native documentation type Section 6 already distinguishes from an ordinary comment.*
