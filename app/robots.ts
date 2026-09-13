import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site";

/**
 * Everything on this site is public marketing content, so crawling is open.
 * The sitemap reference is the part that matters: it is how a crawler that
 * arrives at the bare domain discovers the locale-prefixed routes, since every
 * page lives under /[lang] and "/" only ever answers with a redirect.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Internal lead dashboard. Basic auth already blocks it; this keeps the
      // URL out of search results too.
      disallow: "/admin",
    },
    sitemap: absoluteUrl("/sitemap.xml"),
    host: absoluteUrl(),
  };
}
