import { useState, useCallback, useRef, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useVoice } from '@/contexts/VoiceContext';

interface CachedAudio {
  url: string;
  blob: Blob;
}

// Global in-memory cache to persist across component re-renders
const audioCache = new Map<string, CachedAudio>();

// Shared utility to generate consistent cache keys
export const getAudioCacheKey = (
  text: string, 
  language: string = 'pt', 
  voiceId: string, 
  contentType: string = 'standard'
): string => {
  return `${text}_${language}_${voiceId}_${contentType}`;
};

export function useAudioPreloader() {
  const { selectedVoice } = useVoice();
  const [preloadingCount, setPreloadingCount] = useState(0);
  const [preloadedCount, setPreloadedCount] = useState(0);
  const abortControllerRef = useRef<AbortController | null>(null);

  // Wrapper for consistency
  const getLocalCacheKey = useCallback((text: string, language: string = 'pt', voiceId?: string, contentType: string = 'standard'): string => {
    return getAudioCacheKey(text, language, voiceId || selectedVoice.voiceId, contentType);
  }, [selectedVoice.voiceId]);

  // Check if audio is already cached
  const isCached = useCallback((text: string, language: string = 'pt', voiceId?: string, contentType: string = 'standard'): boolean => {
    const key = getLocalCacheKey(text, language, voiceId, contentType);
    return audioCache.has(key);
  }, [getLocalCacheKey]);

  // Get cached audio
  const getCachedAudio = useCallback((text: string, language: string = 'pt', voiceId?: string, contentType: string = 'standard'): CachedAudio | null => {
    const key = getLocalCacheKey(text, language, voiceId, contentType);
    return audioCache.get(key) || null;
  }, [getLocalCacheKey]);

  // Preload a single phrase (silent, no toast)
  const preloadOne = useCallback(async (
    text: string, 
    language: 'pt' | 'en' | 'es' = 'pt',
    voiceId?: string,
    contentType: string = 'standard'
  ): Promise<boolean> => {
    const key = getLocalCacheKey(text, language, voiceId, contentType);
    
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
            contentType,
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
  }, [getLocalCacheKey, selectedVoice.voiceId]);

  // Preload multiple phrases in sequence (to avoid overwhelming the API)
  const preloadMany = useCallback(async (
    phrases: Array<{ text: string; language?: 'pt' | 'en' | 'es'; category?: string }>,
    options?: { delayMs?: number; maxConcurrent?: number }
  ) => {
    const { delayMs = 150, maxConcurrent = 3 } = options || {};
    
    // Filter out already cached phrases
    const toPreload = phrases.filter(p => !isCached(p.text, p.language || 'pt', undefined, p.category));
    
    if (toPreload.length === 0) {
      return;
    }

    setPreloadingCount(toPreload.length);
    setPreloadedCount(0);

    // Process in batches
    for (let i = 0; i < toPreload.length; i += maxConcurrent) {
      const batch = toPreload.slice(i, i + maxConcurrent);
      
      await Promise.all(
        batch.map(async (phrase) => {
          const contentType = phrase.category === 'música' || phrase.category === 'Songs' ? 'música' : 'standard';
          const success = await preloadOne(phrase.text, phrase.language || 'pt', undefined, contentType);
          if (success) {
            setPreloadedCount(prev => prev + 1);
          }
        })
      );

      if (i + maxConcurrent < toPreload.length && delayMs > 0) {
        await new Promise(resolve => setTimeout(resolve, delayMs));
      }
    }

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