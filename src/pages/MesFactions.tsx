import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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
import { ArrowLeft, Castle, FileDown, Save, X } from "lucide-react";
import { batimentsUniques, navires } from "@/data/batiments";
import { titresCarrieres } from "@/data/titres";
import { useLanguage } from "@/contexts/LanguageContext";
import { translateGameData } from "@/i18n/gameData";
import { openFactionSheet } from "@/components/FactionSheet";

interface FactionRow {
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
}

interface Batiment {
  type: string;
  nom: string;
  avantages: string;
}

const parseBatiment = (raw: string | null): Batiment | null => {
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed === "object" && parsed.nom) return parsed as Batiment;
  } catch {
    return { type: "Bâtiment", nom: raw, avantages: "" };
  }
  return null;
};

const MesFactions = () => {
  const { language } = useLanguage();
  const fr = language !== "en";
  const navigate = useNavigate();
  const [email, setEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [factions, setFactions] = useState<FactionRow[]>([]);
  const [openId, setOpenId] = useState<string | null>(null);
  const [form, setForm] = useState<Partial<FactionRow>>({});
  const [batiment, setBatiment] = useState<Batiment | null>(null);
  const [titres, setTitres] = useState<string[]>([]);

  const load = useCallback(async (userEmail: string) => {
    const { data, error } = await supabase
      .from("factions")
      .select("*")
      .ilike("contact_email", userEmail)
      .order("nom");
    if (error) toast.error(error.message);
    else setFactions((data as FactionRow[]) || []);
    setLoading(false);
  }, []);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      const mail = data.session?.user?.email ?? null;
      setEmail(mail);
      if (mail) load(mail);
      else setLoading(false);
    });
  }, [load]);

  const openFaction = (f: FactionRow) => {
    if (openId === f.id) {
      setOpenId(null);
      return;
    }
    setOpenId(f.id);
    setForm({ ...f });
    setBatiment(parseBatiment(f.batiment));
    setTitres(f.titres || []);
  };

  const ajouterTitre = (nom: string) => {
    if (titres.includes(nom)) return;
    if (titres.length >= 2) {
      toast.error(fr ? "Maximum 2 titres par faction" : "Maximum 2 titles per faction");
      return;
    }
    const data = titresCarrieres.find((t) => t.nom === nom);
    const conflit = titres.find(
      (t) =>
        data?.incompatible?.includes(t) ||
        titresCarrieres.find((x) => x.nom === t)?.incompatible?.includes(nom),
    );
    if (conflit) {
      toast.error(
        fr ? `${nom} est incompatible avec ${conflit}` : `${nom} is incompatible with ${conflit}`,
      );
      return;
    }
    setTitres([...titres, nom]);
  };

  const save = async () => {
    if (!openId) return;
    const { error } = await supabase
      .from("factions")
      .update({
        nom: (form.nom || "").trim(),
        propriete_terrienne: form.propriete_terrienne || null,
        batiment: batiment ? JSON.stringify(batiment) : null,
        titres,
        description_courte: form.description_courte || null,
        background: form.background || null,
      })
      .eq("id", openId);
    if (error) return toast.error(error.message);
    toast.success(fr ? "Faction mise à jour" : "Faction updated");
    if (email) load(email);
  };

  const telechargerFiche = (f: FactionRow) => {
    openFactionSheet(
      {
        nom: f.nom,
        marquesTotal: f.marques_total,
        marquesDepensees: f.marques_depensees,
        marquesDisponibles: f.marques_disponibles,
        propriete: f.propriete_terrienne || "",
        batiment: parseBatiment(f.batiment),
        titres: f.titres || [],
        descriptionCourte: f.description_courte || "",
        background: f.background || "",
        contactEmail: f.contact_email,
        dateCreation: new Date().toLocaleDateString("fr-FR"),
        statut: (f.statut as "active" | "inactive") || "active",
        id: f.id,
      } as never,
      language,
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      <header className="border-b border-border/50 bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center gap-3">
          <Link to="/">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <Castle className="h-7 w-7 text-primary" />
          <h1 className="text-2xl font-bold text-primary font-serif">
            {fr ? "Mes factions" : "My factions"}
          </h1>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl space-y-4">
        {loading && <p className="text-muted-foreground">{fr ? "Chargement…" : "Loading…"}</p>}

        {!loading && !email && (
          <Card>
            <CardHeader>
              <CardTitle className="font-serif">{fr ? "Connexion requise" : "Sign in required"}</CardTitle>
              <CardDescription>
                {fr
                  ? "Connectez-vous avec l'adresse email de contact de votre faction pour la modifier."
                  : "Sign in with your faction's contact email address to edit it."}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={() => navigate("/auth")}>{fr ? "Se connecter" : "Sign in"}</Button>
            </CardContent>
          </Card>
        )}

        {!loading && email && factions.length === 0 && (
          <Card>
            <CardContent className="py-8 text-center space-y-3">
              <p className="text-muted-foreground">
                {fr
                  ? `Aucune faction liée à ${email}.`
                  : `No faction linked to ${email}.`}
              </p>
              <Link to="/factions">
                <Button>{fr ? "Créer une faction" : "Create a faction"}</Button>
              </Link>
            </CardContent>
          </Card>
        )}

        {factions.map((f) => (
          <Card key={f.id}>
            <CardHeader className="cursor-pointer" onClick={() => openFaction(f)}>
              <CardTitle className="font-serif flex items-center gap-2 flex-wrap">
                {f.nom}
                <Badge variant="outline">{f.statut || "active"}</Badge>
                <span className="text-sm font-normal text-muted-foreground">
                  {f.marques_disponibles}/{f.marques_total} {fr ? "marques disponibles" : "marks available"}
                </span>
              </CardTitle>
              <CardDescription>
                {fr
                  ? "Cliquez pour réécrire votre faction (titres, bâtiment, propriété, background)."
                  : "Click to rewrite your faction (titles, building, property, background)."}
              </CardDescription>
            </CardHeader>

            {openId === f.id && (
              <CardContent className="space-y-4 border-t border-border pt-4">
                <div className="grid sm:grid-cols-2 gap-3">
                  <div>
                    <Label>{fr ? "Nom de la faction" : "Faction name"}</Label>
                    <Input
                      value={form.nom || ""}
                      onChange={(e) => setForm({ ...form, nom: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label>{fr ? "Propriété terrienne" : "Land property"}</Label>
                    <Input
                      value={form.propriete_terrienne || ""}
                      onChange={(e) => setForm({ ...form, propriete_terrienne: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>{fr ? "Bâtiment / navire" : "Building / ship"}</Label>
                  {batiment ? (
                    <div className="flex items-start justify-between gap-2 bg-accent/20 p-3 rounded">
                      <div>
                        <p className="font-medium text-primary">
                          {translateGameData(batiment.nom, "batiment", language)}
                        </p>
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
                      onValueChange={(value) => {
                        const [nom, type, avantages] = value.split("||");
                        setBatiment({ nom, type, avantages });
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder={fr ? "Choisir un bâtiment ou navire" : "Choose a building or ship"} />
                      </SelectTrigger>
                      <SelectContent className="max-h-[400px]">
                        <SelectGroup>
                          <SelectLabel>{fr ? "Bâtiments uniques" : "Unique buildings"}</SelectLabel>
                          {batimentsUniques.map((b) => (
                            <SelectItem key={b.nom} value={`${b.nom}||Bâtiment||${b.avantages}`}>
                              {translateGameData(b.nom, "batiment", language)}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                        <SelectGroup>
                          <SelectLabel>{fr ? "Navires" : "Ships"}</SelectLabel>
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

                <div className="space-y-2">
                  <Label>{fr ? "Titres (max. 2)" : "Titles (max. 2)"}</Label>
                  <Select onValueChange={ajouterTitre} disabled={titres.length >= 2}>
                    <SelectTrigger>
                      <SelectValue placeholder={fr ? "Ajouter un titre" : "Add a title"} />
                    </SelectTrigger>
                    <SelectContent className="max-h-[400px]">
                      {titresCarrieres.map((t) => (
                        <SelectItem key={t.nom} value={t.nom} disabled={titres.includes(t.nom)}>
                          {translateGameData(t.nom, "titre", language)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <div className="flex flex-wrap gap-2">
                    {titres.map((t) => (
                      <span key={t} className="flex items-center gap-2 bg-primary/10 px-3 py-1 rounded">
                        <span className="text-sm">{translateGameData(t, "titre", language)}</span>
                        <button onClick={() => setTitres(titres.filter((x) => x !== t))}>
                          <X className="h-3 w-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <Label>{fr ? "Description courte" : "Short description"}</Label>
                  <Textarea
                    rows={3}
                    value={form.description_courte || ""}
                    onChange={(e) => setForm({ ...form, description_courte: e.target.value })}
                  />
                </div>

                <div>
                  <Label>{fr ? "Background" : "Background"}</Label>
                  <Textarea
                    rows={8}
                    value={form.background || ""}
                    onChange={(e) => setForm({ ...form, background: e.target.value })}
                  />
                </div>

                <p className="text-xs text-muted-foreground">
                  {fr
                    ? "Les marques de destinée sont gérées par les Orgas. Contactez-les si un ajustement est nécessaire."
                    : "Destiny marks are managed by the Organizers. Contact them if an adjustment is needed."}
                </p>

                <div className="flex gap-2">
                  <Button onClick={save} className="gap-2">
                    <Save className="h-4 w-4" /> {fr ? "Enregistrer" : "Save"}
                  </Button>
                  <Button variant="outline" className="gap-2" onClick={() => telechargerFiche(f)}>
                    <FileDown className="h-4 w-4" /> {fr ? "Fiche PDF" : "PDF sheet"}
                  </Button>
                </div>
              </CardContent>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MesFactions;
