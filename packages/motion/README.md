# @trady-perch/motion

Motion duration/easing tokens (Design System Bible Ch.15) and animation governance constants (Ch.40). Full extraction with citations: `docs/_synthesis/03-motion-synthesis.md`.

## What's binding vs. open

Only Ch.15 (timing/easing) and Ch.40 (governance) contain exact, canonical numbers — captured in full here. Everything context-specific (stagger intervals, travel distances, page-transition overlap timing, AI streaming-text pacing) is **not yet specified anywhere in the source documents** (the Motion Bible itself is an unwritten blueprint). Do not invent values for these — see the Open Questions section of the synthesis doc. When Milestone 5 (Interactive elements and animations) needs one of these values, treat its absence as a real gap to flag, not something to quietly guess.

## Usage

```css
@import "@trady-perch/motion/css";

.card {
  transition: transform var(--motion-duration-quick) var(--motion-easing-entrance);
}
```

Reduced-motion is **automatic** for duration — `--motion-duration-*` already resolves to its Ch.15 Mt-4 companion value under `prefers-reduced-motion: reduce`. Never write a component-level `prefers-reduced-motion` branch for duration.

**Ch.15 Mt-4 also requires the Quick/Standard/Deliberate reduced-motion companions to be "opacity-only"** — under reduced motion, translate/scale movement must stop entirely, not just speed up. A duration-only override doesn't achieve that by itself, so `--motion-reduced` (0 normally, 1 under `prefers-reduced-motion: reduce`) is also generated. **Any transform distance must be written to structurally collapse to zero when it flips**, e.g.:

```css
.card {
  --travel: 24px;
  transform: translateY(calc(var(--travel) * (1 - var(--motion-reduced))));
  transition:
    transform var(--motion-duration-standard) var(--motion-easing-entrance),
    opacity var(--motion-duration-standard) var(--motion-easing-entrance);
}
```

This is the required pattern for every transform-based entrance/exit — never a per-component `prefers-reduced-motion` branch that a contributor could forget to write. Only import `prefersReducedMotion()` from this package when a component needs to skip an entire animation outright (e.g. an intro sequence) rather than just neutralize its movement.

```ts
import { ANIMATABLE_PROPERTIES, MAX_SIMULTANEOUS_ANIMATIONS, prefersReducedMotion } from "@trady-perch/motion";
```

## Governance rules enforced here (Ch.40)

- **Ag-1**: only `opacity`, `transform` (translate/scale, never skew), `color`, `background-color`, `border-color`, `box-shadow` may ever animate.
- **Ag-2**: no more than 3 elements animate simultaneously in one view (checked at every scroll position — a code-level lint for this doesn't exist yet; it's a design-review-time check for now).
- **Mt-3**: the Ceremonial tier (1200ms) is reserved exclusively for the one-time intro sequence — never redirect a "very important" moment to it. Use Deliberate (500ms) instead.
