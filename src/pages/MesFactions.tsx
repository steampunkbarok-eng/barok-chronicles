import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { ArrowLeft, Castle } from "lucide-react";
import { useTri } from "@/i18n/tri";
import FactionEditor, { FactionRow } from "@/components/FactionEditor";

const MesFactions = () => {
  const { L } = useTri();
  const navigate = useNavigate();
  const [email, setEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [factions, setFactions] = useState<FactionRow[]>([]);
  const [openId, setOpenId] = useState<string | null>(null);

  const load = useCallback(async (userEmail: string) => {
    const { data, error } = await supabase
      .from("factions")
      .select("*")
      .ilike("contact_email", userEmail)
      .order("nom");
    if (error) toast.error(error.message);
    else setFactions((data as unknown as FactionRow[]) || []);
    setLoading(false);
  }, []);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      const mail = data.session?.user?.email ?? null;
      setEmail(mail);
      if (mail) load(mail);
      else setLoading(false);
    });
  }, [load]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      <header className="border-b border-border/50 bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center gap-3">
          <Link to="/">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <Castle className="h-7 w-7 text-primary" />
          <h1 className="text-2xl font-bold text-primary font-serif">
            {L("Mes factions", "My factions", "Mijn facties")}
          </h1>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl space-y-4">
        {loading && <p className="text-muted-foreground">{L("Chargement…", "Loading…", "Laden…")}</p>}

        {!loading && !email && (
          <Card>
            <CardHeader>
              <CardTitle className="font-serif">{L("Connexion requise", "Sign in required", "Aanmelden vereist")}</CardTitle>
              <CardDescription>
                {L(
                  "Créez un compte (ou connectez-vous) avec l'adresse email de contact de votre faction pour la gérer.",
                  "Create an account (or sign in) with your faction's contact email address to manage it.",
                  "Maak een account aan (of meld je aan) met het contact-e-mailadres van je factie om ze te beheren.",
                )}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={() => navigate("/auth?next=/mes-factions")}>
                {L("Créer un compte / Se connecter", "Create an account / Sign in", "Account aanmaken / Aanmelden")}
              </Button>
            </CardContent>
          </Card>
        )}

        {!loading && email && factions.length === 0 && (
          <Card>
            <CardContent className="py-8 text-center space-y-3">
              <p className="text-muted-foreground">
                {L(`Aucune faction liée à ${email}.`, `No faction linked to ${email}.`, `Geen factie gekoppeld aan ${email}.`)}
              </p>
              <Link to="/factions">
                <Button>{L("Créer une faction", "Create a faction", "Een factie maken")}</Button>
              </Link>
            </CardContent>
          </Card>
        )}

        {factions.map((f) => (
          <Card key={f.id}>
            <CardHeader className="cursor-pointer" onClick={() => setOpenId(openId === f.id ? null : f.id)}>
              <CardTitle className="font-serif flex items-center gap-2 flex-wrap">
                {f.nom}
                <Badge variant="outline">{f.statut || "active"}</Badge>
                {(f.origines || []).map((o) => (
                  <span key={o} className="text-xs bg-primary/10 px-2 py-1 rounded font-normal">{o}</span>
                ))}
              </CardTitle>
              <CardDescription>
                {L(
                  "Cliquez pour corriger votre faction (origines, Marque collective, bâtiment, background) et voir les fiches de personnage liées.",
                  "Click to correct your faction (origins, collective Mark, building, background) and view the linked character sheets.",
                  "Klik om je factie te corrigeren (oorsprongen, collectief Merk, gebouw, achtergrond) en de gekoppelde personagebladen te bekijken.",
                )}
              </CardDescription>
            </CardHeader>

            {openId === f.id && (
              <CardContent className="border-t border-border pt-4">
                <FactionEditor faction={f} onSaved={() => email && load(email)} />
              </CardContent>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MesFactions;
