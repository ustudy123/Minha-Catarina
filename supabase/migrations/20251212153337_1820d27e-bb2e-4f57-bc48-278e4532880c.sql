-- Create audio_cache table for storing generated audio references
CREATE TABLE public.audio_cache (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  cache_key TEXT NOT NULL UNIQUE,
  text_content TEXT NOT NULL,
  voice_id TEXT NOT NULL,
  audio_url TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  last_accessed TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create index for fast cache lookups
CREATE INDEX idx_audio_cache_key ON public.audio_cache(cache_key);

-- Enable RLS
ALTER TABLE public.audio_cache ENABLE ROW LEVEL SECURITY;

-- Allow all authenticated users to read from cache
CREATE POLICY "Anyone can read audio cache"
ON public.audio_cache
FOR SELECT
TO authenticated
USING (true);

-- Allow service role to insert/update (edge function uses service role)
CREATE POLICY "Service role can insert audio cache"
ON public.audio_cache
FOR INSERT
TO service_role
WITH CHECK (true);

CREATE POLICY "Service role can update audio cache"
ON public.audio_cache
FOR UPDATE
TO service_role
USING (true);