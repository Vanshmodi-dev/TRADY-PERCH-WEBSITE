import type { MouseEventHandler, ReactNode } from "react";
import type { ButtonEmphasis, ButtonSize } from "../button/button.types";

export interface IconButtonProps {
  /** @default "ghost" */
  emphasis?: ButtonEmphasis;
  /** @default "md" */
  size?: ButtonSize;
  disabled?: boolean;
  icon: ReactNode;
  /**
   * Required — Ch.18 §8: the icon's meaning must be available to assistive
   * technology even though no visible label is present.
   */
  "aria-label": string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  /** For toggle buttons (e.g. a mobile nav trigger) — sets aria-expanded. */
  "aria-expanded"?: boolean;
  "aria-controls"?: string;
  className?: string;
  type?: "button" | "submit" | "reset";
}
