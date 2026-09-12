import { Container } from "./ui/Container";
import { Marquee } from "./ui/Marquee";
import { Reveal } from "./ui/Reveal";
import { ContactForm } from "./ContactForm";

const WHAT_HAPPENS_NEXT = [
  {
    step: "01",
    title: "A 30-minute call",
    description:
      "We look at your current motion, your ICP and where pipeline is actually leaking.",
  },
  {
    step: "02",
    title: "A written plan",
    description:
      "Target accounts, channels, messaging angles and the infrastructure needed to run them.",
  },
  {
    step: "03",
    title: "You decide",
    description:
      "The plan is yours to keep and run in-house. If you want us to build it, we start.",
  },
];

export function ContactSection() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-dark scroll-mt-20"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute top-0 left-1/2 h-[560px] w-[900px] -translate-x-1/2 -translate-y-1/3"
        style={{
          background:
            "radial-gradient(closest-side, rgba(45,94,245,0.2), rgba(45,94,245,0) 72%)",
        }}
      />

      <Container className="relative py-24 md:py-32">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div>
            <Reveal>
              <span className="text-eyebrow inline-flex items-center gap-2 text-accent">
                <span className="h-1 w-1 rounded-full bg-current" />
                Book a strategy call
              </span>
            </Reveal>

            <Reveal delay={70}>
              <h2 className="text-h2 mt-5 max-w-[14ch] text-balance text-white">
                Let&rsquo;s build your{" "}
                <span className="text-accent">pipeline.</span>
              </h2>
            </Reveal>

            <Reveal delay={140}>
              <p className="text-body mt-5 max-w-sm text-white/55">
                Tell us where you are today. We&rsquo;ll come back with a
                straight answer on whether outbound is the right lever — and
                what it would take to make it work.
              </p>
            </Reveal>

            <Reveal delay={200}>
              <ol className="mt-10 flex flex-col gap-6 border-t border-dark-border pt-8">
                {WHAT_HAPPENS_NEXT.map((item) => (
                  <li key={item.step} className="flex gap-5">
                    <span className="text-numeric text-[12px] font-semibold text-accent">
                      {item.step}
                    </span>
                    <div>
                      <h3 className="text-[15px] font-medium text-white">
                        {item.title}
                      </h3>
                      <p className="text-meta mt-1.5 max-w-xs text-white/45">
                        {item.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </Reveal>
          </div>

          <Reveal delay={120}>
            <ContactForm />
          </Reveal>
        </div>
      </Container>

      <div className="relative border-t border-dark-border py-6">
        <Marquee durationSeconds={40} repeat={5}>
          <span className="flex shrink-0 items-center gap-6 pr-6 text-[15px] font-medium tracking-[-0.02em] whitespace-nowrap text-white/20">
            Outbound systems that generate qualified pipeline
            <span className="h-1 w-1 rounded-full bg-accent/60" />
          </span>
        </Marquee>
      </div>
    </section>
  );
}
