// Tableau de référence des glandes draconiques (Livret spécial Draconides & Vorélan-nes 2027)
// Les annonces de jeu restent en anglais dans les trois langues (règle du Lexicon).

export interface GlandeTexte {
  couleur: string;
  crachat: string;
  resistance: string;
  sensibilite: string;
  note?: string;
}

export interface GlandeDraconique extends GlandeTexte {
  /** Annonce de jeu (toujours en anglais) */
  annonce: string;
  en: GlandeTexte;
  nl: GlandeTexte;
}

export const glandesDraconiques: GlandeDraconique[] = [
  {
    couleur: "Blanc",
    crachat: "Froid",
    annonce: "ice",
    resistance: "Froid : les dégâts et les sorts de froid n'ont aucun effet sur vous",
    sensibilite: "Feu : effet doublé",
    en: {
      couleur: "White",
      crachat: "Cold",
      resistance: "Cold: cold damage and cold spells have no effect on you",
      sensibilite: "Fire: effect doubled",
    },
    nl: {
      couleur: "Wit",
      crachat: "Koude",
      resistance: "Koude: koudeschade en koudespreuken hebben geen effect op jou",
      sensibilite: "Vuur: effect verdubbeld",
    },
  },
  {
    couleur: "Bleu",
    crachat: "Électricité",
    annonce: "flash (êtres) / destroy (machines)",
    resistance: "« flash » n'a aucun effet sur vous ; « destroy » n'a aucun effet sur vos armes, objets et armures",
    sensibilite: "Paralysie et immobilisation : effet doublé",
    en: {
      couleur: "Blue",
      crachat: "Electricity",
      resistance: "'flash' has no effect on you; 'destroy' has no effect on your weapons, objects and armour",
      sensibilite: "Paralysis and immobilisation: effect doubled",
    },
    nl: {
      couleur: "Blauw",
      crachat: "Elektriciteit",
      resistance: "« flash » heeft geen effect op jou; « destroy » heeft geen effect op je wapens, voorwerpen en pantsers",
      sensibilite: "Verlamming en immobilisatie: effect verdubbeld",
    },
  },
  {
    couleur: "Noir",
    crachat: "Acide (armure détruite, -1 PV sur toutes les localisations de la cible)",
    annonce: "acid",
    resistance: "Acidité : « acid » n'a aucun effet",
    sensibilite: "« silver » : effet doublé",
    en: {
      couleur: "Black",
      crachat: "Acid (armour destroyed, 1 hit point fewer on every location of the target)",
      resistance: "Acidity: 'acid' has no effect",
      sensibilite: "'silver': effect doubled",
    },
    nl: {
      couleur: "Zwart",
      crachat: "Zuur (pantser vernietigd, 1 hit point minder op alle locaties van het doelwit)",
      resistance: "Zuurgraad: « acid » heeft geen effect",
      sensibilite: "« silver »: effect verdubbeld",
    },
  },
  {
    couleur: "Rouge",
    crachat: "Feu",
    annonce: "bonfire",
    resistance: "Feu : « burn » et « bonfire » n'ont aucun effet sur vous",
    sensibilite: "Froid (« ice ») et « waterfall » : effet doublé",
    en: {
      couleur: "Red",
      crachat: "Fire",
      resistance: "Fire: 'burn' and 'bonfire' have no effect on you",
      sensibilite: "Cold ('ice') and 'waterfall': effect doubled",
    },
    nl: {
      couleur: "Rood",
      crachat: "Vuur",
      resistance: "Vuur: « burn » en « bonfire » hebben geen effect op jou",
      sensibilite: "Koude (« ice ») en « waterfall »: effect verdubbeld",
    },
  },
  {
    couleur: "Vert",
    crachat: "Toxicité",
    annonce: "toxic",
    resistance: "Résistance aux poisons et aux toxines",
    sensibilite: "« mercury » et « rust » : effet doublé",
    en: {
      couleur: "Green",
      crachat: "Toxicity",
      resistance: "Resistance to poisons and toxins",
      sensibilite: "'mercury' and 'rust': effect doubled",
    },
    nl: {
      couleur: "Groen",
      crachat: "Giftigheid",
      resistance: "Weerstand tegen vergiften en toxines",
      sensibilite: "« mercury » en « rust »: effect verdubbeld",
    },
  },
  {
    couleur: "Mauve",
    crachat:
      "Nécromancie (« vampyr kiss » : -1 PV sur la localisation touchée, +1 PV soigné sur le lanceur). Vous pouvez récolter des cartes d'âme auprès des vivants, avec leur accord.",
    annonce: "vampyr kiss",
    resistance:
      "Vous n'avez pas de points d'Abîme. Vous ne régénérez que par soins nécrotiques : « sickness », « drain life », « wound » et « scars » vous rendent chacun 1 PV sans autre effet.",
    sensibilite:
      "Soins : les sorts et huiles de soin standards vous blessent au lieu de soigner. Comme tous les morts : « silver » inflige 2 dégâts au lieu de 1 ; « crush » ou « sacred » vous détruit instantanément. Vous devez rejoindre un lieu de culte corrompu pour « respawner », sinon exécution ou Entité de la Mort. « bonfire » vous rend vulnérable aux attaques ordinaires pendant 3 coups.",
    note: "Draconide mort-vivant : les soins standards blessent, la régénération passe uniquement par les soins nécrotiques.",
    en: {
      couleur: "Mauve",
      crachat:
        "Necromancy ('vampyr kiss': 1 hit point fewer on the location struck, 1 HP healed on the caster). You may collect soul cards from the living, with their consent.",
      resistance:
        "You have no abyss points. You regenerate only through necrotic care: 'sickness', 'drain life', 'wound' and 'scars' each return 1 hit point to you with no other effect.",
      sensibilite:
        "Healing: standard healing spells and oils deal damage to you instead of healing. Like all the dead: 'silver' deals two points of damage instead of one; 'crush' or 'sacred' destroys you instantly. You must go to a corrupted place of worship to respawn, otherwise you are executed or go to the Death Entity. 'bonfire' leaves you vulnerable to ordinary attacks for 3 hits.",
      note: "Undead Dragonfolk: standard care wounds you; regeneration comes only through necrotic care.",
    },
    nl: {
      couleur: "Mauve",
      crachat:
        "Necromantie (« vampyr kiss »: 1 hit point minder op de geraakte locatie, 1 HP genezen op de spreukgebruiker). Je mag zielenverzamelkaarten bij levenden ophalen, met hun instemming.",
      resistance:
        "Je hebt geen krankzinnigheidspunten. Je regenereert enkel door necrotische verzorging: « sickness », « drain life », « wound » en « scars » geven je elk 1 hit point terug zonder ander effect.",
      sensibilite:
        "Genezing: gewone genezingsspreuken en -oliën brengen je schade toe in plaats van te genezen. Zoals alle doden: « silver » doet twee schadepunten in plaats van één; « crush » of « sacred » vernietigt je onmiddellijk. Je moet naar een verdorven cultusplaats om te respawnen, anders word je terechtgesteld of ga je naar de doodsentiteit. « bonfire » maakt je gedurende 3 treffers kwetsbaar voor gewone aanvallen.",
      note: "Ondood lid van het Drakensvolk: gewone verzorging brengt schade toe; regeneratie enkel via necrotische verzorging.",
    },
  },
  {
    couleur: "Jaune",
    crachat: "Apaisement",
    annonce: "sleep",
    resistance: "Esprit : amnésie, « sleep », paf (1×/jour) et Flatterie n'ont aucun effet",
    sensibilite:
      "En Bagarre, le score de votre adversaire est doublé ; signalez-le. Pour un assommement, il faut s'y reprendre à deux fois pour que cela fonctionne.",
    en: {
      couleur: "Yellow",
      crachat: "Soothing",
      resistance: "Spirit: amnesia, 'sleep', paf (once per day) and Flattery have no effect",
      sensibilite:
        "In Brawling, your opponent's score doubles; tell them so. For a knockout, it must be done twice for it to work.",
    },
    nl: {
      couleur: "Geel",
      crachat: "Verzachting",
      resistance: "Geest: amnesia, « sleep », paf (1 keer per dag) en Vleierij hebben geen effect",
      sensibilite:
        "Bij Knokken verdubbelt de score van je tegenstander; meld hem dat. Bij een poging tot bewusteloos slaan moet het twee keer gebeuren voor het werkt.",
    },
  },
  {
    couleur: "Violet",
    crachat: "Folie",
    annonce: "abyss",
    resistance:
      "Psychique : « abyss » sans effet. L'immunité à « fear » est commune à toute l'espèce ; vous résistez aussi à « mass fear »",
    sensibilite: "Purification, psychiatrie et régénération : -1 PV et -1 point d'Abîme par minute de traitement sur vous",
    en: {
      couleur: "Violet",
      crachat: "Madness",
      resistance:
        "Psychic: 'abyss' has no effect. Immunity to 'fear' is common to the whole species; you also resist 'mass fear'",
      sensibilite: "Purification, psychiatry and regeneration: -1 hit point and -1 Abyss point per minute of treatment on you",
    },
    nl: {
      couleur: "Paars",
      crachat: "Waanzin",
      resistance:
        "Psychisch: « abyss » zonder effect. De immuniteit voor « fear » is aan het hele volk gemeen; jij weerstaat ook « mass fear »",
      sensibilite:
        "Purificatie, psychiatrie en regeneratie: -1 hit point en -1 krankzinnigheidspunt per minuut behandeling op jou",
    },
  },
  {
    couleur: "Orange",
    crachat: "Vie",
    annonce: "heal",
    resistance: "Résistance vitale : insensible à l'attaque galvanisée infligeant 2 points de dégâts",
    sensibilite: "Mort temporaire et Coup de Grâce : provoque une séquelle à la résurrection (voir la Liste des Règles générales)",
    en: {
      couleur: "Orange",
      crachat: "Life",
      resistance: "Vital resistance: insensitive to the galvanised attack dealing 2 points of damage",
      sensibilite: "Temporary death and Coup de Grâce: causes an after-effect at resurrection (see the List in the General Rules)",
    },
    nl: {
      couleur: "Oranje",
      crachat: "Leven",
      resistance: "Levensweerstand: ongevoelig voor de gegalvaniseerde aanval die 2 schadepunten toebrengt",
      sensibilite:
        "Tijdelijke dood en Genadeslag: veroorzaakt een restletsel bij de wederopstanding (zie de Lijst in de Algemene regels)",
    },
  },
  {
    couleur: "Gris",
    crachat: "Alchimie",
    annonce: "mercury",
    resistance: "Alchimie : résistance à la transmutation",
    sensibilite: "Dissipation, Contresort et « mute » : 1 point d'Abîme perdu en plus",
    en: {
      couleur: "Grey",
      crachat: "Alchemy",
      resistance: "Alchemy: resistance to transmutation",
      sensibilite: "Dispelling, Counterspell and 'mute': 1 further Abyss point lost",
    },
    nl: {
      couleur: "Grijs",
      crachat: "Alchemie",
      resistance: "Alchemie: weerstand tegen transmutatie",
      sensibilite: "Opheffing, Tegenspreuk en « mute »: 1 krankzinnigheidspunt extra verloren",
    },
  },
  {
    couleur: "Turquoise",
    crachat: "Évocation",
    annonce: "enchanted",
    resistance: "Silence et Maladresse : résistance à « mute » et « disarm »",
    sensibilite: "Magie des Pactes : 1 point d'Abîme et 1 PV perdus en plus",
    en: {
      couleur: "Turquoise",
      crachat: "Evocation",
      resistance: "Silence and Clumsiness: resistance to 'mute' and 'disarm'",
      sensibilite: "Magic of Pacts: 1 Abyss point and 1 hit point further lost",
    },
    nl: {
      couleur: "Turkoois",
      crachat: "Oproeping",
      resistance: "Stilte en Onhandigheid: weerstand tegen « mute » en « disarm »",
      sensibilite: "Magie van de Pacten: 1 krankzinnigheidspunt en 1 hit point extra minder",
    },
  },
  {
    couleur: "Rose",
    crachat:
      "Vous crachez l'annonce « fear ». Griffes naturelles permanentes en mousse et latex, utilisables au corps à corps sans outil fabriqué.",
    annonce: "fear",
    resistance:
      "Attaques magiques : résistance, sauf « enchanted ». Les compétences Manipulation d'armes et Artilleur sont interdites.",
    sensibilite: "Nécromancie : 1 point d'Abîme et 1 PV perdus en plus",
    note:
      "Les griffes naturelles sont des armes permanentes : aucune arme fabriquée ni compétence Manipulation d'armes. Griffes larges en mousse et latex, homologation BWAT obligatoire.",
    en: {
      couleur: "Pink",
      crachat:
        "You spit the call 'fear'. Permanent natural claws in foam and latex, usable in melee with no manufactured tool.",
      resistance: "Magical attacks: resistance, except for 'enchanted'. The Weapon Handling and Artillerist skills are forbidden.",
      sensibilite: "Necromancy: 1 Abyss point and 1 hit point further lost",
      note:
        "The natural claws are permanent weapons: no manufactured weapon and no Weapon Handling skill. Broad claws in foam and latex, BWAT approval mandatory.",
    },
    nl: {
      couleur: "Roze",
      crachat:
        "Je spuwt de aankondiging « fear ». Blijvende natuurlijke klauwen in schuim en latex, bruikbaar in het handgemeen zonder gemaakt werktuig.",
      resistance:
        "Magische aanvallen: weerstand, met uitzondering van « enchanted ». De vaardigheden Wapenbeheersing en Artillerist zijn verboden.",
      sensibilite: "Necromantie: 1 krankzinnigheidspunt en 1 hit point extra minder",
      note:
        "De natuurlijke klauwen zijn blijvende wapens: geen gemaakt wapen en geen vaardigheid Wapenbeheersing. Brede klauwen in schuim en latex, BWAT-keuring verplicht.",
    },
  },
  {
    couleur: "Cyan",
    crachat: "Ténèbres (attaque aveuglante et blessante)",
    annonce: "blind",
    resistance: "Ténèbres : immunisé aux effets des Ténèbres",
    sensibilite: "« holy » : toute annonce sacrée a un effet doublé",
    en: {
      couleur: "Cyan",
      crachat: "Darkness (a blinding and wounding attack)",
      resistance: "Darkness: immune to the effects of Darkness",
      sensibilite: "'holy': any sacred call has a doubled effect",
    },
    nl: {
      couleur: "Cyaan",
      crachat: "Duisternis (verblindende en verwondende aanval)",
      resistance: "Duisternis: immuun voor de effecten van de Duisternis",
      sensibilite: "« holy »: elke gewijde aankondiging brengt een verdubbeld effect toe",
    },
  },
  {
    couleur: "Indigo",
    crachat: "Destruction (arme ou armure détruite)",
    annonce: "rust",
    resistance: "Résistance à « mercury » et « rust »",
    sensibilite: "Mécanarcanum et êtres mécaniques : 1 point d'Abîme et 1 PV en moins (armures ou protections runiques)",
    en: {
      couleur: "Indigo",
      crachat: "Destruction (weapon or armour destroyed)",
      resistance: "Resistance to 'mercury' and 'rust'",
      sensibilite: "Mécanarcanum and mechanical beings: 1 Abyss point and 1 hit point fewer (armour or runic protections)",
    },
    nl: {
      couleur: "Indigo",
      crachat: "Vernietiging (wapen of pantser vernietigd)",
      resistance: "Weerstand tegen « mercury » en « rust »",
      sensibilite:
        "Mécanarcanum en mechanische wezens: 1 krankzinnigheidspunt en 1 hit point minder (pantsers of runenbeschermingen)",
    },
  },
  {
    couleur: "Bronze",
    crachat: "Sylvestre",
    annonce: "glue",
    resistance: "Résistance aux sorts du Mécanarcanum",
    sensibilite: "Élémentalisme : 1 point d'Abîme et 1 PV perdus en plus",
    en: {
      couleur: "Bronze",
      crachat: "Sylvan",
      resistance: "Resistance to the spells of the Mécanarcanum",
      sensibilite: "Elementalism: 1 Abyss point and 1 hit point further lost",
    },
    nl: {
      couleur: "Brons",
      crachat: "Bosachtig",
      resistance: "Weerstand tegen de spreuken van het Mécanarcanum",
      sensibilite: "Elementalisme: 1 krankzinnigheidspunt en 1 hit point extra minder",
    },
  },
  {
    couleur: "Nacre",
    crachat: "Abjuration (lève malédictions, sorts d'esprit et pertes d'Abîme)",
    annonce: "purify",
    resistance: "Résistance et immunité aux corruptions et malédictions",
    sensibilite: "Magie du Sang : 1 point d'Abîme et 1 PV perdus en plus",
    en: {
      couleur: "Pearl",
      crachat: "Abjuration (lifts curses, spirit spells and Abyss loss)",
      resistance: "Resistance and immunity to corruptions and curses",
      sensibilite: "Blood Magic: 1 Abyss point and 1 hit point further lost",
    },
    nl: {
      couleur: "Parelmoer",
      crachat: "Afwering (heft vloeken, geestesspreuken en verlies van krankzinnigheid op)",
      resistance: "Weerstand tegen en immuniteit voor corrupties en vloeken",
      sensibilite: "Bloedmagie: 1 krankzinnigheidspunt en 1 hit point extra minder",
    },
  },
  {
    couleur: "Argent",
    crachat: "Argenture",
    annonce: "silver",
    resistance: "« silver » : aucun effet",
    sensibilite:
      "« acid » (armure détruite, -1 PV sur toutes les localisations) et transmutation (1 PV par localisation)",
    en: {
      couleur: "Silver",
      crachat: "Silvering",
      resistance: "'silver': no effect at all",
      sensibilite: "'acid' (armour destroyed, 1 hit point fewer on every location) and transmutation (1 hit point per location)",
    },
    nl: {
      couleur: "Zilver",
      crachat: "Verzilvering",
      resistance: "« silver »: geen enkel effect",
      sensibilite: "« acid » (pantser vernietigd, 1 hit point minder op alle locaties) en transmutatie (1 hit point per locatie)",
    },
  },
  {
    couleur: "Or",
    crachat: "Sainteté (attaque sacrée)",
    annonce: "holy",
    resistance: "Sacré : Domination, Influence et Charme n'ont aucun effet sur vous",
    sensibilite: "Ténèbres : 1 point d'Abîme et 1 PV perdus en plus",
    en: {
      couleur: "Gold",
      crachat: "Holiness (sacred attack)",
      resistance: "Sacred: Domination, Influence and Charm have no effect on you",
      sensibilite: "Darkness: 1 Abyss point and 1 hit point further lost",
    },
    nl: {
      couleur: "Goud",
      crachat: "Heiligheid (gewijde aanval)",
      resistance: "Gewijd: Overheersing, Beïnvloeding en Charme hebben geen effect op jou",
      sensibilite: "Duisternis: 1 krankzinnigheidspunt en 1 hit point extra minder",
    },
  },
  {
    couleur: "Écarlate",
    crachat:
      "Magie du Sang (« bleed » : 1 PV par minute sur la localisation annoncée). La régénération et la purification soignent cette affliction.",
    annonce: "bleed",
    resistance:
      "Résistance à la Magie du Sang. Vos soins fonctionnent ainsi : « sickness », « drain life », « scars » et « wound » vous donnent chacun 1 PV.",
    sensibilite: "« purify », « strike down » et les attaques sacrées (« holy ») vous coûtent aussi -1 PV",
    en: {
      couleur: "Scarlet",
      crachat:
        "Blood Magic ('bleed': 1 hit point per minute on the location called). Regeneration and purification cure this affliction.",
      resistance:
        "Resistance to Blood Magic. Your healing works as follows: 'sickness', 'drain life', 'scars' and 'wound' each give you 1 HP.",
      sensibilite: "'purify', 'strike down' and sacred attacks ('holy') also cost you -1 hit point",
    },
    nl: {
      couleur: "Scharlaken",
      crachat:
        "Bloedmagie (« bleed »: 1 hit point per minuut op de aangekondigde locatie). Regeneratie en purificatie genezen deze kwaal.",
      resistance:
        "Weerstand tegen de Bloedmagie. Jouw verzorging is de volgende: « sickness », « drain life », « scars » en « wound » geven je elk 1 HP.",
      sensibilite: "« purify », « strike down » en gewijde aanvallen (« holy ») doen je eveneens -1 hit point",
    },
  },
];

/** Renvoie les textes de la glande dans la langue demandée. */
export const glandeTexte = (
  g: GlandeDraconique,
  language: "fr" | "en" | "nl"
): GlandeTexte => (language === "en" ? g.en : language === "nl" ? g.nl : g);

/** Retrouve une glande par sa couleur française (valeur stockée en base). */
export const getGlande = (couleur?: string): GlandeDraconique | undefined =>
  couleur ? glandesDraconiques.find((g) => g.couleur === couleur) : undefined;

/** Résumé court (une ligne) des effets d'une glande, dans la langue demandée. */
export const glandeResume = (couleur: string | undefined, language: "fr" | "en" | "nl"): string => {
  const g = getGlande(couleur);
  if (!g) return "";
  const tx = glandeTexte(g, language);
  const labels =
    language === "en"
      ? { spit: "Spit", res: "Resistance", vuln: "Vulnerability" }
      : language === "nl"
      ? { spit: "Spuwsel", res: "Weerstand", vuln: "Gevoeligheid" }
      : { spit: "Crachat", res: "Résistance", vuln: "Sensibilité" };
  return `${labels.spit} : ${tx.crachat} (« ${g.annonce} », 1×/jour) — ${labels.res} : ${tx.resistance} — ${labels.vuln} : ${tx.sensibilite}${tx.note ? ` — ${tx.note}` : ""}`;
};
