
-- Create integrations table
CREATE TABLE public.integrations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  provider TEXT NOT NULL,
  api_key TEXT NOT NULL DEFAULT '',
  api_secret TEXT,
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, provider)
);

ALTER TABLE public.integrations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own integrations"
  ON public.integrations FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own integrations"
  ON public.integrations FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own integrations"
  ON public.integrations FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own integrations"
  ON public.integrations FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Add user_id to links
ALTER TABLE public.links ADD COLUMN user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE;

-- Update links RLS: owner-based
DROP POLICY IF EXISTS "Allow public insert on links" ON public.links;
DROP POLICY IF EXISTS "Allow public read on links" ON public.links;

CREATE POLICY "Users can view their own links"
  ON public.links FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own links"
  ON public.links FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- clicks: keep public insert (tracking), but restrict reads to link owner
DROP POLICY IF EXISTS "Allow public insert on clicks" ON public.clicks;
DROP POLICY IF EXISTS "Allow public read on clicks" ON public.clicks;

CREATE POLICY "Anyone can insert clicks"
  ON public.clicks FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Link owners can view clicks"
  ON public.clicks FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.links
      WHERE links.id = clicks.link_id
        AND links.user_id = auth.uid()
    )
  );

-- conversions: keep public insert (webhook), restrict reads to link owner
DROP POLICY IF EXISTS "Allow public insert on conversions" ON public.conversions;
DROP POLICY IF EXISTS "Allow public read on conversions" ON public.conversions;

CREATE POLICY "Anyone can insert conversions"
  ON public.conversions FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Link owners can view conversions"
  ON public.conversions FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.clicks
      JOIN public.links ON links.id = clicks.link_id
      WHERE clicks.id = conversions.click_id
        AND links.user_id = auth.uid()
    )
  );

-- Allow public SELECT on links for the /go/:slug redirect (anonymous users need to look up the link)
CREATE POLICY "Public can read links for redirect"
  ON public.links FOR SELECT
  TO anon
  USING (true);
