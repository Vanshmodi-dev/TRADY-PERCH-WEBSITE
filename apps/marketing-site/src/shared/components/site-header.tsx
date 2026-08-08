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
      // Ch.37 §2 / Pf-1 (Milestone 8 review): Logo renders this via a
      // plain <img> (packages/ui is framework-agnostic, ADR-0005 — no
      // next/image), so the delivered file itself has to already be the
      // right size. Was the raw 862×581 source JPEG (13KB) for a 24px
      // display — logo.module.css's .icon. Ch.37 §2's automated
      // compression pipeline doesn't exist yet in this repo (a disclosed
      // gap, per that chapter's own §12), so this variant (190×128 WebP,
      // 1.4KB — retina-safe headroom for a 24px box) was generated once,
      // manually, via sharp, not regenerated automatically on every build.
      logoIconSrc="/logo-mark-icon.webp"
      // 190x128 is logo-mark-icon.webp's real intrinsic size. It is landscape,
      // not square — sizing both axes to the 24px icon step squashed the mark
      // to 67% of its width sitewide until this was fixed. See
      // packages/ui/src/logo/logo.module.css.
      logoIconWidth={190}
      logoIconHeight={128}
      linkComponent={NextLinkAdapter}
      currentPath={pathname}
    />
  );
}
