import { Container } from "./ui/Container";
import { Button } from "./ui/Button";
import { Eyebrow } from "./ui/Eyebrow";
import { Reveal } from "./ui/Reveal";
import { HeroVisual } from "./HeroVisual";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-20 pb-20 md:pt-28 md:pb-28">
      <div aria-hidden className="grid-lines pointer-events-none absolute inset-0" />

      <Container className="relative">
        <Reveal>
          <Eyebrow>Growth systems, engineered</Eyebrow>
        </Reveal>

        <Reveal delay={70}>
          <h1 className="text-display mt-6 max-w-[15ch] text-ink">
            Revenue growth engineered for the modern{" "}
            <span className="text-accent">market.</span>
          </h1>
        </Reveal>

        <Reveal delay={140}>
          <p className="text-lead mt-7 max-w-[52ch] text-muted">
            ForgeGTM builds predictable revenue engines for ambitious B2B
            companies — strategy, outbound execution and sales systems, run as
            one connected system instead of four disconnected vendors.
          </p>
        </Reveal>

        <Reveal delay={210}>
          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
            <Button href="#contact" variant="primary">
              Build Your GTM
            </Button>
            <Button href="#process" variant="link">
              See how we work
            </Button>
          </div>
        </Reveal>

        <Reveal delay={280}>
          <HeroVisual className="mt-16 md:mt-20" />
        </Reveal>
      </Container>
    </section>
  );
}
