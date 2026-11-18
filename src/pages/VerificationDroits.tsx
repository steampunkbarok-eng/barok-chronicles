import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { ArrowLeft, ShieldCheck, CheckCircle2, XCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { useTri } from "@/i18n/tri";

type Res = { role: string; action: string; attendu: boolean; obtenu: boolean; ok: boolean };

const ROLES: Record<string, [string, string, string]> = {
  visiteur: ["Visiteur sans compte", "Visitor without account", "Bezoeker zonder account"],
  joueur: ["Joueur (créateur de la fiche)", "Player (sheet creator)", "Speler (maker van het blad)"],
  "autre gestionnaire": ["Gestionnaire d'une autre faction", "Manager of another faction", "Beheerder van een andere factie"],
  gestionnaire: ["Gestionnaire de la faction", "Faction manager", "Factiebeheerder"],
  organisation: ["Organisation", "Organisers", "Organisatie"],
};
const ACTIONS: Record<string, [string, string]> = {
  "Consulter une fiche": ["View a sheet", "Een blad bekijken"],
  "Consulter une faction": ["View a faction", "Een factie bekijken"],
  "Consulter sa propre fiche": ["View own sheet", "Eigen blad bekijken"],
  "Consulter la fiche d'une autre faction": ["View a sheet of another faction", "Blad van een andere factie bekijken"],
  "Modifier sa propre fiche": ["Edit own sheet", "Eigen blad bewerken"],
  "Valider sa propre fiche": ["Validate own sheet", "Eigen blad goedkeuren"],
  "S'attribuer de l'XP": ["Grant oneself XP", "Zichzelf XP toekennen"],
  "Changer l'email de la fiche": ["Change the sheet's email", "E-mailadres van het blad wijzigen"],
  "Changer la faction de la fiche": ["Change the sheet's faction", "Factie van het blad wijzigen"],
  "Supprimer définitivement sa fiche": ["Permanently delete own sheet", "Eigen blad definitief verwijderen"],
  "Mettre sa fiche à la corbeille": ["Move own sheet to the bin", "Eigen blad naar de prullenbak"],
  "Consulter une fiche d'une autre faction": ["View a sheet of another faction", "Blad van een andere factie bekijken"],
  "Valider une fiche d'une autre faction": ["Validate a sheet of another faction", "Blad van een andere factie goedkeuren"],
  "Modifier une autre faction": ["Edit another faction", "Een andere factie bewerken"],
  "Consulter sa faction": ["View own faction", "Eigen factie bekijken"],
  "Consulter les fiches de sa faction": ["View the faction's sheets", "Bladen van de factie bekijken"],
  "Consulter une autre faction": ["View another faction", "Een andere factie bekijken"],
  "Modifier sa faction (origines, marque…)": ["Edit own faction (origins, mark…)", "Eigen factie bewerken (oorsprongen, merk…)"],
  "Changer l'email de sa faction": ["Change own faction's email", "E-mailadres van eigen factie wijzigen"],
  "Corriger une fiche de sa faction": ["Correct a sheet of the faction", "Blad van de factie corrigeren"],
  "Valider une fiche de sa faction": ["Validate a sheet of the faction", "Blad van de factie goedkeuren"],
  "Changer l'email d'une fiche": ["Change a sheet's email", "E-mailadres van een blad wijzigen"],
  "Changer la faction d'une fiche": ["Change a sheet's faction", "Factie van een blad wijzigen"],
  "Archiver une fiche de sa faction": ["Archive a sheet of the faction", "Blad van de factie archiveren"],
  "Mettre une fiche à la corbeille": ["Move a sheet to the bin", "Blad naar de prullenbak"],
  "Voir une fiche à la corbeille": ["See a sheet in the bin", "Blad in de prullenbak zien"],
  "Restaurer depuis la corbeille": ["Restore from the bin", "Herstellen uit de prullenbak"],
  "Valider une fiche": ["Validate a sheet", "Een blad goedkeuren"],
  "Changer l'email d'une fiche (sans invalider)": ["Change a sheet's email (stays validated)", "E-mailadres van een blad wijzigen (blijft goedgekeurd)"],
  "Changer la faction d'une fiche (sans invalider)": ["Change a sheet's faction (stays validated)", "Factie van een blad wijzigen (blijft goedgekeurd)"],
  "Changer l'email d'une faction": ["Change a faction's email", "E-mailadres van een factie wijzigen"],
  "Archiver une fiche": ["Archive a sheet", "Een blad archiveren"],
  "Supprimer définitivement une fiche": ["Permanently delete a sheet", "Een blad definitief verwijderen"],
};

export default function VerificationDroits() {
  const { L: tri } = useTri();
  const navigate = useNavigate();
  const [allowed, setAllowed] = useState(false);
  const [running, setRunning] = useState(false);
  const [results, setResults] = useState<Res[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const { data } = await supabase.auth.getSession();
      const uid = data.session?.user.id;
      if (!uid) { navigate("/auth?next=/verification-droits", { replace: true }); return; }
      const { data: roles } = await supabase.from("user_roles").select("role").eq("user_id", uid);
      if ((roles || []).some((r) => r.role === "orga" || r.role === "admin")) setAllowed(true);
      else navigate("/", { replace: true });
    })();
  }, [navigate]);

  const lancer = async () => {
    setRunning(true); setError(null); setResults(null);
    const { data, error } = await supabase.functions.invoke("verifier-permissions", { body: {} });
    setRunning(false);
    if (error || data?.error) setError(String(data?.error || error?.message));
    setResults((data?.results as Res[]) || []);
  };

  if (!allowed) return null;
  const action = (a: string) => tri(a, ACTIONS[a]?.[0] ?? a, ACTIONS[a]?.[1] ?? a);
  const groupes = Object.keys(ROLES).map((k) => ({ k, items: (results || []).filter((r) => r.role === k) })).filter((g) => g.items.length);
  const echecs = (results || []).filter((r) => !r.ok).length;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="flex items-center justify-between p-4 border-b border-border">
        <Button asChild variant="ghost"><Link to="/orga"><ArrowLeft className="mr-2 h-4 w-4" />{tri("Organisation", "Organisers", "Organisatie")}</Link></Button>
        <LanguageSwitcher />
      </header>
      <main className="max-w-3xl mx-auto p-6 space-y-6">
        <h1 style={{ fontFamily: "Cinzel, serif" }} className="text-3xl text-primary flex items-center gap-3"><ShieldCheck />{tri("Vérification des droits", "Permission check", "Controle van de rechten")}</h1>
        <p className="text-muted-foreground">{tri(
          "Crée des comptes et une faction de test temporaires, essaie chaque action avec chaque type de compte, puis efface tout. Vos vraies fiches ne sont pas touchées.",
          "Creates temporary test accounts and a test faction, tries each action with each account type, then deletes everything. Your real sheets are untouched.",
          "Maakt tijdelijke testaccounts en een testfactie aan, probeert elke actie met elk accounttype en wist daarna alles. Je echte bladen blijven onaangeroerd.")}</p>
        <Button onClick={lancer} disabled={running}>
          {running ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <ShieldCheck className="mr-2 h-4 w-4" />}
          {tri("Lancer les vérifications", "Run the checks", "Controles starten")}
        </Button>
        {error && <p className="text-destructive">{error}</p>}
        {results && !error && (
          <p className={echecs ? "text-destructive font-bold" : "text-primary font-bold"}>
            {echecs
              ? tri(`${echecs} vérification(s) en échec sur ${results.length}`, `${echecs} of ${results.length} checks failed`, `${echecs} van ${results.length} controles mislukt`)
              : tri(`Les ${results.length} vérifications sont correctes`, `All ${results.length} checks passed`, `Alle ${results.length} controles geslaagd`)}
          </p>
        )}
        {groupes.map((g) => (
          <section key={g.k} className="border border-border rounded-lg p-4 bg-card space-y-2">
            <h2 className="text-xl text-primary">{tri(...ROLES[g.k])}</h2>
            {g.items.map((r, i) => (
              <div key={i} className="flex items-start gap-3 text-sm">
                {r.ok ? <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" /> : <XCircle className="h-4 w-4 text-destructive mt-0.5 shrink-0" />}
                <span className="flex-1">{action(r.action)}</span>
                <span className="text-muted-foreground">
                  {r.attendu ? tri("autorisé", "allowed", "toegestaan") : tri("refusé", "denied", "geweigerd")}
                </span>
              </div>
            ))}
          </section>
        ))}
      </main>
    </div>
  );
}
