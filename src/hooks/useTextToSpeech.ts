import { useState, useCallback } from 'react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { useVoice } from '@/contexts/VoiceContext';

export interface TTSOptions {
  text: string;
  language?: 'pt' | 'en' | 'es';
  voiceId?: string;
}

export interface TTSState {
  isGenerating: boolean;
  error: string | null;
  audioBlob: Blob | null;
  audioUrl: string | null;
  cached: boolean;
}

export const useTextToSpeech = () => {
  const { selectedVoice } = useVoice();
  const [state, setState] = useState<TTSState>({
    isGenerating: false,
    error: null,
    audioBlob: null,
    audioUrl: null,
    cached: false,
  });

  const generate = useCallback(async ({ text, language, voiceId }: TTSOptions) => {
    try {
      setState(prev => ({ ...prev, isGenerating: true, error: null }));

      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        throw new Error('Você precisa estar logado para gerar voz');
      }

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
            voiceId: voiceId || selectedVoice.voiceId,
            ...(language ? { targetLanguage: language } : {}),
          }),
        }
      );

      if (!response.ok) {
        let errorMessage = 'Erro ao gerar voz';
        try {
          const error = await response.json();
          errorMessage = error.error || errorMessage;
        } catch (e) {
          errorMessage = `Erro ${response.status}: ${response.statusText}`;
        }
        throw new Error(errorMessage);
      }

      const data = await response.json();
      const isCached = data.cached === true;
      
      let blob: Blob;
      let url: string;

      if (data.audioUrl) {
        // Cached audio - fetch from URL
        const audioResponse = await fetch(data.audioUrl);
        blob = await audioResponse.blob();
        url = data.audioUrl;
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

      setState({
        isGenerating: false,
        error: null,
        audioBlob: blob,
        audioUrl: url,
        cached: isCached,
      });

      toast.success(isCached ? 'Áudio carregado do cache!' : 'Voz gerada com sucesso!');
      return { blob, url, cached: isCached };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
      setState(prev => ({
        ...prev,
        isGenerating: false,
        error: errorMessage,
      }));
      toast.error(errorMessage);
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
  }, [state.audioUrl]);

  return {
    ...state,
    generate,
    reset,
  };
};
