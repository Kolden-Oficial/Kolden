
-- Create links table
CREATE TABLE public.links (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  destination_url TEXT NOT NULL,
  product_name TEXT NOT NULL,
  channel TEXT NOT NULL,
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create clicks table
CREATE TABLE public.clicks (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  link_id UUID NOT NULL REFERENCES public.links(id) ON DELETE CASCADE,
  ip_address TEXT,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.links ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.clicks ENABLE ROW LEVEL SECURITY;

-- Public read/write policies for links
CREATE POLICY "Allow public read on links" ON public.links FOR SELECT USING (true);
CREATE POLICY "Allow public insert on links" ON public.links FOR INSERT WITH CHECK (true);

-- Public read/write policies for clicks
CREATE POLICY "Allow public read on clicks" ON public.clicks FOR SELECT USING (true);
CREATE POLICY "Allow public insert on clicks" ON public.clicks FOR INSERT WITH CHECK (true);

-- Index for fast slug lookups
CREATE INDEX idx_links_slug ON public.links (slug);

-- Index for click counting by link
CREATE INDEX idx_clicks_link_id ON public.clicks (link_id);
