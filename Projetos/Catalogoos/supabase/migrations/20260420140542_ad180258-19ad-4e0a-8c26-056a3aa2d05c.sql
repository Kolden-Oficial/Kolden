CREATE OR REPLACE FUNCTION public.get_landing_tracking()
RETURNS TABLE(meta_pixel_id text, gtm_container_id text)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT
    (SELECT (credentials->>'pixel_id')::text
       FROM public.integrations
      WHERE provider = 'meta'
        AND credentials ? 'pixel_id'
        AND length(coalesce(credentials->>'pixel_id','')) > 0
      ORDER BY updated_at DESC
      LIMIT 1) AS meta_pixel_id,
    (SELECT (credentials->>'container_id')::text
       FROM public.integrations
      WHERE provider IN ('gtm','google_tag_manager')
        AND credentials ? 'container_id'
        AND length(coalesce(credentials->>'container_id','')) > 0
      ORDER BY updated_at DESC
      LIMIT 1) AS gtm_container_id;
$$;

GRANT EXECUTE ON FUNCTION public.get_landing_tracking() TO anon, authenticated;