import { Section } from "./ui/Section";
import { SectionHeader } from "./ui/SectionHeader";
import { Reveal } from "./ui/Reveal";
import { PlaceholderBadge } from "./ui/PlaceholderBadge";
import type { Dictionary } from "@/lib/i18n/en";

/**
 * DEMO CONTENT — fictional people at fictional companies, written to show the
 * kind of feedback this work aims to produce. These are NOT real customers.
 * The section renders a visible disclosure; replace wholesale with approved
 * quotes (and delete the disclosure) rather than editing a real name onto one.
 */
export function Testimonials({ t }: { t: Dictionary }) {
  return (
    <Section tone="light">
      <SectionHeader
        eyebrow={t.testimonials.eyebrow}
        title={t.testimonials.title}
        aside={t.testimonials.aside}
      />

      <div className="mt-16 grid gap-5 lg:grid-cols-3">
        {t.testimonials.items.map((testimonial, i) => (
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
          <PlaceholderBadge>{t.testimonials.placeholderBadge}</PlaceholderBadge>
          <p className="text-meta text-muted-soft">{t.testimonials.disclosure}</p>
        </div>
      </Reveal>
    </Section>
  );
}
