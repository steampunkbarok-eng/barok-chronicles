export interface Titre {
  nom: string;
  cout: number;
  incompatible: string;
  prerequis: string;
}

export const titresCarrieres: Titre[] = [
  { nom: "Adepte", cout: 2, incompatible: "Planaire, Ordre Chevaliers Suie (LAM), Sectaire ésotérico-magique, Démuni", prerequis: "Culte en jeu" },
  { nom: "Agent d'une ONG", cout: 2, incompatible: "Planaire, Porteur de Rune, Pirate, Chef de Bande Organisée, Démuni", prerequis: "" },
  { nom: "Ancien Esclave", cout: 2, incompatible: "Démuni", prerequis: "Background + Entrave + Évasion" },
  { nom: "Archiviste des Secrets", cout: 2, incompatible: "Chef de Bande Organisée, Pirate, Épervier, Contrebandier, Démuni", prerequis: "Alphabétisation commune" },
  { nom: "Artiste d'une Compagnie", cout: 2, incompatible: "", prerequis: "Talent artistique RP" },
  { nom: "Bourgeois", cout: 2, incompatible: "Démuni", prerequis: "" },
  { nom: "Capitaine de Navire", cout: 2, incompatible: "Porteur de Rune, Greffier", prerequis: "Navire TO + Notaire" },
  { nom: "Capitaine Navire-Volant", cout: 2, incompatible: "Porteur de Rune, Greffier", prerequis: "Navire-volant TO + Notaire" },
  { nom: "Chef de Bande Organisée", cout: 2, incompatible: "Planaire, Porteur de Rune, Pirate, Agent d'une ONG, Démuni", prerequis: "Filouterie" },
  { nom: "Contrebandier", cout: 2, incompatible: "Greffier, Corsaire elfique, Milicien, Ancien esclave", prerequis: "Compétence Contrebandier" },
  { nom: "Corsaire elfique", cout: 2, incompatible: "Agent d'une ONG, Planaire, Chef de Bande Organisée, Pirate, Épervier, Prévôt du Crépuscule, Milicien, Mercenaire Peau-olive, Sergent de l'ombre, Greffier, Magistrat", prerequis: "Background éthique" },
  { nom: "Épervier", cout: 2, incompatible: "Tous fonctionnaires, Agent d'une ONG, Corsaire elfique", prerequis: "Background + Capitaine Navire/Navire-Volant" },
  { nom: "Garde du Corps", cout: 2, incompatible: "Autres fonctionnaires, Chef de Bande Organisée, Enquêteur, Pirate, Épervier, Prévôt du Crépuscule, Mercenaire  Peau-olive, Sergent de l'ombre, Sectaire ésotérico-magique", prerequis: "" },
  { nom: "Gestionnaire de Dépôt", cout: 2, incompatible: "", prerequis: "Menuisier" },
  { nom: "Greffier", cout: 2, incompatible: "Capitaine Navire, Capitaine Navire-Volant, Chef de Bande Organisée, LAM, Mercenaire Peau-olive, Pirates, Planaires, Prévôt du Crépuscule, Sergent de l'ombre, Milicien, Enquêteur", prerequis: "Alphab. avancée + Solde" },
  { nom: "Mercenaire Peau-olive", cout: 2, incompatible: "Chef de Bande Organisée, LAM, Corsaire elfique, Épervier, Garde du Corps, Greffier, Pirate, Planaire, Porteur de Rune, Prévôt du Crépuscule, Sergent de l'ombre, Milicien, Magistrat, Démuni", prerequis: "Orcs/Gobelins/Trolls + Background" },
  { nom: "Noblesse de Sang", cout: 2, incompatible: "Démuni", prerequis: "Background liens noblesse" },
  { nom: "Ordre Chevaliers Suie (LAM)", cout: 2, incompatible: "Adepte, Planaire, Porteur de Rune, Sectaire, Magie : cérémonialiste, clerc, initié, tisseur, ritualiste", prerequis: "Haine magie + Compétence technologie/mécanique/forgeron" },
  { nom: "Pirate", cout: 2, incompatible: "Agent d'une ONG, LAM, Corsaire elfique, Épervier, Greffier, Mercenaire Peau-olive, Porteur de Rune, Milicien, Magistrat, Démuni", prerequis: "Background + Code Piraterie" },
  { nom: "Planaire", cout: 2, incompatible: "Adepte, Ordre Chevaliers Suie (LAM), Porteur de Rune, titres ancrés Barok", prerequis: "Background extraplanaire" },
  { nom: "Porteur de Rune", cout: 2, incompatible: "Capitaine Navire, Capitaine Navire-Volant, Ordre Chevaliers Suie (LAM), Planaire, Pirate, Mercenaire Peau-olive, Agent d'une ONG", prerequis: "Nains/Gnomes/Sautaises + Forgeron" },
  { nom: "Prévôt du Crépuscule", cout: 2, incompatible: "Corsaire elfique, Enquêteur, Garde du Corps, Greffier, Magistrat, Mercenaire Peau-olive", prerequis: "Filouterie" },
  { nom: "Sectaire ésotérico-magique", cout: 2, incompatible: "Adepte, Garde du Corps, Ordre Chevaliers Suie (LAM)", prerequis: "Mystique"},
  { nom: "Sergent de l'ombre", cout: 2, incompatible: "Corsaire elfique, Garde du Corps, Greffier, Mercenaire Peau-olive, Milicien, Magistrat, Enquêteur Public", prerequis: "Filouterie + deux compétences Martiales"}
];
