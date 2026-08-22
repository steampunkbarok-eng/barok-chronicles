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

const statutColors: Record<Statut, string> = {
  brouillon: "bg-muted text-muted-foreground",
  soumis: "bg-yellow-500/20 text-yellow-700 dark:text-yellow-400",
  valide: "bg-green-500/20 text-green-700 dark:text-green-400",
  archive: "bg-red-500/20 text-red-700 dark:text-red-400",
};

const Orga = () => {
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

  const loadPersos = useCallback(async () => {
    const { data, error } = await supabase
      .from("personnages")
      .select("*")
      .order("updated_at", { ascending: false });
    if (error) toast.error(error.message);
    else setPersos((data as PersoRow[]) || []);
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
        toast.error("Ton compte n'a pas le rôle orga. Contacte un admin.");
        setChecking(false);
        return;
      }
      setAuthorized(true);
      await loadPersos();
      await loadDemandesEnAttente();
      setChecking(false);
    })();
  }, [navigate, loadPersos, loadDemandesEnAttente]);

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
    toast.success("Statut mis à jour");
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
      toast.info("Notification envoyée au joueur");
    }
    loadPersos();
    if (selected?.id === id) setSelected({ ...selected, statut });
  };


  const deletePerso = async (id: string) => {
    if (!confirm("Supprimer définitivement ce personnage ?")) return;
    const { error } = await supabase.from("personnages").delete().eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("Supprimé");
    setSelected(null);
    loadPersos();
  };

  const saveEdit = async () => {
    if (!selected) return;
    let parsed;
    try {
      parsed = JSON.parse(editDataJson);
    } catch {
      return toast.error("JSON invalide dans la fiche complète");
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
    toast.success("Personnage mis à jour");
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
    toast.success("Évolution ajoutée");
    setNewEvo({ type_evolution: "xp", description: "", valeur: 0 });

    openPerso(selected);
    loadPersos();
  };

  const deleteEvo = async (id: string) => {
    const { error } = await supabase.from("personnage_evolutions").delete().eq("id", id);
    if (error) return toast.error(error.message);
    if (selected) openPerso(selected);
  };

  const logout = async () => {
    await supabase.auth.signOut();
    navigate("/auth");
  };

  if (checking) return <div className="min-h-screen flex items-center justify-center">Chargement…</div>;

  if (!authorized) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle>Accès refusé</CardTitle>
            <CardDescription>
              Ton compte ({userEmail}) n'a pas le rôle orga. Un administrateur doit te l'attribuer.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" onClick={logout} className="w-full">
              <LogOut className="w-4 h-4 mr-2" /> Se déconnecter
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
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/" className="text-muted-foreground hover:text-foreground">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <ScrollText className="w-6 h-6 text-primary" />
            <h1 className="font-serif text-2xl">Gestion Orga</h1>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <span className="text-muted-foreground hidden sm:inline">{userEmail}</span>
            <Button variant="ghost" size="sm" onClick={logout}>
              <LogOut className="w-4 h-4 mr-1" /> Déconnexion
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 space-y-4">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between flex-wrap gap-2">
              <CardTitle className="font-serif">Personnages ({filtered.length})</CardTitle>
              <Select value={filter} onValueChange={(v) => setFilter(v as any)}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tous">Tous</SelectItem>
                  <SelectItem value="soumis">Soumis (à valider)</SelectItem>
                  <SelectItem value="valide">Validés</SelectItem>
                  <SelectItem value="brouillon">Brouillons</SelectItem>
                  <SelectItem value="archive">Archivés</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nom</TableHead>
                  <TableHead>Faction</TableHead>
                  <TableHead>Espèce</TableHead>
                  <TableHead>XP</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Soumis le</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((p) => (
                  <TableRow key={p.id} className="cursor-pointer" onClick={() => openPerso(p)}>
                    <TableCell className="font-medium">
                      {p.prenom} {p.nom}
                    </TableCell>
                    <TableCell>{p.faction || "—"}</TableCell>
                    <TableCell>{p.espece}</TableCell>
                    <TableCell>{p.xp}</TableCell>
                    <TableCell>
                      <Badge className={statutColors[p.statut]}>{p.statut}</Badge>
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground">
                      {new Date(p.created_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right" onClick={(e) => e.stopPropagation()}>
                      {p.statut === "soumis" && (
                        <>
                          <Button size="sm" variant="ghost" onClick={() => setStatut(p.id, "valide")}>
                            <Check className="w-4 h-4 text-green-600" />
                          </Button>
                          <Button size="sm" variant="ghost" onClick={() => setStatut(p.id, "archive")}>
                            <X className="w-4 h-4 text-red-600" />
                          </Button>
                        </>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
                {filtered.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center text-muted-foreground py-8">
                      Aucun personnage.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
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
                  {selected.espece} — {selected.faction || "Sans faction"} — {selected.email}
                </DialogDescription>
              </DialogHeader>

              <Tabs defaultValue="actions">
                <TabsList className="grid grid-cols-4">
                  <TabsTrigger value="actions">Actions</TabsTrigger>
                  <TabsTrigger value="edit">Éditer fiche</TabsTrigger>
                  <TabsTrigger value="evolutions">Évolutions ({evolutions.length})</TabsTrigger>
                  <TabsTrigger value="notes">Notes orga</TabsTrigger>
                </TabsList>

                <TabsContent value="actions" className="space-y-3 pt-4">
                  <div className="flex flex-wrap gap-2">
                    <Button onClick={() => setStatut(selected.id, "valide")} disabled={selected.statut === "valide"}>
                      <Check className="w-4 h-4 mr-1" /> Valider
                    </Button>
                    <Button variant="outline" onClick={() => setStatut(selected.id, "soumis")}>
                      Remettre à "soumis"
                    </Button>
                    <Button variant="outline" onClick={() => setStatut(selected.id, "archive")}>
                      Archiver
                    </Button>
                    <Button variant="destructive" onClick={() => deletePerso(selected.id)}>
                      <Trash2 className="w-4 h-4 mr-1" /> Supprimer
                    </Button>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Statut actuel : <Badge className={statutColors[selected.statut]}>{selected.statut}</Badge>
                    {" · "}XP : {selected.xp}
                  </div>
                </TabsContent>

                <TabsContent value="edit" className="space-y-3 pt-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label>Prénom</Label>
                      <Input
                        value={editForm.prenom || ""}
                        onChange={(e) => setEditForm({ ...editForm, prenom: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label>Nom</Label>
                      <Input
                        value={editForm.nom || ""}
                        onChange={(e) => setEditForm({ ...editForm, nom: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label>Faction</Label>
                      <Input
                        value={editForm.faction || ""}
                        onChange={(e) => setEditForm({ ...editForm, faction: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label>Espèce</Label>
                      <Input
                        value={editForm.espece || ""}
                        onChange={(e) => setEditForm({ ...editForm, espece: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label>XP total</Label>
                      <Input
                        type="number"
                        value={editForm.xp ?? 0}
                        onChange={(e) => setEditForm({ ...editForm, xp: parseInt(e.target.value) || 0 })}
                      />
                    </div>
                  </div>
                  <div>
                    <Label>Fiche complète (JSON)</Label>
                    <Textarea
                      value={editDataJson}
                      onChange={(e) => setEditDataJson(e.target.value)}
                      className="font-mono text-xs h-80"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Modifie compétences, sorts, matériel, etc. directement dans le JSON. Garde la structure intacte.
                    </p>
                  </div>
                  <Button onClick={saveEdit}>
                    <Check className="w-4 h-4 mr-1" /> Enregistrer les modifications
                  </Button>
                </TabsContent>

                <TabsContent value="evolutions" className="space-y-3 pt-4">
                  <Card className="bg-muted/30">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Ajouter une évolution</CardTitle>
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
                            <SelectItem value="xp">XP gagnée</SelectItem>
                            <SelectItem value="competence">Nouvelle compétence</SelectItem>
                            <SelectItem value="sort">Nouveau sort</SelectItem>
                            <SelectItem value="rp">Événement RP</SelectItem>
                            <SelectItem value="materiel">Matériel acquis</SelectItem>
                            <SelectItem value="autre">Autre</SelectItem>
                          </SelectContent>
                        </Select>
                        <Input
                          type="number"
                          placeholder="Valeur (XP)"
                          value={newEvo.valeur || ""}
                          onChange={(e) => setNewEvo({ ...newEvo, valeur: parseInt(e.target.value) || 0 })}
                        />
                        <Button onClick={addEvolution}>
                          <Plus className="w-4 h-4 mr-1" /> Ajouter
                        </Button>
                      </div>
                      <Textarea
                        placeholder="Description de l'évolution…"
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
                              {new Date(e.created_at).toLocaleString()}
                            </span>
                          </div>
                          <p className="mt-1">{e.description}</p>
                          {e.auteur && <p className="text-xs text-muted-foreground">par {e.auteur}</p>}
                        </div>
                        <Button size="sm" variant="ghost" onClick={() => deleteEvo(e.id)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                    {evolutions.length === 0 && (
                      <p className="text-sm text-muted-foreground text-center py-4">Aucune évolution enregistrée.</p>
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="notes" className="space-y-3 pt-4">
                  <Label>Notes internes (visibles uniquement par les orgas)</Label>
                  <Textarea
                    value={editForm.notes_orga || ""}
                    onChange={(e) => setEditForm({ ...editForm, notes_orga: e.target.value })}
                    className="h-48"
                    placeholder="Remarques, points à clarifier avec le joueur…"
                  />
                  <Button onClick={saveEdit}>Enregistrer les notes</Button>
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
