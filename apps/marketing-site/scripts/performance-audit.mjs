// Product Implementation Constitution Ch.36 (Performance Budgets) / Ch.48
// §3: "Core Web Vitals thresholds are checked via automated
// Lighthouse-equivalent testing at the end-to-end layer... because a
// genuine Largest Contentful Paint or Interaction to Next Paint
// measurement requires a real or near-real rendered environment." This
// script is that check, against every real route, plus Ch.36 §3's
// gzipped bundle-size ceilings — measured as real bytes transferred over
// the wire (Chrome's own `encodedDataLength`), not a static guess at what
// a bundler's manifest implies a browser will actually fetch.
//
// Usage: npm run test:performance --workspace=@trady-perch/marketing-site
// Runs against a real PRODUCTION build (`next start`, not `next dev` —
// dev bundles are unminified and unrepresentative of both the bytes and
// the timing these budgets govern), unless BASE_URL already points at one.
import { chromium } from "playwright";
import lighthouse from "lighthouse";
import * as chromeLauncher from "chrome-launcher";
import { ensureProdServer } from "./lib/server.mjs";
import { ROUTES } from "./lib/routes.mjs";
import budget from "../../../packages/config/performance-budget.json" with { type: "json" };

const PORT = 3102; // Distinct from a11y-audit.mjs's 3100 and keyboard-nav-audit.mjs's 3101.
const CWV = budget.coreWebVitals["marketing-site"];
const BUNDLE = budget.bundleSizeCeilingsKb["marketing-site"];

// Chrome's own post-compression transfer size (`encodedDataLength`, read
// per-route in main() below) is exactly what the budget file's
// "(gzipped)" ceiling means — a real measurement, not an approximation
// from a Content-Length header that may be absent on a chunked response.
const JS_MIME_PATTERN = /javascript/i;

async function main() {
  const { baseUrl: BASE_URL, stop: stopServer } = await ensureProdServer(PORT);
  const browser = await chromium.launch();

  /** @type {Map<string, Map<string, number>>} route -> (url -> bytes) */
  const perRouteJs = new Map();

  console.log(`Measuring JS bundle size across ${ROUTES.length} routes...`);
  try {
    for (const [index, route] of ROUTES.entries()) {
      console.log(`  [${index + 1}/${ROUTES.length}] ${route}`);
      const context = await browser.newContext();
      const page = await context.newPage();
      const client = await context.newCDPSession(page);
      await client.send("Network.enable");

      /** @type {Map<string, { url: string, mimeType: string }>} */
      const meta = new Map();
      /** @type {Map<string, number>} */
      const urlBytes = new Map();

      client.on("Network.responseReceived", (event) => {
        meta.set(event.requestId, { url: event.response.url, mimeType: event.response.mimeType });
      });
      client.on("Network.loadingFinished", (event) => {
        const info = meta.get(event.requestId);
        if (info && JS_MIME_PATTERN.test(info.mimeType)) {
          urlBytes.set(info.url, event.encodedDataLength);
        }
      });

      await page.goto(`${BASE_URL}${route}`, { waitUntil: "networkidle" });
      await page.waitForTimeout(200);

      perRouteJs.set(route, urlBytes);
      await context.close();
    }
  } finally {
    await browser.close();
  }

  // Shared/vendor = JS URLs present on every route. Per-route = a route's
  // own JS bytes minus the shared set's bytes.
  const allUrlSets = [...perRouteJs.values()].map((m) => new Set(m.keys()));
  const sharedUrls = allUrlSets.reduce((acc, set) => acc.intersection(set));
  let sharedBytes = 0;
  const firstRouteBytes = perRouteJs.values().next().value;
  for (const url of sharedUrls) {
    sharedBytes += firstRouteBytes.get(url) ?? 0;
  }
  const sharedKb = sharedBytes / 1024;

  /** @type {{ route: string, perRouteKb: number, totalKb: number }[]} */
  const bundleResults = [];
  for (const [route, urlBytes] of perRouteJs) {
    let routeOnlyBytes = 0;
    for (const [url, bytes] of urlBytes) {
      if (!sharedUrls.has(url)) routeOnlyBytes += bytes;
    }
    const perRouteKb = routeOnlyBytes / 1024;
    bundleResults.push({ route, perRouteKb, totalKb: perRouteKb + sharedKb });
  }

  // --- Core Web Vitals, via Lighthouse against the same production server ---
  // Lighthouse's Node API connects to an already-running Chrome (via its
  // remote-debugging port) rather than launching one itself — confirmed by
  // reading core/gather/navigation-runner.js directly, since the public
  // docs aren't bundled with the npm package. chromePath reuses the exact
  // Chromium build Playwright already has cached and proven working on
  // this machine, rather than depending on chrome-launcher finding (or
  // not finding) a separate system Chrome install.
  const chrome = await chromeLauncher.launch({
    chromePath: chromium.executablePath(),
    chromeFlags: ["--headless=new"],
  });

  /** @type {{ route: string, lcpMs: number, clsScore: number, ttfbMs: number, tbtMs: number }[]} */
  const cwvResults = [];
  console.log(`\nRunning Lighthouse across ${ROUTES.length} routes (this is the slow part)...`);
  try {
    for (const [index, route] of ROUTES.entries()) {
      console.log(`  [${index + 1}/${ROUTES.length}] ${route}`);
      const runnerResult = await lighthouse(`${BASE_URL}${route}`, {
        port: chrome.port,
        onlyCategories: ["performance"],
        output: "json",
        logLevel: "error",
      });
      const audits = runnerResult.lhr.audits;
      // `?? Number.NaN` on every field, not just TTFB: confirmed on the
      // deliberate 404 route that Lighthouse can leave a paint-timing
      // audit's numericValue unset (e.g. scoreDisplayMode "notApplicable")
      // for an atypical page — crashed the report loop's .toFixed() call
      // the first time this ran for real, discarding an otherwise-clean
      // 28/29-route result. NaN prints as "n/a" below instead.
      cwvResults.push({
        route,
        lcpMs: audits["largest-contentful-paint"]?.numericValue ?? Number.NaN,
        clsScore: audits["cumulative-layout-shift"]?.numericValue ?? Number.NaN,
        ttfbMs: audits["server-response-time"]?.numericValue ?? Number.NaN,
        // Interaction to Next Paint fundamentally requires a real user
        // interaction to measure — Lighthouse is a lab tool with no user
        // present, so Total Blocking Time is the closest lab-measurable
        // proxy, not INP itself. Reported as TBT, not mislabeled as INP.
        tbtMs: audits["total-blocking-time"]?.numericValue ?? Number.NaN,
      });
    }
  } finally {
    // chrome.kill() can throw EPERM on Windows deleting its own temp
    // profile dir — a known chrome-launcher race (Chrome doesn't always
    // release its file handles the instant the process is killed).
    // Confirmed the hard way: this crashed the script *after* all 29
    // Lighthouse runs had already succeeded, discarding every real result
    // before they could be printed. The measurement matters; a cosmetic
    // temp-directory leak on an already-terminated process doesn't.
    try {
      await chrome.kill();
    } catch (error) {
      console.error("Note: chrome-launcher cleanup failed (non-fatal):", error.message);
    }
  }

  await stopServer();

  // --- Report ---
  console.log(`\nChecked ${ROUTES.length} routes against a real production build.\n`);

  console.log(`Shared/vendor JS: ${sharedKb.toFixed(1)}KB (ceiling: ${BUNDLE.sharedVendorJsGzip}KB)`);
  const sharedOverBudget = sharedKb > BUNDLE.sharedVendorJsGzip;
  if (sharedOverBudget) console.log("  *** OVER BUDGET ***");

  console.log("\nPer-route JS:");
  let anyRouteOverBudget = false;
  for (const { route, perRouteKb, totalKb } of bundleResults) {
    const over = perRouteKb > BUNDLE.perRouteJsGzip;
    if (over) anyRouteOverBudget = true;
    console.log(
      `  ${route.padEnd(45)} ${perRouteKb.toFixed(1).padStart(7)}KB own` +
        ` / ${totalKb.toFixed(1).padStart(7)}KB total` +
        (over ? `  *** OVER ${BUNDLE.perRouteJsGzip}KB BUDGET ***` : ""),
    );
  }

  const fmtMs = (value) => (Number.isFinite(value) ? value.toFixed(0).padStart(5) : "  n/a");
  const fmtScore = (value) => (Number.isFinite(value) ? value.toFixed(3) : "  n/a");

  console.log("\nCore Web Vitals (lab-measured via Lighthouse):");
  let anyVitalsOverBudget = false;
  for (const { route, lcpMs, clsScore, ttfbMs, tbtMs } of cwvResults) {
    const lcpOver = Number.isFinite(lcpMs) && lcpMs > CWV.largestContentfulPaintMs;
    const clsOver = Number.isFinite(clsScore) && clsScore > CWV.cumulativeLayoutShift;
    const ttfbOver = Number.isFinite(ttfbMs) && ttfbMs > CWV.timeToFirstByteMs;
    if (lcpOver || clsOver || ttfbOver) anyVitalsOverBudget = true;
    console.log(
      `  ${route.padEnd(45)} LCP ${fmtMs(lcpMs)}ms${lcpOver ? "*" : " "}` +
        `  CLS ${fmtScore(clsScore)}${clsOver ? "*" : " "}` +
        `  TTFB ${fmtMs(ttfbMs)}ms${ttfbOver ? "*" : " "}` +
        `  TBT ${fmtMs(tbtMs)}ms`,
    );
  }
  console.log(
    `\n(* exceeds budget: LCP ${CWV.largestContentfulPaintMs}ms / CLS ${CWV.cumulativeLayoutShift} / TTFB ${CWV.timeToFirstByteMs}ms.` +
      " TBT has no direct budget — Interaction to Next Paint requires real user interaction Lighthouse cannot simulate; TBT is the closest lab proxy, reported for context only.)",
  );

  if (sharedOverBudget || anyRouteOverBudget || anyVitalsOverBudget) {
    console.log("\nBudget violations found.\n");
    process.exitCode = 1;
  } else {
    console.log("\nAll routes within Chapter 36's budgets.\n");
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
