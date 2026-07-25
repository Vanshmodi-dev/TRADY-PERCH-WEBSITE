// Product Implementation Constitution Ch.18 §2 Layer 2 (integration-layer
// half) / Ch.48 §2: "a full page's accessibility properties (heading
// hierarchy, focus order across multiple components, landmark structure)
// are checked at the integration layer... because [they] are properties
// that only exist once multiple components are actually assembled
// together." This script is that check — axe-core, run in a real Chromium
// page (so contrast reflects real CSS Module output, not jsdom's
// class-name proxies) against every real route, static or dynamic.
//
// Usage: npm run test:a11y --workspace=@trady-perch/marketing-site
// Boots its own `next dev` server (unless BASE_URL is already set to a
// running instance), so it's a single, self-contained, re-runnable check —
// not a two-step manual dance.
import { chromium } from "playwright";
import AxeBuilder from "@axe-core/playwright";
import { ensureDevServer } from "./lib/server.mjs";
import { ROUTES } from "./lib/routes.mjs";

const PORT = 3100; // Deliberately not 3000 — never collide with a dev server the operator already has open.

// WCAG 2.1 A/AA per Design System Bible Ch.53 Ax-1 — Ax-3 pursues AAA
// separately (advisory, not blocking), matching Ch.18 §6's "warn, not
// block" framing for AAA-level criteria beyond the AA floor.
const BLOCKING_TAGS = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"];
const ADVISORY_TAGS = ["wcag2aaa", "wcag21aaa"];

// Milestone 7 review: axe-core tags landmark/heading-structure rules
// "best-practice", never "wcag2a"/"wcag2aa" — BLOCKING_TAGS's withTags()
// filter silently never ran any of these, despite this script's own
// original header comment claiming landmark/heading-hierarchy properties
// were "checked at the integration layer... against real routes." A
// separate withRules() pass (axe's runOnly is tag-OR-rule per call, not
// both combined) actually runs them. Treated as blocking per Product
// Implementation Constitution Ch.18 §5, which names "correct heading
// hierarchy" as part of the Layer-2 blocking gate explicitly.
const STRUCTURAL_RULES = [
  "landmark-one-main",
  "landmark-unique",
  "page-has-heading-one",
  "region",
  "heading-order",
];

async function main() {
  const { baseUrl: BASE_URL, stop: stopServer } = await ensureDevServer(PORT);

  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  /** @type {{ route: string, id: string, impact: string, description: string, helpUrl: string, nodes: number, level: "blocking" | "advisory" }[]} */
  const findings = [];

  try {
    for (const route of ROUTES) {
      await page.goto(`${BASE_URL}${route}`, { waitUntil: "networkidle" });

      const blocking = await new AxeBuilder({ page }).withTags(BLOCKING_TAGS).analyze();
      for (const violation of blocking.violations) {
        findings.push({
          route,
          id: violation.id,
          impact: violation.impact ?? "unknown",
          description: violation.description,
          helpUrl: violation.helpUrl,
          nodes: violation.nodes.length,
          level: "blocking",
        });
      }

      const advisory = await new AxeBuilder({ page }).withTags(ADVISORY_TAGS).analyze();
      for (const violation of advisory.violations) {
        findings.push({
          route,
          id: violation.id,
          impact: violation.impact ?? "unknown",
          description: violation.description,
          helpUrl: violation.helpUrl,
          nodes: violation.nodes.length,
          level: "advisory",
        });
      }

      const structural = await new AxeBuilder({ page }).withRules(STRUCTURAL_RULES).analyze();
      for (const violation of structural.violations) {
        findings.push({
          route,
          id: violation.id,
          impact: violation.impact ?? "unknown",
          description: violation.description,
          helpUrl: violation.helpUrl,
          nodes: violation.nodes.length,
          level: "blocking",
        });
      }
    }
  } finally {
    await browser.close();
    await stopServer();
  }

  const blockingFindings = findings.filter((f) => f.level === "blocking");
  const advisoryFindings = findings.filter((f) => f.level === "advisory");

  console.log(`\nChecked ${ROUTES.length} routes.`);

  if (advisoryFindings.length > 0) {
    console.log(`\n--- ${advisoryFindings.length} AAA-level advisory finding(s) (Ch.18 §6: warn, not block) ---`);
    for (const f of advisoryFindings) {
      console.log(`  [${f.route}] ${f.id} (${f.impact}, ${f.nodes} node(s)): ${f.description}\n    ${f.helpUrl}`);
    }
  }

  if (blockingFindings.length > 0) {
    console.log(`\n--- ${blockingFindings.length} WCAG 2.1 A/AA BLOCKING violation(s) ---`);
    for (const f of blockingFindings) {
      console.log(`  [${f.route}] ${f.id} (${f.impact}, ${f.nodes} node(s)): ${f.description}\n    ${f.helpUrl}`);
    }
    console.log("");
    process.exitCode = 1;
  } else {
    console.log("\nNo WCAG 2.1 A/AA violations found.\n");
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
