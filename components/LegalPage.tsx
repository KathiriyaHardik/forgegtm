import { ReactNode } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { Container } from "./ui/Container";
import { Eyebrow } from "./ui/Eyebrow";

/**
 * Shared shell for legal pages. Keeps /privacy and /imprint on the same
 * typographic scale and container grid as the marketing site.
 */
export function LegalPage({
  eyebrow,
  title,
  lastUpdated,
  children,
}: {
  eyebrow: string;
  title: string;
  lastUpdated: ReactNode;
  children: ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main id="main">
        <article className="relative overflow-hidden py-20 md:py-28">
          <div
            aria-hidden
            className="grid-lines pointer-events-none absolute inset-0"
          />
          <Container className="relative">
            <Eyebrow>{eyebrow}</Eyebrow>
            <h1 className="text-h2 mt-5 max-w-[20ch] text-balance text-ink">
              {title}
            </h1>
            <p className="text-meta mt-5 text-muted-soft">
              Last updated {lastUpdated}
            </p>

            <div className="mt-14 max-w-[68ch] border-t border-border pt-12">
              {children}
            </div>
          </Container>
        </article>
      </main>
      <Footer />
    </>
  );
}

/** A section of legal copy. */
export function LegalSection({
  heading,
  children,
}: {
  heading: string;
  children: ReactNode;
}) {
  return (
    <section className="mb-12 last:mb-0">
      <h2 className="text-h3 text-ink">{heading}</h2>
      <div className="text-body mt-4 flex flex-col gap-4 text-muted">
        {children}
      </div>
    </section>
  );
}

/**
 * Marks a detail that must be supplied before launch. Deliberately obvious
 * on screen so nothing ships half-filled — replace the component with the
 * real value, not just the text.
 */
export function Fill({ children }: { children: string }) {
  return (
    <span className="rounded-[4px] border border-dashed border-accent/50 bg-accent-soft px-1.5 py-0.5 text-[13px] font-medium text-accent">
      {children}
    </span>
  );
}
