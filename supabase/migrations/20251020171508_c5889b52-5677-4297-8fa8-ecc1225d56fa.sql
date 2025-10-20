-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Create factions table
CREATE TABLE public.factions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  nom text NOT NULL,
  marques_total integer NOT NULL DEFAULT 0,
  marques_depensees integer NOT NULL DEFAULT 0,
  marques_disponibles integer NOT NULL DEFAULT 0,
  propriete_terrienne text,
  batiment text,
  titres text[] DEFAULT '{}',
  description_courte text,
  background text,
  contact_email text NOT NULL,
  date_creation timestamp with time zone DEFAULT now(),
  statut text DEFAULT 'active',
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.factions ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (anyone can read and create factions)
CREATE POLICY "Anyone can view factions"
  ON public.factions
  FOR SELECT
  USING (true);

CREATE POLICY "Anyone can create factions"
  ON public.factions
  FOR INSERT
  WITH CHECK (true);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_factions_updated_at
  BEFORE UPDATE ON public.factions
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();