-- 1. Faction owners can read characters of their faction
CREATE POLICY "Faction owners can read their faction characters"
ON public.personnages
FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.factions f
    WHERE lower(f.contact_email) = lower((auth.jwt() ->> 'email'))
      AND personnages.faction IS NOT NULL
      AND lower(f.nom) = lower(personnages.faction)
  )
);

-- 2. Auto-grant admin role to organisation emails on signup / confirmation
CREATE OR REPLACE FUNCTION public.grant_admin_for_orga_emails()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NEW.email_confirmed_at IS NOT NULL
     AND lower(NEW.email) IN ('steampunk.barok@gmail.com', 'parafeeria@gmail.com') THEN
    INSERT INTO public.user_roles (user_id, role)
    VALUES (NEW.id, 'admin')
    ON CONFLICT (user_id, role) DO NOTHING;
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created_grant_orga_admin ON auth.users;
CREATE TRIGGER on_auth_user_created_grant_orga_admin
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.grant_admin_for_orga_emails();

DROP TRIGGER IF EXISTS on_auth_user_confirmed_grant_orga_admin ON auth.users;
CREATE TRIGGER on_auth_user_confirmed_grant_orga_admin
AFTER UPDATE OF email_confirmed_at ON auth.users
FOR EACH ROW
WHEN (OLD.email_confirmed_at IS NULL AND NEW.email_confirmed_at IS NOT NULL)
EXECUTE FUNCTION public.grant_admin_for_orga_emails();

-- 3. Grant admin to existing organisation accounts
INSERT INTO public.user_roles (user_id, role)
SELECT id, 'admin'::app_role FROM auth.users
WHERE lower(email) IN ('steampunk.barok@gmail.com', 'parafeeria@gmail.com')
ON CONFLICT (user_id, role) DO NOTHING;