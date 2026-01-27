import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Verify authentication
    const authHeader = req.headers.get('Authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized: Missing or invalid authorization header' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const SUPABASE_URL = Deno.env.get('SUPABASE_URL');
    const SUPABASE_ANON_KEY = Deno.env.get('SUPABASE_ANON_KEY');

    if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
      return new Response(
        JSON.stringify({ error: 'Missing Supabase configuration' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      global: { headers: { Authorization: authHeader } }
    });

    const token = authHeader.replace('Bearer ', '');
    const { data: claimsData, error: claimsError } = await supabaseClient.auth.getClaims(token);
    
    if (claimsError || !claimsData?.claims) {
      console.error('Auth error:', claimsError);
      return new Response(
        JSON.stringify({ error: 'Unauthorized: Invalid token' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const userId = claimsData.claims.sub;
    console.log(`Authenticated user: ${userId}`);

    // Check admin role
    const { data: isAdmin, error: roleError } = await supabaseClient
      .rpc('has_role', { _user_id: userId, _role: 'admin' });

    if (roleError || !isAdmin) {
      console.error('Admin check failed:', roleError);
      return new Response(
        JSON.stringify({ error: 'Forbidden: Admin access required' }),
        { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`Admin verified: ${userId}`);

    const { phrases, language } = await req.json();
    
    if (!phrases || !Array.isArray(phrases)) {
      return new Response(
        JSON.stringify({ error: 'phrases array is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const ELEVENLABS_API_KEY = Deno.env.get('ELEVENLABS_API_KEY');
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

    if (!ELEVENLABS_API_KEY || !SUPABASE_SERVICE_ROLE_KEY) {
      return new Response(
        JSON.stringify({ error: 'Missing required environment variables' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Use service role for storage and database operations after admin verification
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
    
    // Voice IDs for different languages
    const voiceIds: Record<string, string> = {
      pt: 'FGY2WhTYpPnrIDTdsKH5', // Laura - good for Portuguese
      en: 'EXAVITQu4vr4xnSDxMaL', // Sarah
      es: 'XrExE9yKIg1WjnnlVkGX', // Matilda
    };

    const results: { phraseKey: string; success: boolean; audioUrl?: string; error?: string }[] = [];

    for (const phrase of phrases) {
      const { phraseKey, text, category, isSfx, soundPrompt } = phrase;
      
      try {
        let audioBuffer: ArrayBuffer;
        
        if (isSfx && soundPrompt) {
          // Generate sound effect
          const sfxResponse = await fetch(
            'https://api.elevenlabs.io/v1/sound-generation',
            {
              method: 'POST',
              headers: {
                'xi-api-key': ELEVENLABS_API_KEY,
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                text: soundPrompt,
                duration_seconds: 10,
                prompt_influence: 0.3,
              }),
            }
          );

          if (!sfxResponse.ok) {
            throw new Error(`SFX API error: ${sfxResponse.status}`);
          }

          audioBuffer = await sfxResponse.arrayBuffer();
        } else {
          // Generate TTS
          const voiceId = voiceIds[language] || voiceIds.pt;
          const ttsResponse = await fetch(
            `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}?output_format=mp3_44100_128`,
            {
              method: 'POST',
              headers: {
                'xi-api-key': ELEVENLABS_API_KEY,
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                text,
                model_id: 'eleven_multilingual_v2',
                voice_settings: {
                  stability: 0.5,
                  similarity_boost: 0.75,
                },
              }),
            }
          );

          if (!ttsResponse.ok) {
            throw new Error(`TTS API error: ${ttsResponse.status}`);
          }

          audioBuffer = await ttsResponse.arrayBuffer();
        }

        // Upload to storage
        const fileName = `${phraseKey}.mp3`;
        const { error: uploadError } = await supabase.storage
          .from('library-audio')
          .upload(fileName, audioBuffer, {
            contentType: 'audio/mpeg',
            upsert: true,
          });

        if (uploadError) {
          throw new Error(`Storage error: ${uploadError.message}`);
        }

        // Get public URL
        const { data: urlData } = supabase.storage
          .from('library-audio')
          .getPublicUrl(fileName);

        const audioUrl = urlData.publicUrl;

        // Insert/update in library_audio table
        const { error: dbError } = await supabase
          .from('library_audio')
          .upsert({
            phrase_key: phraseKey,
            category,
            language,
            audio_url: audioUrl,
          }, {
            onConflict: 'phrase_key',
          });

        if (dbError) {
          throw new Error(`DB error: ${dbError.message}`);
        }

        results.push({ phraseKey, success: true, audioUrl });
        
        // Small delay to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 500));
        
      } catch (error) {
        console.error(`Error generating audio for ${phraseKey}:`, error);
        results.push({ 
          phraseKey, 
          success: false, 
          error: error instanceof Error ? error.message : 'Unknown error' 
        });
      }
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        results,
        generated: results.filter(r => r.success).length,
        failed: results.filter(r => !r.success).length,
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in generate-library-audio:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
