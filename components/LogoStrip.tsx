import { Container } from "./ui/Container";
import { Reveal } from "./ui/Reveal";

// Placeholder wordmarks. Swap each entry for a real client logo (SVG via
// next/image) once permissions are in place — the layout stays the same.
const LOGOS = [
  "Northfield",
  "Vantix",
  "Helvetic",
  "Anthemik",
  "Kompass",
  "Beyond&Co",
  "Novaro",
];

export function LogoStrip() {
  return (
    <section className="border-y border-border bg-surface-2 py-9">
      <Container>
        <Reveal>
          <p className="text-eyebrow text-center text-muted-soft">
            Trusted by ambitious B2B teams across Europe
          </p>
        </Reveal>

        <Reveal delay={70}>
          <ul className="mt-7 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
            {LOGOS.map((logo) => (
              <li
                key={logo}
                className="text-[15px] font-semibold tracking-[-0.02em] text-ink/25 transition-colors duration-300 hover:text-ink/50"
              >
                {logo}
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}
