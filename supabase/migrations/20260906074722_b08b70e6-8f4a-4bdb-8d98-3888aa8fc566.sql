ALTER TABLE public.evenements
  ADD COLUMN IF NOT EXISTS nom_en text,
  ADD COLUMN IF NOT EXISTS nom_nl text,
  ADD COLUMN IF NOT EXISTS description_en text,
  ADD COLUMN IF NOT EXISTS description_nl text;