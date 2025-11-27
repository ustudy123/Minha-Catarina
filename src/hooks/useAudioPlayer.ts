import { useState, useRef, useCallback } from 'react';

export interface AudioPlayerState {
  isPlaying: boolean;
  isLoading: boolean;
  error: string | null;
  currentTime: number;
  duration: number;
  volume: number;
  playbackRate: number;
}

export const useAudioPlayer = () => {
  const [state, setState] = useState<AudioPlayerState>({
    isPlaying: false,
    isLoading: false,
    error: null,
    currentTime: 0,
    duration: 0,
    volume: 1,
    playbackRate: 1,
  });

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const currentSourceRef = useRef<string | null>(null);

  const play = useCallback(async (audioSource: string | Blob) => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));

      // Stop current audio if playing
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }

      // Create new audio element
      const audio = new Audio();
      audioRef.current = audio;

      // Set source
      if (typeof audioSource === 'string') {
        audio.src = audioSource;
        currentSourceRef.current = audioSource;
      } else {
        const url = URL.createObjectURL(audioSource);
        audio.src = url;
        currentSourceRef.current = url;
      }

      audioRef.current.volume = state.volume;
      audioRef.current.playbackRate = state.playbackRate;

      // Event listeners
      audio.addEventListener('loadedmetadata', () => {
        setState(prev => ({ 
          ...prev, 
          duration: audio.duration,
          isLoading: false 
        }));
      });

      audio.addEventListener('timeupdate', () => {
        setState(prev => ({ ...prev, currentTime: audio.currentTime }));
      });

      audio.addEventListener('ended', () => {
        setState(prev => ({ 
          ...prev, 
          isPlaying: false, 
          currentTime: 0 
        }));
        if (currentSourceRef.current && typeof audioSource === 'object') {
          URL.revokeObjectURL(currentSourceRef.current);
        }
      });

      audio.addEventListener('error', (e) => {
        setState(prev => ({ 
          ...prev, 
          isPlaying: false, 
          isLoading: false,
          error: 'Erro ao reproduzir áudio' 
        }));
        console.error('Audio playback error:', e);
      });

      await audio.play();
      setState(prev => ({ ...prev, isPlaying: true, isLoading: false }));
    } catch (error) {
      setState(prev => ({ 
        ...prev, 
        isPlaying: false, 
        isLoading: false,
        error: 'Erro ao iniciar reprodução' 
      }));
      console.error('Play error:', error);
    }
  }, [state.volume, state.playbackRate]);

  const pause = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      setState(prev => ({ ...prev, isPlaying: false }));
    }
  }, []);

  const stop = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setState(prev => ({ ...prev, isPlaying: false, currentTime: 0 }));
      
      if (currentSourceRef.current) {
        URL.revokeObjectURL(currentSourceRef.current);
        currentSourceRef.current = null;
      }
    }
  }, []);

  const setVolume = useCallback((volume: number) => {
    const clampedVolume = Math.max(0, Math.min(1, volume));
    setState(prev => ({ ...prev, volume: clampedVolume }));
    if (audioRef.current) {
      audioRef.current.volume = clampedVolume;
    }
  }, []);

  const seek = useCallback((time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setState(prev => ({ ...prev, currentTime: time }));
    }
  }, []);

  const setPlaybackRate = useCallback((rate: number) => {
    const clampedRate = Math.max(0.25, Math.min(2, rate));
    if (audioRef.current) {
      audioRef.current.playbackRate = clampedRate;
    }
    setState(prev => ({ ...prev, playbackRate: clampedRate }));
  }, []);

  return {
    ...state,
    play,
    pause,
    stop,
    setVolume,
    seek,
    setPlaybackRate,
  };
};
