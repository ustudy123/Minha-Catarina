-- Add English and Spanish translations for daily routine phrases
UPDATE public.library_phrases SET 
  text_en = 'Good morning!',
  text_es = '¡Buenos días!'
WHERE text_pt = 'Bom dia!' AND category = 'daily';

UPDATE public.library_phrases SET 
  text_en = 'Coffee time!',
  text_es = '¡Hora del café!'
WHERE text_pt = 'Hora do café!' AND category = 'daily';

UPDATE public.library_phrases SET 
  text_en = 'Let''s brush our teeth!',
  text_es = '¡Vamos a cepillarnos los dientes!'
WHERE text_pt = 'Vamos escovar os dentes!' AND category = 'daily';

UPDATE public.library_phrases SET 
  text_en = 'Lunchtime!',
  text_es = '¡Hora del almuerzo!'
WHERE text_pt = 'Hora do almoço!' AND category = 'daily';

UPDATE public.library_phrases SET 
  text_en = 'Shall we take a nap?',
  text_es = '¿Vamos a tomar una siesta?'
WHERE text_pt = 'Vamos tirar uma soneca?' AND category = 'daily';

UPDATE public.library_phrases SET 
  text_en = 'Shall we play?',
  text_es = '¿Vamos a jugar?'
WHERE text_pt = 'Vamos brincar?' AND category = 'daily';

UPDATE public.library_phrases SET 
  text_en = 'Dinnertime!',
  text_es = '¡Hora de la cena!'
WHERE text_pt = 'Hora do jantar!' AND category = 'daily';

UPDATE public.library_phrases SET 
  text_en = 'Shall we take a bath?',
  text_es = '¿Vamos a tomar un baño?'
WHERE text_pt = 'Vamos tomar um banho?' AND category = 'daily';

UPDATE public.library_phrases SET 
  text_en = 'Time to read a book...',
  text_es = 'Hora de leer un libro...'
WHERE text_pt = 'Hora de ler um livro…' AND category = 'daily';

UPDATE public.library_phrases SET 
  text_en = 'Tell me something you loved about your day, I loved playing with you!',
  text_es = '¡Cuéntame algo que amaste mucho de tu día, yo amé jugar contigo!'
WHERE text_pt = 'Me conte uma coisa que você amou muito no seu dia, eu amei brincar com você!' AND category = 'daily';

UPDATE public.library_phrases SET 
  text_en = 'Shall we go to sleep?',
  text_es = '¿Vamos a dormir?'
WHERE text_pt = 'Vamos dormir?' AND category = 'daily';