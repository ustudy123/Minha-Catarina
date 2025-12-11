-- Create library_phrases table for admin-managed content
CREATE TABLE public.library_phrases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  text_pt TEXT NOT NULL,
  text_en TEXT,
  text_es TEXT,
  category TEXT NOT NULL,
  time_of_day TEXT,
  audio_url_pt TEXT,
  audio_url_en TEXT,
  audio_url_es TEXT,
  is_active BOOLEAN DEFAULT true,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.library_phrases ENABLE ROW LEVEL SECURITY;

-- Everyone can view active phrases
CREATE POLICY "Anyone can view active library phrases"
ON public.library_phrases
FOR SELECT
USING (is_active = true);

-- Only admins can insert
CREATE POLICY "Admins can insert library phrases"
ON public.library_phrases
FOR INSERT
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Only admins can update
CREATE POLICY "Admins can update library phrases"
ON public.library_phrases
FOR UPDATE
USING (public.has_role(auth.uid(), 'admin'));

-- Only admins can delete
CREATE POLICY "Admins can delete library phrases"
ON public.library_phrases
FOR DELETE
USING (public.has_role(auth.uid(), 'admin'));

-- Create storage bucket for audio files
INSERT INTO storage.buckets (id, name, public) 
VALUES ('library-audio', 'library-audio', true);

-- Storage policies for audio bucket
CREATE POLICY "Anyone can view library audio"
ON storage.objects
FOR SELECT
USING (bucket_id = 'library-audio');

CREATE POLICY "Admins can upload library audio"
ON storage.objects
FOR INSERT
WITH CHECK (bucket_id = 'library-audio' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update library audio"
ON storage.objects
FOR UPDATE
USING (bucket_id = 'library-audio' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete library audio"
ON storage.objects
FOR DELETE
USING (bucket_id = 'library-audio' AND public.has_role(auth.uid(), 'admin'));

-- Update admin role for contato@ustudy.com.br
UPDATE public.user_roles 
SET role = 'admin' 
WHERE user_id = (
  SELECT id FROM auth.users WHERE email = 'contato@ustudy.com.br'
);

-- Create trigger for updated_at
CREATE TRIGGER update_library_phrases_updated_at
BEFORE UPDATE ON public.library_phrases
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();