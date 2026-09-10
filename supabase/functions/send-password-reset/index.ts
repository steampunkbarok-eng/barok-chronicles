import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";
import { Resend } from "https://esm.sh/resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));
const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_ROLE = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

type Lang = "fr" | "en" | "nl";

const T: Record<Lang, { subject: string; title: string; intro: string; cta: string; fallback: string; ignore: string }> = {
  fr: {
    subject: "Barok GN — Réinitialisation de votre mot de passe",
    title: "Réinitialisation de mot de passe",
    intro: "Vous avez demandé à réinitialiser le mot de passe de votre compte Barok GN. Ce lien est valable 1 heure.",
    cta: "Choisir un nouveau mot de passe",
    fallback: "Si le bouton ne fonctionne pas, copiez ce lien :",
    ignore: "Si vous n'êtes pas à l'origine de cette demande, ignorez cet email.",
  },
  en: {
    subject: "Barok GN — Reset your password",
    title: "Password reset",
    intro: "You asked to reset the password of your Barok GN account. This link is valid for 1 hour.",
    cta: "Choose a new password",
    fallback: "If the button does not work, copy this link:",
    ignore: "If you did not request this, simply ignore this email.",
  },
  nl: {
    subject: "Barok GN — Stel je wachtwoord opnieuw in",
    title: "Wachtwoord opnieuw instellen",
    intro: "Je hebt gevraagd om het wachtwoord van je Barok GN-account opnieuw in te stellen. Deze link is 1 uur geldig.",
    cta: "Kies een nieuw wachtwoord",
    fallback: "Werkt de knop niet? Kopieer deze link:",
    ignore: "Heb je dit niet aangevraagd? Negeer deze e-mail.",
  },
};

const html = (lang: Lang, lien: string) => {
  const t = T[lang];
  return `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background:#f9f9f9;">
    <div style="background:#6B1836;color:#fff;padding:20px;text-align:center;border-radius:8px 8px 0 0;">
      <h1 style="margin:0;font-size:20px;">Barok GN — ${t.title}</h1>
    </div>
    <div style="background:#fff;padding:30px;border-radius:0 0 8px 8px;">
      <p>${t.intro}</p>
      <p style="text-align:center;margin:30px 0;">
        <a href="${lien}" style="background:#6B1836;color:#fff;padding:14px 26px;border-radius:6px;text-decoration:none;font-weight:bold;">
          ${t.cta}
        </a>
      </p>
      <p style="font-size:13px;color:#666;">${t.fallback}<br/>${lien}</p>
      <p style="font-size:13px;color:#666;">${t.ignore}</p>
      <p><em>L'équipe Barok GN</em></p>
    </div>
  </div>`;
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  const ok = () =>
    new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });

  try {
    const body = await req.json().catch(() => ({}));
    const email = String(body?.email || "").trim().toLowerCase();
    const lang: Lang = ["fr", "en", "nl"].includes(body?.lang) ? body.lang : "fr";
    const origin =
      typeof body?.siteUrl === "string" && /^https?:\/\//.test(body.siteUrl)
        ? body.siteUrl.replace(/\/$/, "")
        : "https://barok-steampunk.lovable.app";

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return new Response(JSON.stringify({ error: "Email invalide" }), {
        status: 400,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    const admin = createClient(SUPABASE_URL, SERVICE_ROLE);
    const redirectTo = `${origin}/reset-password`;

    const { data, error } = await admin.auth.admin.generateLink({
      type: "recovery",
      email,
      options: { redirectTo },
    });

    if (error || !data?.properties) {
      // On ne révèle pas si le compte existe
      console.warn("generateLink:", error?.message);
      return ok();
    }

    const hashed = data.properties.hashed_token;
    const lien = `${redirectTo}?token_hash=${encodeURIComponent(hashed)}&type=recovery`;

    const res = await resend.emails.send({
      from: "Barok GN <noreply@barok-steampunk.be>",
      to: [email],
      subject: T[lang].subject,
      html: html(lang, lien),
    });

    if ((res as { error?: unknown })?.error) {
      console.error("Resend:", (res as { error?: unknown }).error);
      return new Response(JSON.stringify({ error: "Envoi impossible" }), {
        status: 502,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    return ok();
  } catch (e) {
    console.error("send-password-reset:", e);
    return new Response(JSON.stringify({ error: (e as Error).message }), {
      status: 500,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }
});
