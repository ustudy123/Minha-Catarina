import { useState, useRef, useCallback, useEffect } from 'react';
import { useVoice } from '@/contexts/VoiceContext';

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
  const { playbackSpeed } = useVoice();
  const [state, setState] = useState<AudioPlayerState>({
    isPlaying: false,
    isLoading: false,
    error: null,
    currentTime: 0,
    duration: 0,
    volume: 1,
    playbackRate: playbackSpeed,
  });
  
  const isPlayingRef = useRef(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const currentSourceRef = useRef<string | null>(null);
  // true = URL foi criada pelo player (a partir de Blob) e ele deve revogá-la
  // false = URL veio de fora (ex: cache do preloader) e não pode ser revogada aqui
  const ownsCurrentSourceRef = useRef<boolean>(false);

  const play = useCallback(async (audioSource: string | Blob) => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));

      // Stop current audio if playing
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = ""; // Clear src to stop loading
        audioRef.current = null;
      }

      isPlayingRef.current = true;

      // Create new audio element
      const audio = new Audio();
      audioRef.current = audio;

      // Set source
      if (typeof audioSource === 'string') {
        audio.src = audioSource;
        currentSourceRef.current = audioSource;
        ownsCurrentSourceRef.current = false;
      } else {
        const url = URL.createObjectURL(audioSource);
        audio.src = url;
        currentSourceRef.current = url;
        ownsCurrentSourceRef.current = true;
      }

      audioRef.current.volume = state.volume;
      audioRef.current.playbackRate = state.playbackRate;

      // Event listeners with cleanup tracking
      const handleLoadedMetadata = () => {
        setState(prev => ({ 
          ...prev, 
          duration: audio.duration,
          isLoading: false 
        }));
      };

      const handleTimeUpdate = () => {
        setState(prev => ({ ...prev, currentTime: audio.currentTime }));
      };

      const handleEnded = () => {
        setState(prev => ({ 
          ...prev, 
          isPlaying: false, 
          currentTime: 0 
        }));
        if (currentSourceRef.current && ownsCurrentSourceRef.current) {
          URL.revokeObjectURL(currentSourceRef.current);
        }
        // Clean up listeners
        audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
        audio.removeEventListener('timeupdate', handleTimeUpdate);
        audio.removeEventListener('ended', handleEnded);
        audio.removeEventListener('error', handleError);
      };

      const handleError = (e: Event) => {
        setState(prev => ({ 
          ...prev, 
          isPlaying: false, 
          isLoading: false,
          error: 'Erro ao reproduzir áudio' 
        }));
        console.error('Audio playback error:', e);
        // Clean up listeners
        audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
        audio.removeEventListener('timeupdate', handleTimeUpdate);
        audio.removeEventListener('ended', handleEnded);
        audio.removeEventListener('error', handleError);
      };

      audio.addEventListener('loadedmetadata', handleLoadedMetadata);
      audio.addEventListener('timeupdate', handleTimeUpdate);
      audio.addEventListener('ended', handleEnded);
      audio.addEventListener('error', handleError);

      if (!isPlayingRef.current) {
        if (currentSourceRef.current && ownsCurrentSourceRef.current) {
          URL.revokeObjectURL(currentSourceRef.current);
        }
        return;
      }

      await audio.play();
      if (!isPlayingRef.current) {
        audio.pause();
        return;
      }
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

  // Toca e resolve a Promise só quando o áudio TERMINA (ou dá erro).
  // Útil para encadear fala -> efeito sonoro sem um cortar o outro.
  const playAndWait = useCallback(async (audioSource: string | Blob): Promise<void> => {
    await play(audioSource);
    return new Promise<void>((resolve) => {
      const audio = audioRef.current;
      if (!audio) {
        resolve();
        return;
      }
      const done = () => {
        audio.removeEventListener('ended', done);
        audio.removeEventListener('error', done);
        resolve();
      };
      audio.addEventListener('ended', done);
      audio.addEventListener('error', done);
    });
  }, [play]);

  const stop = useCallback(() => {
    if (audioRef.current) {
      isPlayingRef.current = false;
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current.src = ""; // Important to stop loading/buffering
      setState(prev => ({ ...prev, isPlaying: false, currentTime: 0 }));
      
      if (currentSourceRef.current) {
        if (ownsCurrentSourceRef.current) {
          URL.revokeObjectURL(currentSourceRef.current);
        }
        currentSourceRef.current = null;
        ownsCurrentSourceRef.current = false;
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

  // Update playback rate when global speed changes
  useEffect(() => {
    setPlaybackRate(playbackSpeed);
  }, [playbackSpeed, setPlaybackRate]);

  return {
    ...state,
    play,
    playAndWait,
    pause,
    stop,
    setVolume,
    seek,
    setPlaybackRate,
  };
};
