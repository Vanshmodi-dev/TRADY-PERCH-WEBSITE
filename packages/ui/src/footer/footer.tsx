import { Link } from "../primitives/link";
import { Logo } from "../logo";
import styles from "./footer.module.css";
import type { FooterProps } from "./footer.types";

export function Footer({ logoIconSrc, columns, legalLinks, copyrightText, linkComponent }: FooterProps) {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.top}>
          <div className={styles.brandColumn}>
            <Logo iconSrc={logoIconSrc} linkComponent={linkComponent} />
            <p className={styles.tagline}>BUILD. AUTOMATE. GROW.</p>
          </div>
          {columns.map((column) => (
            <nav key={column.heading} className={styles.column} aria-label={column.heading}>
              <span className={styles.columnHeading}>{column.heading}</span>
              {column.links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  linkComponent={linkComponent}
                  className={styles.columnLink}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          ))}
        </div>
        <div className={styles.bottom}>
          <p className={styles.copyright}>{copyrightText}</p>
          <nav className={styles.legalLinks} aria-label="Legal">
            {legalLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                linkComponent={linkComponent}
                className={styles.legalLink}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
