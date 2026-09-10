// Origines de faction — Règles Barok GN 2026-2027
// Elles remplacent les anciens Titres / Carrières à la création.
// Chaque faction choisit DEUX origines, sans coût ni points.

export interface Origine {
  nom: string;
  categorie: string;
  description: string;
  /** Espèces réservées ou exclues ("-" si aucune restriction) */
  especes: string;
  /** Incompatibilités et limitations */
  limitations: string;
  /** Prérequis ou obligations */
  prerequis: string;
  /** Nécessite un contact préalable avec l'Orga */
  contactOrga?: boolean;
  /** Compétences débloquées par cette origine */
  debloque?: string[];
}

export const categoriesOrigines = [
  "Foi, savoir et occulte",
  "Gens de mer",
  "Nomades et voyageur-euses",
  "Marges et survie",
  "Pègre et ombres",
  "Négoce et protection",
  "Fer et vapeur",
  "Deuil et macabre",
  "Chasse et jeu",
  "Assemblées de Tisseur-euses",
  "Origines liées à l'espèce",
] as const;

export const origines: Origine[] = [
  // ─────────────── Foi, savoir et occulte ───────────────
  {
    nom: "Adepte – Fidèle",
    categorie: "Foi, savoir et occulte",
    description:
      "La faction est croyante d'un culte. La prêtrise officielle et l'Argousinat s'obtiennent en jeu. Vous pouvez aussi lancer votre propre culte en respectant les règles de création de culte.",
    especes: "-",
    limitations: "Marque Planaire et Marque Semence de Dragon",
    prerequis: "-",
  },
  {
    nom: "Sectaire ésotérico-magique",
    categorie: "Foi, savoir et occulte",
    description:
      "Faction initiée des confréries occultes ; se révèle discrètement et évolue en jeu. Croyances marginales, sans volonté d'officialiser le culte.",
    especes: "Interdite aux Vorélan-nes à la création",
    limitations: "Adepte – Fidèle, Garde du Corps, Marque Semence de Dragon",
    prerequis: "-",
  },
  {
    nom: "Archiviste des Secrets",
    categorie: "Foi, savoir et occulte",
    description:
      "Collectionneur-euse clandestin-e de savoir interdit. Ouvre l'accès à des informations hermétiques et cryptiques.",
    especes: "-",
    limitations: "Bande organisée, Pirate, Épervier, Contrebandier-ère, Érudite",
    prerequis: "-",
  },
  {
    nom: "Érudite",
    categorie: "Foi, savoir et occulte",
    description:
      "Sages et patients étudiants, pendant diurne et légal de l'Archiviste (Académies, Universités, collèges). Les membres gagnent un apprentissage supplémentaire en jeu avec 1 PJ ou 1 PNJ par événement.",
    especes: "-",
    limitations: "Archiviste des Secrets",
    prerequis: "-",
  },

  // ─────────────── Gens de mer ───────────────
  {
    nom: "Capitaine (Mer ou Air)",
    categorie: "Gens de mer",
    description:
      "La faction commande en début de jeu un navire ou un aéronef (enregistrement au Notaire validé et gratuit).",
    especes: "-",
    limitations: "Porteur-euse de Rune ; charge de Greffier fermée",
    prerequis: "Navire monté sur site + enregistrement au Notaire",
  },
  {
    nom: "Corsaire elfique",
    categorie: "Gens de mer",
    description:
      "Justicier-ères des flots sous lettre de course (gratuite auprès du Notaire). Sortes de Rangers des Mers du Dominion ; peuvent recevoir une solde ou honorer un contrat.",
    especes:
      "Toutes sauf Morts-Vivants, Korrigans, Drièdres, Archéo-Félis, Drogons, Génies d'Ajunda, Êtres Mécaniques, Tengus d'Ajunda, Cerbères, Hagnolls",
    limitations:
      "Marque Planaire, Pirate, Épervier, charges d'Ombre, Milicien, Magistrat, Greffier, Contrebandier-ère, Chasseur-euses de Chair, Marques sombres",
    prerequis: "Éthique ; solde ou contrat possible",
  },
  {
    nom: "Pirate",
    categorie: "Gens de mer",
    description: "Faction hors-la-loi des mers, crainte sur les eaux.",
    especes: "-",
    limitations:
      "Marque L.A.M., Corsaire elfique, Épervier, Agente d'une ONG, Porteur-euse de Rune, Mercenaire Peau-olive, Archiviste des Secrets ; charges de Greffier, Milicien, Magistrat",
    prerequis: "Si marin, Capitaine obligatoire ; Code de la Piraterie demandé 2 mois avant",
    contactOrga: true,
  },
  {
    nom: "Épervier",
    categorie: "Gens de mer",
    description:
      "Groupe sans foi ni loi : esclavagistes, kidnappeur-euses et assassin-es qui méprisent même le Code de la Piraterie.",
    especes: "-",
    limitations:
      "Toutes les charges publiques, Agente d'une ONG, Corsaire elfique, Archiviste des Secrets, Organisation sanitaire",
    prerequis: "Capitaine (Mer ou Air) obligatoire",
  },

  // ─────────────── Nomades et voyageur-euses ───────────────
  {
    nom: "Agente d'une ONG",
    categorie: "Nomades et voyageur-euses",
    description:
      "Faction diplomate tenue officiellement à la neutralité, avec ses objectifs propres, ses procédures spéciales ou savoirs interdits aux profanes (ex. l'Agence des Anachronistes).",
    especes: "-",
    limitations: "Marque Planaire, Porteur-euse de Rune, Pirate, Bande organisée, Épervier, Chasseur-euses de Chair",
    prerequis: "Neutralité (sauf légitime défense)",
  },
  {
    nom: "Club de Gentlemen et Gentlewomen explorateur-rices",
    categorie: "Nomades et voyageur-euses",
    description:
      "Société élitiste tournée vers l'exploration, le pillage de ruines, les chasses récréatives, l'enrichissement et la notoriété.",
    especes: "-",
    limitations: "-",
    prerequis: "-",
  },
  {
    nom: "Nomades Marins",
    categorie: "Nomades et voyageur-euses",
    description: "Deux peuplades au choix : les Elfes des Mers et les Mapinguaris (humanoïdes crocodiles de la Mer du Sud).",
    especes: "Contacter l'Orga : espèces spéciales incluses",
    limitations: "Charges publiques et charges d'Ombre (Pègre et Contrebande)",
    prerequis: "Contact Orga",
    contactOrga: true,
  },
  {
    nom: "Nomades Terrestres",
    categorie: "Nomades et voyageur-euses",
    description: "Deux peuplades au choix : la Horde d'Airain et les Errants (que certains nomment Cornus).",
    especes: "Contacter l'Orga : espèces spéciales incluses",
    limitations: "Charges publiques et charges d'Ombre (Pègre et Contrebande)",
    prerequis: "Contact Orga",
    contactOrga: true,
  },
  {
    nom: "Caravane des Brèches",
    categorie: "Nomades et voyageur-euses",
    description:
      "Convoi de marchand-es interplanaires qui commerce à travers les failles planaires et ramène des biens d'autres mondes. Le pont entre le négoce et le planaire.",
    especes: "Toutes sauf Vorélan-nes",
    limitations: "Charges publiques ; charges d'Ombre. Compatible avec la Marque Planaire.",
    prerequis: "Contact Orga",
    contactOrga: true,
  },
  {
    nom: "Échoué-es d'un autre monde",
    categorie: "Nomades et voyageur-euses",
    description:
      "Êtres venus d'un plan quelconque, bloqué-es sur Barok pour des raisons sensées, accidentelles ou loufoques, qui cherchent à rentrer ou à s'adapter.",
    especes: "Toutes sauf Vorélan-nes",
    limitations: "Charges publiques ; charges d'Ombre. Compatible avec la Marque Planaire.",
    prerequis: "Contact Orga",
    contactOrga: true,
  },
  {
    nom: "Exilé-es d'un monde perdu",
    categorie: "Nomades et voyageur-euses",
    description:
      "Rescapé-es d'un plan, d'une dimension ou d'un lieu dévoré par les Ténèbres ou conquis par une puissance sidérale. Iels portent la mémoire d'un mal absolu.",
    especes: "Toutes sauf Vorélan-nes",
    limitations: "Charges publiques ; méfiance des cultes. Compatible avec la Marque Planaire.",
    prerequis: "Contact Orga ; background validé (mal absolu)",
    contactOrga: true,
  },

  // ─────────────── Marges et survie ───────────────
  {
    nom: "Composé d'Ancien-nes Esclaves",
    categorie: "Marges et survie",
    description:
      "Faction de survivant-es de la servitude imposée, entre liberté et vengeance ; ses membres déstabilisent les habitudes et se battent pour leurs valeurs.",
    especes: "-",
    limitations: "Contrebandier-ère, Chasseur-euses de Chair",
    prerequis: "Compétences Entrave et Évasion",
  },
  {
    nom: "Compagnie artistique",
    categorie: "Marges et survie",
    description:
      "Principal vecteur de renommée (patente Artiste au Notaire). Bonus de +2 en cas de réussite d'une représentation ou d'un spectacle.",
    especes: "-",
    limitations: "Aucune",
    prerequis: "-",
  },

  // ─────────────── Pègre et ombres ───────────────
  {
    nom: "Bande organisée",
    categorie: "Pègre et ombres",
    description: "Caïds des rues ; le réseau réel se noue en jeu via le Courtier des Ombres.",
    especes: "-",
    limitations: "Marque Planaire, Porteur-euse de Rune, Pirate, Agente d'une ONG, Garde du Corps, Archiviste des Secrets",
    prerequis: "Une compétence de Filouterie",
  },
  {
    nom: "Contrebandier-ère",
    categorie: "Pègre et ombres",
    description: "Circuits du Marché Noir et évitement des taxes.",
    especes: "-",
    limitations: "Corsaire elfique, Composé d'Ancien-nes Esclaves, Archiviste des Secrets ; charges de Greffier et Milicien",
    prerequis: "-",
  },
  {
    nom: "Déchu-e",
    categorie: "Pègre et ombres",
    description:
      "Personnages qui n'ont plus rien : honneur, famille et titre perdus. Iels vivent en marge, mendient, errent, vivent de petits larcins ou de leurs consommations.",
    especes: "-",
    limitations:
      "TOUTES LES ORIGINES, sauf Gros Bras, les autres origines de Pègre et ombres et celles de Marges et survie",
    prerequis: "Avoir tout perdu et une très bonne proposition de background",
  },
  {
    nom: "Initié-e de la Guilde des Murmures",
    categorie: "Pègre et ombres",
    description:
      "Derrière une façade et une fausse occupation, votre groupe est membre de la très sélective Guilde des Assassins du Dominion. Accès à deux compétences spéciales : Coup bas et Mort éradiquante (une utilisation par jour chacune).",
    especes: "N'accepte ni les Planaires ni les Draconides dans ses rangs",
    limitations: "Marque Semence de Dragon et Marque Planaire",
    prerequis: "-",
    debloque: ["Coup bas", "Mort éradiquante"],
  },

  // ─────────────── Négoce et protection ───────────────
  {
    nom: "Antiquaire",
    categorie: "Négoce et protection",
    description:
      "Revente des artéfacts, antiquités et statues deux fois plus cher. Vous travaillez volontiers avec les pillards et les voleurs (accès à la Pègre).",
    especes: "-",
    limitations: "-",
    prerequis: "-",
  },
  {
    nom: "Gestionnaire de Dépôt",
    categorie: "Négoce et protection",
    description:
      "Approvisionnement et stocks stratégiques. Vous disposez d'une malle ou d'un coffre sur site où les Miliciens ne trouvent rien (annonce « Résist »). Crocheteur-euses et Tisseur-euses peuvent l'ouvrir.",
    especes: "-",
    limitations: "Aucune",
    prerequis: "Menuisier",
  },
  {
    nom: "Garde du Corps",
    categorie: "Négoce et protection",
    description: "Protection contractuelle rapprochée ; solde ou contrat noués en jeu.",
    especes: "-",
    limitations:
      "Charges publiques, Bande organisée, Pirate, Épervier, Mercenaire Peau-olive, Sectaire ésotérico-magique ; charges d'Ombre et Enquêteur",
    prerequis: "-",
  },
  {
    nom: "Gros Bras",
    categorie: "Négoce et protection",
    description:
      "Protection de base pour les plus offrants, sans regarder à la moralité. Tant qu'on vous paye, même en nourriture, boissons et alcool.",
    especes: "-",
    limitations: "Moralité et charges publiques",
    prerequis: "-",
  },
  {
    nom: "Caravane marchande",
    categorie: "Négoce et protection",
    description:
      "Comptoir mobile de marchand-es ambulant-es qui sillonne le Dominion, monte son étal en jeu et colporte nouvelles et rumeurs autant que la marchandise.",
    especes: "-",
    limitations: "Charges publiques ; Déchu-e",
    prerequis: "-",
  },
  {
    nom: "Colporteur-euses d'élixirs",
    categorie: "Négoce et protection",
    description:
      "Camelots qui vendent fioles miracles, remontants à vapeur et babioles « garanties authentiques ».",
    especes: "-",
    limitations: "Charges publiques ; Déchu-e",
    prerequis: "Aucun effet garanti : tout est du roleplay",
  },
  {
    nom: "Organisation sanitaire privée des Flottes et Voyageurs",
    categorie: "Négoce et protection",
    description:
      "Hospitalières ambulantes indépendantes : soins, prévention des infections et des maladies, gestion officielle des quarantaines pour tout le monde.",
    especes: "-",
    limitations: "Chasseur-euses de Chair ; Épervier ; Déchu-e",
    prerequis: "Neutralité de soin ; compétence de soin recommandée",
  },
  {
    nom: "Compagnie de Lémurie",
    categorie: "Négoce et protection",
    description:
      "Compagnie marchande privée non nationale, qui négocie et transporte depuis la Lémurie : épices, denrées rares, minéraux inédits et pharmacopée locale.",
    especes: "-",
    limitations: "Charges publiques ; Déchu-e",
    prerequis: "Contact Orga (denrées et pharmacopée)",
    contactOrga: true,
  },
  {
    nom: "Chasseur-euses nordiques de Glace",
    categorie: "Négoce et protection",
    description:
      "Équipage spécialisé dans la coupe, l'exportation et la vente des icebergs et banquises du long Hiver du nord.",
    especes: "-",
    limitations: "Charges publiques ; Déchu-e",
    prerequis: "-",
  },
  {
    nom: "Chasseur-euses de Chair",
    categorie: "Négoce et protection",
    description:
      "Marchand-es d'esclaves qui masquent leur commerce sous d'autres trafics. Statut obtenu après plusieurs missions réussies (accès à la Pègre).",
    especes: "-",
    limitations:
      "Charges publiques ; Corsaire elfique ; Mercenaire Peau-olive ; Composé d'Ancien-nes Esclaves ; Organisation sanitaire privée des Flottes et Voyageurs ; Agente d'une ONG",
    prerequis: "Accès Pègre ; statut acquis en jeu (plusieurs missions)",
  },

  // ─────────────── Fer et vapeur ───────────────
  {
    nom: "Guilde des Bricoleur-euses",
    categorie: "Fer et vapeur",
    description:
      "Atelier d'inventeur-euses, gadgetier-ères et mécano-s, tout en engrenages et en vapeur. Le versant steampunk générique, hors Mécanarcanum nain.",
    especes: "-",
    limitations: "Déchu-e",
    prerequis: "Ingénieur recommandé",
  },
  {
    nom: "Récupérateur-rices d'épave",
    categorie: "Fer et vapeur",
    description: "Équipes qui dépouillent les carcasses de navires et d'aéronefs échoués.",
    especes: "-",
    limitations: "Charges publiques ; Déchu-e",
    prerequis: "Natation optionnelle",
  },
  {
    nom: "Cartographes du Vide",
    categorie: "Fer et vapeur",
    description:
      "Association qui cartographie les régions réputées incartographiables, là où chaque Nation a semé de fausses données. Officiellement.",
    especes: "-",
    limitations: "Aucune stricte (dessein caché possible)",
    prerequis: "Contact Orga si scénarisé",
  },
  {
    nom: "Chasseur-euses de Courants Porteurs",
    categorie: "Fer et vapeur",
    description:
      "Chercheur-euses de bons courants d'éther, passagers ou durables, pour que les navires volants filent plus vite.",
    especes: "-",
    limitations: "Charges publiques ; Déchu-e",
    prerequis: "Navigation recommandée",
  },

  // ─────────────── Deuil et macabre ───────────────
  {
    nom: "Confrérie des Croque-morts et Médecins de peste",
    categorie: "Deuil et macabre",
    description:
      "Porteur-euses du masque à bec. Iels gèrent les morts, les quarantaines et la logistique de résurrection au Fanum de Cristal.",
    especes: "-",
    limitations: "Déchu-e",
    prerequis: "Lien avec le Fanum de Cristal ; soin ou rite recommandé",
  },
  {
    nom: "Compagnie d'Assurances et de Golems serviles",
    categorie: "Deuil et macabre",
    description:
      "Firme qui vend des polices aux clauses interminables couvrant séquelles, amputations et membres estropiés, et qui fabrique ou loue des golems serviles.",
    especes: "-",
    limitations: "Déchu-e",
    prerequis: "Golems serviles à valider par l'Orga",
    contactOrga: true,
  },

  // ─────────────── Chasse et jeu ───────────────
  {
    nom: "Guilde des Traqueur-euses",
    categorie: "Chasse et jeu",
    description:
      "Chasseur-euses de primes et de créatures, versant terrestre et professionnel.",
    especes: "-",
    limitations: "Déchu-e",
    prerequis: "Chasse ou combat recommandé",
  },
  {
    nom: "Club ambulant de Golbang",
    categorie: "Chasse et jeu",
    description:
      "Troupe obsédée par le sport plus que par la guerre, qui monte des tournois partout où elle passe.",
    especes: "-",
    limitations: "Aucune stricte",
    prerequis: "Voir les règles du LIBG",
  },

  // ─────────────── Assemblées de Tisseur-euses ───────────────
  {
    nom: "Une Corona de l'Université de Rammstein",
    categorie: "Assemblées de Tisseur-euses",
    description:
      "Dernière université spécialiste ès arts mystiques, psychiques et occultes de Porémanie. Assemblées de recherche sur les arts oubliés, interdits ou cosmiques et sur les manuscrits perdus.",
    especes: "Toutes sauf Vorélan-nes au début",
    limitations: "Charges publiques (savoirs interdits) ; rivalité entre Corona ; Marque Semence de Dragon",
    prerequis: "Contact Orga (arts interdits, oubliés ou cosmiques) ; magie recommandée",
    contactOrga: true,
  },

  // ─────────────── Origines liées à l'espèce ───────────────
  {
    nom: "Mercenaire Peau-olive",
    categorie: "Origines liées à l'espèce",
    description: "Confrérie d'honneur et de parole tenue.",
    especes: "Orques, Gobelins, Trolls",
    limitations:
      "Pratiques interdites : nécromancie, trafic de cadavres, esclavagisme. Marques L.A.M., Semence de Dragon et Planaire ; Corsaire elfique, Pirate, Épervier, Bande organisée, Garde du Corps, Porteur-euse de Rune, Chasseur-euses de Chair ; charges publiques et d'Ombre",
    prerequis: "-",
  },
  {
    nom: "Porteur-euse de Rune",
    categorie: "Origines liées à l'espèce",
    description:
      "Faction gardienne et pratiquante du Mécanarcanum, membre d'une des Nations naines. Manquer à sa parole ou perdre son honneur publiquement peut mener à être déclaré-e déchu-e.",
    especes: "Nains, Gnomes, Sautais",
    limitations:
      "Marques Planaire et Semence de Dragon, Capitaine (Mer ou Air), Pirate, Mercenaire Peau-olive, Agente d'une ONG, Bande organisée",
    prerequis: "Serment (trahison → Déchu-e)",
  },
];

/**
 * Incompatibilités explicites entre origines (règles 2026-2027).
 * La relation est symétrique : elle est appliquée dans les deux sens.
 */
export const incompatibilitesOrigines: Record<string, string[]> = {
  "Bande organisée": ["Archiviste des Secrets", "Garde du Corps"],
  Pirate: ["Archiviste des Secrets", "Garde du Corps", "Bande organisée"],
  "Épervier": [
    "Archiviste des Secrets",
    "Garde du Corps",
    "Pirate",
    "Mercenaire Peau-olive",
    "Organisation sanitaire privée des Flottes et Voyageurs",
  ],
  "Contrebandier-ère": ["Archiviste des Secrets"],
  "Érudite": ["Épervier", "Gros Bras"],
  "Adepte – Fidèle": ["Sectaire ésotérico-magique"],
  "Porteur-euse de Rune": ["Bande organisée"],
  "Corsaire elfique": ["Contrebandier-ère", "Chasseur-euses de Chair"],
  "Mercenaire Peau-olive": ["Chasseur-euses de Chair"],
  "Composé d'Ancien-nes Esclaves": ["Chasseur-euses de Chair", "Épervier"],
  "Agente d'une ONG": ["Épervier", "Chasseur-euses de Chair"],
};

/** Marques individuelles interdites par certaines origines (voies sombres notamment) */
export const marquesInterditesParOrigine: Record<string, string[]> = {
  "Corsaire elfique": ["Graine des Ténèbres", "Téphromancie", "Nécromancie"],
  "Mercenaire Peau-olive": ["Nécromancie"],
};

/** Liste complète des origines incompatibles avec `nom` (relation symétrique) */
export const origineIncompatibleAvec = (nom: string): string[] => {
  const directes = incompatibilitesOrigines[nom] ?? [];
  const inverses = Object.entries(incompatibilitesOrigines)
    .filter(([, liste]) => liste.includes(nom))
    .map(([cle]) => cle);
  return Array.from(new Set([...directes, ...inverses]));
};

export const getOrigine = (nom: string) => origines.find((o) => o.nom === nom);

