-- Ajouter une contrainte d'unicité sur le nom de faction
ALTER TABLE public.factions ADD CONSTRAINT factions_nom_unique UNIQUE (nom);