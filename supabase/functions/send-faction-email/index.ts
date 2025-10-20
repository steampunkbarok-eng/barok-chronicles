import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface FactionEmailRequest {
  factionName: string;
  contactEmail: string;
  marques: { total: number; disponibles: number };
  propriete: string | null;
  batiment: { type: string; nom: string; avantages: string } | null;
  titres: string[];
  descriptionCourte: string;
  background: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const data: FactionEmailRequest = await req.json();

    // Validation de l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.contactEmail)) {
      return new Response(
        JSON.stringify({ error: "Adresse email invalide" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Construction du contenu HTML de l'email
    const emailContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
        <div style="background-color: #6B1836; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
          <h1 style="margin: 0;">Nouvelle Faction Créée - Barok GN</h1>
        </div>
        
        <div style="background-color: white; padding: 30px; border-radius: 0 0 8px 8px;">
          <h2 style="color: #6B1836; border-bottom: 2px solid #D4A851; padding-bottom: 10px;">${data.factionName}</h2>
          
          <div style="margin: 20px 0;">
            <h3 style="color: #6B1836; margin-bottom: 10px;">📊 Marques de Destinée</h3>
            <p style="margin: 5px 0;"><strong>Total:</strong> ${data.marques.total}</p>
            <p style="margin: 5px 0;"><strong>Disponibles:</strong> ${data.marques.disponibles}</p>
          </div>

          ${data.propriete ? `
          <div style="margin: 20px 0;">
            <h3 style="color: #6B1836; margin-bottom: 10px;">🏰 Propriété Terrienne</h3>
            <p style="margin: 5px 0;">${data.propriete}</p>
          </div>
          ` : ''}

          ${data.batiment ? `
          <div style="margin: 20px 0;">
            <h3 style="color: #6B1836; margin-bottom: 10px;">🏛️ ${data.batiment.type}</h3>
            <p style="margin: 5px 0;"><strong>${data.batiment.nom}</strong></p>
            <p style="margin: 5px 0; padding: 10px; background-color: #f0f0f0; border-radius: 4px;">${data.batiment.avantages}</p>
          </div>
          ` : ''}

          ${data.titres.length > 0 ? `
          <div style="margin: 20px 0;">
            <h3 style="color: #6B1836; margin-bottom: 10px;">🎖️ Titres/Carrières</h3>
            <ul style="list-style-type: none; padding: 0;">
              ${data.titres.map(titre => `<li style="margin: 5px 0; padding: 5px 10px; background-color: #f0f0f0; border-left: 3px solid #D4A851;">• ${titre}</li>`).join('')}
            </ul>
          </div>
          ` : ''}

          ${data.descriptionCourte ? `
          <div style="margin: 20px 0;">
            <h3 style="color: #6B1836; margin-bottom: 10px;">📝 Description</h3>
            <p style="margin: 5px 0; font-style: italic;">${data.descriptionCourte}</p>
          </div>
          ` : ''}

          ${data.background ? `
          <div style="margin: 20px 0;">
            <h3 style="color: #6B1836; margin-bottom: 10px;">📖 Background Complet</h3>
            <p style="margin: 5px 0; white-space: pre-wrap;">${data.background}</p>
          </div>
          ` : ''}

          <div style="margin: 30px 0; padding: 20px; background-color: #f0f0f0; border-radius: 4px; text-align: center;">
            <p style="margin: 0; color: #666;">Email de contact: <strong>${data.contactEmail}</strong></p>
          </div>
        </div>

        <div style="text-align: center; padding: 20px; color: #999; font-size: 12px;">
          <p>Barok GN - Système de gestion de fiches pour JDRGN</p>
          <p>Cette faction a été créée via le système en ligne</p>
        </div>
      </div>
    `;

    // Envoi de l'email à l'admin
    const adminEmail = await resend.emails.send({
      from: "Barok GN <onboarding@resend.dev>",
      to: ["steampunk.barok@gmail.com"],
      subject: `Nouvelle Faction: ${data.factionName}`,
      html: emailContent,
    });

    console.log("Admin email sent successfully:", adminEmail);

    // Envoi de l'email de confirmation au créateur
    const userEmail = await resend.emails.send({
      from: "Barok GN <onboarding@resend.dev>",
      to: [data.contactEmail],
      subject: `Confirmation de création - Faction ${data.factionName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
          <div style="background-color: #6B1836; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
            <h1 style="margin: 0;">Votre Faction a été créée !</h1>
          </div>
          
          <div style="background-color: white; padding: 30px; border-radius: 0 0 8px 8px;">
            <p>Bonjour,</p>
            <p>Votre faction <strong>${data.factionName}</strong> a été créée avec succès dans le système Barok GN.</p>
            
            <p>Les organisateurs ont reçu votre demande et vous contacteront si nécessaire.</p>
            
            <p>Vous pouvez maintenant créer des personnages liés à cette faction.</p>
            
            <p style="margin-top: 30px;">À bientôt dans l'univers de Barok !</p>
            <p><em>L'équipe Barok GN</em></p>
          </div>

          <div style="text-align: center; padding: 20px; color: #999; font-size: 12px;">
            <p>Barok GN - Système de gestion de fiches pour JDRGN</p>
          </div>
        </div>
      `,
    });

    console.log("User confirmation email sent successfully:", userEmail);

    return new Response(
      JSON.stringify({ success: true, adminEmail, userEmail }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );
  } catch (error: any) {
    console.error("Error in send-faction-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
