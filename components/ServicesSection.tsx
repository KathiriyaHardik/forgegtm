import { Section } from "./ui/Section";
import { SectionHeader } from "./ui/SectionHeader";
import { Reveal } from "./ui/Reveal";
import type { Dictionary } from "@/lib/i18n/en";

/**
 * Nine services grouped into the three stages of an outbound motion, so the
 * section reads as a system rather than a price list. Each entry leads with
 * the business outcome, not the activity.
 */
export function ServicesSection({ t }: { t: Dictionary }) {
  return (
    <Section id="services" tone="off">
      <SectionHeader
        eyebrow={t.services.eyebrow}
        title={t.services.title}
        aside={t.services.aside}
      />

      <div className="mt-16 grid gap-5 lg:grid-cols-3">
        {t.services.pillars.map((pillar, i) => (
          <Reveal key={pillar.number} delay={i * 80} className="h-full">
            <div className="rounded-card flex h-full flex-col border border-border bg-white p-8 md:p-9">
              <div className="flex items-baseline gap-3">
                <span className="text-numeric text-[13px] font-semibold text-accent">
                  {pillar.number}
                </span>
                <h3 className="text-h3 text-ink">{pillar.name}</h3>
              </div>

              <p className="text-meta mt-3 text-muted">{pillar.summary}</p>

              <ul className="mt-8 flex flex-col gap-6 border-t border-border-soft pt-7">
                {pillar.services.map((service) => (
                  <li key={service.name}>
                    <h4 className="text-[14.5px] font-medium text-ink">
                      {service.name}
                    </h4>
                    <p className="text-meta mt-2 leading-relaxed text-muted">
                      {service.value}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
