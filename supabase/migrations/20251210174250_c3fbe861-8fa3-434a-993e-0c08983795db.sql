-- Tabela de assinaturas do usuário
CREATE TABLE public.user_subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  plan_type TEXT NOT NULL DEFAULT 'basic' CHECK (plan_type IN ('basic', 'premium')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  expires_at TIMESTAMPTZ,
  UNIQUE(user_id)
);

-- Enable RLS
ALTER TABLE public.user_subscriptions ENABLE ROW LEVEL SECURITY;

-- Policies for user_subscriptions
CREATE POLICY "Users can view own subscription"
ON public.user_subscriptions
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own subscription"
ON public.user_subscriptions
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Tabela de rotinas (playlists)
CREATE TABLE public.routines (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  name TEXT NOT NULL,
  play_random BOOLEAN DEFAULT false,
  interval_minutes INTEGER DEFAULT 1 CHECK (interval_minutes IN (1, 3, 5)),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.routines ENABLE ROW LEVEL SECURITY;

-- Policies for routines
CREATE POLICY "Users can view own routines"
ON public.routines
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own routines"
ON public.routines
FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own routines"
ON public.routines
FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own routines"
ON public.routines
FOR DELETE
USING (auth.uid() = user_id);

-- Tabela de frases dentro das rotinas
CREATE TABLE public.routine_phrases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  routine_id UUID REFERENCES public.routines(id) ON DELETE CASCADE NOT NULL,
  phrase_id TEXT NOT NULL,
  phrase_text TEXT NOT NULL,
  phrase_source TEXT DEFAULT 'library' CHECK (phrase_source IN ('library', 'saved', 'favorites')),
  position INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.routine_phrases ENABLE ROW LEVEL SECURITY;

-- Policies for routine_phrases (based on routine ownership)
CREATE POLICY "Users can view phrases in own routines"
ON public.routine_phrases
FOR SELECT
USING (EXISTS (
  SELECT 1 FROM public.routines 
  WHERE routines.id = routine_phrases.routine_id 
  AND routines.user_id = auth.uid()
));

CREATE POLICY "Users can insert phrases in own routines"
ON public.routine_phrases
FOR INSERT
WITH CHECK (EXISTS (
  SELECT 1 FROM public.routines 
  WHERE routines.id = routine_phrases.routine_id 
  AND routines.user_id = auth.uid()
));

CREATE POLICY "Users can update phrases in own routines"
ON public.routine_phrases
FOR UPDATE
USING (EXISTS (
  SELECT 1 FROM public.routines 
  WHERE routines.id = routine_phrases.routine_id 
  AND routines.user_id = auth.uid()
));

CREATE POLICY "Users can delete phrases in own routines"
ON public.routine_phrases
FOR DELETE
USING (EXISTS (
  SELECT 1 FROM public.routines 
  WHERE routines.id = routine_phrases.routine_id 
  AND routines.user_id = auth.uid()
));

-- Adicionar campo time_of_day na tabela saved_phrases
ALTER TABLE public.saved_phrases 
ADD COLUMN IF NOT EXISTS time_of_day TEXT CHECK (time_of_day IN ('morning', 'afternoon', 'night'));

-- Trigger para atualizar updated_at nas rotinas
CREATE TRIGGER update_routines_updated_at
BEFORE UPDATE ON public.routines
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();