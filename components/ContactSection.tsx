import { ArrowRight } from "lucide-react";
import { Container } from "./ui/Container";
import { Marquee } from "./ui/Marquee";
import { Reveal } from "./ui/Reveal";
import { StrategyCallModal } from "./StrategyCallModal";
import type { Dictionary } from "@/lib/i18n/en";
import type { Locale } from "@/lib/i18n/config";

/**
 * Closing call to action.
 *
 * One centred message and one button. Everything that used to sit here
 * (the three-step explainer, the side panel) competed with the only action
 * the page wants at this point, which is to open the form.
 *
 * The button is a plain #contact link, so it behaves exactly like every other
 * "Book a Strategy Call" on the site: the modal keys off the hash and nothing
 * here needs to know it exists.
 */
export function ContactSection({ t, lang }: { t: Dictionary; lang: Locale }) {
  return (
    <section
      id="contact"
      className="relative scroll-mt-20 overflow-hidden bg-[#070b16]"
    >
      {/* Navy wash behind the headline, so the section reads as a destination
          rather than another dark band. */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-0 left-1/2 h-[720px] w-[1100px] -translate-x-1/2 -translate-y-1/4"
        style={{
          background:
            "radial-gradient(closest-side, rgba(45,94,245,0.22), rgba(45,94,245,0) 70%)",
        }}
      />

      <Container className="relative py-28 md:py-36">
        <Reveal>
          <h2 className="text-h2 mx-auto max-w-[16ch] text-center text-balance text-white">
            {t.contact.titleLead}{" "}
            <span className="text-accent">{t.contact.titleAccent}</span>
          </h2>
        </Reveal>

        <Reveal delay={80}>
          <p className="text-lead mx-auto mt-6 max-w-xl text-center text-white/55">
            {t.contact.body}
          </p>
        </Reveal>

        <Reveal delay={150}>
          <div className="mt-12 flex justify-center">
            <a
              href="#contact"
              className="group ease-premium inline-flex items-center justify-center gap-2.5 rounded-full bg-white px-9 py-5 text-[16px] font-semibold whitespace-nowrap text-ink transition-all duration-300 hover:-translate-y-px hover:shadow-[0_18px_40px_-16px_rgba(255,255,255,0.45)] focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-dark focus-visible:outline-none"
            >
              <span>{t.cta.bookCall}</span>
              <ArrowRight
                size={18}
                className="ease-premium transition-transform duration-300 group-hover:translate-x-1"
              />
            </a>
          </div>
        </Reveal>
      </Container>

      <StrategyCallModal t={t} lang={lang} />

      <div className="relative border-t border-white/[0.07] py-6">
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
