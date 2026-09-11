import { Container } from "./ui/Container";
import { Reveal } from "./ui/Reveal";

/**
 * States who ForgeGTM builds for. This deliberately replaces a "trusted by"
 * client-logo strip — that claim can only go live with real, permitted logos.
 * When they exist, swap SEGMENTS for <Image> logos and restore the trust line.
 */
const SEGMENTS = [
  "B2B SaaS",
  "Industrial technology",
  "Professional services",
  "Series A–C",
  "DACH, UK & Nordics",
];

export function MarketsStrip() {
  return (
    <section className="border-y border-border bg-surface-2 py-9">
      <Container>
        <Reveal>
          <p className="text-eyebrow text-center text-muted-soft">
            Built for
          </p>
        </Reveal>

        <Reveal delay={70}>
          <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            {SEGMENTS.map((segment) => (
              <li
                key={segment}
                className="text-[15px] font-medium tracking-[-0.01em] text-ink/45"
              >
                {segment}
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}
