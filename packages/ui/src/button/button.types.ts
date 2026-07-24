import type { MouseEventHandler, ReactNode } from "react";
import type { LinkComponent } from "../primitives/link/link.types";

/** Ch.18 Bt-2 — a closed, three-value axis. No fourth emphasis value. */
export type ButtonEmphasis = "primary" | "secondary" | "ghost";

/** Ch.18 §4 — independent of Emphasis per Ch.17 An-2. */
export type ButtonSize = "sm" | "md" | "lg";

/**
 * Ch.39 St-4: Loading implies Disabled for the triggering element. Error and
 * Success do not apply to a button itself (Ch.18 §6) — a button's result
 * surfaces elsewhere (a form field, a toast), so this is intentionally not a
 * full 4-value content-state union.
 */
export type ButtonStatus = "idle" | "loading";

export interface ButtonProps {
  /** @default "primary" */
  emphasis?: ButtonEmphasis;
  /** @default "md" */
  size?: ButtonSize;
  /**
   * Ch.18 Bt-4 — recolors to Chapter 3's Error tokens without changing
   * Emphasis structure. Never a fourth emphasis value.
   */
  destructive?: boolean;
  /** @default "idle" */
  status?: ButtonStatus;
  /** Ch.39 St-3 — suppresses Hover/Focus/Active entirely. */
  disabled?: boolean;
  /** Ch.18 Bt-3 — supports the label; never replaces it (use IconButton for that). */
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
  /** The button's required text label (Bt-3). */
  children: ReactNode;
  /**
   * Presence of `href` renders a genuine `<a>` (Ch.18 §8: "every button is a
   * genuine, semantically correct interactive element") instead of a
   * `<button>` — for navigation actions like the nav's primary CTA.
   */
  href?: string;
  linkComponent?: LinkComponent;
  onClick?: MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
  /** Only meaningful when rendered as `<button>` (no `href`). @default "button" */
  type?: "button" | "submit" | "reset";
  className?: string;
  id?: string;
  "aria-label"?: string;
}
