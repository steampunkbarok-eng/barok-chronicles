import { marqueTextsEn, marqueTextsNl } from "./marqueTexts2027";

// Traductions des textes de faction 2027 (origines, catégories, restrictions).
// Clé = texte français exact utilisé dans src/data/origines.ts et src/data/marques.ts.

export const factionTextsEn: Record<string, string> = {
  // Catégories
  "Foi, savoir et occulte": "Faith, knowledge and the occult",
  "Gens de mer": "Seafarers",
  "Nomades et voyageur-euses": "Nomads and travellers",
  "Marges et survie": "Margins and survival",
  "Pègre et ombres": "Underworld and shadows",
  "Négoce et protection": "Trade and protection",
  "Fer et vapeur": "Iron and steam",
  "Deuil et macabre": "Mourning and the macabre",
  "Chasse et jeu": "Hunting and games",
  "Assemblées de Tisseur-euses": "Weavers' assemblies",
  "Origines liées à l'espèce": "Species-bound origins",

  // Noms d'origines
  "Adepte – Fidèle": "Adept – Faithful",
  "Sectaire ésotérico-magique": "Esoteric-magical Cultist",
  "Archiviste des Secrets": "Archivist of Secrets",
  "Érudite": "Scholar",
  "Capitaine (Mer ou Air)": "Captain (Sea or Air)",
  "Corsaire elfique": "Elven Privateer",
  "Pirate": "Pirate",
  "Épervier": "Sparrowhawk",
  "Agente d'une ONG": "NGO Agent",
  "Club de Gentlemen et Gentlewomen explorateur-rices": "Club of Gentlemen and Gentlewomen Explorers",
  "Nomades Marins": "Sea Nomads",
  "Nomades Terrestres": "Land Nomads",
  "Caravane des Brèches": "Caravan of the Rifts",
  "Échoué-es d'un autre monde": "Castaways from Another World",
  "Exilé-es d'un monde perdu": "Exiles from a Lost World",
  "Composé d'Ancien-nes Esclaves": "Made of Former Slaves",
  "Compagnie artistique": "Artistic Company",
  "Bande organisée": "Organised Gang",
  "Contrebandier-ère": "Smuggler",
  "Déchu-e": "Fallen",
  "Initié-e de la Guilde des Murmures": "Initiate of the Guild of Whispers",
  "Antiquaire": "Antiquarian",
  "Gestionnaire de Dépôt": "Depot Manager",
  "Garde du Corps": "Bodyguard",
  "Gros Bras": "Muscle",
  "Caravane marchande": "Merchant Caravan",
  "Colporteur-euses d'élixirs": "Elixir Pedlars",
  "Organisation sanitaire privée des Flottes et Voyageurs": "Private Health Organisation of Fleets and Travellers",
  "Compagnie de Lémurie": "Lemuria Company",
  "Chasseur-euses nordiques de Glace": "Northern Ice Hunters",
  "Chasseur-euses de Chair": "Flesh Hunters",
  "Guilde des Bricoleur-euses": "Tinkerers' Guild",
  "Récupérateur-rices d'épave": "Wreck Salvagers",
  "Cartographes du Vide": "Cartographers of the Void",
  "Chasseur-euses de Courants Porteurs": "Hunters of Carrying Currents",
  "Confrérie des Croque-morts et Médecins de peste": "Brotherhood of Undertakers and Plague Doctors",
  "Compagnie d'Assurances et de Golems serviles": "Insurance and Servile Golems Company",
  "Guilde des Traqueur-euses": "Trackers' Guild",
  "Club ambulant de Golbang": "Travelling Golbang Club",
  "Une Corona de l'Université de Rammstein": "A Corona of the University of Rammstein",
  "Mercenaire Peau-olive": "Olive-skin Mercenary",
  "Porteur-euse de Rune": "Rune Bearer",

  // Descriptions
  "La faction est croyante d'un culte. La prêtrise officielle et l'Argousinat s'obtiennent en jeu. Vous pouvez aussi lancer votre propre culte en respectant les règles de création de culte.":
    "The faction follows a cult. Official priesthood and the Argousinate are earned in play. You may also start your own cult, following the cult creation rules.",
  "Faction initiée des confréries occultes ; se révèle discrètement et évolue en jeu. Croyances marginales, sans volonté d'officialiser le culte.":
    "A faction initiated into occult brotherhoods; it reveals itself discreetly and grows in play. Fringe beliefs, with no wish to make the cult official.",
  "Collectionneur-euse clandestin-e de savoir interdit. Ouvre l'accès à des informations hermétiques et cryptiques.":
    "Clandestine collector of forbidden knowledge. Opens access to hermetic and cryptic information.",
  "Sages et patients étudiants, pendant diurne et légal de l'Archiviste (Académies, Universités, collèges). Les membres gagnent un apprentissage supplémentaire en jeu avec 1 PJ ou 1 PNJ par événement.":
    "Wise and patient students, the daylight and lawful counterpart of the Archivist (academies, universities, colleges). Members gain one extra apprenticeship in play with 1 PC or 1 NPC per event.",
  "La faction commande en début de jeu un navire ou un aéronef (enregistrement au Notaire validé et gratuit).":
    "The faction commands a ship or an airship from the start of play (registration with the Notary, validated and free).",
  "Justicier-ères des flots sous lettre de course (gratuite auprès du Notaire). Sortes de Rangers des Mers du Dominion ; peuvent recevoir une solde ou honorer un contrat.":
    "Enforcers of the waves under a letter of marque (free from the Notary). A kind of Dominion Sea Ranger; they may draw a stipend or honour a contract.",
  "Faction hors-la-loi des mers, crainte sur les eaux.": "Outlaw faction of the seas, feared on the water.",
  "Groupe sans foi ni loi : esclavagistes, kidnappeur-euses et assassin-es qui méprisent même le Code de la Piraterie.":
    "A lawless group: slavers, kidnappers and assassins who scorn even the Pirate Code.",
  "Faction diplomate tenue officiellement à la neutralité, avec ses objectifs propres, ses procédures spéciales ou savoirs interdits aux profanes (ex. l'Agence des Anachronistes).":
    "A diplomatic faction officially bound to neutrality, with its own goals, special procedures or knowledge barred to outsiders (e.g. the Anachronists Agency).",
  "Société élitiste tournée vers l'exploration, le pillage de ruines, les chasses récréatives, l'enrichissement et la notoriété.":
    "An elitist society devoted to exploration, ruin plundering, recreational hunts, wealth and fame.",
  "Deux peuplades au choix : les Elfes des Mers et les Mapinguaris (humanoïdes crocodiles de la Mer du Sud).":
    "Two peoples to choose from: the Sea Elves and the Mapinguaris (crocodile humanoids of the Southern Sea).",
  "Deux peuplades au choix : la Horde d'Airain et les Errants (que certains nomment Cornus).":
    "Two peoples to choose from: the Brazen Horde and the Wanderers (whom some call the Horned).",
  "Convoi de marchand-es interplanaires qui commerce à travers les failles planaires et ramène des biens d'autres mondes. Le pont entre le négoce et le planaire.":
    "A convoy of interplanar traders dealing through the planar rifts and bringing back goods from other worlds. The bridge between trade and the planes.",
  "Êtres venus d'un plan quelconque, bloqué-es sur Barok pour des raisons sensées, accidentelles ou loufoques, qui cherchent à rentrer ou à s'adapter.":
    "Beings from some plane, stranded on Barok for sensible, accidental or absurd reasons, seeking to return home or to adapt.",
  "Rescapé-es d'un plan, d'une dimension ou d'un lieu dévoré par les Ténèbres ou conquis par une puissance sidérale. Iels portent la mémoire d'un mal absolu.":
    "Survivors of a plane, a dimension or a place devoured by the Darkness or conquered by a sidereal power. They carry the memory of an absolute evil.",
  "Faction de survivant-es de la servitude imposée, entre liberté et vengeance ; ses membres déstabilisent les habitudes et se battent pour leurs valeurs.":
    "A faction of survivors of forced servitude, between freedom and revenge; its members upset habits and fight for their values.",
  "Principal vecteur de renommée (patente Artiste au Notaire). Bonus de +2 en cas de réussite d'une représentation ou d'un spectacle.":
    "The main vehicle of fame (Artist licence from the Notary). +2 bonus for a successful performance or show.",
  "Caïds des rues ; le réseau réel se noue en jeu via le Courtier des Ombres.":
    "Street bosses; the real network is built in play through the Shadow Broker.",
  "Circuits du Marché Noir et évitement des taxes.": "Black Market circuits and tax dodging.",
  "Personnages qui n'ont plus rien : honneur, famille et titre perdus. Iels vivent en marge, mendient, errent, vivent de petits larcins ou de leurs consommations.":
    "Characters who have nothing left: honour, family and title lost. They live on the margins, beg, wander, and live off petty theft or their vices.",
  "Derrière une façade et une fausse occupation, votre groupe est membre de la très sélective Guilde des Assassins du Dominion. Accès à deux compétences spéciales : Coup bas et Mort éradiquante (une utilisation par jour chacune).":
    "Behind a front and a false trade, your group belongs to the highly selective Assassins' Guild of the Dominion. Access to two special skills: Low Blow and Eradicating Death (one use per day each).",
  "Revente des artéfacts, antiquités et statues deux fois plus cher. Vous travaillez volontiers avec les pillards et les voleurs (accès à la Pègre).":
    "Resells artefacts, antiques and statues at twice the price. You gladly work with looters and thieves (access to the Underworld).",
  "Approvisionnement et stocks stratégiques. Vous disposez d'une malle ou d'un coffre sur site où les Miliciens ne trouvent rien (annonce « Résist »). Crocheteur-euses et Tisseur-euses peuvent l'ouvrir.":
    "Supply and strategic stocks. You keep a trunk or chest on site where the Militia find nothing (call \"Resist\"). Lockpickers and Weavers can open it.",
  "Protection contractuelle rapprochée ; solde ou contrat noués en jeu.":
    "Close contractual protection; stipend or contract arranged in play.",
  "Protection de base pour les plus offrants, sans regarder à la moralité. Tant qu'on vous paye, même en nourriture, boissons et alcool.":
    "Basic protection for the highest bidder, morals aside. As long as you get paid, even in food, drink and booze.",
  "Comptoir mobile de marchand-es ambulant-es qui sillonne le Dominion, monte son étal en jeu et colporte nouvelles et rumeurs autant que la marchandise.":
    "A mobile trading post of travelling merchants crossing the Dominion, setting up their stall in play and peddling news and rumours as much as goods.",
  "Camelots qui vendent fioles miracles, remontants à vapeur et babioles « garanties authentiques ».":
    "Hawkers selling miracle vials, steam tonics and trinkets \"guaranteed genuine\".",
  "Hospitalières ambulantes indépendantes : soins, prévention des infections et des maladies, gestion officielle des quarantaines pour tout le monde.":
    "Independent travelling hospitallers: care, prevention of infection and disease, and official quarantine management for everyone.",
  "Compagnie marchande privée non nationale, qui négocie et transporte depuis la Lémurie : épices, denrées rares, minéraux inédits et pharmacopée locale.":
    "A private, non-national trading company dealing and shipping from Lemuria: spices, rare foodstuffs, unknown minerals and local pharmacopoeia.",
  "Équipage spécialisé dans la coupe, l'exportation et la vente des icebergs et banquises du long Hiver du nord.":
    "A crew specialised in cutting, exporting and selling the icebergs and ice fields of the long northern Winter.",
  "Marchand-es d'esclaves qui masquent leur commerce sous d'autres trafics. Statut obtenu après plusieurs missions réussies (accès à la Pègre).":
    "Slave traders hiding their business behind other traffics. Status earned after several successful missions (access to the Underworld).",
  "Atelier d'inventeur-euses, gadgetier-ères et mécano-s, tout en engrenages et en vapeur. Le versant steampunk générique, hors Mécanarcanum nain.":
    "A workshop of inventors, gadgeteers and mechanics, all cogs and steam. The generic steampunk side, outside the dwarven Mecanarcanum.",
  "Équipes qui dépouillent les carcasses de navires et d'aéronefs échoués.":
    "Teams who strip the carcasses of wrecked ships and airships.",
  "Association qui cartographie les régions réputées incartographiables, là où chaque Nation a semé de fausses données. Officiellement.":
    "An association mapping regions said to be unmappable, where every Nation has sown false data. Officially.",
  "Chercheur-euses de bons courants d'éther, passagers ou durables, pour que les navires volants filent plus vite.":
    "Seekers of good ether currents, fleeting or lasting, so that flying ships travel faster.",
  "Porteur-euses du masque à bec. Iels gèrent les morts, les quarantaines et la logistique de résurrection au Fanum de Cristal.":
    "Wearers of the beaked mask. They handle the dead, quarantines and the resurrection logistics at the Crystal Fanum.",
  "Firme qui vend des polices aux clauses interminables couvrant séquelles, amputations et membres estropiés, et qui fabrique ou loue des golems serviles.":
    "A firm selling policies with endless clauses covering after-effects, amputations and crippled limbs, and building or renting servile golems.",
  "Chasseur-euses de primes et de créatures, versant terrestre et professionnel.":
    "Bounty and creature hunters, the professional land-based side.",
  "Troupe obsédée par le sport plus que par la guerre, qui monte des tournois partout où elle passe.":
    "A troupe more obsessed with sport than with war, staging tournaments wherever it goes.",
  "Dernière université spécialiste ès arts mystiques, psychiques et occultes de Porémanie. Assemblées de recherche sur les arts oubliés, interdits ou cosmiques et sur les manuscrits perdus.":
    "The last university specialising in the mystic, psychic and occult arts of Poremania. Research assemblies on forgotten, forbidden or cosmic arts and on lost manuscripts.",
  "Confrérie d'honneur et de parole tenue.": "A brotherhood of honour and kept word.",
  "Faction gardienne et pratiquante du Mécanarcanum, membre d'une des Nations naines. Manquer à sa parole ou perdre son honneur publiquement peut mener à être déclaré-e déchu-e.":
    "A faction guarding and practising the Mecanarcanum, part of one of the dwarven Nations. Breaking your word or publicly losing your honour can have you declared Fallen.",

  // Espèces, limitations, prérequis
  "Marque Planaire et Marque Semence de Dragon": "Planar Mark and Dragon Seed Mark",
  "Interdite aux Vorélan-nes à la création": "Forbidden to Vorelans at creation",
  "Adepte – Fidèle, Garde du Corps, Marque Semence de Dragon": "Adept – Faithful, Bodyguard, Dragon Seed Mark",
  "Bande organisée, Pirate, Épervier, Contrebandier-ère, Érudite": "Organised Gang, Pirate, Sparrowhawk, Smuggler, Scholar",
  "Porteur-euse de Rune ; charge de Greffier fermée": "Rune Bearer; the Clerk office is closed",
  "Navire monté sur site + enregistrement au Notaire": "Ship built on site + registration with the Notary",
  "Toutes sauf Morts-Vivants, Korrigans, Drièdres, Archéo-Félis, Drogons, Génies d'Ajunda, Êtres Mécaniques, Tengus d'Ajunda, Cerbères, Hagnolls":
    "All except Undead, Korrigans, Driedres, Archeo-Felis, Drogons, Genies of Ajunda, Mechanical Beings, Tengus of Ajunda, Cerberuses, Hagnolls",
  "Marque Planaire, Pirate, Épervier, charges d'Ombre, Milicien, Magistrat, Greffier, Contrebandier-ère, Chasseur-euses de Chair, Marques sombres":
    "Planar Mark, Pirate, Sparrowhawk, Shadow offices, Militiaman, Magistrate, Clerk, Smuggler, Flesh Hunters, dark Marks",
  "Éthique ; solde ou contrat possible": "Ethics required; stipend or contract possible",
  "Marque L.A.M., Corsaire elfique, Épervier, Agente d'une ONG, Porteur-euse de Rune, Mercenaire Peau-olive, Archiviste des Secrets ; charges de Greffier, Milicien, Magistrat":
    "L.A.M. Mark, Elven Privateer, Sparrowhawk, NGO Agent, Rune Bearer, Olive-skin Mercenary, Archivist of Secrets; Clerk, Militiaman and Magistrate offices",
  "Si marin, Capitaine obligatoire ; Code de la Piraterie demandé 2 mois avant":
    "If seagoing, Captain is mandatory; Pirate Code to be requested 2 months in advance",
  "Toutes les charges publiques, Agente d'une ONG, Corsaire elfique, Archiviste des Secrets, Organisation sanitaire":
    "All public offices, NGO Agent, Elven Privateer, Archivist of Secrets, Health Organisation",
  "Capitaine (Mer ou Air) obligatoire": "Captain (Sea or Air) is mandatory",
  "Marque Planaire, Porteur-euse de Rune, Pirate, Bande organisée, Épervier, Chasseur-euses de Chair":
    "Planar Mark, Rune Bearer, Pirate, Organised Gang, Sparrowhawk, Flesh Hunters",
  "Neutralité (sauf légitime défense)": "Neutrality (except in self-defence)",
  "Contacter l'Orga : espèces spéciales incluses": "Contact the Orga: special species included",
  "Charges publiques et charges d'Ombre (Pègre et Contrebande)": "Public offices and Shadow offices (Underworld and Smuggling)",
  "Contact Orga": "Contact the Orga",
  "Toutes sauf Vorélan-nes": "All except Vorelans",
  "Charges publiques ; charges d'Ombre. Compatible avec la Marque Planaire.":
    "Public offices; Shadow offices. Compatible with the Planar Mark.",
  "Charges publiques ; méfiance des cultes. Compatible avec la Marque Planaire.":
    "Public offices; distrust from the cults. Compatible with the Planar Mark.",
  "Contact Orga ; background validé (mal absolu)": "Contact the Orga; background approved (absolute evil)",
  "Contrebandier-ère, Chasseur-euses de Chair": "Smuggler, Flesh Hunters",
  "Compétences Entrave et Évasion": "Bind and Escape skills",
  "Aucune": "None",
  "Une compétence de Filouterie obligatoire à la création : Crochetage, Dissimulation, Entrave, Évasion, Infiltration, Mort éradiquante ou Pickpocket (prérequis de la compétence choisie compris)":
    "One Shady skill is mandatory at creation: Lockpicking, Concealment, Bind, Escape, Infiltration, Eradicating Death or Pickpocket (including the prerequisites of the chosen skill)",
  "Corsaire elfique, Composé d'Ancien-nes Esclaves, Archiviste des Secrets ; charges de Greffier et Milicien":
    "Elven Privateer, Made of Former Slaves, Archivist of Secrets; Clerk and Militiaman offices",
  "TOUTES LES ORIGINES, sauf Gros Bras, les autres origines de Pègre et ombres et celles de Marges et survie":
    "ALL ORIGINS, except Muscle, the other Underworld and shadows origins and those of Margins and survival",
  "Avoir tout perdu et une très bonne proposition de background": "Having lost everything, plus a very solid background proposal",
  "N'accepte ni les Planaires ni les Draconides dans ses rangs": "Accepts neither Planars nor Draconians in its ranks",
  "Marque Semence de Dragon et Marque Planaire": "Dragon Seed Mark and Planar Mark",
  "Menuisier": "Carpenter",
  "Charges publiques, Bande organisée, Pirate, Épervier, Mercenaire Peau-olive, Sectaire ésotérico-magique ; charges d'Ombre et Enquêteur":
    "Public offices, Organised Gang, Pirate, Sparrowhawk, Olive-skin Mercenary, Esoteric-magical Cultist; Shadow offices and Investigator",
  "Moralité et charges publiques": "Morality and public offices",
  "Charges publiques ; Déchu-e": "Public offices; Fallen",
  "Aucun effet garanti : tout est du roleplay": "No guaranteed effect: it is all roleplay",
  "Chasseur-euses de Chair ; Épervier ; Déchu-e": "Flesh Hunters; Sparrowhawk; Fallen",
  "Neutralité de soin ; compétence de soin recommandée": "Neutral care; a healing skill is recommended",
  "Contact Orga (denrées et pharmacopée)": "Contact the Orga (foodstuffs and pharmacopoeia)",
  "Charges publiques ; Corsaire elfique ; Mercenaire Peau-olive ; Composé d'Ancien-nes Esclaves ; Organisation sanitaire privée des Flottes et Voyageurs ; Agente d'une ONG":
    "Public offices; Elven Privateer; Olive-skin Mercenary; Made of Former Slaves; Private Health Organisation of Fleets and Travellers; NGO Agent",
  "Accès Pègre ; statut acquis en jeu (plusieurs missions)": "Underworld access; status earned in play (several missions)",
  "Ingénieur recommandé": "Engineer recommended",
  "Natation optionnelle": "Swimming optional",
  "Aucune stricte (dessein caché possible)": "None strictly (a hidden agenda is possible)",
  "Contact Orga si scénarisé": "Contact the Orga if it is part of a plot",
  "Navigation recommandée": "Navigation recommended",
  "Lien avec le Fanum de Cristal ; soin ou rite recommandé": "Link with the Crystal Fanum; healing or rite recommended",
  "Golems serviles à valider par l'Orga": "Servile golems must be approved by the Orga",
  "Chasse ou combat recommandé": "Hunting or combat recommended",
  "Aucune stricte": "None strictly",
  "Voir les règles du LIBG": "See the LIBG rules",
  "Toutes sauf Vorélan-nes au début": "All except Vorelans at the start",
  "Charges publiques (savoirs interdits) ; rivalité entre Corona ; Marque Semence de Dragon":
    "Public offices (forbidden knowledge); rivalry between Coronas; Dragon Seed Mark",
  "Contact Orga (arts interdits, oubliés ou cosmiques) ; magie recommandée":
    "Contact the Orga (forbidden, forgotten or cosmic arts); magic recommended",
  "Orques, Gobelins, Trolls": "Orcs, Goblins, Trolls",
  "Pratiques interdites : nécromancie, trafic de cadavres, esclavagisme. Marques L.A.M., Semence de Dragon et Planaire ; Corsaire elfique, Pirate, Épervier, Bande organisée, Garde du Corps, Porteur-euse de Rune, Chasseur-euses de Chair ; charges publiques et d'Ombre":
    "Forbidden practices: necromancy, corpse trafficking, slavery. L.A.M., Dragon Seed and Planar Marks; Elven Privateer, Pirate, Sparrowhawk, Organised Gang, Bodyguard, Rune Bearer, Flesh Hunters; public and Shadow offices",
  "Nains, Gnomes, Sautais": "Dwarves, Gnomes, Sautais",
  "Marques Planaire et Semence de Dragon, Capitaine (Mer ou Air), Pirate, Mercenaire Peau-olive, Agente d'une ONG, Bande organisée":
    "Planar and Dragon Seed Marks, Captain (Sea or Air), Pirate, Olive-skin Mercenary, NGO Agent, Organised Gang",
  "Serment (trahison → Déchu-e)": "Oath (betrayal → Fallen)",
};

export const factionTextsNl: Record<string, string> = {
  // Categorieën
  "Foi, savoir et occulte": "Geloof, kennis en het occulte",
  "Gens de mer": "Zeevolk",
  "Nomades et voyageur-euses": "Nomaden en reizigers",
  "Marges et survie": "Marge en overleven",
  "Pègre et ombres": "Onderwereld en schaduwen",
  "Négoce et protection": "Handel en bescherming",
  "Fer et vapeur": "IJzer en stoom",
  "Deuil et macabre": "Rouw en het macabere",
  "Chasse et jeu": "Jacht en spel",
  "Assemblées de Tisseur-euses": "Vergaderingen van Wevers",
  "Origines liées à l'espèce": "Soortgebonden origines",

  // Namen van origines
  "Adepte – Fidèle": "Volgeling – Gelovige",
  "Sectaire ésotérico-magique": "Esoterisch-magische sekteling",
  "Archiviste des Secrets": "Archivaris van de Geheimen",
  "Érudite": "Geleerde",
  "Capitaine (Mer ou Air)": "Kapitein (Zee of Lucht)",
  "Corsaire elfique": "Elfse kaper",
  "Pirate": "Piraat",
  "Épervier": "Sperwer",
  "Agente d'une ONG": "Agent van een ngo",
  "Club de Gentlemen et Gentlewomen explorateur-rices": "Club van ontdekkende Gentlemen en Gentlewomen",
  "Nomades Marins": "Zeenomaden",
  "Nomades Terrestres": "Landnomaden",
  "Caravane des Brèches": "Karavaan van de Scheuren",
  "Échoué-es d'un autre monde": "Gestranden uit een andere wereld",
  "Exilé-es d'un monde perdu": "Ballingen uit een verloren wereld",
  "Composé d'Ancien-nes Esclaves": "Samengesteld uit voormalige slaven",
  "Compagnie artistique": "Artistiek gezelschap",
  "Bande organisée": "Georganiseerde bende",
  "Contrebandier-ère": "Smokkelaar",
  "Déchu-e": "Gevallene",
  "Initié-e de la Guilde des Murmures": "Ingewijde van het Gilde der Fluisteringen",
  "Antiquaire": "Antiquair",
  "Gestionnaire de Dépôt": "Magazijnbeheerder",
  "Garde du Corps": "Lijfwacht",
  "Gros Bras": "Spierbundel",
  "Caravane marchande": "Handelskaravaan",
  "Colporteur-euses d'élixirs": "Elixerventers",
  "Organisation sanitaire privée des Flottes et Voyageurs": "Private gezondheidsorganisatie van Vloten en Reizigers",
  "Compagnie de Lémurie": "Compagnie van Lemurië",
  "Chasseur-euses nordiques de Glace": "Noordelijke ijsjagers",
  "Chasseur-euses de Chair": "Vleesjagers",
  "Guilde des Bricoleur-euses": "Gilde van de Knutselaars",
  "Récupérateur-rices d'épave": "Wrakbergers",
  "Cartographes du Vide": "Cartografen van de Leegte",
  "Chasseur-euses de Courants Porteurs": "Jagers op Draagstromen",
  "Confrérie des Croque-morts et Médecins de peste": "Broederschap van Doodgravers en Pestdokters",
  "Compagnie d'Assurances et de Golems serviles": "Compagnie van Verzekeringen en Dienstbare Golems",
  "Guilde des Traqueur-euses": "Gilde van de Speurders",
  "Club ambulant de Golbang": "Rondtrekkende Golbangclub",
  "Une Corona de l'Université de Rammstein": "Een Corona van de Universiteit van Rammstein",
  "Mercenaire Peau-olive": "Olijfhuidige huurling",
  "Porteur-euse de Rune": "Runendrager",

  // Beschrijvingen
  "La faction est croyante d'un culte. La prêtrise officielle et l'Argousinat s'obtiennent en jeu. Vous pouvez aussi lancer votre propre culte en respectant les règles de création de culte.":
    "De factie is gelovig en volgt een cultus. Het officiële priesterschap en het Argousinaat verdien je in het spel. Je kunt ook je eigen cultus starten volgens de regels voor cultuscreatie.",
  "Faction initiée des confréries occultes ; se révèle discrètement et évolue en jeu. Croyances marginales, sans volonté d'officialiser le culte.":
    "Factie die is ingewijd in occulte broederschappen; ze toont zich discreet en groeit in het spel. Marginale overtuigingen, zonder de cultus officieel te willen maken.",
  "Collectionneur-euse clandestin-e de savoir interdit. Ouvre l'accès à des informations hermétiques et cryptiques.":
    "Clandestiene verzamelaar van verboden kennis. Geeft toegang tot hermetische en cryptische informatie.",
  "Sages et patients étudiants, pendant diurne et légal de l'Archiviste (Académies, Universités, collèges). Les membres gagnent un apprentissage supplémentaire en jeu avec 1 PJ ou 1 PNJ par événement.":
    "Wijze en geduldige studenten, de wettelijke tegenhanger bij daglicht van de Archivaris (academies, universiteiten, colleges). Leden krijgen per evenement één extra leerproces in het spel met 1 SP of 1 NSP.",
  "La faction commande en début de jeu un navire ou un aéronef (enregistrement au Notaire validé et gratuit).":
    "De factie voert bij aanvang van het spel het bevel over een schip of luchtschip (registratie bij de notaris, goedgekeurd en gratis).",
  "Justicier-ères des flots sous lettre de course (gratuite auprès du Notaire). Sortes de Rangers des Mers du Dominion ; peuvent recevoir une solde ou honorer un contrat.":
    "Rechthandhavers van de golven met een kaperbrief (gratis bij de notaris). Een soort Zeeranger van het Dominion; ze kunnen soldij ontvangen of een contract nakomen.",
  "Faction hors-la-loi des mers, crainte sur les eaux.": "Vogelvrije factie van de zeeën, gevreesd op het water.",
  "Groupe sans foi ni loi : esclavagistes, kidnappeur-euses et assassin-es qui méprisent même le Code de la Piraterie.":
    "Groep zonder wet of geloof: slavenhandelaars, ontvoerders en moordenaars die zelfs de Piratencode verachten.",
  "Faction diplomate tenue officiellement à la neutralité, avec ses objectifs propres, ses procédures spéciales ou savoirs interdits aux profanes (ex. l'Agence des Anachronistes).":
    "Diplomatieke factie die officieel neutraal moet blijven, met eigen doelen, bijzondere procedures of kennis die voor buitenstaanders verboden is (bv. het Anachronistenagentschap).",
  "Société élitiste tournée vers l'exploration, le pillage de ruines, les chasses récréatives, l'enrichissement et la notoriété.":
    "Elitair genootschap gericht op ontdekking, het plunderen van ruïnes, recreatieve jacht, rijkdom en faam.",
  "Deux peuplades au choix : les Elfes des Mers et les Mapinguaris (humanoïdes crocodiles de la Mer du Sud).":
    "Twee volkeren naar keuze: de Zee-elfen en de Mapinguari's (krokodilachtige humanoïden uit de Zuidzee).",
  "Deux peuplades au choix : la Horde d'Airain et les Errants (que certains nomment Cornus).":
    "Twee volkeren naar keuze: de Bronzen Horde en de Dolenden (door sommigen Gehoornden genoemd).",
  "Convoi de marchand-es interplanaires qui commerce à travers les failles planaires et ramène des biens d'autres mondes. Le pont entre le négoce et le planaire.":
    "Konvooi van interplanaire handelaars dat handel drijft door de planaire scheuren en goederen uit andere werelden meebrengt. De brug tussen handel en het planaire.",
  "Êtres venus d'un plan quelconque, bloqué-es sur Barok pour des raisons sensées, accidentelles ou loufoques, qui cherchent à rentrer ou à s'adapter.":
    "Wezens uit een of ander plan, om zinnige, toevallige of dwaze redenen gestrand op Barok, op zoek naar een weg terug of naar aanpassing.",
  "Rescapé-es d'un plan, d'une dimension ou d'un lieu dévoré par les Ténèbres ou conquis par une puissance sidérale. Iels portent la mémoire d'un mal absolu.":
    "Overlevenden van een plan, een dimensie of een plaats verslonden door de Duisternis of veroverd door een sterrenmacht. Zij dragen de herinnering aan een absoluut kwaad.",
  "Faction de survivant-es de la servitude imposée, entre liberté et vengeance ; ses membres déstabilisent les habitudes et se battent pour leurs valeurs.":
    "Factie van overlevenden van opgelegde slavernij, tussen vrijheid en wraak; haar leden verstoren gewoonten en vechten voor hun waarden.",
  "Principal vecteur de renommée (patente Artiste au Notaire). Bonus de +2 en cas de réussite d'une représentation ou d'un spectacle.":
    "Belangrijkste bron van faam (artiestenvergunning bij de notaris). Bonus van +2 bij een geslaagde voorstelling of show.",
  "Caïds des rues ; le réseau réel se noue en jeu via le Courtier des Ombres.":
    "Straatbazen; het echte netwerk ontstaat in het spel via de Schaduwmakelaar.",
  "Circuits du Marché Noir et évitement des taxes.": "Zwartemarktcircuits en belastingontduiking.",
  "Personnages qui n'ont plus rien : honneur, famille et titre perdus. Iels vivent en marge, mendient, errent, vivent de petits larcins ou de leurs consommations.":
    "Personages die niets meer hebben: eer, familie en titel verloren. Ze leven in de marge, bedelen, dolen rond en leven van kruimeldiefstal of van hun verslavingen.",
  "Derrière une façade et une fausse occupation, votre groupe est membre de la très sélective Guilde des Assassins du Dominion. Accès à deux compétences spéciales : Coup bas et Mort éradiquante (une utilisation par jour chacune).":
    "Achter een façade en een vals beroep is jouw groep lid van het zeer selecte Moordenaarsgilde van het Dominion. Toegang tot twee bijzondere vaardigheden: Gemene streek en Uitroeiende Dood (elk één keer per dag).",
  "Revente des artéfacts, antiquités et statues deux fois plus cher. Vous travaillez volontiers avec les pillards et les voleurs (accès à la Pègre).":
    "Verkoopt artefacten, antiek en beelden voor het dubbele. Je werkt graag samen met plunderaars en dieven (toegang tot de onderwereld).",
  "Approvisionnement et stocks stratégiques. Vous disposez d'une malle ou d'un coffre sur site où les Miliciens ne trouvent rien (annonce « Résist »). Crocheteur-euses et Tisseur-euses peuvent l'ouvrir.":
    "Bevoorrading en strategische voorraden. Je beschikt ter plaatse over een koffer of kist waarin de Militie niets vindt (aankondiging \"Resist\"). Slotkrakers en Wevers kunnen hem openen.",
  "Protection contractuelle rapprochée ; solde ou contrat noués en jeu.":
    "Contractuele persoonsbeveiliging; soldij of contract worden in het spel afgesproken.",
  "Protection de base pour les plus offrants, sans regarder à la moralité. Tant qu'on vous paye, même en nourriture, boissons et alcool.":
    "Basisbescherming voor de hoogste bieder, moraal terzijde. Zolang je betaald wordt, desnoods in eten, drank en alcohol.",
  "Comptoir mobile de marchand-es ambulant-es qui sillonne le Dominion, monte son étal en jeu et colporte nouvelles et rumeurs autant que la marchandise.":
    "Mobiele handelspost van rondtrekkende kooplui die het Dominion doorkruist, haar kraam opzet in het spel en evenveel nieuws en geruchten verkoopt als koopwaar.",
  "Camelots qui vendent fioles miracles, remontants à vapeur et babioles « garanties authentiques ».":
    "Marktkramers die wonderflesjes, stoomopkikkers en prullaria \"gegarandeerd echt\" verkopen.",
  "Hospitalières ambulantes indépendantes : soins, prévention des infections et des maladies, gestion officielle des quarantaines pour tout le monde.":
    "Onafhankelijke rondtrekkende hospitaalzusters: verzorging, preventie van infecties en ziekten, en officieel beheer van quarantaines voor iedereen.",
  "Compagnie marchande privée non nationale, qui négocie et transporte depuis la Lémurie : épices, denrées rares, minéraux inédits et pharmacopée locale.":
    "Private, niet-nationale handelscompagnie die vanuit Lemurië handelt en vervoert: specerijen, zeldzame waren, onbekende mineralen en lokale geneesmiddelen.",
  "Équipage spécialisé dans la coupe, l'exportation et la vente des icebergs et banquises du long Hiver du nord.":
    "Bemanning gespecialiseerd in het snijden, uitvoeren en verkopen van ijsbergen en pakijs uit de lange noordelijke Winter.",
  "Marchand-es d'esclaves qui masquent leur commerce sous d'autres trafics. Statut obtenu après plusieurs missions réussies (accès à la Pègre).":
    "Slavenhandelaars die hun handel verbergen achter andere smokkel. Status verworven na meerdere geslaagde opdrachten (toegang tot de onderwereld).",
  "Atelier d'inventeur-euses, gadgetier-ères et mécano-s, tout en engrenages et en vapeur. Le versant steampunk générique, hors Mécanarcanum nain.":
    "Atelier van uitvinders, gadgetbouwers en monteurs, vol tandwielen en stoom. De algemene steampunkkant, buiten het dwergse Mecanarcanum.",
  "Équipes qui dépouillent les carcasses de navires et d'aéronefs échoués.":
    "Ploegen die de karkassen van gestrande schepen en luchtschepen leegplukken.",
  "Association qui cartographie les régions réputées incartographiables, là où chaque Nation a semé de fausses données. Officiellement.":
    "Vereniging die de als onkarteerbaar bekendstaande gebieden in kaart brengt, daar waar elke Natie valse gegevens heeft gezaaid. Officieel dan toch.",
  "Chercheur-euses de bons courants d'éther, passagers ou durables, pour que les navires volants filent plus vite.":
    "Zoekers naar goede etherstromen, vluchtig of blijvend, zodat luchtschepen sneller varen.",
  "Porteur-euses du masque à bec. Iels gèrent les morts, les quarantaines et la logistique de résurrection au Fanum de Cristal.":
    "Dragers van het snavelmasker. Zij beheren de doden, de quarantaines en de opstandingslogistiek in het Kristallen Fanum.",
  "Firme qui vend des polices aux clauses interminables couvrant séquelles, amputations et membres estropiés, et qui fabrique ou loue des golems serviles.":
    "Firma die polissen met eindeloze clausules verkoopt voor restletsels, amputaties en verminkte ledematen, en die dienstbare golems bouwt of verhuurt.",
  "Chasseur-euses de primes et de créatures, versant terrestre et professionnel.":
    "Premie- en wezenjagers, de professionele kant te land.",
  "Troupe obsédée par le sport plus que par la guerre, qui monte des tournois partout où elle passe.":
    "Gezelschap dat meer met sport dan met oorlog bezig is en overal toernooien organiseert.",
  "Dernière université spécialiste ès arts mystiques, psychiques et occultes de Porémanie. Assemblées de recherche sur les arts oubliés, interdits ou cosmiques et sur les manuscrits perdus.":
    "De laatste universiteit gespecialiseerd in de mystieke, psychische en occulte kunsten van Poremanië. Onderzoeksvergaderingen over vergeten, verboden of kosmische kunsten en over verloren manuscripten.",
  "Confrérie d'honneur et de parole tenue.": "Broederschap van eer en gegeven woord.",
  "Faction gardienne et pratiquante du Mécanarcanum, membre d'une des Nations naines. Manquer à sa parole ou perdre son honneur publiquement peut mener à être déclaré-e déchu-e.":
    "Factie die het Mecanarcanum bewaakt en beoefent, lid van een van de Dwergennaties. Je woord breken of in het openbaar je eer verliezen kan leiden tot de status van Gevallene.",

  // Soorten, beperkingen, vereisten
  "Marque Planaire et Marque Semence de Dragon": "Planaire Merkteken en Merkteken Drakenzaad",
  "Interdite aux Vorélan-nes à la création": "Verboden voor Vorelanen bij de creatie",
  "Adepte – Fidèle, Garde du Corps, Marque Semence de Dragon": "Volgeling – Gelovige, Lijfwacht, Merkteken Drakenzaad",
  "Bande organisée, Pirate, Épervier, Contrebandier-ère, Érudite": "Georganiseerde bende, Piraat, Sperwer, Smokkelaar, Geleerde",
  "Porteur-euse de Rune ; charge de Greffier fermée": "Runendrager; het ambt van Griffier is gesloten",
  "Navire monté sur site + enregistrement au Notaire": "Schip ter plaatse opgebouwd + registratie bij de notaris",
  "Toutes sauf Morts-Vivants, Korrigans, Drièdres, Archéo-Félis, Drogons, Génies d'Ajunda, Êtres Mécaniques, Tengus d'Ajunda, Cerbères, Hagnolls":
    "Alle behalve Ondoden, Korrigans, Driëdren, Archeo-Felis, Drogons, Geesten van Ajunda, Mechanische wezens, Tengus van Ajunda, Cerberussen, Hagnolls",
  "Marque Planaire, Pirate, Épervier, charges d'Ombre, Milicien, Magistrat, Greffier, Contrebandier-ère, Chasseur-euses de Chair, Marques sombres":
    "Planair Merkteken, Piraat, Sperwer, Schaduwambten, Milicien, Magistraat, Griffier, Smokkelaar, Vleesjagers, duistere Merktekens",
  "Éthique ; solde ou contrat possible": "Ethiek vereist; soldij of contract mogelijk",
  "Marque L.A.M., Corsaire elfique, Épervier, Agente d'une ONG, Porteur-euse de Rune, Mercenaire Peau-olive, Archiviste des Secrets ; charges de Greffier, Milicien, Magistrat":
    "Merkteken A.M.L., Elfse kaper, Sperwer, Agent van een ngo, Runendrager, Olijfhuidige huurling, Archivaris van de Geheimen; ambten van Griffier, Milicien en Magistraat",
  "Si marin, Capitaine obligatoire ; Code de la Piraterie demandé 2 mois avant":
    "Indien zeevarend is Kapitein verplicht; Piratencode 2 maanden vooraf aan te vragen",
  "Toutes les charges publiques, Agente d'une ONG, Corsaire elfique, Archiviste des Secrets, Organisation sanitaire":
    "Alle openbare ambten, Agent van een ngo, Elfse kaper, Archivaris van de Geheimen, Gezondheidsorganisatie",
  "Capitaine (Mer ou Air) obligatoire": "Kapitein (Zee of Lucht) verplicht",
  "Marque Planaire, Porteur-euse de Rune, Pirate, Bande organisée, Épervier, Chasseur-euses de Chair":
    "Planair Merkteken, Runendrager, Piraat, Georganiseerde bende, Sperwer, Vleesjagers",
  "Neutralité (sauf légitime défense)": "Neutraliteit (behalve bij wettige zelfverdediging)",
  "Contacter l'Orga : espèces spéciales incluses": "Neem contact op met de organisatie: speciale soorten inbegrepen",
  "Charges publiques et charges d'Ombre (Pègre et Contrebande)": "Openbare ambten en Schaduwambten (onderwereld en smokkel)",
  "Contact Orga": "Contact met de organisatie",
  "Toutes sauf Vorélan-nes": "Alle behalve Vorelanen",
  "Charges publiques ; charges d'Ombre. Compatible avec la Marque Planaire.":
    "Openbare ambten; Schaduwambten. Verenigbaar met het Planaire Merkteken.",
  "Charges publiques ; méfiance des cultes. Compatible avec la Marque Planaire.":
    "Openbare ambten; wantrouwen van de cultussen. Verenigbaar met het Planaire Merkteken.",
  "Contact Orga ; background validé (mal absolu)": "Contact met de organisatie; goedgekeurde achtergrond (absoluut kwaad)",
  "Contrebandier-ère, Chasseur-euses de Chair": "Smokkelaar, Vleesjagers",
  "Compétences Entrave et Évasion": "Vaardigheden Vastbinden en Ontsnappen",
  "Aucune": "Geen",
  "Une compétence de Filouterie obligatoire à la création : Crochetage, Dissimulation, Entrave, Évasion, Infiltration, Mort éradiquante ou Pickpocket (prérequis de la compétence choisie compris)":
    "Eén duistere vaardigheid is verplicht bij de creatie: Slotkraken, Verbergen, Vastbinden, Ontsnappen, Infiltratie, Uitroeiende Dood of Zakkenrollen (inclusief de vereisten van de gekozen vaardigheid)",
  "Corsaire elfique, Composé d'Ancien-nes Esclaves, Archiviste des Secrets ; charges de Greffier et Milicien":
    "Elfse kaper, Samengesteld uit voormalige slaven, Archivaris van de Geheimen; ambten van Griffier en Milicien",
  "TOUTES LES ORIGINES, sauf Gros Bras, les autres origines de Pègre et ombres et celles de Marges et survie":
    "ALLE ORIGINES, behalve Spierbundel, de andere origines uit Onderwereld en schaduwen en die uit Marge en overleven",
  "Avoir tout perdu et une très bonne proposition de background": "Alles verloren hebben, plus een zeer sterk achtergrondvoorstel",
  "N'accepte ni les Planaires ni les Draconides dans ses rangs": "Aanvaardt noch Planairen noch Draconiden in haar rangen",
  "Marque Semence de Dragon et Marque Planaire": "Merkteken Drakenzaad en Planair Merkteken",
  "Menuisier": "Timmerman",
  "Charges publiques, Bande organisée, Pirate, Épervier, Mercenaire Peau-olive, Sectaire ésotérico-magique ; charges d'Ombre et Enquêteur":
    "Openbare ambten, Georganiseerde bende, Piraat, Sperwer, Olijfhuidige huurling, Esoterisch-magische sekteling; Schaduwambten en Onderzoeker",
  "Moralité et charges publiques": "Moraliteit en openbare ambten",
  "Charges publiques ; Déchu-e": "Openbare ambten; Gevallene",
  "Aucun effet garanti : tout est du roleplay": "Geen enkel gegarandeerd effect: alles is rollenspel",
  "Chasseur-euses de Chair ; Épervier ; Déchu-e": "Vleesjagers; Sperwer; Gevallene",
  "Neutralité de soin ; compétence de soin recommandée": "Neutrale verzorging; een genezende vaardigheid aanbevolen",
  "Contact Orga (denrées et pharmacopée)": "Contact met de organisatie (waren en geneesmiddelen)",
  "Charges publiques ; Corsaire elfique ; Mercenaire Peau-olive ; Composé d'Ancien-nes Esclaves ; Organisation sanitaire privée des Flottes et Voyageurs ; Agente d'une ONG":
    "Openbare ambten; Elfse kaper; Olijfhuidige huurling; Samengesteld uit voormalige slaven; Private gezondheidsorganisatie van Vloten en Reizigers; Agent van een ngo",
  "Accès Pègre ; statut acquis en jeu (plusieurs missions)": "Toegang tot de onderwereld; status verworven in het spel (meerdere opdrachten)",
  "Ingénieur recommandé": "Ingenieur aanbevolen",
  "Natation optionnelle": "Zwemmen optioneel",
  "Aucune stricte (dessein caché possible)": "Geen strikte (een verborgen agenda is mogelijk)",
  "Contact Orga si scénarisé": "Contact met de organisatie indien het deel uitmaakt van een plot",
  "Navigation recommandée": "Navigatie aanbevolen",
  "Lien avec le Fanum de Cristal ; soin ou rite recommandé": "Band met het Kristallen Fanum; verzorging of ritueel aanbevolen",
  "Golems serviles à valider par l'Orga": "Dienstbare golems moeten door de organisatie worden goedgekeurd",
  "Chasse ou combat recommandé": "Jacht of gevecht aanbevolen",
  "Aucune stricte": "Geen strikte",
  "Voir les règles du LIBG": "Zie de LIBG-regels",
  "Toutes sauf Vorélan-nes au début": "Alle behalve Vorelanen bij aanvang",
  "Charges publiques (savoirs interdits) ; rivalité entre Corona ; Marque Semence de Dragon":
    "Openbare ambten (verboden kennis); rivaliteit tussen Corona's; Merkteken Drakenzaad",
  "Contact Orga (arts interdits, oubliés ou cosmiques) ; magie recommandée":
    "Contact met de organisatie (verboden, vergeten of kosmische kunsten); magie aanbevolen",
  "Orques, Gobelins, Trolls": "Orks, Goblins, Trollen",
  "Pratiques interdites : nécromancie, trafic de cadavres, esclavagisme. Marques L.A.M., Semence de Dragon et Planaire ; Corsaire elfique, Pirate, Épervier, Bande organisée, Garde du Corps, Porteur-euse de Rune, Chasseur-euses de Chair ; charges publiques et d'Ombre":
    "Verboden praktijken: necromantie, lijkenhandel, slavernij. Merktekens A.M.L., Drakenzaad en Planair; Elfse kaper, Piraat, Sperwer, Georganiseerde bende, Lijfwacht, Runendrager, Vleesjagers; openbare ambten en Schaduwambten",
  "Nains, Gnomes, Sautais": "Dwergen, Gnomen, Sautais",
  "Marques Planaire et Semence de Dragon, Capitaine (Mer ou Air), Pirate, Mercenaire Peau-olive, Agente d'une ONG, Bande organisée":
    "Planair Merkteken en Merkteken Drakenzaad, Kapitein (Zee of Lucht), Piraat, Olijfhuidige huurling, Agent van een ngo, Georganiseerde bende",
  "Serment (trahison → Déchu-e)": "Eed (verraad → Gevallene)",
};

/** Traduit un texte d'origine / de marque ; renvoie le français si aucune traduction n'existe. */
export const translateFactionText = (text: string, language: "fr" | "en" | "nl"): string => {
  if (!text || language === "fr") return text;
  const map = language === "nl" ? factionTextsNl : factionTextsEn;
  const marques = language === "nl" ? marqueTextsNl : marqueTextsEn;
  return map[text] || marques[text] || text;
};
