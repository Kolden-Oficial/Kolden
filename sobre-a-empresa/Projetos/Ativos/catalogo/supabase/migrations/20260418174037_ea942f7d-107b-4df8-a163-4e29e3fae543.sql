-- 1. Add retry tracking columns to conversions
ALTER TABLE public.conversions
  ADD COLUMN IF NOT EXISTS retry_count integer NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS next_retry_at timestamptz NULL;

CREATE INDEX IF NOT EXISTS idx_conversions_retry_due
  ON public.conversions (next_retry_at)
  WHERE meta_sync_status = 'failed' OR ghl_sync_status = 'failed';

-- 2. Ensure required extensions are enabled
CREATE EXTENSION IF NOT EXISTS pg_cron;
CREATE EXTENSION IF NOT EXISTS pg_net;

-- 3. Helper function: pick due-for-retry conversions and fire sync-outbound for each
CREATE OR REPLACE FUNCTION public.process_conversion_retries()
RETURNS integer
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, extensions
AS $$
DECLARE
  rec record;
  fired integer := 0;
BEGIN
  FOR rec IN
    SELECT id
    FROM public.conversions
    WHERE (meta_sync_status = 'failed' OR ghl_sync_status = 'failed')
      AND retry_count < 3
      AND next_retry_at IS NOT NULL
      AND next_retry_at <= now()
    ORDER BY next_retry_at ASC
    LIMIT 20
  LOOP
    -- Mark next_retry_at as null while in-flight to prevent double-fire
    UPDATE public.conversions
       SET next_retry_at = NULL
     WHERE id = rec.id;

    PERFORM net.http_post(
      url := 'https://knlmkufomfvpdgvtalcc.supabase.co/functions/v1/sync-outbound',
      headers := jsonb_build_object(
        'Content-Type', 'application/json',
        'Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtubG1rdWZvbWZ2cGRndnRhbGNjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU4ODg2MDksImV4cCI6MjA5MTQ2NDYwOX0.OvtbICuj9dDJgl3LgYvihxzCxcFa9WySGJAHgO0vg90'
      ),
      body := jsonb_build_object('conversion_id', rec.id, 'is_retry', true)
    );

    fired := fired + 1;
  END LOOP;

  RETURN fired;
END;
$$;

-- 4. Schedule the cron job (every 5 minutes)
-- Unschedule first if already exists, to be idempotent
DO $$
BEGIN
  PERFORM cron.unschedule('process-conversion-retries');
EXCEPTION WHEN OTHERS THEN
  -- ignore if not scheduled yet
  NULL;
END $$;

SELECT cron.schedule(
  'process-conversion-retries',
  '*/5 * * * *',
  $$ SELECT public.process_conversion_retries(); $$
);