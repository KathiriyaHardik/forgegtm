import { Container } from "./ui/Container";
import { Button } from "./ui/Button";
import { Eyebrow } from "./ui/Eyebrow";
import { Reveal } from "./ui/Reveal";
import { HeroVisual } from "./HeroVisual";
import type { Dictionary } from "@/lib/i18n/en";
import { localePath, type Locale } from "@/lib/i18n/config";

export function Hero({ t, lang }: { t: Dictionary; lang: Locale }) {
  return (
    <section className="relative overflow-hidden pt-16 pb-20 md:pt-24 md:pb-28">
      {/* Two background layers: the wash lights the fold, the cells give it
          structure. Both are decorative and sit behind the content. */}
      <div aria-hidden className="hero-wash pointer-events-none absolute inset-0" />
      <div aria-hidden className="grid-cells pointer-events-none absolute inset-0" />

      <Container className="relative">
        <Reveal>
          <Eyebrow variant="pill">{t.hero.eyebrow}</Eyebrow>
        </Reveal>

        <Reveal delay={70}>
          <h1 className="text-display mt-8 max-w-[15ch] text-balance text-ink">
            {t.hero.headlineLead}{" "}
            <span className="text-accent">{t.hero.headlineAccent}</span>
          </h1>
        </Reveal>

        <Reveal delay={140}>
          <p className="text-lead mt-7 max-w-[56ch] text-muted">{t.hero.body}</p>
        </Reveal>

        <Reveal delay={210}>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Button href={`${localePath(lang)}/#contact`} variant="primary">
              {t.cta.bookCall}
            </Button>
            {/* Goes to the case studies rather than further down this page, so
                it takes the up-right arrow instead of the forward one. */}
            <Button
              href={localePath(lang, "/case-studies")}
              variant="secondary"
              icon="up-right"
            >
              {t.cta.exploreWork}
            </Button>
          </div>
        </Reveal>

        <Reveal delay={270}>
          <HeroVisual caption={t.hero.visualCaption} className="mt-16 md:mt-20" />
        </Reveal>
      </Container>
    </section>
  );
}
