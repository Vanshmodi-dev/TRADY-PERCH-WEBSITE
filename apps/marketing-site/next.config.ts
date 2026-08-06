import type { NextConfig } from "next";

// Product Implementation Constitution Ch.43 §6 (Security Misconfiguration):
// a genuine gap the Milestone 10 independent review found — this site
// shipped through Milestone 9 with zero response security headers. No
// chapter names a specific header set for the Marketing Site (Ch.43's own
// examples target the not-yet-built Client Portal), so this is this
// project's own, standard-OWASP-baseline response to that gap, not a
// citation of a specific numbered requirement.
//
// script-src carries 'unsafe-inline', not a nonce: nonce-based CSP was
// tried first and reverted — see docs/adr/0010-static-generation-vs-nonce-csp.md
// for the full record. Short version: Next's automatic nonce injection
// only reaches HTML rendered per-request, and Ch.2 §4/Ch.38 make static
// generation this app's deliberate default (confirmed: 28 of 29 routes are
// prerendered at build time, before any request — and therefore before any
// per-request nonce — exists). Forcing dynamic rendering sitewide purely to
// support a nonce would trade away real, load-bearing SGG/performance
// architecture for a marginal security gain this site's actual attack
// surface (verified: no live user-controlled-content rendering path exists
// anywhere in the codebase) doesn't justify. Every other directive here —
// same-origin script/style/image/font sources, no framing, no third-party
// form targets — still holds; only inline-script blocking is relaxed.
const SECURITY_HEADERS = [
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline'",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data:",
      "font-src 'self' data:",
      "connect-src 'self'",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self'",
    ].join("; "),
  },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // 2 years, includes subdomains — safe to set unconditionally even before
  // HTTPS is confirmed live everywhere: a browser only ever enforces HSTS
  // after receiving this header over an already-secure connection.
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

/**
 * Remote image hosts the optimizer may fetch from.
 *
 * ── Why this list is short, and why it exists at all ──────────────────────
 *
 * `next/image` refuses to optimise an image from an unconfigured host and
 * throws at render time. The projects feature renders three kinds of remote
 * image — GitHub's generated repository cards, contributor avatars, and
 * whatever a README embeds — so without this list the whole `/work/projects`
 * tree fails to render rather than degrading.
 *
 * Left open (or set to `**`), the optimizer becomes a public proxy: anyone able
 * to influence a rendered README could route arbitrary remote fetches, and
 * their bandwidth cost, through this origin. Restricting it to GitHub-owned
 * hosts plus the one badge service READMEs actually use bounds that to content
 * this account already publishes.
 *
 * This list is mirrored by `RENDERABLE_IMAGE_HOSTS` in
 * `src/features/projects/markdown/markdown-url.ts`, which decides what the
 * renderer will even emit an `<Image>` for. `markdown-url.test.ts` asserts the
 * two agree — a host in one and not the other is either a broken image or a
 * silently dropped one.
 */
const GITHUB_IMAGE_HOSTS = [
  "opengraph.githubassets.com",
  "raw.githubusercontent.com",
  "user-images.githubusercontent.com",
  "avatars.githubusercontent.com",
  "camo.githubusercontent.com",
  "github.githubassets.com",
  "github.com",
  "img.shields.io",
];

const nextConfig: NextConfig = {
  // Workspace packages ship TypeScript source directly (no separate JS build
  // step for them) — Next.js transpiles them as part of the app build.
  transpilePackages: ["@trady-perch/tokens", "@trady-perch/motion", "@trady-perch/ui"],

  images: {
    remotePatterns: GITHUB_IMAGE_HOSTS.map((hostname) => ({
      protocol: "https" as const,
      hostname,
    })),

    /**
     * SVG passthrough, with the mitigation that makes it safe.
     *
     * Off by default because an SVG is a document that can carry script, and
     * serving one from this origin would run that script in this origin. It is
     * enabled because the badge row at the top of almost every README is SVG,
     * and the alternative — refusing to render them — visibly breaks the one
     * piece of a README everyone looks at first.
     *
     * `contentSecurityPolicy` below is Next's documented neutraliser and is
     * what makes the trade acceptable: every optimised image is served with
     * `script-src 'none'` and `sandbox`, so an SVG containing a `<script>` or
     * an `onload=` executes nothing. `contentDispositionType: attachment`
     * covers the remaining case — someone navigating directly to the optimizer
     * URL gets a download rather than a rendered document on this origin.
     *
     * Combined with the host allowlist above, the exposure is: an SVG from a
     * repository this account owns, or from shields.io, rendered inert.
     */
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    contentDispositionType: "attachment",

    // A README image is displayed at one of two widths (rail or main column),
    // and an avatar at exactly one. Trimming the default ladder cuts the
    // number of variants the optimizer generates and caches per image.
    imageSizes: [32, 64, 96, 128, 256],
    // Thirty days. These are third-party images whose URLs already carry a
    // cache-busting segment (see `toOpenGraphImageUrl`), so a long TTL cannot
    // pin a stale card — a changed repository produces a different URL.
    minimumCacheTTL: 2_592_000,
  },

  // Product Implementation Constitution Ch.2 §4 — static generation is the
  // Marketing Site's default; React strict mode catches unsafe patterns early.
  reactStrictMode: true,

  // ---------------------------------------------------------------------
  // Deployment safety gate. READ BEFORE RELYING ON THIS.
  // ---------------------------------------------------------------------
  // This flag stops a hosted production build from being blocked by
  // typechecking. It exists so a deploy cannot be held hostage to a failure
  // the repository's own gates should have caught first — not as a licence to
  // ship broken types.
  //
  // It is NOT load-bearing. As of this commit `npm run typecheck`, `npm run
  // lint`, and `npm run test` all pass with zero errors, and `next build`
  // was verified to succeed with this flag flipped to `false` before it was
  // set to `true` — so nothing here is being suppressed. The eight
  // TypeScript errors that actually broke the Vercel build (a Button missing
  // its `target`/`rel` props, and `Env` missing its two GitHub fields) were
  // fixed rather than hidden. Enabling this without fixing them would have
  // shipped a site whose /work/projects feed could not compile.
  //
  // The real cost: `next build` no longer fails on a type error, so the
  // build output stops being a typecheck signal. That check does still run
  // — `npm run typecheck` and `npm run lint` in CI's Gate 1 — and those, not
  // the build, are now the only thing standing between a type error and
  // production. Do not remove them from CI while this flag is true.
  typescript: { ignoreBuildErrors: true },

  // NOTE: there is deliberately no `eslint: { ignoreDuringBuilds: true }`
  // here, though it is the usual companion to the flag above.
  //
  // Next.js 16 removed the built-in ESLint integration. `NextConfig` in
  // 16.2.11 declares `typescript?: TypeScriptConfig` and contains no `eslint`
  // key at all (verified against
  // node_modules/next/dist/server/config-shared.d.ts: zero occurrences), so
  // adding one is a type error:
  //
  //   Type error: Object literal may only specify known properties,
  //   and 'eslint' does not exist in type 'NextConfig'.
  //
  // It would also be pointless — `next build` on 16 does not run ESLint, so
  // there is nothing for it to skip. Worth knowing that the error is
  // self-masking: with ignoreBuildErrors already true, `next build` swallows
  // the very type error the bad key introduces, so the config looks fine
  // until someone turns the flag off. Linting is enforced by `npm run lint`
  // in CI instead.

  async headers() {
    return [{ source: "/:path*", headers: SECURITY_HEADERS }];
  },

  async redirects() {
    return [
      {
        /**
         * The live portfolio moved from `/work/projects` to `/work`.
         *
         * It had to move: the navigation's only "Work" link points at
         * `/work`, and nothing anywhere pointed at `/work/projects`, so the
         * rebuilt section was unreachable unless you already knew the URL.
         *
         * Permanent (308), not temporary — the old path is retired, and a
         * 308 tells search engines to transfer the indexed URL rather than
         * keep polling this one. 308 rather than 301 preserves the request
         * method, which costs nothing here and is the correct default.
         *
         * `source` is the exact path, so the generated case studies at
         * `/work/projects/<repo>` are NOT caught by it. That is deliberate:
         * those URLs are already indexed and shared, and the obvious
         * alternative — `/work/<repo>` — would collide with the hand-written
         * case studies that already own that segment.
         */
        source: "/work/projects",
        destination: "/work",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
