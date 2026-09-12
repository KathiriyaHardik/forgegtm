import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Section } from "./ui/Section";
import { SectionHeader } from "./ui/SectionHeader";
import { Reveal } from "./ui/Reveal";
import { CaseVisual } from "./CaseVisual";
import { PlaceholderBadge } from "./ui/PlaceholderBadge";
import { CASE_STUDIES } from "@/content/case-studies";
import type { Dictionary } from "@/lib/i18n/en";
import { localePath, type Locale } from "@/lib/i18n/config";

/**
 * Home-page teaser. Full write-ups live at /[lang]/case-studies/[slug];
 * this shows the first two with their headline metrics.
 *
 * DEMO CONTENT — see content/case-studies.ts. Fictional companies, modelled
 * figures, labelled on the page.
 */
export function CaseStudies({ t, lang }: { t: Dictionary; lang: Locale }) {
  const featured = CASE_STUDIES.slice(0, 2);

  return (
    <Section id="case-studies" tone="off">
      <SectionHeader
        eyebrow={t.caseStudies.eyebrow}
        title={t.caseStudies.title}
        aside={t.caseStudies.aside}
      />

      <div className="mt-16 flex flex-col gap-20 md:gap-28">
        {featured.map((study, i) => {
          const c = study.content[lang];
          return (
            <Reveal key={study.slug} delay={80}>
              <article
                className={`flex flex-col gap-10 lg:items-center lg:gap-16 ${
                  i % 2 === 1 ? "lg:flex-row-reverse" : "lg:flex-row"
                }`}
              >
                <CaseVisual variant={study.variant} className="lg:w-[46%]" />

                <div className="lg:w-[54%]">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="text-eyebrow text-accent">{c.company}</span>
                    <PlaceholderBadge>
                      {t.caseStudies.placeholderBadge}
                    </PlaceholderBadge>
                  </div>

                  <p className="text-meta mt-2.5 text-muted-soft">{c.industry}</p>

                  <h3 className="mt-4 max-w-[26ch] text-[26px] font-semibold tracking-[-0.03em] text-balance text-ink md:text-[32px]">
                    {c.title}
                  </h3>

                  <p className="text-body mt-4 max-w-xl text-muted">{c.summary}</p>

                  <div className="mt-8 grid grid-cols-3 gap-5 border-t border-border pt-7">
                    {c.metrics.slice(0, 3).map((metric) => (
                      <div key={metric.label}>
                        <div className="text-numeric text-[24px] font-semibold text-ink md:text-[26px]">
                          {metric.value}
                        </div>
                        <div className="text-meta mt-1 leading-snug text-muted">
                          {metric.label}
                        </div>
                        <div className="mt-0.5 text-[11.5px] text-muted-soft">
                          {metric.note}
                        </div>
                      </div>
                    ))}
                  </div>

                  <Link
                    href={`${localePath(lang)}/case-studies/${study.slug}`}
                    className="group mt-8 inline-flex items-center gap-1.5 text-[13.5px] font-medium text-ink transition-colors hover:text-accent"
                  >
                    {t.cta.readCaseStudy}
                    <ArrowUpRight
                      size={15}
                      className="ease-premium transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </Link>
                </div>
              </article>
            </Reveal>
          );
        })}
      </div>

      <Reveal>
        <div className="mt-16 flex flex-wrap items-center justify-between gap-6 border-t border-border pt-6">
          <p className="text-meta max-w-2xl text-muted-soft">
            <strong className="font-medium text-muted">
              {t.caseStudies.disclosureLead}
            </strong>{" "}
            {t.caseStudies.disclosure}
          </p>
          <Link
            href={`${localePath(lang)}/case-studies`}
            className="text-meta font-medium text-ink transition-colors hover:text-accent"
          >
            {t.cta.allCaseStudies} &rarr;
          </Link>
        </div>
      </Reveal>
    </Section>
  );
}
