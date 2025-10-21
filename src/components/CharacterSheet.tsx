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
    </div>

    <h2>Compétences Choisies (${character.competences.length})</h2>
    <div class="competences-box">
      ${character.competences.map(comp => `<div class="competence-item">✓ ${comp}</div>`).join('')}
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
    <div class="long-box" style="min-height: 1cm;"></div>
    <div class="long-box" style="min-height: 1cm;"></div>
    <div class="long-box" style="min-height: 1cm;"></div>

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
    
    <h2>Informations de Création</h2>
    <table>
      <tr>
        <th>Caractéristique</th>
        <th>Valeur</th>
      </tr>
      <tr>
        <td><strong>Espèce</strong></td>
        <td>${character.espece}</td>
      </tr>
      <tr>
        <td><strong>Faction</strong></td>
        <td>${character.faction || 'Aucune faction sélectionnée'}</td>
      </tr>
      <tr>
        <td><strong>Points de Vie (PV)</strong></td>
        <td>${character.pvTotal} points</td>
      </tr>
      <tr>
        <td><strong>Points d'Action (PA)</strong></td>
        <td>${character.paTotal} points</td>
      </tr>
      <tr>
        <td><strong>Score de Bagarre</strong></td>
        <td>${character.scoreBagarre} points (PV délocalisés)</td>
      </tr>
    </table>

    <h2>PA par Localisation</h2>
    <table>
      <tr>
        <th>Localisation</th>
        <th>PA</th>
      </tr>
      <tr><td>Torse</td><td>${Math.floor(character.paTotal / 3)}</td></tr>
      <tr><td>Bras Gauche</td><td>${Math.floor(character.paTotal / 3)}</td></tr>
      <tr><td>Bras Droit</td><td>${Math.floor(character.paTotal / 3)}</td></tr>
    </table>

    <h2>Compétences Gratuites de l'Espèce</h2>
    <div class="competences-box" style="min-height: 3cm;">
      ${character.competences.length > 0 ? 
        '<div style="font-size: 8pt; font-style: italic;">Les compétences gratuites sont incluses dans la liste des compétences choisies ci-dessus.</div>' : 
        '<div style="font-size: 8pt; font-style: italic;">Aucune compétence gratuite pour cette espèce.</div>'}
    </div>

    <h2>Compétences Interdites</h2>
    <div class="competences-box" style="min-height: 3cm;">
      <div style="font-size: 8pt; font-style: italic;">
        Les compétences interdites dépendent de votre espèce et de votre faction (si applicable).
        Consultez les règles pour plus de détails.
      </div>
    </div>

    <h2>Système de Bagarre (Rappel)</h2>
    <div style="border: 1px solid #000; padding: 0.3cm; background: #f9f9f9;">
      <p style="margin: 0.1cm 0;"><strong>Conditions :</strong></p>
      <ul style="margin: 0.1cm 0; padding-left: 0.5cm;">
        <li>Accord tacite ou souffler « Bagarre » à l'oreille</li>
        <li>Score de bagarre = Points de vie délocalisés</li>
        <li>Le score le plus élevé l'emporte</li>
        <li>Égalité : épuisement mutuel, pas de vainqueur (sauf assommage)</li>
      </ul>
      <p style="margin: 0.1cm 0;"><strong>Annonces autorisées :</strong> PAF (assommé 5 min), BLIND (aveuglé 1 min + 1 PV)</p>
      <p style="margin: 0.1cm 0;"><strong>Interdictions :</strong> Les personnes non-combattantes et les mineurs ne font PAS de bagarre.</p>
    </div>

    <div class="footer" style="margin-top: 1cm;">
      <strong>Fiche générée automatiquement</strong> | 
      Pour toute modification, contactez l'organisation
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
