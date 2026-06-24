
CREATE POLICY "Users can read their own characters"
ON public.personnages
FOR SELECT
TO authenticated
USING (lower(email) = lower((auth.jwt() ->> 'email')));

CREATE POLICY "Users can read evolutions of their own characters"
ON public.personnage_evolutions
FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.personnages p
    WHERE p.id = personnage_evolutions.personnage_id
      AND lower(p.email) = lower((auth.jwt() ->> 'email'))
  )
);
