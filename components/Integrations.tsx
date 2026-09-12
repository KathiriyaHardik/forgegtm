import { Container } from "./ui/Container";
import { Marquee } from "./ui/Marquee";
import { Reveal } from "./ui/Reveal";
import type { Dictionary } from "@/lib/i18n/en";

// Tool names are product names — identical in every locale.
const ROW_ONE = [
  "HubSpot",
  "Salesforce",
  "Apollo",
  "Clay",
  "LinkedIn Sales Navigator",
  "Instantly",
];

const ROW_TWO = ["Smartlead", "n8n", "Slack", "Notion", "Jira", "Google Analytics"];

function Pill({ label }: { label: string }) {
  return (
    <span className="inline-flex shrink-0 items-center rounded-full border border-border bg-white px-5 py-2.5 text-[13px] font-medium whitespace-nowrap text-muted">
      {label}
    </span>
  );
}

export function Integrations({ t }: { t: Dictionary }) {
  return (
    <section className="relative overflow-hidden bg-surface-2 py-24 md:py-28">
      <div aria-hidden className="grid-lines pointer-events-none absolute inset-0" />

      <Container className="relative">
        <Reveal>
          <h2 className="text-h2 mx-auto max-w-[18ch] text-center text-balance text-ink">
            {t.integrations.title}
          </h2>
        </Reveal>
        <Reveal delay={80}>
          <p className="text-body mx-auto mt-5 max-w-md text-center text-muted">
            {t.integrations.body}
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
