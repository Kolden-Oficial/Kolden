
CREATE TABLE public.products (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL,
  name text NOT NULL,
  sku_or_external_id text,
  price numeric NOT NULL DEFAULT 0,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own products" ON public.products FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own products" ON public.products FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own products" ON public.products FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own products" ON public.products FOR DELETE USING (auth.uid() = user_id);
