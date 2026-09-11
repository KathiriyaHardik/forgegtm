"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Container } from "./ui/Container";
import { Wordmark } from "./ui/Wordmark";

// Absolute hrefs so the nav also works from /privacy and /imprint.
const NAV_LINKS = [
  { label: "Services", href: "/#services" },
  { label: "Process", href: "/#process" },
  { label: "Engagements", href: "/#engagements" },
  { label: "Approach", href: "/#approach" },
  { label: "FAQ", href: "/#faq" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-colors duration-300 ease-premium ${
        scrolled
          ? "border-b border-border bg-white/80 backdrop-blur-xl"
          : "border-b border-transparent bg-white/0"
      }`}
    >
      <Container className="flex h-[68px] items-center justify-between">
        <Link href="/" aria-label="ForgeGTM home" className="shrink-0">
          <Wordmark />
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[13px] font-medium text-muted transition-colors duration-200 hover:text-ink"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/#contact"
          className="hidden rounded-full bg-ink px-5 py-2.5 text-[13px] font-medium text-white transition-all duration-300 ease-premium hover:bg-ink-soft hover:shadow-[0_12px_24px_-14px_rgba(10,10,13,0.55)] md:inline-flex"
        >
          Let&rsquo;s Talk
        </Link>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-nav"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-ink transition-colors hover:border-ink/25 md:hidden"
        >
          {open ? <X size={17} /> : <Menu size={17} />}
        </button>
      </Container>

      {open && (
        <div
          id="mobile-nav"
          className="border-t border-border bg-white md:hidden"
        >
          <Container className="flex flex-col py-3">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="border-b border-border-soft py-4 text-[15px] font-medium text-ink-soft transition-colors last:border-b-0 hover:text-ink"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/#contact"
              onClick={() => setOpen(false)}
              className="mt-4 mb-2 inline-flex items-center justify-center rounded-full bg-ink px-5 py-3.5 text-[14px] font-medium text-white"
            >
              Let&rsquo;s Talk
            </Link>
          </Container>
        </div>
      )}
    </header>
  );
}
