-- Move phrases from education to affection category
UPDATE public.library_phrases 
SET category = 'affection'
WHERE text_pt IN (
  'Você é meu amigo.',
  'Eu gosto de você.',
  'Eu tô feliz agora.',
  'Eu tô em paz.',
  'Eu tô calma.',
  'Eu tô bem com você.'
);