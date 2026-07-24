# UX Blueprint Synthesis
*Extracted from: Trady-Perch-UX-Experience-Blueprint-Architecture.md; Design System Bible Ch. 20 (Navigation Systems), Ch. 28 (Breadcrumbs & Wayfinding), Ch. 38 (Empty States & Zero-Data Design), Ch. 47 (Error Handling & Recovery Design).*

> **Critical framing note, stated up front so it governs how every section below is read:** The primary source, *Trady-Perch-UX-Experience-Blueprint-Architecture.md*, is explicitly **"not the UX / Experience Blueprint. This is its blueprint"** — an architecture/table-of-contents document for a planned 130-chapter Blueprint. Its closing line states outright: **"This architecture is now complete. No chapter has been written."** Every "chapter" cited from that source below is therefore a *planned chapter's stated purpose, reasoning, and importance* — not a finished specification, flow diagram, or literal sitemap. Concrete, literal, load-bearing rules in this synthesis come almost entirely from the four Design System Bible component chapters (20, 28, 38, 47), which are finished, numbered, ratified specifications. This distinction is flagged inline everywhere it matters.

---

## UX Philosophy

Literal, stated principles and doctrines (source: Blueprint Architecture unless noted):

- **"Confidence as the product"** (Ch. 2 thesis) — for an AI automation agency selling trust before capability, "the experience itself, not any single page, is the actual product being evaluated." A visitor cannot audit technical competence in a five-minute visit, so they substitute a proxy judgment: "does this experience behave like it was built by people who are competent and careful."
- **Trust accrues slowly, is lost fast** (Ch. 3) — "trust accrues slowly through many small consistent signals and can be destroyed by a single inconsistent one."
- **Trust Architecture sequencing** (Ch. 17, expanding MV §11.3) — trust signals are sequenced: **evidence before claim, specificity before generality, third-party validation before self-assertion.**
- **Cognitive Load Doctrine** (Ch. 4) — "working memory is finite, and every unnecessary decision, unexplained state, or ambiguous label spends a limited resource this Blueprint must budget as carefully as Motion Bible budgets simultaneous animation."
- **Peak-end rule** (Ch. 5, Ch. 16) — "humans remember the peak and the ending of an experience disproportionately," so the emotional arc "deliberately names which moments are allowed to be peaks."
- **Attention Ethics** (Ch. 6) — "a visitor's attention is borrowed, not owned." Forbids attention-capture tactics (compulsion-engineered infinite scroll, notification abuse) at the philosophy level.
- **Three Pillars division of labor** (Ch. 7) — "a color decision (Design System Bible), a timing decision (Motion Bible), and a sequencing decision (this Blueprint) are three different questions about the same moment."
- **Premium Experience Characteristics** (Ch. 8) — named, checkable qualities: **"anticipatory," "unhurried," "legible under stress."** Read through anticipation (seems to already know what you need next) and restraint (never asks for more than the moment requires).
- **Anti-cheap-experience taxonomy** (Ch. 9) — explicitly what makes an experience read as low-effort: "unexplained waits, dead ends, forms that discard input on error, generic confirmation copy."
- **Shallow-hierarchy IA principle** (Ch. 20, MV §12.1) — "a deep, hidden hierarchy reads as a system that doesn't trust the visitor to navigate it."
- **Menu minimalism as a conversion device** (MV §5.7, operationalized in DSB Ch. 20) — navigation's job "is not merely to display whatever items it's given, it is to make displaying too many items feel visibly, structurally awkward, so that restraint is the path of least resistance."
- **Progressive disclosure** (Ch. 23, MV §11.1) — "surface-level clarity first, depth on demand"; lets a visitor "self-select their own depth of engagement."
- **Single-CTA doctrine / anti-manufactured-urgency** (MV §5.2–§5.3, §5.5; Ch. 50, 54, 55) — conversion happens "through earned confidence, never manufactured pressure." Urgency/scarcity tactics (fake countdowns, manufactured low-stock claims) are **permanently forbidden**, not case-by-case judgment calls.
- **One-Brand-Many-Surfaces Model** (Ch. 59) — a single brand experience must remain "recognizably one thing" across website, web app, mobile app, and enterprise dashboard.
- **Honest uncertainty / no fabrication** (MV Ch. 19; echoed in DSB Ch. 47 Er-1) — "an invented, plausible-sounding cause is worse than admitting the cause is unclear."
- **Composed register in error/failure** (MV §2.2) — "how a recoverable error is handled is disproportionately revealing of this brand's composed personality trait; a well-designed recovery path can leave a visitor with more confidence than if the error had never occurred."
- **Curb-cut principle** (Ch. 88) — accessibility for permanent disability "frequently serves the widest population" (situational impairment: bright sunlight, broken arm, noisy environment).
- **Empty states are a real design moment** (DSB Ch. 38 philosophy) — rejects "a bare 'No data' or 'Nothing here' message" on the same grounds Master Vision §14.2 rejects thin/placeholder pages — "a genuinely thin empty state communicates the same lack of care a thin page would, merely at component scale rather than page scale."
- **Error handling protects trust more than the underlying bug does** (DSB Ch. 47 philosophy) — "panic or generic technical messaging at the moment something breaks undoes far more trust than the underlying bug itself."

---

## Sitemap / Page Inventory

**No literal, complete sitemap or page-by-page list is given anywhere in the five source documents.** The Blueprint Architecture document is a table of contents for future chapters (Ch. 20 "IA Philosophy & Sitemap Doctrine," Ch. 21 "Navigation Model Standard," etc.); those chapters do not yet exist. **Per the task instructions, the master prompt's own required-pages list should be used as the fallback sitemap source.**

What the source documents *do* mention, as page/section references embedded in other chapters' reasoning (not a curated inventory — captured here for completeness):

| Page / Surface | Where mentioned | Stated purpose / notes |
|---|---|---|
| Homepage | Ch. 8, Ch. 48, DSB Ch. 20 | Carries the "narrative arc" the nav must not dilute; hosts the Interactive AI Demo. |
| Interactive AI Demo (homepage section) | Ch. 48, citing MV Ch. 13 | "The single highest-leverage proof-of-capability moment on the homepage" — "the primary mechanism for resolving AI-capability doubt before a sales conversation ever occurs." |
| Solutions (nav item + dropdown) | DSB Ch. 20 Nv-2 example | Dropdown sub-items: **AI Agents, Workflow Automation, Custom Integrations, Intelligent Systems** (4 items, "matching Master Vision Chapter 13's own Solutions category count"). |
| Industries (nav item) | DSB Ch. 20 §16 (Future Expansion) | Future dropdown anticipated to cover "all seven named verticals from Master Vision" — exact seven not enumerated in these source docs; unresolved (see Open Questions). |
| Work (nav item) | DSB Ch. 20 example list | No further description given. |
| Pricing (nav item / page) | DSB Ch. 20 example list; Ch. 34, 51 | "The highest-anxiety moment in the buyer journey"; pricing psychology (anchoring, comparison) covered by a not-yet-written chapter. |
| Contact (nav item) | DSB Ch. 20 example list | No further description given. |
| FAQ | Ch. 52, citing "MV Ch. 13 item 13, FAQ" | Objection-resolving content, placed at journey moments where objections are objection-prone. |
| Case Studies (library/index + individual case study pages) | DSB Ch. 28 example | Breadcrumb example: **"Home / Case Studies / Northwind Logistics."** Ch. 26 (MV) names an "expanded case study library" as a roadmap item, implying it does not yet exist at full scale. |
| Client Dashboard / Client Portal | MV §25.2 (cited repeatedly); Ch. 82 | Named as "this brand's primary sustained-relationship surface" — explicitly a **future roadmap surface**, not part of the launch marketing site. |
| Web Application (generic authenticated surface) | Ch. 61 | Future/roadmap surface distinct from the marketing website. |
| Mobile App | Ch. 62 | Future/roadmap surface. |
| Enterprise/Admin Dashboard | Ch. 78–85 | Future/roadmap surface; "density, roles, and configuration replace the marketing site's simplicity." |
| Blog / "Resources" | DSB Ch. 20 §12 (DON'T example) | **Explicitly used as a cautionary example, not a planned page**: "Adding a sixth top-level item ('Resources') the moment a blog launches... is the exact one-item-at-a-time erosion Nv-1 ... exist[s] to prevent." If a blog ships, it must nest under an existing nav item's dropdown, not add a 6th top-level item. |
| Voice interface | Ch. 115 | Named future roadmap platform; no pages, since voice has none of "this Blueprint's visual affordances." |
| AR/VR (Spatial Computing) | Ch. 116 | Named future roadmap platform, "genuinely unresolved, and honestly presented as such." |

**Beyond a standard marketing site:** the source explicitly plans for a **Client Portal/Client Dashboard** (MV §25.2), a general **Web Application** surface, a **Mobile App**, an **Enterprise/Admin Dashboard** with roles and permissions, a **Voice interface**, and **AR/VR/spatial** and **multi-agent/autonomous** experience layers (Part XIV, Ch. 115–120) — all explicitly future/roadmap, not part of the current marketing site build. No page for these exists yet; they are named only as planning placeholders.

---

## Navigation Model

### Primary Navigation (source: DSB Ch. 20 — this is a finished, ratified specification, not a TOC entry)

- **Anatomy, left to right:** Logo (leftmost) → Primary Items (up to 5) → Primary CTA (rightmost, structurally separate).
- **Nv-1 — Five Primary Items, Hard Ceiling:** "The primary navigation bar contains no more than five top-level items (excluding the logo and the primary CTA...), full stop." Example given (also used in the DO example): **Solutions, Industries, Work, Pricing, Contact** — "five items, at the ceiling." A dropdown's sub-items do not count against this ceiling but are separately capped by Nv-2.
- **Nv-2 — Dropdown ceiling:** No more than **4 sub-items** per dropdown. Example: Solutions → AI Agents, Workflow Automation, Custom Integrations, Intelligent Systems. A single "View All" link at the bottom, leading to a fuller index page, is explicitly permitted and does **not** count as a 5th sub-item.
- **Nv-3 — Primary CTA:** A single gold-accented primary CTA is **always present, at every breakpoint**, structurally distinct from the five ordinary items, **never counted against the 5-item ceiling**, and **never dropped from mobile to save space** (ordinary items compress/collapse first). Literal example label used twice in the chapter: **"Book a Strategy Call."**
- **Nv-4 — Scroll-responsive recession, never disappearance:** Nav bar may recede (increase transparency, reduce size) scrolling down, and must "promptly reassert full visibility the moment the visitor scrolls upward" — it **never disappears entirely**. Glass-nav opacity: baseline ~72%, recedes to ~55% (must stay above minimum contrast threshold). CTA legibility must never drop below threshold even while receded.
- **States:** Hover = quick-tier underline reveal. Focus = gold ring, strict keyboard tab order (logo → items → CTA). Active = persistent (not hover-only) underline on current page's item. Disabled = **not applicable — nav items are never disabled; if a destination is unavailable, the item is removed entirely, not shown disabled.** Empty = **not applicable — a nav bar with zero items is not a valid configuration.**
- **Motion:** Recede = Standard tier (300ms); reassert = Quick tier (150ms) — a deliberate asymmetry (slow to quiet down, fast to restore orientation). Dropdown open/close = Quick tier, Entrance/Exit curves.
- **Mobile/responsive:** At Mobile and most of Tablet range, the five items collapse into a **full-screen or slide-in menu** (via Chapter 24 "Drawers"), accessed via a menu icon, preserving the dark-glass/gold visual language rather than "a generic hamburger-and-white-dropdown pattern." **The CTA remains visible in the collapsed mobile bar itself — it is not hidden inside the menu drawer.**
- **Keyboard/accessibility:** Full nav, including open dropdowns, is completely keyboard-operable in logical tab order. Dropdowns open via **both** hover and explicit keyboard activation (Enter/Space) — **never hover-only.** CTA stays in tab order at a fixed position (immediately after the last Primary Item) regardless of scroll state.
- **Conversational/voice analogue** (Ch. 20 §10): an AI assistant should offer "a comparably small, bounded set of options, never an exhaustive list read aloud" — the 5-item ceiling's spoken equivalent.

### Footer Navigation

**Not specified in any of the five source documents.** No footer structure, links, or content requirements are given. This is an explicit gap.

### Mobile Navigation Pattern

Per DSB Ch. 20 §9 (see above): full-screen or slide-in drawer menu via menu icon at Mobile/most-Tablet breakpoints; CTA stays visible outside the drawer at all times. No further mobile-specific interaction detail (gesture handling, drawer animation specifics) is given in these five documents — deferred to Chapter 24 (Drawers) and Chapters 49–51 (platform standards), neither of which was in scope for this extraction.

### Breadcrumbs / Wayfinding (source: DSB Ch. 28 — finished specification)

**Important framing, stated explicitly in the source:** *"The launch site's architecture is intentionally shallow (Master Vision Chapter 14), so breadcrumbs carry low urgency today."* Breadcrumbs are specified now for a **future** deeper hierarchy (expanded case study library, client dashboard) — not asserted as required on the initial marketing site launch.

- **Wf-1 — Real hierarchy only:** every breadcrumb level must be a genuine, actually-navigable ancestor page — never a fabricated or shortened path.
- **Wf-2 — Current page shown, never clickable:** final breadcrumb item is visible but not a link.
- **Wf-3 — Max 4 levels deep:** beyond four levels, truncate the middle behind an ellipsis, always preserving the first (home) and final two levels. Trails of 4 levels or fewer display in full — truncation is not a general space-saving habit (explicit DON'T: skipping a real "Case Studies" level to shorten a 3-level trail is disallowed).
- **Anatomy:** Home icon/label → intermediate ancestor links (chevron separators) → current page (non-clickable, unstyled as a link).
- **Example (literal, from source):** "Home / Case Studies / Northwind Logistics."
- **Mobile:** may collapse to a 2-level minimum (immediate parent + current page) with tap-to-expand for the full trail, rather than wrapping across lines.
- **Accessibility:** implemented with a semantic navigation landmark and ordered-list structure; current page explicitly marked as such (not an ambiguous final link) for assistive tech.
- **Voice analogue:** the AI states location plainly on request — e.g., "You're currently in the Northwind Logistics case study, under Case Studies" — same real-hierarchy principle (Wf-1), never a shortened/invented path.
- **Open/unresolved (explicitly flagged in source, §16):** "This chapter's rules have not yet been tested against a real deep hierarchy, since none currently exists on the live site."

---

## User Journeys / Flows

These are drawn from planned-chapter *descriptions* in the Blueprint Architecture (not finished flow specs — no step-by-step flow is actually laid out in the source):

- **Visitor → Lead:** Ch. 56 "Lead Capture & Qualification Experience" — governs "what to ask, when, and how much value must be demonstrated first to justify the request." States over-asking causes abandonment; under-asking creates unqualified leads.
- **Lead/Visitor → Committed Action (booked call / signed engagement):** Ch. 34 "Checkout & Conversion Flow Doctrine" — "the sequence from considered intent to committed action," described as "the highest-stakes flow in the entire Blueprint," where pricing anxiety is "actively, sequentially reduced."
- **Sale → Product Access:** Ch. 57 "Sales-to-Product Handoff Experience" — the transition from human sales conversation to dashboard access/onboarding; flags risk of "the polished sales experience giving way to a rough, unfinished product onboarding."
- **New user → Activated user:** Ch. 42–49 (Part V, Onboarding & First Experience). Ch. 43 "Activation Doctrine" defines activation as "the specific first meaningful action (not merely account creation) that predicts long-term engagement." Ch. 44 spreads onboarding across several sessions rather than front-loading it.
- **Visitor → AI Demo interaction:** Ch. 48 "Demo & Trial Experience Design," full experiential spec for MV Ch. 13's Interactive AI Demo — "the primary mechanism for resolving AI-capability doubt before a sales conversation ever occurs."
- **Case study reader:** implied via Ch. 24 (wayfinding) and Ch. 53 "Social Proof & Trust-Signal Architecture" — testimonials/case studies sequenced so they "corroborate a claim the visitor has already begun to believe," not presented too early.
- **Established client → long-term relationship:** Part XIII (Ch. 108–114): Ch. 108 "Post-Purchase Experience Doctrine," Ch. 109 "Relationship Maturation Model" (less hand-holding as a client relationship matures), Ch. 110 "Loyalty Architecture" (loyalty via genuine value, never lock-in/switching-cost manipulation — that's forbidden by Ch. 94), Ch. 111 "Churn Signal & Win-Back Experience" (early disengagement signals, response must never use forbidden notification pressure), Ch. 113 "Offboarding & Graceful Exit Design" (dignified cancellation/exit, extending Ch. 94's prohibition on manipulative cancellation flows).
- **Enterprise buyer vs. daily operator divergence:** Ch. 81 explicitly names that "the person who buys an enterprise product... and the person who uses it daily... are frequently different people with different journeys through the same product."

### Conversion Paths & CTAs Emphasized

- **Single-CTA-per-view doctrine** (MV §5.2–§5.3, Ch. 54): one clear CTA repeated at the right cadence, never a competing multiplicity.
- The concrete, named CTA throughout the navigation spec is **"Book a Strategy Call"** (gold, always present, DSB Ch. 20).
- **Anti-urgency/anti-scarcity prohibition** (Ch. 55, MV §5.5): explicit, **permanent** forbidding of fake countdown timers and manufactured low-stock claims — framed as "more durable than a case-by-case judgment call."
- **Dark-pattern prohibition** (Ch. 94, enumerated but not fully detailed in source): confirm-shaming, forced continuity, hidden costs disclosed only at final checkout, roach-motel cancellation flows — named as examples of the forbidden catalog, not exhaustively listed.
- **Objection-handling placement** (Ch. 52): objection-resolving content (FAQ, technical detail, case evidence) placed at journey moments identified as objection-prone, not dumped in an undifferentiated catch-all section.

---

## Interaction & Feedback Patterns

### Error States (source: DSB Ch. 47 — finished specification)

- **Er-1 — Three-part structure, always:** every error message states **(1) what happened, (2) why, if genuinely known, (3) a specific next action.** The "why" may be honestly omitted if genuinely unknown — never invent a plausible-sounding cause.
  - Example given: *"We couldn't save your changes. Your connection may have dropped. Please try again."*
  - Example given: *"We couldn't process your payment. Your card may have insufficient funds. Try a different card, or contact your bank."*
  - Explicit DON'T: *"Error: Payment failed. Invalid input."* — no next action, ambiguous cause, cold tone.
- **Er-2 — No lost work on recovery:** a failed submission (form, upload, multi-step process) **preserves every already-entered value**; only the failed action itself needs repeating.
- **Er-3 — Never blame the user in tone:** neutral, requirement-stated phrasing only. Example: *"This field requires a valid email address"* (correct) vs. *"You entered an invalid email address"* / *"You didn't enter a valid email address"* (incorrect — attributes fault even subtly).
- **Length:** ~1–2 short sentences maximum.
- **Motion:** no new motion beyond Chapter 39's existing Error-state entrance (Standard tier, Entrance curve).
- **Accessibility:** the 3-part structure is described as serving screen-reader users *even more* than sighted users, "since they cannot supplement an incomplete message with surrounding visual context as readily."
- **AI parity:** MV §19.7 already specifies the AI's own error/apology behavior; Er-1/Er-3 are stated to be "the direct system-wide generalization of that same standard to every non-AI error surface" — i.e., the AI's honest, blame-free tone is the system's universal default, not a special exception.

### Empty States (source: DSB Ch. 38 — finished specification)

- **Em-1 — Name what's missing and why, never generic:** distinguishes cause explicitly. Examples given:
  - *"No case studies match your current filters"* (filtered-to-zero state).
  - *"You haven't published any case studies yet"* (genuinely empty/new state).
  - These are never collapsed into one generic message.
- **Em-2 — Offer a next action wherever one genuinely exists:** e.g., *"No case studies match your current filters — [Clear Filters]"* (Secondary-emphasis button). Do **not** invent a button where no single, unambiguous action helps (e.g., a correctly-zero-result specific search).
- **Em-3 — Calm styling, never Error styling:** uses `text.secondary` and a quiet 48px icon — **never** Error colors/iconography, even when the emptiness resulted from a failed action. A failed fetch is Chapter 39's Error state, not the Empty state, even though both can look like "nothing visible" at a glance.
- **Anatomy:** Icon (48px, `text.secondary`) → Headline (names what's missing) → optional supporting text (why) → optional single Action button (max 1 action button).
- **Motion:** Standard tier (300ms), Entrance curve — should feel like "a settled, deliberate reveal, not an abrupt swap" when replacing a loading skeleton.
- **Accessibility:** the empty-state message is announced to assistive technology when it replaces previously-loading or previously-populated content, so a screen-reader user knows the result set is genuinely empty rather than assuming a loading failure.
- **AI/voice parity:** a plain spoken acknowledgment, e.g., *"I don't have anything matching that yet"* — same specific-naming (Em-1) and calm-not-alarmed tone (Em-3).

### Loading States

**Not covered in these five source documents.** Loading is referenced only as one of the "eight canonical states" defined elsewhere (Design System Bible Ch. 39, not in scope for this extraction) and by the Motion Bible (Ch. 54, Ch. 90–99), also out of scope. No exact loading-state rules were extracted.

### Form Flows

**Only a chapter-purpose description exists, not exact rules.** Ch. 32 "Form Flow Doctrine" (Blueprint Architecture) is described as governing "field ordering logic, when to split a long form into steps... versus keep it single-page, and how much is asked before value is demonstrated in return" — but the chapter itself has not been written, so no literal field-ordering rule, step threshold, or specific pattern is given in the source.

### Confirmation / Interruption

Only a chapter-purpose description exists (Ch. 37, "Interruption & Confirmation Flow Standard"): confirmation should be reserved for destructive/irreversible actions; over-confirming "trains users to click through confirmations without reading them." No exact rule (e.g., which specific actions require confirmation) is given.

---

## Accessibility & UX Requirements

Concrete, stated-in-these-documents rules only (a fuller accessibility chapter exists elsewhere and is out of scope for this extraction — Blueprint Part X, Ch. 86–92, and Design System Bible Ch. 53, are referenced repeatedly but not read in full here):

- **Navigation (DSB Ch. 20 §8):** full nav, including open dropdowns, is completely keyboard-operable in logical tab order (logo → items → CTA). Dropdowns must be openable via **both** hover and explicit keyboard activation (Enter/Space) — never hover-only. The CTA stays in the tab order at a fixed, predictable position, not moved based on scroll state. Focus state = gold ring per item (Chapter 39 default).
- **Breadcrumbs (DSB Ch. 28 §8):** implemented with a semantic navigation landmark and ordered-list structure; current page explicitly marked as such for assistive technology (not an ambiguous final link).
- **Empty states (DSB Ch. 38 §8):** message is announced to assistive technology when replacing loading/populated content.
- **Error messages (DSB Ch. 47 §8):** the mandatory 3-part structure (Er-1) is framed as disproportionately serving screen-reader users, who cannot supplement an incomplete message with surrounding visual context.
- **Blueprint Part X (Ch. 86–92) exists only as planned-chapter purposes**, e.g.: Ch. 87 "Cognitive Accessibility Doctrine" (memory/attention/processing differences, beyond WCAG visual/technical mapping), Ch. 88 "Situational & Temporary Impairment Design" (curb-cut principle), Ch. 89 "Plain Language & Comprehension Standard" (reading-level ceiling, jargon governance), Ch. 91 "Economic & Access Inclusivity" (older devices, slower connections, smaller data plans). None of these have literal rules specified in the source — purposes only. A deeper accessibility chapter/document is noted to exist beyond this Blueprint's scope, per the task's own framing.

---

## Content & Microcopy Guidance

- **Error copy** (Er-1, Er-3, DSB Ch. 47): 1–2 sentences max; structure = what happened → why (if known) → next action; tone always neutral, requirement-stated, never blaming the user. Never fabricate a plausible-sounding but unknown cause.
- **Empty-state copy** (Em-1, DSB Ch. 38): must name the specific missing content and, where determinable, why — never a generic "Nothing here" / "No data" line.
- **Navigation labels** (literal examples given, DSB Ch. 20): **Solutions, Industries, Work, Pricing, Contact**; dropdown sub-items under Solutions: **AI Agents, Workflow Automation, Custom Integrations, Intelligent Systems**; CTA label: **"Book a Strategy Call."** (These are stated as illustrative examples matching the 5-item/4-item ceilings, not necessarily final confirmed IA — treat as strong precedent, not certain literal copy for the live site.)
- **Breadcrumb format** (literal example, DSB Ch. 28): **"Home / Case Studies / Northwind Logistics"** — slash-separated, chevron icon separators in implementation.
- **Voice/AI parity copy examples:** *"I don't have anything matching that yet"* (empty state); *"You're currently in the Northwind Logistics case study, under Case Studies"* (location/wayfinding).
- **General tone doctrine cited but not detailed here:** MV §2.2's "composed, precise" register underlies all of the above; Ch. 16 brevity doctrine (from AI copy) is cited as the source for the error-message length ceiling.

---

## Open Questions / Ambiguities

Explicitly flagged as unresolved in the source, or absent and requiring a judgment call:

1. **No literal, complete sitemap exists anywhere in these documents.** The Blueprint Architecture is a table of contents for unwritten chapters; Ch. 20 "IA Philosophy & Sitemap Doctrine" and Ch. 21 "Navigation Model Standard" — the chapters that would contain an actual sitemap — do not yet exist. **Use the master prompt's own required-pages list as the fallback source of truth for the sitemap.**
2. **No footer navigation structure is given at all** — not even an example, unlike primary nav. Full judgment call required.
3. **Industries dropdown contents are unresolved.** DSB Ch. 20 §16 explicitly flags: "a future Industries dropdown covering all seven named verticals from Master Vision... would need to decide whether all seven fit as direct sub-items or whether some are demoted behind a 'View All' link — this should be resolved with real content once the Industries section's final structure is confirmed." The seven verticals themselves are not enumerated in these five documents.
4. **Breadcrumb truncation (Wf-3) is explicitly untested.** DSB Ch. 28 §16: "This chapter's rules have not yet been tested against a real deep hierarchy, since none currently exists on the live site."
5. **Whether the marketing site needs breadcrumbs at launch at all is ambiguous by design.** The source states breadcrumbs "carry low urgency today" given the site's "intentionally shallow" architecture, and specifies them mainly for a future case-study library/dashboard. A judgment call is needed on whether to implement breadcrumbs at launch or defer.
6. **Mobile nav visual/interaction detail beyond "full-screen or slide-in drawer" is not specified** in these five documents — deferred to Design System Bible Chapter 24 (Drawers) and Chapters 49–51 (platform standards), which were out of scope for this extraction.
7. **Loading-state rules are entirely absent** from these five documents (only referenced as existing in Design System Bible Ch. 39 and Motion Bible Ch. 54/90–99, both out of scope here).
8. **Form flow specifics (field ordering, single-page-vs-multi-step threshold) are not given** — Ch. 32 "Form Flow Doctrine" exists only as a stated purpose, not a written specification.
9. **Confirmation/interruption rules (which actions require confirmation) are not enumerated** — Ch. 37 exists only as a stated purpose.
10. **Nav item/CTA copy ("Solutions, Industries, Work, Pricing, Contact," "Book a Strategy Call") are illustrative examples inside a component spec, not a confirmed, final content decision** — worth treating as strong precedent but verifying against the master prompt's own required page/nav list before treating as final.
11. **The dark-pattern catalog (Ch. 94) is referenced with only a partial example list** (confirm-shaming, forced continuity, hidden costs at final checkout, roach-motel cancellation) — the "full enumeration" chapter itself is unwritten, so this list should not be treated as exhaustive.
12. **Almost the entire Blueprint (all 130 chapters) is, by the source's own admission, "reasoned but not yet validated against real usage"** (Ch. 100, Ch. 128 — Experience Debt Register) — every judgment call sourced from a Blueprint chapter description (as opposed to the four finished DSB component chapters) should be treated as directional intent, not a locked specification.
