# ADR-0009: `prefers-reduced-motion` as the system's sole animation-degradation signal

**Status:** Accepted
**Date:** 2026-07-25
**Origin:** Design System Bible Chapter 55, Pf-2 ("Animation Complexity Scales Down Gracefully on Lower-Powered Hardware, Content Never Does"); Chapter 15 Mt-4 / Chapter 40 Ag-3 (reduced-motion companions, already implemented); [[0008-ceremonial-intro-lcp-budget-tension]].

## Context

Milestone 8's independent review correctly noted that Pf-2 names two distinct triggers for simplifying an animation's motion complexity: a user's explicit `prefers-reduced-motion` preference, and a device's own **hardware capability** ("where an animation would perform poorly on lower-powered hardware"). Every animated component in this codebase — most notably the homepage's ceremonial intro sequence (`intro-sequence.tsx`), the only place Chapter 15's Ceremonial tier is used — implements the first (via `window.matchMedia("(prefers-reduced-motion: reduce)")`, per Ch.15 Mt-4) and not the second.

A genuine hardware-capability check has no reliable, standardized signal to build on. `navigator.hardwareConcurrency` and `navigator.deviceMemory` exist but are widely fingerprinting-resistant by design in modern browsers (Safari never ships `deviceMemory` at all; Chrome and Firefox increasingly round or omit these values under privacy hardening), so a threshold-based check built on them would be unreliable in exactly the browsers most likely to be running on lower-powered hardware. A runtime dropped-frame heuristic (measuring actual paint timing during the animation and downgrading mid-sequence) is a real, buildable technique, but it is a nontrivial feature in its own right — it needs its own threshold tuning, its own testing story, and a design decision about what "simplified" means for this specific sequence (Ch.15 Mt-4's reduced-motion companion is already fully specified for the *other* trigger; a hardware-triggered path would need an equivalent design pass Master Vision §9.2 has not specified).

## Decision

Treat `prefers-reduced-motion` as the system's sole, deliberate animation-degradation signal for now. Do not build a hardware-capability heuristic under this milestone's time pressure using an unreliable proxy (`hardwareConcurrency`/`deviceMemory`) just to produce *something* — a shaky, untested degradation path is worse than an honest, disclosed gap, per this project's own standing discipline (see [[0008-ceremonial-intro-lcp-budget-tension]] for the same reasoning applied to a different Ch.35/Ch.36 tension).

This is a real, open gap against Pf-2's literal text, not a claim that Pf-2 is satisfied — logged in Chapter 66's debt register accordingly.

## Consequences

- A visitor on a genuinely low-powered device *without* `prefers-reduced-motion` set still receives the intro sequence's full ceremonial treatment (two simultaneous Standard/Ceremonial-tier animations — the wipe-cover transform and the masked reflection sweep — both already within Ch.40 Ag-2's 3-simultaneous ceiling, just not simplified for weak hardware specifically).
- Should a reliable, non-fingerprint-sensitive capability signal become available (e.g. a future standardized API, or real production data showing this is a genuine problem for real visitors), revisit this ADR and Pf-2's implementation together — this is intentionally a "build it when there's a real, measured need" deferral (Chapter 1's IP3), not a permanent exemption.
- Every *other* animated element sitewide (Reveal, Header dropdown, Drawer, hover states) runs at Standard tier or below, well short of Ceremonial — this gap is narrowly scoped to the one Ceremonial-tier sequence in the whole system.
