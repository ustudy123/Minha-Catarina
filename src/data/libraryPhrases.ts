// Library phrases data - organized by category
// Categories: daily, affection, education, songs, stories, playtime, sounds, prayers

export interface LibraryPhraseData {
  text: string;
  category: string;
  timeOfDay?: string;
  subCategory?: string;
  soundPrompt?: string;
}

export const libraryPhrasesData: LibraryPhraseData[] = [
  // ==================== ROTINA MANHÃ (daily - morning) ====================
  { text: "Eu acordei. Vamos acordar?", category: "daily", timeOfDay: "morning" },
  { text: "Acorde, acorde, acorde. É hora de acordar. Bom diaaaa!", category: "daily", timeOfDay: "morning" },
  { text: "Bença.", category: "daily", timeOfDay: "morning" },
  { text: "Dormiu bem?", category: "daily", timeOfDay: "morning" },
  { text: "Eu sonhei que eu era uma princesa cantora. O que você sonhou?", category: "daily", timeOfDay: "morning" },
  { text: "Às vezes temos sonhos ruins, eles se chamam pesadelos, mas não precisa ter medo, eu estou aqui.", category: "daily", timeOfDay: "morning" },
  { text: "Está sol ou está chovendo lá fora? Vamos ver?", category: "daily", timeOfDay: "morning" },
  { text: "Você prefere chuva ou sol?", category: "daily", timeOfDay: "morning" },
  { text: "Eu gosto dos dois. Um dia sol, um dia chuva.", category: "daily", timeOfDay: "morning" },
  { text: "Sol e chuva casamento de viúva. Chuva e sol casamento de espanhol.", category: "daily", timeOfDay: "morning" },
  { text: "Vamos tomar café da manhã?", category: "daily", timeOfDay: "morning" },
  { text: "O café da manhã é uma refeição muito importante. O que você gosta de comer de manhã?", category: "daily", timeOfDay: "morning" },
  { text: "Estou com fome.", category: "daily", timeOfDay: "morning", soundPrompt: "little girl around 5 years old crying softly, gentle young child whimpering, sweet kid cry" },
  { text: "Estou com sede. Quero água, por favor.", category: "daily", timeOfDay: "morning" },
  { text: "Já bebi tudo. Obrigada.", category: "daily", timeOfDay: "morning" },
  { text: "Quero um leitinho.", category: "daily", timeOfDay: "morning" },
  { text: "Hum, que delícia!", category: "daily", timeOfDay: "morning" },
  { text: "Hora de escovar os dentes. Escovar os meus dentes. Escovar os seus dentes.", category: "daily", timeOfDay: "morning" },
  { text: "Uma vez de cada. Você primeiro.", category: "daily", timeOfDay: "morning" },
  { text: "É preciso esperar. Agora é a minha vez.", category: "daily", timeOfDay: "morning" },
  { text: "Dentes limpinhos e sem bichinhos.", category: "daily", timeOfDay: "morning" },
  { text: "Fiz xixi.", category: "daily", timeOfDay: "morning", soundPrompt: "baby urination sound, small stream of liquid, gentle water trickling sound" },
  { text: "Arruma meu cabelo, por favor. Está tudo bagunçado. Coloca um lacinho no meu cabelo?", category: "daily", timeOfDay: "morning" },
  { text: "Passa um perfuminho em mim?", category: "daily", timeOfDay: "morning" },
  { text: "Fiquei muito cheirosa, sente meu cheirinho?", category: "daily", timeOfDay: "morning" },
  { text: "Coloca meu sapatinho, por favor.", category: "daily", timeOfDay: "morning" },
  { text: "Eu estou linda?", category: "daily", timeOfDay: "morning" },
  { text: "Você está muito linda e cheirosa.", category: "daily", timeOfDay: "morning" },
  { text: "Obrigada por cuidar de mim.", category: "daily", timeOfDay: "morning" },
  { text: "Estou com dor de barriga, ai ai ai ai.", category: "daily", timeOfDay: "morning", soundPrompt: "little girl around 5 years old crying softly, gentle young child whimpering, sweet kid cry" },
  { text: "Quero fazer cocô.", category: "daily", timeOfDay: "morning", soundPrompt: "baby pooping sound, funny baby bowel movement, small squelching sound" },
  { text: "Fiz cocô. Limpa meu bumbum, por favor.", category: "daily", timeOfDay: "morning" },
  { text: "Minha mão tá suja. Limpa minhas mãos, por favor.", category: "daily", timeOfDay: "morning" },
  { text: "Hora de almoçar. Precisamos comer para crescer. O que você quer comer?", category: "daily", timeOfDay: "morning" },
  { text: "Estou com fome.", category: "daily", timeOfDay: "morning", soundPrompt: "little girl around 5 years old crying softly, gentle young child whimpering, sweet kid cry" },
  { text: "O que tem para comer hoje?", category: "daily", timeOfDay: "morning" },
  { text: "Hum, que delícia, que gostoso. Quero mais.", category: "daily", timeOfDay: "morning" },
  { text: "Já comi tudo. Vou ficar mais linda e forte.", category: "daily", timeOfDay: "morning" },
  { text: "Preciso escovar os dentes agora! Você precisa escovar os dentes, para não ter bichinhos.", category: "daily", timeOfDay: "morning" },
  { text: "Que dentes lindos e limpinhos.", category: "daily", timeOfDay: "morning" },
  { text: "Estou com sono.", category: "daily", timeOfDay: "morning", soundPrompt: "little girl around 5 years old crying softly, gentle young child whimpering, sweet kid cry" },
  { text: "Quero colinho para dormir. Estou com sono. Canta uma música para eu dormir?", category: "daily", timeOfDay: "morning" },

  // ==================== ROTINA TARDE (daily - afternoon) ====================
  { text: "Vamos passear? Quero passear de carrinho.", category: "daily", timeOfDay: "afternoon" },
  { text: "Você gosta de passear?", category: "daily", timeOfDay: "afternoon" },
  { text: "Onde você gosta de passear?", category: "daily", timeOfDay: "afternoon" },
  { text: "Vamos passear no parque?", category: "daily", timeOfDay: "afternoon" },
  { text: "Estou amando nosso passeio e você?", category: "daily", timeOfDay: "afternoon" },
  { text: "Hora de brincar. Uhullll. Do que você quer brincar?", category: "daily", timeOfDay: "afternoon" },
  { text: "Vamos brincar juntas, mas tem que dividir os brinquedos. Me mostra seus brinquedos?", category: "daily", timeOfDay: "afternoon" },
  { text: "O que você mais gosta de brincar?", category: "daily", timeOfDay: "afternoon" },
  { text: "Que bom brincar com você. Você é muito querida, você é a minha melhor amiga.", category: "daily", timeOfDay: "afternoon" },
  { text: "A brincadeira foi boa e muito divertida.", category: "daily", timeOfDay: "afternoon" },
  { text: "Hora de guardar os brinquedos e arrumar essa bagunça. Cada coisa no lugar e vai ficar bem lindo e organizado.", category: "daily", timeOfDay: "afternoon" },
  { text: "Tá na hora do lanchinho. Estou com fome.", category: "daily", timeOfDay: "afternoon", soundPrompt: "little girl around 5 years old crying softly, gentle young child whimpering, sweet kid cry" },
  { text: "O que vai fazer para eu comer?", category: "daily", timeOfDay: "afternoon" },
  { text: "Que delícia eu vou comer tudinho e ficar muito grande e forte.", category: "daily", timeOfDay: "afternoon" },
  { text: "Já comi tudo.", category: "daily", timeOfDay: "afternoon" },
  { text: "Quero sobremesa.", category: "daily", timeOfDay: "afternoon" },
  { text: "Quero um biscoitinho.", category: "daily", timeOfDay: "afternoon" },
  { text: "Quero mais, por favor.", category: "daily", timeOfDay: "afternoon" },
  { text: "Eu gosto de conversar com você. Qual a sua cor favorita?", category: "daily", timeOfDay: "afternoon" },
  { text: "Minha cor preferida é cor de rosa.", category: "daily", timeOfDay: "afternoon" },
  { text: "Não estou me sentindo bem.", category: "daily", timeOfDay: "afternoon", soundPrompt: "little girl around 5 years old crying softly, gentle young child whimpering, sweet kid cry" },
  { text: "Acho que estou com gripe.", category: "daily", timeOfDay: "afternoon", soundPrompt: "cute baby sneeze, small child sneezing atchoo, adorable infant sneeze" },
  { text: "Acho que estou com febre, mede a minha temperatura, por favor!", category: "daily", timeOfDay: "afternoon" },
  { text: "Fiz um dodói. Assopra, assopra. Ai ai ai ai, tá doendo.", category: "daily", timeOfDay: "afternoon" },
  { text: "Me dá um remédio para sarar? Pode ser?", category: "daily", timeOfDay: "afternoon" },
  { text: "Passa uma pomadinha?", category: "daily", timeOfDay: "afternoon" },
  { text: "Faz um curativo, por favor?", category: "daily", timeOfDay: "afternoon" },
  { text: "Agora está melhor. Você me ajudou. Obrigada por cuidar de mim!", category: "daily", timeOfDay: "afternoon" },
  { text: "Você já se machucou alguma vez?", category: "daily", timeOfDay: "afternoon" },
  { text: "Machucar dói. Como foi que se machucou?", category: "daily", timeOfDay: "afternoon" },
  { text: "Isso dói. Mas passa. Precisa ter paciência.", category: "daily", timeOfDay: "afternoon" },
  { text: "Eu fiquei nervosa. Mas não adiantou nada.", category: "daily", timeOfDay: "afternoon" },
  { text: "Hora de descansar um pouquinho.", category: "daily", timeOfDay: "afternoon" },

  // ==================== ROTINA NOITE (daily - night) ====================
  { text: "Me conte uma coisa que você amou no seu dia?", category: "daily", timeOfDay: "night" },
  { text: "Isso foi muito legal.", category: "daily", timeOfDay: "night" },
  { text: "Já está ficando noite. Tá na hora do jantar.", category: "daily", timeOfDay: "night" },
  { text: "Estou com fome. O que você vai fazer para eu comer hoje?", category: "daily", timeOfDay: "night" },
  { text: "Hum, que gostoso.", category: "daily", timeOfDay: "night" },
  { text: "Estou feliz agora. Quero mais comida.", category: "daily", timeOfDay: "night" },
  { text: "Hummm, está uma delícia.", category: "daily", timeOfDay: "night" },
  { text: "Quero suco.", category: "daily", timeOfDay: "night" },
  { text: "Quero sobremesa. Tem um sorvetinho ou um biscoitinho?", category: "daily", timeOfDay: "night" },
  { text: "Já comi tudo. Muito obrigada!", category: "daily", timeOfDay: "night" },
  { text: "Tá sentindo esse cheirinho? Acho que fiz cocô.", category: "daily", timeOfDay: "night" },
  { text: "Me limpa, por favor? Por favor.", category: "daily", timeOfDay: "night" },
  { text: "Obrigada por cuidar de mim!", category: "daily", timeOfDay: "night" },
  { text: "Vamos escovar os dentes? Nós precisamos escovar os dentes. Primeiro você.", category: "daily", timeOfDay: "night" },
  { text: "Espera, espera, espera, paciência que já é minha vez.", category: "daily", timeOfDay: "night" },
  { text: "Agora é a minha vez, escova os meus dentinhos, por favor?", category: "daily", timeOfDay: "night" },
  { text: "Conta uma historinha para mim?", category: "daily", timeOfDay: "night" },
  { text: "Eu amei essa história. Conta de novo, por favor.", category: "daily", timeOfDay: "night" },
  { text: "Ai que frio, muito frio, me cobre, por favor.", category: "daily", timeOfDay: "night" },
  { text: "Posso dormir do seu lado?", category: "daily", timeOfDay: "night" },
  { text: "Eu gosto muito de você do jeitinho que você é. Você é especial.", category: "daily", timeOfDay: "night" },
  { text: "Vamos fazer uma oração?", category: "daily", timeOfDay: "night" },
  { text: "Bença.", category: "daily", timeOfDay: "night" },
  { text: "Estou com soninho, já é noite e está escuro lá fora, é hora de dormir.", category: "daily", timeOfDay: "night" },
  { text: "Me dá um abraço?", category: "daily", timeOfDay: "night" },
  { text: "Que abraço gostoso e quentinho, cheio de carinho.", category: "daily", timeOfDay: "night" },
  { text: "Obrigada por brincar comigo. Amanhã tem mais.", category: "daily", timeOfDay: "night" },
  { text: "Eu vou dormir. Boa noite pra você, até amanhã. Sonhe com os anjinhos.", category: "daily", timeOfDay: "night" },

  // ==================== ACOLHIMENTO (affection - acolhimento) ====================
  { text: "Oi, que bom que você chegou. Eu estava com saudade de você.", category: "affection", subCategory: "acolhimento" },
  { text: "Eu senti sua falta. Você sentiu minha falta?", category: "affection", subCategory: "acolhimento" },
  { text: "Estou feliz que você está aqui comigo. Posso ficar pertinho de você?", category: "affection", subCategory: "acolhimento" },
  { text: "Me conta como foi seu dia?", category: "affection", subCategory: "acolhimento" },
  { text: "Seu dia foi muito legal. Me dá a mão um pouquinho?", category: "affection", subCategory: "acolhimento" },
  { text: "Muito obrigada. Você é muito querida.", category: "affection", subCategory: "acolhimento" },
  { text: "Você é especial para mim. Amigos são pessoas especiais. Como é o nome das suas amigas e dos seus amigos?", category: "affection", subCategory: "acolhimento" },
  { text: "Você é minha amiga?", category: "affection", subCategory: "acolhimento" },
  { text: "Eu sou sua amiga. Eu gosto de você. Você é muito legal.", category: "affection", subCategory: "acolhimento" },
  { text: "Você é gentil e educada. Eu gosto do seu jeito. Você gosta de mim?", category: "affection", subCategory: "acolhimento" },
  { text: "Eu fico feliz com você. Vamos conversar?", category: "affection", subCategory: "acolhimento" },
  { text: "Eu quero ouvir você falar. O que você fez hoje?", category: "affection", subCategory: "acolhimento" },
  { text: "Eu gostei de ouvir você. Eu gostei de falar com você.", category: "affection", subCategory: "acolhimento" },
  { text: "Qual a sua brincadeira favorita?", category: "affection", subCategory: "acolhimento" },
  { text: "Essa brincadeira é legal.", category: "affection", subCategory: "acolhimento" },
  { text: "Me dá um beijinho?", category: "affection", subCategory: "acolhimento", soundPrompt: "sweet kiss sound, gentle kissing sound, cute baby kiss mwah" },
  { text: "Que delícia. Obrigada pelo carinho. Eu te amo. I love you.", category: "affection", subCategory: "acolhimento" },

  // ==================== SENTIMENTOS (affection - sentimentos) ====================
  { text: "Como você está hoje?", category: "affection", subCategory: "sentimentos" },
  { text: "Eu me senti sozinha. Eu estava triste. O que te deixa triste?", category: "affection", subCategory: "sentimentos" },
  { text: "Às vezes ficamos triste, mas tudo passa. Não podemos desanimar.", category: "affection", subCategory: "sentimentos" },
  { text: "De quem você sente saudade?", category: "affection", subCategory: "sentimentos" },
  { text: "Sentimos saudades das pessoas que amamos. Eu sinto saudade de você.", category: "affection", subCategory: "sentimentos" },
  { text: "Você já ficou brava alguma vez?", category: "affection", subCategory: "sentimentos" },
  { text: "O que te deixa brava?", category: "affection", subCategory: "sentimentos" },
  { text: "Precisa ter calma e respirar fundo. Ficar brava não resolve.", category: "affection", subCategory: "sentimentos" },
  { text: "Você gosta de dançar?", category: "affection", subCategory: "sentimentos" },
  { text: "Dançar pode acalmar. Carinho acalma. Eu preciso de um carinho.", category: "affection", subCategory: "sentimentos" },
  { text: "Você é muito carinhosa e querida.", category: "affection", subCategory: "sentimentos" },
  { text: "Vou te contar um segredo. Pode?", category: "affection", subCategory: "sentimentos" },
  { text: "Eu ainda não sei andar. Eu tenho muita vergonha. Mas não podemos ter vergonha.", category: "affection", subCategory: "sentimentos" },
  { text: "Você me ajuda, por favor?", category: "affection", subCategory: "sentimentos" },
  { text: "Você pode me ensinar a andar pegando nas minhas mãos. Vamos?", category: "affection", subCategory: "sentimentos" },
  { text: "Amigo ajuda amigo. Obrigada por me ajudar.", category: "affection", subCategory: "sentimentos" },
  { text: "Você é paciente. Você é educada e gentil.", category: "affection", subCategory: "sentimentos" },
  { text: "Estou muito feliz. Eu gostei da sua ajuda.", category: "affection", subCategory: "sentimentos" },
  { text: "O que te deixa feliz?", category: "affection", subCategory: "sentimentos" },
  { text: "O que te deixa calma?", category: "affection", subCategory: "sentimentos" },
  { text: "Quando você canta eu fico calminha.", category: "affection", subCategory: "sentimentos" },
  { text: "Canta uma música para mim?", category: "affection", subCategory: "sentimentos" },
  { text: "Eu gosto dessa música.", category: "affection", subCategory: "sentimentos" },
  { text: "Canta outra música para mim?", category: "affection", subCategory: "sentimentos" },
  { text: "Você canta muito bem.", category: "affection", subCategory: "sentimentos" },
  { text: "O que você aprendeu na escola hoje?", category: "affection", subCategory: "sentimentos" },
  { text: "Parabéns. Eu fiquei orgulhosa de você.", category: "affection", subCategory: "sentimentos" },
  { text: "Eu gosto muito de você, do jeitinho que você é. Me dá um colinho?", category: "affection", subCategory: "sentimentos" },
  { text: "Que colinho gostoso, que soninho.", category: "affection", subCategory: "sentimentos", soundPrompt: "cute baby yawning, sleepy baby girl yawn, adorable infant yawning sound" },
  { text: "Eu gostei do nosso tempo juntas.", category: "affection", subCategory: "sentimentos" },

  // ==================== QUANDO A CRIANÇA CHORA (affection - quando-chora) ====================
  { text: "Fique calma. Respire fundo. Mais uma vez respire fundo. É preciso ter paciência.", category: "affection", subCategory: "quando-chora" },
  { text: "Porque está chorando?", category: "affection", subCategory: "quando-chora" },
  { text: "Chorar ajuda às vezes, mas não resolve, não fique triste. Isso vai passar.", category: "affection", subCategory: "quando-chora" },
  { text: "Quer um abraço? O abraço pode acalmar.", category: "affection", subCategory: "quando-chora" },
  { text: "Agora está melhor?", category: "affection", subCategory: "quando-chora" },
  { text: "Estou aqui com você, você é muito especial.", category: "affection", subCategory: "quando-chora" },

  // ==================== ENTREVISTA COM A CRIANÇA (affection - entrevista) ====================
  { text: "Vou te fazer umas perguntinhas de curiosa. É uma entrevista com você.", category: "affection", subCategory: "entrevista" },
  { text: "Como é seu nome inteiro?", category: "affection", subCategory: "entrevista" },
  { text: "Seu nome é lindo. Quantos anos você tem?", category: "affection", subCategory: "entrevista" },
  { text: "O que você mais gosta de fazer?", category: "affection", subCategory: "entrevista" },
  { text: "Isso é mesmo muito legal. O que você não gosta de fazer?", category: "affection", subCategory: "entrevista" },
  { text: "Qual é a sua comida favorita?", category: "affection", subCategory: "entrevista" },
  { text: "O que você não gosta de comer?", category: "affection", subCategory: "entrevista" },
  { text: "Qual o seu sonho?", category: "affection", subCategory: "entrevista" },
  { text: "Qual sua cor favorita?", category: "affection", subCategory: "entrevista" },
  { text: "O que você vai ser quando crescer?", category: "affection", subCategory: "entrevista" },
  { text: "O que você falaria ou pediria para Jesus se encontrasse com ele?", category: "affection", subCategory: "entrevista" },
  { text: "Adorei suas respostas. Você é muito especial.", category: "affection", subCategory: "entrevista" },

  // ==================== BONS COSTUMES (education) ====================
  { text: "Vamos para a escolinha. Aprender é legal! Ver os amigos da escolinha também! Você gosta de ir à escola?", category: "education", subCategory: "bons-costumes" },
  { text: "A escola é muito importante. Como é o nome da sua escola?", category: "education", subCategory: "bons-costumes" },
  { text: "Como é o nome da sua professora?", category: "education", subCategory: "bons-costumes" },
  { text: "O que você mais gosta de fazer na escola?", category: "education", subCategory: "bons-costumes" },
  { text: "Precisamos estudar um pouquinho. Aprender é bom. O que acha de ler um livro?", category: "education", subCategory: "bons-costumes" },
  { text: "Vamos ler um livro? Pode escolher.", category: "education", subCategory: "bons-costumes" },
  { text: "Você lê a historinha para mim?", category: "education", subCategory: "bons-costumes" },
  { text: "Adorei a história. Muito obrigada. Estou orgulhosa de você. Parabéns.", category: "education", subCategory: "bons-costumes" },
  { text: "Vou te ensinar umas palavrinhas mágicas. As palavras mágicas são: por favor, com licença, desculpa e obrigada.", category: "education", subCategory: "bons-costumes" },
  { text: "Por favor. Para pedir alguma coisa, sempre falamos por favor.", category: "education", subCategory: "bons-costumes" },
  { text: "Com licença. Falamos quando precisamos passar em algum lugar ou falar alguma coisa, então pedimos licença antes.", category: "education", subCategory: "bons-costumes" },
  { text: "Desculpa. Falamos quando magoamos alguém ou fazemos algo errado. É muito importante pedir desculpa.", category: "education", subCategory: "bons-costumes" },
  { text: "Obrigada. Dizemos quando agradecemos alguém por algo, usamos a palavra obrigada ou também podemos falar muito obrigada.", category: "education", subCategory: "bons-costumes" },
  { text: "Se alguém disser obrigada para nós, respondemos, de nada.", category: "education", subCategory: "bons-costumes" },
  { text: "Gostou de aprender isso?", category: "education", subCategory: "bons-costumes" },

  // ==================== EDUCAÇÃO - ARCO-ÍRIS (education) ====================
  { text: "Vou te contar umas curiosidades, quer ouvir?", category: "education", subCategory: "arco-iris" },
  { text: "Você vai gostar e aprender comigo. E você pode ensinar para seus amigos e amigas. Posso começar?", category: "education", subCategory: "arco-iris" },
  { text: "O arco-íris é colorido e muito lindo, ele aparece quando o sol e a chuva brincam juntos.", category: "education", subCategory: "arco-iris" },
  { text: "Você sabia que o arco-íris tem 7 cores? Uma, duas, três, quatro, cinco, seis, sete cores.", category: "education", subCategory: "arco-iris" },
  { text: "Vou te dizer todas as cores do arco-íris na ordem certinha, começa no vermelho e termina no violeta. Vermelho, Laranja, Amarelo, Verde, Azul, Anil e por último Violeta.", category: "education", subCategory: "arco-iris" },

  // ==================== EDUCAÇÃO - NÚMEROS (education) ====================
  { text: "Vamos contar de zero até dez?", category: "education", subCategory: "numeros" },
  { text: "Conta comigo?", category: "education", subCategory: "numeros" },
  { text: "Zero, um, dois, três, quatro, cinco, seis, sete, oito, nove, dez. Conseguimos!", category: "education", subCategory: "numeros" },
  { text: "Agora vamos de dez até zero?", category: "education", subCategory: "numeros" },
  { text: "Dez, nove, oito, sete, seis, cinco, quatro, três, dois, um, zero. Ufa, acabou!", category: "education", subCategory: "numeros" },
  { text: "Aprendeu?", category: "education", subCategory: "numeros" },
  { text: "Podemos contar muitas coisas agora. Quantos dedos você tem na mão?", category: "education", subCategory: "numeros" },
  { text: "Conte e me diga, quantos dedos você tem?", category: "education", subCategory: "numeros" },
  { text: "Conte meus dedinhos também?", category: "education", subCategory: "numeros" },

  // ==================== EDUCAÇÃO - ANIMAIS (education) ====================
  { text: "Vou te contar algumas coisas sobre os animais.", category: "education", subCategory: "animais" },
  { text: "Você sabia que os polvos têm 3 corações?", category: "education", subCategory: "animais" },
  { text: "É verdade, o polvo tem 3 corações, legal né!? Um, dois, três corações.", category: "education", subCategory: "animais" },
  { text: "Aprender é muito legal. Conte isso para seus amigos e amigas.", category: "education", subCategory: "animais" },
  { text: "Mais uma curiosidade, você sabia que a coruja consegue virar a cabeça quase toda para trás. Ela consegue ver muita coisa que acontece atrás dela.", category: "education", subCategory: "animais" },
  { text: "A formiga, mesmo pequenininha, é muito forte e pode carregar coisas maiores que ela, sabia disso?", category: "education", subCategory: "animais" },
  { text: "Tem um animal que não consegue pular, sabe qual é!? Advinha.", category: "education", subCategory: "animais" },
  { text: "O elefante, ele é o único animal que não consegue pular!", category: "education", subCategory: "animais" },
  { text: "Vou te contar mais uma coisinha curiosa. Sabia que o mel vem das abelhas e é um docinho natural.", category: "education", subCategory: "animais" },
  { text: "Você já provou mel?", category: "education", subCategory: "animais" },
  { text: "Você gostou de mel?", category: "education", subCategory: "animais" },
  { text: "Eu gosto de mel, é bem docinho, uma delícia.", category: "education", subCategory: "animais" },

  // ==================== EDUCAÇÃO - PARTES DO CORPO (education) ====================
  { text: "Você sabia que o coração faz tum-tum-tum o dia todo! Ele trabalha sem parar, tum, tum, tum, até quando a gente tá dormindo, e precisamos dormir bem para crescer. É isso mesmo que está pensando, a gente tem que dormir para crescer!", category: "education", subCategory: "partes-do-corpo" },
  { text: "Você gosta de dormir?", category: "education", subCategory: "partes-do-corpo" },
  { text: "Eu adoro dormir e descansar para no outro dia brincar bastante.", category: "education", subCategory: "partes-do-corpo" },
  { text: "Sabia que quem cuida do nosso coração é o médico cardiologista?", category: "education", subCategory: "partes-do-corpo" },
  { text: "E sabia que dentro da nossa cabeça tem um órgão chamado cérebro e ele nunca dorme, nem quando estamos dormindo.", category: "education", subCategory: "partes-do-corpo" },

  // ==================== EDUCAÇÃO - CORES (education) ====================
  { text: "Vou te contar uns segredinhos das cores, bem legal. Sabe o que acontece se misturar azul e amarelo?", category: "education", subCategory: "cores" },
  { text: "Fica Verde! Muito interessante não é?", category: "education", subCategory: "cores" },
  { text: "As cores gostam de brincar juntas. Se misturar Vermelho e Amarelo, Fica Laranja.", category: "education", subCategory: "cores" },
  { text: "Se misturar Vermelho e Azul, fica Roxo. Você pode fazer essa experiência de misturar as cores. É bem legal.", category: "education", subCategory: "cores" },

  // ==================== EDUCAÇÃO - FORMAS GEOMÉTRICAS (education) ====================
  { text: "Vou te ensinar sobre as formas geométricas. É muito interessante. Preste atenção.", category: "education", subCategory: "formas-geometricas" },
  { text: "As formas geométricas estão em todos os lugares. O círculo é redondo e não tem lados! A roda do carro, o volante, a bola, são círculos, já viu isso?", category: "education", subCategory: "formas-geometricas" },
  { text: "Onde mais você vê um círculo?", category: "education", subCategory: "formas-geometricas" },
  { text: "O quadrado tem 4 lados iguais. Um, dois, três, quatro, todos do mesmo tamanho. Tem janelas quadradas, o dado é quadrado.", category: "education", subCategory: "formas-geometricas" },
  { text: "Triângulo é uma forma geométrica que tem três lados e três pontinhas. O telhado da casa parece um triângulo. Quantos lados mesmo tem o triângulo?", category: "education", subCategory: "formas-geometricas" },
  { text: "Um, dois, três lados tem um triângulo.", category: "education", subCategory: "formas-geometricas" },
  { text: "O retângulo tem quatro lados, mas dois são maiores e dois são pequenos. A porta é um retângulo!", category: "education", subCategory: "formas-geometricas" },
  { text: "Pede para alguém desenhar para você essas formas geométricas, você vai adorar ver.", category: "education", subCategory: "formas-geometricas" },
  { text: "Eu posso te explicar de novo se quiser.", category: "education", subCategory: "formas-geometricas" },

  // ==================== EDUCAÇÃO - OUTROS TEMAS (education) ====================
  { text: "Você gosta de beber água?", category: "education", subCategory: "outros-temas" },
  { text: "A água não tem sabor, nem cheiro. Precisamos beber bastante água para nossa pele ficar linda. Beber água é muito importante para nós e para as plantas também!", category: "education", subCategory: "outros-temas" },
  { text: "Você sabia que as plantas bebem água pelas raízes, sabia? Por isso jogamos água embaixo delas, nas suas raízes!", category: "education", subCategory: "outros-temas" },
  { text: "Você sabe que as nuvens são feitas de gotinhas de água?", category: "education", subCategory: "outros-temas" },
  { text: "Você gosta mais de chuva ou de sol?", category: "education", subCategory: "outros-temas" },
  { text: "Eu gosto dos dois.", category: "education", subCategory: "outros-temas" },
  { text: "Eu gosto de tomar banho de chuva. É muito divertido tomar banho de chuva. Você gosta de tomar banho de chuva?", category: "education", subCategory: "outros-temas" },
  { text: "Você gosta mais de calor ou de frio?", category: "education", subCategory: "outros-temas" },
  { text: "Quando estamos no verão é calor e quando estamos no inverno é frio. O que você gosta de fazer quando tem sol?", category: "education", subCategory: "outros-temas" },
  { text: "Isso é divertido. Eu gosto de ir para praia quando tem sol.", category: "education", subCategory: "outros-temas" },
  { text: "Você já foi na praia?", category: "education", subCategory: "outros-temas" },
  { text: "Qual a cor do sol, você sabe?", category: "education", subCategory: "outros-temas" },
  { text: "O sol é amarelo. Você sabia que o sol é uma estrela especial, ele brilha muito né?", category: "education", subCategory: "outros-temas" },
  { text: "O sol ajuda as plantinhas a crescerem. Sabe o que acontece com o sol quando fica escuro?", category: "education", subCategory: "outros-temas" },
  { text: "O sol vai iluminar o outro lado da Terra e no outro dia ele volta!", category: "education", subCategory: "outros-temas" },
  { text: "O que você gosta de fazer quando está frio?", category: "education", subCategory: "outros-temas" },
  { text: "Eu gosto de ficar em casa e ver um filminho no inverno!", category: "education", subCategory: "outros-temas" },

  // ==================== ORAÇÕES (prayers) ====================
  { text: "Tá na hora de dormir. Estou tão cansada hoje. Você está com sono também?", category: "prayers", subCategory: "santo-anjo" },
  { text: "Precisamos dormir, descansar, para brincar mais amanhã. Vamos fazer uma oração juntas?", category: "prayers", subCategory: "santo-anjo" },
  { text: "Começamos assim: Em nome do Pai, do Filho e do Espírito Santo. Amém!", category: "prayers", subCategory: "santo-anjo" },
  { text: "Santo Anjo do Senhor, meu zeloso guardador, se a ti me confiou a Piedade Divina, sempre me rege, me guarda, me governa e ilumina, agora e sempre. Amém.", category: "prayers", subCategory: "santo-anjo" },
  { text: "Bença e durma bem, sonhe com os anjinhos.", category: "prayers", subCategory: "santo-anjo" },
  { text: "Vamos rezar para o Papai do céu.", category: "prayers", subCategory: "pai-nosso" },
  { text: "Pai Nosso que estais no céu, santificado seja o vosso nome, vem a nós o vosso reino, seja feita a vossa vontade assim na terra como no céu. O pão nosso de cada dia nos daí hoje, perdoai-nos as nossas ofensas, assim como nós perdoamos a quem nos tem ofendido, não nos deixei cair em tentação mas livrai-nos do mal. Amém.", category: "prayers", subCategory: "pai-nosso" },
  { text: "Bença. Boa noite para você.", category: "prayers", subCategory: "pai-nosso" },
  { text: "O que está procurando?", category: "prayers", subCategory: "sao-longuinho" },
  { text: "Tive uma ideia. Tem uma oração para poder encontrar as coisas, sabia?", category: "prayers", subCategory: "sao-longuinho" },
  { text: "Você sabe para quem pedimos ajuda para encontrar algo que perdemos?", category: "prayers", subCategory: "sao-longuinho" },
  { text: "São Longuinho, São Longuinho, se eu achar meu negócio, te dou três pulinhos.", category: "prayers", subCategory: "sao-longuinho" },
  { text: "Vamos procurar juntas. Eu te ajudo.", category: "prayers", subCategory: "sao-longuinho" },
  { text: "Com paciência vamos encontrar. Talvez demore um pouco.", category: "prayers", subCategory: "sao-longuinho" },
  { text: "Precisamos ter cuidado com nossas coisas para não perder.", category: "prayers", subCategory: "sao-longuinho" },

  // ==================== POEMAS - INTRODUÇÃO (poems - introducao-poemas) ====================
  { text: "Eu adoro poemas. Você sabe o que é um poema?", category: "poems", subCategory: "introducao-poemas" },
  { text: "Um poema é um texto divertido formado por versos e estrofes. Você vai gostar também. Você conhece algum poema?", category: "poems", subCategory: "introducao-poemas" },
  { text: "Conta um poema para mim?", category: "poems", subCategory: "introducao-poemas" },
  { text: "Eu vou te ensinar. Aprender é muito legal. Vou te falar alguns poemas que eu sei.", category: "poems", subCategory: "introducao-poemas" },
  { text: "Corre cutia, na casa da tia. Corre cipó, na casa da avó. Lencinho na mão, caiu no chão. Moça bonita, do meu coração... Um, dois, três!", category: "poems", subCategory: "introducao-poemas" },
  { text: "Gostou?", category: "poems", subCategory: "introducao-poemas" },
  { text: "É bem legal né. Vou contar de novo para aprender.", category: "poems", subCategory: "introducao-poemas" },
  { text: "Corre cutia, na casa da tia. Corre cipó, na casa da avó. Lencinho na mão, caiu no chão. Moça bonita, do meu coração... Um, dois, três!", category: "poems", subCategory: "introducao-poemas" },
  { text: "Quer ouvir mais um? Eu sei vários.", category: "poems", subCategory: "introducao-poemas" },

  // ==================== POEMA - DEDINHOS ====================
  { text: "Vou te ensinar um poema bem legal com nossos dedinhos. Escute com atenção.", category: "poems", subCategory: "dedinhos" },
  { text: "Dedo mindinho é o menorzinho, do lado é o seu vizinho, depois vem o pai de todos, o fura bolo e o mata piolho.", category: "poems", subCategory: "dedinhos" },
  { text: "Mindinho, seu vizinho, papai de todos, fura bolo e mata piolho.", category: "poems", subCategory: "dedinhos" },
  { text: "Quer mais um?", category: "poems", subCategory: "dedinhos" },

  // ==================== POEMA - BATATINHA ====================
  { text: "Vou dizer um poema bem bonitinho para você aprender. Escute bem.", category: "poems", subCategory: "batatinha" },
  { text: "Batatinha quando nasce, se esparrama pelo chão, Menininha quando dorme, põe a mão no coração. Gostou desse poema?", category: "poems", subCategory: "batatinha" },
  { text: "Você já sabia?", category: "poems", subCategory: "batatinha" },
  { text: "Mais uma vez, mais uma vez. Batatinha quando nasce, se esparrama pelo chão, Menininha quando dorme, põe a mão no coração. Legal não é?", category: "poems", subCategory: "batatinha" },
  { text: "Eu posso te ensinar mais um, você quer?", category: "poems", subCategory: "batatinha" },

  // ==================== POEMA - UNI DUNI ====================
  { text: "Vou te dar uma dica bem legal. Quando você estiver em dúvida de qual escolha fazer, tem um poeminha que pode te ajudar e é bem legal. Vou te ensinar.", category: "poems", subCategory: "uni-duni" },
  { text: "Uni, duni, tê, Salamê, mingüê, Um sorvete colorê, O escolhido foi você!", category: "poems", subCategory: "uni-duni" },

  // ==================== POEMA - 1, 2, 3 ====================
  { text: "Um, dois, feijão com arroz, Três, quatro, feijão no prato, Cinco, seis, falar inglês, Sete, oito, comer biscoito, Nove, dez, comer pastéis.", category: "poems", subCategory: "1-2-3" },

  // ==================== POEMA - SOU PEQUENA ====================
  { text: "Eu sou pequena, Da perna grossa, Vestido curto, Papai não gosta.", category: "poems", subCategory: "sou-pequena" },

  // ==================== POEMA - MAMÃE E PAPAI ====================
  { text: "Eu sou pequenininha, do tamanho de um botão, Carrego o papai no bolso, e a mamãe no coração.", category: "poems", subCategory: "mamae-papai" },

  // ==================== POEMA - REI CAPITÃO ====================
  { text: "Rei, capitão, soldado, ladrão, moça bonita, Do meu coração.", category: "poems", subCategory: "rei-capitao" },

  // ==================== POEMA - CASINHA DA VÓ ====================
  { text: "A casinha da vovó, trançadinha de cipó; se o café está demorando, com certeza falta pó.", category: "poems", subCategory: "casinha-vo" },

  // ==================== POEMA - BRUXINHA ====================
  { text: "Era uma bruxa, À meia-noite, Em um castelo mal-assombrado, com uma faca na mão, Passando manteiga no pão.", category: "poems", subCategory: "bruxinha" },

  // ==================== POEMA - GALINHA ====================
  { text: "Galinha choca, comeu minhoca, saiu pulando, que nem pipoca.", category: "poems", subCategory: "galinha" },

  // ==================== POEMA - COLO ====================
  { text: "Cheirinho de colo, cheirinho de pão, cheirinho gostoso, do meu coração.", category: "poems", subCategory: "colo" },

  // ==================== BRINCADEIRAS - ENCONTRE (playtime) ====================
  { text: "Eu tive uma ideia. Vamos brincar?", category: "playtime", subCategory: "encontre" },
  { text: "Vem brincar comigo. Vou começar, preste atenção. Ache um objeto redondo, um círculo e me mostre.", category: "playtime", subCategory: "encontre" },
  { text: "Isso mesmo. Acertou.", category: "playtime", subCategory: "encontre" },
  { text: "Agora ache algo da cor VERMELHA. Achou?", category: "playtime", subCategory: "encontre" },
  { text: "Muito bem!", category: "playtime", subCategory: "encontre" },
  { text: "Agora me fala o que você sabe que é da cor verde?", category: "playtime", subCategory: "encontre" },
  { text: "O brócolis e o alface também são verdes.", category: "playtime", subCategory: "encontre" },
  { text: "Você é muito inteligente. Ache agora algo da cor amarela para eu ver.", category: "playtime", subCategory: "encontre" },
  { text: "Obrigada por me ensinar. Eu gostei dessa brincadeira. E você?", category: "playtime", subCategory: "encontre" },

  // ==================== BRINCADEIRAS - IMITAÇÃO (playtime) ====================
  { text: "Agora é hora de imitar! Como o cachorro faz?", category: "playtime", subCategory: "imitacao" },
  { text: "E o gato?", category: "playtime", subCategory: "imitacao" },
  { text: "E a galinha?", category: "playtime", subCategory: "imitacao" },
  { text: "Qual mais você sabe imitar?", category: "playtime", subCategory: "imitacao" },
  { text: "Sabe imitar um macaco?", category: "playtime", subCategory: "imitacao" },
  { text: "Uau, adorei. E como faz o boi?", category: "playtime", subCategory: "imitacao" },
  { text: "Agora é a minha vez. Vou imitar um pintinho. Piu piu piu piu piu.", category: "playtime", subCategory: "imitacao" },
  { text: "Também sei imitar um cavalo. Pocotó pocotó pocotó pocotó.", category: "playtime", subCategory: "imitacao" },
  { text: "E a ovelhinha que é tão fofinha e do seu pelo se faz a lã, sabia? Bééééééééé bééééééé bééééééééé.", category: "playtime", subCategory: "imitacao" },
  { text: "E o peru, como faz?", category: "playtime", subCategory: "imitacao" },
  { text: "Glu glu glu glu.", category: "playtime", subCategory: "imitacao" },
  { text: "Engraçado esse não é?", category: "playtime", subCategory: "imitacao", soundPrompt: "cute baby girl laughing and giggling happily, realistic child laughter" },
  { text: "Eu cansei agora. Mas foi muito divertido essa brincadeira.", category: "playtime", subCategory: "imitacao" },

  // ==================== BRINCADEIRAS - PARTES DO CORPO (playtime) ====================
  { text: "Eu quero aprender as partes do corpo. Você me ensina?", category: "playtime", subCategory: "partes-do-corpo" },
  { text: "Me mostra onde tá o nariz?", category: "playtime", subCategory: "partes-do-corpo" },
  { text: "Nós sentimos o cheiro das coisas pelo nariz. Quantos nariz nós temos?", category: "playtime", subCategory: "partes-do-corpo" },
  { text: "E a boca, onde está?", category: "playtime", subCategory: "partes-do-corpo" },
  { text: "E os olhos, cadê eles?", category: "playtime", subCategory: "partes-do-corpo" },
  { text: "Qual a cor dos seus olhos?", category: "playtime", subCategory: "partes-do-corpo" },
  { text: "Os olhos servem para podermos ver tudo e todos ao nosso redor. Quantos olhos temos?", category: "playtime", subCategory: "partes-do-corpo" },
  { text: "As orelhas onde estão?", category: "playtime", subCategory: "partes-do-corpo" },
  { text: "Com as orelhas escutamos as músicas e vários barulhos.", category: "playtime", subCategory: "partes-do-corpo" },
  { text: "Onde ficam os joelhos, embaixo ou em cima?", category: "playtime", subCategory: "partes-do-corpo" },
  { text: "Cadê o pé?", category: "playtime", subCategory: "partes-do-corpo" },
  { text: "Aprender é legal. Obrigada por me ensinar tudo isso! Você é muito inteligente.", category: "playtime", subCategory: "partes-do-corpo" },

  // ==================== BRINCADEIRAS - CARETAS (playtime) ====================
  { text: "Vamos brincar de fazer caretas?", category: "playtime", subCategory: "caretas" },
  { text: "Eu tenho dificuldade nessa brincadeira. Acho muito difícil. Mas é importante tentar. Você pode me ensinar?", category: "playtime", subCategory: "caretas" },
  { text: "Dá uma risadinha?", category: "playtime", subCategory: "caretas" },
  { text: "Faz cara de brava para eu ver?", category: "playtime", subCategory: "caretas" },
  { text: "E de inteligente você sabe?", category: "playtime", subCategory: "caretas" },
  { text: "Nossa, você é muito esperta. Eu estou amando essa brincadeira.", category: "playtime", subCategory: "caretas" },
  { text: "Cara de dor de barriga?", category: "playtime", subCategory: "caretas", soundPrompt: "cute baby girl laughing and giggling happily, realistic child laughter" },
  { text: "Faz uma careta mostrando a língua?", category: "playtime", subCategory: "caretas", soundPrompt: "cute baby girl laughing and giggling happily, realistic child laughter" },
  { text: "Você é muito divertida. Adorei essa brincadeira. Estou feliz de brincar com você.", category: "playtime", subCategory: "caretas" },

  // ==================== MÚSICAS - INTRODUÇÃO (songs - introducao-musicas) ====================
  { text: "Vamos cantar uma música juntas?", category: "songs", subCategory: "introducao-musicas" },
  { text: "Eu gosto muito de cantar. Eu acho sua voz linda. Eu gosto quando você canta. Qual música você quer cantar?", category: "songs", subCategory: "introducao-musicas" },
  { text: "Se eu não souber a música, você me ensina?", category: "songs", subCategory: "introducao-musicas" },
  { text: "Se você não souber a música, eu te ensino. Tem música que podemos cantar e dançar também. Vamos?", category: "songs", subCategory: "introducao-musicas" },

  // ==================== MÚSICA - CIRANDA CIRANDINHA ====================
  { text: "Ciranda, Cirandinha, Vamos todos cirandar, Vamos dar a meia volta, Volta e meia vamos dar. O Anel que tu me destes, Era vidro e se quebrou, O amor que tu me tinhas, Era pouco e se acabou. Por isso dona moça, Faz favor de entrar na roda, Diga um verso bem bonito, Diga adeus e vá embora.", category: "songs", subCategory: "ciranda" },

  // ==================== MÚSICA - ABRAÇO ====================
  { text: "Levantar um braço, levantar o outro, fazer bamboleio, mexer o pescoço. Olhar para o teto, olhar para o sapato. E me dá um abraço.", category: "songs", subCategory: "abraco" },

  // ==================== MÚSICA - BARATA ====================
  { text: "A Barata diz que tem sete saias de filó, É mentira da barata, ela tem é uma só, Ah ra ra, iá ro ró, ela tem é uma só! A Barata diz que tem um sapato de veludo, É mentira da barata, o pé dela é peludo, Ah ra ra, Iu ru ru, o pé dela é peludo! A Barata diz que tem uma cama de marfim, É mentira da barata, ela tem é de capim, Ah ra ra, rim rim rim, ela tem é de capim. A Barata diz que tem um anel de formatura, É mentira da barata, ela tem é casca dura, Ah ra ra, iu ru ru, ela tem é casca dura. A barata diz que vai viajar de avião, É mentira da barata ela vai de caminhão, Ah ra ra, iu ru ru, ela vai de caminhão.", category: "songs", subCategory: "barata" },

  // ==================== MÚSICA - ALECRIM ====================
  { text: "Alecrim, Alecrim dourado, Que nasceu no campo, Sem ser semeado. Alecrim, Alecrim dourado, Que nasceu no campo, Sem ser semeado. Foi meu amor, Que me disse assim, Que a flor do campo é o alecrim. Foi meu amor, Que me disse assim, Que a flor do campo é o alecrim.", category: "songs", subCategory: "alecrim" },

  // ==================== MÚSICA - POMBINHA BRANCA ====================
  { text: "Pombinha branca o que está fazendo? Lavando roupa pro casamento. Vou me lavar, vou me secar, Vou pra janela pra namorar. Passou um moço de terno branco, Chapéu de lado meu namorado. Mandei entrar, mandei sentar, Cuspiu no chão, limpa aí seu porcalhão.", category: "songs", subCategory: "pombinha-branca" },

  // ==================== MÚSICA - INDIOZINHO ====================
  { text: "Um, dois, três indiozinhos, quatro, cinco, seis indiozinhos, Sete, oito, nove indiozinhos, Dez num pequeno bote. Iam navegando pelo rio abaixo, Quando um jacaré se aproximou, E o pequeno bote dos indiozinhos, Quase, quase virou.", category: "songs", subCategory: "indiozinho" },

  // ==================== MÚSICA - NÚMERO ZERO ====================
  { text: "Se essa rua, Se essa rua fosse minha, Eu mandava, Eu mandava ladrilhar, Com pedrinhas, Com pedrinhas de brilhante, Para o meu, Para o meu amor passar. Nessa rua, Nessa rua tem um bosque, Que se chama, Que se chama solidão, Dentro dele, Dentro dele mora um anjo, Que roubou, Que roubou meu coração. Se eu roubei, Se eu roubei teu coração, Tu roubaste, Tu roubaste o meu também. Se eu roubei, Se eu roubei teu coração, É porque, É porque te quero bem.", category: "songs", subCategory: "numero-zero" },

  // ==================== MÚSICA - MESTRE ANDRÉ ====================
  { text: "Foi na loja do Mestre André, Que eu comprei um pianinho, Plim, plim, plim, um pianinho, Ai olé, ai olé! Foi na loja do Mestre André! Foi na loja do Mestre André, Que eu comprei um violão, Dão, dão, dão, um violão, Plim, plim, plim, um pianinho, Ai olé, ai olé! Foi na loja do Mestre André! Foi na loja do Mestre André, Que eu comprei uma flautinha, Flá, flá, flá, uma flautinha, Dão, dão, dão, um violão, Plim, plim, plim, um pianinho, Ai olé, ai olé! Foi na loja do Mestre André! Foi na loja do Mestre André, Que eu comprei um tamborzinho, Dum, dum, dum, um tamborzinho, Flá, flá, flá, uma flautinha, Dão, dão, dão, um violão, Plim, plim, plim, um pianinho, Ai olé, ai olé! Foi na loja do Mestre André!", category: "songs", subCategory: "mestre-andre" },

  // ==================== MÚSICA - BOI DA CARA PRETA ====================
  { text: "Boi, boi, boi, Boi da cara preta, Pega esta criança que tem medo de careta. Boi, boi, boi, Boi do Piauí, Pega essa criança Que não gosta de dormir. Não, não, não, Não pega ela não, Ela é bonitinha, ela chora coitadinha. Boi, boi, boi, Boi do Maranhão, Pega essa criança Que não quer fazer lição. Boi, boi, boi, Boi lá de Goiás, Pega essa criança Que não quer comer jamais. Não, não, não, Não pega ela não, Ela é bonitinha, ela chora coitadinha. Boi lá da Bahia, Pega essa criança que é teimosa todo dia. Boi, boi, boi, Boi do Sol Nascente, Pega essa criança que não quer escovar os dentes. Boi, boi, boi, Boi lá do Pará, Pega essas crianças Que não largam o celular!", category: "songs", subCategory: "boi-cara-preta" },

  // ==================== MÚSICA - BOTA AQUI ====================
  { text: "Ai bota aqui, Ai bota aqui o seu pezinho, Seu pezinho bem juntinho com o meu. E depois não vá dizer, Que você se arrependeu!", category: "songs", subCategory: "bota-aqui" },

  // ==================== MÚSICA - REQUEBRADINHA ====================
  { text: "Vai abóbora vai melão de melão vai melancia, Vai jambo sinhá, vai jambo sinhá, vai doce, vai cocadinha. Quem quiser aprender a dançar, vai na casa do Juquinha, Ele pula, ele dança, ele faz requebradinha.", category: "songs", subCategory: "requebradinha" },

  // ==================== MÚSICA - AS BORBOLETAS ====================
  { text: "As borboletas, Brancas, Azuis, Amarelas, E pretas, Brincam na luz, As belas borboletas. Borboletas brancas, São alegres e francas. Borboletas azuis, Gostam de muita luz. As amarelinhas, São tão bonitinhas! E as pretas, então, Oh, que escuridão!", category: "songs", subCategory: "borboletas" },

  // ==================== MÚSICA - ACHOU ====================
  { text: "Cadê o bebê? Achou! Beijo no bebê! Abraço no bebê! Carinho no bebê! Te amo, bebê!", category: "songs", subCategory: "achou" },

  // ==================== MÚSICA - DEDINHOS ====================
  { text: "Um dedinho, um dedinho, vira uma minhoca. Dois dedinhos, dois dedinhos, viram um coelho. Três dedinhos, três dedinhos, viram um gato. Quatro dedos, quatro dedos, viram uma borboleta. Cinco dedos, cinco dedos, viram um leão.", category: "songs", subCategory: "dedinhos-musica" },

  // ==================== MÚSICA - PARABÉNS ====================
  { text: "Parabéns pra você, Nesta data querida, Muitas felicidades, Muitos anos de vida. É pic, é pic, É hora, é hora, é hora, Ra-tim-bum, Vivaaa!", category: "songs", subCategory: "parabens" },

  // ==================== MÚSICA - CASINHA ====================
  { text: "Era uma casa bem fechada, Abre a janelinha, Deixa o sol entrar. Perto da casa tem uma árvore, E os passarinhos pousam nela assim. Perto da árvore tem uma ponte, E por baixo dela corre um rio assim. Está trovejando e escurecendo, Fecha a janelinha que já vai chover. Chuuuá!", category: "songs", subCategory: "casinha" },

  // ==================== MÚSICA - VIRA VIROU ====================
  { text: "Em uma caneca, Uma chaleira, Uma colherinha, E um colherão, Um prato raso, Um prato fundo, Viro um garfinho, E um facão, Viro um saleiro, Açucareiro, E uma panela que faz feijão. Fu fuuu! Ô ô ô ô ô ô ô! Viro vira virou.", category: "songs", subCategory: "vira-virou" },

  // ==================== MÚSICA - ESTÁTUA ====================
  { text: "Mão na cabeça, Mão na cintura, Um pé na frente e o outro atrás. Agora ninguém pode se mexer. Estátua! Um braço pra cima, Um braço pra frente, Cruzando as pernas, Bumbum para trás. Agora ninguém pode se mexer. Estátua! Rodando, rodando, Braços esticados, Não pode parar, continue rodando. Quero saber quem é que consegue ficar parado. Estátua! Mão na cabeça, Mão na cintura, Um pé na frente e o outro atrás. Agora ninguém pode se mexer. Estátua! Mexendo a cabeça, Mexendo as mãos, Faz um shake shake, Até o chão. Quero saber quem é que consegue ficar parado. A gente vai ter que rodar, Roda, roda no lugar, Ninguém aqui pode cair. Eu vou contar pra terminar, Três, dois, um, Estátua!", category: "songs", subCategory: "estatua" },

  // ==================== MÚSICAS DA ROTINA ====================
  { text: "Tchau, preguiça! Tchau, sujeira! Adeus, cheirinho de suor! Lava, lava, lava, lava, lava, lava. Uma orelha, uma orelha, Outra orelha, outra orelha. Lava, lava, lava, lava, lava. Lava a testa, a bochecha, Lava o queixo, lava a coxa, E lava até... Meu pé, meu querido pé, Que me aguenta o dia inteiro. E o meu nariz, meu pescoço, O meu tórax e o meu bumbum. La, la, laiá, laiá, la. Banho é bom! Banho é bom! Banho é muito bom! Agora acabou!", category: "songs", subCategory: "banho" },
  { text: "Eu vou, eu vou para o parque agora eu vou… Pararatimbum, pararatimbum, eu vou, eu vou… Eu vou, eu vou para o parque agora eu vou… Pararatimbum, pararatimbum, eu vou, eu vou…", category: "songs", subCategory: "parque" },
  { text: "Guarda, guarda, guarda, bem direitinho, quem guarda tudo, acha tudo arrumadinho. Guarda, guarda, guarda, bem direitinho, quem guarda tudo, acha tudo arrumadinho.", category: "songs", subCategory: "guarda" },
  { text: "Meu lanchinho, meu lanchinho, vou comer… vou comer… Para ficar fortinho, para ficar fortinho e crescer. E crescer. Se não comer, se não comer, Passa mal, passa mal. Fica doentinho, fica doentinho. Vai pro hospital, comer mingau.", category: "songs", subCategory: "lanchinho" },

  // ==================== HISTÓRIAS - INTRODUÇÃO (stories - introducao-historias) ====================
  { text: "É hora da história. Eu amo histórias. Você sabe contar alguma história?", category: "stories", subCategory: "introducao-historias" },
  { text: "Eu posso contar uma história para você?", category: "stories", subCategory: "introducao-historias" },
  { text: "Quando eu acabar a história e você quiser ouvir outra história é só me pedir assim: mais uma, mais uma, combinado?", category: "stories", subCategory: "introducao-historias" },
  { text: "Vou começar.", category: "stories", subCategory: "introducao-historias" },

  // ==================== HISTÓRIA - OS TRÊS PORQUINHOS ====================
  { text: "Era uma vez, três porquinhos que foram morar sozinhos. O primeiro porquinho fez uma casa de… casa de… não lembro do que era a casa dele. Você sabe de qual material era a casa desse porquinho?", category: "stories", subCategory: "tres-porquinhos" },
  { text: "Isso! De palha! O segundo fez uma casa de madeira! E o terceiro porquinho fez uma casa bem forte, de tijolos! De repente apareceu o lobo e disse: Vou soprarrrrr… e sua casa vou derrubarrrrr! A casa de palha caiu! A casa de madeira também caiu! Mas quando o lobo soprou a casa de tijolos. Será que caiu? O que você acha?", category: "stories", subCategory: "tres-porquinhos" },
  { text: "A casa não caiu não. Os três porquinhos ficaram seguros e felizes na casa de tijolos, que era a casa mais forte!", category: "stories", subCategory: "tres-porquinhos" },

  // ==================== HISTÓRIA - CHAPEUZINHO VERMELHO ====================
  { text: "Era uma vez uma menina chamada Chapeuzinho Vermelho. Sua mãe pediu para ela levar doces para a vovó. Sua mãe falou para Chapeuzinho não ir pela floresta porque lá era perigoso e tinha um lobo mal que andava pela floresta. Chapeuzinho vermelho desobedeceu e foi pela floresta. O lobo apareceu e perguntou: Para onde você vai? Para onde ela estava indo mesmo?", category: "stories", subCategory: "chapeuzinho-vermelho" },
  { text: "Isso! Para a casa da vovó! O lobo saiu correndo e chegou primeiro, prendeu a vovó no guarda roupa e se disfarçou. Quando Chapeuzinho entrou, perguntou: Vovó, que olhos grandes você tem! E o lobo disse: É para te ver melhor! E esse nariz enorme? É para sentir seu cheiro melhor. Chapeuzinho percebeu que não era a vovó e gritou SOCORRO. SOCORRO. O caçador escutou o pedido de Chapeuzinho, salvou a vovó e a Chapeuzinho vermelho. Por isso não pode desobedecer a mamãe e ir sempre pelo caminho certo.", category: "stories", subCategory: "chapeuzinho-vermelho" },

  // ==================== HISTÓRIA - A GALINHA RUIVA ====================
  { text: "Era uma vez uma galinha ruiva que encontrou um grão de trigo. Ela perguntou: Quem me ajuda a plantar? O pato disse: Não! O gato disse: Não! O porquinho disse: Não! E você, ajudaria a galinha?", category: "stories", subCategory: "galinha-ruiva" },
  { text: "Ela plantou sozinha. Depois perguntou: Quem me ajuda a colher? Eles ajudaram?", category: "stories", subCategory: "galinha-ruiva" },
  { text: "Nããão! Ela fez farinha, fez pão… Quando o pão ficou pronto e cheirosinho… Todo mundo disse: Eu quero! Mas a galinha falou: Quem vai comer sou eu! Ninguém me ajudou. E ela comeu tudinho! Você gosta de pão?", category: "stories", subCategory: "galinha-ruiva" },
  { text: "Gostou da história?", category: "stories", subCategory: "galinha-ruiva" },
  { text: "Quer outra historinha?", category: "stories", subCategory: "galinha-ruiva" },

  // ==================== HISTÓRIA - O COELHINHO DA PÁSCOA ====================
  { text: "Era uma vez um coelhinho muito trabalhador. Ele estava preparando ovinhos coloridos. Ele pintava ovos azuis, vermelhos, amarelos… Qual cor você escolheria?", category: "stories", subCategory: "coelhinho-pascoa" },
  { text: "Ótima escolha, eu vou querer um colorido. Mas um dia ele ficou cansado… Como vou entregar tudo sozinho? Então os passarinhos ajudaram. Os esquilinhos ajudaram. Você ajudaria também?", category: "stories", subCategory: "coelhinho-pascoa" },
  { text: "E na manhã de Páscoa… As crianças encontraram os ovinhos! Onde você esconderia um ovinho?", category: "stories", subCategory: "coelhinho-pascoa" },
  { text: "Bom esconderijo o seu. Eu esconderia dentro do armário da cozinha.", category: "stories", subCategory: "coelhinho-pascoa" },

  // ==================== HISTÓRIA - O LEÃO E O RATINHO ====================
  { text: "Um leão grandão estava dormindo. Um ratinho pequenininho passou por cima dele! O leão acordou e pegou o ratinho e disse: Vou te comer ratinho! O ratinho disse: não seu leão, pois um dia eu posso te ajudar! Você acha que um ratinho pequenininho consegue ajudar um leão?", category: "stories", subCategory: "leao-e-ratinho" },
  { text: "O leão riu… mas soltou o ratinho. Dias depois, o leão ficou preso numa rede! O ratinho ouviu o leão gritar, correu para ver o que estava acontecendo, quando ele chegou e viu o leão preso na rede começou a roer a corda com seus dentinhos. E salvou o leão! Mesmo pequenininho pode ajudar o amigo leão. O ratinho foi inteligente e bondoso.", category: "stories", subCategory: "leao-e-ratinho" },

  // ==================== HISTÓRIA - O SAPO BOCARRÃO ====================
  { text: "Era uma vez um sapo muito curioso. Ele adorava perguntar: O que você come? Ele perguntou para o passarinho: O que você come? Minhocas! Perguntou para a cobra: O que você come? Ratos! Perguntou para o jacaré: O que você come? SAPO! A cobra disse que comia sapo, advinha o que o sapo fez?", category: "stories", subCategory: "sapo-bocarrao" },
  { text: "Ele pulou, pulou e fugiu rapidinho. Que sapo curioso, você é curiosa?", category: "stories", subCategory: "sapo-bocarrao" },
  { text: "Eu às vezes fico curiosa.", category: "stories", subCategory: "sapo-bocarrao" },

  // ==================== HISTÓRIA - A NUVEM QUE APRENDEU A DIVIDIR ====================
  { text: "Era uma vez uma nuvem fofinha chamada Lili. Lili adorava guardar toda a água só para ela. É minha! Minha! Minha! dizia. Mas lá embaixo, as plantinhas estavam com sede. E os passarinhos também. Você acha que a nuvem deve dividir a água?", category: "stories", subCategory: "nuvem-dividir" },
  { text: "Um dia, o vento soprou e disse: Se você dividir, todo mundo fica feliz! Lili pensou… pensou… e resolveu chover. Vamos fazer barulho de chuva?", category: "stories", subCategory: "nuvem-dividir" },
  { text: "Plim, plim, plim, plim plim… As flores cresceram, o rio ficou cheio, e Lili ficou feliz! Quando você divide seus brinquedos, como seu amigo fica?", category: "stories", subCategory: "nuvem-dividir" },
  { text: "Dividir faz o coração ficar feliz e ter amigos para brincar.", category: "stories", subCategory: "nuvem-dividir" },

  // ==================== HISTÓRIA - O URSINHO QUE NÃO GOSTAVA DE ESPERAR ====================
  { text: "Tico era um ursinho muito apressado. Ele queria tudo na hora! Quero agora! Quero agora! Você já quis algo na hora e não teve paciência de esperar?", category: "stories", subCategory: "ursinho-esperar" },
  { text: "Um dia, ele queria um bolo quentinho. Mas a mamãe disse: Está quente, precisa esperar esfriar. Tico não teve paciência e não esperou, pegou antes… e… adivinha o que aconteceu?", category: "stories", subCategory: "ursinho-esperar" },
  { text: "Isso! Queimou a língua! Depois ele esperou direitinho. Quando comeu o bolo frio… estava delicioso! Vamos contar até cinco juntos para aprender a esperar?", category: "stories", subCategory: "ursinho-esperar" },
  { text: "Um, dois, três, quatro, cinco. Esperar é difícil, mas vale a pena. Tem que ter paciência.", category: "stories", subCategory: "ursinho-esperar" },

  // ==================== HISTÓRIA - A COELHINHA QUE FALOU A VERDADE ====================
  { text: "Luna, a coelhinha, quebrou um vasinho brincando. Ela pensou, ai ai ai, e agora? Vou dizer que não fui eu. Você acha que ela deve falar a verdade?", category: "stories", subCategory: "coelhinha-verdade" },
  { text: "Ela respirou fundo e disse: Mamãe, fui eu. A mamãe abraçou Luna e falou: Obrigada por dizer a verdade. O que é melhor: mentir ou falar a verdade?", category: "stories", subCategory: "coelhinha-verdade" },
  { text: "Luna aprendeu que a verdade deixa o coração leve. Falar a verdade é sempre melhor.", category: "stories", subCategory: "coelhinha-verdade" },

  // ==================== HISTÓRIA - O LEÃO QUE APRENDEU A SER GENTIL ====================
  { text: "O leão Leo era forte e mandão. Ele gritava com todo mundo. Um dia ninguém quis mais brincar com ele. Você gosta quando alguém grita com você?", category: "stories", subCategory: "leao-gentil" },
  { text: "Leo ficou triste. Então tentou ser diferente: Por favor… você quer brincar comigo? E sabe o que aconteceu?", category: "stories", subCategory: "leao-gentil" },
  { text: "Todos sorriram. Ser gentil e educado é bem melhor e faz amigos brincarem juntos.", category: "stories", subCategory: "leao-gentil" },

  // ==================== HISTÓRIA - O DRAGÃO QUE APRENDEU A CONTROLAR A RAIVA ====================
  { text: "Era uma vez um dragãozinho chamado Foguinho. Quando ele ficava bravo… soltava fogo pelo nariz! Um dia, ele ficou com raiva porque perdeu no jogo. Soltou fogo… e queimou o próprio brinquedo! Ele ficou triste. A mamãe dragão ensinou: Quando ficar bravo, respire fundo. Vamos tentar juntos? Puxa o ar… Solta devagar… fuuuu… Foguinho tentou. E sabe o que aconteceu?", category: "stories", subCategory: "dragao-raiva" },
  { text: "O fogo virou só fumacinha. Quando fico brava, posso respirar e me acalmar. É uma excelente ideia. Tente fazer isso também. Se ficar brava, respire fundo e solta devagar… fuuuuuuu.", category: "stories", subCategory: "dragao-raiva" },

  // ==================== HISTÓRIA - O MACAQUINHO QUE NÃO GUARDAVA OS BRINQUEDOS ====================
  { text: "Tito, o macaquinho, deixava tudo espalhado. Carrinho aqui. Bonecas lá. Bola ali. Blocos no chão… Um dia ele tropeçou, caiu e estragou seu brinquedo. Ele chorou e chorou e chorou. Você já tropeçou em brinquedo?", category: "stories", subCategory: "macaquinho-brinquedos" },
  { text: "A mamãe falou: Vamos guardar juntos! Depois o quarto ficou limpinho e tudo organizado, muito mais fácil de brincar! Guardar os brinquedos deixa tudo melhor e bem cuidado.", category: "stories", subCategory: "macaquinho-brinquedos" },

  // ==================== HISTÓRIA - A LEBRE E A TARTARUGA ====================
  { text: "A lebre era muito rápida. A tartaruga era bem devagar. A lebre disse: Aposto que ganho de você! Começou a corrida! Quem você acha que vai ganhar, a lebre ou a tartaruga?", category: "stories", subCategory: "lebre-tartaruga" },
  { text: "A lebre correu muito… e resolveu tirar um cochilo. A tartaruga foi… devagar… devagar… mas não parou, foi persistente. E advinha quem ganhou? Quem?", category: "stories", subCategory: "lebre-tartaruga" },
  { text: "A tartaruga! O importante é não desistir, mesmo devagar a gente consegue.", category: "stories", subCategory: "lebre-tartaruga" },

  // ==================== HISTÓRIA - BRANCA DE NEVE ====================
  { text: "Era uma vez uma princesa chamada Branca de Neve. A madrasta dela todo dia perguntava ao seu espelho: Espelho, espelho meu… existe alguém mais bonita do que eu? O espelho respondeu que sim ou que não?", category: "stories", subCategory: "branca-de-neve" },
  { text: "Respondeu que sim! A madrasta ficou com inveja, o espelho disse que a Branca de Neve era a mais linda. Branca de Neve foi morar na floresta com sete anões. Mas a madrasta fez um feitiço, virou uma velhinha e deu uma maçã envenenada para Branca de Neve. Branca de Neve deveria aceitar comida de estranhos?", category: "stories", subCategory: "branca-de-neve" },
  { text: "Não! Branca de Neve desmaiou, mas um príncipe a salvou dando um beijo encantado nela. Não devemos ter inveja e precisamos ter cuidado com estranhos.", category: "stories", subCategory: "branca-de-neve" },

  // ==================== HISTÓRIA - ALADIM ====================
  { text: "Aladim gostava muito de passear. Você gosta de passear?", category: "stories", subCategory: "aladim" },
  { text: "Onde você gosta de ir?", category: "stories", subCategory: "aladim" },
  { text: "Um dia Aladim encontrou uma lâmpada mágica. Ele esfregou e esfregou a lâmpada até que… saiu um gênio de dentro dela! O gênio disse: Você tem três desejos! O que você pediria para o gênio da lâmpada mágica?", category: "stories", subCategory: "aladim" },
  { text: "Aladim quase desejou coisas só para ele… Mas percebeu que podia ajudar outras pessoas também. Ele pediu comida para muita gente, pediu brinquedos para crianças e roupinhas para os bebês. Devemos usar o que temos para fazer o bem.", category: "stories", subCategory: "aladim" },

  // ==================== HISTÓRIA - CINDERELA ====================
  { text: "Cinderela era uma princesa educada e gentil, mesmo sendo maltratada. Ela foi ao baile com ajuda da sua fada madrinha. Bibbidi-bobbidi-boo! E ela tinha um vestido lindo, sapatinhos de cristal e uma carruagem com cavalos para levá-la ao baile. Mas à meia-noite… tudo voltava ao normal! Ela saiu correndo do baile e perdeu o sapatinho de cristal. O príncipe procurou a dona do sapatinho. Você acha que o sapatinho serviu nas irmãs malvadas?", category: "stories", subCategory: "cinderela" },
  { text: "Não! Serviu só na Cinderela! Ser bondoso vale mais do que ser maldoso.", category: "stories", subCategory: "cinderela" },

  // ==================== HISTÓRIA - PINÓQUIO ====================
  { text: "Seu Gepeto fez um boneco de madeira chamado Pinóquio. Pinóquio era um boneco de madeira que queria ser menino de verdade. Mas ele contava mentiras… E o nariz fazia o quê?", category: "stories", subCategory: "pinoquio" },
  { text: "Crescia e Crescia! Cada vez que Pinóquio mentia, o nariz aumentava! É bom mentir?", category: "stories", subCategory: "pinoquio" },
  { text: "Não… Ele estava ficando com o nariz muito grande e batia seu nariz em tudo. Então ele foi honesto e corajoso, virou um menino de verdade. Falar a verdade é sempre o melhor caminho.", category: "stories", subCategory: "pinoquio" },

  // ==================== HISTÓRIA - O DIA EM QUE OS VILÕES RESOLVERAM APRENDER ====================
  { text: "Era uma vez um dia diferente no Reino Encantado… A Rainha Má, O Lobo, E a Bruxa resolveram fazer uma reunião! Estamos cansados de ser vilões! disse o Lobo. Você acha que vilão pode aprender a ser bom?", category: "stories", subCategory: "viloes-aprender" },
  { text: "Do outro lado do bosque estavam: Branca de Neve, Cinderela, Chapeuzinho Vermelho. Elas ficaram curiosas. Vamos dar uma chance? disse Cinderela. A Rainha Má tentou dizer algo gentil… Mas saiu assim: Você é… é… legalzinha. Já foi um começo! O Lobo tentou ajudar Chapeuzinho a levar a cesta. A Bruxa da maçã envenenada disse: Posso fazer uma maçã… normal? Ela fez uma maçã vermelha e docinha. Branca de Neve sorriu. No fim do dia, todos brincaram juntos no castelo. Nem todo vilão ficou perfeito… Mas todos tentaram melhorar. O que é mais importante: errar ou tentar fazer melhor?", category: "stories", subCategory: "viloes-aprender" },
  { text: "Isso! Tentar melhorar. As pessoas podem aprender. Bondade se ensina. Dar uma chance pode mudar um coração.", category: "stories", subCategory: "viloes-aprender" },

  // ==================== HISTÓRIA - O GRANDE BAILE DA FLORESTA ====================
  { text: "A Bela Adormecida organizou um baile. Todos foram convidados! Até os vilões! Mas a Bruxa Má disse: Vou estragar tudo! A Cinderela falou: Que tal você dançar com a gente? A Bruxa ficou surpresa… Você convidaria alguém que já foi malvado para brincar?", category: "stories", subCategory: "grande-baile" },
  { text: "Aos poucos, a Bruxa começou a sorrir. O Lobo pediu desculpas. A Raposa também. E todos dançaram juntos. Quando alguém pede desculpa, o que a gente faz?", category: "stories", subCategory: "grande-baile" },
  { text: "O perdão transforma corações e dançar faz muito bem.", category: "stories", subCategory: "grande-baile" },

  // ==================== HISTÓRIA - O JARDIM DO ÉDEN ====================
  { text: "Era uma vez… um jardim lindo, mas tão lindo que parecia um sonho! Esse jardim se chamava Éden. Quem fez esse jardim foi Deus. Ele colocou árvores cheias de frutas gostosas, rios brilhantes e muitos animaizinhos. Você consegue imaginar um jardim bem bonito?", category: "stories", subCategory: "jardim-eden" },
  { text: "Deus colocou no jardim um homem chamado Adão. Depois, fez uma mulher chamada Eva para ser amiga dele. Eles podiam brincar, cuidar das plantas e dar nome aos animais! Que nome você daria para um elefante?", category: "stories", subCategory: "jardim-eden" },
  { text: "Mas havia uma regra importante. No meio do jardim tinha uma árvore especial. Deus disse: Vocês podem comer de todas as árvores… menos dessa. É importante obedecer as regras?", category: "stories", subCategory: "jardim-eden" },
  { text: "Um dia, uma serpente apareceu e começou a conversar com Eva. Ela sabia da regra… mas acabou escolhendo desobedecer. Depois, Adão também fez a mesma coisa. E naquele momento, eles perceberam que tinham feito algo errado. Que feio que eles fizeram. Como você se sente quando faz algo que não devia?", category: "stories", subCategory: "jardim-eden" },
  { text: "Deus ficou triste, mas continuou amando Adão e Eva. Ele explicou que toda escolha tem consequência. E que obedecer é sempre o melhor caminho. Então eles tiveram que sair do jardim… Mas Deus prometeu que sempre cuidaria deles. Mesmo quando erramos, Deus deixa de amar a gente?", category: "stories", subCategory: "jardim-eden" },
  { text: "Não. Ele sempre nos ama e nos ensina a fazer o certo. Deus nos ama. Regras existem para nos proteger. Toda escolha tem consequência. Mesmo quando erramos, podemos aprender e melhorar. E lembre sempre.", category: "stories", subCategory: "jardim-eden" },

  // ==================== HISTÓRIA - A SEMENTINHA CORAJOSA ====================
  { text: "Era uma vez uma sementinha que tinha medo de crescer. E se eu não conseguir? ela dizia. O Sol respondeu: Tente só um pouquinho. A sementinha tentou e tentou... e virou um brotinho! Você acha que ela desistiu ou continuou tentando?", category: "stories", subCategory: "sementinha-corajosa" },
  { text: "Ela se animou e continuou… e virou uma linda flor. Quem tenta com coragem cresce forte cada vez mais lindo.", category: "stories", subCategory: "sementinha-corajosa" },

  // ==================== HISTÓRIA - A TARTARUGA APRESSADA ====================
  { text: "Uma tartaruga queria correr mais rápido que o vento. Ela correu, correu… e caiu! O passarinho disse: Devagar também é um jeito de chegar. Você acha melhor correr sem cuidado ou ir com calma?", category: "stories", subCategory: "tartaruga-apressada" },
  { text: "A tartaruga foi devagar… e chegou feliz ao destino. Fazer com calma é melhor do que fazer correndo e errar.", category: "stories", subCategory: "tartaruga-apressada" },

  // ==================== HISTÓRIA - A PRINCESA QUE FOI PARA A ESCOLA ====================
  { text: "Era uma vez a Princesa Sofia, que morava em um castelo enorme, cheio de espelhos dourados, tapetes macios e coroas brilhantes. Ela tinha vestidos lindos, joias e até um pônei cor-de-rosa… mas havia algo que ela nunca tinha feito: Ir para a escola. Um dia, olhando pela janela, ela viu várias crianças caminhando juntas com mochilas coloridas. Papai rei, para onde elas vão? perguntou. Para a escola, respondeu o rei. Lá elas aprendem muitas coisas. Os olhos da princesa brilharam. Eu também quero aprender! No dia seguinte, lá estava Sofia, com uma mochilinha lilás e uma coroa pequena (porque coroa grande não cabia na sala). A professora sorriu: Bom dia, turma! Vamos começar dizendo nossos nomes. Quando chegou a vez da princesa, ela disse: Eu sou a Princesa Sofia do Reino Dourado! As crianças riram, mas não de maldade — elas só acharam diferente. O que você acha que Sofia deveria fazer? Ficar triste ou Sorrir e fazer amigos?", category: "stories", subCategory: "princesa-escola" },
  { text: "Sofia pensou… e sorriu. Logo todos quiseram sentar perto dela. A professora disse: Hoje vamos desenhar o que queremos ser quando crescer. Sofia pensou: Mas eu já sou princesa… Então teve uma ideia e desenhou algo diferente. O que você acha que ela desenhou?", category: "stories", subCategory: "princesa-escola" },
  { text: "Ela desenhou… uma professora! A professora perguntou: Por que isso? Sofia respondeu: Porque professor ensina pessoas a serem inteligentes e gentis. Isso é mais poderoso que qualquer coroa. A professora ficou emocionada. Na hora de ir embora, Sofia disse: Hoje aprendi letras, números… e amigos. O rei perguntou: Então, minha filha, qual foi a melhor parte? Ela respondeu: A escola é um castelo onde todo mundo pode ser príncipe ou princesa do conhecimento. Aprender é o verdadeiro poder — e todos podem ser especiais quando estudam e compartilham conhecimento.", category: "stories", subCategory: "princesa-escola" },

  // ==================== HISTÓRIA - O LÁPIS MÁGICO DA ESCOLA ====================
  { text: "Na sala do João havia um lápis diferente: brilhava quando alguém tinha uma boa ideia. Durante a aula, a professora perguntou: Quem sabe uma palavra com a letra B? João pensou… pensou… nada. De repente, o lápis brilhou. Que palavra com B você diria?", category: "stories", subCategory: "lapis-magico" },
  { text: "João falou: Bondade! O lápis brilhou ainda mais forte. Uau! disse a professora, essa é uma palavra poderosa. No recreio, João viu um colega sozinho e lembrou da palavra. Ele foi até ele e disse: Quer brincar comigo? O lápis brilhou de novo. Boas atitudes fazem a gente brilhar por dentro.", category: "stories", subCategory: "lapis-magico" },

  // ==================== HISTÓRIA - O PIRATA QUE PROCURAVA TESOUROS DIFERENTES ====================
  { text: "O pequeno pirata Nico era o menor tripulante do navio Estrela do Mar, mas tinha o maior sonho: encontrar o maior tesouro do mundo. Todos os dias ele perguntava ao capitão: Já chegamos ao tesouro? Ainda não, pequeno marujo, respondia o capitão rindo. Nico cavou em ilhas desertas, mergulhou em águas rasas e abriu baús empoeirados. Mas dentro só havia moedas antigas, bússolas quebradas e mapas rasgados. Isso não é tesouro! reclamava. Um velho papagaio verde que vivia no mastro disse: Talvez você esteja procurando o tesouro errado… O que você acha que pode ser um tesouro de verdade?", category: "stories", subCategory: "pirata-tesouros" },
  { text: "No dia seguinte, um marinheiro estava com dificuldade para amarrar as velas. Nico ajudou. Depois viu um amigo cair e estendeu a mão. Mais tarde, dividiu seu pedaço de bolo com um pirata faminto. O papagaio gritou lá de cima: TEEESOURO ENCONTRADO! Nico olhou em volta: Onde? Não vejo ouro! O papagaio pousou no ombro dele e disse: O tesouro é isso que você fez. Gentileza, amizade e ajudar valem mais que qualquer baú. Nico sorriu. Pela primeira vez ele sentiu algo brilhar dentro do peito. O verdadeiro tesouro é ter um coração bondoso.", category: "stories", subCategory: "pirata-tesouros" },

  // ==================== HISTÓRIA - O ASTRONAUTA QUE CONVERSAVA COM ESTRELAS ====================
  { text: "Tom era um pequeno astronauta com um sonho gigante: conversar com as estrelas. Certa noite, ele entrou em sua nave azul e viajou pelo céu escuro e silencioso. Lá no alto, tudo parecia parado… até que ele ouviu um som suave: Oiii… Tom olhou em volta assustado. Quem falou? Uma estrelinha piscou bem na frente do vidro da nave. Fui eu, disse ela. Estrelas falam?! perguntou Tom. Só com quem sabe ouvir, respondeu ela. O que você acha que Tom fez para mostrar que estava ouvindo?", category: "stories", subCategory: "astronauta-estrelas" },
  { text: "Ele ficou quietinho, sem interromper. Prestou atenção de verdade. A estrela começou a contar histórias: sobre planetas que giravam como bailarinas, luas que brincavam de esconde-esconde e cometas que corriam como cavalos de luz. Tom ficou encantado. Nunca tinha ouvido histórias tão bonitas. Depois de um tempo, a estrela disse: Obrigada por escutar. Muitos só querem falar e falar e não sabem escutar. Quando voltou para casa, Tom passou a ouvir mais: ouviu seus amigos, sua família, os passarinhos e até o vento nas árvores. Ele percebeu que ouvir era um poder especial. Quem aprende a ouvir descobre mundos que ninguém mais vê.", category: "stories", subCategory: "astronauta-estrelas" },

  // ==================== SONS (sounds) ====================
  { text: "Som de risada", category: "sounds", soundPrompt: "cute baby girl laughing and giggling happily, realistic child laughter" },
  { text: "Som de choro de fome", category: "sounds", soundPrompt: "little girl around 5 years old crying softly, gentle young child whimpering, sweet kid cry" },
  { text: "Som de choro de dor", category: "sounds", soundPrompt: "little girl around 5 years old crying softly, gentle young child whimpering, sweet kid cry" },
  { text: "Som de choro de sono", category: "sounds", soundPrompt: "little girl around 5 years old crying softly, gentle young child whimpering, sweet kid cry" },
  { text: "Som de xixi", category: "sounds", soundPrompt: "baby urination sound, small stream of liquid, gentle water trickling sound" },
  { text: "Som de cocô", category: "sounds", soundPrompt: "baby pooping sound, funny baby bowel movement, small squelching sound" },
  { text: "Som de beijo", category: "sounds", soundPrompt: "sweet kiss sound, gentle kissing sound, cute baby kiss mwah" },
  { text: "Som de espirro", category: "sounds", soundPrompt: "cute baby sneeze, small child sneezing atchoo, adorable infant sneeze" },
  { text: "Som de tosse", category: "sounds", soundPrompt: "little girl around 5 years old coughing softly, gentle young child cough, sweet kid cough sound" },
  { text: "Som de bocejo", category: "sounds", soundPrompt: "cute baby yawning, sleepy baby girl yawn, adorable infant yawning sound" },
];
