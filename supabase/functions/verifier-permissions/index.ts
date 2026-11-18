import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient, SupabaseClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const URL_ = Deno.env.get("SUPABASE_URL")!;
const SERVICE = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const ANON = Deno.env.get("SUPABASE_ANON_KEY")!;
const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};
const json = (b: unknown, s = 200) => new Response(JSON.stringify(b), { status: s, headers: { ...cors, "Content-Type": "application/json" } });

type Res = { role: string; action: string; attendu: boolean; obtenu: boolean; ok: boolean; detail?: string };

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: cors });
  const admin = createClient(URL_, SERVICE, { auth: { persistSession: false } });
  const jwt = (req.headers.get("Authorization") || "").replace("Bearer ", "");
  const { data: u } = await admin.auth.getUser(jwt);
  if (!u?.user) return json({ error: "unauthorized" }, 401);
  const { data: r } = await admin.from("user_roles").select("role").eq("user_id", u.user.id);
  if (!(r || []).some((x) => x.role === "orga" || x.role === "admin")) return json({ error: "forbidden" }, 403);

  const tag = crypto.randomUUID().slice(0, 8);
  const pwd = crypto.randomUUID() + "Aa1!";
  const mail = (k: string) => `permtest-${k}-${tag}@example.com`;
  const userIds: string[] = [];
  const factionNames = [`__TEST_PERM_${tag}`, `__TEST_PERM_AUTRE_${tag}`];
  const results: Res[] = [];
  const add = (role: string, action: string, attendu: boolean, obtenu: boolean, detail?: string) =>
    results.push({ role, action, attendu, obtenu, ok: attendu === obtenu, detail });

  const client = async (k: string | null): Promise<SupabaseClient> => {
    const c = createClient(URL_, ANON, { auth: { persistSession: false, autoRefreshToken: false } });
    if (k) {
      const { error } = await c.auth.signInWithPassword({ email: mail(k), password: pwd });
      if (error) throw new Error(`login ${k}: ${error.message}`);
    }
    return c;
  };
  const row = async (id: string) => (await admin.from("personnages").select("*").eq("id", id).maybeSingle()).data;
  const canRead = async (c: SupabaseClient, table: string, id: string) => {
    const { data } = await c.from(table).select("id").eq("id", id);
    return (data || []).length > 0;
  };

  try {
    for (const k of ["orga", "gestionnaire", "joueur", "exterieur"]) {
      const { data, error } = await admin.auth.admin.createUser({ email: mail(k), password: pwd, email_confirm: true });
      if (error) throw new Error(`create ${k}: ${error.message}`);
      userIds.push(data.user.id);
      if (k === "orga") await admin.from("user_roles").insert({ user_id: data.user.id, role: "orga" });
    }
    const { data: fac } = await admin.from("factions").insert({ nom: factionNames[0], contact_email: mail("gestionnaire"), origines: [] }).select().single();
    const { data: fac2 } = await admin.from("factions").insert({ nom: factionNames[1], contact_email: mail("exterieur"), origines: [] }).select().single();
    const mk = async (faction: string, email: string) =>
      (await admin.from("personnages").insert({ nom: "Test", prenom: tag, faction, espece: "Humain", email, data: {} }).select().single()).data!;
    const p = await mk(factionNames[0], mail("joueur"));
    const pAutre = await mk(factionNames[1], mail("exterieur"));

    const visiteur = await client(null);
    const joueur = await client("joueur");
    const gest = await client("gestionnaire");
    const ext = await client("exterieur");
    const orga = await client("orga");

    // Visiteur sans compte
    add("visiteur", "Consulter une fiche", false, await canRead(visiteur, "personnages", p.id));
    add("visiteur", "Consulter une faction", false, await canRead(visiteur, "factions", fac.id));

    // Joueur
    add("joueur", "Consulter sa propre fiche", true, await canRead(joueur, "personnages", p.id));
    add("joueur", "Consulter la fiche d'une autre faction", false, await canRead(joueur, "personnages", pAutre.id));
    await joueur.from("personnages").update({ prenom: tag + "-j" }).eq("id", p.id);
    add("joueur", "Modifier sa propre fiche", true, (await row(p.id))?.prenom === tag + "-j");
    await joueur.from("personnages").update({ statut: "valide" }).eq("id", p.id);
    add("joueur", "Valider sa propre fiche", false, (await row(p.id))?.statut === "valide");
    await joueur.from("personnages").update({ xp: 50 }).eq("id", p.id);
    add("joueur", "S'attribuer de l'XP", false, (await row(p.id))?.xp === 50);
    await joueur.from("personnages").update({ email: mail("x") }).eq("id", p.id);
    add("joueur", "Changer l'email de la fiche", false, (await row(p.id))?.email === mail("x"));
    await joueur.from("personnages").update({ faction: factionNames[1] }).eq("id", p.id);
    add("joueur", "Changer la faction de la fiche", false, (await row(p.id))?.faction === factionNames[1]);
    await joueur.from("personnages").delete().eq("id", p.id);
    add("joueur", "Supprimer définitivement sa fiche", false, !(await row(p.id)));

    // Extérieur (autre faction)
    add("autre gestionnaire", "Consulter une fiche d'une autre faction", false, await canRead(ext, "personnages", p.id));
    await ext.from("personnages").update({ statut: "valide" }).eq("id", p.id);
    add("autre gestionnaire", "Valider une fiche d'une autre faction", false, (await row(p.id))?.statut === "valide");
    await ext.from("factions").update({ description_courte: "pirate" }).eq("id", fac.id);
    add("autre gestionnaire", "Modifier une autre faction", false,
      (await admin.from("factions").select("description_courte").eq("id", fac.id).single()).data?.description_courte === "pirate");

    // Gestionnaire de faction
    add("gestionnaire", "Consulter sa faction", true, await canRead(gest, "factions", fac.id));
    add("gestionnaire", "Consulter les fiches de sa faction", true, await canRead(gest, "personnages", p.id));
    add("gestionnaire", "Consulter une autre faction", false, await canRead(gest, "factions", fac2.id));
    await gest.from("factions").update({ description_courte: "ok" }).eq("id", fac.id);
    add("gestionnaire", "Modifier sa faction (origines, marque…)", true,
      (await admin.from("factions").select("description_courte").eq("id", fac.id).single()).data?.description_courte === "ok");
    await gest.from("factions").update({ contact_email: mail("y") }).eq("id", fac.id);
    add("gestionnaire", "Changer l'email de sa faction", false,
      (await admin.from("factions").select("contact_email").eq("id", fac.id).single()).data?.contact_email === mail("y"));
    await gest.from("personnages").update({ prenom: tag + "-g" }).eq("id", p.id);
    add("gestionnaire", "Corriger une fiche de sa faction", true, (await row(p.id))?.prenom === tag + "-g");
    await gest.from("personnages").update({ statut: "valide" }).eq("id", p.id);
    add("gestionnaire", "Valider une fiche de sa faction", true, (await row(p.id))?.statut === "valide");
    await gest.from("personnages").update({ email: mail("x") }).eq("id", p.id);
    add("gestionnaire", "Changer l'email d'une fiche", false, (await row(p.id))?.email === mail("x"));
    await gest.from("personnages").update({ faction: factionNames[1] }).eq("id", p.id);
    add("gestionnaire", "Changer la faction d'une fiche", false, (await row(p.id))?.faction === factionNames[1]);
    await gest.from("personnages").update({ statut: "archive" }).eq("id", p.id);
    add("gestionnaire", "Archiver une fiche de sa faction", true, (await row(p.id))?.statut === "archive");
    await gest.from("personnages").update({ deleted_at: new Date().toISOString(), deleted_by: mail("gestionnaire") }).eq("id", p.id);
    add("gestionnaire", "Mettre une fiche à la corbeille", true, !!(await row(p.id))?.deleted_at);
    add("gestionnaire", "Voir une fiche à la corbeille", false, await canRead(gest, "personnages", p.id));
    await gest.from("personnages").update({ deleted_at: null }).eq("id", p.id);
    add("gestionnaire", "Restaurer depuis la corbeille", false, !(await row(p.id))?.deleted_at);

    // Organisation
    add("organisation", "Voir une fiche à la corbeille", true, await canRead(orga, "personnages", p.id));
    await orga.from("personnages").update({ deleted_at: null, deleted_by: null }).eq("id", p.id);
    add("organisation", "Restaurer depuis la corbeille", true, !(await row(p.id))?.deleted_at);
    await orga.from("personnages").update({ statut: "valide" }).eq("id", p.id);
    add("organisation", "Valider une fiche", true, (await row(p.id))?.statut === "valide");
    await orga.from("personnages").update({ email: mail("nouveau") }).eq("id", p.id);
    const apresEmail = await row(p.id);
    add("organisation", "Changer l'email d'une fiche (sans invalider)", true, apresEmail?.email === mail("nouveau") && apresEmail?.statut === "valide");
    await orga.from("personnages").update({ faction: factionNames[1] }).eq("id", p.id);
    const apresFac = await row(p.id);
    add("organisation", "Changer la faction d'une fiche (sans invalider)", true, apresFac?.faction === factionNames[1] && apresFac?.statut === "valide");
    await orga.from("factions").update({ contact_email: mail("z") }).eq("id", fac.id);
    add("organisation", "Changer l'email d'une faction", true,
      (await admin.from("factions").select("contact_email").eq("id", fac.id).single()).data?.contact_email === mail("z"));
    await orga.from("personnages").update({ statut: "archive" }).eq("id", p.id);
    add("organisation", "Archiver une fiche", true, (await row(p.id))?.statut === "archive");
    await orga.from("personnages").delete().eq("id", p.id);
    add("organisation", "Supprimer définitivement une fiche", true, !(await row(p.id)));

    return json({ results });
  } catch (e) {
    return json({ error: String(e), results }, 500);
  } finally {
    await admin.from("personnages").delete().in("faction", factionNames);
    await admin.from("personnages").delete().like("email", `permtest-%-${tag}@example.com`);
    await admin.from("factions").delete().in("nom", factionNames);
    for (const id of userIds) {
      await admin.from("user_roles").delete().eq("user_id", id);
      await admin.auth.admin.deleteUser(id);
    }
  }
});
