ALTER TABLE public.leads
  ADD COLUMN IF NOT EXISTS telegram_invite_link text,
  ADD COLUMN IF NOT EXISTS telegram_joined boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS telegram_joined_at timestamptz;

CREATE INDEX IF NOT EXISTS idx_leads_telegram_joined
  ON public.leads (telegram_joined) WHERE telegram_joined = true;