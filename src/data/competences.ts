export interface Competence {
  nom: string;
  cout: number;
  categorie: string;
  prerequis: string;
  effet: string;
}

export const competencesDisponibles: Competence[] = [
  // SOCIALES & ÉCONOMIQUES
  { nom: "Alphabétisation commune", cout: 0, categorie: "Sociale", prerequis: "", effet: "Lecture/écriture Dominical et Insulaire" },
  { nom: "Alphabétisation avancée", cout: 2, categorie: "Sociale", prerequis: "", effet: "Toutes les langues des terres connues" },
  { nom: "Flatterie", cout: 1, categorie: "Sociale", prerequis: "", effet: "P/P/C réponse sincère (1×/pers/jour)" },
  { nom: "Résistance à la flatterie", cout: 2, categorie: "Sociale", prerequis: "", effet: "Immunité Flatterie" },
  { nom: "Rumeurs niv.1", cout: 1, categorie: "Sociale", prerequis: "", effet: "4 rumeurs/événement" },
  { nom: "Rumeurs niv.2", cout: 2, categorie: "Sociale", prerequis: "Rumeurs niv.1", effet: "8 rumeurs/événement" },
  { nom: "Rumeurs niv.3", cout: 3, categorie: "Sociale", prerequis: "Rumeurs niv.2", effet: "10 rumeurs/événement" },
  { nom: "Solde", cout: 1, categorie: "Sociale", prerequis: "", effet: "+10 Galets Or/événement" },
  
  // ARTISAN
  { nom: "Bijoutier", cout: 1, categorie: "Artisan", prerequis: "", effet: "Perles/gemmes → bijoux" },
  { nom: "Boucher", cout: 1, categorie: "Artisan", prerequis: "", effet: "Animaux → viande" },
  { nom: "Menuisier", cout: 1, categorie: "Artisan", prerequis: "", effet: "5 bois → 1 chevron ; chariots" },
  { nom: "Papetier", cout: 1, categorie: "Artisan", prerequis: "", effet: "Végétaux/peau → papier" },
  { nom: "Ratier", cout: 1, categorie: "Artisan", prerequis: "", effet: "Animaux/cadavres → viande (antre TO)" },
  { nom: "Sculpteur", cout: 1, categorie: "Artisan", prerequis: "", effet: "Pierre/bois → statues/antiquités" },
  { nom: "Tisserand", cout: 1, categorie: "Artisan", prerequis: "", effet: "Végétaux/peau → tissu ; 4 tissus → voile" },
  { nom: "Trafiquant de cadavres", cout: 1, categorie: "Artisan", prerequis: "", effet: "Animaux/détritus → cadavres (illégal)" },
  { nom: "Verrier", cout: 1, categorie: "Artisan", prerequis: "Alchimiste", effet: "Sable → verre + bonus brûleur" },
  
  // BAGARRE
  { nom: "Assommement", cout: 2, categorie: "Bagarre", prerequis: "", effet: "Coup épaule = inconscient 5 min" },
  { nom: "Sauvage niv.1", cout: 1, categorie: "Bagarre", prerequis: "", effet: "+1 Bagarre" },
  { nom: "Sauvage niv.2", cout: 2, categorie: "Bagarre", prerequis: "Sauvage niv.1", effet: "+2 Bagarre" },
  { nom: "Sauvage niv.3", cout: 3, categorie: "Bagarre", prerequis: "Sauvage niv.2", effet: "+3 Bagarre" },
  
  // MARTIAL
  { nom: "Armure niv.1", cout: 1, categorie: "Martial", prerequis: "", effet: "Cuir souple + casques légers (1 PA/zone)" },
  { nom: "Armure niv.2", cout: 2, categorie: "Martial", prerequis: "Armure niv.1", effet: "Cuir rigide (2 PA/zone) - Annule Natation" },
  { nom: "Armure niv.3", cout: 3, categorie: "Martial", prerequis: "Armure niv.2", effet: "Toutes armures (3 PA/zone) - Annule Natation" },
  { nom: "Artilleur", cout: 3, categorie: "Martial", prerequis: "", effet: "Maniement gatlings et engins siège" },
  { nom: "Bouclier", cout: 0, categorie: "Martial", prerequis: "", effet: "Tous types boucliers" },
  { nom: "Brise-crâne", cout: 4, categorie: "Martial", prerequis: "Arme de mêlée", effet: "Annonce 'crush' 1×/heure" },
  { nom: "Combat en aveugle", cout: 4, categorie: "Martial", prerequis: "", effet: "Résiste 3 premiers flash/blind" },
  { nom: "Coupe jarret", cout: 4, categorie: "Martial", prerequis: "Assommement", effet: "Annonce 'through' (dos/contournement)" },
  { nom: "Endurance accrue", cout: 3, categorie: "Martial", prerequis: "", effet: "+1 PV/localisation" },
  { nom: "Manipulation d'armes", cout: 0, categorie: "Martial", prerequis: "", effet: "Toutes armes autorisées" },
  { nom: "Perce-ligne", cout: 4, categorie: "Martial", prerequis: "Arme de mêlée", effet: "Annonce 'strike down' 1×/heure" },
  
  // LOUCHES
  { nom: "Crochetage niv.1", cout: 2, categorie: "Louche", prerequis: "", effet: "Défaire 1 nœud en 3 min" },
  { nom: "Crochetage niv.2", cout: 4, categorie: "Louche", prerequis: "Crochetage niv.1", effet: "Défaire 2 nœuds" },
  { nom: "Crochetage niv.3", cout: 6, categorie: "Louche", prerequis: "Crochetage niv.2", effet: "Défaire 3 nœuds" },
  { nom: "Dissimulation", cout: 3, categorie: "Louche", prerequis: "", effet: "Fouille approfondie requise (2 sabliers)" },
  { nom: "Entrave", cout: 1, categorie: "Louche", prerequis: "", effet: "Ligoter consentant/inconscient max 1h" },
  { nom: "Évasion", cout: 2, categorie: "Louche", prerequis: "Entrave", effet: "Libération en 1 min" },
  { nom: "Infiltration", cout: 3, categorie: "Louche", prerequis: "", effet: "Accès portes dérobées" },
  { nom: "Pickpocket", cout: 2, categorie: "Louche", prerequis: "", effet: "Vol à la tire (tirage carte Argousin.e)" },
  
  // ÉSOTÉRIQUES
  { nom: "Astrologue", cout: 2, categorie: "Ésotérique", prerequis: "", effet: "Carte céleste au check-in" },
  { nom: "Divination", cout: 2, categorie: "Ésotérique", prerequis: "Astrologue", effet: "Rituel 20 min → détails" },
  { nom: "Illuminé", cout: 3, categorie: "Ésotérique", prerequis: "Mystique", effet: "Esprit 15 min/jour + Infravision" },
  { nom: "Mystique", cout: 2, categorie: "Ésotérique", prerequis: "", effet: "4 questions esprits via encens" },
  { nom: "Ritualiste", cout: 2, categorie: "Ésotérique", prerequis: "Astrologue", effet: "Rituels 2 écoles (sauf Arcanes/Alchimie)" },
  
  // MAGIQUES
  { nom: "Détection naturelle magie", cout: 1, categorie: "Magique", prerequis: "", effet: "Détection auto manifestations magiques" },
  { nom: "Enchanteur", cout: 3, categorie: "Magique", prerequis: "Transcendance", effet: "Canalisation énergie objets/armes/armures" },
  { nom: "Initié", cout: 4, categorie: "Magique", prerequis: "Alchimiste", effet: "20 pierres vie + sorts/rituels alchimie" },
  { nom: "Tatoueur", cout: 2, categorie: "Magique", prerequis: "Tisseur + Chamanisme", effet: "Tatouages rituels TI (pouvoirs temp/perm)" },
  { nom: "Tisseur", cout: 3, categorie: "Magique", prerequis: "Alphabétisation avancée", effet: "2 écoles + Arcanes/Guérison. Vision tulles. +10 pierres vie" },
  { nom: "Transcendance niv.1", cout: 1, categorie: "Magique", prerequis: "Tisseur", effet: "+2 pierres vie" },
  { nom: "Transcendance niv.2", cout: 2, categorie: "Magique", prerequis: "Transcendance niv.1", effet: "+4 pierres vie" },
  { nom: "Transcendance niv.3", cout: 3, categorie: "Magique", prerequis: "Transcendance niv.2", effet: "+8 pierres vie" },
  
  // MÉDICALES
  { nom: "Barbier", cout: 1, categorie: "Médicale", prerequis: "", effet: "Stabilisation + bandage → +1 PV après 1h" },
  { nom: "Chirurgien", cout: 3, categorie: "Médicale", prerequis: "Rebouteux", effet: "Soins complets 1 sablier (tous PV)" },
  { nom: "Guérisseur", cout: 5, categorie: "Médicale", prerequis: "Rebouteux", effet: "Sorts guérison (achète pierres non-liées)" },
  { nom: "Médecin", cout: 3, categorie: "Médicale", prerequis: "Rebouteux", effet: "Remèdes maladies + soigne abîme (+2/30min)" },
  { nom: "Rebouteux", cout: 1, categorie: "Médicale", prerequis: "", effet: "Soigne 1 localisation 1 sablier" },
  
  // PROFESSIONNELLES
  { nom: "Alchimiste", cout: 3, categorie: "Professionnelle", prerequis: "Alphabétisation avancée", effet: "Potions/huiles (30min/dose, matériel TO×2)" },
  { nom: "Armurier", cout: 2, categorie: "Professionnelle", prerequis: "Forgeron", effet: "Réparations 3min + régénération auto 15min" },
  { nom: "Avoué", cout: 2, categorie: "Professionnelle", prerequis: "", effet: "Défense procès + accès archives judiciaires" },
  { nom: "Chasseur niv.1", cout: 1, categorie: "Professionnelle", prerequis: "", effet: "Chasse monstres → 5 pages Bestiaire" },
  { nom: "Chasseur niv.2", cout: 2, categorie: "Professionnelle", prerequis: "Chasseur niv.1", effet: "Chasse monstres → 10 pages Bestiaire" },
  { nom: "Chasseur niv.3", cout: 3, categorie: "Professionnelle", prerequis: "Chasseur niv.2", effet: "Chasse monstres → 15 pages Bestiaire" },
  { nom: "Forgeron", cout: 2, categorie: "Professionnelle", prerequis: "", effet: "Objets métalliques exceptionnels ; 2 métal → 1 acier" },
  { nom: "Herboriste", cout: 3, categorie: "Professionnelle", prerequis: "", effet: "Potions naturelles (15min/recette, matériel TO×1)" },
  { nom: "Ingénieur", cout: 3, categorie: "Professionnelle", prerequis: "Alphabétisation avancée", effet: "Engins mécaniques + pilotage" },
  { nom: "Sapeur", cout: 2, categorie: "Professionnelle", prerequis: "", effet: "Brèches remparts + bombes sape" },
  
  // PRODUCTION
  { nom: "Carrier", cout: 1, categorie: "Production", prerequis: "", effet: "10 pierre + 10 sable + 5 rune givre au check-in" },
  { nom: "Chiffonnier", cout: 1, categorie: "Production", prerequis: "", effet: "Fouille donjon (15min, 2×/événement)" },
  { nom: "Éboueur", cout: 1, categorie: "Production", prerequis: "", effet: "10 détritus + 5 toxic au check-in" },
  { nom: "Éleveur", cout: 1, categorie: "Production", prerequis: "", effet: "5 animaux → 12 (peluches TI requises)" },
  { nom: "Jardinier", cout: 1, categorie: "Production", prerequis: "Cueilleur", effet: "5 fleurs → 10 (4h) ou 20 (6h)" },
  { nom: "Lapidaire", cout: 1, categorie: "Production", prerequis: "", effet: "10 gemmes + 10 Argent + 5 Or au check-in" },
  { nom: "Tabaculteur", cout: 1, categorie: "Production", prerequis: "", effet: "10 végétaux + 10 Cigares + 5 Encens au check-in" },
  { nom: "Taxidermiste", cout: 1, categorie: "Production", prerequis: "Chasseur", effet: "Croquis créature → 1 Antiquité" },
  
  // RÉCOLTE
  { nom: "Agriculteur", cout: 1, categorie: "Récolte", prerequis: "", effet: "4 fleurs → 10 fleurs ou céréales" },
  { nom: "Bûcheron", cout: 1, categorie: "Récolte", prerequis: "", effet: "10 ressources bois" },
  { nom: "Choucroutier", cout: 1, categorie: "Récolte", prerequis: "", effet: "4 végétaux → 10 végétaux ou choucroute" },
  { nom: "Cueilleur", cout: 1, categorie: "Récolte", prerequis: "", effet: "4 végétaux → 10 végétaux" },
  { nom: "Distillateur", cout: 1, categorie: "Récolte", prerequis: "", effet: "2 céréales + 4 fleurs → 1 alcool pur" },
  { nom: "Mineur", cout: 1, categorie: "Récolte", prerequis: "", effet: "10 ressources pierre/métal/charbon" },
  { nom: "Pêcheur", cout: 1, categorie: "Récolte", prerequis: "", effet: "10 produits mer/trésors (matériel TI requis)" },
  
  // PERFECTIONNEMENT
  { nom: "Alambiqueur", cout: 3, categorie: "Perfectionnement", prerequis: "Alchimiste", effet: "-5min préparations + huiles spéciales" },
  { nom: "Dompteur de bêtes", cout: 2, categorie: "Perfectionnement", prerequis: "Chasseur", effet: "Dressage créatures (1/enclos TO)" },
  { nom: "Mécanisation", cout: 0, categorie: "Perfectionnement", prerequis: "Armurier + Médecin", effet: "Transformation mécanique (15min/loc)" },
  
  // SPIRITUELLES
  { nom: "Clerc", cout: 3, categorie: "Spirituelle", prerequis: "Alphabétisation avancée", effet: "Magie divine ; 1 école + Arcanique ; 4 foi/événement. +10 pierres vie" },
  { nom: "Cérémonialiste", cout: 1, categorie: "Spirituelle", prerequis: "", effet: "Rituels école Arcanes uniquement. +10 pierres vie" },
  
  // MANOEUVRE
  { nom: "Natation", cout: 2, categorie: "Manoeuvre", prerequis: "", effet: "Évite noyade combat naval" },
  
  // EN RÉVISION
  { nom: "Charpentier de marine", cout: 2, categorie: "En révision", prerequis: "", effet: "Réparation voies eau/air + construction navires" },
  { nom: "Glisseur", cout: 2, categorie: "En révision", prerequis: "", effet: "Glisse filin/grappin vers autre navire" },
  { nom: "Navigation niv.1", cout: 1, categorie: "En révision", prerequis: "", effet: "Fluviale (eaux douces)" },
  { nom: "Navigation niv.2", cout: 2, categorie: "En révision", prerequis: "Navigation niv.1", effet: "Cabotage (max 2 cases côtes)" },
  { nom: "Navigation niv.3", cout: 3, categorie: "En révision", prerequis: "Navigation niv.2", effet: "Haute mer" }
];
