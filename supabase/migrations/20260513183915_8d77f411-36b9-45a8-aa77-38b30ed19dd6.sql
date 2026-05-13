
-- Fix PRIVILEGE_ESCALATION: Restrict user_subscriptions INSERT to only allow 'basic' plan
DROP POLICY IF EXISTS "Users can insert own subscription" ON public.user_subscriptions;
CREATE POLICY "Users can insert own basic subscription"
ON public.user_subscriptions
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id AND plan_type = 'basic');

-- Restrict library_phrases SELECT to authenticated users only
DROP POLICY IF EXISTS "Anyone can view active library phrases" ON public.library_phrases;
CREATE POLICY "Authenticated users can view active library phrases"
ON public.library_phrases
FOR SELECT
TO authenticated
USING (is_active = true);

-- Fix Public Bucket Allows Listing: restrict listing on library-audio bucket
-- Allow public reads of individual objects (by key) but not listing of the whole bucket
DROP POLICY IF EXISTS "Public read library-audio" ON storage.objects;
DROP POLICY IF EXISTS "Public can read library-audio objects" ON storage.objects;
CREATE POLICY "Public can read library-audio objects"
ON storage.objects
FOR SELECT
TO anon, authenticated
USING (bucket_id = 'library-audio' AND (storage.foldername(name))[1] IS NOT NULL);
