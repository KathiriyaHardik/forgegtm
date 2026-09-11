import { Section } from "./ui/Section";
import { SectionHeader } from "./ui/SectionHeader";
import { Reveal } from "./ui/Reveal";

const STEPS = [
  {
    number: "01",
    title: "Discover",
    description:
      "We audit the funnel, the data and the stack to map the revenue engine you actually have — and where it leaks.",
    duration: "Week 1–2",
  },
  {
    number: "02",
    title: "Strategize",
    description:
      "A prioritised growth architecture: ICP, narrative, channels and the sequence in which they compound.",
    duration: "Week 2–3",
  },
  {
    number: "03",
    title: "Build",
    description:
      "We engineer the infrastructure — CRM, outbound, routing and reporting — so it scales instead of being patched.",
    duration: "Week 3–5",
  },
  {
    number: "04",
    title: "Launch",
    description:
      "Systems go live with clear ownership and documented process, so nothing depends on tribal knowledge.",
    duration: "Week 6",
  },
  {
    number: "05",
    title: "Scale",
    description:
      "We compound what works, retire what doesn't, and expand into adjacent segments and markets.",
    duration: "Ongoing",
  },
];

export function ProcessSection() {
  return (
    <Section id="process" tone="dark" grid>
      <SectionHeader
        eyebrow="The ForgeGTM method"
        tone="dark"
        title="A disciplined path from ambition to compounding growth."
        aside="A six-week build, then a compounding operating rhythm. You always know what is being built, by whom, and what it is expected to move."
      />

      <div className="mt-16 border-t border-dark-border">
        {STEPS.map((step, i) => (
          <Reveal key={step.number} delay={i * 60}>
            <div className="group grid grid-cols-1 gap-3 border-b border-dark-border py-8 transition-colors duration-300 ease-premium hover:bg-white/[0.02] lg:grid-cols-[80px_1fr_1.5fr_110px] lg:items-baseline lg:gap-10 lg:py-9">
              <span className="text-numeric text-[13px] font-semibold text-white/30 transition-colors duration-300 group-hover:text-accent">
                {step.number}
              </span>

              <h3 className="text-[21px] font-semibold tracking-[-0.025em] text-white transition-transform duration-300 ease-premium lg:group-hover:translate-x-1">
                {step.title}
              </h3>

              <p className="text-body max-w-lg text-white/50">
                {step.description}
              </p>

              <span className="text-meta text-white/30 lg:text-right">
                {step.duration}
              </span>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
