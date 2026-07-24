# CHAPTER 19 — ASSISTIVE TECHNOLOGY TESTING PROTOCOL

**Trady Perch Product Implementation Constitution · Part IV: Accessibility & Inclusive Engineering**

**Inherited From:** Design System Bible Chapter 53 (Accessibility Standards Deep Specification), Chapters 42–44 (Keyboard, Touch & Gesture, Cursor & Pointer Behavior). Chapter 18 (Accessibility Implementation Standard) is this chapter's direct premise — specifically its Layer 3, deferred there and specified here in full.

---

## 1. INTRODUCTION

Chapter 18's Layer 1 and Layer 2 catch what a machine can detect: missing attributes, contrast failures, structural violations. Neither catches whether a screen-reader user can actually understand and complete a real task, or whether a keyboard-only user's path through a flow is merely technically operable rather than genuinely usable. This chapter specifies the manual protocol that catches that gap — run by a human, on a fixed cadence, against real assistive technology rather than a simulated approximation of it.

---

## 2. WHAT IS TESTED

**Screen-reader walkthroughs**, using real screen-reader software (not a browser's accessibility-tree inspector alone), against every flow named P0 or P1 in UX / Experience Blueprint Chapter 31's flow-priority model. The tester follows the flow exactly as a screen-reader-dependent user would, with no visual reference, and records whether the flow is genuinely completable, not merely whether individual elements announce correctly in isolation.

**Keyboard-only task completion**, using no pointing device at all, against the same P0/P1 flow set, verifying not only that every interactive element is reachable (Chapter 18's Layer 1 already checks this structurally) but that the tab order, focus management on route or modal transitions, and any keyboard shortcut actually produces a coherent, efficient path through the task — a quality judgment automated testing cannot make.

**Touch and gesture verification**, per Chapter 43's touch standard, run on real touch hardware against the Client Portal and Marketing Site's mobile breakpoint, checking that touch targets, gesture conflicts, and any custom gesture pattern remain usable for a user with limited fine motor control, not only for a tester with an able-bodied, fast-tapping thumb.

---

## 3. THE CADENCE

Every P0 and P1 flow, per UX / Experience Blueprint Chapter 31's priority model, receives a full pass of Section 2's protocol at least once per release cycle, per Chapter 58's release definition — not only when a flow is newly built, and not only when a specific bug report prompts it. A flow that has not been manually tested within the current release cycle is, per this chapter's own success criterion, treated as untested regardless of how long ago its last passing result was recorded, because a passing result from two release cycles ago carries no guarantee against regressions introduced since.

---

## 4. RECORDING RESULTS

Every test run is recorded with a date, the specific flow tested, the specific assistive technology and version used, and a pass/fail result with enough detail that a failure is immediately actionable by whoever picks it up next — never a bare "failed," which per Chapter 1's IP5 fails the self-containment standard for whoever reads the record without having been present for the test. A failure is filed as a defect through the same process any other bug follows, with Chapter 18's non-negotiable-floor framing applied to its priority — an accessibility defect from this protocol is never triaged as lower priority solely because it wasn't caught by an automated gate.

---

## 5. ENFORCEMENT & MEASUREMENT

This chapter's protocol is inherently manual and cannot itself be automated — that is precisely its reason for existing alongside Chapter 18's automated layers, not a gap to apologize for. What is mechanically checkable is the cadence itself: a dashboard or report, generated from Section 4's recorded results, flags any P0/P1 flow whose most recent recorded test falls outside the current release cycle, making a stale or missing test visible rather than silently assumed to still hold.

---

## 6. BEHAVIORAL RULES

**Before a release ships.** Chapter 49's quality-gate sequence checks that every P0/P1 flow has a current-cycle passing record per Section 3 — a release with a stale or missing record for a P0 flow does not proceed, mirroring Chapter 18's automated-gate severity for what is, here, a manually-verified floor instead.

**When a new P0 or P1 flow is introduced.** It enters this chapter's testing cadence from its first release cycle, not deferred to "once it's stabilized" — a flow important enough to be named P0 or P1 is important enough to be tested this way from the start.

**When Chapter 18's automated layers and this chapter's manual protocol disagree** — an automated pass on a flow this protocol found genuinely difficult to use. The manual result is treated as authoritative, per Section 1's own framing that this protocol exists specifically to catch what automation cannot.

---

## 7. DO / DON'T

**Do** test with real assistive technology, not a browser's accessibility-tree inspector as a stand-in for it.

**Do** record a failure with enough specific detail that another engineer, with no memory of the test session, can act on it directly.

**Don't** let a P0 or P1 flow's manual test record go stale across a release cycle — re-test it, even if nothing about the flow appears to have changed, since a shared component's regression can silently affect it.

**Don't** treat a defect found through this protocol as lower priority than one caught by Chapter 18's automated gate — both are the same non-negotiable floor, caught by different mechanisms.

---

## 8. ANTI-PATTERNS

**The stale green checkmark.** A flow's manual test record from several release cycles ago is treated as still valid because nothing about that specific flow was intentionally changed, ignoring that a shared component or token change elsewhere in the system can silently regress it. This is dangerous because it produces false confidence — the record shows a pass, and no one checks its date closely enough to notice it no longer reflects the current build. It is detected by Section 5's cadence dashboard flagging the record's staleness directly. It is fixed by re-running the protocol every release cycle regardless of whether the specific flow was a stated target of recent work.

---

## 9. QUALITY ASSURANCE CHECKLIST

- [ ] Does every P0/P1 flow have a manual test record dated within the current release cycle?
- [ ] Was the screen-reader walkthrough performed with real assistive technology, following the flow exactly as a dependent user would?
- [ ] Was keyboard-only completion verified as genuinely usable, not only technically reachable?
- [ ] Is every recorded failure specific and actionable enough for a different engineer to resolve without further context?
- [ ] Does Chapter 49's release gate block on any stale or missing P0/P1 record?

---

## 10. CROSS REFERENCES

**Within this Constitution:** Chapter 1 (IP5, IP6). Chapter 18 (Layer 1 and Layer 2, which this chapter's Layer 3 completes). Chapter 43 (Touch & Gesture) and Chapter 44 (Cursor & Pointer), governing Section 2's touch verification. Chapter 49 (Quality Gates Standard, incorporating Section 6's release-blocking check). Chapter 58 (Release & Versioning Standard, defining the release cycle Section 3 measures against).

**Within the five documents above this Constitution:** Design System Bible Chapter 53, Chapters 42–44; UX / Experience Blueprint Chapter 31 (flow-priority model).

---

## 11. FUTURE EXPANSION

**Documented limitations.** This protocol currently assumes a small enough set of P0/P1 flows to be fully re-tested manually every release cycle. Should that set grow substantially, a risk-based sampling strategy may become necessary — introduced only once Section 3's full-coverage cadence is actually shown insufficient in practice, per Chapter 1's IP3, not adopted preemptively.

---

*End of Chapter 19. The next chapter, Internationalization Implementation, specifies the technical scaffolding for a need Trady Perch's current single-market scope hasn't yet required.*
