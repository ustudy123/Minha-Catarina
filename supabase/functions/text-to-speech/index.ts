import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.1';
import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors';
import { encode as base64Encode } from 'https://deno.land/std@0.168.0/encoding/base64.ts';

class TTSProviderError extends Error {
  constructor(message: string, readonly status: number) {
    super(message);
  }
}

const wait = (milliseconds: number) => new Promise(resolve => setTimeout(resolve, milliseconds));

async function generateWithLovableAI(text: string, isMusic: boolean): Promise<Response> {
  const apiKey = Deno.env.get('LOVABLE_API_KEY');
  if (!apiKey) {
    throw new TTSProviderError('LOVABLE_API_KEY não está configurada para o provedor alternativo de voz.', 500);
  }

  const maxAttempts = 3;
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    const response = await fetch('https://ai.gateway.lovable.dev/v1/audio/speech', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'openai/gpt-4o-mini-tts',
        input: text,
        voice: 'alloy',
        instructions: isMusic
          ? 'Fale como uma canção infantil: ritmo alegre, dicção clara e pausas naturais.'
          : 'Fale com voz acolhedora, natural e dicção clara para uma criança.',
        response_format: 'mp3',
        stream_format: 'audio',
      }),
    });

    if (response.ok) return response;

    const errorBody = await response.text().catch(() => '');
    const retryable = response.status === 429 || response.status >= 500;
    if (!retryable || attempt === maxAttempts - 1) {
      let message = errorBody;
      try {
        const parsed = JSON.parse(errorBody);
        message = parsed.message || parsed.error?.message || errorBody;
      } catch {
        // Preserve the provider response as the actionable error message.
      }
      throw new TTSProviderError(message || `Lovable AI retornou HTTP ${response.status}.`, response.status);
    }

    const retryAfterSeconds = Number(response.headers.get('Retry-After'));
    const delayMs = Number.isFinite(retryAfterSeconds) && retryAfterSeconds > 0
      ? retryAfterSeconds * 1000
      : Math.min(1000 * (2 ** attempt), 4000) + Math.floor(Math.random() * 250);
    await wait(delayMs);
  }

  throw new TTSProviderError('Não foi possível gerar o áudio pelo provedor alternativo.', 502);
}

// Generate a simple hash for cache key
function generateCacheKey(text: string, voiceId: string, contentType?: string, language?: string): string {
  // Inclui language para evitar colisão caso a tradução tenha falhado
  // silenciosamente e o texto ficar igual entre idiomas.
  const input = `${text.toLowerCase().trim()}_${language || 'pt'}_${voiceId}_${contentType || 'standard'}`;
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    const char = input.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return `${text.length}_${language || 'pt'}_${Math.abs(hash).toString(36)}`;
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
    const { text, voiceId = 'Q6ic84dDGldojtRLsDTp', targetLanguage, contentType } = await req.json();

    if (typeof text !== 'string' || text.trim().length === 0 || text.length > 5000) {
      return new Response(
        JSON.stringify({ error: 'O texto deve conter entre 1 e 5000 caracteres.' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
      );
    }

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
    const cacheKey = generateCacheKey(processedText, voiceId, contentType, targetLanguage);
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

    console.log('Cache MISS. Generating speech:', { textLength: processedText.length, voiceId, isMusic });

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

    // Prefer the configured ElevenLabs voice. If its quota is exhausted, use
    // Lovable AI so uncached phrases continue working instead of blanking the UI.
    let response: Response | null = null;
    let provider = 'elevenlabs';
    if (ELEVENLABS_API_KEY) {
      const maxRetries = 3;
      for (let attempt = 0; attempt < maxRetries; attempt++) {
        response = await fetch(
          `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}?output_format=mp3_44100_128`,
          {
            method: 'POST',
            headers: {
              'xi-api-key': ELEVENLABS_API_KEY,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              text: processedText,
              // IMPORTANTE: eleven_multilingual_v2 SEMPRE, para todo o app.
              // As vozes da Catarina são Instant Voice Clones criados em PT-BR,
              // e clones só preservam a identidade no multilingual_v2. No
              // turbo_v2_5 eles degradam para uma voz genérica (todas soam
              // iguais). A economia do turbo não compensa a perda de identidade
              // — e com o cache funcionando, cada frase é gerada uma vez só.
              model_id: 'eleven_multilingual_v2',
              voice_settings: voiceSettings,
            }),
          }
        );

        if (response.status === 429 && attempt < maxRetries - 1) {
          const retryAfterSeconds = Number(response.headers.get('Retry-After'));
          const waitMs = Number.isFinite(retryAfterSeconds) && retryAfterSeconds > 0
            ? retryAfterSeconds * 1000
            : Math.pow(2, attempt + 1) * 1000;
          console.warn(`Rate limited (429). Retrying in ${waitMs}ms (attempt ${attempt + 1}/${maxRetries})`);
          await response.text();
          await wait(waitMs);
          continue;
        }
        break;
      }
    } else {
      console.warn('ELEVENLABS_API_KEY is not configured; using Lovable AI fallback.');
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

      const shouldFallback = !response
        || elevenStatus === 'quota_exceeded'
        || elevenStatus === 'invalid_api_key'
        || status === 401
        || status === 402
        || status === 403;
      if (shouldFallback) {
        console.warn('ElevenLabs unavailable; switching to Lovable AI.', { reason: elevenStatus || 'missing_key' });
        const fallbackText = isMusic ? formatarTextoMusica(finalText) : finalText;
        response = await generateWithLovableAI(fallbackText, isMusic);
        provider = 'lovable-ai';
      } else {
        let friendlyMessage = `Erro ElevenLabs ${status}`;
        if (elevenStatus === 'invalid_api_key' || (status === 401 && !elevenStatus)) {
          friendlyMessage = `Chave da API ElevenLabs inválida ou expirada. Detalhe: ${elevenMessage}`;
        } else if (elevenStatus === 'voice_not_found') {
          friendlyMessage = `Voz não disponível para essa chave/plano. Detalhe: ${elevenMessage}`;
        } else if (status === 429) {
          friendlyMessage = 'Limite de requisições da ElevenLabs atingido. Tente novamente em alguns segundos.';
        } else if (elevenMessage) {
          friendlyMessage = `Erro ElevenLabs ${status} [${elevenStatus}]: ${elevenMessage}`;
        }
        throw new TTSProviderError(friendlyMessage, status || 502);
      }
    }

    const arrayBuffer = await response.arrayBuffer();
    const audioBytes = new Uint8Array(arrayBuffer);
    const base64Audio = base64Encode(arrayBuffer);
    const fileName = `cache/${cacheKey}.mp3`;

    // Persistência em background: NÃO bloqueia a resposta para o usuário.
    // O áudio já vai pelo base64; o upload no Storage e o insert no
    // audio_cache acontecem em paralelo e ficam prontos para servir o
    // próximo pedido da mesma frase via cache.
    const persistCache = async () => {
      try {
        const { error: uploadError } = await supabase.storage
          .from('library-audio')
          .upload(fileName, audioBytes, {
            contentType: 'audio/mpeg',
            upsert: true,
          });
        if (uploadError) {
          console.error('Background storage upload error:', uploadError);
          return;
        }
        const { data: publicUrlData } = supabase.storage
          .from('library-audio')
          .getPublicUrl(fileName);
        const { error: insertError } = await supabase
          .from('audio_cache')
          .insert({
            cache_key: cacheKey,
            text_content: finalText,
            voice_id: voiceId,
            audio_url: publicUrlData.publicUrl,
          });
        if (insertError) {
          console.error('Background cache insert error:', insertError);
        } else {
          console.log('Audio cached in background:', publicUrlData.publicUrl);
        }
      } catch (err) {
        console.error('Background persistence error:', err);
      }
    };

    // EdgeRuntime.waitUntil mantém o worker vivo até a Promise resolver,
    // sem segurar a resposta HTTP.
    // @ts-ignore Deno.EdgeRuntime é fornecido pelo runtime das Edge Functions
    // Do not persist fallback audio under an ElevenLabs voice cache key. This
    // lets the phrase automatically return to its selected voice after quota
    // or credential recovery; the browser still caches it for this session.
    if (provider !== 'elevenlabs') {
      console.log('Skipping persistent cache for fallback audio.');
    } else if (typeof EdgeRuntime !== 'undefined' && EdgeRuntime?.waitUntil) {
      // @ts-ignore
      EdgeRuntime.waitUntil(persistCache());
    } else {
      // Fallback local (dev): dispara sem await
      persistCache();
    }

    return new Response(
      JSON.stringify({ audioContent: base64Audio, cached: false, provider }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in text-to-speech function:', error);
    const status = error instanceof TTSProviderError ? error.status : 500;
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      {
        status,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
