import { useState } from "react";
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

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password });
    setLoading(false);
    if (error) return toast.error(error.message);
    toast.success(L("Mot de passe mis à jour", "Password updated", "Wachtwoord bijgewerkt"));
    navigate("/mes-factions");
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md border-primary/30">
        <CardHeader>
          <CardTitle className="font-serif text-2xl">
            {L("Nouveau mot de passe", "New password", "Nieuw wachtwoord")}
          </CardTitle>
          <CardDescription>
            {L(
              "Choisissez un nouveau mot de passe pour votre compte de gestion.",
              "Choose a new password for your management account.",
              "Kies een nieuw wachtwoord voor je beheeraccount.",
            )}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={submit} className="space-y-3">
            <div>
              <Label>{L("Mot de passe (min. 6 caractères)", "Password (min. 6 characters)", "Wachtwoord (min. 6 tekens)")}</Label>
              <Input type="password" value={password} minLength={6} required onChange={(e) => setPassword(e.target.value)} />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {L("Enregistrer", "Save", "Opslaan")}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResetPassword;
