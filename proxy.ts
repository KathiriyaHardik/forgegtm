import { NextResponse, type NextRequest } from "next/server";
import {
  DEFAULT_LOCALE,
  LOCALE_COOKIE,
  LOCALES,
  isLocale,
  type Locale,
} from "@/lib/i18n/config";

/**
 * Locale routing. In Next.js 16 this file is `proxy.ts` — the former
 * `middleware.ts`. A file named `middleware.ts` is simply never run.
 *
 * Every page lives under /[lang], so an unprefixed path is redirected to the
 * visitor's preferred locale: an explicit previous choice (cookie) first,
 * then Accept-Language, then English.
 */

/** Minimal Accept-Language parser — avoids pulling in a negotiation library. */
function fromAcceptLanguage(header: string | null): Locale | null {
  if (!header) return null;

  const ranked = header
    .split(",")
    .map((part) => {
      const [tag, ...params] = part.trim().split(";");
      const q = params.find((p) => p.trim().startsWith("q="));
      return {
        tag: tag.trim().toLowerCase(),
        quality: q ? Number.parseFloat(q.split("=")[1]) || 0 : 1,
      };
    })
    .sort((a, b) => b.quality - a.quality);

  for (const { tag } of ranked) {
    const base = tag.split("-")[0];
    if (isLocale(base)) return base;
  }

  return null;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const hasLocale = LOCALES.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  );

  if (hasLocale) {
    // Keep the cookie in step with the URL the visitor is actually on, so the
    // choice survives a later visit to an unprefixed path.
    const current = pathname.split("/")[1];
    const response = NextResponse.next();
    if (isLocale(current) && request.cookies.get(LOCALE_COOKIE)?.value !== current) {
      response.cookies.set(LOCALE_COOKIE, current, {
        path: "/",
        maxAge: 60 * 60 * 24 * 365,
        sameSite: "lax",
      });
    }
    return response;
  }

  const saved = request.cookies.get(LOCALE_COOKIE)?.value;
  const locale =
    (saved && isLocale(saved) && saved) ||
    fromAcceptLanguage(request.headers.get("accept-language")) ||
    DEFAULT_LOCALE;

  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  // Skip Next internals and anything with a file extension (icons, images).
  matcher: ["/((?!_next|.*\\.[\\w]+$).*)"],
};
