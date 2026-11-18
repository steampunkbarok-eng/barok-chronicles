CREATE OR REPLACE FUNCTION public.protect_personnage_self_update()
 RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path TO 'public'
AS $function$
DECLARE
  est_orga boolean;
  privilegie boolean;
BEGIN
  est_orga := public.is_orga(auth.uid());
  IF NOT est_orga AND auth.role() <> 'service_role' THEN
    IF lower(coalesce(NEW.email,'')) <> lower(coalesce(OLD.email,'')) THEN
      RAISE EXCEPTION 'Seule l''Organisation peut changer l''email d''une fiche. / Only the organisers can change a sheet''s email. / Alleen de organisatie kan het e-mailadres van een blad wijzigen.' USING ERRCODE = '42501';
    END IF;
    IF lower(coalesce(NEW.faction,'')) <> lower(coalesce(OLD.faction,'')) THEN
      RAISE EXCEPTION 'Seule l''Organisation peut changer la faction d''une fiche. / Only the organisers can change a sheet''s faction. / Alleen de organisatie kan de factie van een blad wijzigen.' USING ERRCODE = '42501';
    END IF;
  END IF;
  privilegie := est_orga OR public.is_faction_manager(NEW.faction);
  IF NOT privilegie THEN
    NEW.xp := OLD.xp;
    IF NEW.statut NOT IN ('brouillon','soumis') THEN
      NEW.statut := OLD.statut;
    END IF;
  END IF;
  RETURN NEW;
END;
$function$;
REVOKE ALL ON FUNCTION public.protect_personnage_self_update() FROM PUBLIC, anon, authenticated;

CREATE OR REPLACE FUNCTION public.protect_faction_contact_email()
 RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path TO 'public'
AS $function$
BEGIN
  IF lower(coalesce(NEW.contact_email,'')) <> lower(coalesce(OLD.contact_email,''))
     AND NOT public.is_orga(auth.uid()) AND auth.role() <> 'service_role' THEN
    RAISE EXCEPTION 'Seule l''Organisation peut changer l''email d''une faction. / Only the organisers can change a faction''s email. / Alleen de organisatie kan het e-mailadres van een factie wijzigen.' USING ERRCODE = '42501';
  END IF;
  RETURN NEW;
END;
$function$;
REVOKE ALL ON FUNCTION public.protect_faction_contact_email() FROM PUBLIC, anon, authenticated;
DROP TRIGGER IF EXISTS protect_faction_contact_email ON public.factions;
CREATE TRIGGER protect_faction_contact_email BEFORE UPDATE ON public.factions
FOR EACH ROW EXECUTE FUNCTION public.protect_faction_contact_email();