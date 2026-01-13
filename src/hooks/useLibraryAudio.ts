import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface LibraryAudioMap {
  [phraseKey: string]: string; // phraseKey -> audio_url
}

export const useLibraryAudio = () => {
  const [audioMap, setAudioMap] = useState<LibraryAudioMap>({});
  const [isLoading, setIsLoading] = useState(true);

  const fetchAudioMap = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('library_audio')
        .select('phrase_key, audio_url');

      if (error) throw error;

      const map: LibraryAudioMap = {};
      data?.forEach(item => {
        map[item.phrase_key] = item.audio_url;
      });
      
      setAudioMap(map);
    } catch (error) {
      console.error('Error fetching library audio:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAudioMap();
  }, [fetchAudioMap]);

  const getAudioUrl = useCallback((phraseKey: string): string | null => {
    return audioMap[phraseKey] || null;
  }, [audioMap]);

  const hasPreloadedAudio = useCallback((phraseKey: string): boolean => {
    return !!audioMap[phraseKey];
  }, [audioMap]);

  return {
    audioMap,
    isLoading,
    getAudioUrl,
    hasPreloadedAudio,
    refetch: fetchAudioMap,
  };
};
