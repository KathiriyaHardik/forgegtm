import { Container } from "./ui/Container";
import { Marquee } from "./ui/Marquee";
import { Reveal } from "./ui/Reveal";

// Add or remove tools here — both rows are driven by these arrays.
const ROW_ONE = [
  "HubSpot",
  "Salesforce",
  "Apollo",
  "Clay",
  "LinkedIn Sales Navigator",
  "Instantly",
];

const ROW_TWO = [
  "Smartlead",
  "n8n",
  "Slack",
  "Notion",
  "Jira",
  "Google Analytics",
];

function Pill({ label }: { label: string }) {
  return (
    <span className="inline-flex shrink-0 items-center rounded-full border border-border bg-white px-5 py-2.5 text-[13px] font-medium whitespace-nowrap text-muted">
      {label}
    </span>
  );
}

export function Integrations() {
  return (
    <section className="relative overflow-hidden bg-surface py-24 md:py-28">
      <div aria-hidden className="grid-lines pointer-events-none absolute inset-0" />

      <Container className="relative">
        <Reveal>
          <h2 className="text-h2 mx-auto max-w-[18ch] text-center text-balance text-ink">
            We orchestrate the tools you already trust.
          </h2>
        </Reveal>
        <Reveal delay={80}>
          <p className="text-body mx-auto mt-5 max-w-md text-center text-muted">
            No rip-and-replace. We build on the stack your team already knows,
            and connect the parts that were never talking.
          </p>
        </Reveal>
      </Container>

      {/* Full-bleed marquee — intentionally outside the container. */}
      <Reveal delay={140} className="relative mt-12">
        <Marquee durationSeconds={50}>
          {ROW_ONE.map((tool) => (
            <Pill key={tool} label={tool} />
          ))}
        </Marquee>
        <Marquee durationSeconds={62} reverse className="mt-3">
          {ROW_TWO.map((tool) => (
            <Pill key={tool} label={tool} />
          ))}
        </Marquee>
      </Reveal>
    </section>
  );
}
