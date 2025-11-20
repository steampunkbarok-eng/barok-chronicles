export const translations = {
  fr: {
    // Header
    'header.subtitle': 'Système de gestion de fiches pour JDRGN',
    
    // Home Page
    'home.hero.title': 'Bienvenue dans l\'univers de',
    'home.hero.subtitle': 'Créez vos factions et personnages pour vos aventures grandeurs natures Dark fantasy et steampunk !',
    'home.hero.createFaction': 'Créez votre Faction PJ',
    'home.hero.createCharacter': 'Créer un Personnage',
    
    // Features
    'features.factions.title': 'Factions',
    'features.factions.description': 'Créez votre faction, choisissez vos propriétés et gérez vos Marques de destinée',
    'features.factions.point1': '4 Marques de destinée initiales',
    'features.factions.point2': 'Propriétés terriennes personnalisables',
    'features.factions.point3': 'Bâtiments et navires uniques',
    
    'features.characters.title': 'Personnages',
    'features.characters.description': 'Créez votre héros avec 12 points de création et choisissez vos compétences',
    'features.characters.point1': 'Système de points de création',
    'features.characters.point2': 'Espèces et compétences variées',
    'features.characters.point3': 'Calculs automatiques (PV, PA, Abîme)',
    
    'features.sheets.title': 'Fiches A4',
    'features.sheets.description': 'Générez et téléchargez vos fiches de faction et personnage au format PDF',
    'features.sheets.point1': 'Format A4 prêt à imprimer',
    'features.sheets.point2': 'Design professionnel',
    'features.sheets.point3': 'Export PDF instantané',
    
    // Footer
    'footer.copyright': '© 2024 Barok GN. Tous droits réservés.',
    'footer.visit': 'Visitez',
    'footer.officialSite': 'le site officiel Barok GN',
  },
  en: {
    // Header
    'header.subtitle': 'Character sheet management system for LARP',
    
    // Home Page
    'home.hero.title': 'Welcome to the world of',
    'home.hero.subtitle': 'Create your factions and characters for your Dark Fantasy and Steampunk live-action adventures!',
    'home.hero.createFaction': 'Create Your PC Faction',
    'home.hero.createCharacter': 'Create a Character',
    
    // Features
    'features.factions.title': 'Factions',
    'features.factions.description': 'Create your faction, choose your properties and manage your Destiny Marks',
    'features.factions.point1': '4 initial Destiny Marks',
    'features.factions.point2': 'Customizable land properties',
    'features.factions.point3': 'Unique buildings and ships',
    
    'features.characters.title': 'Characters',
    'features.characters.description': 'Create your hero with 12 creation points and choose your skills',
    'features.characters.point1': 'Creation point system',
    'features.characters.point2': 'Various species and skills',
    'features.characters.point3': 'Automatic calculations (HP, AP, Abyss)',
    
    'features.sheets.title': 'A4 Sheets',
    'features.sheets.description': 'Generate and download your faction and character sheets in PDF format',
    'features.sheets.point1': 'Print-ready A4 format',
    'features.sheets.point2': 'Professional design',
    'features.sheets.point3': 'Instant PDF export',
    
    // Footer
    'footer.copyright': '© 2024 Barok GN. All rights reserved.',
    'footer.visit': 'Visit',
    'footer.officialSite': 'the official Barok GN website',
  }
};

export type TranslationKey = keyof typeof translations.fr;
