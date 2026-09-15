import { Languages } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

type Lang = "fr" | "en" | "nl";

const ALL: Lang[] = ["fr", "en", "nl"];

const LABELS: Record<Lang, string> = { fr: "FR", en: "EN", nl: "NL" };
const TITLES: Record<Lang, string> = {
  fr: "Français",
  en: "English",
  nl: "Nederlands",
};

/**
 * Sélecteur de langue : affiche toujours les deux autres langues séparément.
 * Depuis le FR on voit EN et NL ; depuis EN ou NL on voit FR (et l'autre langue).
 */
export const LanguageSwitcher = ({ className = "" }: { className?: string }) => {
  const { language, setLanguage } = useLanguage();
  const others = ALL.filter((l) => l !== language);

  return (
    <div className={`flex items-center gap-1 ${className}`}>
      <Languages className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
      {others.map((lang) => (
        <Button
          key={lang}
          variant="ghost"
          size="sm"
          className="px-2 h-8 text-sm font-medium"
          onClick={() => setLanguage(lang)}
          title={TITLES[lang]}
          aria-label={TITLES[lang]}
        >
          {LABELS[lang]}
        </Button>
      ))}
    </div>
  );
};

export default LanguageSwitcher;
