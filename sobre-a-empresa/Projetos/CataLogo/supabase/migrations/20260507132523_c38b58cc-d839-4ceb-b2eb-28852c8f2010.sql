
-- 1) add user_id column nullable
ALTER TABLE public.leads ADD COLUMN IF NOT EXISTS user_id uuid;

-- 2) backfill existing leads to first existing user (best-effort single-tenant)
UPDATE public.leads
SET user_id = (SELECT user_id FROM public.integrations ORDER BY updated_at ASC LIMIT 1)
WHERE user_id IS NULL;

-- 3) drop old open policies
DROP POLICY IF EXISTS "Anyone can insert leads" ON public.leads;
DROP POLICY IF EXISTS "Authenticated can view leads" ON public.leads;

-- 4) owner-only SELECT
CREATE POLICY "Owners can view their leads"
  ON public.leads
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- INSERT/UPDATE/DELETE: no policies => only service_role (bypasses RLS) can write.
