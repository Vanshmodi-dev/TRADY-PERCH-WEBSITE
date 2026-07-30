import { Button } from "@trady-perch/ui";
import { NextLinkAdapter } from "@/shared/components/next-link-adapter";
import { HeroCore } from "./hero-core";
import styles from "./hero.module.css";

/**
 * THE HERO — asymmetric composition, type left, the Core right.
 *
 * Deliberately not centred. Centring turns the object into a hero image;
 * placing it off-axis makes it a subject in a room, with the type block
 * holding the entry point. On narrow viewports the two stack, type first —
 * the claim is never below the object at any width.
 *
 * This is a server component. The headline, supporting copy and both CTAs are
 * in the initial HTML, so the intro overlay always dissolves into a finished
 * hero and a JS failure or slow connection still delivers the full message.
 * Only the Core, which is decorative, is client-side.
 *
 * Choreography: eyebrow, headline, supporting copy, actions, then the object —
 * a staggered settle on the Entrance curve, mount-triggered rather than
 * scroll-triggered, because the hero is the one section already in view.
 */
export function Hero() {
  return (
    <section className={styles.hero} aria-labelledby="hero-heading">
      <div className={styles.grid}>
        <div className={styles.copy}>
          <p className={styles.eyebrow}>Build. Automate. Grow.</p>

          <h1 id="hero-heading" className={styles.headline}>
            The manual work slowing your business down, rebuilt into systems that run themselves.
          </h1>

          <p className={styles.subheadline}>
            Trady Perch designs and deploys AI agents, workflow automation, and custom integrations
            for established businesses ready to stop doing everything by hand.
          </p>

          <div className={styles.actions}>
            <Button href="/contact" linkComponent={NextLinkAdapter} size="lg">
              Book a Strategy Call
            </Button>
            <Button
              href="/#ai-demo-heading"
              linkComponent={NextLinkAdapter}
              emphasis="ghost"
              size="lg"
            >
              See it in action
            </Button>
          </div>
        </div>

        <div className={styles.object}>
          <HeroCore />
        </div>
      </div>
    </section>
  );
}
