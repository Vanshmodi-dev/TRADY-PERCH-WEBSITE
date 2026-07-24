# @trady-perch/tokens

Single source of truth for every Trady Perch design token. Structured data lives in `src/core.json` and `src/semantic.json`; `npm run build` (see `scripts/build.mjs`) compiles them to `dist/tokens.css` (CSS custom properties) and `dist/tokens.ts` (typed, nested TS constants). **`dist/` is generated — never hand-edit it.**

## Translation ledger (Ch.3 — Translation Doctrine)

| Token category | Origin | Status |
|---|---|---|
| `color` | Design System Bible Ch.3 | Canonical (first-canonical-draft) |
| `space` | Design System Bible Ch.5 | Canonical (first-canonical-draft) |
| `radius.md` (10px) | Design System Bible Ch.18 §4 (Buttons) — first population of this Core category | Canonical |
| `radius` (none/sm/lg/xl/full) | Not sourced — interim, derived from Ch.5's 4px rhythm and `md`'s now-canonical 10px | Interim — Ch.18 §16 itself notes Ch.6/Ch.9 should formally absorb this category when next revised |
| `border` (width) | Not explicitly sourced; standard 1px/2px scale | Interim, low-risk |
| `shadow` / elevation | Design System Bible Ch.9 | Canonical (first-canonical-draft) |
| `blur` / materials | Design System Bible Ch.10 | Canonical (first-canonical-draft) |
| `type` | Design System Bible Ch.4 | Canonical values. **Consumed directly from the core tier by components (a deliberate, disclosed exception to "semantic/component only")** — step names (`display`/`h1`/`body`/`caption`/`label`) already encode usage role, not raw appearance, the same protection a semantic layer would add. Revisit if a future chapter introduces role names that diverge from step names (e.g. a "pull-quote" role reusing the H2 step). |
| `containerWidth` | Design System Bible Ch.6 | Canonical values. Same disclosed exception as `type` — `content`/`canvas` are already role names, not raw pixel values. |
| `breakpoint` | Design System Bible Ch.8 | Canonical values, documented as the single source of truth. **Not usable via `var()` inside `@media` conditions** (no preprocessor per ADR-0003) — every `@media` rule hardcodes these numbers and should cite this token in a comment. |
| `iconSize` | Design System Bible Ch.11 | Canonical (first-canonical-draft) |
| `opacity.100/720/800` | Ch.3 (`border.default` = 10%), Ch.10 (`glass-nav` = 72%, `glass-backdrop` = 80%) | Canonical. Keys are per-mille style (100 = 10%), matching Ch.39's own naming for `opacity.400` below — not literal percentages. |
| `opacity.400` / `semantic.opacity.disabled` | Design System Bible Ch.39 §4/§5 (Complete State Model) — the canonical new Core+Semantic pair for the Disabled interaction state | Canonical |
| `surface.glassNavFillReceded` (55%) | Design System Bible Ch.20 §5 (Nv-4) | Canonical |
| `surface.drawerBackdropFill` (40%, no blur) | Design System Bible Ch.24 §5 (Dw-2) | Canonical |
| Text on gold-filled surfaces (buttons) | Design System Bible Ch.18 §4: Primary emphasis reuses `semantic.color.background.primary` as the label color — **no separate `onAccent` token exists**, per Reuse Before Invention (P7) | Canonical — an earlier interim `text.onAccent` token was removed in favor of this |
| Active-state compression (98% scale), Focus ring (2px/2px) | Design System Bible Ch.39 §5 | Canonical — confirms values already implemented in Milestone 1 |
| Dark-mode-only, no theme toggle | Design System Bible Ch.52 | Canonical — do not build a light theme or theme switcher |

Full extraction with citations: `docs/_synthesis/01-design-tokens-synthesis.md`.

## Usage

```css
/* apps/marketing-site/app/globals.css */
@import "@trady-perch/tokens/css";
```

```ts
import { semanticTokens } from "@trady-perch/tokens";

semanticTokens.color.accent.primary; // "#C9A24B" — resolved literal, for logic (e.g. charts, canvas)
```

Components should consume **semantic or component tokens only** — never a core token directly (Ch.13 §3). CSS: `color: var(--semantic-color-text-primary);`, never `var(--core-color-white-050)` from component code.
