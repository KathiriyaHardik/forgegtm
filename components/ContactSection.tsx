import { Container } from "./ui/Container";
import { Marquee } from "./ui/Marquee";
import { Reveal } from "./ui/Reveal";
import { ContactForm } from "./ContactForm";
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

          <Reveal delay={120}>
            <ContactForm t={t} lang={lang} />
          </Reveal>
        </div>
      </Container>

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
