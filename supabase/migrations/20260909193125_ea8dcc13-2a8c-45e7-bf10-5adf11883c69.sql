ALTER TABLE public.factions
  ADD COLUMN IF NOT EXISTS origines text[] NOT NULL DEFAULT '{}'::text[],
  ADD COLUMN IF NOT EXISTS marque_collective text;