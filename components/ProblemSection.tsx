import { Section } from "./ui/Section";
import { SectionHeader } from "./ui/SectionHeader";
import { Reveal } from "./ui/Reveal";
import type { Dictionary } from "@/lib/i18n/en";

export function ProblemSection({ t }: { t: Dictionary }) {
  return (
    <Section id="approach" tone="light" grid>
      <SectionHeader
        eyebrow={t.problem.eyebrow}
        title={
          <>
            <span className="text-muted-soft">{t.problem.titleMuted}</span>{" "}
            {t.problem.titleRest}
          </>
        }
        aside={t.problem.aside}
      />

      <div className="mt-16 grid gap-5 lg:grid-cols-3">
        {t.problem.items.map((problem, i) => (
          <Reveal key={problem.index} delay={i * 80} className="h-full">
            <article className="rounded-card ease-premium flex h-full flex-col border border-border bg-white p-8 transition-all duration-300 hover:-translate-y-1 hover:border-ink/15 hover:shadow-[0_24px_50px_-32px_rgba(10,10,13,0.35)] md:p-9">
              <span className="text-numeric text-[13px] font-semibold text-muted-soft">
                {problem.index}
              </span>

              <h3 className="text-h3 mt-7 text-ink">{problem.title}</h3>

              <p className="text-body mt-3 text-muted">{problem.description}</p>

              <div className="mt-auto border-t border-border-soft pt-5 text-[11.5px] font-medium tracking-[0.04em] text-muted-soft uppercase">
                {problem.symptom}
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
