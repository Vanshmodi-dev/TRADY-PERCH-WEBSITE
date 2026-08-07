import { Link } from "../primitives/link";
import { Logo } from "../logo";
import { SocialIcon } from "./footer-social-icons";
import styles from "./footer.module.css";
import type { FooterProps } from "./footer.types";

/**
 * The footer.
 *
 * A brand column that states what the company does and where it does it, the
 * site's own map beside it, and one quiet line of legal underneath a rule.
 * Nothing here is a call to action — the page above has already made every
 * offer it is going to make, and a footer that keeps selling reads as a
 * business that is not confident the page worked.
 */
export function Footer({
  logoIconSrc,
  columns,
  legalLinks,
  copyrightText,
  originLines,
  socialLinks,
  linkComponent,
}: FooterProps) {
  // Entries without a URL are skipped rather than rendered inert: an icon
  // that links nowhere costs more trust than a missing one.
  const social = (socialLinks ?? []).filter((link) => link.href.trim().length > 0);

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.top}>
          <div className={styles.brandColumn}>
            <Logo iconSrc={logoIconSrc} linkComponent={linkComponent} />
            <p className={styles.tagline}>BUILD. AUTOMATE. GROW.</p>

            {originLines && originLines.length > 0 ? (
              /*
               * Provenance. For a services business bought on trust, where the
               * work is done and who it is done for are credentials rather
               * than details — and they belong under the tagline, where the
               * eye already is, rather than lost in the legal row.
               */
              <p className={styles.origin}>
                {originLines.map((line) => (
                  <span key={line} className={styles.originLine}>
                    {line}
                  </span>
                ))}
              </p>
            ) : null}

            {social.length > 0 ? (
              <ul className={styles.social} aria-label="Trady Perch on social platforms">
                {social.map((link) => (
                  <li key={link.platform}>
                    <Link
                      href={link.href}
                      linkComponent={linkComponent}
                      className={styles.socialLink}
                      target="_blank"
                      rel="noopener noreferrer me"
                      /* The visible content is a mark with no text, so the
                         accessible name has to be written out — and it names
                         the destination rather than the icon, because "opens
                         GitHub" is what a visitor is choosing. */
                      aria-label={`Trady Perch on ${link.platform} (opens in a new tab)`}
                    >
                      <SocialIcon platform={link.platform} className={styles.socialIcon} />
                    </Link>
                  </li>
                ))}
              </ul>
            ) : null}
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
