import { Button } from "@/components/ui/button";
import { FileDown, Printer } from "lucide-react";
import { toast } from "sonner";

interface CharacterSheetProps {
  character: {
    nom: string;
    prenom: string;
    faction: string;
    espece: string;
    competences: string[];
    pvTotal: number;
    paTotal: number;
    scoreBagarre: number;
    email: string;
    pierresDeVie: number;
    abime: number;
    goOrigine?: number;
    especeGratuit?: string;
    especeInterdit?: string;
    factionInterdit?: string;
  };
}

export const CharacterSheet = ({ character }: CharacterSheetProps) => {
  const generateSheetHTML = () => {
    return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Fiche Personnage - ${character.prenom} ${character.nom}</title>
  <style>
    @page {
      size: A4;
      margin: 1cm;
    }
    * {
      box-sizing: border-box;
    }
    body {
      font-family: Arial, sans-serif;
      font-size: 9pt;
      line-height: 1.3;
      color: #000;
      max-width: 21cm;
      margin: 0 auto;
      padding: 0.5cm;
    }
    .page {
      page-break-after: always;
    }
    .page:last-child {
      page-break-after: auto;
    }
    h1 {
      text-align: center;
      font-size: 16pt;
      font-weight: bold;
      margin: 0 0 0.3cm 0;
      padding: 0.2cm;
      border: 2px solid #000;
      background: #e0e0e0;
    }
    h2 {
      font-size: 11pt;
      font-weight: bold;
      margin: 0.4cm 0 0.2cm 0;
      padding: 0.15cm 0.2cm;
      border-bottom: 2px solid #000;
      background: #f0f0f0;
    }
    .section {
      margin-bottom: 0.3cm;
    }
    .info-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 0.2cm;
      margin-bottom: 0.3cm;
    }
    .info-item {
      border: 1px solid #000;
      padding: 0.15cm;
    }
    .info-label {
      font-weight: bold;
      font-size: 7pt;
      text-transform: uppercase;
      margin-bottom: 0.1cm;
    }
    .info-value {
      font-size: 10pt;
    }
    .stats-row {
      display: flex;
      justify-content: space-around;
      padding: 0.3cm;
      border: 2px solid #000;
      background: #f5f5f5;
      margin-bottom: 0.3cm;
    }
    .stat {
      text-align: center;
    }
    .stat-label {
      font-weight: bold;
      font-size: 8pt;
      text-transform: uppercase;
    }
    .stat-value {
      font-size: 16pt;
      font-weight: bold;
      margin-top: 0.1cm;
    }
    .two-columns {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 0.3cm;
    }
    .competences-box {
      border: 1px solid #000;
      padding: 0.2cm;
      min-height: 6cm;
    }
    .competence-item {
      padding: 0.1cm;
      margin-bottom: 0.1cm;
      border-left: 2px solid #000;
      padding-left: 0.2cm;
    }
    .empty-boxes {
      display: flex;
      gap: 0.2cm;
      margin-bottom: 0.3cm;
    }
    .empty-box {
      flex: 1;
      border: 1px solid #000;
      padding: 0.2cm;
      min-height: 1.2cm;
    }
    .empty-box-label {
      font-weight: bold;
      font-size: 8pt;
      margin-bottom: 0.2cm;
    }
    .long-box {
      border: 1px solid #000;
      padding: 0.2cm;
      min-height: 2cm;
      margin-bottom: 0.3cm;
    }
    .rect-box {
      border: 2px solid #000;
      padding: 0.3cm;
      text-align: center;
      min-height: 1.5cm;
      margin-bottom: 0.3cm;
    }
    .rect-box-label {
      font-weight: bold;
      font-size: 8pt;
      margin-bottom: 0.3cm;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      font-size: 8pt;
      margin-bottom: 0.3cm;
    }
    table td, table th {
      border: 1px solid #000;
      padding: 0.1cm;
      text-align: left;
    }
    table th {
      background: #e0e0e0;
      font-weight: bold;
    }
    .footer {
      margin-top: 0.5cm;
      padding-top: 0.2cm;
      border-top: 1px solid #666;
      font-size: 7pt;
      color: #666;
    }
    @media print {
      body {
        padding: 0;
      }
      .no-print {
        display: none;
      }
    }
  </style>
</head>
<body>
  <!-- PAGE 1 -->
  <div class="page">
    <h1>FICHE DE PERSONNAGE</h1>
    
    <div class="info-grid">
      <div class="info-item">
        <div class="info-label">Nom Time-Out (TO)</div>
        <div class="info-value">${character.prenom}</div>
      </div>
      <div class="info-item">
        <div class="info-label">Nom Time-In (TI)</div>
        <div class="info-value">${character.nom}</div>
      </div>
      <div class="info-item">
        <div class="info-label">Faction</div>
        <div class="info-value">${character.faction || 'Aucune'}</div>
      </div>
      <div class="info-item">
        <div class="info-label">Espèce</div>
        <div class="info-value">${character.espece}</div>
      </div>
    </div>

    <div class="stats-row">
      <div class="stat">
        <div class="stat-label">PV Total</div>
        <div class="stat-value">${character.pvTotal}</div>
      </div>
      <div class="stat">
        <div class="stat-label">PA Total</div>
        <div class="stat-value">${character.paTotal}</div>
      </div>
      <div class="stat">
        <div class="stat-label">Score de Bagarre</div>
        <div class="stat-value">${character.scoreBagarre}</div>
      </div>
      <div class="stat">
        <div class="stat-label">GM</div>
        <div class="stat-value"></div>
      </div>
      <div class="stat">
        <div class="stat-label">GO</div>
        <div class="stat-value">${character.goOrigine || ''}</div>
      </div>
      <div class="stat">
        <div class="stat-label">GA</div>
        <div class="stat-value"></div>
      </div>
    </div>

    <div class="info-grid" style="margin-bottom: 0.3cm;">
      <div class="info-item" style="grid-column: span 2;">
        <div class="info-label">Pierres de Vie</div>
        <div class="info-value" style="min-height: 0.8cm; font-size: 14pt; font-weight: bold;">${character.pierresDeVie}</div>
      </div>
      <div class="info-item" style="grid-column: span 2;">
        <div class="info-label">Points d'Abîme</div>
        <div class="info-value" style="min-height: 0.8cm; font-size: 14pt; font-weight: bold;">${character.abime}</div>
      </div>
    </div>

    <h2>Compétences Choisies (${character.competences.length})</h2>
    <div class="two-columns">
      <div class="competences-box" style="min-height: 4cm;">
        ${character.competences.slice(0, Math.ceil(character.competences.length / 2)).map(comp => `<div class="competence-item">✓ ${comp}</div>`).join('')}
      </div>
      <div class="competences-box" style="min-height: 4cm;">
        ${character.competences.slice(Math.ceil(character.competences.length / 2)).map(comp => `<div class="competence-item">✓ ${comp}</div>`).join('')}
      </div>
    </div>

    <h2>Sortilèges</h2>
    <table>
      <tr>
        <th style="width: 25%;">Niveau 1</th>
        <th style="width: 25%;">Niveau 2</th>
        <th style="width: 25%;">Niveau 3</th>
        <th style="width: 25%;">Niveau 4</th>
      </tr>
      ${Array(6).fill(0).map(() => `<tr>
        <td style="min-height: 1.5cm; padding: 0.2cm;"></td>
        <td style="min-height: 1.5cm; padding: 0.2cm;"></td>
        <td style="min-height: 1.5cm; padding: 0.2cm;"></td>
        <td style="min-height: 1.5cm; padding: 0.2cm;"></td>
      </tr>`).join('')}
    </table>

    <h2>Rituels Magiques</h2>
    <table>
      <tr>
        <th style="width: 16.66%;">École 1 Sort 1</th>
        <th style="width: 16.66%;">École 1 Sort 2</th>
        <th style="width: 16.66%;">École 1 Sort 3</th>
        <th style="width: 16.66%;">École 1 Sort 4</th>
        <th style="width: 16.66%;">École 1 Sort 5</th>
      </tr>
      <tr>
        <td style="min-height: 1.5cm; padding: 0.2cm;"></td>
        <td style="min-height: 1.5cm; padding: 0.2cm;"></td>
        <td style="min-height: 1.5cm; padding: 0.2cm;"></td>
        <td style="min-height: 1.5cm; padding: 0.2cm;"></td>
        <td style="min-height: 1.5cm; padding: 0.2cm;"></td>
      </tr>
      <tr>
        <th style="width: 16.66%;">École 2 Sort 1</th>
        <th style="width: 16.66%;">École 2 Sort 2</th>
        <th style="width: 16.66%;">École 2 Sort 3</th>
        <th style="width: 16.66%;">École 2 Sort 4</th>
        <th style="width: 16.66%;">École 2 Sort 5</th>
      </tr>
      <tr>
        <td style="min-height: 1.5cm; padding: 0.2cm;"></td>
        <td style="min-height: 1.5cm; padding: 0.2cm;"></td>
        <td style="min-height: 1.5cm; padding: 0.2cm;"></td>
        <td style="min-height: 1.5cm; padding: 0.2cm;"></td>
        <td style="min-height: 1.5cm; padding: 0.2cm;"></td>
      </tr>
    </table>

    <h2>Compétences Apprises</h2>
    <div class="two-columns">
      <div style="display: grid; grid-template-columns: 1fr; gap: 0.2cm;">
        ${Array(6).fill(0).map((_, i) => `<div class="empty-box" style="min-height: 0.8cm;"><div class="empty-box-label">${i + 1}.</div></div>`).join('')}
      </div>
      <div style="display: grid; grid-template-columns: 1fr; gap: 0.2cm;">
        ${Array(6).fill(0).map((_, i) => `<div class="empty-box" style="min-height: 0.8cm;"><div class="empty-box-label">${i + 7}.</div></div>`).join('')}
      </div>
    </div>

    <h2>Séquelles</h2>
    <div class="empty-boxes">
      <div class="empty-box">
        <div class="empty-box-label">1.</div>
      </div>
      <div class="empty-box">
        <div class="empty-box-label">2.</div>
      </div>
      <div class="empty-box">
        <div class="empty-box-label">3.</div>
      </div>
      <div class="empty-box">
        <div class="empty-box-label">4.</div>
      </div>
      <div class="empty-box">
        <div class="empty-box-label">5.</div>
      </div>
    </div>

    <h2>Maladies</h2>
    <div class="empty-boxes">
      <div class="empty-box" style="min-height: 1.2cm;">
        <div class="empty-box-label">1.</div>
      </div>
      <div class="empty-box" style="min-height: 1.2cm;">
        <div class="empty-box-label">2.</div>
      </div>
      <div class="empty-box" style="min-height: 1.2cm;">
        <div class="empty-box-label">3.</div>
      </div>
      <div class="empty-box" style="min-height: 1.2cm;">
        <div class="empty-box-label">4.</div>
      </div>
      <div class="empty-box" style="min-height: 1.2cm;">
        <div class="empty-box-label">5.</div>
      </div>
    </div>

    <h2>Perles Obsidiennes</h2>
    <div class="rect-box">
      <div style="font-size: 20pt; font-weight: bold; min-height: 0.8cm;"></div>
    </div>

    <h2>Contrat Argousin-e</h2>
    <div class="long-box"></div>

    <h2>Remarques</h2>
    <div class="long-box"></div>

    <h2>Récapitulatif</h2>
    <div class="two-columns">
      <div>
        <h3 style="font-size: 10pt; font-weight: bold; margin: 0.2cm 0; padding: 0.1cm; background: #e0e0e0; border: 1px solid #000;">Compétences Gratuites de l'Espèce</h3>
        <div class="competences-box" style="min-height: 2.5cm;">
          ${character.especeGratuit && character.especeGratuit !== 'Aucun' ? 
            `<div style="font-size: 8pt;">${character.especeGratuit.split('+').map(comp => `<div class="competence-item">✓ ${comp.trim()}</div>`).join('')}</div>` : 
            '<div style="font-size: 8pt; font-style: italic;">Aucune compétence gratuite pour cette espèce.</div>'}
        </div>
      </div>
      <div>
        <h3 style="font-size: 10pt; font-weight: bold; margin: 0.2cm 0; padding: 0.1cm; background: #e0e0e0; border: 1px solid #000;">Compétences Interdites</h3>
        <div class="competences-box" style="min-height: 2.5cm;">
          ${character.especeInterdit && character.especeInterdit !== 'Aucun' ? 
            `<div style="font-size: 8pt;">${character.especeInterdit.split('+').map(comp => `<div class="competence-item">✗ ${comp.trim()}</div>`).join('')}</div>` : 
            '<div style="font-size: 8pt; font-style: italic;">Aucune compétence interdite pour cette espèce.</div>'}
        </div>
      </div>
    </div>

    <div class="footer">
      <strong>Contact:</strong> ${character.email} | 
      <strong>Date de création:</strong> ${new Date().toLocaleDateString('fr-FR')}
    </div>
  </div>

  <!-- PAGE 2 -->
  <div class="page">
    <h1>ANNONCES DE JEU</h1>
    
    <table>
      <tr>
        <th style="width: 20%;">Annonce</th>
        <th>Effet</th>
      </tr>
      <tr>
        <td><strong>ABÎME X</strong></td>
        <td>Perte de X points de santé mentale</td>
      </tr>
      <tr>
        <td><strong>ANIMATE DEAD</strong></td>
        <td>Le mort ou le mourant ciblé se relève et sert son nouveau maître pendant une heure puis retourne au cimetière.</td>
      </tr>
      <tr>
        <td><strong>BACK OFF</strong></td>
        <td>L'annonce autour du jeteur de sorts les gens s'écartent de 3 mètres pendant un sablier. Cette cible est immunisée si elle est en armure lourde.</td>
      </tr>
      <tr>
        <td><strong>BLIND</strong></td>
        <td>Aveuglé 1 min + 1 PV imparable. Rompt les formations</td>
      </tr>
      <tr>
        <td><strong>BONFIRE</strong></td>
        <td>Brûle bâtiments, rend vulnérables les morts-vivants. Durée : 1 sablier</td>
      </tr>
      <tr>
        <td><strong>BURN</strong></td>
        <td>La cible subit 1 point de dommage à toutes les localisations couvertes par du métal.</td>
      </tr>
      <tr>
        <td><strong>CRUSH</strong></td>
        <td>Détruit arme/bouclier/armure touchée. Tue un mort-vivant. Résiste 3 min si incassable</td>
      </tr>
      <tr>
        <td><strong>DEAD</strong></td>
        <td>La frappe enlève un personnage limité. Accessible par compétence en jeu.</td>
      </tr>
      <tr>
        <td><strong>DISPEL MAGIC</strong></td>
        <td>L'annonce ou le bâtiment ou la machine à charbon annule les effets de sorts dans un rayon de 10 mètres autour d'elle.</td>
      </tr>
      <tr>
        <td><strong>ENCHANTED</strong></td>
        <td>Blesse les créatures sensibles (principalement planaires)</td>
      </tr>
      <tr>
        <td><strong>GRACE</strong></td>
        <td>La frappe tue un personnage inconscient ou entravé. Tout le monde peut le faire.</td>
      </tr>
      <tr>
        <td><strong>HEAL</strong></td>
        <td>L'annonce soigne la personne en face du guérisseur de tous ses points de vie.</td>
      </tr>
      <tr>
        <td><strong>HEADACHE</strong></td>
        <td>La cible a mal à la tête pendant un sablier. Cette cible est immunisée si elle est en armure lourde.</td>
      </tr>
      <tr>
        <td><strong>HOLY</strong></td>
        <td>Blesse les créatures sensibles (quasi toutes)</td>
      </tr>
      <tr>
        <td><strong>ICE</strong></td>
        <td>La cible est paralysée pour 1 minute. De plus, elle subit 1 point de dégâts pendant sa paralysie, si elle tombe à 0 point de vie à chacune de ses localisations : coma.</td>
      </tr>
      <tr>
        <td><strong>MERCURY</strong></td>
        <td>Acier nain. Tue tout sauf créatures résistantes</td>
      </tr>
      <tr>
        <td><strong>MUTE</strong></td>
        <td>La personne ciblée est silencieuse pendant un sablier. Cette cible est immunisée si elle est en armure lourde.</td>
      </tr>
      <tr>
        <td><strong>PAF</strong></td>
        <td>Assommé 5 minutes</td>
      </tr>
      <tr>
        <td><strong>RAISE DEAD</strong></td>
        <td>L'esprit touché par un nécromant le sert sous forme de zombie pendant 1 heure puis retourne au cimetière.</td>
      </tr>
      <tr>
        <td><strong>RESIST</strong></td>
        <td>Annonce votre résistance ou votre immunité éternelle ou temporaire.</td>
      </tr>
      <tr>
        <td><strong>REVEAL</strong></td>
        <td>Le tisseur ou le clerc révèlent les créatures aux tulles noires, vertes et rouges aux gens à 10 mètres autour de vous.</td>
      </tr>
      <tr>
        <td><strong>SILVER</strong></td>
        <td>Blesse les créatures sensibles à l'argent</td>
      </tr>
      <tr>
        <td><strong>SHOCK</strong></td>
        <td>Le tisseur de sort occasionne un point de vie de dégât sur une cible au choix pendant un sablier. Cette cible est immunisée si elle est en armure lourde.</td>
      </tr>
      <tr>
        <td><strong>SLEEP</strong></td>
        <td>Sommeil 3 min, réveil désorienté</td>
      </tr>
      <tr>
        <td><strong>STEP BACK</strong></td>
        <td>La cible recule de 5 mètres</td>
      </tr>
      <tr>
        <td><strong>STRIKE DOWN</strong></td>
        <td>Propulse au sol (même si paré). Sauf créatures résistantes</td>
      </tr>
      <tr>
        <td><strong>THROUGH</strong></td>
        <td>Ignore les armures</td>
      </tr>
      <tr>
        <td><strong>TOXIC</strong></td>
        <td>Contact peau : inconscience après 1 min, mort par étouffement après 3 min</td>
      </tr>
    </table>

    <h2>Système de Bagarre (Rappel)</h2>
    <div style="border: 2px solid #000; padding: 0.3cm; background: #f9f9f9; margin-bottom: 0.4cm;">
      <p style="margin: 0.1cm 0;"><strong>Conditions de déclenchement :</strong></p>
      <ul style="margin: 0.1cm 0; padding-left: 0.5cm;">
        <li>Accord tacite entre les participants OU souffler « Bagarre » à l'oreille de l'adversaire</li>
        <li>Score de bagarre = Points de vie délocalisés au moment de la bagarre</li>
      </ul>
      <p style="margin: 0.2cm 0;"><strong>Règles :</strong></p>
      <ul style="margin: 0.1cm 0; padding-left: 0.5cm;">
        <li>Le participant avec le score le plus élevé l'emporte</li>
        <li>En cas d'égalité : épuisement mutuel, pas de vainqueur (sauf si annonce d'assommage utilisée)</li>
        <li>Annonces autorisées : PAF (assommé 5 min), BLIND (aveuglé 1 min + 1 PV)</li>
      </ul>
      <p style="margin: 0.2cm 0; color: #c00;"><strong>⚠ INTERDICTIONS ABSOLUES :</strong></p>
      <ul style="margin: 0.1cm 0; padding-left: 0.5cm; color: #c00;">
        <li>Les personnes non-combattantes ne peuvent PAS participer aux bagarres</li>
        <li>Les mineurs ne peuvent JAMAIS faire de bagarre</li>
      </ul>
    </div>
  </div>
</body>
</html>`;
  };

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(generateSheetHTML());
      printWindow.document.close();
      setTimeout(() => {
        printWindow.print();
      }, 250);
    }
  };

  const handleDownloadPDF = () => {
    // Pour le PDF, on utilise l'impression vers PDF du navigateur
    toast.info("Utilisez l'option 'Imprimer' puis sélectionnez 'Enregistrer en PDF' dans les options d'impression");
    handlePrint();
  };

  return (
    <div className="flex gap-2 mt-4">
      <Button onClick={handlePrint} variant="outline" className="gap-2">
        <Printer className="h-4 w-4" />
        Imprimer
      </Button>
      <Button onClick={handleDownloadPDF} variant="outline" className="gap-2">
        <FileDown className="h-4 w-4" />
        Télécharger PDF
      </Button>
    </div>
  );
};
