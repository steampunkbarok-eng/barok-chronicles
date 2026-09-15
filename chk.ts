import { marquesCollectives, marquesIndividuelles } from "./src/data/marques";
import { translateFactionText } from "./src/i18n/factionTexts2027";
const set = new Set<string>();
for (const m of [...marquesCollectives, ...marquesIndividuelles] as any[])
  for (const k of ["nom","citation","pourQui","signale","interdits","attention","especesReservees","especesInterdites"]) {
    const v = m[k];
    if (typeof v === "string" && v && v !== "-" ) set.add(v);
    if (Array.isArray(v)) v.forEach((s:string)=>set.add(s));
  }
[...set].filter(s=>translateFactionText(s,"en")===s).forEach(s=>console.log(JSON.stringify(s)+","));
