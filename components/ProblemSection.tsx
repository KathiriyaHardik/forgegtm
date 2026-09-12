import { Section } from "./ui/Section";
import { SectionHeader } from "./ui/SectionHeader";
import { Reveal } from "./ui/Reveal";

const PROBLEMS = [
  {
    index: "01",
    title: "Volume without targeting",
    description:
      "A bought list of 40,000 contacts gets emailed because it exists. Reply rates collapse, the brand gets burned in exactly the accounts that mattered most.",
    symptom: "Reach measured instead of relevance",
  },
  {
    index: "02",
    title: "Messaging that reads like a template",
    description:
      "A first name and a company name pasted into the same paragraph everyone else is sending. Buyers recognise the pattern in under a second and delete it.",
    symptom: "Personalisation by merge tag",
  },
  {
    index: "03",
    title: "Deliverability failing silently",
    description:
      "Campaigns look fine in the dashboard while the mail lands in spam. Nothing appears broken, because the metric that broke is the one nobody is watching.",
    symptom: "Sent, but never seen",
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
              Most outbound doesn&rsquo;t fail because of effort.
            </span>{" "}
            It fails because of the system behind it.
          </>
        }
        aside="Three problems account for most underperforming outbound. Each one is fixable, but only if it is treated as infrastructure rather than a copywriting problem."
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
