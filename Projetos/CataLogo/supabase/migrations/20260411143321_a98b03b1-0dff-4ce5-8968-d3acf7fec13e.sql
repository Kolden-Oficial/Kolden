
CREATE TABLE public.conversions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  click_id UUID NOT NULL REFERENCES public.clicks(id) ON DELETE CASCADE,
  external_order_id TEXT,
  purchase_value NUMERIC NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'approved',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.conversions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read on conversions" ON public.conversions FOR SELECT USING (true);
CREATE POLICY "Allow public insert on conversions" ON public.conversions FOR INSERT WITH CHECK (true);

CREATE INDEX idx_conversions_click_id ON public.conversions(click_id);
