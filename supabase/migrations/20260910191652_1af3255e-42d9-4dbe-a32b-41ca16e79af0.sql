-- 1. Corbeille sur les personnages
ALTER TABLE public.personnages
  ADD COLUMN IF NOT EXISTS deleted_at timestamptz,
  ADD COLUMN IF NOT EXISTS deleted_by text;

CREATE INDEX IF NOT EXISTS personnages_deleted_at_idx ON public.personnages (deleted_at);

-- Helper : l'utilisateur est-il le contact d'une faction donnée ?
CREATE OR REPLACE FUNCTION public.is_faction_manager(_faction text)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT _faction IS NOT NULL AND EXISTS (
    SELECT 1 FROM public.factions f
    WHERE lower(f.nom) = lower(_faction)
      AND lower(f.contact_email) = lower(auth.jwt() ->> 'email')
  )
$$;

-- 2. Politiques personnages
DROP POLICY IF EXISTS "Users can read their own characters" ON public.personnages;
CREATE POLICY "Users can read their own characters"
ON public.personnages FOR SELECT TO authenticated
USING (lower(email) = lower(auth.jwt() ->> 'email') AND deleted_at IS NULL);

DROP POLICY IF EXISTS "Faction owners can read their faction characters" ON public.personnages;
CREATE POLICY "Faction owners can read their faction characters"
ON public.personnages FOR SELECT TO authenticated
USING (public.is_faction_manager(faction) AND deleted_at IS NULL);

CREATE POLICY "Faction owners can update their faction characters"
ON public.personnages FOR UPDATE TO authenticated
USING (public.is_faction_manager(faction) AND deleted_at IS NULL)
WITH CHECK (public.is_faction_manager(faction));

-- 3. Factions : plus de lecture publique du détail
DROP POLICY IF EXISTS "Anyone can view factions" ON public.factions;
REVOKE SELECT ON public.factions FROM anon;

CREATE POLICY "Owners can read their own faction"
ON public.factions FOR SELECT TO authenticated
USING (lower(contact_email) = lower(auth.jwt() ->> 'email'));

CREATE POLICY "Orgas can read factions"
ON public.factions FOR SELECT TO authenticated
USING (public.is_orga(auth.uid()));

-- 4. Liste publique limitée (nécessaire à la création de personnage)
CREATE OR REPLACE VIEW public.factions_publiques AS
  SELECT id, nom, origines, titres, marque_collective, marque_collective_detail, statut
  FROM public.factions;

GRANT SELECT ON public.factions_publiques TO anon, authenticated;