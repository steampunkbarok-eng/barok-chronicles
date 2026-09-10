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

const SITE_URL = Deno.env.get("SITE_URL") || "https://barok-steampunk.lovable.app";

const html = (faction: string, email: string, lien: string) => `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background:#f9f9f9;">
    <div style="background:#6B1836;color:#fff;padding:20px;text-align:center;border-radius:8px 8px 0 0;">
      <h1 style="margin:0;">Barok GN — Gérez votre faction en ligne</h1>
    </div>
    <div style="background:#fff;padding:30px;border-radius:0 0 8px 8px;">
      <p>Bonjour,</p>
      <p>Vous êtes le contact de la faction <strong>${faction}</strong>.</p>
      <p>Avec les règles 2026-2027, les Marques de destinée sont remplacées par <strong>deux origines</strong> et une
      <strong>Marque collective optionnelle</strong>. Pour mettre votre faction à jour, corriger une erreur et consulter
      les fiches de personnage rattachées, créez votre compte de gestion avec cette adresse email :
      <strong>${email}</strong>.</p>
      <p style="text-align:center;margin:30px 0;">
        <a href="${lien}" style="background:#6B1836;color:#fff;padding:14px 26px;border-radius:6px;text-decoration:none;font-weight:bold;">
          Créer mon compte de gestion
        </a>
      </p>
      <p style="font-size:13px;color:#666;">Si le bouton ne fonctionne pas, copiez ce lien : <br/>${lien}</p>
      <p>À bientôt dans l'univers de Barok !</p>
      <p><em>L'équipe Barok GN</em></p>
    </div>
  </div>`;

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const authHeader = req.headers.get("Authorization") || "";
    const admin = createClient(SUPABASE_URL, SERVICE_ROLE);

    // Vérifie que l'appelant est orga/admin
    const jwt = authHeader.replace("Bearer ", "");
    const { data: userData } = await admin.auth.getUser(jwt);
    const user = userData?.user;
    if (!user) {
      return new Response(JSON.stringify({ error: "Non authentifié" }), {
        status: 401,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }
    const { data: roles } = await admin.from("user_roles").select("role").eq("user_id", user.id);
    const isOrga = (roles || []).some((r: { role: string }) => r.role === "orga" || r.role === "admin");
    if (!isOrga) {
      return new Response(JSON.stringify({ error: "Réservé aux orgas" }), {
        status: 403,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    let siteUrl = SITE_URL;
    try {
      const body = await req.json();
      if (body?.siteUrl && /^https?:\/\//.test(body.siteUrl)) siteUrl = body.siteUrl.replace(/\/$/, "");
    } catch {
      // corps vide accepté
    }

    const { data: factions } = await admin.from("factions").select("nom, contact_email");
    const parEmail = new Map<string, string[]>();
    for (const f of factions || []) {
      const mail = (f.contact_email || "").trim().toLowerCase();
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail)) continue;
      parEmail.set(mail, [...(parEmail.get(mail) || []), f.nom]);
    }

    let envoyes = 0;
    let echecs = 0;
    for (const [mail, noms] of parEmail) {
      const lien = `${siteUrl}/auth?email=${encodeURIComponent(mail)}&next=${encodeURIComponent("/mes-factions")}`;
      try {
        const res = await resend.emails.send({
          from: "Barok GN <noreply@barok-steampunk.be>",
          to: [mail],
          subject: `Barok GN — Créez votre compte pour gérer ${noms.join(", ")}`,
          html: html(noms.join(", "), mail, lien),
        });
        if ((res as { data?: { id?: string } })?.data?.id) envoyes++;
        else echecs++;
      } catch (e) {
        console.error("Envoi échoué pour", mail, e);
        echecs++;
      }
    }

    return new Response(JSON.stringify({ success: true, envoyes, echecs, destinataires: parEmail.size }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error) {
    console.error("invite-faction-managers:", error);
    return new Response(JSON.stringify({ error: (error as Error).message }), {
      status: 500,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }
});
