// Mappings de traduction pour les données de jeu (compétences, titres, espèces)

// Traductions des effets de compétences
export const competenceEffectTranslations: Record<string, string> = {
  "Lecture/écriture Dominical et Insulaire": "Reading/writing in Dominical and Insular",
  "Toutes les langues des terres connues": "All languages of known lands",
  "P/P/C réponse sincère (1×/pers/jour)": "R/P/S sincere answer (1×/person/day)",
  "Immunité Flatterie": "Flattery Immunity",
  "4 rumeurs/événement": "4 rumors/event",
  "8 rumeurs/événement": "8 rumors/event",
  "10 rumeurs/événement": "10 rumors/event",
  "+10 Galets Or/événement": "+10 Gold Pebbles/event",
  "Perles/gemmes → bijoux": "Pearls/gems → jewelry",
  "Animaux → viande": "Animals → meat",
  "5 bois → 1 chevron ; chariots": "5 wood → 1 chevron; carts",
  "Végétaux/peau → papier": "Plants/skin → paper",
  "Animaux/cadavres → viande (antre TO)": "Animals/corpses → meat (TO lair)",
  "Pierre/bois → statues/antiquités": "Stone/wood → statues/antiques",
  "Végétaux/peau → tissu ; 4 tissus → voile": "Plants/skin → fabric; 4 fabrics → sail",
  "Animaux/détritus → cadavres (illégal)": "Animals/garbage → corpses (illegal)",
  "Sable → verre + bonus brûleur": "Sand → glass + burner bonus",
  "Coup épaule = inconscient 5 min": "Shoulder strike = unconscious 5 min",
  "+1 Bagarre": "+1 Brawl",
  "+2 Bagarre": "+2 Brawl",
  "+3 Bagarre": "+3 Brawl",
  "Cuir souple + casques légers (1 PA/zone)": "Soft leather + light helmets (1 AP/zone)",
  "Cuir rigide (2 PA/zone) - Annule Natation": "Rigid leather (2 AP/zone) - Cancels Swimming",
  "Toutes armures (3 PA/zone) - Annule Natation": "All armors (3 AP/zone) - Cancels Swimming",
  "Maniement gatlings et engins siège": "Gatling and siege engine handling",
  "Tous types boucliers": "All shield types",
  "Annonce 'crush' 1×/heure": "Announce 'crush' 1×/hour",
  "Résiste 3 premiers flash/blind": "Resists first 3 flash/blind",
  "Annonce 'through' (dos/contournement)": "Announce 'through' (back/bypass)",
  "+1 PV/localisation": "+1 HP/location",
  "Toutes armes autorisées": "All authorized weapons",
  "Annonce 'strike down' 1×/heure": "Announce 'strike down' 1×/hour",
  "Défaire 1 nœud en 3 min": "Undo 1 knot in 3 min",
  "Défaire 2 nœuds": "Undo 2 knots",
  "Défaire 3 nœuds": "Undo 3 knots",
  "Fouille approfondie requise (2 sabliers)": "Thorough search required (2 sandglasses)",
  "Ligoter consentant/inconscient max 1h": "Tie up willing/unconscious max 1h",
  "Libération en 1 min": "Liberation in 1 min",
  "Accès portes dérobées": "Access to hidden doors",
  "Vol à la tire (tirage carte Argousin.e)": "Pickpocketing (Argousin card draw)",
  "Carte céleste au check-in": "Star chart at check-in",
  "Rituel 20 min → détails": "20 min ritual → details",
  "Esprit 15 min/jour + Infravision": "Spirit 15 min/day + Infravision",
  "4 questions esprits via encens": "4 questions to spirits via incense",
  "Rituels 2 écoles (sauf Arcanes/Alchimie)": "Rituals 2 schools (except Arcane/Alchemy)",
  "Détection auto manifestations magiques": "Auto-detect magical manifestations",
  "Canalisation énergie objets/armes/armures": "Channel energy to objects/weapons/armor",
  "20 pierres vie + sorts/rituels alchimie": "20 life stones + alchemy spells/rituals",
  "Tatouages rituels TI (pouvoirs temp/perm)": "TI ritual tattoos (temp/perm powers)",
  "2 écoles + Arcanes/Guérison. Vision tulles. +10 pierres vie": "2 schools + Arcane/Healing. Tulle vision. +10 life stones",
  "+2 pierres vie": "+2 life stones",
  "+4 pierres vie": "+4 life stones",
  "+8 pierres vie": "+8 life stones",
  "Stabilisation + bandage → +1 PV après 1h": "Stabilization + bandage → +1 HP after 1h",
  "Soins complets 1 sablier (tous PV)": "Full care 1 sandglass (all HP)",
  "Sorts guérison (achète pierres non-liées)": "Healing spells (buy unbound stones)",
  "Remèdes maladies + soigne abîme (+2/30min)": "Disease remedies + heals abyss (+2/30min)",
  "Soigne 1 localisation 1 sablier": "Heals 1 location 1 sandglass",
  "Potions/huiles (30min/dose, matériel TO×2)": "Potions/oils (30min/dose, TO equipment×2)",
  "Réparations 3min + régénération auto 15min": "Repairs 3min + auto regeneration 15min",
  "Défense procès + accès archives judiciaires": "Trial defense + judicial archives access",
  "Chasse monstres → 5 pages Bestiaire": "Monster hunting → 5 Bestiary pages",
  "Chasse monstres → 10 pages Bestiaire": "Monster hunting → 10 Bestiary pages",
  "Chasse monstres → 15 pages Bestiaire": "Monster hunting → 15 Bestiary pages",
  "Objets métalliques exceptionnels ; 2 métal → 1 acier": "Exceptional metal objects; 2 metal → 1 steel",
  "Potions naturelles (15min/recette, matériel TO×1)": "Natural potions (15min/recipe, TO equipment×1)",
  "Engins mécaniques + pilotage": "Mechanical devices + piloting",
  "Brèches remparts + bombes sape": "Rampart breaches + sapping bombs",
  "10 pierre + 10 sable + 5 rune givre au check-in": "10 stone + 10 sand + 5 frost rune at check-in",
  "Fouille donjon (15min, 2×/événement)": "Dungeon search (15min, 2×/event)",
  "10 détritus + 5 toxic au check-in": "10 garbage + 5 toxic at check-in",
  "5 animaux → 12 (peluches TI requises)": "5 animals → 12 (TI plushies required)",
  "5 fleurs → 10 (4h) ou 20 (6h)": "5 flowers → 10 (4h) or 20 (6h)",
  "10 gemmes + 10 Argent + 5 Or au check-in": "10 gems + 10 Silver + 5 Gold at check-in",
  "10 végétaux + 10 Cigares + 5 Encens au check-in": "10 plants + 10 Cigars + 5 Incense at check-in",
  "Croquis créature → 1 Antiquité": "Creature sketch → 1 Antique",
  "4 fleurs → 10 fleurs ou céréales": "4 flowers → 10 flowers or cereals",
  "10 ressources bois": "10 wood resources",
  "4 végétaux → 10 végétaux ou choucroute": "4 plants → 10 plants or sauerkraut",
  "4 végétaux → 10 végétaux": "4 plants → 10 plants",
  "2 céréales + 4 fleurs → 1 alcool pur": "2 cereals + 4 flowers → 1 pure alcohol",
  "10 ressources pierre/métal/charbon": "10 stone/metal/coal resources",
  "10 produits mer/trésors (matériel TI requis)": "10 sea products/treasures (TI equipment required)",
  "-5min préparations + huiles spéciales": "-5min preparations + special oils",
  "Dressage créatures (1/enclos TO)": "Creature training (1/TO enclosure)",
  "Transformation mécanique (15min/loc)": "Mechanical transformation (15min/loc)",
  "Magie divine ; 1 école + Arcanique ; 4 foi/événement. +10 pierres vie": "Divine magic; 1 school + Arcane; 4 faith/event. +10 life stones",
  "Rituels école Arcanes uniquement. +10 pierres vie": "Arcane school rituals only. +10 life stones",
  "Évite noyade combat naval": "Avoids drowning in naval combat",
  "Réparation voies eau/air + construction navires": "Water/air route repair + ship construction",
  "Glisse filin/grappin vers autre navire": "Glide rope/grapple to another ship",
  "Fluviale (eaux douces)": "River (fresh water)",
  "Cabotage (max 2 cases côtes)": "Coastal (max 2 coast squares)",
  "Haute mer": "Open sea"
};

export const competenceTranslations: Record<string, string> = {
  // SOCIALES & ÉCONOMIQUES
  "Alphabétisation commune": "Common literacy",
  "Alphabétisation avancée": "Advanced literacy",
  "Flatterie": "Flattery",
  "Résistance à la flatterie": "Resistance to flattery",
  "Rumeurs niv.1": "Rumors",
  "Rumeurs niv.2": "Rumors",
  "Rumeurs niv.3": "Rumors",
  "Solde": "Salary",
  
  // ARTISAN
  "Bijoutier": "Jeweler",
  "Boucher": "Butcher",
  "Menuisier": "Carpenter",
  "Papetier": "Papermaker",
  "Ratier": "Ratter",
  "Sculpteur": "Sculptor",
  "Tisserand": "Fabricator",
  "Trafiquant de cadavres": "Corpse trafficker",
  "Verrier": "Glassmaker",
  
  // BAGARRE
  "Assommement": "Knockout",
  "Sauvage niv.1": "Savage",
  "Sauvage niv.2": "Savage",
  "Sauvage niv.3": "Savage",
  
  // MARTIAL
  "Armure niv.1": "Armor",
  "Armure niv.2": "Armor",
  "Armure niv.3": "Armor",
  "Artilleur": "Gunner",
  "Bouclier": "Shield",
  "Brise-crâne": "Skullbreaker",
  "Combat en aveugle": "Blind combat",
  "Coupe jarret": "Hock blow",
  "Endurance accrue": "Increased endurance",
  "Manipulation d'armes": "Weapons handling",
  "Perce-ligne": "Line Piercer",
  
  // LOUCHES
  "Crochetage niv.1": "Lockpicker",
  "Crochetage niv.2": "Lockpicker",
  "Crochetage niv.3": "Lockpicker",
  "Dissimulation": "Concealment",
  "Entrave": "Handcuff",
  "Évasion": "Escape",
  "Infiltration": "Infiltration",
  "Pickpocket": "Pickpocket",
  
  // ÉSOTÉRIQUES
  "Astrologue": "Astrologer",
  "Divination": "Divination",
  "Illuminé": "Illuminated",
  "Mystique": "Mystic",
  "Ritualiste": "Ritualist",
  
  // MAGIQUES
  "Détection naturelle magie": "Natural Magic Detection",
  "Enchanteur": "Enchanter",
  "Initié": "Initiate",
  "Tatoueur": "Tattoo artist",
  "Tisseur": "Weaver",
  "Transcendance niv.1": "Transcendence",
  "Transcendance niv.2": "Transcendence",
  "Transcendance niv.3": "Transcendence",
  
  // MÉDICALES
  "Barbier": "Barber",
  "Chirurgien": "Surgeon",
  "Guérisseur": "Healer",
  "Médecin": "Physician",
  "Rebouteux": "Bonesetter",
  
  // PROFESSIONNELLES
  "Alchimiste": "Alchimist",
  "Armurier": "Armorer",
  "Avoué": "Barrister",
  "Chasseur niv.1": "Hunter",
  "Chasseur niv.2": "Hunter",
  "Chasseur niv.3": "Hunter",
  "Forgeron": "Blacksmith",
  "Herboriste": "Herbalist",
  "Ingénieur": "Engineer",
  "Sapeur": "Sapper",
  
  // PRODUCTION
  "Carrier": "Carrier",
  "Chiffonnier": "Ragpicker",
  "Éboueur": "Garbage Collector",
  "Éleveur": "Breeder",
  "Jardinier": "Gardener",
  "Lapidaire": "Lapidary",
  "Tabaculteur": "Tobacco grower",
  "Taxidermiste": "Taxidermist",
  
  // RÉCOLTE
  "Agriculteur": "Farmer",
  "Bûcheron": "Lumberjack",
  "Choucroutier": "Sauerkraut maker",
  "Cueilleur": "Gatherer",
  "Distillateur": "Brewer",
  "Mineur": "Miner",
  "Pêcheur": "Fisherman",
  
  // PERFECTIONNEMENT
  "Alambiqueur": "Distiller",
  "Dompteur de bêtes": "Beast tamer",
  "Mécanisation": "Mechanization",
  
  // SPIRITUELLES
  "Clerc": "Cleric",
  "Cérémonialiste": "Ceremonialist",
  
  // MANOEUVRE
  "Natation": "Swimming",
  
  // EN RÉVISION
  "Charpentier de marine": "Shipwright",
  "Glisseur": "Glider",
  "Navigation niv.1": "Navigation",
  "Navigation niv.2": "Navigation",
  "Navigation niv.3": "Navigation"
};

export const titreTranslations: Record<string, string> = {
  "Adepte": "Follower",
  "Agent d'une ONG": "NGO Agent",
  "Ancien Esclave": "Former slave",
  "Archiviste des Secrets": "Archivist",
  "Artiste d'une Compagnie": "Artist",
  "Bourgeois": "Bourgeois",
  "Capitaine de Navire": "Ship captain",
  "Capitaine Navire-Volant": "Airship captain",
  "Chef de Bande Organisée": "Bandit leader",
  "Contrebandier": "Smuggler",
  "Corsaire elfique": "Elven corsair",
  "Épervier": "Sparrowhawk",
  "Garde du Corps": "Bodyguard",
  "Gestionnaire de Dépôt": "Warehouse Manager",
  "Greffier": "Clerk",
  "Mercenaire Peau-olive": "Olive-skinned mercenary",
  "Noblesse de Sang": "Blood Nobility",
  "Ordre Chevaliers Suie (LAM)": "AML",
  "Pirate": "Pirate",
  "Planaire": "Planar",
  "Porteur de Rune": "Rune beaver",
  "Prévôt du Crépuscule": "Provost of the Twilight",
  "Sectaire ésotérico-magique": "Esoteric-magical sect",
  "Sergent de l'ombre": "Shadow Sergeant",
  "Démuni": "Outcast",
  "Enquêteur public": "Public investigator",
  "Milicien": "Militiaman",
  "Magistrat": "Magistrate"
};

export const especeTranslations: Record<string, string> = {
  "Humains": "Humans",
  "Elfes Îles Bénies": "Elves of the Blessed Îsles",
  "Elfes Décharnement": "Elves of the Fleshless",
  "Nains": "Dwarven",
  "Alfes": "Alves",
  "Elfes Elvendornen": "Elves of Elvendornen",
  "Orques": "Orcs",
  "Gobelins": "Goblins",
  "Trolls": "Trolls",
  "Sautais": "Sautais",
  "Artolls": "Artolls",
  "Warolls": "Warolls",
  "Korrigans": "Korrigans",
  "Gnomes": "Gnomes",
  "Vorélans": "Vorelans",
  "Êtres Mécaniques": "Mechanicals beings",
  "Syrianes": "Syrianes",
  "Ragnolls Haut-Royaume": "Ragnolls of High Insular Kingdom",
  "Ragnolls Domitia": "Ragnolls Domitia Unificos",
  "Ragnolls Poméranie": "Ragnolls Poremanians",
  "Archéo-Félis": "Archeo-Felis",
  "Néo-Félis": "Neo-Felis",
  "Chyroptas": "Chyroptas",
  "Drièdres": "Driedars",
  "Drogons": "Drogons",
  "Génies d'Ajunda": "Ajunda's Genies",
  "Gorgones": "Gorgons",
  "Guelfes": "Guelfs",
  "Leichis": "Leichis",
  "Morts-Vivants": "Undead",
  "Tengus d'Ajunda": "Ajunda's Tengus",
  "Planaire": "Planars",
  "Hagnolls": "Hagnolls",
  "Tygnolls": "Tygnolls",
  "Les Coureurs de la Brousse d'Ajunda": "Bush runners",
  "Elfes": "Elves",
  "Nain-es": "Dwarven",
  "Peaux Olives": "Olive-Skins",
  "Protéléens": "Protoleans",
  "Ragnolls": "Ragnolls",
  "Félis": "Felis"
};

// Traductions des descriptions spéciales des espèces
export const especeSpecialTranslations: Record<string, string> = {
  "Espèce adaptative - Liberté totale": "Adaptive species - Total freedom",
  "Culture shintoïste, Cycle": "Shinto culture, Cycle",
  "Tatouages/piercings obligatoires": "Mandatory tattoos/piercings",
  "Voient fées, Armes Mercury": "See faeries, Mercury Weapons",
  "Culture lapone": "Lapland culture",
  "Marche Inframonde + Esthétique morbide": "Underworld Walk + Morbid aesthetic",
  "Spécial: +1 PV/localisation permanent": "Special: +1 HP/location permanent",
  "TDAH, technologie": "ADHD, technology",
  "Sagesse respectée": "Respected wisdom",
  "Très petite taille requis": "Very small height required",
  "Style renaissance italien": "Italian renaissance style",
  "Style nomade steppes": "Nomadic steppes style",
  "Immunité maladies + Drain vie": "Disease immunity + Life drain",
  "Immunité poisons/toxines/assommement, Cheveux colorés": "Poison/toxin/knockout immunity, Colored hair",
  "Double esprit, Cornes glyphes, Boule frontale de lumière, Immunité frayeur": "Double spirit, Glyph horns, Frontal light orb, Fear immunity",
  "PV=PA, Loc=armure1, Pas abîme, Charbon obligatoire": "HP=AP, Loc=armor1, No abyss, Coal mandatory",
  "Amphibies (eau 1×/jour), Sensibilité feu (×2 dégâts)": "Amphibious (water 1×/day), Fire sensitivity (×2 damage)",
  "Végans, Tradition artisanale": "Vegans, Artisan tradition",
  "Entrepreneurs nés, Omnivores": "Born entrepreneurs, Omnivores",
  "Viandards, Honneur combat": "Meat-eaters, Combat honor",
  "Pas de queue, Gardiens langage": "No tail, Language guardians",
  "Queue présente, Arbre sanctuaire": "Tail present, Sanctuary tree",
  "Ailes chauve-souris apparentes et protections contre le soleil (Matériel: parasol, châle, chapeau, etc)": "Visible bat wings and sun protection (Equipment: parasol, shawl, hat, etc.)",
  "Aspect végétal : Elles s'évanouissent si on les empêche de boire sur 1 journée 1 litre d'eau ou si elle monte en haute altitude sur un navire volant, elles sont plongés dans le coma.": "Plant aspect: They faint if prevented from drinking 1 liter of water for 1 day or if they go high altitude on a flying ship, they fall into a coma.",
  "Ils ignorent les cartes de biture. Ceux-ci ne les affectent pas car ils boivent très peu et l'alcool n'a aucun effet sur eux.": "They ignore drunkenness cards. These don't affect them because they drink very little and alcohol has no effect on them.",
  "Les Génies ont un objet niche sur eux ou caché à proximité, qui les exécute immédiatement s'il est détruit. Cet objet niche possède les mêmes propriétés qu'un cimetière sans être sous le contrôle d'un Argousin.e. + Les Génies ne prennent en combat que les attaques pairs comme dégâts, ils sont semi-éthérés.": "Genies have a niche object on them or hidden nearby, which kills them immediately if destroyed. This niche object has the same properties as a cemetery without being under an Argousin's control. + Genies only take even attacks as damage in combat, they are semi-ethereal.",
  "Les points de biture ressentis augmente votre capacité à faire des blagues mêmes pourries. + Leurs cheveux ressemblent à des dreads en formes de nattes.": "Felt drunkenness points increase your ability to make jokes, even bad ones. + Their hair looks like braided dreads.",
  "Ils ont un visage canin et des pattes velues. + Les peluches des Eleveurs (troupeaux) génèrent un nouveau membre par deux peluches lorsqu'ils sont 2h ensemble. Ce nouveau membre peut être sacrifier par le boucher pour récolter des ressources.": "They have a canine face and hairy paws. + Breeders' plushies (herds) generate a new member for every two plushies when together for 2h. This new member can be sacrificed by the butcher to harvest resources.",
  "Nécessité d'un beau costume rappelant des Tréants ou des Sylvains. Le costume sera jugé d'entrée de jeu par les Argousin.es. Faîtes attention qu'ils ne soient pas encombrants et que vous savez rentrer et sortir d'un bâtiment.": "Requirement for a beautiful costume reminiscent of Treants or Sylvans. The costume will be judged from the start by Argousins. Be careful that they are not bulky and that you can enter and exit a building.",
  "Un Mort-vivant blessé par une annonce crush ou sacred est détruit instantanément. Il se rend donc au lieu de culte corrompu. S'il n'y en a aucun, le Mort-vivant est exécuté. + Un Mort-vivant touché par « bonfire » devient vulnérable aux attaques normales pendant 3 touches.": "An Undead injured by a crush or sacred announcement is instantly destroyed. They go to the corrupted place of worship. If there is none, the Undead is executed. + An Undead hit by 'bonfire' becomes vulnerable to normal attacks for 3 hits.",
  "Iels possèdent des ailes et un visage de volatile.": "They have wings and a bird face.",
  "Un planaire blessé par une annonce enchanted subit deux points de dégâts au lieu d'un seul. + Un serviteur divin ne peut pas donner sa foi et n'a pas de carte de domiciliation. + Ce ne sont pas une autre espèce connue dans la liste qui ont changé de dimensions ou de plans + Tout planaire se rendant dans un lieu de culte corrompu devient un planaire du Néant, ils chercheront à tout détruire et dévorer en errant, leur attaque vide de toutes essences et provoquent une exécution lorsqu'ils mettent à mort. Seuls moyens de les éviter, faire un rituel dépervétissant le lieu de culte ou en utilisant « bonfire » sur le Néant ce qui le détruit définitivement.": "A planar injured by an enchanted announcement takes two points of damage instead of one. + A divine servant cannot give their faith and has no domicile card. + They are not another known species in the list that changed dimensions or planes + Any planar going to a corrupted place of worship becomes a Void planar, they will seek to destroy and devour everything while wandering, their attack empty of all essences and cause an execution when they kill. Only ways to avoid them: perform a ritual to uncorrupt the place of worship or use 'bonfire' on the Void which destroys it permanently.",
  "Costume réaliste et avec fourrure. + Ils sont originaires du Désert d'Épertoudis. + Les Hagolls sont malicieux et mauvais, ils sont brutaux et sans pitié comme le désert. La cérémonie d'exécution d'un.e adversaire est nécessaire pour entrer dans une horde.": "Realistic costume with fur. + They originate from the Epertoudis Desert. + Hagnolls are malicious and evil, brutal and merciless like the desert. The execution ceremony of an opponent is required to join a horde.",
  "Costume réaliste et avec fourrure. + L'entraide est primordiale chez les Tygnolls, elle est la base de la survie dans les Terres rouges. + La cérémonie du thé est nécessaire pour entrer dans une tribu.": "Realistic costume with fur. + Mutual aid is essential among Tygnolls, it is the basis of survival in the Red Lands. + The tea ceremony is required to join a tribe.",
  "De petites tailles portant une toge et un pagne (cape chaude autorisée si nécessaire).": "Small sized wearing a toga and loincloth (warm cape allowed if necessary)."
};

// Traductions des prérequis des titres
export const titrePrerequisTranslations: Record<string, string> = {
  "Culte en jeu": "Cult in game",
  "Background + Entrave + Évasion": "Background + Handcuff + Escape",
  "Alphabétisation commune": "Common literacy",
  "Talent artistique RP": "RP artistic talent",
  "Navire TO + Notaire": "TO Ship + Notary",
  "Navire-volant TO + Notaire": "TO Flying Ship + Notary",
  "Filouterie": "Skulduggery",
  "Compétence Contrebandier": "Smuggler skill",
  "Background éthique": "Ethical background",
  "Background + Capitaine Navire/Navire-Volant": "Background + Ship/Airship Captain",
  "Menuisier": "Carpenter",
  "Alphab. avancée + Solde": "Advanced literacy + Salary",
  "Orcs/Gobelins/Trolls + Background": "Orcs/Goblins/Trolls + Background",
  "Background liens noblesse": "Nobility ties background",
  "Haine magie + Compétence technologie/mécanique/forgeron": "Magic hatred + Technology/mechanics/blacksmith skill",
  "Background + Code Piraterie": "Background + Piracy Code",
  "Background extraplanaire": "Extraplanar background",
  "Nains/Gnomes/Sautaises + Forgeron": "Dwarves/Gnomes/Sautais + Blacksmith",
  "Mystique": "Mystic",
  "Filouterie + deux compétences Martiales": "Skulduggery + two Martial skills"
};

// Traductions des origines
export const origineTranslations: Record<string, string> = {
  "Parlos": "Parlos",
  "Îles éparses": "Scattered Islands",
  "Nations du Dominion": "Dominion Nations",
  "Nations extérieures": "Outer Nations"
};

// Traductions des catégories de compétences
export const categorieTranslations: Record<string, string> = {
  "Sociale": "Social",
  "Artisan": "Craftsman",
  "Bagarre": "Brawl",
  "Martial": "Martial",
  "Louche": "Shady",
  "Ésotérique": "Esoteric",
  "Magique": "Magical",
  "Médicale": "Medical",
  "Professionnelle": "Professional",
  "Production": "Production",
  "Récolte": "Harvest",
  "Perfectionnement": "Improvement",
  "Spirituelle": "Spiritual",
  "Manoeuvre": "Maneuver",
  "En révision": "Under revision"
};

// Traductions des bâtiments
export const batimentTranslations: Record<string, string> = {
  // Types de bâtiments
  "Bâtiments uniques": "Unique Buildings",
  "Navires": "Ships",
  
  // Bâtiments uniques
  "Cœur-fusible": "Fuse-Heart",
  "Résidence éthérée": "Ethereal Residence",
  "Jardin de méditation elfique": "Elven Meditation Garden",
  "Acierie Wellington-Barr": "Wellington-Barr Steelworks",
  "Eniversité": "Eniversity",
  "Ziggourat thanatonique": "Thanatonic Ziggurat",
  "Le navire rubis ravageur": "The Ruby Ravager Ship",
  "Caserne du CPAS": "CPAS Barracks",
  "Forge des Maîtres Nains": "Dwarven Masters Forge",
  "Laboratoire Alchimique": "Alchemical Laboratory",
  "Mine d'Abîme Maudit": "Cursed Abyss Mine",
  "Jardins Mystiques": "Mystical Gardens",
  "Distillerie des Mille Saveurs": "Thousand Flavors Distillery",
  "Arsenal Mécanique": "Mechanical Arsenal",
  "Nécropole Sacrée": "Sacred Necropolis",
  "Atelier du Tisserand Royal": "Royal Weaver's Workshop",
  "Observatoire Astral": "Astral Observatory",
  "Fonderie Industrielle Charbon": "Coal Industrial Foundry",
  "Conserverie de Luxe": "Luxury Cannery",
  "Chantier Naval": "Shipyard",
  "Marché aux Curiosités": "Curiosities Market",
  "Sanatorium Thermal": "Thermal Sanatorium",
  "Ferme Élevage Exotique": "Exotic Breeding Farm",
  "Cristallerie Magique": "Magical Glassworks",
  "Décharge Alchimique": "Alchemical Dump",
  "Bibliothèque d'étude": "Study Library",
  "Tonnellerie Légendaire": "Legendary Cooperage",
  "Bergerie": "Sheepfold",
  "Manufacture de Rouages": "Gear Manufactory",
  "Jardin Plantes Carnivores": "Carnivorous Plants Garden",
  "Fumoir Artisanal": "Artisan Smokehouse",
  "Atelier Soufflage Verre": "Glassblowing Workshop",
  "Campement mercenaire": "Mercenary Camp",
  "Oasis": "Oasis",
  "Atelier de Joaillerie": "Jewelry Workshop",
  "Rucher": "Apiary",
  "Fonderie du Crédit Nain": "Dwarven Credit Foundry",
  "Laboratoire expérimental": "Experimental Laboratory",
  "Camps Agence Anachronistes": "Anachronists Agency Camp",
  
  // Navires
  "La Vengeance du Kraken": "The Kraken's Vengeance",
  "Navire maritime": "Maritime Ship",
  "Navire-volant": "Flying Ship"
};

// Traductions des avantages des bâtiments
export const batimentAvantagesTranslations: Record<string, string> = {
  "Permet d'avoir deux canons sur le navire": "Allows two cannons on the ship",
  "Contact avec Entités en cas de rituel": "Contact with Entities during rituals",
  "Récupère tous les points de vie pendant la méditation": "Recovers all life points during meditation",
  "Produit 10 Acier de plus/an": "Produces 10 more Steel/year",
  "Perte d'abîme de 2 points à soigner par an pour la faction": "Abyss loss of 2 points to heal per year for the faction",
  "200 morts-vivants mineurs / an": "200 minor undead / year",
  "1 bombe de sape / an": "1 sapping bomb / year",
  "20 balles en argent / an": "20 silver bullets / year",
  "3 Acier nains + 2 Or + 2 Charbon | 1 arme mercure/événement": "3 Dwarven Steel + 2 Gold + 2 Coal | 1 mercury weapon/event",
  "2 Fiole + 2 Alcool pur + 2 Acide + 2 Toxic | Potion expérimentale/événement": "2 Vial + 2 Pure Alcohol + 2 Acid + 2 Toxic | Experimental potion/event",
  "5 Abîme + 3 Gemme + 2 Pierre": "5 Abyss + 3 Gem + 2 Stone",
  "6 Fleur + 2 Végétal + 2 Encens": "6 Flower + 2 Plant + 2 Incense",
  "3 Oliga sabré + 3 Alcool pur + 2 Pts éthylisme": "3 Sabered Oliga + 3 Pure Alcohol + 2 Alcoholism Pts",
  "4 Munitions + 2 Engrenage + 2 Piston + 2 Ressort | 2 armes bonne facture": "4 Ammunition + 2 Gear + 2 Piston + 2 Spring | 2 quality weapons",
  "3 Âme + 3 Cadavre + 2 Poupée chamane + 2 Antiquité | 1 arme tape abîme": "3 Soul + 3 Corpse + 2 Shaman Doll + 2 Antique | 1 abyss-striking weapon",
  "5 Tissu + 3 Voile + 2 Bijoux": "5 Fabric + 3 Sail + 2 Jewelry",
  "3 Papier + 2 Encens + 2 Rune givre + 3 Gemme": "3 Paper + 2 Incense + 2 Frost Rune + 3 Gem",
  "10 Charbon + 1 Acier | Augmente la pollution charbon de 5, diminue de moitié les pierres de vie": "10 Coal + 1 Steel | Increases coal pollution by 5, halves life stones",
  "3 Choucroute Worst + 3 Cigare Gerbie + 2 Épice + 2 Viande": "3 Worst Sauerkraut + 3 Gerbie Cigar + 2 Spice + 2 Meat",
  "4 Chevron construction + 3 Voile + 4 Bois": "4 Construction Chevron + 3 Sail + 4 Wood",
  "2 Antiquité + 2 Perles + 2 Statue + 2 Bijoux + 2 Produits mer": "2 Antique + 2 Pearls + 2 Statue + 2 Jewelry + 2 Sea Products",
  "3 Eau salée + 3 Sel pur + 2 Maladie soignée + 2 Graisse": "3 Salt Water + 3 Pure Salt + 2 Cured Disease + 2 Fat",
  "5 Animaux + 3 Peau + 3 Viande | Animal exotique en jeu (peluche)": "5 Animals + 3 Skin + 3 Meat | Exotic animal in game (plush)",
  "4 Verre + 3 Rune givre + 3 Gemme | 2 plaques runiques": "4 Glass + 3 Frost Rune + 3 Gem | 2 runic plates",
  "6 Détritus + 2 Toxic + 1 Roche blâme": "6 Garbage + 2 Toxic + 1 Blame Stone",
  "5 Papier + 3 Encens + 2 Âme | 2 livres fous sans souffrir": "5 Paper + 3 Incense + 2 Soul | 2 mad books without suffering",
  "8 Sable + 4 Tonnelet + 2 Rune givre": "8 Sand + 4 Barrel + 2 Frost Rune",
  "3 Or + 4 Peau + 3 Tissu": "3 Gold + 4 Skin + 3 Fabric",
  "5 Rouage + 3 Engrenage + 2 Métal": "5 Cogwheel + 3 Gear + 2 Metal",
  "4 Végétal + 3 Toxic + 3 Viande": "4 Plant + 3 Toxic + 3 Meat",
  "4 Viande + 3 Épice + 3 Sel": "4 Meat + 3 Spice + 3 Salt",
  "6 Verre + 2 Fiole + 3 Sable + 2 Gemme": "6 Glass + 2 Vial + 3 Sand + 2 Gem",
  "4 Munitions + 3 Acier + 3 Peau | 2 armures bonnes + 1 arme argent": "4 Ammunition + 3 Steel + 3 Skin | 2 good armors + 1 silver weapon",
  "4 Eau salée + 3 Fleur + 3 Végétal": "4 Salt Water + 3 Flower + 3 Plant",
  "4 Bijoux + 3 Perles + 3 Argent lingot": "4 Jewelry + 3 Pearls + 3 Silver Ingot",
  "5 Fleur + 3 Épice + 2 Alcool pur": "5 Flower + 3 Spice + 2 Pure Alcohol",
  "Brevets et % raciaux gratuits Crédit Nain": "Free patents and racial % Dwarven Credit",
  "2 Eau salée + 3 Acide + 2 Alcool pur | 2 grenades soporifiques (Matériel TO)": "2 Salt Water + 3 Acid + 2 Pure Alcohol | 2 soporific grenades (TO Equipment)",
  "2 Papiers + 2 Encens + 4 Charbon | 3 lectures de textes occultes sans perdre santé mentale": "2 Papers + 2 Incense + 4 Coal | 3 occult text readings without losing mental health",
  "3 Voiles + 2 Tissus + 4 Engrenages | 5 rumeurs": "3 Sails + 2 Fabrics + 4 Gears | 5 rumors",
  "2 Voiles + 2 Tissus + 4 Graisses pures": "2 Sails + 2 Fabrics + 4 Pure Fats",
  "2 Voiles + 2 Charbon + 4 Rouages": "2 Sails + 2 Coal + 4 Cogwheels"
};

// Traductions des conditions des bâtiments
export const batimentConditionTranslations: Record<string, string> = {
  "Uniquement disponible pour la faction : Les Traqueurs d'Echo": "Only available for faction: The Echo Hunters",
  "Uniquement disponible pour la faction : La Compagnie du Troisième Soleil": "Only available for faction: The Third Sun Company",
  "Uniquement disponible pour la faction : Le Clan Senshin": "Only available for faction: The Senshin Clan",
  "Uniquement disponible pour la faction : La Grande Société des Explorateurs": "Only available for faction: The Great Explorers Society",
  "Uniquement disponible pour la faction : L'Institut Eniversitaire Ashcroft": "Only available for faction: The Ashcroft Eniversity Institute",
  "Uniquement disponible pour la faction : Les Messagers du Linceul": "Only available for faction: The Shroud Messengers",
  "Uniquement disponible pour la faction : Les Mangeurs de grêles": "Only available for faction: The Hail Eaters",
  "Uniquement disponible pour la faction : La Caste Porémanienne d'Assistance et de Soutien": "Only available for faction: The Poremanian Caste of Assistance and Support",
  "Uniquement disponible pour la faction : La Vengeance du Kraken": "Only available for faction: The Kraken's Vengeance",
  "Uniquement disponible pour la faction : L'Agence des Anachroniste": "Only available for faction: The Anachronists Agency"
};

// Fonction helper pour obtenir une traduction
export const translateGameData = (
  text: string, 
  type: 'competence' | 'titre' | 'espece' | 'effet' | 'categorie' | 'batiment' | 'batimentAvantage' | 'batimentCondition' | 'origine' | 'especeSpecial' | 'titrePrerequisit',
  language: 'fr' | 'en'
): string => {
  if (language === 'fr') return text;
  
  const mapping = type === 'competence' ? competenceTranslations :
                  type === 'titre' ? titreTranslations :
                  type === 'effet' ? competenceEffectTranslations :
                  type === 'categorie' ? categorieTranslations :
                  type === 'batiment' ? batimentTranslations :
                  type === 'batimentAvantage' ? batimentAvantagesTranslations :
                  type === 'batimentCondition' ? batimentConditionTranslations :
                  type === 'origine' ? origineTranslations :
                  type === 'especeSpecial' ? especeSpecialTranslations :
                  type === 'titrePrerequisit' ? titrePrerequisTranslations :
                  especeTranslations;
  
  return mapping[text] || text;
};
