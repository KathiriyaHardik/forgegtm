import { Section } from "./ui/Section";
import { SectionHeader } from "./ui/SectionHeader";
import { Reveal } from "./ui/Reveal";

/**
 * Nine services, grouped into the three stages of an outbound motion so the
 * section reads as a system rather than a price list. Each entry leads with
 * the business outcome, not the activity.
 */
const PILLARS = [
  {
    number: "01",
    name: "Strategy & Targeting",
    summary: "Decide who is worth contacting before spending a euro reaching them.",
    services: [
      {
        name: "Outbound Strategy",
        value:
          "A channel and sequencing plan tied to a revenue number, so outbound stops being a series of disconnected experiments.",
      },
      {
        name: "ICP & Targeting",
        value:
          "A precise definition of who actually buys — and the account list that follows from it — so reps stop working accounts that were never going to close.",
      },
      {
        name: "Buying-Signal Research",
        value:
          "Hiring, funding, tech-stack and trigger events surfaced continuously, so you reach accounts while the need is live rather than months after.",
      },
    ],
  },
  {
    number: "02",
    name: "Infrastructure & Deliverability",
    summary: "Make sure what you send actually reaches a human inbox.",
    services: [
      {
        name: "Email Infrastructure",
        value:
          "Domains, inboxes, authentication and warm-up built as owned infrastructure — not rented from a tool you'd lose access to tomorrow.",
      },
      {
        name: "Deliverability",
        value:
          "Monitoring, list hygiene and sending discipline that keep you out of spam, protecting both reply rates and your primary domain.",
      },
      {
        name: "Campaign Strategy",
        value:
          "Sequence architecture, volume pacing and routing designed so campaigns scale without burning the domains underneath them.",
      },
    ],
  },
  {
    number: "03",
    name: "Messaging & Pipeline",
    summary: "Turn attention into qualified conversations your team can close.",
    services: [
      {
        name: "Personalized Copywriting",
        value:
          "Messaging written per segment and tested continuously, so relevance comes from research rather than a merge tag.",
      },
      {
        name: "Lead Generation",
        value:
          "Consistent top-of-funnel volume with qualification built in, so your calendar fills with conversations worth having.",
      },
      {
        name: "Pipeline Generation",
        value:
          "Meetings handed over with context, tracked through to opportunity, and reported against cost per qualified opportunity.",
      },
    ],
  },
];

export function ServicesSection() {
  return (
    <Section id="services" tone="off">
      <SectionHeader
        eyebrow="What we do"
        title="Everything an outbound motion needs, run as one system."
        aside="Most teams buy these in pieces from different vendors, then spend their time integrating them. ForgeGTM owns the whole chain and is measured on what comes out of it."
      />

      <div className="mt-16 grid gap-5 lg:grid-cols-3">
        {PILLARS.map((pillar, i) => (
          <Reveal key={pillar.number} delay={i * 80} className="h-full">
            <div className="rounded-card flex h-full flex-col border border-border bg-white p-8 md:p-9">
              <div className="flex items-baseline gap-3">
                <span className="text-numeric text-[13px] font-semibold text-accent">
                  {pillar.number}
                </span>
                <h3 className="text-h3 text-ink">{pillar.name}</h3>
              </div>

              <p className="text-meta mt-3 text-muted">{pillar.summary}</p>

              <ul className="mt-8 flex flex-col gap-6 border-t border-border-soft pt-7">
                {pillar.services.map((service) => (
                  <li key={service.name}>
                    <h4 className="text-[14.5px] font-medium text-ink">
                      {service.name}
                    </h4>
                    <p className="text-meta mt-2 leading-relaxed text-muted">
                      {service.value}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
