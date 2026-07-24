# CHAPTER 38 — EMPTY STATES & ZERO-DATA DESIGN

**Trady Perch Design System Bible · Volume II: Components**
*First-canonical-draft. Closes Volume II's ordinary component set, with only Charts (Chapter 32) remaining, deliberately last.*

**Inherited From:** Master Vision §14.2 (nothing thin or placeholder), §22 (accessibility). Design System Bible Chapter 1 (P1, P4), Chapter 11 (icon), Chapter 17 (anatomy standard), Chapter 18 (button, optional CTA), Chapter 39 (state model — this chapter's own fullest specification).

---

## 1. INTRODUCTION

Empty states are the most commonly neglected surface in most design systems, and — statistically — one of the most frequently encountered, since any list, table, or search result eventually shows zero results at some point in its life. Chapter 39 named Empty as one of its eight canonical states without fully specifying it; this chapter is that specification, referenced already by Chapters 22, 29, and 33.

This chapter depends on Chapter 39 directly and Chapter 11 for its iconography. It is depended on by every content-container component in the system.

---

## 2. PHILOSOPHY

The rejected alternative — a bare "No data" or "Nothing here" message, unstyled and easy to overlook — is rejected on the same grounds Master Vision §14.2 rejects thin or placeholder pages generally: a genuinely thin empty state communicates the same lack of care a thin page would, merely at component scale rather than page scale. This chapter treats an empty state as a real design moment deserving the same rigor as a populated one, not an edge case to handle minimally.

---

## 3. CORE PRINCIPLES

### Em-1 — Every Empty State Names What's Missing and Why

**Purpose.** An empty state's message specifically names the content that would normally appear and, where determinable, why it's currently absent — never a generic, content-agnostic "Nothing here."

**Reasoning.** Descends from Principle 1: a generic message gives the user no traceable understanding of whether this is expected (a genuinely new account with no data yet) or a problem (a failed filter, a broken query).

**Examples.** "No case studies match your current filters" (a filtered-to-zero state) versus "You haven't published any case studies yet" (a genuinely empty, new state) — two different messages for two different underlying reasons, never collapsed into one generic line.

**When it applies.** To every empty state. **When it does not apply.** No exception.

### Em-2 — An Empty State Offers a Next Action Wherever One Exists

**Purpose.** Where a clear next action exists (clearing filters, creating the first item), the empty state includes that action as a visible button (Chapter 18) — never leaving the user at a dead end with no path forward.

**Reasoning.** Descends from Principle 4 applied constructively: an empty state is often a moment of mild friction, and offering the obvious next step removes it rather than requiring the user to figure it out unaided.

**Examples.** "No case studies match your current filters — [Clear Filters]" with a Secondary-emphasis button.

**When it applies.** Wherever a genuine, single, unambiguous next action exists. **When it does not apply.** To an empty state with no clear single action (a search with a highly specific, correctly-zero-result query) — no button should be invented merely to satisfy this principle where none genuinely helps.

### Em-3 — Empty Is Styled Calmly, Never as an Error

**Purpose.** An empty state uses `text.secondary` and a quiet Chapter 11 icon (48px step) — never Chapter 3's Error colors or iconography, even when the emptiness resulted from a failed action.

**Reasoning.** Descends from Chapter 39's St-2 (Content States follow different rules) applied specifically to this pair: "there is genuinely nothing to show" and "something went wrong while trying to show it" are different facts requiring different color signals — conflating them under Error styling misinforms the user about which situation they're actually in.

**Examples.** A truly empty result set: calm, `text.secondary` empty-state treatment. A failed fetch attempting to load results: Chapter 3's actual Error treatment instead, a visually distinct state per Chapter 39.

**When it applies.** To every empty state genuinely representing an absence of data, not a failure. **When it does not apply.** To a failed data fetch, which is Chapter 39's Error state, not this chapter's Empty state, even though both can present as "nothing visible" to a casual glance.

---

## 4. COMPLETE DESIGN SPECIFICATION

**Anatomy** (per An-1): Icon (Chapter 11, 48px step, `text.secondary`) → Headline message (naming what's missing, per Em-1) → optional supporting text (why) → optional Action button (Em-2, Chapter 18 Secondary emphasis).

**Token consumption:** `semantic.color.text.secondary` (icon and text), `semantic.space.padding.section-lg` (generous surrounding space, consistent with this system's general restraint-as-default spacing philosophy rather than a cramped, minimal treatment).

---

## 5. MEASUREMENTS

Icon size: 48px (Chapter 11's largest step, reserved for exactly this kind of deliberately large icon moment). Maximum action buttons: 1.

---

## 6. STATE COVERAGE (per An-3)

This component *is* the Empty state's implementation; it has no further internal state coverage of its own beyond its optional Action button's ordinary Chapter 18 states (Hover/Focus/Active/Disabled/Loading if the action itself triggers an async operation).

---

## 7. MOTION SPECIFICATION

Entrance uses Chapter 15's Standard tier (300ms), Entrance curve — an empty state replacing a Loading skeleton (Chapter 31) should feel like a settled, deliberate reveal, not an abrupt swap.

---

## 8. ACCESSIBILITY

The empty state's message is announced to assistive technology when it replaces previously-loading or previously-populated content, so a screen-reader user is informed the result set is genuinely empty rather than assuming a loading failure or an unannounced content gap.

---

## 9. RESPONSIVE BEHAVIOUR

Padding and icon size remain constant proportionally across breakpoints; the surrounding generous space (Section 4) compresses per Chapter 5's mobile values without abandoning the "generous negative space" principle entirely.

---

## 10. AI & FUTURE INTERFACES

A voice interface's equivalent, per Master Vision §19.7's honest-limitation reasoning, is a plain spoken acknowledgment ("I don't have anything matching that yet") — Em-1's specific-naming principle applies directly, and Em-3's calm-not-alarmed tone maps exactly onto the AI Personality Constitution's own composed register.

---

## 11. DO / 12. DON'T

**Do:** "No case studies match your current filters" with a quiet icon and a "Clear Filters" button. **Don't:** A bare "No results" line with no icon, no explanation, and no path forward — exactly the thin treatment Master Vision §14.2 forbids, now occurring at component scale.

---

## 13. ANTI-PATTERNS

**The forgotten state.** Shipping a component's populated and loading states with care while leaving its empty state as an afterthought — a single unstyled line added at the end of development because "it rarely comes up." This is detected by explicitly testing every content container's zero-result condition as part of ordinary QA, not only its typical populated state. It is fixed by applying this chapter's full anatomy before considering the component complete.

---

## 14. QUALITY ASSURANCE CHECKLIST

- [ ] Does the message specifically name what's missing and, where knowable, why? *(Em-1)*
- [ ] Is a clear next action offered wherever one genuinely exists? *(Em-2)*
- [ ] Is the treatment calm (`text.secondary`), never styled as an Error? *(Em-3)*
- [ ] Is the empty state announced to assistive technology when it replaces other content?

---

## 15. CROSS REFERENCES

Chapter 1 (P1, P4). Chapter 11 (icon). Chapter 15 (motion). Chapter 17 (anatomy standard). Chapter 18 (action button). Chapter 22, 29, 33 (primary consumers already referencing this chapter). Chapter 31 (loading-to-empty transition). Chapter 39 (state model, St-2 distinction from Error). Master Vision §14.2, §19.7, §22.

---

## 16. FUTURE EXPANSION

No open questions currently identified.

---

*End of Chapter 38. The next and final Volume II chapter, per the authoring sequence, is Charts & Data Visualization — deliberately last among components, since it draws on more prior chapters than any other single component.*
