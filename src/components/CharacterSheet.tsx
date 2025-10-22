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
        <div class="info-label">Prénom</div>
        <div class="info-value">${character.prenom}</div>
      </div>
      <div class="info-item">
        <div class="info-label">Nom</div>
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
        <div class="stat-value"></div>
      </div>
      <div class="stat">
        <div class="stat-label">GA</div>
        <div class="stat-value"></div>
      </div>
    </div>

    <div class="info-grid" style="margin-bottom: 0.3cm;">
      <div class="info-item" style="grid-column: span 2;">
        <div class="info-label">Pierres de Vie</div>
        <div class="info-value" style="min-height: 0.8cm;"></div>
      </div>
      <div class="info-item" style="grid-column: span 2;">
        <div class="info-label">Points d'Abîme</div>
        <div class="info-value" style="min-height: 0.8cm;"></div>
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

    <div class="footer">
      <strong>Contact:</strong> ${character.email} | 
      <strong>Date de création:</strong> ${new Date().toLocaleDateString('fr-FR')}
    </div>
  </div>

  <!-- PAGE 2 -->
  <div class="page">
    <h1>RÉCAPITULATIF - ${character.prenom} ${character.nom}</h1>
    
    <h2>Compétences Gratuites de l'Espèce</h2>
    <div class="competences-box" style="min-height: 3cm;">
      ${character.especeGratuit && character.especeGratuit !== 'Aucun' ? 
        `<div style="font-size: 9pt;">${character.especeGratuit.split('+').map(comp => `<div class="competence-item">✓ ${comp.trim()}</div>`).join('')}</div>` : 
        '<div style="font-size: 8pt; font-style: italic;">Aucune compétence gratuite pour cette espèce.</div>'}
    </div>

    <h2>Compétences Interdites</h2>
    <div class="competences-box" style="min-height: 3cm;">
      ${character.especeInterdit && character.especeInterdit !== 'Aucun' ? 
        `<div style="font-size: 9pt;">${character.especeInterdit.split('+').map(comp => `<div class="competence-item">✗ ${comp.trim()}</div>`).join('')}</div>` : 
        '<div style="font-size: 8pt; font-style: italic;">Aucune compétence interdite pour cette espèce.</div>'}
    </div>


    <div class="footer" style="margin-top: 1cm;">
      <strong>Fiche générée automatiquement</strong> | 
      Pour toute modification, contactez l'organisation
    </div>
  </div>

  <!-- PAGE 3 -->
  <div class="page">
    <h1>ANNONCES DE JEU</h1>
    
    <h2>Annonces de Combat</h2>
    <table>
      <tr>
        <th style="width: 25%;">Annonce</th>
        <th>Effet</th>
      </tr>
      <tr>
        <td><strong>PAF</strong></td>
        <td>Cible assommée pendant 5 minutes (inconsciente, au sol)</td>
      </tr>
      <tr>
        <td><strong>BLIND</strong></td>
        <td>Cible aveuglée pendant 1 minute + subit 1 PV de dégâts</td>
      </tr>
      <tr>
        <td><strong>CRUSH</strong></td>
        <td>Attaque dévastatrice - Dégâts doublés. Détruit instantanément les Morts-Vivants</td>
      </tr>
      <tr>
        <td><strong>SACRED</strong></td>
        <td>Attaque sacrée - Efficace contre les créatures impies. Détruit instantanément les Morts-Vivants</td>
      </tr>
      <tr>
        <td><strong>ENCHANTED</strong></td>
        <td>Attaque enchantée - Les Planaires subissent 2 PV au lieu d'1 PV</td>
      </tr>
      <tr>
        <td><strong>BONFIRE</strong></td>
        <td>Flammes purificatrices - Rend les Morts-Vivants vulnérables pendant 3 touches. Détruit définitivement les Planaires du Néant</td>
      </tr>
    </table>

    <h2>Annonces de Magie</h2>
    <table>
      <tr>
        <th style="width: 25%;">Annonce</th>
        <th>Effet</th>
      </tr>
      <tr>
        <td><strong>FRAYEUR</strong></td>
        <td>Cible effrayée - Doit fuir la source de peur pendant 1 minute</td>
      </tr>
      <tr>
        <td><strong>ENTRAVE</strong></td>
        <td>Cible immobilisée - Ne peut pas se déplacer pendant la durée de l'effet</td>
      </tr>
      <tr>
        <td><strong>DÉSINCARNATION</strong></td>
        <td>Projection astrale - L'esprit quitte temporairement le corps</td>
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

    <h2>États Spéciaux</h2>
    <table>
      <tr>
        <th style="width: 25%;">État</th>
        <th>Description</th>
      </tr>
      <tr>
        <td><strong>Assommé</strong></td>
        <td>Personnage inconscient, au sol, incapable d'agir pendant la durée indiquée</td>
      </tr>
      <tr>
        <td><strong>Aveuglé</strong></td>
        <td>Personnage ne peut pas voir, pénalités aux actions nécessitant la vue</td>
      </tr>
      <tr>
        <td><strong>Immobilisé</strong></td>
        <td>Personnage ne peut pas se déplacer mais peut agir sur place</td>
      </tr>
      <tr>
        <td><strong>Effrayé</strong></td>
        <td>Personnage doit s'éloigner de la source de peur, ne peut pas l'attaquer</td>
      </tr>
    </table>

    <div class="footer" style="margin-top: 0.5cm;">
      <strong>Référence rapide</strong> | 
      Ces annonces doivent être clairement énoncées lors de leur utilisation
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

  const handleDownloadWord = () => {
    const html = generateSheetHTML();
    const blob = new Blob([html], { type: 'application/msword' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Fiche_${character.prenom}_${character.nom}.doc`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Fiche téléchargée en format Word");
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
      <Button onClick={handleDownloadWord} variant="outline" className="gap-2">
        <FileDown className="h-4 w-4" />
        Télécharger Word
      </Button>
      <Button onClick={handleDownloadPDF} variant="outline" className="gap-2">
        <FileDown className="h-4 w-4" />
        Télécharger PDF
      </Button>
    </div>
  );
};
