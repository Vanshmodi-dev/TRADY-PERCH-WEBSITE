import type { ReactNode } from "react";

export interface AccordionItemData {
  id: string;
  question: string;
  answer: ReactNode;
}

export interface AccordionProps {
  /** Ch.37 Ac-1 — exactly one item open at a time by default. */
  items: AccordionItemData[];
  defaultOpenId?: string;
  "aria-label"?: string;
  /**
   * Each item's question is a heading one level below whatever heading
   * immediately precedes this accordion in the page — WCAG 2.4.6 / axe's
   * heading-order rule requires levels never skip going deeper. Callers
   * whose accordion sits directly under the page's own `<h1>` (no
   * intervening `<h2>`) must pass "h2"; the ordinary case, an accordion
   * under a section's own `<h2>` (Design System Bible Ch.4's homepage
   * default), needs no override. @default "h3"
   */
  headingLevel?: "h2" | "h3";
}
