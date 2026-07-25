import type { ComponentType, SVGProps } from "react";
import {
  CloudIcon,
  IntegrationIcon,
  SparkIcon,
  WorkflowIcon,
} from "@/shared/components/icons";

type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

export interface SolutionCapability {
  title: string;
  body: string;
}

export interface SolutionData {
  slug: string;
  title: string;
  icon: IconComponent;
  /** Short, used on the hub grid card. */
  summary: string;
  /** Longer, used as the detail page's hero description. */
  heroDescription: string;
  capabilities: SolutionCapability[];
  builtFor: string;
}

/**
 * Master Vision Ch.13 item 5 / Ch.16.3 (outcome-first copy). Matches the
 * homepage Solutions section and the primary nav's Solutions dropdown
 * (docs/adr/0006) exactly — four categories, same order, same routes.
 * Capability lists and "built for" copy go beyond what any chapter
 * specifies verbatim; this is a reasonable, disclosed elaboration of the
 * one-line homepage descriptions, not an invented product claim — every
 * capability named here is a standard, generic automation pattern, not a
 * specific fabricated client outcome.
 */
export const SOLUTIONS: SolutionData[] = [
  {
    slug: "ai-agents",
    title: "AI Agents",
    icon: SparkIcon,
    summary:
      "Handle lead qualification, customer questions, and document review without adding headcount — agents that work the way your best people already do.",
    heroDescription:
      "Conversational and autonomous agents that handle lead qualification, customer questions, and document review — built with the rigor of enterprise software, not a chatbot demo.",
    capabilities: [
      {
        title: "Lead qualification agents",
        body: "Ask the right questions the moment a lead arrives, day or night, and route serious buyers to the right person immediately.",
      },
      {
        title: "Customer support agents",
        body: "Answer routine questions instantly and escalate the rest to a human with full context attached, not a cold handoff.",
      },
      {
        title: "Document-processing agents",
        body: "Read, extract, and route information from incoming documents so no one is retyping the same data twice.",
      },
      {
        title: "Internal operations agents",
        body: "Handle routine internal decisions and lookups your team currently interrupts each other for.",
      },
    ],
    builtFor:
      "Built for businesses where response speed is the difference between winning and losing a customer, and where the volume of routine questions has outgrown what a person can answer alone.",
  },
  {
    slug: "workflow-automation",
    title: "Workflow Automation",
    icon: WorkflowIcon,
    summary:
      "Quotes, approvals, and follow-ups that move on their own, so nothing sits in someone's inbox waiting to be remembered.",
    heroDescription:
      "Quotes, approvals, and follow-ups that move on their own — so a task's progress never depends on someone remembering it exists.",
    capabilities: [
      {
        title: "Quote & proposal generation",
        body: "Turn a request into an accurate, on-brand quote in minutes, not days, without a manual assembly step.",
      },
      {
        title: "Approval routing",
        body: "Send the right request to the right approver automatically, with reminders that fire before something goes stale.",
      },
      {
        title: "Follow-up sequencing",
        body: "Keep every open thread — leads, quotes, renewals — moving on a schedule, without a person tracking it in a spreadsheet.",
      },
      {
        title: "Status tracking & reminders",
        body: "Give everyone involved a single accurate view of where something stands, instead of a chain of 'just checking in' emails.",
      },
    ],
    builtFor:
      "Built for teams where good work is getting delayed by process friction, not a lack of skill — where the bottleneck is who has to remember to do what, and when.",
  },
  {
    slug: "custom-integrations",
    title: "Custom Integrations",
    icon: IntegrationIcon,
    summary:
      "Your CRM, your inbox, your scheduling tool — connected, so data moves between them without anyone copying and pasting.",
    heroDescription:
      "Your CRM, your inbox, your scheduling tool, and everything else already running your business — connected, so information moves between them without anyone copying and pasting.",
    capabilities: [
      {
        title: "CRM synchronization",
        body: "Keep customer and deal data consistent across every system that touches it, updated in one place, reflected everywhere.",
      },
      {
        title: "Inbox & calendar integration",
        body: "Let scheduling, follow-ups, and notifications happen from where work already lives, not a separate tool no one opens.",
      },
      {
        title: "Third-party API connections",
        body: "Connect the specialized tools your industry actually runs on, even when they were never designed to talk to each other.",
      },
      {
        title: "Legacy system bridging",
        body: "Get modern automation working with the older systems you're not ready to replace, instead of waiting for a full migration.",
      },
    ],
    builtFor:
      "Built for businesses running on a real stack of specialized tools — not a single all-in-one platform — where the cost is everything that falls through the gaps between them.",
  },
  {
    slug: "intelligent-systems",
    title: "Intelligent Systems",
    icon: CloudIcon,
    summary:
      "Reporting and decision support that updates itself, so you're working from what's true today, not what was true last week.",
    heroDescription:
      "Reporting and decision support that updates itself — so a decision gets made from what's true today, not from a spreadsheet that was accurate two weeks ago.",
    capabilities: [
      {
        title: "Live reporting dashboards",
        body: "Replace the manually-assembled weekly report with a dashboard that's already current when you open it.",
      },
      {
        title: "Decision-support models",
        body: "Surface the specific numbers a decision actually depends on, instead of requiring someone to go find them first.",
      },
      {
        title: "Anomaly detection & alerts",
        body: "Get told the moment something operationally unusual happens, instead of discovering it a week later in a report.",
      },
      {
        title: "Forecasting",
        body: "Turn historical operational data into a forward-looking view, so planning starts from evidence, not intuition.",
      },
    ],
    builtFor:
      "Built for operators making real decisions on a regular cadence — staffing, inventory, spend — who are currently making them from data that's already out of date by the time it's assembled.",
  },
];

export function getSolutionBySlug(slug: string): SolutionData | undefined {
  return SOLUTIONS.find((solution) => solution.slug === slug);
}
