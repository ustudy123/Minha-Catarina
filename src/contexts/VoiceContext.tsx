import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface ChildVoice {
  id: string;
  name: string;
  description: {
    pt: string;
    en: string;
    es: string;
  };
  voiceId: string;
}

// Vozes infantis disponíveis no ElevenLabs
export const CHILD_VOICES: ChildVoice[] = [
  {
    id: 'the-kid',
    name: 'The Kid',
    description: {
      pt: 'Voz infantil neutra e alegre',
      en: 'Neutral and cheerful child voice',
      es: 'Voz infantil neutra y alegre',
    },
    voiceId: 'qHjcDL87pelA6RkUz0Ij',
  },
  {
    id: 'lily',
    name: 'Lily',
    description: {
      pt: 'Voz suave e doce de menina',
      en: 'Soft and sweet girl voice',
      es: 'Voz suave y dulce de niña',
    },
    voiceId: 'pFZP5JQG7iQjIQuC4Bku',
  },
  {
    id: 'river',
    name: 'River',
    description: {
      pt: 'Voz calma e gentil',
      en: 'Calm and gentle voice',
      es: 'Voz calmada y gentil',
    },
    voiceId: 'SAz9YHcvj6GT2YYXdXww',
  },
  {
    id: 'alice',
    name: 'Alice',
    description: {
      pt: 'Voz jovem e expressiva',
      en: 'Young and expressive voice',
      es: 'Voz joven y expresiva',
    },
    voiceId: 'Xb7hH8MSUJpSbSDYk0k2',
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
  },
];

interface VoiceContextType {
  selectedVoice: ChildVoice;
  setSelectedVoice: (voice: ChildVoice) => void;
  voices: ChildVoice[];
}

const VoiceContext = createContext<VoiceContextType | undefined>(undefined);

export const VoiceProvider = ({ children }: { children: ReactNode }) => {
  const [selectedVoice, setSelectedVoiceState] = useState<ChildVoice>(() => {
    const savedVoiceId = localStorage.getItem('selected-voice-id');
    const foundVoice = CHILD_VOICES.find((v) => v.id === savedVoiceId);
    return foundVoice || CHILD_VOICES[0]; // Default to "The Kid"
  });

  useEffect(() => {
    localStorage.setItem('selected-voice-id', selectedVoice.id);
  }, [selectedVoice]);

  const setSelectedVoice = (voice: ChildVoice) => {
    setSelectedVoiceState(voice);
  };

  return (
    <VoiceContext.Provider value={{ selectedVoice, setSelectedVoice, voices: CHILD_VOICES }}>
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
