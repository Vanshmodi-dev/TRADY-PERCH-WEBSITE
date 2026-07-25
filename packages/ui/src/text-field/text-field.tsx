import { useId } from "react";
import styles from "./text-field.module.css";
import type { TextFieldProps } from "./text-field.types";

function classNames(...values: Array<string | false | undefined>): string {
  return values.filter(Boolean).join(" ");
}

/** Ch.11 Iconography: 24x24 grid, 1.5px stroke scaling proportionally.
 * Paired with every error message per Ch.21 §6 / Master Vision §22's
 * color-pairing rule — color alone never carries the Error state. */
function ErrorIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={styles.errorIcon}
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" />
      <line x1="12" y1="8" x2="12" y2="13" />
      <line x1="12" y1="16" x2="12" y2="16.01" />
    </svg>
  );
}

/**
 * Ch.21 Forms & Inputs. Fm-4's shared three-part anatomy (Label, Input
 * Region, Helper/Error Text) covers both `<input>` and `<textarea>` here
 * rather than two near-duplicate components — select/checkbox/radio/
 * toggle are deferred until a real form needs them (Ch.21 §16).
 */
export function TextField({
  id,
  name,
  label,
  value,
  onChange,
  onBlur,
  type = "text",
  multiline = false,
  rows = 4,
  placeholder,
  error,
  helperText,
  required = false,
  size = "md",
  autoComplete,
  className,
}: TextFieldProps) {
  const generatedId = useId();
  const errorId = `${generatedId}-error`;
  const helperId = `${generatedId}-helper`;
  const describedBy = error ? errorId : helperText ? helperId : undefined;

  const inputClassName = classNames(styles.input, styles[size], error && styles.inputError);

  return (
    <div className={classNames(styles.field, className)}>
      <label htmlFor={id} className={styles.label}>
        {label}
        {required ? (
          <span className={styles.required} aria-hidden="true">
            {" "}
            *
          </span>
        ) : null}
      </label>
      {multiline ? (
        <textarea
          id={id}
          name={name}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          onBlur={onBlur}
          placeholder={placeholder}
          required={required}
          rows={rows}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          className={classNames(inputClassName, styles.textarea)}
        />
      ) : (
        <input
          id={id}
          name={name}
          type={type}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          onBlur={onBlur}
          placeholder={placeholder}
          required={required}
          autoComplete={autoComplete}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          className={inputClassName}
        />
      )}
      {error ? (
        <p id={errorId} role="alert" className={styles.errorText}>
          <ErrorIcon />
          {error}
        </p>
      ) : helperText ? (
        <p id={helperId} className={styles.helperText}>
          {helperText}
        </p>
      ) : null}
    </div>
  );
}
