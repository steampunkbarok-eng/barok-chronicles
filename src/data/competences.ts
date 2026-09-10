export interface Competence {
  nom: string;
  cout: number;
  categorie: string;
  prerequis: string;
  effet: string;
  /** Origine de faction requise pour débloquer la compétence */
  origineRequise?: string;
  /** Marque individuelle requise pour débloquer la compétence */
  marqueRequise?: string;
  /** Compétence impossible à prendre à la création (apprentissage en jeu) */
  inaccessibleCreation?: boolean;
  /** Espèce à laquelle la compétence est réservée */
  especeReservee?: string;
}

export const competencesDisponibles: Competence[] = [
  // SOCIALES & ÉCONOMIQUES
  { nom: "Alphabétisation commune", cout: 0, categorie: "Sociale", prerequis: "", effet: "Parle, lit et écrit le Dominical, l'Elvarine et/ou l'Insulaire — préciser une, deux ou les trois langues à la création" },
  { nom: "Alphabétisation avancée", cout: 2, categorie: "Sociale", prerequis: "", effet: "Toutes les langues des terres connues" },
  { nom: "Épouvanter", cout: 3, categorie: "Sociale", prerequis: "Alphabétisation avancée + Flatterie", effet: "Après 3 à 6 min de discussion civilisée, annonce « abyss » pour secouer mentalement l'interlocuteur-rice" },
  { nom: "Esthétique morbide", cout: 0, categorie: "Sociale", prerequis: "", especeReservee: "Elfes Elvendornen", effet: "Ne perd pas de points d'abîme en assistant à un meurtre ou une mort suspecte (influence le roleplay)" },
  { nom: "Flatterie", cout: 1, categorie: "Sociale", prerequis: "", effet: "P/P/C réponse sincère (1×/pers/jour, cooldown 5 min)" },
  { nom: "Résistance à la flatterie", cout: 2, categorie: "Sociale", prerequis: "", effet: "Immunité Flatterie" },
  { nom: "Rumeurs niv.1", cout: 1, categorie: "Sociale", prerequis: "", effet: "4 rumeurs/événement" },
  { nom: "Rumeurs niv.2", cout: 2, categorie: "Sociale", prerequis: "Rumeurs niv.1", effet: "8 rumeurs/événement" },
  { nom: "Rumeurs niv.3", cout: 3, categorie: "Sociale", prerequis: "Rumeurs niv.2", effet: "10 rumeurs/événement" },
  { nom: "Solde", cout: 1, categorie: "Sociale", prerequis: "", effet: "+10 Galets d'Or/événement — réservée à certaines origines (Garde du Corps, Greffier, Corsaire elfique…) ou contrat notarié en jeu" },

  
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
  { nom: "Brise-crâne", cout: 4, categorie: "Martial", prerequis: "Manipulation d'armes", effet: "Annonce 'crush' avec arme 2 mains après avoir crié le nom de son dieu. 1×/heure" },
  { nom: "Combat en aveugle", cout: 4, categorie: "Martial", prerequis: "", effet: "Résiste aux 3 premiers flash/blind par combat ; 'blind' inflige 1 PV" },
  { nom: "Coup bas", cout: 4, categorie: "Martial", prerequis: "", origineRequise: "Initié-e de la Guilde des Murmures", effet: "Annonce « Backstab » 1×/jour (geste diagonal épaule → bas du dos) : tous les PV du torse à 0, contré par le gorgerin" },
  { nom: "Coupe jarret", cout: 4, categorie: "Martial", prerequis: "Assommement", effet: "Annonce 'through' (dos/contournement de bouclier)" },
  { nom: "Endurance accrue", cout: 3, categorie: "Martial", prerequis: "", effet: "+1 PV/localisation (impacte aussi la Bagarre)" },
  { nom: "Manipulation d'armes", cout: 0, categorie: "Martial", prerequis: "", effet: "Toutes armes autorisées (homologation BWAT requise)" },
  { nom: "Perce-ligne", cout: 4, categorie: "Martial", prerequis: "Manipulation d'armes", effet: "Annonce 'strike down' avec arme de mêlée 2 mains après avoir crié le nom de son dieu. 1×/heure" },

  
  // LOUCHES
  { nom: "Crochetage niv.1", cout: 2, categorie: "Louche", prerequis: "", effet: "Défaire 1 nœud en 3 min (1 sablier)" },
  { nom: "Crochetage niv.2", cout: 4, categorie: "Louche", prerequis: "Crochetage niv.1", effet: "Défaire 2 nœuds" },
  { nom: "Crochetage niv.3", cout: 6, categorie: "Louche", prerequis: "Crochetage niv.2", effet: "Défaire 3 nœuds — niveau maximum à la création" },
  { nom: "Crochetage niv.4", cout: 8, categorie: "Louche", prerequis: "Crochetage niv.3", inaccessibleCreation: true, effet: "À découvrir en jeu — inaccessible à la création" },
  { nom: "Dissimulation", cout: 3, categorie: "Louche", prerequis: "", effet: "Fouille approfondie requise (2 sabliers)" },
  { nom: "Entrave", cout: 1, categorie: "Louche", prerequis: "", effet: "Ligoter consentant/inconscient max 1h" },
  { nom: "Évasion", cout: 2, categorie: "Louche", prerequis: "Entrave", effet: "Libération en 1 min" },
  { nom: "Infiltration", cout: 3, categorie: "Louche", prerequis: "", effet: "Accès portes dérobées" },
  { nom: "Mort éradiquante", cout: 4, categorie: "Louche", prerequis: "Coup bas", origineRequise: "Initié-e de la Guilde des Murmures", effet: "Annonce « dead » 1×/jour sur un personnage en coma : éradication, direction le Cimetière des décharnés" },
  { nom: "Pickpocket", cout: 2, categorie: "Louche", prerequis: "", effet: "Vol à la tire (tirage carte Argousin-e), 1 tentative/personne/jour" },

  
  // ÉSOTÉRIQUES
  { nom: "Astrologue", cout: 2, categorie: "Ésotérique", prerequis: "", effet: "Carte céleste au check-in + rituels païens (prévenir l'Orga 1 mois avant)" },
  { nom: "Divination", cout: 2, categorie: "Ésotérique", prerequis: "Astrologue", effet: "Rituel païen de 15 min entre divinateur-rices → détails supplémentaires" },
  { nom: "Illuminé", cout: 3, categorie: "Ésotérique", prerequis: "Mystique", effet: "Esprit 15 min/jour depuis un cimetière + Infravision et vision des esprits/fées" },
  { nom: "Marche dans l'Inframonde", cout: 3, categorie: "Ésotérique", prerequis: "Mystique", marqueRequise: "Béni-e de Fées", effet: "Tulle noire sur la tête : dialogue paisible avec les Fées et Fées-Démones, qui n'attaquent pas" },
  { nom: "Mystique", cout: 2, categorie: "Ésotérique", prerequis: "", effet: "4 questions aux esprits via encens (réponses oui/non)" },
  { nom: "Ritualiste", cout: 2, categorie: "Ésotérique", prerequis: "Astrologue", effet: "Rituels de 2 écoles au choix (hors Arcanes et Alchimie). Apporte 10 pierres de vie/événement" },
  
  // MAGIQUES
  { nom: "Contresort", cout: 0, categorie: "Magique", prerequis: "", inaccessibleCreation: true, effet: "Annule 1 sort/jour (« resist ») — réservé aux Argousin-es, inaccessible à la création" },
  { nom: "Détection naturelle magie", cout: 1, categorie: "Magique", prerequis: "", effet: "Détection auto des manifestations magiques + lecture des rubans d'école" },
  { nom: "Enchanteur", cout: 3, categorie: "Magique", prerequis: "Transcendance niv.1", effet: "Canalisation d'énergie dans les objets, armes et armures" },
  { nom: "Initié", cout: 4, categorie: "Magique", prerequis: "Alchimiste", effet: "20 pierres de vie + sorts et rituels d'alchimie" },
  { nom: "Tatoueur", cout: 2, categorie: "Magique", prerequis: "Tisseur", effet: "Tatouages rituels TI (pouvoirs temporaires/permanents) — nécessite l'école Chamanisme" },
  { nom: "Tisseur", cout: 3, categorie: "Magique", prerequis: "Alphabétisation avancée", effet: "2 écoles au choix (hors divine) + Guérison, sans accès à l'Arcanisme. Pierres = 10 + 2 par niveau de sorts. Incompatible avec Clerc" },

  { nom: "Transcendance niv.1", cout: 1, categorie: "Magique", prerequis: "Tisseur", effet: "+2 pierres vie" },
  { nom: "Transcendance niv.2", cout: 2, categorie: "Magique", prerequis: "Transcendance niv.1", effet: "+4 pierres vie" },
  { nom: "Transcendance niv.3", cout: 3, categorie: "Magique", prerequis: "Transcendance niv.2", effet: "+8 pierres vie" },
  
  // MÉDICALES
  { nom: "Barbier", cout: 1, categorie: "Médicale", prerequis: "", effet: "Stabilisation + annulation d'empoisonnement ; bandage → +1 PV après 10 min" },
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
  { nom: "Chiffonnier", cout: 1, categorie: "Production", prerequis: "", effet: "Fouille du donjon et des décombres (15 min, 2×/événement)" },
  { nom: "Éboueur", cout: 1, categorie: "Production", prerequis: "", effet: "10 détritus + 5 toxic au check-in" },
  { nom: "Éleveur", cout: 1, categorie: "Production", prerequis: "", effet: "5 animaux → 12 animaux (peluches TI requises)" },
  { nom: "Jardinier", cout: 1, categorie: "Production", prerequis: "Cueilleur", effet: "5 fleurs → 10 (4h) ou 20 (6h)" },
  { nom: "Lapidaire", cout: 1, categorie: "Production", prerequis: "", effet: "10 gemmes + 10 Argent + 5 Or au check-in ; taille des gemmes" },
  { nom: "Tabaculteur", cout: 1, categorie: "Production", prerequis: "", effet: "10 végétaux + 10 Cigares + 5 Encens au check-in" },
  { nom: "Taxidermiste", cout: 1, categorie: "Production", prerequis: "Chasseur niv.1", effet: "Croquis de créature → 1 Antiquité" },

  
  // RÉCOLTE
  { nom: "Agriculteur", cout: 1, categorie: "Récolte", prerequis: "", effet: "10 fleurs → céréales (1D6)" },
  { nom: "Bûcheron", cout: 1, categorie: "Récolte", prerequis: "", effet: "Zone de récolte lors d'un « abattage » → 10 ressources bois" },
  { nom: "Choucroutier", cout: 1, categorie: "Récolte", prerequis: "", effet: "4 végétaux → 10 végétaux ; végétaux laissés → choucroute de Worst" },
  { nom: "Cueilleur", cout: 1, categorie: "Récolte", prerequis: "", effet: "Zone de récolte : 4 végétaux → 10 végétaux" },
  { nom: "Distillateur", cout: 1, categorie: "Récolte", prerequis: "", effet: "2 céréales + 4 fleurs → 1 alcool pur ; 4 végétaux + 2 céréales + 1 sel pur → 1 oliga sabré" },
  { nom: "Mineur", cout: 1, categorie: "Récolte", prerequis: "", effet: "Zone de récolte → 10 ressources pierre/métal/charbon" },
  { nom: "Pêcheur", cout: 1, categorie: "Récolte", prerequis: "", effet: "Zone de pêche lors d'une « bonne marée » → 10 produits de la mer/trésors (matériel TI requis)" },
  
  // PERFECTIONNEMENT
  { nom: "Alambiqueur", cout: 3, categorie: "Perfectionnement", prerequis: "Alchimiste", effet: "-5 min sur les préparations + huiles spéciales (3 à 6 coups)" },
  { nom: "Dompteur de bêtes", cout: 2, categorie: "Perfectionnement", prerequis: "Chasseur niv.1", effet: "Dressage de créatures (1 par enclos TO)" },
  { nom: "Mécanisation", cout: 0, categorie: "Perfectionnement", prerequis: "Armurier + Médecin", effet: "Transformation mécanique (15 min/localisation)" },
  
  // SPIRITUELLES
  { nom: "Clerc", cout: 3, categorie: "Spirituelle", prerequis: "Alphabétisation avancée", effet: "Magie divine : 1 école au choix + école Arcanique (Guérison en option) ; 4 cartes foi/événement. Pierres = 10 + 2 par niveau de sorts. Incompatible avec Tisseur" },
  { nom: "Cérémonialiste", cout: 1, categorie: "Spirituelle", prerequis: "", effet: "Rituels de l'école Arcanes uniquement. Apporte 10 pierres de vie/événement" },
  
  // MANOEUVRE
  { nom: "Natation", cout: 2, categorie: "Manoeuvre", prerequis: "", effet: "Évite la noyade en combat naval — impossible avec bouclier ou armure moyenne/lourde" },
  
  // NAVALE ET AÉRIENNE
  { nom: "Charpentier de marine", cout: 2, categorie: "Navale et aérienne", prerequis: "", effet: "Réparation des voies d'eau/air en combat naval et aérien ; construction d'embarcations" },
  { nom: "Glisseur", cout: 2, categorie: "Navale et aérienne", prerequis: "", effet: "Glisse via filin/grappin vers un autre navire ou planeur constructible ; vulnérable aux tirs" },
  { nom: "Navigation niv.1", cout: 1, categorie: "Navale et aérienne", prerequis: "", effet: "Pilotage et combat des navires marins et fluviaux. Propriété multiple possible, capitanat unique" },
  { nom: "Navigation niv.2", cout: 2, categorie: "Navale et aérienne", prerequis: "Navigation niv.1", effet: "Pilotage et combat des zeppelins et navires volants" },
  { nom: "Navigation niv.3", cout: 3, categorie: "Navale et aérienne", prerequis: "Navigation niv.2", effet: "Commande simultanée de plusieurs navires/zeppelins (flottille de 2-3 maximum) et navigation en conditions extrêmes" }
];

