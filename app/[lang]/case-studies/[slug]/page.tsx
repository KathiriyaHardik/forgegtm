import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { CaseVisual } from "@/components/CaseVisual";
import { PlaceholderBadge } from "@/components/ui/PlaceholderBadge";
import { PageCTA } from "@/components/PageCTA";
import { CASE_STUDIES, getCaseStudy } from "@/content/case-studies";
import { getDictionary } from "@/lib/i18n";
import { LOCALES, isLocale, localePath } from "@/lib/i18n/config";

export function generateStaticParams() {
  return LOCALES.flatMap((lang) =>
    CASE_STUDIES.map((study) => ({ lang, slug: study.slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  const study = getCaseStudy(slug);
  if (!isLocale(lang) || !study) return {};

  const c = study.content[lang];
  const url = `${localePath(lang)}/case-studies/${slug}`;

  return {
    title: c.metaTitle,
    description: c.metaDescription,
    alternates: {
      canonical: url,
      languages: Object.fromEntries(
        LOCALES.map((l) => [l, `${localePath(l)}/case-studies/${slug}`])
      ),
    },
    openGraph: {
      type: "article",
      title: c.metaTitle,
      description: c.metaDescription,
      url,
    },
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  const study = getCaseStudy(slug);
  if (!isLocale(lang) || !study) notFound();

  const t = getDictionary(lang);
  const c = study.content[lang];
  const L = t.caseStudies.labels;

  const narrative = [
    { label: L.challenge, body: c.challenge },
    { label: L.situation, body: c.situation },
    { label: L.strategy, body: c.strategy },
    { label: L.approach, body: c.approach },
    { label: L.messaging, body: c.messaging },
    { label: L.results, body: c.results },
  ];

  return (
    <>
      <Navbar t={t} lang={lang} />
      <main id="main">
        {/* Hero */}
        <section className="relative overflow-hidden py-16 md:py-20">
          <div aria-hidden className="grid-lines pointer-events-none absolute inset-0" />
          <Container className="relative">
            <Reveal>
              <Link
                href={`${localePath(lang)}/case-studies`}
                className="text-meta inline-flex items-center gap-1.5 font-medium text-muted transition-colors hover:text-ink"
              >
                <ArrowLeft size={14} />
                {t.cta.backToCaseStudies}
              </Link>
            </Reveal>

            <Reveal delay={70}>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <span className="text-eyebrow text-accent">{c.company}</span>
                <PlaceholderBadge>{t.caseStudies.placeholderBadge}</PlaceholderBadge>
              </div>
            </Reveal>

            <Reveal delay={110}>
              <h1 className="text-h2 mt-5 max-w-[22ch] text-balance text-ink">
                {c.title}
              </h1>
            </Reveal>

            <Reveal delay={160}>
              <p className="text-lead mt-6 max-w-2xl text-muted">{c.summary}</p>
            </Reveal>

            <Reveal delay={200}>
              <dl className="mt-10 grid gap-6 border-t border-border pt-8 sm:grid-cols-2">
                <div>
                  <dt className="text-eyebrow text-muted-soft">{L.industry}</dt>
                  <dd className="text-body mt-2 text-ink-soft">{c.industry}</dd>
                </div>
                <div>
                  <dt className="text-eyebrow text-muted-soft">{L.icp}</dt>
                  <dd className="text-body mt-2 text-ink-soft">{c.icp}</dd>
                </div>
              </dl>
            </Reveal>

            <Reveal delay={250}>
              <CaseVisual variant={study.variant} className="mt-12 aspect-[21/9]" />
            </Reveal>
          </Container>
        </section>

        {/* Metric highlights */}
        <section className="border-y border-border bg-surface-2 py-14">
          <Container>
            <h2 className="text-eyebrow text-muted-soft">{L.metrics}</h2>
            <div className="mt-8 grid grid-cols-2 gap-8 lg:grid-cols-4">
              {c.metrics.map((metric, i) => (
                <Reveal key={metric.label} delay={i * 70}>
                  <div>
                    <div className="text-numeric text-[34px] font-semibold text-ink md:text-[42px]">
                      {metric.value}
                    </div>
                    <div className="text-meta mt-2 text-muted">{metric.label}</div>
                    <div className="mt-1 text-[12px] text-muted-soft">
                      {metric.note}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </Container>
        </section>

        {/* Narrative */}
        <section className="py-20 md:py-24">
          <Container>
            <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
              <div className="lg:self-start">
                <h2 className="text-h2 max-w-[14ch] text-balance text-ink">
                  {L.strategy}
                </h2>
              </div>

              <div className="flex flex-col gap-10">
                {narrative.map((block, i) => (
                  <Reveal key={block.label} delay={i * 50}>
                    <div className="border-t border-border pt-6">
                      <h3 className="text-eyebrow text-accent">{block.label}</h3>
                      <p className="text-body mt-3 max-w-2xl text-ink-soft">
                        {block.body}
                      </p>
                    </div>
                  </Reveal>
                ))}

                <Reveal>
                  <div className="border-t border-border pt-6">
                    <h3 className="text-eyebrow text-accent">{L.execution}</h3>
                    <ul className="mt-4 flex flex-col gap-3">
                      {c.execution.map((item) => (
                        <li
                          key={item}
                          className="text-body flex gap-3 text-ink-soft"
                        >
                          <span
                            aria-hidden
                            className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-accent"
                          />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>

                <Reveal>
                  <div className="border-t border-border pt-6">
                    <h3 className="text-eyebrow text-accent">{L.lessons}</h3>
                    <ul className="mt-4 flex flex-col gap-3">
                      {c.lessons.map((item) => (
                        <li
                          key={item}
                          className="text-body flex gap-3 text-ink-soft"
                        >
                          <span
                            aria-hidden
                            className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-muted-soft"
                          />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              </div>
            </div>
          </Container>
        </section>

        {/* Outcome */}
        <section className="bg-surface-2 py-20 md:py-24">
          <Container>
            <Reveal>
              <h2 className="text-eyebrow text-muted-soft">{L.outcome}</h2>
              <p className="mt-6 max-w-3xl text-[22px] leading-[1.45] font-medium tracking-[-0.02em] text-balance text-ink md:text-[26px]">
                {c.outcome}
              </p>
            </Reveal>

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
