// Motion token build pipeline — Design System Bible Ch.15 (duration/easing)
// and Ag-3 (reduced-motion compliance must be automatic and structural).
//
// `duration` and `durationReduced` are paired 1:1 and emitted as the SAME
// custom property, overridden inside a `prefers-reduced-motion: reduce`
// media query — so component code never branches on reduced-motion itself;
// it just consumes `var(--motion-duration-quick)` and gets the right value.
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const srcDir = join(__dirname, "..", "src");
const distDir = join(__dirname, "..", "dist");

const motion = JSON.parse(readFileSync(join(srcDir, "motion.json"), "utf-8"));
const { duration, durationReduced, easing } = motion;

/** Strips metadata keys (prefixed `_`, e.g. `_origin`) before they leak into generated output. */
function withoutMetadata(node) {
  return Object.fromEntries(Object.entries(node).filter(([key]) => !key.startsWith("_")));
}

const durationTiers = Object.keys(duration);
for (const tier of durationTiers) {
  if (!(tier in durationReduced)) {
    throw new Error(`Ag-3 violation: duration tier "${tier}" has no reduced-motion companion`);
  }
}

const cssLines = [
  "/* GENERATED FILE — do not hand-edit. Source: packages/motion/src/motion.json */",
  "/* Design System Bible Ch.15 — durations are physical constants, not adjustable parameters. */",
  ":root {",
];
for (const tier of durationTiers) {
  cssLines.push(`  --motion-duration-${tier}: ${duration[tier]};`);
}
for (const [name, value] of Object.entries(easing)) {
  cssLines.push(`  --motion-easing-${name}: ${value};`);
}
cssLines.push(`  --motion-reduced: 0;`);
cssLines.push("}", "");
cssLines.push("/* Ag-3 — reduced-motion compliance is automatic and structural, never per-component. */");
cssLines.push(
  "/* Ch.15 Mt-4: Quick/Standard/Deliberate reduced-motion companions are \"opacity-only\" — movement",
);
cssLines.push(
  "   must stop, not just speed up. --motion-reduced flips 0->1 here; any translate/scale distance",
);
cssLines.push(
  '   MUST be written as `calc(var(--motion-reduced, 0) * -1 + 1) * <distance>` (or multiplied by',
);
cssLines.push(
  "   `(1 - var(--motion-reduced))`) so it structurally collapses to zero under reduced motion —",
);
cssLines.push("   never left to a per-component reduced-motion branch. See packages/motion/README.md.");
cssLines.push(" */");
cssLines.push("@media (prefers-reduced-motion: reduce) {");
cssLines.push("  :root {");
for (const tier of durationTiers) {
  cssLines.push(`    --motion-duration-${tier}: ${durationReduced[tier]};`);
}
cssLines.push(`    --motion-reduced: 1;`);
cssLines.push("  }", "}", "");

const tsLines = [
  "// GENERATED FILE — do not hand-edit. Source: packages/motion/src/motion.json",
  "",
  `export const motionDuration = ${JSON.stringify(withoutMetadata(duration), null, 2)} as const;`,
  "",
  `export const motionDurationReduced = ${JSON.stringify(withoutMetadata(durationReduced), null, 2)} as const;`,
  "",
  `export const motionEasing = ${JSON.stringify(withoutMetadata(easing), null, 2)} as const;`,
  "",
  "export type MotionDurationTier = keyof typeof motionDuration;",
  "",
];

mkdirSync(distDir, { recursive: true });
writeFileSync(join(distDir, "motion-tokens.css"), cssLines.join("\n"), "utf-8");
writeFileSync(join(distDir, "motion-tokens.ts"), tsLines.join("\n"), "utf-8");

console.log(
  `[motion] built ${durationTiers.length} duration tiers + ${Object.keys(easing).length} easing curves -> dist/motion-tokens.css, dist/motion-tokens.ts`,
);
