import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Shield, ArrowLeft, Save, Plus, X } from "lucide-react";
import { toast } from "sonner";

interface Faction {
  id: string;
  nom: string;
  marquesTotal: number;
  marquesDepensees: number;
  marquesDisponibles: number;
  proprietes: string[];
  batiment: { type: string; nom: string } | null;
  descriptionCourte: string;
  background: string;
  dateCreation: string;
  statut: "active" | "inactive";
}

const Factions = () => {
  const [factions, setFactions] = useState<Faction[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [nouvellePropriete, setNouvellePropriete] = useState("");

  const [formData, setFormData] = useState<Omit<Faction, "id" | "marquesDisponibles" | "dateCreation">>({
    nom: "",
    marquesTotal: 4,
    marquesDepensees: 0,
    proprietes: [],
    batiment: null,
    descriptionCourte: "",
    background: "",
    statut: "active"
  });

  const calculerMarquesDisponibles = () => {
    return formData.marquesTotal - (formData.marquesDepensees * 2);
  };

  const ajouterPropriete = () => {
    if (nouvellePropriete.trim() && calculerMarquesDisponibles() >= 2) {
      setFormData({
        ...formData,
        proprietes: [...formData.proprietes, nouvellePropriete.trim()],
        marquesDepensees: formData.marquesDepensees + 1
      });
      setNouvellePropriete("");
    } else if (calculerMarquesDisponibles() < 2) {
      toast.error("Marques de destinée insuffisantes (coût: 2 marques)");
    }
  };

  const retirerPropriete = (index: number) => {
    const nouvelles = [...formData.proprietes];
    nouvelles.splice(index, 1);
    setFormData({
      ...formData,
      proprietes: nouvelles,
      marquesDepensees: formData.marquesDepensees - 1
    });
  };

  const ajouterBatiment = (type: string, nom: string) => {
    if (calculerMarquesDisponibles() >= 2) {
      setFormData({
        ...formData,
        batiment: { type, nom },
        marquesDepensees: formData.marquesDepensees + 1
      });
    } else {
      toast.error("Marques de destinée insuffisantes (coût: 2 marques)");
    }
  };

  const retirerBatiment = () => {
    setFormData({
      ...formData,
      batiment: null,
      marquesDepensees: formData.marquesDepensees - 1
    });
  };

  const sauvegarderFaction = () => {
    if (!formData.nom.trim()) {
      toast.error("Le nom de la faction est requis");
      return;
    }

    const nouvelleFaction: Faction = {
      id: crypto.randomUUID(),
      ...formData,
      marquesDisponibles: calculerMarquesDisponibles(),
      dateCreation: new Date().toLocaleDateString("fr-FR")
    };

    setFactions([...factions, nouvelleFaction]);
    setShowForm(false);
    setFormData({
      nom: "",
      marquesTotal: 4,
      marquesDepensees: 0,
      proprietes: [],
      batiment: null,
      descriptionCourte: "",
      background: "",
      statut: "active"
    });
    
    toast.success("Faction créée avec succès !");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      <header className="border-b border-border/50 bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link to="/">
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </Link>
              <Shield className="h-8 w-8 text-primary" />
              <h1 className="text-3xl font-bold text-primary">Gestion des Factions</h1>
            </div>
            {!showForm && (
              <Button onClick={() => setShowForm(true)} className="gap-2">
                <Plus className="h-5 w-5" />
                Créer une Faction
              </Button>
            )}
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {showForm ? (
          <Card className="ornament-border max-w-4xl mx-auto">
            <CardHeader>
              <CardTitle>Créer une Nouvelle Faction</CardTitle>
              <CardDescription>
                Marques de destinée disponibles: {calculerMarquesDisponibles()}/{formData.marquesTotal}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="nom">Nom de la Faction *</Label>
                <Input
                  id="nom"
                  value={formData.nom}
                  onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                  placeholder="Ex: La Guilde des Ombres"
                />
              </div>

              <div className="space-y-2">
                <Label>Propriétés Terriennes (2 Marques chacune)</Label>
                <div className="flex gap-2">
                  <Input
                    value={nouvellePropriete}
                    onChange={(e) => setNouvellePropriete(e.target.value)}
                    placeholder="Nom de la propriété"
                    onKeyPress={(e) => e.key === 'Enter' && ajouterPropriete()}
                  />
                  <Button onClick={ajouterPropriete} variant="secondary">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.proprietes.map((prop, idx) => (
                    <div key={idx} className="flex items-center gap-1 bg-secondary/20 px-3 py-1 rounded-full">
                      <span className="text-sm">{prop}</span>
                      <button onClick={() => retirerPropriete(idx)} className="hover:text-destructive">
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Bâtiment/Navire/Navire Volant (2 Marques)</Label>
                {!formData.batiment ? (
                  <div className="space-y-2">
                    <Select onValueChange={(type) => {
                      const nom = prompt(`Nom de votre ${type}:`);
                      if (nom) ajouterBatiment(type, nom);
                    }}>
                      <SelectTrigger>
                        <SelectValue placeholder="Choisir un type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Bâtiment">Bâtiment</SelectItem>
                        <SelectItem value="Navire">Navire</SelectItem>
                        <SelectItem value="Navire Volant">Navire Volant</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 bg-accent/20 p-3 rounded-lg">
                    <span className="flex-1">
                      <strong>{formData.batiment.type}:</strong> {formData.batiment.nom}
                    </span>
                    <Button onClick={retirerBatiment} variant="ghost" size="icon">
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description Courte</Label>
                <Textarea
                  id="description"
                  value={formData.descriptionCourte}
                  onChange={(e) => setFormData({ ...formData, descriptionCourte: e.target.value })}
                  placeholder="Une brève description de votre faction..."
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="background">Background Complet</Label>
                <Textarea
                  id="background"
                  value={formData.background}
                  onChange={(e) => setFormData({ ...formData, background: e.target.value })}
                  placeholder="L'histoire complète de votre faction..."
                  rows={6}
                />
              </div>

              <div className="flex gap-3 pt-4">
                <Button onClick={sauvegarderFaction} className="flex-1 gap-2">
                  <Save className="h-4 w-4" />
                  Sauvegarder la Faction
                </Button>
                <Button onClick={() => setShowForm(false)} variant="outline">
                  Annuler
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {factions.length === 0 ? (
              <Card className="ornament-border text-center py-12">
                <CardContent>
                  <Shield className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                  <p className="text-xl text-muted-foreground mb-4">Aucune faction créée</p>
                  <Button onClick={() => setShowForm(true)} className="gap-2">
                    <Plus className="h-5 w-5" />
                    Créer votre première faction
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid md:grid-cols-2 gap-6">
                {factions.map((faction) => (
                  <Card key={faction.id} className="ornament-border">
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <span>{faction.nom}</span>
                        <span className={`text-xs px-2 py-1 rounded ${
                          faction.statut === "active" ? "bg-green-500/20 text-green-700" : "bg-gray-500/20 text-gray-700"
                        }`}>
                          {faction.statut}
                        </span>
                      </CardTitle>
                      <CardDescription>
                        Créée le {faction.dateCreation}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Marques disponibles:</span>
                        <span className="font-bold">{faction.marquesDisponibles}/{faction.marquesTotal}</span>
                      </div>
                      {faction.proprietes.length > 0 && (
                        <div>
                          <p className="text-sm font-medium mb-1">Propriétés:</p>
                          <div className="flex flex-wrap gap-1">
                            {faction.proprietes.map((prop, idx) => (
                              <span key={idx} className="text-xs bg-secondary/20 px-2 py-1 rounded">
                                {prop}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                      {faction.batiment && (
                        <div>
                          <p className="text-sm font-medium">{faction.batiment.type}:</p>
                          <p className="text-sm text-muted-foreground">{faction.batiment.nom}</p>
                        </div>
                      )}
                      {faction.descriptionCourte && (
                        <p className="text-sm text-muted-foreground italic">
                          {faction.descriptionCourte}
                        </p>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Factions;
