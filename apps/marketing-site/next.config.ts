import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Workspace packages ship TypeScript source directly (no separate JS build
  // step for them) — Next.js transpiles them as part of the app build.
  transpilePackages: ["@trady-perch/tokens", "@trady-perch/motion", "@trady-perch/ui"],

  // Product Implementation Constitution Ch.2 §4 — static generation is the
  // Marketing Site's default; React strict mode catches unsafe patterns early.
  reactStrictMode: true,
};

export default nextConfig;
