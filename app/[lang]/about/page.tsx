import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { PageCTA } from "@/components/PageCTA";
import { PlaceholderBadge } from "@/components/ui/PlaceholderBadge";
import { TeamSection } from "@/components/TeamSection";
import { getDictionary } from "@/lib/i18n";
import { LOCALES, isLocale, localePath } from "@/lib/i18n/config";

/**
 * Flip to true only when the figures in `about.stats` are verified. While it
 * is false the page says so, so an unchecked number can never read as a fact.
 */
const STATS_CONFIRMED = false;

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const t = getDictionary(lang);

  return {
    title: t.about.metaTitle,
    description: t.about.metaDescription,
    alternates: {
      canonical: `${localePath(lang)}/about`,
      languages: Object.fromEntries(
        LOCALES.map((l) => [l, `${localePath(l)}/about`])
      ),
    },
    openGraph: {
      title: `${t.about.metaTitle} | ForgeGTM`,
      description: t.about.metaDescription,
      url: `${localePath(lang)}/about`,
    },
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = getDictionary(lang);

  return (
    <>
      <Navbar t={t} lang={lang} />
      <main id="main">
        {/* Hero + figures */}
        <section className="relative overflow-hidden bg-gradient-to-b from-surface to-surface-2 py-20 md:py-28">
          <Container className="relative">
            <Reveal>
              <Eyebrow variant="plain">{t.about.eyebrow}</Eyebrow>
            </Reveal>

            <Reveal delay={70}>
              <h1 className="text-display mt-6 max-w-[16ch] text-balance text-ink">
                {t.about.title}
              </h1>
            </Reveal>

            <Reveal delay={140}>
              <p className="text-lead mt-8 max-w-2xl text-muted">{t.about.lead}</p>
            </Reveal>

            <Reveal delay={200}>
              <div className="mt-16 border-y border-border py-10">
                <dl className="grid grid-cols-2 gap-8 lg:grid-cols-4">
                  {t.about.stats.map((stat) => (
                    <div key={stat.label}>
                      <dt className="sr-only">{stat.label}</dt>
                      <dd>
                        <span className="text-numeric block text-[36px] leading-none font-bold tracking-[-0.04em] text-ink md:text-[44px]">
                          {stat.value}
                        </span>
                        <span className="text-meta mt-3 block text-muted">
                          {stat.label}
                        </span>
                      </dd>
                    </div>
                  ))}
                </dl>

                {/*
                  These are business claims a prospect can check. Until someone
                  confirms them they carry a notice, the same way the case
                  studies and team profiles do. Set STATS_CONFIRMED to true
                  only once the numbers are true.
                */}
                {!STATS_CONFIRMED && (
                  <div className="mt-8">
                    <PlaceholderBadge>{t.about.statsNote}</PlaceholderBadge>
                  </div>
                )}
              </div>
            </Reveal>
          </Container>
        </section>

        {/* Story */}
        <section className="bg-surface-2 py-20 md:py-24">
          <Container>
            <div className="flex max-w-3xl flex-col gap-6">
              {t.about.story.map((paragraph, i) => (
                <Reveal key={paragraph.slice(0, 24)} delay={i * 70}>
                  <p className="text-lead text-ink-soft">{paragraph}</p>
                </Reveal>
              ))}
            </div>

            <Reveal delay={210}>
              <div className="mt-16">
                <Eyebrow variant="plain">{t.about.valuesEyebrow}</Eyebrow>
              </div>
            </Reveal>

            <div className="mt-8 grid gap-5 md:grid-cols-3">
              {t.about.values.map((value, i) => (
                <Reveal key={value.title} delay={i * 80} className="h-full">
                  <div className="rounded-card group ease-premium flex h-full flex-col border border-border-soft bg-white p-8 shadow-[0_1px_2px_rgba(10,10,13,0.04)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_50px_-32px_rgba(10,10,13,0.3)]">
                    <span
                      aria-hidden
                      className="h-[5px] w-11 rounded-full bg-ink transition-colors duration-300 group-hover:bg-accent"
                    />
                    <h3 className="mt-7 text-[20px] leading-[1.2] font-bold tracking-[-0.03em] text-ink">
                      {value.title}
                    </h3>
                    <p className="text-body mt-4 text-muted">{value.body}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </Container>
        </section>

        <TeamSection t={t} lang={lang} />

        <PageCTA t={t} lang={lang} title={t.about.ctaTitle} />
      </main>
      <Footer t={t} lang={lang} />
    </>
  );
}
