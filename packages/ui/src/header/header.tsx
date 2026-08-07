"use client";

import { useEffect, useRef, useState } from "react";
import { Link } from "../primitives/link";
import { Button } from "../button";
import { IconButton } from "../icon-button";
import { Logo } from "../logo";
import { Drawer } from "../drawer";
import styles from "./header.module.css";
import type { HeaderProps, NavItem } from "./header.types";

const RECEDE_SCROLL_THRESHOLD = 24;

function ChevronIcon() {
  // Ch.11: 24x24 base grid, 1.5px stroke at that base — drawn at the
  // canonical viewBox/stroke pair and scaled down via CSS width/height
  // (.dropdownIcon), so the rendered stroke scales proportionally with
  // it (1.5px * 16/24 = 1px at this icon's 16px display size), rather
  // than a mismatched 16x16 viewBox baking in a too-thick fixed 1.5px
  // stroke at that small size (Milestone 3 review).
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={styles.dropdownIcon}>
      <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" width="20" height="20">
      <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" width="20" height="20">
      <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

/** Exact match, or a genuine sub-route (`/work` matches `/work/case-studies`
 * but not an unrelated `/workshop`) — applied consistently whether the
 * item is a flat link or a dropdown, so a nav item stays active anywhere
 * under its own section, not only on that section's own index page. */
function pathIsWithinSection(currentPath: string, sectionHref: string): boolean {
  return currentPath === sectionHref || currentPath.startsWith(`${sectionHref}/`);
}

function isActiveItem(item: NavItem, currentPath?: string): boolean {
  if (!currentPath) return false;
  if (item.href) return pathIsWithinSection(currentPath, item.href);
  if (item.dropdown) {
    if (item.dropdown.some((entry) => pathIsWithinSection(currentPath, entry.href))) return true;
    if (item.viewAllHref && pathIsWithinSection(currentPath, item.viewAllHref)) return true;
  }
  return false;
}

const DROPDOWN_CLOSE_DELAY_MS = 200;

/**
 * Ch.20 Navigation Systems. This component inherently requires browser
 * state (scroll recession, dropdown/menu open state) — a documented
 * exception to packages/ui's default of not baking in "use client", per
 * docs/adr/0005-shared-ui-portability.md.
 */
export function Header({ items, ctaLabel, ctaHref, logoIconSrc, linkComponent, currentPath }: HeaderProps) {
  if (process.env.NODE_ENV !== "production") {
    if (items.length > 5) {
      // Ch.20 Nv-1: five-item hard ceiling. console.warn is allowed by the shared lint config.
      console.warn(`[Header] Ch.20 Nv-1 violation: ${items.length} primary items exceeds the 5-item ceiling.`);
    }
    for (const item of items) {
      if (item.dropdown && item.dropdown.length > 4) {
        // Ch.20 Nv-2: four-sub-item ceiling.
        console.warn(
          `[Header] Ch.20 Nv-2 violation: "${item.label}" dropdown has ${item.dropdown.length} sub-items, exceeding the ceiling of 4.`,
        );
      }
    }
  }

  const [receded, setReceded] = useState(false);
  const [transitionDurationVar, setTransitionDurationVar] = useState<string | undefined>(undefined);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const lastScrollY = useRef(0);
  const dropdownTriggerRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  function scheduleClose(label: string) {
    clearTimeout(closeTimeoutRef.current);
    // A brief delay so a fast/diagonal mouse path from the trigger into the
    // dropdown panel (which sits a few px below it) doesn't fire mouseleave
    // and close the menu before the pointer actually arrives.
    closeTimeoutRef.current = setTimeout(() => {
      setOpenDropdown((current) => (current === label ? null : current));
    }, DROPDOWN_CLOSE_DELAY_MS);
  }

  function cancelScheduledClose() {
    clearTimeout(closeTimeoutRef.current);
  }

  // Ch.20 Nv-4: recede on downward scroll (Standard tier, gradual), reassert
  // promptly on upward scroll (Quick tier) — a deliberate asymmetry.
  useEffect(() => {
    function handleScroll() {
      const currentY = window.scrollY;
      const scrollingDown = currentY > lastScrollY.current;
      if (currentY <= RECEDE_SCROLL_THRESHOLD) {
        setReceded(false);
        setTransitionDurationVar("var(--motion-duration-quick)");
      } else if (scrollingDown) {
        setReceded(true);
        setTransitionDurationVar("var(--motion-duration-standard)");
      } else {
        setReceded(false);
        setTransitionDurationVar("var(--motion-duration-quick)");
      }
      lastScrollY.current = currentY;
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Ch.42 Kb-4: Escape closes the nearest dismissible context (an open dropdown).
  // Also closes on an outside click/tap. Click on the trigger itself only
  // ever OPENS (never toggles-closed) — a mouse click re-enters hover as
  // part of the same interaction, so a toggle would immediately re-close
  // what hover just opened; closing is handled exclusively by Escape,
  // outside-click, and mouseleave instead.
  const navRef = useRef<HTMLElement>(null);
  useEffect(() => {
    if (!openDropdown) return;
    const openLabel = openDropdown;
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpenDropdown(null);
        // Ch.42 Kb-3's return-focus-to-trigger spirit, applied to this
        // disclosure pattern too: don't strand focus on a hidden link.
        dropdownTriggerRefs.current[openLabel]?.focus();
      }
    }
    function handlePointerDown(event: MouseEvent) {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handlePointerDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handlePointerDown);
    };
  }, [openDropdown]);

  useEffect(() => () => clearTimeout(closeTimeoutRef.current), []);

  return (
    <header
      className={[styles.header, receded && styles.receded].filter(Boolean).join(" ")}
      style={transitionDurationVar ? ({ "--nav-transition-duration": transitionDurationVar } as React.CSSProperties) : undefined}
    >
      {/* The class carries the recession's scale transform — see
          .logoMark in header.module.css for why it is a transform and not a
          size change. */}
      <Logo
        iconSrc={logoIconSrc}
        href="/"
        linkComponent={linkComponent}
        className={styles.logoMark}
      />

      <nav className={styles.nav} aria-label="Primary" ref={navRef}>
        {items.map((item) => {
          const active = isActiveItem(item, currentPath);
          if (item.dropdown) {
            const isOpen = openDropdown === item.label;
            return (
              <div
                key={item.label}
                className={[styles.navItem, isOpen && styles.open].filter(Boolean).join(" ")}
                onMouseEnter={() => {
                  cancelScheduledClose();
                  setOpenDropdown(item.label);
                }}
                onMouseLeave={() => scheduleClose(item.label)}
              >
                <button
                  ref={(node) => {
                    dropdownTriggerRefs.current[item.label] = node;
                  }}
                  type="button"
                  className={[styles.navLink, active && styles.active].filter(Boolean).join(" ")}
                  aria-expanded={isOpen}
                  onClick={() => setOpenDropdown(item.label)}
                >
                  {item.label}
                  <ChevronIcon />
                </button>
                {/*
                  A plain, unroled link list — not role="menu"/"menuitem".
                  This is site navigation, not an application menu widget,
                  and role="menu" implies arrow-key/Home/End keyboard
                  behavior (Ch.42 Kb-4) this component doesn't implement;
                  applying the role without the behavior is a recognized
                  WAI-ARIA anti-pattern. Tab/Shift+Tab default order already
                  makes every link reachable.
                */}
                <div className={styles.dropdown}>
                  {item.dropdown.map((entry) => (
                    <Link
                      key={entry.href}
                      href={entry.href}
                      linkComponent={linkComponent}
                      className={styles.dropdownLink}
                    >
                      {entry.label}
                    </Link>
                  ))}
                  {item.viewAllHref ? (
                    <Link
                      href={item.viewAllHref}
                      linkComponent={linkComponent}
                      className={styles.viewAllLink}
                    >
                      {item.viewAllLabel ?? "View all"}
                    </Link>
                  ) : null}
                </div>
              </div>
            );
          }
          return (
            <div key={item.label} className={styles.navItem}>
              <Link
                href={item.href ?? "#"}
                linkComponent={linkComponent}
                className={[styles.navLink, active && styles.active].filter(Boolean).join(" ")}
              >
                {item.label}
              </Link>
            </div>
          );
        })}
      </nav>

      <div className={styles.actions}>
        {/* Ch.20 Nv-3 / §9: the CTA stays visible in the collapsed mobile bar
            itself — ordinary items collapse into the menu icon FIRST, never
            the CTA. Two size-appropriate instances, not one hidden/shown
            pair, so the compact mobile CTA isn't fighting the desktop CTA's
            padding via CSS overrides. */}
        <div className={styles.ctaMobile}>
          <Button href={ctaHref} linkComponent={linkComponent} emphasis="primary" size="sm">
            {ctaLabel}
          </Button>
        </div>
        <div className={styles.ctaDesktop}>
          <Button href={ctaHref} linkComponent={linkComponent} emphasis="primary" size="md">
            {ctaLabel}
          </Button>
        </div>
        <div className={styles.mobileMenuTrigger}>
          <IconButton
            icon={<MenuIcon />}
            aria-label="Open menu"
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav-drawer"
            onClick={() => setMobileOpen(true)}
          />
        </div>
      </div>

      <Drawer
        id="mobile-nav-drawer"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        anchor="right"
        aria-label="Navigation menu"
        header={
          <IconButton icon={<CloseIcon />} aria-label="Close menu" onClick={() => setMobileOpen(false)} />
        }
        footer={
          <Button
            href={ctaHref}
            linkComponent={linkComponent}
            emphasis="primary"
            size="lg"
            className={styles.mobileCta}
            onClick={() => setMobileOpen(false)}
          >
            {ctaLabel}
          </Button>
        }
      >
        <ul className={styles.mobileNavList}>
          {items.map((item) => {
            const active = isActiveItem(item, currentPath);
            return (
              <li key={item.label}>
                {item.dropdown ? (
                  <div className={styles.mobileDropdownGroup}>
                    <span
                      className={[styles.mobileDropdownLabel, active && styles.active]
                        .filter(Boolean)
                        .join(" ")}
                    >
                      {item.label}
                    </span>
                    <div className={styles.mobileDropdownLinks}>
                      {item.dropdown.map((entry) => (
                        <Link
                          key={entry.href}
                          href={entry.href}
                          linkComponent={linkComponent}
                          onClick={() => setMobileOpen(false)}
                        >
                          {entry.label}
                        </Link>
                      ))}
                      {item.viewAllHref ? (
                        <Link
                          href={item.viewAllHref}
                          linkComponent={linkComponent}
                          onClick={() => setMobileOpen(false)}
                        >
                          {item.viewAllLabel ?? "View all"}
                        </Link>
                      ) : null}
                    </div>
                  </div>
                ) : (
                  <Link
                    href={item.href ?? "#"}
                    linkComponent={linkComponent}
                    className={[styles.mobileNavLink, active && styles.active].filter(Boolean).join(" ")}
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      </Drawer>
    </header>
  );
}
