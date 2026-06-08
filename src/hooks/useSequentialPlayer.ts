import { useState, useRef, useCallback, useEffect } from 'react';
import { useTextToSpeech } from './useTextToSpeech';
import { useLanguage } from '@/contexts/LanguageContext';

export interface PlayablePhrase {
  id: string;
  text: string;
  category?: string;
}

interface SequentialPlayerState {
  isPlaying: boolean;
  currentIndex: number;
  timeRemaining: number;
  currentPhraseId: string | null;
  totalPhrases: number;
}

const INITIAL_STATE: SequentialPlayerState = {
  isPlaying: false,
  currentIndex: 0,
  timeRemaining: 0,
  currentPhraseId: null,
  totalPhrases: 0,
};

export function useSequentialPlayer() {
  const { language } = useLanguage();
  const { generate } = useTextToSpeech();

  const [state, setState] = useState<SequentialPlayerState>(INITIAL_STATE);

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isPlayingRef = useRef(false);
  const currentPhraseIndexRef = useRef<number | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const resetPlayerState = useCallback(() => {
    setState(INITIAL_STATE);
  }, []);

  const clearScheduledPlayback = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  const cleanup = useCallback(() => {
    clearScheduledPlayback();

    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  }, [clearScheduledPlayback]);

  const finishPlayback = useCallback(() => {
    if (!isPlayingRef.current) return;
    isPlayingRef.current = false;
    currentPhraseIndexRef.current = null;
    cleanup();
    resetPlayerState();
  }, [cleanup, resetPlayerState]);

  useEffect(() => {
    return cleanup;
  }, [cleanup]);

  const playAudioUrl = useCallback(async (url: string): Promise<boolean> => {
    const audio = audioRef.current ?? new Audio();
    audioRef.current = audio;

    if (!isPlayingRef.current) return false;

    return new Promise<boolean>((resolve) => {
      let settled = false;

      const finalize = (success: boolean) => {
        if (settled) return;
        settled = true;
        audio.removeEventListener('ended', handleEnded);
        audio.removeEventListener('error', handleError);
        resolve(success);
      };

      const handleEnded = () => finalize(true);
      const handleError = () => finalize(false);

      audio.pause();
      audio.currentTime = 0;
      audio.src = ""; // Important to stop any previous loading
      audio.addEventListener('ended', handleEnded);
      audio.addEventListener('error', handleError);
      audio.src = url;
      audio.load();

      audio.play().catch((error) => {
        console.error('Error starting sequential audio:', error);
        finalize(false);
      });
    });
  }, []);

  const playNext = useCallback(async (index: number, phrases: PlayablePhrase[], random: boolean, intervalSeconds: number) => {
    // Import preloader to use its cache
    const { audioCache } = await import('./useAudioPreloader');
    
    // Safety check: if the index being called is not what we expect, or we are not playing, abort.
    if (!isPlayingRef.current || index >= phrases.length) {
      if (isPlayingRef.current) finishPlayback();
      return;
    }

    // Important: Prevent concurrent playNext calls or calls with outdated indices
    if (currentPhraseIndexRef.current === index && state.isPlaying) {
      console.warn('[SequentialPlayer] Ignoring duplicate playNext call for index:', index);
      return;
    }
    
    currentPhraseIndexRef.current = index;
    clearScheduledPlayback();

    const currentPhrase = phrases[index];

    if (!currentPhrase?.text?.trim()) {
      const nextIndex = random && phrases.length > 1
        ? phrases.findIndex((_, phraseIndex) => phraseIndex !== index)
        : index + 1;

      if (nextIndex >= 0) {
        playNext(nextIndex, phrases, random, intervalSeconds);
      } else {
        finishPlayback();
      }
      return;
    }

    setState(prev => ({
      ...prev,
      currentIndex: index,
      currentPhraseId: currentPhrase.id,
      timeRemaining: 0,
    }));

    // Helper to compute next index
    const getNextIndex = () => {
      if (random && phrases.length > 1) {
        let ni: number;
        do {
          ni = Math.floor(Math.random() * phrases.length);
        } while (ni === index);
        return ni;
      }
      return index + 1;
    };

    // Helper to schedule the next phrase after interval
    const scheduleNext = (nextIdx: number) => {
      // Ensure we don't schedule if we've stopped
      if (!isPlayingRef.current) return;

      if (!random && nextIdx >= phrases.length) {
        finishPlayback();
        return;
      }

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
        timeoutRef.current = null;
        playNext(nextIdx, phrases, random, intervalSeconds);
      }, intervalSeconds * 1000);
    };

    try {
      const isMusic = currentPhrase.category === 'música' || currentPhrase.category === 'music' || currentPhrase.category === 'Songs';
      const { url } = await generate({ 
        text: currentPhrase.text, 
        silent: true,
        contentType: isMusic ? 'música' : 'frase'
      });
      
      if (!isPlayingRef.current) {
        if (url && url.startsWith('blob:')) URL.revokeObjectURL(url);
        return;
      }

      if (!url) {
        // Skip to next phrase instead of stopping
        console.warn('No audio URL, skipping phrase:', currentPhrase.text.substring(0, 50));
        const nextIdx = getNextIndex();
        scheduleNext(nextIdx);
        return;
      }

      let playedSuccessfully = await playAudioUrl(url);

      if (!playedSuccessfully && isPlayingRef.current) {
        playedSuccessfully = await playAudioUrl(url);
      }

      if (!isPlayingRef.current) return;

      if (!playedSuccessfully) {
        // Skip to next phrase instead of stopping
        console.warn('Audio playback failed, skipping phrase:', currentPhrase.text.substring(0, 50));
        const nextIdx = getNextIndex();
        scheduleNext(nextIdx);
        return;
      }

      const nextIdx = getNextIndex();
      scheduleNext(nextIdx);
    } catch (error) {
      console.error('Error playing phrase, skipping to next:', error);
      if (!isPlayingRef.current) return;
      // Skip to next phrase instead of stopping entirely
      const nextIdx = getNextIndex();
      scheduleNext(nextIdx);
    }
  }, [clearScheduledPlayback, finishPlayback, generate, playAudioUrl]);

  const startPlayAll = useCallback((phrases: PlayablePhrase[], random: boolean = false, intervalMinutes: number = 1, useSeconds: boolean = false) => {
    if (phrases.length === 0) return;

    cleanup();
    isPlayingRef.current = true;
    currentPhraseIndexRef.current = null;

    const intervalSeconds = useSeconds ? intervalMinutes : intervalMinutes * 60;

    setState({
      ...INITIAL_STATE,
      isPlaying: true,
      totalPhrases: phrases.length,
    });

    const startIndex = random ? Math.floor(Math.random() * phrases.length) : 0;
    playNext(startIndex, phrases, random, intervalSeconds);
  }, [playNext, cleanup]);

  const stop = useCallback(() => {
    finishPlayback();
  }, [finishPlayback]);

  return {
    ...state,
    startPlayAll,
    stop,
  };
}
