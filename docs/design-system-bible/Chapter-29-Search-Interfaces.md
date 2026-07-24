# CHAPTER 29 — SEARCH INTERFACES

**Trady Perch Design System Bible · Volume II: Components**
*First-canonical-draft.*

**Inherited From:** Master Vision §18.10 (Search & Filters). Design System Bible Chapter 1 (P1, P4), Chapter 17 (anatomy standard), Chapter 21 (Forms, shared input styling), Chapter 26 (results-as-popover pattern), Chapter 38 (Empty States).

---

## 1. INTRODUCTION

Master Vision §18.10 already establishes that filtering must never introduce a jarring reload; this chapter extends that same standard to search generally, as the case study library and future knowledge base grow large enough to need it.

This chapter depends on Chapter 21 for input styling and Chapter 38 for its empty-result treatment. It is depended on by Chapter 59 (Documentation & Help Content Design), which will rely on search extensively for a growing help library.

---

## 2. PHILOSOPHY

The rejected alternative is a traditional submit-driven search (type a query, click a button or press Enter, wait for a new page) — technically simpler, and a direct contradiction of §18.10's existing standard against jarring reloads. This chapter instead requires live, in-place result updates as the default, consistent with the smoothness this system demands everywhere else.

---

## 3. CORE PRINCIPLES

### Se-1 — Results Update Live, Never Requiring a Submit Action

**Purpose.** Search results update as the user types (after a brief debounce), with no separate submit button or Enter-key requirement to see results.

**Reasoning.** Direct restatement of Master Vision §18.10, extended from filtering to search generally.

**When it applies.** To every search interface. **When it does not apply.** To a search scoped against an external, slow, or rate-limited API where live-as-you-type queries are genuinely impractical — even here, the interface should indicate this scope limitation explicitly (Se-3) rather than silently behaving differently from the live-update norm without explanation.

### Se-2 — No Results Uses Chapter 38's Empty State, Never a Bare Line of Text

**Purpose.** A search returning no results displays Chapter 38's full Empty State treatment (icon, message, optional suggested action), never a minimal, unstyled "No results found" line.

**Reasoning.** Direct extension of Master Vision §14.2's "nothing thin or placeholder" standard to this specific, extremely common moment — a no-results state is, statistically, one of the most frequently encountered states in any search interface, and treating it as an afterthought contradicts this brand's stated intolerance for thin states anywhere.

**When it applies.** To every zero-result search outcome. **When it does not apply.** No exception.

### Se-3 — Search Scope Is Always Visible

**Purpose.** The interface states plainly what is being searched (e.g., "Searching case studies" as persistent context near the input), never leaving the user to guess whether a query covers the whole site or one section.

**Reasoning.** Descends from Principle 1: an invisible scope is an untraceable decision from the user's perspective — they cannot evaluate whether a lack of results means "nothing matches" or "you searched the wrong thing."

**When it applies.** To every search interface with a non-obvious or non-global scope. **When it does not apply.** To an unambiguous, clearly-labeled single-purpose search field (a table's own inline filter, whose scope is self-evident from its position directly above that table).

---

## 4. COMPLETE DESIGN SPECIFICATION

**Anatomy** (per An-1): Search Input (Chapter 21 anatomy, `text` type) → optional Scope Indicator (Se-3) → Results Region (list or grid, per context) → Empty State fallback (Se-2, Chapter 38).

**Token consumption:** Chapter 21's full input token set, Chapter 38's empty-state tokens, Chapter 26's popover elevation where results render as an overlay rather than inline.

---

## 5. MEASUREMENTS

Debounce delay before live update: approximately 300ms — long enough to avoid firing on every single keystroke of a fast typist, short enough to still feel immediate, matching Chapter 21's Fm-2 validation-timing reasoning applied to a different but structurally similar problem.

---

## 6. STATE COVERAGE (per An-3)

Loading: results region shows Chapter 31's skeleton treatment during the debounce/fetch window. Empty: Chapter 38's full treatment, per Se-2. Error: a failed search (network failure) shows Chapter 3's Error text within the Results Region, with a retry action. Hover/Focus/Active/Disabled apply to the input per Chapter 21 and to individual results per Chapter 19/26's card/list-item conventions. Success: not a distinct state — successful results are simply the Results Region populated normally.

---

## 7. MOTION SPECIFICATION

Result list updates fade/settle in using Chapter 15's Quick tier (150ms) rather than replacing content with a jarring instant swap, consistent with Master Vision §18.10's explicit anti-jarring-reload standard.

---

## 8. ACCESSIBILITY

Result count changes are announced to assistive technology via a live region (e.g., "12 results found") as the user types, since a purely visual update would otherwise be invisible to a screen-reader user actively typing a query.

---

## 9. RESPONSIVE BEHAVIOUR

At Mobile range, results may render as a full-width list beneath the input rather than a floating popover (Chapter 26), since a small popover competes poorly with an on-screen keyboard for limited vertical space.

---

## 10. AI & FUTURE INTERFACES

A voice interface's search equivalent is a direct spoken query answered conversationally rather than as a results list — Se-2's empty-result philosophy translates directly ("I couldn't find anything matching that — would you like me to check with the team?" rather than a flat "no results").

---

## 11. DO / 12. DON'T

**Do:** A case-study search updating its results live as the user types, with a visible "Searching case studies" label and a full Chapter 38 empty state when nothing matches. **Don't:** A search requiring an Enter keypress before showing any results, with a bare "No results" line if none are found.

---

## 13. ANTI-PATTERNS

**Silent scope ambiguity.** Building a search field with no visible indication of what it searches, leaving users to guess based on where they happen to be on the page. This is detected by checking whether the search's actual scope is stated anywhere near the input, and fixed by adding Se-3's scope indicator.

---

## 14. QUALITY ASSURANCE CHECKLIST

- [ ] Do results update live as the user types, without a required submit action? *(Se-1)*
- [ ] Does a zero-result outcome use Chapter 38's full Empty State treatment? *(Se-2)*
- [ ] Is the search's scope stated explicitly wherever it isn't self-evident? *(Se-3)*

---

## 15. CROSS REFERENCES

Chapter 1 (P1, P4). Chapter 15 (motion). Chapter 17 (anatomy standard). Chapter 21 (input anatomy). Chapter 26 (results-as-popover). Chapter 31 (loading skeleton). Chapter 38 (Empty States, mandatory consumer). Chapter 59 (Documentation, primary future consumer). Master Vision §18.10, §14.2.

---

## 16. FUTURE EXPANSION

This chapter's guidance has not yet been tested against a genuinely large searchable corpus (a mature knowledge base); relevance ranking and result-highlighting conventions should be added once real content volume justifies them.

---

*End of Chapter 29. The next chapter, per the authoring sequence, is Tooltips & Contextual Help.*
