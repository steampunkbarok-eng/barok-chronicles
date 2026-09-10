CREATE POLICY "Users can update their own characters"
ON public.personnages
FOR UPDATE
TO authenticated
USING (lower(email) = lower((auth.jwt() ->> 'email')) AND deleted_at IS NULL)
WITH CHECK (lower(email) = lower((auth.jwt() ->> 'email')));

CREATE OR REPLACE FUNCTION public.protect_personnage_self_update()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  privilegie boolean;
BEGIN
  privilegie := public.is_orga(auth.uid()) OR public.is_faction_manager(NEW.faction);
  IF NOT privilegie THEN
    NEW.xp := OLD.xp;
    IF NEW.statut NOT IN ('brouillon','soumis') THEN
      NEW.statut := OLD.statut;
    END IF;
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS protect_personnage_self_update ON public.personnages;
CREATE TRIGGER protect_personnage_self_update
BEFORE UPDATE ON public.personnages
FOR EACH ROW EXECUTE FUNCTION public.protect_personnage_self_update();