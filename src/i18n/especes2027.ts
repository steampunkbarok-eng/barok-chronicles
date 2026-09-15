// Traductions EN/NL des données propres aux Draconides et Vorélan-nes (réforme 2027)
// Source : « Speciaal boekje van de drakenvolken en de Vorélans » (NL) et livret FR équivalent.

export const especeTexteEn2027: Record<string, string> = {
  // Espèces
  "Draconide": "Dragonfolk",
  "Vorélannes": "Vorélan-nes",

  // Aptitudes gratuites / interdits (segments séparés par « + »)
  "Immunité Frayeur": "Immunity to Fear",
  "Immunité Assommement": "Immunity to Knockout",
  "École du Mécanarcanum": "School of the Mécanarcanum",
  "Ordre Chevaliers Suie (LAM)": "Order of the Coal Knights (L.A.M.)",
  "Endurance accrue": "Increased Endurance",
  "Armures moyennes et lourdes (si magie)": "Medium and heavy armours (if magic)",
  "Armure niv.1": "Armour lvl.1",
  "Armure niv.2": "Armour lvl.2",
  "Armure niv.3": "Armour lvl.3",
  "(aucun port d'armure réel : toute armure portée est purement décorative)": "(no real armour may be worn: any armour worn is purely decorative)",
  "Détection Magie": "Natural Magic Detection",
  "Résistance Flatterie": "Flattery Resistance",
  "Flatterie": "Flattery",
  "Nécromancie": "Necromancy",
  "Ténèbres": "Darkness",
  "Téphromanie": "Tephramancy",

  // Particularités complètes
  "Enveloppe Planaire (1 PA naturel non cumulable avec armure portée) + Double Esprit (consultation 1×/jour via Argousin-e) + Désincarnation Éthérée (+2 Abîme à chaque désincarnation) + Signalétique rubans obligatoire selon l'école magique pratiquée":
    "Planar envelope (1 natural armour point on every location, not cumulative with worn armour) + Double spirit (one consultation per day through an Argousin) + Ethereal disembodiment (+2 Abyss at each disembodiment) + Mandatory Weaver signage according to the magic school practised",
  "3 PV par localisation (au lieu de 2) + 2 PA naturels sur toutes les localisations (cumulables avec armure légère uniquement) + Glandes draconiques : 1 crachat élémentaire 1×/jour + 1 annonce spéciale 1×/jour selon la couleur choisie à la création + Chair magiquement réactive (résistance = sensibilité symétrique) + Vulnérabilité Enchanted (×2) + Vulnérabilité martiale (Abîme/Crush/Strike Down plein effet) + Pas de domiciliation, pas de foi divine + Lieu de culte corrompu = Semence du Néant. Background obligatoire validé par l'Orga + type de glandes à choisir.":
    "Draconic robustness: 3 hit points per location (instead of 2) + Partial Scales: 2 natural armour points on every location + Draconic glands: one elemental spit per day with the call of the colour chosen at creation + Magically reactive flesh (resistance = symmetrical vulnerability) + Vulnerability to 'enchanted' (2 damage instead of 1) + 'abyss', 'crush' and 'strike down' cannot be resisted + Shifting domiciliation, no divine faith + Corrupted place of worship = Seed of Nothingness. Background validated by the organisation + gland type to be chosen.",

  // Glandes draconiques
  "Blanc": "White", "Bleu": "Blue", "Noir": "Black", "Rouge": "Red", "Vert": "Green",
  "Mauve": "Mauve", "Jaune": "Yellow", "Violet": "Purple", "Orange": "Orange", "Gris": "Grey", "Rose": "Pink",
  "Froid": "Cold", "Électricité": "Electricity", "Acide": "Acid", "Feu": "Fire", "Toxicité": "Toxicity",
  "Apaisement": "Soothing", "Folie": "Madness", "Vie": "Life", "Alchimie": "Alchemy", "Griffes naturelles": "Natural claws",
  "Dégâts et sorts de froid": "Cold damage and cold spells",
  "Électricité — Flash sans effet ; Destroy sans effet sur armes/objets/armures":
    "Electricity — Flash has no effect; Destroy has no effect on weapons/objects/armour",
  "Acidité — aucun effet d'Acid": "Acidity — Acid has no effect",
  "Feu — Burn et Bonfire sans effet": "Fire — Burn and Bonfire have no effect",
  "Toxicité — Poison et Toxine sans effet": "Toxicity — Poison and Toxin have no effect",
  "Nécromancie — régénération uniquement par blessures reçues ou soins nécrotiques":
    "Necromancy — regeneration only through wounds received or necrotic care",
  "Esprit — Amnésie, Sleep et Flatterie sans effet": "Mind — Amnesia, Sleep and Flattery have no effect",
  "Psychique — Abyss et Fear sans effet": "Psychic — Abyss and Fear have no effect",
  "Vitale — non affecté par Galvanisé (2 dégâts)": "Vital — unaffected by Galvanised (2 damage)",
  "Alchimie — résiste à la Transmutation": "Alchemy — resists Transmutation",
  "Griffes permanentes en latex (sans homologation BWAT)": "Permanent natural claws in foam and latex (BWAT approval mandatory)",
  "Paralysie / immobilisation": "Paralysis / immobilisation",
  "Silver": "Silver", "Mercure et Rust": "Mercury and Rust", "Froid (Ice)": "Cold (Ice)",
  "Soins inversés : tout soin ou sort de soin inflige d'office -2 PV par localisation soignée. Sensibilité ×2 à Shock + Blessed et Sleep infligent 2 points de dégâts.":
    "Reversed healing: any care or healing spell automatically inflicts -2 HP per healed location. ×2 sensitivity to Shock + Blessed and Sleep inflict 2 damage points.",
  "Bagarre (annonces de bagarre doublées)": "Brawl (brawl calls doubled)",
  "Purification, psychiatrie et régénération psychique (-1 PV par minute)":
    "Purification, psychiatry and psychic regeneration (-1 HP per minute)",
  "Mort temporaire et Grâce (séquelle à la résurrection)": "Temporary death and Grace (after-effect at resurrection)",
  "Dissipation, Contresort et Mute : +1 perte d'Abîme": "Dispel, Counterspell and Mute: +1 Abyss loss",
  "Aucune arme fabriquée ; pas de Manipulation d'armes": "No manufactured weapon; no Weapon Handling",
  "Les soins standards blessent (-2 PV/loc) au lieu de soigner. Shock ×2. Blessed et Sleep = 2 dégâts.":
    "Standard healing wounds (-2 HP/loc) instead of healing. Shock ×2. Blessed and Sleep = 2 damage.",
  "Interdit toute arme fabriquée et la compétence Manipulation d'armes.":
    "Forbids every manufactured weapon and the Weapon Handling skill.",
  "Acid (armure détruite + -1 PV toutes localisations)": "Acid (armour destroyed + -1 HP all locations)",
  "Flash (êtres) ou Destroy (machines)": "Flash (beings) or Destroy (machines)",
  "Vampire Kiss (-2 PV loc. touchée par un sort de soin ou soignée)":
    "Vampire Kiss (-2 HP on a location hit by a healing spell or healed)",
};

export const especeTexteNl2027: Record<string, string> = {
  "Draconide": "Drakenvolk",
  "Vorélannes": "Vorélans",

  "Immunité Frayeur": "Immuniteit voor Schrik",
  "Immunité Assommement": "Immuniteit voor Bewusteloosheid",
  "École du Mécanarcanum": "School van het Mécanarcanum",
  "Ordre Chevaliers Suie (LAM)": "Orde van de Steenkoolridders (L.A.M.)",
  "Endurance accrue": "Verhoogd uithoudingsvermogen",
  "Armures moyennes et lourdes (si magie)": "Middelzware en zware pantsers (bij magie)",
  "Armure niv.1": "Pantser niv.1",
  "Armure niv.2": "Pantser niv.2",
  "Armure niv.3": "Pantser niv.3",
  "(aucun port d'armure réel : toute armure portée est purement décorative)": "(geen echt pantser mogelijk: elk gedragen pantser is louter decoratief)",
  "Détection Magie": "Magiedetectie",
  "Résistance Flatterie": "Weerstand tegen Vleierij",
  "Flatterie": "Vleierij",
  "Nécromancie": "Necromantie",
  "Ténèbres": "Duisternis",
  "Téphromanie": "Tefromantie",

  "Enveloppe Planaire (1 PA naturel non cumulable avec armure portée) + Double Esprit (consultation 1×/jour via Argousin-e) + Désincarnation Éthérée (+2 Abîme à chaque désincarnation) + Signalétique rubans obligatoire selon l'école magique pratiquée":
    "Planair omhulsel (1 natuurlijk pantserpunt, niet cumuleerbaar met gedragen pantser) + Dubbele geest (één raadpleging per dag via een Argousin) + Etherische ontlichaming (+2 Abyss bij elke ontlichaming) + Verplichte lintkentekens volgens de beoefende magieschool",
  "3 PV par localisation (au lieu de 2) + 2 PA naturels sur toutes les localisations (cumulables avec armure légère uniquement) + Glandes draconiques : 1 crachat élémentaire 1×/jour + 1 annonce spéciale 1×/jour selon la couleur choisie à la création + Chair magiquement réactive (résistance = sensibilité symétrique) + Vulnérabilité Enchanted (×2) + Vulnérabilité martiale (Abîme/Crush/Strike Down plein effet) + Pas de domiciliation, pas de foi divine + Lieu de culte corrompu = Semence du Néant. Background obligatoire validé par l'Orga + type de glandes à choisir.":
    "3 hit points per locatie (in plaats van 2) + 2 natuurlijke pantserpunten op alle locaties (enkel cumuleerbaar met licht pantser) + Drakenklieren: 1 elementair spuwsel per dag + 1 bijzondere aankondiging per dag volgens de bij de creatie gekozen kleur + Magisch reactief vlees (weerstand = symmetrische gevoeligheid) + Kwetsbaarheid voor Enchanted (×2) + Martiale kwetsbaarheid (Abyss/Crush/Strike Down met volle werking) + Geen domiciliëring, geen goddelijk geloof + Verdorven cultusplaats = Zaad van de Nietsheid. Verplichte achtergrond goedgekeurd door de organisatie + kliertype te kiezen.",

  "Blanc": "Wit", "Bleu": "Blauw", "Noir": "Zwart", "Rouge": "Rood", "Vert": "Groen",
  "Mauve": "Mauve", "Jaune": "Geel", "Violet": "Paars", "Orange": "Oranje", "Gris": "Grijs", "Rose": "Roze",
  "Froid": "Koude", "Électricité": "Elektriciteit", "Acide": "Zuur", "Feu": "Vuur", "Toxicité": "Toxiciteit",
  "Apaisement": "Verzachting", "Folie": "Waanzin", "Vie": "Leven", "Alchimie": "Alchemie",
  "Griffes naturelles": "Natuurlijke klauwen",
  "Dégâts et sorts de froid": "Koudeschade en koudespreuken",
  "Électricité — Flash sans effet ; Destroy sans effet sur armes/objets/armures":
    "Elektriciteit — Flash zonder effect; Destroy zonder effect op wapens/voorwerpen/pantsers",
  "Acidité — aucun effet d'Acid": "Zuurheid — Acid heeft geen effect",
  "Feu — Burn et Bonfire sans effet": "Vuur — Burn en Bonfire zonder effect",
  "Toxicité — Poison et Toxine sans effet": "Toxiciteit — Poison en Toxine zonder effect",
  "Nécromancie — régénération uniquement par blessures reçues ou soins nécrotiques":
    "Necromantie — regeneratie enkel door ontvangen wonden of necrotische verzorging",
  "Esprit — Amnésie, Sleep et Flatterie sans effet": "Geest — Amnesie, Sleep en Vleierij zonder effect",
  "Psychique — Abyss et Fear sans effet": "Psychisch — Abyss en Fear zonder effect",
  "Vitale — non affecté par Galvanisé (2 dégâts)": "Vitaal — niet getroffen door Galvanisatie (2 schade)",
  "Alchimie — résiste à la Transmutation": "Alchemie — weerstaat Transmutatie",
  "Griffes permanentes en latex (sans homologation BWAT)": "Permanente klauwen in latex (zonder BWAT-homologatie)",
  "Paralysie / immobilisation": "Verlamming / immobilisatie",
  "Silver": "Silver", "Mercure et Rust": "Mercury en Rust", "Froid (Ice)": "Koude (Ice)",
  "Soins inversés : tout soin ou sort de soin inflige d'office -2 PV par localisation soignée. Sensibilité ×2 à Shock + Blessed et Sleep infligent 2 points de dégâts.":
    "Omgekeerde verzorging: elke verzorging of genezingsspreuk brengt automatisch -2 hit points per verzorgde locatie toe. Gevoeligheid ×2 voor Shock + Blessed en Sleep brengen 2 schadepunten toe.",
  "Bagarre (annonces de bagarre doublées)": "Knokken (knokaankondigingen verdubbeld)",
  "Purification, psychiatrie et régénération psychique (-1 PV par minute)":
    "Zuivering, psychiatrie en psychische regeneratie (-1 hit point per minuut)",
  "Mort temporaire et Grâce (séquelle à la résurrection)": "Tijdelijke dood en Gratie (nasleep bij de herrijzenis)",
  "Dissipation, Contresort et Mute : +1 perte d'Abîme": "Dissipatie, Tegenspreuk en Mute: +1 verlies aan Abyss",
  "Aucune arme fabriquée ; pas de Manipulation d'armes": "Geen enkel gemaakt wapen; geen Wapenbeheersing",
  "Les soins standards blessent (-2 PV/loc) au lieu de soigner. Shock ×2. Blessed et Sleep = 2 dégâts.":
    "Standaardverzorging verwondt (-2 hit points/loc) in plaats van te genezen. Shock ×2. Blessed en Sleep = 2 schade.",
  "Interdit toute arme fabriquée et la compétence Manipulation d'armes.":
    "Verbiedt elk gemaakt wapen en de vaardigheid Wapenbeheersing.",
  "Acid (armure détruite + -1 PV toutes localisations)": "Acid (pantser vernietigd + -1 hit point op alle locaties)",
  "Flash (êtres) ou Destroy (machines)": "Flash (wezens) of Destroy (machines)",
  "Vampire Kiss (-2 PV loc. touchée par un sort de soin ou soignée)":
    "Vampire Kiss (-2 hit points op een locatie die door een genezingsspreuk geraakt of verzorgd wordt)",
};

/** Traduit un texte d'espèce / de glande draconique (2027). Renvoie le texte source si absent. */
export const translateEspeceText = (text: string, language: 'fr' | 'en' | 'nl'): string => {
  if (!text || language === 'fr') return text;
  const map = language === 'nl' ? especeTexteNl2027 : especeTexteEn2027;
  return map[text] || text;
};
