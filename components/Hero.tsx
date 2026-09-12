import { Container } from "./ui/Container";
import { Button } from "./ui/Button";
import { Eyebrow } from "./ui/Eyebrow";
import { Reveal } from "./ui/Reveal";
import { HeroVisual } from "./HeroVisual";
import type { Dictionary } from "@/lib/i18n/en";
import { localePath, type Locale } from "@/lib/i18n/config";

export function Hero({ t, lang }: { t: Dictionary; lang: Locale }) {
  return (
    <section className="relative overflow-hidden pt-20 pb-20 md:pt-28 md:pb-28">
      <div aria-hidden className="grid-lines pointer-events-none absolute inset-0" />

      <Container className="relative">
        <Reveal>
          <Eyebrow>{t.hero.eyebrow}</Eyebrow>
        </Reveal>

        <Reveal delay={70}>
          <h1 className="text-display mt-6 max-w-[16ch] text-balance text-ink">
            {t.hero.headlineLead}{" "}
            <span className="text-accent">{t.hero.headlineAccent}</span>
          </h1>
        </Reveal>

        <Reveal delay={140}>
          <p className="text-lead mt-7 max-w-[54ch] text-muted">{t.hero.body}</p>
        </Reveal>

        <Reveal delay={210}>
          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
            <Button href={`${localePath(lang)}/#contact`} variant="primary">
              {t.cta.bookCall}
            </Button>
            <Button href={`${localePath(lang)}/#process`} variant="link">
              {t.cta.seeHowItWorks}
            </Button>
          </div>
        </Reveal>

        <Reveal delay={260}>
          <ul className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2">
            {t.hero.qualifiers.map((qualifier) => (
              <li
                key={qualifier}
                className="text-meta flex items-center gap-2.5 text-muted-soft"
              >
                <span aria-hidden className="h-1 w-1 rounded-full bg-muted-soft" />
                {qualifier}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={320}>
          <HeroVisual caption={t.hero.visualCaption} className="mt-16 md:mt-20" />
        </Reveal>
      </Container>
    </section>
  );
}
