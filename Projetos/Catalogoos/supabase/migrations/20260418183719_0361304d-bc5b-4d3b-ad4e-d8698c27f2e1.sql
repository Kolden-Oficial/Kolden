-- Create identities table to store CRM/lead PII for Advanced Matching enrichment
CREATE TABLE public.identities (
  id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id      text UNIQUE NOT NULL,
  user_id      uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  email        text,
  phone        text,
  first_name   text,
  last_name    text,
  dob          text,
  city         text,
  state        text,
  zip          text,
  country      text,
  gender       text,
  external_id  text,
  fbc          text,
  fbp          text,
  created_at   timestamptz NOT NULL DEFAULT now(),
  updated_at   timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_identities_lead_id ON public.identities(lead_id);
CREATE INDEX idx_identities_user_id ON public.identities(user_id);

ALTER TABLE public.identities ENABLE ROW LEVEL SECURITY;

-- Public INSERT so CRM webhooks can upsert without auth
CREATE POLICY "Anyone can insert identities"
  ON public.identities FOR INSERT
  TO public
  WITH CHECK (true);

-- Public UPDATE so CRM webhooks can update enrichment data
CREATE POLICY "Anyone can update identities"
  ON public.identities FOR UPDATE
  TO public
  USING (true);

-- Owners can read their own identities
CREATE POLICY "Owners can view their identities"
  ON public.identities FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id OR user_id IS NULL);

-- Owners can delete their own identities
CREATE POLICY "Owners can delete their identities"
  ON public.identities FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Reuse update_updated_at_column trigger pattern
CREATE OR REPLACE FUNCTION public.set_identities_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER trg_identities_updated_at
  BEFORE UPDATE ON public.identities
  FOR EACH ROW
  EXECUTE FUNCTION public.set_identities_updated_at();