import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { PageCTA } from "@/components/PageCTA";
import {
  ARTICLES,
  getArticle,
  getCategory,
  readingMinutes,
  type Block,
} from "@/content/insights";
import { getDictionary } from "@/lib/i18n";
import { LOCALES, isLocale, localePath, type Locale } from "@/lib/i18n/config";

export function generateStaticParams() {
  return LOCALES.flatMap((lang) =>
    ARTICLES.map((article) => ({ lang, slug: article.slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  const article = getArticle(slug);
  if (!isLocale(lang) || !article) return {};

  const c = article.content[lang];
  const url = `${localePath(lang)}/insights/${slug}`;

  return {
    title: c.title,
    description: c.description,
    alternates: {
      canonical: url,
      languages: Object.fromEntries(
        LOCALES.map((l) => [l, `${localePath(l)}/insights/${slug}`])
      ),
    },
    openGraph: {
      type: "article",
      title: c.title,
      description: c.description,
      url,
      publishedTime: article.publishedAt,
      authors: [article.author],
    },
  };
}

function ArticleBody({ blocks }: { blocks: Block[] }) {
  return (
    <div className="flex flex-col gap-6">
      {blocks.map((block, i) => {
        if (block.type === "h2") {
          return (
            <h2
              key={i}
              className="mt-6 text-[22px] font-semibold tracking-[-0.025em] text-ink md:text-[26px]"
            >
              {block.text}
            </h2>
          );
        }

        if (block.type === "ul") {
          return (
            <ul key={i} className="flex flex-col gap-3">
              {block.items.map((item) => (
                <li key={item} className="text-body flex gap-3 text-ink-soft">
                  <span
                    aria-hidden
                    className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-accent"
                  />
                  {item}
                </li>
              ))}
            </ul>
          );
        }

        if (block.type === "quote") {
          return (
            <blockquote
              key={i}
              className="my-2 border-l-2 border-accent py-1 pl-6 text-[18px] leading-[1.5] font-medium tracking-[-0.015em] text-ink md:text-[20px]"
            >
              {block.text}
            </blockquote>
          );
        }

        return (
          <p key={i} className="text-[16px] leading-[1.75] text-ink-soft">
            {block.text}
          </p>
        );
      })}
    </div>
  );
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  const article = getArticle(slug);
  if (!isLocale(lang) || !article) notFound();

  const locale: Locale = lang;
  const t = getDictionary(locale);
  const c = article.content[locale];
  const category = getCategory(article.category);
  const minutes = readingMinutes(c.body);

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString(locale === "de" ? "de-DE" : "en-GB", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  // Same category first, then anything else, capped at two.
  const related = ARTICLES.filter((a) => a.slug !== article.slug)
    .sort((a, b) => {
      const aMatch = a.category === article.category ? 0 : 1;
      const bMatch = b.category === article.category ? 0 : 1;
      return aMatch - bMatch;
    })
    .slice(0, 2);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: c.title,
    description: c.description,
    datePublished: article.publishedAt,
    inLanguage: locale,
    author: { "@type": "Organization", name: article.author },
    publisher: { "@type": "Organization", name: "ForgeGTM" },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://forgegtm.com${localePath(locale)}/insights/${slug}`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        // Content is authored in-repo, not user input.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar t={t} lang={locale} />
      <main id="main">
        <article>
          <section className="relative overflow-hidden py-16 md:py-20">
            <div
              aria-hidden
              className="grid-lines pointer-events-none absolute inset-0"
            />
            <Container className="relative">
              <Reveal>
                <Link
                  href={`${localePath(locale)}/insights`}
                  className="text-meta inline-flex items-center gap-1.5 font-medium text-muted transition-colors hover:text-ink"
                >
                  <ArrowLeft size={14} />
                  {t.cta.backToInsights}
                </Link>
              </Reveal>

              <Reveal delay={70}>
                <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2">
                  <span className="text-eyebrow text-accent">
                    {category?.label[locale]}
                  </span>
                  <span className="text-meta text-muted-soft">
                    {formatDate(article.publishedAt)}
                  </span>
                  <span className="text-meta text-muted-soft">
                    {minutes} {t.insights.readingTime}
                  </span>
                  <span className="text-meta text-muted-soft">
                    {t.insights.by} {article.author}
                  </span>
                </div>
              </Reveal>

              <Reveal delay={110}>
                <h1 className="text-h2 mt-5 max-w-[22ch] text-balance text-ink">
                  {c.title}
                </h1>
              </Reveal>

              <Reveal delay={160}>
                <p className="text-lead mt-6 max-w-2xl text-muted">{c.excerpt}</p>
              </Reveal>
            </Container>
          </section>

          <section className="pb-20 md:pb-24">
            <Container>
              <div className="max-w-[68ch] border-t border-border pt-12">
                <ArticleBody blocks={c.body} />
              </div>
            </Container>
          </section>
        </article>

        {related.length > 0 && (
          <section className="border-t border-border bg-surface-2 py-20">
            <Container>
              <h2 className="text-eyebrow text-muted-soft">
                {t.insights.relatedTitle}
              </h2>
              <div className="mt-8 grid gap-6 md:grid-cols-2">
                {related.map((item) => {
                  const rc = item.content[locale];
                  return (
                    <Reveal key={item.slug} className="h-full">
                      <Link
                        href={`${localePath(locale)}/insights/${item.slug}`}
                        className="rounded-card ease-premium group flex h-full flex-col border border-border bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_50px_-32px_rgba(10,10,13,0.35)]"
                      >
                        <span className="text-eyebrow text-accent">
                          {getCategory(item.category)?.label[locale]}
                        </span>
                        <h3 className="text-h3 mt-4 text-ink transition-colors group-hover:text-accent">
                          {rc.title}
                        </h3>
                        <p className="text-meta mt-3 leading-relaxed text-muted">
                          {rc.excerpt}
                        </p>
                        <span className="text-meta mt-auto pt-5 text-muted-soft">
                          {readingMinutes(rc.body)} {t.insights.readingTime}
                        </span>
                      </Link>
                    </Reveal>
                  );
                })}
              </div>
            </Container>
          </section>
        )}

        <PageCTA
          t={t}
          lang={locale}
          title={t.insights.articleCtaTitle}
          body={t.insights.articleCtaBody}
        />
      </main>
      <Footer t={t} lang={locale} />
    </>
  );
}
