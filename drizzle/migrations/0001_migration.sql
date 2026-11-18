DROP POLICY IF EXISTS "Anyone can submit a character" ON public.personnages;
CREATE POLICY "Submit a character with safe defaults" ON public.personnages
FOR INSERT TO anon, authenticated
WITH CHECK (
  statut = 'soumis'::personnage_statut AND xp = 0 AND deleted_at IS NULL AND deleted_by IS NULL AND notes_orga IS NULL
  AND length(trim(email)) > 3 AND length(trim(nom)) > 0
  AND (auth.uid() IS NULL OR public.is_orga(auth.uid()) OR lower(email) = lower(auth.jwt() ->> 'email'))
);

DROP POLICY IF EXISTS "Anyone can create factions" ON public.factions;
CREATE POLICY "Signed-in users can create their own faction" ON public.factions
FOR INSERT TO authenticated
WITH CHECK (
  public.is_orga(auth.uid())
  OR (lower(contact_email) = lower(auth.jwt() ->> 'email') AND coalesce(statut,'active') = 'active')
);