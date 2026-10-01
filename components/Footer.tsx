import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "./ui/Container";
import { Wordmark } from "./ui/Wordmark";
import type { Dictionary } from "@/lib/i18n/en";
import { localePath, type Locale } from "@/lib/i18n/config";
import { CONTACT_EMAIL } from "@/lib/site";

/**
 * Site footer.
 *
 * Only two of the four columns are navigation. Services and Markets are plain
 * text, deliberately:
 *
 *   - There are no per-capability pages, so five links all landing on the same
 *     #services grid would be five ways to be mildly disappointed.
 *   - There are no per-country pages at all. The footer is where someone
 *     checks whether you cover their region, which makes it the worst place to
 *     offer a link that goes nowhere.
 *
 * Both become links the moment the pages behind them exist.
 */

// Still a placeholder. Replace before launch, or drop the row entirely.
const LINKEDIN_URL = "https://www.linkedin.com";

function ColumnHeading({ children }: { children: string }) {
  return <h2 className="text-eyebrow text-white/35">{children}</h2>;
}

export function Footer({ t, lang }: { t: Dictionary; lang: Locale }) {
  const base = localePath(lang);

  const companyLinks = [
    { label: t.nav.about, href: `${base}/about` },
    { label: t.nav.caseStudies, href: `${base}/case-studies` },
    { label: t.nav.insights, href: `${base}/insights` },
    { label: t.nav.services, href: `${base}/#services` },
  ];

  const legalLinks = [
    { label: t.footer.privacy, href: `${base}/privacy` },
    { label: t.footer.imprint, href: `${base}/imprint` },
  ];

  const linkClass =
    "text-meta text-white/60 transition-colors duration-200 hover:text-white";

  return (
    <footer className="border-t border-dark-border bg-dark pt-16 pb-10 md:pt-20">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1.6fr_repeat(4,1fr)] lg:gap-10">
          {/* Brand + the two things people actually come here for. */}
          <div>
            <Wordmark tone="dark" />
            <p className="text-body mt-5 max-w-[32ch] text-white/45">
              {t.footer.description}
            </p>

            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="text-meta mt-6 inline-block font-medium text-white/80 transition-colors duration-200 hover:text-white"
            >
              {CONTACT_EMAIL}
            </a>

            <div className="mt-6">
              <Link
                href={`${base}/#contact`}
                className="group ease-premium inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-2.5 text-[13px] font-medium text-white transition-all duration-300 hover:border-white/35 hover:bg-white/[0.06]"
              >
                <span>{t.footer.bookCall}</span>
                <ArrowUpRight
                  size={14}
                  className="ease-premium transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </Link>
            </div>
          </div>

          <nav aria-label={t.footer.company}>
            <ColumnHeading>{t.footer.company}</ColumnHeading>
            <ul className="mt-5 flex flex-col gap-3.5">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className={linkClass}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Not a nav: these are descriptions, not destinations. */}
          <div>
            <ColumnHeading>{t.footer.services}</ColumnHeading>
            <ul className="mt-5 flex flex-col gap-3.5">
              {t.footer.serviceLinks.map((service) => (
                <li key={service} className="text-meta text-white/60">
                  {service}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <ColumnHeading>{t.footer.markets}</ColumnHeading>
            <ul className="mt-5 flex flex-col gap-3.5">
              {t.footer.marketList.map((market) => (
                <li key={market} className="text-meta text-white/60">
                  {market}
                </li>
              ))}
            </ul>
          </div>

          <nav aria-label={t.footer.legal}>
            <ColumnHeading>{t.footer.legal}</ColumnHeading>
            <ul className="mt-5 flex flex-col gap-3.5">
              {legalLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className={linkClass}>
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href={LINKEDIN_URL}
                  target="_blank"
                  rel="noreferrer noopener"
                  className={linkClass}
                >
                  LinkedIn
                </a>
              </li>
            </ul>
          </nav>
        </div>

        {/* Copyright only. Everything else already has a column above, and a
            second copy a few centimetres below helps nobody. */}
        <div className="mt-16 border-t border-dark-border pt-8">
          <p className="text-[12.5px] text-white/35">
            &copy; {new Date().getFullYear()} ForgeGTM. {t.footer.rights}
          </p>
        </div>
      </Container>
    </footer>
  );
}
