import { useState, useCallback, useRef, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useVoice } from '@/contexts/VoiceContext';

interface CachedAudio {
  url: string;
  blob: Blob;
}

// Global in-memory cache to persist across component re-renders
const audioCache = new Map<string, CachedAudio>();

export function useAudioPreloader() {
  const { selectedVoice, playbackSpeed } = useVoice();
  const [preloadingCount, setPreloadingCount] = useState(0);
  const [preloadedCount, setPreloadedCount] = useState(0);
  const abortControllerRef = useRef<AbortController | null>(null);

  // Generate a cache key for a phrase (must match useTextToSpeech key format)
  const getCacheKey = useCallback((text: string, language: string, voiceId?: string): string => {
    return `${text}_${language}_${voiceId || selectedVoice.voiceId}_standard_speed_${playbackSpeed}`;
  }, [selectedVoice.voiceId, playbackSpeed]);

  // Check if audio is already cached
  const isCached = useCallback((text: string, language: string, voiceId?: string): boolean => {
    const key = getCacheKey(text, language, voiceId);
    return audioCache.has(key);
  }, [getCacheKey]);

  // Get cached audio
  const getCachedAudio = useCallback((text: string, language: string, voiceId?: string): CachedAudio | null => {
    const key = getCacheKey(text, language, voiceId);
    return audioCache.get(key) || null;
  }, [getCacheKey]);

  // Preload a single phrase (silent, no toast)
  const preloadOne = useCallback(async (
    text: string, 
    language: 'pt' | 'en' | 'es' = 'pt',
    voiceId?: string
  ): Promise<boolean> => {
    const key = getCacheKey(text, language, voiceId);
    
    // Skip if already cached
    if (audioCache.has(key)) {
      return true;
    }

    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return false;

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
            targetLanguage: language,
            speed: playbackSpeed,
          }),
        }
      );

      if (!response.ok) return false;

      const data = await response.json();
      let blob: Blob;
      let url: string;

      if (data.audioUrl) {
        const audioResponse = await fetch(data.audioUrl);
        blob = await audioResponse.blob();
        url = data.audioUrl;
      } else if (data.audioContent) {
        const binaryString = atob(data.audioContent);
        const bytes = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
          bytes[i] = binaryString.charCodeAt(i);
        }
        blob = new Blob([bytes], { type: 'audio/mpeg' });
        url = URL.createObjectURL(blob);
      } else {
        return false;
      }

      audioCache.set(key, { url, blob });
      return true;
    } catch (error) {
      console.error('Preload error:', error);
      return false;
    }
  }, [getCacheKey, selectedVoice.voiceId]);

  // Preload multiple phrases in sequence (to avoid overwhelming the API)
  const preloadMany = useCallback(async (
    phrases: Array<{ text: string; language?: 'pt' | 'en' | 'es' }>,
    options?: { delayMs?: number; maxConcurrent?: number }
  ) => {
    const { delayMs = 200, maxConcurrent = 2 } = options || {};
    
    // Filter out already cached phrases
    const toPreload = phrases.filter(p => !isCached(p.text, p.language || 'pt'));
    
    if (toPreload.length === 0) {
      console.log('[Preloader] All phrases already cached');
      return;
    }

    console.log(`[Preloader] Starting preload of ${toPreload.length} phrases`);
    setPreloadingCount(toPreload.length);
    setPreloadedCount(0);

    // Process in batches
    for (let i = 0; i < toPreload.length; i += maxConcurrent) {
      const batch = toPreload.slice(i, i + maxConcurrent);
      
      await Promise.all(
        batch.map(async (phrase) => {
          const success = await preloadOne(phrase.text, phrase.language || 'pt');
          if (success) {
            setPreloadedCount(prev => prev + 1);
          }
        })
      );

      // Small delay between batches to be gentle on the API
      if (i + maxConcurrent < toPreload.length && delayMs > 0) {
        await new Promise(resolve => setTimeout(resolve, delayMs));
      }
    }

    console.log('[Preloader] Preload complete');
    setPreloadingCount(0);
  }, [isCached, preloadOne]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  return {
    preloadOne,
    preloadMany,
    isCached,
    getCachedAudio,
    preloadingCount,
    preloadedCount,
    isPreloading: preloadingCount > 0,
    cacheSize: audioCache.size,
  };
}

// Export the cache for use in other hooks
export { audioCache };
