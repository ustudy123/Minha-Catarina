import { useState, useRef, useCallback, useEffect } from 'react';
import { useTextToSpeech } from './useTextToSpeech';
import { useLanguage } from '@/contexts/LanguageContext';

export interface PlayablePhrase {
  id: string;
  text: string;
}

interface SequentialPlayerState {
  isPlaying: boolean;
  currentIndex: number;
  timeRemaining: number;
  currentPhraseId: string | null;
  totalPhrases: number;
}

export function useSequentialPlayer() {
  const { language } = useLanguage();
  const { generate } = useTextToSpeech();

  const [state, setState] = useState<SequentialPlayerState>({
    isPlaying: false,
    currentIndex: 0,
    timeRemaining: 0,
    currentPhraseId: null,
    totalPhrases: 0,
  });

  const phrasesRef = useRef<PlayablePhrase[]>([]);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isPlayingRef = useRef(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const cleanup = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
  }, []);

  useEffect(() => {
    return cleanup;
  }, [cleanup]);

  const playNext = useCallback(async (index: number, phrases: PlayablePhrase[], random: boolean, intervalSeconds: number) => {
    if (!isPlayingRef.current || index >= phrases.length) {
      cleanup();
      setState({
        isPlaying: false,
        currentIndex: 0,
        timeRemaining: 0,
        currentPhraseId: null,
        totalPhrases: 0,
      });
      isPlayingRef.current = false;
      return;
    }

    const currentPhrase = phrases[index];

    setState(prev => ({
      ...prev,
      currentIndex: index,
      currentPhraseId: currentPhrase.id,
      timeRemaining: 0,
    }));

    try {
      const { url } = await generate({ text: currentPhrase.text, language });
      if (!url || !isPlayingRef.current) return;

      // Play audio and wait for it to end
      const audio = new Audio(url);
      audioRef.current = audio;

      await new Promise<void>((resolve) => {
        audio.onended = () => resolve();
        audio.onerror = () => resolve();
        audio.play().catch(() => resolve());
      });

      if (!isPlayingRef.current) return;

      // Determine next index
      let nextIndex = index + 1;
      if (random && phrases.length > 1) {
        do {
          nextIndex = Math.floor(Math.random() * phrases.length);
        } while (nextIndex === index);
      }

      // If there are more phrases, wait the interval then play next
      if (nextIndex < phrases.length || (random && isPlayingRef.current)) {
        // For random mode, allow looping; for sequential, stop at end
        if (!random && nextIndex >= phrases.length) {
          cleanup();
          setState({
            isPlaying: false,
            currentIndex: 0,
            timeRemaining: 0,
            currentPhraseId: null,
            totalPhrases: 0,
          });
          isPlayingRef.current = false;
          return;
        }

        // Start countdown for interval
        let remaining = intervalSeconds;
        setState(prev => ({ ...prev, timeRemaining: remaining }));

        timerRef.current = setInterval(() => {
          remaining -= 1;
          setState(prev => ({ ...prev, timeRemaining: Math.max(0, remaining) }));
          if (remaining <= 0 && timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
          }
        }, 1000);

        timeoutRef.current = setTimeout(() => {
          playNext(nextIndex, phrases, random, intervalSeconds);
        }, intervalSeconds * 1000);
      } else {
        // Done
        cleanup();
        setState({
          isPlaying: false,
          currentIndex: 0,
          timeRemaining: 0,
          currentPhraseId: null,
          totalPhrases: 0,
        });
        isPlayingRef.current = false;
      }
    } catch (error) {
      console.error('Error playing phrase:', error);
      // Try next phrase on error
      const nextIndex = random 
        ? Math.floor(Math.random() * phrases.length)
        : index + 1;
      if (isPlayingRef.current) {
        playNext(nextIndex, phrases, random, intervalSeconds);
      }
    }
  }, [generate, language, cleanup]);

  const startPlayAll = useCallback((phrases: PlayablePhrase[], random: boolean = false, intervalMinutes: number = 1, useSeconds: boolean = false) => {
    if (phrases.length === 0) return;

    cleanup();
    phrasesRef.current = phrases;
    isPlayingRef.current = true;

    const intervalSeconds = useSeconds ? intervalMinutes : intervalMinutes * 60;

    setState({
      isPlaying: true,
      currentIndex: 0,
      timeRemaining: 0,
      currentPhraseId: null,
      totalPhrases: phrases.length,
    });

    const startIndex = random ? Math.floor(Math.random() * phrases.length) : 0;
    playNext(startIndex, phrases, random, intervalSeconds);
  }, [playNext, cleanup]);

  const stop = useCallback(() => {
    isPlayingRef.current = false;
    cleanup();
    setState({
      isPlaying: false,
      currentIndex: 0,
      timeRemaining: 0,
      currentPhraseId: null,
      totalPhrases: 0,
    });
  }, [cleanup]);

  return {
    ...state,
    startPlayAll,
    stop,
  };
}
