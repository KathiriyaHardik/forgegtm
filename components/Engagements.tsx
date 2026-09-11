import { ArrowUpRight } from "lucide-react";
import { Section } from "./ui/Section";
import { SectionHeader } from "./ui/SectionHeader";
import { Reveal } from "./ui/Reveal";
import { CaseVisual } from "./CaseVisual";

/**
 * Representative engagement shapes — deliberately NOT presented as client
 * case studies, because no results have been verified and approved yet.
 * When they are, add an `outcome` block per engagement and rename the section
 * back to case studies; the layout supports it without changes.
 */
const ENGAGEMENTS = [
  {
    id: "engagement-a",
    meta: "Engagement A — B2B SaaS · Series B · DACH",
    title: "From fragmented pipeline to a predictable revenue engine.",
    variant: "arcs" as const,
    detail: [
      {
        label: "Situation",
        text: "Three agencies, two outbound tools and no shared definition of a qualified lead.",
      },
      {
        label: "Approach",
        text: "Rebuild the ICP and narrative, then consolidate outbound into a single owned system.",
      },
      {
        label: "Execution",
        text: "Six-week build, then a weekly operating rhythm run jointly with the in-house team.",
      },
      {
        label: "Measured on",
        text: "Pipeline generated, qualified opportunities and cost per opportunity.",
      },
    ],
  },
  {
    id: "engagement-b",
    meta: "Engagement B — Industrial technology · Growth stage · EU & UK",
    title: "An outbound system that books meetings while the team closes.",
    variant: "lines" as const,
    detail: [
      {
        label: "Situation",
        text: "The founders are the only people who can sell, so growth stalls at their calendar.",
      },
      {
        label: "Approach",
        text: "Productise the founder pitch into a multi-channel engine with routing and clear SLAs.",
      },
      {
        label: "Execution",
        text: "Sequenced rollout across markets, with messaging tested per segment before scaling.",
      },
      {
        label: "Measured on",
        text: "Meetings booked, opportunity quality and speed to first qualified conversation.",
      },
    ],
  },
];

export function Engagements() {
  return (
    <Section id="engagements" tone="off">
      <SectionHeader
        eyebrow="Engagements"
        title="What a ForgeGTM engagement looks like."
        aside="Two engagement shapes we build most often. Named clients and verified results are published here once they are measured and approved."
      />

      <div className="mt-16 flex flex-col gap-20 md:gap-28">
        {ENGAGEMENTS.map((engagement, i) => (
          <Reveal key={engagement.id} delay={80}>
            <article
              className={`flex flex-col gap-10 lg:items-center lg:gap-16 ${
                i % 2 === 1 ? "lg:flex-row-reverse" : "lg:flex-row"
              }`}
            >
              <CaseVisual variant={engagement.variant} className="lg:w-[46%]" />

              <div className="lg:w-[54%]">
                <span className="text-eyebrow text-accent">
                  {engagement.meta}
                </span>

                <h3 className="mt-4 max-w-[26ch] text-[26px] font-semibold tracking-[-0.03em] text-balance text-ink md:text-[32px]">
                  {engagement.title}
                </h3>

                <dl className="mt-8 divide-y divide-border border-y border-border">
                  {engagement.detail.map((row) => (
                    <div
                      key={row.label}
                      className="grid gap-1.5 py-4 sm:grid-cols-[118px_1fr] sm:gap-6"
                    >
                      <dt className="text-eyebrow pt-1 text-muted-soft">
                        {row.label}
                      </dt>
                      <dd className="text-body text-ink-soft">{row.text}</dd>
                    </div>
                  ))}
                </dl>

                <a
                  href="#contact"
                  className="group mt-8 inline-flex items-center gap-1.5 text-[13.5px] font-medium text-ink transition-colors hover:text-accent"
                >
                  Discuss a build like this
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
    </Section>
  );
}
