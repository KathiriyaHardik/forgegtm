import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Inter } from "next/font/google";
import "../globals.css";
import {
  HTML_LANG,
  LOCALES,
  OG_LOCALE,
  isLocale,
  localePath,
} from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n";
import { SITE_URL } from "@/lib/site";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

/** Every locale is known ahead of time, so all pages prerender. */
export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};

  const t = getDictionary(lang);

  return {
    metadataBase: new URL(SITE_URL),
    title: { default: t.meta.title, template: "%s | ForgeGTM" },
    description: t.meta.description,
    applicationName: "ForgeGTM",
    authors: [{ name: "ForgeGTM" }],
    creator: "ForgeGTM",
    keywords: [
      "B2B outbound agency",
      "go-to-market agency",
      "lead generation",
      "email deliverability",
      "pipeline generation",
      "ICP targeting",
    ],
    alternates: {
      canonical: localePath(lang),
      languages: Object.fromEntries(
        LOCALES.map((locale) => [HTML_LANG[locale], localePath(locale)])
      ),
    },
    openGraph: {
      type: "website",
      locale: OG_LOCALE[lang],
      siteName: "ForgeGTM",
      url: localePath(lang),
      title: t.meta.title,
      description: t.meta.description,
    },
    twitter: {
      card: "summary_large_image",
      title: t.meta.title,
      description: t.meta.description,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large" },
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const t = getDictionary(lang);

  return (
    <html lang={HTML_LANG[lang]} className={`${inter.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-surface text-ink">
        <a
          href="#main"
          className="sr-only rounded-full bg-ink px-4 py-2 text-[13px] font-medium text-white focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[60]"
        >
          {t.footer.skipToContent}
        </a>
        {children}
      </body>
    </html>
  );
}
