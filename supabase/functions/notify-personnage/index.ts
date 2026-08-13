import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));
const ADMIN_EMAIL = "steampunk.barok@gmail.com";
const FROM = "Barok GN <noreply@barok-steampunk.be>";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

interface NotifyRequest {
  type: "statut" | "evolution";
  contactEmail: string;
  nomTI: string;
  nomTO?: string;
  faction?: string | null;
  statut?: "brouillon" | "soumis" | "valide" | "archive";
  evolution?: { type_evolution: string; description: string; valeur?: number | null };
  xpTotal?: number;
}

const statutLabels: Record<string, { titre: string; message: string }> = {
  brouillon: {
    titre: "Fiche remise en brouillon",
    message: "Ta fiche a été remise en brouillon par l'organisation. Elle sera réexaminée après modifications.",
  },
  soumis: {
    titre: "Fiche en attente de validation",
    message: "Ta fiche est enregistrée et en attente de validation par l'organisation.",
  },
  valide: {
    titre: "Fiche validée !",
    message: "Félicitations, ta fiche de personnage a été validée par l'organisation. Tu peux la retrouver dans « Mes personnages ».",
  },
  archive: {
    titre: "Fiche archivée",
    message: "Ta fiche de personnage a été archivée par l'organisation.",
  },
};

const wrap = (titre: string, body: string) => `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
    <div style="background-color: #6B1836; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
      <h1 style="margin: 0; font-size: 20px;">${titre}</h1>
    </div>
    <div style="background-color: white; padding: 30px; border-radius: 0 0 8px 8px;">${body}</div>
    <div style="text-align: center; padding: 20px; color: #999; font-size: 12px;">
      <p>Barok GN - Système de gestion de fiches pour JDRGN</p>
    </div>
  </div>`;

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const data: NotifyRequest = await req.json();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.contactEmail || "")) {
      return new Response(JSON.stringify({ error: "Adresse email invalide" }), {
        status: 400,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    let subject = "";
    let html = "";

    if (data.type === "statut") {
      const info = statutLabels[data.statut || "soumis"] || statutLabels.soumis;
      subject = `${info.titre} — ${data.nomTI} (Barok GN)`;
      html = wrap(
        info.titre,
        `<p>Bonjour,</p>
         <p>${info.message}</p>
         <div style="margin: 20px 0; padding: 15px; background: #f0f0f0; border-left: 4px solid #D4A851; border-radius: 4px;">
           <p style="margin:0;"><strong>Personnage :</strong> ${data.nomTI}${data.nomTO ? ` (${data.nomTO})` : ""}</p>
           ${data.faction ? `<p style="margin:5px 0 0;"><strong>Faction :</strong> ${data.faction}</p>` : ""}
           <p style="margin:5px 0 0;"><strong>Statut :</strong> ${data.statut}</p>
         </div>
         <p style="margin-top:30px;">À bientôt dans l'univers de Barok !</p>
         <p><em>L'équipe Barok GN</em></p>`
      );
    } else {
      const evo = data.evolution!;
      subject = `Évolution de personnage — ${data.nomTI} (Barok GN)`;
      html = wrap(
        "Nouvelle évolution enregistrée",
        `<p>Bonjour,</p>
         <p>L'organisation a enregistré une évolution pour ton personnage <strong>${data.nomTI}</strong>.</p>
         <div style="margin: 20px 0; padding: 15px; background: #f0f0f0; border-left: 4px solid #D4A851; border-radius: 4px;">
           <p style="margin:0;"><strong>Type :</strong> ${evo.type_evolution}</p>
           <p style="margin:5px 0 0;"><strong>Détail :</strong> ${evo.description}</p>
           ${evo.valeur ? `<p style="margin:5px 0 0;"><strong>Valeur :</strong> ${evo.valeur}</p>` : ""}
           ${typeof data.xpTotal === "number" ? `<p style="margin:5px 0 0;"><strong>XP total :</strong> ${data.xpTotal}</p>` : ""}
         </div>
         <p style="margin-top:30px;">À bientôt dans l'univers de Barok !</p>
         <p><em>L'équipe Barok GN</em></p>`
      );
    }

    const results = { userEmail: null as any, fallback: null as any };

    try {
      results.userEmail = await resend.emails.send({
        from: FROM,
        to: [data.contactEmail],
        subject,
        html,
      });
      console.log("Notification sent:", JSON.stringify(results.userEmail));
    } catch (e) {
      console.error("Notification send failed:", e);
    }

    if (!results.userEmail?.data?.id) {
      try {
        results.fallback = await resend.emails.send({
          from: FROM,
          to: [ADMIN_EMAIL],
          subject: `⚠️ À TRANSFÉRER à ${data.contactEmail} - ${subject}`,
          html,
        });
      } catch (e) {
        console.error("Fallback failed:", e);
      }
    }

    return new Response(JSON.stringify({ success: true, ...results }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: any) {
    console.error("Error in notify-personnage:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }
};

serve(handler);
