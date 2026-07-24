# CHAPTER 28 — BREADCRUMBS & WAYFINDING

**Trady Perch Design System Bible · Volume II: Components**
*First-canonical-draft.*

**Inherited From:** Master Vision Chapter 26 (Future Expansion Roadmap — expanded case study library, client dashboard, the deeper hierarchy this component anticipates). Design System Bible Chapter 1 (P2, P7), Chapter 4 (typography), Chapter 17 (anatomy standard).

---

## 1. INTRODUCTION

The launch site's architecture is intentionally shallow (Master Vision Chapter 14), so breadcrumbs carry low urgency today. But Chapter 26's roadmap — an expanded case study library, a client dashboard with real nesting — will need genuine hierarchical wayfinding soon enough that this chapter exists now rather than being improvised later under deadline pressure.

This chapter depends on Chapter 4 for typography and is depended on by Chapter 22 (Tables, in future dashboard contexts with nested drill-down views).

---

## 2. PHILOSOPHY

The rejected alternative is skipping this chapter entirely on the grounds that the current site doesn't need it. This was rejected because Chapter 26's roadmap explicitly commits to features that will need it, and specifying it now, calmly, is cheaper than inventing it under the pressure of an already-shipping dashboard.

---

## 3. CORE PRINCIPLES

### Wf-1 — Breadcrumbs Show the Real Hierarchy, Never a Shortened Guess

**Purpose.** Every breadcrumb level corresponds to a genuine ancestor page in the site's actual navigation hierarchy — never a fabricated, convenience-shortened path that doesn't match how a user could actually navigate there manually.

**Reasoning.** Descends from Principle 1: a breadcrumb's entire value is its traceability to the real structure; a shortened or inaccurate trail actively misleads rather than orients.

**When it applies.** To every breadcrumb trail. **When it does not apply.** No exception.

### Wf-2 — The Current Page Is Shown but Never Clickable

**Purpose.** The final breadcrumb item, representing the current page, is visually present (so the user sees their full location) but is not an active link.

**Reasoning.** A link to the page already being viewed serves no function and, per Principle 4, should not exist merely for structural completeness.

**When it applies.** To every breadcrumb trail's final item. **When it does not apply.** No exception.

### Wf-3 — Maximum Four Levels Deep; Beyond That, Truncate the Middle

**Purpose.** A breadcrumb trail displays at most four levels. A deeper hierarchy truncates its middle levels behind an ellipsis, always preserving the first (home) and final two levels.

**Reasoning.** Descends from Principle 2 and Principle 7, matching Chapter 20's Nv-2 four-item discipline: a very long breadcrumb trail stops functioning as a quick orientation aid and starts reading as clutter.

**When it applies.** To any hierarchy deeper than four levels. **When it does not apply.** To hierarchies of four levels or fewer, which display in full.

---

## 4. COMPLETE DESIGN SPECIFICATION

**Anatomy** (per An-1): Home icon/label → intermediate level links (Chapter 11 chevron separators between each) → current page (non-clickable, per Wf-2).

**Token consumption:** `semantic.color.text.secondary` (ancestor links), `semantic.color.text.primary` (current page), Chapter 11's chevron icon as separator.

---

## 5. MEASUREMENTS

Maximum displayed levels: 4 (Wf-3). Separator: Chapter 11's 16px icon step, `text.secondary`.

---

## 6. STATE COVERAGE (per An-3)

Hover/Focus/Active apply to ancestor links identically to any ordinary text link (Chapter 39 defaults). Disabled/Loading/Error/Success/Empty: not applicable — a breadcrumb trail is static, derived directly from the URL/navigation hierarchy with no asynchronous or validated behavior.

---

## 7. MOTION SPECIFICATION

Not applicable beyond ordinary link hover treatment (Quick tier, per Chapter 39) — breadcrumbs are a static wayfinding aid with no entrance choreography of their own beyond the page's normal load.

---

## 8. ACCESSIBILITY

Implemented with a semantic navigation landmark and ordered list structure so assistive technology announces the trail as a coherent hierarchy, with the current page explicitly marked as such rather than presented as an ordinary, ambiguous final link.

---

## 9. RESPONSIVE BEHAVIOUR

At narrow Mobile widths, the trail may collapse to showing only the immediate parent and current page (a two-level minimum), with the full trail available via a tap-to-expand affordance, rather than wrapping awkwardly across multiple lines.

---

## 10. AI & FUTURE INTERFACES

A voice interface's equivalent is the AI stating location plainly when asked ("You're currently in the Northwind Logistics case study, under Case Studies") — a spoken restatement of Wf-1's real-hierarchy principle, never a shortened or invented path.

---

## 11. DO / 12. DON'T

**Do:** "Home / Case Studies / Northwind Logistics" with the final item unstyled as a link. **Don't:** "Home / ... / Northwind Logistics" skipping the real "Case Studies" level to save space when the full trail is only three levels deep — truncation (Wf-3) only applies beyond four levels, not as a general space-saving habit.

---

## 13. ANTI-PATTERNS

**Fabricated shortcuts.** Showing a breadcrumb path that doesn't match the site's real navigable structure, to make a trail look tidier. This is detected by manually verifying each shown level is an actual clickable ancestor in the live navigation, and fixed by correcting the trail to the real hierarchy.

---

## 14. QUALITY ASSURANCE CHECKLIST

- [ ] Does every shown level correspond to a real, navigable ancestor page? *(Wf-1)*
- [ ] Is the current page shown but not a clickable link? *(Wf-2)*
- [ ] Does a trail deeper than four levels truncate its middle rather than displaying in full? *(Wf-3)*

---

## 15. CROSS REFERENCES

Chapter 1 (P1, P2, P4, P7). Chapter 4 (typography). Chapter 11 (separator icon). Chapter 17 (anatomy standard). Chapter 20 (Nv-2 parallel). Chapter 22 (Tables, dashboard nesting consumer). Master Vision Chapter 26.

---

## 16. FUTURE EXPANSION

This chapter's rules have not yet been tested against a real deep hierarchy, since none currently exists on the live site — Wf-3's truncation behavior should be revisited once Chapter 26's roadmap items actually ship.

---

*End of Chapter 28. The next chapter, per the authoring sequence, is Search Interfaces.*
