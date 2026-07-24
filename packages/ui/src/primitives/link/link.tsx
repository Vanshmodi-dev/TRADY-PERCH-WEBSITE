import type { LinkProps } from "./link.types";

/**
 * The sole point where framework-specific navigation is injected into an
 * otherwise framework-agnostic component tree. Every other component that
 * needs to render a link composes this one rather than importing next/link
 * (or any other router) directly. See docs/adr/0005-shared-ui-portability.md.
 */
export function Link({ linkComponent: LinkComponentProp, href, children, ...rest }: LinkProps) {
  if (LinkComponentProp) {
    return (
      <LinkComponentProp href={href} {...rest}>
        {children}
      </LinkComponentProp>
    );
  }
  return (
    <a href={href} {...rest}>
      {children}
    </a>
  );
}
