import { Container } from "./ui/Container";
import { Button } from "./ui/Button";
import { Eyebrow } from "./ui/Eyebrow";
import { Reveal } from "./ui/Reveal";
import { HeroVisual } from "./HeroVisual";

/** Answers who this is for and what the outcome is, without a paragraph. */
const QUALIFIERS = [
  "B2B SaaS & technology",
  "Series A–C",
  "DACH, UK & Nordics",
];

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-20 pb-20 md:pt-28 md:pb-28">
      <div
        aria-hidden
        className="grid-lines pointer-events-none absolute inset-0"
      />

      <Container className="relative">
        <Reveal>
          <Eyebrow>B2B outbound & go-to-market</Eyebrow>
        </Reveal>

        <Reveal delay={70}>
          <h1 className="text-display mt-6 max-w-[16ch] text-balance text-ink">
            Qualified pipeline, built on{" "}
            <span className="text-accent">outbound systems.</span>
          </h1>
        </Reveal>

        <Reveal delay={140}>
          <p className="text-lead mt-7 max-w-[54ch] text-muted">
            ForgeGTM builds and runs outbound for B2B companies — targeting,
            infrastructure, messaging and campaigns — so your sales team spends
            its time in qualified conversations instead of building lists.
          </p>
        </Reveal>

        <Reveal delay={210}>
          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
            <Button href="#contact" variant="primary">
              Book a Strategy Call
            </Button>
            <Button href="#case-studies" variant="link">
              See how it works
            </Button>
          </div>
        </Reveal>

        <Reveal delay={260}>
          <ul className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2">
            {QUALIFIERS.map((qualifier) => (
              <li
                key={qualifier}
                className="text-meta flex items-center gap-2.5 text-muted-soft"
              >
                <span
                  aria-hidden
                  className="h-1 w-1 rounded-full bg-muted-soft"
                />
                {qualifier}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={320}>
          <HeroVisual className="mt-16 md:mt-20" />
        </Reveal>
      </Container>
    </section>
  );
}
