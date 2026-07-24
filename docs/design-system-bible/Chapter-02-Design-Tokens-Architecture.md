# CHAPTER 2 — DESIGN TOKENS ARCHITECTURE

**Trady Perch Design System Bible · Volume I: Foundations**

**Inherited From:** Master Vision Document Chapter 20 (Design Token Philosophy, in full — §20.1–§20.11), §3.2 (Consistency compounds trust), §6.1–§6.6 (Visual Language, whose values this architecture will eventually carry), §9.5 (Reduced Motion Contract), §25.5, §25.9, §25.10 (Ecosystem continuity, the One-Brand Test). Design System Bible, Chapter 1 (all eight principles, P1–P8, in full — this chapter is the first real test of whether those principles can govern an actual artifact rather than only a decision). Where this chapter and either source conflict, the earlier source is correct and this chapter must be revised.

---

## 1. INTRODUCTION

The Master Vision spends an entire chapter — Chapter 20 — explaining why a spacing scale should follow a deliberate ratio, why a radius scale should stay small and disciplined, why a shadow system should resolve into discrete steps rather than a continuous range. It explains all of this deliberately without ever naming a single token, because, as its own opening line states, tokens are philosophy before they are code, and that document's job was to make sure the philosophy was sound before anyone started naming things. This chapter is where the naming starts.

Design Tokens Architecture exists to answer a question the Master Vision correctly left open: given that a spacing scale, a radius scale, and nine other categories all need this same discipline, what is the actual, shared structure they all live inside? Without an answer, each of Chapters 3 through 16 would need to invent its own local convention for how its values are organized, named, and referenced — and eleven independently invented conventions is a worse outcome than one that none of them had to invent, because it reintroduces, at the level of the token system itself, exactly the inconsistency Principle 7 (Reuse Before Invention) exists to prevent everywhere else.

This chapter depends directly on Chapter 1, in full. Its own Core Principles, defined in Section 3, are not a fresh set of ideas — they are Chapter 1's eight principles, specifically P1, P2, P3, and P7, applied to one particular kind of artifact: the token. Every subsequent chapter in Volume I — Color, Typography, Spacing, Grid, Layout, Responsive, Elevation, Materials, Iconography, Motion & Timing, Sound & Haptics — populates the structure this chapter defines rather than inventing its own. Every component chapter in Volume II consumes that structure without exception. Chapter 8 (Responsive & Breakpoint System) depends on this chapter's resolution model to explain how one token can carry different values at different viewports without becoming two tokens. Chapter 52 (Dark Mode & Theming Architecture) depends on the contrast-metadata convention this chapter introduces in Section 8. Chapter 63 (Naming Conventions) takes the grammar this chapter defines for tokens specifically and generalizes it to components, files, and every other named artifact in the system — which is exactly why, per Chapter 1's own writing-order note, that chapter's core naming logic needed to exist here, now, well ahead of its position in the reading order.

---

## 2. PHILOSOPHY

A token system's real value is not convenience. It is the mechanical enforcement of a promise: that a decision made once, correctly, does not have to be re-made — or re-argued — every time it is needed again. Getting the *shape* of that promise wrong at the outset is more expensive than any individual token value being wrong later, because every category built on top of a flawed shape inherits the flaw, and by the time it's discovered, dozens of chapters will already have been written against it.

Four possible shapes were available, and three were rejected.

**A flat system** — every value a plain, literal fact, with no layer of meaning on top of it — was rejected first. In a flat system, a component references `#0A0A0B` directly, wherever it needs the brand's near-black background. This is simple, and it fails the moment that exact shade is ever revisited: the Master Vision's own near-black value has already been described as tunable within a range (§6.1), and a flat system would require finding and correcting every individual reference by hand. Worse, a flat system makes Principle 3 — The Scarce Signal — impossible to audit: there is no single place to look and ask "how much of this screen is actually gold," because gold, in a flat system, is just one more literal value scattered wherever someone typed it.

**A semantic-only system** — no raw layer at all, only role-based names, each one directly assigned its own literal value — was rejected second. This solves the auditability problem for any single role, but it fractures the *palette* itself: there is no longer one place where "this is the brand's gold" is stated once. Two roles that happen to both want the exact same gold would each carry their own independently assigned value, and the two would silently drift apart the first time either is edited without the editor remembering the other exists.

**An over-layered system** — core, semantic, component, and one or two further layers of sub-component or context-specific overrides — was rejected third, on the same grounds Chapter 1 rejects an oversized rulebook: a structure a designer cannot hold in mind at the moment they need it does not actually govern anything. A four-or-five-tier model might, in principle, offer more precision, but Principle 7 — Reuse Before Invention — applies to the tier system exactly as it applies to any other proposed addition: a fourth tier must be shown insufficient with three before it is added, and as of this writing, no such demonstration has ever been made.

**Wholesale adoption of another design system's token layering** — Material Design's, or any other established system's exact tier model — was rejected fourth, for the same reason Chapter 1 rejects borrowing principles from other companies outright. A borrowed token architecture encodes borrowed assumptions about how much variation a brand actually needs in each category. Trady Perch's real needs are asymmetric in a way no other system was built to anticipate: extreme, disciplined scarcity in color (§6.1's 10% gold ceiling has no equivalent constraint in most systems this Bible could have copied from) alongside a comparatively generous, considered range in spacing and type (§6.2–§6.3). A structure built for a different brand's asymmetry will not fit this one by coincidence.

What remains — and what this chapter commits to — is a **three-tier resolution model**: Core, Semantic, and Component, in that order, each one referencing the tier below it and never restating a value the tier below it already owns. The pedagogical device this chapter introduces, to be used every time a new token is considered, is **the Resolution Question**: *at which tier does this value's reason for changing actually live?* A value that would only ever change because the entire brand's palette changes belongs at Core. A value that would change because one specific *role* needs to differ from another role sharing the same raw value belongs at Semantic. A value that would only ever change because one specific component's specific variant needs an exception belongs at Component. Asked honestly, this question places any token without argument — and Section 4 specifies exactly how.

---

## 3. CORE PRINCIPLES

The five principles below are this chapter's own — Tier 3 in the sense Chapter 1, Section 4 defines: binding within the domain of tokens specifically, and required to name the Tier 1 principle (P1–P8) each one descends from. None of them are new ideas. Each is one of Chapter 1's eight principles, resolved to the specific resolution a token requires.

### T-1 — The Three-Tier Resolution Model

**Purpose.** Every token belongs to exactly one of three tiers — Core, Semantic, or Component — determined by the Resolution Question in Section 2, never by convenience or habit.

**Reasoning.** Descends from P2 (Singular Focus), applied reflexively to the token system's own comprehensibility, and P7 (Reuse Before Invention), applied to the tier model itself. A designer should be able to hold "which tier is this" in mind instantly; a system that cannot answer that in one step has already failed its own founding purpose.

**Examples.** `core.color.gold.500` is a Core token — a raw, literal value. `semantic.color.accent.primary` is a Semantic token, referencing that Core value by role. `button.primary.background` is a Component token, referencing the Semantic value in the specific context of one component's one variant.

**When it applies.** To every token in the system, without exception.

**When it does not apply.** There is no exception. Unlike most principles in this Bible, this one is written with none, deliberately: a value that cannot be classified into one of the three tiers is a sign that the value itself is not ready to be a token yet — not evidence that a fourth tier is needed.

**Common misunderstandings.** Assuming "the Component tier exists" is itself permission to place a new value there freely. It is not — see T-4. The Component tier is the tier requiring the *most* justification to use, not the least.

### T-2 — One Raw Value, Many References

**Purpose.** A single physical value — an exact color, an exact measurement — is defined exactly once, at the Core tier, and referenced everywhere else it is needed. It is never re-typed.

**Reasoning.** Descends from P7 (Reuse Before Invention) and P1 (Traceable Inheritance). A re-typed raw value carries no traceable link back to where it came from, and is invisible to any future audit, rename, or brand-wide correction.

**Examples.** The Master Vision's deep matte black background value is defined once as a Core token. The Charcoal Black secondary background, one perceptible step lighter (§6.1), is defined as its own distinct Core value — not a restatement of the primary background with an opacity applied on top of it, because §6.1 describes it as a genuinely separate step, not a transparent variant of the first.

**When it applies.** To every raw, physical value anywhere in the system.

**When it does not apply.** To the legitimate creation of new Core values by the chapters whose job that specifically is (Chapters 3 through 16). This principle governs duplication of an existing value; it does not slow down the deliberate, well-reasoned introduction of a genuinely new one.

**Common misunderstandings.** Believing that two independently defined values that currently look identical are "fine, because they match." They are not fine — they will drift the first time either one is edited without whoever made the edit remembering the other exists, and by definition, no one will remember, or the duplication would have been caught already.

### T-3 — Semantic Names Describe Role, Never Appearance

**Purpose.** A Semantic-tier token's name states what the value is *for*. It never states what the value currently looks like.

**Reasoning.** A name like `semantic.color.gold-text` embeds an appearance fact into what should be a role slot — and the name becomes false the instant that role's actual rendered color is ever revisited, which is precisely the situation the Semantic tier exists to survive gracefully. `semantic.color.accent.primary` never claimed to be gold; it claimed to be *the* accent, whatever that resolves to. That is the entire difference between a name that ages and one that doesn't.

**Examples.** Correct: `semantic.color.text.error`. Incorrect: `semantic.color.red-text` — a name that will be lying about itself the day the Minimal Crimson value it references is ever refined.

**When it applies.** To every Semantic-tier token name.

**When it does not apply.** To Core-tier names, which are explicitly required to describe appearance — appearance is the entire content of the Core tier; see T-1. It also does not apply as rigidly to Component-tier names, where a component-scoped descriptive term (`button.primary`) is naming a role *within that component's own variant system*, not making a literal claim about color.

**Common misunderstandings.** Treating this as a purely cosmetic naming preference. It is a durability requirement — the whole reason the Semantic tier exists at all is to give the system a layer that survives a change at the Core tier without needing to be renamed, and an appearance-based name defeats that purpose from the moment it's written.

### T-4 — Component Tokens Are a Last Resort, Not a Convenience

**Purpose.** A new Component-tier token may be created only once it has been shown that no existing Semantic-tier token can serve the same purpose.

**Reasoning.** Direct extension of P7 into the tier model. The Component tier is where uncontrolled proliferation is easiest, because a single component's context always feels, in the moment, like it deserves its own value — and it is therefore the tier requiring the strictest gate of the three, not the loosest.

**Examples.** Acceptable: `input.error.border`, referencing `semantic.color.border.error`, created because form inputs need a border-specific reference no existing token name currently captures cleanly. Unacceptable: a token invented from scratch to give one pricing card's selected state its own glow value, when the existing accent and glow tokens, once Chapters 3 and 6 exist, would already serve identically.

**When it applies.** Whenever any component chapter in Volume II proposes a new token.

**When it does not apply.** To the small number of values that are genuinely irreducible to any component-specific context — an icon's specific optical-alignment nudge, for instance. Even these, however, must document why no semantic equivalent could apply, satisfying P1; irreducibility is a claim that must be shown, not assumed.

**Common misunderstandings.** Treating the Component tier's existence as an invitation. It is the opposite: a documented last resort with the highest evidentiary bar of the three tiers, not a convenience layer for whenever the Semantic tier feels slightly inconvenient to use.

### T-5 — Tokens Are Deprecated, Never Silently Deleted

**Purpose.** A token no longer in active use is marked deprecated and scheduled for removal through a defined lifecycle. It is never simply deleted the moment someone notices it appears unused.

**Reasoning.** A silently deleted token can break a reference nobody in the core team remembered existed — a print template, an email built outside the primary design tooling, any of the surfaces §25.5 and §25.9 describe as part of the same brand ecosystem but not part of the daily working set. This principle protects the continuity the One-Brand Test (§25.10) requires across surfaces the core team does not touch every day.

**Examples.** A deprecated token remains fully resolvable — it still points to a valid value — for a defined grace period, visibly flagged for removal, before it is finally retired through the lifecycle process Chapter 66 will formalize in full.

**When it applies.** To any token identified as no longer referenced by any known active component or surface.

**When it does not apply.** To a token that should never have existed as a peer to begin with — one created in clear violation of T-2 or T-4, and therefore already an instance of the Premature Invention anti-pattern Chapter 1, Section 13 names. Such a token may be corrected more directly, though the correction should still be logged as design debt (Chapter 69) rather than erased from the record entirely.

**Common misunderstandings.** Treating deprecation as a purely technical or engineering concern. It is a design governance concern first: an abruptly broken reference on a client-facing surface is exactly the kind of small, invisible failure that erodes the "precise, professional" trait (§2.2) the moment it's discovered by someone outside the team that caused it.

---

## 4. COMPLETE DESIGN SPECIFICATION

**The naming grammar.** Every token name follows a fixed segment structure, in this order, with no segment skipped and no more than four segments total:

`{tier}.{category}.{role}.{variant-or-state}`

- **Tier** is one of `core`, `semantic`, or a component's own name (Component-tier tokens are scoped by the component itself rather than carrying a literal word "component" — `button.primary.background`, not `component.button.primary.background`, since the component name already communicates the tier unambiguously).
- **Category** names the domain the value belongs to — `color`, `space`, `radius`, `shadow`, `blur`, `opacity`, `type`, `motion-duration`, `motion-easing`, and so on, one category per Foundations chapter in Chapters 3 through 16.
- **Role** names what the value is *for*, per T-3 — `accent`, `text`, `border`, `surface`, `focus`.
- **Variant-or-state**, where needed, narrows the role further — `primary`, `error`, `hover`, `500` (for a Core-tier numeric step).

This chapter fixes the grammar's *shape*. It deliberately does not fix casing conventions (whether a given implementation renders this as dot-notation, kebab-case, or camelCase) — that decision belongs to Chapter 63 (Naming Conventions), which generalizes this exact segment logic to every other named artifact in the system, not only tokens. Chapter 2 hands Chapter 63 a structure already proven correct for tokens specifically; Chapter 63 does not have to invent that structure, only extend it.

**Required Core categories.** The following categories must exist at the Core tier, corresponding directly to Master Vision §20.2 through §20.10, and are the responsibility of the Foundations chapter named beside each: `color` (Chapter 3), `space` (Chapter 5), `radius` (Chapter 6/7), `border` (Chapters 6, 9), `shadow` (Chapter 9), `blur` (Chapter 10), `opacity` (Chapter 6/9), `type` (Chapter 4), `container-width` (Chapter 6/7), `icon-size` (Chapter 11), and — a category the Master Vision's Chapter 20 does not explicitly name, addressed directly in Section 7 below — `motion-duration` and `motion-easing` (Chapter 15).

**Token lifecycle states.** Every token exists, at any moment, in exactly one of five states: **Proposed** (documented, not yet approved), **Draft** (approved for use, not yet battle-tested across a full release), **Stable** (in general use, fully trusted), **Deprecated** (marked for removal, still resolvable, per T-5), and **Retired** (removed, its name never reused for a different value). This is the first instance, anywhere in this Bible, of the lifecycle model Chapter 66 will later generalize to full components — tokens are the simplest artifact in the system, which is exactly why they are the correct place to prove the lifecycle model works before it is asked to govern something as complex as a Dialog.

**Proposal and approval workflow.** Any contributor may propose a new token. A proposal must include: the Resolution Question's answer (which tier, and why), a T-2 statement (which existing Core value, if any, this either reuses or newly establishes), and, for any Semantic or Component proposal, a T-4-satisfying record of which existing token at the tier below was checked and found insufficient. Until Chapter 65's Governance Model exists in full, approval authority sits with whoever holds the Design System Architect responsibility named in this Bible's front matter — a placeholder this chapter names explicitly so that token proposals are never left waiting on a governance structure that has not yet been written.

---

## 5. MEASUREMENTS

- **Tier count: exactly three.** Not two, not four — Section 2 gives the reasoning; this is the number, stated plainly.
- **Maximum segment count per token name: four.** A fifth segment is a signal the token is trying to do two jobs at once and should be split, not extended.
- **Minimum reference depth for Semantic and Component tokens: one.** A Semantic token must reference exactly one Core value (never zero, per T-2; a genuine case for referencing more than one — a computed or derived value — must be justified explicitly and is expected to be rare). A Component token must reference exactly one Semantic value under the same rule, per T-4.
- **Deprecation grace period: no fewer than one full release cycle.** This value is provisional, stated here because Chapter 2 cannot ship without *some* answer, and formally owned by Chapter 64 (Versioning & Release Philosophy) once it exists — Chapter 64 may refine this number; it may not remove the requirement that a grace period exists at all, which is fixed by T-5.
- **Required Core categories: ten**, enumerated in Section 4, one per Foundations chapter — a closed, checkable list rather than an open-ended "and so on."

---

## 6. BEHAVIORAL RULES

**Before a token is created.** The proposer runs the Resolution Question and the Chapter 1 derivation test together — the Resolution Question decides the tier; the derivation test (Chapter 1, Section 4) decides whether the value should exist at all.

**During review.** A reviewer checks the proposal against T-1 through T-5 in order, using the Section 14 checklist, before approving.

**After a token ships.** It enters the Draft lifecycle state, and is promoted to Stable once it has survived a full release cycle in active use without requiring correction.

**Under disagreement about tier placement.** Escalates to the interim Design System Architect authority named in Section 4, pending Chapter 65's full Governance Model.

**Under deadline pressure to skip the check.** Explicitly forbidden, restating Chapter 1's own rule under business pressure specifically for tokens: a request to "just hardcode it for now, we'll clean it up later" is evaluated against T-1 through T-5 exactly as any other proposal would be, because "later" is precisely how Premature Invention (Chapter 1, Section 13) becomes permanent.

**When a Core-tier value must change brand-wide** — for instance, if the Master Vision's exact near-black hex value is ever refined — the change happens exactly once, at the Core tier, and cascades automatically through every Semantic and Component reference that points to it, with zero individual edits required anywhere else in the system. This single behavior is the entire architectural payoff of everything else in this chapter, and it is worth stating plainly: a system that cannot do this has not actually built a token architecture, whatever it calls itself.

**When a component chapter's author discovers a need this chapter's ten Core categories did not anticipate.** They follow the proposal workflow in Section 4. They do not invent a token silently inside their own chapter — doing so would be a direct instance of both Premature Invention and a T-1 violation, however small and well-intentioned the addition felt at the time.

---

## 7. MOTION SPECIFICATION

This chapter does not specify a single duration or easing curve — that is Chapter 15's responsibility in full. What belongs here is a gap this chapter is responsible for closing: the Master Vision's Chapter 20 enumerates spacing, radius, shadow, blur, opacity, typography, container widths, and icon sizing as token categories requiring philosophy, but it does not name motion timing among them, because Chapter 20 was written before this chapter's tier model existed to receive it.

This chapter closes that gap directly, rather than leaving Chapter 15 to invent a separate, parallel system for motion values alone. `motion-duration` and `motion-easing` are Core-tier categories, exactly like `color` or `space` — populated by Chapter 15 the same way `color` is populated by Chapter 3, referenced by Semantic and Component tokens the same way any other Core value is referenced. This is a direct application of T-1 and P7 to this chapter's own scope: rather than treating motion as a special case needing its own architecture, the existing architecture is extended to hold it, because no evidence yet exists that motion actually requires anything different.

---

## 8. ACCESSIBILITY

Two accessibility requirements are specified here, at the architecture level, precisely because leaving them to be added later — once colors and motion values already exist — would mean retrofitting metadata onto hundreds of already-shipped tokens instead of building it in from the first one.

**Contrast metadata.** Every Semantic-tier color token intended for text-on-background use must carry, as part of its definition, the specific background token it was validated against and the resulting contrast ratio — not merely a resolved color value with no record of what it was checked against. This is what allows Chapter 52 (Dark Mode & Theming Architecture) to validate any future re-theming automatically, rather than by inspection, and it directly serves Master Vision §22's contrast requirement at the layer where it can actually be enforced systematically.

**Paired reduced-motion values.** Every `motion-duration` token defined by Chapter 15 must be defined as a pair — a standard value and a reduced-motion value — from the moment it is created, never bolted on afterward as a separate override system. This operationalizes the Reduced Motion Contract (Master Vision §9.5) at the token level: a component consuming a duration token receives whichever half of the pair is appropriate for the current user preference automatically, rather than needing its own conditional logic to know reduced motion exists at all.

---

## 9. RESPONSIVE BEHAVIOUR

A token's *name* never varies by breakpoint. A token's *resolved value* may. This chapter specifies the principle directly: `semantic.space.md` is one token, referenced identically in every layout regardless of viewport, and it is the responsibility of Chapter 8 (Responsive & Breakpoint System) to define how that one name resolves to a smaller value on a narrow viewport and a larger one on a wide one.

This is a direct consequence of T-3 applied to context rather than appearance: a name like `space.md.mobile` would be describing *where* a value is used rather than *what role* it plays, which is exactly the mistake T-3 forbids for appearance and this section forbids for context. The alternative — forking a token's name per breakpoint — would multiply the total token count by the number of breakpoints the system supports, a direct and unnecessary violation of Principle 7 at scale.

---

## 10. AI & FUTURE INTERFACES

The three-tier resolution model is not, on inspection, actually a *visual* architecture that happens to be reused elsewhere — it is a medium-agnostic architecture for any reusable, named design decision, and its first population, in Chapters 3 through 16, simply happens to be visual and web-first because that is where Trady Perch's system begins.

A voice interface (Chapter 72) has no color or spacing tokens, but it has an exact equivalent need: a pause-duration value, an emphasis-volume value, a pacing value — each of which can be Core (a raw duration), Semantic (`semantic.voice.pause.clarifying-question`, referencing a Core duration by role), or Component (a specific conversational pattern's own exception). Spatial computing (Chapter 73) will need a `depth` category, structurally analogous to `shadow`/elevation but expressed in real three-dimensional space rather than a simulated one.

This chapter's claim to medium-agnosticism is, as of this writing, a claim based on reasoning rather than a claim already proven in practice — Section 16 returns to this honestly as an open research question, not a settled result. The first time a Horizon-volume chapter actually attempts to populate a non-visual token category, that attempt should be treated as the real test of whether this architecture generalizes as cleanly as this section argues it should.

---

## 11. DO

**Deriving a new focus-ring token correctly.** A designer needs a visible keyboard focus indicator. They check: does an existing Core gold value already exist? Yes. Do they need a new Semantic role, since "focus" is a distinct role from "accent" even though it may share a Core value? Yes — `semantic.color.focus.ring`, referencing the existing Core gold. Does any component need its own Component-tier override? No — every component can reference the same Semantic token directly. The result satisfies T-1 through T-4 with the smallest possible footprint, and this is exactly why it works: the correct token, in a well-built system, is almost always the smallest one that still solves the actual problem.

**Refining a Core value once, and watching it cascade.** If the Master Vision's exact near-black background value is ever adjusted after real-world testing under different lighting conditions, that single Core-tier edit updates every Semantic reference and every Component reference built on top of it automatically, with no individual file touched anywhere else in the system. This is not a hypothetical convenience — it is the specific, measurable payoff this entire chapter's added complexity was built to purchase, and it is worth remembering exactly what was bought whenever the three-tier model itself feels, in the moment, like more structure than a single token seems to need.

---

## 12. DON'T

**Inventing a Core-looking token inside a component chapter.** A future Buttons chapter author, wanting a specific gold for the hero's call to action, defines `heroButton.gold` directly rather than referencing `semantic.color.accent.primary`. This fails T-1 and T-4 simultaneously: it behaves like a Core value while living at the Component tier, it duplicates a value that already exists elsewhere in the system under a different name, and it will drift silently from the "real" gold the first time either one is edited without the editor remembering the other exists — which, per T-2's own reasoning, is exactly when duplication becomes dangerous rather than merely untidy.

**Naming a token after an appearance it doesn't actually have.** A token named `blueErrorText` when the system's actual error color is Minimal Crimson, not blue, fails T-3 outright — and it is also a strong signal, worth investigating on sight, that the token was copied from a different design system's convention without being adapted to this one, which is precisely the failure mode Section 2 rejects for the architecture as a whole, now recurring in miniature at the level of a single name.

---

## 13. ANTI-PATTERNS

**Token sprawl via convenience.** Creating a new Component-tier token for every slight visual difference between components, rather than interrogating whether the difference represents a genuinely distinct role. This is dangerous because it is exactly how a system with a handful of disciplined Core colors ends up, within a year, carrying dozens of undocumented Component-level color values that no one individually chose to create in bulk — each one felt like a single, small, reasonable exception at the time. It is detected by auditing any Component-tier token with exactly one consumer: a token referenced by only the component that defined it is a strong candidate for a T-4 violation that should have referenced an existing Semantic token directly. It is fixed by consolidating into the nearest matching Semantic token, or, where the difference is genuinely irreducible, documenting that irreducibility explicitly rather than leaving it implicit.

**Appearance-named semantics.** Naming a Semantic-tier token after what it currently looks like rather than what it is for — the anti-pattern form of T-3's violation. This happens because naming something by what you're looking at is cognitively easier, in the moment, than naming it by its abstract role, especially under time pressure. It is dangerous because the name becomes false the instant the underlying color is revisited, and a false name is worse than no name, because it actively misleads the next person who reads it. It is detected by a direct audit: searching Semantic-tier token names for literal color-family words — "gold," "black," "crimson" — and treating any match as suspect by default. It is fixed by renaming to the role the token actually plays.

**Silent breaking deprecation.** Deleting a token the moment it appears unused in the primary codebase, without checking whether it is still referenced by a surface outside that codebase — a print template, an email, any of the ecosystem surfaces Master Vision §25.5 and §25.9 describe. This happens because the primary codebase is the only surface most contributors can see day to day. It is dangerous because it breaks something on a surface nobody was watching, which is exactly the kind of small, invisible failure that erodes the "precise, professional" brand trait the moment a client happens to notice it. It is detected by treating T-5's grace-period requirement as non-negotiable, with no "obviously unused, just remove it" exception ever granted informally. It is fixed by checking every known ecosystem surface, not only the primary repository, before any deprecation proceeds to retirement.

---

## 14. QUALITY ASSURANCE CHECKLIST

- [ ] Has the Resolution Question been answered explicitly — Core, Semantic, or Component, and why? *(T-1)*
- [ ] Does every Semantic or Component token reference an existing value at the tier below it, rather than restating a raw value directly? *(T-2)*
- [ ] Does the token's name describe a role, not an appearance — checked specifically for embedded color-family or shape words at the Semantic tier? *(T-3)*
- [ ] If this is a Component-tier proposal, is there a documented record of which Semantic token was checked and found insufficient? *(T-4)*
- [ ] If this token is being deprecated, has it been checked against every known surface in the Full Brand Ecosystem (Master Vision Chapter 25), not only the primary codebase? *(T-5)*
- [ ] Does the token's name fit the four-segment grammar from Section 4 without exceeding it?
- [ ] If the token concerns motion, does it exist as a paired standard/reduced-motion definition from the start? *(Section 8)*
- [ ] If the token's value legitimately varies by breakpoint, does it resolve contextually under one name rather than forking into breakpoint-specific names? *(Section 9)*
- [ ] Does the proposal cite its P1 (Traceable Inheritance) origin and its P7 (Reuse Before Invention) reuse-check, per Chapter 1's derivation test?

---

## 15. CROSS REFERENCES

**Within this Bible:** Chapter 1 (all eight principles, especially P1, P2, P3, and P7, which this entire chapter operationalizes). Chapters 3 through 16 (each populates one or more of the ten required Core categories named in Section 4). Chapter 8 (owns the breakpoint resolution mechanism referenced in Section 9). Chapter 15 (owns the `motion-duration` and `motion-easing` categories this chapter establishes in Section 7). Chapter 52 (consumes the contrast metadata from Section 8 to validate future theming). Chapter 63 (generalizes this chapter's naming grammar to every other named artifact in the system). Chapter 65 (formalizes the approval authority this chapter names provisionally in Section 4). Chapter 66 (generalizes the Proposed→Retired lifecycle this chapter introduces first, for tokens, in Section 4). Chapter 69 (absorbs any token created in violation of T-2 or T-4 as tracked design debt).

**Within the Master Vision:** Chapter 20 in full, §3.2, §6.1–§6.6, §9.5, §25.5, §25.9, §25.10.

---

## 16. FUTURE EXPANSION

**Possible future additions.** A fourth tier — a "Brand-Extension" tier, for instance, should Trady Perch ever operate a sub-brand or license its system to a client under a different name — may eventually be proposed. Per T-1's own logic applied reflexively, it should be added only once the three-tier model has been shown, in a specific documented case, to be insufficient — not proposed speculatively because a fourth tier seems plausible in the abstract.

**Documented assumptions.** This chapter assumes a single, centrally maintained source of truth for tokens. If the company's tooling ever fragments across multiple disconnected design tools with no shared source, the cascade behavior described in Section 6 — a single Core-tier edit propagating everywhere automatically — would require a technical reconciliation mechanism this chapter does not address and does not currently need to.

**Documented limitations.** The medium-agnostic claim in Section 10 is, honestly, a claim supported by reasoning rather than by a proven example as of this writing. It should not be treated as settled until at least one non-visual token category — most likely Chapter 72's pacing and emphasis values — has actually been built against this architecture and found to fit it without strain.

**Future research areas.** Whether the four-segment naming ceiling in Section 5 remains sufficient once a genuinely deep Component-tier need arises — a future client dashboard with several layers of nested context is the most likely place this ceiling gets tested first, and it should be watched for rather than assumed to hold indefinitely.

---

*End of Chapter 2. The next chapter, Color System, is the first place this architecture is asked to hold real, physical values rather than the structure meant to contain them.*
