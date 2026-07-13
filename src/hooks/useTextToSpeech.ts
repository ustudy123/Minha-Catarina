import { useState, useCallback } from 'react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { useVoice } from '@/contexts/VoiceContext';

export interface TTSOptions {
  text: string;
  language?: 'pt' | 'en' | 'es';
  voiceId?: string;
  silent?: boolean; // suppress toast notifications (for auto-play)
  contentType?: 'música' | 'história' | 'frase';
}

export interface TTSState {
  isGenerating: boolean;
  error: string | null;
  audioBlob: Blob | null;
  audioUrl: string | null;
  cached: boolean;
}

export const useTextToSpeech = () => {
  const { selectedVoice, playbackSpeed } = useVoice();
  const [state, setState] = useState<TTSState>({
    isGenerating: false,
    error: null,
    audioBlob: null,
    audioUrl: null,
    cached: false,
  });

  const generate = useCallback(async ({ text, language, voiceId, silent, contentType }: TTSOptions) => {
    try {
      setState(prev => ({ ...prev, isGenerating: true, error: null }));

      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        throw new Error('Você precisa estar logado para gerar voz');
      }

      // Check preloader cache first
      const { audioCache, getAudioCacheKey } = await import('./useAudioPreloader');
      const currentVoiceId = voiceId || selectedVoice.voiceId;
      const cacheKey = getAudioCacheKey(
        text, 
        language || 'pt', 
        currentVoiceId, 
        contentType || 'standard'
      );
      const preloaded = audioCache.get(cacheKey);

      if (preloaded) {
        console.log('[TTS] Using preloader cache for:', text.substring(0, 30));
        setState({
          isGenerating: false,
          error: null,
          audioBlob: preloaded.blob,
          audioUrl: preloaded.url,
          cached: true,
        });
        return { blob: preloaded.blob, url: preloaded.url, cached: true };
      }

      console.log('[TTS] Requesting voice for:', text.substring(0, 30), 'with voice:', currentVoiceId);

      const response = await fetch(
        `https://vfhspeubasrdmwqxdcaw.supabase.co/functions/v1/text-to-speech`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session.access_token}`,
          },
          body: JSON.stringify({
            text,
            voiceId: currentVoiceId,
            ...(language ? { targetLanguage: language } : {}),
            contentType,
          }),
        }
      );

      if (!response.ok) {
        let errorMessage = 'Erro ao gerar voz';
        try {
          const error = await response.json();
          console.error('[TTS] Server error response:', error);
          errorMessage = error.error || errorMessage;
        } catch (e) {
          errorMessage = `Erro ${response.status}: ${response.statusText}`;
        }
        throw new Error(errorMessage);
      }

      const data = await response.json();
      console.log('[TTS] Received response, cached:', data.cached);
      const isCached = data.cached === true;
      
      let blob: Blob;
      let url: string;

      if (data.audioUrl) {
        // Cached audio - fetch from URL
        const audioResponse = await fetch(data.audioUrl);
        blob = await audioResponse.blob();
        url = URL.createObjectURL(blob); // Create local blob URL for consistent behavior
      } else if (data.audioContent) {
        // New audio - convert base64
        const binaryString = atob(data.audioContent);
        const bytes = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
          bytes[i] = binaryString.charCodeAt(i);
        }
        blob = new Blob([bytes], { type: 'audio/mpeg' });
        url = URL.createObjectURL(blob);
      } else {
        throw new Error('Invalid response from TTS service');
      }

      // Store in preloader cache for next time
      const { audioCache: currentCache } = await import('./useAudioPreloader');
      currentCache.set(cacheKey, { url, blob });

      setState({
        isGenerating: false,
        error: null,
        audioBlob: blob,
        audioUrl: url,
        cached: isCached,
      });

      return { blob, url, cached: isCached };
    } catch (error) {
      console.error('[TTS] Error generating voice:', error);
      const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
      setState(prev => ({
        ...prev,
        isGenerating: false,
        error: errorMessage,
      }));
      if (!silent) toast.error(errorMessage);
      throw error;
    }
  }, [selectedVoice]);

  const reset = useCallback(() => {
    if (state.audioUrl && !state.cached) {
      URL.revokeObjectURL(state.audioUrl);
    }
    setState({
      isGenerating: false,
      error: null,
      audioBlob: null,
      audioUrl: null,
      cached: false,
    });
  }, [state.audioUrl, state.cached]);

  return {
    ...state,
    generate,
    reset,
  };
};
