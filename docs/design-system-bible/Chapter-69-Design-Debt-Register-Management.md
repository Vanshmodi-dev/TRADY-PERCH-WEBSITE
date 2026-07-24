# CHAPTER 69 — DESIGN DEBT REGISTER & MANAGEMENT

**Trady Perch Design System Bible · Volume VI: Quality, Governance & Evolution**

**Inherited From:** Design System Bible Chapter 65 (Gov-4, blast-radius tiering), Chapter 66 (lifecycle), Chapter 67 (contribution process). Every chapter's own Section 16 ("Documented Limitations").

---

## 1. INTRODUCTION

Every real system accumulates debt. The difference between a system that stays trustworthy and one that quietly erodes is whether that debt is tracked and visible or invisible and denied. This chapter formalizes the former — and, unusually for a chapter this late in the Bible, it opens with real content rather than only a governance framework, because the preceding sixty-eight chapters already generated genuine, specific debt items in their own Section 16 entries.

This chapter depends on Chapter 65's tiering model and Chapter 66's lifecycle directly. It is depended on by Chapter 70 (Component Evolution & Case Studies), which documents debt that was successfully resolved.

---

## 2. PHILOSOPHY

The rejected alternative is treating each chapter's "Documented Limitations" section as sufficient on its own — technically true, since the limitation is genuinely documented, but practically insufficient, since sixty-eight scattered limitation notes with no consolidated tracking mechanism are easy to individually read and collectively forget. This chapter turns prose limitations into a trackable, prioritized register.

---

## 3. CORE PRINCIPLES

### Dd-1 — Every Documented Limitation Becomes a Register Entry

**Purpose.** Any "Documented Limitation" or "Documented Assumption" named in a chapter's Section 16 is entered into this chapter's register (Section 4) as a trackable item, not left as prose a reader might or might not act on.

**Reasoning.** Descends from Principle 1: an item that exists only as prose in a chapter most contributors won't re-read is functionally untracked, however carefully it was originally worded.

**When it applies.** To every Section 16 limitation across the Bible. **When it does not apply.** No exception.

### Dd-2 — Debt Is Prioritized by Blast Radius

**Purpose.** Register entries are prioritized using Chapter 65's Gov-4 tiering (Routine/Structural/Foundational) — a Foundational-tier debt item (affecting many downstream chapters) is addressed before a Routine one, all else equal.

**Reasoning.** Direct reuse of Chapter 65's already-established tiering, per Principle 7, rather than inventing an independent priority scheme.

**When it applies.** To the ongoing prioritization of this register. **When it does not apply.** No exception.

### Dd-3 — Resolution Is Logged With the Same Rigor as Creation

**Purpose.** When a debt item is resolved, the resolution is recorded — what changed, in which chapter, and why — with the same specificity Dd-1 requires for the item's creation.

**Reasoning.** Descends from Chapter 64's Vs-3 release-note discipline applied to debt resolution specifically.

**When it applies.** To every resolved item. **When it does not apply.** No exception.

---

## 4. COMPLETE DESIGN SPECIFICATION — THE REGISTER (AS OF THIS WRITING)

**[Structural] The piecemeal Radius scale.** Chapters 18, 19, and 27 each populated a Core radius value (`md` 10px, `lg` 16px, `full` pill) as the specific component in each chapter needed it, rather than Chapter 6 or Chapter 9 defining a complete scale upfront as Chapter 2 originally assigned. *Status: open.* *Resolution path: consolidate into a dedicated Radius section within Chapter 9 the next time that chapter is substantially revised.*

**[Routine] Chapter 15's motion values are unvalidated against real interaction.** The five-tier durations and three easing curves are this Bible's first-canonical proposal, reasoned from Master Vision's qualitative descriptions rather than tested against built interaction. *Status: open.* *Resolution path: validate against the first real, built intro sequence and component interactions; revise values through Chapter 2's lifecycle if testing reveals miscalibration.*

**[Structural] Chapter 32's `slate.500` is unverified against a real rendered chart.** Introduced under full T-1/T-2 discipline but not yet checked against actual chart output. *Status: open.* *Resolution path: verify at the first real case-study chart build.*

**[Foundational] Chapter 65's Gov-5 unanimous-consent model is untested against a genuine multi-way deadlock.** Chapter 1, Section 16's own open research question. *Status: open, monitored.* *Resolution path: no action until a real deadlock occurs; revisit Gov-5 if one does.*

**[Routine] Chapter 54's RTL mirroring (In-3) is specified but not implemented.** *Status: open, deliberately deferred.* *Resolution path: implement only when a genuine RTL-language market is targeted, per that chapter's own Section 16.*

---

## 5. MEASUREMENTS

Open register items as of this writing: 5, spanning 1 Foundational, 3 Structural/Routine mix, tracked per Dd-2's tiering.

---

## 6. BEHAVIORAL RULES

**Whenever a new chapter is drafted or revised.** Check its Section 16 for new limitations and add them to this register per Dd-1. **Whenever a register item is resolved.** Log the resolution per Dd-3 before marking it closed.

---

## 7–10. MOTION / ACCESSIBILITY / RESPONSIVE / AI

Not applicable — this chapter governs debt-tracking process, not a visual or platform category.

---

## 11. DO / 12. DON'T

**Do:** Adding Chapter 32's chart-verification need to this register the moment that chapter was written, rather than letting it remain only as a sentence in that chapter's own Section 16. **Don't:** Resolving the piecemeal Radius scale item by quietly updating Chapter 9 with no logged resolution note — violates Dd-3.

---

## 13. ANTI-PATTERNS

**Debt denial.** Treating a chapter's Section 16 limitation as resolved simply because time has passed and no one has complained, without an actual documented resolution. This is detected by auditing register items against real evidence of resolution, not elapsed time, and fixed by either genuinely resolving the item or explicitly re-confirming it remains open.

---

## 14. QUALITY ASSURANCE CHECKLIST

- [ ] Has every chapter's Section 16 limitation been entered into this register? *(Dd-1)*
- [ ] Is the register prioritized by Chapter 65's blast-radius tiering? *(Dd-2)*
- [ ] Is every resolution logged with specific detail, not merely marked closed? *(Dd-3)*

---

## 15. CROSS REFERENCES

Every chapter's Section 16, cited in Section 4. Chapter 64 (Vs-3, resolution-logging parallel). Chapter 65 (Gov-4, tiering). Chapter 66 (lifecycle). Chapter 70 (evolution case studies, direct dependent).

---

## 16. FUTURE EXPANSION

This register is, by definition, a living document — it should never reach a final, complete state, and its continued growth is expected and healthy rather than a sign of failure.

---

*End of Chapter 69. The next chapter, per the authoring sequence, is Component Evolution & Case Studies — genuinely unable to contain real content until this system has existed long enough to have a history, and therefore the last chapter in Volume VI.*
