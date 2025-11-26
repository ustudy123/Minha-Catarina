import { useState, useCallback } from 'react';
import { toast } from 'sonner';

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
}

// Voice IDs for different languages (ElevenLabs)
const VOICE_IDS = {
  pt: 'pFZP5JQG7iQjIQuC4Bku', // Lily - soft, child-friendly voice
  en: 'XB0fDUnXU5powFXDhCwa', // Charlotte - warm, friendly
  es: 'EXAVITQu4vr4xnSDxMaL', // Sarah - gentle, clear
};

export const useTextToSpeech = () => {
  const [state, setState] = useState<TTSState>({
    isGenerating: false,
    error: null,
    audioBlob: null,
    audioUrl: null,
  });

  const generate = useCallback(async ({ text, language = 'pt', voiceId }: TTSOptions) => {
    try {
      setState(prev => ({ ...prev, isGenerating: true, error: null }));

      // Call Supabase Edge Function
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/text-to-speech`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          },
          body: JSON.stringify({
            text,
            voiceId: voiceId || VOICE_IDS[language],
          }),
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Erro ao gerar voz');
      }

      const data = await response.json();
      
      // Convert base64 to blob
      const binaryString = atob(data.audioContent);
      const bytes = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }
      const blob = new Blob([bytes], { type: 'audio/mpeg' });
      const url = URL.createObjectURL(blob);

      setState({
        isGenerating: false,
        error: null,
        audioBlob: blob,
        audioUrl: url,
      });

      toast.success('Voz gerada com sucesso!');
      return { blob, url };
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
  }, []);

  const reset = useCallback(() => {
    if (state.audioUrl) {
      URL.revokeObjectURL(state.audioUrl);
    }
    setState({
      isGenerating: false,
      error: null,
      audioBlob: null,
      audioUrl: null,
    });
  }, [state.audioUrl]);

  return {
    ...state,
    generate,
    reset,
  };
};
