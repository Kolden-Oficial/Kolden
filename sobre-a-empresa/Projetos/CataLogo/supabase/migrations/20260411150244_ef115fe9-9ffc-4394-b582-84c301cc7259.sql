ALTER TABLE public.conversions
  ADD COLUMN meta_sync_status text NOT NULL DEFAULT 'pending',
  ADD COLUMN ghl_sync_status text NOT NULL DEFAULT 'pending',
  ADD COLUMN sync_logs text;