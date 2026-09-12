import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { PageCTA } from "@/components/PageCTA";
import { getDictionary } from "@/lib/i18n";
import { LOCALES, isLocale, localePath } from "@/lib/i18n/config";

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
        <section className="relative overflow-hidden py-20 md:py-28">
          <div aria-hidden className="grid-lines pointer-events-none absolute inset-0" />
          <Container className="relative">
            <Reveal>
              <Eyebrow>{t.about.eyebrow}</Eyebrow>
            </Reveal>
            <Reveal delay={70}>
              <h1 className="text-h2 mt-5 max-w-[18ch] text-balance text-ink">
                {t.about.title}
              </h1>
            </Reveal>
            <Reveal delay={140}>
              <p className="text-lead mt-7 max-w-2xl text-muted">{t.about.lead}</p>
            </Reveal>
          </Container>
        </section>

        <section className="bg-surface-2 py-20 md:py-24">
          <Container>
            <h2 className="text-h2 max-w-[16ch] text-balance text-ink">
              {t.about.beliefsTitle}
            </h2>

            <div className="mt-14 grid gap-5 md:grid-cols-2">
              {t.about.beliefs.map((belief, i) => (
                <Reveal key={belief.title} delay={i * 70} className="h-full">
                  <div className="rounded-card flex h-full flex-col border border-border bg-white p-8">
                    <span className="text-numeric text-[13px] font-semibold text-accent">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="text-h3 mt-6 text-ink">{belief.title}</h3>
                    <p className="text-body mt-3 text-muted">{belief.body}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </Container>
        </section>

        <section className="py-20 md:py-24">
          <Container>
            <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
              <h2 className="text-h2 max-w-[14ch] text-balance text-ink lg:self-start">
                {t.about.howTitle}
              </h2>

              <ul className="flex flex-col">
                {t.about.how.map((item, i) => (
                  <Reveal key={item} delay={i * 60}>
                    <li className="flex gap-6 border-b border-border py-6 first:border-t">
                      <span className="text-numeric text-[13px] font-semibold text-muted-soft">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <p className="text-body max-w-xl text-ink-soft">{item}</p>
                    </li>
                  </Reveal>
                ))}
              </ul>
            </div>
          </Container>
        </section>

        <PageCTA t={t} lang={lang} title={t.about.ctaTitle} />
      </main>
      <Footer t={t} lang={lang} />
    </>
  );
}
