# ADR-0004: Reconciling Next.js's `app/` routing convention with Ch.8's folder standard

**Status:** Accepted
**Date:** 2026-07-24
**Origin:** Product Implementation Constitution Ch.8 (Folder Hierarchy Standard); Naming Conventions Ch.9 exception clause

## Context

Ch.8 mandates every app's internal structure as `src/{features/<name>/{components,hooks,api,types,tests,fixtures}, shared/{components,hooks,utils}, routes/}`, with routes described as "thin by design — a route file imports and renders a feature's top-level component and contains no business logic of its own." Next.js's App Router, however, requires file-based routing to live specifically under an `app/` directory at a fixed location relative to the project root (or `src/app/`) — this is a non-negotiable framework mechanism, not a style choice. Ch.9's naming standard has an explicit exception clause: "where an external non-negotiable standard... conflicts, the external requirement wins — documented at point of use, citing the naming chapter."

## Decision

`apps/marketing-site/app/` is used for Next.js's required routing files, and each route file is kept exactly as thin as Ch.8 already prescribes: a `page.tsx` imports and renders one top-level component from `src/features/<name>/`, with no business logic of its own. `apps/marketing-site/src/{features,shared}/` holds all real implementation, exactly per Ch.8. No `src/routes/` folder is created, since Next.js's `app/` directory *is* the routes layer — creating a second, parallel routes folder would be a duplicate-translation anti-pattern (Ch.3), not extra compliance.

## Consequences

- `app/page.tsx` for the homepage looks like: `export default function HomePage() { return <HomeFeature />; }` — nothing else.
- `app/layout.tsx`, `app/loading.tsx`, `app/not-found.tsx`, and other Next.js file-convention files are the only files that live directly in `app/`; everything else (components, hooks, utils) lives under `src/`.
- This exception is documented once, here, rather than re-justified at every route file.
