-- Vue publique qui respecte les permissions de l'utilisateur
CREATE OR REPLACE VIEW public.factions_publiques
WITH (security_invoker = on) AS
  SELECT id, nom, origines, titres, marque_collective, marque_collective_detail, statut
  FROM public.factions;

-- Accès limité aux colonnes non sensibles uniquement
GRANT SELECT (id, nom, origines, titres, marque_collective, marque_collective_detail, statut)
  ON public.factions TO anon, authenticated;

CREATE POLICY "Public can list faction basics"
ON public.factions FOR SELECT
TO anon, authenticated
USING (true);

GRANT SELECT ON public.factions_publiques TO anon, authenticated;