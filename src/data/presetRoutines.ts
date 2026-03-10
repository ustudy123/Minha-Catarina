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
    id: 'roteiro-incentivo',
    name: { pt: 'Incentivo', en: 'Encouragement', es: 'Incentivo' },
    icon: '💪',
    phrases: [
      'Você tá indo bem.',
      'Você consegue.',
      'Eu gostei do seu esforço.',
      'Você fez o seu melhor.',
      'O importante é tentar. Mas nem sempre conseguimos.',
      'Você foi paciente.',
      'Você foi corajosa.',
      'Você foi educada.',
      'Você foi incrível.',
      'Eu tenho orgulho de você.',
    ],
  },
  {
    id: 'roteiro-dificuldade',
    name: { pt: 'Dificuldade', en: 'Difficulty', es: 'Dificultad' },
    icon: '🤗',
    phrases: [
      'Calma, muita calma nessa hora.',
      'Vamos resolver esse problema. Tudo tem solução.',
      'Respira fundo e conta até cinco! Um, dois, três, quatro, cinco.',
      'O que aconteceu?',
      'Eu posso te ajudar.',
      'Agora melhorou?',
      'Você é paciente.',
      'Você é educada.',
      'Você é corajosa',
      'Eu gosto de você assim, do jeitinho que você é, é única e especial.',
      'Não precisa chorar, vai passar.',
      'Cheirinho de colo, cheirinho de pão, cheirinho gostoso, do meu coração.',
      'Gostou do meu poema?',
      'Você é minha amiga.',
      'Eu gosto muito de você.',
    ],
  },
  {
    id: 'roteiro-crianca-chora',
    name: { pt: 'Quando a criança chora', en: 'When child cries', es: 'Cuando el niño llora' },
    icon: '😢',
    phrases: [
      'Fique calma.',
      'Respire fundo.',
      'É preciso ter paciência.',
      'Porque está chorando?',
      'Chorar ajuda às vezes.',
      'Não fique triste. Isso vai passar.',
      'Quer um abraço?',
      'O abraço pode acalmar.',
      'Agora está melhor?',
      'Você é muito especial.',
    ],
  },
  {
    id: 'roteiro-hora-guardar',
    name: { pt: 'Hora de guardar', en: 'Time to tidy up', es: 'Hora de guardar' },
    icon: '🧹',
    phrases: [
      'A brincadeira foi boa. Mas acabou.',
      'Agora vamos guardar tudinho',
      'Cada coisa no lugar e vai ficar bem lindo e organizado.',
      'Guarda, guarda, guarda, bem direitinho, quem guarda tudo, acha tudo arrumadinho.',
      'Depois tem mais e mais.',
      'Você é muito querida e gentil',
    ],
  },
  {
    id: 'roteiro-catarina-fome',
    name: { pt: 'Catarina está com fome', en: 'Catarina is hungry', es: 'Catarina tiene hambre' },
    icon: '🍽️',
    phrases: [
      'Estou com fome',
      'Minha barriga roncou.',
      'Hora de comer.',
      'O que tem para comer?',
      'Não quero essa comida. Faz outra?',
      'Tá cheirando bem.',
      'Humm, tá gostoso.',
      'Estou feliz agora.',
      'Quero mais comida.',
      'Quero suco',
      'Quero sobremesa',
    ],
  },
  {
    id: 'roteiro-fim-dia',
    name: { pt: 'Fim do dia', en: 'End of the day', es: 'Fin del día' },
    icon: '🌙',
    phrases: [
      'Hoje foi um dia bom.',
      'A gente brincou.',
      'A gente aprendeu.',
      'Eu gostei muito.',
      'Precisamos dormir e descansar.',
      'Até amanhã.',
      'Gosto muito de você',
      'Você é especial.',
    ],
  },
  {
    id: 'roteiro-entrevista',
    name: { pt: 'Entrevista com a criança', en: 'Interview with the child', es: 'Entrevista con el niño' },
    icon: '🎤',
    phrases: [
      'Vou te fazer umas perguntinhas de curiosa.',
      'É uma entrevista com você.',
      'Como é seu nome inteiro?',
      'Quantos anos você tem?',
      'O que você mais gosta de fazer?',
      'O que você não gosta de fazer?',
      'Qual é a sua comida favorita?',
      'O que você não gosta de comer?',
      'Qual o seu sonho?',
      'Qual sua cor favorita?',
      'O que você vai ser quando crescer?',
      'O que você falaria ou pediria para Jesus se encontrasse ele?',
      'Adorei suas respostas.',
      'Você é muito especial.',
    ],
  },
];
