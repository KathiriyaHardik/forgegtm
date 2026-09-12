import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Fill, LegalPage, LegalSection } from "@/components/LegalPage";
import { IMPRINT } from "@/content/legal";
import { getDictionary } from "@/lib/i18n";
import { LOCALES, isLocale, localePath } from "@/lib/i18n/config";

// TEMPLATE — every <Fill> marker must be replaced with ForgeGTM's real details
// and the finished text reviewed by a qualified lawyer before launch.

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
    title: t.legal.imprintTitle,
    description: t.legal.imprintDescription,
    alternates: {
      canonical: `${localePath(lang)}/imprint`,
      languages: Object.fromEntries(
        LOCALES.map((l) => [l, `${localePath(l)}/imprint`])
      ),
    },
    robots: { index: true, follow: true },
  };
}

export default async function ImprintPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = getDictionary(lang);

  return (
    <LegalPage
      t={t}
      lang={lang}
      title={t.legal.imprintTitle}
      lastUpdated={<Fill>DD Month YYYY</Fill>}
    >
      {IMPRINT[lang].map((section) => (
        <LegalSection key={section.heading} heading={section.heading}>
          {section.paragraphs.map((paragraph, i) => (
            <p key={i}>
              {paragraph.map((fragment, j) =>
                typeof fragment === "string" ? (
                  <span key={j}>{fragment}</span>
                ) : (
                  <Fill key={j}>{fragment.fill}</Fill>
                )
              )}
            </p>
          ))}
        </LegalSection>
      ))}
    </LegalPage>
  );
}
