import { Section } from "./ui/Section";
import { SectionHeader } from "./ui/SectionHeader";
import { Reveal } from "./ui/Reveal";
import type { Dictionary } from "@/lib/i18n/en";

export function ProcessSection({ t }: { t: Dictionary }) {
  return (
    <Section id="process" tone="dark" grid>
      <SectionHeader
        eyebrow={t.process.eyebrow}
        tone="dark"
        title={t.process.title}
        aside={t.process.aside}
      />

      <div className="mt-16 border-t border-dark-border">
        {t.process.steps.map((step, i) => (
          <Reveal key={step.number} delay={i * 70}>
            <div className="group ease-premium grid grid-cols-1 gap-3 border-b border-dark-border py-8 transition-colors duration-300 hover:bg-white/[0.02] lg:grid-cols-[80px_1fr_1.6fr_150px] lg:items-baseline lg:gap-10 lg:py-9">
              <span className="text-numeric text-[13px] font-semibold text-white/30 transition-colors duration-300 group-hover:text-accent">
                {step.number}
              </span>

              <h3 className="ease-premium text-[21px] font-semibold tracking-[-0.025em] text-white transition-transform duration-300 lg:group-hover:translate-x-1">
                {step.title}
              </h3>

              <p className="text-body max-w-lg text-white/50">{step.description}</p>

              <div className="lg:text-right">
                <div className="text-meta text-white/70">{step.output}</div>
                <div className="text-meta mt-1 text-white/30">{step.duration}</div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
