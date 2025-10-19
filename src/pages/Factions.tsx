import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Shield, ArrowLeft, Save, Plus, X, Info } from "lucide-react";
import { toast } from "sonner";
import { typesBatiments, batimentsUniques, navires } from "@/data/batiments";
import { titresCarrieres } from "@/data/titres";

interface Faction {
  id: string;
  nom: string;
  marquesTotal: number;
  marquesDepensees: number;
  marquesDisponibles: number;
  proprietes: string[];
  batiment: { type: string; nom: string; avantages: string } | null;
  titres: string[];
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
    titres: [],
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

  const ajouterBatiment = (nom: string, type: string, avantages: string) => {
    if (formData.batiment) {
      toast.error("Vous avez déjà un bâtiment. Retirez-le d'abord.");
      return;
    }
    if (calculerMarquesDisponibles() >= 2) {
      setFormData({
        ...formData,
        batiment: { type, nom, avantages },
        marquesDepensees: formData.marquesDepensees + 1
      });
    } else {
      toast.error("Marques de destinée insuffisantes (coût: 2 marques)");
    }
  };

  const ajouterTitre = (nomTitre: string) => {
    if (formData.titres.length >= 2) {
      toast.error("Maximum 2 titres par faction");
      return;
    }
    if (formData.titres.includes(nomTitre)) {
      toast.error("Ce titre est déjà ajouté");
      return;
    }
    if (calculerMarquesDisponibles() >= 2) {
      setFormData({
        ...formData,
        titres: [...formData.titres, nomTitre],
        marquesDepensees: formData.marquesDepensees + 1
      });
    } else {
      toast.error("Marques de destinée insuffisantes (coût: 2 marques)");
    }
  };

  const retirerTitre = (index: number) => {
    const nouveauxTitres = [...formData.titres];
    nouveauxTitres.splice(index, 1);
    setFormData({
      ...formData,
      titres: nouveauxTitres,
      marquesDepensees: formData.marquesDepensees - 1
    });
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
      titres: [],
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
                <Label>Bâtiment/Navire (2 Marques - 1 seul choix)</Label>
                {!formData.batiment ? (
                  <Select onValueChange={(value) => {
                    const [nom, type, avantages] = value.split('||');
                    ajouterBatiment(nom, type, avantages);
                  }}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choisir un bâtiment ou navire" />
                    </SelectTrigger>
                    <SelectContent className="max-h-[400px]">
                      <SelectGroup>
                        <SelectLabel>Bâtiments Uniques</SelectLabel>
                        {batimentsUniques.map((bat) => (
                          <SelectItem key={bat.nom} value={`${bat.nom}||Bâtiment||${bat.avantages}`}>
                            <div className="flex flex-col">
                              <span className="font-medium">{bat.nom}</span>
                              <span className="text-xs text-muted-foreground">{bat.avantages}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectGroup>
                      <SelectGroup>
                        <SelectLabel>Navires</SelectLabel>
                        {navires.map((nav) => (
                          <SelectItem key={nav.nom} value={`${nav.nom}||Navire||${nav.avantages}`}>
                            <div className="flex flex-col">
                              <span className="font-medium">{nav.nom}</span>
                              <span className="text-xs text-muted-foreground">{nav.avantages}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                ) : (
                  <div className="bg-accent/20 p-4 rounded-lg space-y-2">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="font-bold text-primary">{formData.batiment.nom}</p>
                        <p className="text-xs text-muted-foreground mb-2">{formData.batiment.type}</p>
                        <div className="flex items-start gap-2 bg-muted/50 p-2 rounded">
                          <Info className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                          <p className="text-sm">{formData.batiment.avantages}</p>
                        </div>
                      </div>
                      <Button onClick={retirerBatiment} variant="ghost" size="icon" className="ml-2">
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label>Titres/Carrières (2 Marques chacun - Max 2)</Label>
                <Select onValueChange={ajouterTitre} disabled={formData.titres.length >= 2}>
                  <SelectTrigger>
                    <SelectValue placeholder={formData.titres.length >= 2 ? "Maximum atteint" : "Choisir un titre"} />
                  </SelectTrigger>
                  <SelectContent className="max-h-[400px]">
                    {titresCarrieres.map((titre) => (
                      <SelectItem 
                        key={titre.nom} 
                        value={titre.nom}
                        disabled={formData.titres.includes(titre.nom)}
                      >
                        <div className="flex flex-col">
                          <span className="font-medium">{titre.nom}</span>
                          {titre.prerequis && (
                            <span className="text-xs text-muted-foreground">Prérequis: {titre.prerequis}</span>
                          )}
                          {titre.incompatible && (
                            <span className="text-xs text-destructive">Incompatible: {titre.incompatible}</span>
                          )}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.titres.map((titre, idx) => (
                    <div key={idx} className="flex items-center gap-2 bg-primary/10 px-3 py-2 rounded-lg">
                      <span className="text-sm font-medium">{titre}</span>
                      <button onClick={() => retirerTitre(idx)} className="hover:text-destructive">
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
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
                        <div className="space-y-1">
                          <p className="text-sm font-medium text-primary">{faction.batiment.nom}</p>
                          <p className="text-xs text-muted-foreground">{faction.batiment.type}</p>
                          <p className="text-xs bg-muted/50 p-2 rounded">{faction.batiment.avantages}</p>
                        </div>
                      )}
                      {faction.titres.length > 0 && (
                        <div>
                          <p className="text-sm font-medium mb-1">Titres/Carrières:</p>
                          <div className="flex flex-wrap gap-1">
                            {faction.titres.map((titre, idx) => (
                              <span key={idx} className="text-xs bg-primary/10 px-2 py-1 rounded font-medium">
                                {titre}
                              </span>
                            ))}
                          </div>
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
