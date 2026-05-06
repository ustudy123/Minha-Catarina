import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.1';
import { encode as base64Encode } from 'https://deno.land/std@0.168.0/encoding/base64.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Cache key — depends on lyrics + style so re-renders reuse audio
function generateCacheKey(text: string, style: string): string {
  const input = `song_v3_${style}_${text.toLowerCase().trim()}`;
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    const char = input.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return `song_${Math.abs(hash).toString(36)}`;
}

function buildMusicPrompt(lyrics: string, style: string, language: string): string {
  const langName: Record<string, string> = {
    pt: 'Brazilian Portuguese',
    en: 'English',
    es: 'Spanish',
  };
  const lang = langName[language] || 'Brazilian Portuguese';

  const styleHints: Record<string, string> = {
    lullaby: 'soft lullaby with gentle acoustic guitar, slow tempo, calm and soothing',
    cheerful: 'cheerful upbeat children song with playful piano and light percussion, happy mood',
    calm: 'calm children song with soft piano, peaceful and warm, steady pace',
    nursery: 'classic nursery rhyme with a simple melody, ukulele and bells, very child-friendly, and clear rhythm',
  };
  const styleDescription = styleHints[style] || styleHints.nursery;

  // ToS-compliant prompt format aligned with ElevenLabs' own suggestion.
  // Avoid trigger words like "little girl", "4 years old", "innocent".
  return `A children's song in the style of a ${styleDescription}. The vocals should be a sweet, friendly female voice singing in ${lang} with clear pronunciation. Use simple and repetitive phrases suitable for young children. Sing the following lyrics exactly as written, every word must be sung clearly: "${lyrics}"`;
}

function buildSafeFallbackPrompt(style: string, language: string): string {
  const langName: Record<string, string> = {
    pt: 'Brazilian Portuguese',
    en: 'English',
    es: 'Spanish',
  };
  const lang = langName[language] || 'Brazilian Portuguese';
  const styleHints: Record<string, string> = {
    lullaby: 'soft lullaby with gentle acoustic guitar, slow tempo, calm and soothing',
    cheerful: 'cheerful upbeat children song with playful piano and light percussion',
    calm: 'calm children song with soft piano, peaceful and warm, steady pace',
    nursery: 'classic nursery rhyme with a simple melody, ukulele and bells, very child-friendly, and clear rhythm',
  };
  const styleDescription = styleHints[style] || styleHints.nursery;
  return `A children's song inspired by classic nursery rhymes, featuring a ${styleDescription}. The vocals should be a sweet, friendly female voice singing in ${lang} with clear pronunciation. Use simple and repetitive phrases suitable for young children, with original lyrics that evoke themes of friendship, love, and nature, maintaining a playful and gentle tone.`;
}

function preprocessLyrics(text: string): string {
  // Add commas after punctuation to encourage natural pauses and prevent skipping
  return text
    .replace(/([.!?])\s*/g, '$1, ')
    .replace(/,\s*,/g, ',') // Avoid double commas
    .split('\n')
    .map(line => line.trim())
    .filter(line => line.length > 0)
    .join('\n')
    .trim();
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const body = await req.json();
    const { text, style = 'nursery', language = 'pt', durationSeconds } = body;

    if (!text || typeof text !== 'string') {
      return new Response(
        JSON.stringify({ error: 'Valid text (lyrics) is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const MAX_TEXT_LENGTH = 2000;
    if (text.length > MAX_TEXT_LENGTH) {
      return new Response(
        JSON.stringify({ error: `Lyrics exceed ${MAX_TEXT_LENGTH} characters` }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const ELEVENLABS_API_KEY = Deno.env.get('ELEVENLABS_API_KEY');
    if (!ELEVENLABS_API_KEY) {
      throw new Error('ELEVENLABS_API_KEY not configured');
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const cacheKey = generateCacheKey(text, `${style}_${language}`);
    console.log('[text-to-song] cache lookup', { cacheKey, length: text.length });

    // Check cache
    const { data: cachedAudio } = await supabase
      .from('audio_cache')
      .select('audio_url')
      .eq('cache_key', cacheKey)
      .maybeSingle();

    if (cachedAudio?.audio_url) {
      console.log('[text-to-song] cache HIT', cachedAudio.audio_url);
      await supabase
        .from('audio_cache')
        .update({ last_accessed: new Date().toISOString() })
        .eq('cache_key', cacheKey);

      return new Response(
        JSON.stringify({ audioUrl: cachedAudio.audio_url, cached: true }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const cleanedText = preprocessLyrics(text);
    const prompt = buildMusicPrompt(cleanedText, style, language);
    console.log('[text-to-song] generating with ElevenLabs Music API');

    // Music API request body
    const musicBody: Record<string, unknown> = { prompt };
    
    // Estimate a good duration if not provided to avoid skipping words
    let finalDuration = durationSeconds;
    if (!finalDuration || finalDuration <= 0) {
      const wordCount = text.split(/\s+/).length;
      // Children's songs are usually slower (~0.7s - 1s per word)
      finalDuration = Math.max(15, Math.min(90, Math.ceil(wordCount * 0.75) + 5));
    }
    
    if (finalDuration > 0) {
      musicBody.music_length_ms = Math.round(finalDuration * 1000);
      console.log(`[text-to-song] requested duration: ${finalDuration}s for ${text.split(/\s+/).length} words`);
    }

    let response = await fetch('https://api.elevenlabs.io/v1/music', {
      method: 'POST',
      headers: {
        'xi-api-key': ELEVENLABS_API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(musicBody),
    });

    // If prompt was flagged as bad_prompt, retry with safe ToS-compliant prompt
    if (!response.ok && response.status === 400) {
      const errText = await response.text();
      const isBadPrompt = errText.includes('bad_prompt') || errText.includes('Terms of Service');
      if (isBadPrompt) {
        console.warn('[text-to-song] bad_prompt detected, retrying with safe fallback prompt');
        const safePrompt = buildSafeFallbackPrompt(style, language);
        response = await fetch('https://api.elevenlabs.io/v1/music', {
          method: 'POST',
          headers: {
            'xi-api-key': ELEVENLABS_API_KEY,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ...musicBody, prompt: safePrompt }),
        });
      } else {
        console.error('[text-to-song] ElevenLabs error', response.status, errText);
        return new Response(
          JSON.stringify({ error: `Music generation failed: ${response.status}`, details: errText }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
    }

    if (!response.ok) {
      const errText = await response.text();
      console.error('[text-to-song] ElevenLabs error (after retry)', response.status, errText);
      return new Response(
        JSON.stringify({ error: `Music generation failed: ${response.status}`, details: errText }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const arrayBuffer = await response.arrayBuffer();
    const audioBytes = new Uint8Array(arrayBuffer);

    // Upload to storage
    const fileName = `songs/${cacheKey}.mp3`;
    const { error: uploadError } = await supabase.storage
      .from('library-audio')
      .upload(fileName, audioBytes, {
        contentType: 'audio/mpeg',
        upsert: true,
      });

    if (uploadError) {
      console.error('[text-to-song] storage upload error', uploadError);
      const base64Audio = base64Encode(arrayBuffer);
      return new Response(
        JSON.stringify({ audioContent: base64Audio, cached: false }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const { data: publicUrlData } = supabase.storage
      .from('library-audio')
      .getPublicUrl(fileName);

    const audioUrl = publicUrlData.publicUrl;

    await supabase.from('audio_cache').insert({
      cache_key: cacheKey,
      text_content: text,
      voice_id: `music_${style}_${language}`,
      audio_url: audioUrl,
    });

    console.log('[text-to-song] cached', audioUrl);

    return new Response(
      JSON.stringify({ audioUrl, cached: false }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('[text-to-song] error', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
