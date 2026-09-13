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

/**
 * Constant-time string comparison.
 *
 * `===` on a secret leaks its length and prefix through timing. Node's
 * `timingSafeEqual` is not reliably available in every runtime this file can
 * execute in, so the comparison is done by hand: always walk the full width,
 * never break early.
 */
function safeEqual(a: string, b: string) {
  const width = Math.max(a.length, b.length);
  let diff = a.length ^ b.length;
  for (let i = 0; i < width; i++) {
    diff |= (a.charCodeAt(i) || 0) ^ (b.charCodeAt(i) || 0);
  }
  return diff === 0;
}

/** 401 with a WWW-Authenticate challenge, which is what triggers the prompt. */
function unauthorized() {
  return new NextResponse("Authentication required.", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="ForgeGTM admin", charset="UTF-8"',
      // Never let an authenticated page sit in a shared cache.
      "Cache-Control": "no-store",
    },
  });
}

/**
 * HTTP Basic auth for /admin. The dashboard exposes every lead's contact
 * details, so it is gated before the route is ever reached.
 *
 * Fails closed: with no ADMIN_PASSWORD set the dashboard is unreachable rather
 * than public. An unconfigured secret must never mean an open door.
 */
function guardAdmin(request: NextRequest) {
  const expectedUser = process.env.ADMIN_USER || "forgegtm";
  const expectedPassword = process.env.ADMIN_PASSWORD;

  if (!expectedPassword) {
    console.error(
      "[admin] ADMIN_PASSWORD is not set — /admin is disabled. See README.md."
    );
    return new NextResponse(
      "The admin dashboard is not configured. Set ADMIN_PASSWORD.",
      { status: 503, headers: { "Cache-Control": "no-store" } }
    );
  }

  const header = request.headers.get("authorization");
  if (!header?.startsWith("Basic ")) return unauthorized();

  let decoded: string;
  try {
    decoded = atob(header.slice(6));
  } catch {
    return unauthorized();
  }

  // Only the first colon separates the pair; passwords may contain more.
  const separator = decoded.indexOf(":");
  if (separator === -1) return unauthorized();

  const user = decoded.slice(0, separator);
  const password = decoded.slice(separator + 1);

  // Both comparisons always run, so a correct username cannot be detected by
  // how long the rejection takes.
  const userOk = safeEqual(user, expectedUser);
  const passwordOk = safeEqual(password, expectedPassword);
  if (!userOk || !passwordOk) return unauthorized();

  const response = NextResponse.next();
  response.headers.set("Cache-Control", "no-store");
  return response;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // The admin dashboard sits outside the localised site and is gated here,
  // before any routing decision, so no unauthenticated request ever reaches it.
  if (pathname === "/admin" || pathname.startsWith("/admin/")) {
    return guardAdmin(request);
  }

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
