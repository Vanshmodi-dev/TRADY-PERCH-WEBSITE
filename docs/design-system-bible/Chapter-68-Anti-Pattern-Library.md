# CHAPTER 68 — ANTI-PATTERN LIBRARY

**Trady Perch Design System Bible · Volume VI: Quality, Governance & Evolution**
*Scheduled deliberately near the end of the authoring sequence, so it can draw on the real anti-patterns already named across 67 preceding chapters rather than only hypothetical ones.*

**Inherited From:** Every Section 13 in Chapters 1 through 67. Master Vision Chapter 27 and Chapter 30 (Non-Negotiable Principles — every entry below traces to one of these).

---

## 1. INTRODUCTION

Chapter 1 named this the risk directly: a system that only states what to do, never what was tried and explicitly rejected, loses institutional memory the moment its original authors leave. Every component and governance chapter in this Bible already carries its own Section 13, naming the specific anti-pattern most likely to occur in that chapter's own domain. This chapter's job is not to invent new anti-patterns — it is to consolidate the sixty-plus already named, organized so a future contributor can browse by failure mode rather than hunting through every individual chapter.

This chapter depends on every prior chapter's Section 13 directly, per the same citation discipline Chapter 41 and Chapter 53 already establish for their own consolidation work. It is depended on by Chapter 61 (Design QA, which checks against this library) and Chapter 69 (Design Debt Register, which tracks violations found in production).

---

## 2. PHILOSOPHY

The rejected alternative is leaving each anti-pattern scattered in its own chapter with no consolidated index, technically complete but practically unbrowsable for a reviewer trying to check a new proposal against every known failure mode at once. This chapter exists as that index, adding no new content of its own — per Chapter 41's Mi-1 discipline, restated here as Ap-1.

---

## 3. CORE PRINCIPLES

### Ap-1 — Every Entry Cites Its Source Chapter and Violated Principle

**Purpose.** Every anti-pattern entry in this catalog names the specific chapter it was first documented in and the specific Tier 1 or Tier 3 principle it violates — never a freestanding description with no traceable origin.

**Reasoning.** Direct restatement of Chapter 41's Mi-1, applied to this consolidation specifically.

**When it applies.** To every entry. **When it does not apply.** No exception.

### Ap-2 — Organized by Failure Mode, Not by Chapter Number

**Purpose.** This catalog groups entries by the *kind* of failure (scope creep, default inheritance, silent drift, retroactive justification) rather than alphabetically or numerically by source chapter.

**Reasoning.** Direct restatement of Chapter 41's Mi-2 reasoning: a reviewer suspecting a specific failure mode benefits from seeing every chapter's version of it grouped together, since the same underlying mistake recurs across many unrelated components.

**When it applies.** To this chapter's structure. **When it does not apply.** No exception.

### Ap-3 — New Entries Require a Real, Observed Instance

**Purpose.** A new anti-pattern is added to this library only after it has actually occurred, at least once, in real work — never added speculatively because it seems like something that *might* happen.

**Reasoning.** Descends from Principle 7 applied reflexively, per Chapter 1, Section 16's own governance note for this exact chapter: this Bible's anti-pattern catalog should draw on lived mistakes, not hypothetical ones, which is precisely why this chapter was scheduled last among the governance chapters rather than drafted speculatively in Phase 1.

**When it applies.** To every proposed new entry. **When it does not apply.** No exception.

---

## 4. COMPLETE DESIGN SPECIFICATION — THE CONSOLIDATED CATALOG

**Failure Mode: Ceiling/Scope Creep** — approving "just one more" exception to an established numeric ceiling, which becomes the next precedent. Chapter 20, Nv-1/Nv-2 (navigation items). Chapter 26, Dp-2 (menu items). Chapter 44, Cu-1 (cursor zones). Chapter 65, Gov-4 ("tier-shopping").

**Failure Mode: Default/Template Inheritance** — shipping whatever a third-party tool, framework, or convention provides by default, because re-theming felt like unnecessary effort. Chapter 16 (sound/haptics). Chapter 22 (data-grid defaults). Chapter 32 (chart library palettes). Chapter 45 (chat-widget conventions). Chapter 52 (theme-toggle defaults).

**Failure Mode: Silent Drift** — small, individually invisible deviations that compound over time with no single moment anyone would call wrong. Chapter 2, T-2 ("token sprawl via convenience"). Chapter 3 (weight confusion, gold creep). Chapter 18 (emphasis inflation). Chapter 62, Vr-2 (drift tolerance).

**Failure Mode: Premature Invention** — creating something new without checking whether an existing solution already serves, usually under deadline pressure. Chapter 1, Section 13 (the original statement of this pattern). Chapter 6 (default symmetry). Chapter 33 (status-color sprawl).

**Failure Mode: Retroactive Justification** — building the preferred solution first, then writing principle-based reasoning afterward to support it. Chapter 67, Cg-1.

**Failure Mode: Isolated Review** — approving a component purely on its own merits, with no check against where it will actually be placed or how it interacts with the rest of the system. Chapter 1, Section 13 ("isolated excellence"). Chapter 19, Cd-4 (anatomy drift within a grid). Chapter 24 (component conflation).

**Failure Mode: Silent Omission** — a required element (a state, a disclosure, an accessible label) simply missing, with no explicit "not applicable" statement to distinguish oversight from a genuine decision. Chapter 17, An-3 ("silent state omission"). Chapter 21 (validation eagerness, the inverse timing failure). Chapter 34 (default anthropomorphization).

**Failure Mode: Manufactured Urgency** — any pattern that pressures, rushes, or interrupts for the system's benefit rather than the user's genuine need. Chapter 23, Dl-1 ("interruption for engagement"). Chapter 46 ("trust theater"). Chapter 58 ("template default inheritance," urgency variant).

---

## 5. MEASUREMENTS

Total consolidated entries: 8 failure-mode categories, spanning approximately 25 individually-named anti-patterns across the source chapters cited.

---

## 6. BEHAVIORAL RULES

**Before any contribution review (Chapter 67).** Check the proposal against this catalog's 8 failure modes directly. **Upon discovering a new, real instance of an unlisted failure mode.** Add it here per Ap-3's observed-instance requirement, citing its source per Ap-1.

---

## 7–10. MOTION / ACCESSIBILITY / RESPONSIVE / AI

Not applicable independently — see each cited source chapter.

---

## 11. DO / 12. DON'T

**Do:** Checking a new dashboard proposal against the "Default/Template Inheritance" category before approving it, catching a library-default color palette before it ships. **Don't:** Adding a new, speculative anti-pattern entry for a failure that hasn't actually occurred yet, "just in case" — violates Ap-3.

---

## 13. ANTI-PATTERNS

*(This chapter's own anti-pattern, reflexively applied: a consolidation chapter that drifts out of sync with its sources.)* **Catalog staleness.** Allowing this chapter's entries to fall out of date as source chapters are revised, exactly the risk Chapter 41 already names for its own structurally identical consolidation work. It is detected and fixed the same way: periodic re-verification against every cited source chapter.

---

## 14. QUALITY ASSURANCE CHECKLIST

- [ ] Does every entry cite its source chapter and violated principle? *(Ap-1)*
- [ ] Is the catalog organized by failure mode rather than chapter number? *(Ap-2)*
- [ ] Was every entry added only after a real, observed instance? *(Ap-3)*

---

## 15. CROSS REFERENCES

Every chapter cited in Section 4. Chapter 1 (Section 13, 16). Chapter 41 (Mi-1, Mi-2, structural parallel). Chapter 61 (Design QA, direct consumer). Chapter 65 (Gov-4, tier-shopping). Chapter 67 (contribution review consumer). Chapter 69 (design debt, direct consumer). Master Vision Chapter 27, Chapter 30.

---

## 16. FUTURE EXPANSION

This catalog will grow as real production use surfaces new failure modes — per Ap-3, only ever from observed instances, never speculatively.

---

*End of Chapter 68. The next chapter, per the authoring sequence, is Design Debt Register & Management.*
