# Trady Perch — Tech Architecture Synthesis
### Extracted from the Product Implementation Constitution (Chapters 1–13, 21, 35, 36, 38 + Architecture doc + README)

This document extracts literal, concrete engineering mandates for scaffolding the Trady Perch marketing website. Quotes are exact where precision matters. Paraphrase is marked as such.

---

## Core Implementation Principles

Chapter 1 fixes **seven Implementation Principles ("IP1–IP7")**, cited by code throughout the rest of the Constitution. Quoted verbatim (Purpose lines):

- **IP1 — Traceable Translation.** "Every implementation decision — a folder's existence, a chosen state-management pattern, a test's assertion — must be traceable to a specific, named origin: a chapter in one of the five documents above this Constitution, or a chapter within this Constitution itself. No decision may exist because 'it's how the framework's docs did it' or 'it seemed reasonable.'"
- **IP2 — Machine-Checkable Truth.** "A standard that cannot be verified by a lint rule, an automated test, or a CI gate is not a finished standard — it is a draft of an intention, and it must be labeled as such until an automated check exists to enforce it."
- **IP3 — Restraint in Construction.** "A dependency, an abstraction layer, or a configuration knob must be justified by a demonstrated, current need before it is added — never by a hypothetical future one." (Direct descendant of Master Vision §3.1, "If in doubt, remove it.")
- **IP4 — Explicit Over Implicit.** "Every convention that governs how code in this repository must be written must be written down somewhere a newcomer — human or AI, with zero prior context — can find it. Tribal knowledge... does not count as a standard."
- **IP5 — Self-Contained Context.** "Any task, chapter, or briefing in this Constitution must be executable correctly by an engineer or an AI agent starting from zero memory of any prior conversation."
- **IP6 — Non-Negotiable Floors Are Not Variables.** "Accessibility, security, and performance floors, as set by Master Vision Chapters 22 and 23, are fixed constraints every other principle in this chapter operates on top of — never inputs any of the other six principles are free to trade against for convenience, speed, or elegance." No exception clause exists for this principle.
- **IP7 — Reversibility Bias.** "Where a choice exists between a smaller, easily reversible change and a larger, harder-to-reverse one that accomplishes the same goal, the reversible choice is the default. The harder-to-reverse option must be separately justified, in writing, before it is taken."

**The derivation test** (Ch.1 §4): when no more specific chapter governs a question, test the candidate decision against IP1–IP7 in numerical order; if two or more are in tension, IP6 is checked first (a floor violation ends the analysis), and any remaining tension among IP1–IP5/IP7 is resolved in favor of whichever option better satisfies IP5.

---

## Mandated Tech Stack

**No specific framework, language, or runtime is named anywhere in the 19 files read.** This was checked deliberately and repeatedly across every chapter most likely to name one (Ch. 2 Product Architecture Philosophy, Ch. 7 Repository Structure Standard, Ch. 9 Naming Conventions, Ch. 10 Configuration & Environment Management, Ch. 12 Component Implementation Standard, Ch. 38 Rendering Strategy Standard). The Constitution treats framework selection as explicitly deferred/out of scope for these chapters:

- Ch. 2 §Scope (from the Architecture doc): "Macro-architecture only. **Does not specify actual folder names (Ch. 7) or a specific framework version pin (Ch. 10).**"
- Ch. 9 §2, on component naming: "**React-equivalent components** (any UI component regardless of the eventual framework Chapter 10 pins)..." — this phrasing implies Chapter 10 was expected to pin a framework, but **Chapter 10 as actually written (Configuration & Environment Management) contains no framework pin at all** — it only covers env vars, secrets, and feature flags. This is a real gap/inconsistency in the Constitution — see Open Questions.
- Ch. 12 §13 Future Expansion: "This template assumes a component-based UI framework broadly consistent with the props/composition model described here; **Chapter 10's specific framework pin** may require minor mechanical adaptation... without changing this chapter's underlying requirements." — again referencing a framework pin that Chapter 10, as written, does not contain.
- Ch. 38 (Rendering Strategy Standard) §1: fixes a **decision framework** (static generation / server rendering / incremental regeneration / client-side rendering) "consistent with its surface's default posture" — but names no specific tool or framework that implements any of the four strategies.

**Conclusion: the constitution describes requirements a stack must satisfy, never a named product.** A stack for the Marketing Site must satisfy:
- Component-based, with props/composition model (Ch. 11–12).
- Capable of static generation as the default rendering mode, with server rendering as a route-level exception (Ch. 2 §4, Ch. 38).
- Capable of producing fully-formed HTML at first response for SEO-relevant routes (Ch. 38 §4).
- Supports a single-source-of-truth design-token pipeline generating CSS custom properties + TypeScript constants (Ch. 13).
- Supports native CSS pseudo-states (hover/focus/active) rather than JS-simulated state (Ch. 12 §4).
- Type-safe (props typed as closed unions/discriminated unions; "no untyped `[key: string]: any` escape hatch," Ch. 12 §3).
- Supports build-time startup configuration validation that fails loudly on missing/malformed required env vars (Ch. 10 §4).
- Monorepo-compatible (workspace manifest, single lockfile, apps/packages split — Ch. 6, Ch. 7).

**Rendering strategy mandate (exact):**
- Ch. 2 §4: "**The Marketing Site renders static-first, with server rendering as the explicit exception, not the default.**" "...A route on this surface earns server-side rendering only when it demonstrably requires per-request personalization that static generation cannot provide."
- Ch. 38 §2 defines four strategies precisely:
  - **Static generation** — "rendered once at build time, served identically to every visitor until the next build. The Marketing Site's default per Chapter 2 §4."
  - **Server rendering** — "rendered per request, on the server, allowing per-request personalization or genuinely current data that static generation cannot provide."
  - **Incremental regeneration** — "rendered at build time like static generation, but automatically re-rendered in the background after a defined staleness window."
  - **Client-side rendering** — "rendered in the browser after an initial, minimal shell loads. The Client Portal's default..." (not the Marketing Site's default).
- Ch. 38 §3 gives the exact per-route decision tree (surface classification → per-request content check → periodic-but-not-per-request content check favoring incremental regeneration → auth-required check routes to Client Portal/CSR).
- Ch. 38 §4 (SEO interaction): any indexed/ranked route "is biased toward static generation or incremental regeneration over client-side rendering, because both produce fully-formed HTML available at first response."

**Explicitly forbidden technologies/approaches** (Chapter 5, Anti-Philosophy, and scattered anti-pattern sections — no named tech is banned, but these categorical practices are):
- **F1 Implicit Convention** — undocumented but consistently-followed patterns.
- **F2 Undocumented Exception** — an unlogged one-off deviation from a standard.
- **F3 Copy-Pasted Logic** — duplicating logic instead of reusing an existing implementation.
- **F4 Dependency Added "Just in Case"** — adding a library/abstraction/config surface for a hypothetical future need rather than a demonstrated current one.
- **F5 Rationalization After the Fact** — retroactively attaching a citation/justification to a decision made for other reasons ("citation laundering").
- Also explicitly forbidden/flagged elsewhere: hand-edited generated token files (Ch. 13 §8); untyped `[key: string]: any` prop escape hatches (Ch. 12 §3); simulating hover/focus/active via JS state instead of native CSS pseudo-classes (Ch. 12 §4, §10); boolean-flag "configuration creep" instead of composition (Ch. 11 §2, §10); silent fallback defaults for required secrets/config (Ch. 10 §10); fabricating artificial loading delay ("the explicit prohibition... against fabricating delay to imply effort," referenced in Architecture doc Ch. 28); direct component-to-component imports across features without promotion to `shared/` (Ch. 8); direct consumption of core-tier design tokens by components (must go through semantic/component tiers) (Ch. 13 §3).

---

## Repository Structure Standard

Chapter 7 gives the **literal root tree** (quoted exactly):

```
/
├── apps/
│   ├── marketing-site/
│   ├── client-portal/
│   └── conversational/
├── packages/
│   ├── ui/
│   ├── tokens/
│   ├── motion/
│   ├── api-contracts/
│   ├── testing/
│   └── config/
├── docs/
│   ├── adr/
│   └── [the six constitutional documents and their chapters]
├── ci/
├── scripts/
├── [workspace manifest, lockfile, root config files]
```

Note: this is the tree for the *full Trady Perch monorepo* (all four product surfaces — Marketing Site, Client Portal, AI-Native Conversational Layer, and Future Roadmap surfaces per Chapter 2). For scaffolding **just the marketing website**, the relevant slice is `apps/marketing-site/` plus whichever `packages/*` it consumes (at minimum `tokens`, `motion`, `config`; `ui` if a shared component library is used; `api-contracts` if it talks to a backend).

**Top-level folder purposes (verbatim reasoning):**
- **`apps/`** — "One folder per built surface." Created "only once that surface passes Chapter 2 §6's classification procedure and is actively being built — never speculatively." `apps/marketing-site/` = Chapter 2's Surface 1, "Static-first per Chapter 2 §4; the only app permitted to ship without any authenticated route."
- **`packages/`** — tiered **foundational** (no internal dependency) vs. **composed** (depends on foundational only, never on another composed package):
  - `packages/tokens/` (foundational) — build-time output of Ch. 13's Design Token Implementation.
  - `packages/motion/` (foundational) — Motion Bible duration/easing tokens as code.
  - `packages/api-contracts/` (foundational) — Ch. 24 schema/type definitions.
  - `packages/config/` (foundational) — shared lint, type-check, build config, and the machine-readable performance-budget file (Ch. 36 §6).
  - `packages/ui/` (composed) — Ch. 12's component library; depends on `tokens` and `motion`.
  - `packages/testing/` (composed) — shared test utilities/fixtures.
- **`docs/`** — the six constitutional documents plus `docs/adr/` (Architecture Decision Records). "The one top-level folder whose contents are prose rather than code."
- **`ci/`** — literal pipeline configuration.
- **`scripts/`** — repository-level tooling only (never feature-specific logic).
- Root — workspace manifest, single lockfile, root config files. "Chapter 9 forbids a second, app-local copy of any configuration file that is supposed to be shared."

**Internal (per-app) folder structure**, Ch. 8 §2, given exactly:

```
apps/<app-name>/src/
├── features/
│   └── <feature-name>/
│       ├── components/
│       ├── hooks/
│       ├── api/
│       ├── types/
│       ├── tests/
│       └── fixtures/
├── shared/
│   ├── components/
│   ├── hooks/
│   └── utils/
└── routes/
```

- **Feature-folder principle:** code is organized by feature, not technical type; a top-level `hooks/` folder holding every hook regardless of feature is explicitly **not permitted**.
- **`shared/` vs `features/`:** code is promoted to `shared/` only once a second genuine consumer exists (same IP3 threshold as promoting app code to a package) — never for "hypothetical reusability."
- **`routes/`:** "thin by design — a route file imports and renders a feature's top-level component and contains no business logic of its own."
- Component-level colocation (inside `packages/ui/`) mirrors Design System Bible Ch. 17's anatomy standard: "each component's implementation, its tests, and its Storybook-equivalent documentation... live together in one folder named for the component."

---

## Naming Conventions

From Chapter 9, quoted exactly:

| Artifact | Convention | Examples |
|---|---|---|
| Variables & functions | camelCase; verb phrase for actions, predicate for booleans | `fetchClientInvoices`, `isSessionActive` |
| Types & interfaces | PascalCase; **no `I`-prefix or `T`-suffix decoration** | `ClientInvoice`, `SessionState` |
| Constants | SCREAMING_SNAKE_CASE, reserved for genuinely fixed values | `MAX_RETRY_ATTEMPTS` |
| UI components | PascalCase (matches Design System Bible N-2) | `PricingTierCard`, `SkeletonLoader` |
| Source files | kebab-case | `fetch-client-invoices.ts`, `pricing-tier-card.tsx` |
| Test files | file-under-test name + `.test`/`.spec` suffix, colocated | — |
| Folders | kebab-case throughout | matches Ch. 8 examples |
| Branches | `<type>/<short-kebab-case-description>` | `feature/client-invoice-export`, `fix/session-timeout-race`, `chore/upgrade-token-pipeline` |
| Commits | `<type>(<scope>): <imperative summary>`; `<type>` ∈ {`feat`,`fix`,`refactor`,`test`,`docs`,`chore`,`perf`} | `feat(client-portal): add invoice CSV export` |
| Env vars | `<APP_PREFIX>_<SCREAMING_SNAKE_NAME>`; shared vars carry no app prefix | `CLIENT_PORTAL_API_BASE_URL`, `MARKETING_SITE_ANALYTICS_ID` |

Additional rules:
- A component's file name is kebab-case even though the exported symbol is PascalCase — "the file name and the exported symbol name following their own artifact type's convention independently."
- A value "that could plausibly become configurable later is named in camelCase and sourced from Chapter 10's configuration layer instead" — not treated as a SCREAMING_SNAKE_CASE constant.
- Branch names must never be a bare ticket number ("`fix/PROJ-482`") — must be self-contained/descriptive.
- **Name retirement (N-3):** "a retired name — a renamed function, a deleted component, a deprecated environment variable — is never reassigned to a new, unrelated artifact." A new version takes a new name (e.g., `fetchClientInvoicesV2`).
- **Exception clause:** where an external non-negotiable standard (a deployment platform's required filename, a third-party API's required casing) conflicts, the external requirement wins — documented at point of use, citing the naming chapter.
- No abbreviation to save keystrokes: "`fetchClientInvoices`, never `fetchClInv`."

---

## Component Architecture

**Philosophy (Ch. 11): composition over configuration.**
- "This Constitution commits to composition as the default" — many small, focused components with narrow prop surfaces, composed together, rather than few components with many boolean/enum toggle props.
- Variant props are permitted (and required) as closed-union types mapping 1:1 to Design System Bible "orthogonal variant axes" — e.g. `variant: "primary" | "secondary" | "tertiary"` is correct; `isPrimary: boolean` + `isSecondary: boolean` is explicitly wrong because it "reintroduces exactly the combinatorial ambiguity."
- Not literally "atomic design" (atoms/molecules/organisms) — the Constitution never uses that vocabulary. Instead it inherits Design System Bible's **anatomy** (named parts: icon, label, container, etc.), **variant axes**, and the **eight canonical states** (hover, focus, active, disabled, loading, error, success, empty — Design System Bible Ch. 39, noted as a correction from the Bible's own inconsistent "seven canonical states" header vs. eight in body text).
- A component's internal code structure must visibly mirror its documented anatomy — "never flattened into an undifferentiated mass of markup."

**Component Implementation Standard (Ch. 12) — mandatory file anatomy**, quoted exactly:

```
component-name/
├── component-name.tsx        (implementation)
├── component-name.types.ts   (props and variant types)
├── component-name.test.tsx   (structural + behavioral tests)
├── component-name.stories.*  (documentation, per Chapter 61)
└── index.ts                  (the sole public export)
```

- `index.ts` is "the only file another component or feature is permitted to import from" — every other file is an internal implementation detail.
- `.types.ts` declares, in fixed order: (1) Variant props (closed-union per axis), (2) State props (all 8 canonical states), (3) Content props (anatomy-derived slots), (4) Behavioral props (typed event handlers, never bare untyped functions).
- No `[key: string]: any` escape hatch permitted anywhere in a props type.
- **State wiring rules:** hover/focus/active → native CSS pseudo-states, never JS-simulated; `disabled` → single boolean that structurally suppresses all interaction handlers; `loading` → boolean/enum that automatically implies `disabled`; error/success/empty → one discriminated union prop (`status: "idle" | "error" | "success" | "empty"`), never independent booleans.
- `.tsx` contains render logic only — "no data fetching... no business logic beyond what's needed to derive presentational state from props." Data fetching lives in a feature's `api/` folder, passed in via props/hooks.
- `.test.tsx` minimum required assertions: every variant renders without error; every applicable canonical state renders its documented treatment; `disabled` suppresses every interaction handler (asserted, not just visual); every content prop actually appears in rendered output.
- The "framework" this template assumes is left generic — the JSX/`.tsx` extension and "React-equivalent" language appear throughout as placeholder terminology, explicitly caveated (Ch. 12 §13) as pending "Chapter 10's specific framework pin" — which, as noted above, Chapter 10 does not actually contain.

**Design Token Implementation (Ch. 13) — mechanism, both CSS variables AND a JS/TS layer:**
- "Every token — core, semantic, or component-tier — is defined **exactly once**, in `packages/tokens/`, as **structured data** (not hand-written CSS or hand-written TypeScript constants maintained in parallel)."
- That single source generates: **CSS custom properties** for runtime styling, **typed TypeScript constants** for any value consumed in logic rather than styles, and a documented reference table (Ch. 61).
- Three-tier pipeline (mirrors Design System Bible's core/semantic/component tiers):
  - **Core tokens** — raw values (hex, px), innermost CSS custom-property layer, "never consumed directly by a component."
  - **Semantic tokens** — named by role not appearance, reference core tokens (never redeclare raw values) — e.g. `semantic.color.text.error`.
  - **Component tokens** — "last resort," only for cases Design System Bible has specifically documented as requiring a value semantic tokens can't serve.
  - A component consumes **semantic or component tokens exclusively — never a core token directly** (mechanically lint-enforced).
- **Token deprecation:** never silently deleted (T-5) — marked deprecated with a date/replacement first; the build fails if a token is removed without first being marked deprecated.
- Generated files are never hand-edited — a hand-edit is overwritten the next pipeline run "and this is treated as expected, self-correcting behavior."
- Enforcement: a lint rule flags any raw color/size/duration literal in component code instead of a token reference; a second lint rule flags any direct core-token reference from component code.

---

## Configuration & Environment

From Chapter 10:
- Three categories: **environment variables** (non-secret, per-environment), **secrets** (never in VCS or client-side code; storage/rotation is Ch. 43's territory), **feature flags** (governed by Ch. 57's rollout mechanism, not the env-var schema).
- Every app declares required env vars "in a single, typed schema file inside its own `apps/<app-name>/` root — never scattered across multiple files." Shared variables are declared once in `packages/config/`, never re-declared per app.
- **Validation happens at startup, not at first use:** "Every app validates its full configuration schema against the actual environment at startup, before any route is served or any request is handled." A missing/malformed required variable "fails the build immediately with an error naming the specific variable and the specific requirement it failed to meet." (This is the literal implementation of the Architecture doc's stated Ch. 10 success criterion: "A missing or malformed required environment variable fails the build at startup with a specific, actionable error, never silently falling back to an undocumented default.")
- No silent fallback defaults for required-in-production values — explicitly named anti-pattern ("The silently-defaulted secret").
- Local secrets via a gitignored local file, never committed; staging/production secrets via Ch. 43's secret-management mechanism, never hardcoded or placed as plaintext in a committed CI config file.
- Performance budgets (Ch. 36) and accessibility-testing toggles are declared through this same schema mechanism, but their *values* are owned by their respective chapters — Ch. 10 owns only the declaration/validation mechanism.
- Secret-scanning tooling is wired into CI (Ch. 56) to flag credential-shaped strings in diffs before merge.

---

## State Management Philosophy

From Chapter 21 — directly relevant to a mostly-static marketing site (forms/interactive widgets):

**Three exhaustive categories**, every value must fall into exactly one:
1. **Server state** — "data that originates from, and is owned by, a backend service... never the source of truth in the frontend; the frontend holds a cached, possibly stale copy," governed by Ch. 25's data-fetching/caching rules; mutations always round-tripped through the server, never optimistically assumed permanent.
2. **Client state** — "data that exists only in the current session and has no server-side representation: whether a dropdown is open, which tab is active, form input before submission." Scoped to the component/feature that owns it (Ch. 8 colocation) unless a genuine cross-feature need promotes it to `shared/`.
3. **URL state** — "data that represents where the user is," and per UX Blueprint Ch. 40's cross-device continuity standard "should survive a page refresh, a shared link, or a switch between devices": current filter on a data table, active step in a multi-step flow, currently viewed record's ID. "URL state is never duplicated into client state — the URL is its single source of truth."

**Decision tree (Ch. 21 §3), in order:** (1) does it originate from a backend? → server state, stop. (2) should it survive refresh/be shareable/persist across devices? → URL state, stop. (3) otherwise → client state, scoped as narrowly as possible.

**Relevance to marketing-site forms/widgets:** pre-submission form input is explicitly named as an example of **client state** (component/feature-scoped). Any filter, multi-step flow position, or "currently viewed record" on the marketing site (e.g., a case-study filter, a multi-step contact/quote flow) is **URL state**, not client state — the Constitution is explicit that this must be read directly from the URL, never mirrored into a separate store. A value that "resists categorization" must be decomposed into two separately-categorized values rather than force-fit.

---

## Performance Philosophy & Budgets

**Philosophy (Ch. 35):**
- Performance is treated as a **non-negotiable floor** (IP6) with the same blocking severity as accessibility — "a budget violation blocks merge per Chapter 49's quality gates, with the same severity Chapter 18 already gives an accessibility violation."
- Estimated at design-review time, before implementation, against Ch. 36's budget categories — not measured for the first time post-launch.
- Content always wins over animation fidelity on lower-powered hardware, without exception (Pf-2).

**Numeric budgets (Ch. 36) — explicitly flagged as "first-canonical values... not yet validated against real production data," but binding as written per IP2:**

Core Web Vitals, per surface:

| Metric | Marketing Site | Client Portal |
|---|---|---|
| Largest Contentful Paint | ≤ 2.0s | ≤ 2.5s |
| Interaction to Next Paint | ≤ 150ms | ≤ 200ms |
| Cumulative Layout Shift | ≤ 0.05 | ≤ 0.1 |
| Time to First Byte | ≤ 400ms | ≤ 600ms |

Bundle-size ceilings (gzipped):

| Bundle | Ceiling |
|---|---|
| Marketing Site, per-route JavaScript | 100KB |
| Marketing Site, shared/vendor JavaScript | 150KB |
| Client Portal, per-route JavaScript | 180KB |
| Client Portal, shared/vendor JavaScript | 220KB |
| `packages/ui/`, full library | 80KB |

("A route's total JavaScript cost is its per-route bundle plus its share of the shared/vendor bundle — both are tracked.")

Animation budget: "no single view runs more than **three simultaneous animations at the Standard tier or above**" (also flagged first-canonical, standing in for a not-yet-written Motion Bible chapter).

- Budgets live in a single machine-readable config file in `packages/config/`; CI (Ch. 56) measures actual bundle size and Lighthouse-equivalent Core Web Vitals per PR and fails the build automatically on regression, naming the specific violated metric.
- Budgets are per-surface, deliberately not uniform, because the Marketing Site's static-first/SEO profile rewards tighter numbers than the Client Portal's authenticated/interactive profile.
- A failing budget check must be fixed before merge — never waived; loosening the budget itself requires formal governance review (Ch. 64), never a quiet PR-level edit.

---

## The Translation Doctrine & AI-Built Product Doctrine

**Chapter 3 — The Translation Doctrine** (formalizes IP1 into a checkable mechanism):
- Every upstream decision (a token, a curve, a flow step, a brand rule) must map to exactly one downstream code artifact via a **"translation unit,"** valid only if it has all three: (1) **a named origin** (precise chapter+section, never "the design system" in general), (2) **a named artifact** (specific file/symbol/config key, never "handled in the styles somewhere"), (3) **a verification method** (a test, snapshot, type check, or explicit manual-review trigger).
- Every chapter producing code artifacts from an upstream document maintains a **translation ledger** (a table, kept beside the artifact — in code comments, a manifest, or the chapter itself) listing every translation unit it owns. Appendix C is the aggregated cross-document index, never the primary source.
- Two named failure modes to actively avoid when building: **orphans** (a code artifact with no ledger entry — resolved by retroactively ledgering it or removing it) and **duplicate translations** (two+ artifacts independently re-implementing the same upstream decision, which drift — resolved by consolidating to one artifact and updating every consumer).
- **Translation procedure, in order:** locate the precise origin → check the existing ledger for something that already serves → if nothing serves, create one artifact of the type the governing chapter specifies → add the ledger entry (all three fields) before the PR is considered complete → attach a verification method.
- Practical implication for building the site: every design-system value, motion value, or copy string implemented in code should be traceable to a specific chapter/section of the Design System Bible, Motion Bible, UX Blueprint, or Brand Manual — not invented or "eyeballed."

**Chapter 4 — The AI-Built Product Doctrine** (extends IP5 to the whole engineering org):
- States as fact: "this product is substantially built and maintained by AI coding agents... with no persistent memory of any prior conversation unless it is written down somewhere they can read it again." Every chapter must be written as though its only reader has never spoken to anyone about the product before.
- Three consequences restated at this scale: **machine-checkable over merely well-intentioned** (IP2), **explicit over assumed** (IP4), **self-contained over context-dependent** (IP5).
- Concrete authoring rules this implies for how I (the AI building the site) should operate: no forward references to conversations/context that aren't written down; no unstated defaults — state which way an ambiguous decision goes and why; don't rely on a specific tool's undocumented current behavior; every acceptance criterion must be stated explicitly, never inferred from tone.
- **Delegation boundary (Ch. 4 §4):** safe for full AI delegation — "implementation work with a clear, checkable acceptance criterion... a bug fix with a reproducible failing test." Requires a human decision first — "anything Chapter 62 would require an Architecture Decision Record for — a foundational technology choice, a change to Chapter 2's surface architecture, a trade-off between two of Chapter 1's principles" that the derivation test can't resolve.
- **Practical implication: choosing the actual frontend framework/stack for this build is, by this chapter's own logic, a foundational/hard-to-reverse decision requiring an Architecture Decision Record and (per Ch.1 IP3's carve-out and Ch.4 §4) a human decision — not something to be silently assumed or auto-selected.**

---

## Open Questions / Ambiguities

**MOST CONSEQUENTIAL: Is a specific frontend framework/stack named? NO.**

Across all 19 files read — including the two chapters (Architecture doc's Ch.2 scope note, and Ch.9's naming-convention text) that explicitly point to "Chapter 10" as the place where a framework would be "pinned" — **no specific framework, library, or language is ever named.** Chapter 10, as actually written, covers only configuration/environment management and contains no framework decision at all. This is a real internal inconsistency in the Constitution: at least two other chapters (Ch. 9 §2, Ch. 12 §13) refer forward to "Chapter 10's specific framework pin" as if it exists, but it does not. Given Chapter 4's own doctrine, a foundational technology choice like this requires an Architecture Decision Record (Ch. 62) and a human decision before proceeding (Ch. 4 §4) — it is explicitly **not** a decision an AI agent should make silently or infer.

What the Constitution does establish, which any chosen stack must satisfy (repeated for clarity, consolidated from above):
- Component-based with composition-over-configuration props API and typed variant/state props (Ch. 11–12).
- Must support static generation as default rendering mode for the Marketing Site, with server rendering as a justified per-route exception, and must produce fully-formed HTML at first response for SEO-relevant routes (Ch. 2 §4, Ch. 38).
- Must support a build pipeline that compiles a single structured-data token source into both CSS custom properties and typed TS/JS constants (Ch. 13).
- Must support native CSS pseudo-classes for hover/focus/active state styling (Ch. 12 §4).
- Must support build-time/startup configuration validation (Ch. 10 §4).
- Must fit a monorepo with an apps/packages workspace split (Ch. 6–7).
- JSX-like/`.tsx` file extensions and "React-equivalent" terminology are used throughout as **generic placeholder language**, explicitly caveated as not a framework commitment (Ch. 12 §13: "Chapter 10's specific framework pin may require minor mechanical adaptation... without changing this chapter's underlying requirements").

**Other unresolved items requiring a judgment call:**

1. **No chapter in the read set names an actual CSS methodology/tooling** (e.g., Tailwind, CSS Modules, styled-components, vanilla CSS) — Ch. 13 only mandates that tokens compile to "CSS custom properties," which is tooling-agnostic.
2. **No specific state-management library is named** — Ch. 21 fixes only the philosophy/decision-tree (server/client/URL state); Ch. 22 (State Management Standard, not in the read set) would fix the concrete library, but that chapter wasn't provided.
3. **No specific testing framework is named** — Ch. 12 mandates `.test.tsx` files and minimum assertions but not a test runner; Ch. 47 (Testing Strategy & Pyramid) would fix the tooling but wasn't in the read set.
4. **Chapter 36's performance budget numbers and the Ch.36 §4 animation-frame budget are explicitly self-flagged as "first-canonical... not yet validated against real production data,"** binding as written but subject to revision — treat as real targets, not placeholders, per IP2, but be aware they are acknowledged-provisional.
5. **The full apps/packages monorepo tree in Ch. 7 covers all four Trady Perch product surfaces** (Marketing Site, Client Portal, Conversational Layer, future roadmap). Since this task is scoped to "the flagship marketing website" only, a judgment call is needed on how much of the full monorepo scaffold (e.g., `apps/client-portal/`, `apps/conversational/`, `packages/api-contracts/`) to stub out now versus build only `apps/marketing-site/` plus the packages it actually consumes — per IP3 ("Restraint in Construction"), the literal-reading answer is: build only what has a demonstrated current need, i.e. `apps/marketing-site/` and whichever of `packages/tokens/`, `packages/motion/`, `packages/config/`, `packages/ui/` it genuinely uses; do not scaffold `client-portal/`, `conversational/`, or `api-contracts/` speculatively.
6. **Chapter 24 (API Contract & Schema Standards)** governs `packages/api-contracts/` but was not in the read set — if the marketing site needs any backend integration (contact form submission, CRM webhook, etc.), that chapter should be read before implementing it.
7. **Design System Bible token *values*** (actual colors, type scale, spacing scale) are explicitly out of scope for the Constitution ("does not re-derive token values") — those live in the Design System Bible itself, not in this synthesis.
