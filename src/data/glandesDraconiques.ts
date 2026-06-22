export interface GlandeDraconique {
  couleur: string;
  crachat: string;
  annonce: string;
  resistance: string;
  sensibilite: string;
  note?: string;
}

export const glandesDraconiques: GlandeDraconique[] = [
  {
    couleur: "Blanc",
    crachat: "Froid",
    annonce: "Ice",
    resistance: "Dégâts et sorts de froid",
    sensibilite: "Feu",
  },
  {
    couleur: "Bleu",
    crachat: "Électricité",
    annonce: "Flash (êtres) ou Destroy (machines)",
    resistance: "Électricité — Flash sans effet ; Destroy sans effet sur armes/objets/armures",
    sensibilite: "Paralysie / immobilisation",
  },
  {
    couleur: "Noir",
    crachat: "Acide",
    annonce: "Acid (armure détruite + -1 PV toutes localisations)",
    resistance: "Acidité — aucun effet d'Acid",
    sensibilite: "Silver",
  },
  {
    couleur: "Rouge",
    crachat: "Feu",
    annonce: "Bonfire",
    resistance: "Feu — Burn et Bonfire sans effet",
    sensibilite: "Froid (Ice)",
  },
  {
    couleur: "Vert",
    crachat: "Toxicité",
    annonce: "Toxic",
    resistance: "Toxicité — Poison et Toxine sans effet",
    sensibilite: "Mercure et Rust",
  },
  {
    couleur: "Mauve",
    crachat: "Nécromancie",
    annonce: "Vampire Kiss (-2 PV loc. touchée par un sort de soin ou soignée)",
    resistance: "Nécromancie — régénération uniquement par blessures reçues ou soins nécrotiques",
    sensibilite: "Soins inversés : tout soin ou sort de soin inflige d'office -2 PV par localisation soignée. Sensibilité ×2 à Shock + Blessed et Sleep infligent 2 points de dégâts.",
    note: "Les soins standards blessent (-2 PV/loc) au lieu de soigner. Shock ×2. Blessed et Sleep = 2 dégâts.",
  },
  {
    couleur: "Jaune",
    crachat: "Apaisement",
    annonce: "Sleep",
    resistance: "Esprit — Amnésie, Sleep et Flatterie sans effet",
    sensibilite: "Bagarre (annonces de bagarre doublées)",
  },
  {
    couleur: "Violet",
    crachat: "Folie",
    annonce: "Abyss 1",
    resistance: "Psychique — Abyss et Fear sans effet",
    sensibilite: "Purification, psychiatrie et régénération psychique (-1 PV par minute)",
  },
  {
    couleur: "Orange",
    crachat: "Vie",
    annonce: "Heal",
    resistance: "Vitale — non affecté par Galvanisé (2 dégâts)",
    sensibilite: "Mort temporaire et Grâce (séquelle à la résurrection)",
  },
  {
    couleur: "Gris",
    crachat: "Alchimie",
    annonce: "Mercury",
    resistance: "Alchimie — résiste à la Transmutation",
    sensibilite: "Dissipation, Contresort et Mute : +1 perte d'Abîme",
  },
  {
    couleur: "Rose",
    crachat: "Griffes naturelles",
    annonce: "—",
    resistance: "Griffes permanentes en latex (sans homologation BWAT)",
    sensibilite: "Aucune arme fabriquée ; pas de Manipulation d'armes",
    note: "Interdit toute arme fabriquée et la compétence Manipulation d'armes.",
  },
];
