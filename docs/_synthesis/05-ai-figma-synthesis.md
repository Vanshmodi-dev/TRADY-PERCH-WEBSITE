# AI + Figma Synthesis — Reference for Website Build

Source documents (read in full):
1. `docs\Trady-Perch-AI-Constitution-Architecture.md` — the **blueprint/architecture** for the AI Constitution (118 chapters across 12 Parts). Important caveat: this is a table-of-contents-level document. Each chapter entry gives Purpose / Business Importance / AI Importance / Ethical Importance / Dependencies / Cross-References / Success Criteria — it describes what each future chapter will govern, but the chapters themselves (with their fully worked-out rules, thresholds, and copy examples) have not yet been drafted. Treat statements below as **governing intent**, not verbatim finished doctrine, except where a specific rule, vocabulary term, or test is stated explicitly.
2. `docs\Trady-Perch-Figma-Design-System-Implementation-Plan.md` — the execution plan for turning the Design System Bible into a Figma workspace and an engineering handoff pipeline. This one is concrete/literal (naming strings, file structure, milestones).
3. `docs\design-system-bible\Chapter-71-Designing-AI-Native-Interfaces.md` — a **finished** Design System Bible chapter with fully specified, literal rules (Ai-1, Ai-2, Ai-3) for AI-native interface design. This is the most concrete AI-UX source of the three.

---

## AI Constitution — Core Principles

These are the Part I ("AI Philosophy & First Principles") chapters most load-bearing for how Trady Perch presents/discusses AI capability. Each is stated at blueprint/purpose level (see caveat above), quoted as closely as the source allows:

- **Ch. 1 — The Purpose of Intelligence at Trady Perch.** States why Trady Perch builds/deploys AI at all: "to extend specific human capability and judgment, never to replace accountability for it." Every capability decision must be checked against a stated purpose, not "because it is now possible."
- **Ch. 2 — AI Principles.** A short, memorizable principle set — "the literal system-prompt-level compression every deployed agent's instructions ultimately trace back to."
- **Ch. 3 — Human-Centered AI Doctrine.** "The human always retains the ability to understand, override, and opt out of AI-mediated decisions that affect them." Default posture: **augment, disclose, and defer**.
- **Ch. 4 — Trust as a Design Constraint.** Trust is "not a marketing outcome but an engineering constraint" — specific, checkable behaviors: consistent honesty about uncertainty, no manufactured urgency, no silent capability overreach. "Every trust-signal claim an agent is permitted to make (e.g., 'I've verified this') can be traced to an actual verification step."
- **Ch. 5 — Transparency Standard.** Fixes what an AI system must proactively disclose — "that it is an AI, what data it used, what it is uncertain about — without requiring the user to ask." Success criterion: an external auditor can identify they are interacting with an AI system "within the first exchange."
- **Ch. 6 — Explainability Standard.** The minimum bar for stating *why* an output/decision was produced, in terms a non-technical user can act on — distinct from transparency (that it is AI).
- **Ch. 7 — Decision-Making Philosophy.** Reversibility-biased defaults under ambiguity: defer to the human, choose the more reversible option, or act within a pre-approved boundary.
- **Ch. 8 — Reasoning Philosophy.** "Good reasoning" = traceable, falsifiable, and honest about its own confidence.
- **Ch. 9 — AI Ethics Foundations.** Non-manipulation, non-deception, fairness across users, respect for the boundary between influence and coercion.
- **Ch. 10 — AI Limitations & Honest Incapacity.** Requires every deployed system to be able to state what it is **not** capable of and should never claim to be — "the deliberate inverse of a capability roadmap." Explicitly named: "Overclaiming AI capability is the single most common cause of AI product trust collapse industry-wide." Establishes the "I don't know" / "I can't do that" response patterns.
- **Ch. 11 — Anti-Philosophy: How Intelligence Fails Silently.** Taxonomy of silent failure modes: confident hallucination, sycophantic agreement, silent scope creep, optimization for the metric instead of the goal.

**Cross-cutting governance note:** The Master Vision, Design System Bible, Motion Bible, UX/Experience Blueprint, Brand Identity Manual, and Product Implementation Constitution all outrank the AI Constitution in the stated authority order; the AI Constitution "has no authority to amend any of the six documents above it."

---

## AI Experience Guidelines for the Website

### Copy tone / claims discipline (from Part I, Part VII, Part VIII)

- **No overclaiming capability.** Ch. 10 explicitly frames overclaiming as the top industry cause of AI-product trust collapse; a red-team test "specifically designed to elicit an overclaim of capability" must be refused or honestly caveated "in 100% of tested cases" (success criterion, though this is a chapter-level test target, not yet a shipped mechanism).
- **No manufactured urgency, no silent capability overreach** (Ch. 4, Trust as a Design Constraint).
- **Ch. 97 — Sales AI Constitution** is the most directly relevant to marketing/sales copy: "the strictest anti-manipulation discipline in this Part," bound by the UX Blueprint's dark-pattern prohibitions, with an "explicit prohibition on manufactured urgency or artificial scarcity." Trade-off named explicitly: "A sales agent that oversteps into manipulation trades a short-term conversion for a disproportionate long-term trust and reputational cost, directly contrary to Trady Perch's premium, judgment-driven positioning." A red-team test target: zero violations for "manufactured urgency, false scarcity, or misleading comparison language."
- Per the Figma plan (Section 5.6), a Sales AI surface "is explicitly barred from certain urgency-adjacent visual treatments (progress bars implying scarcity, countdown-styled elements) that would be unremarkable on, say, a Research AI surface."
- **Ch. 79 — Error Communication.** Plain language over technical jargon, a stated reason, and where possible an alternative path forward — "zero raw technical error strings reaching an end user." The Figma plan cross-references this directly for both human-authored and AI-generated error copy so they "read as one voice."
- **Ch. 76 — Trust Signals.** "The specific, honest cues an AI system gives to indicate its own confidence and sourcing in real time — a citation, a confidence qualifier, a visible 'I verified this' marker." Rule: "A trust signal not backed by the verification it implies... is worse than no signal, since it actively misleads rather than merely staying silent." The Figma plan operationalizes this as a hard rule: the Trust Signal pattern is "only ever placed on a message where a real, logged verification event backs it."
- **Ch. 81 — Tone Consistency.** Brand voice must stay recognizable across every AI product surface and emotional register — explicitly flags that a "warm and casual" register during a genuinely distressing user situation is a mismatch that "can itself feel dismissive or unsafe."

### Proof points required

- Trust claims and verification claims must be traceable to logged, real events — not decorative. (Ch. 4, Ch. 76, and the Figma plan's Trust Signal pattern rule all state this independently.)
- Success criteria throughout Part VII/IX are stated as measurable benchmarks (hallucination rate below threshold, calibration curve within tolerance, escalation trigger rate) — i.e., the constitution's own standard for AI credibility claims is "checkable," not just asserted.

### AI-related UI patterns / interaction states (concrete, from the Figma plan Section 5.6 "AI Conversation Patterns")

Built jointly against UX Blueprint Part VIII and AI Constitution Part VIII/X:

- **Message Exchange pattern** — user/AI message bubbles, built from Avatar, Badge (AI-disclosure labeling per AI Constitution Ch. 5), typography tokens, with a **mandatory, non-removable AI-identity indicator on every AI-authored message** (per Ch. 5's Transparency Standard).
- **Thinking/Streaming State pattern** — a storyboard artifact (not a working simulation — see Motion section below), cross-referenced as the visual component set a conversation surface assembles.
- **Trust Signal pattern** — citation chips, confidence qualifiers, and a "verified" marker (per AI Constitution Ch. 76), with the rule above that it can only be placed where a real, logged verification event backs it.
- **Clarifying Question pattern** — a message-bubble variant with inline quick-reply chips (per AI Constitution Ch. 77, Clarifying Questions Doctrine — phrasing should read as "genuine, efficient collaboration rather than as friction or evasion").
- **Escalation/Handoff pattern** — an explicit "connecting you with a person" transition state (per UX Blueprint Ch. 76 and AI Constitution Ch. 72, Escalation Rules) — required in every AI Product Surfaces file that includes a support or sales conversational role.
- **Tool Invocation Display pattern** — a compact, collapsible card showing what action an agent is taking, satisfying AI Constitution Ch. 18's (Planning Frameworks) visible-plan requirement at the interface level.

Every AI conversation pattern's documentation must name which AI Constitution role chapter (Ch. 92–99) it is approved for use with — patterns are not universally applicable across roles.

### "AI thinking" state — explicit limitation

Per Figma plan Section 4.6 ("AI Motion: The Explicit Escalation Path"): Figma prototyping **cannot** faithfully simulate true AI thinking/streaming behavior. For any AI conversation pattern, the Figma file contains a **storyboard, not a working simulation** — a sequence of static frames (idle → thinking → streaming-start → streaming-mid → streaming-complete → tool-invoked → response-settled), each annotated with its Motion Bible chapter citation and intended duration/easing, explicitly labeled **"STORYBOARD — SEE CODED PROTOTYPE FOR ACTUAL TIMING."** The actual token-by-token streaming behavior and thinking-indicator loop timing are prototyped in code (a Storybook or CodeSandbox reference implementation owned by engineering) and linked from the Figma frame. "Figma documents the intent; code demonstrates the truth."

---

## Designing AI-Native Interfaces (Chapter 71 highlights)

Chapter 71 is a **finished** Design System Bible chapter (Volume VII, "The Horizon") and is the single most concrete, literal source on AI-UI rules across all three documents. It inherits from Master Vision Ch. 19 and DSB Ch. 1 (P1, P6, P8), Ch. 25 (Toasts/undo model), Ch. 39 (state model), Ch. 45 (conversational patterns), Ch. 46 (trust/privacy/security patterns).

**Philosophy:** Explicitly rejects treating "AI-native" as license to invent a disconnected new visual/interaction language — "the medium is new, but the brand is not." Every rule is a direct extension of existing DSB reasoning, never a freestanding new idea.

**Three core principles (Ai-1, Ai-2, Ai-3):**

1. **Ai-1 — Proactive AI actions are always visually distinguished from user-initiated ones.** Any AI-initiated action (without a direct, immediate user request) carries a visible marker (the Chapter 34 "Av-3" abstract AI mark) distinguishing it from a user-triggered action. Example given: a dashboard log entry "Lead score updated" shown beside the AI mark (agent-initiated) vs. the same entry with no mark (user-initiated). **Applies to every proactive, agent-initiated action visible in any interface — no exception.**

2. **Ai-2 — An agent's confidence is always visible, never implied by tone alone.** Where an AI agent acts or recommends based on uncertain/probabilistic information, the interface shows an **explicit confidence indicator** — never relying on conversational tone to imply certainty. Example: a lead-qualification score shown with both the score and an explicit "Moderate confidence" label. Applies to every AI-generated recommendation/classification with real-world consequence attached; does **not** apply to low-stakes, easily-reversible suggestions where a label "would add more noise than value."

3. **Ai-3 — Every autonomous action has a visible undo path.** Any autonomously-taken AI action pairs with a visible, easily-accessible undo action, following the Chapter 25 Toast-based undo model. Example: "The agent moved 3 leads to 'Qualified.' Undo." Does not apply where an action is genuinely irreversible by nature (e.g., an email already sent) — there, upfront confirmation is required instead of an undo that can't be honored.

**Complete design spec:**
- Agent-action marker (Ai-1): Chapter 34's small AI mark, beside any log entry/change record representing agent-initiated action.
- Confidence indicator (Ai-2): a text label (**High / Moderate / Low confidence**) paired with any consequential AI-generated value, following Chapter 33's Badge anatomy.
- Undo path (Ai-3): Chapter 25's Toast anatomy, extended to autonomous actions.

**Measurements:** Confidence levels use a **fixed 3-tier set (High/Moderate/Low)**, deliberately not a continuous percentage — "matching this Bible's recurring small-fixed-set pattern."

**Motion:** An agent-initiated change appearing in a live view uses the **Standard** motion tier — the same as ordinary content-update motion. No special, more dramatic treatment for agent-originated changes; the distinction is communicated through the visual marker, not motion novelty.

**Accessibility:** The agent-action marker and confidence label must both be available to assistive technology, not only sighted users.

**Do/Don't example:**
- **Do:** "3 leads auto-qualified [AI mark] — Moderate confidence — Undo" as one coherent, traceable log entry.
- **Don't:** The same three leads silently re-categorized with no visual distinction, no confidence indication, and no undo path.

**Named anti-pattern — "Invisible autonomy":** Shipping an agentic feature where autonomous actions are visually indistinguishable from user actions "because building the distinction felt like an unnecessary extra layer." Called a direct trust violation, "exactly analogous to Chapter 46's 'trust theater.'"

**Relevance to a marketing site vs. a product UI:** Chapter 71's principles are written for a **product/dashboard context** (agent-initiated changes to data, autonomous actions with undo paths) — not directly for a marketing site, which has no autonomous agent actions to mark. Its most directly portable elements for a marketing site are: (a) the confidence-vocabulary pattern (High/Moderate/Low, never implied by tone) if the site surfaces any AI-generated claims or demos, and (b) the general philosophical stance — don't invent a new AI visual language disconnected from the existing design system. The chapter itself notes it is "reasoned entirely in advance of any real agentic feature being built for Trady Perch's own tooling" and should be "revisited with real priority the first time such a feature actually ships" — i.e., it is explicitly labeled a first proposal, not battle-tested.

**Voice extension (forward pointer):** Chapter 72 (Voice) must resolve Ai-1 through Ai-3 into spoken equivalents (explicit verbal statement of agency, confidence, reversibility) since no visual marker is available in voice.

---

## Figma → Code Token Pipeline

### Token tier structure (exact 3-tier architecture, DSB Ch. 2)

**Core → Semantic → Component.** "A component's properties are never bound directly to a Core token — that binding is the single most common cause of a design system silently losing its dark-mode and theming coherence" and is a **publish-blocking finding**.

Four Variable Collections (mirroring the Foundations file page structure):
1. **`Core`** — raw color ramps, raw type scale, raw spacing scale, raw radius values. No modes.
2. **`Semantic — Color`** — purpose-bound color aliases. **One mode: Dark** (corrected in v1.1 erratum — originally miswritten as Light/Dark; DSB Ch. 52 "Dm-1" forecloses a user-toggleable light mode outright — Trady Perch has exactly one native visual identity, no light-mode toggle).
3. **`Semantic — Layout`** — spacing scale aliases, radius aliases, elevation aliases. No modes.
4. **`Breakpoint & Grid`** — responsive breakpoint values + per-breakpoint grid spec. No modes.

### Exact naming strings

- **Variables:** `category/tier/token-name`, all lowercase, hyphen-separated. Examples given verbatim: `color/core/neutral-900`, `color/semantic/text-primary`, `color/semantic/bg-surface-default`, `spacing/scale/4`, `radius/scale/sm`, `elevation/shadow/level-2`. This exact string (minus Figma's own leading category grouping) is what appears in the exported design-token JSON — "there is no separate 'designer name' and 'engineer name.'"
- **Color core tier:** `color/core/[hue]-[step]`, ramps typically 10–12 steps (`50` through `950`).
- **Color semantic tier examples:** Text — `text-primary`, `text-secondary`, `text-tertiary`, `text-disabled`, `text-on-brand`, `text-danger`, `text-success`. Background — `bg-canvas`, `bg-surface-default`, `bg-surface-raised`, `bg-surface-overlay`, `bg-surface-sunken`. Border — `border-default`, `border-subtle`, `border-focus`, `border-danger`. Icon — `icon-primary`, `icon-secondary`, `icon-on-brand`, `icon-danger`, `icon-success`. Interactive — `interactive-primary-default/hover/active/disabled`, `interactive-secondary-default/hover/active/disabled`.
- **Component tier:** created only on demonstrated need (e.g., `button-primary-bg` is NOT created if it would equal `interactive-primary-default`).
- **Typography:** Figma Text Styles, naming `type/[role]/[size]` — e.g. `type/heading/xl`, `type/body/md`, `type/label/sm`, `type/mono/md`. Responsive type handled as **parallel styles** (`type/heading/xl` and `type/heading/xl-mobile`), not a single fluid-type variable.
- **Spacing:** Core numeric scale `spacing/scale/[step]` (e.g. `2, 4, 8, 12, 16, 24, 32, 48, 64`), aliased at Semantic — Layout into use-bound names (`gap-icon-label`, `gap-form-field`, `padding-card-default`, `padding-button-md`).
- **Radius:** Core scale `radius/scale/none, xs, sm, md, lg, full`, aliased into `radius-interactive`, `radius-container`, `radius-avatar` (fixed to `full`).
- **Elevation:** `elevation/shadow/level-0` (flat) through `level-4` (modal/overlay), Figma Effect Styles.
- **Opacity:** `opacity/scale/disabled` = 0.4, `opacity/scale/hover-overlay` = 0.08, `opacity/scale/scrim` = 0.6.
- **Borders:** `border/width/default` = 1px, `border/width/emphasis` = 2px; always width token + semantic color token, never a hand-set stroke.
- **Breakpoints:** `breakpoint/mobile` (0–599), `breakpoint/tablet` (600–1023), `breakpoint/desktop` (1024–1439), `breakpoint/wide` (1440+); grid styles named `grid/[breakpoint]`.
- **Layout variables:** `layout/max-width/content`, `layout/max-width/dashboard`, `layout/sidebar/width-expanded`, `layout/sidebar/width-collapsed`.
- **Component names:** `Category/Component/Variant`, e.g. `Button/Primary`, `Card/Elevated`, `Nav/Sidebar/Desktop`. Slash-nesting mandatory.
- **Variant properties:** lower-kebab-case values, sentence-case property names — `Size: sm / md / lg`, `State: default / hover / focus / active / disabled / loading / error` (Ch. 71/DSB Ch. 39 state model — note the Figma plan's own Section 3.3 extends this to an **eight**-state canonical set: `default / hover / focus / active / disabled / loading / error / success`), `Emphasis: primary / secondary / tertiary / ghost / destructive`.
- **Layer names inside components:** semantic, never visual — `icon-leading`, `label`, `helper-text`; never `Rectangle 14` or `Group 3` (publish-blocking QA finding otherwise).
- **Files:** `TP · [Purpose]`, title case, middle-dot separator (e.g. `TP · Foundations`, `TP · Component Library`).
- **Branches:** `[initials]/[change-type]-[short-description]`, e.g. `jr/add-tooltip-variants`, `jr/fix-button-focus-ring`.

### Naming parity rule (Section 9.2) — the pipeline's load-bearing rule

"A Figma Variable's name and its exported token's name are the *same string*, transformed only by the mechanical case convention each platform requires": `color/semantic/text-primary` → `--color-semantic-text-primary` (CSS) → `colors.semantic.textPrimary` (JS token object). Never renamed, reorganized, or reinterpreted in translation. A proposed name that wouldn't produce a sensible code token name under this mechanical transform is **rejected at the naming stage**, before being built.

### Tooling specified

- **Export mechanism:** Figma's native **Variables REST API**, OR the **Tokens Studio** plugin — explicitly flagged as "evaluated at Milestone 1 against the native API for team fit" (not yet decided which).
- **Build step:** **Style Dictionary** (or equivalent) — generates CSS custom properties, a Tailwind config extension, and (once a mobile app exists) native-mobile token format.
- **Documentation site:** a Figma-to-site tool such as **Zeroheight** — "evaluated at Milestone 1" (also not finally decided).
- **Landing location:** a dedicated `design-tokens` package inside the Product Implementation Constitution's repository structure (PIC Ch. 7).
- **CI trigger:** export runs on every `MINOR` or `MAJOR` library publish, via the CI pipeline the PIC's Ch. 56 (Continuous Integration Standard) governs — never a manual one-time export.
- **Versioning:** semantic versioning (`MAJOR.MINOR.PATCH`) per library file — PATCH = visual correction, no API effect; MINOR = net-additive, backward-compatible; MAJOR = breaking change requiring a deprecation runway.

---

## Component Library Structure (per Figma plan)

### Workspace / file architecture

One Figma **Team**: `Trady Perch`. Four **Projects**: `00 · System`, `01 · Patterns & Templates`, `02 · Product`, `03 · Archive & Sandbox`. Eight files at launch (a ninth, Voice/Spatial, deliberately unbuilt until needed):

1. `TP · Foundations` — all tokens, no components.
2. `TP · Icon Library` — icon components, own versioning cadence.
3. `TP · Component Library` — every reusable UI component from DSB Volume II (Ch. 18–38), variant-complete, accessibility-checked. "The largest, most heavily governed file in the workspace."
4. `TP · Motion & Prototyping` — canonical interactive-prototype demos.
5. `TP · Patterns & Templates` — reusable UX patterns and full-page templates, including AI conversation surfaces.
6. `TP · Marketing & Website` — **landing pages, the marketing site, campaign pages** (this is the file the flagship website would live in, in `02 · Product`).
7. `TP · Client Dashboard & Enterprise`.
8. `TP · AI Product Surfaces` — every AI-mediated conversational/agentic interface.

Only three files are ever published as **Team Libraries**: Foundations, Icon Library, Component Library (Patterns & Templates becomes a fourth once component coverage is sufficient). No `02 · Product` file is ever published as a library — "a product file's job is to consume, never to originate."

### Component Library page order (mirrors DSB Volume II chapter order exactly)

`Cover & Changelog` → `Buttons & Actions` → `Cards & Containers` → `Navigation Systems` → `Forms & Inputs` → `Tables & Data Grids` → `Dialogs & Modals` → `Drawers & Sheets` → `Toasts & Notifications` → `Dropdowns, Menus & Popovers` → `Tabs & Segmented Controls` → `Breadcrumbs & Wayfinding` → `Search Interfaces` → `Tooltips & Contextual Help` → `Skeleton Loaders & Loading Patterns` → `Charts & Data Visualization` → `Badges, Tags & Status Indicators` → `Avatars & Identity Elements` → `Pagination & Disclosure Controls` → `Timelines & Steppers` → `Accordions & Expandable Content` → `Empty States & Zero-Data Design`.

Each component page: **Documentation → Component Source → Playground** (left to right).

### Atomic levels (4, deliberately not full "atomic design" vocabulary)

- **Primitives** — icons, Avatar, Badge, Spinner, raw Button.
- **Components** — Form Field, Card, Tab set, Dialog shell.
- **Patterns** — Data Table, Comment Thread, AI Message Exchange (live in `TP · Patterns & Templates`).
- **Templates** — full page skeletons (header/nav/content/footer) (also in `TP · Patterns & Templates`).
- Screens are explicitly **not** part of the library — one level above Templates.

### Build order (5 waves, strict dependency order)

Wave 1 (primitives, no deps): Icon set → Spinner/Loading → Avatar → Badge/Tag → Divider → Button → Link.
Wave 2: Form Field primitives (Text Input, Select, Checkbox, Radio, Switch, Textarea) → Tooltip → Card → Skeleton Loader.
Wave 3: Navigation Systems (Top Nav, Side Nav, Mobile Nav) → Tabs & Segmented Controls → Breadcrumbs → Dropdowns/Menus/Popovers → Search Interfaces.
Wave 4: Dialogs & Modals → Drawers & Sheets → Toasts & Notifications → Accordions & Expandable Content.
Wave 5 (highest-dependency): Tables & Data Grids → Pagination & Disclosure Controls → Charts & Data Visualization → Timelines & Steppers → Empty States & Zero-Data Design (deliberately built last, stubbed with placeholder earlier).

### Marketing-site-relevant patterns/templates (Section 5, in `TP · Patterns & Templates`)

- **Navigation:** Top Nav is the pattern "for marketing site and shallow product surfaces."
- **Landing Page Template** — hero, feature grid, social proof, CTA (UX Blueprint Ch. 50, Conversion Doctrine). Must be built on the correct breakpoint grid at **all four breakpoints from the start**.
- **Task Flow patterns**, **Multi-Step Wizard pattern**, **Confirmation & Interruption pattern** (3 sanctioned dialog archetypes: destructive-action confirm, unsaved-changes warning, informational acknowledge-only), **Error & Recovery pattern**.
- **Form Patterns:** Standard Form (label-above, inline validation, grouped sections) and Compact Form (dashboard-only). Must demonstrate all three DSB Ch. 48 validation timing modes: **on-blur, on-submit, real-time**.
- Per Section 8.2 (Screen Assembly), Landing Pages & Marketing Website screens are "assembled from the Landing Page Template (5.2), Top Nav (5.1), and marketing-specific Card and CTA compositions; held to UX Blueprint Part VI's conversion doctrine and the Brand Identity Manual's Part VII digital-presence standards."

### Governance / lifecycle (applies to any component built for the site)

Four lifecycle states: **Experimental → Stable → Deprecated → Archived.**
Review workflow: Self-QA → Design Review (peer) → Accessibility Check → Governance Approval (for MAJOR changes / new categories only) → Merge & Publish.
Quality gate (publish-blocking checklist): zero hardcoded values; zero default Figma layer names; all 8 canonical state variants present; all 10 documentation fields populated; both Light and Dark modes verified (NOTE: per the v1.1 erratum, there is actually only one mode, Dark — this line in Section 7.3's checklist appears to predate/not have been fully reconciled with the erratum, worth flagging); minimum target size (44×44px) and focus-state verified; naming convention followed exactly.
Ten-field documentation template (fixed order): Purpose, Anatomy, Variants & Properties, Usage Guidance, Do/Don't (min. 3 paired examples), Accessibility, Responsive Behavior, Motion, Engineering Notes, Version History.

### Roadmap (8 milestones, ~30–43 weeks / 7–10 months total)

Foundations (2–3 wks) → Tokens (3–4 wks) → Components (10–14 wks, ~35 components across 5 waves) → Templates (4–6 wks) → Screens (4–6 wks) → Prototype (3–4 wks, overlaps M3–M5) → QA (2–3 wks) → Developer Handoff (2–3 wks).

---

## Open Questions / Ambiguities

1. **AI Constitution chapters are not yet drafted.** The Architecture document is a table of contents with Purpose/Importance/Success-Criteria fields per chapter — it does not contain the actual finished rules, copy templates, or thresholds a chapter like "Ch. 79 Error Communication" or "Ch. 97 Sales AI Constitution" would eventually specify. Any website copy/UX decision that needs a literal rule from these chapters (e.g., exact banned phrases, exact confidence thresholds for a claim) has no source text yet — only a stated intent and a future success criterion. This is a judgment call the build team will have to make provisionally, flagged as "pending Ch. X" until that chapter is actually written.
2. **Tooling not finalized.** Both the token-export tool (Figma native Variables REST API vs. Tokens Studio plugin) and the documentation-site generator (Zeroheight vs. alternatives) are explicitly stated as "evaluated at Milestone 1" — i.e., undecided as of this plan's writing.
3. **Dark-mode-only conflicts with the Component Library's own QA checklist.** Section 2.6 and the v1.1 Erratum are explicit that Trady Perch has exactly one native visual identity (Dark) with no user-toggleable light mode. However Section 7.3's Quality Gates checklist still reads "Both Light and Dark modes (2.6) visually verified via the mode switcher" — this line was not corrected alongside the erratum and is an internal inconsistency in the plan itself (the erratum states "Sections 3–10 were checked and require no further change," but this checklist line in Section 7.3 appears to still reference two modes). Worth a build-team decision on how to interpret this line (likely means "verify the single Dark mode plus any independently-derived light variant per Dm-2/Dm-3," but it is not stated that way).
4. **No explicit marketing-site AI-copy chapter exists yet.** Neither source document contains a chapter specifically titled for marketing/website AI-capability copywriting; the closest analogues are Ch. 10 (Honest Incapacity), Ch. 97 (Sales AI Constitution — governs a sales *agent's* behavior, not marketing website copy per se), and DSB/UX Blueprint chapters referenced but not included in the three files read for this task (e.g., UX Blueprint Ch. 50 "Conversion Doctrine," Ch. 6 "Attention Ethics & Anti-Manipulation Stance," Brand Identity Manual Part XIII). A literal, final rule for "what the website's hero copy may claim about the product's AI" would need those upstream documents, which were out of scope for this read.
5. **Chapter 71's applicability to a marketing site is limited by design.** It is explicitly written for Trady Perch's own product tooling (dashboards, agent-initiated changes) and is self-labeled a "strong first proposal" not yet tested against a real agentic feature. A marketing site with no autonomous agent actions has little direct surface for Ai-1/Ai-3 (action markers, undo paths); only Ai-2's confidence-vocabulary convention (High/Moderate/Low, no tone-only certainty) is readily portable, and only if the site displays any AI-generated content/demo output.
6. **"Component tier" token creation threshold is qualitative, not quantitative.** The rule ("created only on demonstrated need... only where a specific component's requirement genuinely diverges") relies on judgment call per component; no objective test is given for when a component-tier token is "genuinely" needed vs. not.
7. **Milestone durations are estimates** assuming a "small, dedicated Design Systems function (2–3 designers plus part-time engineering liaison)" — actual team size/velocity for this specific website build is unstated and would need to be scoped separately.
