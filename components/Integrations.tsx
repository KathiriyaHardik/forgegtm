import { Container } from "./ui/Container";
import { Eyebrow } from "./ui/Eyebrow";
import { Marquee } from "./ui/Marquee";
import { Reveal } from "./ui/Reveal";
import type { Dictionary } from "@/lib/i18n/en";

/**
 * Technology ecosystem: the stack ForgeGTM builds on, scrolling in two rows.
 *
 * Tool names are product names and stay identical in every locale, so they
 * live here rather than in the dictionaries.
 *
 * Only list tools actually used on client work. This section reads as a
 * capability claim, and a name here says "we work in this", not "we have
 * heard of it".
 */
const ROW_ONE = [
  "HubSpot",
  "Salesforce",
  "Apollo",
  "Clay",
  "LinkedIn Sales Navigator",
];

const ROW_TWO = ["Instantly", "Smartlead", "n8n", "Google Analytics"];

function ToolCard({ label }: { label: string }) {
  return (
    <span className="rounded-card inline-flex shrink-0 items-center gap-3 border border-border-soft bg-white px-6 py-4 shadow-[0_1px_2px_rgba(10,10,13,0.04)]">
      <span aria-hidden className="h-2 w-2 shrink-0 rounded-full bg-accent" />
      <span className="text-[16px] font-semibold tracking-[-0.02em] whitespace-nowrap text-ink">
        {label}
      </span>
    </span>
  );
}

export function Integrations({ t }: { t: Dictionary }) {
  return (
    <section className="relative overflow-hidden bg-surface-2 py-24 md:py-28">
      <Container className="relative">
        <Reveal>
          <div className="text-center">
            <Eyebrow variant="plain">{t.integrations.eyebrow}</Eyebrow>
          </div>
        </Reveal>

        <Reveal delay={70}>
          <h2 className="text-h2 mx-auto mt-5 max-w-[18ch] text-center text-balance text-ink">
            {t.integrations.title}
          </h2>
        </Reveal>

        <Reveal delay={140}>
          <p className="text-body mx-auto mt-5 max-w-lg text-center text-muted">
            {t.integrations.body}
          </p>
        </Reveal>
      </Container>

      {/* Full-bleed marquee, intentionally outside the container so the cards
          run the whole width rather than stopping at the gutter. */}
      <Reveal delay={200} className="relative mt-14">
        <Marquee durationSeconds={50} repeat={4}>
          {ROW_ONE.map((tool) => (
            <ToolCard key={tool} label={tool} />
          ))}
        </Marquee>
        <Marquee durationSeconds={62} repeat={4} reverse className="mt-4">
          {ROW_TWO.map((tool) => (
            <ToolCard key={tool} label={tool} />
          ))}
        </Marquee>
      </Reveal>
    </section>
  );
}
