import { Section } from "./ui/Section";
import { SectionHeader } from "./ui/SectionHeader";
import { Reveal } from "./ui/Reveal";
import { CaseVisual } from "./CaseVisual";
import { PlaceholderBadge } from "./ui/PlaceholderBadge";

/**
 * DEMO CONTENT — these are illustrative scenarios built on fictional
 * companies and modelled figures. They are NOT ForgeGTM clients and the
 * numbers are not measured results.
 *
 * Every card renders a visible "Illustrative example" badge and the section
 * carries a disclosure line. When replacing these with real, client-approved
 * case studies, remove the badge and the disclosure along with the data.
 */
const CASE_STUDIES = [
  {
    id: "northfield",
    company: "Northfield Analytics",
    meta: "B2B SaaS · Series B · 90 employees · DACH",
    title: "Replacing scattergun outbound with a targeted motion.",
    variant: "arcs" as const,
    detail: [
      {
        label: "Situation",
        text: "Two SDRs emailing a 40,000-row list bought from a data vendor, with reply rates under 1% and a domain already flagged by spam filters.",
      },
      {
        label: "Approach",
        text: "Rebuilt the ICP down to 1,200 accounts showing hiring and tech-stack signals, moved sending to dedicated warmed domains, and rewrote sequences per segment.",
      },
      {
        label: "Result",
        text: "Fewer people contacted, materially more conversations — and a sending setup that stopped putting the primary domain at risk.",
      },
    ],
    metrics: [
      { value: "4.1%", label: "Reply rate", note: "from 0.8%" },
      { value: "37", label: "Qualified meetings", note: "in 90 days" },
      { value: "€1.2M", label: "Pipeline generated", note: "modelled" },
    ],
  },
  {
    id: "vantix",
    company: "Vantix Industrial",
    meta: "Industrial technology · Growth stage · EU & UK",
    title: "Taking outbound off the founders' calendars.",
    variant: "lines" as const,
    detail: [
      {
        label: "Situation",
        text: "Both founders were the only people who could run a credible first call, so new pipeline stalled whenever they were travelling or delivering.",
      },
      {
        label: "Approach",
        text: "Productised the founder pitch into segment-specific messaging, built routing and qualification criteria, then launched across four markets in sequence.",
      },
      {
        label: "Result",
        text: "A repeatable motion two non-founder reps could run, with qualification happening before anything reached a founder's calendar.",
      },
    ],
    metrics: [
      { value: "24", label: "Meetings / month", note: "from 6" },
      { value: "31%", label: "Meeting-to-opportunity", note: "modelled" },
      { value: "4", label: "Markets live", note: "in 6 months" },
    ],
  },
];

export function CaseStudies() {
  return (
    <Section id="case-studies" tone="off">
      <SectionHeader
        eyebrow="Case studies"
        title="What a working outbound system looks like."
        aside="Two scenarios showing how the pieces come together in practice — the situation we typically walk into, what we change, and what moves as a result."
      />

      <div className="mt-16 flex flex-col gap-20 md:gap-28">
        {CASE_STUDIES.map((study, i) => (
          <Reveal key={study.id} delay={80}>
            <article
              className={`flex flex-col gap-10 lg:items-center lg:gap-16 ${
                i % 2 === 1 ? "lg:flex-row-reverse" : "lg:flex-row"
              }`}
            >
              <CaseVisual variant={study.variant} className="lg:w-[46%]" />

              <div className="lg:w-[54%]">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-eyebrow text-accent">
                    {study.company}
                  </span>
                  <PlaceholderBadge />
                </div>

                <p className="text-meta mt-2.5 text-muted-soft">{study.meta}</p>

                <h3 className="mt-4 max-w-[26ch] text-[26px] font-semibold tracking-[-0.03em] text-balance text-ink md:text-[32px]">
                  {study.title}
                </h3>

                <dl className="mt-8 divide-y divide-border border-y border-border">
                  {study.detail.map((row) => (
                    <div
                      key={row.label}
                      className="grid gap-1.5 py-4 sm:grid-cols-[104px_1fr] sm:gap-6"
                    >
                      <dt className="text-eyebrow pt-1 text-muted-soft">
                        {row.label}
                      </dt>
                      <dd className="text-body text-ink-soft">{row.text}</dd>
                    </div>
                  ))}
                </dl>

                <div className="mt-8 grid grid-cols-3 gap-5">
                  {study.metrics.map((metric) => (
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
              </div>
            </article>
          </Reveal>
        ))}
      </div>

      <Reveal>
        <p className="text-meta mt-16 max-w-2xl border-t border-border pt-6 text-muted-soft">
          <strong className="font-medium text-muted">
            About these case studies:
          </strong>{" "}
          Northfield Analytics and Vantix Industrial are fictional companies,
          and the figures shown are modelled to illustrate how the work fits
          together. They do not represent ForgeGTM clients or measured results.
        </p>
      </Reveal>
    </Section>
  );
}
