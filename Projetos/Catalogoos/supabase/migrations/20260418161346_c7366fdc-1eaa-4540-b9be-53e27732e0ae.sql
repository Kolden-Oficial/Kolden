-- 1. Enable pg_net extension for async HTTP calls
CREATE EXTENSION IF NOT EXISTS pg_net WITH SCHEMA extensions;

-- 2. Add last_sync_attempt_at column to conversions
ALTER TABLE public.conversions
ADD COLUMN IF NOT EXISTS last_sync_attempt_at TIMESTAMP WITH TIME ZONE;

-- 3. Create trigger function that calls the sync-outbound edge function asynchronously
CREATE OR REPLACE FUNCTION public.trigger_sync_outbound()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, extensions
AS $$
DECLARE
  request_id BIGINT;
BEGIN
  -- Fire async HTTP POST to sync-outbound edge function
  -- Uses pg_net which doesn't block the INSERT
  SELECT net.http_post(
    url := 'https://knlmkufomfvpdgvtalcc.supabase.co/functions/v1/sync-outbound',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtubG1rdWZvbWZ2cGRndnRhbGNjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU4ODg2MDksImV4cCI6MjA5MTQ2NDYwOX0.OvtbICuj9dDJgl3LgYvihxzCxcFa9WySGJAHgO0vg90'
    ),
    body := jsonb_build_object('conversion_id', NEW.id)
  ) INTO request_id;

  RETURN NEW;
EXCEPTION WHEN OTHERS THEN
  -- Never block the insert if sync trigger fails
  RAISE WARNING 'trigger_sync_outbound failed for conversion %: %', NEW.id, SQLERRM;
  RETURN NEW;
END;
$$;

-- 4. Drop existing trigger if any, then create
DROP TRIGGER IF EXISTS on_conversion_insert_sync ON public.conversions;

CREATE TRIGGER on_conversion_insert_sync
AFTER INSERT ON public.conversions
FOR EACH ROW
EXECUTE FUNCTION public.trigger_sync_outbound();