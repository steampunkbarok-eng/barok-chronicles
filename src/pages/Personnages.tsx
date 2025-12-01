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
import { useLanguage } from "@/contexts/LanguageContext";
import { translateGameData } from "@/i18n/gameData";

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
  sorts: { niv1: number; niv2: number; niv3: number; niv4: number };
  pierresDeVie: number;
  materielTO: string[];
  email: string;
  nbEvenements: number;
  afficherSortilleges: boolean;
  competencesGratuitesUtilisees: number;
  niveauxSortsGratuitsUtilises: number;
}

const Personnages = () => {
  const { t, language } = useLanguage();
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
    sorts: { niv1: 0, niv2: 0, niv3: 0, niv4: 0 },
    pierresDeVie: 0,
    materielTO: [],
    email: "",
    nbEvenements: 0,
    afficherSortilleges: false,
    competencesGratuitesUtilisees: 0,
    niveauxSortsGratuitsUtilises: 0
  });

  // Calculer le coût des sorts
  const coutSorts = 
    formData.sorts.niv1 * 1 + 
    formData.sorts.niv2 * 2 + 
    formData.sorts.niv3 * 3 + 
    formData.sorts.niv4 * 4;

  const pointsRestants = formData.pointsCreation - formData.pointsDepenses - coutSorts;
  const niveauxSortsGratuitsDisponibles = formData.nbEvenements * 2;
  const niveauxSortsGratuitsRestants = niveauxSortsGratuitsDisponibles - formData.niveauxSortsGratuitsUtilises;
  const competencesGratuitesDisponibles = formData.nbEvenements * 2;
  const competencesGratuitesRestantes = competencesGratuitesDisponibles - formData.competencesGratuitesUtilisees;

  // Sauvegarde automatique dans localStorage
  useEffect(() => {
    if (showForm && (formData.nomTO || formData.nomTI || formData.espece || formData.competences.length > 0)) {
      localStorage.setItem('personnage_en_cours', JSON.stringify(formData));
    }
  }, [formData, showForm]);

  // Charger les données sauvegardées au démarrage
  useEffect(() => {
    const savedData = localStorage.getItem('personnage_en_cours');
    if (savedData && !showForm) {
      try {
        const parsed = JSON.parse(savedData);
        // Vérifier si des données significatives existent
        if (parsed.nomTO || parsed.nomTI || parsed.espece || parsed.competences?.length > 0) {
          toast.info("Brouillon trouvé ! Cliquez sur 'Créer un Personnage' pour le restaurer.");
        }
      } catch (error) {
        console.error("Erreur lors du chargement du brouillon:", error);
      }
    }
  }, []);

  // Restaurer le brouillon lors de l'ouverture du formulaire
  useEffect(() => {
    if (showForm) {
      const savedData = localStorage.getItem('personnage_en_cours');
      if (savedData) {
        try {
          const parsed = JSON.parse(savedData);
          if (parsed.nomTO || parsed.nomTI || parsed.espece || parsed.competences?.length > 0) {
            setFormData(parsed);
            toast.success("Brouillon restauré !");
          }
        } catch (error) {
          console.error("Erreur lors de la restauration du brouillon:", error);
        }
      }
    }
  }, [showForm]);

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
  }, [formData.espece, formData.competences, formData.nbEvenements]);

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
    
    // Événements et compétences gratuites
    if (formData.nbEvenements > 0) {
      const competencesGratuites = formData.nbEvenements * 2;
      recap.push(`🎭 ÉVÉNEMENTS: ${formData.nbEvenements}`);
      recap.push(`   Compétences gratuites disponibles: ${competencesGratuites}`);
      recap.push(`   ⚠️ Respecter les règles d'apprentissage et le Roleplay en jeu`);
      recap.push('');
    }
    
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

    // Ajouter les sorts si Tisseur ou Clerc
    if (formData.competences.some(c => c.nom === "Tisseur" || c.nom === "Clerc") && 
        (formData.sorts.niv1 > 0 || formData.sorts.niv2 > 0 || formData.sorts.niv3 > 0 || formData.sorts.niv4 > 0)) {
      recap.push('');
      recap.push('✨ SORTS:');
      if (formData.sorts.niv1 > 0) recap.push(`   • Niveau 1: ${formData.sorts.niv1} sort(s)`);
      if (formData.sorts.niv2 > 0) recap.push(`   • Niveau 2: ${formData.sorts.niv2} sort(s)`);
      if (formData.sorts.niv3 > 0) recap.push(`   • Niveau 3: ${formData.sorts.niv3} sort(s)`);
      if (formData.sorts.niv4 > 0) recap.push(`   • Niveau 4: ${formData.sorts.niv4} sort(s)`);
      const totalSorts = formData.sorts.niv1 + formData.sorts.niv2 + formData.sorts.niv3 + formData.sorts.niv4;
      recap.push(`   Total: ${totalSorts} sort(s) - Coût: ${coutSorts} pts`);
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
    
    // Calcul et affichage des Pierres de Vie avec détail pour Tisseur/Clerc
    const hasTisseurOrClerc = formData.competences.some(c => c.nom === "Tisseur" || c.nom === "Clerc");
    if (hasTisseurOrClerc) {
      const nbSortsTotal = formData.sorts.niv1 + formData.sorts.niv2 + formData.sorts.niv3 + formData.sorts.niv4;
      let plusHautNiveau = 0;
      if (formData.sorts.niv4 > 0) plusHautNiveau = 4;
      else if (formData.sorts.niv3 > 0) plusHautNiveau = 3;
      else if (formData.sorts.niv2 > 0) plusHautNiveau = 2;
      else if (formData.sorts.niv1 > 0) plusHautNiveau = 1;
      recap.push(`   Pierres de Vie: ${formData.pierresDeVie} (10 + ${nbSortsTotal} sorts × niv.${plusHautNiveau})`);
    } else {
      recap.push(`   Pierres de Vie: ${formData.pierresDeVie}`);
    }
    
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

    // Vérifier les points (points de création OU compétences gratuites)
    const peutUtiliserPointsCreation = formData.pointsDepenses + competence.cout <= formData.pointsCreation;
    const peutUtiliserCompetenceGratuite = competencesGratuitesRestantes > 0;
    
    if (!peutUtiliserPointsCreation && !peutUtiliserCompetenceGratuite) {
      toast.error(`Plus de points ni de compétences gratuites disponibles ! Points: ${pointsRestants}, Gratuites: ${competencesGratuitesRestantes}`);
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

    // Déterminer si on utilise une compétence gratuite ou des points
    const utiliseCompetenceGratuite = !peutUtiliserPointsCreation && peutUtiliserCompetenceGratuite;
    
    // Ajouter la compétence
    let nouveauxPierres = formData.pierresDeVie;
    
    // Calcul des pierres de vie pour les compétences magiques/spirituelles
    if (competence.nom === "Tisseur" || competence.nom === "Clerc") {
      // Pour Tisseur et Clerc: Calcul basé sur les sorts sélectionnés
      // Pierres = 10 + (nb sorts × plus haut niveau de sort)
      const nbSortsTotal = formData.sorts.niv1 + formData.sorts.niv2 + formData.sorts.niv3 + formData.sorts.niv4;
      
      // Trouver le plus haut niveau de sort sélectionné
      let plusHautNiveau = 0;
      if (formData.sorts.niv4 > 0) plusHautNiveau = 4;
      else if (formData.sorts.niv3 > 0) plusHautNiveau = 3;
      else if (formData.sorts.niv2 > 0) plusHautNiveau = 2;
      else if (formData.sorts.niv1 > 0) plusHautNiveau = 1;
      
      // Enlever l'ancien calcul si Tisseur/Clerc était déjà présent
      const tisseurOuClercDejaPresent = formData.competences.some(c => 
        c.nom === "Tisseur" || c.nom === "Clerc"
      );
      
      if (tisseurOuClercDejaPresent) {
        // Recalculer depuis zéro
        nouveauxPierres = 10 + (nbSortsTotal * plusHautNiveau);
      } else {
        nouveauxPierres += 10 + (nbSortsTotal * plusHautNiveau);
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
      pointsDepenses: utiliseCompetenceGratuite ? formData.pointsDepenses : formData.pointsDepenses + competence.cout,
      competencesGratuitesUtilisees: utiliseCompetenceGratuite ? formData.competencesGratuitesUtilisees + 1 : formData.competencesGratuitesUtilisees,
      pierresDeVie: nouveauxPierres
    });

    if (utiliseCompetenceGratuite) {
      toast.success(`${competence.nom} ajoutée (compétence gratuite) !`);
    } else {
      toast.success(`${competence.nom} ajoutée !`);
    }
  };

  const retirerCompetence = (index: number) => {
    const comp = formData.competences[index];
    const competence = competencesDisponibles.find(c => c.nom === comp.nom);
    
    // Déterminer si cette compétence a été payée avec des points ou une compétence gratuite
    // On retire d'abord les compétences gratuites (LIFO)
    const competencePayeeAvecGratuite = index >= formData.competences.length - formData.competencesGratuitesUtilisees;
    
    let nouveauxPierres = formData.pierresDeVie;
    if (competence) {
      if (competence.nom === "Tisseur" || competence.nom === "Clerc") {
        // Recalculer les pierres pour Tisseur/Clerc en fonction des sorts sélectionnés
        const nbSortsTotal = formData.sorts.niv1 + formData.sorts.niv2 + formData.sorts.niv3 + formData.sorts.niv4;
        
        // Trouver le plus haut niveau de sort sélectionné
        let plusHautNiveau = 0;
        if (formData.sorts.niv4 > 0) plusHautNiveau = 4;
        else if (formData.sorts.niv3 > 0) plusHautNiveau = 3;
        else if (formData.sorts.niv2 > 0) plusHautNiveau = 2;
        else if (formData.sorts.niv1 > 0) plusHautNiveau = 1;
        
        nouveauxPierres = 10 + (nbSortsTotal * plusHautNiveau);
        
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
      pointsDepenses: competencePayeeAvecGratuite ? formData.pointsDepenses : formData.pointsDepenses - (competence?.cout || 0),
      competencesGratuitesUtilisees: competencePayeeAvecGratuite ? Math.max(0, formData.competencesGratuitesUtilisees - 1) : formData.competencesGratuitesUtilisees,
      pierresDeVie: nouveauxPierres
    });
  };

  const handleSortChange = (niveau: 'niv1' | 'niv2' | 'niv3' | 'niv4', newValue: number) => {
    const newSorts = { ...formData.sorts, [niveau]: newValue };
    const oldCoutSorts = formData.sorts.niv1 * 1 + formData.sorts.niv2 * 2 + formData.sorts.niv3 * 3 + formData.sorts.niv4 * 4;
    const newCoutSorts = newSorts.niv1 * 1 + newSorts.niv2 * 2 + newSorts.niv3 * 3 + newSorts.niv4 * 4;
    const coutDifference = newCoutSorts - oldCoutSorts;
    
    // Calculer combien on peut encore payer avec les points de création
    const pointsDisponibles = formData.pointsCreation - formData.pointsDepenses;
    const niveauxGratuitsDisponibles = niveauxSortsGratuitsRestants;
    
    // Déterminer comment allouer le coût (niveaux gratuits d'abord si points insuffisants)
    let nouveauxNiveauxGratuitsUtilises = formData.niveauxSortsGratuitsUtilises;
    let nouveauxPointsDepenses = formData.pointsDepenses;
    
    if (coutDifference > 0) {
      // Augmentation du coût
      if (coutDifference > pointsDisponibles) {
        // Pas assez de points, utiliser les niveaux gratuits
        const niveauxGratuitsNecessaires = coutDifference - pointsDisponibles;
        if (niveauxGratuitsNecessaires > niveauxGratuitsDisponibles) {
          toast.error("Points de création et niveaux gratuits insuffisants !");
          return;
        }
        nouveauxNiveauxGratuitsUtilises += niveauxGratuitsNecessaires;
        nouveauxPointsDepenses += pointsDisponibles;
      } else {
        // Assez de points disponibles
        nouveauxPointsDepenses += coutDifference;
      }
    } else if (coutDifference < 0) {
      // Diminution du coût - libérer les niveaux gratuits d'abord (LIFO)
      const niveauxALiberer = Math.abs(coutDifference);
      const niveauxGratuitsALiberer = Math.min(niveauxALiberer, formData.niveauxSortsGratuitsUtilises);
      nouveauxNiveauxGratuitsUtilises -= niveauxGratuitsALiberer;
      const pointsALiberer = niveauxALiberer - niveauxGratuitsALiberer;
      nouveauxPointsDepenses -= pointsALiberer;
    }
    
    // Recalculer les pierres de vie si Tisseur ou Clerc
    let nouveauxPierres = formData.pierresDeVie;
    const hasTisseurOrClerc = formData.competences.some(c => c.nom === "Tisseur" || c.nom === "Clerc");
    if (hasTisseurOrClerc) {
      const nbSortsTotal = newSorts.niv1 + newSorts.niv2 + newSorts.niv3 + newSorts.niv4;
      let plusHautNiveau = 0;
      if (newSorts.niv4 > 0) plusHautNiveau = 4;
      else if (newSorts.niv3 > 0) plusHautNiveau = 3;
      else if (newSorts.niv2 > 0) plusHautNiveau = 2;
      else if (newSorts.niv1 > 0) plusHautNiveau = 1;
      nouveauxPierres = 10 + (nbSortsTotal * plusHautNiveau);
    }
    
    setFormData({ 
      ...formData, 
      sorts: newSorts, 
      pierresDeVie: nouveauxPierres,
      niveauxSortsGratuitsUtilises: nouveauxNiveauxGratuitsUtilises,
      pointsDepenses: nouveauxPointsDepenses
    });
    
    if (coutDifference > 0 && nouveauxNiveauxGratuitsUtilises > formData.niveauxSortsGratuitsUtilises) {
      toast.success(`Sort ajouté (niveaux gratuits utilisés) !`);
    }
  };

  const handleAnnulerCreation = () => {
    const hasData = formData.nomTO || formData.nomTI || formData.espece || formData.competences.length > 0;
    
    if (hasData) {
      const confirmer = window.confirm("Voulez-vous supprimer le brouillon en cours ? (Cliquez sur Annuler pour conserver le brouillon)");
      if (confirmer) {
        localStorage.removeItem('personnage_en_cours');
        toast.info("Brouillon supprimé");
      } else {
        toast.info("Brouillon conservé pour plus tard");
      }
    }
    
    setShowForm(false);
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
    
    // Nettoyer le localStorage après sauvegarde réussie
    localStorage.removeItem('personnage_en_cours');
    
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
      sorts: { niv1: 0, niv2: 0, niv3: 0, niv4: 0 },
      pierresDeVie: 0,
      materielTO: [],
      email: "",
      nbEvenements: 0,
      afficherSortilleges: false,
      competencesGratuitesUtilisees: 0,
      niveauxSortsGratuitsUtilises: 0
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
              <h1 className="text-3xl font-bold text-primary">{t('characters.title')}</h1>
            </div>
            <div className="flex gap-2">
              <BlankCharacterSheet />
              {!showForm && (
                <Button onClick={() => setShowForm(true)} className="gap-2">
                  <Plus className="h-5 w-5" />
                  {t('characters.create')}
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
                  <CardTitle>{t('characters.events')}</CardTitle>
                  <CardDescription>
                    {t('characters.eventsDescription')}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Label htmlFor="nbEvenements">{t('characters.eventsCompleted')}</Label>
                  <Input
                    id="nbEvenements"
                    type="number"
                    min="0"
                    value={formData.nbEvenements}
                    onChange={(e) => setFormData({ ...formData, nbEvenements: parseInt(e.target.value) || 0 })}
                  />
                  <p className="text-xs text-muted-foreground">
                    {t('characters.eventsNote')}
                  </p>
                </CardContent>
              </Card>

              <Card className="ornament-border">
                <CardHeader>
                  <CardTitle>{t('characters.basicInfo')}</CardTitle>
                  <CardDescription>
                    {t('characters.creationPoints')}: {pointsRestants}/{formData.pointsCreation}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="nomTO">{t('characters.nameTO')}</Label>
                      <Input
                        id="nomTO"
                        value={formData.nomTO}
                        onChange={(e) => setFormData({ ...formData, nomTO: e.target.value })}
                        placeholder={t('characters.nameTOPlaceholder')}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="nomTI">{t('characters.nameTI')}</Label>
                      <Input
                        id="nomTI"
                        value={formData.nomTI}
                        onChange={(e) => setFormData({ ...formData, nomTI: e.target.value })}
                        placeholder={t('characters.nameTIPlaceholder')}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="faction">{t('characters.faction')}</Label>
                    <Select
                      value={formData.faction}
                      onValueChange={(value) => setFormData({ ...formData, faction: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder={t('characters.factionNone')} />
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
                    <Label htmlFor="espece">{t('characters.species')}</Label>
                    <Select value={formData.espece} onValueChange={(value) => setFormData({ ...formData, espece: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder={t('characters.speciesPlaceholder')} />
                      </SelectTrigger>
                      <SelectContent className="max-h-[400px]">
                        <SelectGroup>
                          <SelectLabel>{t('characters.speciesStandard')}</SelectLabel>
                          {especes.slice(0, 32).map((esp) => (
                            <SelectItem key={esp.nom} value={esp.nom}>
                              <div className="flex flex-col">
                                <span className="font-medium">{translateGameData(esp.nom, 'espece', language)}</span>
                                <span className="text-xs text-muted-foreground">Gratuit: {esp.gratuit}</span>
                                <span className="text-xs text-destructive">Interdit: {esp.interdit}</span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectGroup>
                        <SelectGroup>
                          <SelectLabel className="text-primary font-bold">{t('characters.speciesSpecial')}</SelectLabel>
                          {especes.slice(32).map((esp) => (
                            <SelectItem key={esp.nom} value={esp.nom}>
                              <div className="flex flex-col">
                                <span className="font-medium">{translateGameData(esp.nom, 'espece', language)}</span>
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
                    <Label htmlFor="origine">{t('characters.origin')}</Label>
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
                        <SelectValue placeholder={t('characters.originPlaceholder')} />
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
                  <CardTitle>{t('characters.skills')}</CardTitle>
                  <CardDescription>
                    <div className="space-y-1">
                      <div>{t('characters.skillsRemaining')}: <span className="font-bold text-primary">{pointsRestants}</span></div>
                      {formData.nbEvenements > 0 && (
                        <div className="text-xs bg-accent/30 px-2 py-1 rounded">
                          📚 {t('characters.skillsFree')}: <span className="font-bold text-primary">{competencesGratuitesRestantes}/{competencesGratuitesDisponibles}</span> disponibles
                          <div className="text-muted-foreground mt-1">
                            Utilisées: {formData.competencesGratuitesUtilisees} | {formData.nbEvenements} événement(s) × 2 compétences
                          </div>
                        </div>
                      )}
                    </div>
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-2 bg-accent/20 p-3 rounded-lg">
                    <input
                      type="checkbox"
                      id="afficherSortilleges"
                      checked={formData.afficherSortilleges}
                      onChange={(e) => setFormData({ ...formData, afficherSortilleges: e.target.checked })}
                      className="h-4 w-4"
                    />
                    <Label htmlFor="afficherSortilleges" className="text-sm cursor-pointer">
                      En cochant cette case, les sortilèges et rituels magiques apparaîtront sur votre fiche de personnage
                    </Label>
                  </div>
                  {formData.faction && getInterditsFromFaction().length > 0 && (
                    <div className="text-xs text-destructive bg-destructive/10 p-3 rounded-lg">
                      <strong>Compétences interdites par votre faction:</strong> {getInterditsFromFaction().join(", ")}
                    </div>
                  )}
                  <Select onValueChange={ajouterCompetence}>
                    <SelectTrigger>
                      <SelectValue placeholder={t('characters.skillsAdd')} />
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
                                      {translateGameData(comp.nom, 'competence', language)} ({comp.cout} pts) {isInterdit ? '(Interdit)' : ''}
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
                            <p className="font-medium text-sm">{translateGameData(comp.nom, 'competence', language)} <span className="text-primary">({comp.cout} pts)</span></p>
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

              {/* Section Sorts - Visible si compétence magique OU case cochée */}
              {(formData.competences.some(c => 
                ["Initié", "Ritualiste", "Tisseur", "Guérisseur", "Clerc", "Cérémonialiste"].includes(c.nom)
              ) || formData.afficherSortilleges) && (
                <Card className="ornament-border">
                  <CardHeader>
                    <CardTitle>Sorts (Tisseur/Clerc)</CardTitle>
                    <CardDescription>
                      Sélectionnez vos sorts (Maximum 3 par niveau) - Coût: {coutSorts} pts
                      {pointsRestants <= 0 && <span className="text-destructive ml-2">(Plus de points disponibles)</span>}
                      <div className="mt-2">
                        Niveaux de sorts gratuits (événements): <span className="font-bold">{niveauxSortsGratuitsRestants}/{niveauxSortsGratuitsDisponibles} disponibles</span>
                      </div>
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="sorts-niv1">Sorts Niveau 1 (1 pt/sort)</Label>
                      <Select 
                        value={formData.sorts.niv1.toString()} 
                        onValueChange={(value) => handleSortChange('niv1', parseInt(value))}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="0">0 sort</SelectItem>
                          <SelectItem value="1">1 sort</SelectItem>
                          <SelectItem value="2">2 sorts</SelectItem>
                          <SelectItem value="3">3 sorts</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="sorts-niv2">Sorts Niveau 2 (2 pts/sort)</Label>
                      <Select 
                        value={formData.sorts.niv2.toString()} 
                        onValueChange={(value) => handleSortChange('niv2', parseInt(value))}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="0">0 sort</SelectItem>
                          <SelectItem value="1">1 sort</SelectItem>
                          <SelectItem value="2">2 sorts</SelectItem>
                          <SelectItem value="3">3 sorts</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="sorts-niv3">Sorts Niveau 3 (3 pts/sort)</Label>
                      <Select
                        value={formData.sorts.niv3.toString()} 
                        onValueChange={(value) => handleSortChange('niv3', parseInt(value))}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="0">0 sort</SelectItem>
                          <SelectItem value="1">1 sort</SelectItem>
                          <SelectItem value="2">2 sorts</SelectItem>
                          <SelectItem value="3">3 sorts</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="sorts-niv4">Sorts Niveau 4 (4 pts/sort)</Label>
                      <Select 
                        value={formData.sorts.niv4.toString()} 
                        onValueChange={(value) => handleSortChange('niv4', parseInt(value))}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="0">0 sort</SelectItem>
                          <SelectItem value="1">1 sort</SelectItem>
                          <SelectItem value="2">2 sorts</SelectItem>
                          <SelectItem value="3">3 sorts</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="bg-accent/20 p-4 rounded-lg">
                    <p className="text-sm font-medium">Résumé des sorts:</p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2 text-sm">
                      <div>Niv.1: <span className="font-bold text-primary">{formData.sorts.niv1}</span></div>
                      <div>Niv.2: <span className="font-bold text-primary">{formData.sorts.niv2}</span></div>
                      <div>Niv.3: <span className="font-bold text-primary">{formData.sorts.niv3}</span></div>
                      <div>Niv.4: <span className="font-bold text-primary">{formData.sorts.niv4}</span></div>
                    </div>
                    <p className="text-sm mt-2">Total: <span className="font-bold text-primary">{formData.sorts.niv1 + formData.sorts.niv2 + formData.sorts.niv3 + formData.sorts.niv4} sorts</span> - Coût: <span className="font-bold text-primary">{coutSorts} pts</span></p>
                  </div>
                </CardContent>
              </Card>
              )}

              <Card className="ornament-border">
                <CardHeader>
                  <CardTitle>{t('characters.email')}</CardTitle>
                  <CardDescription>
                    Recevez votre fiche de personnage par email
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Label htmlFor="email">{t('characters.email')}</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder={t('characters.emailPlaceholder')}
                    />
                  </div>
                </CardContent>
              </Card>

              <div className="flex gap-3">
                <Button onClick={sauvegarderPersonnage} className="flex-1 gap-2">
                  <Save className="h-4 w-4" />
                  {t('characters.save')}
                </Button>
                <Button onClick={handleAnnulerCreation} variant="outline">
                  {t('characters.cancel')}
                </Button>
              </div>
            </div>

            {/* Récapitulatif */}
            <div className="lg:col-span-1">
              <Card className="ornament-border sticky top-24">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Info className="h-5 w-5" />
                    {t('characters.summary')}
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
                  <p className="text-xl text-muted-foreground mb-4">{t('characters.none')}</p>
                  <Button onClick={() => setShowForm(true)} className="gap-2">
                    <Plus className="h-5 w-5" />
                    {t('characters.createFirst')}
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
                        {translateGameData(perso.espece, 'espece', language)} {perso.faction && `- ${perso.faction}`}
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
                          especeInterdit: especes.find(e => e.nom === perso.espece)?.interdit,
                          factionInterdit: (() => {
                            const faction = factions.find(f => f.nom === perso.faction);
                            if (!faction || !faction.titres) return 'Aucun';
                            const interdits: string[] = [];
                            faction.titres.forEach(titreNom => {
                              const titre = titresCarrieres.find(t => t.nom === titreNom);
                              if (titre && titre.incompatible) {
                                const incompatibles = titre.incompatible.split(',').map(s => s.trim());
                                interdits.push(...incompatibles);
                              }
                            });
                            return interdits.length > 0 ? interdits.join(' + ') : 'Aucun';
                          })(),
                          sorts: perso.sorts,
                          afficherSortilleges: perso.afficherSortilleges || false
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
