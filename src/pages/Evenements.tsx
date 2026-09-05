import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CalendarDays, MapPin, Sparkles } from "lucide-react";
import { useTri } from "@/i18n/tri";

interface Evenement {
  id: string;
  nom: string;
  date_debut: string;
  date_fin: string | null;
  lieu: string | null;
  description: string | null;
  xp_attribuee: number;
  compte_rendu: string | null;
  statut: "a_venir" | "en_cours" | "termine" | "annule";
}

export const statutEvtLabels: Record<Evenement["statut"], { fr: string; en: string; nl: string }> = {
  a_venir: { fr: "À venir", en: "Upcoming", nl: "Binnenkort" },
  en_cours: { fr: "En cours", en: "Ongoing", nl: "Bezig" },
  termine: { fr: "Terminé", en: "Finished", nl: "Afgelopen" },
  annule: { fr: "Annulé", en: "Cancelled", nl: "Geannuleerd" },
};

export const statutEvtColors: Record<Evenement["statut"], string> = {
  a_venir: "bg-yellow-500/20 text-yellow-700 dark:text-yellow-400",
  en_cours: "bg-green-500/20 text-green-700 dark:text-green-400",
  termine: "bg-muted text-muted-foreground",
  annule: "bg-red-500/20 text-red-700 dark:text-red-400",
};

const formatDates = (e: Evenement, locale: string) => {
  const d1 = new Date(e.date_debut).toLocaleDateString(locale, { day: "numeric", month: "long", year: "numeric" });
  if (!e.date_fin || e.date_fin === e.date_debut) return d1;
  const d2 = new Date(e.date_fin).toLocaleDateString(locale, { day: "numeric", month: "long", year: "numeric" });
  return `${d1} → ${d2}`;
};

const Evenements = () => {
  const { language, L } = useTri();
  const locale = language === "en" ? "en-GB" : language === "nl" ? "nl-NL" : "fr-FR";
  const [evenements, setEvenements] = useState<Evenement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from("evenements")
        .select("id, nom, date_debut, date_fin, lieu, description, xp_attribuee, compte_rendu, statut")
        .order("date_debut", { ascending: false });
      setEvenements((data as Evenement[]) || []);
      setLoading(false);
    })();
  }, []);

  const aVenir = evenements.filter((e) => e.statut === "a_venir" || e.statut === "en_cours");
  const passes = evenements.filter((e) => e.statut === "termine" || e.statut === "annule");

  const renderCard = (e: Evenement) => (
    <Card key={e.id} className="ornament-border">
      <CardHeader>
        <div className="flex items-start justify-between gap-3 flex-wrap">
          <div>
            <CardTitle className="font-serif text-xl">{e.nom}</CardTitle>
            <CardDescription className="flex flex-wrap items-center gap-3 mt-1">
              <span className="inline-flex items-center gap-1">
                <CalendarDays className="w-4 h-4" /> {formatDates(e, locale)}
              </span>
              {e.lieu && (
                <span className="inline-flex items-center gap-1">
                  <MapPin className="w-4 h-4" /> {e.lieu}
                </span>
              )}
              {e.xp_attribuee > 0 && (
                <span className="inline-flex items-center gap-1">
                  <Sparkles className="w-4 h-4" /> {e.xp_attribuee} XP
                </span>
              )}
            </CardDescription>
          </div>
          <Badge className={statutEvtColors[e.statut]}>
            {statutEvtLabels[e.statut][language]}
          </Badge>
        </div>
      </CardHeader>
      {(e.description || e.compte_rendu) && (
        <CardContent className="space-y-3 text-sm">
          {e.description && <p className="whitespace-pre-line text-muted-foreground">{e.description}</p>}
          {e.compte_rendu && (
            <div>
              <h3 className="font-serif text-base mb-1">{L("Compte-rendu", "Report", "Verslag")}</h3>
              <p className="whitespace-pre-line text-muted-foreground">{e.compte_rendu}</p>
            </div>
          )}
        </CardContent>
      )}
    </Card>
  );

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-primary/20 bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center gap-3">
          <Link to="/" className="text-muted-foreground hover:text-foreground">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <CalendarDays className="w-6 h-6 text-primary" />
          <h1 className="font-serif text-2xl">{L("Événements", "Events", "Evenementen")}</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 space-y-8 max-w-4xl">
        {loading && <p className="text-muted-foreground">{L("Chargement…", "Loading…", "Laden…")}</p>}

        {!loading && evenements.length === 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="font-serif">{L("Aucun événement annoncé", "No event announced", "Geen evenement aangekondigd")}</CardTitle>
              <CardDescription>
                {L(
                  "Les prochaines sessions de jeu apparaîtront ici dès leur publication par les orgas.",
                  "Upcoming game sessions will appear here once published by the organisers.",
                  "Komende speelsessies verschijnen hier zodra de organisatie ze publiceert.",
                )}
              </CardDescription>
            </CardHeader>
          </Card>
        )}

        {aVenir.length > 0 && (
          <section className="space-y-4">
            <h2 className="font-serif text-2xl text-primary">{L("Prochaines sessions", "Upcoming sessions", "Volgende sessies")}</h2>
            {aVenir.map(renderCard)}
          </section>
        )}

        {passes.length > 0 && (
          <section className="space-y-4">
            <h2 className="font-serif text-2xl text-primary">{L("Sessions passées", "Past sessions", "Afgelopen sessies")}</h2>
            {passes.map(renderCard)}
          </section>
        )}

        <div className="pt-4">
          <Link to="/personnages">
            <Button variant="outline">{L("Créer un personnage", "Create a character", "Een personage maken")}</Button>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default Evenements;
