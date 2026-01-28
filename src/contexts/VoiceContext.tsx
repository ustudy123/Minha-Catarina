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

// Vozes femininas para Catarina
export const FEMALE_VOICES: ChildVoice[] = [
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
];

// Vozes para Antônio (usando vozes neutras que soam infantis)
export const MALE_VOICES: ChildVoice[] = [
  {
    id: 'leo',
    name: 'Leo',
    description: {
      pt: 'Voz suave e neutra',
      en: 'Soft and neutral voice',
      es: 'Voz suave y neutra',
    },
    voiceId: 'pFZP5JQG7iQjIQuC4Bku',
    gender: 'male',
  },
  {
    id: 'bento',
    name: 'Bento',
    description: {
      pt: 'Voz doce e suave',
      en: 'Sweet and soft voice',
      es: 'Voz dulce y suave',
    },
    voiceId: 'zrHiDhphv9ZnVXBqCLjz',
    gender: 'male',
  },
];

// Todas as vozes combinadas (para compatibilidade)
export const CHILD_VOICES: ChildVoice[] = [...FEMALE_VOICES, ...MALE_VOICES];

interface VoiceContextType {
  selectedVoice: ChildVoice;
  setSelectedVoice: (voice: ChildVoice) => void;
  selectedDoll: DollType;
  setSelectedDoll: (doll: DollType) => void;
  availableVoices: ChildVoice[];
  voices: ChildVoice[]; // Para compatibilidade com código existente
  hasCompletedOnboarding: boolean;
  completeOnboarding: (doll: DollType) => void;
}

const VoiceContext = createContext<VoiceContextType | undefined>(undefined);

export const VoiceProvider = ({ children }: { children: ReactNode }) => {
  const [selectedDoll, setSelectedDollState] = useState<DollType>(() => {
    const savedDoll = localStorage.getItem('selected-doll-type');
    return (savedDoll as DollType) || 'catarina';
  });

  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState<boolean>(() => {
    return localStorage.getItem('onboarding-completed') === 'true';
  });

  const availableVoices = selectedDoll === 'catarina' ? FEMALE_VOICES : MALE_VOICES;

  const [selectedVoice, setSelectedVoiceState] = useState<ChildVoice>(() => {
    const savedVoiceId = localStorage.getItem('selected-voice-id');
    const savedDoll = localStorage.getItem('selected-doll-type') as DollType || 'catarina';
    const voicesForDoll = savedDoll === 'catarina' ? FEMALE_VOICES : MALE_VOICES;
    const foundVoice = voicesForDoll.find((v) => v.id === savedVoiceId);
    return foundVoice || voicesForDoll[0];
  });

  useEffect(() => {
    localStorage.setItem('selected-voice-id', selectedVoice.id);
  }, [selectedVoice]);

  useEffect(() => {
    localStorage.setItem('selected-doll-type', selectedDoll);
  }, [selectedDoll]);

  const setSelectedVoice = (voice: ChildVoice) => {
    setSelectedVoiceState(voice);
  };

  const setSelectedDoll = (doll: DollType) => {
    setSelectedDollState(doll);
    // Reset voice to first available for the new doll
    const newVoices = doll === 'catarina' ? FEMALE_VOICES : MALE_VOICES;
    setSelectedVoiceState(newVoices[0]);
  };

  const completeOnboarding = (doll: DollType) => {
    setSelectedDoll(doll);
    setHasCompletedOnboarding(true);
    localStorage.setItem('onboarding-completed', 'true');
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
