import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { CaseVisual } from "@/components/CaseVisual";
import { PlaceholderBadge } from "@/components/ui/PlaceholderBadge";
import { PageCTA } from "@/components/PageCTA";
import { CASE_STUDIES } from "@/content/case-studies";
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
    title: t.caseStudies.indexTitle,
    description: t.caseStudies.indexAside,
    alternates: {
      canonical: `${localePath(lang)}/case-studies`,
      languages: Object.fromEntries(
        LOCALES.map((l) => [l, `${localePath(l)}/case-studies`])
      ),
    },
    openGraph: {
      title: `${t.caseStudies.indexTitle} | ForgeGTM`,
      description: t.caseStudies.indexAside,
      url: `${localePath(lang)}/case-studies`,
    },
  };
}

export default async function CaseStudiesIndex({
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
        <section className="relative overflow-hidden py-20 md:py-24">
          <div aria-hidden className="grid-lines pointer-events-none absolute inset-0" />
          <Container className="relative">
            <Reveal>
              <Eyebrow>{t.caseStudies.eyebrow}</Eyebrow>
            </Reveal>
            <Reveal delay={70}>
              <h1 className="text-h2 mt-5 max-w-[20ch] text-balance text-ink">
                {t.caseStudies.indexHeadline}
              </h1>
            </Reveal>
            <Reveal delay={140}>
              <p className="text-lead mt-6 max-w-xl text-muted">
                {t.caseStudies.indexAside}
              </p>
            </Reveal>
          </Container>
        </section>

        <section className="bg-surface-2 py-20 md:py-24">
          <Container>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {CASE_STUDIES.map((study, i) => {
                const c = study.content[lang];
                return (
                  <Reveal key={study.slug} delay={i * 70} className="h-full">
                    <Link
                      href={`${localePath(lang)}/case-studies/${study.slug}`}
                      className="rounded-card ease-premium group flex h-full flex-col overflow-hidden border border-border bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_50px_-32px_rgba(10,10,13,0.35)]"
                    >
                      <CaseVisual
                        variant={study.variant}
                        className="rounded-none border-0 border-b border-border"
                      />
                      <div className="flex flex-1 flex-col p-7">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-eyebrow text-accent">
                            {c.company}
                          </span>
                          <PlaceholderBadge>
                            {t.caseStudies.placeholderBadge}
                          </PlaceholderBadge>
                        </div>
                        <p className="text-meta mt-2 text-muted-soft">
                          {c.industry}
                        </p>
                        <h2 className="text-h3 mt-4 text-ink">{c.title}</h2>
                        <p className="text-meta mt-3 leading-relaxed text-muted">
                          {c.summary}
                        </p>

                        <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 border-t border-border-soft pt-5">
                          {c.metrics.slice(0, 2).map((metric) => (
                            <div key={metric.label}>
                              <div className="text-numeric text-[19px] font-semibold text-ink">
                                {metric.value}
                              </div>
                              <div className="text-[11.5px] text-muted-soft">
                                {metric.label}
                              </div>
                            </div>
                          ))}
                        </div>

                        <span className="mt-6 inline-flex items-center gap-1.5 text-[13px] font-medium text-ink transition-colors group-hover:text-accent">
                          {t.cta.readCaseStudy}
                          <ArrowUpRight size={14} />
                        </span>
                      </div>
                    </Link>
                  </Reveal>
                );
              })}
            </div>

            <Reveal>
              <p className="text-meta mt-12 max-w-3xl border-t border-border pt-6 text-muted-soft">
                <strong className="font-medium text-muted">
                  {t.caseStudies.disclosureLead}
                </strong>{" "}
                {t.caseStudies.disclosure}
              </p>
            </Reveal>
          </Container>
        </section>

        <PageCTA t={t} lang={lang} title={t.about.ctaTitle} />
      </main>
      <Footer t={t} lang={lang} />
    </>
  );
}
