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
import Link from "next/link";
import { Container } from "./ui/Container";
import { Eyebrow } from "./ui/Eyebrow";
import { Reveal } from "./ui/Reveal";
import type { Dictionary } from "@/lib/i18n/en";
import { localePath, type Locale } from "@/lib/i18n/config";

/**
 * "What we build" — eight capabilities in one bordered grid.
 *
 * The cells are separated by the grid's own `gap-px` over a border-coloured
 * background rather than per-cell borders. That gives one hairline between
 * neighbours instead of two stacked ones, and avoids the usual mess of
 * stripping edge borders with nth-child rules.
 *
 * Each cell is a link to the strategy-call modal. The arrow in the corner is
 * an affordance, so it has to lead somewhere: a card that looks clickable and
 * does nothing is worse than no arrow at all. Being links also means the hover
 * treatment is mirrored on keyboard focus for free.
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

export function ServicesSection({ t, lang }: { t: Dictionary; lang: Locale }) {
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
                <Link
                  key={item.name}
                  href={`${localePath(lang)}/#contact`}
                  className="ease-premium group relative flex flex-col bg-white p-8 transition-colors duration-300 hover:bg-surface-2 focus-visible:bg-surface-2 focus-visible:outline-none md:p-10"
                >
                  <div className="flex items-start justify-between gap-4">
                    <span className="ease-premium flex h-14 w-14 items-center justify-center rounded-[16px] border border-border bg-surface-2 text-ink transition-colors duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-white group-focus-visible:border-accent group-focus-visible:bg-accent group-focus-visible:text-white">
                      <Icon size={22} strokeWidth={1.8} aria-hidden />
                    </span>

                    <ArrowUpRight
                      size={20}
                      aria-hidden
                      className="ease-premium shrink-0 text-muted-soft transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent group-focus-visible:text-accent"
                    />
                  </div>

                  <h3 className="mt-8 text-[19px] leading-[1.25] font-bold tracking-[-0.03em] text-ink md:text-[21px]">
                    {item.name}
                  </h3>

                  <p className="text-body mt-3 max-w-[34ch] text-muted">
                    {item.value}
                  </p>
                </Link>
              );
            })}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
