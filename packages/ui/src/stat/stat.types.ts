export type StatSize = "sm" | "md";

export interface StatProps {
  /** The numeral/result itself, e.g. "40%", "12 hrs/week", "3x". */
  value: string;
  /** What the numeral measures, e.g. "faster lead response". */
  label: string;
  /** @default "md" */
  size?: StatSize;
  className?: string;
}
