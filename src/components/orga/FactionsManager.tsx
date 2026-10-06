import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Castle, Mail, Trash2 } from "lucide-react";
import { useTri } from "@/i18n/tri";
import { translateFactionText } from "@/i18n/factionTexts2027";
import FactionEditor, { FactionRow } from "@/components/FactionEditor";

const FactionsManager = () => {
  const { L, language } = useTri();
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
    if (!confirm(L(`Supprimer définitivement la faction « ${nom} » ?`, `Permanently delete faction “${nom}”?`, `Factie “${nom}” definitief verwijderen?`))) return;
    const { error } = await supabase.from("factions").delete().eq("id", id);
    if (error) return toast.error(error.message);
    toast.success(L("Faction supprimée", "Faction deleted", "Factie verwijderd"));
    setOpenId(null);
    load();
  };

  const inviterGestionnaires = async () => {
    if (!confirm(L("Envoyer à chaque email de contact de faction une invitation à créer son compte de gestion ?", "Send an account invitation to every faction contact email?", "Een uitnodiging voor een beheerdersaccount naar elk contactadres van een factie sturen?"))) return;
    setSending(true);
    const { data, error } = await supabase.functions.invoke("invite-faction-managers", {
      body: { siteUrl: window.location.origin },
    });
    setSending(false);
    if (error) return toast.error(error.message);
    const res = data as { envoyes?: number; echecs?: number };
    toast.success(`${L("Invitations envoyées", "Invitations sent", "Uitnodigingen verstuurd")} : ${res?.envoyes ?? 0}${res?.echecs ? ` — ${L("échecs", "failed", "mislukt")} : ${res.echecs}` : ""}`);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between gap-2 flex-wrap">
          <div>
            <CardTitle className="font-serif flex items-center gap-2">
              <Castle className="w-5 h-5 text-primary" /> {L("Factions", "Factions", "Facties")} ({factions.length})
            </CardTitle>
            <CardDescription>
              {L("Origines, Marque collective, bâtiment et fiches de personnage liées.", "Origins, Collective Mark, building and linked character sheets.", "Oorsprongen, collectief Merk, gebouw en gekoppelde personagebladen.")}
            </CardDescription>
          </div>
          <Button variant="outline" size="sm" onClick={inviterGestionnaires} disabled={sending}>
            <Mail className="w-4 h-4 mr-1" /> {sending ? L("Envoi…", "Sending…", "Versturen…") : L("Inviter les gestionnaires", "Invite managers", "Beheerders uitnodigen")}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {factions.length === 0 && <p className="text-sm text-muted-foreground">{L("Aucune faction enregistrée.", "No factions saved.", "Geen facties opgeslagen.")}</p>}

        {factions.map((f) => (
          <div key={f.id} className="border border-border rounded p-3">
            <div
              className="flex items-center gap-2 flex-wrap cursor-pointer"
              onClick={() => setOpenId(openId === f.id ? null : f.id)}
            >
              <span className="font-medium">{f.nom}</span>
              <Badge variant="outline">{(f.statut || "active") === "active" ? L("Active", "Active", "Actief") : L("Inactive", "Inactive", "Inactief")}</Badge>
              {(f.origines || []).map((o) => (
                <span key={o} className="text-xs bg-primary/10 px-2 py-1 rounded">{translateFactionText(o, language)}</span>
              ))}
              <span className="text-sm text-muted-foreground">· {f.contact_email}</span>
              <Button
                size="sm"
                variant="ghost"
                className="ml-auto"
                aria-label={L("Supprimer la faction", "Delete faction", "Factie verwijderen")}
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
