import type { FaqItem } from "@/features/home/sections/faq/faq-data";

/**
 * The standalone /faq page is meant to be a genuinely deeper resource
 * than the homepage's six-item teaser (Ch.13 item 9's "scan fast vs read
 * deep" split, applied to FAQ the same way it's applied to Portfolio vs
 * Case Studies) — these six cover ground the homepage teaser doesn't
 * (pricing structure, ownership, industries, exit terms), rather than
 * repeating FAQ_ITEMS at greater length. The standalone page renders both
 * sets; FAQ_ITEMS itself (and the homepage/JSON-LD that consume it) stays
 * untouched.
 */
export const EXTENDED_FAQ_ITEMS: FaqItem[] = [
  {
    id: "pricing-structure",
    question: "Do you charge a fixed price, or bill hourly?",
    answer:
      "Fixed, scope-based pricing agreed before work begins — see the Pricing page for how engagements get scoped. We don't bill open-ended hours against a project.",
  },
  {
    id: "ownership",
    question: "Do we own what you build?",
    answer:
      "Yes. What we build for you is yours — this isn't a platform you rent access to, and there's no vendor lock-in by design.",
  },
  {
    id: "industries",
    question: "What industries do you actually work with?",
    answer:
      "Real estate, medical, legal, manufacturing, education, finance, and e-commerce most often — see the Industries page for how the approach differs by vertical. The underlying patterns generalize well beyond that list too.",
  },
  {
    id: "custom-vs-template",
    question: "Is this really custom, or a template with our logo on it?",
    answer:
      "Custom. Discover and Design exist specifically to map your actual workflow before anything is built — a template can't do that, because it's built before it knows what your business needs.",
  },
  {
    id: "exit-terms",
    question: "What happens if we want to stop working together?",
    answer:
      "You keep what was built. There's no penalty for ending an engagement, and because you own the system outright, walking away doesn't mean losing what you paid for.",
  },
  {
    id: "existing-tools",
    question: "Can you work with the specific tools we already use?",
    answer:
      "Usually, yes — Custom Integrations exists precisely for this. If a tool has any way to connect to it (an API, a data export, even email), it's very likely workable.",
  },
];
