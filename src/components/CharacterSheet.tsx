import { Button } from "@/components/ui/button";
import { FileDown, Printer } from "lucide-react";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";
import { generateCharacterSheetHTML } from "@/utils/characterSheetHTML";

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
    sorts?: { niv1: number; niv2: number; niv3: number; niv4: number };
    afficherSortilleges?: boolean;
  };
}

export const CharacterSheet = ({ character }: CharacterSheetProps) => {
  const { language, t } = useLanguage();
  
  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(generateCharacterSheetHTML(character, language, t));
      printWindow.document.close();
      setTimeout(() => {
        printWindow.print();
      }, 250);
    }
  };

  const handleDownloadPDF = () => {
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
