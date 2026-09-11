import { Container } from "./ui/Container";
import { Button } from "./ui/Button";
import { Marquee } from "./ui/Marquee";
import { Reveal } from "./ui/Reveal";

export function FinalCTA() {
  return (
    <section id="contact" className="relative overflow-hidden bg-dark">
      <div
        aria-hidden
        className="pointer-events-none absolute top-0 left-1/2 h-[560px] w-[900px] -translate-x-1/2 -translate-y-1/3"
        style={{
          background:
            "radial-gradient(closest-side, rgba(45,94,245,0.2), rgba(45,94,245,0) 72%)",
        }}
      />

      <Container className="relative py-28 text-center md:py-36">
        <Reveal>
          <h2 className="text-display mx-auto max-w-[15ch] text-balance text-white">
            Let&rsquo;s build your next{" "}
            <span className="text-accent">growth engine.</span>
          </h2>
        </Reveal>

        <Reveal delay={90}>
          <p className="text-lead mx-auto mt-6 max-w-md text-white/55">
            Intelligent GTM systems for ambitious companies.
          </p>
        </Reveal>

        <Reveal delay={160}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
            {/* Replace with the real booking link or contact address. */}
            <Button href="mailto:hello@forgegtm.com" variant="accent">
              Start a Conversation
            </Button>
            <Button href="#process" variant="outline-dark" icon={false}>
              Explore Our Process
            </Button>
          </div>
        </Reveal>
      </Container>

      <div className="relative border-t border-dark-border py-6">
        <Marquee durationSeconds={40} repeat={5}>
          <span className="flex shrink-0 items-center gap-6 pr-6 text-[15px] font-medium tracking-[-0.02em] whitespace-nowrap text-white/20">
            Intelligent growth systems for ambitious companies
            <span className="h-1 w-1 rounded-full bg-accent/60" />
          </span>
        </Marquee>
      </div>
    </section>
  );
}
