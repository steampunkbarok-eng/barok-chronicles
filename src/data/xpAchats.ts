import { competencesDisponibles } from "./competences";
import { titresCarrieres } from "./titres";

export type TypeDemande = "competence" | "titre" | "sort" | "autre";

export interface OptionAchat {
  libelle: string;
  cout: number;
  detail?: string;
}

/** Compétences achetables avec de l'XP (le coût en points de création sert de coût en XP). */
export const optionsCompetences: OptionAchat[] = competencesDisponibles
  .filter((c) => c.cout > 0)
  .map((c) => ({ libelle: c.nom, cout: c.cout, detail: `${c.categorie} — ${c.effet}` }))
  .sort((a, b) => a.libelle.localeCompare(b.libelle, "fr"));

/** Titres / carrières achetables avec de l'XP. */
export const optionsTitres: OptionAchat[] = titresCarrieres
  .map((t) => ({ libelle: t.nom, cout: t.cout, detail: t.prerequis ? `Prérequis : ${t.prerequis}` : undefined }))
  .sort((a, b) => a.libelle.localeCompare(b.libelle, "fr"));

export const optionsParType: Record<TypeDemande, OptionAchat[]> = {
  competence: optionsCompetences,
  titre: optionsTitres,
  sort: [],
  autre: [],
};

export const labelsTypeDemande: Record<TypeDemande, { fr: string; en: string }> = {
  competence: { fr: "Compétence", en: "Skill" },
  titre: { fr: "Titre / Carrière", en: "Title / Career" },
  sort: { fr: "Sortilège / Rituel", en: "Spell / Ritual" },
  autre: { fr: "Autre (à préciser)", en: "Other (specify)" },
};

export interface DemandeXp {
  id: string;
  personnage_id: string;
  type_demande: string;
  libelle: string;
  cout_xp: number;
  justification: string | null;
  statut: "en_attente" | "approuvee" | "refusee";
  reponse_orga: string | null;
  traite_par: string | null;
  created_at: string;
  updated_at: string;
}

export const statutDemandeLabels: Record<DemandeXp["statut"], string> = {
  en_attente: "En attente",
  approuvee: "Approuvée",
  refusee: "Refusée",
};

export const statutDemandeColors: Record<DemandeXp["statut"], string> = {
  en_attente: "bg-yellow-500/20 text-yellow-700 dark:text-yellow-400",
  approuvee: "bg-green-500/20 text-green-700 dark:text-green-400",
  refusee: "bg-red-500/20 text-red-700 dark:text-red-400",
};

/** XP déjà consommée = somme des demandes approuvées. */
export const xpDepensee = (demandes: DemandeXp[]) =>
  demandes.filter((d) => d.statut === "approuvee").reduce((s, d) => s + (d.cout_xp || 0), 0);

/** XP réservée par les demandes encore en attente. */
export const xpEnAttente = (demandes: DemandeXp[]) =>
  demandes.filter((d) => d.statut === "en_attente").reduce((s, d) => s + (d.cout_xp || 0), 0);
