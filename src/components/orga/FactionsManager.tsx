import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Castle, Save, Trash2 } from "lucide-react";

interface Faction {
  id: string;
  nom: string;
  marques_total: number;
  marques_depensees: number;
  marques_disponibles: number;
  propriete_terrienne: string | null;
  batiment: string | null;
  titres: string[] | null;
  description_courte: string | null;
  background: string | null;
  contact_email: string;
  statut: string | null;
  created_at: string | null;
}

const FactionsManager = () => {
  const [factions, setFactions] = useState<Faction[]>([]);
  const [openId, setOpenId] = useState<string | null>(null);
  const [form, setForm] = useState<Partial<Faction> & { titresText?: string }>({});

  const load = useCallback(async () => {
    const { data, error } = await supabase.from("factions").select("*").order("nom");
    if (error) toast.error(error.message);
    else setFactions((data as Faction[]) || []);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const openFaction = (f: Faction) => {
    if (openId === f.id) {
      setOpenId(null);
      return;
    }
    setOpenId(f.id);
    setForm({ ...f, titresText: (f.titres || []).join(", ") });
  };

  const save = async () => {
    if (!openId) return;
    const titres = (form.titresText || "")
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
    const { error } = await supabase
      .from("factions")
      .update({
        nom: (form.nom || "").trim(),
        marques_total: Number(form.marques_total) || 0,
        marques_depensees: Number(form.marques_depensees) || 0,
        marques_disponibles: Number(form.marques_disponibles) || 0,
        propriete_terrienne: form.propriete_terrienne || null,
        batiment: form.batiment || null,
        titres,
        description_courte: form.description_courte || null,
        background: form.background || null,
        contact_email: (form.contact_email || "").trim(),
        statut: form.statut || "active",
      })
      .eq("id", openId);
    if (error) return toast.error(error.message);
    toast.success("Faction mise à jour");
    load();
  };

  const remove = async (id: string, nom: string) => {
    if (!confirm(`Supprimer définitivement la faction « ${nom} » ?`)) return;
    const { error } = await supabase.from("factions").delete().eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("Faction supprimée");
    setOpenId(null);
    load();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-serif flex items-center gap-2">
          <Castle className="w-5 h-5 text-primary" /> Factions ({factions.length})
        </CardTitle>
        <CardDescription>
          Corriger une erreur d'encodage, ajouter des marques ou des autorisations spéciales, supprimer une faction.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {factions.length === 0 && <p className="text-sm text-muted-foreground">Aucune faction enregistrée.</p>}

        {factions.map((f) => (
          <div key={f.id} className="border border-border rounded p-3">
            <div className="flex items-center gap-2 flex-wrap cursor-pointer" onClick={() => openFaction(f)}>
              <span className="font-medium">{f.nom}</span>
              <Badge variant="outline">{f.statut || "active"}</Badge>
              <span className="text-sm text-muted-foreground">
                {f.marques_disponibles}/{f.marques_total} marques dispo
              </span>
              <span className="text-sm text-muted-foreground">· {f.contact_email}</span>
              <Button
                size="sm"
                variant="ghost"
                className="ml-auto"
                onClick={(e) => {
                  e.stopPropagation();
                  remove(f.id, f.nom);
                }}
              >
                <Trash2 className="w-4 h-4 text-destructive" />
              </Button>
            </div>

            {openId === f.id && (
              <div className="space-y-3 border-t border-border pt-4 mt-4">
                <div className="grid sm:grid-cols-2 gap-3">
                  <div>
                    <Label>Nom</Label>
                    <Input value={form.nom || ""} onChange={(e) => setForm({ ...form, nom: e.target.value })} />
                  </div>
                  <div>
                    <Label>Email de contact</Label>
                    <Input
                      value={form.contact_email || ""}
                      onChange={(e) => setForm({ ...form, contact_email: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label>Marques totales</Label>
                    <Input
                      type="number"
                      value={form.marques_total ?? 0}
                      onChange={(e) => setForm({ ...form, marques_total: Number(e.target.value) })}
                    />
                  </div>
                  <div>
                    <Label>Marques dépensées</Label>
                    <Input
                      type="number"
                      value={form.marques_depensees ?? 0}
                      onChange={(e) => setForm({ ...form, marques_depensees: Number(e.target.value) })}
                    />
                  </div>
                  <div>
                    <Label>Marques disponibles</Label>
                    <Input
                      type="number"
                      value={form.marques_disponibles ?? 0}
                      onChange={(e) => setForm({ ...form, marques_disponibles: Number(e.target.value) })}
                    />
                  </div>
                  <div>
                    <Label>Statut</Label>
                    <Input
                      value={form.statut || ""}
                      placeholder="active"
                      onChange={(e) => setForm({ ...form, statut: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label>Propriété terrienne</Label>
                    <Input
                      value={form.propriete_terrienne || ""}
                      onChange={(e) => setForm({ ...form, propriete_terrienne: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label>Bâtiment / navire</Label>
                    <Input
                      value={form.batiment || ""}
                      onChange={(e) => setForm({ ...form, batiment: e.target.value })}
                    />
                  </div>
                </div>
                <div>
                  <Label>Titres (séparés par des virgules)</Label>
                  <Input
                    value={form.titresText || ""}
                    onChange={(e) => setForm({ ...form, titresText: e.target.value })}
                  />
                </div>
                <div>
                  <Label>Description courte</Label>
                  <Textarea
                    rows={2}
                    value={form.description_courte || ""}
                    onChange={(e) => setForm({ ...form, description_courte: e.target.value })}
                  />
                </div>
                <div>
                  <Label>Background</Label>
                  <Textarea
                    rows={4}
                    value={form.background || ""}
                    onChange={(e) => setForm({ ...form, background: e.target.value })}
                  />
                </div>
                <Button onClick={save}>
                  <Save className="w-4 h-4 mr-1" /> Enregistrer
                </Button>
              </div>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default FactionsManager;
