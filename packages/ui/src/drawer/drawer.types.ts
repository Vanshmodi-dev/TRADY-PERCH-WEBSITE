import type { ReactNode } from "react";

/** Ch.24 Dw-1 — a Drawer always enters from and stays anchored to one named edge. */
export type DrawerAnchor = "left" | "right" | "bottom";

/** Ch.24 Dw-2 — backdrop weight reflects the Drawer's lower interruption level than a Dialog. */
export type DrawerBackdrop = "dimmed" | "none";

export interface DrawerProps {
  open: boolean;
  onClose: () => void;
  /** @default "right" */
  anchor?: DrawerAnchor;
  /** @default "dimmed" */
  backdrop?: DrawerBackdrop;
  header?: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
  /** Accessible name for the drawer region (required — it has no visible chrome-level label otherwise). */
  "aria-label": string;
  id?: string;
}
