-- Tabela para armazenar URLs de áudios pré-gerados da biblioteca
CREATE TABLE public.library_audio (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  phrase_key text UNIQUE NOT NULL,  -- Ex: "pt_songs_0", "en_sounds_5"
  category text NOT NULL,
  language text NOT NULL,
  audio_url text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Índices para busca rápida
CREATE INDEX idx_library_audio_phrase_key ON public.library_audio(phrase_key);
CREATE INDEX idx_library_audio_category_language ON public.library_audio(category, language);

-- Habilitar RLS
ALTER TABLE public.library_audio ENABLE ROW LEVEL SECURITY;

-- Política: qualquer pessoa pode ler (áudios são públicos)
CREATE POLICY "Anyone can read library audio"
  ON public.library_audio
  FOR SELECT
  USING (true);

-- Política: apenas admins podem inserir/atualizar/deletar
CREATE POLICY "Admins can manage library audio"
  ON public.library_audio
  FOR ALL
  USING (has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));