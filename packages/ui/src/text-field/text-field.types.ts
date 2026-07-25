/** Ch.21 An-2 variant axis — text/email covered now; select/checkbox/radio/
 * toggle are deferred until a real form in this system needs them. */
export type TextFieldType = "text" | "email";

/** Ch.21 §4 — matches Chapter 18's Button size steps for visual rhythm
 * consistency when buttons and fields appear together in one form. */
export type TextFieldSize = "sm" | "md" | "lg";

export interface TextFieldProps {
  id: string;
  name: string;
  /** Ch.21 Fm-1 — persistent, always visible; never placeholder-only. */
  label: string;
  value: string;
  onChange: (value: string) => void;
  /** Ch.21 Fm-2 — the field itself doesn't decide validation timing; the
   * consumer calls this on blur (or its own debounced pause) and passes
   * the result back via `error`. */
  onBlur?: () => void;
  /** @default "text". Ignored when `multiline` is set. */
  type?: TextFieldType;
  /** Renders a `<textarea>` instead of an `<input>`, sharing the same
   * Label/Helper/Error anatomy (Ch.21 Fm-4). */
  multiline?: boolean;
  /** Only meaningful when `multiline` is set. @default 4 */
  rows?: number;
  /** Format example inside the (still-labeled) field — supplements the
   * label, per Fm-1, never substitutes for it. */
  placeholder?: string;
  /** Ch.21 Fm-3 — one field, one error, stated once beneath the field. */
  error?: string;
  /** Shown only when there is no error. */
  helperText?: string;
  required?: boolean;
  /** @default "md" */
  size?: TextFieldSize;
  autoComplete?: string;
  className?: string;
}
