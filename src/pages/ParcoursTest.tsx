import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ClipboardCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { useTri } from "@/i18n/tri";

type Text = [string, string, string];
const etapes: { title: Text; href: string; checks: Text[] }[] = [
  { title: ["1. Accueil et guide", "1. Home and guide", "1. Startpagina en gids"], href: "/", checks: [
    ["Changer de langue FR/EN/NL sur l'accueil", "Switch language FR/EN/NL on the home page", "Wissel de taal FR/EN/NL op de startpagina"],
    ["Ouvrir « guide » et lire les coûts XP des sorts", "Open “guide” and read spell XP costs", "Open “gids” en lees de XP-kosten van spreuken"],
  ]},
  { title: ["2. Compte", "2. Account", "2. Account"], href: "/auth", checks: [
    ["Créer un compte test et confirmer l'email reçu", "Create a test account and confirm the email", "Maak een testaccount en bevestig de e-mail"],
    ["Tester « Mot de passe oublié » et recevoir l'email", "Test “Forgot password” and receive the email", "Test “Wachtwoord vergeten” en ontvang de e-mail"],
    ["Tester la connexion Google", "Test Google sign-in", "Test aanmelden met Google"],
  ]},
  { title: ["3. Faction", "3. Faction", "3. Factie"], href: "/factions", checks: [
    ["Créer une faction avec deux origines compatibles", "Create a faction with two compatible origins", "Maak een factie met twee verenigbare oorsprongen"],
    ["Vérifier qu'une incompatibilité est bloquée", "Check that an incompatibility is blocked", "Controleer dat een onverenigbaarheid geblokkeerd wordt"],
    ["Choisir une Marque collective (et « Marque secrète » avec texte)", "Choose a Collective Mark (and “Secret Mark” with text)", "Kies een collectief Merk (en “Geheim merkteken” met tekst)"],
    ["Télécharger le PDF et vérifier la réception de l'email", "Download the PDF and check the email arrives", "Download de PDF en controleer de e-mail"],
  ]},
  { title: ["4. Personnage", "4. Character", "4. Personage"], href: "/personnages", checks: [
    ["Choisir la faction test et cocher les événements joués", "Choose the test faction and tick attended events", "Kies de testfactie en vink gespeelde evenementen aan"],
    ["Changer d'espèce : les gratuités se rechargent", "Change species: free skills reload", "Wissel van soort: gratis vaardigheden herladen"],
    ["Draconide : glande, aucune armure, Semence de Dragon imposée", "Dragonfolk: gland, no armour, Dragon Seed imposed", "Drakenvolk: klier, geen pantser, Drakenzaad opgelegd"],
    ["Magie : max 4 sorts par niveau, Pierres de Vie correctes", "Magic: max 4 spells per level, correct Life Stones", "Magie: max 4 spreuken per niveau, juiste Levensstenen"],
    ["Téphromancie : Pierres de Vie converties en Obsidiennes", "Tephromancy: Life Stones converted to Obsidians", "Tefromantie: Levensstenen omgezet in Obsidianen"],
    ["Points restants exacts dans le récapitulatif", "Remaining points correct in the summary", "Resterende punten correct in het overzicht"],
    ["Envoyer : PDF 3 pages max reçu en pièce jointe", "Submit: PDF (max 3 pages) received as attachment", "Verzenden: PDF (max 3 pagina's) als bijlage ontvangen"],
  ]},
  { title: ["5. Espace joueur", "5. Player area", "5. Spelersruimte"], href: "/mes-personnages", checks: [
    ["Voir sa fiche, ouvrir l'édition et resoumettre", "See your sheet, open editing and resubmit", "Bekijk je blad, bewerk en dien opnieuw in"],
    ["Faire une demande de dépense XP", "Request an XP purchase", "Vraag een XP-aankoop aan"],
  ]},
  { title: ["6. Gestionnaire de faction", "6. Faction manager", "6. Factiebeheerder"], href: "/mes-factions", checks: [
    ["Modifier origines et Marque collective", "Edit origins and Collective Mark", "Wijzig oorsprongen en collectief Merk"],
    ["Valider, archiver, mettre à la corbeille une fiche liée", "Validate, archive, trash a linked sheet", "Keur goed, archiveer, verwijder een gekoppeld blad"],
  ]},
  { title: ["7. Organisation", "7. Organisation", "7. Organisatie"], href: "/orga", checks: [
    ["Valider une fiche et accorder de l'XP", "Validate a sheet and grant XP", "Keur een blad goed en ken XP toe"],
    ["Traiter une demande XP", "Handle an XP request", "Behandel een XP-aanvraag"],
    ["Restaurer une fiche depuis la corbeille", "Restore a sheet from the trash", "Herstel een blad uit de prullenbak"],
    ["Enregistrer une présence à un événement", "Record attendance at an event", "Registreer aanwezigheid op een evenement"],
  ]},
  { title: ["8. Sécurité", "8. Security", "8. Beveiliging"], href: "/factions", checks: [
    ["Déconnecté : aucune fiche d'autrui n'est visible", "Signed out: no one else's sheets are visible", "Afgemeld: geen bladen van anderen zichtbaar"],
    ["Supprimer ensuite les données de test", "Afterwards delete test data", "Verwijder daarna de testgegevens"],
  ]},
];

const KEY = "barok-parcours-test";

export default function ParcoursTest() {
  const { L: tri } = useTri();
  const [done, setDone] = useState<Record<string, boolean>>(() => {
    try { return JSON.parse(localStorage.getItem(KEY) || "{}"); } catch { return {}; }
  });
  useEffect(() => { localStorage.setItem(KEY, JSON.stringify(done)); }, [done]);
  const total = etapes.reduce((n, e) => n + e.checks.length, 0);
  const count = Object.values(done).filter(Boolean).length;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="flex items-center justify-between p-4 border-b border-border">
        <Button asChild variant="ghost"><Link to="/"><ArrowLeft className="mr-2 h-4 w-4" />{tri("Accueil", "Home", "Start")}</Link></Button>
        <LanguageSwitcher />
      </header>
      <main className="max-w-3xl mx-auto p-6 space-y-6">
        <h1 className="font-display text-3xl text-primary flex items-center gap-3"><ClipboardCheck />{tri("Parcours de test", "Test walkthrough", "Testparcours")}</h1>
        <p className="text-muted-foreground">{tri("Suivez chaque étape avant d'annoncer le site aux joueurs et joueuses. Votre progression est retenue sur cet appareil.", "Follow each step before announcing the site to players. Progress is saved on this device.", "Volg elke stap voordat je de site aan spelers aankondigt. Je voortgang wordt op dit toestel bewaard.")}</p>
        <div className="flex items-center gap-4">
          <div className="flex-1 h-2 bg-muted rounded"><div className="h-2 bg-primary rounded" style={{ width: `${(count / total) * 100}%` }} /></div>
          <span className="text-sm">{count}/{total}</span>
          <Button variant="outline" size="sm" onClick={() => setDone({})}>{tri("Réinitialiser", "Reset", "Resetten")}</Button>
        </div>
        {etapes.map((e, i) => (
          <section key={i} className="border border-border rounded-lg p-4 bg-card space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-xl text-primary">{tri(e.title[0], e.title[1], e.title[2])}</h2>
              <Button asChild size="sm" variant="secondary"><a href={e.href} target="_blank" rel="noreferrer">{tri("Ouvrir", "Open", "Openen")}</a></Button>
            </div>
            {e.checks.map((c, j) => {
              const id = `${i}-${j}`;
              return (
                <label key={id} className="flex items-start gap-3 cursor-pointer">
                  <Checkbox checked={!!done[id]} onCheckedChange={(v) => setDone((d) => ({ ...d, [id]: !!v }))} />
                  <span className={done[id] ? "line-through text-muted-foreground" : ""}>{tri(c[0], c[1], c[2])}</span>
                </label>
              );
            })}
          </section>
        ))}
      </main>
    </div>
  );
}
