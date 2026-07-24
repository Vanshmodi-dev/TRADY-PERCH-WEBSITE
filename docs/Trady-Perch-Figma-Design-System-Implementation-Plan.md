# TRADY PERCH FIGMA DESIGN SYSTEM
## Implementation Plan — Version 1.0

**This is the execution plan, not the system itself.** Every token, component, and template named below is a construction target — what gets built, in what order, by whom, checked against what — not the finished design work. No screen is designed in this document. No mockup exists here. What exists here is the sequence of decisions that must be made correctly, once, so that every future screen Trady Perch ever ships in Figma is assembled from a governed system instead of invented fresh.

> This plan answers to eight documents, in order: the Master Vision Document, the Design System Bible, the Motion Bible, the UX / Experience Blueprint, the Brand Identity Manual, the Product Implementation Constitution (Trady Perch's Engineering Constitution), and the AI Constitution. Where this plan is silent, those documents govern. Where this plan appears to conflict with any of them, this plan is wrong and must be corrected — a Figma file has no authority to originate a design decision the Design System Bible has not already made; its only job is to make that decision buildable, reusable, and consumable by engineering. Practically, this means: the Design System Bible's 74 chapters (Volumes I–VII) are the content this plan turns into Figma Variables, Styles, and Components; the Motion Bible's 116 chapters are the content this plan turns into prototype specifications; the UX / Experience Blueprint's 130 chapters are the content this plan turns into page templates and interaction patterns; the Brand Identity Manual governs every name, wordmark, and voice sample that appears inside the file; the Product Implementation Constitution is the document this plan's Section 9 (Engineering Handoff) exists to stay in permanent lockstep with; and the AI Constitution governs the behavior of every AI conversation pattern this plan's Section 5 turns into a reusable template.

### How to Read This Plan

Ten sections, each answering one operational question in the order a design system actually gets built: where things live (1), what the raw materials are (2), what gets built and in what sequence (3), how it moves (4), how it becomes real product experience (5), how it explains itself (6), how it stays correct over time (7), how it becomes real screens (8), how engineering receives it (9), and on what calendar all of the above actually happens (10). Sections 1–2 must be substantially complete before Section 3 begins in earnest; Sections 4–6 run in parallel with Section 3, attached to each component as it is built, not bolted on afterward; Sections 7–9 are standing operational disciplines that start on day one and never end. Section 10 is the single source of truth for sequencing all of it.

---

## SECTION 1 — FILE ARCHITECTURE

### 1.1 Workspace Structure

One Figma **Team**: `Trady Perch`. Inside it, four **Projects**, each a folder-level separation of concern that maps to a different publishing cadence and a different audience:

| Project | Contains | Who Publishes Into It | Who Consumes From It |
|---|---|---|---|
| **00 · System** | Foundations file, Component Library file, Icon Library file, Motion & Prototyping file | Design Systems team only | Every other project |
| **01 · Patterns & Templates** | UX pattern library, page template library | Design Systems team + senior product designers (via review) | Product design teams |
| **02 · Product** | One file per shipped or in-development product surface (Marketing Site, Client Dashboard, Mobile App, Admin Panel, AI Assistant Product, future surfaces as they're greenlit) | Product design teams | Engineering, stakeholders |
| **03 · Archive & Sandbox** | Deprecated file versions, exploratory work not yet ready for review | Anyone | No one — nothing here is ever linked as a library |

This four-project split exists for one reason: **a file's location tells you its authority level before you open it.** A designer opening a file in `00 · System` knows changes there ripple outward to every product; a file in `02 · Product` is a leaf node — nothing consumes from it, so mistakes stay contained. Trady Perch's restraint-first bias (Master Vision §3.1) argues against a deeper folder hierarchy than this: four projects are enough to separate authority levels without requiring anyone to remember which of fifteen nested folders a given file lives in.

### 1.2 The File List

Eight files at launch, each with a single, non-overlapping responsibility. A ninth (Voice/Spatial) is named but deliberately left unopened until Motion Bible Part XI and UX Blueprint Part XIV's emerging-platform chapters have a real product to attach to.

1. **`TP · Foundations`** (`00 · System`) — every token: color, typography, spacing, radius, elevation, opacity, border, grid, breakpoint, and theme Variable. No components live here. This is the file every other file in the workspace links to as a library.
2. **`TP · Icon Library`** (`00 · System`) — the full icon set as components, one per icon, governed separately from Section 1.4's component-file page structure because icon addition/versioning happens on its own cadence (DSB Ch. 11, Iconography System).
3. **`TP · Component Library`** (`00 · System`) — every reusable UI component from DSB Volume II (Ch. 18–38), built as documented, variant-complete, accessibility-checked components. The largest, most heavily governed file in the workspace.
4. **`TP · Motion & Prototyping`** (`00 · System`) — the canonical interactive-prototype demonstration of every component's motion behavior (Section 4). Exists separately from the Component Library file so prototype experimentation never risks the published component source.
5. **`TP · Patterns & Templates`** (`01 · Patterns & Templates`) — reusable UX patterns and full-page templates (Section 5): navigation systems, form flows, dashboard layouts, AI conversation surfaces, onboarding flows.
6. **`TP · Marketing & Website`** (`02 · Product`) — landing pages, the marketing site, campaign pages.
7. **`TP · Client Dashboard & Enterprise`** (`02 · Product`) — the client-facing dashboard, admin panels, enterprise/B2B surfaces (UX Blueprint Part IX).
8. **`TP · AI Product Surfaces`** (`02 · Product`) — every AI-mediated conversational and agentic interface (UX Blueprint Part VIII; AI Constitution Part VIII and Part X).

A **`TP · Mobile App`** file is added to `02 · Product` the moment a mobile product is greenlit, consuming the same Foundations, Icon, and Component libraries — it is not built in advance of a real mobile roadmap commitment, per the same restraint principle that keeps the folder structure flat.

### 1.3 Library Publishing Boundaries

Only three files are ever published as **Team Libraries**: `TP · Foundations`, `TP · Icon Library`, and `TP · Component Library`. `TP · Patterns & Templates` is published as a fourth library once Section 3's component library reaches sufficient coverage that templates stop needing placeholder components (Milestone 4 gate, Section 10). No file in `02 · Product` is ever published as a library — a product file's job is to *consume*, never to *originate*. If a pattern recurs three or more times across product files, it is a candidate for promotion into `TP · Patterns & Templates` via the contribution process in Section 7.4, not a candidate for being copy-pasted a fourth time.

### 1.4 Page Hierarchy

**Foundations file** pages, in fixed order: `Cover & Changelog` → `Color` → `Typography` → `Spacing & Layout` → `Radius & Borders` → `Elevation & Opacity` → `Grid & Breakpoints` → `Theme Variables (Light/Dark)`. Each page contains both the Variable/Style definitions and a documentation frame explaining the token's semantic intent, per Section 2.

**Component Library file** pages mirror DSB Volume II's own chapter order exactly, so a designer who knows the Bible's structure already knows the file's structure — no separate mental model required:

`Cover & Changelog` → `Buttons & Actions` → `Cards & Containers` → `Navigation Systems` → `Forms & Inputs` → `Tables & Data Grids` → `Dialogs & Modals` → `Drawers & Sheets` → `Toasts & Notifications` → `Dropdowns, Menus & Popovers` → `Tabs & Segmented Controls` → `Breadcrumbs & Wayfinding` → `Search Interfaces` → `Tooltips & Contextual Help` → `Skeleton Loaders & Loading Patterns` → `Charts & Data Visualization` → `Badges, Tags & Status Indicators` → `Avatars & Identity Elements` → `Pagination & Disclosure Controls` → `Timelines & Steppers` → `Accordions & Expandable Content` → `Empty States & Zero-Data Design`.

Each component page follows an identical internal frame layout, left to right: **Documentation** (Section 6's fixed template) → **Component Source** (the master components, never touched outside a review branch) → **Playground** (a disposable exploration area for testing variant combinations, cleared before each publish).

**Patterns & Templates file** pages: `Cover & Changelog` → `Navigation Systems` → `Page Templates (Marketing)` → `Page Templates (Dashboard)` → `Form Patterns` → `Onboarding Patterns` → `AI Conversation Patterns` → `Decision & Confirmation Patterns`.

**Product files** (Marketing, Dashboard, AI Product, future Mobile) each follow: `Cover & Status` → `Screens — In Progress` → `Screens — Ready for Dev` → `Screens — Shipped` → `Archive`. The three-stage status split exists so engineering (Section 9) always knows, without asking, which frames are stable enough to build against.

### 1.5 Naming Conventions

Naming follows the Design System Bible's Ch. 63 (Naming Conventions) discipline exactly, extended here to Figma-specific objects, and kept in exact lockstep with the Product Implementation Constitution's Ch. 9 (Naming Conventions — Code, Files, Branches, Commits) so a name never has to be translated between design and code — it is the same string in both places.

- **Files:** `TP · [Purpose]`, title case, en-dash-free, using the middle-dot separator shown above consistently so files sort predictably in Figma's file browser.
- **Pages:** Title Case, matching DSB chapter titles verbatim where a page corresponds to one.
- **Component names:** `Category/Component/Variant`, e.g. `Button/Primary`, `Card/Elevated`, `Nav/Sidebar/Desktop`. Slash-nesting is mandatory — it is what populates Figma's component picker with a browsable tree instead of a flat, unsearchable list once the library exceeds roughly 40 components.
- **Variant properties:** lower-kebab-case values, sentence-case property names — `Size: sm / md / lg`, `State: default / hover / focus / active / disabled / loading / error`, `Emphasis: primary / secondary / tertiary / ghost / destructive`. Property names and value sets are fixed once per component category (Section 3.3) and never reinvented per component.
- **Variables:** `category/tier/token-name`, all lowercase, hyphen-separated — `color/core/neutral-900`, `color/semantic/text-primary`, `color/semantic/bg-surface-default`, `spacing/scale/4`, `radius/scale/sm`, `elevation/shadow/level-2`. This exact string, minus the leading category grouping Figma requires for its own UI, is the string that appears in the exported design-token JSON Section 9.1 hands to engineering — there is no separate "designer name" and "engineer name."
- **Layers inside a component:** semantic, not visual — `icon-leading`, `label`, `helper-text`, never `Rectangle 14` or `Group 3`. A layer name that describes what a layer *looks like* rather than what it *is* is treated as a publish-blocking QA finding (Section 7.5).

### 1.6 Branching & Version Control

Every change to `TP · Foundations`, `TP · Icon Library`, or `TP · Component Library` happens on a **Figma branch**, never directly on the file's main. A branch is named `[initials]/[change-type]-[short-description]`, e.g. `jr/add-tooltip-variants`, `jr/fix-button-focus-ring`. Branch review follows Section 7.2's workflow before merge. Product files (`02 · Product`) do not use branches for day-to-day screen work — the cost of branch overhead outweighs its benefit at the leaf-node level where nothing downstream consumes the file — but do use a branch for any structural change to a shipped-status screen already referenced by an active engineering ticket.

### 1.7 Versioning

Each of the three library files carries an independent **semantic version** (`MAJOR.MINOR.PATCH`), recorded on its `Cover & Changelog` page and mirrored in Figma's native version history via a named pinned version at every publish. The scheme, held to the same discipline the Design System Bible's Ch. 64 (Versioning & Release Philosophy) and the Product Implementation Constitution's Ch. 58 (Release & Versioning Standard) already require of the documentation and the code:

- **PATCH** — a visual correction with no effect on any published API surface (a Variable value tweak, a typo fix in documentation, a corrected layer name).
- **MINOR** — a net-additive change: a new component, a new variant on an existing component, a new token. Always backward-compatible; nothing that already consumes the library breaks.
- **MAJOR** — a breaking change: a renamed or removed Variable, component, or variant; a restructured property set. Requires the deprecation runway defined in Section 7.5 before it ships, and requires every consuming product file to be migrated within a stated window.

### 1.8 Publishing Workflow

The fixed sequence every library change passes through, elaborated fully in Section 7.2, stated once here as the file-level mechanic it depends on: **branch → build on Playground → self-QA against Section 6's documentation checklist and Section 7.5's quality gate → design review → publish with changelog entry and version bump → Slack/notification broadcast to consuming teams.** No change reaches a consuming product file through any path that skips this sequence — there is no "quick local override," because a local override is precisely how a system with one source of truth becomes a system with several silently diverging ones.

---

## SECTION 2 — FOUNDATION SYSTEM

### 2.1 Method: Figma Variables as the Single Source of Truth

Every foundational value in this system is a **Figma Variable**, organized into **Variable Collections** that mirror the Design System Bible Ch. 2's three-tier token architecture exactly: **Core** (raw values, no semantic meaning) → **Semantic** (purpose-bound aliases that reference Core) → **Component** (component-specific aliases that reference Semantic, only created where a component's need is genuinely narrower than any existing Semantic token). A component's properties are never bound directly to a Core token — that binding is the single most common cause of a design system silently losing its dark-mode and theming coherence, and is treated as a publish-blocking finding in Section 7.5's quality gate.

Four Variable Collections, matching the Foundations file's page structure:

1. **`Core`** — raw color ramps, the raw type scale, the raw spacing scale, raw radius values. No modes; these values do not change between light and dark.
2. **`Semantic — Color`** — purpose-bound color aliases (`text-primary`, `bg-surface-default`, `border-focus`, `icon-danger`). **One mode: Dark.** *[Corrected v1.1 — see Erratum below.]* DSB Ch. 52 (Dm-1) forecloses a user-toggleable Light mode outright; this collection carries a single mode, not two, and there is no in-file mode switcher to toggle. Where a light-background treatment is genuinely needed for a different medium (print, Ch. 60), it is built as a separately named, independently-derived variant per Dm-2/Dm-3 — never as a second mode of this collection.
3. **`Semantic — Layout`** — spacing scale aliases bound to use (`gap-component-internal`, `gap-section`), radius aliases (`radius-interactive`, `radius-container`), elevation aliases (`elevation-resting`, `elevation-raised`, `elevation-overlay`). No modes.
4. **`Breakpoint & Grid`** — the responsive breakpoint values and per-breakpoint grid specification (column count, gutter, margin), stored as Variables so a template's grid reference updates automatically if a breakpoint value is ever revised. No modes.

### 2.2 Color Tokens

**Core tier:** full ramps (typically 10–12 steps, e.g. `50` through `950`) for every hue the Design System Bible Ch. 3 defines — neutral, brand primary, brand accent, and each semantic-support hue (success, warning, danger, info). Named `color/core/[hue]-[step]`.

**Semantic tier**, one mode (Dark — see 2.1's correction), organized by *purpose* rather than by hue so a designer applying a token never has to know or choose which literal color it resolves to:

- Text: `text-primary`, `text-secondary`, `text-tertiary`, `text-disabled`, `text-on-brand`, `text-danger`, `text-success`.
- Background/Surface: `bg-canvas`, `bg-surface-default`, `bg-surface-raised`, `bg-surface-overlay`, `bg-surface-sunken`.
- Border: `border-default`, `border-subtle`, `border-focus`, `border-danger`.
- Icon: `icon-primary`, `icon-secondary`, `icon-on-brand`, `icon-danger`, `icon-success`.
- Interactive: `interactive-primary-default/hover/active/disabled`, `interactive-secondary-default/hover/active/disabled` — one alias per state named in DSB Ch. 39's Complete State Model, so a component's state variant (Section 3.3) never hand-picks a color; it binds to the state-matched semantic token.

**Component tier**, created only on demonstrated need — e.g. `button-primary-bg` is *not* created if it would simply equal `interactive-primary-default`; it is created only where a specific component's requirement genuinely diverges (a chart's data-series colors, which need a longer, order-sensitive palette no generic semantic token set can express).

### 2.3 Typography Tokens

The full type scale from DSB Ch. 4, implemented as Figma **Text Styles** bound to Variables for every numeric property (size, line-height, letter-spacing, weight) so a scale-wide adjustment is a single-source edit. Naming: `type/[role]/[size]` — `type/heading/xl`, `type/body/md`, `type/label/sm`, `type/mono/md`. Each style's documentation frame states its intended use (per DSB Ch. 4's optical-sizing and family-pairing rules) and its minimum permitted size per platform (mobile floor per DSB Ch. 49). Responsive type — where a heading's size genuinely changes across breakpoints rather than merely reflowing — is handled as parallel styles (`type/heading/xl` and `type/heading/xl-mobile`) rather than attempting a single fluid-type Variable Figma cannot yet natively express with full fidelity; the two-style pattern is documented explicitly so it is applied consistently rather than improvised per component.

### 2.4 Spacing, Radius, Elevation, Opacity, Borders

**Spacing:** a single Core numeric scale (DSB Ch. 5), named `spacing/scale/[step]` (e.g., `2, 4, 8, 12, 16, 24, 32, 48, 64`), aliased at the Semantic — Layout tier into use-bound names (`gap-icon-label`, `gap-form-field`, `padding-card-default`, `padding-button-md`) so Auto Layout properties (Section 3.4) always bind to intent, never to a raw number.

**Radius:** a small, closed Core scale (`radius/scale/none`, `xs`, `sm`, `md`, `lg`, `full`), aliased at Semantic — Layout into `radius-interactive` (buttons, inputs), `radius-container` (cards, dialogs), and `radius-avatar` (`full`, fixed).

**Elevation:** Figma Effect Styles bound to Variables per DSB Ch. 9, a small closed set — `elevation/shadow/level-0` (flat) through `level-4` (modal/overlay) — each a specific blur/spread/offset/opacity combination, never freely adjusted per component; a component needing a shadow references a level, not a custom effect.

**Opacity:** a small Core scale for non-color opacity use (`opacity/scale/disabled` = 0.4, `opacity/scale/hover-overlay` = 0.08, `opacity/scale/scrim` = 0.6), preventing the common drift where "disabled" ends up at a different opacity on three different components because no one checked.

**Borders:** width tokens (`border/width/default` = 1px, `border/width/emphasis` = 2px) and the semantic color tokens from 2.2 — a border is always a width token plus a semantic color token, never a hand-set stroke.

### 2.5 Grid & Responsive Breakpoints

Breakpoint values (DSB Ch. 8) stored as Variables in the `Breakpoint & Grid` collection: `breakpoint/mobile` (0–599), `breakpoint/tablet` (600–1023), `breakpoint/desktop` (1024–1439), `breakpoint/wide` (1440+). Each breakpoint has a paired grid specification stored alongside it — column count, gutter width (bound to a spacing token), and margin (bound to a spacing token) — implemented as Figma Layout Grid styles named `grid/[breakpoint]`, applied to every template frame (Section 5) as its base structural reference rather than redrawn per screen.

### 2.6 Theme Variables: The Single Dark Identity

*[Corrected v1.1 — this section originally described a Light/Dark mode switcher. That description contradicted DSB Ch. 52 (Dm-1), which forecloses a user-toggleable theme for this brand outright, and is corrected here rather than left standing. See the Erratum at the end of this document for the full record of the conflict and its resolution.]*

Dark is not a default this system happens to ship with — it is the **Semantic — Color** collection's only mode, per 2.1, and the brand's one native visual identity (DSB Ch. 52, Dm-1). Every component is built once, bound entirely to Semantic tokens, and verified in that single mode — there is no second mode to toggle to, and no file-level mode switcher is wired to anything. DSB Ch. 52's theming architecture is honored structurally by this rule: **no component layer is ever bound to a Core-tier color token.** A component whose Core-tier binding is later exposed by a Core-value refresh is, by definition, a component that violated this rule, and is a publish-blocking finding (Section 7.5) rather than a "known issue." A genuinely medium-driven light variant (print, Ch. 60) is built per Dm-2/Dm-3 as an independently-derived, separately named variant — never as a mode of this file.

### 2.7 Layout Variables

Beyond spacing and grid, a small set of layout-behavior Variables governs cross-component consistency: `layout/max-width/content` (the marketing site's reading-width ceiling), `layout/max-width/dashboard` (the wider ceiling UX Blueprint Ch. 78's data-dense doctrine permits), `layout/sidebar/width-expanded` and `width-collapsed` (bound so every surface using the dashboard's side navigation stays pixel-identical). These live in the `Semantic — Layout` collection alongside spacing and radius, since they are use-bound aliases in the same sense.

---

## SECTION 3 — COMPONENT STRATEGY

### 3.1 Atomic Levels

Four levels, named to avoid the common confusion of importing "atomic design" vocabulary wholesale when Trady Perch's actual system only needs a working subset of it:

- **Primitives** — cannot be decomposed further without losing meaning: icons, a single Avatar, a Badge, a Spinner, a raw Button. Built directly from Section 2's tokens.
- **Components** — a primitive or small group of primitives assembled into a reusable interactive unit with its own variant/property set: a Form Field (label + input primitive + helper text), a Card, a Tab set, a Dialog shell.
- **Patterns** — several components assembled into a recurring, named UX solution that still isn't a full page: a Data Table (Table component + Pagination + Search + empty state), a Comment Thread, an AI Message Exchange. Live in `TP · Patterns & Templates` (Section 5), not the Component Library file.
- **Templates** — a full page skeleton with real structural regions (header, nav, content, footer) populated with patterns and components, ready to be duplicated into a product file and filled with real content. Also live in `TP · Patterns & Templates`.

Screens (Section 8) are one level above Templates and are explicitly **not** part of the library — they are what a product file produces by consuming everything below this line.

### 3.2 Build Order & Dependency Chain

Components are not built in the Design System Bible's topical chapter order (Ch. 18–38) — that order is optimized for a reader learning the system, not for a team building it without forward references to components that don't exist yet. The actual build order follows genuine dependency: a component is scheduled only after every component it visually or structurally contains already exists as a published primitive or component.

**Wave 1 — Primitives with no component dependencies** (buildable the day Section 2 publishes): Icon set (already its own file, Section 1.2) → Spinner/Loading primitive → Avatar → Badge/Tag → Divider → Button (all emphasis/size variants) → Link (text-based action).

**Wave 2 — Components built from Wave 1 primitives:** Form Field primitives (Text Input, Select, Checkbox, Radio, Switch, Textarea — each pairs a native Figma shape with the Label + Helper Text + Icon primitives from Wave 1) → Tooltip (depends on Badge-adjacent positioning logic and the Elevation tokens) → Card (depends on Button, Badge, Avatar as slotted content) → Skeleton Loader (depends on the Card and Form Field shapes it stands in for).

**Wave 3 — Components built from Wave 2:** Navigation Systems (Top Nav, Side Nav, Mobile Nav — depend on Button, Avatar, Icon, Badge for notification counts) → Tabs & Segmented Controls (depend on Button-adjacent interaction states) → Breadcrumbs (depends on Link) → Dropdowns, Menus & Popovers (depend on Card's elevation treatment and Icon) → Search Interfaces (depends on Text Input, Icon, and — once it exists — Dropdown for suggestions).

**Wave 4 — Compound and overlay components, built from Waves 1–3:** Dialogs & Modals (depend on Card, Button, Icon, and the Elevation overlay token) → Drawers & Sheets (depend on the same set as Dialogs, plus Navigation for in-drawer nav cases) → Toasts & Notifications (depend on Badge, Icon, and Button for inline actions) → Accordions & Expandable Content (depend on Icon for the disclosure chevron).

**Wave 5 — Data-dense components, the highest-dependency tier:** Tables & Data Grids (depend on Checkbox, Badge, Avatar, Dropdown-as-cell-menu, Pagination, and Empty State) → Pagination & Disclosure Controls → Charts & Data Visualization (depend on the color system's data-series component tokens from 2.2, plus Tooltip) → Timelines & Steppers (depend on Badge and Icon for status marking) → Empty States & Zero-Data Design (deliberately built last among Wave 5 components even though referenced by several of them earlier — it is stubbed with a placeholder during Waves 3–4 and formally completed once every context that needs a specific empty-state illustration is known).

This five-wave sequence is the literal input to Milestone 3 of the roadmap (Section 10.3); each wave is a sprint-sized batch of parallelizable work, and no component in a later wave is scheduled to start until its Wave-N dependencies are published, not merely drafted.

### 3.3 Variants & Properties Standard

Every component in the library uses Figma's native Variant property system, never boolean show/hide layer stacks standing in for variants, and never separate un-linked components standing in for what should be one component's states. Four property categories, applied consistently by name across every component that needs them (a size property is never called `Scale` on one component and `Size` on another):

- **`Size`** — `sm / md / lg`, and `xl` only where a specific component (e.g., Avatar) genuinely needs a fourth step.
- **`State`** — the eight canonical states from DSB Ch. 39's Complete State Model, applied to every interactive component without exception: `default / hover / focus / active / disabled / loading / error / success`. A component that skips a state variant because "it probably won't need it" is a Section 7.5 quality-gate finding — the state is added as an empty/placeholder variant even before its final visual treatment is resolved, so nothing downstream ever has to invent an ad hoc disabled or error treatment on the fly.
- **`Emphasis`** — `primary / secondary / tertiary / ghost / destructive`, applied to Button and any component that inherits Button's action semantics (icon buttons, in-card actions).
- **Boolean properties** for optional slotted content — `Has Icon Leading`, `Has Icon Trailing`, `Has Badge` — rather than separate variants, since a boolean is the correct Figma primitive for "present or absent," reserving true Variant properties for "one of several mutually exclusive forms."
- **Instance-swap properties** for genuinely swappable child content — the icon slot inside a Button, the avatar slot inside a Nav bar — bound to the Icon Library and Avatar component sets respectively, so a consumer changes the icon without detaching the instance.

### 3.4 Auto Layout Standards

Every component and pattern is built with Auto Layout — no absolute-positioned layer is permitted in a published component, since an absolutely positioned layer cannot respond to content-length changes or the responsive reflow Section 3.5 requires. Fixed conventions:

- Padding and gap values are always bound to a Semantic — Layout spacing token (2.4), never a hand-typed number.
- Resizing is `Hug` for components whose size should track content (Buttons, Badges, Tags) and `Fill` for components that should track their parent container (Cards inside a grid, Table cells, Form Fields inside a form).
- Nesting depth is capped at four Auto Layout frames per component before a documentation note is required explaining why — deep nesting is usually a sign the component should be decomposed into a smaller reusable piece per 3.1's level split.
- Every component's root frame has a fixed minimum width/height set from its smallest reasonable content case, preventing the common Auto Layout failure of a component collapsing to zero-width when handed empty or very short content.

### 3.5 Responsive Behavior

Two responsive mechanisms, applied by category rather than improvised per component:

- **Token-driven reflow** — most components (Buttons, Form Fields, Cards, Badges) do not structurally change across breakpoints; they simply inherit whatever spacing and type tokens the surrounding template swaps at each breakpoint (2.3, 2.5). No separate mobile variant is built for these.
- **Structural breakpoint variants** — components whose actual layout, not just spacing, must change (Navigation, Tables, Dialogs-becoming-Sheets on mobile) are built as explicit, separate top-level components — `Nav/Desktop` and `Nav/Mobile` are two components, not one component with an unreasonably complex variant matrix — but both are required to bind to the identical Semantic token set, so they read as the same system at two structural resolutions rather than two different systems that happen to share a name.

### 3.6 Accessibility Considerations

Accessibility is built into the component at construction time, not audited in afterward, operationalizing DSB Ch. 53 (Accessibility Standards, Deep Specification) and Ch. 42 (Keyboard Interaction Standards) at the component-authoring level:

- Every Semantic — Color text/background pairing used in a component is contrast-checked against WCAG AA at token-definition time (Section 2.2), so a component built entirely from Semantic tokens inherits a passing contrast ratio by construction rather than by luck.
- Every interactive component's `focus` state variant (3.3) uses the dedicated `border-focus` token and is never omitted, hidden, or styled identically to `default` — a missing or indistinguishable focus state is a publish-blocking finding.
- Minimum interactive target size is enforced at the component's minimum-size constraint (3.4): 44×44px for any tap/click target, regardless of how small its visible icon or label is, per DSB Ch. 49's mobile standards extended to all pointer input.
- Every component carrying non-decorative meaning through color alone (a status Badge, a chart data series) pairs that color with a redundant non-color signal — an icon, a label, a pattern — documented explicitly on the component's documentation page (Section 6) rather than left to a downstream designer to remember to add.
- Components are named and structured so that Figma's Dev Mode annotation layer (Section 9.4) can carry the correct ARIA role and keyboard-interaction spec without requiring a separate, hand-maintained accessibility document that can drift out of sync with the component itself.

---

## SECTION 4 — MOTION INTEGRATION

### 4.1 What Figma Can and Cannot Honestly Represent

Stated plainly before anything else in this section, in the same honest-limitation spirit the AI Constitution requires of every AI system it governs: Figma's native prototyping (Smart Animate, interactive component variant transitions) can faithfully represent the Motion Bible's **timing, easing, and state-to-state choreography** — Parts II, III, IV, V, and VI. It **cannot** natively represent true physics-based motion, character-by-character streaming text, particle systems, or multi-agent choreography — Motion Bible Ch. 15 (Velocity, Acceleration & Deceleration Physics), Part VII's Brand Cinematics, and most of Part X's AI Motion chapters. For that second category, Figma's role is downgraded deliberately, by design, to **storyboard and specification**, and a separate high-fidelity tool (After Effects or Lottie for brand cinematics; a coded prototype for streaming/agentic motion) is the actual source of truth engineering builds against. This plan names that boundary explicitly so no one downstream mistakes a Figma prototype's approximation of AI thinking-state motion for the real specification.

### 4.2 Motion Tokens in Figma

Every duration and easing value from Motion Bible Ch. 8–14 (Motion Token Architecture, Duration Tokens, Easing Curve Library) is entered into Figma's prototype settings as **named, reused presets** — never a one-off hand-picked duration on a single interaction. Figma's Smart Animate easing picker's custom bezier field is set to the Motion Bible's exact published curve values for each named curve (`ease-standard`, `ease-emphasized`, `ease-decelerate`, `ease-accelerate`); duration presets (`duration/instant`, `duration/fast`, `duration/standard`, `duration/slow`) are documented on a dedicated `Motion Tokens` page inside `TP · Motion & Prototyping`, functioning as the prototyping-layer counterpart to Section 2's visual tokens, even though Figma has no native Variable binding for prototype timing at time of writing — this page is the manual source of truth until that gap closes.

### 4.3 Prototype Standards

- Every component with more than one `State` variant (3.3) has, at minimum, a hover→active and a default→focus Smart Animate transition wired in `TP · Motion & Prototyping`'s per-component demonstration frame — not in the Component Library file itself, keeping the published component source free of prototype-wire clutter per Section 1.2's file-separation rationale.
- Every template in `TP · Patterns & Templates` (Section 5) has a fully wired, click-through interactive prototype demonstrating its primary task flow end-to-end, satisfying UX Blueprint Ch. 30's Flow Design Philosophy in a form a stakeholder can click through without engineering involvement.
- Prototype flows use Figma's Interactive Components wherever the underlying component already exposes the needed state variants, and explicit frame-to-frame connections only where a full navigation change (not a component state change) is being demonstrated — e.g., page transitions per Motion Bible Ch. 34 (Route Change Choreography).

### 4.4 Micro-interaction Catalog

A dedicated page per Motion Bible Part III category — Buttons & Actions Motion, Form Field Motion, Dropdown/Select Motion, Tooltip & Popover Motion, Menu Motion, Badge & Status Motion, Icon Motion — each containing a small set of side-by-side before/after demonstration frames with the applicable duration and easing token labeled directly on the frame. This catalog page is the thing a new designer opens on day one to internalize Trady Perch's motion vocabulary without reading the full Motion Bible cover to cover first; it is a working index into that document, not a replacement for it.

### 4.5 Transition Documentation Format

Every interactive component's documentation frame (Section 6.1) carries a fixed **Motion Spec table** with these columns, populated even when the answer is "none": Trigger · Duration Token · Easing Token · Properties Animated · Reduced-Motion Behavior. The Reduced-Motion column is never left blank — per Motion Bible Ch. 74 (Reduced Motion Architecture), every animated property has an explicit stated fallback (typically an instant cross-fade or no motion at all), and a component whose documentation omits this column is treated as incomplete, not merely under-documented.

### 4.6 AI Motion: The Explicit Escalation Path

Motion Bible Part X (Ch. 90–99: AI Thinking State Motion, Conversation Flow Choreography, Streaming Text Motion, Tool Invocation Motion, Multi-Agent System Choreography) governs behavior Figma prototyping cannot faithfully simulate. For every AI conversation pattern built in Section 5.6, the Figma file contains a **storyboard**, not a working simulation: a sequence of static frames showing key states (idle → thinking → streaming-start → streaming-mid → streaming-complete → tool-invoked → response-settled), each frame annotated with its Motion Bible chapter citation and its intended duration/easing, explicitly labeled `STORYBOARD — SEE CODED PROTOTYPE FOR ACTUAL TIMING`. The actual token-by-token streaming behavior, the thinking-indicator's loop timing, and any multi-agent choreography are prototyped in code (a lightweight Storybook or CodeSandbox reference implementation, owned by engineering per Section 9) and linked from the Figma frame — Figma documents the *intent*; code demonstrates the *truth*, and this plan is explicit that the two are not the same artifact so no reviewer mistakes one for the other.

---

## SECTION 5 — UX INTEGRATION

*Everything in this section lives in `TP · Patterns & Templates` and is built only once Section 3's component waves it depends on are published — a template is a consumer of components, never a place where a missing component gets improvised in place.*

### 5.1 Navigation Systems

Three navigation patterns, each a Pattern-level assembly (3.1) of Nav components (Wave 3, Section 3.2) plus Icon, Avatar, and Badge: **Top Nav** (marketing site and shallow product surfaces, per UX Blueprint Ch. 21's Navigation Model Standard), **Side Nav** (dashboard and enterprise surfaces, collapsible per the `layout/sidebar` Variables in 2.7, per UX Blueprint Ch. 63's Dashboard & Enterprise Experience Standard), and **Mobile Nav** (bottom tab bar plus a slide-in drawer for secondary items). Each pattern's documentation states which product surfaces (Section 8) it is approved for, since UX Blueprint Ch. 25 (Cross-Product IA Consistency) treats navigation-pattern selection as a governed decision, not a per-project preference.

### 5.2 Page Templates

Full-page skeletons, each a Template-level assembly (3.1): **Landing Page Template** (hero, feature grid, social proof, CTA — UX Blueprint Ch. 50, Conversion Doctrine), **Dashboard Home Template** (UX Blueprint Ch. 78, Data-Dense Experience Doctrine), **Settings/Account Template**, **Client Portal Template** (UX Blueprint Ch. 82), **Admin/Configuration Template** (UX Blueprint Ch. 80), and **AI Assistant Surface Template** (Section 5.6). Every template is built on the correct breakpoint grid (2.5) at all four breakpoints from the start — a template is not considered complete at one breakpoint with the others "to follow later," since a template's entire purpose is to have already resolved the responsive question before a product designer duplicates it.

### 5.3 Interaction & Decision Patterns

**Task Flow patterns** (UX Blueprint Ch. 31) — linear, numbered frame sequences showing a complete task from entry to completion, used as the basis for every new flow a product designer builds rather than a blank-canvas start. **Multi-Step Wizard pattern** (UX Blueprint Ch. 33) — a Stepper component (Wave 5) plus per-step Form Field patterns, with explicit back/forward/save-and-exit states. **Confirmation & Interruption pattern** (UX Blueprint Ch. 37) — the Dialog component (Wave 4) pre-configured into the three sanctioned confirmation archetypes (destructive-action confirm, unsaved-changes warning, informational acknowledge-only), so a product designer selects one of three governed patterns rather than free-composing dialog copy and button hierarchy from scratch each time. **Error & Recovery pattern** (UX Blueprint Ch. 35, DSB Ch. 47) — a matched set of inline, toast, and full-page error treatments, each mapped to a severity tier and each carrying the plain-language standard the AI Constitution's Ch. 79 (Error Communication) independently requires of AI-generated error copy, so human-authored and AI-generated error states read as one voice.

### 5.4 Form Patterns

Built from the Wave 2 Form Field primitives (Section 3.2) plus DSB Ch. 48's Form Validation & Feedback Patterns: a **Standard Form pattern** (label-above, inline validation, grouped field sections) and a **Compact Form pattern** (inline label, used only in data-dense dashboard contexts per UX Blueprint Ch. 78). Every form pattern demonstrates all three validation timing modes DSB Ch. 48 requires — on-blur, on-submit, and real-time — as separate labeled prototype states, so a product designer picks the correct timing for their specific field rather than defaulting to whichever one they saw most recently.

### 5.5 Dashboard Patterns

Built from Wave 5's Table, Chart, and Timeline components: a **Metrics Overview pattern** (stat-tile row plus a primary chart, per the dataviz-adjacent density rules UX Blueprint Ch. 78 sets), a **Data Table pattern** (Table plus Search, Filter, Pagination, and bulk-action toolbar, wired together as one Pattern-level unit rather than four separately placed components a designer must remember to combine correctly every time), and a **Report/Insight pattern** (UX Blueprint Ch. 83). Each carries a documented maximum information density guideline, since UX Blueprint Ch. 4's Cognitive Load Doctrine applies to dashboards with particular force.

### 5.6 AI Conversation Patterns

The most heavily cross-referenced pattern set in this file, built jointly against UX Blueprint Part VIII (Ch. 68–77) and the AI Constitution's Part VIII (Human-AI Experience) and Part X (Role-Specific AI Constitutions):

- **Message Exchange pattern** — user and AI message bubbles, built from Avatar, Badge (for AI-disclosure labeling per AI Constitution Ch. 5), and typography tokens, with a mandatory, non-removable AI-identity indicator on every AI-authored message per AI Constitution Ch. 5's Transparency Standard.
- **Thinking/Streaming State pattern** — the storyboard artifact defined in Section 4.6, cross-referenced here as the visual component set (not the motion truth) a conversation surface assembles.
- **Trust Signal pattern** — citation chips, confidence qualifiers, and a "verified" marker, built per AI Constitution Ch. 76 (Trust Signals) with the explicit rule that this pattern is only ever placed on a message where a real, logged verification event backs it — a rule stated on the pattern's documentation page precisely because it cannot be enforced by Figma itself.
- **Clarifying Question pattern** — a message-bubble variant with inline quick-reply chips, per AI Constitution Ch. 77 (Clarifying Questions Doctrine).
- **Escalation/Handoff pattern** — the explicit "connecting you with a person" transition state, per UX Blueprint Ch. 76 and AI Constitution Ch. 72 (Escalation Rules) — required in every AI Product Surfaces file (Section 1.2) that includes a support or sales conversational role.
- **Tool Invocation Display pattern** — a compact, collapsible card showing what action an agent is taking, satisfying AI Constitution Ch. 18's (Planning Frameworks) visible-plan requirement at the interface level.

Every pattern in this subsection carries a documentation note naming which AI Constitution role chapter (Ch. 92–99) it is approved for use with, since not every AI conversation pattern is appropriate for every role — a Sales AI surface (AI Constitution Ch. 97) is explicitly barred from certain urgency-adjacent visual treatments (progress bars implying scarcity, countdown-styled elements) that would be unremarkable on, say, a Research AI surface (Ch. 96).

---

## SECTION 6 — DOCUMENTATION STANDARDS

### 6.1 The Fixed Component Documentation Template

Every component, pattern, and template carries an identical documentation frame — identical structure, so a reader never has to relearn where information lives from one component to the next — placed immediately to the left of its source frames (Section 1.4). Ten fixed fields, in fixed order:

1. **Purpose** — one sentence stating what the component is for, not what it looks like.
2. **Anatomy** — an annotated diagram of the component's parts (leading icon, label, trailing element, etc.), each label matching the actual layer name from Section 1.5 exactly, so the diagram and the real layers never drift apart.
3. **Variants & Properties** — a table of every property from Section 3.3 and its full value set, with a visual swatch of each.
4. **Usage Guidance** — when to use this component versus a similar alternative (e.g., when a Toast is correct versus when a Dialog is correct), citing the relevant DSB or UX Blueprint chapter.
5. **Do / Don't** — a minimum of three paired correct/incorrect visual examples, the single most-referenced field for a designer moving quickly, placed prominently rather than buried at the bottom.
6. **Accessibility** — the specific facts from Section 3.6 that apply to this component: contrast pairing used, focus behavior, target size, redundant-signal notes, ARIA role.
7. **Responsive Behavior** — which of Section 3.5's two mechanisms applies, and if structural, a side-by-side of the breakpoint variants.
8. **Motion** — the fixed Motion Spec table from Section 4.5.
9. **Engineering Notes** — the component's mapped code name, repository path, and Storybook link once it exists (Section 9.3) — blank with a stated "not yet implemented" flag rather than omitted, so its absence is visible rather than silent.
10. **Version History** — a running log of every published change to this specific component, each entry citing the library's overall semantic version (1.7) at the time of that change.

### 6.2 Where Documentation Lives

The ten-field template lives natively inside each library file per 6.1, functioning as the working reference for anyone inside Figma. A generated, browsable companion site (via a Figma-to-site tool such as Zeroheight, evaluated at Milestone 1) republishes the same ten fields for audiences without Figma seats — engineering, stakeholders, external contractors — updated automatically on every library publish (Section 1.8) rather than manually mirrored, so the two never fall out of sync with each other.

### 6.3 Documentation Ownership

Documentation is not a separate task performed after a component is "done" — a component without a complete ten-field documentation frame has not, by this plan's definition, reached the `Stable` lifecycle stage (Section 7.5) regardless of how finished its visual design looks, and cannot be published to the Team Library at all.

---

## SECTION 7 — LIBRARY GOVERNANCE

### 7.1 Component Lifecycle States

Every component, pattern, and token moves through four states, displayed as a status badge directly on its documentation frame (6.1), operationalizing DSB Ch. 66 (Component Lifecycle):

- **Experimental** — exists on a branch or in a Playground area only; not merged to main, not consumable by any product file.
- **Stable** — merged, fully documented (Section 6), quality-gated (7.5), and published. The default expectation for anything referenced from a product file.
- **Deprecated** — superseded by a newer pattern but not yet removed; carries a mandatory migration note on its documentation frame pointing to its replacement, and a stated removal-eligible version number.
- **Archived** — removed from the published library; its final state is preserved only in `03 · Archive & Sandbox` (Section 1.1) for historical reference.

### 7.2 Review & Approval Workflow

The full sequence a branch (Section 1.6) passes through before merge, elaborating Section 1.8's summary: **(1) Self-QA** — the author runs Section 7.5's quality-gate checklist against their own work before requesting review. **(2) Design Review** — one peer designer, minimum, reviews for token compliance, variant completeness (3.3's full state set), and Do/Don't documentation quality. **(3) Accessibility Check** — checked against Section 3.6's built-in criteria; for a genuinely novel interaction pattern with no established accessibility precedent, this step escalates to a full assistive-technology test per the Product Implementation Constitution's Ch. 19. **(4) Governance Approval** — for any `MAJOR` version change (1.7) or any new component category not previously in the library, sign-off from the Design Systems lead is required before merge; `MINOR` and `PATCH` changes are approved by the reviewing peer alone, keeping routine work from bottlenecking on a single approver. **(5) Merge & Publish** — per Section 1.8.

### 7.3 Quality Gates

A fixed, non-negotiable checklist, failing any item of which blocks publish regardless of how the component otherwise looks:

- Zero hardcoded color, spacing, radius, or typography values — every visual property traces to a Variable or Style from Section 2.
- Zero layers named with Figma's default auto-generated names (Section 1.5).
- Every interactive component has all eight canonical state variants (3.3) present, even where visually near-identical to another state — presence, not merely correctness, is checked first.
- Documentation frame's ten fields (6.1) are all populated; none left as placeholder text.
- Both Light and Dark modes (2.6) visually verified via the mode switcher, not merely assumed correct because Semantic tokens were used.
- Minimum target size and focus-state requirements (3.6) verified.
- Component name follows Section 1.5's `Category/Component/Variant` convention exactly.

### 7.4 Contribution Guidelines

Any designer, not only the Design Systems team, may propose a new component or pattern, following DSB Ch. 67's contribution discipline applied here concretely: a short written proposal (what problem it solves, why an existing component can't be extended to solve it instead, which product surfaces need it) posted for Design Systems team triage before any Figma work begins. This gate exists specifically to catch the most common design-system failure mode — a near-duplicate component built because searching the existing library felt slower than building — before it consumes review cycles. Approved proposals enter Section 1.6's branch workflow; declined proposals are logged with their reasoning so the same proposal is not re-litigated from scratch by a different designer six months later.

### 7.5 Deprecation Policy

A component moves to `Deprecated` (7.1) only with: a named replacement already at `Stable`, a written migration note, and advance notice to every product file team currently consuming it, proportional to the number of live usages found via Figma's "find and replace" component-usage search. A `Deprecated` component is never removed (`Archived`) in the same release that deprecates it — a minimum one-`MINOR`-version runway is required, giving consuming teams a real window to migrate rather than discovering a broken instance link after the fact.

### 7.6 Versioning Recap

Section 1.7's file-level semantic versioning is the mechanism; this section is the policy governing when each version tier is triggered — summarized here so governance and mechanics are never read as two disconnected systems: a `PATCH` requires only self-QA; a `MINOR` requires peer design review; a `MAJOR` requires full governance approval (7.2) and, if it deprecates anything, satisfies 7.5's runway requirement before it ships.

---

## SECTION 8 — SCREEN ASSEMBLY STRATEGY

### 8.1 The Core Rule

A product file (`02 · Product`, Section 1.2) is assembled exclusively from library instances — components, patterns, and templates pulled in as linked library assets — never from detached, locally redrawn copies. A designer working in `TP · Marketing & Website` opens a template, duplicates it onto a new frame in the `Screens — In Progress` page (1.4), and fills it with real content and real component instances. If a screen needs something the library doesn't yet have, the correct action is Section 7.4's contribution process, not a one-off local build that quietly becomes permanent because no one circled back.

### 8.2 Per-Surface Assembly Notes

- **Landing Pages & Marketing Website** — assembled from the Landing Page Template (5.2), Top Nav (5.1), and marketing-specific Card and CTA compositions; held to UX Blueprint Part VI's conversion doctrine and the Brand Identity Manual's Part VII digital-presence standards for any social/campaign-specific frame variants.
- **Dashboards** — assembled from the Dashboard Home Template, Side Nav, and the Dashboard Patterns set (5.5); every new dashboard screen is checked against UX Blueprint Ch. 4's Cognitive Load Doctrine before it's marked `Ready for Dev` — a screen that requires a new pattern to stay within that doctrine's density guidance triggers 7.4's contribution process rather than a one-off dense layout.
- **Mobile Apps** — assembled once the `TP · Mobile App` file exists (1.2), from Mobile Nav (5.1) and the structural mobile variants defined per 3.5; no mobile screen is assembled from a desktop component's default state under the assumption that "it'll probably reflow fine."
- **Admin Panels** — assembled from the Admin/Configuration Template (5.2) and the Data Table pattern (5.5); held to UX Blueprint Ch. 79's Roles & Permissions Experience standard for any state that varies by user role.
- **AI Products** — assembled from the AI Assistant Surface Template (5.2) and the full AI Conversation Pattern set (5.6); every AI product screen's Message Exchange instance is checked for the non-removable AI-disclosure indicator (5.6) before being marked `Ready for Dev`, since this is one of the few visual requirements this plan treats as equivalent in weight to an accessibility failure.
- **Enterprise Software** — assembled from the Client Portal Template (5.2) plus whichever of the Dashboard and Admin patterns the specific enterprise surface needs; held to UX Blueprint Ch. 84's Enterprise Onboarding & Rollout Experience standard where the surface includes a first-run flow.

### 8.3 The Feedback Loop Back Into the System

Screen assembly is not a one-way consumption of the library — it is this system's primary source of real-world signal about what the library is still missing. Any pattern a product designer finds themselves rebuilding by hand three or more times across screens (8.1's stated threshold) is logged, by that designer, as a Section 7.4 contribution proposal before a fourth instance is built. This is the single mechanism that keeps `TP · Patterns & Templates` growing in response to real product need rather than in response to the Design Systems team's own guesses about what will be needed.

---

## SECTION 9 — ENGINEERING HANDOFF

### 9.1 Token Export Strategy

Every Figma Variable from Section 2 is exported as design-token JSON via Figma's native Variables REST API (or the Tokens Studio plugin, evaluated at Milestone 1 against the native API for team fit), landing in a dedicated `design-tokens` package inside the Product Implementation Constitution's repository structure (PIC Ch. 7). This JSON is the direct input to a Style Dictionary (or equivalent) build step that generates every platform-specific output the Product Implementation Constitution's Ch. 13 (Design Token Implementation) requires — CSS custom properties, a Tailwind config extension, and any native-mobile token format once `TP · Mobile App` exists. This export is never a one-time, hand-triggered action performed at project kickoff and then left stale — it runs on every `MINOR` or `MAJOR` library publish (Section 1.7), via the same CI pipeline the Product Implementation Constitution's Ch. 56 (Continuous Integration Standard) already governs, so a token change in Figma reaches a pull request in the codebase automatically rather than through a manual re-export someone has to remember to run.

### 9.2 Naming Parity

The single rule that makes Section 9.1's pipeline trustworthy: a Figma Variable's name (1.5) and its exported token's name are the *same string*, transformed only by the mechanical case convention each platform requires (`color/semantic/text-primary` → `--color-semantic-text-primary` in CSS, `colors.semantic.textPrimary` in a JS token object) — never renamed, reorganized, or reinterpreted in translation. Any proposed Figma Variable name that would not produce a sensible code token name under this mechanical transform is rejected at the naming stage (Section 1.5), before it is ever built, rather than patched with a manual mapping exception later.

### 9.3 Component Mapping

A single, maintained mapping table — the literal implementation of the Product Implementation Constitution Ch. 3's Translation Doctrine, applied concretely to this system — with one row per component, four columns: **Figma component name** (1.5's `Category/Component/Variant` string) · **Code component name & repository path** (per PIC Ch. 8's Folder Hierarchy Standard) · **Storybook story URL** · **Lifecycle status** (7.1's four states, kept in sync between the design and code side — a component cannot be `Stable` in Figma while its code counterpart doesn't exist yet; it is `Stable (Design) / Not Implemented (Code)` until both sides agree). This table lives in the shared documentation site (6.2), not buried in either the Figma file or the codebase alone, since it is the one artifact both designers and engineers need to consult and neither team fully owns.

### 9.4 Implementation References & Dev Mode

Every component's Figma source (not just its documentation frame) carries Figma Dev Mode annotations: the ARIA role, the keyboard-interaction spec (DSB Ch. 42), and a direct link to the matching row in Section 9.3's mapping table. An engineer inspecting a component in Dev Mode reaches the component's non-visual specification without needing a separate handoff meeting for information that should already be attached to the artifact itself.

### 9.5 Developer Documentation & Onboarding

A dedicated `Engineering Handoff` section on the shared documentation site (6.2), distinct from the designer-facing per-component documentation, covering: how to consume the token export (9.1) in a new codebase, how Section 9.3's mapping table is kept current, and a standing walkthrough session — scheduled at the close of each Milestone in Section 10 — where the Design Systems lead and the Product Implementation Constitution's engineering owner jointly review what shipped, satisfying both documents' shared interest in keeping design and implementation from silently drifting apart.

---

## SECTION 10 — BUILD ROADMAP

### 10.1 How to Read This Roadmap

Eight milestones, sequenced by genuine dependency, not by the order they were requested in. Several milestones' work legitimately overlaps in calendar time (Milestone 4 begins before Milestone 3 fully closes, once enough of Wave 3–4 components exist) — the dependency rule that actually governs sequencing is stated in each milestone's **Depends On** field, not the milestone number. Duration estimates assume a small, dedicated Design Systems function (2–3 designers plus part-time engineering liaison), consistent with the team-size assumption the Design System Bible's own Ch. 0.4 scale estimate uses, and run partially in parallel with that Bible's own 12–18 month authoring timeline rather than waiting for its full completion — Milestone 1 can begin as soon as DSB Volume I's chapters are drafted, even if Volume VII is not.

### 10.2 Milestone 1 — Foundations

**What's Built:** Figma Team and Project structure (1.1), the eight-file skeleton (1.2), naming conventions finalized and documented (1.5), branching and versioning conventions configured (1.6–1.7), the Foundations file's page structure created and empty, awaiting token population.
**Depends On:** DSB Volume I (Ch. 1–16) drafted to at least a stable-enough point that color, type, and spacing values exist to enter — this milestone does not wait for DSB's full seven-volume completion.
**Complexity:** Medium — mostly structural and organizational decision-making, low execution volume.
**Estimated Duration:** 2–3 weeks.
**Completion Criteria:** Every file in Section 1.2 exists, empty but correctly named and paged; a written naming-convention reference is published and reviewed; the publishing workflow (1.8) has been dry-run once on a trivial placeholder change.

### 10.3 Milestone 2 — Tokens

**What's Built:** All four Variable Collections (2.1) fully populated — Core, Semantic — Color (both modes), Semantic — Layout, Breakpoint & Grid; all Text Styles (2.3); all Effect Styles (2.4); all Grid Styles (2.5).
**Depends On:** Milestone 1's file structure; DSB Ch. 2–9 and Ch. 52 (Dark Mode & Theming) at a stable, review-approved state.
**Complexity:** High — every value requires a real design decision (contrast-checked color pairs, a resolved type scale), not just structural setup.
**Estimated Duration:** 3–4 weeks.
**Completion Criteria:** Every token named in Section 2 exists and is correctly tiered (Core/Semantic/Component); Light and Dark modes verified via toggle on a test frame; the Section 9.1 export pipeline successfully produces a first-pass token JSON from this milestone's output, proving the pipeline before Milestone 3 generates real component-level demand for it.

### 10.4 Milestone 3 — Components

**What's Built:** The full five-wave component build sequence (Section 3.2), each wave gated on the prior wave's publish, each component passing Section 7.3's quality gate and Section 6.1's documentation template before being marked `Stable`.
**Depends On:** Milestone 2's published token set; DSB Volume II (Ch. 17–38) drafted per-component ahead of that component's wave.
**Complexity:** Very High — the largest single body of execution work in this roadmap, spanning roughly 35 distinct components across five dependency waves, each requiring full variant coverage, both-mode verification, and documentation.
**Estimated Duration:** 10–14 weeks, run as five sequential wave-sprints of roughly 2–3 weeks each, with Wave 5 (data-dense components) taking the upper end of that range given Chart & Data Visualization's dependency on the not-yet-finalized data-series component tokens (2.2).
**Completion Criteria:** Every component named in Section 3.2's five waves is `Stable` (7.1), quality-gated, documented, and published to `TP · Component Library`; zero components remain in `Experimental` status without a stated, dated plan to resolve them.

### 10.5 Milestone 4 — Templates

**What's Built:** The full Patterns & Templates library from Section 5 — Navigation Systems, Page Templates, Interaction & Decision Patterns, Form Patterns, Dashboard Patterns, and the AI Conversation Pattern set.
**Depends On:** Milestone 3's Wave 3–5 components (Navigation, Forms, Tables, Dialogs, Charts) — begins once those specific waves are published, which in practice means Milestone 4 starts roughly two-thirds of the way through Milestone 3's calendar span rather than strictly after it.
**Complexity:** High — less raw volume than Milestone 3, but each pattern requires resolving real UX Blueprint doctrine (flow logic, IA decisions) rather than only visual assembly.
**Estimated Duration:** 4–6 weeks.
**Completion Criteria:** Every pattern and template named in Section 5 exists, is built at all four breakpoints (5.2), and `TP · Patterns & Templates` is published as the fourth Team Library (1.3).

### 10.6 Milestone 5 — Screens

**What's Built:** The first real, production-intended screens in each `02 · Product` file — a proof-of-system pass proving the library can actually produce shipped work, not only demonstration templates. Per Section 8.2: a small representative set from Marketing, Dashboard, and AI Product Surfaces at minimum.
**Depends On:** Milestone 4's templates and patterns.
**Complexity:** Medium-High — assembly work, but the first real test of Section 8.3's feedback loop, meaning this milestone routinely surfaces Section 7.4 contribution proposals that feed back into Milestone 3/4 work.
**Estimated Duration:** 4–6 weeks.
**Completion Criteria:** At least one full, `Ready for Dev`-status screen exists per product surface named in Section 8.2; every gap discovered during assembly is logged as a contribution proposal (7.4) or explicitly deferred with a stated reason, none silently worked around.

### 10.7 Milestone 6 — Prototype

**What's Built:** The full interactive-prototype layer from Section 4 — `TP · Motion & Prototyping`'s per-component demonstration frames, every template's end-to-end click-through flow, and the AI Motion storyboards (4.6) with their linked coded-prototype references.
**Depends On:** Milestone 3 (components must exist to wire) and Milestone 4 (templates must exist for full-flow prototypes); runs substantially in parallel with Milestones 3–5 at the individual-component level rather than strictly afterward — a component's motion spec is attached the moment the component itself is published, per Section 4.3, and this milestone's dedicated span is primarily for the template-level end-to-end flows and the AI storyboards, which do require Milestone 4 and 5's output to exist first.
**Complexity:** High — the AI Motion storyboard-to-code handoff (4.6) is the single highest-coordination-cost item in this milestone, requiring active engineering involvement rather than design-only execution.
**Estimated Duration:** 3–4 weeks of dedicated focus, layered atop the ongoing per-component motion work already happening inside Milestones 3–5.
**Completion Criteria:** Every `Stable` component has a populated Motion Spec table (4.5); every template has a working click-through prototype; every AI conversation pattern's storyboard has a linked, functioning coded-prototype reference rather than a placeholder link.

### 10.8 Milestone 7 — QA

**What's Built:** Nothing new — this milestone is a full-system verification pass, not a construction phase, directly executing Section 7.3's quality gate and Section 3.6's accessibility standard across the entire published system rather than per-component at build time.
**Depends On:** Milestones 3–6 substantially complete.
**Complexity:** Medium — mechanical and checklist-driven, but high in coverage volume (every component, every pattern, both modes, all four breakpoints).
**Estimated Duration:** 2–3 weeks.
**Completion Criteria:** A full quality-gate pass (7.3) recorded against every published component and pattern with zero open findings above a defined severity; a full assistive-technology spot-check (PIC Ch. 19) completed against a representative sample of interactive components; cross-file consistency verified (no orphaned local styles, no detached instances found in any product file per Section 8.1's core rule).

### 10.9 Milestone 8 — Developer Handoff

**What's Built:** The Section 9 pipeline made fully operational end-to-end — live token export (9.1) wired into CI, Section 9.3's component mapping table complete for every `Stable` component, Dev Mode annotations (9.4) complete, and the first standing engineering walkthrough session (9.5) held.
**Depends On:** Milestone 7's QA sign-off — nothing is handed to engineering as authoritative until it has passed the full-system verification pass, avoiding the common failure of engineering building against a component that QA subsequently changes.
**Complexity:** Medium — primarily integration and coordination work; the hardest individual pieces (the export pipeline itself) were already proven in Milestone 2.
**Estimated Duration:** 2–3 weeks.
**Completion Criteria:** A code pull request generated entirely from the token export pipeline (9.1) is successfully merged into the Product Implementation Constitution's repository; Section 9.3's mapping table has zero rows missing a repository path or Storybook link for any component whose code implementation has begun; the first joint design-engineering walkthrough session (9.5) is held and scheduled to recur.

### 10.10 Roadmap Summary

| Milestone | Depends On | Complexity | Duration |
|---|---|---|---|
| 1. Foundations | DSB Volume I (draft) | Medium | 2–3 wks |
| 2. Tokens | M1; DSB Ch. 2–9, 52 | High | 3–4 wks |
| 3. Components | M2; DSB Volume II | Very High | 10–14 wks |
| 4. Templates | M3 (Waves 3–5) | High | 4–6 wks |
| 5. Screens | M4 | Medium-High | 4–6 wks |
| 6. Prototype | M3–M5 (parallel + dedicated span) | High | 3–4 wks |
| 7. QA | M3–M6 | Medium | 2–3 wks |
| 8. Developer Handoff | M7 | Medium | 2–3 wks |

**Total estimated timeline to a production-ready v1.0 system: 30–43 weeks (roughly 7–10 months)**, accounting for Milestone 6's parallelism with Milestones 3–5 rather than simple sequential addition. This runs comfortably inside the Design System Bible's own stated 12–18 month full-documentation timeline (DSB §0.4), consistent with this plan's working assumption throughout: Figma execution follows close behind each volume's drafting, not behind the Bible's complete seven-volume finish.

---

## ERRATUM — v1.1, Theming Architecture Correction

**Found by:** Independent Design Review Board audit, Closure Protocol remediation cycle. **Sections affected:** 2.1, 2.2, 2.6.

**The conflict.** Sections 2.1 and 2.6, as originally written, described the `Semantic — Color` Variable Collection as carrying **two modes: Light and Dark**, toggled via Figma's native mode switcher, and cited DSB Ch. 52 as the justification for that structure. This was incorrect. DSB Ch. 52 (Dm-1) does not describe a two-mode system — it explicitly forbids one: *"The product has exactly one native visual identity... with no user-facing preference toggle switching to an alternate light theme."* A Figma engineer following the original 2.1/2.6 literally would have built the exact mode-switcher structure Ch. 52 exists to prevent, believing it constitutionally required, because the citation pointed at the one chapter that forbids it.

**Root cause.** This Plan was drafted from a generic Figma-file-architecture template — Light/Dark mode pairs are the default assumption almost any design-tokens reference makes — without re-deriving the theming section specifically from Ch. 52's actual, brand-specific content once that chapter existed. The citation was added for authority without the described structure being checked against what the cited chapter actually says.

**Resolution.** Sections 2.1, 2.2, and 2.6 are corrected above to a single Dark mode, with any future medium-driven light variant (print, Ch. 60) routed through Dm-2/Dm-3's separate-variant governance rather than through this collection. No other section of this Plan depended on the two-mode assumption; Sections 3–10 were checked and require no further change.

**Standing rule.** Per Chapter 2's T-5 (tokens are deprecated, never silently deleted): this correction is logged, not silently applied — a reader who encountered the original two-mode description in a prior export or cached copy has a record of exactly what changed and why.

---

*End of Implementation Plan. No screen, mockup, or visual design decision has been made in this document — only the sequence, structure, and governance by which Trady Perch's Figma workspace turns the nine constitutional documents into a single, buildable, engineering-consumable design system. Execution begins at Milestone 1.*

