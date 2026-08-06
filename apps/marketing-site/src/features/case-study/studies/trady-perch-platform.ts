import type { CaseStudy } from "../case-study-types";

/**
 * Case study: the Trady Perch platform.
 *
 * ── Every claim in this file is checkable ─────────────────────────────────
 *
 * This documents the codebase that serves the page you are reading, which
 * makes it the one project here where a reader can verify literally every
 * statement — by viewing source, by opening the repository, or by running the
 * audit scripts themselves. The figures in `results` are outputs of commands
 * in this repo, not estimates:
 *
 *   npm run test                         -> test totals
 *   npm run build                        -> route count and prerender split
 *   npm run test:a11y  (33 routes)       -> WCAG 2.1 AA violations
 *   npm run test:schema                  -> structured-data blocks
 *
 * Nothing here claims a business outcome, a client, or a revenue effect,
 * because none exists to claim. The results section is deliberately technical
 * for exactly that reason — see the docblock on `CaseStudy["results"]`.
 */
export const TRADY_PERCH_PLATFORM: CaseStudy = {
  slug: "trady-perch-platform",
  repoName: "TRADY-PERCH-WEBSITE",

  hero: {
    category: "Design systems & platform engineering",
    title: "A marketing site built like a product",
    standfirst:
      "A TypeScript monorepo where design tokens compile to CSS, a framework-agnostic component library consumes them, and accessibility is a build step rather than an intention.",
    // Captured from the running site at 1440x900 on a 2x display, so the
    // master is 2880 wide and next/image downscales per breakpoint from it.
    image: {
      src: "/case-studies/trady-perch-platform/home-desktop.webp",
      alt: "The Trady Perch homepage: the headline 'The manual work slowing your business down, rebuilt into systems that run themselves' beside a dark 3D pyramid lit with gold.",
      width: 2880,
      height: 1800,
    },
  },

  snapshot: {
    facts: [
      { label: "Platform", value: "Marketing platform" },
      { label: "Industry", value: "AI & automation services" },
      { label: "Team", value: "Solo build" },
      { label: "Architecture", value: "Monorepo" },
      { label: "Pages", value: "36", countTo: 36 },
      { label: "Rendering", value: "Static-first" },
    ],
  },

  overview: {
    heading: "The site is the proof",
    lede: "An AI engineering firm whose own site is a template has already answered the question a prospective client is asking.",
    body: [
      "Trady Perch sells engineering judgement. That makes its own website an unusually load-bearing artefact: it is the first and often only piece of the firm's work a prospective client will inspect before deciding whether to talk. A page assembled from a theme communicates something true about the practice behind it, and it is not the thing you want communicated.",
      "So the site was built the way a product is built — as a monorepo with a design-token pipeline, a component library that does not depend on the framework rendering it, and a set of audit scripts that fail the build rather than filing a ticket. None of that is visible to a visitor who is only reading the copy. All of it is visible to the one who opens the repository, which is precisely the visitor worth convincing.",
      "The audience is a business owner with an established operation and a real problem, who has been burned by an agency before and is trying to work out whether this time is different. Everything below is downstream of that one reader.",
    ],
  },

  challenges: {
    lede: "None of these were unknowns. They were all decisions that had to be made correctly and then held.",
    items: [
      {
        title: "A dark theme that stays legible",
        body: "A near-black palette makes it trivially easy to fail contrast without noticing, because low-contrast grey on black looks tasteful to a designer and is unreadable to a large share of visitors. The palette had to be dark-native and pass WCAG AA on every surface, including surfaces that did not exist yet.",
      },
      {
        title: "Motion that is felt, not watched",
        body: "Scroll animation is the fastest way to make a site feel cheap. Every moving element had to justify itself, respect prefers-reduced-motion without a per-component branch, and never be the mechanism by which content arrives — so that a visitor with JavaScript disabled still sees everything.",
      },
      {
        title: "A content-security policy that survives contact with reality",
        body: "The site shipped through nine milestones with no response security headers at all. Adding them retroactively meant working out which of the existing architecture a strict CSP would break — and, when nonce-based CSP turned out to be incompatible with static generation, deciding which of the two to keep.",
      },
      {
        title: "Portability the framework cannot enforce",
        body: "The component library needed to outlive this app. That rules out importing next/link or next/image anywhere inside it, which in turn means solving navigation and images through injection instead — a constraint that is easy to state and easy to violate accidentally.",
      },
      {
        title: "A live data feed on a static site",
        body: "The projects section reads GitHub. Doing that naively makes every page render per-request and hands a third-party API the site's uptime. The feed had to be live without the site becoming dynamic.",
      },
      {
        title: "Accessibility that cannot regress",
        body: "Auditing a site once is a snapshot. The requirement was that a contrast failure or a broken heading order introduced six months from now fails the build on the commit that introduces it, not in a review that may never happen.",
      },
    ],
  },

  research: {
    lede: "The decisions that shaped the codebase, including what each one cost.",
    decisions: [
      {
        question: "How should design decisions reach the CSS?",
        choice: "A token pipeline: JSON compiled to CSS custom properties and a typed TS export.",
        rationale:
          "Two consumers need the same values for different purposes — stylesheets need CSS variables, and a handful of places (the mobile browser-chrome theme colour, for instance) need the value in JavaScript. Compiling both from one JSON source means they cannot drift. 99 core and 40 semantic tokens are generated on every build.",
        tradeoff:
          "A build step before anything renders, which is why `predev`, `prebuild` and `pretypecheck` all run it. Forget that wiring once and the app fails with an unhelpful error about a missing stylesheet.",
      },
      {
        question: "Tailwind, CSS-in-JS, or CSS Modules?",
        choice: "CSS Modules composing design tokens.",
        rationale:
          "The component library has to work outside Next.js, which rules out anything requiring a specific runtime. CSS Modules are a bundler feature, not a framework one, and `composes` gives real style reuse without a utility vocabulary layered on top of the token vocabulary that already exists.",
        tradeoff:
          "No utility classes, so one-off spacing needs a named class. In practice that is a feature — it makes ad-hoc values visible in review rather than hidden in a class string.",
      },
      {
        question: "Nonce-based CSP, or static generation?",
        choice: "Static generation, with `script-src 'unsafe-inline'`.",
        rationale:
          "Next's automatic nonce injection only reaches HTML rendered per request. Every page on the site is prerendered at build time — before any request, and therefore before any nonce, exists. Forcing the whole site dynamic to support a nonce would trade real, load-bearing performance architecture for a marginal gain against an attack surface this site does not have: there is no user-controlled content rendering path anywhere in the codebase.",
        tradeoff:
          "Inline scripts are not blocked. Every other directive holds — same-origin script, style, image and font sources, no framing, no third-party form targets — and the decision is recorded as an ADR rather than left as an unexplained gap.",
      },
      {
        question: "How does a live GitHub feed coexist with a static site?",
        choice: "Incremental static regeneration on a one-hour cadence, with the fetch cached at the same interval.",
        rationale:
          "The page is prerendered and served from the CDN as a static document; the first request after the hour elapses triggers a background rebuild and still gets an instant response from the existing copy. Visitors never wait on GitHub, and GitHub sees one request an hour rather than one per visitor — 0.06% of the authenticated rate limit.",
        tradeoff:
          "A push can take up to an hour to appear. For a portfolio that is well inside what anyone expects, and an on-demand cache tag exists for when it is not.",
      },
      {
        question: "How do you keep a credential out of the browser by construction?",
        choice: "`import \"server-only\"`, no NEXT_PUBLIC_ prefix, and a source-level test.",
        rationale:
          "The `server-only` package turns a client-side import of the GitHub API layer into a build failure rather than a leak found in production. The absent prefix means Next has no mechanism to inline the value. A test reads the source files to assert the marker is still present, because the test environment stubs the package and so could never catch its removal at runtime.",
        tradeoff:
          "One more dependency, and a vitest alias to make the service layer testable at all. Both are documented at the point where someone would otherwise be confused by them.",
      },
      {
        question: "Where should accessibility be enforced?",
        choice: "In CI, against every route, in a real browser.",
        rationale:
          "jsdom cannot evaluate colour contrast, because it does not compute styles from real CSS. So the audit boots the app and drives Chromium with axe-core across every route, treating WCAG 2.1 A/AA as blocking and AAA as advisory. Landmark and heading-order rules run as a separate pass, because axe tags those 'best-practice' rather than 'wcag2a' and a tag-based filter silently never runs them.",
        tradeoff:
          "The audit takes minutes rather than seconds, and needs a browser binary in CI. That is the price of the check being real.",
      },
    ],
  },

  solution: {
    heading: "Three packages and an app",
    lede: "The shape of the thing, and why it is shaped that way.",
    body: [
      "`@trady-perch/tokens` owns every colour, space, radius, shadow and type step as JSON, and compiles them to both CSS custom properties and a typed TypeScript export. `@trady-perch/motion` does the same for duration and easing, and ships a paired reduced-motion value for every duration so that honouring the preference is a media query applied once rather than a branch in each component.",
      "`@trady-perch/ui` is the component library, and it imports nothing from Next.js. Where a component needs to navigate it accepts a `linkComponent` prop, and the app injects a thin adapter around next/link in exactly one file. That single constraint is what makes the library portable, and it is enforced by an architecture decision record rather than by hope.",
      "The marketing site composes those three. It is static-first by default: every page is prerendered at build time with no request involved, and the two that read GitHub are prerendered too, on a one-hour regeneration cycle. The result is a site that serves as fast as a static export while showing data that is never more than an hour old.",
    ],
  },

  features: {
    lede: "The parts a visitor never sees, which are the parts that make the parts they do see hold up.",
    items: [
      {
        icon: "layers",
        title: "A token pipeline, not a variables file",
        description:
          "139 design tokens compile from JSON into CSS custom properties and a typed TypeScript module on every build, so the value a stylesheet paints and the value a component reads can never disagree.",
        benefits: [
          "Core and semantic layers, so a palette change is one edit",
          "Typed export for the handful of values consumed in logic",
          "Regenerated before dev, build and typecheck alike",
        ],
      },
      {
        icon: "access",
        title: "Accessibility as a build gate",
        description:
          "axe-core runs in real Chromium against every route on every CI run. WCAG 2.1 A/AA violations fail the build; AAA findings warn. A separate pass covers landmark and heading-order rules that a tag filter would silently skip.",
        benefits: [
          "Contrast checked against real compiled CSS, not jsdom stubs",
          "Keyboard audit for skip link, dropdowns, drawer focus trap",
          "Currently zero A/AA violations sitewide",
        ],
      },
      {
        icon: "bolt",
        title: "Static-first rendering",
        description:
          "Almost every route is prerendered at build time and served as a static document. The two that read a third-party API are prerendered as well, refreshed hourly in the background.",
        benefits: [
          "No visitor ever waits on an upstream API",
          "One upstream request per hour regardless of traffic",
          "Live data without giving up CDN delivery",
        ],
      },
      {
        icon: "shield",
        title: "A security baseline with its reasoning recorded",
        description:
          "A full OWASP-baseline header set — CSP, HSTS, frame options, referrer and permissions policy — plus a documented decision explaining precisely which directive was relaxed and what was weighed against what.",
        benefits: [
          "Same-origin script, style, image and font sources",
          "Rate limiting and honeypot handling on the contact endpoint",
          "Server-only credential access, enforced at build time",
        ],
      },
      {
        icon: "flow",
        title: "A portfolio that maintains itself",
        description:
          "The projects section reads the GitHub REST API, filters repositories against nine portfolio categories using token-boundary matching, and ranks them. Nothing on the page is hand-maintained.",
        benefits: [
          "Forks, archives, templates and empty repos excluded automatically",
          "Editorial layer for the judgements an API cannot make",
          "Graceful empty and error states, with a retry that re-runs only the server components",
        ],
      },
      {
        icon: "check",
        title: "Tests that encode reasoning",
        description:
          "408 tests across the app and the component library, weighted toward the decisions that would be expensive to get wrong quietly — filter boundaries, URL validation, credential containment, reduced-motion behaviour.",
        benefits: [
          "Security cases covered explicitly, including javascript: URL rejection",
          "Source-level assertions where a runtime test could not reach",
          "Deterministic ordering verified, so rebuilds produce identical HTML",
        ],
      },
    ],
  },

  engineering: {
    lede: "The full stack, and the reason behind each layer rather than a list of logos.",
    layers: [
      {
        area: "Frontend",
        summary:
          "Next.js App Router with React Server Components as the default, and client components treated as a cost to be justified.",
        detail: [
          "The project grid renders nine cards with zero hydration roots — hover, glow, stagger and reveal are all CSS",
          "Pointer-driven depth is one delegated listener on the grid, not one per card",
          "Client islands are scoped to the smallest element that genuinely needs state",
        ],
      },
      {
        area: "Design system",
        summary:
          "A three-package monorepo: tokens, motion, and a framework-agnostic component library.",
        detail: [
          "packages/ui imports nothing from Next.js; navigation arrives by injection",
          "Duration and easing tokens ship with paired reduced-motion values",
          "CSS Modules with `composes` for reuse, so section rhythm is defined once",
        ],
      },
      {
        area: "Data",
        summary:
          "The GitHub REST API, read server-side, validated at the boundary, and cached at the framework layer.",
        detail: [
          "Runtime type guards on every repository object — one malformed entry costs one card, not the page",
          "Typed failure reasons rather than thrown exceptions, so the UI renders a state",
          "Rate-limit headers monitored, with a warning logged below 25% of budget",
        ],
      },
      {
        area: "Security",
        summary:
          "Defence in depth on a site with no authenticated surface, because the absence of one is not a reason to skip the baseline.",
        detail: [
          "CSP, HSTS (2 years, includeSubDomains), X-Frame-Options DENY, nosniff, referrer and permissions policy",
          "Credential access confined to a `server-only` module with no NEXT_PUBLIC_ prefix",
          "Contact endpoint: rate limited, honeypot-aware, header-injection hardened, malformed bodies rejected cleanly",
        ],
      },
      {
        area: "Accessibility",
        summary:
          "WCAG 2.1 AA enforced in CI against every route, plus a dedicated keyboard-navigation audit.",
        detail: [
          "Skip link verified as the first tab stop and confirmed to move real focus",
          "Drawer focus trap, Escape-to-close and focus restoration all asserted",
          "prefers-reduced-motion handled as a media query, once, never per component",
        ],
      },
      {
        area: "Performance",
        summary:
          "Static delivery, optimised images through the same-origin optimiser, and a deliberate ceiling on client JavaScript.",
        detail: [
          "Remote images proxied and re-encoded server-side, so a strict img-src CSP needs no relaxation",
          "Responsive `sizes` matched to the actual grid, so a phone downloads a phone-sized asset",
          "Skeletons mirror real card geometry exactly, to hold cumulative layout shift at zero",
        ],
      },
      {
        area: "SEO & structured data",
        summary:
          "Per-route metadata, canonical URLs, Open Graph and Twitter defaults, and JSON-LD validated by its own audit.",
        detail: [
          "Structured data projected from the same arrays the UI renders, so the two cannot drift",
          "A schema audit checks every emitted block on every route, including a zero-price-signal rule",
          "Sitemap derived from the routes that actually build, never hand-listed",
        ],
      },
      {
        area: "Developer experience",
        summary:
          "The reasoning lives next to the code, and the checks run without ceremony.",
        detail: [
          "Architecture decision records for the choices that would otherwise be re-litigated",
          "Audit scripts boot their own server, so each is one command",
          "Strict TypeScript with no `any` in the application layer",
        ],
      },
    ],
  },

  /**
   * Screenshots of the running site, captured with Playwright at three real
   * viewports and re-encoded to WebP — not mockups, and not the same desktop
   * image scaled down and presented as "mobile".
   */
  gallery: {
    lede: "Captured from the live site at desktop, tablet and phone widths.",
    images: [
      {
        src: "/case-studies/trady-perch-platform/home-desktop.webp",
        alt: "The homepage hero at desktop width: headline and supporting copy on the left, a dark 3D pyramid on the right, with the primary navigation above.",
        width: 2880,
        height: 1800,
        caption: "Homepage",
        device: "desktop",
      },
      {
        src: "/case-studies/trady-perch-platform/projects-desktop.webp",
        alt: "The projects page showing an asymmetric grid where one featured card spans two of three columns.",
        width: 2880,
        height: 1800,
        caption: "Projects — the GitHub-backed grid",
        device: "desktop",
      },
      {
        src: "/case-studies/trady-perch-platform/pricing-desktop.webp",
        alt: "The pricing page, laid out as editorial prose rather than a comparison table.",
        width: 2880,
        height: 1800,
        caption: "Pricing philosophy",
        device: "desktop",
      },
      {
        src: "/case-studies/trady-perch-platform/projects-tablet.webp",
        alt: "The projects page at tablet width, where the featured card takes the full width and standard cards pair below it.",
        width: 1668,
        height: 2224,
        caption: "Projects at tablet width",
        device: "tablet",
      },
      {
        src: "/case-studies/trady-perch-platform/home-mobile.webp",
        alt: "The homepage on a phone, with the navigation collapsed to a menu button.",
        width: 780,
        height: 1688,
        caption: "Homepage on a phone",
        device: "mobile",
      },
      {
        src: "/case-studies/trady-perch-platform/contact-mobile.webp",
        alt: "The contact form on a phone, with stacked fields and a full-width submit button.",
        width: 780,
        height: 1688,
        caption: "Contact form on a phone",
        device: "mobile",
      },
    ],
  },

  timeline: {
    lede: "Built in milestones, each closed by an independent review before the next opened.",
    phases: [
      {
        name: "Foundations",
        period: "Milestones 1-2",
        summary:
          "Monorepo, token pipeline, and the first components. The decision to make the component library framework-agnostic was taken here, which constrained everything after it.",
        outputs: ["Token compiler", "Component library", "Site shell"],
      },
      {
        name: "The narrative",
        period: "Milestones 3-5",
        summary:
          "Homepage sections in a fixed order that answers a visitor's questions in the sequence they are actually asked, plus scroll choreography with a no-JavaScript safety net.",
        outputs: ["Homepage", "Interior pages", "Reveal system"],
      },
      {
        name: "Hardening",
        period: "Milestones 6-8",
        summary:
          "Accessibility, keyboard navigation and performance audits built as scripts rather than as one-off checks — the point at which quality stopped depending on anyone remembering to look.",
        outputs: ["axe-core audit", "Keyboard audit", "Lighthouse audit"],
      },
      {
        name: "Security and structure",
        period: "Milestones 9-10",
        summary:
          "The response header baseline, structured data with its own validator, and the nonce-versus-static-generation decision recorded as an ADR after the nonce approach was tried and reverted.",
        outputs: ["Security headers", "Schema audit", "ADR-0010"],
      },
      {
        name: "The live portfolio",
        period: "Current",
        summary:
          "A GitHub-backed projects feed and this case-study system — the point at which the site began maintaining its own proof rather than being updated by hand.",
        outputs: ["GitHub integration", "Case study system"],
      },
    ],
  },

  results: {
    lede: "Verifiable technical outcomes. Every figure below is the output of a command in the repository, not an estimate — and no business metric is claimed, because no client engagement stands behind this project.",
    metrics: [
      {
        label: "WCAG 2.1 AA violations",
        value: "0",
        countTo: 0,
        note: "axe-core, real Chromium, every route",
      },
      {
        label: "Automated tests",
        value: "408",
        countTo: 408,
        note: "Across the app and the component library",
      },
      {
        label: "Pages prerendered",
        value: "36",
        countTo: 36,
        note: "Every page; the only dynamic routes are two API endpoints",
      },
      {
        label: "Design tokens",
        value: "139",
        countTo: 139,
        note: "99 core plus 40 semantic, compiled each build",
      },
    ],
    body: [
      "The number worth dwelling on is the first one, and specifically the fact that it is checked rather than asserted. A zero that comes from an audit running in CI against every route on every commit means something a zero from a one-off manual review does not: it will still be zero next month.",
      "Two real defects were found and fixed by that gate during this work — a contrast failure on a footnote, where the tertiary text token passed against card surfaces but not against the page background, and a hover treatment that rendered as an unintended solid overlay because of a CSS mask property-order subtlety. Neither would have been caught by a human skim. Both were caught before they shipped.",
    ],
  },

  stack: [
    { group: "Frontend", items: ["Next.js 16", "React 19", "TypeScript", "CSS Modules"] },
    { group: "Design system", items: ["Design tokens", "Style Dictionary pipeline", "Framework-agnostic UI package"] },
    { group: "Data", items: ["GitHub REST API", "Incremental static regeneration", "Resend"] },
    { group: "Quality", items: ["Vitest", "Testing Library", "axe-core", "Playwright", "Lighthouse"] },
    { group: "Tooling", items: ["ESLint", "Prettier", "npm workspaces", "GitHub Actions"] },
    { group: "Infrastructure", items: ["Vercel", "CDN static delivery", "Image optimisation"] },
  ],

  cta: {
    heading: "Want this level of care on your product?",
    body: "Everything on this page is inspectable — the repository, the audits, the decisions and what each one cost. If that is how you want your own system built, tell us what you are trying to make.",
  },

  seo: {
    title: "Trady Perch platform — a marketing site built like a product",
    description:
      "How the Trady Perch site is built: a TypeScript monorepo with a design-token pipeline, a framework-agnostic component library, and WCAG 2.1 AA enforced in CI across every route.",
  },
};
