import { useState, useRef, useCallback, useEffect } from 'react';
import { useTextToSpeech } from './useTextToSpeech';
import { useAudioPlayer } from './useAudioPlayer';
import { useLanguage } from '@/contexts/LanguageContext';

// Generic interface for any playable phrase
export interface PlayablePhrase {
  id: string;
  text: string;
  durationMinutes?: number;
}

interface SequentialPlayerState {
  isPlaying: boolean;
  currentIndex: number;
  timeRemaining: number; // segundos restantes
  currentPhraseId: string | null;
  totalPhrases: number;
}

export function useSequentialPlayer() {
  const { language } = useLanguage();
  const { generate } = useTextToSpeech();
  const audioPlayer = useAudioPlayer();
  
  const [state, setState] = useState<SequentialPlayerState>({
    isPlaying: false,
    currentIndex: 0,
    timeRemaining: 0,
    currentPhraseId: null,
    totalPhrases: 0,
  });

  const phrasesRef = useRef<PlayablePhrase[]>([]);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const phraseEndTimeRef = useRef<number>(0);
  const isPlayingRef = useRef(false);

  // Limpar timer ao desmontar
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  const playPhrase = useCallback(async (phrase: PlayablePhrase) => {
    try {
      const { url } = await generate({ text: phrase.text, language });
      if (url && isPlayingRef.current) {
        await audioPlayer.play(url);
      }
    } catch (error) {
      console.error('Error playing phrase:', error);
    }
  }, [generate, language, audioPlayer]);

  const startTimer = useCallback((durationMinutes: number, onComplete: () => void) => {
    const durationSeconds = durationMinutes * 60;
    phraseEndTimeRef.current = Date.now() + durationSeconds * 1000;
    
    setState(prev => ({ ...prev, timeRemaining: durationSeconds }));

    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    timerRef.current = setInterval(() => {
      const remaining = Math.max(0, Math.ceil((phraseEndTimeRef.current - Date.now()) / 1000));
      
      setState(prev => ({ ...prev, timeRemaining: remaining }));

      if (remaining <= 0) {
        if (timerRef.current) {
          clearInterval(timerRef.current);
        }
        onComplete();
      }
    }, 1000);
  }, []);

  const playNext = useCallback(async (index: number, phrases: PlayablePhrase[], random: boolean, defaultDuration: number) => {
    if (!isPlayingRef.current || index >= phrases.length) {
      // Fim da sequência
      setState({
        isPlaying: false,
        currentIndex: 0,
        timeRemaining: 0,
        currentPhraseId: null,
        totalPhrases: 0,
      });
      isPlayingRef.current = false;
      audioPlayer.stop();
      return;
    }

    const currentPhrase = phrases[index];
    
    setState(prev => ({
      ...prev,
      currentIndex: index,
      currentPhraseId: currentPhrase.id,
    }));

    // Tocar a frase
    await playPhrase(currentPhrase);

    // Usar duração da frase ou duração padrão
    const duration = currentPhrase.durationMinutes || defaultDuration;

    // Iniciar timer para esta frase
    startTimer(duration, () => {
      // Quando o timer acabar, avançar para próxima
      let nextIndex = index + 1;
      
      if (random && phrases.length > 1) {
        // Modo aleatório: escolher uma frase diferente
        do {
          nextIndex = Math.floor(Math.random() * phrases.length);
        } while (nextIndex === index && phrases.length > 1);
      }

      playNext(nextIndex, phrases, random, defaultDuration);
    });

    // Loop: repetir a mesma frase durante o período do timer
    const repeatPhrase = async () => {
      if (!isPlayingRef.current) return;
      
      // Verificar se ainda está no período desta frase
      if (phraseEndTimeRef.current > Date.now()) {
        // Esperar o áudio terminar e tocar novamente
        const checkAndRepeat = () => {
          if (!isPlayingRef.current) return;
          if (phraseEndTimeRef.current > Date.now() && !audioPlayer.isPlaying) {
            playPhrase(currentPhrase).then(() => {
              setTimeout(checkAndRepeat, 500);
            });
          } else if (phraseEndTimeRef.current > Date.now()) {
            setTimeout(checkAndRepeat, 500);
          }
        };
        setTimeout(checkAndRepeat, 500);
      }
    };

    repeatPhrase();
  }, [playPhrase, startTimer, audioPlayer]);

  const startPlayAll = useCallback((phrases: PlayablePhrase[], random: boolean = false, defaultDuration: number = 1) => {
    if (phrases.length === 0) return;

    phrasesRef.current = phrases;
    isPlayingRef.current = true;
    
    setState({
      isPlaying: true,
      currentIndex: 0,
      timeRemaining: 0,
      currentPhraseId: null,
      totalPhrases: phrases.length,
    });

    const startIndex = random ? Math.floor(Math.random() * phrases.length) : 0;
    playNext(startIndex, phrases, random, defaultDuration);
  }, [playNext]);

  const stop = useCallback(() => {
    isPlayingRef.current = false;
    
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    
    audioPlayer.stop();
    
    setState({
      isPlaying: false,
      currentIndex: 0,
      timeRemaining: 0,
      currentPhraseId: null,
      totalPhrases: 0,
    });
  }, [audioPlayer]);

  return {
    ...state,
    startPlayAll,
    stop,
  };
}
