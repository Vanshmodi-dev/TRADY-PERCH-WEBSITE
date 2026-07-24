# CHAPTER 63 — NAMING CONVENTIONS

**Trady Perch Design System Bible · Volume VI: Quality, Governance & Evolution**
*(Written in Phase 1, far ahead of its reading-order position — see Chapter 1, Section 0.2 and the Architecture's Recommended Authoring Sequence.)*

**Inherited From:** Design System Bible Chapter 1 (P1 Traceable Inheritance, P2 Singular Focus, P7 Reuse Before Invention), Chapter 2, Section 4 (the token segment grammar this chapter generalizes). Master Vision §3.2 (consistency compounds trust).

---

## 1. INTRODUCTION

Chapter 2 defined a naming grammar for one kind of artifact — tokens — and deliberately deferred one question: what casing convention actually renders that grammar, and does the same grammar extend to everything else in this system that also needs a name? Components need names. Files need names. Variants, states, and future chapters themselves need names. If each of those categories invents its own convention independently, the system fragments at exactly the layer meant to hold it together — its vocabulary.

This chapter exists to close that gap once, for every named artifact the Bible will ever produce, rather than leaving each future chapter to decide informally. It depends directly on Chapter 2's token grammar, which it does not replace — it extends. It is being written now, in Phase 1, specifically because Chapter 2 could not finish its own specification without it, and every Foundations chapter from Chapter 3 onward needs a settled casing convention before it can name a single real value. Every subsequent chapter in this Bible depends on it in the ordinary sense; there is no chapter in Volumes I through VII that does not, eventually, name something.

---

## 2. PHILOSOPHY

A naming convention's only real job is to make a name predictable *before* it is looked up — a contributor who needs the token for error-state border color should be able to guess `semantic.color.border.error` correctly, not search for it. A convention that fails this test provides no more value than no convention at all, because the lookup cost is identical either way.

Two alternatives were rejected. **Per-category conventions** — tokens in dot-notation, components in one casing, files in another, each locally reasonable — was rejected because it multiplies the number of rules a contributor must hold in mind from one to several, which is precisely the failure Principle 2 warns against applied to the system's own vocabulary. **A single, universal casing style applied indiscriminately to every kind of name** — forcing components into dot-notation, or tokens into PascalCase — was rejected for the opposite reason: casing carries meaning in most design and engineering contexts (PascalCase reads as "a type or component," dot-notation reads as "a path into a structured value"), and erasing that distinction for the sake of uniformity would remove information a contributor currently relies on, gaining nothing in return.

What this chapter commits to instead is **one grammar, several conventional renderings** — the same underlying logic Chapter 2 already established (tier, category, role, variant, in a fixed order), rendered in the casing convention each artifact type already carries an existing, legible expectation for.

---

## 3. CORE PRINCIPLES

### N-1 — One Grammar, Many Renderings

**Purpose.** Every named artifact follows the same underlying order — general to specific — regardless of its surface casing.

**Reasoning.** Descends from P2 and P7: one rule, understood once, generalizes better than several rules that happen to agree.

**Examples.** A token: `semantic.color.border.error`. A component: `Button` (general) with variant prop `variant="primary"` (specific) rather than a component literally named `PrimaryButton`. A file: `Chapter-03-Color-System.md` — chapter number (general, ordering) before title (specific, identity).

**When it applies.** To every artifact this Bible or its resulting system will ever name.

**When it does not apply.** No exception.

**Common misunderstandings.** Assuming "one grammar" means "one casing style" — it means one *order of generality*, rendered in whichever casing that artifact type already conventionally uses.

### N-2 — Casing Is Determined by Artifact Type, Not Preference

**Purpose.** Fix the casing convention per artifact type, permanently, so it is never a matter of individual style.

**Reasoning.** Descends from P1: an unfixed casing convention is itself an untraceable decision, remade differently by whoever is typing at the time.

**The fixed conventions:**
- **Tokens:** lowercase, dot-separated tiers/segments; kebab-case within any multi-word segment. `motion-duration.standard`, `semantic.color.text.error`.
- **Components:** PascalCase. `Button`, `PricingTierCard`, `SkeletonLoader`.
- **Component variants and states:** lowercase, single word or kebab-case if unavoidable. `primary`, `hover`, `disabled`, `read-only`.
- **Files (Bible chapters):** `Chapter-{NN}-Title-Case-With-Hyphens.md`, matching this Bible's own files exactly as already in use.
- **Files (other documentation or assets):** kebab-case throughout. `case-study-northwind-logistics.md`.

**When it applies.** To every new artifact, in every chapter, from this point forward.

**When it does not apply.** To content that must conform to an external, non-negotiable standard outside this system's control (a required filename format from a third-party platform, for instance) — in that narrow case, the external requirement wins, and the exception is documented per P1 rather than silently tolerated.

**Common misunderstandings.** Treating PascalCase-for-components as evidence that this Bible has quietly adopted a specific programming framework's convention. It has not — PascalCase is used here because it is the most widely legible convention for "this is a named, reusable thing" across design and engineering audiences alike, independent of any framework.

### N-3 — A Name Is Never Reused for a Different Meaning

**Purpose.** Once retired (Chapter 2, Section 4's lifecycle model), a name is never assigned to a new, unrelated artifact.

**Reasoning.** Descends from P1. A reused name breaks every historical reference to the original — a case study, a changelog entry, an old screenshot's caption — silently pointing to something else entirely.

**Examples.** If `Button` were ever deprecated in favor of a fundamentally redesigned successor, the successor is `Button2` or a genuinely new name, never a bare reassignment of `Button` to different anatomy.

**When it applies.** To every retirement, without exception.

**When it does not apply.** No exception.

**Common misunderstandings.** Assuming a long-retired name is "safe" to reuse once enough time has passed. Time does not resolve the ambiguity — old references do not expire alongside it.

---

## 4. COMPLETE DESIGN SPECIFICATION

**Chapter file naming**, fully specified: `Chapter-{NN}-{Title-In-Title-Case-With-Hyphens}.md`, where `{NN}` is always two digits (`01`, not `1`), matching the numbering in the Bible's own architecture document exactly. Appendices follow `Appendix-{Letter}-{Title}.md`.

**Component naming**, fully specified: a noun, in PascalCase, describing what the component *is* (`Card`), never what it currently contains (`GoldCard`) or where it is used (`PricingCard` is acceptable only if pricing-specific anatomy genuinely differs from a general Card — otherwise it is `Card` used in a pricing context, per Chapter 2's T-4 discipline against unnecessary Component-tier proliferation, applied here to components themselves).

**Variant and state naming**, fully specified: variants describe a role within the component (`primary`, `secondary`, `ghost`); states describe a condition (`hover`, `focus`, `disabled`, `loading`, `error`, `success`, `empty` — the eight states Chapter 39 will define in full). A variant and a state are never combined into one compound name (`primaryHover` is incorrect); they are tracked as two independent, orthogonal dimensions.

**Principle citation syntax**, formalized here for the whole Bible, first introduced informally in Chapter 1: `P{n}` for Tier 1 principles, `{ChapterInitials}-{n}` for Tier 3 principles (`T-1` for Design Tokens Architecture's first principle, `N-1` for this chapter's first principle). A Tier 2 (Volume-level) principle, once any Volume defines one, follows `V{volume-number}-{n}`.

---

## 5. MEASUREMENTS

- Chapter number padding: always two digits.
- Maximum token segments: four (inherited from Chapter 2, restated here as this chapter's own boundary case).
- Component names: one to three words, PascalCase; a fourth word is a signal the component may be doing two jobs (see Chapter 17's future anatomy discipline).
- Principle citation codes: no more than one hyphenated number per code (`T-1`, never `T-1-2`) — a principle needing a sub-number is a signal it should be split into two principles.

---

## 6. BEHAVIORAL RULES

**Before naming anything new.** Identify the artifact type first (token, component, variant, state, file), then apply that type's fixed convention from Section 4 — never the reverse.

**During review.** A reviewer checks any new name against Section 4's fixed conventions before checking anything about the artifact's actual design — a misnamed but well-designed component is still a defect, and a quick, mechanical one to catch early.

**Under disagreement.** There is little room for disagreement once an artifact type is identified correctly, since Section 4 fixes the convention outright — most naming disputes in practice turn out to be disagreements about the artifact's *category*, not its casing, and should be redirected there.

---

## 7. MOTION SPECIFICATION

Not applicable in the usual sense — this chapter names things, it does not move them. Its one relevant contribution: motion-duration and motion-easing tokens (Chapter 15) follow the same kebab-case-within-segment convention as every other token category, with no special-case exception for motion.

---

## 8. ACCESSIBILITY

Component and state names surface directly in code as ARIA roles, labels, and class names read by assistive technology tooling in some contexts — a clear, descriptive, role-based name (per N-1 and T-3, Chapter 2) is not only an internal-convenience matter; it is a small, direct accessibility asset, since a well-named state (`error`, not `st4`) is more likely to be labeled comprehensibly wherever it is exposed to a screen reader.

---

## 9. RESPONSIVE BEHAVIOUR

As established in Chapter 2, Section 9: no artifact is ever named per-breakpoint. This chapter adds the component-level corollary — there is no `MobileNav` and `DesktopNav` as two separate components; there is one `Navigation` component whose internal behavior adapts, per Chapters 49–51, without forking its own name.

---

## 10. AI & FUTURE INTERFACES

A voice interaction pattern, once named (Chapter 72), follows the same component-naming convention as any visual component — a conversational pattern is still a component, in this Bible's sense, even though it has no visible anatomy. A spatial-computing object (Chapter 73) follows the same rule. No new casing convention should be invented for a new medium without first checking, per Chapter 2's Section 10, whether the existing conventions genuinely fail to describe it — which, as of this writing, none has yet been shown to.

---

## 11. DO

Naming a new destructive-action confirmation dialog `Dialog` with a `variant="destructive"` prop, rather than inventing `DestructiveDialog` as a separate component — this correctly treats "destructive" as a variant (a role within the existing component) rather than a new artifact, consistent with N-1 and Chapter 2's T-4.

## 12. DON'T

Naming a token `errorColor` (camelCase, no tiering, no segment structure) instead of `semantic.color.text.error` — this fails N-2's fixed casing rule for tokens and discards the tier information Chapter 2's entire architecture depends on, reducing a structured, traceable name back into an opaque, flat one.

---

## 13. ANTI-PATTERNS

**Casing drift.** A contributor, under time pressure, names a new token in camelCase because that is the convention they are personally used to from other work. This is dangerous because casing is one of the cheapest things to get right and one of the most visually obvious things to get wrong in aggregate — a codebase with three casing conventions in circulation looks uncoordinated even where every individual decision was otherwise sound. It is detected by a simple linting pass against Section 4's fixed rules. It is fixed by renaming immediately, before the incorrect name accumulates references.

---

## 14. QUALITY ASSURANCE CHECKLIST

- [ ] Has the artifact's type (token, component, variant, state, file) been identified before naming it?
- [ ] Does the name follow that type's fixed convention from Section 4, exactly?
- [ ] Does the name describe general-to-specific order, per N-1?
- [ ] If this name replaces a retired one, is it genuinely new rather than a reassignment of the old name? *(N-3)*

---

## 15. CROSS REFERENCES

Chapter 1 (P1, P2, P7). Chapter 2 (the token grammar this chapter generalizes). Chapter 17 (component anatomy naming, once written). Chapter 39 (the eight canonical state names this chapter fixes the casing for). Every chapter in Volumes I through VII, implicitly, since every one of them names something.

---

## 16. FUTURE EXPANSION

Should a genuinely new artifact type emerge that does not fit token, component, variant, state, or file (an AI agent "skill" name, perhaps, in Chapter 71), its convention should be derived from N-1 before being invented independently — and added here as a sixth fixed convention only once, not proposed piecemeal across multiple chapters.

---

*End of Chapter 63. Every chapter from here forward names things according to this chapter's rules, whether or not it says so explicitly.*
