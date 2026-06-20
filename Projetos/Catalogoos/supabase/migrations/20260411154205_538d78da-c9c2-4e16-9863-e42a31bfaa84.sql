
CREATE TABLE public.taxonomies (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL,
  type text NOT NULL CHECK (type IN ('source', 'medium', 'ad_type')),
  value text NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  UNIQUE (user_id, type, value)
);

ALTER TABLE public.taxonomies ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own taxonomies"
ON public.taxonomies FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own taxonomies"
ON public.taxonomies FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own taxonomies"
ON public.taxonomies FOR UPDATE
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own taxonomies"
ON public.taxonomies FOR DELETE
TO authenticated
USING (auth.uid() = user_id);
