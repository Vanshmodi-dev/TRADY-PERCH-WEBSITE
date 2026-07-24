import type { Metadata } from "next";
import { Button } from "@trady-perch/ui";
import { NextLinkAdapter } from "@/shared/components/next-link-adapter";
import styles from "./not-found.module.css";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false },
};

function EmptyStateIcon() {
  return (
    <svg viewBox="0 0 48 48" fill="none" aria-hidden="true" className={styles.icon}>
      <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="1.5" />
      <path d="M17 20h.01M31 20h.01M16 30c2-3 5-4.5 8-4.5s6 1.5 8 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export default function NotFound() {
  return (
    <section className={styles.notFound}>
      <EmptyStateIcon />
      <h1 className={styles.headline}>This page doesn&apos;t exist</h1>
      <p className={styles.supportingText}>
        The page you&apos;re looking for may have moved or the link may be out of date.
      </p>
      <Button href="/" linkComponent={NextLinkAdapter} emphasis="secondary">
        Return home
      </Button>
    </section>
  );
}
