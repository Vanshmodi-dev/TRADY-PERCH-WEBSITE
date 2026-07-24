import { Link } from "../primitives/link";
import styles from "./logo.module.css";
import type { LogoProps } from "./logo.types";

export function Logo({ iconSrc, href = "/", linkComponent, className }: LogoProps) {
  return (
    <Link
      href={href}
      linkComponent={linkComponent}
      className={[styles.logo, className].filter(Boolean).join(" ")}
      aria-label="Trady Perch — home"
    >
      {/* Plain <img>, not next/image — packages/ui is framework-agnostic (ADR-0005). */}
      <img className={styles.icon} src={iconSrc} alt="" />
      <span className={styles.wordmark}>Trady Perch</span>
    </Link>
  );
}
