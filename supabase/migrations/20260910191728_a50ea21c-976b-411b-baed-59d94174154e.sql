DROP POLICY IF EXISTS "Public can list faction basics" ON public.factions;
DROP VIEW IF EXISTS public.factions_publiques;
REVOKE SELECT ON public.factions FROM anon;

CREATE OR REPLACE FUNCTION public.liste_factions_publiques()
RETURNS TABLE (
  id uuid,
  nom text,
  origines text[],
  titres text[],
  marque_collective text,
  marque_collective_detail text,
  statut text
)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT f.id, f.nom, f.origines, f.titres, f.marque_collective, f.marque_collective_detail, f.statut
  FROM public.factions f
  ORDER BY f.nom
$$;

REVOKE ALL ON FUNCTION public.liste_factions_publiques() FROM public;
GRANT EXECUTE ON FUNCTION public.liste_factions_publiques() TO anon, authenticated;