import { Container } from "./ui/Container";
import { Reveal } from "./ui/Reveal";
import { PlaceholderBadge } from "./ui/PlaceholderBadge";
import type { Dictionary } from "@/lib/i18n/en";

/**
 * DEMO CONTENT — every brand below is fictional and drawn in-house, so no real
 * company's marks are used without permission and nothing implies a client
 * relationship that does not exist.
 *
 * To use real logos: replace `glyph` + `name` with an <Image> of the supplied
 * SVG, change the heading to a genuine trust line, and delete the badge.
 */
const BRANDS = [
  {
    name: "Northfield",
    glyph: (
      <circle cx="9" cy="9" r="6.5" fill="none" stroke="currentColor" strokeWidth="2.2" />
    ),
  },
  { name: "Vantix", glyph: <path d="M9 2.5 16 15.5H2z" fill="currentColor" /> },
  {
    name: "Anthemik",
    glyph: (
      <rect
        x="3.5"
        y="3.5"
        width="11"
        height="11"
        rx="1"
        transform="rotate(45 9 9)"
        fill="currentColor"
      />
    ),
  },
  {
    name: "Kompass",
    glyph: (
      <>
        <circle cx="9" cy="9" r="7" fill="none" stroke="currentColor" strokeWidth="2" />
        <circle cx="9" cy="9" r="2.4" fill="currentColor" />
      </>
    ),
  },
  {
    name: "Helvetic",
    glyph: (
      <>
        <rect x="2.5" y="4" width="13" height="3.4" rx="1.7" fill="currentColor" />
        <rect x="2.5" y="10.6" width="8.5" height="3.4" rx="1.7" fill="currentColor" />
      </>
    ),
  },
  {
    name: "Novaro",
    glyph: (
      <path
        d="M3 13.5 9 3l6 10.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinejoin="round"
      />
    ),
  },
];

export function LogoStrip({ t }: { t: Dictionary }) {
  return (
    <section className="border-y border-border bg-surface-2 py-10">
      <Container>
        <Reveal>
          <p className="text-eyebrow text-center text-muted-soft">{t.logos.label}</p>
        </Reveal>

        <Reveal delay={70}>
          <ul className="mt-7 flex flex-wrap items-center justify-center gap-x-10 gap-y-5">
            {BRANDS.map((brand) => (
              <li
                key={brand.name}
                className="flex items-center gap-2.5 text-ink/30 transition-colors duration-300 hover:text-ink/55"
              >
                <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden>
                  {brand.glyph}
                </svg>
                <span className="text-[15px] font-semibold tracking-[-0.02em]">
                  {brand.name}
                </span>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={140}>
          <div className="mt-7 flex justify-center">
            <PlaceholderBadge>{t.logos.placeholder}</PlaceholderBadge>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
