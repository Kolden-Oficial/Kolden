-- Add Advanced Matching hash columns
ALTER TABLE public.conversions
  ADD COLUMN IF NOT EXISTS first_name_hash text,
  ADD COLUMN IF NOT EXISTS last_name_hash text,
  ADD COLUMN IF NOT EXISTS city_hash text,
  ADD COLUMN IF NOT EXISTS state_hash text,
  ADD COLUMN IF NOT EXISTS zip_hash text,
  ADD COLUMN IF NOT EXISTS country_hash text,
  ADD COLUMN IF NOT EXISTS dob_hash text,
  ADD COLUMN IF NOT EXISTS gender_hash text,
  ADD COLUMN IF NOT EXISTS external_id_hash text,
  ADD COLUMN IF NOT EXISTS emq_score numeric;

-- RPC: aggregated EMQ stats for last 24h
CREATE OR REPLACE FUNCTION public.get_emq_stats_24h()
RETURNS TABLE (
  avg_emq_score numeric,
  total_conversions bigint,
  signal_coverage jsonb
)
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  WITH base AS (
    SELECT
      c.emq_score,
      c.email_hash,
      c.phone_hash,
      c.first_name_hash,
      c.last_name_hash,
      c.city_hash,
      c.state_hash,
      c.zip_hash,
      c.country_hash,
      c.dob_hash,
      c.gender_hash,
      c.external_id_hash,
      cl.ip_address,
      cl.user_agent,
      cl.fbp,
      cl.fbc
    FROM public.conversions c
    LEFT JOIN public.clicks cl ON cl.id = c.click_id
    WHERE c.created_at >= now() - interval '24 hours'
  ),
  agg AS (
    SELECT
      COALESCE(ROUND(AVG(emq_score)::numeric, 2), 0) AS avg_emq_score,
      COUNT(*)::bigint AS total_conversions,
      CASE WHEN COUNT(*) = 0 THEN '{}'::jsonb ELSE jsonb_build_object(
        'ip',          ROUND(AVG(CASE WHEN ip_address IS NOT NULL THEN 1 ELSE 0 END)::numeric, 4),
        'ua',          ROUND(AVG(CASE WHEN user_agent IS NOT NULL THEN 1 ELSE 0 END)::numeric, 4),
        'fbp',         ROUND(AVG(CASE WHEN fbp IS NOT NULL THEN 1 ELSE 0 END)::numeric, 4),
        'fbc',         ROUND(AVG(CASE WHEN fbc IS NOT NULL THEN 1 ELSE 0 END)::numeric, 4),
        'em',          ROUND(AVG(CASE WHEN email_hash IS NOT NULL THEN 1 ELSE 0 END)::numeric, 4),
        'ph',          ROUND(AVG(CASE WHEN phone_hash IS NOT NULL THEN 1 ELSE 0 END)::numeric, 4),
        'fn',          ROUND(AVG(CASE WHEN first_name_hash IS NOT NULL THEN 1 ELSE 0 END)::numeric, 4),
        'ln',          ROUND(AVG(CASE WHEN last_name_hash IS NOT NULL THEN 1 ELSE 0 END)::numeric, 4),
        'ct',          ROUND(AVG(CASE WHEN city_hash IS NOT NULL THEN 1 ELSE 0 END)::numeric, 4),
        'st',          ROUND(AVG(CASE WHEN state_hash IS NOT NULL THEN 1 ELSE 0 END)::numeric, 4),
        'zp',          ROUND(AVG(CASE WHEN zip_hash IS NOT NULL THEN 1 ELSE 0 END)::numeric, 4),
        'country',     ROUND(AVG(CASE WHEN country_hash IS NOT NULL THEN 1 ELSE 0 END)::numeric, 4),
        'db',          ROUND(AVG(CASE WHEN dob_hash IS NOT NULL THEN 1 ELSE 0 END)::numeric, 4),
        'ge',          ROUND(AVG(CASE WHEN gender_hash IS NOT NULL THEN 1 ELSE 0 END)::numeric, 4),
        'external_id', ROUND(AVG(CASE WHEN external_id_hash IS NOT NULL THEN 1 ELSE 0 END)::numeric, 4)
      ) END AS signal_coverage
    FROM base
  )
  SELECT avg_emq_score, total_conversions, signal_coverage FROM agg;
$$;