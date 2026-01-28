import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.1';
import { encode as base64Encode } from 'https://deno.land/std@0.168.0/encoding/base64.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Generate a simple hash for cache key
function generateCacheKey(text: string, voiceId: string): string {
  const input = `${text.toLowerCase().trim()}_${voiceId}`;
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    const char = input.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash).toString(36);
}

// Translate text using Lovable AI Gateway
async function translateText(text: string, targetLanguage: string): Promise<string> {
  const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
  if (!LOVABLE_API_KEY) {
    console.warn('LOVABLE_API_KEY not configured, skipping translation');
    return text;
  }

  const languageNames: Record<string, string> = {
    pt: 'Brazilian Portuguese',
    en: 'English',
    es: 'Spanish',
  };

  const targetLangName = languageNames[targetLanguage] || 'English';

  try {
    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          {
            role: 'system',
            content: `You are a translator. Translate the user's text to ${targetLangName}. Only return the translated text, nothing else. Keep the same tone and style. If the text is already in ${targetLangName}, return it unchanged.`,
          },
          {
            role: 'user',
            content: text,
          },
        ],
        max_tokens: 500,
      }),
    });

    if (!response.ok) {
      console.error('Translation API error:', response.status);
      return text;
    }

    const data = await response.json();
    const translatedText = data.choices?.[0]?.message?.content?.trim();
    
    if (translatedText) {
      console.log('Translation processed', { originalLength: text.length, translatedLength: translatedText.length, targetLanguage });
      return translatedText;
    }
    
    return text;
  } catch (error) {
    console.error('Translation error:', error);
    return text;
  }
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { text, voiceId = 'pFZP5JQG7iQjIQuC4Bku', targetLanguage } = await req.json();

    // Validate text input
    if (!text || typeof text !== 'string') {
      return new Response(
        JSON.stringify({ error: 'Valid text is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Validate text length (max 5000 characters as per ElevenLabs best practices)
    const MAX_TEXT_LENGTH = 5000;
    if (text.length > MAX_TEXT_LENGTH) {
      return new Response(
        JSON.stringify({ error: `Text exceeds maximum length of ${MAX_TEXT_LENGTH} characters` }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const ELEVENLABS_API_KEY = Deno.env.get('ELEVENLABS_API_KEY');
    if (!ELEVENLABS_API_KEY) {
      throw new Error('ELEVENLABS_API_KEY not configured');
    }

    // Translate text if target language is specified
    let finalText = text;
    if (targetLanguage) {
      finalText = await translateText(text, targetLanguage);
    }

    // Initialize Supabase client with service role for cache operations
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Generate cache key using translated text
    const cacheKey = generateCacheKey(finalText, voiceId);
    console.log('Cache lookup', { cacheKey, textLength: finalText.length });

    // Check cache first
    const { data: cachedAudio, error: cacheError } = await supabase
      .from('audio_cache')
      .select('audio_url')
      .eq('cache_key', cacheKey)
      .single();

    if (cachedAudio && !cacheError) {
      console.log('Cache HIT! Returning cached audio:', cachedAudio.audio_url);
      
      // Update last_accessed
      await supabase
        .from('audio_cache')
        .update({ last_accessed: new Date().toISOString() })
        .eq('cache_key', cacheKey);

      return new Response(
        JSON.stringify({ audioUrl: cachedAudio.audio_url, cached: true }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Cache MISS. Generating speech with ElevenLabs:', { textLength: finalText.length, voiceId });

    // Generate speech from text using ElevenLabs
    const response = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
      {
        method: 'POST',
        headers: {
          'xi-api-key': ELEVENLABS_API_KEY,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: finalText,
          model_id: 'eleven_multilingual_v2',
          voice_settings: {
            stability: 0.15,        // Muito baixo para variação natural de tom (como criança)
            similarity_boost: 0.9,  // Alto para manter características da voz
            style: 0.85,            // Alto para expressividade e emoção infantil
            use_speaker_boost: true,
            speed: 1.15,            // Ligeiramente mais rápido (crianças falam animadas)
          },
        }),
      }
    );

    if (!response.ok) {
      const error = await response.text();
      console.error('ElevenLabs API error:', response.status, error);
      throw new Error(`ElevenLabs API error: ${response.status}`);
    }

    const arrayBuffer = await response.arrayBuffer();
    const audioBytes = new Uint8Array(arrayBuffer);

    // Upload to Supabase Storage
    const fileName = `cache/${cacheKey}.mp3`;
    const { error: uploadError } = await supabase.storage
      .from('library-audio')
      .upload(fileName, audioBytes, {
        contentType: 'audio/mpeg',
        upsert: true,
      });

    if (uploadError) {
      console.error('Storage upload error:', uploadError);
      // Still return the audio even if caching fails
      const base64Audio = base64Encode(arrayBuffer);
      return new Response(
        JSON.stringify({ audioContent: base64Audio, cached: false }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Get public URL
    const { data: publicUrlData } = supabase.storage
      .from('library-audio')
      .getPublicUrl(fileName);

    const audioUrl = publicUrlData.publicUrl;

    // Save to cache table
    const { error: insertError } = await supabase
      .from('audio_cache')
      .insert({
        cache_key: cacheKey,
        text_content: finalText,
        voice_id: voiceId,
        audio_url: audioUrl,
      });

    if (insertError) {
      console.error('Cache insert error:', insertError);
    } else {
      console.log('Audio cached successfully:', audioUrl);
    }

    return new Response(
      JSON.stringify({ audioUrl, cached: false }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in text-to-speech function:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
