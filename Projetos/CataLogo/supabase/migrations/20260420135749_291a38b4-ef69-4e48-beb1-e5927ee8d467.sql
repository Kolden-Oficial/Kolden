CREATE TABLE public.leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  variant text NOT NULL CHECK (variant IN ('a','b')),
  first_name text NOT NULL,
  last_name text,
  email text NOT NULL,
  phone text NOT NULL,
  dob date,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  utm_content text,
  utm_term text,
  fbclid text,
  fbp text,
  fbc text,
  user_agent text,
  event_source_url text,
  meta_sync_status text NOT NULL DEFAULT 'pending',
  ghl_sync_status text NOT NULL DEFAULT 'pending',
  ga4_sync_status text NOT NULL DEFAULT 'pending',
  sync_logs jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert leads"
  ON public.leads
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Authenticated can view leads"
  ON public.leads
  FOR SELECT
  TO authenticated
  USING (true);

CREATE INDEX idx_leads_created_at ON public.leads (created_at DESC);
CREATE INDEX idx_leads_variant ON public.leads (variant);