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
      margin: 2cm;
    }
    body {
      font-family: 'Times New Roman', serif;
      font-size: 12pt;
      line-height: 1.6;
      color: #000;
      max-width: 21cm;
      margin: 0 auto;
      padding: 1cm;
    }
    h1 {
      text-align: center;
      font-size: 24pt;
      margin-bottom: 0.5cm;
      border-bottom: 3px solid #000;
      padding-bottom: 0.3cm;
    }
    h2 {
      font-size: 16pt;
      margin-top: 0.8cm;
      margin-bottom: 0.4cm;
      border-bottom: 2px solid #333;
      padding-bottom: 0.2cm;
    }
    .info-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 0.5cm;
      margin-bottom: 0.8cm;
    }
    .info-item {
      padding: 0.3cm;
      border: 1px solid #000;
      background: #f5f5f5;
    }
    .info-label {
      font-weight: bold;
      font-size: 10pt;
      text-transform: uppercase;
      color: #555;
    }
    .info-value {
      font-size: 14pt;
      margin-top: 0.2cm;
    }
    .stats-box {
      display: flex;
      justify-content: space-around;
      margin: 0.5cm 0;
      padding: 0.5cm;
      border: 2px solid #000;
      background: #f9f9f9;
    }
    .stat {
      text-align: center;
    }
    .stat-label {
      font-weight: bold;
      font-size: 10pt;
      text-transform: uppercase;
    }
    .stat-value {
      font-size: 20pt;
      font-weight: bold;
      margin-top: 0.2cm;
    }
    .competences-list {
      columns: 2;
      column-gap: 1cm;
      list-style: none;
      padding: 0;
    }
    .competences-list li {
      padding: 0.2cm;
      margin-bottom: 0.2cm;
      border-left: 3px solid #000;
      padding-left: 0.3cm;
      break-inside: avoid;
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
      <div class="info-value">${character.faction}</div>
    </div>
    <div class="info-item">
      <div class="info-label">Espèce</div>
      <div class="info-value">${character.espece}</div>
    </div>
  </div>

  <div class="stats-box">
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

  <h2>Compétences</h2>
  <ul class="competences-list">
    ${character.competences.map(comp => `<li>${comp}</li>`).join('')}
  </ul>

  <div style="margin-top: 2cm; padding-top: 0.5cm; border-top: 1px solid #ccc;">
    <p style="font-size: 10pt; color: #666;">
      <strong>Contact:</strong> ${character.email}<br>
      <strong>Date de création:</strong> ${new Date().toLocaleDateString('fr-FR')}
    </p>
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
