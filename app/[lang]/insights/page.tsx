import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { PageCTA } from "@/components/PageCTA";
import { ArticleVisual } from "@/components/ArticleVisual";
import {
  CATEGORIES,
  getCategory,
  readingMinutes,
  sortedArticles,
} from "@/content/insights";
import { getDictionary } from "@/lib/i18n";
import { LOCALES, isLocale, localePath } from "@/lib/i18n/config";

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
    title: t.insights.metaTitle,
    description: t.insights.metaDescription,
    alternates: {
      canonical: `${localePath(lang)}/insights`,
      languages: Object.fromEntries(
        LOCALES.map((l) => [l, `${localePath(l)}/insights`])
      ),
    },
    openGraph: {
      title: `${t.insights.metaTitle} | ForgeGTM`,
      description: t.insights.metaDescription,
      url: `${localePath(lang)}/insights`,
    },
  };
}

export default async function InsightsIndex({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const t = getDictionary(lang);
  const articles = sortedArticles();
  const [featured, ...rest] = articles;
  const featuredContent = featured.content[lang];

  // Only categories that actually have an article, so no dead filters.
  const usedCategories = CATEGORIES.filter((category) =>
    articles.some((article) => article.category === category.key)
  );

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString(lang === "de" ? "de-DE" : "en-GB", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  return (
    <>
      <Navbar t={t} lang={lang} />
      <main id="main">
        <section className="relative overflow-hidden py-20 md:py-24">
          <div aria-hidden className="grid-lines pointer-events-none absolute inset-0" />
          <Container className="relative">
            <Reveal>
              <Eyebrow>{t.insights.eyebrow}</Eyebrow>
            </Reveal>
            <Reveal delay={70}>
              <h1 className="text-h2 mt-5 max-w-[20ch] text-balance text-ink">
                {t.insights.title}
              </h1>
            </Reveal>
            <Reveal delay={140}>
              <p className="text-lead mt-6 max-w-xl text-muted">
                {t.insights.aside}
              </p>
            </Reveal>

            <Reveal delay={200}>
              <ul className="mt-10 flex flex-wrap gap-2">
                {usedCategories.map((category) => (
                  <li
                    key={category.key}
                    className="rounded-full border border-border bg-white px-3.5 py-1.5 text-[12.5px] font-medium text-muted"
                  >
                    {category.label[lang]}
                  </li>
                ))}
              </ul>
            </Reveal>
          </Container>
        </section>

        <section className="bg-surface-2 py-20 md:py-24">
          <Container>
            {/* Featured article */}
            <Reveal>
              <Link
                href={`${localePath(lang)}/insights/${featured.slug}`}
                className="rounded-panel ease-premium group grid items-center gap-8 border border-border bg-white p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_28px_56px_-34px_rgba(10,10,13,0.35)] md:p-12 lg:grid-cols-[1.25fr_1fr] lg:gap-12"
              >
                <div>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                  <span className="text-eyebrow text-accent">
                    {getCategory(featured.category)?.label[lang]}
                  </span>
                  <span className="text-meta text-muted-soft">
                    {formatDate(featured.publishedAt)}
                  </span>
                  <span className="text-meta text-muted-soft">
                    {readingMinutes(featuredContent.body)} {t.insights.readingTime}
                  </span>
                </div>

                <h2 className="mt-5 max-w-[24ch] text-[27px] leading-[1.15] font-semibold tracking-[-0.03em] text-balance text-ink transition-colors group-hover:text-accent md:text-[34px]">
                  {featuredContent.title}
                </h2>

                <p className="text-body mt-4 max-w-2xl text-muted">
                  {featuredContent.excerpt}
                </p>

                <span className="text-meta mt-7 inline-block font-medium text-ink">
                  {t.cta.readArticle} &rarr;
                </span>
                </div>

                <ArticleVisual
                  category={featured.category}
                  className="aspect-[16/10] lg:aspect-[4/3]"
                />
              </Link>
            </Reveal>

            <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {rest.map((article, i) => {
                const c = article.content[lang];
                return (
                  <Reveal key={article.slug} delay={i * 70} className="h-full">
                    <Link
                      href={`${localePath(lang)}/insights/${article.slug}`}
                      className="rounded-card ease-premium group flex h-full flex-col border border-border bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_50px_-32px_rgba(10,10,13,0.35)]"
                    >
                      <span className="text-eyebrow text-accent">
                        {getCategory(article.category)?.label[lang]}
                      </span>

                      <h2 className="text-h3 mt-4 text-ink transition-colors group-hover:text-accent">
                        {c.title}
                      </h2>

                      <p className="text-meta mt-3 leading-relaxed text-muted">
                        {c.excerpt}
                      </p>

                      <div className="text-meta mt-auto flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-border-soft pt-5 text-muted-soft">
                        <span>{formatDate(article.publishedAt)}</span>
                        <span aria-hidden>·</span>
                        <span>
                          {readingMinutes(c.body)} {t.insights.readingTime}
                        </span>
                      </div>
                    </Link>
                  </Reveal>
                );
              })}
            </div>
          </Container>
        </section>

        <PageCTA
          t={t}
          lang={lang}
          title={t.insights.articleCtaTitle}
          body={t.insights.articleCtaBody}
        />
      </main>
      <Footer t={t} lang={lang} />
    </>
  );
}
