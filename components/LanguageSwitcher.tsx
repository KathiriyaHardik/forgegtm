"use client";

import { usePathname, useRouter } from "next/navigation";
import { LOCALES, LOCALE_LABELS, isLocale, type Locale } from "@/lib/i18n/config";

/**
 * EN | DE switch. Swaps the locale segment of the current path so the visitor
 * stays on the same page. Persistence is handled by proxy.ts, which writes the
 * locale cookie whenever it sees a locale-prefixed path — so navigating here is
 * what makes the choice survive a refresh or a later visit to an unprefixed URL.
 */
export function LanguageSwitcher({
  current,
  label,
  tone = "light",
}: {
  current: Locale;
  label: string;
  tone?: "light" | "dark";
}) {
  const pathname = usePathname();
  const router = useRouter();

  const switchTo = (locale: Locale) => {
    if (locale === current) return;

    const segments = pathname.split("/");
    if (isLocale(segments[1])) {
      segments[1] = locale;
    } else {
      segments.splice(1, 0, locale);
    }

    router.push(segments.join("/") || `/${locale}`);
    router.refresh();
  };

  const isDark = tone === "dark";

  return (
    <div
      role="group"
      aria-label={label}
      className={`inline-flex items-center rounded-full border p-0.5 ${
        isDark ? "border-white/15" : "border-border"
      }`}
    >
      {LOCALES.map((locale) => {
        const active = locale === current;
        return (
          <button
            key={locale}
            type="button"
            lang={locale}
            aria-current={active ? "true" : undefined}
            onClick={() => switchTo(locale)}
            className={`ease-premium rounded-full px-2.5 py-1 text-[12px] font-medium transition-colors duration-200 ${
              active
                ? isDark
                  ? "bg-white/15 text-white"
                  : "bg-ink text-white"
                : isDark
                  ? "text-white/50 hover:text-white"
                  : "text-muted hover:text-ink"
            }`}
          >
            {LOCALE_LABELS[locale]}
          </button>
        );
      })}
    </div>
  );
}
