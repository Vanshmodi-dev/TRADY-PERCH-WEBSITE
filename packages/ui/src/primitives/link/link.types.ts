import type { AnchorHTMLAttributes, ComponentType, ReactNode } from "react";

/**
 * Shape a framework router's Link component must satisfy to be injected
 * here. next/link's Link satisfies this shape directly.
 * See docs/adr/0005-shared-ui-portability.md.
 */
export type LinkComponent = ComponentType<
  AnchorHTMLAttributes<HTMLAnchorElement> & { href: string; children?: ReactNode }
>;

export interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  /**
   * Injected by the consuming app for framework-specific navigation
   * (client-side transitions, prefetching). Omit to render a plain `<a>` —
   * this component works with zero configuration outside Next.js.
   */
  linkComponent?: LinkComponent;
  children?: ReactNode;
}
