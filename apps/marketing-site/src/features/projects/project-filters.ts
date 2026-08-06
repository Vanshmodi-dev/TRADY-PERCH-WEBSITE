import type { GitHubRepository } from "./github-types";

/**
 * Which repositories are publishable as portfolio work, and why.
 *
 * Two independent gates, applied in order:
 *
 *  1. `isPublishableRepository` — hard exclusions. A fork, an archive, a
 *     template or an empty repo is never portfolio work regardless of topic.
 *  2. `matchCategories` — inclusion. A repo must demonstrably belong to at
 *     least one of the nine categories the site markets itself on.
 *
 * The second gate is the interesting one. Matching on bare substrings is the
 * obvious implementation and the wrong one: `"ai"` as a substring appears in
 * *email*, *detail*, *chain*, *maintenance* and *domain*, so a substring rule
 * silently classifies an email parser as an AI project. Every pattern here is
 * therefore anchored on token boundaries, where a "token" is a run of letters
 * or digits — which makes `-`, `_`, `.`, `/` and whitespace all separators, so
 * one rule covers `ai-agent`, `ai_agent`, `AI Agent` and `nextjs` alike.
 */

/**
 * A publishable category. `patterns` are matched against the repo's searchable
 * text (name + description + topics); `languages` match GitHub's detected
 * primary language exactly, case-insensitively.
 *
 * Language is a genuine signal, not a fallback hack — a repository whose
 * primary language is Svelte *is* website work whether or not anyone
 * remembered to tag it — but it is deliberately narrow. TypeScript and
 * JavaScript appear under no category: they are what almost everything in a
 * modern portfolio is written in, so treating them as evidence of a category
 * would turn this filter into a pass-through.
 */
interface PortfolioCategory {
  readonly label: string;
  readonly patterns: readonly string[];
  readonly languages: readonly string[];
}

/**
 * The nine categories, in the canonical order they are displayed.
 *
 * Aliases exist because GitHub topics are freeform and inconsistent in
 * practice (`nextjs`, `next-js` and `next` all occur in the wild for the same
 * framework). They are additive only: every alias listed is an unambiguous
 * name for its category, never a loose association.
 */
export const PORTFOLIO_CATEGORIES: readonly PortfolioCategory[] = [
  {
    label: "Website",
    patterns: [
      "website", "websites", "web", "webapp", "web-app", "site", "landing",
      "landing-page", "portfolio", "storefront", "store", "shop", "ecommerce",
      "e-commerce", "commerce", "blog", "cms", "marketing-site",
    ],
    // Deliberately excludes TypeScript/JavaScript — see the interface docblock.
    languages: ["HTML", "CSS", "Astro", "Svelte", "Vue", "SCSS", "Less"],
  },
  {
    label: "AI",
    patterns: [
      "ai", "artificial-intelligence", "llm", "llms", "gpt", "openai",
      "anthropic", "claude", "gemini", "machine-learning", "deep-learning",
      "nlp", "rag", "embeddings", "embedding", "vector-search", "prompt",
      "prompt-engineering", "genai", "generative",
    ],
    languages: [],
  },
  {
    label: "Agent",
    patterns: [
      "agent", "agents", "agentic", "autonomous", "multi-agent", "copilot",
      "assistant", "bot", "bots", "chatbot", "mcp",
    ],
    languages: [],
  },
  {
    label: "Automation",
    patterns: [
      "automation", "automations", "automate", "automated", "workflow",
      "workflows", "pipeline", "etl", "scraper", "scraping", "crawler", "cron",
      "scheduler", "integration", "integrations", "webhook", "webhooks",
      "zapier", "n8n", "rpa", "lead-generation", "leadgen", "outreach",
    ],
    languages: [],
  },
  {
    label: "React",
    patterns: ["react", "reactjs", "react-native", "jsx", "preact", "remix"],
    languages: [],
  },
  {
    label: "Next.js",
    // "next" alone is intentionally absent: it is an ordinary English word and
    // matches things like `next-steps` that have nothing to do with the
    // framework. `nextjs` and `next-js` both tokenise to the same match here.
    patterns: ["nextjs", "next-js", "app-router", "vercel"],
    languages: [],
  },
  {
    label: "Business",
    patterns: [
      "business", "enterprise", "b2b", "crm", "erp", "invoice", "invoicing",
      "billing", "payments", "analytics", "dashboard", "reporting", "reviews",
      "review", "leads", "lead", "sales", "marketing", "booking", "bookings",
      "scheduling", "inventory", "operations",
    ],
    languages: [],
  },
  {
    label: "SaaS",
    patterns: [
      "saas", "subscription", "subscriptions", "multi-tenant", "multitenant",
      "tenant", "platform", "self-serve", "onboarding", "stripe",
    ],
    languages: [],
  },
  {
    label: "Custom software",
    patterns: [
      "custom-software", "custom", "bespoke", "internal-tool", "internal-tools",
      "tooling", "engine", "system", "systems", "api", "backend", "service",
      "microservice", "microservices", "sdk", "cli", "infrastructure",
    ],
    languages: [],
  },
] as const;

/**
 * Splits arbitrary text into lowercase alphanumeric tokens.
 *
 * `TRADY-PERCH-REVIEWS-ENGINE` -> `["trady","perch","reviews","engine"]`
 * `Next.js + AI agent`         -> `["next","js","ai","agent"]`
 */
function tokenize(text: string): string[] {
  return text.toLowerCase().split(/[^a-z0-9]+/i).filter(Boolean);
}

/**
 * True when `pattern` appears in `tokens` as a whole token, or — for a
 * multi-word pattern like `lead-generation` — as a consecutive token run.
 *
 * The consecutive-run rule is what makes `machine-learning` match the phrase
 * "machine learning" in a description without also matching a repo that
 * happens to mention "machine" and "learning" paragraphs apart.
 */
function matchesPattern(tokens: readonly string[], pattern: string): boolean {
  const patternTokens = tokenize(pattern);
  if (patternTokens.length === 0) return false;
  if (patternTokens.length === 1) return tokens.includes(patternTokens[0]!);

  return tokens.some((_, index) =>
    patternTokens.every((patternToken, offset) => tokens[index + offset] === patternToken),
  );
}

/** GitHub omits `topics` on some responses; normalise it to a real array. */
export function normaliseTopics(topics: unknown): string[] {
  if (!Array.isArray(topics)) return [];
  return topics.filter((topic): topic is string => typeof topic === "string");
}

/**
 * Hard exclusions, straight from the brief: no forks, no archived repos, no
 * private repos, no templates, no empty repos.
 *
 * `size === 0` is GitHub's signal for "no commits yet" — an initialised repo
 * with a single README reports a non-zero KB size. `disabled` is not in the
 * brief's list but belongs with it: a repository GitHub has disabled (TOS,
 * abuse, or billing) still returns 200 here while every link to it 404s.
 */
export function isPublishableRepository(repo: GitHubRepository): boolean {
  return (
    !repo.fork &&
    !repo.archived &&
    !repo.private &&
    !repo.is_template &&
    !repo.disabled &&
    repo.size > 0
  );
}

/**
 * The categories a repository belongs to, in `PORTFOLIO_CATEGORIES` order.
 * Empty means the repo is not portfolio work and should not be published.
 */
export function matchCategories(repo: GitHubRepository): string[] {
  const topics = normaliseTopics(repo.topics);
  const tokens = tokenize([repo.name, repo.description ?? "", ...topics].join(" "));
  const language = repo.language?.toLowerCase() ?? null;

  return PORTFOLIO_CATEGORIES.filter(
    (category) =>
      category.patterns.some((pattern) => matchesPattern(tokens, pattern)) ||
      (language !== null &&
        category.languages.some((candidate) => candidate.toLowerCase() === language)),
  ).map((category) => category.label);
}
