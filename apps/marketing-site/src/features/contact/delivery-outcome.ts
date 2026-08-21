/**
 * The result of trying to deliver one submission down one channel.
 *
 * Shared by both channels so `/api/contact` can reason about them uniformly:
 * an enquiry now goes to an inbox AND to a phone, and the endpoint's job is to
 * decide what to tell the visitor given two independent outcomes.
 *
 * `skipped` is deliberately distinct from `failed`. A channel with no
 * credentials configured has not failed — it was never asked to run, which is
 * the normal state in CI, in a fresh clone, and on any preview deployment
 * without secrets. Collapsing the two would make an unconfigured environment
 * look like an outage, and would make a genuine outage look routine.
 */
export type DeliveryStatus = "sent" | "skipped" | "failed";

export interface DeliveryOutcome {
  status: DeliveryStatus;
  /** Short machine-ish tag for the logs. Present only on `failed`. */
  reason?: string;
}

export const delivered = (): DeliveryOutcome => ({ status: "sent" });
export const skipped = (): DeliveryOutcome => ({ status: "skipped" });
export const failed = (reason: string): DeliveryOutcome => ({ status: "failed", reason });
