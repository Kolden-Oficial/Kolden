
ALTER TABLE public.clicks
  ADD COLUMN IF NOT EXISTS fbp text,
  ADD COLUMN IF NOT EXISTS fbc text,
  ADD COLUMN IF NOT EXISTS event_source_url text;

ALTER TABLE public.conversions
  ADD COLUMN IF NOT EXISTS email_hash text,
  ADD COLUMN IF NOT EXISTS phone_hash text;

CREATE INDEX IF NOT EXISTS idx_clicks_fbp ON public.clicks(fbp) WHERE fbp IS NOT NULL;
