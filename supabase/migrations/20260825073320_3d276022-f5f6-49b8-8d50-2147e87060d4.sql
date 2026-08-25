-- Événements
CREATE TYPE public.evenement_statut AS ENUM ('a_venir', 'en_cours', 'termine', 'annule');

CREATE TABLE public.evenements (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  nom TEXT NOT NULL,
  date_debut DATE NOT NULL,
  date_fin DATE,
  lieu TEXT,
  description TEXT,
  xp_attribuee INTEGER NOT NULL DEFAULT 0,
  compte_rendu TEXT,
  notes_orga TEXT,
  statut public.evenement_statut NOT NULL DEFAULT 'a_venir',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

GRANT SELECT ON public.evenements TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.evenements TO authenticated;
GRANT ALL ON public.evenements TO service_role;

ALTER TABLE public.evenements ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view evenements"
  ON public.evenements FOR SELECT
  USING (true);

CREATE POLICY "Orgas can manage evenements"
  ON public.evenements FOR ALL
  TO authenticated
  USING (public.is_orga(auth.uid()))
  WITH CHECK (public.is_orga(auth.uid()));

CREATE TRIGGER update_evenements_updated_at
  BEFORE UPDATE ON public.evenements
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Participations
CREATE TABLE public.evenement_participations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  evenement_id UUID NOT NULL REFERENCES public.evenements(id) ON DELETE CASCADE,
  personnage_id UUID NOT NULL REFERENCES public.personnages(id) ON DELETE CASCADE,
  present BOOLEAN NOT NULL DEFAULT false,
  xp_attribuee BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE (evenement_id, personnage_id)
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.evenement_participations TO authenticated;
GRANT ALL ON public.evenement_participations TO service_role;

ALTER TABLE public.evenement_participations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Orgas can manage participations"
  ON public.evenement_participations FOR ALL
  TO authenticated
  USING (public.is_orga(auth.uid()))
  WITH CHECK (public.is_orga(auth.uid()));

CREATE POLICY "Users can read participations of their own characters"
  ON public.evenement_participations FOR SELECT
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM public.personnages p
    WHERE p.id = evenement_participations.personnage_id
      AND lower(p.email) = lower((auth.jwt() ->> 'email'))
  ));

CREATE TRIGGER update_evenement_participations_updated_at
  BEFORE UPDATE ON public.evenement_participations
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Gestion des factions par les orgas
CREATE POLICY "Orgas can update factions"
  ON public.factions FOR UPDATE
  TO authenticated
  USING (public.is_orga(auth.uid()))
  WITH CHECK (public.is_orga(auth.uid()));

CREATE POLICY "Orgas can delete factions"
  ON public.factions FOR DELETE
  TO authenticated
  USING (public.is_orga(auth.uid()));

GRANT UPDATE, DELETE ON public.factions TO authenticated;