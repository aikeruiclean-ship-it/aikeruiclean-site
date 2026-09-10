// i18n configuration for aikeruiclean.com
// English keeps existing root URLs (zero SEO risk); other locales use /{locale}/ prefix.

export const locales = ["en", "es", "ar", "ru", "fr"] as const;
export type Locale = (typeof locales)[number];

// Non-English locales that get their own /{locale}/ pages
export const translatedLocales: Locale[] = ["es", "ar", "ru", "fr"];

export const localeNames: Record<Locale, string> = {
  en: "English",
  es: "Español",
  ar: "العربية",
  ru: "Русский",
  fr: "Français",
};

// Right-to-left languages
export const rtlLocales: Locale[] = ["ar"];

export function isRtl(locale: Locale): boolean {
  return rtlLocales.includes(locale);
}

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export const SITE_URL = "https://aikeruiclean.com";
