# CHAPTER 27 — ERROR HANDLING IMPLEMENTATION STANDARD

**Trady Perch Product Implementation Constitution · Part V: State, Data & API Architecture**

**Inherited From:** Design System Bible Chapter 39 (Complete State Model), Chapter 47 (Error Handling & Recovery Design, in full), Chapter 48 (Form Validation & Feedback Patterns — Fv-1 "Cross-Field Validation Waits for Both Fields to Be Genuinely Complete," Fv-2 "Each Step Validates Before Advancing," Fv-3 "A Step Summary Always Names the Specific Field"); UX / Experience Blueprint Chapter 35 (Error & Recovery Flow Design). Chapter 26 (Error Handling Philosophy) is this chapter's direct premise.

---

## 1. INTRODUCTION

Chapter 26 fixed the two-axis taxonomy every error is classified against. This chapter is the literal code pattern: the typed error object that makes classification mandatory at compile time, the error-boundary placement that catches what individual handlers miss, the retry logic for recoverable errors, and the message-construction rules that keep every resulting user-facing string compliant with Design System Bible Chapter 47's tone standard and Chapter 48's field-level specificity.

---

## 2. THE TYPED ERROR OBJECT

Every error thrown or caught in application code is an instance of this codebase's own typed error class, never a raw string or an unclassified native exception left unwrapped. The typed error's constructor requires, as mandatory fields, both of Chapter 26 §2's classification axes, a machine-readable error code (used to look up its Er-1-compliant message template), and, where relevant, the specific field or resource the error concerns — the direct mechanism enforcing Chapter 26's own success criterion, since an error missing either axis fails to construct at all, a compile-time guarantee rather than a runtime hope.

A native exception crossing into this codebase from a third-party library — a network failure, a parsing error — is caught at the earliest possible point and wrapped into this typed error object immediately, never allowed to propagate further in its raw, unclassified form.

---

## 3. ERROR BOUNDARIES, LAYERED

Per Chapter 2's surface architecture, each app has a top-level error boundary catching anything no more specific boundary handled — the last resort preventing a blank screen or raw stack trace from ever reaching a user, this chapter's own success criterion stated as a code requirement. Beneath that, each feature folder per Chapter 8 may declare its own boundary, catching an error local to that feature without taking down the rest of the app around it — a Client Portal invoicing feature's error does not blank the entire dashboard if the boundary is correctly scoped to just that feature's region.

A component-level try/catch is used only for a genuinely local, recoverable error per Chapter 26's taxonomy — a fatal error is deliberately allowed to propagate up to its nearest boundary rather than caught and awkwardly suppressed in place, because a boundary's fallback UI is the correct, Er-1-compliant surface for a fatal error, not a component silently rendering nothing.

---

## 4. RETRY LOGIC FOR RECOVERABLE ERRORS

A recoverable, system-caused error — per Chapter 26 §2's cell — is retried automatically, with a bounded number of attempts and an exponential backoff, before ever surfacing to the user at all. Only once the retry budget is exhausted does the error surface, at which point it is re-evaluated: a retry-exhausted error may still be recoverable in the Er-2 sense (offering a manual retry action that preserves any already-entered work) even though automatic retry has given up. A recoverable, user-caused error — a validation failure — is never retried automatically, since automatic retry cannot resolve an error whose cause is the user's own input; it surfaces immediately with the specific correction needed, per Section 6.

---

## 5. PRESERVING ALREADY-ENTERED WORK

Er-2's guarantee — recovery never requires losing already-entered work — is implemented structurally: any form or multi-step flow's in-progress input is held in Chapter 22's client or URL state, never solely in a variable scoped to the specific request that failed. When an error boundary catches a fatal error inside a feature with in-progress user input, the boundary's fallback UI offers the recovery path without discarding that input, because the input's storage location was never coupled to the failed operation's own lifecycle in the first place.

---

## 6. MESSAGE CONSTRUCTION

Every user-facing error message is generated from the typed error's code (Section 2) through a single, shared message-template function — never hand-written inline at the point an error is displayed, which would risk drifting from Er-1 and Er-3's tone requirements per-instance. The template function selects its wording using Chapter 26's classification: a user-caused, field-specific error names the specific field per Fv-3's exact standard, extended here from multi-step forms to error messaging generally; a system-caused error never implies user fault, per Er-3, regardless of its underlying technical cause.

Per Fv-1 and Fv-2, a validation error that depends on more than one field waits until both fields are genuinely complete before evaluating, and a multi-step flow validates each step before allowing advancement — both direct implementation requirements this chapter's validation-error code path must satisfy, not merely the form-component layer's concern alone.

---

## 7. ENFORCEMENT & MEASUREMENT

This chapter's own success criterion — no unhandled exception ever reaches a user as a blank screen or raw stack trace — is verified by chaos/fault-injection testing per Chapter 47 (this Constitution's Testing Strategy chapter): a test suite deliberately triggers failures at each of Section 3's boundary layers and asserts that a correctly formatted, Er-1-compliant fallback renders every time, never a blank screen, never a raw stack trace exposed to the client. A lint rule flags any raw `throw` of a non-typed value, enforcing Section 2's mandatory wrapping. A second check flags any inline error-message string not routed through Section 6's shared template function.

---

## 8. BEHAVIORAL RULES

**When catching any error.** It is immediately wrapped into this chapter's typed error object per Section 2, with both classification axes set, before any further handling occurs.

**When an error boundary's fallback renders.** It always offers the most specific recovery action Chapter 26's classification permits — a retry, a correction prompt, or, for a genuinely fatal error, a clear next step — never a generic "something went wrong" with no path forward.

**When testing a new feature.** Chapter 47's fault-injection suite includes this feature's failure paths from the start, not added retroactively once a production incident reveals a gap.

---

## 9. DO / DON'T

**Do** wrap every native exception into this codebase's typed error object at the earliest possible point.

**Do** hold in-progress user input in state decoupled from the specific request that might fail, per Section 5.

**Don't** write an inline, hand-crafted error message at the display site — route every message through Section 6's shared template function.

**Don't** catch a fatal error locally and suppress it — let it propagate to its nearest error boundary, per Section 3.

---

## 10. ANTI-PATTERNS

**The swallowed exception.** A try/catch block that catches an error, logs it (or doesn't), and returns a default value or renders nothing, with no error boundary ever engaged and no message ever reaching the user. This is dangerous because it produces a UI that looks broken or silently incomplete with no diagnosable cause visible to either the user or, often, to whoever investigates later without the original log line in front of them. It is detected by Chapter 47's fault-injection suite, which specifically asserts that a fallback UI renders rather than merely that the app doesn't crash. It is fixed by removing the local suppression and allowing the error to propagate to its correctly scoped boundary per Section 3, or handling it explicitly per this chapter's full pattern if it's genuinely recoverable.

---

## 11. QUALITY ASSURANCE CHECKLIST

- [ ] Is every error, native or application-raised, wrapped into the typed error object with both classification axes set?
- [ ] Are error boundaries layered correctly per Chapter 8's feature folders, with a top-level boundary as the final fallback?
- [ ] Does a recoverable, system-caused error retry automatically with bounded, backed-off attempts before surfacing?
- [ ] Is in-progress user input preserved through any error per Section 5's decoupled-state requirement?
- [ ] Does every displayed message route through Section 6's shared template, with zero hand-written inline strings?
- [ ] Does Chapter 47's fault-injection suite cover this feature's failure paths?

---

## 12. CROSS REFERENCES

**Within this Constitution:** Chapter 2 (surface-level error-boundary placement). Chapter 8 (feature-folder scope for mid-level boundaries). Chapter 22 (state model Section 5 relies on). Chapter 26 (the taxonomy this chapter's typed error object enforces). Chapter 47 (Testing Strategy, running Section 7's fault-injection suite).

**Within the five documents above this Constitution:** Design System Bible Chapter 39, Chapter 47 (in full), Chapter 48; UX / Experience Blueprint Chapter 35.

---

## 13. FUTURE EXPANSION

**Documented limitations.** Section 4's retry-budget defaults (attempt count, backoff curve) are not yet fixed to specific numbers in this chapter, deferred to Chapter 36's performance-budget process so retry behavior is tuned against real, measured failure-rate data rather than an arbitrary starting guess.

---

*End of Chapter 27. The next chapter, Loading Strategy & Perceived Performance, specifies the visual and motion treatment for the waits this chapter's retry logic and Chapter 25's fetching layer both produce.*
