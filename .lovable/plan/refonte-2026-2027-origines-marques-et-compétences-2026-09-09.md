# Refonte 2026-2027 : origines, marques et compétences

Le livret que tu as envoyé change trois choses en profondeur : les factions ne s'achètent plus des titres, les Marques de Destinée deviennent des engagements narratifs, et la liste des compétences évolue. Voici comment j'intègre tout cela.

## 1. Nouvelles données de jeu

Trois nouvelles listes de référence remplacent l'ancienne liste « Titres / Carrières » :

**Les origines (≈45 entrées, regroupées par thème)**
Foi savoir et occulte ; Gens de mer ; Nomades et voyageur-euses ; Marges et survie ; Pègre et ombres ; Négoce et protection ; Fer et vapeur ; Deuil et macabre ; Chasse et jeu ; Assemblées de Tisseur-euses ; Origines liées à l'espèce.
Chaque origine porte : sa description, les espèces réservées ou exclues, ses incompatibilités, ses prérequis/obligations, et si un contact Orga est nécessaire.

**Les Marques collectives (9)** — Cirque macabre, Consanguinité, Contact avec l'Inframonde, Malédiction de l'Œil Rouge, Marque secrète, Membre de la L.A.M., Morts-vivant-es de Ghuradok, Quête de vengeance ou d'honneur, Vaisseau du Fanum. Une seule par faction, optionnelle, avec citation, « pour qui », ce qu'elle signale, nécessités et interdits.

**Les Marques individuelles (9)** — Autre Marque personnelle, Béni-e de Fées, Graine des Ténèbres, Métaphysique sacrificiel héroïque, Nécromancie, Planaire, Recherché-e, Semence de Dragon, Téphromancie, avec la grille commune des interdits des voies sombres.

## 2. Création de faction simplifiée

Le formulaire garde le début (nom, propriété terrienne, bâtiment ou navire) et devient :

1. Nom de la faction et territoire
2. Bâtiment ou navire (gratuit, inchangé)
3. **Deux origines obligatoires** choisies dans la liste, sans coût ni points — avec contrôle des incompatibilités entre les deux et affichage clair des limitations d'espèce et des contacts Orga requis
4. **Une Marque collective optionnelle** (une seule)
5. Récapitulatif et fiche PDF mis à jour

La comptabilité des « marques disponibles / dépensées » et le bloc Titres disparaissent du formulaire joueur ; l'espace Orga conserve l'accès aux anciennes données pour les factions déjà enregistrées.

## 3. Marque individuelle sur la fiche de personnage

Nouvelle section dans la création de personnage :

- **Imposée automatiquement** : Vorélan-ne → Planaire ; Draconide → Semence de Dragon (non modifiable, avec explication de l'ancrage par rituel païen)
- **Optionnelle** pour les autres espèces, avec filtrage : espèces interdites, incompatibilité avec les origines de la faction choisie, et grille des Marques sombres
- Rappel visible : toute Marque passe par validation Orga, deux mois avant

La faction sélectionnée affiche désormais un encart lisible : ses deux origines, leurs avantages, interdictions et restrictions, et sa Marque collective — pour que la personne qui crée son personnage sache à quoi elle s'engage.

## 4. Compétences mises à jour

- **Nouvelles** : Épouvanter (3 pts), Esthétique morbide (gratuit, Elfe des Ténèbres), Coup bas (4 pts, origine Guilde des Murmures), Mort éradiquante (4 pts), Marche dans l'Inframonde (3 pts, Marque Béni-e de Fées) + intégration des règles d'obtention de ces compétences ajoutées.
- **Corrigées** : Tisseur (2 écoles + Guérison, sans Arcanisme, pierres 10 + 2/niveau), Clerc (1 école + Arcanique), Ritualiste (hors Arcanes et Alchimie), Tatoueur (Tisseur + école Chamanisme), Perce-ligne (prérequis armes de mêlée), Barbier (+1 PV après 10 min), Alphabétisation commune (trois langues au choix), Solde (engagement spécial), Crochetage (max niveau 3 à la création), Chiffonnier, Éleveur, Lapidaire, Tabaculteur, Taxidermiste, Charpentier de marine, Glisseur, Navigation (sortis de « en révision »)
- **Verrouillages** : les compétences liées à une origine ou une Marque ne sont proposées que si la faction ou la Marque du personnage les débloque ; Contresort reste inaccessible à la création
- Effets et prérequis alignés sur le tableau récapitulatif du livret
- **Vérification et corrections :** l'opérateur testera etvérifiera ce qui a été faite et suggèrera des améliorations, corrections ou modifications.

## 5. Traductions et affichage

Chaque nouvel élément (origines, marques, compétences) reçoit son libellé français. L'opérateur fournira quand ce sera demandé les documents des versions anglaises et néerlandais, et apparaît dans le récapitulatif final, la fiche PDF de faction et la fiche de personnage.

## Détails techniques

- Nouveaux fichiers `src/data/origines.ts`, `src/data/marques.ts` ; `src/data/titres.ts` conservé en lecture seule pour les factions historiques
- `src/data/competences.ts` étendu avec `debloquePar` (origine/marque) et `inaccessibleCreation`
- Colonnes ajoutées à la table factions : `origines` (texte[]), `marque_collective` ; champ `marqueIndividuelle` dans le JSON du personnage
- Validation centralisée dans un module `src/lib/reglesCreation.ts` réutilisé par le formulaire faction, le formulaire personnage et l'espace Orga
- Entrées FR/EN/NL ajoutées dans `translations.ts`, `gameData.ts` et `gameDataNl.ts`