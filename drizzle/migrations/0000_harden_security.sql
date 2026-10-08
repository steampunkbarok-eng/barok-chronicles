-- Trigger-only functions: nobody needs to call them directly
REVOKE EXECUTE ON FUNCTION public.grant_admin_for_orga_emails() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.protect_personnage_self_update() FROM PUBLIC, anon, authenticated;
-- Role helpers: only signed-in users (used inside access rules)
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC, anon;
REVOKE EXECUTE ON FUNCTION public.is_orga(uuid) FROM PUBLIC, anon;
REVOKE EXECUTE ON FUNCTION public.is_faction_manager(text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO authenticated;
GRANT EXECUTE ON FUNCTION public.is_orga(uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION public.is_faction_manager(text) TO authenticated;
-- Visitors: no reading of private tables (submitting stays allowed)
REVOKE SELECT, UPDATE, DELETE ON public.personnages, public.factions, public.demandes_xp,
  public.evenement_participations, public.personnage_evolutions, public.user_roles FROM anon;
REVOKE INSERT ON public.demandes_xp, public.evenement_participations, public.personnage_evolutions, public.user_roles FROM anon;