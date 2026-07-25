/**
 * Single source of truth for FAQ content — consumed by both `faq.tsx`
 * (the visible Accordion) and `app/page.tsx` (the FAQPage JSON-LD
 * projection). Previously hand-duplicated in both places with a comment
 * asking future editors to keep them in sync by hand; Milestone 3 review
 * flagged that as a standing drift risk even though the two were
 * word-for-word identical at the time. One array, two consumers, now
 * structurally impossible to drift.
 */
export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: "timeline",
    question: "How long does a typical engagement take?",
    answer:
      "Most engagements move from Discover to a live system in four to eight weeks, depending on scope — you'll get a specific timeline before any work begins, not a vague estimate.",
  },
  {
    id: "security",
    question: "How is our data secured?",
    answer:
      "Your data stays within access-controlled systems scoped specifically to the automation we build. We don't request broader access than the engagement requires, and we're glad to work within your existing security review process.",
  },
  {
    id: "doesnt-work",
    question: "What if it doesn't work the way we need?",
    answer:
      "Every engagement starts with a Design stage specifically so we catch mismatches before any code is written. If something still isn't right after launch, that's what Support is for — not an extra invoice.",
  },
  {
    id: "team-size",
    question: "How big is your team?",
    answer:
      "Small and senior, by design — every engagement is handled by people who've actually built systems like yours before, not routed through a large account-management layer.",
  },
  {
    id: "after-launch",
    question: "What happens after launch?",
    answer:
      "We stay involved. A system nobody maintains slowly stops working, and we'd rather prevent that than get an emergency call six months from now.",
  },
  {
    id: "technical-team",
    question: "Do we need our own technical team to work with you?",
    answer:
      "No — we work directly with whoever runs the process day to day. If you have technical staff, we're glad to loop them in; if you don't, that's normal too.",
  },
];
