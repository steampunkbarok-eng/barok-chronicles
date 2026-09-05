import { useLanguage } from "@/contexts/LanguageContext";

export type Lang = "fr" | "en" | "nl";

/** Pick a string for the active language (French default, English fallback). */
export const tri = (language: Lang, fr: string, en: string, nl: string) =>
  language === "en" ? en : language === "nl" ? nl : fr;

/** Hook returning a `L(fr, en, nl)` helper bound to the active language. */
export const useTri = () => {
  const { language } = useLanguage();
  return {
    language,
    L: (fr: string, en: string, nl: string) => tri(language, fr, en, nl),
  };
};
