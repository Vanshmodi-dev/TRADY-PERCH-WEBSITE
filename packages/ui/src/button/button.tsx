import { Link } from "../primitives/link";
import styles from "./button.module.css";
import type { ButtonProps } from "./button.types";

function classNames(...values: Array<string | false | undefined>): string {
  return values.filter(Boolean).join(" ");
}

/**
 * Ch.18 Buttons & Actions. Bt-1 (exactly one Primary-emphasis button visible
 * at once) is a design-time discipline this component cannot enforce at
 * runtime — it is enforced by how call sites are composed, not by this
 * component refusing to render.
 */
export function Button({
  emphasis = "primary",
  size = "md",
  destructive = false,
  status = "idle",
  disabled = false,
  leadingIcon,
  trailingIcon,
  children,
  href,
  linkComponent,
  target,
  rel,
  onClick,
  type = "button",
  className,
  id,
  "aria-label": ariaLabel,
}: ButtonProps) {
  const isLoading = status === "loading";
  // Ch.39 St-4: Loading implies Disabled for the triggering element.
  const isDisabled = disabled || isLoading;

  /*
   * A stable, un-hashed hook for the button's emphasis.
   *
   * The class that carries it is a CSS Module name, hashed per build, so
   * nothing outside this file can select on it. Consumers legitimately need
   * to know which button on a page is the primary action — the marketing
   * site's cursor ring is one such consumer, an analytics binding would be
   * another — and the alternative is every call site repeating a data
   * attribute it cannot forget without silently breaking the behaviour.
   */
  const emphasisAttribute = { "data-emphasis": emphasis } as const;

  const composedClassName = classNames(
    styles.button,
    styles[emphasis],
    styles[size],
    destructive && styles.destructive,
    isLoading && styles.loading,
    className,
  );

  const content = (
    <>
      {leadingIcon ? (
        <span className={styles.icon} aria-hidden="true">
          {leadingIcon}
        </span>
      ) : null}
      {children}
      {trailingIcon ? (
        <span className={styles.icon} aria-hidden="true">
          {trailingIcon}
        </span>
      ) : null}
      {isLoading ? (
        <span className={styles.pulse} aria-hidden="true">
          <span className={styles.pulseDot} />
        </span>
      ) : null}
    </>
  );

  if (href) {
    return (
      <Link
        {...emphasisAttribute}
        href={href}
        linkComponent={linkComponent}
        target={target}
        // Applied here rather than at each call site: a security default that
        // depends on every future caller remembering it is not a default.
        // `noopener` denies the opened page a `window.opener` handle back to
        // this one (reverse tabnabbing). An explicit `rel` still wins.
        rel={rel ?? (target === "_blank" ? "noopener noreferrer" : undefined)}
        className={composedClassName}
        id={id}
        aria-label={ariaLabel}
        aria-disabled={isDisabled || undefined}
        aria-busy={isLoading || undefined}
        tabIndex={isDisabled ? -1 : undefined}
        onClick={
          isDisabled
            ? (event) => {
                event.preventDefault();
              }
            : onClick
        }
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      {...emphasisAttribute}
      type={type}
      className={composedClassName}
      id={id}
      aria-label={ariaLabel}
      aria-busy={isLoading || undefined}
      disabled={isDisabled}
      onClick={onClick}
    >
      {content}
    </button>
  );
}
