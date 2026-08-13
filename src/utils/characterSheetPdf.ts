import jsPDF from "jspdf";

/**
 * Génère un PDF A4 portrait à partir du HTML complet de la fiche de personnage
 * et retourne son contenu encodé en base64 (sans le préfixe data:).
 */
export async function generateCharacterSheetPdfBase64(fullHtml: string): Promise<string> {
  const styleMatches = fullHtml.match(/<style[\s\S]*?<\/style>/gi) || [];
  const bodyMatch = fullHtml.match(/<body[^>]*>([\s\S]*)<\/body>/i);
  const bodyHtml = bodyMatch ? bodyMatch[1] : fullHtml;

  const container = document.createElement("div");
  container.style.position = "fixed";
  container.style.left = "-10000px";
  container.style.top = "0";
  container.style.width = "794px";
  container.style.background = "#ffffff";
  container.innerHTML = `${styleMatches.join("")}<div style="width:794px;background:#ffffff;">${bodyHtml}</div>`;
  document.body.appendChild(container);

  try {
    const pdf = new jsPDF({ unit: "pt", format: "a4", orientation: "portrait" });
    await pdf.html(container, {
      x: 0,
      y: 0,
      width: 595,
      windowWidth: 794,
      autoPaging: "slice",
    });
    const dataUri = pdf.output("datauristring");
    return dataUri.substring(dataUri.indexOf(",") + 1);
  } finally {
    document.body.removeChild(container);
  }
}
