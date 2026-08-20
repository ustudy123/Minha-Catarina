import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type DollType = 'catarina' | 'antonio';

export interface ChildVoice {
  id: string;
  name: string;
  description: {
    pt: string;
    en: string;
    es: string;
  };
  voiceId: string;
  gender: 'female' | 'male';
}

// Modo Antônio (boneco menino) foi removido do produto. O tipo DollType e
// os hooks selectedDoll/setSelectedDoll são mantidos apenas por
// retrocompatibilidade: o valor sempre será 'catarina'.

// Vozes femininas para Catarina
export const FEMALE_VOICES: ChildVoice[] = [
  {
    id: 'voz1',
    name: 'Voz 1',
    description: {
      pt: 'Voz infantil natural',
      en: 'Natural child voice',
      es: 'Voz infantil natural',
    },
    voiceId: 'Q6ic84dDGldojtRLsDTp',
    gender: 'female',
  },
  {
    id: 'voz2',
    name: 'Voz 2',
    description: {
      pt: 'Voz infantil fofa',
      en: 'Cute child voice',
      es: 'Voz infantil tierna',
    },
    voiceId: 'TTGjcNbsD6mgd4Yt8Tbl',
    gender: 'female',
  },
  {
    id: 'voz3',
    name: 'Voz 3',
    description: {
      pt: 'Voz infantil expressiva',
      en: 'Expressive child voice',
      es: 'Voz infantil expresiva',
    },
    voiceId: 'L34NP9RouyxSO2YShKBQ',
    gender: 'female',
  },
  {
    id: 'moranguinho2',
    name: 'Moranguinho 2',
    description: {
      pt: 'Voz doce e alegre',
      en: 'Sweet and cheerful voice',
      es: 'Voz dulce y alegre',
    },
    voiceId: 'Q6ic84dDGldojtRLsDTp',
    gender: 'female',
  },
];

// Vozes masculinas removidas. Mantido export vazio para não quebrar imports.
export const MALE_VOICES: ChildVoice[] = [];

// Todas as vozes combinadas (para compatibilidade)
export const CHILD_VOICES: ChildVoice[] = [...FEMALE_VOICES];

interface VoiceContextType {
  selectedVoice: ChildVoice;
  setSelectedVoice: (voice: ChildVoice) => void;
  selectedDoll: DollType;
  setSelectedDoll: (doll: DollType) => void;
  availableVoices: ChildVoice[];
  voices: ChildVoice[]; // Para compatibilidade com código existente
  hasCompletedOnboarding: boolean;
  completeOnboarding: (doll: DollType) => void;
  playbackSpeed: number;
  setPlaybackSpeed: (speed: number) => void;
}

const VoiceContext = createContext<VoiceContextType | undefined>(undefined);

export const VoiceProvider = ({ children }: { children: ReactNode }) => {
  // selectedDoll travado em 'catarina' (modo Antônio removido).
  // Ainda expomos o hook para não quebrar componentes que consomem.
  const [selectedDoll, setSelectedDollState] = useState<DollType>('catarina');

  const [hasCompletedOnboarding] = useState<boolean>(true);
  const [playbackSpeed, setPlaybackSpeedState] = useState<number>(() => {
    const savedSpeed = localStorage.getItem('playback-speed');
    return savedSpeed ? parseFloat(savedSpeed) : 1.0;
  });

  const availableVoices = FEMALE_VOICES;

  const [selectedVoice, setSelectedVoiceState] = useState<ChildVoice>(() => {
    const savedVoiceId = localStorage.getItem('selected-voice-id');
    const foundVoice = FEMALE_VOICES.find((v) => v.id === savedVoiceId);

    // Se a voz salva não existe mais (ex: usuário tinha 'leo' salvo antes da
    // remoção do Antônio), limpa o localStorage e cai na primeira feminina.
    if (!foundVoice && savedVoiceId) {
      localStorage.removeItem('selected-voice-id');
    }

    return foundVoice || FEMALE_VOICES[0];
  });
  
  // Garante que a voz selecionada sempre seja válida quando as vozes disponíveis mudam
  React.useEffect(() => {
    const isVoiceValid = availableVoices.some(v => v.id === selectedVoice.id);
    if (!isVoiceValid && availableVoices.length > 0) {
      setSelectedVoiceState(availableVoices[0]);
      localStorage.setItem('selected-voice-id', availableVoices[0].id);
    }
  }, [availableVoices, selectedVoice.id]);

  useEffect(() => {
    localStorage.setItem('selected-voice-id', selectedVoice.id);
  }, [selectedVoice]);

  // Limpar preferência antiga do localStorage — o Antônio não existe mais.
  useEffect(() => {
    localStorage.removeItem('selected-doll-type');
  }, []);

  const setPlaybackSpeed = (speed: number) => {
    setPlaybackSpeedState(speed);
    localStorage.setItem('playback-speed', speed.toString());
  };

  const setSelectedVoice = (voice: ChildVoice) => {
    setSelectedVoiceState(voice);
  };

  // Noop: modo Antônio removido, boneca é sempre a Catarina.
  const setSelectedDoll = (_doll: DollType) => {
    // intencionalmente vazio
  };

  const completeOnboarding = (_doll: DollType) => {
    // intencionalmente vazio
  };

  return (
    <VoiceContext.Provider
      value={{
        selectedVoice,
        setSelectedVoice,
        selectedDoll,
        setSelectedDoll,
        availableVoices,
        voices: availableVoices,
        hasCompletedOnboarding,
        completeOnboarding,
        playbackSpeed,
        setPlaybackSpeed,
      }}
    >
      {children}
    </VoiceContext.Provider>
  );
};

export const useVoice = () => {
  const context = useContext(VoiceContext);
  if (context === undefined) {
    throw new Error('useVoice must be used within a VoiceProvider');
  }
  return context;
};
