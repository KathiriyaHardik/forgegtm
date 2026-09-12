export const LOCALES = ["en", "de"] as const;

export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "en";

/** Cookie used to remember an explicit language choice across visits. */
export const LOCALE_COOKIE = "forgegtm_locale";

export const LOCALE_LABELS: Record<Locale, string> = {
  en: "EN",
  de: "DE",
};

/** Used for <html lang> and Open Graph locale tags. */
export const HTML_LANG: Record<Locale, string> = {
  en: "en",
  de: "de",
};

export const OG_LOCALE: Record<Locale, string> = {
  en: "en_GB",
  de: "de_DE",
};

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

/** Prefixes a path with the locale, e.g. ("de", "/insights") -> "/de/insights" */
export function localePath(locale: Locale, path = "") {
  const suffix = path === "/" ? "" : path;
  return `/${locale}${suffix}`;
}
