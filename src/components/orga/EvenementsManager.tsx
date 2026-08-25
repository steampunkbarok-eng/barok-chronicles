import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { CalendarDays, Plus, Trash2, Sparkles, Save } from "lucide-react";

type StatutEvt = "a_venir" | "en_cours" | "termine" | "annule";

export interface Evenement {
  id: string;
  nom: string;
  date_debut: string;
  date_fin: string | null;
  lieu: string | null;
  description: string | null;
  xp_attribuee: number;
  compte_rendu: string | null;
  notes_orga: string | null;
  statut: StatutEvt;
}

interface Participation {
  id: string;
  evenement_id: string;
  personnage_id: string;
  present: boolean;
  xp_attribuee: boolean;
}

export interface PersoLite {
  id: string;
  nom: string;
  prenom: string;
  email: string;
  faction: string | null;
  xp: number;
}

const statutLabels: Record<StatutEvt, string> = {
  a_venir: "À venir",
  en_cours: "En cours",
  termine: "Terminé",
  annule: "Annulé",
};

const emptyForm = {
  nom: "",
  date_debut: "",
  date_fin: "",
  lieu: "",
  description: "",
  xp_attribuee: 0,
  compte_rendu: "",
  notes_orga: "",
  statut: "a_venir" as StatutEvt,
};

interface Props {
  persos: PersoLite[];
  userEmail: string;
  onXpChanged?: () => void;
}

const EvenementsManager = ({ persos, userEmail, onXpChanged }: Props) => {
  const [evenements, setEvenements] = useState<Evenement[]>([]);
  const [openId, setOpenId] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState({ ...emptyForm });
  const [participations, setParticipations] = useState<Participation[]>([]);

  const load = useCallback(async () => {
    const { data, error } = await supabase
      .from("evenements")
      .select("*")
      .order("date_debut", { ascending: false });
    if (error) toast.error(error.message);
    else setEvenements((data as Evenement[]) || []);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const loadParticipations = useCallback(async (evenementId: string) => {
    const { data } = await supabase
      .from("evenement_participations")
      .select("*")
      .eq("evenement_id", evenementId);
    setParticipations((data as Participation[]) || []);
  }, []);

  const openEvent = async (e: Evenement) => {
    if (openId === e.id) {
      setOpenId(null);
      return;
    }
    setCreating(false);
    setOpenId(e.id);
    setForm({
      nom: e.nom,
      date_debut: e.date_debut,
      date_fin: e.date_fin || "",
      lieu: e.lieu || "",
      description: e.description || "",
      xp_attribuee: e.xp_attribuee,
      compte_rendu: e.compte_rendu || "",
      notes_orga: e.notes_orga || "",
      statut: e.statut,
    });
    await loadParticipations(e.id);
  };

  const payload = () => ({
    nom: form.nom.trim(),
    date_debut: form.date_debut,
    date_fin: form.date_fin || null,
    lieu: form.lieu.trim() || null,
    description: form.description.trim() || null,
    xp_attribuee: Number(form.xp_attribuee) || 0,
    compte_rendu: form.compte_rendu.trim() || null,
    notes_orga: form.notes_orga.trim() || null,
    statut: form.statut,
  });

  const createEvent = async () => {
    if (!form.nom.trim() || !form.date_debut) return toast.error("Nom et date de début obligatoires");
    const { error } = await supabase.from("evenements").insert(payload());
    if (error) return toast.error(error.message);
    toast.success("Événement créé");
    setCreating(false);
    setForm({ ...emptyForm });
    load();
  };

  const saveEvent = async () => {
    if (!openId) return;
    const { error } = await supabase.from("evenements").update(payload()).eq("id", openId);
    if (error) return toast.error(error.message);
    toast.success("Événement mis à jour");
    load();
  };

  const deleteEvent = async (id: string) => {
    if (!confirm("Supprimer cet événement et ses présences ?")) return;
    const { error } = await supabase.from("evenements").delete().eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("Événement supprimé");
    setOpenId(null);
    load();
  };

  const togglePresence = async (personnageId: string, present: boolean) => {
    if (!openId) return;
    const existing = participations.find((p) => p.personnage_id === personnageId);
    if (existing) {
      const { error } = await supabase
        .from("evenement_participations")
        .update({ present })
        .eq("id", existing.id);
      if (error) return toast.error(error.message);
    } else {
      const { error } = await supabase
        .from("evenement_participations")
        .insert({ evenement_id: openId, personnage_id: personnageId, present });
      if (error) return toast.error(error.message);
    }
    loadParticipations(openId);
  };

  const attribuerXp = async () => {
    if (!openId) return;
    const evenement = evenements.find((e) => e.id === openId);
    const xp = Number(form.xp_attribuee) || 0;
    if (!evenement || xp <= 0) return toast.error("Renseigne d'abord l'XP de l'événement");
    const cibles = participations.filter((p) => p.present && !p.xp_attribuee);
    if (cibles.length === 0) return toast.info("Aucun présent en attente d'XP");

    for (const part of cibles) {
      const perso = persos.find((p) => p.id === part.personnage_id);
      if (!perso) continue;
      await supabase.from("personnage_evolutions").insert({
        personnage_id: perso.id,
        type_evolution: "xp",
        description: `Participation à « ${evenement.nom} » (+${xp} XP)`,
        valeur: xp,
        auteur: userEmail,
      });
      await supabase.from("personnages").update({ xp: (perso.xp || 0) + xp }).eq("id", perso.id);
      await supabase.from("evenement_participations").update({ xp_attribuee: true }).eq("id", part.id);
      if (perso.email) {
        try {
          await supabase.functions.invoke("notify-personnage", {
            body: {
              type: "evolution",
              contactEmail: perso.email,
              nomTI: `${perso.prenom} ${perso.nom}`.trim(),
              evolution: {
                type_evolution: "xp",
                description: `Participation à « ${evenement.nom} »`,
                valeur: xp,
              },
              xpTotal: (perso.xp || 0) + xp,
            },
          });
        } catch (err) {
          console.error("Notification échouée:", err);
        }
      }
    }
    toast.success(`${cibles.length} personnage(s) crédité(s) de ${xp} XP`);
    loadParticipations(openId);
    onXpChanged?.();
  };

  const renderForm = (mode: "create" | "edit") => (
    <div className="space-y-3 border-t border-border pt-4 mt-4">
      <div className="grid sm:grid-cols-2 gap-3">
        <div>
          <Label>Nom de l'événement</Label>
          <Input value={form.nom} onChange={(e) => setForm({ ...form, nom: e.target.value })} />
        </div>
        <div>
          <Label>Lieu</Label>
          <Input value={form.lieu} onChange={(e) => setForm({ ...form, lieu: e.target.value })} />
        </div>
        <div>
          <Label>Date de début</Label>
          <Input type="date" value={form.date_debut} onChange={(e) => setForm({ ...form, date_debut: e.target.value })} />
        </div>
        <div>
          <Label>Date de fin</Label>
          <Input type="date" value={form.date_fin} onChange={(e) => setForm({ ...form, date_fin: e.target.value })} />
        </div>
        <div>
          <Label>XP attribuée aux présents</Label>
          <Input
            type="number"
            min={0}
            value={form.xp_attribuee}
            onChange={(e) => setForm({ ...form, xp_attribuee: Number(e.target.value) })}
          />
        </div>
        <div>
          <Label>Statut</Label>
          <Select value={form.statut} onValueChange={(v) => setForm({ ...form, statut: v as StatutEvt })}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(statutLabels).map(([k, v]) => (
                <SelectItem key={k} value={k}>
                  {v}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div>
        <Label>Description (publique)</Label>
        <Textarea rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
      </div>
      <div>
        <Label>Compte-rendu (public, après l'événement)</Label>
        <Textarea rows={4} value={form.compte_rendu} onChange={(e) => setForm({ ...form, compte_rendu: e.target.value })} />
      </div>
      <div>
        <Label>Notes internes d'orga</Label>
        <Textarea rows={3} value={form.notes_orga} onChange={(e) => setForm({ ...form, notes_orga: e.target.value })} />
      </div>
      {mode === "create" ? (
        <div className="flex gap-2">
          <Button onClick={createEvent}>
            <Plus className="w-4 h-4 mr-1" /> Créer l'événement
          </Button>
          <Button variant="ghost" onClick={() => setCreating(false)}>
            Annuler
          </Button>
        </div>
      ) : (
        <Button onClick={saveEvent}>
          <Save className="w-4 h-4 mr-1" /> Enregistrer
        </Button>
      )}
    </div>
  );

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div>
            <CardTitle className="font-serif flex items-center gap-2">
              <CalendarDays className="w-5 h-5 text-primary" /> Événements ({evenements.length})
            </CardTitle>
            <CardDescription>Sessions de jeu, présences et attribution automatique d'XP.</CardDescription>
          </div>
          <Button
            size="sm"
            onClick={() => {
              setCreating((c) => !c);
              setOpenId(null);
              setForm({ ...emptyForm });
            }}
          >
            <Plus className="w-4 h-4 mr-1" /> Nouvel événement
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {creating && renderForm("create")}

        {evenements.length === 0 && !creating && (
          <p className="text-sm text-muted-foreground">Aucun événement pour le moment.</p>
        )}

        {evenements.map((e) => (
          <div key={e.id} className="border border-border rounded p-3">
            <div className="flex items-center gap-2 flex-wrap cursor-pointer" onClick={() => openEvent(e)}>
              <span className="font-medium">{e.nom}</span>
              <Badge variant="outline">{statutLabels[e.statut]}</Badge>
              <span className="text-sm text-muted-foreground">
                {new Date(e.date_debut).toLocaleDateString()}
                {e.date_fin && e.date_fin !== e.date_debut ? ` → ${new Date(e.date_fin).toLocaleDateString()}` : ""}
              </span>
              {e.lieu && <span className="text-sm text-muted-foreground">· {e.lieu}</span>}
              <span className="text-sm text-muted-foreground">· {e.xp_attribuee} XP</span>
              <Button
                size="sm"
                variant="ghost"
                className="ml-auto"
                onClick={(ev) => {
                  ev.stopPropagation();
                  deleteEvent(e.id);
                }}
              >
                <Trash2 className="w-4 h-4 text-destructive" />
              </Button>
            </div>

            {openId === e.id && (
              <>
                {renderForm("edit")}

                <div className="border-t border-border pt-4 mt-4 space-y-2">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <h4 className="font-serif text-lg">Présences</h4>
                    <Button size="sm" variant="secondary" onClick={attribuerXp}>
                      <Sparkles className="w-4 h-4 mr-1" /> Attribuer l'XP aux présents
                    </Button>
                  </div>
                  {persos.length === 0 && <p className="text-sm text-muted-foreground">Aucun personnage en base.</p>}
                  <div className="grid sm:grid-cols-2 gap-1">
                    {persos.map((p) => {
                      const part = participations.find((x) => x.personnage_id === p.id);
                      return (
                        <label key={p.id} className="flex items-center gap-2 text-sm border border-border/50 rounded px-2 py-1">
                          <Checkbox
                            checked={!!part?.present}
                            onCheckedChange={(v) => togglePresence(p.id, !!v)}
                          />
                          <span>
                            {p.prenom} {p.nom}
                          </span>
                          {p.faction && <span className="text-muted-foreground text-xs">· {p.faction}</span>}
                          {part?.xp_attribuee && (
                            <Badge variant="outline" className="ml-auto text-xs">
                              XP versée
                            </Badge>
                          )}
                        </label>
                      );
                    })}
                  </div>
                </div>
              </>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default EvenementsManager;
