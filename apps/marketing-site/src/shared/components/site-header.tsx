"use client";

import { usePathname } from "next/navigation";
import { Header } from "@trady-perch/ui";
import { NextLinkAdapter } from "./next-link-adapter";
import { PRIMARY_CTA, PRIMARY_NAV_ITEMS } from "../navigation";

/**
 * Bridges next/navigation's usePathname() into @trady-perch/ui's
 * framework-agnostic Header (Ch.20 §6: persistent active-item underline).
 * packages/ui itself never imports next/navigation directly — ADR-0005.
 */
export function SiteHeader() {
  const pathname = usePathname();
  return (
    <Header
      items={PRIMARY_NAV_ITEMS}
      ctaLabel={PRIMARY_CTA.label}
      ctaHref={PRIMARY_CTA.href}
      logoIconSrc="/logo-mark.jpeg"
      linkComponent={NextLinkAdapter}
      currentPath={pathname}
    />
  );
}
