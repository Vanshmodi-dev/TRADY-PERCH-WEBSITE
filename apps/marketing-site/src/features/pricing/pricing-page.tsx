import { PricingHeader } from "./sections/pricing-header";
import { PricingPrinciples } from "./sections/pricing-principles";
import { PricingPackages } from "./sections/pricing-packages";
import { PricingComparison } from "./sections/pricing-comparison";
import { PricingRoi } from "./sections/pricing-roi";
import { PricingFaq } from "./sections/pricing-faq";
import { PricingCta } from "./sections/pricing-cta";

/**
 * The /pricing route.
 *
 * Composition only — every string this page renders lives in
 * `pricing-config.ts`, and each section owns its own layout. The order is the
 * argument the page is making: state the philosophy, then show the shapes an
 * engagement takes, then let the visitor compare them in full, then let them
 * quantify their own problem, then answer the objection that is by now the
 * loudest one ("why is there no price here"), then ask for the call.
 *
 * A server component. `PricingRoi` is the one client boundary on the route.
 */
export function PricingPage() {
  return (
    <>
      <PricingHeader />
      <PricingPrinciples />
      <PricingPackages />
      <PricingComparison />
      <PricingRoi />
      <PricingFaq />
      <PricingCta />
    </>
  );
}
