import { competencesDisponibles } from "./src/data/competences";
import { competenceTranslations, competenceEffectTranslations, categorieTranslations } from "./src/i18n/gameData";
import { competenceTranslationsNl, competenceEffectTranslationsNl, categorieTranslationsNl } from "./src/i18n/gameDataNl";
const miss = (label:string, arr:string[], m:Record<string,string>) => {
  const x = arr.filter(a=>!m[a]); console.log(`--- ${label}: ${x.length}/${arr.length}`); x.forEach(s=>console.log(JSON.stringify(s)));
};
const noms = competencesDisponibles.map(c=>c.nom);
const eff = competencesDisponibles.map(c=>c.effet);
const cats = [...new Set(competencesDisponibles.map(c=>c.categorie))];
miss("NOM EN", noms, competenceTranslations);
miss("NOM NL", noms, competenceTranslationsNl);
miss("CAT EN", cats, categorieTranslations);
miss("CAT NL", cats, categorieTranslationsNl);
miss("EFF EN", eff, competenceEffectTranslations);
miss("EFF NL", eff, competenceEffectTranslationsNl);
