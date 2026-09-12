import Link from "next/link";
import { Container } from "./ui/Container";
import { Wordmark } from "./ui/Wordmark";

// Replace hrefs with real destinations before launch.
const COLUMNS = [
  {
    title: "Explore",
    links: [
      { label: "Services", href: "/#services" },
      { label: "How it works", href: "/#process" },
      { label: "Case studies", href: "/#case-studies" },
      { label: "Book a strategy call", href: "/#contact" },
    ],
  },
  {
    title: "Connect",
    links: [
      { label: "LinkedIn", href: "https://www.linkedin.com" },
      { label: "hello@forgegtm.com", href: "mailto:hello@forgegtm.com" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy", href: "/privacy" },
      { label: "Imprint", href: "/imprint" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-dark-border bg-dark py-16 md:py-20">
      <Container>
        <div className="grid gap-12 md:grid-cols-[1.5fr_repeat(3,1fr)] md:gap-8">
          <div>
            <Wordmark tone="dark" />
            <p className="text-body mt-5 max-w-[30ch] text-white/45">
              Outbound systems that generate qualified pipeline for ambitious B2B companies.
            </p>
          </div>

          {COLUMNS.map((column) => (
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
            &copy; {new Date().getFullYear()} ForgeGTM. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}
