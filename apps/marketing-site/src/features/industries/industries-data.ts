import type { ComponentType, SVGProps } from "react";
import {
  BuildingIcon,
  EcommerceIcon,
  EducationIcon,
  FinanceIcon,
  LegalIcon,
  ManufacturingIcon,
  MedicalIcon,
} from "@/shared/components/icons";

type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

export interface IndustryPainPoint {
  title: string;
  body: string;
}

export interface IndustryDetail {
  heroDescription: string;
  painPoints: IndustryPainPoint[];
  /** Slugs into SOLUTIONS — cross-links the two content areas honestly. */
  relatedSolutionSlugs: string[];
}

export interface IndustryData {
  slug: string;
  title: string;
  icon: IconComponent;
  /** Used on both the homepage and hub-page static cards. */
  summary: string;
  /** Present only for the four verticals with a dedicated route (ADR-0006). */
  detail?: IndustryDetail;
}

/**
 * Master Vision Ch.13 item 6 — all seven named verticals. Only four carry
 * a `detail` block and a real route (docs/adr/0006's Real Estate/Medical/
 * Legal/Manufacturing selection); the remaining three render as
 * information-only cards on the hub page. Pain points are generic,
 * industry-standard operational friction — not claims about any specific
 * real client — consistent with the honesty pattern used for Portfolio/
 * Case Studies (Milestone 3).
 */
export const INDUSTRIES: IndustryData[] = [
  {
    slug: "real-estate",
    title: "Real Estate",
    icon: BuildingIcon,
    summary: "Lead intake and follow-up, automated.",
    detail: {
      heroDescription:
        "Real estate moves at the speed of whoever responds first. Automation here isn't a nice-to-have — it's the difference between a lead that converts and one that goes to a competitor.",
      painPoints: [
        {
          title: "Leads go cold waiting for a callback",
          body: "By the time someone has a free moment to respond, a fast-moving buyer has already talked to three other agents.",
        },
        {
          title: "Showings are scheduled by phone tag",
          body: "Coordinating a showing across an agent's calendar, the listing, and the buyer's availability eats hours every week.",
        },
        {
          title: "CRM and listing data drift out of sync",
          body: "Manually updating the same lead or listing information in multiple places means something is always slightly out of date.",
        },
        {
          title: "Paperwork slows down every closing",
          body: "Disclosure forms, contracts, and document collection depend on someone chasing down the next signature.",
        },
      ],
      relatedSolutionSlugs: ["ai-agents", "workflow-automation"],
    },
  },
  {
    slug: "medical",
    title: "Medical",
    icon: MedicalIcon,
    summary: "Scheduling and intake without the back-and-forth.",
    detail: {
      heroDescription:
        "Patient-facing administrative work competes directly with patient care for staff time. Automation here gives that time back without touching clinical judgment.",
      painPoints: [
        {
          title: "Scheduling is a game of phone tag",
          body: "Booking, rescheduling, and reminders consume front-desk hours that could go toward patients actually in the office.",
        },
        {
          title: "Intake forms get filled out twice",
          body: "Paper intake at check-in duplicates what a patient could have already provided, and someone still has to key it in.",
        },
        {
          title: "Insurance eligibility checks cause delays",
          body: "Verifying coverage before an appointment is often a manual, time-consuming step that holds up scheduling.",
        },
        {
          title: "Referral coordination falls through the cracks",
          body: "Tracking a referral from request to completion across two organizations usually depends on someone remembering to follow up.",
        },
      ],
      relatedSolutionSlugs: ["ai-agents", "custom-integrations"],
    },
  },
  {
    slug: "legal",
    title: "Legal",
    icon: LegalIcon,
    summary: "Document review that doesn't wait for business hours.",
    detail: {
      heroDescription:
        "Billable hours are too valuable to spend on document triage and status updates. Automation here handles the administrative layer so time goes toward the legal work itself.",
      painPoints: [
        {
          title: "Document review is a bottleneck",
          body: "A first pass through a large document set is repetitive work that still needs to happen before the real analysis starts.",
        },
        {
          title: "Intake and conflict checks take too long",
          body: "A promising new matter can sit waiting on an administrative check before anyone can act on it.",
        },
        {
          title: "Clients chase status updates",
          body: "Without a proactive update, a client's default assumption is that nothing is happening on their matter.",
        },
        {
          title: "Time tracking and billing are manual",
          body: "Reconstructing billable time after the fact is tedious and quietly leaks revenue.",
        },
      ],
      relatedSolutionSlugs: ["ai-agents", "workflow-automation"],
    },
  },
  {
    slug: "manufacturing",
    title: "Manufacturing",
    icon: ManufacturingIcon,
    summary: "Quoting and order processing that keeps pace with the floor.",
    detail: {
      heroDescription:
        "The shop floor moves fast; the back office often doesn't. Automation here closes that gap so quoting, orders, and inventory keep pace with actual production.",
      painPoints: [
        {
          title: "Quotes take days to turn around",
          body: "Assembling an accurate quote from specs, pricing, and capacity manually slows down every deal in the pipeline.",
        },
        {
          title: "Order status is invisible without asking",
          body: "A customer or sales rep asking 'where's my order' usually means someone has to go check manually.",
        },
        {
          title: "Inventory and floor data don't reconcile",
          body: "What the ERP says and what's actually on the floor can drift apart without anyone noticing until it causes a problem.",
        },
        {
          title: "Shop-floor systems and back-office tools don't talk",
          body: "Production equipment, ERP, and order systems often run in isolation, so someone becomes the manual bridge between them.",
        },
      ],
      relatedSolutionSlugs: ["custom-integrations", "intelligent-systems"],
    },
  },
  {
    slug: "education",
    title: "Education",
    icon: EducationIcon,
    summary: "Enrollment and admin work that runs itself.",
  },
  {
    slug: "finance",
    title: "Finance",
    icon: FinanceIcon,
    summary: "Reporting and reconciliation, always current.",
  },
  {
    slug: "ecommerce",
    title: "E-commerce",
    icon: EcommerceIcon,
    summary: "Order and inventory systems that don't need babysitting.",
  },
];

export function getIndustryBySlug(slug: string): IndustryData | undefined {
  return INDUSTRIES.find((industry) => industry.slug === slug);
}

export const INDUSTRIES_WITH_DETAIL_PAGES = INDUSTRIES.filter(
  (industry): industry is IndustryData & { detail: IndustryDetail } => industry.detail !== undefined,
);

/** Pre-narrowed to the four verticals with a `detail` block — avoids an
 * inline type assertion in every `/industries/[slug]` route file. */
export function getIndustryDetailBySlug(
  slug: string,
): (IndustryData & { detail: IndustryDetail }) | undefined {
  return INDUSTRIES_WITH_DETAIL_PAGES.find((industry) => industry.slug === slug);
}
