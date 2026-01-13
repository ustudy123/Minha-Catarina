import { useState, useCallback } from 'react';
import { toast } from 'sonner';

interface SFXOptions {
  prompt: string;
  duration?: number;
}

interface SFXState {
  isGenerating: boolean;
  error: string | null;
  audioUrl: string | null;
}

export const useSoundEffects = () => {
  const [state, setState] = useState<SFXState>({
    isGenerating: false,
    error: null,
    audioUrl: null,
  });

  const generate = useCallback(async ({ prompt, duration }: SFXOptions): Promise<{ url: string | null }> => {
    setState(prev => ({ ...prev, isGenerating: true, error: null }));

    try {
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

      const response = await fetch(
        `${supabaseUrl}/functions/v1/elevenlabs-sfx`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'apikey': supabaseKey,
            'Authorization': `Bearer ${supabaseKey}`,
          },
          body: JSON.stringify({ prompt, duration }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
        throw new Error(errorData.error || `Request failed: ${response.status}`);
      }

      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);

      setState({
        isGenerating: false,
        error: null,
        audioUrl,
      });

      return { url: audioUrl };

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to generate sound';
      console.error('Sound effect generation error:', error);
      
      setState({
        isGenerating: false,
        error: errorMessage,
        audioUrl: null,
      });

      toast.error('Erro ao gerar efeito sonoro', {
        description: errorMessage,
      });

      return { url: null };
    }
  }, []);

  const reset = useCallback(() => {
    if (state.audioUrl) {
      URL.revokeObjectURL(state.audioUrl);
    }
    setState({
      isGenerating: false,
      error: null,
      audioUrl: null,
    });
  }, [state.audioUrl]);

  return {
    ...state,
    generate,
    reset,
  };
};
