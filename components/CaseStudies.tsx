import { ArrowUpRight } from "lucide-react";
import { Section } from "./ui/Section";
import { SectionHeader } from "./ui/SectionHeader";
import { Reveal } from "./ui/Reveal";
import { CaseVisual } from "./CaseVisual";

// Structured placeholders. Replace copy and figures with verified client
// results, then remove the illustrative note at the foot of this section.
const CASE_STUDIES = [
  {
    id: "case-01",
    meta: "Case 01 — B2B SaaS · Series B · DACH",
    title: "From fragmented pipeline to a predictable revenue engine.",
    variant: "arcs" as const,
    detail: [
      {
        label: "Problem",
        text: "Three agencies, two outbound tools and no shared definition of a qualified lead.",
      },
      {
        label: "Approach",
        text: "Rebuilt the ICP and narrative, then consolidated outbound into a single owned system.",
      },
      {
        label: "Execution",
        text: "Six-week build, then a weekly operating rhythm run jointly with the in-house team.",
      },
    ],
    metrics: [
      { value: "+248%", label: "Pipeline" },
      { value: "3.4x", label: "Qualified opportunities" },
      { value: "−38%", label: "Cost per opportunity" },
    ],
  },
  {
    id: "case-02",
    meta: "Case 02 — Industrial technology · Growth stage · EU & UK",
    title: "An outbound system that books meetings while the team closes.",
    variant: "lines" as const,
    detail: [
      {
        label: "Problem",
        text: "The founders were the only people who could sell, so growth stalled at their calendar.",
      },
      {
        label: "Approach",
        text: "Productised the founder pitch into a multi-channel engine with routing and clear SLAs.",
      },
      {
        label: "Execution",
        text: "Sequenced rollout across four markets, with messaging tested per segment before scaling.",
      },
    ],
    metrics: [
      { value: "+150%", label: "Meetings booked" },
      { value: "62", label: "Qualified opportunities" },
      { value: "4", label: "New markets entered" },
    ],
  },
];

export function CaseStudies() {
  return (
    <Section id="case-studies" tone="off">
      <SectionHeader
        eyebrow="Results"
        title="Systems that moved the number."
        aside="Every engagement is measured against pipeline, qualified opportunities and cost per opportunity — never against emails sent."
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
                <span className="text-eyebrow text-accent">{study.meta}</span>

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

                <div className="mt-8 grid grid-cols-3 gap-6">
                  {study.metrics.map((metric) => (
                    <div key={metric.label}>
                      <div className="text-numeric text-[24px] font-semibold text-ink md:text-[26px]">
                        {metric.value}
                      </div>
                      <div className="text-meta mt-1 leading-snug text-muted-soft">
                        {metric.label}
                      </div>
                    </div>
                  ))}
                </div>

                <a
                  href="#contact"
                  className="group mt-9 inline-flex items-center gap-1.5 text-[13.5px] font-medium text-ink transition-colors hover:text-accent"
                >
                  Read the full case study
                  <ArrowUpRight
                    size={15}
                    className="transition-transform duration-300 ease-premium group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </a>
              </div>
            </article>
          </Reveal>
        ))}
      </div>

      <Reveal>
        <p className="mt-16 text-[12px] text-muted-soft">
          Case studies are structured placeholders — figures are illustrative
          until client results are verified and approved for publication.
        </p>
      </Reveal>
    </Section>
  );
}
