import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Shield, ArrowLeft, Save, Plus, X, Info, AlertTriangle } from "lucide-react";
import { toast } from "sonner";
import { typesBatiments, batimentsUniques, navires } from "@/data/batiments";
import { origines as toutesOrigines, categoriesOrigines, getOrigine, origineIncompatibleAvec } from "@/data/origines";
import { marquesCollectives, getMarqueCollective } from "@/data/marques";
import { originesCompatibles, marqueCollectiveCompatible } from "@/lib/reglesCreation";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTri } from "@/i18n/tri";
import { translateGameData } from "@/i18n/gameData";
import { openFactionSheet } from "@/components/FactionSheet";

interface Faction {
  id: string;
  nom: string;
  propriete: string;
  batiment: { type: string; nom: string; avantages: string } | null;
  origines: string[];
  marqueCollective: string | null;
  marqueCollectiveDetail?: string;
  descriptionCourte: string;
  background: string;
  contactEmail: string;
  dateCreation: string;
  statut: "active" | "inactive";
}

const AUCUNE = "__aucune__";
const MARQUE_SECRETE = "Marque secrète";

const Factions = () => {
  const { t, language } = useLanguage();
  const { L } = useTri();
  const navigate = useNavigate();
  const [factions, setFactions] = useState<Faction[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [sessionEmail, setSessionEmail] = useState<string | null>(null);
  const [checkingSession, setCheckingSession] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      const mail = data.session?.user?.email ?? null;
      setSessionEmail(mail);
      if (mail) setFormData((f) => ({ ...f, contactEmail: mail }));
      setCheckingSession(false);
    });
  }, []);

  const [formData, setFormData] = useState<Omit<Faction, "id" | "dateCreation">>({
    nom: "",
    propriete: "",
    batiment: null,
    origines: [],
    marqueCollective: null,
    marqueCollectiveDetail: "",
    descriptionCourte: "",
    background: "",
    contactEmail: "",
    statut: "active",
  });

  const ajouterBatiment = (nom: string, type: string, avantages: string) => {
    if (formData.batiment) {
      toast.error(L("Vous avez déjà un bâtiment. Retirez-le d'abord.", "You already have a building. Remove it first.", "U heeft al een gebouw. Verwijder het eerst."));
      return;
    }
    setFormData({ ...formData, batiment: { type, nom, avantages } });
  };

  const retirerBatiment = () => setFormData({ ...formData, batiment: null });

  const ajouterOrigine = (nom: string) => {
    if (formData.origines.includes(nom)) return;
    if (formData.origines.length >= 2) {
      toast.error(L("Maximum 2 origines par faction", "Maximum 2 origins per faction", "Maximaal 2 oorsprongen per factie"));
      return;
    }
    for (const deja of formData.origines) {
      const verdict = originesCompatibles(deja, nom);
      if (!verdict.ok) {
        toast.error(verdict.raison!);
        return;
      }
    }
    const nouvelles = [...formData.origines, nom];
    if (formData.marqueCollective) {
      const v = marqueCollectiveCompatible(formData.marqueCollective, nouvelles);
      if (!v.ok) {
        toast.error(v.raison!);
        return;
      }
    }
    setFormData({ ...formData, origines: nouvelles });
  };

  const retirerOrigine = (nom: string) =>
    setFormData({ ...formData, origines: formData.origines.filter((o) => o !== nom) });

  const choisirMarque = (valeur: string) => {
    if (valeur === AUCUNE) {
      setFormData({ ...formData, marqueCollective: null, marqueCollectiveDetail: "" });
      return;
    }
    const v = marqueCollectiveCompatible(valeur, formData.origines);
    if (!v.ok) {
      toast.error(v.raison!);
      return;
    }
    setFormData({
      ...formData,
      marqueCollective: valeur,
      marqueCollectiveDetail: valeur === MARQUE_SECRETE ? formData.marqueCollectiveDetail || "" : "",
    });
  };

  const origineDisabled = (nom: string) => {
    if (formData.origines.includes(nom)) return true;
    return formData.origines.some((o) => !originesCompatibles(o, nom).ok);
  };

  const sauvegarderFaction = async () => {
    if (!formData.nom.trim()) {
      toast.error(L("Le nom de la faction est requis", "The faction name is required", "De naam van de factie is vereist"));
      return;
    }
    if (formData.origines.length !== 2) {
      toast.error(L("Choisissez exactement deux origines", "Choose exactly two origins", "Kies precies twee oorsprongen"));
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.contactEmail.trim() || !emailRegex.test(formData.contactEmail)) {
      toast.error(L("Une adresse email valide est requise", "A valid email address is required", "Een geldig e-mailadres is vereist"));
      return;
    }

    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
    if (!supabaseUrl || !supabaseKey) {
      toast.error(L("Variables d'environnement backend manquantes", "Missing backend environment variables", "Backend-omgevingsvariabelen ontbreken"));
      return;
    }

    const nouvelleFaction: Faction = {
      id: crypto.randomUUID(),
      ...formData,
      dateCreation: new Date().toLocaleDateString(language === "en" ? "en-US" : language === "nl" ? "nl-NL" : "fr-FR"),
    };

    try {
      const { error: dbError } = await supabase.from("factions").insert({
        nom: nouvelleFaction.nom,
        propriete_terrienne: nouvelleFaction.propriete || null,
        batiment: nouvelleFaction.batiment ? JSON.stringify(nouvelleFaction.batiment) : null,
        titres: [],
        origines: nouvelleFaction.origines,
        marque_collective: nouvelleFaction.marqueCollective,
        marque_collective_detail: nouvelleFaction.marqueCollectiveDetail?.trim() || null,
        description_courte: nouvelleFaction.descriptionCourte,
        background: nouvelleFaction.background,
        contact_email: nouvelleFaction.contactEmail,
        statut: nouvelleFaction.statut,
      });

      if (dbError) {
        console.error("Erreur DB:", dbError);
        throw new Error(`Erreur base de données: ${dbError.message}`);
      }

      try {
        const { error: emailError } = await supabase.functions.invoke("send-faction-email", {
          body: {
            factionName: nouvelleFaction.nom,
            contactEmail: nouvelleFaction.contactEmail,
            propriete: nouvelleFaction.propriete || null,
            batiment: nouvelleFaction.batiment,
            titres: [],
            origines: nouvelleFaction.origines,
            marqueCollective: nouvelleFaction.marqueCollective,
            marqueCollectiveDetail: nouvelleFaction.marqueCollectiveDetail?.trim() || null,
            descriptionCourte: nouvelleFaction.descriptionCourte,
            background: nouvelleFaction.background,
          },
        });
        if (emailError) {
          console.error("Erreur d'envoi d'email:", emailError);
          toast.error(L("Faction créée mais l'envoi d'email a échoué", "Faction created but email sending failed", "Factie aangemaakt maar de e-mail is niet verzonden"));
        }
      } catch (emailErr) {
        console.error("Erreur d'envoi d'email:", emailErr);
      }

      setFactions([...factions, nouvelleFaction]);
      setShowForm(false);
      setFormData({
        nom: "",
        propriete: "",
        batiment: null,
        origines: [],
        marqueCollective: null,
        marqueCollectiveDetail: "",
        descriptionCourte: "",
        background: "",
        contactEmail: "",
        statut: "active",
      });

      toast.success(L("Faction créée avec succès ! Les emails ont été envoyés.", "Faction created successfully! Emails have been sent.", "Factie succesvol aangemaakt! De e-mails zijn verzonden."));

      openFactionSheet(
        {
          nom: nouvelleFaction.nom,
          marquesTotal: 0,
          marquesDepensees: 0,
          marquesDisponibles: 0,
          propriete: nouvelleFaction.propriete,
          batiment: nouvelleFaction.batiment,
          origines: nouvelleFaction.origines,
          marqueCollective: nouvelleFaction.marqueCollective,
          marqueCollectiveDetail: nouvelleFaction.marqueCollectiveDetail?.trim() || null,
          descriptionCourte: nouvelleFaction.descriptionCourte,
          background: nouvelleFaction.background,
          contactEmail: nouvelleFaction.contactEmail,
          dateCreation: nouvelleFaction.dateCreation,
        },
        language,
      );
    } catch (error: any) {
      console.error("Erreur lors de la sauvegarde:", error);
      const details = error?.message ? ` (${error.message})` : "";
      toast.error(L(`Une erreur est survenue lors de la création de la faction${details}`, `An error occurred while creating the faction${details}`, `Er is een fout opgetreden bij het aanmaken van de factie${details}`));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      <header className="border-b border-border/50 bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link to="/">
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </Link>
              <Shield className="h-8 w-8 text-primary" />
              <h1 className="text-3xl font-bold text-primary">{t('factions.title')}</h1>
            </div>
            {!showForm && (
              <Button onClick={() => setShowForm(true)} className="gap-2">
                <Plus className="h-5 w-5" />
                {t('factions.create')}
              </Button>
            )}
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {showForm ? (
          <Card className="ornament-border max-w-4xl mx-auto">
            <CardHeader>
              <CardTitle>{t('factions.createNew')}</CardTitle>
              <CardDescription>
                {L(
                  "Règles 2026-2027 : deux origines obligatoires, sans coût, et une Marque collective optionnelle.",
                  "2026-2027 rules: two mandatory origins, free of charge, and one optional collective Mark.",
                  "Regels 2026-2027: twee verplichte oorsprongen, gratis, en één optioneel collectief Merk.",
                )}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="nom">{t('factions.name')}</Label>
                <Input
                  id="nom"
                  value={formData.nom}
                  onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                  placeholder={t('factions.namePlaceholder')}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="propriete">{t('factions.property')}</Label>
                <Input
                  id="propriete"
                  value={formData.propriete}
                  onChange={(e) => setFormData({ ...formData, propriete: e.target.value })}
                  placeholder={t('factions.propertyPlaceholder')}
                />
                <p className="text-xs text-muted-foreground">{t('factions.propertyNote')}</p>
              </div>

              <div className="space-y-2">
                <Label>{t('factions.building')}</Label>
                {!formData.batiment ? (
                  <Select onValueChange={(value) => {
                    const [nom, type, avantages] = value.split('||');
                    ajouterBatiment(nom, type, avantages);
                  }}>
                    <SelectTrigger>
                      <SelectValue placeholder={t('factions.buildingPlaceholder')} />
                    </SelectTrigger>
                    <SelectContent className="max-h-[400px]">
                      <SelectGroup>
                        <SelectLabel>{t('factions.buildingsUnique')}</SelectLabel>
                        {batimentsUniques.map((bat) => (
                          <SelectItem key={bat.nom} value={`${bat.nom}||Bâtiment||${bat.avantages}`}>
                            <div className="flex flex-col">
                              <span className="font-medium">{translateGameData(bat.nom, 'batiment', language)}</span>
                              <span className="text-xs text-muted-foreground">{translateGameData(bat.avantages, 'batimentAvantage', language)}</span>
                              {bat.condition && (
                                <span className="text-xs text-amber-600 dark:text-amber-400 mt-1">⚠️ {translateGameData(bat.condition, 'batimentCondition', language)}</span>
                              )}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectGroup>
                      <SelectGroup>
                        <SelectLabel>{t('factions.ships')}</SelectLabel>
                        {navires.map((nav) => (
                          <SelectItem key={nav.nom} value={`${nav.nom}||Navire||${nav.avantages}`}>
                            <div className="flex flex-col">
                              <span className="font-medium">{translateGameData(nav.nom, 'batiment', language)}</span>
                              <span className="text-xs text-muted-foreground">{translateGameData(nav.avantages, 'batimentAvantage', language)}</span>
                              {nav.condition && (
                                <span className="text-xs text-amber-600 dark:text-amber-400 mt-1">⚠️ {translateGameData(nav.condition, 'batimentCondition', language)}</span>
                              )}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                ) : (
                  <div className="bg-accent/20 p-4 rounded-lg space-y-2">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="font-bold text-primary">{translateGameData(formData.batiment.nom, 'batiment', language)}</p>
                        <p className="text-xs text-muted-foreground mb-2">{formData.batiment.type === 'Bâtiment' ? L('Bâtiment', 'Building', 'Gebouw') : L('Navire', 'Ship', 'Schip')}</p>
                        <div className="flex items-start gap-2 bg-muted/50 p-2 rounded">
                          <Info className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                          <p className="text-sm">{translateGameData(formData.batiment.avantages, 'batimentAvantage', language)}</p>
                        </div>
                      </div>
                      <Button onClick={retirerBatiment} variant="ghost" size="icon" className="ml-2">
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </div>

              {/* ORIGINES */}
              <div className="space-y-2">
                <Label>{L("Origines de la faction (2 obligatoires)", "Faction origins (2 required)", "Oorsprongen van de factie (2 verplicht)")}</Label>
                <Select value="" onValueChange={ajouterOrigine} disabled={formData.origines.length >= 2}>
                  <SelectTrigger>
                    <SelectValue placeholder={formData.origines.length >= 2
                      ? L("Deux origines sélectionnées", "Two origins selected", "Twee oorsprongen geselecteerd")
                      : L("Choisir une origine…", "Choose an origin…", "Kies een oorsprong…")} />
                  </SelectTrigger>
                  <SelectContent className="max-h-[400px]">
                    {categoriesOrigines.map((cat) => (
                      <SelectGroup key={cat}>
                        <SelectLabel>{cat}</SelectLabel>
                        {toutesOrigines.filter((o) => o.categorie === cat).map((o) => (
                          <SelectItem key={o.nom} value={o.nom} disabled={origineDisabled(o.nom)}>
                            <div className="flex flex-col max-w-[520px]">
                              <span className="font-medium">{o.nom}</span>
                              <span className="text-xs text-muted-foreground line-clamp-2">{o.description}</span>
                              {o.especes && o.especes !== "-" && (
                                <span className="text-xs text-amber-600 dark:text-amber-400">{L("Espèces", "Species", "Soorten")}: {o.especes}</span>
                              )}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    ))}
                  </SelectContent>
                </Select>

                <div className="space-y-3 mt-2">
                  {formData.origines.map((nom) => {
                    const o = getOrigine(nom);
                    return (
                      <div key={nom} className="bg-primary/5 border border-primary/20 rounded-lg p-3">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1 space-y-1">
                            <p className="font-semibold text-primary">{nom}</p>
                            {o?.description && <p className="text-sm text-muted-foreground">{o.description}</p>}
                            {o?.especes && o.especes !== "-" && (
                              <p className="text-xs"><strong>{L("Espèces", "Species", "Soorten")} :</strong> {o.especes}</p>
                            )}
                            {o?.limitations && o.limitations !== "-" && (
                              <p className="text-xs text-destructive"><strong>{L("Limitations", "Limitations", "Beperkingen")} :</strong> {o.limitations}</p>
                            )}
                            {origineIncompatibleAvec(nom).length > 0 && (
                              <p className="text-xs text-destructive">
                                <strong>{L("Origines incompatibles", "Incompatible origins", "Onverenigbare oorsprongen")} :</strong>{" "}
                                {origineIncompatibleAvec(nom).join(", ")}
                              </p>
                            )}
                            {o?.prerequis && o.prerequis !== "-" && (
                              <p className="text-xs"><strong>{L("Prérequis", "Prerequisites", "Vereisten")} :</strong> {o.prerequis}</p>
                            )}
                            {o?.contactOrga && (
                              <p className="text-xs flex items-center gap-1 text-amber-600 dark:text-amber-400">
                                <AlertTriangle className="h-3 w-3" />
                                {L("Contact préalable avec l'Orga requis", "Prior contact with the Orga required", "Voorafgaand contact met de Orga vereist")}
                              </p>
                            )}
                          </div>
                          <button onClick={() => retirerOrigine(nom)} className="hover:text-destructive">
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* MARQUE COLLECTIVE */}
              <div className="space-y-2">
                <Label>{L("Marque collective (optionnelle, une seule)", "Collective Mark (optional, only one)", "Collectief Merk (optioneel, slechts één)")}</Label>
                <Select value={formData.marqueCollective ?? AUCUNE} onValueChange={choisirMarque}>
                  <SelectTrigger>
                    <SelectValue placeholder={L("Aucune Marque collective", "No collective Mark", "Geen collectief Merk")} />
                  </SelectTrigger>
                  <SelectContent className="max-h-[400px]">
                    <SelectItem value={AUCUNE}>{L("Aucune Marque collective", "No collective Mark", "Geen collectief Merk")}</SelectItem>
                    {marquesCollectives.map((m) => (
                      <SelectItem key={m.nom} value={m.nom}>
                        <div className="flex flex-col max-w-[520px]">
                          <span className="font-medium">{m.nom}</span>
                          <span className="text-xs text-muted-foreground line-clamp-2">{m.pourQui}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {formData.marqueCollective === MARQUE_SECRETE && (
                  <div className="space-y-1">
                    <Label htmlFor="marqueSecrete">
                      {L("Décrivez votre Marque secrète", "Describe your secret Mark", "Beschrijf uw geheime Merk")}
                    </Label>
                    <Textarea
                      id="marqueSecrete"
                      rows={3}
                      value={formData.marqueCollectiveDetail || ""}
                      onChange={(e) => setFormData({ ...formData, marqueCollectiveDetail: e.target.value })}
                      placeholder={L(
                        "En cas d'hésitation ou sans idée précise, écrivez « Nous contacterons l'Orga » : nous en discuterons ensemble.",
                        "If you hesitate or have no precise idea, write \"We will contact the Orga\": we will discuss it together.",
                        "Bij twijfel of zonder duidelijk idee, schrijf \"Wij nemen contact op met de Orga\": we bespreken het samen.",
                      )}
                    />
                    <p className="text-xs text-muted-foreground">
                      {L(
                        "Ce texte apparaîtra sur la fiche de faction générée.",
                        "This text will appear on the generated faction sheet.",
                        "Deze tekst verschijnt op het gegenereerde factieblad.",
                      )}
                    </p>
                  </div>
                )}
                {formData.marqueCollective && (() => {
                  const m = getMarqueCollective(formData.marqueCollective);
                  if (!m) return null;
                  return (
                    <div className="bg-secondary/10 border border-secondary/30 rounded-lg p-3 space-y-1">
                      {m.citation && <p className="text-sm italic">« {m.citation} »</p>}
                      <p className="text-xs"><strong>{L("Pour qui", "For whom", "Voor wie")} :</strong> {m.pourQui}</p>
                      {m.signale && <p className="text-xs"><strong>{L("Signale", "Signals", "Signaleert")} :</strong> {m.signale}</p>}
                      {m.interdits && <p className="text-xs text-destructive"><strong>{L("Nécessités et interdits", "Requirements and prohibitions", "Vereisten en verboden")} :</strong> {m.interdits}</p>}
                      <p className="text-xs text-amber-600 dark:text-amber-400 flex items-center gap-1">
                        <AlertTriangle className="h-3 w-3" />
                        {L("Toute Marque est soumise à la validation de l'Orga, deux mois avant l'événement.", "Every Mark must be approved by the Orga, two months before the event.", "Elk Merk moet twee maanden voor het evenement door de Orga worden goedgekeurd.")}
                      </p>
                    </div>
                  );
                })()}
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">{t('factions.descriptionShort')}</Label>
                <Textarea
                  id="description"
                  value={formData.descriptionCourte}
                  onChange={(e) => setFormData({ ...formData, descriptionCourte: e.target.value })}
                  placeholder={t('factions.descriptionPlaceholder')}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="background">{t('factions.background')}</Label>
                <Textarea
                  id="background"
                  value={formData.background}
                  onChange={(e) => setFormData({ ...formData, background: e.target.value })}
                  placeholder={t('factions.backgroundPlaceholder')}
                  rows={6}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="contactEmail">{t('factions.email')}</Label>
                <Input
                  id="contactEmail"
                  type="email"
                  value={formData.contactEmail}
                  onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                  placeholder={t('factions.emailPlaceholder')}
                />
                <p className="text-xs text-muted-foreground">{t('factions.emailNote')}</p>
              </div>

              <div className="flex gap-3 pt-4">
                <Button onClick={sauvegarderFaction} className="flex-1 gap-2">
                  <Save className="h-4 w-4" />
                  {t('factions.save')}
                </Button>
                <Button onClick={() => setShowForm(false)} variant="outline">
                  {t('factions.cancel')}
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {factions.length === 0 ? (
              <Card className="ornament-border text-center py-12">
                <CardContent>
                  <Shield className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                  <p className="text-xl text-muted-foreground mb-4">{t('factions.none')}</p>
                  <Button onClick={() => setShowForm(true)} className="gap-2">
                    <Plus className="h-5 w-5" />
                    {t('factions.createFirst')}
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid md:grid-cols-2 gap-6">
                {factions.map((faction) => (
                  <Card key={faction.id} className="ornament-border">
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <span>{faction.nom}</span>
                        <span className={`text-xs px-2 py-1 rounded ${
                          faction.statut === "active" ? "bg-green-500/20 text-green-700" : "bg-gray-500/20 text-gray-700"
                        }`}>
                          {faction.statut}
                        </span>
                      </CardTitle>
                      <CardDescription>
                        {t('factions.createdOn')} {faction.dateCreation}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {faction.propriete && (
                        <div>
                          <p className="text-sm font-medium mb-1">{t('factions.propertyLabel')}</p>
                          <span className="text-xs bg-secondary/20 px-2 py-1 rounded">{faction.propriete}</span>
                        </div>
                      )}
                      {faction.batiment && (
                        <div className="space-y-1">
                          <p className="text-sm font-medium text-primary">{faction.batiment.nom}</p>
                          <p className="text-xs text-muted-foreground">{faction.batiment.type}</p>
                          <p className="text-xs bg-muted/50 p-2 rounded">{faction.batiment.avantages}</p>
                        </div>
                      )}
                      {faction.origines.length > 0 && (
                        <div>
                          <p className="text-sm font-medium mb-1">{L("Origines", "Origins", "Oorsprongen")}</p>
                          <div className="flex flex-wrap gap-1">
                            {faction.origines.map((o) => (
                              <span key={o} className="text-xs bg-primary/10 px-2 py-1 rounded font-medium">{o}</span>
                            ))}
                          </div>
                        </div>
                      )}
                      {faction.marqueCollective && (
                        <div>
                          <p className="text-sm font-medium mb-1">{L("Marque collective", "Collective Mark", "Collectief Merk")}</p>
                          <span className="text-xs bg-secondary/20 px-2 py-1 rounded">{faction.marqueCollective}</span>
                        </div>
                      )}
                      {faction.descriptionCourte && (
                        <p className="text-sm text-muted-foreground italic">{faction.descriptionCourte}</p>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Factions;
