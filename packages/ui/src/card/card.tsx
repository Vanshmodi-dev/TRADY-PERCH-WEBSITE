import { Link } from "../primitives/link";
import styles from "./card.module.css";
import type {
  CardBodyProps,
  CardFooterProps,
  CardMediaProps,
  CardProps,
  CardTitleProps,
} from "./card.types";

function classNames(...values: Array<string | false | undefined>): string {
  return values.filter(Boolean).join(" ");
}

/**
 * Ch.19 Cards & Containers. Cd-2: this component never renders a placeholder
 * block for a missing Media region — omit `CardMedia` entirely rather than
 * pass a stand-in image; a card with nothing real to show has no Media
 * region, per the anatomy's own optional part (An-1).
 */
export function Card(props: CardProps) {
  const { density = "standard", children, className, "aria-label": ariaLabel } = props;
  const composed = classNames(styles.card, density === "compact" && styles.compact, className);

  if (props.interactivity === "interactive") {
    return (
      <Link
        href={props.href}
        linkComponent={props.linkComponent}
        className={classNames(composed, styles.interactive)}
        aria-label={ariaLabel}
      >
        {children}
      </Link>
    );
  }

  return (
    <div className={composed} aria-label={ariaLabel}>
      {children}
    </div>
  );
}

export function CardTitle({ as: Tag = "h3", children }: CardTitleProps) {
  return <Tag className={styles.title}>{children}</Tag>;
}

export function CardBody({ children }: CardBodyProps) {
  return <p className={styles.body}>{children}</p>;
}

export function CardMedia({ src, alt }: CardMediaProps) {
  return <img className={styles.media} src={src} alt={alt} />;
}

export function CardFooter({ children }: CardFooterProps) {
  return <div className={styles.footer}>{children}</div>;
}
