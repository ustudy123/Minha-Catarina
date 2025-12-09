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
}

export const useTextToSpeech = () => {
  const { selectedVoice } = useVoice();
  const [state, setState] = useState<TTSState>({
    isGenerating: false,
    error: null,
    audioBlob: null,
    audioUrl: null,
  });

  const generate = useCallback(async ({ text, language = 'pt', voiceId }: TTSOptions) => {
    try {
      setState(prev => ({ ...prev, isGenerating: true, error: null }));

      // Get current session for auth token
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        throw new Error('Você precisa estar logado para gerar voz');
      }

      // Call Supabase Edge Function with user's JWT
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
  }, [selectedVoice]);

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
