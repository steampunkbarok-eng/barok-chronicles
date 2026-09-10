import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { useTri } from "@/i18n/tri";

const ResetPassword = () => {
  const { L } = useTri();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [ready, setReady] = useState(false);
  const [invalid, setInvalid] = useState(false);
  const [resendEmail, setResendEmail] = useState("");

  useEffect(() => {
    let cancelled = false;

    const finish = (ok: boolean) => {
      if (cancelled) return;
      setReady(true);
      setInvalid(!ok);
    };

    const init = async () => {
      const url = new URL(window.location.href);
      const hash = new URLSearchParams(url.hash.replace(/^#/, ""));

      const errorDescription = url.searchParams.get("error_description") || hash.get("error_description");
      if (errorDescription) {
        toast.error(errorDescription);
        return finish(false);
      }

      // Lien PKCE : ?code=...
      const code = url.searchParams.get("code");
      if (code) {
        const { error } = await supabase.auth.exchangeCodeForSession(code);
        window.history.replaceState({}, "", window.location.pathname);
        if (error) {
          toast.error(error.message);
          return finish(false);
        }
        return finish(true);
      }

      // Lien implicite : #access_token=...&refresh_token=...
      const access_token = hash.get("access_token");
      const refresh_token = hash.get("refresh_token");
      if (access_token && refresh_token) {
        const { error } = await supabase.auth.setSession({ access_token, refresh_token });
        window.history.replaceState({}, "", window.location.pathname);
        if (error) {
          toast.error(error.message);
          return finish(false);
        }
        return finish(true);
      }

      // Lien token_hash : ?token_hash=...&type=recovery
      const token_hash = url.searchParams.get("token_hash") || hash.get("token_hash");
      if (token_hash) {
        const { error } = await supabase.auth.verifyOtp({ token_hash, type: "recovery" });
        window.history.replaceState({}, "", window.location.pathname);
        if (error) {
          toast.error(error.message);
          return finish(false);
        }
        return finish(true);
      }

      const { data } = await supabase.auth.getSession();
      finish(!!data.session);
    };

    const { data: sub } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "PASSWORD_RECOVERY" || session) {
        setReady(true);
        setInvalid(false);
      }
    });

    init();
    return () => {
      cancelled = true;
      sub.subscription.unsubscribe();
    };
  }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password });
    setLoading(false);
    if (error) return toast.error(error.message);
    toast.success(L("Mot de passe mis à jour", "Password updated", "Wachtwoord bijgewerkt"));
    navigate("/mes-factions");
  };

  const resend = async () => {
    if (!resendEmail) {
      return toast.error(L("Indique ton email", "Enter your email", "Vul je e-mail in"));
    }
    const { error } = await supabase.auth.resetPasswordForEmail(resendEmail, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    if (error) return toast.error(error.message);
    toast.success(L("Nouveau lien envoyé", "New link sent", "Nieuwe link verzonden"));
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md border-primary/30">
        <CardHeader>
          <CardTitle className="font-serif text-2xl">
            {L("Nouveau mot de passe", "New password", "Nieuw wachtwoord")}
          </CardTitle>
          <CardDescription>
            {invalid
              ? L(
                  "Ce lien de réinitialisation est invalide ou expiré. Demande-en un nouveau ci-dessous.",
                  "This reset link is invalid or expired. Request a new one below.",
                  "Deze herstellink is ongeldig of verlopen. Vraag hieronder een nieuwe aan.",
                )
              : L(
                  "Choisissez un nouveau mot de passe pour votre compte de gestion.",
                  "Choose a new password for your management account.",
                  "Kies een nieuw wachtwoord voor je beheeraccount.",
                )}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!ready && (
            <p className="text-sm text-muted-foreground">
              {L("Vérification du lien…", "Checking the link…", "Link controleren…")}
            </p>
          )}

          {ready && invalid && (
            <div className="space-y-3">
              <div>
                <Label>Email</Label>
                <Input type="email" value={resendEmail} onChange={(e) => setResendEmail(e.target.value)} />
              </div>
              <Button className="w-full" onClick={resend}>
                {L("Recevoir un nouveau lien", "Send me a new link", "Stuur mij een nieuwe link")}
              </Button>
            </div>
          )}

          {ready && !invalid && (
            <form onSubmit={submit} className="space-y-3">
              <div>
                <Label>{L("Mot de passe (min. 6 caractères)", "Password (min. 6 characters)", "Wachtwoord (min. 6 tekens)")}</Label>
                <Input type="password" value={password} minLength={6} required onChange={(e) => setPassword(e.target.value)} />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {L("Enregistrer", "Save", "Opslaan")}
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ResetPassword;
