# CHAPTER 35 — PAGINATION & DISCLOSURE CONTROLS

**Trady Perch Design System Bible · Volume II: Components**
*First-canonical-draft.*

**Inherited From:** Master Vision §11.1 (Cognitive Load Management — progressive disclosure). Design System Bible Chapter 1 (P2, P7), Chapter 17 (anatomy standard), Chapter 18 (button consistency), Chapter 22 (Tables, numbered-pagination consumer).

---

## 1. INTRODUCTION

Master Vision §11.1 states progressive disclosure as a content strategy: "surface-level clarity first... depth available on demand." This chapter gives that strategy its matching interaction pattern, so it is enacted consistently rather than solved differently on every page that needs it.

This chapter depends on Chapter 18 for its button styling and is depended on by Chapter 22 (Tables' Footer Row) and Chapter 29 (Search results).

---

## 2. PHILOSOPHY

The rejected alternative is defaulting to numbered pagination everywhere, since it is the most common convention. This was rejected because numbered pagination's real value — letting a user jump to a specific position — matters for a structured data table but not for a scrollable content feed (a case study library, a search result list), where "Load More" better preserves a continuous, uninterrupted reading flow consistent with this system's overall smoothness standard.

---

## 3. CORE PRINCIPLES

### Pg-1 — Content Feeds Use "Load More," Never Numbered Pages

**Purpose.** A continuous content feed (case studies, search results) uses a "Load More" button or infinite-scroll pattern, appending new content to the existing view rather than replacing it with a new numbered page.

**Reasoning.** Descends from Principle 4: a full page reload to see "page 2" of a case study library breaks the continuous scroll experience Master Vision Chapter 7 spends an entire chapter establishing as this brand's storytelling device.

**When it applies.** To any scrollable content feed. **When it does not apply.** To Chapter 22's data tables, governed by Pg-2 instead.

### Pg-2 — Structured Data Tables Use Numbered Pagination

**Purpose.** A data table (Chapter 22) where row position and total count matter uses numbered pagination with page-jump capability, rather than "Load More."

**Reasoning.** A user reviewing dashboard data often needs to know "how many total, and where am I" — information numbered pagination communicates directly and "Load More" does not.

**When it applies.** To Chapter 22 data tables specifically. **When it does not apply.** To content feeds, governed by Pg-1.

### Pg-3 — Progressive Disclosure Collapses Content; It Never Deletes It

**Purpose.** A "Show more / Show less" disclosure control toggles visibility of already-loaded content — it never triggers a separate network request or permanently removes the collapsed content from the page's underlying structure.

**Reasoning.** Descends from Principle 1: collapsed content should remain immediately available on toggle, without a loading delay that would suggest it was actually removed rather than merely hidden.

**When it applies.** To every "Show more" disclosure control. **When it does not apply.** No exception.

---

## 4. COMPLETE DESIGN SPECIFICATION

**Anatomy** (per An-1, Load More): Content Feed → "Load More" button (Chapter 18, Secondary emphasis) → appended new content on click. **Anatomy** (Numbered Pagination): Page Number controls → Previous/Next arrows (Chapter 11 icons) → current-page indicator. **Anatomy** (Disclosure): Trigger text ("Show more") → chevron icon rotating on toggle (Chapter 37's Accordion motion, shared).

**Token consumption:** Chapter 18's Secondary button tokens (Load More), Chapter 3's `text.primary`/`accent.primary` (current page indicator), Chapter 11's chevron icon (disclosure).

---

## 5. MEASUREMENTS

Load More button: full Chapter 18 `md` size, centered beneath the feed. Numbered pagination: shows current page ± 2 adjacent pages plus first/last, matching common, learnable convention rather than inventing a novel scheme.

---

## 6. STATE COVERAGE (per An-3)

Loading: "Load More" enters Loading + Disabled together (Chapter 39, St-4) while fetching the next batch. Disabled: pagination's Previous/Next arrows disable at the first/last page respectively. Hover/Focus/Active: standard Chapter 18 button treatment. Error: a failed "Load More" fetch shows an inline retry message beneath the button. Success/Empty: not applicable to the control itself.

---

## 7. MOTION SPECIFICATION

Newly loaded content (Pg-1) enters using Chapter 15's Standard tier, staggered per Chapter 15's animation-hierarchy guidance, matching Chapter 19's card-grid entrance treatment exactly since new content is typically more cards. Disclosure toggle (Pg-3) animates height using Quick tier (150ms), matching Chapter 37's Accordion.

---

## 8. ACCESSIBILITY

"Load More" announces the number of newly loaded items to assistive technology once loaded, so a screen-reader user is informed new content has appeared without needing to re-scan the entire feed. Numbered pagination uses proper semantic navigation markup with the current page clearly indicated to assistive technology, not only visually.

---

## 9. RESPONSIVE BEHAVIOUR

Numbered pagination may collapse to just Previous/Next plus a "Page X of Y" text label at narrow Mobile widths, rather than showing every individual page number.

---

## 10. AI & FUTURE INTERFACES

A voice interface's equivalent to "Load More" is the AI asking "Would you like to hear more?" rather than reciting an exhaustive list at once — Pg-1's incremental-disclosure logic applies directly.

---

## 11. DO / 12. DON'T

**Do:** A case-study library using "Load More" to append additional cards to the existing grid. **Don't:** The same library implemented with numbered pages, forcing a full page navigation to see older case studies — rebuild per Pg-1.

---

## 13. ANTI-PATTERNS

**Pagination mismatch.** Using numbered pagination for a scrollable content feed simply because it was the default the underlying library or template shipped with. This is detected by checking whether the content in question is a continuous feed (Pg-1) or structured tabular data (Pg-2), and fixed by switching to the correct pattern.

---

## 14. QUALITY ASSURANCE CHECKLIST

- [ ] Does a content feed use "Load More" rather than numbered pages? *(Pg-1)*
- [ ] Does a structured data table use numbered pagination with page-jump capability? *(Pg-2)*
- [ ] Does a disclosure control toggle already-available content without a network request or permanent removal? *(Pg-3)*

---

## 15. CROSS REFERENCES

Chapter 1 (P1, P2, P4, P7). Chapter 7 (continuous-shot storytelling). Chapter 11 (icons). Chapter 15 (motion). Chapter 17 (anatomy standard). Chapter 18 (button consistency). Chapter 19 (grid entrance parallel). Chapter 22 (numbered pagination consumer). Chapter 29 (Load More consumer). Chapter 37 (Accordion motion parallel). Chapter 39 (state model). Master Vision §11.1, Chapter 7.

---

## 16. FUTURE EXPANSION

No open questions currently identified.

---

*End of Chapter 35. The next chapter, per the authoring sequence, is Animation Governance & Rules.*
