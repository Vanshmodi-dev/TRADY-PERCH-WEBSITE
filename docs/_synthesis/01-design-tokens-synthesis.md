# Trady Perch — Design Tokens Synthesis

**Purpose:** Literal, implementation-ready extraction of every concrete design token, numeric value, and hard rule from the Trady Perch Design System Bible (Chapters 1–11, 52), for direct translation into CSS custom properties. Values are copied verbatim from source — nothing rounded, invented, or paraphrased. Where the source is conceptual/qualitative only, this is stated explicitly rather than guessed.

**Sources read in full:** `Trady-Perch-Design-System-Bible-Architecture.md`, `design-system-bible/README.md`, Chapters 1–11, Chapter 52.

**Status flag inherited from source README:** Several values below are explicitly marked in the source as *first-canonical-draft* — decisive proposals, not yet battle-tested. Chapters 3–11 all carry this flag. This is noted per-section below, not just here, per the source's own honesty standard.

---

## Design Principles

Source: Chapter 1 — Design System Principles. These are the eight Tier-1 principles (P1–P8), binding on every other chapter without exception. They are procedural/judgment principles, not visual specs — no numeric values attach to most of them except where explicitly measured.

| Code | Name | One-line rule |
|---|---|---|
| P1 | Traceable Inheritance | Every design decision must be traceable to a specific, named origin (a Master Vision section or another of these 8 principles) — never "it looked right." |
| P2 | Singular Focus | At every level of resolution (page, component, single moving element) there is exactly one dominant thing happening — never zero, never more than one. |
| P3 | The Scarce Signal | Every attention-drawing accent (gold, glow, emphasis-tier motion, sound) must stay rare enough that its appearance is still legible as significant. |
| P4 | Restraint as Default | Between a more assertive and a quieter presentation, the quieter one is default; the assertive one must be separately justified. |
| P5 | Sequence-Aware Correctness | A design decision's correctness depends on its position in the sequence of doubts/feelings a person is moving through, not just its own execution quality. |
| P6 | Diegetic Motion | No motion exists unless it represents something real — a relationship, a state change, a sequence. No exception clause. |
| P7 | Reuse Before Invention | An existing token/component/pattern must be shown insufficient before a new one is created beside or in place of it. |
| P8 | The Impossible Standard as Final Arbiter | When P1–P7 conflict, the tie-breaker is: "does this decision make Trady Perch look like it needs to try harder to be believed, or like it already doesn't need to?" No exception clause. |

**Explicit numeric measurements attached to principles (Chapter 1, Section 5):**
- P2: no more than **4 distinct type sizes** visible in a single viewport; no more than **1 primary CTA** visible at any scroll position; no more than **2 visually dense sections** back-to-back without a quieter one between.
- P3: gold occupies no more than **roughly 10%** of any single screen's surface area.
- P4: **exactly 1 CTA per page**; an exiting element must always animate faster/quieter than its entrance, never equal or slower.
- P6: motion resolves into **exactly 5 named tiers** — Instant, Quick, Standard, Deliberate, Ceremonial (exact durations are Chapter 15's responsibility — Chapter 15 was not in the requested reading set, so exact ms/easing values are **not captured here**; treat as open/unspecified for this synthesis).

**Token architecture model (Chapter 2 — governs how every value below is structured):**
- **Three-tier resolution model:** `Core` → `Semantic` → `Component`, in that order. Core = raw literal values. Semantic = role-based names referencing Core. Component = last-resort, component-scoped overrides referencing Semantic.
- **Naming grammar:** `{tier}.{category}.{role}.{variant-or-state}` — max 4 segments, no segment skipped.
- **Ten required Core categories:** `color`, `space`, `radius`, `border`, `shadow`, `blur`, `opacity`, `type`, `container-width`, `icon-size` — plus `motion-duration` and `motion-easing` added by Chapter 2 §7 (owned by Chapter 15, not read in this pass).
- **Token lifecycle states:** Proposed → Draft → Stable → Deprecated → Retired.
- A token's *name* never varies by breakpoint; only its *resolved value* does.

---

## Color System

Source: Chapter 3 — Color System. Flagged **first-canonical-draft** in source. Dark-native only — see Dark Mode section below (Chapter 52) for the explicit statement that no light theme exists.

### Core Tier — the sixteen values (closed set, per principle C-1)

| Token | Hex | Description |
|---|---|---|
| `core.color.black.950` | `#0B0B0D` | Primary background — deepest, most neutral near-black. |
| `core.color.black.900` | `#141416` | Secondary background — one perceptible step lighter, section-separating. |
| `core.color.black.850` | `#1C1C1F` | Card / graphite surface — resting state. |
| `core.color.black.800` | `#232327` | Card / graphite surface — raised or hovered state. |
| `core.color.white.050` | `#F5F4F1` | Primary text — warm-tinted off-white. |
| `core.color.gray.400` | `#A8A8AD` | Secondary text. |
| `core.color.gray.600` | `#6E6E74` | Tertiary text / disabled-state text. |
| `core.color.gold.300` | `#E7D9B8` | Champagne — Secondary Accent. |
| `core.color.gold.500` | `#C9A24B` | Gold — Primary Accent. |
| `core.color.gold.600` | `#B8903D` | Gold, pressed/active step. |
| `core.color.gold.900` | `#6B5324` | Gold, deepest step — reserved for rare high-contrast-on-light contexts (print). |
| `core.color.emerald.500` | `#3E8C6E` | Success. |
| `core.color.emerald.700` | `#2C6B53` | Success, pressed/active step. |
| `core.color.crimson.400` | `#C97873` | Error — Text role. |
| `core.color.crimson.500` | `#A8443E` | Error — Accent role (icons, borders, low-opacity backgrounds). |
| `core.color.crimson.700` | `#7E332E` | Error, pressed/active step. |

Step count per hue family: black — 4 steps; white — 1 step; gray — 2 steps; gold — 4 steps; emerald — 2 steps; crimson — 3 steps.

### Semantic Tier — roles built on the Core scale

| Token | References | Role |
|---|---|---|
| `semantic.color.background.primary` | `black.950` | Page background. |
| `semantic.color.background.secondary` | `black.900` | Section-separating background. |
| `semantic.color.surface.card` | `black.850` | Card resting surface. |
| `semantic.color.surface.card-hover` | `black.800` | Card raised/hover surface. |
| `semantic.color.text.primary` | `white.050` | Primary reading text. |
| `semantic.color.text.secondary` | `gray.400` | Supporting text, captions, metadata. |
| `semantic.color.text.tertiary` | `gray.600` | Disabled or de-emphasized text. |
| `semantic.color.accent.primary` | `gold.500` | CTAs, key numerals, active/selected indicators. |
| `semantic.color.accent.secondary` | `gold.300` | Subheadline emphasis, decorative underlines, hover glows. |
| `semantic.color.accent.pressed` | `gold.600` | Pressed/active state of any Gold 500 element. |
| `semantic.color.text.success` | `emerald.500` | Success confirmation copy. |
| `semantic.color.text.error` | `crimson.400` | Error copy (text role). |
| `semantic.color.border.error` | `crimson.500` | Error borders, icon fills (accent role). |
| `semantic.color.focus.ring` | `gold.500` | Keyboard focus indicator. |
| `semantic.color.border.default` | `white.050` at **10% opacity** | Hairline card and panel borders. |

Component-tier color tokens are not pre-populated in the source — created only when a specific component chapter (not in this reading set) demonstrates need.

### Key color rules (not values, but must-follow logic)

- **Gold is two distinct semantic roles, never interchangeable** (C-2): Gold 500 = primary accent (CTAs, key numerals). Champagne (Gold 300) = secondary emphasis. Champagne is a **distinct Core value**, not an opacity transform of Gold 500.
- **State colors split Text-weight from Accent-weight** (C-4): a lighter step for running text (meets 4.5:1), a darker/"true" step for graphical accents like icons/borders (meets 3:1 only) — e.g., Crimson 400 = error text, Crimson 500 = error accent (borders/icons), never used as text.
- **Gold Budget ceiling: 10% of rendered viewport area** (C-5), measured by summed bounding area of every element using `accent.primary`/`accent.secondary` as fill/stroke/glow, divided by total viewport area. Text counts by rendered glyph area, not full bounding box. One explicit exception: the intro sequence's one-time metallic reflection sweep — never a precedent for anything else.
- Color tokens **do not vary by breakpoint** — same value at every viewport; gold *density* relative to the 10% budget should be re-checked per breakpoint since smaller viewports make a fixed-size gold element proportionally larger.

### Accessibility / contrast ratios (Chapter 3, Section 8 — verified against Core values)

| Pairing | Ratio | Verdict |
|---|---|---|
| `text.primary` (`white.050`) on `background.primary` (`black.950`) | **17.9 : 1** | Passes AAA |
| `text.secondary` (`gray.400`) on `background.primary` | **8.3 : 1** | Passes AAA |
| `accent.primary` (`gold.500`) on `background.primary` (numerals, icons) | **8.2 : 1** | Passes AAA |
| `text.success` (`emerald.500`) on `background.primary` | **4.85 : 1** | Passes AA (normal text); would need a lighter step for AAA if promoted to body copy |
| `text.error` (`crimson.400`) on `background.primary` | **6.0 : 1** | Passes AA comfortably; near but not AAA |
| `border.error` (`crimson.500`) on `background.primary`, as graphical element | **3.3 : 1** | Passes 3:1 graphical/UI threshold only — **fails** if used as text (this is exactly why C-4 splits the role) |

**Minimum contrast floor (system-wide):** 4.5:1 normal text, 3:1 large text (24px/18.66px-bold and above) and graphical/UI-component contrast, per WCAG 2.1 AA. AAA (7:1 / 4.5:1) preferred wherever achievable.

**Caveat explicitly flagged by source:** these ratios are verified only against solid Core-tier backgrounds — not yet verified against a glass/blurred surface (Chapter 10's translucent panels may have a different effective background).

---

## Typography System

Source: Chapter 4 — Typography System. Flagged **first-canonical-draft**.

### Typeface

- **Primary family:** **General Sans** — refined geometric grotesque, light-to-semibold optical range, used at every weight the system requires.
- **Fallback stack:** **Inter**, then the operating system's default UI sans-serif.
- **One family system-wide** — no serif, script, or secondary display face anywhere (exception considered only for code/tabular-numeral contexts, and even there the *family* must still be evaluated against this rule first).
- Numerals use the family's **tabular figure OpenType feature** wherever the proof-point numeral rule (below) applies.
- If General Sans fails to load, Inter substitutes automatically at **identical size/weight/line-height** — no separate fallback scale.

### The eight-step type scale

| Step | Desktop size | Mobile size | Weight | Line-height | Tracking |
|---|---|---|---|---|---|
| Display | 96px | 56px | 300 (Light) | 1.05 | 0 |
| H1 | 56px | 36px | 400 (Regular) | 1.10 | 0 |
| H2 | 36px | 28px | 500 (Medium) | 1.20 | 0 |
| H3 | 24px | 20px | 500 (Medium) | 1.30 | 0 |
| Body-Large | 20px | 18px | 400 (Regular) | 1.50 | 0 |
| Body | 17px | 16px | 400 (Regular) | 1.60 | 0 |
| Caption | 14px | 13px | 400 (Regular) | 1.50 | 0 |
| Label | 12px | 12px | 600 (Semibold), uppercase | 1.40 | +0.10em |

**Weight range in active use across the whole scale:** 300, 400, 500, 600 only (four of the family's available weights).

### Rules governing the scale

- **Max 4 of the 8 steps visible simultaneously per viewport** (Ty-1). Weight/color variants of the same size count as one step, not two.
- **Light-and-large is deliberate, never bold-and-large** (Ty-2): Display and H1 default to Light/Regular weight; bold is never paired with the two largest steps. H2 and below permit heavier weight (500–600) for emphasis.
- **Tracking widens only as size shrinks and case rises** (Ty-4): added tracking (+0.10em) applies only to Label/Caption steps and any all-caps rendering of another step. Display through Body carry **zero** added tracking.
- **Numerals-as-proof-points rule (Ty-5):** any numeral functioning as a result/metric/measurable claim is set **one scale step larger** than surrounding text, in `semantic.color.accent.primary` (gold), using **tabular figures** — never ordinary body-colored/body-sized text. Incidental numerals (page numbers, phone numbers, copyright years) stay untreated.

### Reading measure

- **Maximum reading measure: 68 characters (`ch` units)**, applied to Body and Body-Large text blocks (sits inside Master Vision's stated 60–75ch range, fixed at this specific value).

### Scale ratios (step-to-step, as stated in source)

Display→H1 ≈ 1.71 (96:56); H1→H2 ≈ 1.56 (56:36); H2→H3 = 1.5 (36:24); H3→Body-Large = 1.2 (24:20); Body-Large→Body ≈ 1.18 (20:17); Body→Caption ≈ 1.21 (17:14); Caption→Label ≈ 1.17 (14:12). Ratio compresses as size decreases (wider jumps at the display end, tighter toward the reading end) — this is stated as deliberate, not a flaw.

### Accessibility

- No Body or Body-Large text may be set **below 16px** on any viewport (the Mobile column above already enforces this as a floor).
- Line-height at Body/Body-Large (1.5–1.6) meets WCAG's minimum recommended spacing guidance.
- Color contrast for type inherits directly from the Color System section above (verified as a pair, not independently).

### Responsive

Tablet resolves to an **interpolated value** between the Desktop and Mobile columns above — the exact interpolation formula is owned by Chapter 8 (Responsive & Breakpoint System) but **no explicit interpolation formula/curve is given** in the chapters read; this is an open implementation detail (see Open Questions).

---

## Spacing System

Source: Chapter 5 — Spacing System. Flagged **first-canonical-draft**. Base unit: **4px**.

### Core scale — eleven steps

| Token | Value |
|---|---|
| `core.space.1` | 4px |
| `core.space.2` | 8px |
| `core.space.3` | 12px |
| `core.space.4` | 16px |
| `core.space.6` | 24px |
| `core.space.8` | 32px |
| `core.space.12` | 48px |
| `core.space.16` | 64px |
| `core.space.24` | 96px |
| `core.space.32` | 128px |
| `core.space.48` | 192px |

**Progression (step to step multiplier):** ×2 (4→8), ×1.5 (8→12), ×1.33 (12→16), ×1.5 (16→24), ×1.33 (24→32), ×1.5 (32→48), ×1.33 (48→64), ×1.5 (64→96), ×1.33 (96→128), ×1.5 (128→192) — alternates between 1.33 and 1.5, not a single constant ratio.

### Semantic roles

| Token | References | Use |
|---|---|---|
| `semantic.space.gap.icon-label` | `core.space.2` (8px) | Icon-to-adjacent-label gap. |
| `semantic.space.gap.related-items` | `core.space.4` (16px) | Between closely related inline elements. |
| `semantic.space.padding.component-sm` | `core.space.4` (16px) | Small component internal padding (badges, tags). |
| `semantic.space.padding.component-md` | `core.space.6` (24px) | Standard component internal padding (buttons, inputs). |
| `semantic.space.padding.component-lg` | `core.space.8` (32px) | Card internal padding. |
| `semantic.space.gap.stack` | `core.space.6` (24px) | Vertical rhythm between stacked elements within one component. |
| `semantic.space.gap.grid` | `core.space.8` (32px) | Between grid siblings (cards in a row); jointly owned with Grid System. |
| `semantic.space.padding.section-sm` | `core.space.16` (64px) | Minimum section padding (mobile). |
| `semantic.space.padding.section-lg` | `core.space.24` (96px) | Standard desktop section padding. |
| `semantic.space.padding.hero` | `core.space.32` (128px) | Hero-specific generous padding. |
| `semantic.space.margin.page-max` | `core.space.48` (192px) | Maximum single-purpose spacing reserve (rare, large breathing moments). |

### Rules

- **Sp-3 — Section padding is always ≥ one Core step larger than the component padding it contains.** Never equal, never reversed.
- **Sp-4 — Density modes shift the whole scale, never individual values.** A "compact" mode drops every relevant Semantic role one Core step lower, system-wide — never a one-off tightened value on a single component.
- **Semantic names describe the relationship, never the pixel count** (Sp-2) — e.g. `gap.related-items`, never `space-16`.

### Accessibility

- **Minimum gap between two independently tappable/interactive elements: 16px** (`gap.related-items`) — treated as an accessibility defect, not a density choice, if smaller.

### Responsive

Section padding examples given: `section-sm` (mobile) = 64px, `section-lg` (desktop) = 96px — same token name, different resolved value per breakpoint (breakpoint resolution mechanism owned by the Breakpoint chapter).

---

## Grid & Layout System

Source: Chapter 6 — Grid System, Chapter 7 — Layout System. Both flagged **first-canonical-draft**.

### Grid specification (Chapter 6)

- **Columns: 12**, asymmetric spans preferred by default over even divisions.
- **Content container max-width: 1280px.**
- **Canvas container: 100vw** (full viewport width), no maximum — used for full-bleed backgrounds/imagery; actual readable content inside a Canvas container still nests inside a Content container.
- **Desktop gutter:** `core.space.6` = **24px**. **Desktop outer margin:** `core.space.8` = **32px**.
- **Mobile gutter:** `core.space.4` = **16px**. **Mobile outer margin:** `core.space.4` = **16px**. (Gutter and margin converge to equal size on mobile.)
- **Preferred two-region spans (sum to 12):** 5/7, 7/5, 4/8, 8/4, 3/9, 9/3 — asymmetric.
- **Permitted symmetric spans:** 6/6 (two genuinely equal regions) and 4/4/4 (three genuinely equal regions) — only where symmetry itself is intentional (e.g., three pricing tiers before selection); even divisions require justification, not used as a default.
- **Gutter-to-margin ratio:** desktop 24:32 = 0.75; mobile 16:16 = 1.0.
- Reference column-width calculation at 1280px max-width, 12 columns, 24px gutters: **≈84.7px per column** (stated as a reference figure, not an exact implementation guarantee).
- Only **two** container width types exist system-wide (Content, Canvas) — no third/intermediate width is permitted; a perceived need for one signals a padding adjustment instead.

### Layout composition patterns (Chapter 7)

Exactly **five named section-level layout patterns**, closed set (a sixth requires justification against all five):

1. **Centered Statement** — single column, centered in Content container, generous vertical padding (`padding.hero` or `section-lg`). Used for brand-work moments (hero, closing manifesto statements).
2. **Split Narrative** — two-region asymmetric span (5/7 or 7/5), pairing reading content with a visual/metric/supporting element.
3. **Full-Bleed Canvas** — Canvas-container background (image/video/render) with a nested Content-container region for actual reading text.
4. **Structured Grid** — repeating grid of like items (cards/tiles) at a fixed column count per viewport; scannable/comparable content (Industries, Portfolio).
5. **Stacked Sequence** — vertical single-column arrangement of sequential steps, one per row; process/chronological content (How We Work, Timelines).

**Composition rules:**
- **No section shares the exact same alignment treatment as the section immediately before or after it** (La-2) — max 1 consecutive same-alignment section (i.e., never two in a row).
- **No more than 2 visually dense sections back-to-back without a quieter one between** (La-4), restating the P2 measurement above at layout scale.
- Pattern choice must follow the section's actual job (persuasive/emotional vs. informational) — never habit.
- **Centered Statement measure is constrained to the 68ch typography maximum** regardless of the section's own width.

**Suggested section→pattern mapping (source's own recommendation, explicitly non-binding — a future Homepage Blueprint chapter, not read in this pass, is authoritative if it diverges):** Hero → Centered Statement. Technology Stack → Structured Grid. Problems We Solve → Split Narrative. Solutions → Split Narrative. Industries → Structured Grid. How We Work → Stacked Sequence. Portfolio → Structured Grid. Case Studies → Full-Bleed Canvas or Split Narrative. Interactive Demo → Centered Statement (framed) or Split Narrative. Testimonials → Structured Grid or Centered Statement. Pricing → Structured Grid (three-up). FAQ → Centered Statement, narrow measure. Contact → Centered Statement.

### Responsive collapse per pattern (stated qualitatively, no exact breakpoint values given beyond the Breakpoint System's ranges)

Split Narrative stacks to single column (reading content first) on mobile; Structured Grid reduces column count; Full-Bleed Canvas keeps edge-to-edge but nested Content padding shifts to mobile spacing values; Stacked Sequence is largely unaffected (already single-column); Centered Statement narrows its measure proportionally.

---

## Breakpoint System

Source: Chapter 8 — Responsive & Breakpoint System. Flagged **first-canonical-draft**. Exactly **4 named ranges**, defined by width (not device category) — a resized desktop browser window can fall into the Mobile range.

| Range | Lower bound | Typical context |
|---|---|---|
| Mobile | 0px | Phones, portrait and landscape; thumb-driven, closest viewing distance. |
| Tablet | 600px | Tablets, unfolded foldables, small laptop windows; mixed touch/pointer. |
| Desktop | 1024px | Laptops and standard monitors; pointer/cursor precision available. |
| Wide | 1440px | Large/ultra-wide monitors; Content container still caps at 1280px regardless of further width. |

**What changes at each boundary:**
- **Mobile → Tablet:** grid spans may recombine (a stacked Split Narrative regains two columns); Structured Grid increases column count where content allows.
- **Tablet → Desktop:** type steps resolve to Desktop values; cursor-dependent interaction becomes available; spacing resolves to Desktop values.
- **Desktop → Wide:** Content container width caps at 1280px; no further type or spacing scale-up beyond this point — Wide adds surrounding space only, not a larger version of Desktop.

**Design process rule:** Mobile range must be verified complete and satisfying on its own terms *before* Tablet/Desktop/Wide are resolved (mobile-first as a design-priority instruction, not merely a CSS-authoring-order instruction).

**Device-agnosticism:** a foldable unfolded to 850px simply falls into the Tablet range — no fifth, device-specific breakpoint is created for new form factors; only a genuinely new *interaction mode* (not just a new width) would warrant a new range, and even that is flagged as an open question rather than resolved.

**Print and email are explicitly NOT breakpoint-driven** — governed by separate fixed-medium rules (Chapter 60, not read in this pass).

---

## Elevation & Shadow System

Source: Chapter 9 — Elevation & Shadow System. Flagged **first-canonical-draft**. Exactly **3 elevation steps** beyond flush (no shadow token exists for flush — flush elements use a hairline border color token instead, never a faint shadow).

| Token | Offset (y) | Blur | Color | Use |
|---|---|---|---|---|
| `core.shadow.resting` | 2px | 8px | `rgba(11, 11, 13, 0.35)` | Card, default state. |
| `core.shadow.raised` | 8px | 20px | `rgba(11, 11, 13, 0.45)` | Card hover/focus; button hover. |
| `core.shadow.lifted` | 20px | 48px | `rgba(11, 11, 13, 0.55)` | Dialogs, popovers, toasts, drawers. |

**Semantic roles:**

| Token | References |
|---|---|
| `semantic.elevation.card` | `core.shadow.resting` |
| `semantic.elevation.card-hover` | `core.shadow.raised` |
| `semantic.elevation.overlay` | `core.shadow.lifted` |

**Rules:**
- Shadow color is **always** a translucent version of `core.color.black.950` — the exact RGB of the primary background color (`#0B0B0D` → `rgba(11, 11, 13, …)`), never generic/pure black.
- **Blur and offset must scale together** — never move independently. Offset progression: 2px → 8px → 20px (×4, then ×2.5). Blur progression: 8px → 20px → 48px (×2.5, then ×2.4). Opacity progresses 0.35 → 0.45 → 0.55, tuned independently for legibility (not derived mathematically from offset/blur).
- Flush elements needing visible separation use `semantic.color.border.default` (from Color System) instead of any shadow.
- Elevation must always be paired with at least one other signal (border color shift, cursor change) — never the sole indicator of interactivity/state, since shadow differences can be hard to perceive for low-vision users.
- Transition timing between elevation steps: Chapter 15's "Quick" tier (exact ms value not captured — Chapter 15 not in reading set).

**Explicitly flagged limitation:** these values are specified against solid flat backgrounds only; appearance against a glass/blurred surface (Materials System) has not been verified.

---

## Materials System

Source: Chapter 10 — Materials: Metal, Glass & Surface System. Flagged **first-canonical-draft**.

### Blur scale — exactly 3 steps, each pre-assigned to one job (never a general-purpose intensity dial)

| Token | Value | Assigned job |
|---|---|---|
| `core.blur.subtle` | 8px | Sticky navigation over scrolling content. |
| `core.blur.moderate` | 16px | Rare, justified in-page glass panels (e.g. an in-context tooltip surface over dense content). |
| `core.blur.pronounced` | 32px | Modal/dialog backdrops. |

Progression: each step roughly doubles the previous (8 → 16 → 32px).

### Semantic glass surfaces

| Token | Composition |
|---|---|
| `semantic.surface.glass-nav` | `core.blur.subtle` (8px) + `core.color.black.900` at **72% opacity** + `semantic.color.border.default` |
| `semantic.surface.glass-backdrop` | `core.blur.pronounced` (32px) + `core.color.black.950` at **80% opacity** |

### Rules

- **Glass requires a named function, never decoration** (Ma-1) — must solve a specific, statable legibility/context problem (e.g., nav bar staying legible over scrolling content). A fixed-position element does not automatically qualify just by being fixed; only genuinely changing content behind it justifies glass.
- **Grain (film grain/noise texture on photography/render work) is a single fixed, system-wide intensity** — never tuned per-image. Applied only to photographic/rendered imagery, **never to UI surfaces** (buttons, cards, backgrounds do not carry grain). **The exact numeric grain intensity value is explicitly NOT specified** in the source — flagged there as "qualitative pending an actual production asset-pipeline decision," to be finalized once real photography/render output exists (see Open Questions).
- **Reflections/specular highlights require a named, stated light source** — no generic decorative sheen (e.g., no CSS gradient "shine" sweep on a button unless it has a stated light-source rationale). The intro sequence's one-time metallic reflection sweep is the system's one named, legitimate example.
- Text over any glass surface must be contrast-checked against the surface's **effective blended/rendered color** (base color × opacity), not the base color alone.
- Performance degradation path: on low-powered mobile devices, glass-nav may degrade to a solid `semantic.color.background.secondary` fill with no blur, rather than force a struggling blur effect.

---

## Iconography System

Source: Chapter 11 — Iconography System. Flagged **first-canonical-draft**. Source library: **none named** — the system draws its own icons to spec rather than importing a third-party set (explicitly warns against pulling unmodified icons from a general-purpose library, since stroke ratio/corner treatment would mismatch).

### Grid and sizing

- **Base grid:** 24×24px, with a **20×20px live area** (2px inset per side).
- **Size scale — 5 steps:** 16px, 20px, 24px, 32px, 48px.
- **Stroke ratio: 1:16 of icon size, held constant across all sizes** — 1px at 16px, 1.25px at 20px, **1.5px at 24px (base)**, 2px at 32px, 3px at 48px.
- Inset scales proportionally at other sizes to preserve the same relative live-area proportion (e.g. ~1.33px at 16px, ~4px at 48px).

### Style rules

- **Corner/cap treatment:** rounded caps and joins throughout — **never sharp miters** (Ic-2), with no exception.
- **Construction:** monoline (stroke-only, no filled shapes), single-color (no duotone/gradient fills), never illustrative/character-based — **no filled icons, no duotone, no mascots, no emoji** (Ic-4), no exception, including for "selected" states (selection is signaled by color only, never by switching to a filled variant).
- **Default color:** matches the adjacent text hierarchy — `semantic.color.text.primary` or `semantic.color.text.secondary`.
- **Active/highlighted color:** `semantic.color.accent.primary` (gold) — reserved strictly for genuine active/selected state, never decorative or "important-looking" defaults.
- **State-representing icons** (success/error) use the matching state color tokens (`semantic.color.text.success`, `semantic.color.border.error`) rather than the default/active rule above.

### Responsive

16px/20px are primary at Mobile/Tablet; 24px/32px primary at Desktop+. 48px reserved for rare, deliberately large icon moments (e.g., empty-state substitutes) at any breakpoint.

### Accessibility

Every icon used without accompanying visible text must carry a text-equivalent label for assistive technology. Icon color alone must never carry meaning (e.g., an error icon must differ in shape or be paired with text, not rely on color alone).

---

## Design Token Naming Convention

Source: Chapter 2 — Design Tokens Architecture, Section 4 (the authoritative naming spec), corroborated by usage throughout Chapters 3–11.

**Grammar:** `{tier}.{category}.{role}.{variant-or-state}` — exactly this segment order, **maximum 4 segments**, no segment skipped.

- **Tier:** one of `core`, `semantic`, or a component's own name (component-tier tokens are scoped by the component's own name rather than a literal word "component" — i.e. `button.primary.background`, not `component.button.primary.background`).
- **Category:** the value's domain — `color`, `space`, `radius`, `shadow`, `blur`, `opacity`, `type`, `motion-duration`, `motion-easing`, etc. — one category per Foundations chapter.
- **Role:** what the value is *for* (never what it looks like) — e.g. `accent`, `text`, `border`, `surface`, `focus`.
- **Variant-or-state:** narrows the role further — `primary`, `error`, `hover`, or a numeric Core step like `500`.

**Casing/implementation syntax (kebab-case vs. camelCase vs. dot-notation):** the Bible states this is explicitly deferred to a Naming Conventions chapter that was **not included** in this reading set — dot-notation as shown throughout (e.g. `semantic.color.accent.primary`) is the documentation convention used in the source text itself, not a declared final implementation syntax. **Treat actual code casing as an open implementation decision** (see Open Questions).

**Key naming rules:**
- Core tokens describe *appearance* by design (e.g. `core.color.gold.500`).
- Semantic tokens describe *role*, never appearance — a semantic token literally named after a color family (e.g. `semantic.color.red-text`) is treated as an anti-pattern ("Appearance-named semantics").
- A token's name never forks by breakpoint — one name, contextually resolved value.
- Every `motion-duration` token must be defined as a **paired** standard/reduced-motion value from creation.
- Every Semantic-tier color token intended for text-on-background use must carry its validated background token and resulting contrast ratio as part of its definition (this is why the Color System section's contrast table exists).

---

## Dark Mode / Theming (Chapter 52 — included because it governs whether any of the above ever needs a second value set)

- **There is no user-toggleable dark/light mode.** Dark (the Color System above) is the product's single, fixed, native visual identity — not a "default theme" with a light alternative. **Zero user-facing theme options.**
- A light-background variant is permitted **only** where a genuinely different *medium* requires it (print collateral, light-default email clients) — never as a user preference. As of the Bible's writing, **zero light-variant palettes are defined** anywhere in the source (Chapter 60, Print & Physical Collateral, was not part of this reading set and is where such values would eventually live).
- If a light variant is ever built, its colors must be **independently derived and contrast-verified against the light background** — never produced by mechanically inverting the dark palette's hex values (a naive inversion is explicitly named as likely to silently fail contrast).
- Accessibility needs around light sensitivity/low vision are intentionally routed to **browser/OS-level accommodations** (forced-colors mode, OS-level inversion), not a product-level toggle.

**Implication for engineering:** build exactly one CSS theme (the dark palette in the Color System section). Do not scaffold a `prefers-color-scheme: light` override or a theme-switcher component for the marketing site — the source explicitly forbids it as a default pattern to avoid.

---

## Open Questions / Ambiguities

Values and decisions the source leaves conceptual, deferred to un-read chapters, or explicitly flagged as unverified. A builder must judgment-call these rather than infer a number that isn't in the source:

1. **Motion durations and easing curves.** Chapter 1 confirms exactly 5 named tiers (Instant, Quick, Standard, Deliberate, Ceremonial) and several component chapters reference "Quick tier" or "Standard tier" transitions, but the actual millisecond/easing-curve values live in Chapter 15 (Motion & Timing System), which was **not** in the requested reading list. Do not invent ms values — pull from Chapter 15 before implementing any transition timing.
2. **Radius scale (border-radius).** Chapter 2 lists `radius` as one of the 10 required Core token categories (owned jointly by Chapters 6/7), but no radius chapter or radius value table was in the reading set, and the source's own README explicitly flags "the piecemeal Radius scale populated across Chapters 18, 19, and 27" as unresolved/inconsistent design debt. **No radius values are specified anywhere in the read chapters.** Treat as fully open.
3. **Token casing convention for code (kebab-case vs. camelCase vs. CSS custom-property syntax).** The dot-notation shown throughout (`semantic.color.accent.primary`) is documentation notation only; actual implementation casing is explicitly deferred to a Naming Conventions chapter not included here.
4. **Tablet type-scale interpolation formula.** Chapter 4 states Tablet resolves to "an interpolated value" between the Mobile and Desktop columns of the type scale, owned by Chapter 8, but Chapter 8 (as read) gives breakpoint ranges and qualitative behavior only — no explicit interpolation formula (linear? clamp()? fixed midpoint?) is given anywhere in the read chapters.
5. **Grain intensity (Materials System).** Explicitly stated as qualitative/unspecified pending a real production asset pipeline — no numeric opacity or intensity value exists in the source.
6. **Component-tier token values.** By design, Chapter 3 (Color) and other Foundations chapters do not pre-populate Component-tier tokens (e.g., a specific `button.primary.background` hex) — those are created only inside individual Volume II component chapters (Buttons, Cards, etc.), none of which were in the requested reading set.
7. **Exact reduced-motion value pairing.** Chapter 2 mandates that every motion-duration token be defined as a standard/reduced-motion pair, but the actual reduced-motion values are, again, Chapter 15's responsibility (not read).
8. **Light-variant/print palette values.** Chapter 52 confirms zero light-variant palettes exist yet; Chapter 60 (Print & Physical Collateral), which would define them, was not read.
9. **Contrast verification of colors against blurred/glass surfaces.** Chapter 3 explicitly flags its own contrast table as verified only against solid backgrounds, not yet re-verified against Chapter 10's translucent glass surfaces — a builder implementing text over `glass-nav` or `glass-backdrop` should re-verify contrast against the actual blended/rendered color rather than assume the solid-background ratios hold.
10. **All chapters read carry the source's own "first-canonical-draft" flag** — meaning every numeric value above is the system's first decisive proposal, not a battle-tested final spec. This is stated by the source itself, not a caveat this synthesis is adding independently.
