import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Scroll, Plus, X, Save, AlertCircle, Info } from "lucide-react";
import { toast } from "sonner";
import { especes } from "@/data/especes";
import { competencesDisponibles } from "@/data/competences";
import { titresCarrieres } from "@/data/titres";
import { supabase } from "@/integrations/supabase/client";
import { CharacterSheet } from "@/components/CharacterSheet";
import { BlankCharacterSheet } from "@/components/BlankCharacterSheet";

interface Personnage {
  id: string;
  nomTO: string;
  nomTI: string;
  faction: string;
  espece: string;
  origine: string;
  goOrigine: number;
  pa: number;
  pv: number;
  abime: number;
  abimeMax: number;
  scoreBagarre: number;
  foi: number;
  pointsCreation: number;
  pointsDepenses: number;
  competences: { nom: string; cout: number }[];
  pierresDeVie: number;
  materielTO: string[];
  email: string;
}

const Personnages = () => {
  const [personnages, setPersonnages] = useState<Personnage[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [recapitulatif, setRecapitulatif] = useState<string[]>([]);
  const [factions, setFactions] = useState<{ nom: string; titres: string[] }[]>([]);

  const [formData, setFormData] = useState<Omit<Personnage, "id">>({
    nomTO: "",
    nomTI: "",
    faction: "",
    espece: "",
    origine: "",
    goOrigine: 0,
    pa: 0,
    pv: 1,
    abime: 10,
    abimeMax: 10,
    scoreBagarre: 1,
    foi: 1,
    pointsCreation: 12,
    pointsDepenses: 0,
    competences: [],
    pierresDeVie: 0,
    materielTO: [],
    email: ""
  });

  const pointsRestants = formData.pointsCreation - formData.pointsDepenses;

  useEffect(() => {
    const fetchFactions = async () => {
      const { data, error } = await supabase
        .from('factions')
        .select('nom, titres')
        .eq('statut', 'active');
      
      if (error) {
        console.error("Erreur lors du chargement des factions:", error);
      } else if (data) {
        setFactions(data);
      }
    };
    fetchFactions();
  }, []);

  useEffect(() => {
    if (formData.espece) {
      const especeData = especes.find(e => e.nom === formData.espece);
      if (especeData) {
        let basePV = 1;
        let basePA = 0;
        let baseAbime = 10;
        let baseAbimeMax = 10;

        // Appliquer les effets de l'espèce
        basePV = 1 + especeData.effetsPV;
        basePA = especeData.effetsPA;

        // Êtres mécaniques: pas d'abîme
        if (especeData.nom === "Êtres Mécaniques") {
          baseAbime = 0;
          baseAbimeMax = 0;
        }

        // Calculer les bonus d'armure
        let bonusPA = 0;
        formData.competences.forEach(comp => {
          if (comp.nom === "Armure niv.1" || comp.nom === "Armure niv.2" || comp.nom === "Armure niv.3") {
            bonusPA += 1;
          }
        });

        // Calculer le score de bagarre
        let scoreBagarre = basePV;
        formData.competences.forEach(comp => {
          if (comp.nom === "Sauvage niv.1" || comp.nom === "Sauvage niv.2" || comp.nom === "Sauvage niv.3") {
            scoreBagarre += 1;
          }
        });

        setFormData(prev => ({
          ...prev,
          pv: basePV,
          pa: basePA + bonusPA,
          abime: baseAbime,
          abimeMax: baseAbimeMax,
          scoreBagarre: scoreBagarre
        }));
        
        genererRecapitulatif();
      }
    }
  }, [formData.espece, formData.competences]);

  const getInterditsFromFaction = (): string[] => {
    const faction = factions.find(f => f.nom === formData.faction);
    if (!faction || !faction.titres) return [];

    let interdits: string[] = [];
    faction.titres.forEach(titreNom => {
      const titre = titresCarrieres.find(t => t.nom === titreNom);
      if (titre && titre.incompatible) {
        const incompatibles = titre.incompatible.split(',').map(s => s.trim());
        interdits = [...interdits, ...incompatibles];
      }
    });
    
    return interdits;
  };

  const genererRecapitulatif = () => {
    const recap: string[] = [];
    
    if (formData.espece) {
      const especeData = especes.find(e => e.nom === formData.espece);
      if (especeData) {
        recap.push(`🧬 ESPÈCE: ${especeData.nom}`);
        recap.push(`   Gratuit: ${especeData.gratuit}`);
        recap.push(`   Interdit: ${especeData.interdit}`);
        recap.push(`   Spécial: ${especeData.special}`);
        if (especeData.effetsPV !== 0) recap.push(`   PV: ${especeData.effetsPV > 0 ? '+' : ''}${especeData.effetsPV}/localisation`);
        if (especeData.effetsPA !== 0) recap.push(`   PA: ${especeData.effetsPA > 0 ? '+' : ''}${especeData.effetsPA}`);
      }
    }

    if (formData.competences.length > 0) {
      recap.push('');
      recap.push('⚔️ COMPÉTENCES:');
      formData.competences.forEach(comp => {
        const compData = competencesDisponibles.find(c => c.nom === comp.nom);
        if (compData) {
          recap.push(`   • ${compData.nom} (${compData.cout} pts) - ${compData.effet}`);
        }
      });
    }

    recap.push('');
    recap.push('📊 STATISTIQUES:');
    recap.push(`   PV par localisation: ${formData.pv}`);
    recap.push(`   PA par localisation: ${formData.pa}`);
    recap.push(`   Score de Bagarre: ${formData.scoreBagarre}`);
    if (formData.espece !== "Êtres Mécaniques") {
      recap.push(`   Abîme: ${formData.abime}/${formData.abimeMax}`);
    } else {
      recap.push(`   Abîme: N/A (Être Mécanique)`);
    }
    recap.push(`   Pierres de Vie: ${formData.pierresDeVie}`);
    recap.push(`   Cartes Foi: ${formData.foi}`);

    setRecapitulatif(recap);
  };

  const ajouterCompetence = (nomComp: string) => {
    const competence = competencesDisponibles.find(c => c.nom === nomComp);
    if (!competence) return;

    // Vérifier si déjà ajoutée
    if (formData.competences.some(c => c.nom === nomComp)) {
      toast.error("Cette compétence est déjà ajoutée");
      return;
    }

    // Vérifier les points
    if (formData.pointsDepenses + competence.cout > formData.pointsCreation) {
      toast.error(`Points de création insuffisants ! Disponible: ${pointsRestants} pts`);
      return;
    }

    // Vérifier les prérequis
    if (competence.prerequis) {
      const prerequisExiste = formData.competences.some(c => c.nom === competence.prerequis);
      if (!prerequisExiste) {
        toast.error(`Prérequis manquant: ${competence.prerequis}`);
        return;
      }
    }

    // Vérifier l'espèce (interdictions)
    if (formData.espece) {
      const especeData = especes.find(e => e.nom === formData.espece);
      if (especeData && especeData.interdit.includes(competence.nom)) {
        toast.error(`Cette compétence est interdite pour l'espèce ${especeData.nom}`);
        return;
      }
    }

    // Vérifier les interdits de la faction
    const interdits = getInterditsFromFaction();
    const isInterdit = interdits.some(interdit => 
      competence.nom.toLowerCase().includes(interdit.toLowerCase()) ||
      interdit.toLowerCase().includes(competence.nom.toLowerCase())
    );
    if (isInterdit) {
      toast.error(`Cette compétence est interdite par votre faction`);
      return;
    }

    // Ajouter la compétence
    let nouveauxPierres = formData.pierresDeVie;
    
    // Calcul des pierres de vie pour les compétences magiques/spirituelles
    if (competence.nom === "Tisseur" || competence.nom === "Clerc") {
      // Pour Tisseur et Clerc: Calcul basé sur les sorts
      // Pierres = 10 + (nb sorts × plus haut niveau de sort)
      const sortsDansCompetences = [...formData.competences, { nom: competence.nom, cout: competence.cout }]
        .filter(c => {
          const sortKeywords = ["Sort", "Magie", "Rituel", "Arcane"];
          return sortKeywords.some(keyword => c.nom.includes(keyword)) && c.cout >= 1 && c.cout <= 4;
        });
      
      const plusHautNiveau = sortsDansCompetences.length > 0 
        ? Math.max(...sortsDansCompetences.map(s => s.cout))
        : 0;
      
      const nbSorts = sortsDansCompetences.length;
      
      // Enlever l'ancien calcul si Tisseur/Clerc était déjà présent
      const tisseurOuClercDejaPresent = formData.competences.some(c => 
        c.nom === "Tisseur" || c.nom === "Clerc"
      );
      
      if (tisseurOuClercDejaPresent) {
        // Recalculer depuis zéro
        nouveauxPierres = 10 + (nbSorts * plusHautNiveau);
      } else {
        nouveauxPierres += 10 + (nbSorts * plusHautNiveau);
      }
    } else if (competence.nom === "Cérémonialiste" || competence.nom === "Ritualiste") {
      nouveauxPierres += 10;
    } else if (competence.nom === "Initié") {
      nouveauxPierres += 20;
    }
    
    if (competence.nom.includes("Transcendance")) {
      if (competence.nom === "Transcendance niv.1") nouveauxPierres += 2;
      if (competence.nom === "Transcendance niv.2") nouveauxPierres += 4;
      if (competence.nom === "Transcendance niv.3") nouveauxPierres += 8;
    }

    setFormData({
      ...formData,
      competences: [...formData.competences, { nom: competence.nom, cout: competence.cout }],
      pointsDepenses: formData.pointsDepenses + competence.cout,
      pierresDeVie: nouveauxPierres
    });

    toast.success(`${competence.nom} ajoutée !`);
  };

  const retirerCompetence = (index: number) => {
    const comp = formData.competences[index];
    const competence = competencesDisponibles.find(c => c.nom === comp.nom);
    
    let nouveauxPierres = formData.pierresDeVie;
    if (competence) {
      if (competence.nom === "Tisseur" || competence.nom === "Clerc") {
        // Recalculer les pierres pour Tisseur/Clerc en fonction des sorts restants
        const competencesRestantes = formData.competences.filter((_, i) => i !== index);
        const sortsDansCompetences = competencesRestantes
          .filter(c => {
            const sortKeywords = ["Sort", "Magie", "Rituel", "Arcane"];
            return sortKeywords.some(keyword => c.nom.includes(keyword)) && c.cout >= 1 && c.cout <= 4;
          });
        
        const plusHautNiveau = sortsDansCompetences.length > 0 
          ? Math.max(...sortsDansCompetences.map(s => s.cout))
          : 0;
        
        const nbSorts = sortsDansCompetences.length;
        nouveauxPierres = 10 + (nbSorts * plusHautNiveau);
        
      } else if (competence.nom === "Cérémonialiste" || competence.nom === "Ritualiste") {
        nouveauxPierres -= 10;
      } else if (competence.nom === "Initié") {
        nouveauxPierres -= 20;
      }
      
      if (competence.nom.includes("Transcendance")) {
        if (competence.nom === "Transcendance niv.1") nouveauxPierres -= 2;
        if (competence.nom === "Transcendance niv.2") nouveauxPierres -= 4;
        if (competence.nom === "Transcendance niv.3") nouveauxPierres -= 8;
      }
    }

    setFormData({
      ...formData,
      competences: formData.competences.filter((_, i) => i !== index),
      pointsDepenses: formData.pointsDepenses - (competence?.cout || 0),
      pierresDeVie: nouveauxPierres
    });
  };

  const sauvegarderPersonnage = () => {
    if (!formData.nomTO.trim() || !formData.nomTI.trim()) {
      toast.error("Les noms TO et TI sont requis");
      return;
    }

    if (!formData.espece) {
      toast.error("Vous devez choisir une espèce");
      return;
    }

    // Validation de l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email)) {
      toast.error("Une adresse email valide est requise");
      return;
    }

    const nouveauPersonnage: Personnage = {
      id: crypto.randomUUID(),
      ...formData
    };

    setPersonnages([...personnages, nouveauPersonnage]);
    setShowForm(false);
    setFormData({
      nomTO: "",
      nomTI: "",
      faction: "",
      espece: "",
      origine: "",
      goOrigine: 0,
      pa: 0,
      pv: 1,
      abime: 10,
      abimeMax: 10,
      scoreBagarre: 1,
      foi: 1,
      pointsCreation: 12,
      pointsDepenses: 0,
      competences: [],
      pierresDeVie: 0,
      materielTO: [],
      email: ""
    });
    setRecapitulatif([]);
    
    toast.success("Personnage créé avec succès !");
  };

  // Grouper les compétences par catégorie
  const categoriesCompetences = Array.from(new Set(competencesDisponibles.map(c => c.categorie)));

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
              <Scroll className="h-8 w-8 text-primary" />
              <h1 className="text-3xl font-bold text-primary">Gestion des Personnages</h1>
            </div>
            <div className="flex gap-2">
              <BlankCharacterSheet />
              {!showForm && (
                <Button onClick={() => setShowForm(true)} className="gap-2">
                  <Plus className="h-5 w-5" />
                  Créer un Personnage
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {showForm ? (
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Formulaire principal */}
            <div className="lg:col-span-2 space-y-6">
              <Card className="ornament-border">
                <CardHeader>
                  <CardTitle>Informations de base</CardTitle>
                  <CardDescription>
                    Points de création: {pointsRestants}/{formData.pointsCreation}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="nomTO">Nom Time-Out (TO) *</Label>
                      <Input
                        id="nomTO"
                        value={formData.nomTO}
                        onChange={(e) => setFormData({ ...formData, nomTO: e.target.value })}
                        placeholder="Votre vrai prénom"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="nomTI">Nom Time-In (TI) *</Label>
                      <Input
                        id="nomTI"
                        value={formData.nomTI}
                        onChange={(e) => setFormData({ ...formData, nomTI: e.target.value })}
                        placeholder="Nom du personnage"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="faction">Faction (optionnel)</Label>
                    <Select
                      value={formData.faction}
                      onValueChange={(value) => setFormData({ ...formData, faction: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Aucune faction sélectionnée" />
                      </SelectTrigger>
                      <SelectContent>
                        {factions.map((faction) => (
                          <SelectItem key={faction.nom} value={faction.nom}>
                            {faction.nom}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {formData.faction && factions.find(f => f.nom === formData.faction)?.titres && factions.find(f => f.nom === formData.faction)?.titres.length > 0 && (
                      <p className="text-xs text-muted-foreground">
                        Titres de cette faction : {factions.find(f => f.nom === formData.faction)?.titres.join(", ")}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="espece">Espèce *</Label>
                    <Select value={formData.espece} onValueChange={(value) => setFormData({ ...formData, espece: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Choisir une espèce" />
                      </SelectTrigger>
                      <SelectContent className="max-h-[400px]">
                        <SelectGroup>
                          <SelectLabel>Espèces Standard</SelectLabel>
                          {especes.slice(0, 32).map((esp) => (
                            <SelectItem key={esp.nom} value={esp.nom}>
                              <div className="flex flex-col">
                                <span className="font-medium">{esp.nom}</span>
                                <span className="text-xs text-muted-foreground">Gratuit: {esp.gratuit}</span>
                                <span className="text-xs text-destructive">Interdit: {esp.interdit}</span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectGroup>
                        <SelectGroup>
                          <SelectLabel className="text-primary font-bold">Avec accord de l'Orga</SelectLabel>
                          {especes.slice(32).map((esp) => (
                            <SelectItem key={esp.nom} value={esp.nom}>
                              <div className="flex flex-col">
                                <span className="font-medium">{esp.nom}</span>
                                <span className="text-xs text-muted-foreground">Gratuit: {esp.gratuit}</span>
                                <span className="text-xs text-destructive">Interdit: {esp.interdit}</span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="origine">Origine de votre personnage *</Label>
                    <Select 
                      value={formData.origine} 
                      onValueChange={(value) => {
                        const goValues: { [key: string]: number } = {
                          "Parlos": 12,
                          "Îles éparses": 6,
                          "Nations du Dominion": 6,
                          "Nations extérieures": 6
                        };
                        setFormData({ 
                          ...formData, 
                          origine: value,
                          goOrigine: goValues[value] || 0
                        });
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Choisir une origine" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Parlos">Parlos (12 GO)</SelectItem>
                        <SelectItem value="Îles éparses">Îles éparses (6 GO)</SelectItem>
                        <SelectItem value="Nations du Dominion">Nations du Dominion (6 GO)</SelectItem>
                        <SelectItem value="Nations extérieures">Nations extérieures (6 GO)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              <Card className="ornament-border">
                <CardHeader>
                  <CardTitle>Compétences</CardTitle>
                  <CardDescription>
                    Sélectionnez vos compétences (Points restants: {pointsRestants})
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {formData.faction && getInterditsFromFaction().length > 0 && (
                    <div className="text-xs text-destructive bg-destructive/10 p-3 rounded-lg">
                      <strong>Compétences interdites par votre faction:</strong> {getInterditsFromFaction().join(", ")}
                    </div>
                  )}
                  <Select onValueChange={ajouterCompetence}>
                    <SelectTrigger>
                      <SelectValue placeholder="Ajouter une compétence" />
                    </SelectTrigger>
                    <SelectContent className="max-h-[400px]">
                      {categoriesCompetences.map((categorie) => (
                        <SelectGroup key={categorie}>
                          <SelectLabel>{categorie}</SelectLabel>
                          {competencesDisponibles
                            .filter(c => c.categorie === categorie)
                            .map((comp) => {
                              const interdits = getInterditsFromFaction();
                              const isInterdit = interdits.some(interdit => 
                                comp.nom.toLowerCase().includes(interdit.toLowerCase()) ||
                                interdit.toLowerCase().includes(comp.nom.toLowerCase())
                              );
                              
                              return (
                                <SelectItem 
                                  key={comp.nom} 
                                  value={comp.nom}
                                  disabled={formData.competences.some(c => c.nom === comp.nom) || isInterdit}
                                >
                                  <div className="flex flex-col">
                                    <span className={`font-medium ${isInterdit ? 'text-destructive' : ''}`}>
                                      {comp.nom} ({comp.cout} pts) {isInterdit ? '(Interdit)' : ''}
                                    </span>
                                    <span className="text-xs text-muted-foreground">{comp.effet}</span>
                                    {comp.prerequis && (
                                      <span className="text-xs text-primary">Prérequis: {comp.prerequis}</span>
                                    )}
                                  </div>
                                </SelectItem>
                              );
                            })}
                        </SelectGroup>
                      ))}
                    </SelectContent>
                  </Select>

                  <div className="space-y-2">
                    {formData.competences.map((comp, idx) => {
                      const compData = competencesDisponibles.find(c => c.nom === comp.nom);
                      return (
                        <div key={idx} className="flex items-start gap-2 bg-accent/20 p-3 rounded-lg">
                          <div className="flex-1">
                            <p className="font-medium text-sm">{comp.nom} <span className="text-primary">({comp.cout} pts)</span></p>
                            {compData && (
                              <p className="text-xs text-muted-foreground mt-1">{compData.effet}</p>
                            )}
                          </div>
                          <Button onClick={() => retirerCompetence(idx)} variant="ghost" size="icon" className="h-8 w-8">
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      );
                    })}
                  </div>

                  {formData.competences.length === 0 && (
                    <div className="text-center py-8 text-muted-foreground">
                      <AlertCircle className="h-12 w-12 mx-auto mb-2 opacity-50" />
                      <p>Aucune compétence sélectionnée</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card className="ornament-border">
                <CardHeader>
                  <CardTitle>Email pour l'envoi de la Fiche</CardTitle>
                  <CardDescription>
                    Recevez votre fiche de personnage par email
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email pour l'envoi de la Fiche de personnage *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="email@exemple.com"
                    />
                  </div>
                </CardContent>
              </Card>

              <div className="flex gap-3">
                <Button onClick={sauvegarderPersonnage} className="flex-1 gap-2">
                  <Save className="h-4 w-4" />
                  Sauvegarder le Personnage
                </Button>
                <Button onClick={() => setShowForm(false)} variant="outline">
                  Annuler
                </Button>
              </div>
            </div>

            {/* Récapitulatif */}
            <div className="lg:col-span-1">
              <Card className="ornament-border sticky top-24">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Info className="h-5 w-5" />
                    Récapitulatif
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {recapitulatif.length > 0 ? (
                    <div className="bg-muted/30 p-4 rounded-lg font-mono text-xs space-y-1 whitespace-pre-wrap">
                      {recapitulatif.map((ligne, idx) => (
                        <div key={idx}>{ligne}</div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      <p className="text-sm">Choisissez votre espèce pour voir le récapitulatif</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {personnages.length === 0 ? (
              <Card className="ornament-border text-center py-12">
                <CardContent>
                  <Scroll className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                  <p className="text-xl text-muted-foreground mb-4">Aucun personnage créé</p>
                  <Button onClick={() => setShowForm(true)} className="gap-2">
                    <Plus className="h-5 w-5" />
                    Créer votre premier personnage
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {personnages.map((perso) => (
                  <Card key={perso.id} className="ornament-border">
                    <CardHeader>
                      <CardTitle>{perso.nomTI}</CardTitle>
                      <CardDescription>
                        {perso.espece} {perso.faction && `- ${perso.faction}`}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="grid grid-cols-3 gap-2 text-sm">
                        <div className="bg-muted/50 p-2 rounded text-center">
                          <p className="text-xs text-muted-foreground">PV/loc</p>
                          <p className="font-bold text-primary">{perso.pv}</p>
                        </div>
                        <div className="bg-muted/50 p-2 rounded text-center">
                          <p className="text-xs text-muted-foreground">PA/loc</p>
                          <p className="font-bold text-primary">{perso.pa}</p>
                        </div>
                        <div className="bg-muted/50 p-2 rounded text-center">
                          <p className="text-xs text-muted-foreground">Bagarre</p>
                          <p className="font-bold text-primary">{perso.scoreBagarre}</p>
                        </div>
                      </div>
                      {perso.espece !== "Êtres Mécaniques" && (
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Abîme:</span>
                          <span className="font-bold">{perso.abime}/{perso.abimeMax}</span>
                        </div>
                      )}
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Compétences:</span>
                        <span className="font-bold">{perso.competences.length}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Pierres de Vie:</span>
                        <span className="font-bold">{perso.pierresDeVie}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Points utilisés:</span>
                        <span className="font-bold">{perso.pointsDepenses}/{perso.pointsCreation}</span>
                      </div>
                       <CharacterSheet 
                        character={{
                          nom: perso.nomTI,
                          prenom: perso.nomTO,
                          faction: perso.faction || "Aucune",
                          espece: perso.espece,
                          competences: perso.competences.map(c => c.nom),
                          pvTotal: perso.pv,
                          paTotal: perso.pa,
                          scoreBagarre: perso.scoreBagarre,
                          email: perso.email,
                          pierresDeVie: perso.pierresDeVie,
                          abime: perso.abime,
                          goOrigine: perso.goOrigine,
                          especeGratuit: especes.find(e => e.nom === perso.espece)?.gratuit,
                          especeInterdit: especes.find(e => e.nom === perso.espece)?.interdit
                        }}
                      />
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

export default Personnages;
