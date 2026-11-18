import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Users, FileText, Scroll, LogIn, LogOut, CalendarDays } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { GuideButton } from "@/components/GuideButton";
import { supabase } from "@/integrations/supabase/client";
import { useTri } from "@/i18n/tri";

const Home = () => {
  const { t } = useLanguage();
  const { L } = useTri();
  const [email, setEmail] = useState<string | null>(null);
  const [isOrga, setIsOrga] = useState(false);
  useEffect(() => {
    const load = async (uid?: string, mail?: string | null) => {
      setEmail(mail ?? null);
      if (!uid) { setIsOrga(false); return; }
      const { data } = await supabase.from("user_roles").select("role").eq("user_id", uid);
      setIsOrga((data || []).some((r) => r.role === "orga" || r.role === "admin"));
    };
    supabase.auth.getSession().then(({ data }) => load(data.session?.user.id, data.session?.user.email));
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => {
      setTimeout(() => load(s?.user.id, s?.user.email), 0);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-wrap gap-3 items-center justify-between">
            <div className="flex flex-wrap items-center gap-3">
              <Shield className="h-8 w-8 text-primary" />
              <h1 className="text-3xl font-bold text-primary">Barok GN</h1>
              <LanguageSwitcher />
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <p className="text-sm text-muted-foreground hidden lg:block mr-2">
                {t('header.subtitle')}
              </p>
              <Link to="/evenements">
                <Button variant="ghost" size="sm" className="gap-2">
                  <CalendarDays className="h-4 w-4" />
                  <span className="hidden sm:inline">{t('nav.events')}</span>
                </Button>
              </Link>
              <Link to="/mes-personnages">
                <Button variant="ghost" size="sm" className="gap-2">
                  <Scroll className="h-4 w-4" />
                  <span className="hidden sm:inline">{t('nav.myCharacters')}</span>
                </Button>
              </Link>
              <Link to="/mes-factions">
                <Button variant="ghost" size="sm" className="gap-2">
                  <Shield className="h-4 w-4" />
                  <span className="hidden sm:inline">{t('nav.myFactions')}</span>
                </Button>
              </Link>
              <GuideButton />
              {email ? (
                <>
                  {isOrga && (
                    <Link to="/orga">
                      <Button variant="ghost" size="sm">{L("Organisation", "Organisation", "Organisatie")}</Button>
                    </Link>
                  )}
                  <span className="hidden md:inline text-xs text-muted-foreground">{email}</span>
                  <Button variant="outline" size="sm" className="gap-2" onClick={() => supabase.auth.signOut()}>
                    <LogOut className="h-4 w-4" />
                    {L("Déconnexion", "Sign out", "Afmelden")}
                  </Button>
                </>
              ) : (
                <Link to="/auth">
                  <Button variant="outline" size="sm" className="gap-2">
                    <LogIn className="h-4 w-4" />
                    {t('nav.signIn')}
                  </Button>
                </Link>
              )}
            </div>
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
              <CardTitle>{t('features.sheets.title')}</CardTitle>
              <CardDescription>
                {t('features.sheets.description')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• {t('features.sheets.point1')}</li>
                <li>• {t('features.sheets.point2')}</li>
                <li>• {t('features.sheets.point3')}</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 bg-card/50 backdrop-blur-sm mt-16">
        <div className="container mx-auto px-4 py-8 text-center text-sm text-muted-foreground">
          <div className="text-left max-w-xl mb-6 text-xs leading-relaxed border-l-2 border-primary/60 pl-3">
            <p className="font-semibold text-foreground mb-1">{L("Protection des données (RGPD)", "Data protection (GDPR)", "Gegevensbescherming (AVG)")}</p>
            <p>{L(
              "Conformément au Règlement général sur la protection des données (RGPD – UE 2016/679), les données que vous encodez (adresse email, compte, fiches de faction et de personnage) sont traitées par Barok GN, association aux activités ludiques et sans but lucratif, uniquement pour l'organisation de ses jeux et événements. Elles ne sont ni vendues, ni cédées, ni utilisées à des fins commerciales. Elles sont conservées le temps nécessaire à ces activités. Vous pouvez à tout moment demander l'accès, la rectification ou l'effacement de vos données en écrivant à",
              "In accordance with the General Data Protection Regulation (GDPR – EU 2016/679), the data you enter (email address, account, faction and character sheets) is processed by Barok Larp, a non-profit organisation running recreational activities, solely to organise its games and events. It is never sold, transferred or used for commercial purposes, and is kept only as long as these activities require. You may request access to, correction or deletion of your data at any time by writing to",
              "Overeenkomstig de Algemene Verordening Gegevensbescherming (AVG – EU 2016/679) worden de gegevens die je invoert (e-mailadres, account, factie- en personagebladen) door Barok Larp, een vereniging zonder winstoogmerk met recreatieve activiteiten, uitsluitend verwerkt voor de organisatie van haar spellen en evenementen. Ze worden nooit verkocht, doorgegeven of voor commerciële doeleinden gebruikt en worden niet langer bewaard dan nodig voor deze activiteiten. Je kunt op elk moment inzage, verbetering of verwijdering van je gegevens vragen door te schrijven naar",
            )}{" "}<a href="mailto:steampunk.barok@gmail.com" className="text-primary hover:underline">steampunk.barok@gmail.com</a>.</p>
          </div>
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
