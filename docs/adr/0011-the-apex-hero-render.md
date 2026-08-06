# ADR-0011: The Apex — a real-time render as the hero's identity object

**Status:** Accepted — and, since 2026-08-06, actually wired to the hero
**Date:** 2026-07-31

> ## Implementation note — read this before touching the hero
>
> This decision spent a week in a state worth naming, because the failure mode
> is easy to repeat and hard to see.
>
> The Apex was built exactly as described below, and this ADR was marked
> Accepted. **But `hero.tsx` was never changed.** It went on rendering the
> layered-CSS Core this document argues against, while
> `src/features/home/sections/hero/apex/` sat in the tree importing three.js
> and rendering on no route. The decision looked shipped. It was not.
>
> Nothing caught it. Typecheck passed, tests passed, the build passed, and the
> page looked deliberate — because the thing it rendered *was* deliberate, just
> the previous decision. Only a human looking at the homepage and asking where
> the pyramid went surfaced it.
>
> It then caused a second, unrelated failure. The FIELD LINES rebuild
> (`461e1b1`) dropped `three`, `@react-three/fiber` and `@react-three/drei`
> from `package.json` and the lockfile. The orphaned directory kept importing
> them — invisible locally, where the packages linger in `node_modules`, and
> invisible on Vercel, which builds with `typescript: { ignoreBuildErrors:
> true }`. It surfaced only in CI, as 27 `tsc` errors that blocked every merge
> to `main`. The directory was briefly deleted on 2026-08-05 to unblock it.
>
> Both are fixed as of 2026-08-06: the dependencies are declared, the
> implementation is restored, and `hero.tsx` renders `<HeroApex />`. A source
> assertion in `hero.test.tsx` now fails if that line reverts — a mock cannot
> catch this, because mocking the module proves only that the test knows its
> name.
>
> **If the hero object is ever replaced again, change `hero.tsx` and delete the
> implementation in the same commit.** An ADR that describes something the site
> does not render is worse than no ADR.
**Origin:** Hero Experience Bible Ch.22 (3D Philosophy) Td-1 — "3D must be chosen, never assumed. A hero contains 3D only after an explicit decision recording what it delivers over a flat treatment." This ADR is that record. Also Ch.22 §3 (the 3D Decision Matrix), Ch.24 (Material Philosophy), Ch.23 (Lighting Philosophy), Design System Bible Ch.14 (Rd-1…Rd-4); [Hero Direction: FIELD LINES](../Trady-Perch-Hero-Direction-FIELD-LINES.md) §7.6; Product Implementation Constitution Ch.36 (Performance Budgets).

## Context

The FIELD LINES direction specifies two separate things: a ceremonial five-second intro, and a **machined identity object** that the intro resolves into and that the site rests on. §7.5 names the object's central image — *gold from inside the machine* — and §7.6 argues the object's real value is that it is an asset the brand can reuse in case-study imagery, decks, print and social, which a particle animation cannot be.

The intro shipped as specified. The resting object shipped as a layered CSS artefact: a disc-shaped housing with a cut aperture and a gold rotor behind it, driven by a damped pointer-tracked key light. It was a good CSS construction, and it had a ceiling that a CSS construction cannot pass:

- **Its material was painted, not lit.** Every highlight was a gradient positioned by a custom property. Move the light and the gradient moves; the *surface* never changes, because there is no surface. Ch.24's requirement is a material that responds to light, and a gradient cannot respond to anything.
- **It had no geometry**, so it had no silhouette, no self-shadowing, no parallax between its own parts, and no edges for a raking light to find. Ch.22 Td-2 locates a render's persuasive power in how convincingly it renders *one material*; the CSS object could not render one at all.
- **It could not leave the homepage.** A stack of positioned divs is not a photograph of an object, so §7.6's whole argument for having an identity object went unrealised.

## Decision

Replace the CSS Core with **the Apex**: a hollow, machined, matte-black pyramid holding a gold-lit mechanism, rendered in real time with React Three Fiber and three.js, in `apps/marketing-site/src/features/home/sections/hero/apex/`.

Ch.22 §3's matrix, run in full, because a "no" at any gate ends the proposal:

| # | Gate | Result |
|---|---|---|
| 1 | Diegetic justification | *A machined housing, deliberately plain, cut open so the gold-emitting mechanism inside it is the only thing worth looking at.* The brand claim, as an object. |
| 2 | Non-depiction | Pass. It is a **material and a made object**, not a concept. It does not depict automation, a workflow, a network or intelligence, and it contains no diagram. |
| 3 | Alternative comparison | Named capability the flat treatment lacks: **the surface changes under a moving light.** Brushing, scratches and laser etching are invisible head-on and legible at a grazing angle. Nothing painted can do this, and it is the entire premise of Ch.23's pointer-driven key. |
| 4 | Resourcing | Accepted as the most demanding visual element on the site. Procedural geometry, procedurally generated surface maps, its own unit-tested maths module. |
| 5 | Static sufficiency | Pass. The still is the designed presentation and the motion is additive — see *Degradation* below. |
| 6 | Claim independence | Pass. Headline, qualifier and both CTAs are server-rendered and never wait for the renderer. |
| 7 | Motion budget | Everything moves below Ch.15's Deliberate tier: the shell turns once per eleven minutes, the light settles over ~1.2s. Nothing here reaches the tier Ch.21 has already spent on the intro. |
| 8 | Frame rate | Measured **60fps** on a 2015 Intel HD Graphics 520 (integrated) at devicePixelRatio 2 — idle, while sweeping the light, and at the mobile breakpoint. One forward pass, one 1024² shadow map, no post-processing, ~14k triangles, one particle draw call. Resolution is shed first under load via `PerformanceMonitor`. |
| 9 | Object ceiling (Rd-4, ≤3) | Three: shell, mechanism, particulate. |
| 10 | Single hero material (Rd-2) | **Black anodised aluminium** is the hero material. Machined titanium and gold are explicitly secondary and confined to the mechanism. |

Two consequential technical choices are worth recording because both are the opposite of the obvious one:

**The housing is authored as a dielectric, not a metal** (`metalness` 0.22, low clearcoat, roughness ~0.62). In a metallic PBR workflow a metal's specular is tinted by its base colour, so a *black* metal reflects almost nothing and the object disappears into the page. Black anodising is physically an oxide layer over metal — a dielectric — and authoring it as one is what preserves the flat ~4% reflectance that makes the bevels read.

**Nothing rotates toward the cursor; the light moves instead.** Turning the object to face the pointer is the conventional interaction and it reveals nothing about the surface, which is the only thing worth revealing here. See Ch.26.

## Consequences

- **The `/` route exceeds Ch.36's per-route JavaScript ceiling.** The renderer is a **237.7KB gzipped** chunk against a 100KB ceiling, measured over the wire from a production build. This is a real, open budget violation, disclosed rather than worked around, and it is the single reason to reject this ADR if it is to be rejected. Mitigations taken, in order of effect:
  - The chunk is **not in the route's initial bundle**. It is fetched via `next/dynamic` only once the hero has intersected the viewport *and* `requestIdleCallback` has fired, so it competes with neither hydration nor first interaction. Every other route's own JavaScript measures 0KB — the cost is isolated to `/`.
  - drei's `<Environment>` was replaced with a ~40-line cube capture (`apex-environment.tsx`), removing three-stdlib's Radiance HDR and OpenEXR decoders and its ground-projection sphere: **~24KB gzipped** of image loaders for a scene that loads no images.
  - All geometry and all surface maps are **generated from numbers at run time**. There is no GLB, no texture atlas and no HDRI, so the deferred cost is code and nothing else.
  - The remainder is three.js itself and is not reducible without abandoning real-time rendering.

  The honest options are (a) accept the overage for `/` alone and amend the budget file with a documented per-route exception, or (b) revert to a flat treatment. This ADR takes (a) provisionally; the number is recorded here so the decision is re-made deliberately rather than inherited.
- **`npm run test:performance` does not currently catch this, and that is a measurement gap, not a pass.** The audit reports `/` at 0.0KB own JS. Traced to its cause rather than accepted: the audit measures to `networkidle` plus 200ms, and it does not skip the ceremonial intro, so its window closes while the intro is still animating and the main thread is still busy — `requestIdleCallback` has not yet fired and the renderer has not yet been requested. Instrumented directly against a production build: on a **first visit the chunk arrives at t+3033ms**, after the audit stops counting; on a **return visit in the same session** (intro already shown, main thread free) it arrives at **t+648ms**, before networkidle, and would be counted. The bytes are identical either way. Do not read the audit's 0.0KB as this entry being stale — if anything the audit should be taught to wait past the intro, which would make it report the real number on every run.
- **Frame rate is measured, not asserted.** 60fps on a 2015 Intel HD Graphics 520 at dpr 2, idle and under a continuous pointer sweep, desktop and mobile breakpoints. Off screen, the page's own rAF returns to a clean 60 with the scene contributing nothing, which confirms `frameloop="never"` stops the loop rather than slowing it. Note that a headless browser falling back to SwiftShader software rasterisation renders this scene at ~2.6fps — a fact about CPU rasterisation, not about the scene, but one worth knowing before diagnosing a "performance regression" from a CI screenshot job.
- **Degradation is a designed still, never a deletion** (Ch.15 Mt-4, Ch.22 Td-5, [[0009-pf2-reduced-motion-as-sole-degradation-signal]]). Under `prefers-reduced-motion` the scene runs on an on-demand frame loop, renders its composed pose, and stops — verified as a byte-identical canvas 2.5s apart. The pointer no longer moves the light. Without WebGL, no canvas is created at all and a CSS poster of the same object, in the same palette, in the same place in the frame, is what remains — it ships in the first byte of HTML and reserves the canvas's exact box, so the hand-off costs no layout shift in either direction.
- **Off-screen and backgrounded, the loop is stopped**, not slowed: `frameloop="never"` schedules no animation frame at all.
- **The identity object now exists as an object.** It can be posed, lit and photographed for the uses §7.6 describes. That was the argument for having one.
- **`prefers-reduced-motion` remains the sole degradation signal.** ADR-0009's open gap against Pf-2 is unchanged in kind by this work, though `PerformanceMonitor` now gives the hero — and only the hero — a real measured-frame-rate response that no other component has.
