import Link from "next/link";
import { Container } from "./ui/Container";
import { Wordmark } from "./ui/Wordmark";
import type { Dictionary } from "@/lib/i18n/en";
import { localePath, type Locale } from "@/lib/i18n/config";
import { CONTACT_EMAIL } from "@/lib/site";

// The LinkedIn URL is still a placeholder; the contact address is real.
export function Footer({ t, lang }: { t: Dictionary; lang: Locale }) {
  const base = localePath(lang);

  const columns = [
    {
      title: t.footer.explore,
      links: [
        { label: t.nav.services, href: `${base}/#services` },
        { label: t.nav.caseStudies, href: `${base}/case-studies` },
        { label: t.nav.insights, href: `${base}/insights` },
        { label: t.nav.about, href: `${base}/about` },
      ],
    },
    {
      title: t.footer.connect,
      links: [
        { label: "LinkedIn", href: "https://www.linkedin.com" },
        { label: CONTACT_EMAIL, href: `mailto:${CONTACT_EMAIL}` },
        { label: t.cta.bookCall, href: `${base}/#contact` },
      ],
    },
    {
      title: t.footer.legal,
      links: [
        { label: t.footer.privacy, href: `${base}/privacy` },
        { label: t.footer.imprint, href: `${base}/imprint` },
      ],
    },
  ];

  return (
    <footer className="border-t border-dark-border bg-dark py-16 md:py-20">
      <Container>
        <div className="grid gap-12 md:grid-cols-[1.5fr_repeat(3,1fr)] md:gap-8">
          <div>
            <Wordmark tone="dark" />
            <p className="text-body mt-5 max-w-[30ch] text-white/45">
              {t.footer.description}
            </p>
          </div>

          {columns.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <h2 className="text-eyebrow text-white/35">{column.title}</h2>
              <ul className="mt-5 flex flex-col gap-3.5">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-meta text-white/60 transition-colors duration-200 hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-16 border-t border-dark-border pt-8">
          <p className="text-[12.5px] text-white/35">
            &copy; {new Date().getFullYear()} ForgeGTM. {t.footer.rights}
          </p>
        </div>
      </Container>
    </footer>
  );
}
