// Product Implementation Constitution Ch.40 §6: "an automated schema
// validator, run in CI" is this chapter's own named enforcement mechanism
// for §3's structured-data requirement. Milestone 9's independent review
// found this validator didn't exist — every JSON-LD block had been
// eyeballed once at write time, with no regression protection against a
// future edit breaking one silently. This script is that validator.
//
// Deliberately plain `fetch` + regex extraction, not a Playwright/browser
// pass like a11y-audit.mjs: `<script type="application/ld+json">` blocks
// are emitted directly into the server-rendered HTML (see shared/json-ld.tsx)
// and never mutated by client-side JS, so the raw HTML a crawler actually
// receives is the correct, sufficient thing to check — running a full
// browser to inspect static markup would only add cost, not accuracy.
//
// Usage: npm run test:schema --workspace=@trady-perch/marketing-site
import { ensureDevServer } from "./lib/server.mjs";
import { ROUTES } from "./lib/routes.mjs";

const PORT = 3100;

const SCRIPT_TAG_RE = /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g;

/**
 * Required fields per @type this codebase actually emits. Not a general
 * schema.org validator (that's a much larger surface than this site uses,
 * per Ch.1's IP3 — build what's needed, not a speculative general tool) —
 * just the shapes `shared/json-ld.tsx`'s callers are supposed to produce.
 */
const REQUIRED_FIELDS = {
  Organization: ["name", "url"],
  FAQPage: ["mainEntity"],
  Article: ["headline", "description", "url"],
  Service: ["serviceType", "name", "description", "provider", "url"],
};

/**
 * Ch.5.4's site-wide zero-price-signal rule, extended to structured data
 * exactly as the pricing/solutions/industries pages' own code comments
 * already state it should be — checked here so a future edit can't
 * reintroduce a price field without this script catching it.
 */
const FORBIDDEN_FIELDS = ["offers", "price", "priceRange", "priceCurrency"];

function validateBlock(route, data, index) {
  const errors = [];

  if (data["@context"] !== "https://schema.org") {
    errors.push(`missing or wrong @context (got ${JSON.stringify(data["@context"])})`);
  }

  const type = data["@type"];
  if (!type) {
    errors.push("missing @type");
  } else if (type in REQUIRED_FIELDS) {
    for (const field of REQUIRED_FIELDS[type]) {
      if (data[field] === undefined || data[field] === null || data[field] === "") {
        errors.push(`@type ${type} is missing required field "${field}"`);
      }
    }
  }

  for (const forbidden of FORBIDDEN_FIELDS) {
    if (forbidden in data) {
      errors.push(`Ch.5.4 violation: "${forbidden}" field present on a ${type ?? "unknown"} block`);
    }
  }

  if (type === "FAQPage" && Array.isArray(data.mainEntity)) {
    data.mainEntity.forEach((question, qIndex) => {
      if (question["@type"] !== "Question") errors.push(`mainEntity[${qIndex}] is not a Question`);
      if (!question.name) errors.push(`mainEntity[${qIndex}] missing name`);
      if (!question.acceptedAnswer?.text) errors.push(`mainEntity[${qIndex}] missing acceptedAnswer.text`);
    });
  }

  return errors.map((message) => ({ route, blockIndex: index, type: type ?? "unknown", message }));
}

async function main() {
  const { baseUrl: BASE_URL, stop: stopServer } = await ensureDevServer(PORT);

  /** @type {{ route: string, blockIndex: number, type: string, message: string }[]} */
  const findings = [];
  let blocksChecked = 0;

  try {
    for (const route of ROUTES) {
      const response = await fetch(`${BASE_URL}${route}`);
      if (!response.ok) continue; // the deliberate 404 fixture route, and any other non-content route

      const html = await response.text();
      const matches = [...html.matchAll(SCRIPT_TAG_RE)];

      matches.forEach((match, index) => {
        blocksChecked += 1;
        let data;
        try {
          data = JSON.parse(match[1]);
        } catch (error) {
          findings.push({ route, blockIndex: index, type: "unknown", message: `invalid JSON: ${error.message}` });
          return;
        }
        findings.push(...validateBlock(route, data, index));
      });
    }
  } finally {
    await stopServer();
  }

  console.log(`\nChecked ${ROUTES.length} routes, ${blocksChecked} JSON-LD block(s) found.`);

  if (findings.length > 0) {
    console.log(`\n--- ${findings.length} structured-data issue(s) ---`);
    for (const f of findings) {
      console.log(`  [${f.route}] block ${f.blockIndex} (${f.type}): ${f.message}`);
    }
    console.log("");
    process.exitCode = 1;
  } else {
    console.log("\nAll structured-data blocks valid.\n");
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
