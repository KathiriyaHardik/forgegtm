import { Container } from "./ui/Container";
import { Eyebrow } from "./ui/Eyebrow";
import { Reveal } from "./ui/Reveal";
import type { Dictionary } from "@/lib/i18n/en";

/**
 * "How we work" — five stages as full-width rows on dark.
 *
 * The oversized step number is the only ornament, and it is the thing that
 * takes the accent on hover, in step with the problem and services sections.
 * Nothing here is a link, so there is no focus state to mirror it with: the
 * colour is decoration on a row that is already fully readable.
 *
 * The number stays visible rather than being hidden behind the hover, because
 * the sequence is the point of the section.
 */
export function ProcessSection({ t }: { t: Dictionary }) {
  return (
    <section id="process" className="relative overflow-hidden bg-dark py-24 md:py-32">
      <Container className="relative">
        <Reveal>
          <Eyebrow variant="plain">{t.process.eyebrow}</Eyebrow>
        </Reveal>

        <Reveal delay={70}>
          <h2 className="text-h2 mt-6 max-w-[20ch] text-balance text-white">
            {t.process.title}
          </h2>
        </Reveal>

        <div className="mt-14 border-t border-dark-border md:mt-20">
          {t.process.steps.map((step, i) => (
            <Reveal key={step.number} delay={i * 70}>
              <div className="group ease-premium border-b border-dark-border px-4 py-10 transition-colors duration-300 hover:bg-white/[0.03] md:px-8 md:py-12">
                <span className="text-numeric block text-[44px] leading-none font-bold tracking-[-0.04em] text-white/25 transition-colors duration-300 group-hover:text-accent md:text-[56px]">
                  {step.number}
                </span>

                <h3 className="mt-7 text-[21px] leading-[1.2] font-bold tracking-[-0.03em] text-white md:text-[24px]">
                  {step.title}
                </h3>

                <p className="text-body mt-4 max-w-2xl text-white/50">
                  {step.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
