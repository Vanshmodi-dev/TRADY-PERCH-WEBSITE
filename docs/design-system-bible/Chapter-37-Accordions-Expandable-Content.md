# CHAPTER 37 — ACCORDIONS & EXPANDABLE CONTENT

**Trady Perch Design System Bible · Volume II: Components**
*First-canonical-draft.*

**Inherited From:** Master Vision §18.8 (FAQ accordion behavior). Design System Bible Chapter 1 (P2), Chapter 15 (motion), Chapter 17 (anatomy standard), Chapter 35 (disclosure control kinship).

---

## 1. INTRODUCTION

Master Vision §18.8 already specifies the FAQ's single-open-item default in detail. This chapter generalizes that specific rule to any other accordion use the system develops, so the same "one dominant idea" logic (Principle 2) governs every instance rather than being re-derived per feature.

This chapter depends on Chapter 15 for its expand/collapse timing and is depended on by Chapter 59 (Documentation & Help Content Design), which uses accordions heavily for structured help articles.

---

## 2. PHILOSOPHY

The rejected alternative — allowing several accordion items to remain open simultaneously by default — was already rejected by Master Vision §18.8 for the FAQ specifically. This chapter extends that rejection universally: an accordion with several open sections produces exactly the visually noisy, uneven page Chapter 1's Principle 2 forbids at the component level, regardless of which content the accordion happens to hold.

---

## 3. CORE PRINCIPLES

### Ac-1 — One Item Open at a Time by Default

**Purpose.** An accordion group allows exactly one item open at a time by default; opening a new item closes the previously open one automatically.

**Reasoning.** Direct restatement of Master Vision §18.8 and Principle 2, generalized beyond the FAQ.

**When it applies.** To every accordion group by default. **When it does not apply.** To a specifically justified multi-open variant (a settings panel where several independent sections genuinely benefit from simultaneous visibility) — permitted only with explicit justification, per the same T-4-style bar Chapter 2 applies to any exception.

### Ac-2 — Expansion Reflows Smoothly; It Never Jumps the Page

**Purpose.** Content below an expanding accordion item reflows smoothly to accommodate the new height — the expanding item itself never scrolls out of view or causes the page to jump.

**Reasoning.** Descends from Master Vision §18.8's explicit requirement and Principle 4: a sudden jump disorients the user at the exact moment they're trying to read newly revealed content.

**When it applies.** To every accordion expand/collapse. **When it does not apply.** No exception.

### Ac-3 — The Entire Header Row Is the Click Target, Never an Icon Alone

**Purpose.** Clicking or tapping anywhere across an accordion item's full header row toggles it — not only a small chevron icon at one edge.

**Reasoning.** Descends from Chapter 18's touch-target reasoning (Bt, Section 9) applied here: a small icon-only target is both a usability and an accessibility cost for no benefit, since the full header row is available and unambiguous as a target.

**When it applies.** To every accordion header. **When it does not apply.** No exception.

---

## 4. COMPLETE DESIGN SPECIFICATION

**Anatomy** (per An-1): Header Row (Label, chevron icon indicating state) → Content Panel (revealed on expand).

**Token consumption:** `semantic.color.text.primary` (header label), Chapter 11's chevron icon (rotating 180° on expand), `semantic.color.border.default` (hairline divider between items).

---

## 5. MEASUREMENTS

Default open items: 1 (Ac-1). Chevron rotation: 180°, Quick tier (150ms).

---

## 6. STATE COVERAGE (per An-3)

Hover/Focus/Active apply to the header row per Chapter 39 defaults. Disabled: rare, an item temporarily unavailable shows Chapter 39's default opacity with its header non-interactive. Loading: content panel may show Chapter 31's skeleton if its content loads asynchronously on first expand. Error/Success/Empty apply to the Content Panel's own content, not the accordion mechanism itself.

---

## 7. MOTION SPECIFICATION

Height expands/collapses using Chapter 15's Quick tier (150ms) — fast enough to feel responsive to a direct click, per Chapter 1's Motion Principle that hover/click-adjacent feedback should stay brief; the chevron rotates simultaneously at the same duration.

---

## 8. ACCESSIBILITY

Implemented with proper disclosure-widget semantics (expanded/collapsed state announced to assistive technology), full keyboard operability (Enter/Space toggles a focused header), and the header row's full clickable area matching its actual focus/keyboard target exactly.

---

## 9. RESPONSIVE BEHAVIOUR

Anatomy and behavior remain constant across breakpoints; only the header row's touch-target height (Chapter 18's 44px floor) is explicitly verified at Mobile/Tablet ranges.

---

## 10. AI & FUTURE INTERFACES

A voice interface's equivalent is the AI offering a brief answer with an optional "would you like more detail?" follow-up — Ac-1's one-thing-open-at-a-time logic translated into "one topic elaborated at a time," never several unsolicited elaborations at once.

---

## 11. DO / 12. DON'T

**Do:** An FAQ where clicking any question's full row (not just an icon) opens its answer, closing whichever other answer was previously open. **Don't:** An FAQ allowing all questions to be expanded simultaneously — reintroduces exactly the visual noise Ac-1 and Master Vision §18.8 both forbid.

---

## 13. ANTI-PATTERNS

**Icon-only trigger.** Building an accordion where only a small chevron icon toggles the item, with clicks on the label text itself doing nothing. This is detected by testing click targets across the full header row, and fixed by extending the click handler to the entire row per Ac-3.

---

## 14. QUALITY ASSURANCE CHECKLIST

- [ ] Does opening a new item close the previously open one, absent a specifically justified exception? *(Ac-1)*
- [ ] Does expansion reflow content smoothly without a page jump? *(Ac-2)*
- [ ] Is the entire header row clickable, not only an icon? *(Ac-3)*

---

## 15. CROSS REFERENCES

Chapter 1 (P2, P4). Chapter 11 (chevron icon). Chapter 15 (motion). Chapter 17 (anatomy standard). Chapter 18 (touch-target parallel). Chapter 31 (skeleton, async content). Chapter 35 (disclosure kinship). Chapter 39 (state model). Chapter 59 (Documentation, primary consumer). Master Vision §18.8.

---

## 16. FUTURE EXPANSION

The multi-open exception case (Ac-1) has not yet been tested against a real settings-panel use case and should be revisited once one exists.

---

*End of Chapter 37. The next chapter, per the authoring sequence, is Avatars & Identity Elements.*
