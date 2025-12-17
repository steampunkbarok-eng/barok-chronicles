import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Shield, ArrowLeft, Save, Plus, X, Info } from "lucide-react";
import { toast } from "sonner";
import { typesBatiments, batimentsUniques, navires } from "@/data/batiments";
import { titresCarrieres, Titre } from "@/data/titres";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/contexts/LanguageContext";
import { translateGameData } from "@/i18n/gameData";
import { openFactionSheet } from "@/components/FactionSheet";

interface Faction {
  id: string;
  nom: string;
  marquesTotal: number;
  marquesDepensees: number;
  marquesDisponibles: number;
  propriete: string;
  batiment: { type: string; nom: string; avantages: string } | null;
  titres: string[];
  descriptionCourte: string;
  background: string;
  contactEmail: string;
  dateCreation: string;
  statut: "active" | "inactive";
}

const Factions = () => {
  const { t, language } = useLanguage();
  const [factions, setFactions] = useState<Faction[]>([]);
  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState<Omit<Faction, "id" | "marquesDisponibles" | "dateCreation">>({
    nom: "",
    marquesTotal: 4,
    marquesDepensees: 0,
    propriete: "",
    batiment: null,
    titres: [],
    descriptionCourte: "",
    background: "",
    contactEmail: "",
    statut: "active"
  });

  const calculerMarquesDisponibles = () => {
    return formData.marquesTotal - (formData.marquesDepensees * 2);
  };

  const ajouterBatiment = (nom: string, type: string, avantages: string) => {
    if (formData.batiment) {
      toast.error("Vous avez déjà un bâtiment. Retirez-le d'abord.");
      return;
    }
    // Le bâtiment est maintenant gratuit
    setFormData({
      ...formData,
      batiment: { type, nom, avantages }
    });
  };

  const verifierIncompatibilite = (nouveauTitre: string): boolean => {
    const titreData = titresCarrieres.find(t => t.nom === nouveauTitre);
    if (!titreData) return false;

    // Vérifier si un titre déjà sélectionné est incompatible avec le nouveau
    for (const titreActuel of formData.titres) {
      const titreActuelData = titresCarrieres.find(t => t.nom === titreActuel);
      
      // Vérifier incompatibilité du nouveau titre avec les titres actuels
      if (titreData.incompatible && titreData.incompatible.includes(titreActuel)) {
        toast.error(`${nouveauTitre} est incompatible avec ${titreActuel}`);
        return true;
      }
      
      // Vérifier incompatibilité des titres actuels avec le nouveau titre
      if (titreActuelData?.incompatible && titreActuelData.incompatible.includes(nouveauTitre)) {
        toast.error(`${nouveauTitre} est incompatible avec ${titreActuel}`);
        return true;
      }
    }

    return false;
  };

  const ajouterTitre = (nomTitre: string) => {
    if (formData.titres.length >= 2) {
      toast.error("Maximum 2 titres par faction");
      return;
    }
    if (formData.titres.includes(nomTitre)) {
      toast.error("Ce titre est déjà ajouté");
      return;
    }
    
    // Vérifier les incompatibilités
    if (verifierIncompatibilite(nomTitre)) {
      return;
    }
    
    if (calculerMarquesDisponibles() >= 2) {
      setFormData({
        ...formData,
        titres: [...formData.titres, nomTitre],
        marquesDepensees: formData.marquesDepensees + 1
      });
    } else {
      toast.error("Marques de destinée insuffisantes (coût: 2 marques)");
    }
  };

  const retirerTitre = (index: number) => {
    const nouveauxTitres = [...formData.titres];
    nouveauxTitres.splice(index, 1);
    setFormData({
      ...formData,
      titres: nouveauxTitres,
      marquesDepensees: formData.marquesDepensees - 1
    });
  };

  const retirerBatiment = () => {
    setFormData({
      ...formData,
      batiment: null
    });
  };

  const getTitreDisabledStatus = (titre: Titre): boolean => {
    // Déjà sélectionné
    if (formData.titres.includes(titre.nom)) return true;

    // Vérifier les incompatibilités avec les titres déjà sélectionnés
    for (const titreActuel of formData.titres) {
      const titreActuelData = titresCarrieres.find(t => t.nom === titreActuel);
      
      if (titre.incompatible && titre.incompatible.includes(titreActuel)) {
        return true;
      }
      
      if (titreActuelData?.incompatible && titreActuelData.incompatible.includes(titre.nom)) {
        return true;
      }
    }

    return false;
  };

  const sauvegarderFaction = async () => {
    if (!formData.nom.trim()) {
      toast.error("Le nom de la faction est requis");
      return;
    }

    // Validation de l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.contactEmail.trim() || !emailRegex.test(formData.contactEmail)) {
      toast.error("Une adresse email valide est requise");
      return;
    }

    const nouvelleFaction: Faction = {
      id: crypto.randomUUID(),
      ...formData,
      marquesDisponibles: calculerMarquesDisponibles(),
      dateCreation: new Date().toLocaleDateString("fr-FR")
    };

    try {
      // Sauvegarder dans la base de données
      const { data: dbData, error: dbError } = await supabase
        .from('factions')
        .insert({
          nom: nouvelleFaction.nom,
          marques_total: nouvelleFaction.marquesTotal,
          marques_depensees: nouvelleFaction.marquesDepensees,
          marques_disponibles: nouvelleFaction.marquesDisponibles,
          propriete_terrienne: nouvelleFaction.propriete || null,
          batiment: nouvelleFaction.batiment ? JSON.stringify(nouvelleFaction.batiment) : null,
          titres: nouvelleFaction.titres,
          description_courte: nouvelleFaction.descriptionCourte,
          background: nouvelleFaction.background,
          contact_email: nouvelleFaction.contactEmail,
          statut: nouvelleFaction.statut
        })
        .select()
        .single();

      if (dbError) throw dbError;

      // Envoyer les emails
      const { data: emailData, error: emailError } = await supabase.functions.invoke('send-faction-email', {
        body: {
          factionName: nouvelleFaction.nom,
          contactEmail: nouvelleFaction.contactEmail,
          marques: {
            total: nouvelleFaction.marquesTotal,
            disponibles: nouvelleFaction.marquesDisponibles
          },
          propriete: nouvelleFaction.propriete || null,
          batiment: nouvelleFaction.batiment,
          titres: nouvelleFaction.titres,
          descriptionCourte: nouvelleFaction.descriptionCourte,
          background: nouvelleFaction.background
        }
      });

      if (emailError) {
        console.error("Erreur d'envoi d'email:", emailError);
        toast.error("La faction a été créée mais l'envoi d'email a échoué");
      }

      setFactions([...factions, nouvelleFaction]);
      setShowForm(false);
      setFormData({
        nom: "",
        marquesTotal: 4,
        marquesDepensees: 0,
        propriete: "",
        batiment: null,
        titres: [],
        descriptionCourte: "",
        background: "",
        contactEmail: "",
        statut: "active"
      });
      
      toast.success(language === 'en' 
        ? "Faction created successfully! Emails have been sent." 
        : "Faction créée avec succès ! Les emails ont été envoyés.");
      
      // Ouvrir le PDF de la faction
      openFactionSheet(nouvelleFaction, language);
    } catch (error) {
      console.error("Erreur lors de la sauvegarde:", error);
      toast.error(language === 'en' 
        ? "An error occurred while creating the faction" 
        : "Une erreur est survenue lors de la création de la faction");
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
                {t('factions.marksAvailable')}: {calculerMarquesDisponibles()}/{formData.marquesTotal}
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
                <p className="text-xs text-muted-foreground">
                  {t('factions.propertyNote')}
                </p>
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
                        <p className="text-xs text-muted-foreground mb-2">{formData.batiment.type === 'Bâtiment' ? (language === 'en' ? 'Building' : 'Bâtiment') : (language === 'en' ? 'Ship' : 'Navire')}</p>
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

              <div className="space-y-2">
                <Label>{t('factions.titles')}</Label>
                <Select onValueChange={ajouterTitre} disabled={formData.titres.length >= 2}>
                  <SelectTrigger>
                    <SelectValue placeholder={formData.titres.length >= 2 ? t('factions.titlesMaxReached') : t('factions.titlesPlaceholder')} />
                  </SelectTrigger>
                  <SelectContent className="max-h-[400px]">
                    {titresCarrieres.map((titre) => {
                      const isDisabled = getTitreDisabledStatus(titre);
                      return (
                        <SelectItem 
                          key={titre.nom} 
                          value={titre.nom}
                          disabled={isDisabled}
                        >
                          <div className="flex flex-col">
                            <span className={`font-medium ${isDisabled ? 'opacity-50' : ''}`}>{translateGameData(titre.nom, 'titre', language)}</span>
                            {titre.prerequis && (
                              <span className="text-xs text-muted-foreground">{t('selection.prerequisites')}: {translateGameData(titre.prerequis, 'titrePrerequisit', language)}</span>
                            )}
                            {titre.incompatible && (
                              <span className="text-xs text-destructive">{t('selection.incompatible')}: {titre.incompatible.split(', ').map(inc => translateGameData(inc.trim(), 'titre', language)).join(', ')}</span>
                            )}
                          </div>
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.titres.map((titre, idx) => (
                    <div key={idx} className="flex items-center gap-2 bg-primary/10 px-3 py-2 rounded-lg">
                      <span className="text-sm font-medium">{translateGameData(titre, 'titre', language)}</span>
                      <button onClick={() => retirerTitre(idx)} className="hover:text-destructive">
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
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
                <p className="text-xs text-muted-foreground">
                  {t('factions.emailNote')}
                </p>
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
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">{t('factions.marksAvailableShort')}</span>
                        <span className="font-bold">{faction.marquesDisponibles}/{faction.marquesTotal}</span>
                      </div>
                      {faction.propriete && (
                        <div>
                          <p className="text-sm font-medium mb-1">{t('factions.propertyLabel')}</p>
                          <span className="text-xs bg-secondary/20 px-2 py-1 rounded">
                            {faction.propriete}
                          </span>
                        </div>
                      )}
                      {faction.batiment && (
                        <div className="space-y-1">
                          <p className="text-sm font-medium text-primary">{faction.batiment.nom}</p>
                          <p className="text-xs text-muted-foreground">{faction.batiment.type}</p>
                          <p className="text-xs bg-muted/50 p-2 rounded">{faction.batiment.avantages}</p>
                        </div>
                      )}
                      {faction.titres.length > 0 && (
                        <div>
                          <p className="text-sm font-medium mb-1">{t('factions.titlesCareer')}</p>
                          <div className="flex flex-wrap gap-1">
                            {faction.titres.map((titre, idx) => (
                              <span key={idx} className="text-xs bg-primary/10 px-2 py-1 rounded font-medium">
                                {translateGameData(titre, 'titre', language)}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                      {faction.descriptionCourte && (
                        <p className="text-sm text-muted-foreground italic">
                          {faction.descriptionCourte}
                        </p>
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
