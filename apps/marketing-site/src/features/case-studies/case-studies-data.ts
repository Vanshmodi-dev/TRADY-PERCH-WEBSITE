export interface CaseStudyStat {
  value: string;
  label: string;
}

export interface CaseStudyData {
  slug: string;
  /** Slug into INDUSTRIES (industries-data.ts) — not every industry with a
   * case study necessarily has its own detail page, so this is a plain
   * string, not a typed cross-reference. */
  industrySlug: string;
  industryLabel: string;
  /** Short business identifier used on Portfolio/index cards, e.g. "Real
   * estate brokerage" — distinct from `industryLabel` ("Real Estate"),
   * which is the cross-link label to the Industries page. */
  businessLabel: string;
  solutionSlugs: string[];
  title: string;
  /** One-liner for the Portfolio grid teaser (Ch.15: "problem, headline
   * result, and a clean visual — a taste, not the full narrative"). */
  portfolioSummary: string;
  /** The Portfolio/Case-Studies-index headline stat — one number, not all
   * three, per the same "taste, not full narrative" rule. */
  headlineStat: CaseStudyStat;
  /** Full 7-part spine (Master Vision Ch.15) for the case study detail page. */
  businessProblem: string;
  solution: string;
  technologiesUsed: string;
  implementationProcess: string;
  businessImpact: string;
  measurableResults: CaseStudyStat[];
  lessonsLearned: string;
}

/**
 * Ch.15's full narrative spine, for the three illustrative engagements
 * already introduced on the homepage (Portfolio's three cards + Case
 * Studies' one deep example) — expanded here rather than inventing new
 * ones, so Portfolio, Case Studies, and the relevant Industries pages all
 * point at the same consistent examples instead of contradicting each
 * other. Honestly labeled "Illustrative example" everywhere they render;
 * no real client engagements exist yet to report (see Milestone 3).
 */
export const CASE_STUDIES: CaseStudyData[] = [
  {
    slug: "real-estate-brokerage",
    industrySlug: "real-estate",
    industryLabel: "Real Estate",
    businessLabel: "Real estate brokerage",
    solutionSlugs: ["ai-agents"],
    title: "A brokerage that stopped losing leads to slow response times.",
    portfolioSummary:
      "Inbound leads sat unqualified until whoever had time got to them, sometimes a day later.",
    headlineStat: { value: "40%", label: "faster first response" },
    businessProblem:
      "A growing real estate brokerage was converting inbound leads inconsistently — not because the leads were bad, but because qualifying them depended on whichever agent had a free moment. By the time someone followed up, a meaningful share of leads had already gone with whoever responded first.",
    solution:
      "A conversational AI agent that qualifies every inbound lead within seconds — asking the right questions, flagging serious buyers, and routing them to the right agent automatically, day or night.",
    technologiesUsed:
      "A conversational AI agent connected directly to the brokerage's existing CRM — deliberately ordinary, well-understood infrastructure. The value here is the judgment built into the conversation, not an exotic stack.",
    implementationProcess:
      "Two weeks to map the brokerage's actual lead sources and qualification criteria, one week to build and test the conversational flows against real (anonymized) past inquiries, a phased rollout starting with a single lead source before expanding to all of them, and two weeks of live tuning once agents started seeing real conversations come through.",
    businessImpact:
      "Agents stopped competing for whoever happened to be free when a lead came in — every lead now gets the same fast, consistent first response, and the team spends their time on qualified conversations instead of triage.",
    measurableResults: [
      { value: "40%", label: "faster first response" },
      { value: "24/7", label: "lead coverage, no gaps overnight" },
      { value: "0", label: "leads left unqualified by morning" },
    ],
    lessonsLearned:
      "The agent's early scripts asked too many questions up front, which quietly hurt completion rates. The fix: qualification has to feel like a conversation, not a form — even when a machine is running it.",
  },
  {
    slug: "manufacturing-supplier",
    industrySlug: "manufacturing",
    industryLabel: "Manufacturing",
    businessLabel: "Manufacturing supplier",
    solutionSlugs: ["workflow-automation", "intelligent-systems"],
    title: "A supplier that started winning on speed, not just price.",
    portfolioSummary: "Quotes took three to five days to turn around, losing deals to faster competitors.",
    headlineStat: { value: "Same-day", label: "quote turnaround" },
    businessProblem:
      "Quotes took three to five days to turn around because pricing depended on checking specs against current material costs and shop capacity by hand, across two disconnected spreadsheets. By the time a quote went out, some customers had already ordered from a faster competitor.",
    solution:
      "A quoting system that pulls current material pricing and shop capacity automatically and assembles an accurate quote the same day a request comes in, with a person reviewing and approving before it goes out — not replacing judgment, just removing the manual assembly work in front of it.",
    technologiesUsed:
      "Built as a direct integration with the supplier's existing ERP and pricing spreadsheets, rather than requiring a replacement system — the goal was speed to value, not a platform migration.",
    implementationProcess:
      "Four weeks: mapping the existing quoting workflow and every manual step in it, building the pricing-and-capacity integration, running it in parallel with the manual process for two weeks to validate accuracy, then cutting over once quotes consistently matched.",
    businessImpact:
      "Sales reps stopped spending afternoons on quote assembly and started spending it on the actual sales conversation — and customers stopped defaulting to whoever answered fastest, because the supplier now was the one answering fastest.",
    measurableResults: [
      { value: "Same-day", label: "quote turnaround, down from 3–5 days" },
      { value: "90%", label: "fewer pricing errors caught after a quote was sent" },
      { value: "5x", label: "more quotes handled per rep, per week" },
    ],
    lessonsLearned:
      "The first version of the integration trusted the ERP's capacity numbers completely, which occasionally produced a quote the shop couldn't actually hit on time. The fix was a manual capacity-confirmation step for anything past a threshold — full automation isn't always the right amount of automation.",
  },
  {
    slug: "medical-practice",
    industrySlug: "medical",
    industryLabel: "Medical",
    businessLabel: "Medical practice",
    solutionSlugs: ["ai-agents", "custom-integrations"],
    title: "A practice that gave its front desk back to its patients.",
    portfolioSummary: "Front-desk staff spent hours a day on scheduling and intake paperwork.",
    headlineStat: { value: "12 hrs/wk", label: "returned to patient care" },
    businessProblem:
      "Front-desk staff spent hours a day on scheduling calls and paper intake forms, which meant less time with patients actually in the office and a backlog of callbacks by mid-afternoon.",
    solution:
      "An intake and scheduling system that lets patients book, reschedule, and complete intake forms online before they arrive, with front-desk staff handling only the exceptions that actually need a person.",
    technologiesUsed:
      "Integrated directly with the practice's existing scheduling system and EHR intake fields, so nothing had to be re-entered by staff on the other end.",
    implementationProcess:
      "Five weeks — longer than a typical engagement because of the compliance review required before anything touching patient data could go live: two weeks of workflow mapping and compliance review in parallel, two weeks of build, and a one-week soft launch on a single provider's schedule before expanding practice-wide.",
    businessImpact:
      "Front-desk staff went from spending most of the morning on scheduling calls to handling mostly walk-in exceptions, and patients stopped waiting on hold to book a routine appointment.",
    measurableResults: [
      { value: "12 hrs/wk", label: "returned to patient care" },
      { value: "70%", label: "of bookings completed without staff involvement" },
      { value: "0", label: "patient-data compliance incidents" },
    ],
    lessonsLearned:
      "Requiring patients to create an account before booking cut completion rates significantly in the first two weeks. Removing that requirement — letting people book first and create an account later, if at all — fixed it.",
  },
];

export function getCaseStudyBySlug(slug: string): CaseStudyData | undefined {
  return CASE_STUDIES.find((caseStudy) => caseStudy.slug === slug);
}
