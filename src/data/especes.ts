export interface Espece {
  nom: string;
  gratuit: string;
  interdit: string;
  special: string;
  effetsPV: number;
  effetsPA: number;
}

export const especes: Espece[] = [
  { nom: "Humains", gratuit: "Aucun", interdit: "Aucun", special: "Espèce adaptative - Liberté totale", effetsPV: 0, effetsPA: 0 },
  { nom: "Elfes Îles Bénies", gratuit: "Combat en aveugle + Résistance Flatterie", interdit: "Endurance accrue + Grâce", special: "Culture shintoïste, Cycle", effetsPV: 0, effetsPA: 0 },
  { nom: "Elfes Décharnement", gratuit: "Alphab. avancée + Tisseur + Astrologue", interdit: "Pirate + Armure niv.3", special: "Tatouages/piercings obligatoires", effetsPV: 0, effetsPA: 0 },
  { nom: "Nains", gratuit: "Mineur + Forgeron + Armurier", interdit: "Flatterie + Désincarnation accrue + Natation", special: "Voient fées, Armes Mercury", effetsPV: 0, effetsPA: 0 },
  { nom: "Alfes", gratuit: "Patente Marchand + Endurance accrue", interdit: "Duelliste-patente + Dissimulation", special: "Culture lapone", effetsPV: 0, effetsPA: 0 },
  { nom: "Elfes Elvendornen", gratuit: "Alphab. avancée + Tisseur (Ténèbres+1) + Trafiquant cadavres", interdit: "Clerc + Argousin + Corsaire elfique + Arcanique + Maldou", special: "Marche Inframonde + Esthétique morbide", effetsPV: 0, effetsPA: 0 },
  { nom: "Orques", gratuit: "Alphabétisation avancée", interdit: "Trafiquant cadavres + Marchands esclaves + Nécromancie", special: "Spécial: +1 PV/localisation permanent", effetsPV: 1, effetsPA: 0 },
  { nom: "Gobelins", gratuit: "Rebouteux + Mystique", interdit: "Sauvage + Robustesse + Endurance accrue", special: "TDAH, technologie", effetsPV: 0, effetsPA: 0 },
  { nom: "Trolls", gratuit: "Endurance accrue + Assommement", interdit: "Enchanteur + Pickpocket", special: "Sagesse respectée", effetsPV: 1, effetsPA: 0 },
  { nom: "Sautais", gratuit: "Boucher + Coupe jarret", interdit: "Armure niv.3 + Artilleur", special: "Très petite taille requis", effetsPV: 0, effetsPA: 0 },
  { nom: "Artolls", gratuit: "Entrave + Infiltration + Patente Duelliste", interdit: "Tatoueur + Chasseur + Divination", special: "Style renaissance italien", effetsPV: 0, effetsPA: 0 },
  { nom: "Warolls", gratuit: "Patente Marchand + Chasseur + Astrologue", interdit: "Duelliste + Natation", special: "Style nomade steppes", effetsPV: 0, effetsPA: 0 },
  { nom: "Korrigans", gratuit: "Alphab. avancée + Tisseur + Lyrisme(4niv) + 2e école(max2)", interdit: "Toutes armes + Sapeur", special: "Immunité maladies + Drain vie", effetsPV: 0, effetsPA: 0 },
  { nom: "Gnomes", gratuit: "Alphabétisation avancée + Alchimiste", interdit: "Éboueur + Trafiquant cadavres", special: "Immunité poisons/toxines/assommement, Cheveux colorés", effetsPV: 0, effetsPA: 0 },
  { nom: "Vorélans", gratuit: "Détection Magie + Résistance Flatterie", interdit: "Magie création + Flatterie", special: "Double esprit, Cornes glyphes, Boule frontale de lumière, Immunité frayeur", effetsPV: 0, effetsPA: 0 },
  { nom: "Êtres Mécaniques", gratuit: "Ingénieur + 1 charbon + Résistance Flatterie", interdit: "Flatterie + Émotions + PV→PA", special: "PV=PA, Loc=armure1, Pas abîme, Charbon obligatoire", effetsPV: -1, effetsPA: 1 },
  { nom: "Syrianes", gratuit: "Flatterie + Natation + Pêcheur", interdit: "Alcool + Verrier + Barbier", special: "Amphibies (eau 1×/jour), Sensibilité feu (×2 dégâts)", effetsPV: 0, effetsPA: 0 },
  { nom: "Ragnolls Haut-Royaume", gratuit: "Agriculteur + Menuisier", interdit: "Choucroutier + Tabaculteur + Boucher", special: "Végans, Tradition artisanale", effetsPV: 0, effetsPA: 0 },
  { nom: "Ragnolls Domitia", gratuit: "Patente Entrepreneur + Natation", interdit: "Lapidaire + Chiffonnier + Mécanisation", special: "Entrepreneurs nés, Omnivores", effetsPV: 0, effetsPA: 0 },
  { nom: "Ragnolls Poméranie", gratuit: "Artilleur + Armure niv.1", interdit: "Transcendance + Illuminé", special: "Viandards, Honneur combat", effetsPV: 0, effetsPA: 0 },
  { nom: "Archéo-Félis", gratuit: "Flatterie + Avoué + Alphab. avancée", interdit: "Glisseur + Crochetage", special: "Pas de queue, Gardiens langage", effetsPV: 0, effetsPA: 0 },
  { nom: "Néo-Félis", gratuit: "Crochetage niv.1 + Glisseur + Ratier", interdit: "Flatterie + Avoué", special: "Queue présente, Arbre sanctuaire", effetsPV: 0, effetsPA: 0 }
];
