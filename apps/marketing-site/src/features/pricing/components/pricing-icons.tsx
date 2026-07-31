import type { SVGProps } from "react";
import type { PrincipleIcon } from "../pricing-config";

/**
 * Design System Bible Ch.11: 24x24 base grid, monoline (stroke-only, no
 * fills), 1.5px stroke at the 24px step, rounded caps and joins. Same
 * construction as `shared/components/icons.tsx` — these live here rather than
 * there because nothing outside the pricing page uses them.
 *
 * Every one is decorative beside its own visible title, so each is
 * `aria-hidden` at the point of use.
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

function CompassIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M15.5 8.5l-2 5-5 2 2-5 5-2z" />
    </svg>
  );
}

function LedgerIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M5 3h11l3 3v15H5z" />
      <path d="M9 9h6M9 13h6M9 17h3" />
    </svg>
  );
}

function BlueprintIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="3" y="5" width="18" height="14" rx="1.5" />
      <path d="M3 10h18M9 10v9" />
      <path d="M13 14h4" />
    </svg>
  );
}

function HandshakeIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M3 11l3-3h4l2 2 2-2h4l3 3" />
      <path d="M6 8v7a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V8" />
      <path d="M10 13h4" />
    </svg>
  );
}

const ICONS: Record<PrincipleIcon, (props: IconProps) => React.JSX.Element> = {
  compass: CompassIcon,
  ledger: LedgerIcon,
  blueprint: BlueprintIcon,
  handshake: HandshakeIcon,
};

export function PrincipleGlyph({ name, ...props }: IconProps & { name: PrincipleIcon }) {
  const Glyph = ICONS[name];
  return <Glyph aria-hidden="true" {...props} />;
}

/** The included/excluded marks in the comparison table and the tier feature lists. */
export function IncludedIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M5 13l4 4L19 7" />
    </svg>
  );
}

export function ExcludedIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M7 12h10" />
    </svg>
  );
}
