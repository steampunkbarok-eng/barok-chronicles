import { useEffect, useState, useCallback } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { ArrowLeft, LogOut, Check, X, Plus, Trash2, ScrollText, Coins } from "lucide-react";
import {
  DemandeXp,
  TypeDemande,
  labelsTypeDemande,
  statutDemandeColors,
  statutDemandeLabels,
  xpDepensee,
  xpEnAttente,
} from "@/data/xpAchats";
import EvenementsManager from "@/components/orga/EvenementsManager";
import FactionsManager from "@/components/orga/FactionsManager";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { GuideButton } from "@/components/GuideButton";
import { useTri } from "@/i18n/tri";
import { translateGameData } from "@/i18n/gameData";

type Statut = "brouillon" | "soumis" | "valide" | "archive";

interface PersoRow {
  id: string;
  nom: string;
  prenom: string;
  faction: string | null;
  espece: string;
  email: string;
  statut: Statut;
  xp: number;
  data: any;
  notes_orga: string | null;
  created_at: string;
  updated_at: string;
}

interface Evolution {
  id: string;
  personnage_id: string;
  type_evolution: string;
  description: string;
  valeur: number | null;
  auteur: string | null;
  created_at: string;
}

const dateLocale: Record<"fr" | "en" | "nl", string> = {
  fr: "fr-FR",
  en: "en-US",
  nl: "nl-NL",
};

const statutLabelsByLang: Record<"fr" | "en" | "nl", Record<Statut, string>> = {
  fr: { brouillon: "Brouillon", soumis: "Soumis", valide: "Validé", archive: "Archivé" },
  en: { brouillon: "Draft", soumis: "Submitted", valide: "Validated", archive: "Archived" },
  nl: { brouillon: "Klad", soumis: "Ingediend", valide: "Gevalideerd", archive: "Gearchiveerd" },
};

const statutColors: Record<Statut, string> = {
  brouillon: "bg-muted text-muted-foreground",
  soumis: "bg-yellow-500/20 text-yellow-700 dark:text-yellow-400",
  valide: "bg-green-500/20 text-green-700 dark:text-green-400",
  archive: "bg-red-500/20 text-red-700 dark:text-red-400",
};

const Orga = () => {
  const { L, language } = useTri();
  const loc = language === "en" ? "en-US" : language === "nl" ? "nl-NL" : "fr-FR";
  const statutTxt = (st: string) => ({ brouillon: L("brouillon","draft","concept"), soumis: L("soumis","submitted","ingediend"), valide: L("validé","validated","gevalideerd"), archive: L("archivé","archived","gearchiveerd") } as Record<string,string>)[st] || st;
  const statutLabels = statutLabelsByLang[language];
  const locale = dateLocale[language];
  const navigate = useNavigate();
  const [checking, setChecking] = useState(true);
  const [authorized, setAuthorized] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [persos, setPersos] = useState<PersoRow[]>([]);
  const [filter, setFilter] = useState<Statut | "tous">("tous");
  const [selected, setSelected] = useState<PersoRow | null>(null);
  const [evolutions, setEvolutions] = useState<Evolution[]>([]);
  const [editForm, setEditForm] = useState<Partial<PersoRow>>({});
  const [editDataJson, setEditDataJson] = useState("");
  const [newEvo, setNewEvo] = useState({ type_evolution: "xp", description: "", valeur: 0 });
  const [demandes, setDemandes] = useState<DemandeXp[]>([]);
  const [reponses, setReponses] = useState<Record<string, string>>({});
  const [demandesEnAttente, setDemandesEnAttente] = useState<DemandeXp[]>([]);
  const [corbeille, setCorbeille] = useState<PersoRow[]>([]);

  const loadPersos = useCallback(async () => {
    const { data, error } = await supabase
      .from("personnages")
      .select("*")
      .is("deleted_at", null)
      .order("updated_at", { ascending: false });
    if (error) toast.error(error.message);
    else setPersos((data as PersoRow[]) || []);
  }, []);

  const loadCorbeille = useCallback(async () => {
    const { data } = await supabase
      .from("personnages")
      .select("*")
      .not("deleted_at", "is", null)
      .order("deleted_at", { ascending: false });
    setCorbeille((data as PersoRow[]) || []);
  }, []);


  const loadDemandesEnAttente = useCallback(async () => {
    const { data } = await supabase
      .from("demandes_xp")
      .select("*")
      .eq("statut", "en_attente")
      .order("created_at", { ascending: true });
    setDemandesEnAttente((data as DemandeXp[]) || []);
  }, []);

  useEffect(() => {
    (async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/auth");
        return;
      }
      setUserEmail(session.user.email || "");
      const { data: roles } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", session.user.id);
      const isOrga = (roles || []).some((r: any) => r.role === "orga" || r.role === "admin");
      if (!isOrga) {
        toast.error(L("Ton compte n'a pas le rôle orga. Contacte un admin.", 'Your account does not have the orga role. Contact an admin.', 'Je account heeft geen orga-rol. Neem contact op met een admin.'));
        setChecking(false);
        return;
      }
      setAuthorized(true);
      await loadPersos();
      await loadCorbeille();
      await loadDemandesEnAttente();
      setChecking(false);
    })();
  }, [navigate, loadPersos, loadCorbeille, loadDemandesEnAttente]);

  const loadDemandes = useCallback(async (personnageId: string) => {
    const { data } = await supabase
      .from("demandes_xp")
      .select("*")
      .eq("personnage_id", personnageId)
      .order("created_at", { ascending: false });
    setDemandes((data as DemandeXp[]) || []);
  }, []);

  const openPerso = async (p: PersoRow) => {
    setSelected(p);
    setEditForm(p);
    setEditDataJson(JSON.stringify(p.data, null, 2));
    const { data } = await supabase
      .from("personnage_evolutions")
      .select("*")
      .eq("personnage_id", p.id)
      .order("created_at", { ascending: false });
    setEvolutions((data as Evolution[]) || []);
    await loadDemandes(p.id);
  };


  const notify = async (payload: Record<string, unknown>) => {
    try {
      await supabase.functions.invoke("notify-personnage", { body: payload });
    } catch (e) {
      console.error("Notification échouée:", e);
    }
  };

  const setStatut = async (id: string, statut: Statut) => {
    const { error } = await supabase.from("personnages").update({ statut }).eq("id", id);
    if (error) return toast.error(error.message);
    toast.success(L('Statut mis à jour', 'Status updated', 'Status bijgewerkt'));
    const p = persos.find((x) => x.id === id) || selected;
    if (p?.email) {
      notify({
        type: "statut",
        contactEmail: p.email,
        nomTI: `${p.prenom} ${p.nom}`.trim(),
        nomTO: p.email,
        faction: p.faction,
        statut,
      });
      toast.info(L('Notification envoyée au joueur', 'Notification sent to the player', 'Melding verstuurd naar de speler'));
    }
    loadPersos();
    if (selected?.id === id) setSelected({ ...selected, statut });
  };


  const deletePerso = async (id: string) => {
    if (!confirm(L('Mettre cette fiche à la corbeille ? Elle restera récupérable.', 'Move this sheet to the bin? It can be restored.', 'Deze kaart naar de prullenbak verplaatsen? Ze blijft herstelbaar.'))) return;
    const { error } = await supabase
      .from("personnages")
      .update({ deleted_at: new Date().toISOString(), deleted_by: userEmail })
      .eq("id", id);
    if (error) return toast.error(error.message);
    toast.success(L('Fiche mise à la corbeille', 'Sheet moved to the bin', 'Kaart naar de prullenbak verplaatst'));
    setSelected(null);
    loadPersos();
    loadCorbeille();
  };

  const restaurerPerso = async (id: string) => {
    const { error } = await supabase
      .from("personnages")
      .update({ deleted_at: null, deleted_by: null })
      .eq("id", id);
    if (error) return toast.error(error.message);
    toast.success(L('Fiche restaurée', 'Sheet restored', 'Kaart hersteld'));
    loadPersos();
    loadCorbeille();
  };

  const supprimerDefinitivement = async (id: string) => {
    if (!confirm(L('Supprimer DÉFINITIVEMENT cette fiche ? Cette action est irréversible.', 'PERMANENTLY delete this sheet? This cannot be undone.', 'Deze kaart DEFINITIEF verwijderen? Dit kan niet ongedaan worden.'))) return;
    const { error } = await supabase.from("personnages").delete().eq("id", id);
    if (error) return toast.error(error.message);
    toast.success(L('Fiche supprimée définitivement', 'Sheet permanently deleted', 'Kaart definitief verwijderd'));
    loadCorbeille();
  };


  const saveEdit = async () => {
    if (!selected) return;
    let parsed;
    try {
      parsed = JSON.parse(editDataJson);
    } catch {
      return toast.error(L('JSON invalide dans la fiche complète', 'Invalid JSON in the full sheet', 'Ongeldige JSON in de volledige kaart'));
    }
    const { error } = await supabase
      .from("personnages")
      .update({
        nom: editForm.nom,
        prenom: editForm.prenom,
        faction: editForm.faction,
        espece: editForm.espece,
        xp: editForm.xp,
        notes_orga: editForm.notes_orga,
        data: parsed,
      })
      .eq("id", selected.id);
    if (error) return toast.error(error.message);
    toast.success(L('Personnage mis à jour', 'Character updated', 'Personage bijgewerkt'));
    loadPersos();
    setSelected({ ...selected, ...editForm, data: parsed } as PersoRow);
  };

  const addEvolution = async () => {
    if (!selected || !newEvo.description.trim()) return;
    const { error } = await supabase.from("personnage_evolutions").insert({
      personnage_id: selected.id,
      type_evolution: newEvo.type_evolution,
      description: newEvo.description,
      valeur: newEvo.valeur || null,
      auteur: userEmail,
    });
    if (error) return toast.error(error.message);
    // Si XP, incrémente le total
    let xpTotal = selected.xp || 0;
    if (newEvo.type_evolution === "xp" && newEvo.valeur) {
      xpTotal = (selected.xp || 0) + newEvo.valeur;
      await supabase.from("personnages").update({ xp: xpTotal }).eq("id", selected.id);
    }
    if (selected.email) {
      notify({
        type: "evolution",
        contactEmail: selected.email,
        nomTI: `${selected.prenom} ${selected.nom}`.trim(),
        evolution: { ...newEvo },
        xpTotal,
      });
    }
    toast.success(L('Évolution ajoutée', 'Evolution added', 'Evolutie toegevoegd'));
    setNewEvo({ type_evolution: "xp", description: "", valeur: 0 });

    openPerso(selected);
    loadPersos();
  };

  const deleteEvo = async (id: string) => {
    const { error } = await supabase.from("personnage_evolutions").delete().eq("id", id);
    if (error) return toast.error(error.message);
    if (selected) openPerso(selected);
  };

  const traiterDemande = async (d: DemandeXp, statut: "approuvee" | "refusee") => {
    const reponse = reponses[d.id]?.trim() || null;
    const { error } = await supabase
      .from("demandes_xp")
      .update({ statut, reponse_orga: reponse, traite_par: userEmail })
      .eq("id", d.id);
    if (error) return toast.error(error.message);

    const perso = persos.find((p) => p.id === d.personnage_id) || selected;

    if (statut === "approuvee") {
      await supabase.from("personnage_evolutions").insert({
        personnage_id: d.personnage_id,
        type_evolution: d.type_demande,
        description: `${d.libelle} acquis (−${d.cout_xp} XP)`,
        valeur: -d.cout_xp,
        auteur: userEmail,
      });
    }

    if (perso?.email) {
      notify({
        type: "demande",
        contactEmail: perso.email,
        nomTI: `${perso.prenom} ${perso.nom}`.trim(),
        evolution: {
          type_evolution: d.type_demande,
          description: `Demande ${statut === "approuvee" ? "approuvée" : "refusée"} : ${d.libelle} (${d.cout_xp} XP)${reponse ? ` — ${reponse}` : ""}`,
          valeur: statut === "approuvee" ? -d.cout_xp : 0,
        },
        xpTotal: perso.xp,
        statut,
      });
    }

    toast.success(statut === "approuvee" ? L("Demande approuvée","Request approved","Aanvraag goedgekeurd") : L("Demande refusée","Request refused","Aanvraag geweigerd"));
    setReponses({ ...reponses, [d.id]: "" });
    loadDemandesEnAttente();
    if (selected) {
      loadDemandes(selected.id);
      openPerso(selected);
    }
  };


  const logout = async () => {
    await supabase.auth.signOut();
    navigate("/auth");
  };

  if (checking) return <div className="min-h-screen flex items-center justify-center">{L("Chargement…","Loading…","Laden…")}</div>;

  if (!authorized) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle>{L('Accès refusé','Access denied','Toegang geweigerd')}</CardTitle>
            <CardDescription>
              {L(`Ton compte (${userEmail}) n'a pas le rôle orga. Un administrateur doit te l'attribuer.`,`Your account (${userEmail}) does not have the orga role. An administrator must grant it.`,`Je account (${userEmail}) heeft geen orga-rol. Een beheerder moet die toekennen.`)}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" onClick={logout} className="w-full">
              <LogOut className="w-4 h-4 mr-2" /> {L('Se déconnecter','Sign out','Afmelden')}
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const filtered = filter === "tous" ? persos : persos.filter((p) => p.statut === filter);

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-primary/20 bg-card">
        <div className="container mx-auto px-4 py-4 flex flex-wrap gap-3 items-center justify-between">
          <div className="flex flex-wrap items-center gap-3">
            <Link to="/" className="text-muted-foreground hover:text-foreground">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <ScrollText className="w-6 h-6 text-primary" />
            <h1 className="font-serif text-2xl">{L('Gestion Orga','Organisation management','Organisatiebeheer')}</h1>
          </div>
          <div className="flex flex-wrap items-center gap-3 text-sm">
            <Link to="/parcours-test" className="text-sm underline text-primary mr-2">{L('Parcours de test','Test walkthrough','Testparcours')}</Link>
            <LanguageSwitcher />
            <span className="text-muted-foreground hidden sm:inline">{userEmail}</span>
            <Button variant="ghost" size="sm" onClick={logout}>
              <LogOut className="w-4 h-4 mr-1" /> {L('Déconnexion','Sign out','Afmelden')}
            </Button>
            <GuideButton />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 space-y-4">
        {demandesEnAttente.length > 0 && (
          <Card className="border-primary/40">
            <CardHeader className="pb-2">
              <CardTitle className="font-serif flex items-center gap-2">
                <Coins className="w-5 h-5 text-primary" /> {L("Demandes d'XP en attente",'Pending XP requests','XP-aanvragen in afwachting')} ({demandesEnAttente.length})
              </CardTitle>
              <CardDescription>{L('Clique sur un personnage pour traiter ses demandes en détail.','Click a character to handle their requests in detail.','Klik op een personage om de aanvragen in detail te behandelen.')}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {demandesEnAttente.map((d) => {
                const p = persos.find((x) => x.id === d.personnage_id);
                return (
                  <div
                    key={d.id}
                    className="flex flex-wrap items-center gap-2 border border-border rounded p-2 text-sm cursor-pointer"
                    onClick={() => p && openPerso(p)}
                  >
                    <span className="font-medium">{p ? `${p.prenom} ${p.nom}` : L('Personnage','Character','Personage')}</span>
                    <Badge variant="outline">
                      {labelsTypeDemande[d.type_demande as TypeDemande]?.[language] || labelsTypeDemande[d.type_demande as TypeDemande]?.fr || d.type_demande}
                    </Badge>
                    <span>{d.libelle}</span>
                    <span className="text-muted-foreground">— {d.cout_xp} XP</span>
                    <span className="text-xs text-muted-foreground ml-auto">
                      {new Date(d.created_at).toLocaleDateString(loc)}
                    </span>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        )}
        <Card>

          <CardHeader>
            <div className="flex items-center justify-between flex-wrap gap-2">
              <CardTitle className="font-serif">{L('Personnages','Characters','Personages')} ({filtered.length})</CardTitle>
              <Select value={filter} onValueChange={(v) => setFilter(v as any)}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tous">{L('Tous','All','Alle')}</SelectItem>
                  <SelectItem value="soumis">{L('Soumis (à valider)','Submitted (to validate)','Ingediend (te valideren)')}</SelectItem>
                  <SelectItem value="valide">{L('Validés','Validated','Gevalideerd')}</SelectItem>
                  <SelectItem value="brouillon">{L('Brouillons','Drafts','Concepten')}</SelectItem>
                  <SelectItem value="archive">{L('Archivés','Archived','Gearchiveerd')}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{L('Nom','Name','Naam')}</TableHead>
                  <TableHead>{L('Faction','Faction','Factie')}</TableHead>
                  <TableHead>{L('Espèce','Species','Soort')}</TableHead>
                  <TableHead>XP</TableHead>
                  <TableHead>{L('Statut','Status','Status')}</TableHead>
                  <TableHead>{L('Soumis le','Submitted on','Ingediend op')}</TableHead>
                  <TableHead className="text-right">{L('Actions','Actions','Acties')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((p) => (
                  <TableRow key={p.id} className="cursor-pointer" onClick={() => openPerso(p)}>
                    <TableCell className="font-medium">
                      {p.prenom} {p.nom}
                    </TableCell>
                    <TableCell>{p.faction || "—"}</TableCell>
                    <TableCell>{translateGameData(p.espece, 'espece', language)}</TableCell>
                    <TableCell>{p.xp}</TableCell>
                    <TableCell>
                      <Badge className={statutColors[p.statut]}>{statutTxt(p.statut)}</Badge>
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground">
                      {new Date(p.created_at).toLocaleDateString(loc)}
                    </TableCell>
                    <TableCell className="text-right" onClick={(e) => e.stopPropagation()}>
                      {p.statut === "soumis" && (
                        <>
                          <Button size="sm" variant="ghost" title={L('Valider','Validate','Valideren')} onClick={() => setStatut(p.id, "valide")}>
                            <Check className="w-4 h-4 text-green-600" />
                          </Button>
                          <Button size="sm" variant="ghost" title={L('Archiver','Archive','Archiveren')} onClick={() => setStatut(p.id, "archive")}>
                            <X className="w-4 h-4 text-red-600" />
                          </Button>
                        </>
                      )}
                      <Button size="sm" variant="outline" asChild onClick={(e) => e.stopPropagation()}>
                        <a href={`/personnages/${p.id}`} target="_blank" rel="noopener noreferrer">{L('Ouvrir la fiche','Open sheet','Kaart openen')}</a>
                      </Button>
                      <Button size="sm" variant="ghost" title={L('Mettre à la corbeille','Move to bin','Naar prullenbak')} onClick={() => deletePerso(p.id)}>
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
                {filtered.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center text-muted-foreground py-8">
                      {L('Aucun personnage.','No characters.','Geen personages.')}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card className="border-destructive/30">
          <CardHeader>
            <CardTitle className="font-serif flex items-center gap-2">
              <Trash2 className="w-5 h-5 text-destructive" /> {L('Corbeille','Bin','Prullenbak')} ({corbeille.length})
            </CardTitle>
            <CardDescription>
              {L("Fiches mises à la corbeille par un joueur, un gestionnaire de faction ou l'Orga. Vous pouvez les restaurer (elles redeviennent visibles avec leur statut) ou les effacer définitivement.","Sheets binned by a player, a faction manager or the Organisation. You can restore them (they become visible again with their status) or delete them permanently.","Kaarten die door een speler, factiebeheerder of de Organisatie in de prullenbak zijn gezet. Je kunt ze herstellen (ze worden weer zichtbaar met hun status) of definitief wissen.")}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {corbeille.length === 0 && <p className="text-sm text-muted-foreground">{L('La corbeille est vide.','The bin is empty.','De prullenbak is leeg.')}</p>}
            {corbeille.map((p) => (
              <div key={p.id} className="flex flex-wrap items-center gap-2 border border-border rounded p-2 text-sm">
                <span className="font-medium">{p.prenom} {p.nom}</span>
                <span className="text-muted-foreground">{p.espece}</span>
                <span className="text-muted-foreground">{p.faction || L('Sans faction','No faction','Zonder factie')}</span>
                <Badge className={statutColors[p.statut]}>{statutTxt(p.statut)}</Badge>
                <span className="text-xs text-muted-foreground">
                  {L('supprimée par','deleted by','verwijderd door')} {(p as any).deleted_by || "?"} {L('le','on','op')}{" "}
                  {(p as any).deleted_at ? new Date((p as any).deleted_at).toLocaleString(loc) : ""}
                </span>
                <div className="ml-auto flex gap-1">
                  <Button size="sm" variant="outline" onClick={() => restaurerPerso(p.id)}>
                    {L('Restaurer','Restore','Herstellen')}
                  </Button>
                  <Button size="sm" variant="ghost" onClick={() => supprimerDefinitivement(p.id)}>
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <EvenementsManager persos={persos} userEmail={userEmail} onXpChanged={loadPersos} />

        <FactionsManager />
      </main>

      <Dialog open={!!selected} onOpenChange={(o) => !o && setSelected(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selected && (
            <>
              <DialogHeader>
                <DialogTitle className="font-serif text-2xl">
                  {selected.prenom} {selected.nom}
                </DialogTitle>
                <DialogDescription>
                  {selected.espece} — {selected.faction || L('Sans faction','No faction','Zonder factie')} — {selected.email}
                </DialogDescription>
              </DialogHeader>

              <Tabs defaultValue="actions">
                <TabsList className="grid grid-cols-5">
                  <TabsTrigger value="actions">{L('Actions','Actions','Acties')}</TabsTrigger>
                  <TabsTrigger value="edit">{L('Éditer fiche','Edit sheet','Kaart bewerken')}</TabsTrigger>
                  <TabsTrigger value="evolutions">{L('Évolutions','Evolutions','Evoluties')} ({evolutions.length})</TabsTrigger>
                  <TabsTrigger value="demandes">
                    {L('Demandes','Requests','Aanvragen')} ({demandes.filter((d) => d.statut === "en_attente").length})
                  </TabsTrigger>
                  <TabsTrigger value="notes">{L('Notes orga','Orga notes','Orga-notities')}</TabsTrigger>
                </TabsList>


                <TabsContent value="actions" className="space-y-3 pt-4">
                  <div className="flex flex-wrap gap-2">
                    <Button onClick={() => setStatut(selected.id, "valide")} disabled={selected.statut === "valide"}>
                      <Check className="w-4 h-4 mr-1" /> {L('Valider','Validate','Valideren')}
                    </Button>
                    <Button variant="outline" onClick={() => setStatut(selected.id, "soumis")}>
                      {L('Remettre à « soumis »','Set back to “submitted”','Terugzetten naar „ingediend”')}
                    </Button>
                    <Button variant="outline" onClick={() => setStatut(selected.id, "archive")}>
                      {L('Archiver','Archive','Archiveren')}
                    </Button>
                    <Button variant="destructive" onClick={() => deletePerso(selected.id)}>
                      <Trash2 className="w-4 h-4 mr-1" /> {L('Mettre à la corbeille','Move to bin','Naar prullenbak')}
                    </Button>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {L('Statut actuel','Current status','Huidige status')} : <Badge className={statutColors[selected.statut]}>{statutTxt(selected.statut)}</Badge>
                    {" · "}XP : {selected.xp}
                  </div>
                </TabsContent>

                <TabsContent value="edit" className="space-y-3 pt-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label>{L('Prénom','First name','Voornaam')}</Label>
                      <Input
                        value={editForm.prenom || ""}
                        onChange={(e) => setEditForm({ ...editForm, prenom: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label>{L('Nom','Name','Naam')}</Label>
                      <Input
                        value={editForm.nom || ""}
                        onChange={(e) => setEditForm({ ...editForm, nom: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label>{L('Faction','Faction','Factie')}</Label>
                      <Input
                        value={editForm.faction || ""}
                        onChange={(e) => setEditForm({ ...editForm, faction: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label>{L('Espèce','Species','Soort')}</Label>
                      <Input
                        value={editForm.espece || ""}
                        onChange={(e) => setEditForm({ ...editForm, espece: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label>{L('XP total','Total XP','Totale XP')}</Label>
                      <Input
                        type="number"
                        value={editForm.xp ?? 0}
                        onChange={(e) => setEditForm({ ...editForm, xp: parseInt(e.target.value) || 0 })}
                      />
                    </div>
                  </div>
                  <div>
                    <Label>{L('Fiche complète (JSON)','Full sheet (JSON)','Volledige kaart (JSON)')}</Label>
                    <Textarea
                      value={editDataJson}
                      onChange={(e) => setEditDataJson(e.target.value)}
                      className="font-mono text-xs h-80"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      {L('Modifie compétences, sorts, matériel, etc. directement dans le JSON. Garde la structure intacte.','Edit skills, spells, equipment, etc. directly in the JSON. Keep the structure intact.','Bewerk vaardigheden, spreuken, uitrusting enz. rechtstreeks in de JSON. Houd de structuur intact.')}
                    </p>
                  </div>
                  <Button onClick={saveEdit}>
                    <Check className="w-4 h-4 mr-1" /> {L('Enregistrer les modifications','Save changes','Wijzigingen opslaan')}
                  </Button>
                </TabsContent>

                <TabsContent value="evolutions" className="space-y-3 pt-4">
                  <Card className="bg-muted/30">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">{L('Ajouter une évolution','Add an evolution','Evolutie toevoegen')}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="grid grid-cols-3 gap-2">
                        <Select
                          value={newEvo.type_evolution}
                          onValueChange={(v) => setNewEvo({ ...newEvo, type_evolution: v })}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="xp">{L('XP gagnée','XP gained','Verdiende XP')}</SelectItem>
                            <SelectItem value="competence">{L('Nouvelle compétence','New skill','Nieuwe vaardigheid')}</SelectItem>
                            <SelectItem value="sort">{L('Nouveau sort','New spell','Nieuwe spreuk')}</SelectItem>
                            <SelectItem value="rp">{L('Événement RP','RP event','RP-gebeurtenis')}</SelectItem>
                            <SelectItem value="materiel">{L('Matériel acquis','Equipment acquired','Verworven uitrusting')}</SelectItem>
                            <SelectItem value="autre">{L('Autre','Other','Andere')}</SelectItem>
                          </SelectContent>
                        </Select>
                        <Input
                          type="number"
                          placeholder={L('Valeur (XP)','Value (XP)','Waarde (XP)')}
                          value={newEvo.valeur || ""}
                          onChange={(e) => setNewEvo({ ...newEvo, valeur: parseInt(e.target.value) || 0 })}
                        />
                        <Button onClick={addEvolution}>
                          <Plus className="w-4 h-4 mr-1" /> {L('Ajouter','Add','Toevoegen')}
                        </Button>
                      </div>
                      <Textarea
                        placeholder={L("Description de l'évolution…",'Evolution description…','Beschrijving van de evolutie…')}
                        value={newEvo.description}
                        onChange={(e) => setNewEvo({ ...newEvo, description: e.target.value })}
                      />
                    </CardContent>
                  </Card>
                  <div className="space-y-2">
                    {evolutions.map((e) => (
                      <div key={e.id} className="flex items-start justify-between border border-border rounded p-2">
                        <div className="text-sm">
                          <div className="flex items-center gap-2">
                            <Badge variant="outline">{e.type_evolution}</Badge>
                            {e.valeur != null && <span className="font-semibold">+{e.valeur}</span>}
                            <span className="text-xs text-muted-foreground">
                              {new Date(e.created_at).toLocaleString(loc)}
                            </span>
                          </div>
                          <p className="mt-1">{e.description}</p>
                          {e.auteur && <p className="text-xs text-muted-foreground">{L('par','by','door')} {e.auteur}</p>}
                        </div>
                        <Button size="sm" variant="ghost" onClick={() => deleteEvo(e.id)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                    {evolutions.length === 0 && (
                      <p className="text-sm text-muted-foreground text-center py-4">{L('Aucune évolution enregistrée.','No evolution recorded.','Geen evolutie geregistreerd.')}</p>
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="demandes" className="space-y-3 pt-4">
                  <div className="text-sm text-muted-foreground">
                    {L('XP totale','Total XP','Totale XP')} : <span className="font-semibold text-foreground">{selected.xp}</span> · {L('dépensée','spent','besteed')} :{" "}
                    {xpDepensee(demandes)} · {L('en attente','pending','in afwachting')} : {xpEnAttente(demandes)} · {L('disponible','available','beschikbaar')} :{" "}
                    <span className="font-semibold text-foreground">
                      {selected.xp - xpDepensee(demandes) - xpEnAttente(demandes)}
                    </span>
                  </div>
                  {demandes.map((d) => (
                    <div key={d.id} className="border border-border rounded p-3 space-y-2">
                      <div className="flex flex-wrap items-center gap-2 text-sm">
                        <Badge variant="outline">
                          {labelsTypeDemande[d.type_demande as TypeDemande]?.[language] || labelsTypeDemande[d.type_demande as TypeDemande]?.fr || d.type_demande}
                        </Badge>
                        <span className="font-medium">{d.libelle}</span>
                        <span className="text-muted-foreground">— {d.cout_xp} XP</span>
                        <Badge className={statutDemandeColors[d.statut]}>{(statutDemandeLabels[d.statut] as any)[language] || statutDemandeLabels[d.statut].fr}</Badge>
                        <span className="text-xs text-muted-foreground ml-auto">
                          {new Date(d.created_at).toLocaleString(loc)}
                        </span>
                      </div>
                      {d.justification && <p className="text-sm text-muted-foreground">{d.justification}</p>}
                      {d.statut === "en_attente" ? (
                        <div className="space-y-2">
                          <Textarea
                            className="h-16"
                            placeholder={L('Réponse au joueur (optionnelle)…','Reply to the player (optional)…','Antwoord aan de speler (optioneel)…')}
                            value={reponses[d.id] || ""}
                            onChange={(e) => setReponses({ ...reponses, [d.id]: e.target.value })}
                          />
                          <div className="flex gap-2">
                            <Button size="sm" onClick={() => traiterDemande(d, "approuvee")}>
                              <Check className="w-4 h-4 mr-1" /> {L('Approuver','Approve','Goedkeuren')}
                            </Button>
                            <Button size="sm" variant="outline" onClick={() => traiterDemande(d, "refusee")}>
                              <X className="w-4 h-4 mr-1" /> {L('Refuser','Refuse','Weigeren')}
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <p className="text-xs text-muted-foreground">
                          {d.reponse_orga ? `${L('Réponse','Reply','Antwoord')} : ${d.reponse_orga} — ` : ""}
                          {L('traité par','handled by','behandeld door')} {d.traite_par || "orga"}
                        </p>
                      )}
                    </div>
                  ))}
                  {demandes.length === 0 && (
                    <p className="text-sm text-muted-foreground text-center py-4">{L('Aucune demande pour ce personnage.','No requests for this character.','Geen aanvragen voor dit personage.')}</p>
                  )}
                </TabsContent>

                <TabsContent value="notes" className="space-y-3 pt-4">

                  <Label>{L('Notes internes (visibles uniquement par les orgas)','Internal notes (visible to orgas only)','Interne notities (alleen zichtbaar voor orga’s)')}</Label>
                  <Textarea
                    value={editForm.notes_orga || ""}
                    onChange={(e) => setEditForm({ ...editForm, notes_orga: e.target.value })}
                    className="h-48"
                    placeholder={L('Remarques, points à clarifier avec le joueur…','Remarks, points to clarify with the player…','Opmerkingen, punten om met de speler te verduidelijken…')}
                  />
                  <Button onClick={saveEdit}>{L('Enregistrer les notes','Save notes','Notities opslaan')}</Button>
                </TabsContent>
              </Tabs>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Orga;
