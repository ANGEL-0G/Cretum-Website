
-- GVV Chart data table
CREATE TABLE public.gvv_chart_data (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  month TEXT NOT NULL,
  month_order INTEGER NOT NULL,
  valor NUMERIC(12,2) NOT NULL DEFAULT 100,
  year INTEGER NOT NULL DEFAULT EXTRACT(YEAR FROM NOW())::INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.gvv_chart_data ENABLE ROW LEVEL SECURITY;

-- Anyone can read chart data (public data)
CREATE POLICY "Public can read chart data"
  ON public.gvv_chart_data FOR SELECT
  USING (true);

-- Only authenticated users (admin) can modify
CREATE POLICY "Authenticated can insert chart data"
  ON public.gvv_chart_data FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated can update chart data"
  ON public.gvv_chart_data FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated can delete chart data"
  ON public.gvv_chart_data FOR DELETE
  TO authenticated
  USING (true);

-- GVV documents table
CREATE TABLE public.gvv_documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  file_path TEXT NOT NULL,
  file_url TEXT NOT NULL,
  uploaded_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.gvv_documents ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read documents"
  ON public.gvv_documents FOR SELECT
  USING (true);

CREATE POLICY "Authenticated can upload documents"
  ON public.gvv_documents FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated can delete documents"
  ON public.gvv_documents FOR DELETE
  TO authenticated
  USING (true);

-- Storage bucket for GVV documents
INSERT INTO storage.buckets (id, name, public)
VALUES ('gvv-documents', 'gvv-documents', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Public can read gvv documents"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'gvv-documents');

CREATE POLICY "Authenticated can upload gvv documents"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'gvv-documents');

CREATE POLICY "Authenticated can delete gvv documents"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'gvv-documents');

-- Seed default chart data
INSERT INTO public.gvv_chart_data (month, month_order, valor, year) VALUES
  ('Ene', 1, 100.00, 2024),
  ('Feb', 2, 102.50, 2024),
  ('Mar', 3, 105.10, 2024),
  ('Abr', 4, 103.80, 2024),
  ('May', 5, 107.20, 2024),
  ('Jun', 6, 110.50, 2024),
  ('Jul', 7, 112.30, 2024),
  ('Ago', 8, 109.80, 2024),
  ('Sep', 9, 114.10, 2024),
  ('Oct', 10, 117.60, 2024),
  ('Nov', 11, 120.20, 2024),
  ('Dic', 12, 123.50, 2024);
