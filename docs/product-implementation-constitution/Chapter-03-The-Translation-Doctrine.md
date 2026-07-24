# CHAPTER 3 — THE TRANSLATION DOCTRINE

**Trady Perch Product Implementation Constitution · Part I: Implementation Philosophy**

**Inherited From:** Design System Bible §0.1 (Inheritance Protocol), Motion Bible §0.1, UX / Experience Blueprint §0.1, Brand Identity Manual §0.1 — the four sibling statements that each document above this Constitution already makes for its own domain. This chapter is Chapter 1's IP1 (Traceable Translation), formalized into an actual, checkable mechanism.

---

## 1. INTRODUCTION

Every document above this Constitution states, in its own opening chapter, that nothing in it may exist without a traceable origin. What none of them specify — because it isn't their job to — is the mechanism by which a decision made in prose becomes a decision made in code. A token value in the Design System Bible and a CSS custom property in a build pipeline are not automatically the same thing; they become the same thing only through a deliberate act of translation, and that act can be done carelessly, inconsistently, or not at all. This chapter specifies exactly how it is done correctly, every time.

This chapter exists because IP1 (Traceable Translation), stated as a principle in Chapter 1, is not yet a mechanism — a principle without a mechanism is a good intention that erodes the first time someone is in a hurry. Chapter 13 (Design Token Implementation), Chapter 14 (Motion Implementation Strategy), and every other chapter in Part III depend on this chapter existing first, because each of them is, structurally, nothing more than this chapter's method applied to one specific artifact type.

---

## 2. THE TRANSLATION UNIT

The mechanism this chapter specifies operates on a single, consistent unit: the **translation unit** — one upstream decision (a token, a curve, a flow step, a brand rule) mapped to exactly one downstream artifact (a variable, a function, a component prop, a test assertion). A translation unit is valid only when it satisfies all three of the following:

1. **A named origin.** The specific chapter and section of the upstream document the artifact translates — never "the design system" in general, always the precise citation.
2. **A named artifact.** The specific file, symbol, or configuration key the translation produces — never "handled in the styles somewhere."
3. **A verification method.** How a reviewer or a machine confirms the artifact still matches its origin — a visual regression snapshot, a unit test, a type check, or, at minimum, a manual review step named explicitly in the chapter governing that artifact type.

A mapping missing any of the three is not a translation unit; it is an unverified claim, and per IP2, is treated as unfinished work regardless of how correct it happens to look.

---

## 3. THE TRANSLATION LEDGER

Every chapter in Part III, and any other chapter that produces a code artifact directly from an upstream document, maintains a **translation ledger** — a table, kept beside the artifact it documents (in code comments, a generated manifest, or the chapter itself), listing every translation unit that chapter is responsible for. Appendix C of this Constitution is the aggregated, cross-document index of every chapter's ledger; an individual chapter's own ledger is the authoritative source, and Appendix C is a compiled view of it, never the reverse.

A ledger entry is added the moment a translation unit is created, and removed only through Chapter 66's Engineering Debt Register process if the artifact is deprecated — never silently deleted, because a silently deleted ledger entry is indistinguishable, to a future reader, from a translation that was never made carefully in the first place.

---

## 4. ORPHANS AND DUPLICATES

Two failure modes are named explicitly because they are the two ways a translation system decays even when every individual translation was done correctly at the time it was made.

**An orphan** is a code artifact with no corresponding ledger entry — a CSS value, a duration constant, a copy string that exists in the codebase but cannot be traced to any upstream chapter. An orphan is not automatically wrong in its actual value; it is wrong in its unverifiability, per IP1. It is resolved by either retroactively identifying its true origin and ledgering it, or, if no legitimate origin exists, removing it per Chapter 1's IP3.

**A duplicate translation** is two or more code artifacts independently translating the same upstream decision — two components each re-implementing the same motion curve from Motion Bible Chapter 14 with slightly different values, because neither author checked whether a translation already existed. A duplicate is more dangerous than an orphan, because both instances look individually legitimate; the drift between them is only visible when they are compared directly. It is resolved by consolidating to a single, shared artifact and updating every consumer, never by declaring one of the two "the real one" without also fixing the other's callers.

---

## 5. THE TRANSLATION PROCEDURE

When a new upstream decision needs a code artifact, the following procedure is followed, in order:

1. **Locate the precise origin** — the specific section, not the general chapter, per Chapter 1's IP1.
2. **Check the relevant chapter's existing ledger** for an artifact that already translates this origin, or one close enough that Chapter 1's IP3 (Restraint in Construction) requires it be considered first.
3. **If no existing artifact serves, create one**, choosing the artifact type the governing Part III (or other relevant) chapter specifies — a design token, a component prop, a configuration constant.
4. **Add the ledger entry** with all three required fields from Section 2, before the pull request introducing the artifact is considered complete.
5. **Attach a verification method** appropriate to the artifact — a snapshot test for a visual value, a type constraint for a structural value, a documented manual-review trigger for anything neither can cover.

---

## 6. ENFORCEMENT & MEASUREMENT

Per IP2: a linter or build-time check can, in principle, flag any token, duration, or copy string used in code with no corresponding ledger entry — this is Section 4's orphan check, made mechanical. Duplicate detection is harder to fully automate but partially achievable by flagging near-identical constant values defined in more than one place, escalated to human review rather than auto-resolved. Until both checks are wired into CI per Chapter 56, their absence is tracked as a Chapter 66 debt-register entry, not silently accepted as good enough.

---

## 7. BEHAVIORAL RULES

**Before writing an artifact.** Step 1–2 of Section 5 run first — origin located, existing ledger checked — never retrofitted after the code is written.

**During review.** A reviewer checks that any new constant, token, or copy value has a ledger entry per Chapter 54's checklist; a pull request introducing an orphan is treated the same as one introducing an untested code path.

**Under deadline pressure.** The ledger entry is not deferred "for later" — an artifact without one is, per Section 2, not a finished translation regardless of how correct its value is, and IP6 grants no exception for time pressure.

---

## 8. DO / DON'T

**Do** check the relevant chapter's ledger before defining a new constant, even one that feels obviously novel — most apparent novelty is an unrecognized duplicate.

**Do** cite the precise upstream section, not the general document, in every ledger entry — "Motion Bible Ch. 14" is insufficient where "Motion Bible §14.3, Standard-tier duration" is what IP1 actually requires.

**Don't** create a new token or constant and defer its ledger entry to "a follow-up cleanup PR." The follow-up rarely arrives, and per Section 2 the artifact is not a completed translation until the entry exists.

**Don't** resolve a duplicate by picking a survivor without updating every consumer of the discarded version — this converts one duplicate into a silent regression at every call site left unmigrated.

---

## 9. ANTI-PATTERNS

**Retroactive justification.** Writing code first, then searching for a plausible-sounding upstream citation to attach after the fact. This is dangerous because it produces a ledger that looks complete while carrying no actual traceability — the citation was never the reason for the decision, only a decoration added after review flagged its absence. It is detected by checking whether the cited section's actual text supports the specific value chosen, not merely its general topic. It is fixed by treating any ledger entry discovered this way as invalid and re-deriving the value honestly from its stated origin.

**Ledger rot.** A ledger entry that was accurate when written but never updated when the artifact it describes changed, so the ledger and the code silently diverge over time. It is detected by Chapter 62's periodic ADR and debt-register review sweeping for ledger entries whose cited value no longer matches the artifact's actual current value. It is fixed by updating the entry the same pull request that changes the artifact, never as a separately scheduled cleanup.

---

## 10. QUALITY ASSURANCE CHECKLIST

- [ ] Does every new constant, token, or copy string cite a precise upstream section, not a general chapter? *(IP1)*
- [ ] Does a ledger entry exist for it, with a named artifact and a stated verification method?
- [ ] Was the relevant chapter's ledger checked for an existing translation before a new one was created? *(IP3)*
- [ ] If this change modifies an existing artifact, was its ledger entry updated in the same change?

---

## 11. CROSS REFERENCES

**Within this Constitution:** Chapter 1 (IP1, IP2, IP3 — the principles this chapter operationalizes). Chapter 13 (Design Token Implementation), Chapter 14 (Motion Implementation Strategy), and the rest of Part III apply this chapter's procedure per artifact type. Chapter 56 (Continuous Integration Standard) is where Section 6's checks are wired into CI. Chapter 62 (Architecture Decision Record Standard) and Chapter 66 (Engineering Debt Register) govern ledger changes and gaps respectively. Appendix C is the aggregated ledger index.

**Within the five documents above this Constitution:** Design System Bible §0.1; Motion Bible §0.1; UX / Experience Blueprint §0.1; Brand Identity Manual §0.1.

---

## 12. FUTURE EXPANSION

**Possible future additions.** An automated ledger-generation tool that extracts entries directly from code comments, once the artifact volume makes manual ledger maintenance genuinely burdensome — not built preemptively, per IP3.

**Documented limitations.** Duplicate detection remains partially manual until a static-analysis tool capable of comparing semantic (not merely textual) similarity between constants exists; this is named here as an honest current limitation, not a solved problem.

---

*End of Chapter 3. The next chapter, The AI-Built Product Doctrine, extends IP5 from a single decision's self-containment to the operating model of the whole engineering organization.*
