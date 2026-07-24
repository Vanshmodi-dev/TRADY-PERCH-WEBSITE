# ADR-0002: Monorepo tooling and initial scaffold scope

**Status:** Accepted
**Date:** 2026-07-24
**Origin:** Product Implementation Constitution Ch.1 IP3 (Restraint in Construction), Ch.6–7 (Repository Structure)

## Context

Chapter 7 gives the literal full-monorepo tree covering all four Trady Perch product surfaces (`apps/marketing-site`, `apps/client-portal`, `apps/conversational`) and six packages. Only the Marketing Site is being built right now. IP3 ("a dependency, an abstraction layer, or a configuration knob must be justified by a demonstrated, current need... never a hypothetical future one") governs how much of that tree to scaffold today.

Two sub-decisions: (1) which package manager / workspace tool, (2) how much of the six-package tree to create now.

## Decision

**Package manager: npm workspaces** (npm 11.x, already present, zero additional global install). pnpm was considered (common monorepo choice, stricter dependency isolation) but is not installed on this machine and adding it is an unjustified new dependency per IP3 when npm's native workspace support is already sufficient for the repo's current size. This is a reversible choice (IP7) — revisit if/when cross-package build orchestration genuinely outgrows what `npm run -ws` provides.

**No Turborepo/Nx yet.** With one app and a handful of foundational packages, npm's native topological workspace execution is sufficient. Revisit when build-time caching or parallel task orchestration across many packages becomes a demonstrated need (e.g., once `apps/client-portal` is real).

**Scaffold scope:** `apps/marketing-site/` plus exactly the packages it genuinely consumes today: `packages/tokens`, `packages/motion`, `packages/config`, `packages/ui`. **Not created:** `apps/client-portal/`, `apps/conversational/`, `packages/api-contracts/`, `packages/testing/` — no current surface needs them. Each is created only once it passes Ch.2 §6's classification procedure and is actively being built, per Ch.7's own stated rule for `apps/`.

## Consequences

- Root `package.json` declares `workspaces: ["apps/*", "packages/*"]`; a single root lockfile governs all installs.
- CI/build tooling (Turborepo etc.) can be introduced later without restructuring — it layers on top of the existing workspace graph rather than requiring a migration.
- `packages/testing` and `packages/api-contracts` are documented here as deliberately deferred, not forgotten, so a future contributor doesn't mistake the omission for an oversight.
