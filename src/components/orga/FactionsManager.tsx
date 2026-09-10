import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Castle, Mail, Trash2 } from "lucide-react";
import FactionEditor, { FactionRow } from "@/components/FactionEditor";

const FactionsManager = () => {
  const [factions, setFactions] = useState<FactionRow[]>([]);
  const [openId, setOpenId] = useState<string | null>(null);
  const [sending, setSending] = useState(false);

  const load = useCallback(async () => {
    const { data, error } = await supabase.from("factions").select("*").order("nom");
    if (error) toast.error(error.message);
    else setFactions((data as unknown as FactionRow[]) || []);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const remove = async (id: string, nom: string) => {
    if (!confirm(`Supprimer définitivement la faction « ${nom} » ?`)) return;
    const { error } = await supabase.from("factions").delete().eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("Faction supprimée");
    setOpenId(null);
    load();
  };

  const inviterGestionnaires = async () => {
    if (!confirm("Envoyer à chaque email de contact de faction une invitation à créer son compte de gestion ?")) return;
    setSending(true);
    const { data, error } = await supabase.functions.invoke("invite-faction-managers", {
      body: { siteUrl: window.location.origin },
    });
    setSending(false);
    if (error) return toast.error(error.message);
    const res = data as { envoyes?: number; echecs?: number };
    toast.success(`Invitations envoyées : ${res?.envoyes ?? 0}${res?.echecs ? ` — échecs : ${res.echecs}` : ""}`);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between gap-2 flex-wrap">
          <div>
            <CardTitle className="font-serif flex items-center gap-2">
              <Castle className="w-5 h-5 text-primary" /> Factions ({factions.length})
            </CardTitle>
            <CardDescription>
              Corriger les origines, la Marque collective, le bâtiment, consulter les fiches de personnage liées ou
              supprimer une faction.
            </CardDescription>
          </div>
          <Button variant="outline" size="sm" onClick={inviterGestionnaires} disabled={sending}>
            <Mail className="w-4 h-4 mr-1" /> {sending ? "Envoi…" : "Inviter les gestionnaires"}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {factions.length === 0 && <p className="text-sm text-muted-foreground">Aucune faction enregistrée.</p>}

        {factions.map((f) => (
          <div key={f.id} className="border border-border rounded p-3">
            <div
              className="flex items-center gap-2 flex-wrap cursor-pointer"
              onClick={() => setOpenId(openId === f.id ? null : f.id)}
            >
              <span className="font-medium">{f.nom}</span>
              <Badge variant="outline">{f.statut || "active"}</Badge>
              {(f.origines || []).map((o) => (
                <span key={o} className="text-xs bg-primary/10 px-2 py-1 rounded">{o}</span>
              ))}
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
              <div className="border-t border-border pt-4 mt-4">
                <FactionEditor faction={f} isOrga onSaved={load} />
              </div>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default FactionsManager;
