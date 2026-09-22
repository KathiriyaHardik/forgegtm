import {
  ArrowUpRight,
  Brain,
  Compass,
  Database,
  FileText,
  GitBranch,
  Globe,
  Send,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import { Container } from "./ui/Container";
import { Eyebrow } from "./ui/Eyebrow";
import { Reveal } from "./ui/Reveal";
import type { Dictionary } from "@/lib/i18n/en";

/**
 * "What we build" — eight capabilities in one bordered grid.
 *
 * The cells are separated by the grid's own `gap-px` over a border-coloured
 * background rather than per-cell borders. That gives one hairline between
 * neighbours instead of two stacked ones, and avoids the usual mess of
 * stripping edge borders with nth-child rules.
 *
 * The cells are not links. There are no per-capability pages to send anyone
 * to, and routing every card to the strategy-call modal meant a visitor
 * reading about CRM work was dropped into a booking form instead. The corner
 * mark is therefore decorative and aria-hidden, and the section keeps its one
 * real call to action at the end of the page.
 */
const ICONS: Record<string, LucideIcon> = {
  strategy: Compass,
  revops: GitBranch,
  automation: Workflow,
  outbound: Send,
  crm: Database,
  ai: Brain,
  content: FileText,
  website: Globe,
};

export function ServicesSection({ t }: { t: Dictionary }) {
  return (
    <section id="services" className="relative overflow-hidden bg-surface py-24 md:py-32">
      <Container className="relative">
        <Reveal>
          <Eyebrow variant="plain">{t.services.eyebrow}</Eyebrow>
        </Reveal>

        <Reveal delay={70}>
          <h2 className="text-h2 mt-6 max-w-[18ch] text-balance text-ink">
            {t.services.title}
          </h2>
        </Reveal>

        <Reveal delay={140}>
          <p className="text-body mt-6 max-w-lg text-muted">{t.services.aside}</p>
        </Reveal>

        <Reveal delay={200}>
          {/* bg-border + gap-px is what draws the dividers. */}
          <div className="rounded-panel mt-14 grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2 md:mt-20">
            {t.services.items.map((item) => {
              const Icon = ICONS[item.icon] ?? Compass;
              return (
                <article
                  key={item.name}
                  className="ease-premium group relative flex flex-col bg-white p-8 transition-colors duration-300 hover:bg-surface-2 md:p-10"
                >
                  <div className="flex items-start justify-between gap-4">
                    <span className="ease-premium flex h-14 w-14 items-center justify-center rounded-[16px] border border-border bg-surface-2 text-ink transition-colors duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-white">
                      <Icon size={22} strokeWidth={1.8} aria-hidden />
                    </span>

                    <ArrowUpRight
                      size={20}
                      aria-hidden
                      className="ease-premium shrink-0 text-muted-soft transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                    />
                  </div>

                  <h3 className="mt-8 text-[19px] leading-[1.25] font-bold tracking-[-0.03em] text-ink md:text-[21px]">
                    {item.name}
                  </h3>

                  <p className="text-body mt-3 max-w-[34ch] text-muted">
                    {item.value}
                  </p>
                </article>
              );
            })}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
