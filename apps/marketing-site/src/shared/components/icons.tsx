import type { SVGProps } from "react";

/**
 * Design System Bible Ch.11 Iconography System: 24x24 base grid, monoline
 * (stroke-only, no fills), 1.5px stroke at the 24px step, rounded caps and
 * joins throughout, never sharp miters. Every icon here is decorative
 * alongside adjacent visible text, so each is marked aria-hidden at its
 * point of use rather than individually — none carries meaning on its own.
 */
type IconProps = SVGProps<SVGSVGElement>;

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function SparkIcon(props: IconProps) {
  // A four-point sparkle, not radiating spokes — the original 8-line
  // asterisk construction read as a loading spinner on static content
  // (caught in Milestone 3 visual QA), which is exactly backwards for an
  // icon that never represents a pending/loading state.
  return (
    <svg {...base} {...props}>
      <path d="M12 3c.6 4.7 2.3 6.4 7 7-4.7.6-6.4 2.3-7 7-.6-4.7-2.3-6.4-7-7 4.7-.6 6.4-2.3 7-7z" />
    </svg>
  );
}

export function WorkflowIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="3" y="4" width="6" height="6" rx="1.5" />
      <rect x="15" y="14" width="6" height="6" rx="1.5" />
      <path d="M9 7h4a3 3 0 0 1 3 3v4" />
      <path d="M13 11l3-3 3 3" />
    </svg>
  );
}

export function IntegrationIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M8 4h3v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h3" />
      <path d="M6 10v10M18 4h3v4a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2V4h3" />
      <path d="M18 10v4a2 2 0 0 1-2 2H6" />
    </svg>
  );
}

export function CloudIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M7 18a4 4 0 0 1-.6-7.96A5 5 0 0 1 16 9a3.5 3.5 0 0 1 1 6.9" />
      <path d="M7 18h10" />
    </svg>
  );
}

export function DataIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <ellipse cx="12" cy="5" rx="7" ry="2.5" />
      <path d="M5 5v14c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5V5" />
      <path d="M5 12c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5" />
    </svg>
  );
}

export function ShieldIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}

export function BuildingIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="5" y="3" width="14" height="18" rx="1" />
      <path d="M9 8h.01M15 8h.01M9 12h.01M15 12h.01M9 16h.01M15 16h.01" />
    </svg>
  );
}

export function MedicalIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 8v8M8 12h8" />
      <rect x="4" y="4" width="16" height="16" rx="3" />
    </svg>
  );
}

export function LegalIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 3v18M7 21h10" />
      <path d="M5 7h6M13 7h6" />
      <path d="M5 7l-2.5 5a2.5 2.5 0 0 0 5 0L5 7zM19 7l-2.5 5a2.5 2.5 0 0 0 5 0L19 7z" />
    </svg>
  );
}

export function ManufacturingIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M3 20V10l5 3V10l5 3V10l5 3v7z" />
      <path d="M3 20h18" />
    </svg>
  );
}

export function EducationIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M2 9l10-5 10 5-10 5-10-5z" />
      <path d="M6 11v5c0 1.5 2.7 3 6 3s6-1.5 6-3v-5" />
    </svg>
  );
}

export function FinanceIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 20V10M10 20V4M16 20v-7M22 20H2" strokeLinecap="round" />
    </svg>
  );
}

export function EcommerceIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M3 4h2l2 12h11l2-8H7" />
      <circle cx="9" cy="20" r="1.2" />
      <circle cx="17" cy="20" r="1.2" />
    </svg>
  );
}

export function ChatIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 5h16v11H8l-4 4V5z" />
      <path d="M8 9h8M8 12h5" />
    </svg>
  );
}

export function KeyboardIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="2" y="6" width="20" height="12" rx="2" />
      <path d="M6 10h.01M10 10h.01M14 10h.01M18 10h.01M6 14h12" />
    </svg>
  );
}

export function BellOffIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M8 8v1.5c0 3-1 4.5-2.5 6h13" />
      <path d="M13.7 5.2A3 3 0 0 0 9 7.5" />
      <path d="M10 19a2 2 0 0 0 4 0" />
      <path d="M3 3l18 18" />
    </svg>
  );
}

export function HourglassIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M6 3h12M6 21h12" />
      <path d="M7 3v3.5a5 5 0 0 0 2.2 4.15L12 12l2.8 1.35A5 5 0 0 1 17 17.5V21" />
      <path d="M17 3v3.5a5 5 0 0 1-2.2 4.15L12 12l-2.8 1.35A5 5 0 0 0 7 17.5V21" />
    </svg>
  );
}

export function UnlinkIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M13 4l1.5-1.5a3.5 3.5 0 0 1 5 5L18 9" />
      <path d="M11 20l-1.5 1.5a3.5 3.5 0 0 1-5-5L6 15" />
      <path d="M9 9v.01M15 15v.01" />
    </svg>
  );
}

export function CheckIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M5 13l4 4L19 7" />
    </svg>
  );
}
