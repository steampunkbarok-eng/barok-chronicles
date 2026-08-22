CREATE TYPE public.demande_statut AS ENUM ('en_attente', 'approuvee', 'refusee');

CREATE TABLE public.demandes_xp (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  personnage_id uuid NOT NULL REFERENCES public.personnages(id) ON DELETE CASCADE,
  type_demande text NOT NULL,
  libelle text NOT NULL,
  cout_xp integer NOT NULL DEFAULT 0,
  justification text,
  statut public.demande_statut NOT NULL DEFAULT 'en_attente',
  reponse_orga text,
  traite_par text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.demandes_xp TO authenticated;
GRANT ALL ON public.demandes_xp TO service_role;

ALTER TABLE public.demandes_xp ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Orgas can manage demandes"
ON public.demandes_xp FOR ALL TO authenticated
USING (public.is_orga(auth.uid()))
WITH CHECK (public.is_orga(auth.uid()));

CREATE POLICY "Users can read their own demandes"
ON public.demandes_xp FOR SELECT TO authenticated
USING (EXISTS (
  SELECT 1 FROM public.personnages p
  WHERE p.id = demandes_xp.personnage_id
    AND lower(p.email) = lower(auth.jwt() ->> 'email')
));

CREATE POLICY "Users can create demandes for their own characters"
ON public.demandes_xp FOR INSERT TO authenticated
WITH CHECK (
  statut = 'en_attente'
  AND EXISTS (
    SELECT 1 FROM public.personnages p
    WHERE p.id = demandes_xp.personnage_id
      AND lower(p.email) = lower(auth.jwt() ->> 'email')
  )
);

CREATE POLICY "Users can cancel their own pending demandes"
ON public.demandes_xp FOR DELETE TO authenticated
USING (
  statut = 'en_attente'
  AND EXISTS (
    SELECT 1 FROM public.personnages p
    WHERE p.id = demandes_xp.personnage_id
      AND lower(p.email) = lower(auth.jwt() ->> 'email')
  )
);

CREATE TRIGGER update_demandes_xp_updated_at
BEFORE UPDATE ON public.demandes_xp
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();