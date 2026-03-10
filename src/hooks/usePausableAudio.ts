import { useState, useRef, useCallback } from 'react';
import { useTextToSpeech } from './useTextToSpeech';
import { useAudioPlayer } from './useAudioPlayer';
import { useLanguage } from '@/contexts/LanguageContext';
import { audioCache } from './useAudioPreloader';
import { useVoice } from '@/contexts/VoiceContext';

// Regex to match pause syntax: [pausa:5s] or [pause:5s]
const PAUSE_REGEX = /\[(?:pausa|pause):(\d+)s?\]/gi;

interface PauseSegment {
  type: 'text' | 'pause';
  content: string;
  duration?: number; // in seconds, for pause type
}

interface PausableAudioState {
  isPlaying: boolean;
  isLoading: boolean;
  isPaused: boolean; // currently in a pause segment
  pauseTimeRemaining: number; // seconds remaining in current pause
  currentSegment: number;
  totalSegments: number;
}

export function usePausableAudio() {
  const { language } = useLanguage();
  const { selectedVoice } = useVoice();
  const { generate, isGenerating } = useTextToSpeech();
  const audioPlayer = useAudioPlayer();

  const [state, setState] = useState<PausableAudioState>({
    isPlaying: false,
    isLoading: false,
    isPaused: false,
    pauseTimeRemaining: 0,
    currentSegment: 0,
    totalSegments: 0,
  });

  const segmentsRef = useRef<PauseSegment[]>([]);
  const isPlayingRef = useRef(false);
  const pauseTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pauseEndTimeRef = useRef<number>(0);

  // Parse text into segments (text and pauses)
  const parseText = useCallback((text: string): PauseSegment[] => {
    const segments: PauseSegment[] = [];
    let lastIndex = 0;

    // Reset the regex
    PAUSE_REGEX.lastIndex = 0;

    let match: RegExpExecArray | null;
    while ((match = PAUSE_REGEX.exec(text)) !== null) {
      // Add text before this pause
      const textBefore = text.slice(lastIndex, match.index).trim();
      if (textBefore) {
        segments.push({ type: 'text', content: textBefore });
      }

      // Add the pause segment
      const pauseDuration = parseInt(match[1], 10);
      segments.push({ 
        type: 'pause', 
        content: match[0], 
        duration: pauseDuration 
      });

      lastIndex = match.index + match[0].length;
    }

    // Add remaining text after last pause
    const remainingText = text.slice(lastIndex).trim();
    if (remainingText) {
      segments.push({ type: 'text', content: remainingText });
    }

    // If no pauses found, return the whole text as single segment
    if (segments.length === 0 && text.trim()) {
      segments.push({ type: 'text', content: text.trim() });
    }

    return segments;
  }, []);

  const startPauseTimer = useCallback((duration: number, onComplete: () => void) => {
    pauseEndTimeRef.current = Date.now() + duration * 1000;
    
    setState(prev => ({ 
      ...prev, 
      isPaused: true, 
      pauseTimeRemaining: duration 
    }));

    if (pauseTimerRef.current) {
      clearInterval(pauseTimerRef.current);
    }

    pauseTimerRef.current = setInterval(() => {
      const remaining = Math.max(0, Math.ceil((pauseEndTimeRef.current - Date.now()) / 1000));
      
      setState(prev => ({ ...prev, pauseTimeRemaining: remaining }));

      if (remaining <= 0) {
        if (pauseTimerRef.current) {
          clearInterval(pauseTimerRef.current);
          pauseTimerRef.current = null;
        }
        setState(prev => ({ ...prev, isPaused: false, pauseTimeRemaining: 0 }));
        onComplete();
      }
    }, 100);
  }, []);

  const playSegment = useCallback(async (
    index: number, 
    segments: PauseSegment[], 
    targetLanguage?: 'pt' | 'en' | 'es'
  ) => {
    if (!isPlayingRef.current || index >= segments.length) {
      // End of playback
      setState({
        isPlaying: false,
        isLoading: false,
        isPaused: false,
        pauseTimeRemaining: 0,
        currentSegment: 0,
        totalSegments: 0,
      });
      isPlayingRef.current = false;
      return;
    }

    const segment = segments[index];

    setState(prev => ({ 
      ...prev, 
      currentSegment: index + 1 
    }));

    if (segment.type === 'pause') {
      // Handle pause segment
      startPauseTimer(segment.duration || 5, () => {
        playSegment(index + 1, segments, targetLanguage);
      });
    } else {
      // Handle text segment - check cache first, then generate
      try {
        setState(prev => ({ ...prev, isLoading: true }));
        
        // Check if audio is in local cache
        const cacheKey = `${segment.content}_${targetLanguage}_${selectedVoice.voiceId}`;
        const cachedAudio = audioCache.get(cacheKey);
        
        let audioUrl: string;
        
        if (cachedAudio) {
          // Use cached audio - instant playback!
          console.log('[PausableAudio] Using cached audio');
          audioUrl = cachedAudio.url;
          setState(prev => ({ ...prev, isLoading: false }));
        } else {
          // Generate new audio
          const { url } = await generate({ 
            text: segment.content, 
            language: targetLanguage 
          });
          audioUrl = url;
        }
        
        if (audioUrl && isPlayingRef.current) {
          // Create a promise that resolves when audio ends
          const audio = new Audio(audioUrl);
          
          await new Promise<void>((resolve) => {
            audio.onended = () => resolve();
            audio.onerror = () => resolve();
            audio.play().catch(() => resolve());
          });

          // Move to next segment
          if (isPlayingRef.current) {
            playSegment(index + 1, segments, targetLanguage);
          }
        }
        
        setState(prev => ({ ...prev, isLoading: false }));
      } catch (error) {
        console.error('Error playing segment:', error);
        setState(prev => ({ ...prev, isLoading: false }));
        // Continue to next segment even on error
        if (isPlayingRef.current) {
          playSegment(index + 1, segments, targetLanguage);
        }
      }
    }
  }, [generate, startPauseTimer]);

  const play = useCallback(async (
    text: string, 
    targetLanguage?: 'pt' | 'en' | 'es'
  ) => {
    // Parse text into segments
    const segments = parseText(text);
    segmentsRef.current = segments;
    
    if (segments.length === 0) return;

    isPlayingRef.current = true;
    
    setState({
      isPlaying: true,
      isLoading: false,
      isPaused: false,
      pauseTimeRemaining: 0,
      currentSegment: 0,
      totalSegments: segments.length,
    });

    // Start playing from first segment
    playSegment(0, segments, targetLanguage);
  }, [parseText, playSegment, language]);

  const stop = useCallback(() => {
    isPlayingRef.current = false;
    
    if (pauseTimerRef.current) {
      clearInterval(pauseTimerRef.current);
      pauseTimerRef.current = null;
    }
    
    audioPlayer.stop();
    
    setState({
      isPlaying: false,
      isLoading: false,
      isPaused: false,
      pauseTimeRemaining: 0,
      currentSegment: 0,
      totalSegments: 0,
    });
  }, [audioPlayer]);

  return {
    ...state,
    isGenerating,
    play,
    stop,
    parseText, // Exported for checking if text has pauses
  };
}

// Utility function to check if text contains pause markers
export function hasPauseMarkers(text: string): boolean {
  PAUSE_REGEX.lastIndex = 0;
  return PAUSE_REGEX.test(text);
}

// Utility function to get clean text without pause markers (for display)
export function getTextWithoutPauses(text: string): string {
  return text.replace(PAUSE_REGEX, '').replace(/\s+/g, ' ').trim();
}
