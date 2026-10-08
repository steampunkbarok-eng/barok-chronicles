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
import { useTri } from "@/i18n/tri";

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

const statutLabelsByLang: Record<"fr" | "en" | "nl", Record<StatutEvt, string>> = {
  fr: { a_venir: "À venir", en_cours: "En cours", termine: "Terminé", annule: "Annulé" },
  en: { a_venir: "Upcoming", en_cours: "Ongoing", termine: "Finished", annule: "Cancelled" },
  nl: { a_venir: "Aankomend", en_cours: "Bezig", termine: "Afgelopen", annule: "Geannuleerd" },
};

const dateLocale: Record<"fr" | "en" | "nl", string> = {
  fr: "fr-FR",
  en: "en-US",
  nl: "nl-NL",
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
  const { L, language } = useTri();
  const statutLabels = statutLabelsByLang[language];
  const locale = dateLocale[language];
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
    if (!form.nom.trim() || !form.date_debut) return toast.error(L("Nom et date de début obligatoires", "Name and start date required", "Naam en startdatum verplicht"));
    const { error } = await supabase.from("evenements").insert(payload());
    if (error) return toast.error(error.message);
    toast.success(L("Événement créé", "Event created", "Evenement aangemaakt"));
    setCreating(false);
    setForm({ ...emptyForm });
    load();
  };

  const saveEvent = async () => {
    if (!openId) return;
    const { error } = await supabase.from("evenements").update(payload()).eq("id", openId);
    if (error) return toast.error(error.message);
    toast.success(L("Événement mis à jour", "Event updated", "Evenement bijgewerkt"));
    load();
  };

  const deleteEvent = async (id: string) => {
    if (!confirm(L("Supprimer cet événement et ses présences ?", "Delete this event and its attendance records?", "Dit evenement en de aanwezigheden verwijderen?"))) return;
    const { error } = await supabase.from("evenements").delete().eq("id", id);
    if (error) return toast.error(error.message);
    toast.success(L("Événement supprimé", "Event deleted", "Evenement verwijderd"));
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
    if (!evenement || xp <= 0) return toast.error(L("Renseigne d'abord l'XP de l'événement", "Set the event's XP first", "Stel eerst de XP van het evenement in"));
    const cibles = participations.filter((p) => p.present && !p.xp_attribuee);
    if (cibles.length === 0) return toast.info(L("Aucun présent en attente d'XP", "No attendee pending XP", "Geen aanwezige in afwachting van XP"));

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
    toast.success(`${cibles.length} ${L("personnage(s) crédité(s) de", "character(s) credited with", "personage(s) gecrediteerd met")} ${xp} XP`);
    loadParticipations(openId);
    onXpChanged?.();
  };

  const renderForm = (mode: "create" | "edit") => (
    <div className="space-y-3 border-t border-border pt-4 mt-4">
      <div className="grid sm:grid-cols-2 gap-3">
        <div>
          <Label>{L("Nom de l'événement", "Event name", "Naam van het evenement")}</Label>
          <Input value={form.nom} onChange={(e) => setForm({ ...form, nom: e.target.value })} />
        </div>
        <div>
          <Label>{L("Lieu", "Location", "Locatie")}</Label>
          <Input value={form.lieu} onChange={(e) => setForm({ ...form, lieu: e.target.value })} />
        </div>
        <div>
          <Label>{L("Date de début", "Start date", "Startdatum")}</Label>
          <Input type="date" value={form.date_debut} onChange={(e) => setForm({ ...form, date_debut: e.target.value })} />
        </div>
        <div>
          <Label>{L("Date de fin", "End date", "Einddatum")}</Label>
          <Input type="date" value={form.date_fin} onChange={(e) => setForm({ ...form, date_fin: e.target.value })} />
        </div>
        <div>
          <Label>{L("XP attribuée aux présents", "XP granted to attendees", "XP toegekend aan aanwezigen")}</Label>
          <Input
            type="number"
            min={0}
            value={form.xp_attribuee}
            onChange={(e) => setForm({ ...form, xp_attribuee: Number(e.target.value) })}
          />
        </div>
        <div>
          <Label>{L("Statut", "Status", "Status")}</Label>
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
        <Label>{L("Description (publique)", "Description (public)", "Omschrijving (publiek)")}</Label>
        <Textarea rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
      </div>
      <div>
        <Label>{L("Compte-rendu (public, après l'événement)", "Report (public, after the event)", "Verslag (publiek, na het evenement)")}</Label>
        <Textarea rows={4} value={form.compte_rendu} onChange={(e) => setForm({ ...form, compte_rendu: e.target.value })} />
      </div>
      <div>
        <Label>{L("Notes internes d'orga", "Internal orga notes", "Interne orga-notities")}</Label>
        <Textarea rows={3} value={form.notes_orga} onChange={(e) => setForm({ ...form, notes_orga: e.target.value })} />
      </div>
      {mode === "create" ? (
        <div className="flex gap-2">
          <Button onClick={createEvent}>
            <Plus className="w-4 h-4 mr-1" /> {L("Créer l'événement", "Create event", "Evenement aanmaken")}
          </Button>
          <Button variant="ghost" onClick={() => setCreating(false)}>
            {L("Annuler", "Cancel", "Annuleren")}
          </Button>
        </div>
      ) : (
        <Button onClick={saveEvent}>
          <Save className="w-4 h-4 mr-1" /> {L("Enregistrer", "Save", "Opslaan")}
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
              <CalendarDays className="w-5 h-5 text-primary" /> {L("Événements", "Events", "Evenementen")} ({evenements.length})
            </CardTitle>
            <CardDescription>{L("Sessions de jeu, présences et attribution automatique d'XP.", "Game sessions, attendance and automatic XP granting.", "Spelsessies, aanwezigheden en automatische XP-toekenning.")}</CardDescription>
          </div>
          <Button
            size="sm"
            onClick={() => {
              setCreating((c) => !c);
              setOpenId(null);
              setForm({ ...emptyForm });
            }}
          >
            <Plus className="w-4 h-4 mr-1" /> {L("Nouvel événement", "New event", "Nieuw evenement")}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {creating && renderForm("create")}

        {evenements.length === 0 && !creating && (
          <p className="text-sm text-muted-foreground">{L("Aucun événement pour le moment.", "No events yet.", "Nog geen evenementen.")}</p>
        )}

        {evenements.map((e) => (
          <div key={e.id} className="border border-border rounded p-3">
            <div className="flex items-center gap-2 flex-wrap cursor-pointer" onClick={() => openEvent(e)}>
              <span className="font-medium">{e.nom}</span>
              <Badge variant="outline">{statutLabels[e.statut]}</Badge>
              <span className="text-sm text-muted-foreground">
                {new Date(e.date_debut).toLocaleDateString(locale)}
                {e.date_fin && e.date_fin !== e.date_debut ? ` → ${new Date(e.date_fin).toLocaleDateString(locale)}` : ""}
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
                    <h4 className="font-serif text-lg">{L("Présences", "Attendance", "Aanwezigheden")}</h4>
                    <Button size="sm" variant="secondary" onClick={attribuerXp}>
                      <Sparkles className="w-4 h-4 mr-1" /> {L("Attribuer l'XP aux présents", "Grant XP to attendees", "XP toekennen aan aanwezigen")}
                    </Button>
                  </div>
                  {persos.length === 0 && <p className="text-sm text-muted-foreground">{L("Aucun personnage en base.", "No characters on file.", "Geen personages aanwezig.")}</p>}
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
                              {L("XP versée", "XP granted", "XP toegekend")}
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
