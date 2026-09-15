import { competencesDisponibles } from "./src/data/competences";
import { translateGameData } from "./src/i18n/gameData";
for (const lang of ["en","nl"] as const) {
  const m = competencesDisponibles.flatMap(c => [
    translateGameData(c.nom,'competence',lang)===c.nom ? `NOM ${c.nom}` : null,
    translateGameData(c.effet,'effet',lang)===c.effet ? `EFF ${c.effet}` : null,
    translateGameData(c.categorie,'categorie',lang)===c.categorie ? `CAT ${c.categorie}` : null,
  ]).filter(Boolean);
  console.log(`=== ${lang}: ${m.length} manquants`);
  [...new Set(m)].slice(0,40).forEach(x=>console.log(x));
}
