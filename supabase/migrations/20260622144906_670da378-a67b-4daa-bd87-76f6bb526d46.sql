
-- Enum for roles
CREATE TYPE public.app_role AS ENUM ('admin', 'orga', 'user');

-- user_roles table
CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role public.app_role NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- has_role security definer function
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- is_orga: convenience to check orga OR admin
CREATE OR REPLACE FUNCTION public.is_orga(_user_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role IN ('admin','orga')
  )
$$;

-- Policies on user_roles
CREATE POLICY "Users can read their own roles"
  ON public.user_roles FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage roles"
  ON public.user_roles FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Tighten personnages policies: restrict read/update/delete to orgas
DROP POLICY IF EXISTS "Authenticated can read characters" ON public.personnages;
DROP POLICY IF EXISTS "Authenticated can update characters" ON public.personnages;
DROP POLICY IF EXISTS "Authenticated can delete characters" ON public.personnages;

CREATE POLICY "Orgas can read characters"
  ON public.personnages FOR SELECT
  TO authenticated
  USING (public.is_orga(auth.uid()));

CREATE POLICY "Orgas can update characters"
  ON public.personnages FOR UPDATE
  TO authenticated
  USING (public.is_orga(auth.uid()))
  WITH CHECK (public.is_orga(auth.uid()));

CREATE POLICY "Orgas can delete characters"
  ON public.personnages FOR DELETE
  TO authenticated
  USING (public.is_orga(auth.uid()));

-- Tighten personnage_evolutions
DROP POLICY IF EXISTS "Authenticated can manage evolutions" ON public.personnage_evolutions;

CREATE POLICY "Orgas can manage evolutions"
  ON public.personnage_evolutions FOR ALL
  TO authenticated
  USING (public.is_orga(auth.uid()))
  WITH CHECK (public.is_orga(auth.uid()));
