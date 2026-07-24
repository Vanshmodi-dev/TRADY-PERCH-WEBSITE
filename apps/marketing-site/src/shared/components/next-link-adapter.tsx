import NextLink from "next/link";
import type { LinkComponent } from "@trady-perch/ui";

/**
 * The one place next/link is wired into @trady-perch/ui's framework-agnostic
 * Link slot (docs/adr/0005-shared-ui-portability.md). Pass this to any
 * packages/ui component's `linkComponent` prop to get client-side
 * navigation/prefetching; omit it and the component still works via plain
 * `<a>` tags.
 */
export const NextLinkAdapter: LinkComponent = ({ href, children, ...rest }) => (
  <NextLink href={href} {...rest}>
    {children}
  </NextLink>
);
