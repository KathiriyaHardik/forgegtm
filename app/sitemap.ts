import type { MetadataRoute } from "next";
import { CASE_STUDIES } from "@/content/case-studies";
import { sortedArticles } from "@/content/insights";
import {
  DEFAULT_LOCALE,
  HTML_LANG,
  LOCALES,
  localePath,
} from "@/lib/i18n/config";
import { absoluteUrl } from "@/lib/site";

/**
 * Sitemap covering every locale of every route.
 *
 * Routes are derived from the same content modules the pages render from, so
 * adding a case study or an article puts it in the sitemap automatically —
 * there is no second list to keep in step.
 *
 * Each language version gets its own `<url>` entry carrying the *complete* set
 * of `hreflang` alternates (itself included, plus `x-default`). That is what
 * Google asks for: a set of alternates is only trusted when every page in it
 * points back at every other one.
 */

type Route = {
  /** Path after the locale prefix. "" is the locale home page. */
  path: string;
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  /**
   * Only set where a real date exists. A build timestamp on every page would
   * tell crawlers everything changed on every deploy, which is why Google
   * discards `lastmod` it finds untrustworthy.
   */
  lastModified?: string;
};

function routes(): Route[] {
  const articles = sortedArticles();
  const newestArticle = articles[0]?.publishedAt;

  return [
    { path: "", priority: 1, changeFrequency: "monthly" },
    { path: "/about", priority: 0.8, changeFrequency: "monthly" },
    { path: "/case-studies", priority: 0.8, changeFrequency: "monthly" },
    ...CASE_STUDIES.map((study) => ({
      path: `/case-studies/${study.slug}`,
      priority: 0.7,
      changeFrequency: "yearly" as const,
    })),
    {
      path: "/insights",
      priority: 0.8,
      changeFrequency: "weekly",
      lastModified: newestArticle,
    },
    ...articles.map((article) => ({
      path: `/insights/${article.slug}`,
      priority: 0.7,
      changeFrequency: "yearly" as const,
      lastModified: article.publishedAt,
    })),
    { path: "/privacy", priority: 0.3, changeFrequency: "yearly" },
    { path: "/imprint", priority: 0.3, changeFrequency: "yearly" },
  ];
}

/** hreflang map for one path: every locale, plus x-default pointing at English. */
function alternates(path: string) {
  return {
    languages: {
      ...Object.fromEntries(
        LOCALES.map((locale) => [
          HTML_LANG[locale],
          absoluteUrl(localePath(locale, path)),
        ])
      ),
      "x-default": absoluteUrl(localePath(DEFAULT_LOCALE, path)),
    },
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  return routes().flatMap((route) =>
    LOCALES.map((locale) => ({
      url: absoluteUrl(localePath(locale, route.path)),
      ...(route.lastModified ? { lastModified: route.lastModified } : {}),
      changeFrequency: route.changeFrequency,
      priority: route.priority,
      alternates: alternates(route.path),
    }))
  );
}
