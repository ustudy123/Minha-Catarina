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
    id: "morning-routine",
    name: { pt: "Rotina Manhã", en: "Morning Routine", es: "Rutina Mañana" },
    icon: "☀️",
    phrases: [
      "Eu acordei. Vamos acordar?",
      "Acorde, acorde, acorde. É hora de acordar. Bom diaaaa!",
      "Bença.",
      "Dormiu bem?",
      "Está sol ou está chovendo lá fora? Vamos ver?",
      "Vamos tomar café da manhã?",
      "Hum, que delícia!",
      "Hora de escovar os dentes. Escovar os meus dentes. Escovar os seus dentes.",
      "Dentes limpinhos e sem bichinhos.",
      "Hora do banho. Eu gosto de tomar banho e ficar cheirosa. Você gosta de tomar banho?",
      "Está ficando limpinho e cheirosinho.",
      "Vamos nos secar. Hora de trocar a roupa e nos arrumar. Quero uma roupa bem bonita.",
      "Fiquei muito cheirosa, sente meu cheirinho?",
      "Obrigada por cuidar de mim.",
    ],
  },
  {
    id: "afternoon-routine",
    name: { pt: "Rotina Tarde", en: "Afternoon Routine", es: "Rutina Tarde" },
    icon: "🌅",
    phrases: [
      "Vamos passear? Quero passear de carrinho.",
      "Você gosta de passear?",
      "Hora de brincar. Uhullll. Do que você quer brincar?",
      "Vamos brincar juntas, mas tem que dividir os brinquedos. Me mostra seus brinquedos?",
      "Que bom brincar com você. Você é muito querida, você é a minha melhor amiga.",
      "Hora de guardar os brinquedos e arrumar essa bagunça. Cada coisa no lugar e vai ficar bem lindo e organizado.",
      "Tá na hora do lanchinho. Estou com fome.",
      "Que delícia eu vou comer tudinho e ficar muito grande e forte.",
      "Já comi tudo.",
      "Hora de descansar um pouquinho.",
    ],
  },
  {
    id: "night-routine",
    name: { pt: "Rotina Noite", en: "Night Routine", es: "Rutina Noche" },
    icon: "🌙",
    phrases: [
      "Me conte uma coisa que você amou no seu dia?",
      "Já está ficando noite. Tá na hora do jantar.",
      "Estou com fome. O que você vai fazer para eu comer hoje?",
      "Hum, que gostoso.",
      "Já comi tudo. Muito obrigada!",
      "Hora do banho, quero dormir limpinha e cheirosa! Vamos tomar banho?",
      "Hora de me secar e de colocar o pijama.",
      "Vamos escovar os dentes? Nós precisamos escovar os dentes. Primeiro você.",
      "Eu gosto muito de você do jeitinho que você é. Você é especial.",
      "Me dá um abraço?",
      "Que abraço gostoso e quentinho, cheio de carinho.",
      "Obrigada por brincar comigo. Amanhã tem mais.",
      "Eu vou dormir. Boa noite pra você, até amanhã. Sonhe com os anjinhos.",
    ],
  },
];
