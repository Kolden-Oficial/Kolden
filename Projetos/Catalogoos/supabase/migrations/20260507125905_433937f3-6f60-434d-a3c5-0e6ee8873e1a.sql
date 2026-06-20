
-- ============================================================
-- Migration: RLS hardening (identities, links, clicks, conversions, products)
-- ============================================================

-- ---------- 1. IDENTITIES: remove INSERT/UPDATE públicos ----------
DROP POLICY IF EXISTS "Anyone can insert identities" ON public.identities;
DROP POLICY IF EXISTS "Anyone can update identities" ON public.identities;
-- (SELECT e DELETE por owner permanecem)

-- ---------- 2. LINKS: substituir SELECT público por RPC SECURITY DEFINER ----------
DROP POLICY IF EXISTS "Public can read links for redirect" ON public.links;

CREATE OR REPLACE FUNCTION public.get_link_by_slug(_slug text)
RETURNS TABLE (id uuid, destination_url text, user_id uuid)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT id, destination_url, user_id
  FROM public.links
  WHERE slug = _slug
  LIMIT 1
$$;

REVOKE ALL ON FUNCTION public.get_link_by_slug(text) FROM public;
GRANT EXECUTE ON FUNCTION public.get_link_by_slug(text) TO anon, authenticated;

-- ---------- 3. CLICKS: trigger de validação de FK ----------
CREATE OR REPLACE FUNCTION public.validate_click_link_id()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.links WHERE id = NEW.link_id) THEN
    RAISE EXCEPTION 'invalid link_id: % does not exist', NEW.link_id
      USING ERRCODE = 'foreign_key_violation';
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS validate_click_link_id_trg ON public.clicks;
CREATE TRIGGER validate_click_link_id_trg
BEFORE INSERT ON public.clicks
FOR EACH ROW
EXECUTE FUNCTION public.validate_click_link_id();

-- ---------- 4. CONVERSIONS: trigger de validação de FK ----------
CREATE OR REPLACE FUNCTION public.validate_conversion_click_id()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.clicks WHERE id = NEW.click_id) THEN
    RAISE EXCEPTION 'invalid click_id: % does not exist', NEW.click_id
      USING ERRCODE = 'foreign_key_violation';
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS validate_conversion_click_id_trg ON public.conversions;
CREATE TRIGGER validate_conversion_click_id_trg
BEFORE INSERT ON public.conversions
FOR EACH ROW
EXECUTE FUNCTION public.validate_conversion_click_id();

-- ---------- 5. PRODUCTS: alvejar apenas authenticated (cosmético) ----------
DROP POLICY IF EXISTS "Users can view their own products" ON public.products;
DROP POLICY IF EXISTS "Users can insert their own products" ON public.products;
DROP POLICY IF EXISTS "Users can update their own products" ON public.products;
DROP POLICY IF EXISTS "Users can delete their own products" ON public.products;

CREATE POLICY "Users can view their own products"
  ON public.products FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own products"
  ON public.products FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own products"
  ON public.products FOR UPDATE TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own products"
  ON public.products FOR DELETE TO authenticated
  USING (auth.uid() = user_id);
