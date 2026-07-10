-- Fix: edge function text-to-speech não conseguia fazer upload no bucket
-- library-audio por falta de policy de INSERT. Sem isso, o áudio gerado nunca
-- ia parar no Storage nem no audio_cache, e cada requisição da mesma frase
-- regenerava na ElevenLabs (queimando créditos).

-- Garantir que o bucket existe e está público para leitura de objetos
INSERT INTO storage.buckets (id, name, public)
VALUES ('library-audio', 'library-audio', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- Permitir que a edge function (service_role) e admins autenticados façam upload
DROP POLICY IF EXISTS "Service role can upload library-audio" ON storage.objects;
CREATE POLICY "Service role can upload library-audio"
ON storage.objects
FOR INSERT
TO service_role
WITH CHECK (bucket_id = 'library-audio');

-- Permitir upsert (update) para poder substituir arquivos em caso de regeração
DROP POLICY IF EXISTS "Service role can update library-audio" ON storage.objects;
CREATE POLICY "Service role can update library-audio"
ON storage.objects
FOR UPDATE
TO service_role
USING (bucket_id = 'library-audio')
WITH CHECK (bucket_id = 'library-audio');
