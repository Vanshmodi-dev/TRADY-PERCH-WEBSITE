import type { ReactNode } from "react";

/** Ch.33 Bd-1 — exactly four colors, each with one fixed, permanent meaning. */
export type BadgeColor = "neutral" | "success" | "error" | "accent";

export type BadgeSize = "sm" | "md";

export interface BadgeProps {
  color?: BadgeColor;
  /** @default "sm" */
  size?: BadgeSize;
  icon?: ReactNode;
  /** Short word or two-word phrase — Ch.33 Bd-3, never a full sentence. */
  children: ReactNode;
  className?: string;
}
