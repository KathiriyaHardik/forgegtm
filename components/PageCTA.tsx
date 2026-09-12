import { Container } from "./ui/Container";
import { Button } from "./ui/Button";
import { Reveal } from "./ui/Reveal";
import type { Dictionary } from "@/lib/i18n/en";
import { localePath, type Locale } from "@/lib/i18n/config";

/** Closing CTA used on case-study and article pages. */
export function PageCTA({
  t,
  lang,
  title,
  body,
}: {
  t: Dictionary;
  lang: Locale;
  title: string;
  body?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-dark py-20 md:py-24">
      <div
        aria-hidden
        className="pointer-events-none absolute top-0 left-1/2 h-[420px] w-[760px] -translate-x-1/2 -translate-y-1/3"
        style={{
          background:
            "radial-gradient(closest-side, rgba(45,94,245,0.2), rgba(45,94,245,0) 72%)",
        }}
      />
      <Container className="relative text-center">
        <Reveal>
          <h2 className="text-h2 mx-auto max-w-[20ch] text-balance text-white">
            {title}
          </h2>
        </Reveal>
        {body && (
          <Reveal delay={80}>
            <p className="text-body mx-auto mt-5 max-w-lg text-white/55">{body}</p>
          </Reveal>
        )}
        <Reveal delay={140}>
          <div className="mt-9 flex justify-center">
            <Button href={`${localePath(lang)}/#contact`} variant="accent">
              {t.cta.bookCall}
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
