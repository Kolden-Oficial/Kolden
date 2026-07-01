
-- Internal trigger functions: revoke from anon/authenticated/public (only used by triggers / cron internally)
REVOKE EXECUTE ON FUNCTION public.trigger_sync_outbound() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.set_identities_updated_at() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.validate_click_link_id() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.validate_conversion_click_id() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.process_conversion_retries() FROM PUBLIC, anon, authenticated;

-- Admin/dashboard RPCs: restrict to authenticated only
REVOKE EXECUTE ON FUNCTION public.get_cron_status() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.get_cron_status() TO authenticated;

REVOKE EXECUTE ON FUNCTION public.get_retry_queue_stats() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.get_retry_queue_stats() TO authenticated;

REVOKE EXECUTE ON FUNCTION public.get_emq_stats_24h() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.get_emq_stats_24h() TO authenticated;

-- Public-facing (landing pages) — keep accessible to anon
REVOKE EXECUTE ON FUNCTION public.get_link_by_slug(text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.get_link_by_slug(text) TO anon, authenticated;

REVOKE EXECUTE ON FUNCTION public.get_landing_tracking() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.get_landing_tracking() TO anon, authenticated;
