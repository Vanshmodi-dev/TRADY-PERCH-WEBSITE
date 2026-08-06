import type { CaseStudy } from "../case-study-types";

/**
 * Case study: Lead Finder.
 *
 * ── Sourcing ──────────────────────────────────────────────────────────────
 *
 * Written from the repository itself — its README, its module layout and its
 * dependency list. Every technical claim below corresponds to a file a reader
 * can open: `local_scraper.py`, `contact_enricher.py`, `personalizer.py`,
 * `auth.py`, `send_campaign.py`.
 *
 * ── What is deliberately absent ───────────────────────────────────────────
 *
 * No metrics. No conversion rates, no leads-per-hour, no reply rates. This is
 * an internal tool with no published performance data, and inventing a figure
 * for a page whose entire premise is verifiability would be the worst
 * possible trade. The Results section is therefore omitted rather than filled
 * — see the docblock on `CaseStudy["results"]`.
 *
 * The tradeoffs recorded in `research` are taken directly from the project's
 * own README, which is unusually candid about them. They are reproduced here
 * rather than smoothed over, because a case study that admits what a decision
 * cost is the one a technical reader believes.
 */
export const LEAD_FINDER: CaseStudy = {
  slug: "lead-finder",
  repoName: "lead-generation-trady-perch",

  hero: {
    category: "Automation & applied AI",
    title: "Replacing a paid data vendor with a browser",
    standfirst:
      "An internal prospecting tool that drives a real Chromium instance to source businesses, enriches them from their own websites, and writes a personalised opening line for each with an LLM.",
  },

  snapshot: {
    facts: [
      { label: "Platform", value: "Internal tool" },
      { label: "Industry", value: "Sales automation" },
      { label: "Team", value: "Solo build" },
      { label: "Interface", value: "Streamlit dashboard" },
      { label: "Runtime", value: "Local-first" },
      { label: "Modules", value: "11", countTo: 11 },
    ],
  },

  overview: {
    heading: "A prospecting pipeline that costs nothing per search",
    lede: "Built to answer one question: can the work a per-record data vendor charges for be done locally, and what does it actually cost you to do that?",
    body: [
      "Lead Finder takes a business type and a location and returns a qualified, contactable list — name, address, phone, website, rating and category — then visits each business's own site looking for a public email address and social profiles, and can send every one of them a personalised cold email.",
      "It began as a wrapper around a paid third-party scraping service. That service worked well and cost money on every search, which put a meter on exactly the activity the tool exists to encourage. Replacing it meant taking on the work the vendor was doing, and being honest about the two things that got worse in the process.",
      "It is an internal tool, and it is built like one: a Streamlit dashboard, local execution, no infrastructure to operate. That is a deliberate scope decision, not an unfinished state — the fastest way to make this thing worse would be to turn it into a hosted product nobody asked for.",
    ],
  },

  challenges: {
    items: [
      {
        title: "A metered cost on the core action",
        body: "The original implementation called a paid scraping service. Every search had a price, which meant the tool's usefulness and its cost grew together — precisely the wrong incentive for something meant to be used freely during prospecting.",
      },
      {
        title: "Source pages that are not an API",
        body: "Google Maps markup is not public, not stable, and not documented. Anything reading it is reading an implementation detail that can change without notice and break extraction silently rather than loudly.",
      },
      {
        title: "Generic contact data",
        body: "A regex sweep of a company's own website finds info@ and contact@ far more often than it finds a named decision-maker. That is a real, permanent quality reduction against a curated B2B database, and no amount of engineering removes it.",
      },
      {
        title: "Credentials in a tool that sends email",
        body: "The system holds a Gmail app password and an LLM API key, and can send mail on the operator's behalf. A dashboard reachable over a URL with that capability behind it needs a genuine access gate, not a token check.",
      },
      {
        title: "Personalisation that does not read as generated",
        body: "A mail-merged first name is not personalisation and every recipient knows it. The opening line has to reference something specific enough about the business to be worth reading — at a per-message cost near zero.",
      },
    ],
  },

  research: {
    lede: "The tradeoffs here are reproduced from the project's own README, which states them plainly. They are not softened.",
    decisions: [
      {
        question: "Buy the data, or scrape it?",
        choice: "Drive a real headless Chromium via Playwright, locally.",
        rationale:
          "A real browser executes the page's JavaScript, so it sees what a user sees rather than what a raw HTTP fetch returns. It scrolls the results list to load listings, then opens each business's own page to pull the phone number, website and full address. No API key, no per-search cost, no usage ceiling.",
        tradeoff:
          "Google's terms prohibit scraping Maps, and the markup is undocumented and changes periodically — which can break extraction silently until the selectors are updated. That maintenance is the cat-and-mouse game the vendor was being paid to play. Choosing this means choosing to play it yourself.",
      },
      {
        question: "How are email addresses found?",
        choice: "Fetch each business's homepage plus likely contact and about pages, and extract with regex.",
        rationale:
          "A business that wants to be contacted publishes an address. Checking the two or three pages where one is conventionally placed catches most of them at negligible cost.",
        tradeoff:
          "Contact quality is materially lower than the curated database it replaced. That produced named individuals with direct addresses and job titles; this mostly produces role accounts. It is the single biggest regression in the rebuild, and it is a property of the approach rather than a bug in it.",
      },
      {
        question: "Should Apollo.io be integrated for enrichment?",
        choice: "No.",
        rationale:
          "Apollo's terms prohibit unauthorised scraping, and doing it properly requires their official paid API — which reintroduces exactly the per-record cost the rebuild existed to remove. Deliberately left out rather than quietly worked around.",
      },
      {
        question: "How should the dashboard be secured?",
        choice: "A salted PBKDF2 hash in the environment, constant-time comparison, and a file-based lockout.",
        rationale:
          "A setup script prompts for the credential with the terminal's hidden-input mode and writes only the hash — the plaintext is never stored and never displayed anywhere in the app. Comparison uses `hmac.compare_digest`, so response timing leaks nothing about how much of a guess was correct. Five failures lock out all attempts for fifteen minutes, tracked in a local file rather than a cookie, so a new tab or an incognito window does not reset it.",
        tradeoff:
          "It is one shared credential, not per-person accounts, and it protects against someone finding the URL — not against a compromised machine or a stolen .env. The README states that limit explicitly rather than implying more.",
      },
      {
        question: "Which model writes the personalised line?",
        choice: "Groq, on its free tier.",
        rationale:
          "The task is one short sentence conditioned on a few facts about a business — well within a small fast model's competence, and latency matters more than sophistication when generating for a whole list. The free tier makes the marginal cost of personalising a campaign effectively zero, which is what allows it to be on by default.",
      },
    ],
  },

  features: {
    items: [
      {
        icon: "search",
        title: "Local Maps sourcing",
        description:
          "A headless Chromium instance scrolls the results list, opens each listing, and extracts name, address, phone, website, rating and category — with a masked fingerprint and human-paced scrolling to reduce the chance of being blocked.",
        benefits: ["No API key", "No per-search cost", "No result ceiling"],
      },
      {
        icon: "link",
        title: "Contact enrichment",
        description:
          "Each business's own site is fetched — homepage plus likely contact and about pages — and swept for email addresses and LinkedIn, Facebook, X and Instagram profiles.",
        benefits: ["Public sources only", "Social profiles alongside email"],
      },
      {
        icon: "spark",
        title: "LLM personalisation",
        description:
          "An opening line written per recipient from what was found about that specific business, so the first sentence is not one every other recipient also received.",
        benefits: ["One line per lead", "Effectively zero marginal cost"],
      },
      {
        icon: "shield",
        title: "Hardened access gate",
        description:
          "Salted PBKDF2 hashing, constant-time comparison, and a fifteen-minute lockout after five failures that survives a new tab because it is tracked on disk rather than in a session.",
        benefits: ["Plaintext never stored", "Timing-safe comparison", "Lockout cannot be reset client-side"],
      },
      {
        icon: "mail",
        title: "Campaign sending",
        description:
          "Sends through Gmail using an app password scoped to this tool alone — revocable independently, and never the account's real password.",
        benefits: ["Revocable credential", "Templated body with a personalised opening"],
      },
      {
        icon: "data",
        title: "Filtering and export",
        description:
          "Filter by minimum rating, skip permanently closed businesses, target only businesses without a website, or keep only leads where an email was found. Export the result as CSV.",
        benefits: ["CSV export", "Composable filters"],
      },
    ],
  },

  engineering: {
    layers: [
      {
        area: "Interface",
        summary: "Streamlit — a dashboard with no frontend build, chosen because the audience is one operator.",
        detail: ["Every page gated behind the login", "Filters and export in the same view as results"],
      },
      {
        area: "Acquisition",
        summary: "Playwright driving headless Chromium against Google Maps.",
        detail: [
          "Scrolls the results pane to trigger lazy loading",
          "Visits each listing for phone, website and full address",
          "Masked fingerprint and paced delays to reduce blocking",
        ],
      },
      {
        area: "Enrichment",
        summary: "Direct HTTP fetches of each business's own site, with regex extraction.",
        detail: ["Homepage plus conventional contact and about paths", "Email addresses and four social networks"],
      },
      {
        area: "Generation",
        summary: "Groq's API for the per-recipient opening line.",
        detail: ["Conditioned on the facts gathered for that business", "Free tier, so personalisation stays default-on"],
      },
      {
        area: "Security",
        summary: "PBKDF2 with a salt, constant-time comparison, and disk-backed brute-force lockout.",
        detail: [
          "Credential set by a CLI script using hidden terminal input",
          "Only the hash reaches .env; no plaintext anywhere",
          "hmac.compare_digest defeats timing analysis",
          "Five failures lock all attempts for fifteen minutes",
        ],
      },
      {
        area: "Configuration",
        summary: "Everything through .env — no secret is ever typed into the running app.",
        detail: ["Groq key, Gmail address and app password, credential hash", "A committed .env.example documents each"],
      },
    ],
  },

  timeline: {
    phases: [
      {
        name: "Vendor integration",
        period: "First build",
        summary:
          "Shipped against a paid third-party scraping service. It worked, and it put a per-search price on the tool's core action.",
        outputs: ["Working pipeline", "A metered cost"],
      },
      {
        name: "Bringing it in-house",
        period: "Rebuild",
        summary:
          "The vendor call was replaced with a locally driven browser, taking on the extraction and the maintenance it implies.",
        outputs: ["local_scraper.py", "contact_enricher.py"],
      },
      {
        name: "Personalisation",
        period: "Extension",
        summary:
          "LLM-written opening lines and templated sending, turning a list of contacts into a campaign that can actually be sent.",
        outputs: ["personalizer.py", "send_campaign.py"],
      },
      {
        name: "Hardening",
        period: "Current",
        summary:
          "Access control added once the tool could send mail on the operator's behalf, with the limits of that protection documented rather than implied.",
        outputs: ["auth.py", "set_credentials.py"],
      },
    ],
  },

  stack: [
    { group: "Application", items: ["Python", "Streamlit"] },
    { group: "Acquisition", items: ["Playwright", "Headless Chromium"] },
    { group: "AI", items: ["Groq API"] },
    { group: "Delivery", items: ["Gmail SMTP", "App passwords"] },
    { group: "Security", items: ["PBKDF2", "hmac.compare_digest", "Rate limiting"] },
    { group: "Data", items: ["CSV export", "Regex extraction"] },
  ],

  cta: {
    heading: "Have a manual process that should not be manual?",
    body: "This started as a spreadsheet and a lot of copying and pasting. Most automation worth building does. Tell us what yours looks like.",
  },

  seo: {
    title: "Lead Finder — replacing a paid data vendor with a browser",
    description:
      "How Trady Perch replaced a paid scraping service with locally driven Playwright, LLM-written personalisation and a hardened access gate — including what the rebuild cost in contact quality.",
  },
};
