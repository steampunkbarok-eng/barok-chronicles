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
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { ArrowLeft, LogOut, ScrollText, Plus, History, Coins, Trash2 } from "lucide-react";
import {
  DemandeXp,
  TypeDemande,
  labelsTypeDemande,
  optionsParType,
  statutDemandeColors,
  statutDemandeLabels,
  xpDepensee,
  xpEnAttente,
} from "@/data/xpAchats";
import { useTri } from "@/i18n/tri";


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

const statutColors: Record<Statut, string> = {
  brouillon: "bg-muted text-muted-foreground",
  soumis: "bg-yellow-500/20 text-yellow-700 dark:text-yellow-400",
  valide: "bg-green-500/20 text-green-700 dark:text-green-400",
  archive: "bg-red-500/20 text-red-700 dark:text-red-400",
};

const statutLabels: Record<Statut, { fr: string; en: string; nl: string }> = {
  brouillon: { fr: "Brouillon", en: "Draft", nl: "Ontwerp" },
  soumis: { fr: "En attente de validation", en: "Awaiting validation", nl: "Wacht op goedkeuring" },
  valide: { fr: "Validé", en: "Validated", nl: "Goedgekeurd" },
  archive: { fr: "Archivé", en: "Archived", nl: "Gearchiveerd" },
};

const MesPersonnages = () => {
  const navigate = useNavigate();
  const { language, L } = useTri();
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState("");
  const [persos, setPersos] = useState<PersoRow[]>([]);
  const [selected, setSelected] = useState<PersoRow | null>(null);
  const [evolutions, setEvolutions] = useState<Evolution[]>([]);
  const [demandes, setDemandes] = useState<DemandeXp[]>([]);
  const [nouvelleDemande, setNouvelleDemande] = useState<{
    type: TypeDemande;
    libelle: string;
    cout: number;
    justification: string;
  }>({ type: "competence", libelle: "", cout: 0, justification: "" });
  const [envoi, setEnvoi] = useState(false);

  const load = useCallback(async () => {
    const { data, error } = await supabase
      .from("personnages")
      .select("*")
      .order("updated_at", { ascending: false });
    if (error) toast.error(error.message);
    else setPersos((data as PersoRow[]) || []);
  }, []);

  useEffect(() => {
    (async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/auth");
        return;
      }
      setUserEmail(session.user.email || "");
      await load();
      setLoading(false);
    })();
  }, [navigate, load]);

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
    setNouvelleDemande({ type: "competence", libelle: "", cout: 0, justification: "" });
    const { data } = await supabase
      .from("personnage_evolutions")
      .select("*")
      .eq("personnage_id", p.id)
      .order("created_at", { ascending: false });
    setEvolutions((data as Evolution[]) || []);
    await loadDemandes(p.id);
  };

  const depensee = xpDepensee(demandes);
  const reservee = xpEnAttente(demandes);
  const disponible = (selected?.xp || 0) - depensee - reservee;

  const envoyerDemande = async () => {
    if (!selected) return;
    const libelle = nouvelleDemande.libelle.trim();
    if (!libelle) return toast.error(L("Choisis ou décris ce que tu veux acquérir.", "Choose or describe what you want to acquire.", "Kies of beschrijf wat je wilt verwerven."));
    if (nouvelleDemande.cout <= 0) return toast.error(L("Indique un coût en XP supérieur à 0.", "Enter an XP cost greater than 0.", "Geef een XP-kost hoger dan 0 op."));
    if (nouvelleDemande.cout > disponible) {
      return toast.error(
        L(
          `XP insuffisante : il te reste ${disponible} XP disponible(s).`,
          `Not enough XP: you have ${disponible} XP left.`,
          `Onvoldoende XP: je hebt nog ${disponible} XP over.`,
        ),
      );
    }
    setEnvoi(true);
    const { error } = await supabase.from("demandes_xp").insert({
      personnage_id: selected.id,
      type_demande: nouvelleDemande.type,
      libelle,
      cout_xp: nouvelleDemande.cout,
      justification: nouvelleDemande.justification || null,
    });
    setEnvoi(false);
    if (error) return toast.error(error.message);
    toast.success(L("Demande envoyée à l'organisation", "Request sent to the organisation", "Aanvraag verzonden naar de organisatie"));
    setNouvelleDemande({ type: nouvelleDemande.type, libelle: "", cout: 0, justification: "" });
    loadDemandes(selected.id);
  };

  const annulerDemande = async (id: string) => {
    const { error } = await supabase.from("demandes_xp").delete().eq("id", id);
    if (error) return toast.error(error.message);
    toast.success(L("Demande annulée", "Request cancelled", "Aanvraag geannuleerd"));
    if (selected) loadDemandes(selected.id);
  };


  const logout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">{L("Chargement…", "Loading…", "Laden…")}</div>;
  }

  const totalXp = persos.reduce((s, p) => s + (p.xp || 0), 0);

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-primary/20 bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/" className="text-muted-foreground hover:text-foreground">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <ScrollText className="w-6 h-6 text-primary" />
            <h1 className="font-serif text-2xl">{L("Mes Personnages", "My Characters", "Mijn Personages")}</h1>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <span className="text-muted-foreground hidden sm:inline">{userEmail}</span>
            <Button variant="ghost" size="sm" onClick={logout}>
              <LogOut className="w-4 h-4 mr-1" /> {L("Déconnexion", "Sign out", "Afmelden")}
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 space-y-4">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div>
                <CardTitle className="font-serif">
                  {persos.length} {L(`personnage${persos.length > 1 ? "s" : ""}`, `character${persos.length > 1 ? "s" : ""}`, persos.length > 1 ? "personages" : "personage")}
                </CardTitle>
                <CardDescription>
                  {L("XP totale cumulée :", "Total XP earned:", "Totale XP:")} <span className="font-semibold text-foreground">{totalXp}</span>
                </CardDescription>
              </div>
              <Button asChild>
                <Link to="/personnages">
                  <Plus className="w-4 h-4 mr-1" /> {L("Nouveau personnage", "New character", "Nieuw personage")}
                </Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{L("Nom", "Name", "Naam")}</TableHead>
                  <TableHead>Faction</TableHead>
                  <TableHead>{L("Espèce", "Species", "Soort")}</TableHead>
                  <TableHead>XP</TableHead>
                  <TableHead>{L("Statut", "Status", "Status")}</TableHead>
                  <TableHead>{L("Soumis le", "Submitted on", "Ingediend op")}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {persos.map((p) => (
                  <TableRow key={p.id} className="cursor-pointer" onClick={() => openPerso(p)}>
                    <TableCell className="font-medium">
                      {p.prenom} {p.nom}
                    </TableCell>
                    <TableCell>{p.faction || "—"}</TableCell>
                    <TableCell>{p.espece}</TableCell>
                    <TableCell>{p.xp}</TableCell>
                    <TableCell>
                      <Badge className={statutColors[p.statut]}>{statutLabels[p.statut][language]}</Badge>
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground">
                      {new Date(p.created_at).toLocaleDateString()}
                    </TableCell>
                  </TableRow>
                ))}
                {persos.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
                      {L(
                        `Aucun personnage soumis avec cet email (${userEmail}). Crée ta première fiche !`,
                        `No character submitted with this email (${userEmail}). Create your first sheet!`,
                        `Geen personage ingediend met dit e-mailadres (${userEmail}). Maak je eerste blad!`,
                      )}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>

      <Dialog open={!!selected} onOpenChange={(o) => !o && setSelected(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          {selected && (
            <>
              <DialogHeader>
                <DialogTitle className="font-serif text-2xl">
                  {selected.prenom} {selected.nom}
                </DialogTitle>
                <DialogDescription>
                  {selected.espece} — {selected.faction || L("Sans faction", "No faction", "Geen factie")}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <Card className="bg-muted/30">
                    <CardContent className="pt-4">
                      <p className="text-xs text-muted-foreground">{L("Statut", "Status", "Status")}</p>
                      <Badge className={statutColors[selected.statut]}>{statutLabels[selected.statut][language]}</Badge>
                    </CardContent>
                  </Card>
                  <Card className="bg-muted/30">
                    <CardContent className="pt-4">
                      <p className="text-xs text-muted-foreground">{L("XP totale", "Total XP", "Totale XP")}</p>
                      <p className="text-xl font-semibold">{selected.xp}</p>
                      <p className="text-xs text-muted-foreground">
                        {L(
                          `${depensee} dépensée${depensee > 1 ? "s" : ""} · ${reservee} en attente`,
                          `${depensee} spent · ${reservee} pending`,
                          `${depensee} besteed · ${reservee} in afwachting`,
                        )}
                      </p>
                      <p className="text-sm font-semibold text-primary">{L(`${disponible} disponible(s)`, `${disponible} available`, `${disponible} beschikbaar`)}</p>
                    </CardContent>
                  </Card>

                  <Card className="bg-muted/30">
                    <CardContent className="pt-4">
                      <p className="text-xs text-muted-foreground">{L("Soumis le", "Submitted on", "Ingediend op")}</p>
                      <p className="text-sm">{new Date(selected.created_at).toLocaleDateString()}</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-muted/30">
                    <CardContent className="pt-4">
                      <p className="text-xs text-muted-foreground">{L("Dernière MAJ", "Last update", "Laatste update")}</p>
                      <p className="text-sm">{new Date(selected.updated_at).toLocaleDateString()}</p>
                    </CardContent>
                  </Card>
                </div>

                <Card className="border-primary/30">
                  <CardHeader className="pb-2">
                    <CardTitle className="font-serif text-lg flex items-center gap-2">
                      <Coins className="w-4 h-4 text-primary" /> {L("Dépenser mon XP", "Spend my XP", "Mijn XP besteden")}
                    </CardTitle>
                    <CardDescription>
                      {selected.statut === "valide"
                        ? L(
                            "Choisis une acquisition : la demande sera soumise à l'organisation, qui l'approuve ou la refuse.",
                            "Choose an acquisition: the request goes to the organisation, which approves or refuses it.",
                            "Kies een aankoop: de aanvraag gaat naar de organisatie, die ze goedkeurt of weigert.",
                          )
                        : L(
                            "Ta fiche doit être validée par l'organisation avant de pouvoir dépenser de l'XP.",
                            "Your sheet must be validated by the organisation before you can spend XP.",
                            "Je blad moet goedgekeurd zijn door de organisatie voordat je XP kunt besteden.",
                          )}
                    </CardDescription>
                  </CardHeader>
                  {selected.statut === "valide" && (
                    <CardContent className="space-y-3">
                      <div className="grid sm:grid-cols-3 gap-3">
                        <div>
                          <Label>{L("Type", "Type", "Type")}</Label>
                          <Select
                            value={nouvelleDemande.type}
                            onValueChange={(v) =>
                              setNouvelleDemande({ ...nouvelleDemande, type: v as TypeDemande, libelle: "", cout: 0 })
                            }
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {(Object.keys(labelsTypeDemande) as TypeDemande[]).map((t) => (
                                <SelectItem key={t} value={t}>
                                  {labelsTypeDemande[t][language]}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="sm:col-span-2">
                          <Label>{L("Acquisition souhaitée", "Desired acquisition", "Gewenste aankoop")}</Label>
                          {optionsParType[nouvelleDemande.type].length > 0 ? (
                            <Select
                              value={nouvelleDemande.libelle}
                              onValueChange={(v) => {
                                const opt = optionsParType[nouvelleDemande.type].find((o) => o.libelle === v);
                                setNouvelleDemande({ ...nouvelleDemande, libelle: v, cout: opt?.cout || 0 });
                              }}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder={L("Sélectionne…", "Select…", "Selecteer…")} />
                              </SelectTrigger>
                              <SelectContent className="max-h-72">
                                {optionsParType[nouvelleDemande.type].map((o) => (
                                  <SelectItem key={o.libelle} value={o.libelle}>
                                    {o.libelle} — {o.cout} XP
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          ) : (
                            <Input
                              placeholder={L("Décris précisément l'acquisition", "Describe the acquisition precisely", "Beschrijf de aankoop nauwkeurig")}
                              value={nouvelleDemande.libelle}
                              onChange={(e) => setNouvelleDemande({ ...nouvelleDemande, libelle: e.target.value })}
                            />
                          )}
                        </div>
                      </div>
                      <div className="grid sm:grid-cols-3 gap-3">
                        <div>
                          <Label>{L("Coût en XP", "XP cost", "XP-kost")}</Label>
                          <Input
                            type="number"
                            min={1}
                            value={nouvelleDemande.cout || ""}
                            onChange={(e) =>
                              setNouvelleDemande({ ...nouvelleDemande, cout: parseInt(e.target.value) || 0 })
                            }
                          />
                        </div>
                        <div className="sm:col-span-2">
                          <Label>{L("Justification RP (optionnelle)", "RP justification (optional)", "RP-verantwoording (optioneel)")}</Label>
                          <Textarea
                            className="h-20"
                            placeholder={L("Comment ton personnage a-t-il acquis cela ?", "How did your character acquire this?", "Hoe heeft je personage dit verworven?")}
                            value={nouvelleDemande.justification}
                            onChange={(e) =>
                              setNouvelleDemande({ ...nouvelleDemande, justification: e.target.value })
                            }
                          />
                        </div>
                      </div>
                      <Button onClick={envoyerDemande} disabled={envoi || disponible <= 0}>
                        <Plus className="w-4 h-4 mr-1" />
                        {disponible <= 0 ? L("Aucune XP disponible", "No XP available", "Geen XP beschikbaar") : L("Envoyer la demande", "Send request", "Aanvraag versturen")}
                      </Button>
                    </CardContent>
                  )}
                </Card>

                <div>
                  <h3 className="font-serif text-lg mb-2">{L("Mes demandes", "My requests", "Mijn aanvragen")} ({demandes.length})</h3>
                  <div className="space-y-2">
                    {demandes.map((d) => (
                      <div key={d.id} className="border border-border rounded p-2 text-sm">
                        <div className="flex items-center gap-2 flex-wrap">
                          <Badge variant="outline">{labelsTypeDemande[d.type_demande as TypeDemande]?.[language] || d.type_demande}</Badge>
                          <span className="font-medium">{d.libelle}</span>
                          <span className="text-muted-foreground">— {d.cout_xp} XP</span>
                          <Badge className={statutDemandeColors[d.statut]}>{statutDemandeLabels[d.statut][language]}</Badge>
                          <span className="text-xs text-muted-foreground ml-auto">
                            {new Date(d.created_at).toLocaleDateString()}
                          </span>
                          {d.statut === "en_attente" && (
                            <Button size="sm" variant="ghost" onClick={() => annulerDemande(d.id)}>
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          )}
                        </div>
                        {d.justification && <p className="mt-1 text-muted-foreground">{d.justification}</p>}
                        {d.reponse_orga && (
                          <p className="mt-1">
                            <span className="font-semibold">{L("Réponse orga :", "Organiser reply:", "Antwoord organisatie:")}</span> {d.reponse_orga}
                          </p>
                        )}
                      </div>
                    ))}
                    {demandes.length === 0 && (
                      <p className="text-sm text-muted-foreground text-center py-4">{L("Aucune demande envoyée.", "No request sent.", "Geen aanvraag verzonden.")}</p>
                    )}
                  </div>
                </div>



                <div>
                  <h3 className="font-serif text-lg flex items-center gap-2 mb-2">
                    <History className="w-4 h-4" /> {L("Historique d'évolutions", "Progression history", "Ontwikkelingsgeschiedenis")} ({evolutions.length})
                  </h3>
                  <div className="space-y-2">
                    {evolutions.map((e) => (
                      <div key={e.id} className="border border-border rounded p-2 text-sm">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">{e.type_evolution}</Badge>
                          {e.valeur != null && <span className="font-semibold">+{e.valeur}</span>}
                          <span className="text-xs text-muted-foreground ml-auto">
                            {new Date(e.created_at).toLocaleString()}
                          </span>
                        </div>
                        <p className="mt-1">{e.description}</p>
                      </div>
                    ))}
                    {evolutions.length === 0 && (
                      <p className="text-sm text-muted-foreground text-center py-4">
                        {L(
                          "Aucune évolution enregistrée par l'orga pour l'instant.",
                          "No progression recorded by the organisers yet.",
                          "Nog geen ontwikkeling geregistreerd door de organisatie.",
                        )}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MesPersonnages;
