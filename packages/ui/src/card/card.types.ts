import type { ReactNode } from "react";
import type { LinkComponent } from "../primitives/link/link.types";

/** Ch.19 Cd-1 — a card is explicitly one or the other, never ambiguously both. */
export type CardDensity = "standard" | "compact";

interface CardCommonProps {
  /** @default "standard" */
  density?: CardDensity;
  children: ReactNode;
  className?: string;
  "aria-label"?: string;
}

interface CardStaticProps extends CardCommonProps {
  interactivity?: "static";
}

interface CardInteractiveProps extends CardCommonProps {
  interactivity: "interactive";
  /** Required — Ch.19 Cd-1: an Interactive card's entire surface is one genuine link. */
  href: string;
  linkComponent?: LinkComponent;
}

/** Discriminated on `interactivity` so `href` is only assignable (and required) when interactive. */
export type CardProps = CardStaticProps | CardInteractiveProps;

export interface CardTitleProps {
  /** @default "h3" */
  as?: "h2" | "h3" | "h4";
  children: ReactNode;
}

export interface CardBodyProps {
  children: ReactNode;
}

export interface CardMediaProps {
  src: string;
  alt: string;
}

export interface CardFooterProps {
  children: ReactNode;
}
