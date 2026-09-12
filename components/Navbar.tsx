"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Container } from "./ui/Container";
import { Wordmark } from "./ui/Wordmark";
import { LanguageSwitcher } from "./LanguageSwitcher";
import type { Dictionary } from "@/lib/i18n/en";
import { localePath, type Locale } from "@/lib/i18n/config";

export function Navbar({ t, lang }: { t: Dictionary; lang: Locale }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const links = [
    { label: t.nav.services, href: `${localePath(lang)}/#services` },
    { label: t.nav.caseStudies, href: `${localePath(lang)}/case-studies` },
    { label: t.nav.insights, href: `${localePath(lang)}/insights` },
    { label: t.nav.about, href: `${localePath(lang)}/about` },
  ];

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
      className={`ease-premium sticky top-0 z-50 w-full transition-colors duration-300 ${
        scrolled
          ? "border-b border-border bg-white/80 backdrop-blur-xl"
          : "border-b border-transparent bg-white/0"
      }`}
    >
      <Container className="flex h-[68px] items-center justify-between gap-6">
        <Link
          href={localePath(lang)}
          aria-label={t.nav.home}
          className="shrink-0"
        >
          <Wordmark />
        </Link>

        <nav
          aria-label={t.nav.primary}
          className="hidden items-center gap-7 lg:flex"
        >
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[13px] font-medium text-muted transition-colors duration-200 hover:text-ink"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <LanguageSwitcher current={lang} label={t.nav.languageLabel} />
          <Link
            href={`${localePath(lang)}/#contact`}
            className="ease-premium rounded-full bg-ink px-5 py-2.5 text-[13px] font-medium whitespace-nowrap text-white transition-all duration-300 hover:bg-ink-soft hover:shadow-[0_12px_24px_-14px_rgba(10,10,13,0.55)]"
          >
            {t.cta.bookCall}
          </Link>
        </div>

        <div className="flex items-center gap-3 lg:hidden">
          <LanguageSwitcher current={lang} label={t.nav.languageLabel} />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? t.nav.closeMenu : t.nav.openMenu}
            aria-expanded={open}
            aria-controls="mobile-nav"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border text-ink transition-colors hover:border-ink/25"
          >
            {open ? <X size={17} /> : <Menu size={17} />}
          </button>
        </div>
      </Container>

      {open && (
        <div id="mobile-nav" className="border-t border-border bg-white lg:hidden">
          <Container className="flex flex-col py-3">
            {links.map((link) => (
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
              href={`${localePath(lang)}/#contact`}
              onClick={() => setOpen(false)}
              className="mt-4 mb-2 inline-flex items-center justify-center rounded-full bg-ink px-5 py-3.5 text-[14px] font-medium text-white"
            >
              {t.cta.bookCall}
            </Link>
          </Container>
        </div>
      )}
    </header>
  );
}
