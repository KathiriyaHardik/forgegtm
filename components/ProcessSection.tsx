import { Section } from "./ui/Section";
import { SectionHeader } from "./ui/SectionHeader";
import { Reveal } from "./ui/Reveal";

const STEPS = [
  {
    number: "01",
    title: "Research",
    description:
      "We define the ICP, map the buying committee, and identify the accounts showing real buying signals right now.",
    output: "ICP & account list",
    duration: "Week 1–2",
  },
  {
    number: "02",
    title: "Build",
    description:
      "Targeting, messaging, sending infrastructure and campaign architecture get built and warmed before anything goes out.",
    output: "Live infrastructure",
    duration: "Week 2–4",
  },
  {
    number: "03",
    title: "Launch",
    description:
      "Campaigns go live and are managed daily — replies routed, objections logged, volume paced to protect deliverability.",
    output: "Booked meetings",
    duration: "Week 5",
  },
  {
    number: "04",
    title: "Optimize",
    description:
      "We test messaging against real reply data, retire what underperforms, and expand into adjacent segments as signal proves out.",
    output: "Compounding pipeline",
    duration: "Ongoing",
  },
];

export function ProcessSection() {
  return (
    <Section id="process" tone="dark" grid>
      <SectionHeader
        eyebrow="How it works"
        tone="dark"
        title="From research to booked meetings in about five weeks."
        aside="A fixed build, then a continuous operating rhythm. You always know what is being worked on, what it produced, and what it cost per qualified opportunity."
      />

      <div className="mt-16 border-t border-dark-border">
        {STEPS.map((step, i) => (
          <Reveal key={step.number} delay={i * 70}>
            <div className="group ease-premium grid grid-cols-1 gap-3 border-b border-dark-border py-8 transition-colors duration-300 hover:bg-white/[0.02] lg:grid-cols-[80px_1fr_1.6fr_150px] lg:items-baseline lg:gap-10 lg:py-9">
              <span className="text-numeric text-[13px] font-semibold text-white/30 transition-colors duration-300 group-hover:text-accent">
                {step.number}
              </span>

              <h3 className="ease-premium text-[21px] font-semibold tracking-[-0.025em] text-white transition-transform duration-300 lg:group-hover:translate-x-1">
                {step.title}
              </h3>

              <p className="text-body max-w-lg text-white/50">
                {step.description}
              </p>

              <div className="lg:text-right">
                <div className="text-meta text-white/70">{step.output}</div>
                <div className="text-meta mt-1 text-white/30">
                  {step.duration}
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
