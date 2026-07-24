# CHAPTER 57 — DATA, NUMBER & UNIT FORMATTING STANDARDS

**Trady Perch Design System Bible · Volume V: Content & Communication**

**Inherited From:** Master Vision §6.2 (tabular gold numerals as proof points). Design System Bible Chapter 1 (P1, P7), Chapter 4, Ty-5 (numeral treatment), Chapter 32 (Charts), Chapter 54, In-4 (locale-aware formatting).

---

## 1. INTRODUCTION

Master Vision §6.2 establishes that numerals are the site's proof points and deserve typographic distinction. This chapter ensures that distinction is backed by actual formatting consistency — how large numbers abbreviate, how currencies localize, how units are stated — rather than ad hoc choices made per instance.

This chapter depends on Chapter 4's Ty-5 and Chapter 54's In-4 directly. It is depended on by Chapter 22 (Tables) and Chapter 32 (Charts).

---

## 2. PHILOSOPHY

The rejected alternative is formatting each number as it comes up, trusting individual judgment to stay consistent across a growing library of case studies and dashboard views. This was rejected on the same Principle 7 grounds as every formatting question in this Bible: a fixed, small set of formatting rules, applied identically everywhere, is what makes numbers instantly comparable across contexts rather than each requiring its own mental translation.

---

## 3. CORE PRINCIPLES

### Nf-1 — Large Numbers Abbreviate at a Fixed Threshold, Consistently

**Purpose.** Any number at or above 10,000 abbreviates using a fixed suffix convention (K for thousands, M for millions) — below that threshold, the full number displays with locale-appropriate grouping separators.

**Reasoning.** Descends from Principle 7: a fixed threshold prevents the inconsistency of one metric showing "12,400" and an adjacent one showing "12.4K" for a comparable magnitude, purely because different contributors made different individual choices.

**Examples.** "8,400 hours saved" (below threshold, full number). "1.2M records processed" (above threshold, abbreviated).

**When it applies.** To every displayed count or measurement. **When it does not apply.** To a number where precision genuinely matters more than scannability (an exact dollar figure on an invoice, Chapter 60) — abbreviation is a case-study/dashboard-display convention, not a universal rule overriding financial-document precision.

### Nf-2 — Currency and Date Format Resolve by Locale, Per Chapter 54

**Purpose.** Every currency and date value formats according to the viewer's locale, directly extending Chapter 54's In-4 rather than restating it independently.

**Reasoning.** Direct application of Principle 7 — Chapter 54 already established this rule; this chapter cites rather than re-derives it, per the same citation discipline Chapter 41 and Chapter 53 both already establish for their own consolidation work.

**When it applies.** To every currency and date value. **When it does not apply.** No exception.

### Nf-3 — Every Proof-Point Numeral States Its Unit Explicitly

**Purpose.** A numeral functioning as a business proof point (Chapter 4's Ty-5) always displays its unit directly adjacent — "%", "hours," "×faster" — never a bare number requiring the surrounding sentence to supply the unit.

**Reasoning.** Descends from Principle 1: a numeral is the fastest thing a skimming reader's eye catches (that is the entire point of Ty-5's gold treatment); if the unit is only in the surrounding prose, a reader who catches the numeral without reading the sentence around it receives an ambiguous, untraceable fact.

**Examples.** "40%" not "40" (with "percent" only implied by context). "3.2× faster" not "3.2" alone.

**When it applies.** To every Ty-5 proof-point numeral. **When it does not apply.** No exception.

---

## 4. COMPLETE DESIGN SPECIFICATION

**Abbreviation threshold (Nf-1):** 10,000. **Suffix convention:** K (thousands), M (millions), one decimal place maximum ("1.2M," not "1.234M"). **Unit placement (Nf-3):** immediately adjacent to the numeral, same visual treatment (Chapter 4, Ty-5's gold, tabular styling extends to the unit symbol itself).

---

## 5. MEASUREMENTS

Abbreviation threshold: 10,000. Maximum decimal places in abbreviated form: 1.

---

## 6. BEHAVIORAL RULES

**Before displaying any large number.** Check it against the 10,000 threshold and apply Nf-1's convention consistently. **Before displaying any proof-point numeral.** Confirm its unit is explicitly adjacent, per Nf-3.

---

## 7–9. MOTION / ACCESSIBILITY / RESPONSIVE

Not independently specified — inherited from Chapter 4's Ty-5 (motion, the count-up animation) and Chapter 32 (Chart-specific number display).

---

## 10. AI & FUTURE INTERFACES

A voice interface's spoken number formatting has its own well-established conventions (numbers under a certain size spoken in full, larger ones summarized) that Chapter 72 should specify directly, informed by this chapter's underlying "consistency over ad hoc choice" reasoning rather than by literally reusing K/M suffixes, which have no spoken equivalent.

---

## 11. DO / 12. DON'T

**Do:** "1.2M automations run" consistently abbreviated the same way every time that magnitude appears across the site. **Don't:** One case study showing "1,200,000" in full while an adjacent one shows "1.2M" for a comparable metric — inconsistent per Nf-1, forcing readers to mentally reconcile two different conventions.

---

## 13. ANTI-PATTERNS

**Ad hoc formatting.** Formatting each number as it's written into a case study, without checking it against this chapter's fixed rules. This is detected by auditing number formatting consistency across the full case-study library, and fixed by normalizing to Nf-1 through Nf-3.

---

## 14. QUALITY ASSURANCE CHECKLIST

- [ ] Does every number at or above 10,000 use the fixed K/M abbreviation convention? *(Nf-1)*
- [ ] Does every currency and date value resolve by locale per Chapter 54? *(Nf-2)*
- [ ] Does every proof-point numeral display its unit explicitly adjacent? *(Nf-3)*

---

## 15. CROSS REFERENCES

Chapter 1 (P1, P7). Chapter 4 (Ty-5). Chapter 22 (Tables). Chapter 32 (Charts). Chapter 54 (In-4). Chapter 60 (invoice precision exception). Master Vision §6.2.

---

## 16. FUTURE EXPANSION

No open questions currently identified.

---

*End of Chapter 57. The next chapter, per the authoring sequence, is Notification & Alert Content Standards.*
