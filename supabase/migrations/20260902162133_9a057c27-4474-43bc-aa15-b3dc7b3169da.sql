CREATE POLICY "Owners can update their own faction"
ON public.factions
FOR UPDATE
TO authenticated
USING (lower(contact_email) = lower((auth.jwt() ->> 'email')))
WITH CHECK (lower(contact_email) = lower((auth.jwt() ->> 'email')));

GRANT SELECT, UPDATE ON public.factions TO authenticated;
GRANT SELECT, INSERT ON public.factions TO anon;
GRANT ALL ON public.factions TO service_role;