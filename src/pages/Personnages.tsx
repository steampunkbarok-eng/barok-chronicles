import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Scroll } from "lucide-react";

const Personnages = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      <header className="border-b border-border/50 bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <Link to="/">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <Scroll className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold text-primary">Gestion des Personnages</h1>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Card className="ornament-border max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle>Création de Personnage</CardTitle>
            <CardDescription>
              Cette fonctionnalité sera développée dans la prochaine itération
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center py-12">
            <Scroll className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground mb-6">
              Le système de création de personnage avec gestion des points de création,
              des espèces, des compétences et des calculs automatiques sera ajouté prochainement.
            </p>
            <div className="space-y-2 text-sm text-muted-foreground text-left max-w-md mx-auto bg-muted/30 p-4 rounded-lg">
              <p className="font-medium mb-2">Fonctionnalités prévues:</p>
              <ul className="space-y-1">
                <li>• 12 points de création</li>
                <li>• Choix de l'espèce avec effets</li>
                <li>• Système de compétences avec prérequis</li>
                <li>• Calcul automatique PV, PA, Abîme</li>
                <li>• Lien avec les factions</li>
                <li>• Export fiche A4 imprimable</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Personnages;
