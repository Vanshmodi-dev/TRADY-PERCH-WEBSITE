# ADR-0005: `packages/ui` stays framework-agnostic with respect to Next.js

**Status:** Accepted
**Date:** 2026-07-24
**Origin:** User directive (2026-07-24): "keep the shared UI library framework-agnostic where practical so components remain reusable across future products." Consistent with Product Implementation Constitution Ch.7 (`packages/ui` is a foundational-tier package expected to serve multiple future `apps/*` surfaces).

## Context

`packages/ui` is meant to eventually serve not just the Marketing Site but a future Client Portal and AI-Native Conversational Layer, which may or may not be built on Next.js. If shared components import Next.js–specific modules directly (`next/link`, `next/image`, `next/navigation`), they become silently non-portable — a future non-Next.js consumer would need to fork or wrap every such component.

## Decision

`packages/ui` depends only on `react`, `react-dom` (peer dependencies), `@trady-perch/tokens`, and `@trady-perch/motion`. It contains **zero** imports from `next/*`. Where a component needs a capability Next.js specializes (client-side navigation, optimized images), the component accepts that capability as a prop/composition slot instead of importing it directly:

- Navigation: components that render a link accept an `as`-style polymorphic prop or a `renderLink` slot; `apps/marketing-site` supplies `next/link` at the call site. The component itself renders a plain `<a>` by default so it still works with zero configuration outside Next.js.
- Images: an `ImageProps`-shaped prop (`src`, `alt`, `width`, `height`) is accepted and rendered as a plain `<img>` by default inside `packages/ui`; `apps/marketing-site`-level feature code (in `src/features/`, not `packages/ui`) is where `next/image` actually gets used for real page content, since that code is already Next.js-specific by virtue of living inside the Next.js app.
- Server vs. Client Components: `packages/ui` components are written framework-agnostically (no `"use client"` directives baked in) wherever possible; a component is only marked client-side at its point of use in `apps/marketing-site` if it genuinely needs interactivity. Components that inherently require browser state (e.g., a component managing open/closed state) are the exception and are documented as such in their own README.

## Consequences

- `packages/ui` can be dropped into a Vite+React, Remix, or plain CRA-style app with zero modification.
- A small amount of glue code lives in `apps/marketing-site/src/shared/` to wire `next/link`/`next/image` into `packages/ui`'s slot props — an acceptable, explicit translation unit (Ch.3), not a violation.
- This does not apply to `apps/marketing-site` itself, which is Next.js-specific by design (ADR-0001) — the agnosticism boundary is exactly at the `packages/ui` package edge.
