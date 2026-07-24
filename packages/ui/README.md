# @trady-perch/ui

Shared component library. **Pure React + TypeScript — zero `next/*` imports**, so components stay portable to a future Client Portal or AI-Native Conversational Layer regardless of whether that surface uses Next.js. See `docs/adr/0005-shared-ui-portability.md`.

## Component anatomy (Product Implementation Constitution Ch.12)

```
component-name/
├── component-name.tsx        (implementation — render logic only, no data fetching)
├── component-name.types.ts   (variant props, state props, content props, behavioral props, in that order)
├── component-name.module.css (semantic/component tokens only — never a raw literal or a core token directly)
├── component-name.test.tsx   (every variant renders; every canonical state renders; disabled suppresses handlers; content props appear in output)
└── index.ts                  (the sole public export — every other file is a private implementation detail)
```

**`.stories.*` files are deliberately not present.** Ch.12's file-anatomy list names them, but Storybook (or an equivalent) has not been installed — adding that tooling with zero current consumer would itself violate IP3 (Restraint in Construction) just as much as skipping tests would violate quality expectations. This is a disclosed, deliberate deferral, tracked here rather than silently diverged from — revisit if/when component documentation actually needs a dedicated viewer beyond the `.test.tsx` files, which currently serve as executable documentation of every variant/state.

Rules carried forward from the Constitution:
- Variant props are closed unions (`variant: "primary" | "secondary"`), never independent booleans.
- Hover/focus/active use native CSS pseudo-classes — never JS-simulated state.
- `disabled` is a single boolean that structurally suppresses every interaction handler.
- `loading` implies `disabled`.
- Error/success/empty is one discriminated `status` union, never independent booleans.
- No `[key: string]: any` escape hatch anywhere in a props type.
- Components consume semantic or component-tier design tokens only — never a core token directly.

## Components (Milestone 2)

| Component | Governing chapter(s) |
|---|---|
| `Link` (`primitives/link`) | ADR-0005 — the one place a framework router gets injected into an otherwise framework-agnostic tree |
| `Button` | Ch.18 (Buttons & Actions), Ch.39 (state model), Ch.42 (keyboard) |
| `IconButton` | Ch.18 §4 (the Icon Button anatomy variant) |
| `Logo` | Not sourced — see the `_origin`-style disclosure comment in `logo.module.css`; the Brand Identity Manual that would govern this is unwritten |
| `Drawer` | Ch.24 (Drawers & Sheets), Ch.42 Kb-3 (focus trap only when a backdrop is present) |
| `Header` | Ch.20 (Navigation Systems) |
| `Footer` | No dedicated chapter exists (Ch.20 governs the primary nav bar only) — built as a restrained static content region per Ch.7's Structured Grid pattern |

`Header` and `Drawer` carry `"use client"` — the two components in this package that inherently require browser state (scroll recession, focus management, keyboard listeners), a documented exception to the package's default per ADR-0005. Every other component here is server-renderable.

**Known, disclosed gaps carried into later milestones** (not silently missing — see the referenced milestone): the header dropdown's and Drawer's entrance/exit motion both use one transition config for both directions, deferred to Milestone 5 per Ch.20 §7/Ch.24 §7's stated (but not yet implemented) timing asymmetry.
