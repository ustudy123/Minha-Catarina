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
    isPlayingRef.current = false;
    cleanup();
    resetPlayerState();
  }, [cleanup, resetPlayerState]);

  useEffect(() => {
    return cleanup;
  }, [cleanup]);

  const playAudioUrl = useCallback(async (url: string): Promise<boolean> => {
    const audio = audioRef.current ?? new Audio();
    audioRef.current = audio;

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
    clearScheduledPlayback();

    if (!isPlayingRef.current || index >= phrases.length) {
      finishPlayback();
      return;
    }

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

    try {
      // Don't pass language to avoid unwanted AI translation of library phrases
      const { url } = await generate({ text: currentPhrase.text });
      if (!isPlayingRef.current) return;

      if (!url) {
        finishPlayback();
        return;
      }

      let playedSuccessfully = await playAudioUrl(url);

      if (!playedSuccessfully && isPlayingRef.current) {
        playedSuccessfully = await playAudioUrl(url);
      }

      if (!isPlayingRef.current) return;

      if (!playedSuccessfully) {
        finishPlayback();
        return;
      }

      let nextIndex = index + 1;
      if (random && phrases.length > 1) {
        do {
          nextIndex = Math.floor(Math.random() * phrases.length);
        } while (nextIndex === index);
      }

      if (nextIndex < phrases.length || (random && isPlayingRef.current)) {
        if (!random && nextIndex >= phrases.length) {
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
          playNext(nextIndex, phrases, random, intervalSeconds);
        }, intervalSeconds * 1000);
      } else {
        finishPlayback();
      }
    } catch (error) {
      console.error('Error playing phrase:', error);
      finishPlayback();
    }
  }, [clearScheduledPlayback, finishPlayback, generate, language, playAudioUrl]);

  const startPlayAll = useCallback((phrases: PlayablePhrase[], random: boolean = false, intervalMinutes: number = 1, useSeconds: boolean = false) => {
    if (phrases.length === 0) return;

    cleanup();
    isPlayingRef.current = true;

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
