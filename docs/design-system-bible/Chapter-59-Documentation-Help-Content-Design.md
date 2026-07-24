# CHAPTER 59 — DOCUMENTATION & HELP CONTENT DESIGN

**Trady Perch Design System Bible · Volume V: Content & Communication**

**Inherited From:** Master Vision §16.1 (Voice & Tone), §19.8 (AI Educational Style). Design System Bible Chapter 1 (P2), Chapter 13 (Illustration & Diagram System), Chapter 30 (Tooltips, scope boundary), Chapter 37 (Accordions).

---

## 1. INTRODUCTION

Master Vision §19.8 already defines an educational register for the AI: plain analogies over jargon, concrete examples over abstract description, a check on whether the explanation landed. This chapter applies that same register to static, written documentation — a future knowledge base (Master Vision §14.2, deferred at launch but planned) — so the two never diverge as the content library grows.

This chapter depends on Master Vision §19.8 and §16.1 directly. It is depended on by Appendix A (Presenting the System), which is, recursively, an instance of this chapter's own subject matter.

---

## 2. PHILOSOPHY

The rejected alternative is letting documentation develop its own voice independently, since it's typically written by a different team (support, technical writing) than whoever crafts the AI's conversational register. This was rejected because a visitor moving between a help article and a conversation with the AI assistant should never be able to tell, by tone alone, that two different authors were involved — consistency here is a direct extension of the One-Brand Test (Master Vision §25.10) applied to written content specifically.

---

## 3. CORE PRINCIPLES

### Dc-1 — Documentation Teaches at the AI's Own Educational Register

**Purpose.** Every help article uses Master Vision §19.8's exact register — plain analogies, concrete examples, no unexplained jargon — regardless of who authors it or which team maintains it.

**Reasoning.** Direct restatement of §19.8, extended from a conversational register to a written one, for the One-Brand consistency reason stated above.

**When it applies.** To every documentation and help article. **When it does not apply.** No exception.

### Dc-2 — Every Article Answers Exactly One Question, Named in Its Title

**Purpose.** A help article's title states the specific question it answers ("How do I connect my CRM?") rather than a vague topic label ("CRM Integration") — and the article's body answers only that question, referring elsewhere for related-but-distinct questions rather than expanding into a broader, multi-topic document.

**Reasoning.** Descends from Principle 2: a title stating the exact question lets a searching user (Chapter 29) immediately confirm relevance, and a single-question scope keeps each article a complete, self-contained answer rather than a partial one requiring several other articles to fully resolve.

**When it applies.** To every help article. **When it does not apply.** No exception.

### Dc-3 — Every Example Is Complete and Directly Usable, Never a Truncated Fragment

**Purpose.** Any configuration or process example in documentation is shown complete enough to actually follow step by step — never an abbreviated fragment assuming context the reader must independently supply.

**Reasoning.** Descends from Principle 1: a truncated example is untraceable back to a working result, forcing the reader to guess the missing pieces, which directly contradicts the "assume the future reader knows nothing important is left to interpretation" standard this Bible holds itself to throughout.

**When it applies.** To every example in documentation. **When it does not apply.** No exception.

---

## 4. COMPLETE DESIGN SPECIFICATION

**Article anatomy:** Title (stated as the specific question, per Dc-2) → brief context (why this matters) → step-by-step answer, using Chapter 13's diagram system where a visual aids clarity → complete example (Dc-3) → related-questions links (never expanded inline, per Dc-2's single-question scope).

**Token consumption:** Chapter 4's typography throughout, Chapter 37's Accordion for FAQ-style article sections, Chapter 13's diagrams for process explanation, Chapter 30's Tooltip for brief inline term clarification only (per that chapter's own scope boundary — anything requiring more than a sentence belongs here, not in a tooltip).

---

## 5. MEASUREMENTS

Not independently specified — inherits Chapter 4's typography and Chapter 56's brevity standard extended to a longer-form context (an article may run to several paragraphs where a button label may not, but each individual sentence still passes Chapter 56's skeptical-reader test).

---

## 6. BEHAVIORAL RULES

**Before publishing any article.** Verify its title states a specific question, per Dc-2, and its examples are complete, per Dc-3.

---

## 7–9. MOTION / ACCESSIBILITY / RESPONSIVE

Not independently specified — see Chapter 37 (Accordion motion/accessibility) and Chapter 8 (responsive typography) for the components this content type consumes.

---

## 10. AI & FUTURE INTERFACES

This chapter's entire premise — one educational register, shared between written documentation and the AI's spoken/typed responses — is itself the direct answer to this section: Chapter 71's future AI-native interfaces should treat this shared register as already settled, not as a question to re-derive.

---

## 11. DO / 12. DON'T

**Do:** An article titled "How do I connect my CRM?" answering exactly that question with a complete, step-by-step example. **Don't:** An article titled "CRM Integration" that sprawls across connection setup, troubleshooting, and advanced configuration all at once — violates Dc-2's single-question scope.

---

## 13. ANTI-PATTERNS

**Scope creep within one article.** Expanding a single help article to cover every tangentially related question, rather than linking to separate, focused articles. This is detected by checking whether an article's title still accurately describes everything within it as it grows, and fixed by splitting overgrown articles per Dc-2.

---

## 14. QUALITY ASSURANCE CHECKLIST

- [ ] Does the article use Master Vision §19.8's educational register consistently? *(Dc-1)*
- [ ] Does its title state the specific question it answers, and does its body answer only that question? *(Dc-2)*
- [ ] Is every example complete and directly followable? *(Dc-3)*

---

## 15. CROSS REFERENCES

Chapter 1 (P1, P2). Chapter 4 (typography). Chapter 13 (diagrams). Chapter 29 (search, title-relevance consumer). Chapter 30 (tooltip scope boundary). Chapter 37 (accordion). Appendix A (recursive self-application). Master Vision §16.1, §19.8, §25.10.

---

## 16. FUTURE EXPANSION

This chapter is written well in advance of the knowledge base it will govern (Master Vision §14.2, still deferred at launch) — it should be revisited once real content volume exists to test Dc-2's single-question scoping against genuine user search behavior.

---

*End of Chapter 59. The next and final Volume V chapter, per the authoring sequence, is Print & Physical Collateral Standards.*
