CREATE OR REPLACE FUNCTION public.mettre_fiche_corbeille(_id uuid)
RETURNS boolean LANGUAGE plpgsql SECURITY DEFINER SET search_path TO 'public'
AS $function$
DECLARE f text;
BEGIN
  SELECT faction INTO f FROM public.personnages WHERE id = _id AND deleted_at IS NULL;
  IF NOT FOUND THEN RETURN false; END IF;
  IF NOT (public.is_orga(auth.uid()) OR public.is_faction_manager(f)) THEN
    RAISE EXCEPTION 'Accès refusé / Access denied / Toegang geweigerd' USING ERRCODE = '42501';
  END IF;
  UPDATE public.personnages SET deleted_at = now(), deleted_by = auth.jwt() ->> 'email' WHERE id = _id;
  RETURN true;
END;
$function$;
REVOKE ALL ON FUNCTION public.mettre_fiche_corbeille(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.mettre_fiche_corbeille(uuid) TO authenticated;