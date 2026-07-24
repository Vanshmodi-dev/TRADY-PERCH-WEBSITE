# CHAPTER 7 — LAYOUT SYSTEM

**Trady Perch Design System Bible · Volume I: Foundations**
*First-canonical-draft.*

**Inherited From:** Master Vision Chapter 7 (Visual Storytelling, in full — §7.1–§7.6), §6.3 (Spacing & Grid Philosophy). Design System Bible Chapter 1 (P2, P5, P7), Chapter 5 (spacing), Chapter 6 (grid).

---

## 1. INTRODUCTION

Master Vision Chapter 7 describes the homepage as a single continuous shot — light progression, density progression, compositional rhythm, visual breathing — but it describes this at the level of narrative intent, not as a set of reusable layout patterns a designer can actually select from when building a new section. This chapter is where that narrative intent becomes a small, named library of section-level layout patterns, so that "compositional rhythm" is achieved by choosing deliberately from a known set, not by improvising anew for every section.

This chapter depends on Chapter 5 (spacing) and Chapter 6 (grid) directly — every pattern defined here is built from their tokens. It depends on Chapter 1's Principle 5 (Sequence-Aware Correctness) specifically, because a layout pattern's correctness, per this chapter, is partly a function of where in the page it sits, not only how it looks alone. Chapter 8 (Responsive) owns how each pattern collapses at narrower viewports; Chapter 13 (Homepage Blueprint's Bible-level successor, once written) will assign one of this chapter's named patterns to each of the Master Vision's fifteen homepage sections.

---

## 2. PHILOSOPHY

The alternative rejected here is the most common failure mode in practice: building every section as its own bespoke composition, reusing nothing structural from the section before it. This produces pages where every section is individually defensible and collectively incoherent — exactly the "series of disconnected clips" Master Vision §7.1 warns against, rather than the "single continuous shot" it calls for. A small, named set of layout patterns, reused deliberately and varied on purpose (never accidentally), is what makes a scroll feel authored rather than assembled — the same insight Chapter 1's Principle 7 applies to tokens, here applied to whole-section composition.

---

## 3. CORE PRINCIPLES

### La-1 — Five Named Patterns, No Sixth Without Cause

**Purpose.** Every section in the system is built from one of five named layout patterns: **Centered Statement**, **Split Narrative**, **Full-Bleed Canvas**, **Structured Grid**, and **Stacked Sequence** (defined in Section 4).

**Reasoning.** Descends from Principle 7: a closed, small set of patterns is what makes "compositional rhythm" (Master Vision §7.5) a matter of *choosing which pattern comes next*, deliberately, rather than an open-ended design problem re-solved from scratch for every section.

**Examples.** The hero: Centered Statement. A Solutions section pairing headline and visual: Split Narrative. A Portfolio grid: Structured Grid.

**When it applies.** To every section-level composition decision.

**When it does not apply.** To composition *within* a single component (a card's internal layout, for instance), which is governed by that component's own chapter in Volume II, not by this page-level chapter.

**Common misunderstandings.** Assuming five patterns means every section looks alike. The patterns constrain *structure*; content, imagery, and the specific column spans chosen within a pattern (Chapter 6) still vary considerably.

### La-2 — Alignment Alternates With Adjacent Sections

**Purpose.** No section shares the exact same alignment treatment (centered, left-anchored asymmetric, full-bleed) as the section immediately before or after it.

**Reasoning.** Direct operationalization of Master Vision §7.5's compositional rhythm: a scroll where every section uses an identical alignment skeleton reads as a template regardless of each section's individual quality, because the eye receives no signal that it has moved somewhere new.

**Examples.** A Centered Statement hero followed by a Split Narrative Solutions section followed by a Structured Grid Industries section — three consecutive sections, no two sharing the same alignment treatment.

**When it applies.** To any two sections in direct vertical sequence.

**When it does not apply.** To sections separated by at least one section using a different pattern in between — the rule governs immediate adjacency, not the whole page's pattern distribution.

**Common misunderstandings.** Reading this as a rule about *pattern* repetition specifically. Two adjacent sections could theoretically use different patterns that still share the same alignment treatment (both left-anchored, for instance) — this principle is about the felt alignment, which is the more visually detectable repetition of the two.

### La-3 — Pattern Choice Follows the Section's Job, Never Habit

**Purpose.** A section's layout pattern is selected based on whether its job (per Master Vision Chapter 4's emotional specification and Chapter 11's cognitive one) is primarily persuasive/emotional or primarily informational — never selected because a designer defaulted to whichever pattern they used most recently.

**Reasoning.** Descends from Principle 5 directly: a layout pattern's correctness depends partly on its placement and purpose, not on its appearance alone. Master Vision §7.3 already establishes that persuasive sections should run more open and informational sections may run denser — this principle ties that distinction to an explicit pattern choice rather than leaving it to be rediscovered per section.

**Examples.** Case Studies (persuasive, per Master Vision Chapter 4's "Admiration and Desire" movement): Split Narrative or Full-Bleed Canvas, generously spaced. Industries (informational, scanning-mode): Structured Grid, comfortably denser.

**When it applies.** To every pattern selection.

**When it does not apply.** No exception — a designer who cannot state which job a section is doing has not yet finished designing it, regardless of which pattern they reach for.

**Common misunderstandings.** Assuming "informational" sections may ignore Chapter 5's spacing generosity altogether. Density is relative within this system's already-generous baseline (Chapter 5, Section 2's philosophy) — even the denser Structured Grid pattern remains more open than a typical enterprise-SaaS grid.

### La-4 — No More Than Two Dense Sections Without a Quiet One Between

**Purpose.** Direct restatement of Master Vision §7.6: the page never places more than two visually dense (informational) sections back to back without an intentionally quieter, more spacious one between them.

**Reasoning.** Same reasoning as §7.6 — constant intensity, even where no individual section is objectionable, fatigues attention the way a piece of music with no dynamic variation exhausts a listener regardless of how pleasant any single note is.

**Examples.** Technology Stack (dense) → Problems We Solve (quieter, per Master Vision's own worked example in §7.6) is the canonical case this principle is named for.

**When it applies.** To the sequence of any three or more consecutive sections.

**When it does not apply.** To a page with fewer than three sections total, where the question does not yet arise.

**Common misunderstandings.** Treating "quiet" as a property of a pattern rather than of its spacing and content density within that pattern. A Structured Grid can be made comparatively quieter (fewer items, more generous gaps) just as a Split Narrative can be made denser — the pattern sets structure; density is a separate, tunable dimension within it.

---

## 4. COMPLETE DESIGN SPECIFICATION

**The five patterns:**

1. **Centered Statement.** Single column, centered within the Content container, generous vertical padding (`padding.hero` or `section-lg`, Chapter 5). Used for moments doing brand work rather than information work — the hero, a manifesto-style closing statement.
2. **Split Narrative.** Two-region, asymmetric span (5/7 or 7/5, per Chapter 6's Gr-1), pairing reading content with a visual, metric, or supporting element.
3. **Full-Bleed Canvas.** Canvas-container background (image, video, or render) with a nested Content-container region for any actual reading text, per Chapter 6's Gr-4.
4. **Structured Grid.** A repeating grid of like items (cards, tiles) at a fixed column count appropriate to viewport, used for scannable, comparable content — Industries, Portfolio.
5. **Stacked Sequence.** Vertical, single-column arrangement of sequential steps, each occupying its own row, used for process or chronological content — How We Work, a Timeline component (Chapter 36).

**Assignment guidance (Master Vision Chapter 13, cross-referenced):** Hero → Centered Statement. Technology Stack → Structured Grid. Problems We Solve → Split Narrative. Solutions → Split Narrative. Industries → Structured Grid. How We Work → Stacked Sequence. Portfolio → Structured Grid. Case Studies → Full-Bleed Canvas or Split Narrative. Interactive Demo → Centered Statement (framed) or Split Narrative. Testimonials → Structured Grid or Centered Statement (single, larger quote treatment). Pricing → Structured Grid (three-up, per Chapter 1's own symmetric exception). FAQ → Centered Statement, narrow measure. Contact → Centered Statement.

---

## 5. MEASUREMENTS

- **Named patterns: 5.** *(La-1)*
- **Maximum consecutive same-alignment sections: 1** — i.e., no two in a row. *(La-2)*
- **Maximum consecutive dense sections: 2**, per Master Vision §7.6 and La-4.
- **Centered Statement measure:** constrained to Chapter 4's 68ch for any body text, regardless of the section's own width, since a Centered Statement's job is often reading-heavy (FAQ, manifesto copy).

---

## 6. BEHAVIORAL RULES

**Before building a new section.** Identify its job (persuasive/emotional vs. informational, per La-3) before selecting a pattern.

**During review.** Check the section against its immediate neighbors for La-2's alignment-alternation rule and La-4's density-sequencing rule.

**Under a proposal for a sixth pattern.** Apply Principle 7 — show that all five existing patterns fail the specific new need before adding one.

---

## 7. MOTION SPECIFICATION

Each pattern's entrance motion, once specified fully in Chapters 40–41, should be pattern-consistent — every Structured Grid entrance behaves the same way across the site (its cards reveal in the same stagger logic), so that pattern recognition (La-1's whole purpose) extends into motion as well as static composition, not only the latter.

---

## 8. ACCESSIBILITY

Every pattern must resolve to a single, linear reading order regardless of its visual arrangement — Split Narrative's two regions, in particular, must have a defined, sensible source order (typically: primary reading content before supporting visual) so a screen reader's traversal matches the section's actual argument, not its visual left-to-right arrangement, which Chapter 6, Section 8 already flags as a general grid concern this chapter inherits directly.

---

## 9. RESPONSIVE BEHAVIOUR

Each pattern has a defined mobile collapse, owned formally by Chapter 8: Split Narrative stacks to a single column (reading content first); Structured Grid reduces its column count; Full-Bleed Canvas retains its edge-to-edge treatment but the nested Content region's padding shifts per Chapter 5's mobile values; Stacked Sequence is largely unaffected, since it is already single-column by design; Centered Statement narrows its measure proportionally.

---

## 10. AI & FUTURE INTERFACES

A voice interface has no visual pattern, but Stacked Sequence's ordering logic — one step at a time, in a fixed order — is the direct structural analogue for how a voice assistant should walk a user through a multi-step process (Chapter 72). A spatial environment (Chapter 73) will need each of these five patterns re-imagined in three dimensions; Full-Bleed Canvas in particular — an edge-to-edge flat treatment — has the least obvious spatial equivalent and should be treated as an open design problem when Chapter 73 is written, not assumed to translate directly.

---

## 11. DO

Following a dense Structured Grid (Technology Stack) with a spacious Split Narrative (Problems We Solve) that also changes alignment from a grid's implicit centered symmetry to an asymmetric left-anchored treatment — satisfying La-2 and La-4 in the same transition.

## 12. DON'T

Using Structured Grid for three consecutive sections (Technology Stack, then Industries, then a features grid) because each individually seemed like "obviously a grid." This violates La-2 (repeated alignment) and very likely La-4 (three dense sections with no quiet section between the first and third).

---

## 13. ANTI-PATTERNS

**Pattern monoculture.** Defaulting to the same one or two patterns for nearly every section, because they are familiar and fast to build. This is dangerous because it produces exactly the flat, template-like scroll Master Vision §7.1 warns against, even though no single section, examined alone, looks wrong. It is detected by listing every section's pattern and alignment in sequence and checking for repetition against La-1 and La-2. It is fixed by deliberately reassigning at least one section per repeated run to a different pattern that still legitimately serves its content's job.

---

## 14. QUALITY ASSURANCE CHECKLIST

- [ ] Is this section built from one of the five named patterns, with any sixth pattern proposal justified against all five first? *(La-1)*
- [ ] Does this section's alignment differ from both immediate neighbors? *(La-2)*
- [ ] Was the pattern chosen based on the section's actual job, statable in one sentence, rather than habit? *(La-3)*
- [ ] Does the surrounding sequence avoid three or more consecutive dense sections? *(La-4)*
- [ ] Does the pattern's reading order match its visual argument, independent of visual left-to-right arrangement?

---

## 15. CROSS REFERENCES

Chapter 1 (P2, P5, P7). Chapter 5 (spacing). Chapter 6 (grid, source order accessibility note). Chapter 8 (responsive collapse per pattern). Chapters 40–41 (pattern-consistent motion). Master Vision Chapter 4, Chapter 7 in full, §6.3, §11.2 (the homepage question sequence this chapter's pattern assignments serve).

---

## 16. FUTURE EXPANSION

**Possible future additions.** A sixth pattern — a "Comparison Table" layout, perhaps, for a future dashboard or detailed pricing breakdown — may be warranted once Chapter 22 (Tables) reveals a genuine structural need the five existing patterns cannot serve, per La-1.

**Documented limitations.** The pattern-to-section assignment guidance in Section 4 is this chapter's own recommendation, not a binding requirement of the Master Vision itself — Chapter 13's eventual full homepage specification should be treated as authoritative if it ever diverges from this chapter's suggestions.

---

*End of Chapter 7. The next chapter, Responsive & Breakpoint System, defines how every pattern, span, and spacing value in Chapters 4 through 7 actually resolves across a real range of devices.*
