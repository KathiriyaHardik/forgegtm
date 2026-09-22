import { Container } from "./ui/Container";
import { Eyebrow } from "./ui/Eyebrow";
import { Reveal } from "./ui/Reveal";
import type { Dictionary } from "@/lib/i18n/en";

/**
 * "The problem" — a 2x2 grid of failure modes.
 *
 * The headline is deliberately two-tone: the first sentence in ink states what
 * the reader already believes, the second in muted grey reframes it. Running
 * the reframe in a lighter weight lets the eye finish the sentence before the
 * argument lands.
 *
 * Each card carries an oversized index watermark that is allowed to bleed off
 * the top-right corner. It is decorative — the readable index lives nowhere
 * else, so it is marked aria-hidden and the cards stay in DOM order.
 *
 * The rule and the watermark pick up the accent on hover rather than one card
 * being permanently blue. Nothing here is a link, so there is no focus state
 * to mirror it with — the colour is decoration on top of a card that is
 * already fully readable, not information.
 */

export function ProblemSection({ t }: { t: Dictionary }) {
  return (
    <section
      id="approach"
      className="relative overflow-hidden bg-gradient-to-b from-surface via-surface-2 to-surface-2 py-24 md:py-32"
    >
      <Container className="relative">
        <Reveal>
          <Eyebrow variant="plain">{t.problem.eyebrow}</Eyebrow>
        </Reveal>

        <Reveal delay={70}>
          <h2 className="text-h2 mt-6 max-w-[22ch] text-balance text-ink">
            {t.problem.titleLead}{" "}
            <span className="text-muted-soft">{t.problem.titleTrail}</span>
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 md:mt-20 md:gap-6">
          {t.problem.items.map((problem, i) => (
            <Reveal key={problem.index} delay={i * 80} className="h-full">
              <article className="rounded-panel ease-premium group relative flex h-full flex-col overflow-hidden border border-border-soft bg-white p-8 shadow-[0_1px_2px_rgba(10,10,13,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-border hover:shadow-[0_24px_50px_-32px_rgba(10,10,13,0.3)] md:p-10">
                {/* Watermark index — decorative, bleeds off the corner. */}
                <span
                  aria-hidden
                  className="text-numeric pointer-events-none absolute -top-5 -right-3 text-[112px] leading-none font-bold tracking-[-0.04em] text-ink/[0.035] transition-colors duration-300 select-none group-hover:text-accent/[0.08] md:text-[132px]"
                >
                  {problem.index}
                </span>

                <span
                  aria-hidden
                  className="h-[5px] w-11 rounded-full bg-ink transition-colors duration-300 group-hover:bg-accent"
                />

                <h3 className="relative mt-8 max-w-[18ch] text-[21px] leading-[1.2] font-bold tracking-[-0.03em] text-balance text-ink md:text-[24px]">
                  {problem.title}
                </h3>

                <p className="text-body relative mt-4 max-w-[38ch] text-muted">
                  {problem.description}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
