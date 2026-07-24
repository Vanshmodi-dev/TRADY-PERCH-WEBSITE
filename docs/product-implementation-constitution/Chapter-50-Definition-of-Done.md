# CHAPTER 50 — DEFINITION OF DONE

**Trady Perch Product Implementation Constitution · Part X: Testing & Quality Assurance**

**Inherited From:** Design System Bible Chapter 61 (Design QA Standards & Checklists); UX / Experience Blueprint Chapter 105 (Experience QA Standards & Checklists); Brand Identity Manual Chapter 119 (Brand Health Measurement & Debt Register). Chapter 49 (Quality Gates Standard), and implicitly every prior Part of this Constitution, are this chapter's premises.

---

## 1. INTRODUCTION

Chapter 49 named the ordered sequence of checks a change must pass. This chapter is the closed, consolidating checklist — spanning design fidelity, accessibility, performance, security, tests, and documentation — that determines whether a unit of work is actually complete, mirroring the same synthesizing-checklist role Design System Bible Chapter 61, UX / Experience Blueprint Chapter 105, and Brand Identity Manual Chapter 119 each play for their own document. Per this chapter's own success criterion, "is this done?" is always answerable by working through this list item by item, never by a subjective sense that a task feels finished.

---

## 2. THE CLOSED CHECKLIST

A unit of work — a task, a pull request, a feature — is done when, and only when, every item below is true. Each item cites the chapter that owns its actual standard; this chapter synthesizes, per Design System Bible's own Qa-1 principle, and never replaces reading the cited chapter directly.

- [ ] **Traceable.** Every decision cites its origin per Chapter 1's IP1 and Chapter 3's translation ledger.
- [ ] **Structurally correct.** The change follows Chapter 7–9's repository, folder, and naming standards.
- [ ] **Component-compliant**, where applicable. Chapter 12's template is followed in full, including Chapter 12 §4's eight-state wiring.
- [ ] **Accessible.** Chapter 18's Layer 1 and Layer 2 checks pass; a P0/P1 flow additionally has a current Chapter 19 manual test record.
- [ ] **State-correct.** Every value is categorized per Chapter 21's decision tree and implemented per Chapter 22's standard.
- [ ] **Error-handled.** Every error is classified per Chapter 26 and implemented per Chapter 27's typed error pattern.
- [ ] **Performant.** Chapter 36's budgets pass, verified per Chapter 48 §3.
- [ ] **Discoverable**, where applicable. Chapter 40's technical SEO requirements are satisfied automatically by the template used.
- [ ] **Secure.** Chapter 43's relevant OWASP-mapped controls are satisfied; Chapter 44's data classification is applied to any new field.
- [ ] **Tested**, per Chapter 47's pyramid, at the layer each defect class in the change actually belongs to.
- [ ] **Self-reviewed**, per Chapter 32, with a self-review report attached if AI-authored.
- [ ] **Documented**, per Chapter 61's code-level standard and Chapter 62's ADR standard where the change meets that chapter's significance threshold.
- [ ] **Gate-clean.** Every gate in Chapter 49 §2's sequence shows a passing status.

---

## 3. WHY THE LIST IS CLOSED, NOT OPEN-ENDED

A checklist that can grow informally, item by item, whenever someone thinks of one more thing worth checking, eventually becomes long enough that no one actually works through it in full — exactly the failure Chapter 1 §2 already names for a rulebook too large to hold in mind. This list is closed: a new item is added only through Chapter 64's governance process, when a genuine, recurring gap is identified, per the same evidentiary threshold Chapter 1 §16 requires before adding a new principle — never appended informally in the middle of an unrelated task.

---

## 4. THE RELATIONSHIP TO CHAPTER 49'S GATES

Several items in Section 2 are already, individually, blocking gates per Chapter 49 §2 — this list does not re-argue their authority, it consolidates them alongside the items Chapter 49's automated sequence cannot itself check (traceability's substantive correctness, documentation quality) into one single place a reviewer or an AI agent's self-review works through, per Design System Bible Qa-1's synthesizing role restated here for engineering specifically.

---

## 5. ENFORCEMENT & MEASUREMENT

Every item in Section 2 that corresponds to a Chapter 49 gate is enforced exactly as that gate is enforced — mechanically, blocking merge. The remaining items (traceability substance, documentation quality) are checked at Chapter 51's review step, using this chapter's list as the explicit rubric rather than an unstated sense of completeness — directly satisfying this chapter's own success criterion.

---

## 6. BEHAVIORAL RULES

**Before marking any task complete.** Section 2's full list is worked through explicitly, per Chapter 32 §2's self-review procedure for AI-authored work, or per Chapter 52's human review procedure for human-authored work — never approximated from memory of what the list generally contains.

**When an item doesn't apply to a specific task** (a task with no new component has no Chapter 12 compliance to check). It is marked not applicable explicitly, per Design System Bible An-3's "state it, don't imply it" standard applied here — never silently skipped with no record of the determination.

**When Chapter 64's governance process adds a new item.** It applies to all work from that point forward, and existing, already-shipped work is not retroactively required to satisfy it unless a specific Chapter 66 debt-register decision says otherwise.

---

## 7. DO / DON'T

**Do** work through Section 2's full list explicitly for every unit of work, marking each item true, false, or not applicable.

**Do** treat a not-applicable determination as something stated explicitly, not silently assumed.

**Don't** add an item to this list informally — route a genuine new requirement through Chapter 64's governance process.

**Don't** treat "the gates all passed" as equivalent to "this list is satisfied" — several items require judgment Chapter 49's automation cannot provide.

---

## 8. QUALITY ASSURANCE CHECKLIST

*(This chapter's own checklist is Section 2 in full — restated here as a meta-check on the chapter itself.)*

- [ ] Does Section 2 remain closed, with any addition routed through Chapter 64 rather than informally appended?
- [ ] Is every item in Section 2 explicitly marked true, false, or not applicable for the work under review?
- [ ] Does the list correctly distinguish gate-enforced items from judgment-dependent ones, per Section 5?

---

## 9. CROSS REFERENCES

**Within this Constitution:** Nearly every prior chapter, cited individually within Section 2. Chapter 1 (IP1, §16's evidentiary threshold mirrored in Section 3). Chapter 32, Chapter 52 (the review procedures applying this checklist). Chapter 49 (the gate sequence this chapter consolidates alongside non-gated items). Chapter 64 (governance process for Section 3's closed-list amendment). Chapter 66 (debt-register handling for retroactive-applicability decisions).

**Within the five documents above this Constitution:** Design System Bible Chapter 61 (specifically Qa-1); UX / Experience Blueprint Chapter 105; Brand Identity Manual Chapter 119.

---

## 10. FUTURE EXPANSION

**Possible future additions.** A new Definition of Done item is added only once Chapter 65's continuous-improvement cadence or Chapter 59's incident postmortems identify a specific, recurring gap this list doesn't yet cover — mirroring Chapter 1 §16's own threshold, never added speculatively.

---

*End of Chapter 50, and of Part X. Part XI, Code Review & Collaboration Standards, is where this chapter's judgment-dependent items get their own full procedure.*
