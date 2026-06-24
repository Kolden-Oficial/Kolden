-- Track Telegram group join per lead for conditional Meta CAPI Lead event
ALTER TABLE leads
  ADD COLUMN IF NOT EXISTS telegram_invite_link text,
  ADD COLUMN IF NOT EXISTS telegram_joined boolean DEFAULT false,
  ADD COLUMN IF NOT EXISTS telegram_joined_at timestamptz;
