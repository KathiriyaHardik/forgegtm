import { Section } from "./ui/Section";
import { SectionHeader } from "./ui/SectionHeader";
import { Reveal } from "./ui/Reveal";
import { PlaceholderBadge } from "./ui/PlaceholderBadge";

/**
 * DEMO CONTENT — fictional people at fictional companies, written to show the
 * kind of feedback this work aims to produce. These are NOT real customers.
 *
 * The section renders a visible disclosure. Replace wholesale with approved
 * quotes (and delete the disclosure) once real ones exist — never edit a name
 * onto one of these.
 */
const TESTIMONIALS = [
  {
    quote:
      "The targeting work was the part we underestimated. We contact far fewer companies now and speak to more of the right ones.",
    name: "Ana Weber",
    role: "Head of Growth",
    company: "Northfield Analytics",
  },
  {
    quote:
      "Deliverability was the silent problem. Once the infrastructure was rebuilt, the same messaging started getting replies.",
    name: "Daniel Achterberg",
    role: "Chief Revenue Officer",
    company: "Vantix Industrial",
  },
  {
    quote:
      "Our reps stopped building lists and started having conversations. That alone changed what the week looks like.",
    name: "Priya Nandakumar",
    role: "VP Sales",
    company: "Anthemik",
  },
];

export function Testimonials() {
  return (
    <Section tone="light">
      <SectionHeader
        eyebrow="Testimonials"
        title="What better outbound sounds like."
        aside="The shift teams describe is rarely about volume — it is about talking to fewer, better-qualified companies, more often."
      />

      <div className="mt-16 grid gap-5 lg:grid-cols-3">
        {TESTIMONIALS.map((testimonial, i) => (
          <Reveal key={testimonial.name} delay={i * 80} className="h-full">
            <figure className="rounded-card flex h-full flex-col border border-border bg-white p-8">
              <blockquote className="text-[17px] leading-[1.5] font-medium tracking-[-0.015em] text-ink">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>

              <figcaption className="mt-auto flex items-center gap-3.5 border-t border-border-soft pt-6">
                <span
                  aria-hidden
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-surface-3 text-[13px] font-semibold text-ink-soft"
                >
                  {testimonial.name
                    .split(" ")
                    .map((part) => part[0])
                    .join("")}
                </span>
                <div>
                  <div className="text-[14px] font-semibold text-ink">
                    {testimonial.name}
                  </div>
                  <div className="text-meta text-muted">
                    {testimonial.role}, {testimonial.company}
                  </div>
                </div>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>

      <Reveal>
        <div className="mt-10 flex flex-wrap items-center gap-3 border-t border-border pt-6">
          <PlaceholderBadge>Placeholder testimonials</PlaceholderBadge>
          <p className="text-meta text-muted-soft">
            Written for demonstration using fictional names and companies — not
            real customer quotes.
          </p>
        </div>
      </Reveal>
    </Section>
  );
}
