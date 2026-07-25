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

const nextConfig: NextConfig = {
  // Workspace packages ship TypeScript source directly (no separate JS build
  // step for them) — Next.js transpiles them as part of the app build.
  transpilePackages: ["@trady-perch/tokens", "@trady-perch/motion", "@trady-perch/ui"],

  // Product Implementation Constitution Ch.2 §4 — static generation is the
  // Marketing Site's default; React strict mode catches unsafe patterns early.
  reactStrictMode: true,

  async headers() {
    return [{ source: "/:path*", headers: SECURITY_HEADERS }];
  },
};

export default nextConfig;
