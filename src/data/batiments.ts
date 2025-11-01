export interface Batiment {
  nom: string;
  avantages: string;
  condition?: string;
}

export const batimentsUniques: Batiment[] = [
  { nom: "Cœur-fusible", avantages: "Permet d'avoir deux canons sur le navire", condition: "Uniquement disponible pour la faction : Les Traqueurs d'Echo" },
  { nom: "Résidence éthérée", avantages: "Contact avec Entités en cas de rituel", condition: "Uniquement disponible pour la faction : La Compagnie du Troisième Soleil" },
  { nom: "Jardin de méditation elfique", avantages: "Récupère tous les points de vie pendant la méditation", condition: "Uniquement disponible pour la faction : Le Clan Senshin" },
  { nom: "Acierie Wellington-Barr", avantages: "Produit 10 Acier de plus/an", condition: "Uniquement disponible pour la faction : La Grande Société des Explorateurs" },
  { nom: "Eniversité", avantages: "Perte d'abîme de 2 points à soigner par an pour la faction", condition: "Uniquement disponible pour la faction : L'Institut Eniversitaire Ashcroft" },
  { nom: "Ziggourat thanatonique", avantages: "200 morts-vivants mineurs / an", condition: "Uniquement disponible pour la faction : Les Messagers du Linceul" },
  { nom: "Le navire rubis ravageur", avantages: "1 bombe de sape / an", condition: "Uniquement disponible pour la faction : Les Mangeurs de grêles" },
  { nom: "Caserne du CPAS", avantages: "20 balles en argent / an", condition: "Uniquement disponible pour la faction : La Caste Porémanienne d'Assistance et de Soutien" },
  { nom: "Forge des Maîtres Nains", avantages: "3 Acier nains + 2 Or + 2 Charbon | 1 arme mercure/événement" },
  { nom: "Laboratoire Alchimique", avantages: "2 Fiole + 2 Alcool pur + 2 Acide + 2 Toxic | Potion expérimentale/événement" },
  { nom: "Mine d'Abîme Maudit", avantages: "5 Abîme + 3 Gemme + 2 Pierre" },
  { nom: "Jardins Mystiques", avantages: "6 Fleur + 2 Végétal + 2 Encens" },
  { nom: "Distillerie des Mille Saveurs", avantages: "3 Oliga sabré + 3 Alcool pur + 2 Pts éthylisme" },
  { nom: "Arsenal Mécanique", avantages: "4 Munitions + 2 Engrenage + 2 Piston + 2 Ressort | 2 armes bonne facture" },
  { nom: "Nécropole Sacrée", avantages: "3 Âme + 3 Cadavre + 2 Poupée chamane + 2 Antiquité | 1 arme tape abîme" },
  { nom: "Atelier du Tisserand Royal", avantages: "5 Tissu + 3 Voile + 2 Bijoux" },
  { nom: "Observatoire Astral", avantages: "3 Papier + 2 Encens + 2 Rune givre + 3 Gemme" },
  { nom: "Fonderie Industrielle Charbon", avantages: "10 Charbon + 1 Acier | Augmente la pollution charbon de 5, diminue de moitié les pierres de vie" },
  { nom: "Conserverie de Luxe", avantages: "3 Choucroute Worst + 3 Cigare Gerbie + 2 Épice + 2 Viande" },
  { nom: "Chantier Naval", avantages: "4 Chevron construction + 3 Voile + 4 Bois" },
  { nom: "Marché aux Curiosités", avantages: "2 Antiquité + 2 Perles + 2 Statue + 2 Bijoux + 2 Produits mer" },
  { nom: "Sanatorium Thermal", avantages: "3 Eau salée + 3 Sel pur + 2 Maladie soignée + 2 Graisse" },
  { nom: "Ferme Élevage Exotique", avantages: "5 Animaux + 3 Peau + 3 Viande | Animal exotique en jeu (peluche)" },
  { nom: "Cristallerie Magique", avantages: "4 Verre + 3 Rune givre + 3 Gemme | 2 plaques runiques" },
  { nom: "Décharge Alchimique", avantages: "6 Détritus + 2 Toxic + 1 Roche blâme" },
  { nom: "Bibliothèque d'étude", avantages: "5 Papier + 3 Encens + 2 Âme | 2 livres fous sans souffrir" },
  { nom: "Tonnellerie Légendaire", avantages: "8 Sable + 4 Tonnelet + 2 Rune givre" },
  { nom: "Bergerie", avantages: "3 Or + 4 Peau + 3 Tissu" },
  { nom: "Manufacture de Rouages", avantages: "5 Rouage + 3 Engrenage + 2 Métal" },
  { nom: "Jardin Plantes Carnivores", avantages: "4 Végétal + 3 Toxic + 3 Viande" },
  { nom: "Fumoir Artisanal", avantages: "4 Viande + 3 Épice + 3 Sel" },
  { nom: "Atelier Soufflage Verre", avantages: "6 Verre + 2 Fiole + 3 Sable + 2 Gemme" },
  { nom: "Campement mercenaire", avantages: "4 Munitions + 3 Acier + 3 Peau | 2 armures bonnes + 1 arme argent" },
  { nom: "Oasis", avantages: "4 Eau salée + 3 Fleur + 3 Végétal" },
  { nom: "Atelier de Joaillerie", avantages: "4 Bijoux + 3 Perles + 3 Argent lingot" },
  { nom: "Rucher", avantages: "5 Fleur + 3 Épice + 2 Alcool pur" },
  { nom: "Fonderie du Crédit Nain", avantages: "Brevets et % raciaux gratuits Crédit Nain" },
  { nom: "Laboratoire expérimental", avantages: "2 Eau salée + 3 Acide + 2 Alcool pur | 2 grenades soporifiques (Matériel TO)" },
  { nom: "Camps Agence Anachronistes", avantages: "2 Papiers + 2 Encens + 4 Charbon | 3 lectures de textes occultes sans perdre santé mentale", condition: "Uniquement disponible pour la faction : L'Agence des Anachroniste" }
];

export const navires: Batiment[] = [
  { nom: "La Vengeance du Kraken", avantages: "3 Voiles + 2 Tissus + 4 Engrenages | 5 rumeurs", condition: "Uniquement disponible pour la faction : La Vengeance du Kraken" },
  { nom: "Navire maritime", avantages: "2 Voiles + 2 Tissus + 4 Graisses pures" },
  { nom: "Navire-volant", avantages: "2 Voiles + 2 Charbon + 4 Rouages" }
];

export const typesBatiments = {
  "Bâtiments uniques": batimentsUniques,
  "Navires": navires
};
