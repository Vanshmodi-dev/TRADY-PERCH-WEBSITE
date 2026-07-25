// One-off diagnostic, not a CI gate: measures REAL, unthrottled Largest
// Contentful Paint (via the browser's own PerformanceObserver, no
// Lighthouse involved) against a real production server. Written during
// Milestone 10 to answer a specific question performance-audit.mjs's
// Lighthouse-based numbers can't answer on their own: is a reported LCP
// budget violation a real user-facing problem, or a lab-throttling
// artifact? See docs/adr/0008-ceremonial-intro-lcp-budget-tension.md's
// "Correction (Milestone 10)" section and the corresponding Chapter 66
// entry for what this script found and why it mattered — every route
// was failing Lighthouse's throttled LCP budget, but real unthrottled
// LCP here came back at 200-280ms, confirming the failure was the shared
// JS bundle's hydration cost under Lighthouse's simulated mobile CPU
// throttling, not an actual regression a real visitor would experience.
//
// Assumes `npm run build --workspace=@trady-perch/marketing-site` has
// already produced a `.next/` to serve — unlike performance-audit.mjs's
// `ensureProdServer`, this deliberately does not rebuild on every run,
// since it exists to be a fast, ad hoc cross-check, not a scheduled gate.
//
// Usage: node scripts/lcp-check.mjs
import { chromium } from "playwright";
import { spawn, spawnSync } from "node:child_process";

const PORT = 3199; // Distinct from every other script's port (3100-3102).
const BASE = `http://localhost:${PORT}`;
const routes = ["/", "/legal", "/pricing", "/solutions/ai-agents"];

const server = spawn("npx", ["next", "start", "--port", String(PORT)], { shell: true, stdio: "ignore" });

async function waitForServer(url, timeoutMs) {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    try {
      await fetch(url);
      return;
    } catch {
      await new Promise((r) => setTimeout(r, 300));
    }
  }
  throw new Error("server didn't start");
}

await waitForServer(BASE, 30000);

const browser = await chromium.launch();
for (const route of routes) {
  const page = await browser.newPage();
  await page.goto(`${BASE}${route}`, { waitUntil: "load" });
  const lcp = await page.evaluate(
    () =>
      new Promise((resolve) => {
        new PerformanceObserver((list) => {
          const entries = list.getEntries();
          resolve(entries[entries.length - 1].startTime);
        }).observe({ type: "largest-contentful-paint", buffered: true });
        setTimeout(() => resolve(-1), 3000);
      }),
  );
  console.log(`${route}: real unthrottled LCP = ${lcp.toFixed(0)}ms`);
  await page.close();
}
await browser.close();
// Mirrors scripts/lib/server.mjs's stopServer: shell:true means kill()
// only signals the shell, not next start's own process underneath it.
if (process.platform === "win32") {
  spawnSync("taskkill", ["/pid", String(server.pid), "/T", "/F"]);
} else {
  server.kill();
}
