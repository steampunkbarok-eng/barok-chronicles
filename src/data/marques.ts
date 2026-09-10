// Marques de Destinée — Règles Barok GN 2026-2027
// Une Marque n'est pas un avantage : c'est une dette narrative.
// Marques collectives : une seule par faction (optionnelle).
// Marques individuelles : portées par un personnage, selon espèce ou background.
// Toutes passent par la validation de l'Orga (envoi recommandé deux mois avant).

export interface Marque {
  nom: string;
  citation?: string;
  /** À qui s'adresse la Marque */
  pourQui: string;
  /** Ce qu'elle signale à l'Orga */
  signale: string;
  /** Nécessités et interdits */
  interdits?: string;
  /** Signe particulier / attention spéciale */
  attention?: string;
  /** Espèces auxquelles la Marque est réservée (vide = toutes) */
  especesReservees?: string[];
  /** Espèces auxquelles la Marque est interdite */
  especesInterdites?: string[];
  /** Origines de faction incompatibles */
  originesIncompatibles?: string[];
  /** Marques incompatibles */
  marquesIncompatibles?: string[];
  /** Voie sombre : grille commune des interdits */
  voieSombre?: boolean;
  /** Contact préalable obligatoire avec l'Orga */
  contactOrga?: boolean;
  /** Compétences débloquées par cette Marque */
  debloque?: string[];
  /** Marque imposée automatiquement à cette espèce */
  imposeePourEspece?: string;
}

export const marquesCollectives: Marque[] = [
  {
    nom: "Cirque macabre",
    citation:
      "Sous les masques et les habits amples, des pestiférés, des maudits, des créatures d'engrenages et de chair recousue.",
    pourQui: "Troupes impies et démentes qui font spectacle.",
    signale:
      "Spectacles aux puissants effets sur la foule, limités aux écoles Élémentalisme et Magie des Pactes (seules écoles possibles).",
    interdits:
      "Chaque créature est maudite selon son espèce : morts-vivant-es (sensibles à leurs attaques classiques) ; métamorphes et lycanthropes (enchanted = double dégât) ; pestiféré-es (argent = double dégât et régénération impossible).",
    contactOrga: true,
  },
  {
    nom: "Consanguinité",
    citation: "Une seule famille, depuis des éons, sous un même toit.",
    pourQui: "Factions où toustes sont parent-es (cousin-es, frères, sœurs, neveux, nièces).",
    signale:
      "L'abîme maximal du groupe est réduit à 3 sur 4 : 3/4 devient le maximum absolu ; tics, tocs et comportements étranges assumés en jeu.",
    interdits: "La consanguinité peut cacher d'autres vices : à discuter avec l'Orga.",
    contactOrga: true,
  },
  {
    nom: "Contact avec les Tréfonds Obscurs",
    citation: "Vous commercez avec ceux que la surface a oubliés.",
    pourQui:
      "Factions liées aux peuples des profondeurs (Elfes noirs, Nains des Tréfonds, Hobgobelins, Nain-es et d'autres inconnus de toustes).",
    signale:
      "Avantages ponctuels possibles grâce à un tatouage caché : un champignon vert de type bolet, appelé la marque des profondeurs.",
    attention:
      "Signe particulier : tatouez vous-même le logo du bolet vert sur une zone de peau dissimulable ; montrez-le à la pègre ou aux gens des tréfonds pour ouvrir des portes fermées.",
    interdits: "Relations souterraines et dettes possibles.",
  },
  {
    nom: "Malédiction de l'Œil Rouge",
    citation: "Quelque chose, à la dernière résurrection, n'est pas revenu comme il fallait.",
    pourQui: "Toute une faction marquée par une résurrection ratée.",
    signale:
      "Séquelle partagée : une case d'abîme en moins au début du jeu, un contact privilégié avec quelque chose dans les rêves, les ténèbres ou au-delà du réel ; cauchemars. Cela peut se soigner, mais la solution se trouve en jeu (rituels, rituels païens, pacte, etc.).",
    interdits: "Accroche forte, branchée sur la Mort accentuée et la Mort-Entité.",
    contactOrga: true,
  },
  {
    nom: "Marque secrète",
    citation: "Nul ne sait ce qui l'attend, mais certain-es ont des secrets qui les marquent à vie ou à mort.",
    pourQui: "Factions qui veulent construire leur Marque avec l'Orga.",
    signale: "À expliquer et préciser à l'Orga. Solution créative et négociable.",
    contactOrga: true,
  },
  {
    nom: "Membre de la L.A.M. (Ordre des Chevaliers de Suie)",
    citation:
      "À bas les Tisseur-euses et les bigots ; vive l'alliance de l'argent, du charbon et de la lutte contre les dogmes et les anciennes icônes.",
    pourQui: "Factions qui ont tourné le dos à l'ancien monde pour le progrès et la richesse.",
    signale: "Haine de la magie et du Fanum, accès au réseau L.A.M.",
    interdits:
      "Tout pouvoir magique, bénédiction ou rituel interdit ; incompatible avec toute Marque magique ou religieuse, avec la Semence de Dragon et avec les Planaires.",
    marquesIncompatibles: ["Semence de Dragon", "Planaire", "Graine des Ténèbres", "Téphromancie", "Nécromancie", "Métaphysique sacrificiel héroïque", "Béni-e de Fées"],
    originesIncompatibles: ["Adepte – Fidèle", "Une Corona de l'Université de Rammstein", "Mercenaire Peau-olive"],
  },
  {
    nom: "Morts-vivant-es de Ghuradok",
    citation:
      "La méditation, la paix et l'étude nous permettent de lutter lentement mais sûrement contre notre malédiction.",
    pourQui:
      "Faction de morts-vivant-es pacifistes et contemplatif-ves, sachant se défendre et lutter contre la malédiction silencieuse qui les ronge.",
    signale:
      "Votre recherche d'une solution contre l'éradication juvénile, la malédiction qui vous fait rajeunir d'années en années, et les risques de pogroms ou de fausses accusations.",
    interdits: "Morts-vivant-es : résistances et sensibilités spéciales de l'espèce s'appliquent.",
    contactOrga: true,
  },
  {
    nom: "Quête de vengeance ou d'honneur",
    pourQui:
      "Factions PJ qui veulent raconter une histoire prenante et venir en jeu avec un objectif de vengeance ou d'honneur.",
    signale: "Nous travaillerons ensemble les détails pour créer la particularité de votre faction.",
    contactOrga: true,
  },
  {
    nom: "Vaisseau du Fanum",
    citation: "Là où d'autres doutent, votre maison garde la flamme de l'Ancien Panthéon.",
    pourQui: "Factions dévouées au Fanum de Cristal.",
    signale:
      "Vos membres peuvent entreprendre en jeu de devenir adeptes, prêtres, voire Argousin-es (voir Règles de Magie, Rituels et Religion).",
    interdits: "Obligations cultuelles ; cible de la L.A.M.",
    marquesIncompatibles: ["Membre de la L.A.M. (Ordre des Chevaliers de Suie)"],
  },
];

export const marquesIndividuelles: Marque[] = [
  {
    nom: "Autre Marque personnelle de Destinée",
    pourQui: "Toute personne qui souhaite une Marque sur mesure.",
    signale:
      "Une Marque sur mesure reste possible : précisez-la dans votre background pour validation par l'Orga, dans le même esprit de dette narrative.",
    contactOrga: true,
  },
  {
    nom: "Béni-e de Fées",
    citation: "Un vieux lien druidique coule dans vos veines.",
    pourQui: "Héritier-ères des cercles druidiques éradiqués dans le lointain passé.",
    signale:
      "Peut apprendre en jeu, en étant Mystique, la compétence Marche dans l'Inframonde (tulle noire sur la tête, dialogue paisible avec les Fées et Fées-Démones, qui honorent les anciens cercles et n'attaquent pas).",
    debloque: ["Marche dans l'Inframonde"],
  },
  {
    nom: "Graine des Ténèbres",
    citation: "La nuit vous a choisi-e.",
    pourQui: "Elfes d'Elvendornen et praticien-nes de la Magie des Ténèbres.",
    signale: "Culte secret, esthétique morbide, traque du Fanum et des Cénobytes.",
    interdits: "Voir la grille des Marques sombres.",
    voieSombre: true,
  },
  {
    nom: "Métaphysique sacrificiel héroïque",
    citation: "L'esprit sur la matière ; mourir grand pour transcender.",
    pourQui: "Elfes du Décharnement.",
    signale: "Quête d'une mort héroïque transcendante, interface avec la Mort-Entité.",
    interdits: "Incompatible avec la religion du Cycle des Îles Bénies et avec la L.A.M.",
    especesReservees: ["Elfes Décharnement"],
    especesInterdites: ["Elfes Îles Bénies"],
    marquesIncompatibles: ["Membre de la L.A.M. (Ordre des Chevaliers de Suie)"],
  },
  {
    nom: "Nécromancie",
    citation: "Vous dérangez le repos des morts.",
    pourQui: "Praticien-nes de la mort figée.",
    signale: "Rejet universel, crime de sorcellerie interdite au sens de la Justice.",
    interdits:
      "Interdite aux Peaux Olives (sauf Hobgobelins), aux Vorélan-nes et aux Korrigans ; voir aussi la grille des Marques sombres.",
    especesInterdites: ["Orques", "Gobelins", "Trolls", "Vorélannes", "Korrigans"],
    voieSombre: true,
  },
  {
    nom: "Planaire",
    citation: "Un souffle, puis la chute : vous venez d'ailleurs.",
    pourQui:
      "Tout background extraplanaire, notamment la faction des Seishins et les Vorélan-nes (un document annexe leur est consacré).",
    signale:
      "Instabilité entre deux mondes, malaises, mot glissé à l'oreille, discussion spéciale après rituel. Le rituel d'ancrage (Arcanes) stabilise le temps de l'événement.",
    interdits:
      "Incompatible avec la Marque L.A.M., la Semence de Dragon et l'origine Porteur-euse de Rune (ancrage opposé), ainsi qu'avec Adepte – Fidèle, Agente d'une ONG, Bande organisée, Initié-e de la Guilde des Murmures, Mercenaire Peau-olive et Corsaire elfique.",
    attention:
      "Le personnage vit entre deux mondes : il doit se faire ancrer une fois par événement par un rituel païen, sans quoi il ne peut combattre plus de trois minutes avant de tomber épuisé.",
    marquesIncompatibles: ["Membre de la L.A.M. (Ordre des Chevaliers de Suie)", "Semence de Dragon"],
    originesIncompatibles: [
      "Porteur-euse de Rune",
      "Adepte – Fidèle",
      "Agente d'une ONG",
      "Bande organisée",
      "Initié-e de la Guilde des Murmures",
      "Mercenaire Peau-olive",
      "Corsaire elfique",
    ],
    imposeePourEspece: "Vorélannes",
  },
  {
    nom: "Recherché-e",
    citation: "Un bruit de pas vous suit dans le noir, ou bien est-ce votre imagination qui vous joue des tours ?",
    pourQui: "Votre vie est celle d'une personne pourchassée et en fuite.",
    signale:
      "Vous voulez un défi et proposez à l'Orga de scénarisation une raison pour laquelle quelqu'un vous recherche et réclame une dette, votre tête ou pire.",
    contactOrga: true,
  },
  {
    nom: "Semence de Dragon",
    citation:
      "Je ne suis pas un dragon. Je suis ce qu'il reste quand la semence du dragon touche la chair du multivers.",
    pourQui: "Draconides (voir la fiche dédiée auprès de l'Orga).",
    signale:
      "Nature draconique détectable, chassé-e par les cultes anti-dragons ; débloque l'apogée draconique (voir règles annexes Draconides et Vorélan-nes).",
    interdits:
      "Incompatible avec Adepte – Fidèle, Une Corona de l'Université de Rammstein, Initié-e de la Guilde des Murmures, Mercenaire Peau-olive, Sectaire ésotérico-magique, la L.A.M., Planaire et Porteur-euse de Rune.",
    attention:
      "Le personnage vit entre deux mondes : il doit se faire ancrer une fois par événement par un rituel païen, sans quoi il ne peut combattre plus de trois minutes avant de tomber épuisé.",
    marquesIncompatibles: ["Membre de la L.A.M. (Ordre des Chevaliers de Suie)", "Planaire"],
    originesIncompatibles: [
      "Adepte – Fidèle",
      "Une Corona de l'Université de Rammstein",
      "Initié-e de la Guilde des Murmures",
      "Mercenaire Peau-olive",
      "Sectaire ésotérico-magique",
      "Porteur-euse de Rune",
    ],
    imposeePourEspece: "Draconide",
  },
  {
    nom: "Téphromancie",
    citation: "La cendre parle à qui sait l'écouter.",
    pourQui: "Praticien-nes des cendres et des restes brûlés.",
    signale: "Voie sombre, pratiques proscrites par la Justice et traquées par le Fanum.",
    interdits: "Voir la grille des Marques sombres.",
    especesInterdites: ["Vorélannes", "Korrigans", "Elfes Îles Bénies"],
    voieSombre: true,
  },
];

/** Grille commune des interdits des voies sombres (Graine des Ténèbres, Téphromancie, Nécromancie) */
export const interditsVoiesSombres = [
  "Espèce et lore : les Peaux Olives refusent nécromancie et trafic de cadavres (sauf Hobgobelins) ; les Vorélan-nes en ont une connaissance ancienne, interdite par les Cénobytes ; les Korrigans, pacifistes éternels, restent hors de toute Marque offensive ; les Elfes des Îles Bénies s'y opposent par la religion du Cycle.",
  "Interdit légal : l'Article 1 des Principes de droit proscrit les coutumes liées à la Nécromancie et aux Ténèbres. Porter une Marque sombre revient à se déclarer hors-la-loi magique, traqué-e si découvert-e.",
  "Validation Orga obligatoire, deux mois avant l'événement, avec justification de background.",
];

export const getMarqueCollective = (nom: string) => marquesCollectives.find((m) => m.nom === nom);
export const getMarqueIndividuelle = (nom: string) => marquesIndividuelles.find((m) => m.nom === nom);

/** Marque individuelle imposée d'office par l'espèce (Vorélan-nes → Planaire, Draconide → Semence de Dragon) */
export const marqueImposeeParEspece = (espece: string): string | null =>
  marquesIndividuelles.find((m) => m.imposeePourEspece === espece)?.nom ?? null;
