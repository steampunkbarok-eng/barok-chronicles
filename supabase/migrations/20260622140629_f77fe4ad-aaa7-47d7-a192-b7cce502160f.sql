-- Statut de validation d'un personnage
CREATE TYPE public.personnage_statut AS ENUM ('brouillon', 'soumis', 'valide', 'archive');

-- Table principale : personnages
CREATE TABLE public.personnages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  nom TEXT NOT NULL,
  prenom TEXT NOT NULL,
  faction TEXT,
  espece TEXT NOT NULL,
  email TEXT NOT NULL,
  statut public.personnage_statut NOT NULL DEFAULT 'soumis',
  xp INTEGER NOT NULL DEFAULT 0,
  data JSONB NOT NULL,
  notes_orga TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.personnages TO authenticated;
GRANT INSERT ON public.personnages TO anon;
GRANT ALL ON public.personnages TO service_role;

ALTER TABLE public.personnages ENABLE ROW LEVEL SECURITY;

-- Tout le monde peut soumettre une fiche depuis le formulaire public
CREATE POLICY "Anyone can submit a character"
  ON public.personnages
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Seuls les utilisateurs connectés (Orga) peuvent lire/modifier/supprimer
CREATE POLICY "Authenticated can read characters"
  ON public.personnages
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated can update characters"
  ON public.personnages
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated can delete characters"
  ON public.personnages
  FOR DELETE
  TO authenticated
  USING (true);

-- Index utiles
CREATE INDEX idx_personnages_faction ON public.personnages(faction);
CREATE INDEX idx_personnages_email ON public.personnages(email);
CREATE INDEX idx_personnages_statut ON public.personnages(statut);
CREATE INDEX idx_personnages_created_at ON public.personnages(created_at DESC);

-- Table : évolutions des personnages dans le temps
CREATE TABLE public.personnage_evolutions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  personnage_id UUID NOT NULL REFERENCES public.personnages(id) ON DELETE CASCADE,
  type_evolution TEXT NOT NULL,
  description TEXT NOT NULL,
  valeur INTEGER,
  auteur TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.personnage_evolutions TO authenticated;
GRANT ALL ON public.personnage_evolutions TO service_role;

ALTER TABLE public.personnage_evolutions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated can manage evolutions"
  ON public.personnage_evolutions
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE INDEX idx_evolutions_personnage ON public.personnage_evolutions(personnage_id);
CREATE INDEX idx_evolutions_created_at ON public.personnage_evolutions(created_at DESC);

-- Trigger updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER update_personnages_updated_at
  BEFORE UPDATE ON public.personnages
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();