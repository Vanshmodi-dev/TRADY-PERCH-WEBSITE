import { Badge, Card } from "@trady-perch/ui";
import { SectionHeading } from "@/shared/components/section-heading";
import styles from "./testimonials.module.css";

const TESTIMONIALS = [
  {
    quote: "Leads stopped falling through the cracks within the first week. It just runs.",
    role: "Operations Lead, Real Estate Brokerage",
  },
  {
    quote: "We finally have quotes going out the same day instead of the same week.",
    role: "General Manager, Manufacturing Supplier",
  },
  {
    quote: "Our front desk got hours back every week, and patients noticed.",
    role: "Practice Manager, Medical Clinic",
  },
];

/**
 * Master Vision Ch.13 item 11. No real client testimonials exist yet
 * (docs/_synthesis/00-vision-brand-synthesis.md confirms this explicitly).
 * Per the master build prompt's own instruction — "Testimonials (real or
 * clearly marked placeholders)" — these are clearly labeled placeholders,
 * not real quotes attributed to invented named people (a generic role
 * placeholder is honest; a fabricated named person with a fabricated
 * quote would not be). Replace with real testimonials as engagements
 * complete.
 */
export function Testimonials() {
  return (
    <section className={styles.section} aria-labelledby="testimonials-heading">
      <div className={styles.container}>
        <SectionHeading
          eyebrow="What clients say"
          heading="Not just our word for it."
          headingId="testimonials-heading"
          align="center"
        />
        {/* No aria-label — Static cards, see industries.tsx for why. */}
        <div className={styles.grid}>
          {TESTIMONIALS.map((testimonial) => (
            <Card key={testimonial.role}>
              <Badge className={styles.badge}>Placeholder</Badge>
              <p className={styles.quote}>&ldquo;{testimonial.quote}&rdquo;</p>
              <p className={styles.attribution}>{testimonial.role} (placeholder)</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
