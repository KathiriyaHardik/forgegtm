import { DEFAULT_LOCALE, type Locale } from "./config";
import { en, type Dictionary } from "./en";
import { de } from "./de";

const DICTIONARIES: Record<Locale, Dictionary> = { en, de };

export function getDictionary(locale: Locale): Dictionary {
  return DICTIONARIES[locale] ?? DICTIONARIES[DEFAULT_LOCALE];
}

export type { Dictionary };
export * from "./config";
