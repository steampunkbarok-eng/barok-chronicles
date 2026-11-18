DROP POLICY IF EXISTS "Submit a character with safe defaults" ON public.personnages;
CREATE POLICY "Submit a character with safe defaults" ON public.personnages
FOR INSERT TO anon, authenticated
WITH CHECK (
  statut = 'soumis'::personnage_statut AND xp = 0 AND deleted_at IS NULL AND deleted_by IS NULL AND notes_orga IS NULL
  AND length(trim(email)) > 3 AND length(trim(nom)) > 0
  AND CASE
    WHEN auth.uid() IS NULL THEN nullif(trim(coalesce(faction,'')),'') IS NULL
    ELSE (public.is_orga(auth.uid()) OR lower(email) = lower(auth.jwt() ->> 'email'))
  END
);