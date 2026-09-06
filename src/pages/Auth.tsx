import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";
import { useTri } from "@/i18n/tri";

const Auth = () => {
  const navigate = useNavigate();
  const { L } = useTri();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate("/orga");
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      if (session) navigate("/orga");
    });
    return () => sub.subscription.unsubscribe();
  }, [navigate]);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) toast.error(error.message);
    else toast.success(L("Connexion réussie", "Signed in", "Aangemeld"));
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { emailRedirectTo: `${window.location.origin}/orga` },
    });
    setLoading(false);
    if (error) toast.error(error.message);
    else toast.success(L("Compte créé. Un orga doit t'attribuer le rôle pour accéder à la gestion.", "Account created. An organiser must grant you the role to access management.", "Account aangemaakt. Een organisator moet je de rol toekennen voor toegang tot het beheer."));
  };

  const handleGoogle = async () => {
    setLoading(true);
    const result = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: window.location.origin,
    });
    if (result.error) {
      toast.error(L("Erreur Google : ", "Google error: ", "Google-fout: ") + (result.error as Error).message);
      setLoading(false);
      return;
    }
    if (result.redirected) return;
    navigate("/orga");
  };


  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Link to="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-4">
          <ArrowLeft className="w-4 h-4 mr-1" /> {L("Retour", "Back", "Terug")}
        </Link>
        <Card className="border-primary/30">
          <CardHeader>
            <CardTitle className="font-serif text-2xl">{L("Accès Orga", "Organiser access", "Toegang organisatie")}</CardTitle>
            <CardDescription>{L("Connecte-toi pour gérer les personnages et factions.", "Sign in to manage characters and factions.", "Meld je aan om personages en facties te beheren.")}</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="signin">
              <TabsList className="grid w-full grid-cols-2 mb-4">
                <TabsTrigger value="signin">{L("Connexion", "Sign in", "Aanmelden")}</TabsTrigger>
                <TabsTrigger value="signup">{L("Créer un compte", "Create an account", "Account aanmaken")}</TabsTrigger>
              </TabsList>
              <TabsContent value="signin">
                <form onSubmit={handleSignIn} className="space-y-3">
                  <div>
                    <Label>Email</Label>
                    <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                  </div>
                  <div>
                    <Label>{L("Mot de passe", "Password", "Wachtwoord")}</Label>
                    <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                  </div>
                  <Button type="submit" className="w-full" disabled={loading}>
                    {L("Se connecter", "Sign in", "Aanmelden")}
                  </Button>
                </form>
              </TabsContent>
              <TabsContent value="signup">
                <form onSubmit={handleSignUp} className="space-y-3">
                  <div>
                    <Label>Email</Label>
                    <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                  </div>
                  <div>
                    <Label>{L("Mot de passe (min. 6 caractères)", "Password (min. 6 characters)", "Wachtwoord (min. 6 tekens)")}</Label>
                    <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6} />
                  </div>
                  <Button type="submit" className="w-full" disabled={loading}>
                    {L("Créer le compte", "Create account", "Account aanmaken")}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
            <div className="my-4 flex items-center gap-2 text-xs text-muted-foreground">
              <div className="flex-1 h-px bg-border" /> {L("OU", "OR", "OF")} <div className="flex-1 h-px bg-border" />
            </div>
            <Button variant="outline" className="w-full" onClick={handleGoogle} disabled={loading}>
              {L("Continuer avec Google", "Continue with Google", "Doorgaan met Google")}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Auth;
