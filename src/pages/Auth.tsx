import { useCallback, useEffect, useState } from "react";
import { useNavigate, Link, useSearchParams } from "react-router-dom";
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
  const { L, language: lang } = useTri();
  const [params] = useSearchParams();
  const next = params.get("next");
  const [email, setEmail] = useState(params.get("email") || "");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const goAfterAuth = useCallback(
    async (userId: string) => {
      if (next) {
        navigate(next);
        return;
      }
      const { data: roles } = await supabase.from("user_roles").select("role").eq("user_id", userId);
      const isOrga = (roles || []).some((r) => r.role === "orga" || r.role === "admin");
      navigate(isOrga ? "/orga" : "/mes-factions");
    },
    [navigate, next],
  );

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) goAfterAuth(data.session.user.id);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      if (session) setTimeout(() => goAfterAuth(session.user.id), 0);
    });
    return () => sub.subscription.unsubscribe();
  }, [goAfterAuth]);

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
      options: { emailRedirectTo: `${window.location.origin}${next || "/mes-factions"}` },
    });
    setLoading(false);
    if (error) toast.error(error.message);
    else
      toast.success(
        L(
          "Compte créé. Vérifie ta boîte mail, puis connecte-toi pour gérer ta faction.",
          "Account created. Check your inbox, then sign in to manage your faction.",
          "Account aangemaakt. Controleer je mailbox en meld je aan om je factie te beheren.",
        ),
      );
  };

  const handleReset = async () => {
    if (!email) {
      toast.error(L("Indique d'abord ton email", "Enter your email first", "Vul eerst je e-mail in"));
      return;
    }
    setLoading(true);
    const { error } = await supabase.functions.invoke("send-password-reset", {
      body: { email, lang, siteUrl: window.location.origin },
    });
    setLoading(false);
    if (error)
      toast.error(
        L(
          "Envoi impossible pour le moment, réessaie dans un instant.",
          "Could not send right now, please try again shortly.",
          "Verzenden lukt nu niet, probeer het zo meteen opnieuw.",
        ),
      );
    else
      toast.success(
        L(
          "Email de réinitialisation envoyé. Vérifie ta boîte mail (et les spams).",
          "Reset email sent. Check your inbox (and spam).",
          "E-mail verzonden. Controleer je mailbox (en spam).",
        ),
      );
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
    navigate(next || "/mes-factions");
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Link to="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-4">
          <ArrowLeft className="w-4 h-4 mr-1" /> {L("Retour", "Back", "Terug")}
        </Link>
        <Card className="border-primary/30">
          <CardHeader>
            <CardTitle className="font-serif text-2xl">
              {L("Compte Barok GN", "Barok GN account", "Barok GN-account")}
            </CardTitle>
            <CardDescription>
              {L(
                "Créez votre compte avec l'adresse email de contact de votre faction pour la créer, la corriger et suivre les fiches de personnage liées. Les orgas accèdent à la gestion complète.",
                "Create your account with your faction's contact email to create it, correct it and follow the linked character sheets. Organisers get full management access.",
                "Maak je account met het contact-e-mailadres van je factie om ze aan te maken, te corrigeren en de gekoppelde personagebladen te volgen. Organisatoren krijgen volledig beheer.",
              )}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue={params.get("email") ? "signup" : "signin"}>
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
                  <Button type="button" variant="link" className="w-full" onClick={handleReset}>
                    {L("Mot de passe oublié ?", "Forgot password?", "Wachtwoord vergeten?")}
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
