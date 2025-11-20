import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Users, FileText, Scroll, Languages } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const Home = () => {
  const { language, setLanguage, t } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Shield className="h-8 w-8 text-primary" />
              <h1 className="text-3xl font-bold text-primary">Barok GN</h1>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setLanguage(language === 'fr' ? 'en' : 'fr')}
                className="gap-2"
              >
                <Languages className="h-4 w-4" />
                <span className="text-sm font-medium">{language === 'fr' ? 'EN' : 'FR'}</span>
              </Button>
            </div>
            <p className="text-sm text-muted-foreground hidden md:block">
              {t('header.subtitle')}
            </p>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <h2 className="text-5xl md:text-6xl font-bold text-foreground leading-tight">
            {t('home.hero.title')}{" "}
            <span className="text-primary">Barok</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            {t('home.hero.subtitle')}
          </p>
          <div className="flex gap-4 justify-center pt-6">
            <Link to="/factions">
              <Button size="lg" className="gap-2 bg-primary hover:bg-primary/90">
                <Users className="h-5 w-5" />
                {t('home.hero.createFaction')}
              </Button>
            </Link>
            <Link to="/personnages">
              <Button size="lg" variant="outline" className="gap-2">
                <Scroll className="h-5 w-5" />
                {t('home.hero.createCharacter')}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="ornament-border hover:shadow-lg transition-all">
            <CardHeader>
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>{t('features.factions.title')}</CardTitle>
              <CardDescription>
                {t('features.factions.description')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• {t('features.factions.point1')}</li>
                <li>• {t('features.factions.point2')}</li>
                <li>• {t('features.factions.point3')}</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="ornament-border hover:shadow-lg transition-all">
            <CardHeader>
              <div className="h-12 w-12 rounded-lg bg-secondary/10 flex items-center justify-center mb-4">
                <Scroll className="h-6 w-6 text-secondary" />
              </div>
              <CardTitle>{t('features.characters.title')}</CardTitle>
              <CardDescription>
                {t('features.characters.description')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• {t('features.characters.point1')}</li>
                <li>• {t('features.characters.point2')}</li>
                <li>• {t('features.characters.point3')}</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="ornament-border hover:shadow-lg transition-all">
            <CardHeader>
              <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                <FileText className="h-6 w-6 text-accent" />
              </div>
              <CardTitle>Fiches A4</CardTitle>
              <CardDescription>
                Exportez vos fiches complètes prêtes pour le terrain de jeu
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Format A4 imprimable</li>
                <li>• Toutes les infos essentielles</li>
                <li>• Cases vierges pour le jeu</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 bg-card/50 backdrop-blur-sm mt-16">
        <div className="container mx-auto px-4 py-8 text-center text-sm text-muted-foreground">
          <p>{t('footer.copyright')}</p>
          <p className="mt-2">
            {t('footer.visit')}{" "}
            <a 
              href="https://steambe.wixsite.com/barokgn" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              {t('footer.officialSite')}
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
