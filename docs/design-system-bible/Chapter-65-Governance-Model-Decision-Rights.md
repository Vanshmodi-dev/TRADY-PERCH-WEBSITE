# CHAPTER 65 — GOVERNANCE MODEL & DECISION RIGHTS
## (Full Version — Supersedes the Phase 1 Lightweight Draft)

**Trady Perch Design System Bible · Volume VI: Quality, Governance & Evolution**

**Versioning note, per Chapter 64's Vs-1:** this chapter is an additive revision of the lightweight Phase 1 draft, not a replacement of its substance. Principles Gov-1, Gov-2, and Gov-3 below are the original draft's principles, preserved; Gov-4 through Gov-6 are new, added now that Volumes I through V exist to inform them. The original draft is archived, per Chapter 66's lifecycle process, at `Chapter-65-Governance-Model-LIGHTWEIGHT-DRAFT.md` for historical reference.

**Inherited From:** Design System Bible Chapter 1 (P1, P8, in full). Chapters 2 through 64, whose real, accumulated escalation history (per the lightweight draft's own Section 16) informs this fuller treatment.

---

## 1. INTRODUCTION

Every chapter in this Bible states a rule. This chapter states who is allowed to change one — the single most common gap in design systems that otherwise look complete, and the gap the lightweight Phase 1 draft opened by naming an interim authority without a full decision-rights structure behind it. This chapter provides that structure now that real component work (Volumes I through V) exists to have actually tested the interim authority against.

This chapter depends on Chapter 1's Principle 8 directly, since it is the formal escalation path that principle has pointed to since Chapter 1 was first written. It is depended on by Chapter 66 (Component Lifecycle), Chapter 67 (Contribution Guidelines), and Chapter 69 (Design Debt Register).

---

## 2. PHILOSOPHY

The alternative the lightweight draft already rejected — deferring any governance answer until this chapter existed in full — remains rejected for the same reason. What this fuller version additionally rejects is a single, undifferentiated approval authority for every kind of decision, from a minor Component-tier token to an amendment of Chapter 1's own eight principles. Those two decisions do not carry remotely comparable risk, and treating them identically either over-burdens routine work with unnecessary process or, more dangerously, under-burdens the rare, highest-stakes decision with the same lightweight authority that approves an ordinary token.

---

## 3. CORE PRINCIPLES

### Gov-1 — One Named Authority for Routine Decisions *(preserved from the lightweight draft)*

**Purpose.** The Design System Architect role holds standing approval authority for ordinary, non-Tier-1 proposals — new Component-tier tokens, individual component refinements, content and copy decisions.

**Reasoning.** Descends from Principle 1, as originally stated: an authority that isn't named is an authority nobody can actually cite.

**When it applies.** To ordinary, routine proposals. **When it does not apply.** To Tier 1 principle amendments or systemic, Bible-wide structural changes, which Gov-5 now governs at a higher bar.

### Gov-2 — Escalation Requires a Documented Disagreement *(preserved from the lightweight draft)*

**Purpose.** Escalation beyond routine authority requires a documented, specific disagreement that survived Chapter 1's derivation test — never a first resort, never a matter of undocumented preference.

**Reasoning.** Unchanged from the original draft.

**When it applies.** To any disagreement surviving the derivation test's first four steps. **When it does not apply.** To questions the derivation test itself already resolves.

### Gov-3 — No Retroactive Invalidation *(preserved from the lightweight draft)*

**Purpose.** Decisions made under the lightweight draft's process remain valid under this fuller version unless specifically revisited.

**Reasoning.** Unchanged from the original draft, now additionally serving as this chapter's own proof of its stated commitment to non-retroactive, additive governance.

**When it applies.** To every decision made before this chapter's publication. **When it does not apply.** To a decision independently found to violate a Chapter 1 principle, which was always invalid regardless of who approved it.

### Gov-4 — Decision Authority Scales With Blast Radius

**Purpose.** The approval tier required for any proposal scales with how many downstream chapters and shipped components it would affect if wrong — a three-tier structure: **Routine** (Gov-1's standing authority — a single component's refinement), **Structural** (a small Review Board, formed per Gov-6 — a new Core token, a change affecting multiple component chapters), **Foundational** (unanimous Review Board consent, per Gov-5 — any amendment to Chapter 1's eight principles).

**Reasoning.** Descends from Principle 8 (proportionality is already implicit in how P8 reserves final arbitration for genuine conflicts, never routine ones) and from the plain fact, now visible across 64 written chapters, that a Core color value affects vastly more downstream content than a single component's padding — treating both as requiring identical approval effort is neither efficient for the small decision nor safe for the large one.

**Examples.** Chapter 32's new `slate.500` Core color (Structural: affected the closed Chapter 3 palette and every future chart) required more than Gov-1's routine authority alone, even though, in practice, it was resolved through this Bible's own T-1/T-2 documentation discipline functioning as the review record. A hypothetical future proposal to remove Principle 4 (Restraint as Default) would require Foundational-tier unanimous consent, given how many chapters (nearly every one) cite it.

**When it applies.** To every proposal, classified at its proposal stage. **When it does not apply.** No exception — misclassifying a Foundational change as Routine to avoid process is itself a governance violation, detected the same way any other anti-pattern in this Bible is detected: by checking the proposal's actual downstream reach against Chapter 15 (§15, Cross References) style citation density.

### Gov-5 — Tier 1 Principles Amend Only Through Unanimous Review Board Consent

**Purpose.** Any change to Chapter 1's eight principles (P1–P8) — including wording clarification that could shift meaning, not only outright removal — requires unanimous consent from the full Review Board (Gov-6), never a single authority's approval, however senior.

**Reasoning.** Descends directly from Chapter 1, Section 16's own stated research question: whether P8's single-arbiter model remains sufficient for a genuinely foundational change. This principle answers that question conservatively — the highest-stakes decision in the entire Bible should require the broadest possible consent, not rely on a single arbiter even at the top of the hierarchy, since every other chapter's authority ultimately traces back to these eight principles being trustworthy.

**Examples.** Adding a hypothetical ninth principle (which Chapter 1, Section 16 already anticipates as possible, gated on multiple independent Anti-Pattern Library entries pointing to the same gap) would require this unanimous process, not a single Architect's sign-off, however well-justified the proposal.

**When it applies.** To any change touching P1–P8's actual text or meaning. **When it does not apply.** To citing or applying an existing principle in a new context, which requires no amendment at all — only a genuine wording or scope change to the principles themselves triggers this bar.

### Gov-6 — The Review Board Forms From Active Contributors, Not a Fixed Permanent Body

**Purpose.** The Review Board (referenced in Gov-4 and Gov-5) consists of whoever is actively contributing to the Bible and its implementation at the time a Structural or Foundational decision arises — not a fixed, permanently-appointed committee that might grow disconnected from the system's actual current state.

**Reasoning.** Descends from Principle 7 applied to governance structure itself: a fixed permanent board risks becoming exactly the kind of unexamined institutional fixture this Bible's own anti-pattern reasoning warns against elsewhere (Chapter 1's Anti-Pattern 2, Premature Invention, generalized to organizational structure) — a board composed of whoever is genuinely, currently doing the work stays naturally calibrated to the system's real, present state.

**When it applies.** To the formation of any Review Board convened under Gov-4/Gov-5. **When it does not apply.** No exception.

---

## 4. COMPLETE DESIGN SPECIFICATION

**Three-tier authority structure (Gov-4):** Routine → Design System Architect (Gov-1). Structural → Review Board, majority consent. Foundational → Review Board, unanimous consent (Gov-5). **Review Board composition (Gov-6):** active contributors at time of decision, convened ad hoc, not a standing appointment.

---

## 5. MEASUREMENTS

Authority tiers: 3. Consent requirement: majority (Structural), unanimous (Foundational).

---

## 6. BEHAVIORAL RULES

**Before any proposal.** Classify it against Gov-4's three tiers before seeking approval, per the blast-radius test. **Under any Foundational proposal.** Convene the full active Review Board and require unanimous consent per Gov-5, with no exception for expedience.

---

## 7–10. MOTION / ACCESSIBILITY / RESPONSIVE / AI

Not applicable — this chapter governs organizational process, not a visual, motion, or platform category.

---

## 11. DO / 12. DON'T

**Do:** Classifying a proposed new Core color as Structural (per Gov-4, given Chapter 3's closed-palette blast radius) and routing it through Review Board majority consent rather than a single Architect's sign-off. **Don't:** A single senior contributor unilaterally deciding to soften Principle 4 (Restraint as Default) "because it seems overly strict in practice" — a direct Gov-5 violation regardless of how reasonable the softening might sound in isolation.

---

## 13. ANTI-PATTERNS

**Tier-shopping.** Classifying a genuinely Structural or Foundational proposal as Routine to avoid the higher-consent process, because the lower bar is faster to clear. This is dangerous because it is exactly how a foundational principle could be quietly eroded through a series of individually-approved "routine" changes that, in aggregate, amount to a Foundational shift no single decision-maker ever formally reviewed at the correct tier. It is detected by auditing any change's actual downstream citation count (per each chapter's own Section 15) against the tier it was approved under. It is fixed by re-reviewing the change at its correct, higher tier retroactively.

---

## 14. QUALITY ASSURANCE CHECKLIST

- [ ] Has this proposal been classified against Gov-4's three tiers based on its actual downstream reach? *(Gov-4)*
- [ ] If Foundational, has unanimous Review Board consent been obtained, not merely majority or single-authority approval? *(Gov-5)*
- [ ] Is the Review Board composed of currently active contributors, not a stale, fixed appointment? *(Gov-6)*
- [ ] Has escalation followed Gov-2's documented-disagreement requirement rather than being invoked prematurely?

---

## 15. CROSS REFERENCES

Chapter 1 (P1, P7, P8, and Section 16's own research question, now answered by Gov-5). Chapter 2 (§4's original placeholder, now fully formalized). Chapter 63 (naming exceptions). Chapter 64 (versioning, breaking-change classification informs Gov-4's tiering). Chapter 66 (lifecycle, approval gates). Chapter 67 (contribution process, direct dependent). Chapter 69 (design debt, tier-shopping detection).

---

## 16. FUTURE EXPANSION

**Documented limitations.** This governance structure has not yet been tested against a genuine three-or-more-way Foundational disagreement — Chapter 1, Section 16's open research question about whether P8's model needs an explicit P1–P7 ranking remains open, and this chapter's unanimous-consent requirement for Gov-5 is this Bible's answer for now, subject to revision if a real deadlock ever occurs in practice.

---

*End of Chapter 65. The next chapter, per the authoring sequence, is Component Lifecycle.*
