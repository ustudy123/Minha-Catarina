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
    id: 'gigi',
    name: 'Gigi',
    description: {
      pt: 'Voz infantil animada',
      en: 'Childish animated voice',
      es: 'Voz infantil animada',
    },
    voiceId: 'jBpfuIE2acCO8z3wKNLl',
    gender: 'female',
  },
  {
    id: 'mimi',
    name: 'Mimi',
    description: {
      pt: 'Voz de criança doce',
      en: 'Sweet child voice',
      es: 'Voz de niña dulce',
    },
    voiceId: 'zrHiDhphv9ZnVXBqCLjz',
    gender: 'female',
  },
  {
    id: 'aerisita',
    name: 'Aerisita',
    description: {
      pt: 'Voz fofa estilo kawaii',
      en: 'Cute kawaii-style voice',
      es: 'Voz tierna estilo kawaii',
    },
    voiceId: 'vGQNBgLaiM3EdZtxIiuY',
    gender: 'female',
  },
  {
    id: 'jessica',
    name: 'Jessica',
    description: {
      pt: 'Voz animada e divertida',
      en: 'Animated and fun voice',
      es: 'Voz animada y divertida',
    },
    voiceId: 'cgSgspJ2msm6clMCkdW9',
    gender: 'female',
  },
];

// Vozes masculinas para Antônio
export const MALE_VOICES: ChildVoice[] = [
  {
    id: 'junior',
    name: 'Junior',
    description: {
      pt: 'Voz de menino animada',
      en: 'Animated boy voice',
      es: 'Voz de niño animada',
    },
    voiceId: '4g0zcFn3Yhp86jjySzFf',
    gender: 'male',
  },
  {
    id: 'a-chan',
    name: 'A-Chan',
    description: {
      pt: 'Voz jovem para histórias infantis',
      en: 'Young voice for children stories',
      es: 'Voz joven para historias infantiles',
    },
    voiceId: 'VyTe5Cy1ZXnpHrKVrxwk',
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
