# Trady Perch Motion Synthesis — Implementation Reference

**Purpose of this document:** A literal, engineering-facing extraction of every concrete motion/animation specification found in the five source documents listed below. Where a source gives an exact number, curve, or rule, it is reproduced exactly. Where a source only describes a future chapter's *subject* without giving its values, that is stated explicitly as unspecified rather than inferred or invented.

**Sources read, in order:**
1. `docs/Trady-Perch-Motion-Bible-Architecture.md` — a **blueprint/table of contents** for a 116-chapter Motion Bible. Its own closing line states: *"This architecture is now complete. No chapter has been written."* It names every chapter's purpose, importance, and cross-references, and occasionally embeds an illustrative example value inside a chapter's descriptive prose — but it is not itself a specification document.
2. `docs/design-system-bible/Chapter-15-Motion-Timing-System.md` — **written, canonical** (first-canonical-draft). Fixes the five duration tiers and three easing curves.
3. `docs/design-system-bible/Chapter-16-Sound-Haptics-System.md` — **written, canonical.** Fixes sound/haptics governance.
4. `docs/design-system-bible/Chapter-40-Animation-Governance-Rules.md` — **written, canonical.** Fixes the permitted-property list and the simultaneous-animation ceiling.
5. `docs/design-system-bible/Chapter-41-Microinteractions-Catalog.md` — **written, canonical**, but explicitly a *citation index* — it compiles values from other Volume II component chapters (Buttons Ch.18, Cards Ch.19, Nav Ch.20, Forms Ch.21, Tables Ch.22, Dialogs Ch.23, Drawers Ch.24, Toasts Ch.25, Dropdowns Ch.26, Tabs Ch.27, Tooltips Ch.30, Skeletons Ch.31, Charts Ch.32, Badges Ch.33, Pagination/Load-More Ch.35, Timelines Ch.36, Accordions Ch.37, State Model Ch.39) that were **not** included in this reading list and were not independently read. Only the specific numbers Chapter 41 itself states verbatim are treated as confirmed below; everything else it cites is flagged as "value lives in an unread source chapter."

**Critical framing for the engineering team:** Only four documents in this set contain binding, exact numbers: Chapter 15 (timing/easing), Chapter 40 (properties/budget), Chapter 16 (sound/haptics), and the handful of literal figures inside Chapter 41's catalog. The Architecture document describes *what the eventual Motion Bible will specify* (hero entrance choreography, scroll-reveal stagger intervals, displacement distances, page-transition overlap timing, AI streaming-text pacing, etc.) but contains no chapter content itself — those chapters are unwritten. This synthesis marks every such gap explicitly in the sections below and in "Open Questions."

---

## Motion Philosophy

### Governing principles (inherited, cited by the Architecture document as load-bearing)

- **Master Vision Chapter 9 (Motion Language) — four motion principles every chapter must satisfy:** diegetic motion, importance-scaled speed, non-bounce easing, nothing-moves-without-reason.
- **Master Vision Chapter 10 (Premium Motion System):** the conceptual five-tier model (Instant/Quick/Standard/Deliberate/Ceremonial) and the entrance/exit asymmetry principle.
- **Design System Bible Chapter 1, Principle 6 (Diegetic Motion):** the single non-negotiable test every animation must pass — *"what does this represent?"*
- **Design System Bible Chapter 15:** the exact millisecond values and three easing curves, treated as physical constants, not adjustable parameters.
- **Design System Bible Chapter 40:** the six permitted animatable properties and the three-element simultaneous-animation ceiling.
- **Standing rule:** where any future motion documentation conflicts with the Design System Bible or Master Vision, those documents win without exception.

### The seven Part-I philosophy chapters (Architecture blueprint — conceptual only, chapters unwritten, but their stated purpose is itself directive)

1. **Motion Principles** — motion is read as intent by users whether or not the designer intended it; leaving it ungoverned is not neutral.
2. **Brand Personality Through Motion** — translates the three governing brand traits (Composed, Precise, Quietly Powerful) into motion; motion personality is absorbed pre-consciously, faster than copy is read.
3. **Perception & Visual Attention** — motion draws the eye faster than any static change; peripheral motion detection is evolutionarily older and faster than foveal reading, so motion *will* be noticed whether the designer wants it to be or not. This is the direct justification for the three-element simultaneous ceiling (see Governance).
4. **Cognitive Load & Motion** — a well-choreographed transition offloads tracking work onto the visual system instead of consuming (finite) working memory; this is the justification for shared-element transitions over hard cuts.
5. **Motion Ethics & Trust** — dark-pattern motion (false urgency countdowns, fabricated loading delays to imply effort) is **named and permanently forbidden**. A user who later realizes a loading delay was fabricated retroactively distrusts every prior loading state they saw. Perceived-performance techniques must always shorten *felt* time toward *real* time, **never lengthen it**.
6. **Premium Motion Characteristics** — premium motion is read through **deceleration generosity and restraint**, not speed. A fast, twitchy interface reads as anxious, not premium, regardless of raw performance. Specific checkable qualities named: "weighted," "considered," "generous landing."
7. **Anti-Philosophy (why cheap motion looks cheap)** — the named taxonomy of what makes motion read as low-effort: **linear easing, bounce/spring physics, uniform timing regardless of importance, and motion applied to everything indiscriminately.**

### Core enforced principles (from written chapters — these are binding, not blueprint)

| Principle | Statement |
|---|---|
| **Mt-1** | Exactly five duration values exist. No value between two tiers is ever used ("no value at 220ms to split the difference"). |
| **Mt-2** | Every entrance uses the Entrance curve; every exit uses the distinct Exit curve — never the same curve for both directions. An exit's duration must never equal or exceed its entrance's duration. |
| **Mt-3** | The Ceremonial duration/curve is reserved exclusively for the intro sequence. No other component, feature, or "particularly important" moment may use it — ever. Redirect to Deliberate instead. |
| **Mt-4** | Every duration token ships from creation with a paired reduced-motion companion value — never added later as an override layer. |
| **Ag-1** | Only six CSS property categories may ever animate, system-wide (see Implementation Notes). |
| **Ag-2** | No more than three elements may be actively animating at once, in one viewport, at any single moment. |
| **Ag-3** | Reduced-motion compliance is automatic and structural (inherited from the token), never a per-component implementation decision. |
| **Ag-4** | Every new animation proposal must state, in one sentence, what real relationship/state-change/sequence it represents, before any timing or property discussion occurs. "It looks good" or "it feels premium" is not sufficient. |

---

## Timing & Easing Tokens

### Duration tiers (Chapter 15, Section 4 — exact, canonical)

| Token | Standard duration | Reduced-motion companion | Assigned job |
|---|---|---|---|
| `core.motion-duration.instant` | **80ms** | 0ms (no animation) | Direct extensions of user input — button press, toggle, checkbox. |
| `core.motion-duration.quick` | **150ms** | 60ms, opacity-only | Hover states, focus rings, tooltips. |
| `core.motion-duration.standard` | **300ms** | 100ms, opacity-only | Default content motion — scroll reveals, card entrances, tab switches. |
| `core.motion-duration.deliberate` | **500ms** | 150ms, opacity-only | Consciously significant moments — major section transitions, pricing-tier selection, case-study expansion. |
| `core.motion-duration.ceremonial` | **1200ms** | Full static presentation, no animation | The intro sequence, exclusively. |

**Progression between tiers (not a fixed ratio, by design):** 80→150ms (~×1.9), 150→300ms (×2), 300→500ms (×1.67), 500→1200ms (×2.4). Chosen so each tier is perceptibly slower than the last without Deliberate and Ceremonial collapsing toward feeling similar.

**No value ever sits between two tiers.** No linear or browser-default easing curve is used anywhere in the system.

### Easing curves (Chapter 15, Section 4 — exact, canonical; only three exist)

| Token | Curve (exact) | Use |
|---|---|---|
| `core.motion-easing.entrance` | `cubic-bezier(0.16, 1, 0.3, 1)` | Every entrance at Instant through Deliberate tiers (fast start, long generous deceleration into rest). |
| `core.motion-easing.exit` | `cubic-bezier(0.4, 0, 1, 1)` | Every exit at Instant through Deliberate tiers (quicker, more even departure, no lingering deceleration). |
| `core.motion-easing.ceremonial` | `cubic-bezier(0.19, 1, 0.22, 1)` | The intro sequence, exclusively — paired 1:1 with the Ceremonial duration (Mt-3). |

Entrance and Exit curves apply identically across all four non-Ceremonial tiers. Only Ceremonial has its own fully dedicated curve.

### Other exact numeric values found directly in source text

| Value | Context | Source |
|---|---|---|
| **400ms** | Tooltip's deliberate entrance delay before appearing | Chapter 41, catalog ("Tooltips' 400ms deliberate delay") — the one exact figure Chapter 41 states verbatim rather than merely citing |
| Immediate (no delay) | Tooltip removal on cursor/focus exit | Chapter 41 ("Tooltips' immediate-on-exit removal," Chapter 30 Tt-2) |
| Immediate (no delay), exception to the 400ms rule | Chart data-point tooltip appearance on hover | Chapter 41 ("Charts' immediate-on-hover data point tooltip exception," Chapter 32) |
| **~98%** | Illustrative example of a button's press-compression scale value | Architecture document, Ch.12 description — presented as an example of the *kind* of value that chapter (unwritten) would fix; **not confirmed canonical**, flagged in Open Questions |

### Duration tiers NOT yet given exact values (Architecture blueprint only, chapters unwritten)

The Architecture document promises but does not supply: stagger intervals between successive entrances (Ch.9), hold durations, exit lags, displacement/travel distances in px or spacing-scale multiples (Ch.10), opacity midpoint/settling values for multi-stage fades (Ch.11), the closed set of scale values beyond the one illustrative 98% example and rotation values (Ch.12), and any additional easing curves for charts/parallax/ambient motion beyond the three fixed curves (Ch.14). Treat these as **unspecified** — do not invent numbers for them.

---

## Animation Patterns By Context

For each context below, exact values are given where a written source states them; everything else is marked unspecified with its source citation, since the Architecture document only describes what an unwritten chapter *will eventually* cover.

### Page transitions
**Unspecified in detail.** The Architecture blueprint (Ch.33 "Page Transition Philosophy," Ch.34 "Route Change Choreography") states the *governing intent* — continuity over novelty, an overlapping (not sequential) exit/entrance because sequential reads as a loading interruption even at equal speed — but gives no exact millisecond overlap, no shared-element-transition trigger criteria, and no concrete decision rule for fade-vs-shared-element. These chapters are unwritten. What is binding: any transition must obey Mt-2 (Entrance curve in, Exit curve out, exit ≤ entrance duration) and Ag-2 (≤3 elements animating at once).

### Hero entrance
**Partially specified.** The one-time Intro sequence (homepage/first-visit) is confirmed to run at the **Ceremonial tier exclusively: 1200ms duration, `cubic-bezier(0.19, 1, 0.22, 1)` easing** (Mt-3) — described as seven beats (black silence, golden line ignition, metallic reflection sweep, wordmark, tagline, pause, dissolve) per the Architecture's description of Ch.66, but the frame-by-frame timing of each beat is not given (Ch.66 unwritten). The metallic reflection sweep is explicitly named the **system's sole exception** to the six-permitted-properties rule (Ag-1) and to ordinary motion scarcity generally — it is a one-time, one-use gradient-position animation, never a precedent for anything else. Beyond the Intro, ordinary Hero content (headline/subheadline/CTA stagger relative to each other and relative to the Intro's dissolve) is described only conceptually (Ch.47, unwritten) — no exact stagger interval or tier assignment given.

### Hover interactions
**Tier and property rules confirmed; per-component pixel/ms detail is not.** Hover states are assigned the **Quick tier (150ms, Entrance curve on state-in)** per Chapter 15 §4's job table. A card's hover-lift is given as the canonical example of permitted properties: `transform: translateY` + `box-shadow` — both explicitly permitted (Ag-1). Card hover elevation and table-row hover elevation are cited in Chapter 41's "inspecting detail" category but their exact travel distance/elevation values live in Chapter 19 and Chapter 22, which were not read. Duration inflation is explicitly named an anti-pattern: **"a hover state assigned anything slower than Quick is immediately suspect."**

### Scroll reveals
Assigned the **Standard tier (300ms, Entrance curve)** per Chapter 15 §4 ("scroll reveals, card entrances, tab switches"). Governed by **Ag-2: no more than three elements may be mid-animation at any single scroll position**, even if more enter the viewport simultaneously — excess elements queue behind using a stagger (the exact stagger interval itself is unspecified — Ch.9 unwritten). Reduced-motion companion: **100ms, opacity-only crossfade**, no transform/movement. This ceiling is checked at *every* scroll position across a full page, not just per-animation — "budget-blind addition" (adding a new scroll animation without checking what already animates at that scroll position) is a named anti-pattern.

### Navigation transitions
**Largely unspecified.** Tab-switch sliding indicator is confirmed at the **Standard tier (300ms)** (Chapter 41 catalog citation, "Tabs' sliding indicator, Chapter 27, Standard tier"). Sticky-nav recession/reassertion behavior and its scroll-velocity threshold (Ch.35), mega-menu choreography (Ch.36 — explicitly a documented-but-currently-unused fallback since the system caps dropdown depth to avoid needing one), drawer/side-panel slide and drag-resistance behavior (Ch.37), and bottom-sheet velocity-based snap logic (Ch.38) are all described only conceptually in the Architecture blueprint — none of these chapters are written, no exact values exist.

### Loading states
**Governing doctrine confirmed; exact timings not.** Loading motion must never fabricate delay to imply effort (Motion Ethics, Ch.5) and must always work to shorten *felt* time toward *real* time. Chapter 41 confirms qualitatively that a skeleton pulse exists (Ch.31, Sk-2) and that a button's Loading+Disabled combination is a defined state pairing (Ch.39, St-4), but exact pulse-cycle duration, skeleton-shape rules, and progress-bar determinate/indeterminate choreography are not given (source chapters unwritten or not read).

### Micro-interactions
- **Button press/active compression: Instant tier (80ms)** — confirmed via Chapter 41's catalog ("Buttons' Active compression, Chapter 18, Instant tier").
- **Tooltip appearance: 400ms deliberate delay before showing; immediate removal on exit** (exact figures, confirmed above).
- **Chart data-point tooltips: immediate on hover — no delay** (explicit exception to the 400ms rule).
- Icon morphs (e.g., menu→close, play→pause), toggle/checkbox/switch/slider choreography, dropdown/date-picker open-close, search-result live reconciliation, context-menu positioning, and badge status-color transitions are all named as subjects the (unwritten) Architecture Part III chapters would cover, with no exact values supplied in the documents read.

### Form feedback
**Unspecified in exact terms.** Chapter 41 cites "inline field validation (Chapter 21, Fm-2)" as an existing rule but Chapter 21 was not read, so its exact ms values are unknown. The Architecture's description of Ch.23 (Form Field Motion, unwritten) states only the qualitative goal: a validation transition that resolves too abruptly reads as the system not having genuinely "checked" the input.

### AI interaction states
**Conceptual only — no exact values in the documents read.** The Architecture names an entire Part X (AI Motion, Ch.90–99: AI Thinking State, Conversation Flow, Streaming Text, Tool Invocation, Memory/Context Indicators, Agent Collaboration, Multi-Agent Choreography, Confidence Indicators, Reasoning Visualization) as strategically pulled forward in authoring priority — but explicitly unwritten. Chapter 41 cites "Skeleton pulse" and "escalating wait messaging" (Ch.31, Sk-3) generically but not AI-specific. The one governing rule stated directly: AI motion must reflect Master Vision's honest-uncertainty doctrine — motion that implies false confidence undercuts that doctrine's purpose — but no duration, easing, or per-character streaming-speed value is given anywhere in the five source documents.

---

## Animation Governance Rules

All four rules below (Ag-1–Ag-4) are from Chapter 40 and are binding, canonical, system-wide.

### Ag-1 — Only six properties may animate, system-wide
`opacity`, `transform` (translate/scale only — **never skew**), `color`, `background-color`, `border-color`, `box-shadow`. No filter effects, hue-rotation, blur-radius (outside Chapter 10's defined glass transitions), or clip-path may be animated anywhere. **The sole named exception in the entire system:** the Intro sequence's one-time metallic reflection sweep (a defined gradient-position animation) — never usable as precedent for anything else.

### Ag-2 — No more than three elements animate simultaneously in one view
At any single moment, no more than three distinct elements within one viewport may be actively animating. Interpreted as: one primary subject, at most two supporting elements trailing behind it, nothing further. **Does not apply to hover states** (user-triggered, inherently one-at-a-time) — it targets scroll-triggered and automatic entrance animation specifically. Checked at *every* scroll position, not just page load.

### Ag-3 — Reduced-motion compliance is automatic
Every animation built from a Chapter 15 duration token automatically inherits its reduced-motion companion — never a separate implementation step a component author must remember.

### Ag-4 — Every proposed animation must cite its diegetic justification before approval
A one-sentence answer to "what does this represent?" is required before any timing tier is even assigned. A proposed decorative effect with no answer beyond "texture" or "it looks good" is rejected outright, before any timing/property discussion.

### Duration inflation anti-pattern (Chapter 15)
Reaching for a slower tier than an interaction's actual importance warrants, on the theory that slower always feels more premium — named explicitly as backwards: a hover state at the Deliberate tier feels sluggish, not expensive. Audit method: check any interaction's assigned tier against the Section-4 job column; a hover state slower than Quick is immediately suspect.

### Budget-blind addition anti-pattern (Chapter 40)
Adding a new scroll-triggered animation without checking how many other elements already animate at that same scroll position — the Ag-2 ceiling is easy to violate this way when two teams each add animations to different sections that happen to co-occur on screen. Detected by auditing full-page scroll behavior at every position, not by reviewing each new animation in isolation.

### Governance QA checklist (Chapter 15 §14 + Chapter 40 §14, combined)
- [ ] Is the duration one of the five defined tiers, matched honestly to the element's actual importance?
- [ ] Does an entrance use the Entrance curve, and its exit the Exit curve, at an equal-or-shorter duration?
- [ ] Is the Ceremonial tier used exclusively by the intro sequence?
- [ ] Does this duration token have its reduced-motion companion defined and functioning automatically?
- [ ] Is this motion the sole carrier of any essential information, with no accompanying static indicator? (fails if yes)
- [ ] Does the animation use only one of the six permitted properties?
- [ ] Does the full page, checked at every scroll position, never exceed three simultaneously-animating elements?
- [ ] Has a one-sentence diegetic justification been stated and approved before implementation?

---

## Reduced Motion / Accessibility Requirements

### Mt-4 — Every duration ships with a reduced-motion pair (binding)
Each of the five duration tokens is defined, from creation, as a pair — never added later as a separate override layer.

| Standard tier | Reduced-motion companion |
|---|---|
| Instant — 80ms | **0ms** (no animation at all) |
| Quick — 150ms | **60ms**, opacity-only |
| Standard — 300ms | **100ms**, opacity-only |
| Deliberate — 500ms | **150ms**, opacity-only |
| Ceremonial — 1200ms | **Full static presentation, no animation** |

**"Reduced motion" does not mean "no transition at all."** A brief opacity crossfade is an acceptable and often preferable reduced-motion treatment versus a hard instant cut. The reduced-motion pairs remove *movement and scaling* specifically (no sliding, scaling, or traveling across the screen), not all transition of any kind.

### Ag-3 — Structural, not opt-in
Reduced-motion compliance is inherited automatically from the Chapter 15 token — never a per-component decision a contributor could forget. This is named as the chapter's primary accessibility mechanism, closing the most common real-world reduced-motion failure mode (simply forgetting to wire it up per component).

### No motion as sole information carrier
No animation, at any tier, may be the sole carrier of essential information with no accompanying static indicator — a state change communicated only through motion fails this requirement regardless of tier (Chapter 15 §8, extending the color-and-icon pairing principle to motion).

### Haptics accessibility parallel (So-4)
Haptic feedback must always accompany a visual or auditory signal — never carry meaning entirely on its own — because a user who cannot perceive haptic feedback in their current context must not miss information as a result.

### Not covered by exact rule in the documents read
Vestibular-safety thresholds for large-area parallax/rapid rotation/flashing (Ch.75), the full WCAG motion criterion-by-criterion mapping (Ch.76 — cites 2.2.2 Pause/Stop/Hide and 2.3.1 Three Flashes as targets, but doesn't state the actual compliance mapping), screen-reader live-region announcement rules for motion-driven state changes (Ch.77), and keyboard-vs-pointer timing parity (Ch.78) are all named as subjects of unwritten chapters — no exact rules given.

---

## Sound & Haptics

*(Chapter 16 frames itself as addressing future native-app and AI-voice surfaces primarily, since "a website has no sound or touch channel of its own" — but its ambient-sound prohibition explicitly applies to "every surface the brand controls," which includes the website's own embedded video content.)*

### So-1 — Silence is default; sound is opt-in confirmation, never ambient
No surface plays sound automatically, ambiently, or without a direct connection to an action the user just took.
- **Permitted on the website:** user-initiated media playback (e.g., a case-study video's own embedded audio, started by the user pressing play) — governed by ordinary video-player conventions.
- **Forbidden everywhere:** autoplay audio, background/ambient music or tones, any notification sound not directly triggered by the user's immediately preceding action.

### So-2 — Haptic intensity maps to the five motion tiers, never an independent scale
No independent haptic intensity scale exists; haptics map 1:1 onto Chapter 15's tiers.

| Motion tier | Haptic equivalent |
|---|---|
| Instant | Light, brief single pulse |
| Quick | Light pulse, slightly longer duration |
| Standard | Medium pulse |
| Deliberate | Medium-strong pulse, most textured/distinct pattern available |
| Ceremonial | **Not used** outside the intro-equivalent context; any true ceremonial-equivalent native-app moment defaults to Deliberate as its practical ceiling |

### So-3 — One sonic signature maximum, reserved for genuinely rare brand moments
If a distinct sonic signature is ever adopted, it is exactly one, used only at rare/significant moments (e.g., a client's automation going live for the first time) — never reused as a general/routine notification sound. **Currently: zero sonic signatures exist in the system.** Any future proposal routes through the Chapter 2 token-proposal process with the same scrutiny gold itself receives.

### So-4 — Haptic feedback is always supplementary, never the sole signal
Haptics must accompany a visual/auditory signal; a strong, distinctive haptic pattern is not inherently "more accessible" than a subtle one — distinctiveness only helps users who can currently perceive it.

### Platform scope
Haptics exist only on platforms with a haptic motor (primarily mobile) — Desktop/web contexts have no haptic equivalent, and **no workaround should simulate one** (e.g., no vibrating on-screen element as a substitute). The correct response on a non-haptic platform is simply the visual/auditory signal alone.

### Anti-pattern named explicitly: "Default inheritance"
Shipping a native app or voice surface with whatever sound/haptic behavior the underlying platform or framework provides by default, on the theory that "no one designed this, so it doesn't count." A visitor experiences a platform default exactly as if it were a deliberate brand choice — every sound/haptic event a shipped surface produces must be explicitly reviewed against these principles, not merely left un-overridden.

---

## Implementation Notes

### Permitted animatable properties (closed list, Ag-1) — the only implementable target
`opacity`, `transform` (translate/scale only — never skew), `color`, `background-color`, `border-color`, `box-shadow`.

This is the direct technical implication: **animate via CSS/JS on these six properties only.** No document in this set names a specific animation library, framework, or CSS-vs-JS preference — that decision is not made anywhere in the five sources read.

### Performance constraints stated (Architecture blueprint level — described as settled facts, but their full specification chapters are unwritten)
- A **fixed 60fps floor** is stated as a system requirement every animation must maintain (Ch.83's description states this as an existing constraint, though the chapter detailing *how* it's enforced is unwritten). Master Vision Ch.23 is cited as the source of the underlying claim that stuttering animation is worse for the brand than no animation at all.
- Fixed millisecond durations (Chapter 15) are expected to render identically across 60Hz and 120Hz+ displays — i.e., a "150ms" transition must feel like 150ms regardless of refresh rate (Ch.84, conceptual, unwritten in detail).
- A graceful-degradation ladder for underpowered/low-end hardware is named as required (motion complexity degrades before content does) but its concrete tiers are not specified (Ch.80, unwritten).
- GPU-acceleration guidance (which of the six permitted properties are GPU-composited by default vs. require explicit optimization) is named as a subject but not resolved with values (Ch.82, unwritten).

### No linear/default easing anywhere
Explicitly stated as a hard rule in Chapter 15 §4: "No linear or default-system easing curve is used anywhere in the system."

### Transform-origin / anchoring
The Architecture names a dedicated (unwritten) chapter (Ch.13) for anchoring transforms to their trigger (e.g., "a dropdown scales from its trigger, not its own center") but gives no implementation values — flagged as a real, load-bearing UX requirement without numeric specification.

### Directionality
The Architecture likewise names spatial-directionality rules (an element should travel in a direction causally tied to its trigger — e.g., a drawer enters from the correct edge, a tab indicator slides toward the newly-selected tab) as required (Ch.16, unwritten) but supplies no concrete distance or vector values.

---

## Open Questions / Ambiguities

The following are explicitly **not resolved** by the five documents provided, and require either a judgment call by the engineering/design team or a future canonical chapter before they can be implemented with confidence:

1. **Stagger interval between successive entrance animations** (e.g., card grid, list reveal) — referenced repeatedly (Ag-2's "stagger logic," Ch.9 "Duration Tokens & the Timing Hierarchy") but no millisecond value is given anywhere in the documents read.
2. **Displacement/travel distances** for any translate-based animation (how far a card, drawer, or toast physically moves in px or spacing-scale units) — Ch.10 is named as the chapter that would fix this; it is unwritten.
3. **Opacity midpoint/settling values** for multi-stage fades beyond the standard 0%→100% resolution — Ch.11, unwritten.
4. **Scale/rotation token set** — only one illustrative example value appears anywhere in the source material: "~98%" for a button's press-compression, mentioned in passing inside the Architecture document's description of an unwritten chapter (Ch.12), not confirmed as a canonical, ratified value. Modal entrance scale and any rotation values are entirely unspecified. Treat 98% as directional, not confirmed-canonical, until Chapter 12 itself is written.
5. **Page-transition exact overlap timing and the fade-vs-shared-element decision rule** — described only as a philosophy ("continuity over novelty," overlapping not sequential) with no numbers (Ch.33–34, unwritten).
6. **Hero content stagger** (headline → subheadline → CTA reveal order and interval, and its relationship to the Intro's dissolve) — conceptual only (Ch.47, unwritten).
7. **Intro sequence's per-beat timing** — the 1200ms Ceremonial total and its easing curve are confirmed, but how that 1200ms is allocated across the seven named beats (black silence, line ignition, reflection sweep, wordmark, tagline, pause, dissolve) is not given (Ch.66, unwritten).
8. **Sticky-nav scroll-velocity threshold** distinguishing intentional upward scroll from incidental — named as required, not quantified (Ch.35, unwritten).
9. **Drawer/bottom-sheet drag-resistance and velocity-based snap thresholds** — named as required, not quantified (Ch.37–38, unwritten).
10. **Skeleton pulse cycle duration, progress-bar determinate/indeterminate rules, toast auto-dismiss duration** — cited by name/reference in Chapter 41's catalog but their actual values live in Chapters 25/31/39, which were not part of this reading set and were not independently read.
11. **AI thinking-indicator and streaming-text pacing** (per-character/token reveal timing, thinking-pulse cycle) — Part X (Ch.90–99) is entirely conceptual in the Architecture document; no exact values exist in any document read. This is a notable gap given AI interaction is one of Trady Perch's stated highest-priority credibility surfaces.
12. **Form-field validation transition timing** — Chapter 41 cites "Chapter 21, Fm-2" as the source of this rule, but Chapter 21 was not included in the reading list, so its exact values are unverified here.
13. **GPU-compositing guidance and the specific low-end-device degradation ladder** — named as necessary (Ch.80, 82) but not quantified.
14. **Any animation library or CSS-vs-JS implementation preference** — not stated anywhere in the five sources; this is purely an engineering decision to be made independent of brand documentation, constrained only by the Ag-1 six-property closed list and the 60fps/reduced-motion requirements above.

**Bottom line for engineering:** Build the token layer (durations, easing curves, permitted-property list, reduced-motion pairs, the three-element budget) exactly as specified in Chapters 15/40 above — those are load-bearing and precise. For every context-specific choreography question not covered by an exact number above (stagger timing, travel distance, hero/page-transition sequencing, AI motion pacing), treat the current state as an intentional gap in the brand documentation rather than guess a number — flag it back to design/brand stakeholders rather than inventing a value that later conflicts with an eventual canonical chapter.
