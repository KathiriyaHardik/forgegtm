import { ArrowRight } from "lucide-react";
import { Container } from "./ui/Container";
import { Marquee } from "./ui/Marquee";
import { Reveal } from "./ui/Reveal";
import { StrategyCallModal } from "./StrategyCallModal";
import type { Dictionary } from "@/lib/i18n/en";
import type { Locale } from "@/lib/i18n/config";

export function ContactSection({ t, lang }: { t: Dictionary; lang: Locale }) {
  return (
    <section id="contact" className="relative scroll-mt-20 overflow-hidden bg-dark">
      <div
        aria-hidden
        className="pointer-events-none absolute top-0 left-1/2 h-[560px] w-[900px] -translate-x-1/2 -translate-y-1/3"
        style={{
          background:
            "radial-gradient(closest-side, rgba(45,94,245,0.2), rgba(45,94,245,0) 72%)",
        }}
      />

      <Container className="relative py-24 md:py-32">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div>
            <Reveal>
              <span className="text-eyebrow inline-flex items-center gap-2 text-accent">
                <span className="h-1 w-1 rounded-full bg-current" />
                {t.contact.eyebrow}
              </span>
            </Reveal>

            <Reveal delay={70}>
              <h2 className="text-h2 mt-5 max-w-[14ch] text-balance text-white">
                {t.contact.titleLead}{" "}
                <span className="text-accent">{t.contact.titleAccent}</span>
              </h2>
            </Reveal>

            <Reveal delay={140}>
              <p className="text-body mt-5 max-w-sm text-white/55">
                {t.contact.body}
              </p>
            </Reveal>

            <Reveal delay={200}>
              <ol className="mt-10 flex flex-col gap-6 border-t border-dark-border pt-8">
                {t.contact.steps.map((item) => (
                  <li key={item.step} className="flex gap-5">
                    <span className="text-numeric text-[12px] font-semibold text-accent">
                      {item.step}
                    </span>
                    <div>
                      <h3 className="text-[15px] font-medium text-white">
                        {item.title}
                      </h3>
                      <p className="text-meta mt-1.5 max-w-xs text-white/45">
                        {item.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </Reveal>
          </div>

          {/*
            The form itself lives in the modal. This panel is the trigger, and
            it is a plain #contact link so it behaves exactly like every other
            "Book a Strategy Call" call to action on the site — the modal keys
            off the hash, so nothing here needs to know it exists.
          */}
          <Reveal delay={120}>
            <div className="rounded-panel border border-dark-border bg-dark-2 p-8 md:p-10">
              <p className="text-eyebrow text-accent">{t.contact.form.modalEyebrow}</p>
              <h3 className="mt-4 max-w-[16ch] text-[26px] leading-[1.12] font-semibold tracking-[-0.03em] text-balance text-white md:text-[32px]">
                {t.contact.form.modalTitle}
              </h3>
              <p className="text-body mt-4 max-w-sm text-white/55">
                {t.contact.body}
              </p>

              <a
                href="#contact"
                className="group ease-premium mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-4 text-[14.5px] font-semibold whitespace-nowrap text-ink transition-all duration-300 hover:-translate-y-px hover:shadow-[0_16px_34px_-16px_rgba(255,255,255,0.45)] focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-dark focus-visible:outline-none"
              >
                <span>{t.cta.bookCall}</span>
                <ArrowRight
                  size={16}
                  className="ease-premium transition-transform duration-300 group-hover:translate-x-1"
                />
              </a>

              <p className="text-meta mt-5 text-white/35">{t.contact.form.reassurance}</p>
            </div>
          </Reveal>
        </div>
      </Container>

      <StrategyCallModal t={t} lang={lang} />

      <div className="relative border-t border-dark-border py-6">
        <Marquee durationSeconds={40} repeat={5}>
          <span className="flex shrink-0 items-center gap-6 pr-6 text-[15px] font-medium tracking-[-0.02em] whitespace-nowrap text-white/20">
            {t.contact.marquee}
            <span className="h-1 w-1 rounded-full bg-accent/60" />
          </span>
        </Marquee>
      </div>
    </section>
  );
}
