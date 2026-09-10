import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { AlertTriangle, FileDown, Save, Users, X } from "lucide-react";
import { batimentsUniques, navires } from "@/data/batiments";
import { origines as toutesOrigines, categoriesOrigines, getOrigine, origineIncompatibleAvec } from "@/data/origines";
import { marquesCollectives, getMarqueCollective } from "@/data/marques";
import { originesCompatibles, marqueCollectiveCompatible } from "@/lib/reglesCreation";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTri } from "@/i18n/tri";
import { translateGameData } from "@/i18n/gameData";
import { openFactionSheet } from "@/components/FactionSheet";

export interface FactionRow {
  id: string;
  nom: string;
  propriete_terrienne: string | null;
  batiment: string | null;
  titres: string[] | null;
  origines: string[] | null;
  marque_collective: string | null;
  marque_collective_detail: string | null;
  description_courte: string | null;
  background: string | null;
  contact_email: string;
  statut: string | null;
}

export interface Batiment {
  type: string;
  nom: string;
  avantages: string;
}

export const parseBatiment = (raw: string | null): Batiment | null => {
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed === "object" && parsed.nom) return parsed as Batiment;
  } catch {
    return { type: "Bâtiment", nom: raw, avantages: "" };
  }
  return null;
};

const AUCUNE = "__aucune__";
const MARQUE_SECRETE = "Marque secrète";

interface PersoLie {
  id: string;
  nom: string;
  prenom: string;
  espece: string;
  email: string;
  statut: string;
  xp: number;
}

interface Props {
  faction: FactionRow;
  isOrga?: boolean;
  onSaved?: () => void;
}

const FactionEditor = ({ faction, isOrga = false, onSaved }: Props) => {
  const { language } = useLanguage();
  const { L } = useTri();

  const [nom, setNom] = useState(faction.nom);
  const [propriete, setPropriete] = useState(faction.propriete_terrienne || "");
  const [batiment, setBatiment] = useState<Batiment | null>(parseBatiment(faction.batiment));
  const [origines, setOrigines] = useState<string[]>(faction.origines || []);
  const [marque, setMarque] = useState<string | null>(faction.marque_collective);
  const [marqueDetail, setMarqueDetail] = useState(faction.marque_collective_detail || "");
  const [description, setDescription] = useState(faction.description_courte || "");
  const [background, setBackground] = useState(faction.background || "");
  const [contactEmail, setContactEmail] = useState(faction.contact_email);
  const [statut, setStatut] = useState(faction.statut || "active");
  const [persos, setPersos] = useState<PersoLie[]>([]);

  const loadPersos = useCallback(async () => {
    const { data } = await supabase
      .from("personnages")
      .select("id,nom,prenom,espece,email,statut,xp")
      .ilike("faction", faction.nom)
      .order("created_at", { ascending: false });
    setPersos((data as PersoLie[]) || []);
  }, [faction.nom]);

  useEffect(() => {
    loadPersos();
  }, [loadPersos]);

  const changerStatutPerso = async (id: string, statut: "soumis" | "valide" | "archive") => {
    const { error } = await supabase.from("personnages").update({ statut }).eq("id", id);
    if (error) return toast.error(error.message);
    toast.success(L("Statut mis à jour", "Status updated", "Status bijgewerkt"));
    loadPersos();
  };

  const mettreCorbeille = async (id: string, nomComplet: string) => {
    if (
      !confirm(
        L(
          `Mettre la fiche de ${nomComplet} à la corbeille ? L'Organisation pourra la restaurer.`,
          `Move ${nomComplet}'s sheet to the bin? The Organisation will be able to restore it.`,
          `Het blad van ${nomComplet} naar de prullenbak verplaatsen? De Organisatie kan het herstellen.`,
        ),
      )
    )
      return;
    const { data: sess } = await supabase.auth.getSession();
    const { error } = await supabase
      .from("personnages")
      .update({ deleted_at: new Date().toISOString(), deleted_by: sess.session?.user?.email ?? null })
      .eq("id", id);
    if (error) return toast.error(error.message);
    toast.success(L("Fiche mise à la corbeille", "Sheet moved to the bin", "Blad naar de prullenbak verplaatst"));
    loadPersos();
  };


  const ajouterOrigine = (o: string) => {
    if (origines.includes(o)) return;
    if (origines.length >= 2) {
      toast.error(L("Maximum 2 origines par faction", "Maximum 2 origins per faction", "Maximaal 2 oorsprongen per factie"));
      return;
    }
    for (const deja of origines) {
      const v = originesCompatibles(deja, o);
      if (!v.ok) return toast.error(v.raison!);
    }
    const nouvelles = [...origines, o];
    if (marque) {
      const v = marqueCollectiveCompatible(marque, nouvelles);
      if (!v.ok) return toast.error(v.raison!);
    }
    setOrigines(nouvelles);
  };

  const choisirMarque = (valeur: string) => {
    if (valeur === AUCUNE) {
      setMarque(null);
      setMarqueDetail("");
      return;
    }
    const v = marqueCollectiveCompatible(valeur, origines);
    if (!v.ok) return toast.error(v.raison!);
    setMarque(valeur);
    if (valeur !== MARQUE_SECRETE) setMarqueDetail("");
  };

  const save = async () => {
    if (!nom.trim()) {
      return toast.error(L("Le nom de la faction est requis", "The faction name is required", "De naam van de factie is vereist"));
    }
    if (origines.length !== 2) {
      return toast.error(L("Choisissez exactement deux origines", "Choose exactly two origins", "Kies precies twee oorsprongen"));
    }
    const payload: Record<string, unknown> = {
      nom: nom.trim(),
      propriete_terrienne: propriete || null,
      batiment: batiment ? JSON.stringify(batiment) : null,
      origines,
      marque_collective: marque,
      marque_collective_detail: marqueDetail.trim() || null,
      description_courte: description || null,
      background: background || null,
    };
    if (isOrga) {
      payload.contact_email = contactEmail.trim();
      payload.statut = statut || "active";
    }
    const { error } = await supabase.from("factions").update(payload).eq("id", faction.id);
    if (error) return toast.error(error.message);
    toast.success(L("Faction mise à jour", "Faction updated", "Factie bijgewerkt"));
    onSaved?.();
  };

  const fichePdf = () => {
    openFactionSheet(
      {
        nom,
        propriete,
        batiment,
        origines,
        marqueCollective: marque,
        marqueCollectiveDetail: marqueDetail.trim() || null,
        descriptionCourte: description,
        background,
        contactEmail,
        dateCreation: new Date().toLocaleDateString(
          language === "en" ? "en-GB" : language === "nl" ? "nl-NL" : "fr-FR",
        ),
      },
      language,
    );
  };

  return (
    <div className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-3">
        <div>
          <Label>{L("Nom de la faction", "Faction name", "Naam van de factie")}</Label>
          <Input value={nom} onChange={(e) => setNom(e.target.value)} />
        </div>
        <div>
          <Label>{L("Propriété terrienne", "Land property", "Grondbezit")}</Label>
          <Input value={propriete} onChange={(e) => setPropriete(e.target.value)} />
        </div>
        {isOrga && (
          <>
            <div>
              <Label>{L("Email de contact", "Contact email", "Contact-e-mail")}</Label>
              <Input value={contactEmail} onChange={(e) => setContactEmail(e.target.value)} />
            </div>
            <div>
              <Label>{L("Statut", "Status", "Status")}</Label>
              <Input value={statut} onChange={(e) => setStatut(e.target.value)} placeholder="active" />
            </div>
          </>
        )}
      </div>

      {/* Bâtiment */}
      <div className="space-y-2">
        <Label>{L("Bâtiment / navire", "Building / ship", "Gebouw / schip")}</Label>
        {batiment ? (
          <div className="flex items-start justify-between gap-2 bg-accent/20 p-3 rounded">
            <div>
              <p className="font-medium text-primary">{translateGameData(batiment.nom, "batiment", language)}</p>
              <p className="text-sm text-muted-foreground">
                {translateGameData(batiment.avantages, "batimentAvantage", language)}
              </p>
            </div>
            <Button variant="ghost" size="icon" onClick={() => setBatiment(null)}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <Select
            value=""
            onValueChange={(value) => {
              const [n, type, avantages] = value.split("||");
              setBatiment({ nom: n, type, avantages });
            }}
          >
            <SelectTrigger>
              <SelectValue
                placeholder={L("Choisir un bâtiment ou navire", "Choose a building or ship", "Kies een gebouw of schip")}
              />
            </SelectTrigger>
            <SelectContent className="max-h-[400px]">
              <SelectGroup>
                <SelectLabel>{L("Bâtiments uniques", "Unique buildings", "Unieke gebouwen")}</SelectLabel>
                {batimentsUniques.map((b) => (
                  <SelectItem key={b.nom} value={`${b.nom}||Bâtiment||${b.avantages}`}>
                    {translateGameData(b.nom, "batiment", language)}
                  </SelectItem>
                ))}
              </SelectGroup>
              <SelectGroup>
                <SelectLabel>{L("Navires", "Ships", "Schepen")}</SelectLabel>
                {navires.map((n) => (
                  <SelectItem key={n.nom} value={`${n.nom}||Navire||${n.avantages}`}>
                    {translateGameData(n.nom, "batiment", language)}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        )}
      </div>

      {/* Origines */}
      <div className="space-y-2">
        <Label>{L("Origines de la faction (2 obligatoires)", "Faction origins (2 required)", "Oorsprongen van de factie (2 verplicht)")}</Label>
        <Select value="" onValueChange={ajouterOrigine} disabled={origines.length >= 2}>
          <SelectTrigger>
            <SelectValue
              placeholder={
                origines.length >= 2
                  ? L("Deux origines sélectionnées", "Two origins selected", "Twee oorsprongen geselecteerd")
                  : L("Choisir une origine…", "Choose an origin…", "Kies een oorsprong…")
              }
            />
          </SelectTrigger>
          <SelectContent className="max-h-[400px]">
            {categoriesOrigines.map((cat) => (
              <SelectGroup key={cat}>
                <SelectLabel>{cat}</SelectLabel>
                {toutesOrigines
                  .filter((o) => o.categorie === cat)
                  .map((o) => (
                    <SelectItem
                      key={o.nom}
                      value={o.nom}
                      disabled={origines.includes(o.nom) || origines.some((x) => !originesCompatibles(x, o.nom).ok)}
                    >
                      <div className="flex flex-col max-w-[520px]">
                        <span className="font-medium">{o.nom}</span>
                        <span className="text-xs text-muted-foreground line-clamp-2">{o.description}</span>
                      </div>
                    </SelectItem>
                  ))}
              </SelectGroup>
            ))}
          </SelectContent>
        </Select>

        <div className="space-y-3 mt-2">
          {origines.map((o) => {
            const data = getOrigine(o);
            return (
              <div key={o} className="bg-primary/5 border border-primary/20 rounded-lg p-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 space-y-1">
                    <p className="font-semibold text-primary">{o}</p>
                    {data?.description && <p className="text-sm text-muted-foreground">{data.description}</p>}
                    {data?.limitations && data.limitations !== "-" && (
                      <p className="text-xs text-destructive">
                        <strong>{L("Limitations", "Limitations", "Beperkingen")} :</strong> {data.limitations}
                      </p>
                    )}
                    {origineIncompatibleAvec(o).length > 0 && (
                      <p className="text-xs text-destructive">
                        <strong>{L("Incompatible avec", "Incompatible with", "Onverenigbaar met")} :</strong>{" "}
                        {origineIncompatibleAvec(o).join(", ")}
                      </p>
                    )}
                  </div>
                  <button onClick={() => setOrigines(origines.filter((x) => x !== o))} className="hover:text-destructive">
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Marque collective */}
      <div className="space-y-2">
        <Label>{L("Marque collective (optionnelle)", "Collective Mark (optional)", "Collectief Merk (optioneel)")}</Label>
        <Select value={marque ?? AUCUNE} onValueChange={choisirMarque}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="max-h-[400px]">
            <SelectItem value={AUCUNE}>{L("Aucune Marque collective", "No collective Mark", "Geen collectief Merk")}</SelectItem>
            {marquesCollectives.map((m) => (
              <SelectItem key={m.nom} value={m.nom}>
                {m.nom}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {marque === MARQUE_SECRETE && (
          <Textarea
            rows={3}
            value={marqueDetail}
            onChange={(e) => setMarqueDetail(e.target.value)}
            placeholder={L(
              "En cas d'hésitation ou sans idée précise, écrivez « Nous contacterons l'Orga ».",
              'If you hesitate or have no precise idea, write "We will contact the Orga".',
              'Bij twijfel of zonder duidelijk idee, schrijf "Wij nemen contact op met de Orga".',
            )}
          />
        )}
        {marque && (() => {
          const m = getMarqueCollective(marque);
          if (!m) return null;
          return (
            <div className="bg-secondary/10 border border-secondary/30 rounded-lg p-3 space-y-1">
              <p className="text-xs"><strong>{L("Pour qui", "For whom", "Voor wie")} :</strong> {m.pourQui}</p>
              {m.interdits && (
                <p className="text-xs text-destructive">
                  <strong>{L("Nécessités et interdits", "Requirements and prohibitions", "Vereisten en verboden")} :</strong> {m.interdits}
                </p>
              )}
              <p className="text-xs text-amber-600 dark:text-amber-400 flex items-center gap-1">
                <AlertTriangle className="h-3 w-3" />
                {L(
                  "Toute Marque est soumise à la validation de l'Orga.",
                  "Every Mark must be approved by the Orga.",
                  "Elk Merk moet door de Orga worden goedgekeurd.",
                )}
              </p>
            </div>
          );
        })()}
      </div>

      <div>
        <Label>{L("Description courte", "Short description", "Korte beschrijving")}</Label>
        <Textarea rows={3} value={description} onChange={(e) => setDescription(e.target.value)} />
      </div>
      <div>
        <Label>{L("Background", "Background", "Achtergrond")}</Label>
        <Textarea rows={7} value={background} onChange={(e) => setBackground(e.target.value)} />
      </div>

      {/* Personnages liés */}
      <div className="space-y-2">
        <p className="font-medium flex items-center gap-2">
          <Users className="h-4 w-4 text-primary" />
          {L("Fiches de personnage liées", "Linked character sheets", "Gekoppelde personagebladen")} ({persos.length})
        </p>
        {persos.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            {L("Aucune fiche liée à cette faction.", "No sheet linked to this faction.", "Geen blad gekoppeld aan deze factie.")}
          </p>
        ) : (
          <div className="space-y-1">
            {persos.map((p) => (
              <div key={p.id} className="flex flex-wrap items-center gap-2 border border-border rounded p-2 text-sm">
                <span className="font-medium">{p.prenom} {p.nom}</span>
                <span className="text-muted-foreground">{p.espece}</span>
                <Badge variant="outline">{p.statut}</Badge>
                <span className="text-muted-foreground">{p.xp} XP</span>
                <span className="text-xs text-muted-foreground">{p.email}</span>
                <div className="flex items-center gap-1 ml-auto">
                  {p.statut !== "valide" && (
                    <Button size="sm" variant="ghost" onClick={() => changerStatutPerso(p.id, "valide")}>
                      <Check className="h-4 w-4 text-green-600" />
                      <span className="sr-only">{L("Valider", "Validate", "Valideren")}</span>
                    </Button>
                  )}
                  {p.statut !== "soumis" && (
                    <Button size="sm" variant="ghost" onClick={() => changerStatutPerso(p.id, "soumis")}>
                      <RotateCcw className="h-4 w-4" />
                      <span className="sr-only">{L("Remettre en attente", "Set back to pending", "Terug naar in behandeling")}</span>
                    </Button>
                  )}
                  {p.statut !== "archive" && (
                    <Button size="sm" variant="ghost" onClick={() => changerStatutPerso(p.id, "archive")}>
                      <Archive className="h-4 w-4 text-amber-600" />
                      <span className="sr-only">{L("Archiver", "Archive", "Archiveren")}</span>
                    </Button>
                  )}
                  <Button size="sm" variant="ghost" onClick={() => mettreCorbeille(p.id, `${p.prenom} ${p.nom}`.trim())}>
                    <Trash2 className="h-4 w-4 text-destructive" />
                    <span className="sr-only">{L("Corbeille", "Bin", "Prullenbak")}</span>
                  </Button>
                </div>
              </div>
            ))}

          </div>
        )}
      </div>

      <div className="flex gap-2">
        <Button onClick={save} className="gap-2">
          <Save className="h-4 w-4" /> {L("Enregistrer", "Save", "Opslaan")}
        </Button>
        <Button variant="outline" className="gap-2" onClick={fichePdf}>
          <FileDown className="h-4 w-4" /> {L("Fiche PDF", "PDF sheet", "PDF-blad")}
        </Button>
      </div>
    </div>
  );
};

export default FactionEditor;
