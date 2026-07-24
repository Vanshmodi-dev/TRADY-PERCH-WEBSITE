# CHAPTER 13 — ILLUSTRATION & DIAGRAM SYSTEM

**Trady Perch Design System Bible · Volume I: Foundations**
*First-canonical-draft.*

**Inherited From:** Master Vision §6.4 (Iconography & Imagery — the illustration ban). Design System Bible Chapter 1 (P6, P7), Chapter 3 (color rules), Chapter 11 (stroke language this chapter reuses).

---

## 1. INTRODUCTION

Master Vision §6.4 forbids illustrated mascots and cartoonish imagery outright, but it does not address a real, near-certain future need: a workflow diagram, a system architecture schematic, a data-flow illustration explaining how an AI agent connects to a client's existing tools. A technical automation company will need to explain technical relationships visually, and "no illustration, ever" is not, on inspection, actually what Master Vision requires — it requires no *illustrated character or mascot* imagery, a narrower and more specific prohibition this chapter separates from the legitimate, different category of a functional diagram.

This chapter depends on Chapter 11 directly — every diagram shares the icon system's stroke ratio and corner treatment rather than inventing its own. It is consumed by Chapter 32 (Charts, a close sibling discipline) and Chapter 59 (Documentation & Help Content Design), which will use diagrams extensively.

---

## 2. PHILOSOPHY

The rejected alternative is silence — leaving Master Vision's illustration ban unexamined and hoping the gap never surfaces. This was rejected because the gap is not hypothetical: a "How an AI agent integrates with your CRM" explanation is exactly the kind of content this brand will need to produce credibly, and forcing it into either a forbidden cartoon-illustration style or an awkward wall of unillustrated prose serves the brand poorly either way. This chapter closes the gap by drawing the actual line Master Vision's prohibition was gesturing at: character-based, decorative illustration is forbidden because it undercuts the "precision instrument" register (§3.3); a structural diagram, drawn in the same restrained, geometric language as everything else in this system, does not undercut that register at all — it reinforces it.

---

## 3. CORE PRINCIPLES

### Il-1 — Diagrams Represent Systems; They Never Depict People or Characters

**Purpose.** A diagram may represent a process, a data flow, or a system architecture. It may never depict a human figure, a character, a mascot, or an anthropomorphized object.

**Reasoning.** This is the precise line Master Vision §6.4's prohibition is actually drawing, made explicit: the ban is on character-based imagery specifically, not on visual explanation generally. A diagram of boxes and connecting lines carries none of the "selling science fiction rather than operational software" risk §3.3 warns about; a friendly robot mascot "helping" explain the same process does.

**Examples.** Permitted: a boxes-and-arrows diagram showing data flowing from a client's CRM through an AI agent into a reporting dashboard. Forbidden: the same diagram with a smiling robot character standing beside the arrows "explaining" them.

**When it applies.** To every diagram the brand produces.

**When it does not apply.** No exception.

**Common misunderstandings.** Assuming a highly simplified, geometric human silhouette (an icon-style "person" shape used to represent a user in a flow diagram) counts as a forbidden character. A minimal, iconographic figure representing a role (per Chapter 11's monoline system) is acceptable; a character with a face, personality, or expression is not — the test is whether the figure has been given identity, not merely whether a human shape appears at all.

### Il-2 — Diagrams Share the Icon System's Stroke Language

**Purpose.** Every diagram uses Chapter 11's exact stroke ratio, rounded caps and joins, and monoline construction — never a separately invented illustration style.

**Reasoning.** Descends from Principle 7: a diagram drawn in its own visual language, disconnected from the icon system already established, would immediately read as a foreign element dropped into the interface, breaking the "one hand" continuity Master Vision §25.10 requires.

**Examples.** A workflow diagram's boxes use the same corner radius and border treatment as Chapter 9's card elevation system; its connecting lines use Chapter 11's exact stroke weight and rounded terminations.

**When it applies.** To every diagram element — nodes, connectors, labels.

**When it does not apply.** No exception.

**Common misunderstandings.** Assuming a diagram's larger scale (often spanning much more of a page than a small icon) justifies a heavier stroke weight "for visibility." Chapter 11's Ic-1 stroke-to-size ratio already scales proportionally at larger sizes — a diagram element rendered larger uses the correspondingly thicker stroke that ratio specifies, not an independently chosen heavier weight.

### Il-3 — A Diagram Represents Something Literally Real, Never a Visual Metaphor

**Purpose.** Every element in a diagram corresponds to an actual, real component of the system being explained. No decorative or metaphorical element (a lightbulb representing "an idea," a puzzle piece representing "integration") is used.

**Reasoning.** Direct extension of Principle 6 (Diegetic Motion) into static diagrams: a diagram's entire purpose is explanatory clarity, and a metaphorical element asks the reader to translate a symbol into a meaning rather than simply seeing the real relationship directly — this is both less clear and, per Master Vision Chapter 27's forbidden-imagery list, exactly the "lightbulb-as-idea" cliché this brand's visual vocabulary already excludes for photography and should exclude identically here.

**Examples.** A "connects to" relationship is drawn as a literal line or arrow between two literal boxes representing the two real systems. It is never drawn as, say, a handshake icon standing in for "partnership."

**When it applies.** To every diagram.

**When it does not apply.** No exception.

**Common misunderstandings.** Assuming a simplified or abstracted representation of a real thing (a simple rectangle standing in for "your CRM," rather than an actual screenshot of it) counts as a forbidden metaphor. It does not — abstraction in service of clarity is different from metaphor in service of decoration; the rectangle still literally represents the real CRM, just without unnecessary visual detail.

### Il-4 — Diagram Color Follows the Same Restrained Rules as Everything Else

**Purpose.** Diagrams use Chapter 3's existing palette — never an independent, expanded color set chosen for diagram legibility alone.

**Reasoning.** Descends from Principle 3 and Chapter 3's C-1 (the closed sixteen-value palette): a diagram distinguishing five different data flows with five different, diagram-specific colors would both violate the closed palette and very likely exceed the Gold Budget or introduce off-palette hues entirely.

**Examples.** Different node types in a diagram are distinguished by shape, label, or stroke-versus-filled-outline treatment (never actually filled, per Ic-4's monoline rule extended here — distinguish by border style or icon pairing instead), not by an expanded rainbow of node colors.

**When it applies.** To every diagram.

**When it does not apply.** To a genuinely data-driven diagram that is, in substance, a chart rather than a structural diagram — that content is governed by Chapter 32's data-visualization sub-palette instead, which is permitted to extend Chapter 3's palette in a controlled, chapter-specific way Chapter 32 will define.

**Common misunderstandings.** Assuming this rule makes complex diagrams with many distinct elements impossible to read clearly. Differentiation through shape, label, line-style (solid versus dashed), and spatial grouping remains fully available — color is one tool among several, and this principle removes it as a crutch, not as the diagram's only means of clarity.

---

## 4. COMPLETE DESIGN SPECIFICATION

**Permitted diagram types:** process flow, system architecture, data flow, organizational hierarchy, timeline/sequence (sharing construction with Chapter 36's future Timeline component).

**Forbidden content:** any character, mascot, face, or anthropomorphized object (Il-1); any decorative metaphor standing in for a real concept (Il-3); any color outside Chapter 3's sixteen-value palette (Il-4, except where Chapter 32's data-visualization extension applies).

**Construction rules:** Chapter 11's exact stroke ratio and corner treatment (Il-2); node shapes limited to rectangles and rounded-rectangles, consistent with Chapter 9's card-corner treatment, once formalized; connecting lines solid by default, dashed to indicate an optional or conditional relationship.

---

## 5. MEASUREMENTS

Diagram stroke weights and corner radii are not independently specified here — they inherit Chapter 11's Section 4 values directly (Il-2), scaled per that chapter's existing size steps rather than a new diagram-specific scale.

---

## 6. BEHAVIORAL RULES

**Before creating any diagram.** Confirm every element corresponds to a real, literal system component (Il-3) and contains no character or mascot content (Il-1).

**During review.** Check color usage against Chapter 3's closed palette (Il-4) and stroke construction against Chapter 11 (Il-2).

---

## 7. MOTION SPECIFICATION

Where a diagram animates to explain a sequence (a data flow revealing step by step), it follows Master Vision §9.3's rule that process-visualizing motion must choreograph to match the logical sequence of steps — using Chapter 15's Standard tier per step, consistent with Chapter 7's Stacked Sequence pattern and the future Timeline component (Chapter 36).

---

## 8. ACCESSIBILITY

Every diagram requires a text alternative that describes the relationships it depicts, not merely its presence ("a diagram showing data flow between three systems" is insufficient; the alternative text or adjacent description must convey the actual relationships depicted) — a purely visual diagram with no equivalent textual explanation excludes a screen-reader user from information available to every other visitor.

---

## 9. RESPONSIVE BEHAVIOUR

A complex diagram built for desktop width may need a deliberately re-composed, simplified, or vertically-stacked equivalent at Mobile range (Chapter 8) rather than a naive scaled-down version that becomes illegible at small sizes — this follows the same art-direction-per-breakpoint logic Chapter 12 establishes for photography.

---

## 10. AI & FUTURE INTERFACES

A spatial environment (Chapter 73) could present a system diagram as genuinely three-dimensional, with real depth between represented layers — Il-3's literal-representation principle transfers directly and becomes, if anything, more powerful in three dimensions, where a data flow's actual directionality can be represented with real spatial movement rather than a flat arrow.

---

## 11. DO

A system-architecture diagram showing a client's CRM, an AI agent, and a reporting dashboard as three rounded-rectangle nodes in Chapter 3's palette, connected by monoline arrows matching Chapter 11's exact stroke weight, with a dashed connector indicating an optional integration path.

## 12. DON'T

Adding a small, friendly robot icon "narrating" the same diagram to make it feel more approachable. This directly violates Il-1 and reintroduces the exact robot-mascot cliché Master Vision Chapter 27 permanently disqualifies from this brand's visual vocabulary.

---

## 13. ANTI-PATTERNS

**Decorative diagram creep.** Adding visual flourishes (icons standing in for concepts rather than literal systems, gradient node fills, an expanded color set for "clarity") to an otherwise correct structural diagram, under the reasoning that a plainer diagram feels visually thin. This is dangerous because each individual addition seems to solve a real legibility concern while cumulatively reintroducing every visual excess this Bible's other chapters were built to prevent. It is detected by checking each diagram element against Il-1, Il-3, and Il-4 individually. It is fixed by removing any element that fails, and solving the underlying legibility concern through layout, labeling, or grouping instead of decoration.

---

## 14. QUALITY ASSURANCE CHECKLIST

- [ ] Does every diagram element represent a real system component, with no character, mascot, or face present? *(Il-1)*
- [ ] Does the diagram use Chapter 11's exact stroke ratio and corner treatment? *(Il-2)*
- [ ] Does every element correspond to something literally real, with no metaphorical stand-in? *(Il-3)*
- [ ] Does the diagram's color use stay within Chapter 3's closed palette (or Chapter 32's defined data-visualization extension)? *(Il-4)*
- [ ] Does the diagram have an equivalent textual description of its actual relationships, not just its presence?

---

## 15. CROSS REFERENCES

Chapter 1 (P6, P7). Chapter 3 (color). Chapter 9 (node corner-radius consistency, once formalized). Chapter 11 (stroke language). Chapter 15 (sequence motion). Chapter 32 (Charts, sibling discipline with its own color extension). Chapter 36 (Timelines & Steppers). Chapter 59 (Documentation, primary consumer). Master Vision §6.4, Chapter 27.

---

## 16. FUTURE EXPANSION

**Documented limitations.** This chapter has not yet been tested against a genuinely complex, many-node system diagram; its shape-and-line-style differentiation approach (Il-4) should be stress-tested against a real, complicated integration diagram before being treated as sufficient for every future case.

---

*End of Chapter 13. The next chapter, 3D & Render System, extends this same discipline into three dimensions.*
