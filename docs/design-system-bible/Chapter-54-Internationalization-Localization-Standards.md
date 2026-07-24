# CHAPTER 54 — INTERNATIONALIZATION & LOCALIZATION STANDARDS

**Trady Perch Design System Bible · Volume IV: Platform, Mode & Accessibility**

**Inherited From:** Master Vision §6.2 (Typography, tuned for English). Design System Bible Chapter 1 (P7), Chapter 4 (Typography System), Chapter 5 (Spacing System), Chapter 11 (Iconography, directional icons).

---

## 1. INTRODUCTION

Master Vision's letter-spacing, line-length, and type-scale rules are tuned for English. As Trady Perch's client base almost certainly diversifies beyond a single language, this chapter exists so language expansion is a planned accommodation rather than a discovery made under launch pressure for a specific new market.

This chapter depends on Chapter 4 and Chapter 5 directly and is depended on by Chapter 56 (UX Writing & Microcopy System, for translation-safe copy construction).

---

## 2. PHILOSOPHY

The rejected alternative is addressing internationalization only when a specific market need arises, retrofitting the type and spacing system at that point. This was rejected because retrofitting a fixed-width, tightly-tuned system (Chapter 4's exact character-count reading measure, Chapter 20's five-item navigation ceiling sized to specific English words) is measurably harder than designing tolerance in from the start, and this chapter's cost of existing now is low relative to the cost of a rushed retrofit later.

---

## 3. CORE PRINCIPLES

### In-1 — Layouts Tolerate 30% Text Expansion Without Breaking

**Purpose.** Every component containing translatable text (button labels, navigation items, headlines) is verified to tolerate at least 30% longer text than its English original without truncation, overlap, or broken layout.

**Reasoning.** Descends from Principle 7: many European languages (German, French) commonly run 20–35% longer than English for equivalent meaning, and a system not tolerant of this range will need emergency redesign the moment a real translation is attempted, rather than absorbing it gracefully.

**Examples.** Chapter 18's button anatomy allows label text to wrap or the container to grow rather than truncating "Book a Strategy Call" mid-word once translated to a longer equivalent.

**When it applies.** To every component displaying translatable text. **When it does not apply.** No exception.

### In-2 — No Text Is Baked Into Images, Icons, or Diagrams

**Purpose.** Every word a user reads exists as genuine, translatable text — never rendered as pixels inside an image, an icon, or a diagram (Chapter 13) that would require a separate image asset per language to translate.

**Reasoning.** Descends from Principle 1: text baked into an image is untraceable to any translation system and multiplies asset-production cost by the number of supported languages.

**Examples.** A diagram's labels (Chapter 13) are rendered as genuine HTML/text elements positioned over the diagram's visual elements, never as text baked into the diagram's image file itself.

**When it applies.** To every visual asset containing words. **When it does not apply.** No exception.

### In-3 — Right-to-Left Layout Mirrors Structurally, Not Only Textually

**Purpose.** Should the system ever support a right-to-left language, the entire layout mirrors — navigation order, icon direction (a "back" chevron pointing right instead of left), grid reading order — not only the text alignment.

**Reasoning.** Descends from Principle 2: a right-to-left page with only its text flipped but its icons and layout order still reading left-to-right produces a jarring, internally inconsistent experience worse than a purely untranslated one.

**Examples.** Chapter 28's breadcrumb chevron separators would need to point the opposite direction in a right-to-left context, matching the mirrored reading order.

**When it applies.** Should right-to-left support ever be implemented. **When it does not apply.** To the current system, which has not yet implemented right-to-left support — this principle is specified now, in advance, so the eventual implementation is planned rather than improvised.

### In-4 — Numbers, Dates, and Currency Follow Locale Convention, Never Hardcoded US Format

**Purpose.** Every number, date, and currency value (Chapter 57's future full specification) resolves through locale-aware formatting rather than a hardcoded US-convention string.

**Reasoning.** Descends from Principle 1: a hardcoded "MM/DD/YYYY" date or "$" currency symbol is not merely unlocalized, it can be actively misread by a user from a locale where date order or currency convention differs.

**When it applies.** To every displayed number, date, or currency value. **When it does not apply.** No exception.

---

## 4. COMPLETE DESIGN SPECIFICATION

**Expansion tolerance testing (In-1):** every translatable-text component tested with a placeholder string 30% longer than its English default before being considered complete. **Text-in-images policy (In-2):** zero tolerance, verified per asset. **RTL readiness (In-3):** every directional icon (Chapter 11) documented with its required mirrored counterpart, even though RTL support is not yet implemented, so implementation is additive rather than requiring the icon set to be revisited from scratch.

---

## 5. MEASUREMENTS

Expansion tolerance: 30% minimum.

---

## 6. BEHAVIORAL RULES

**Before finalizing any new component's text-bearing anatomy.** Test with a 30%-expanded placeholder string per In-1.

---

## 7–9. MOTION / ACCESSIBILITY / RESPONSIVE

No distinct requirements beyond each affected chapter's own existing sections — internationalization is a content and layout-tolerance concern, not an independent motion or accessibility one, though In-3's RTL mirroring would interact with Chapter 6's grid reading-order accessibility requirements once implemented.

---

## 10. AI & FUTURE INTERFACES

A voice interface (Chapter 72) inherits this chapter's spirit directly: spoken pacing and phrasing must be genuinely re-composed per language, never a literal translation of English phrasing read aloud, since natural spoken rhythm varies by language far more than written text expansion ratios alone would predict.

---

## 11. DO / 12. DON'T

**Do:** Designing Chapter 18's button anatomy to gracefully wrap a 30%-longer label rather than truncating it. **Don't:** Hardcoding a diagram's axis labels as part of a static exported image, requiring a new image export for every future translation.

---

## 13. ANTI-PATTERNS

**Text baked into assets.** Exporting a diagram or infographic as a flat image with its labels rendered as part of the image itself, because it was faster than building the diagram from live, translatable text and positioned overlays. This is detected by attempting to select and copy any visible text as actual text, and fixed by rebuilding the asset with genuine text elements per In-2.

---

## 14. QUALITY ASSURANCE CHECKLIST

- [ ] Does the component tolerate 30% text expansion without breaking? *(In-1)*
- [ ] Is every visible word genuine, translatable text rather than baked into an image? *(In-2)*
- [ ] Is every directional icon's RTL-mirrored counterpart documented, even if not yet implemented? *(In-3)*
- [ ] Does every number, date, and currency value use locale-aware formatting? *(In-4)*

---

## 15. CROSS REFERENCES

Chapter 1 (P1, P2, P7). Chapter 4 (typography). Chapter 5 (spacing). Chapter 6 (grid reading order, RTL implication). Chapter 11 (directional icons). Chapter 13 (diagram text). Chapter 56 (translation-safe copy, direct dependent). Chapter 57 (number/date formatting, direct dependent). Master Vision §6.2.

---

## 16. FUTURE EXPANSION

RTL support (In-3) is documented in principle but not yet implemented — this should be revisited with real priority the first time a genuine RTL-language market is targeted.

---

*End of Chapter 54. The next chapter, per the authoring sequence, is Performance-Conscious Design Patterns.*
