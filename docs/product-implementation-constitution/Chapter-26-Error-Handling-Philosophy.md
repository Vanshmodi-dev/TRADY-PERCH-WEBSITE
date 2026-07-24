# CHAPTER 26 — ERROR HANDLING PHILOSOPHY

**Trady Perch Product Implementation Constitution · Part V: State, Data & API Architecture**

**Inherited From:** Design System Bible Chapter 47 (Error Handling & Recovery Design — Er-1 "Every Error States What Happened, Why, and What to Do Next," Er-2 "Recovery Never Requires Losing Already-Entered Work," Er-3 "Errors Are Never Attributed to the User's Mistake in Tone"); Master Vision Document §2.2 (the Composed brand trait). Chapter 23 (API Integration Philosophy) is this chapter's direct premise.

---

## 1. INTRODUCTION

Design System Bible Chapter 47 specifies what an error looks and reads like once it reaches a user — composed, specific, recoverable without data loss. This chapter specifies what happens before that: how an error is classified the moment it occurs, so that the correct handling path — and the correct Er-1-compliant message — can be selected mechanically rather than improvised per error site. An error with no classification cannot be handled correctly, because correct handling depends entirely on knowing which category it belongs to.

---

## 2. THE TWO-AXIS TAXONOMY

Every error in this codebase is classified along two independent axes at the moment it's caught, never left ambiguous:

**Recoverable versus fatal.** A recoverable error is one the current operation can retry, fall back from, or otherwise continue past without losing the user's place — Er-2's "no lost work" guarantee depends on correctly identifying which errors qualify. A fatal error is one no retry or fallback can resolve within the current session — a genuinely broken required resource, an unrecoverable data-integrity conflict — and requires a different handling path entirely, specified in Chapter 27.

**User-caused versus system-caused.** A user-caused error originates from invalid input or an action the interface should have prevented but didn't — a validation failure, a request for a resource that no longer exists. A system-caused error originates from this product's own failure — a backend outage, an unhandled exception, a Chapter 24 contract violation. This axis determines Er-3's tone requirement directly: a system-caused error is never phrased in a way that implies the user did something wrong, because per Master Vision §2.2's Composed trait, a brand that blames its own visitor for its own failure contradicts the calm, capable register that trait requires.

Every error therefore falls into exactly one of four cells: recoverable/user-caused (a form validation failure), recoverable/system-caused (a transient network failure, retried automatically), fatal/user-caused (a request for a permanently deleted resource), fatal/system-caused (an unrecoverable backend failure). No error is left unclassified on either axis — an error that resists classification is, per this chapter's own success criterion, treated as a bug in the error-handling code itself, not an acceptable ambiguity.

---

## 3. WHY CLASSIFICATION PRECEDES MESSAGING

Design System Bible Er-1 requires every error to state what happened, why (if known), and what to do next. The "what to do next" component is entirely dependent on this chapter's taxonomy: a recoverable error's "what to do next" is a specific retry or correction action; a fatal error's is a different, more final path (contact support, return to a known-good state). Writing an Er-1-compliant message without first knowing which cell of Section 2's taxonomy an error occupies is, in practice, impossible to do correctly — the message would either overpromise recovery that isn't actually available, or underserve a user facing an error the interface could have resolved automatically.

---

## 4. THE COMPOSED TRAIT AS THE TONE CONSTRAINT

Master Vision §2.2's Composed trait — calm, capable, never flustered — is this chapter's direct source for Er-3's tone rule, generalized: no error message, regardless of its Section 2 classification, is permitted to read as alarmed, apologetic to an excessive degree, or blaming. A system-caused, fatal error is still delivered with the same composure as a recoverable, user-caused validation message — the severity of the underlying problem changes what a message says, per Er-1, but never how composed it sounds saying it.

---

## 5. ENFORCEMENT & MEASUREMENT

Section 2's classification is enforced structurally by Chapter 27's typed error object, specified fully in the next chapter: a typed error's constructor requires both axis values as mandatory fields, making an unclassified error a type error at build time rather than a runtime ambiguity discovered later. This is the direct mechanism behind this chapter's own success criterion — an uncategorized error cannot compile, let alone ship.

---

## 6. BEHAVIORAL RULES

**When catching any error, anywhere in the codebase.** Both axes of Section 2's taxonomy are determined immediately, at the catch site, where the most context about the error's actual origin exists — never deferred to a generic top-level handler that has already lost the specific context needed to classify it correctly.

**When an error's classification is genuinely unclear.** It defaults to the more conservative cell — fatal over recoverable, system-caused over user-caused — per the same reasoning Chapter 25 §4 applies to cache invalidation: an error treated as more severe than it actually is produces an unnecessary but safe fallback path; an error treated as less severe than it actually is risks Er-2's data-loss guarantee.

**When writing the resulting user-facing message.** Design System Bible Er-1 and Er-3 are applied directly, using the classification from Section 2 to determine which "what to do next" template Chapter 27 provides is correct for this specific error.

---

## 7. DO / DON'T

**Do** classify every caught error on both axes at the point it's caught, using the specific context available there.

**Do** default to the more conservative classification when genuinely uncertain, per Section 6.

**Don't** write a user-facing error message before knowing its Section 2 classification — the message's "what to do next" component depends entirely on it.

**Don't** phrase a system-caused error in language that implies user fault, regardless of how the underlying failure actually occurred.

---

## 8. QUALITY ASSURANCE CHECKLIST

- [ ] Is every caught error classified on both the recoverable/fatal and user-caused/system-caused axes?
- [ ] Does the resulting user-facing message's "what to do next" component match its actual classification?
- [ ] Is a system-caused error's tone as composed as a user-caused one, per Er-3 and Master Vision §2.2?
- [ ] Where classification was genuinely uncertain, was the more conservative cell chosen per Section 6?

---

## 9. CROSS REFERENCES

**Within this Constitution:** Chapter 23 (the integration boundary where many classified errors originate). Chapter 27 (Error Handling Implementation Standard, the typed error object enforcing this chapter's taxonomy). Chapter 25 §4 (the conservative-default reasoning Section 6 mirrors).

**Within the five documents above this Constitution:** Design System Bible Chapter 47 (in full); Master Vision §2.2.

---

## 10. FUTURE EXPANSION

**Documented limitations.** Section 2's two-axis model assumes an error's cause is determinable at catch time; a genuinely ambiguous failure (a timeout that could be either a transient network issue or a genuine backend outage) relies on Section 6's conservative-default rule rather than perfect classification, which this chapter treats as an acceptable, honest limitation rather than a solved problem.

---

*End of Chapter 26. The next chapter, Error Handling Implementation Standard, fixes this taxonomy into the actual typed error object and recovery code pattern.*
