import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const ADMIN_EMAIL = "steampunk.barok@gmail.com";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

interface CharacterEmailRequest {
  nomTO: string;
  nomTI: string;
  contactEmail: string;
  faction: string;
  espece: string;
  origine: string;
  pv: number;
  pa: number;
  scoreBagarre: number;
  abime: number;
  abimeMax: number;
  pierresDeVie: number;
  foi: number;
  competences: { nom: string; cout: number }[];
  sorts: { niv1: number; niv2: number; niv3: number; niv4: number };
  pointsCreation: number;
  pointsDepenses: number;
  characterSheetHTML: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const data: CharacterEmailRequest = await req.json();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.contactEmail)) {
      return new Response(
        JSON.stringify({ error: "Adresse email invalide" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const competencesList = data.competences.length > 0
      ? data.competences.map(c => `<li style="margin: 3px 0; padding: 5px 10px; background: #f0f0f0; border-left: 3px solid #D4A851;">• ${c.nom} (${c.cout} pts)</li>`).join('')
      : '<li style="margin: 3px 0; padding: 5px 10px; color: #999;">Aucune compétence</li>';

    const sortsSection = (data.sorts.niv1 > 0 || data.sorts.niv2 > 0 || data.sorts.niv3 > 0 || data.sorts.niv4 > 0)
      ? `<div style="margin: 20px 0;">
          <h3 style="color: #6B1836;">✨ Sortilèges</h3>
          <p>Niv.1: ${data.sorts.niv1} | Niv.2: ${data.sorts.niv2} | Niv.3: ${data.sorts.niv3} | Niv.4: ${data.sorts.niv4}</p>
        </div>`
      : '';

    // Email admin avec détails complets (résumé pour l'admin)
    const adminHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
        <div style="background-color: #6B1836; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
          <h1 style="margin: 0;">Nouveau Personnage Créé - Barok GN</h1>
        </div>
        <div style="background-color: white; padding: 30px; border-radius: 0 0 8px 8px;">
          <h2 style="color: #6B1836; border-bottom: 2px solid #D4A851; padding-bottom: 10px;">${data.nomTI} (${data.nomTO})</h2>
          <div style="margin: 20px 0;">
            <h3 style="color: #6B1836;">🧬 Espèce & Faction</h3>
            <p><strong>Espèce:</strong> ${data.espece} | <strong>Faction:</strong> ${data.faction || 'Aucune'}</p>
            ${data.origine ? `<p><strong>Origine:</strong> ${data.origine}</p>` : ''}
          </div>
          <div style="margin: 20px 0;">
            <h3 style="color: #6B1836;">📊 Statistiques</h3>
            <p><strong>PV/loc:</strong> ${data.pv} | <strong>PA/loc:</strong> ${data.pa} | <strong>Bagarre:</strong> ${data.scoreBagarre}</p>
            <p><strong>Abîme:</strong> ${data.abime}/${data.abimeMax} | <strong>Pierres de Vie:</strong> ${data.pierresDeVie} | <strong>Foi:</strong> ${data.foi}</p>
            <p><strong>Points:</strong> ${data.pointsDepenses}/${data.pointsCreation} utilisés</p>
          </div>
          <div style="margin: 20px 0;">
            <h3 style="color: #6B1836;">⚔️ Compétences</h3>
            <ul style="list-style: none; padding: 0;">${competencesList}</ul>
          </div>
          ${sortsSection}
          <div style="margin: 30px 0; padding: 20px; background: #f0f0f0; border-radius: 4px; text-align: center;">
            <p style="margin: 0; color: #666;">Email de contact: <strong>${data.contactEmail}</strong></p>
          </div>
        </div>
        <div style="text-align: center; padding: 20px; color: #999; font-size: 12px;">
          <p>Barok GN - Système de gestion de fiches pour JDRGN</p>
        </div>
      </div>
    `;

    // Email joueur : la fiche de personnage complète en HTML
    const userHtml = data.characterSheetHTML
      ? `
      <div style="font-family: Arial, sans-serif; max-width: 700px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
        <div style="background-color: #6B1836; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
          <h1 style="margin: 0;">Votre Fiche de Personnage - Barok GN</h1>
        </div>
        <div style="background-color: white; padding: 20px; border-radius: 0 0 8px 8px;">
          <p>Bonjour,</p>
          <p>Votre personnage <strong>${data.nomTI}</strong> (${data.nomTO}) a été créé avec succès. Vous trouverez ci-dessous votre fiche de personnage complète.</p>
          <div style="margin: 20px 0; padding: 15px; background: #FFF3CD; border: 1px solid #FFD700; border-radius: 8px;">
            <p style="margin: 0; font-weight: bold;">📋 Important :</p>
            <p style="margin: 5px 0 0;">Nous vous recommandons d'imprimer cette fiche depuis votre email (Fichier → Imprimer ou Ctrl+P) pour obtenir votre fiche au format PDF.</p>
          </div>
        </div>
        <div style="margin-top: 20px; border: 1px solid #ddd; border-radius: 8px; overflow: hidden;">
          ${data.characterSheetHTML}
        </div>
        <div style="text-align: center; padding: 20px; color: #999; font-size: 12px;">
          <p>Barok GN - Système de gestion de fiches pour JDRGN</p>
          <p>À bientôt dans l'univers de Barok !</p>
        </div>
      </div>
      `
      : `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
        <div style="background-color: #6B1836; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
          <h1 style="margin: 0;">Votre Personnage a été créé !</h1>
        </div>
        <div style="background-color: white; padding: 30px; border-radius: 0 0 8px 8px;">
          <p>Bonjour,</p>
          <p>Votre personnage <strong>${data.nomTI}</strong> (${data.nomTO}) a été créé avec succès dans le système Barok GN.</p>
          <p>Les organisateurs ont reçu les détails de votre personnage et vous contacteront si nécessaire.</p>
          <p style="margin-top: 30px;">À bientôt dans l'univers de Barok !</p>
          <p><em>L'équipe Barok GN</em></p>
        </div>
      </div>
      `;

    const results = { adminEmail: null as any, userEmail: null as any, userEmailFallback: null as any };

    // 1. Email admin
    try {
      results.adminEmail = await resend.emails.send({
        from: "Barok GN <noreply@steampunk-barok.fr>",
        to: [ADMIN_EMAIL],
        subject: `Nouveau Personnage: ${data.nomTI} (${data.nomTO})`,
        html: adminHtml,
      });
      console.log("Admin email sent:", JSON.stringify(results.adminEmail));
    } catch (e) {
      console.error("Admin email failed:", e);
    }

    // 2. Tenter l'envoi direct au joueur
    try {
      results.userEmail = await resend.emails.send({
        from: "Barok GN <onboarding@resend.dev>",
        to: [data.contactEmail],
        subject: `Votre Fiche de Personnage - ${data.nomTI} (Barok GN)`,
        html: userHtml,
      });
      console.log("User email sent:", JSON.stringify(results.userEmail));
    } catch (e) {
      console.error("User email direct send failed, using fallback:", e);
    }

    // 3. Fallback si l'envoi direct échoue
    const userEmailFailed = !results.userEmail?.data?.id;
    if (userEmailFailed) {
      try {
        results.userEmailFallback = await resend.emails.send({
          from: "Barok GN <onboarding@resend.dev>",
          to: [ADMIN_EMAIL],
          subject: `⚠️ À TRANSFÉRER à ${data.contactEmail} - Fiche Personnage ${data.nomTI}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 700px; margin: 0 auto; padding: 20px;">
              <div style="background: #FFF3CD; border: 1px solid #FFD700; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
                <p style="margin: 0; font-weight: bold;">⚠️ L'envoi direct à ${data.contactEmail} a échoué.</p>
                <p style="margin: 5px 0 0;">Merci de transférer cet email avec la fiche de personnage au joueur.</p>
              </div>
              ${userHtml}
            </div>
          `,
        });
        console.log("Fallback email sent to admin:", JSON.stringify(results.userEmailFallback));
      } catch (e) {
        console.error("Fallback email also failed:", e);
      }
    }

    return new Response(
      JSON.stringify({ success: true, ...results }),
      { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  } catch (error: any) {
    console.error("Error in send-character-email:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

serve(handler);
