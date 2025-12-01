import { Button } from "@/components/ui/button";
import { FileDown } from "lucide-react";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";

export const BlankCharacterSheet = () => {
  const { t } = useLanguage();
  
  const generateBlankSheetHTML = () => {
    return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Fiche Personnage Vierge</title>
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
      font-size: 14pt;
      font-weight: bold;
      margin: 0 0 0.2cm 0;
      padding: 0.15cm;
      border: 2px solid #000;
      background: #e0e0e0;
    }
    h2 {
      font-size: 10pt;
      font-weight: bold;
      margin: 0.3cm 0 0.15cm 0;
      padding: 0.1cm 0.15cm;
      border-bottom: 2px solid #000;
      background: #f0f0f0;
    }
    .section {
      margin-bottom: 0.2cm;
    }
    .info-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 0.15cm;
      margin-bottom: 0.2cm;
    }
    .info-item {
      border: 1px solid #000;
      padding: 0.1cm;
    }
    .info-label {
      font-weight: bold;
      font-size: 7pt;
      text-transform: uppercase;
      margin-bottom: 0.08cm;
    }
    .info-value {
      font-size: 9pt;
      min-height: 0.6cm;
    }
    .stats-row {
      display: flex;
      justify-content: space-around;
      padding: 0.2cm;
      border: 2px solid #000;
      background: #f5f5f5;
      margin-bottom: 0.2cm;
    }
    .stat {
      text-align: center;
    }
    .stat-label {
      font-weight: bold;
      font-size: 7pt;
      text-transform: uppercase;
    }
    .stat-value {
      font-size: 14pt;
      font-weight: bold;
      margin-top: 0.08cm;
      min-height: 0.6cm;
    }
    .two-columns {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 0.2cm;
    }
    .competences-box {
      border: 1px solid #000;
      padding: 0.15cm;
      min-height: 4cm;
    }
    .competence-item {
      padding: 0.08cm;
      margin-bottom: 0.08cm;
      border-left: 2px solid #000;
      padding-left: 0.15cm;
    }
    .empty-boxes {
      display: flex;
      gap: 0.15cm;
      margin-bottom: 0.2cm;
    }
    .empty-box {
      flex: 1;
      border: 1px solid #000;
      padding: 0.15cm;
      min-height: 1cm;
    }
    .empty-box-label {
      font-weight: bold;
      font-size: 7pt;
      margin-bottom: 0.1cm;
    }
    .long-box {
      border: 1px solid #000;
      padding: 0.15cm;
      min-height: 1.5cm;
      margin-bottom: 0.2cm;
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
      margin-bottom: 0.2cm;
    }
    table td, table th {
      border: 1px solid #000;
      padding: 0.08cm;
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
    <h1>${t('sheet.title')}</h1>
    
    <div class="info-grid">
      <div class="info-item">
        <div class="info-label">${t('sheet.nameTO')}</div>
        <div class="info-value"></div>
      </div>
      <div class="info-item">
        <div class="info-label">${t('sheet.nameTI')}</div>
        <div class="info-value"></div>
      </div>
      <div class="info-item">
        <div class="info-label">${t('sheet.faction')}</div>
        <div class="info-value"></div>
      </div>
      <div class="info-item">
        <div class="info-label">${t('sheet.species')}</div>
        <div class="info-value"></div>
      </div>
    </div>

    <div class="stats-row">
      <div class="stat">
        <div class="stat-label">${t('sheet.pvTotal')}</div>
        <div class="stat-value"></div>
      </div>
      <div class="stat">
        <div class="stat-label">${t('sheet.paTotal')}</div>
        <div class="stat-value"></div>
      </div>
      <div class="stat">
        <div class="stat-label">${t('sheet.bagarre')}</div>
        <div class="stat-value"></div>
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

    <div class="info-grid" style="margin-bottom: 0.2cm;">
      <div class="info-item" style="grid-column: span 2;">
        <div class="info-label">${t('sheet.lifeStones')}</div>
        <div class="info-value" style="min-height: 0.6cm; font-size: 12pt; font-weight: bold;"></div>
      </div>
      <div class="info-item" style="grid-column: span 2;">
        <div class="info-label">${t('sheet.abyss')}</div>
        <div class="info-value" style="min-height: 0.6cm; font-size: 12pt; font-weight: bold;"></div>
      </div>
    </div>

    <div style="font-weight: bold; font-size: 8pt; margin: 0.15cm 0 0.05cm 0;">${t('sheet.deathObsidian')}</div>
    <div style="min-height: 1cm; padding: 0.2cm; margin-bottom: 0.1cm;"></div>

    <h2>${t('sheet.skillsChosen')}</h2>
    <div class="two-columns">
      <div class="competences-box" style="min-height: 4cm;"></div>
      <div class="competences-box" style="min-height: 4cm;"></div>
    </div>

    <h2>${t('sheet.spells')}</h2>
    <table>
      <tr>
        <th style="width: 25%;">${t('sheet.level')} 1</th>
        <th style="width: 25%;">${t('sheet.level')} 2</th>
        <th style="width: 25%;">${t('sheet.level')} 3</th>
        <th style="width: 25%;">${t('sheet.level')} 4</th>
      </tr>
      ${Array(4).fill(0).map(() => `<tr>
        <td style="min-height: 1cm; padding: 0.15cm;"></td>
        <td style="min-height: 1cm; padding: 0.15cm;"></td>
        <td style="min-height: 1cm; padding: 0.15cm;"></td>
        <td style="min-height: 1cm; padding: 0.15cm;"></td>
      </tr>`).join('')}
    </table>

    <h2>${t('sheet.rituals')}</h2>
    <table>
      <tr>
        <th style="width: 50%;">${t('sheet.school')} 1</th>
        <th style="width: 50%;">${t('sheet.school')} 2</th>
      </tr>
      ${Array(3).fill(0).map(() => `<tr>
        <td style="min-height: 0.8cm; padding: 0.15cm;"></td>
        <td style="min-height: 0.8cm; padding: 0.15cm;"></td>
      </tr>`).join('')}
    </table>

    <h2>${t('sheet.learnedSkills')}</h2>
    <div class="two-columns">
      <div style="display: grid; grid-template-columns: 1fr; gap: 0.15cm;">
        ${Array(5).fill(0).map((_, i) => `<div class="empty-box" style="min-height: 0.8cm;"><div class="empty-box-label">${i + 1}.</div></div>`).join('')}
      </div>
      <div style="display: grid; grid-template-columns: 1fr; gap: 0.15cm;">
        ${Array(5).fill(0).map((_, i) => `<div class="empty-box" style="min-height: 0.8cm;"><div class="empty-box-label">${i + 6}.</div></div>`).join('')}
      </div>
    </div>

    <h2>${t('sheet.sequelae')}</h2>
    <div class="empty-boxes">
      ${Array(5).fill(0).map((_, i) => `<div class="empty-box" style="min-height: 1cm;">
        <div class="empty-box-label">${i + 1}.</div>
      </div>`).join('')}
    </div>

    <h2>${t('sheet.diseases')}</h2>
    <div class="empty-boxes">
      ${Array(5).fill(0).map((_, i) => `<div class="empty-box" style="min-height: 1cm;">
        <div class="empty-box-label">${i + 1}.</div>
      </div>`).join('')}
    </div>

    <div style="font-size: 7pt; color: #666; font-style: italic; margin: 0.3cm 0; padding: 0.2cm; background: #f9f9f9; border-left: 2px solid #666;">
      ℹ️ ${t('sheet.note')}
    </div>

    <h2>${t('sheet.argousineContract')}</h2>
    <div class="long-box"></div>

    <h2>${t('sheet.remarks')}</h2>
    <div class="long-box"></div>

    <div class="footer">
      <strong>${t('sheet.blankSheet')}</strong>
    </div>
  </div>

  <!-- PAGE 2 -->
  <div class="page">
    <h1>${t('sheet.progression')}</h1>

    <h2>${t('sheet.freeSkills')}</h2>
    <div class="competences-box" style="min-height: 2.5cm;"></div>

    <h2>${t('sheet.forbiddenSkills')}</h2>
    <div class="competences-box" style="min-height: 2.5cm;"></div>

    <div class="footer" style="margin-top: 1cm;">
      <strong>${t('sheet.autoGenerated')}</strong> | 
      ${t('sheet.contactOrga')}
    </div>
  </div>

  <!-- PAGE 3 -->
  <div class="page">
    <h1>${t('announcements.title')}</h1>
    
    <table>
      <tr>
        <th style="width: 20%;">${t('announcements.announcement')}</th>
        <th>${t('announcements.effect')}</th>
      </tr>
      <tr>
        <td><strong>ABÎME X</strong></td>
        <td>${t('announcements.abyss')}</td>
      </tr>
      <tr>
        <td><strong>ANIMATE DEAD</strong></td>
        <td>${t('announcements.animateDead')}</td>
      </tr>
      <tr>
        <td><strong>BACK OFF</strong></td>
        <td>${t('announcements.backOff')}</td>
      </tr>
      <tr>
        <td><strong>BLIND</strong></td>
        <td>${t('announcements.blind')}</td>
      </tr>
      <tr>
        <td><strong>BONFIRE</strong></td>
        <td>${t('announcements.bonfire')}</td>
      </tr>
      <tr>
        <td><strong>BURN</strong></td>
        <td>${t('announcements.burn')}</td>
      </tr>
      <tr>
        <td><strong>CRUSH</strong></td>
        <td>${t('announcements.crush')}</td>
      </tr>
      <tr>
        <td><strong>DEAD</strong></td>
        <td>${t('announcements.dead')}</td>
      </tr>
      <tr>
        <td><strong>DISPEL MAGIC</strong></td>
        <td>${t('announcements.dispelMagic')}</td>
      </tr>
      <tr>
        <td><strong>ENCHANTED</strong></td>
        <td>${t('announcements.enchanted')}</td>
      </tr>
      <tr>
        <td><strong>GRACE</strong></td>
        <td>${t('announcements.grace')}</td>
      </tr>
      <tr>
        <td><strong>HEAL</strong></td>
        <td>${t('announcements.heal')}</td>
      </tr>
      <tr>
        <td><strong>HEADACHE</strong></td>
        <td>${t('announcements.headache')}</td>
      </tr>
      <tr>
        <td><strong>HOLY</strong></td>
        <td>${t('announcements.holy')}</td>
      </tr>
      <tr>
        <td><strong>ICE</strong></td>
        <td>${t('announcements.ice')}</td>
      </tr>
      <tr>
        <td><strong>MERCURY</strong></td>
        <td>${t('announcements.mercury')}</td>
      </tr>
      <tr>
        <td><strong>MUTE</strong></td>
        <td>${t('announcements.mute')}</td>
      </tr>
      <tr>
        <td><strong>PAF</strong></td>
        <td>${t('announcements.paf')}</td>
      </tr>
      <tr>
        <td><strong>RAISE DEAD</strong></td>
        <td>${t('announcements.raiseDead')}</td>
      </tr>
      <tr>
        <td><strong>RESIST</strong></td>
        <td>${t('announcements.resist')}</td>
      </tr>
      <tr>
        <td><strong>REVEAL</strong></td>
        <td>${t('announcements.reveal')}</td>
      </tr>
      <tr>
        <td><strong>SILVER</strong></td>
        <td>${t('announcements.silver')}</td>
      </tr>
      <tr>
        <td><strong>SHOCK</strong></td>
        <td>${t('announcements.shock')}</td>
      </tr>
      <tr>
        <td><strong>SLEEP</strong></td>
        <td>${t('announcements.sleep')}</td>
      </tr>
      <tr>
        <td><strong>STEP BACK</strong></td>
        <td>${t('announcements.stepBack')}</td>
      </tr>
      <tr>
        <td><strong>STRIKE DOWN</strong></td>
        <td>${t('announcements.strikeDown')}</td>
      </tr>
      <tr>
        <td><strong>THROUGH</strong></td>
        <td>${t('announcements.through')}</td>
      </tr>
      <tr>
        <td><strong>TOXIC</strong></td>
        <td>${t('announcements.toxic')}</td>
      </tr>
    </table>

    <h2>${t('brawl.title')}</h2>
    <div style="border: 2px solid #000; padding: 0.3cm; background: #f9f9f9; margin-bottom: 0.4cm;">
      <p style="margin: 0.1cm 0;"><strong>${t('brawl.conditions')}</strong></p>
      <ul style="margin: 0.1cm 0; padding-left: 0.5cm;">
        <li>${t('brawl.condition1')}</li>
        <li>${t('brawl.condition2')}</li>
      </ul>
      <p style="margin: 0.2cm 0;"><strong>${t('brawl.rules')}</strong></p>
      <ul style="margin: 0.1cm 0; padding-left: 0.5cm;">
        <li>${t('brawl.rule1')}</li>
        <li>${t('brawl.rule2')}</li>
        <li>${t('brawl.rule3')}</li>
      </ul>
      <p style="margin: 0.2cm 0; color: #c00;"><strong>⚠ ${t('brawl.prohibitions')}</strong></p>
      <ul style="margin: 0.1cm 0; padding-left: 0.5cm; color: #c00;">
        <li>${t('brawl.prohibition1')}</li>
        <li>${t('brawl.prohibition2')}</li>
      </ul>
    </div>

    <div class="footer" style="margin-top: 0.5cm;">
      <strong>${t('brawl.reference')}</strong> | 
      ${t('brawl.mustAnnounce')}
    </div>
  </div>
</body>
</html>`;
  };

  const handleDownloadBlankSheet = () => {
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(generateBlankSheetHTML());
      printWindow.document.close();
      setTimeout(() => {
        printWindow.print();
      }, 250);
    }
  };

  return (
    <Button onClick={handleDownloadBlankSheet} variant="outline" className="gap-2">
      <FileDown className="h-4 w-4" />
      {t('sheet.blankSheet')}
    </Button>
  );
};
