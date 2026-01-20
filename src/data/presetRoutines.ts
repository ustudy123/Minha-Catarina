export interface PresetRoutine {
  id: string;
  name: {
    pt: string;
    en: string;
    es: string;
  };
  icon: string;
  phrases: string[];
}

export const presetRoutines: PresetRoutine[] = [
  {
    id: 'acolhimento',
    name: {
      pt: 'Acolhimento Emocional',
      en: 'Emotional Welcome',
      es: 'Acogida Emocional',
    },
    icon: '💝',
    phrases: [
      'Oi! Você chegou.',
      'Eu tô feliz de te ver.',
      'Como você tá se sentindo?',
      'Eu tô aqui com você.',
    ],
  },
  {
    id: 'choro',
    name: {
      pt: 'Quando a Criança Chora',
      en: 'When the Child Cries',
      es: 'Cuando el Niño Llora',
    },
    icon: '🥹',
    phrases: [
      'Eu vi você chorar.',
      'Chorar ajuda às vezes.',
      'Quer um abraço?',
      'Respira comigo.',
      'Agora tá um pouquinho melhor.',
    ],
  },
  {
    id: 'dividir',
    name: {
      pt: 'Dividir Brinquedos',
      en: 'Sharing Toys',
      es: 'Compartir Juguetes',
    },
    icon: '🎭',
    phrases: [
      'Esse brinquedo é legal.',
      'Você brinca primeiro.',
      'Depois eu brinco.',
      'A gente divide.',
      'Assim fica melhor.',
    ],
  },
  {
    id: 'guardar',
    name: {
      pt: 'Hora de Guardar',
      en: 'Time to Tidy Up',
      es: 'Hora de Guardar',
    },
    icon: '📦',
    phrases: [
      'A brincadeira foi boa.',
      'Agora vamos guardar.',
      'Cada coisa no lugar.',
      'Guardar é cuidar.',
      'Depois tem mais.',
    ],
  },
  {
    id: 'encerramento',
    name: {
      pt: 'Encerramento do Dia',
      en: 'End of the Day',
      es: 'Cierre del Día',
    },
    icon: '🌙',
    phrases: [
      'Hoje foi um dia bom.',
      'A gente brincou.',
      'A gente aprendeu.',
      'Eu gostei muito.',
      'Até amanhã.',
    ],
  },
];
