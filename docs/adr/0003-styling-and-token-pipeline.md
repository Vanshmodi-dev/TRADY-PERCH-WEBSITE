# ADR-0003: Styling methodology and design-token build pipeline

**Status:** Accepted
**Date:** 2026-07-24
**Origin:** Product Implementation Constitution Ch.13 (Design Token Implementation); Design System Bible Ch.2 (Design Tokens Architecture)

## Context

Ch.13 mandates every token be defined exactly once, as structured data, in `packages/tokens/`, compiling to (a) CSS custom properties for runtime styling and (b) typed TypeScript constants for values consumed in logic — and forbids hand-written CSS/TS token values maintained in parallel. No specific CSS methodology (Tailwind, CSS Modules, styled-components, vanilla CSS) or token-build tool (Style Dictionary, custom script) is named anywhere in the Constitution.

## Decision

**Styling methodology: CSS Modules + native CSS custom properties.** Component styles are colocated `.module.css` files that consume `var(--semantic-color-*)` etc. exclusively — never a raw hex/px literal, mirroring Ch.13's lint-enforceable rule. Tailwind was considered and rejected for this project: utility classes encourage ad-hoc arbitrary values at the call site, which works against the semantic/component-token consumption model the Constitution mandates (components must consume semantic or component tokens, never raw values or core tokens directly). Vanilla global CSS was rejected because it lacks the scoping `packages/ui`'s many small composable components need.

**Token build tool: a small dependency-free Node script** (`scripts/build-tokens.mjs` per package), not Style Dictionary. Style Dictionary was considered — it's the industry-standard tool for exactly this job — but per IP3 (Restraint in Construction) it was judged unjustified: our token set (Ch.3–11, 52) is a few hundred values with a simple two-tier (Core → Semantic) reference structure, and Style Dictionary's transform/format DSL adds a dependency and a learning surface disproportionate to that scope. A ~150-line script that reads structured JSON and emits `.css` + `.ts` is easier to trace line-by-line against the Constitution's own rules (never consumed as a "black box"), satisfying IP2 (Machine-Checkable Truth) just as well. Revisit if the token set's complexity (multi-brand theming, per-platform outputs) later outgrows what a small script can clearly express.

## Consequences

- `packages/tokens/src/*.json` is the single source of truth; `packages/tokens/dist/tokens.css` and `dist/tokens.ts` are generated, never hand-edited (enforced by a header comment + a gitignored `dist/`). The root `dev` and `build` scripts always run the token build first, so `dist/` is never stale at run time and never needs to be committed.
- CSS custom property names use kebab-case (`--semantic-color-accent-primary`), TS constants use camelCase (`semanticColorAccentPrimary`) — both derived mechanically from the same dot-notation source name, consistent with Ch.9's general camelCase-for-JS/kebab-case-for-files convention (the Bible's own token-casing chapter was not available to read; this is a reasoned derivation, not an invented rule, and should be reconciled if/when that chapter is written).
- Component code in `packages/ui` never imports a core-tier token directly — only semantic or component tokens — mechanically checkable later via a lint rule (deferred to Milestone 7/8 tooling hardening).
