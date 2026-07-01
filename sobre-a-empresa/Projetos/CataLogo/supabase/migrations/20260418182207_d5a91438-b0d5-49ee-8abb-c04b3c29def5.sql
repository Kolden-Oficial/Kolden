
CREATE OR REPLACE FUNCTION public.get_cron_status()
RETURNS TABLE (
  jobid bigint,
  jobname text,
  schedule text,
  active boolean,
  last_run_started timestamptz,
  last_run_finished timestamptz,
  last_run_status text,
  last_run_return text,
  runtime_ms numeric
)
LANGUAGE sql
SECURITY DEFINER
SET search_path = public, cron
AS $$
  SELECT
    j.jobid,
    j.jobname,
    j.schedule,
    j.active,
    r.start_time as last_run_started,
    r.end_time   as last_run_finished,
    r.status     as last_run_status,
    r.return_message as last_run_return,
    EXTRACT(EPOCH FROM (r.end_time - r.start_time)) * 1000 as runtime_ms
  FROM cron.job j
  LEFT JOIN LATERAL (
    SELECT * FROM cron.job_run_details d
    WHERE d.jobid = j.jobid
    ORDER BY d.start_time DESC
    LIMIT 1
  ) r ON true
  ORDER BY j.jobid;
$$;

REVOKE ALL ON FUNCTION public.get_cron_status() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.get_cron_status() TO authenticated;

-- Counter: how many conversions are pending retry right now
CREATE OR REPLACE FUNCTION public.get_retry_queue_stats()
RETURNS TABLE (
  pending_retries bigint,
  failed_max_retries bigint,
  next_retry_at timestamptz
)
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT
    COUNT(*) FILTER (WHERE next_retry_at IS NOT NULL AND retry_count < 3),
    COUNT(*) FILTER (WHERE retry_count >= 3 AND (meta_sync_status = 'failed' OR ghl_sync_status = 'failed')),
    MIN(next_retry_at) FILTER (WHERE next_retry_at IS NOT NULL AND retry_count < 3)
  FROM public.conversions;
$$;

REVOKE ALL ON FUNCTION public.get_retry_queue_stats() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.get_retry_queue_stats() TO authenticated;
