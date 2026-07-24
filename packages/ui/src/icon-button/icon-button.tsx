import styles from "./icon-button.module.css";
import type { IconButtonProps } from "./icon-button.types";

function classNames(...values: Array<string | false | undefined>): string {
  return values.filter(Boolean).join(" ");
}

/**
 * Ch.18 §4 — Icon Button. Reserved for well-established, universally
 * recognized actions (close, and — per Bt-3's own exception test — a menu
 * toggle, which is among the most universally recognized icon affordances
 * on the web). Never used as a default, label-less treatment of an
 * ordinary action button.
 */
export function IconButton({
  emphasis = "ghost",
  size = "md",
  disabled = false,
  icon,
  "aria-label": ariaLabel,
  onClick,
  "aria-expanded": ariaExpanded,
  "aria-controls": ariaControls,
  className,
  type = "button",
}: IconButtonProps) {
  return (
    <button
      type={type}
      className={classNames(styles.iconButton, styles[emphasis], styles[size], className)}
      aria-label={ariaLabel}
      aria-expanded={ariaExpanded}
      aria-controls={ariaControls}
      disabled={disabled}
      onClick={onClick}
    >
      {icon}
    </button>
  );
}
