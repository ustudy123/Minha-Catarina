import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.1';
import { encode as base64Encode } from 'https://deno.land/std@0.168.0/encoding/base64.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Generate a simple hash for cache key
function generateCacheKey(text: string, voiceId: string, contentType?: string): string {
  // Use a more robust hashing approach for longer texts
  const input = `${text.toLowerCase().trim()}_${voiceId}_${contentType || 'standard'}`;
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    const char = input.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  // Use a combination of length and hash to reduce collisions
  return `${text.length}_${Math.abs(hash).toString(36)}`;
}

function formatarTextoMusica(texto: string): string {
  let formatado = texto
    .replace(/Ah ra ra/g, "Ah... ra... ra...")
    .replace(/iu ru ru/g, "iu... ru... ru...")
    .replace(/rim rim rim/g, "rim... rim... rim...")
    .replace(/iá ro ró/g, "iá... ro... ró..."); // Sem hífen e reticências excessivas em pontuação


  // Adicionar quebra de pausa entre estrofes (linhas vazias viram "... ... ...")
  formatado = formatado.replace(/\n\s*\n/g, "\n... ... ...\n");

  // Onomatopéias em sequência - usamos reticências suaves em vez de hífen
  formatado = formatado.replace(/\b(ra|ru|rim|ró|rá)\s+(ra|ru|rim|ró|rá)\b/gi, "$1... $2");

  // Refrões (linhas curtas < 40 chars) - usar vírgula e espaço para ritmo sem quebrar a palavra
  const linhas = formatado.split("\n");
  const processadas = linhas.map(linha => {
    const limpa = linha.trim();
    if (limpa.length > 5 && limpa.length < 40 && !limpa.includes("...")) {
      // Usamos vírgula para uma pausa rítmica que não interfere na leitura da palavra
      return limpa.split(/\s+/).join(", ");
    }
    return linha;
  });

  return processadas.join("\n");
}

function wrapInSSML(text: string): string {
  const lines = text.split("\n");
  const ssmlLines = lines.map((line, index) => {
    const trimmed = line.trim();
    if (trimmed === "... ... ...") {
      return '<break time="600ms"/>';
    }
    if (trimmed.length === 0) return "";
    
    let processedLine = trimmed;
    // Adicionar <break time="150ms"/> após vírgulas em linhas curtas (refrões)
    if (trimmed.length < 40 && trimmed.includes(",")) {
      processedLine = processedLine.replace(/,/g, ',<break time="150ms"/>');
    }
    
    // Adicionar <break time="300ms"/> ao final de cada verso
    return `${processedLine}<break time="300ms"/>`;
  });

  return `<speak>\n${ssmlLines.filter(l => l).join("\n")}\n</speak>`;
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
    const ELEVENLABS_API_KEY = Deno.env.get('ELEVENLABS_API_KEY');
    if (!ELEVENLABS_API_KEY) {
      console.error('ELEVENLABS_API_KEY is not configured');
      return new Response(
        JSON.stringify({ error: 'ELEVENLABS_API_KEY is not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const { text, voiceId = 'pFZP5JQG7iQjIQuC4Bku', targetLanguage, contentType } = await req.json();

    // Translate text if target language is specified
    let finalText = text;
    if (targetLanguage) {
      finalText = await translateText(text, targetLanguage);
    }

    const isMusic = contentType === 'música';
    let processedText = finalText;

    if (isMusic) {
      processedText = formatarTextoMusica(finalText);
      processedText = wrapInSSML(processedText);
    }

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Generate cache key using processed text and voiceId
    const cacheKey = generateCacheKey(processedText, voiceId, contentType);
    console.log('Cache lookup', { cacheKey, textLength: processedText.length, isMusic });

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

    console.log('Cache MISS. Generating speech with ElevenLabs:', { textLength: processedText.length, voiceId, isMusic });

    // Voice settings based on content type
    const voiceSettings = isMusic ? {
      stability: 0.45, // Aumentado de 0.30 para 0.45 para melhorar a clareza das palavras
      similarity_boost: 0.75,
      style: 0.55,
      use_speaker_boost: true
    } : {
      stability: 0.55,
      similarity_boost: 0.80,
      style: 0.20,
      use_speaker_boost: true
    };

    // Generate speech from text using ElevenLabs
    let response: Response | null = null;
    const maxRetries = 3;
    for (let attempt = 0; attempt < maxRetries; attempt++) {
      response = await fetch(
        `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
        {
          method: 'POST',
          headers: {
            'xi-api-key': ELEVENLABS_API_KEY,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            text: processedText,
            // Turbo v2.5: 0.5 crédito/char (vs 1.0 do multilingual_v2), latência menor,
            // suporta 32 idiomas incluindo PT-BR. Qualidade ótima pra frases curtas.
            model_id: 'eleven_turbo_v2_5',
            voice_settings: voiceSettings,
          }),
        }
      );


      if (response.status === 429 && attempt < maxRetries - 1) {
        const waitMs = Math.pow(2, attempt + 1) * 1000; // 2s, 4s
        console.warn(`Rate limited (429). Retrying in ${waitMs}ms (attempt ${attempt + 1}/${maxRetries})`);
        await response.text(); // consume body
        await new Promise(r => setTimeout(r, waitMs));
        continue;
      }
      break;
    }

    if (!response || !response.ok) {
      const status = response?.status;
      const errorBody = response ? await response.text() : 'No response';
      console.error('ElevenLabs API error:', status, errorBody);

      // Tentar extrair detalhe estruturado da ElevenLabs: { detail: { status, message } } ou { detail: "..." }
      let elevenStatus = '';
      let elevenMessage = '';
      try {
        const parsed = JSON.parse(errorBody);
        if (parsed?.detail) {
          if (typeof parsed.detail === 'string') {
            elevenMessage = parsed.detail;
          } else {
            elevenStatus = parsed.detail.status || '';
            elevenMessage = parsed.detail.message || '';
          }
        }
      } catch {
        // body não era JSON; segue com texto cru
        elevenMessage = errorBody.slice(0, 200);
      }

      // Diagnóstico do workspace: quanto da chave (mascarada) está sendo usada
      const keyHint = `${ELEVENLABS_API_KEY.slice(0, 4)}...${ELEVENLABS_API_KEY.slice(-4)}`;

      let friendlyMessage = `Erro ElevenLabs ${status}`;
      if (elevenStatus === 'quota_exceeded') {
        friendlyMessage = `ElevenLabs reportou créditos esgotados para a chave em uso (${keyHint}). Pode ser que a chave seja de outra conta/workspace. Detalhe: ${elevenMessage}`;
      } else if (elevenStatus === 'invalid_api_key' || (status === 401 && !elevenStatus)) {
        friendlyMessage = `Chave da API ElevenLabs inválida ou expirada (${keyHint}). Atualize o secret ELEVENLABS_API_KEY. Detalhe: ${elevenMessage}`;
      } else if (elevenStatus === 'voice_not_found') {
        friendlyMessage = `Voz não disponível para essa chave/plano. Detalhe: ${elevenMessage}`;
      } else if (status === 429) {
        friendlyMessage = 'Limite de requisições da ElevenLabs atingido. Tente novamente em alguns segundos.';
      } else if (elevenMessage) {
        friendlyMessage = `Erro ElevenLabs ${status} [${elevenStatus}]: ${elevenMessage}`;
      }
      throw new Error(friendlyMessage);
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
