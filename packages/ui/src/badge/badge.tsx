import styles from "./badge.module.css";
import type { BadgeProps } from "./badge.types";

function classNames(...values: Array<string | false | undefined>): string {
  return values.filter(Boolean).join(" ");
}

/**
 * Ch.33 Badges. Bd-2 ("accent" badges: at most one per view) is a
 * composition-time discipline, not something this component enforces at
 * runtime — a module-level counter would leak across requests in a
 * server-rendered app (Next.js can render multiple requests in one Node
 * process). Callers are responsible for using `color="accent"` at most
 * once per page.
 */
export function Badge({ color = "neutral", size = "sm", icon, children, className }: BadgeProps) {
  return (
    <span className={classNames(styles.badge, styles[color], styles[size], className)}>
      {icon ? (
        <span className={styles.icon} aria-hidden="true">
          {icon}
        </span>
      ) : null}
      {children}
    </span>
  );
}
