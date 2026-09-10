// Validation centralisée des règles de création 2026-2027
// Utilisée par le formulaire de faction, le formulaire de personnage et l'espace Orga.

import {
  origines,
  getOrigine,
  Origine,
  origineIncompatibleAvec,
  marquesInterditesParOrigine,
} from "@/data/origines";
import {
  marquesCollectives,
  marquesIndividuelles,
  getMarqueCollective,
  getMarqueIndividuelle,
  marqueImposeeParEspece,
  Marque,
} from "@/data/marques";
import { competencesDisponibles, Competence } from "@/data/competences";
import { especes } from "@/data/especes";

export interface Verdict {
  ok: boolean;
  raison?: string;
}

const normalise = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9 ]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

/** Le texte libre `haystack` mentionne-t-il le nom `needle` ? */
const mentionne = (haystack: string | undefined, needle: string): boolean => {
  if (!haystack) return false;
  const h = normalise(haystack);
  const n = normalise(needle);
  if (!n) return false;
  if (h.includes(n)) return true;
  // Comparaison sur le premier segment significatif (avant tiret/parenthèse)
  const court = normalise(needle.split(/[–\-(]/)[0]);
  return court.length > 4 && h.includes(court);
};

/* ────────────────────────── Origines ────────────────────────── */

/** Deux origines peuvent-elles coexister dans une même faction ? */
export const originesCompatibles = (nomA: string, nomB: string): Verdict => {
  if (!nomA || !nomB) return { ok: true };
  if (nomA === nomB) return { ok: false, raison: "Les deux origines doivent être différentes." };
  const a = getOrigine(nomA);
  const b = getOrigine(nomB);
  if (!a || !b) return { ok: true };
  if (mentionne(a.limitations, b.nom) || mentionne(b.limitations, a.nom)) {
    return { ok: false, raison: `${a.nom} est incompatible avec ${b.nom}.` };
  }
  if (normalise(a.limitations).includes("toutes les origines")) {
    return { ok: false, raison: `${a.nom} n'accepte qu'un choix très restreint d'origines.` };
  }
  if (normalise(b.limitations).includes("toutes les origines")) {
    return { ok: false, raison: `${b.nom} n'accepte qu'un choix très restreint d'origines.` };
  }
  return { ok: true };
};

/** Une espèce est-elle acceptée par une origine ? (lecture du champ texte `especes`) */
export const especeAcceptee = (origine: Origine, espece: string): Verdict => {
  if (!espece || !origine.especes || origine.especes === "-") return { ok: true };
  const txt = normalise(origine.especes);
  if (txt.includes("interdite") && mentionne(origine.especes, espece)) {
    return { ok: false, raison: `${origine.nom} est interdite aux ${espece}.` };
  }
  if (txt.startsWith("toutes sauf") && mentionne(origine.especes, espece)) {
    return { ok: false, raison: `${origine.nom} n'accepte pas les ${espece}.` };
  }
  return { ok: true };
};

/** Origines nécessitant un contact préalable avec l'Orga */
export const originesAvecContactOrga = (noms: string[]): Origine[] =>
  noms.map(getOrigine).filter((o): o is Origine => !!o && !!o.contactOrga);

/** Toutes les limitations cumulées des origines d'une faction */
export const limitationsDeFaction = (noms: string[]): string[] =>
  noms
    .map(getOrigine)
    .filter((o): o is Origine => !!o)
    .map((o) => o.limitations)
    .filter((l) => l && l !== "-" && normalise(l) !== "aucune");

/* ────────────────────────── Marques ────────────────────────── */

/** Marque individuelle imposée d'office par l'espèce */
export const marqueImposee = (espece: string) => marqueImposeeParEspece(espece);

/** La Marque collective est-elle compatible avec les origines choisies ? */
export const marqueCollectiveCompatible = (nomMarque: string, originesFaction: string[]): Verdict => {
  const m = getMarqueCollective(nomMarque);
  if (!m) return { ok: true };
  for (const o of originesFaction) {
    if (m.originesIncompatibles?.includes(o)) {
      return { ok: false, raison: `${m.nom} est incompatible avec l'origine ${o}.` };
    }
    const origine = getOrigine(o);
    if (origine && mentionne(origine.limitations, m.nom)) {
      return { ok: false, raison: `L'origine ${o} exclut ${m.nom}.` };
    }
  }
  return { ok: true };
};

/** La Marque individuelle est-elle accessible à ce personnage ? */
export const marqueIndividuelleCompatible = (
  nomMarque: string,
  espece: string,
  originesFaction: string[],
  marqueCollective?: string
): Verdict => {
  const m = getMarqueIndividuelle(nomMarque);
  if (!m) return { ok: true };

  if (m.imposeePourEspece && espece && m.imposeePourEspece !== espece) {
    const imposee = marqueImposee(espece);
    if (imposee && imposee !== nomMarque) {
      return { ok: false, raison: `Les ${espece} portent d'office la Marque ${imposee}.` };
    }
  }
  if (m.especesReservees?.length && espece && !m.especesReservees.includes(espece)) {
    return { ok: false, raison: `${m.nom} est réservée à : ${m.especesReservees.join(", ")}.` };
  }
  if (m.especesInterdites?.length && espece && m.especesInterdites.includes(espece)) {
    return { ok: false, raison: `${m.nom} est interdite aux ${espece}.` };
  }
  for (const o of originesFaction) {
    if (m.originesIncompatibles?.includes(o)) {
      return { ok: false, raison: `${m.nom} est incompatible avec l'origine ${o} de votre faction.` };
    }
    const origine = getOrigine(o);
    if (origine && mentionne(origine.limitations, m.nom)) {
      return { ok: false, raison: `L'origine ${o} de votre faction exclut ${m.nom}.` };
    }
  }
  if (marqueCollective) {
    const mc = getMarqueCollective(marqueCollective);
    if (mc?.marquesIncompatibles?.includes(nomMarque) || m.marquesIncompatibles?.includes(marqueCollective)) {
      return { ok: false, raison: `${m.nom} est incompatible avec la Marque collective ${marqueCollective}.` };
    }
  }
  return { ok: true };
};

/** Marques individuelles proposables, avec la raison d'un éventuel blocage */
export const marquesIndividuellesFiltrees = (
  espece: string,
  originesFaction: string[],
  marqueCollective?: string
): { marque: Marque; verdict: Verdict }[] =>
  marquesIndividuelles.map((marque) => ({
    marque,
    verdict: marqueIndividuelleCompatible(marque.nom, espece, originesFaction, marqueCollective),
  }));

/* ────────────────────────── Compétences ────────────────────────── */

/** Compétences débloquées par les origines de la faction et la Marque individuelle */
export const competencesDebloquees = (originesFaction: string[], marqueIndividuelle?: string): string[] => {
  const set = new Set<string>();
  originesFaction.forEach((o) => getOrigine(o)?.debloque?.forEach((c) => set.add(c)));
  if (marqueIndividuelle) getMarqueIndividuelle(marqueIndividuelle)?.debloque?.forEach((c) => set.add(c));
  return Array.from(set);
};

export interface ContextePersonnage {
  espece: string;
  originesFaction: string[];
  marqueIndividuelle?: string;
  marqueCollective?: string;
}

/** Une compétence est-elle sélectionnable à la création dans ce contexte ? */
export const competenceAutorisee = (comp: Competence, ctx: ContextePersonnage): Verdict => {
  if (comp.inaccessibleCreation) {
    return { ok: false, raison: "Compétence inaccessible à la création (apprentissage en jeu)." };
  }
  if (comp.especeReservee && ctx.espece && comp.especeReservee !== ctx.espece) {
    return { ok: false, raison: `Réservée à l'espèce ${comp.especeReservee}.` };
  }
  if (comp.origineRequise && !ctx.originesFaction.includes(comp.origineRequise)) {
    return { ok: false, raison: `Nécessite l'origine de faction « ${comp.origineRequise} ».` };
  }
  if (comp.marqueRequise && ctx.marqueIndividuelle !== comp.marqueRequise) {
    return { ok: false, raison: `Nécessite la Marque « ${comp.marqueRequise} ».` };
  }
  // Interdits d'espèce
  if (ctx.espece) {
    const esp = especes.find((e) => e.nom === ctx.espece);
    if (esp && esp.interdit && esp.interdit !== "Aucun" && mentionne(esp.interdit, comp.nom)) {
      return { ok: false, raison: `Interdite pour l'espèce ${ctx.espece}.` };
    }
  }
  // Interdits issus des origines de la faction
  for (const nomOrigine of ctx.originesFaction) {
    const o = getOrigine(nomOrigine);
    if (o && mentionne(o.limitations, comp.nom)) {
      return { ok: false, raison: `Interdite par l'origine « ${nomOrigine} » de votre faction.` };
    }
  }
  // Interdits issus de la Marque collective (L.A.M. : aucune magie)
  if (ctx.marqueCollective === "Membre de la L.A.M. (Ordre des Chevaliers de Suie)") {
    if (["Magique", "Spirituelle", "Ésotérique"].includes(comp.categorie)) {
      return { ok: false, raison: "La Marque L.A.M. interdit tout pouvoir magique, bénédiction ou rituel." };
    }
  }
  return { ok: true };
};

/** Liste des compétences sélectionnables, avec le motif de blocage éventuel */
export const competencesFiltrees = (ctx: ContextePersonnage) =>
  competencesDisponibles.map((comp) => ({ comp, verdict: competenceAutorisee(comp, ctx) }));

export { origines, marquesCollectives, marquesIndividuelles };
