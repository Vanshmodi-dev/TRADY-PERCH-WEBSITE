# CHAPTER 53 — ACCESSIBILITY STANDARDS, DEEP SPECIFICATION

**Trady Perch Design System Bible · Volume IV: Platform, Mode & Accessibility**
*The single most detail-dense chapter in the Bible, spanning every component individually.*

**Inherited From:** Master Vision Chapter 22 (Accessibility Standards, in full). Design System Bible Chapter 1 (P1, P8), Chapter 3 (contrast), Chapter 39 (state model), Chapter 42 (keyboard), and the Section 8 of every chapter in this Bible.

---

## 1. INTRODUCTION

Master Vision Chapter 22 states the commitment: contrast, keyboard navigation, focus visibility, motion sensitivity, typography readability, semantic structure, inclusive design. Every component chapter in Volumes I through III already satisfies this commitment individually, in its own Section 8. What has not existed until this chapter is the *consolidated, checkable mapping* from that scattered commitment to the specific WCAG 2.1 success criteria it satisfies — the difference between "we care about accessibility" (true throughout this Bible already) and "here is exactly which numbered criterion each component chapter's Section 8 discharges" (this chapter's actual contribution).

This chapter depends on every chapter's own Section 8 directly and adds no new visual or behavioral requirement — per its own Ax-2, it is a mapping and audit tool, not a source of new rules. It is depended on by Chapter 61 (Design QA Standards) and Chapter 62 (Visual Regression & Consistency Testing).

---

## 2. PHILOSOPHY

The rejected alternative is treating "we follow WCAG" as sufficient without ever naming which specific success criteria are satisfied by which specific components. This was rejected because an unmapped commitment cannot be audited — a reviewer checking whether the system is actually WCAG 2.1 AA conformant needs a criterion-by-criterion answer, not a general assurance, and this chapter is where that answer becomes available in one place rather than requiring a reviewer to independently re-derive it from forty scattered Section 8s.

---

## 3. CORE PRINCIPLES

### Ax-1 — Every Accessibility Rule Maps to a Named WCAG 2.1 Success Criterion

**Purpose.** Each accessibility commitment already established across this Bible is mapped, in Section 4, to its specific WCAG 2.1 success criterion number — not merely described in prose, as every prior chapter's own Section 8 already does, but indexed against the formal standard.

**Reasoning.** Descends from Principle 1: a mapping to a named external standard is independently verifiable by a third-party auditor in a way an internal description alone is not, which matters specifically because accessibility conformance is often verified by parties outside this Bible's own authorship.

**When it applies.** To every accessibility rule in this Bible. **When it does not apply.** No exception.

### Ax-2 — This Chapter Consolidates; It Never Introduces an Unmapped New Rule

**Purpose.** Every entry in this chapter's Section 4 cites a rule already established in a specific, named prior chapter — this chapter adds no new visual or behavioral requirement of its own.

**Reasoning.** Direct restatement of Chapter 41's Mi-1 applied to accessibility specifically, for the identical drift-prevention reason.

**When it applies.** To this chapter's own content. **When it does not apply.** No exception.

### Ax-3 — AAA Is Pursued Wherever Achievable Without Compromising Brand Identity

**Purpose.** Where a WCAG AAA-level criterion (a stricter contrast ratio, for instance) can be satisfied without requiring a change to Chapter 3's core palette identity, it is pursued as the actual target — AA is the floor, never treated as the ceiling by default.

**Reasoning.** Direct restatement of Master Vision §22's explicit "AAA preferred" language, formalized as a checkable target rather than an aspiration easily deprioritized under schedule pressure.

**When it applies.** To every contrast and readability criterion where AAA is technically achievable. **When it does not apply.** Where AAA would require altering Chapter 3's core identity values in a way that would compromise the brand itself (an extremely rare case, given Chapter 3's own values already achieve AAA in most pairings per its own Section 8 computations) — in that narrow case, AA remains the accepted floor and the gap is documented, not silently accepted as though it didn't exist.

---

## 4. COMPLETE DESIGN SPECIFICATION — THE CONFORMANCE MAP

**1.1.1 Non-text Content:** Chapter 11 (icon accessible labels), Chapter 12 (photography alt text), Chapter 34 (avatar accessible names).
**1.3.1 Info and Relationships:** Chapter 21 (label/field association), Chapter 22 (semantic table markup), Chapter 27 (tab/tabpanel roles), Chapter 28 (breadcrumb landmark structure).
**1.4.1 Use of Color:** Chapter 3, C-4 (text/accent split); Chapter 33, Bd-1 (Badge color-plus-text); Chapter 39 (Error/Success color-plus-icon pairing throughout).
**1.4.3 Contrast (Minimum):** Chapter 3, Section 8, in full (every computed ratio). **1.4.6 Contrast (Enhanced, AAA):** Chapter 3's own ratios, most already exceeding 7:1 per that chapter's own computations, per Ax-3.
**1.4.10 Reflow:** Chapter 8 (breakpoint system), Chapter 49 (Mobile Standards).
**1.4.11 Non-text Contrast:** Chapter 3's 3:1 graphical-element threshold, applied to Chapter 9's elevation borders and Chapter 21's input borders.
**2.1.1 Keyboard:** Chapter 42, in full.
**2.1.2 No Keyboard Trap:** Chapter 23, Dl-3/42, Kb-3 (focus traps release cleanly).
**2.2.2 Pause, Stop, Hide:** Chapter 25, Ts-3 (pause-on-hover); Chapter 15, Mt-4 (reduced-motion pairing).
**2.4.1 Bypass Blocks:** Added Milestone 7 — no chapter had named a skip-link requirement before this row (Master Vision §17.7's keyboard-navigation commitment implies it, but Chapter 42 itself, ostensibly the chapter that would own this, doesn't mention it). A visually-hidden-until-focused "Skip to main content" link, first in tab order on every page, implemented per Master Vision §17.7 directly rather than a named Chapter 42 rule — flagged here as the gap it was, not backfilled as though Chapter 42 always covered it.
**2.4.3 Focus Order:** Chapter 42, Kb-1.
**2.4.7 Focus Visible:** Chapter 39 (default focus ring), Chapter 42, Kb-2.
**2.5.5 Target Size:** Chapter 43, Tg-1 (44×44px floor).
**3.2.4 Consistent Identification:** Chapter 39 (state model, one cross-component default per state, St-1), Chapter 63 (naming conventions).
**3.3.1 Error Identification:** Chapter 21, Fm-3; Chapter 47, Er-1.
**3.3.3 Error Suggestion:** Chapter 47, Er-1 (the "next action" clause).
**4.1.2 Name, Role, Value:** Chapter 17, An-4's requirement extended to every component's semantic implementation; Chapter 18 (genuine button elements), Chapter 21 (label association), Chapter 23 (dialog role/announcement).
**4.1.3 Status Messages:** Chapter 25 (Toast live-region announcement), Chapter 29 (search result count announcement).

---

## 5. MEASUREMENTS

Total success criteria explicitly mapped in Section 4: 19 (recounted Milestone 7 — this line previously read "20" against a Section 4 that, even after adding 2.4.1 above, only lists 19; the original "20" never matched an actual count of the rows above it), spanning Levels A and AA, with AAA pursued per Ax-3 wherever Chapter 3's own contrast computations already clear that bar.

---

## 6. BEHAVIORAL RULES

**Before claiming WCAG conformance for a new component.** Map its own Section 8 content against this chapter's Section 4 table, adding a new row if the component satisfies a criterion not yet indexed. **During any external accessibility audit.** This chapter's Section 4 is the first document provided, since it is the fastest path to verifying claimed conformance against actual, cited implementation.

---

## 7. MOTION SPECIFICATION

Not independently specified — see Chapter 15, Mt-4 and Chapter 40, Ag-3, both indexed under 2.2.2 above.

---

## 8. ACCESSIBILITY

This entire chapter is an accessibility specification; its own "accessibility" section is the recursive statement that this chapter itself should be produced in an accessible format (a properly structured, navigable document) when published in its final form, consistent with the standard it documents.

---

## 9. RESPONSIVE BEHAVIOUR

Every criterion in Section 4 applies at every breakpoint (Chapter 8) without exception or reduction — accessibility is never a Desktop-only or Mobile-only commitment.

---

## 10. AI & FUTURE INTERFACES

Chapter 71–73's Horizon-volume work will need this chapter's mapping methodology (Ax-1) extended to whatever accessibility standards eventually govern voice and spatial interfaces, which as of this writing are less mature and less universally standardized than WCAG 2.1 for the visual web — this is flagged as a genuine open area for those future chapters rather than resolved here.

---

## 11. DO / 12. DON'T

**Do:** Using this chapter's Section 4 table as the first artifact handed to an external accessibility auditor, confident that every cited chapter's actual content backs the claim. **Don't:** Asserting general WCAG conformance in marketing or sales material without being able to point to this chapter's specific criterion-by-criterion mapping if challenged.

---

## 13. ANTI-PATTERNS

**Unmapped conformance claims.** Stating that the product is "WCAG 2.1 AA compliant" without an underlying criterion-by-criterion mapping to verify it. This is detected by requesting the specific mapping for any claimed criterion, and fixed by building the mapping — this chapter — before making the claim.

---

## 14. QUALITY ASSURANCE CHECKLIST

- [ ] Does every accessibility rule in this Bible map to a named WCAG success criterion? *(Ax-1)*
- [ ] Does every entry in this chapter cite an already-established rule rather than introducing a new one? *(Ax-2)*
- [ ] Is AAA pursued and documented wherever achievable without compromising Chapter 3's core identity? *(Ax-3)*

---

## 15. CROSS REFERENCES

Every chapter cited in Section 4. Chapter 1 (P1, P8). Chapter 3 (contrast foundation). Chapter 39 (state model). Chapter 42 (keyboard). Chapter 61 (Design QA, direct consumer). Chapter 62 (Visual Regression, direct consumer). Master Vision Chapter 22, in full.

---

## 16. FUTURE EXPANSION

This chapter's map should be updated as a required step whenever any cited chapter is revised — an out-of-date conformance map is worse than no map, since it creates false confidence, and this risk should be tracked as a standing item in Chapter 62's ongoing consistency-testing discipline.

---

*End of Chapter 53. The next chapter, per the authoring sequence, is Internationalization & Localization Standards.*
