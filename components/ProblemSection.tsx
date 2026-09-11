import { Section } from "./ui/Section";
import { SectionHeader } from "./ui/SectionHeader";
import { Reveal } from "./ui/Reveal";

const PROBLEMS = [
  {
    index: "01",
    title: "Growth arrives at random",
    description:
      "Revenue lands in spikes nobody can explain. Good quarters can't be reproduced and bad ones can't be diagnosed, because nothing underneath them is systematised.",
    symptom: "Pipeline built campaign by campaign",
  },
  {
    index: "02",
    title: "The story changes by rep",
    description:
      "Positioning drifts between the deck, the sequence and the call. Buyers meet a different company at every touchpoint, so the conversation defaults to price.",
    symptom: "Messaging owned by nobody",
  },
  {
    index: "03",
    title: "The stack never closes the loop",
    description:
      "CRM, outbound and analytics sit in separate tools. What sales learns in week one never reaches strategy in week six, so the same mistakes compound.",
    symptom: "No source-to-revenue reporting",
  },
];

export function ProblemSection() {
  return (
    <Section id="approach" tone="light" grid>
      <SectionHeader
        eyebrow="The problem"
        title={
          <>
            <span className="text-muted-soft">
              Most companies don&rsquo;t have a growth problem.
            </span>{" "}
            They have a systems problem.
          </>
        }
        aside="Fragmented outbound, drifting positioning and disconnected tooling don't just slow growth down — they make it impossible to predict, and impossible to repeat."
      />

      <div className="mt-16 grid gap-5 lg:grid-cols-3">
        {PROBLEMS.map((problem, i) => (
          <Reveal key={problem.index} delay={i * 80} className="h-full">
            <article className="flex h-full flex-col rounded-card border border-border bg-white p-8 transition-all duration-300 ease-premium hover:-translate-y-1 hover:border-ink/15 hover:shadow-[0_24px_50px_-32px_rgba(10,10,13,0.35)] md:p-9">
              <span className="text-numeric text-[13px] font-semibold text-muted-soft">
                {problem.index}
              </span>

              <h3 className="text-h3 mt-7 text-ink">{problem.title}</h3>

              <p className="text-body mt-3 text-muted">{problem.description}</p>

              <div className="mt-auto border-t border-border-soft pt-5 text-[11.5px] font-medium tracking-[0.04em] text-muted-soft uppercase">
                {problem.symptom}
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
