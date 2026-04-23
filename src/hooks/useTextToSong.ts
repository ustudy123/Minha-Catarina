import { useState, useCallback } from 'react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

export interface TTSongOptions {
  text: string;
  style?: 'lullaby' | 'cheerful' | 'calm' | 'nursery';
  language?: 'pt' | 'en' | 'es';
  durationSeconds?: number;
  silent?: boolean;
}

export interface TTSongState {
  isGenerating: boolean;
  error: string | null;
  audioUrl: string | null;
  cached: boolean;
}

export const useTextToSong = () => {
  const [state, setState] = useState<TTSongState>({
    isGenerating: false,
    error: null,
    audioUrl: null,
    cached: false,
  });

  const generate = useCallback(async ({ text, style, language, durationSeconds, silent }: TTSongOptions) => {
    try {
      setState(prev => ({ ...prev, isGenerating: true, error: null }));

      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error('Você precisa estar logado para gerar música');

      const response = await fetch(
        `https://vfhspeubasrdmwqxdcaw.supabase.co/functions/v1/text-to-song`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session.access_token}`,
          },
          body: JSON.stringify({ text, style, language, durationSeconds }),
        }
      );

      if (!response.ok) {
        let msg = 'Erro ao gerar música';
        try {
          const e = await response.json();
          msg = e.error || msg;
        } catch {
          msg = `Erro ${response.status}`;
        }
        throw new Error(msg);
      }

      const data = await response.json();
      let url: string;

      if (data.audioUrl) {
        url = data.audioUrl;
      } else if (data.audioContent) {
        const bin = atob(data.audioContent);
        const bytes = new Uint8Array(bin.length);
        for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
        const blob = new Blob([bytes], { type: 'audio/mpeg' });
        url = URL.createObjectURL(blob);
      } else {
        throw new Error('Resposta inválida da API de música');
      }

      setState({
        isGenerating: false,
        error: null,
        audioUrl: url,
        cached: data.cached === true,
      });

      if (!silent) {
        toast.success(data.cached ? 'Música carregada do cache!' : 'Música gerada! 🎵');
      }
      return { url, cached: data.cached === true };
    } catch (error) {
      const msg = error instanceof Error ? error.message : 'Erro desconhecido';
      setState(prev => ({ ...prev, isGenerating: false, error: msg }));
      if (!silent) toast.error(msg);
      throw error;
    }
  }, []);

  return { ...state, generate };
};
