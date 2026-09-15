import { origines } from "./src/data/origines";
const set = new Set<string>();
for (const o of origines) [o.nom,o.categorie,o.description,o.especes,o.limitations,o.prerequis].forEach(s=>s&&s!=="-"&&set.add(s));
[...set].forEach(s=>console.log(JSON.stringify(s)+","));
