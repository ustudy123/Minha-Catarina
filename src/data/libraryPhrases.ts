// Library phrases data - organized by category
// All phrases are in Portuguese (content language)
// Filter: no phrases containing "chupeta"

export interface LibraryPhraseData {
  text: string;
  category: string;
  timeOfDay?: string;
}

export const libraryPhrasesData: LibraryPhraseData[] = [

  // ==================== APRESENTAÇÃO ====================
  { text: "Oi eu sou a boneca Catarina da Carmell. Estou muito feliz que você vai cuidar de mim. Como é o seu nome? [pausa:5s] Que nome lindo você tem. Quem escolheu o seu nome? [pausa:5s] Quantos anos você tem? [pausa:5s] Muito prazer em te conhecer! Me dá um abraço bem gostoso? [pausa:3s] Obrigada pelo carinho! Gostei muito de você! O que você gosta de fazer? [pausa:5s] Vamos brincar muito juntas! Me mostra a sua casa? [pausa:5s]", category: "affection", timeOfDay: "morning" },

  // ==================== ACOLHIMENTO ====================
  { text: "Oi, que bom que você chegou. Eu estava com saudade de você. Eu senti sua falta. Você sentiu minha falta? [pausa:3s] Estou feliz que você está aqui comigo. Posso ficar aqui com você? Vamos ficar juntas? Me conta como foi seu dia? [pausa:8s] Seu dia foi muito legal. Posso sentar perto de você? Me dá a mão um pouquinho. [pausa:3s] Muito obrigada.", category: "affection", timeOfDay: "morning" },
  { text: "Você é muito querida. Eu me sinto segura com você perto de mim. Eu confio em você. Eu fico calma com você perto de mim. Eu me sinto bem melhor agora. Você é especial para mim. Amigos são pessoas especiais. Como é o nome das suas amigas e amigos? [pausa:8s] Você é minha amiga? [pausa:3s] Eu sou sua amiga. Você é muito importante. Eu gosto de você.", category: "affection", timeOfDay: "morning" },
  { text: "Você é muito legal. Você é gentil e educada. Você é muito linda. Eu gosto do seu jeito. Você gosta de mim? [pausa:3s] Eu fico feliz com você.", category: "affection", timeOfDay: "morning" },
  { text: "Vamos conversar? Eu quero ouvir você falar. Eu quero conversar com você! O que você fez hoje? [pausa:8s] Eu gostei de ouvir você. Eu gostei de falar com você. Qual a sua brincadeira favorita? [pausa:5s] Essa brincadeira é legal. Eu gosto dessa brincadeira.", category: "affection", timeOfDay: "afternoon" },
  { text: "Me dá um beijinho? [pausa:3s] Que delícia! Obrigada pelo carinho. Eu te amo. I love you.", category: "affection", timeOfDay: "afternoon" },

  // ==================== SENTIMENTOS ====================
  { text: "Como você está hoje? [pausa:5s] Eu me senti sozinha. Eu estava triste. Eu estava com saudade. Tem alguma coisa que te deixa triste? [pausa:5s] O que te deixa triste? [pausa:5s] De quem você sente saudade? [pausa:5s] Você já ficou brava alguma vez? [pausa:3s] O que te deixa brava? [pausa:5s] Precisa ter calma e respirar fundo. Ficar brava não resolve.", category: "affection", timeOfDay: "afternoon" },
  { text: "Você gosta de dançar? [pausa:3s] Dançar pode acalmar. Carinho acalma. Eu preciso de um carinho. Você é muito querida. Eu quero colinho, por favor. [pausa:3s] Muito obrigada. Eu gostei do que você fez.", category: "affection", timeOfDay: "afternoon" },
  { text: "Vou te contar um segredo. Eu ainda não sei andar. Eu tenho muita vergonha. Mas não podemos ter vergonha. Você me ajuda, por favor? [pausa:3s] Você pode me ensinar a andar pegando nas minhas mãos? [pausa:5s] Amigo ajuda amigo. Obrigada por me ajudar. Você foi paciente. Você foi educada. Você foi gentil. Eu aprendi com você. Você me ensinou. Eu gosto de aprender com você.", category: "affection", timeOfDay: "afternoon" },
  { text: "Estou muito feliz. Eu confio em você. Eu fiquei calma. Eu gostei da sua ajuda. Me conta um segredo? [pausa:5s] Eu fiquei curiosa. Me conta isso? [pausa:5s] Obrigada pela confiança. Eu fiquei feliz com você. O que te deixa feliz? [pausa:5s] Eu estou feliz com você.", category: "affection", timeOfDay: "afternoon" },
  { text: "O que você aprendeu na escola hoje? [pausa:8s] Eu fiquei orgulhosa de você. Eu gosto muito de você, do jeitinho que você é. O que te deixa calma? [pausa:5s] Quando você canta eu fico calminha. Canta uma música para mim? [pausa:8s] Eu gosto dessa música. Canta outra música para mim? [pausa:8s] Você canta muito bem.", category: "affection", timeOfDay: "afternoon" },
  { text: "Eu gostei disso. Eu gostei do nosso tempo juntas. Estou triste. Às vezes ficamos triste. Estou cansada. Não quero brincar agora. É preciso respeitar. Brigar é muito feio. Eu não gosto disso. O que você não gosta de fazer? [pausa:5s] Eu não gosto de gritar. Vamos falar baixinho. Gritar é feio.", category: "affection", timeOfDay: "afternoon" },

  // ==================== VALORES ====================
  { text: "Vamos para a escolinha. Aprender é legal! Ver os amigos da escolinha também! Você gosta de ir à escola? [pausa:3s] A escola é muito importante. Como é o nome da sua escola? [pausa:5s] Se você não sabe, pergunte para alguém da sua família. Como é o nome da sua professora? [pausa:5s] O que você mais gosta de fazer na escola? [pausa:5s] Precisamos estudar um pouquinho. Aprender é bom.", category: "education", timeOfDay: "morning" },
  { text: "Vamos fazer a tarefa. Você é capaz. Você consegue. Vamos tentar. Tudo bem errar. Não tem problema. O importante é tentar. Devagar também vale. Precisa ter paciência. Você está aprendendo. Você está indo bem. Eu gostei de ver seu esforço. Você foi incrível.", category: "education", timeOfDay: "afternoon" },
  { text: "O que acha de ler um livro? Vamos ler um livro? [pausa:3s] Gosto desse livro.", category: "education", timeOfDay: "afternoon" },
  { text: "Vou te ensinar umas palavrinhas mágicas. As palavras mágicas são: por favor, com licença, desculpa e obrigada. Por favor. Para pedir alguma coisa, sempre falamos por favor. Com licença. Falamos quando precisamos passar em algum lugar ou falar alguma coisa, então pedimos licença antes. Desculpa. Falamos quando magoamos alguém ou fazemos algo errado, é muito importante pedir desculpa. Obrigada. Dizemos quando agradecemos alguém por algo, usamos a palavra obrigada ou também podemos falar Muito obrigada. Se alguém disser obrigada para nós, respondemos De nada.", category: "education", timeOfDay: "morning" },

  // ==================== ROTINA MANHÃ ====================
  { text: "Eu acordei. Vamos acordar? Acorde, acorde, acorde. É hora de acordar. Bom diaaaa! Bença. Dormiu bem? [pausa:3s] Eu sonhei que eu era uma princesa cantora. O que você sonhou? [pausa:5s] Às vezes temos sonhos ruins, eles se chamam pesadelos. Não precisa ter medo. Estou aqui.", category: "daily", timeOfDay: "morning" },
  { text: "Está sol ou está chovendo lá fora? [pausa:3s] Vamos ver? Você prefere chuva ou sol? [pausa:3s] Eu gosto dos dois. Um dia sol, um dia chuva. Sol e chuva casamento de viúva. Chuva e sol casamento de espanhol.", category: "daily", timeOfDay: "morning" },
  { text: "Vamos tomar café da manhã? O café da manhã é uma refeição muito importante. O que você gosta de comer de manhã? [pausa:5s] Estou com fome. Estou com sede. Quero água, por favor. [pausa:3s] Já bebi tudo. Obrigada. Quero um leitinho. Hum, que delícia!", category: "daily", timeOfDay: "morning" },
  { text: "Hora de escovar os dentes. Escovar os meus dentes. Escovar os seus dentes. Uma vez de cada. Você primeiro. É preciso esperar. Agora é a minha vez. Dentes limpinhos e sem bichinhos.", category: "daily", timeOfDay: "morning" },
  { text: "Hora do banho. Eu gosto de tomar banho e ficar cheirosa. Você gosta de tomar banho? [pausa:3s] Vamos lavar o cabelo. Está limpinho e cheirosinho. Vamos nos secar.", category: "daily", timeOfDay: "morning" },
  { text: "Hora de trocar a roupa e nos arrumar. Quero uma roupa bem bonita. Arruma meu cabelo, por favor. Está tudo bagunçado. Coloca um lacinho no meu cabelo. Passa um perfuminho em mim? Coloca o sapato, por favor. Eu estou linda? [pausa:3s] Você está muito linda. Obrigada por cuidar de mim.", category: "daily", timeOfDay: "morning" },
  { text: "Estou com dor de barriga. Limpa minhas mãos, por favor.", category: "daily", timeOfDay: "morning" },
  { text: "Hora de almoçar. O que você quer comer? [pausa:5s] Precisamos comer para crescer. Estou com fome. O que tem para comer hoje? [pausa:5s] Hum, que delícia, que gostoso. Vamos dividir. Amigos dividem as coisas. Uma vez de cada. Vamos esperar a vez de cada um. Agora é sua vez. Depois é a minha vez. Quero mais. Já comi tudo. Vou ficar mais linda e forte agora.", category: "daily", timeOfDay: "afternoon" },
  { text: "Preciso escovar os dentes agora! Você precisa escovar os dentes, para não ter bichinhos. Que dentes lindos e limpinhos.", category: "daily", timeOfDay: "afternoon" },
  { text: "Estou com sono. Quero colinho para dormir. Estou com sono. Canta uma música para eu dormir? [pausa:8s]", category: "daily", timeOfDay: "afternoon" },

  // ==================== ROTINA TARDE ====================
  { text: "Vamos passear. Quero passear de carrinho. Você gosta de passear? [pausa:3s] Onde você gosta de passear? [pausa:5s] Vamos no mercado. Não esquece a lista de compras e o dinheiro. Vamos para a natação, eu quero aprender a nadar. Vamos no ballet, eu amo dançar.", category: "daily", timeOfDay: "afternoon" },
  { text: "Vamos passear no parque? Eu vou, eu vou para o parque agora eu vou… Pararatimbum, pararatimbum, eu vou, eu vou…", category: "daily", timeOfDay: "afternoon" },
  { text: "Hora de brincar. uhullll! Do que você quer brincar? [pausa:5s] Vamos brincar juntas. Tem que dividir os brinquedos. Me mostra seus brinquedos? [pausa:5s] O que você mais gosta de brincar? [pausa:5s] Que bom brincar com você.", category: "daily", timeOfDay: "afternoon" },
  { text: "Hora de guardar os brinquedos e arrumar essa bagunça. Vamos ajudar. Amigo ajuda amigo. Você me ajuda, por favor? [pausa:3s] Eu te ajudo. Agora melhorou.", category: "daily", timeOfDay: "afternoon" },
  { text: "Tá na hora do lanchinho. Estou com fome. O que vai fazer para eu comer? [pausa:5s] Está uma delícia. Já comi tudo. Quero sobremesa. Quero um biscoitinho. Quero mais, por favor.", category: "daily", timeOfDay: "afternoon" },
  { text: "Eu gosto de conversar com você. Qual a sua cor favorita? [pausa:5s] Minha cor preferida é cor de rosa.", category: "daily", timeOfDay: "afternoon" },
  { text: "Não estou me sentindo bem. Acho que estou com gripe. Acho que estou com febre, mede a minha temperatura, por favor! Fiz um dodói. Assopra, assopra. Faz um curativo. Por favor. Um remédinho para sarar. Passa uma pomadinha? Agora está melhor.", category: "daily", timeOfDay: "afternoon" },
  { text: "Você me ajudou. Você já se machucou alguma vez? [pausa:5s] Machucar dói. Como foi que se machucou? [pausa:5s] Isso dói. Mas passa. Eu fiquei nervosa. Mas não adiantou nada. Hora de descansar um pouquinho.", category: "daily", timeOfDay: "afternoon" },

  // ==================== ROTINA NOITE ====================
  { text: "Me conte uma coisa que você amou muito no seu dia? [pausa:8s] Isso foi muito legal. Já está ficando noite.", category: "daily", timeOfDay: "night" },
  { text: "Tá na hora do jantar. Estou com fome. O que você vai fazer para eu comer hoje? [pausa:5s] Hum, que gostoso. Minha janta, minha janta, vou comer… vou comer… Para ficar fortinho, para ficar fortinho e crescer. E crescer. Já comi tudo.", category: "daily", timeOfDay: "night" },
  { text: "Hora do banho. Você gosta de tomar banho? [pausa:3s] A água está quentinha. Hora de me secar e de colocar o pijama. Cheirinho bom, cheirinho de flor, bebê limpinho, cheio de amor. Vamos escovar os dentes. Nós precisamos escovar os dentes. Primeiro você. Agora é a minha vez.", category: "daily", timeOfDay: "night" },
  { text: "Conta uma historinha para mim? [pausa:8s] Conta de novo, por favor. Eu gostei dessa história. Me cobre, por favor, estou com frio. Posso dormir do seu lado?", category: "daily", timeOfDay: "night" },
  { text: "Vamos fazer uma oração. Santo Anjo do Senhor, meu zeloso guardador, já que a ti me confiou a Piedade Divina, sempre me rege, me guarda, me governa e ilumina, agora e sempre. Amém.", category: "daily", timeOfDay: "night" },
  { text: "Bença. Estou com soninho. Está na hora de dormir. Obrigada por cuidar de mim. Você cuida muito bem. Me dá um abraço? [pausa:3s] Obrigada. Você é muito carinhosa e querida. Obrigada por brincar comigo. Amanhã tem mais. Eu vou dormir agora. Boa noite pra você, até amanhã. Sonhe com os anjinhos.", category: "daily", timeOfDay: "night" },

  // ==================== ROTEIRO 1 - INCENTIVO ====================
  { text: "Você tá indo bem. Você consegue. Eu gostei do seu esforço. Você fez o seu melhor. O importante é tentar. Mas nem sempre conseguimos. Você foi paciente. Você foi corajosa. Você foi educada. Você foi incrível. Eu tenho orgulho de você.", category: "affection", timeOfDay: "afternoon" },

  // ==================== ROTEIRO 2 - DIFICULDADE ====================
  { text: "Calma, muita calma nessa hora. Vamos resolver esse problema. Tudo tem solução. Respira fundo e conta até cinco! Um, dois, três, quatro, cinco. O que aconteceu? [pausa:5s] Eu posso te ajudar. Agora melhorou? [pausa:3s] Você é paciente. Você é educada. Você é corajosa. Eu gosto de você assim, do jeitinho que você é, é única e especial. Não precisa chorar, vai passar. Cheirinho de colo, cheirinho de pão, cheirinho gostoso, do meu coração. Gostou do meu poema? [pausa:3s] Você é minha amiga. Eu gosto muito de você.", category: "affection", timeOfDay: "afternoon" },

  // ==================== ROTEIRO 3 - QUANDO A CRIANÇA CHORA ====================
  { text: "Fique calma. Respire fundo. É preciso ter paciência. Porque está chorando? [pausa:5s] Chorar ajuda às vezes. Não fique triste. Isso vai passar. Quer um abraço? [pausa:3s] O abraço pode acalmar. Agora está melhor? [pausa:3s] Você é muito especial.", category: "affection", timeOfDay: "afternoon" },

  // ==================== ROTEIRO 4 - HORA DE GUARDAR ====================
  { text: "A brincadeira foi boa. Mas acabou. Agora vamos guardar tudinho. Cada coisa no lugar e vai ficar bem lindo e organizado. Guarda, guarda, guarda, bem direitinho, quem guarda tudo, acha tudo arrumadinho. Depois tem mais e mais. Você é muito querida e gentil.", category: "education", timeOfDay: "afternoon" },

  // ==================== ROTEIRO 5 - CATARINA ESTA COM FOME ====================
  { text: "Estou com fome. Minha barriga roncou. Hora de comer. O que tem para comer? [pausa:5s] Faz outra? Tá cheirando bem. Humm, tá gostoso. Estou feliz agora. Quero mais comida. Quero suco. Quero sobremesa.", category: "daily", timeOfDay: "afternoon" },

  // ==================== ROTEIRO 7 - FIM DO DIA ====================
  { text: "Hoje foi um dia bom. A gente brincou. A gente aprendeu. Eu gostei muito. Precisamos dormir e descansar. Até amanhã. Gosto muito de você. Você é especial.", category: "daily", timeOfDay: "night" },

  // ==================== ROTEIRO 8 - ENTREVISTA COM A CRIANÇA ====================
  { text: "Vou te fazer umas perguntinhas de curiosa. É uma entrevista com você. Como é seu nome inteiro? [pausa:8s] Quantos anos você tem? [pausa:5s] O que você mais gosta de fazer? [pausa:8s] O que você não gosta de fazer? [pausa:8s] Qual é a sua comida favorita? [pausa:5s] O que você não gosta de comer? [pausa:5s] Qual o seu sonho? [pausa:8s] Qual sua cor favorita? [pausa:5s] O que você vai ser quando crescer? [pausa:8s] O que você falaria ou pediria para Jesus se encontrasse ele? [pausa:8s] Adorei suas respostas. Você é muito especial.", category: "playtime", timeOfDay: "afternoon" },

  // ==================== EDUCAÇÃO ====================
  { text: "Vou te contar umas curiosidades, quer ouvir? [pausa:3s] Você vai gostar. E você pode ensinar para seus amigos e amigas. Posso contar? [pausa:3s]", category: "education", timeOfDay: "afternoon" },

  // Arco-íris
  { text: "O arco-íris é muito lindo, ele aparece quando o sol e a chuva brincam juntos. Você sabia que o arco-íris tem 7 cores? Vou te dizer todas as cores do arco-íris na ordem certinha. Vermelho. Laranja. Amarelo. Verde. Azul. Anil. Violeta.", category: "education", timeOfDay: "afternoon" },

  // Polvos
  { text: "Você sabia que os polvos têm 3 corações? É verdade, o polvo tem 3 corações, legal né!? Um, dois, três. Aprender é muito legal. Conte isso para seus amigos e amigas.", category: "education", timeOfDay: "afternoon" },

  // Contar de 0 a 10
  { text: "Vamos contar de zero até dez? Conta comigo? Zero, um, dois, três, quatro, cinco, seis, sete, oito, nove, dez. Conseguimos!", category: "education", timeOfDay: "morning" },

  // Contar de 10 a 0
  { text: "Agora vamos de dez até zero? Dez, nove, oito, sete, seis, cinco, quatro, três, dois, um, zero. Ufa, acabou!", category: "education", timeOfDay: "morning" },

  // Animais curiosidades
  { text: "Vou te contar algumas coisas sobre os animais. Você sabia que a coruja consegue virar a cabeça quase toda para trás? Ela consegue ver muita coisa que acontece atrás dela. A formiga, mesmo pequenininha, é muito forte e pode carregar coisas maiores que ela, sabia disso? Tem um animal que não consegue pular, sabe qual é!? [pausa:5s] O elefante, ele é o único animal que não consegue pular!", category: "education", timeOfDay: "afternoon" },

  // Mel
  { text: "Vou te contar mais uma coisinha curiosa. Sabia que o mel vem das abelhas e é um docinho natural. Você já provou mel? [pausa:3s] Você gostou de mel? [pausa:3s]", category: "education", timeOfDay: "afternoon" },

  // Água
  { text: "Você gosta de beber água? [pausa:3s] A água não tem sabor, nem cheiro. Precisamos beber bastante água para nossa pele ficar linda. Beber água é muito importante para nós e para as plantas também! Você sabia que as plantas bebem água pelas raízes? Por isso jogamos água embaixo delas, nas suas raízes! Você sabe que as nuvens são feitas de gotinhas de água! Isso é divertido.", category: "education", timeOfDay: "afternoon" },

  // Clima
  { text: "Você gosta mais de chuva ou de sol? [pausa:3s] Eu gosto dos dois. Você gosta mais de calor ou de frio? [pausa:3s] O que você gosta de fazer quando tem sol? [pausa:5s] O que você gosta de fazer quando está frio? [pausa:5s] Eu gosto de ir na praia quando tem sol. Você já foi na praia? [pausa:3s] Você já tomou banho de piscina? [pausa:3s] Eu gosto de tomar banho de chuva. Você gosta de tomar banho de chuva? [pausa:3s] É muito divertido tomar banho de chuva.", category: "education", timeOfDay: "afternoon" },

  // Sol
  { text: "Qual a cor do sol? [pausa:3s] Você sabia que o sol é uma estrela especial, ele brilha muito né? O sol ajuda as plantinhas a crescerem. Sabe o que acontece com o sol quando fica escuro? O sol vai iluminar o outro lado da Terra e no outro dia ele volta!", category: "education", timeOfDay: "afternoon" },

  // Coração e cérebro
  { text: "Você sabia que o coração faz tum-tum o dia todo! Ele trabalha sem parar para cuidar da gente, até quando a gente tá dormindo. E precisamos dormir bem para crescer. É isso mesmo que está pensando, a gente tem que dormir para crescer! Quem cuida do nosso coração é o médico cardiologista. Sabia que dentro da nossa cabeça tem o cérebro e ele nunca dorme, nem quando estamos dormindo.", category: "education", timeOfDay: "afternoon" },

  // Mistura de cores
  { text: "Vou te contar uns segredinhos das cores, bem legal. Sabe o que acontece se misturar azul e amarelo? [pausa:5s] Fica Verde! As cores gostam de brincar juntas. Se misturar Vermelho e Amarelo. Fica Laranja. Se misturar Vermelho e Azul, fica Roxo. Você pode fazer essa experiência de misturar as cores.", category: "education", timeOfDay: "afternoon" },

  // Formas geométricas
  { text: "Vou te ensinar sobre as formas geométricas. É muito interessante. As formas geométricas estão em todos os lugares. O círculo é redondo e não tem lados! A roda e o prato são círculos, já viu isso? Onde você vê um círculo aí? [pausa:5s] O quadrado tem 4 lados iguais. Um, dois, três, quatro, todos do mesmo tamanho. A janela e o dado são quadrados! O triângulo tem 3 lados e 3 pontinhas. O telhado da casa parece um triângulo. Quantos lados mesmo tem o triângulo? [pausa:3s] Um, dois, três. O retângulo tem 4 lados, mas dois são maiores e 2 são pequenos. A porta é um retângulo! Vamos procurar as formas geométricas ao nosso redor?", category: "education", timeOfDay: "afternoon" },

  // ==================== ORAÇÕES ====================
  { text: "Tá na hora de dormir. Estou tão cansada hoje. Você está com sono também? [pausa:3s] Vamos fazer uma oração juntas? Você sabe alguma oração? [pausa:3s] Eu posso te ensinar uma? Começamos assim. Em nome do Pai, do Filho e do Espírito Santo. Amém!", category: "prayers", timeOfDay: "night" },

  { text: "Santo Anjo do Senhor, meu zeloso guardador, já que a ti me confiou a Piedade Divina, sempre me rege, me guarda, me governa e ilumina, agora e sempre. Amém.", category: "prayers", timeOfDay: "night" },

  { text: "Pai Nosso que estais no céu, santificado seja o vosso nome, vem a nós o vosso reino, seja feita a vossa vontade assim na terra como no céu. O pão nosso de cada dia nos daí hoje, perdoai-nos as nossas ofensas, assim como nós perdoamos a quem nos tem ofendido, não nos deixei cair em tentação mas livrai-nos do mal. Amém.", category: "prayers", timeOfDay: "night" },

  { text: "Bença mamãe. Bença papai. Bença vovó. Bença vovô.", category: "prayers", timeOfDay: "night" },

  { text: "O que está procurando? [pausa:5s] Tive uma ideia. Tem uma oração para poder encontrar as coisas sabia? Você sabe para quem pedimos ajuda para encontrar algo que perdemos? [pausa:5s] São Longuinho, São Longuinho, se eu achar meu negócio, dou três pulinhos. Vamos procurar juntas. Eu te ajudo.", category: "prayers", timeOfDay: "afternoon" },

  // O Jardim do Éden
  { text: "O Jardim do Éden. Era uma vez… um jardim lindo, mas tão lindo que parecia um sonho! Esse jardim se chamava Éden. Quem fez esse jardim foi Deus. Ele colocou árvores cheias de frutas gostosas, rios brilhantes e muitos animaizinhos. Você consegue imaginar um jardim bem bonito? [pausa:5s] Deus colocou no jardim um homem chamado Adão. Depois, fez uma mulher chamada Eva para ser amiga dele. Eles podiam brincar, cuidar das plantas e dar nome aos animais! Que nome você daria para um elefante? [pausa:5s] Mas havia uma regra importante. No meio do jardim tinha uma árvore especial. Deus disse: Vocês podem comer de todas as árvores… menos dessa. É importante obedecer as regras? [pausa:3s] Um dia, uma serpente apareceu e começou a conversar com Eva. Ela sabia da regra… mas acabou escolhendo desobedecer. Depois, Adão também fez a mesma coisa. E naquele momento, eles perceberam que tinham feito algo errado. Que feio que eles fizeram. Como você se sente quando faz algo que não devia? [pausa:5s] Deus ficou triste, mas continuou amando Adão e Eva. Ele explicou que toda escolha tem consequência. E que obedecer é sempre o melhor caminho. Então eles tiveram que sair do jardim… Mas Deus prometeu que sempre cuidaria deles. Mesmo quando erramos, Deus deixa de amar a gente? [pausa:3s] Não. Ele sempre nos ama e nos ensina a fazer o certo. Deus nos ama. Regras existem para nos proteger. Toda escolha tem consequência. Mesmo quando erramos, podemos aprender e melhorar.", category: "prayers", timeOfDay: "night" },

  // ==================== POEMAS ====================
  { text: "Eu adoro poemas. Você sabe o que é um poema? [pausa:3s] Um poema é um texto divertido formado por versos e estrofes. Você vai gostar também. Você conhece algum poema? [pausa:3s] Conta um poema para mim? [pausa:5s] Se você não sabe, tudo bem! Eu vou te ensinar. Aprender é muito legal. Vou te falar alguns poemas que eu sei.", category: "stories", timeOfDay: "afternoon" },

  { text: "Corre cutia, na casa da tia. Corre cipó, na casa da avó. Lencinho na mão, caiu no chão. Moça bonita, do meu coração... Um, dois, três!", category: "stories", timeOfDay: "afternoon" },

  { text: "Dedo mindinho, Seu vizinho, Pai de todos, Fura bolo, Mata piolho.", category: "stories", timeOfDay: "afternoon" },

  { text: "Batatinha quando nasce se esparrama pelo chão. Menininha quando dorme põe a mão no coração.", category: "stories", timeOfDay: "afternoon" },

  { text: "Quando você estiver em dúvida de qual escolha fazer, tem um poeminha que pode te ajudar e é bem legal. Vou te ensinar. Uni, duni, tê, Salamê, mingüê, Um sorvete colorê, O escolhido foi você!", category: "stories", timeOfDay: "afternoon" },

  { text: "Um, dois, feijão com arroz, Três, quatro, feijão no prato, Cinco, seis, falar inglês, Sete, oito, comer biscoito, Nove, dez, comer pastéis.", category: "stories", timeOfDay: "afternoon" },

  { text: "O macaco foi à feira não teve o que comprar. Comprou uma cadeira pra comadre se sentar. A cadeira esborrachou coitada da comadre. Foi parar no corredor.", category: "stories", timeOfDay: "afternoon" },

  { text: "Pedrinha rolou, Pisquei pro mocinho, Mocinho gostou. Contei pra mamãe, Mamãe nem ligou. Contei pro papai, Chinelo cantou.", category: "stories", timeOfDay: "afternoon" },

  { text: "Eu sou pequena Da perna grossa. Vestido curto, Papai não gosta.", category: "stories", timeOfDay: "afternoon" },

  { text: "Rei, capitão, soldado, ladrão. Moça bonita do meu coração.", category: "stories", timeOfDay: "afternoon" },

  { text: "A casinha da vovó trançadinha de cipó; se o café está demorando com certeza falta pó.", category: "stories", timeOfDay: "afternoon" },

  { text: "Era uma bruxa à meia-noite em um castelo mal-assombrado com uma faca na mão passando manteiga no pão.", category: "stories", timeOfDay: "afternoon" },

  { text: "Galinha choca, comeu minhoca, saiu pulando, que nem pipoca.", category: "stories", timeOfDay: "afternoon" },

  { text: "Eu sou pequenininha, do tamanho de um botão. Carrego o papai no bolso e a mamãe no coração.", category: "stories", timeOfDay: "afternoon" },

  { text: "Cheirinho de colo, cheirinho de pão, cheirinho gostoso do meu coração.", category: "stories", timeOfDay: "afternoon" },

  { text: "Cheirinho bom, cheirinho de flor, bebê limpinho cheio de amor.", category: "stories", timeOfDay: "afternoon" },

  // ==================== BRINCADEIRAS ====================
  { text: "Eu tive uma ideia. Vamos brincar? Vem brincar comigo, por favor. Ache um objeto redondo, um círculo por aqui e me mostre. [pausa:5s] Isso mesmo. Acertou! Agora ache algo da cor VERMELHA. [pausa:5s] Achou? Muito bem! Agora me fala o que você sabe que é da cor verde? [pausa:5s] Parabéns. O brócolis e o alface também é verde. Você é muito inteligente. Ache agora encontre algo da cor amarela para eu ver. [pausa:5s] Obrigada por me ensinar. Eu gostei dessa brincadeira. E você?", category: "playtime", timeOfDay: "afternoon" },

  { text: "Agora é hora de imitar! Como o cachorro faz? [pausa:3s] E o gato? [pausa:3s] E a galinha? [pausa:3s] Qual mais você sabe imitar? [pausa:5s] Sabe imitar um macaco? [pausa:3s] E como faz o boi? [pausa:3s] Agora é a minha vez. Vou imitar um pintinho. Piu piu piu piu. Também sei imitar um cavalo. Pocotó pocotó pocotó pocotó.", category: "playtime", timeOfDay: "afternoon" },

  { text: "Eu quero aprender as partes do corpo. Você me ensina? Me mostra onde tá o nariz? [pausa:3s] E a boca? [pausa:3s] Os olhos? [pausa:3s] As orelhinhas? [pausa:3s] Onde fica o joelho? [pausa:3s] Cadê o pé? [pausa:3s] Aprender é legal. Obrigada por me ensinar tudo isso! Que bom brincar com você. Vamos brincar mais? Você quer brincar do que? [pausa:5s]", category: "playtime", timeOfDay: "afternoon" },

  { text: "Vamos brincar de fazer caretas? Eu tenho dificuldade nessa brincadeira. Acho muito difícil. Mas é importante tentar. Você pode me ensinar. Dá uma risadinha? [pausa:3s] Faz cara de brava para eu ver? [pausa:3s] E de inteligente você sabe? [pausa:3s] Cara de dor de barriga? [pausa:3s] Faz uma careta mostrando a língua? [pausa:3s] Você é muito divertida. Adorei essa brincadeira. Você é muito legal. Estou feliz de brincar com você.", category: "playtime", timeOfDay: "afternoon" },

  // Estátua
  { text: "Mão na cabeça. Mão na cintura. Um pé na frente e o outro atrás. Agora ninguém pode se mexer. Estátua! [pausa:5s] Um braço pra cima. Um braço pra frente. Cruzando as pernas. Bumbum para trás. Agora ninguém pode se mexer. Estátua! [pausa:5s] Rodando, rodando. Braços esticados. Não pode parar, continue rodando. Quero saber quem é que consegue ficar parado. Estátua! [pausa:5s] Mão na cabeça. Mão na cintura. Um pé na frente e o outro atrás. Agora ninguém pode se mexer. Estátua! [pausa:5s] Mexendo a cabeça. Mexendo as mãos. Faz um shake shake. Até o chão. Quero saber quem é que consegue. Ficar parado. A gente vai ter que rodar. Roda, roda no lugar. Ninguém aqui pode cair. Eu vou contar pra terminar. Três, dois, um. Estátua!", category: "playtime", timeOfDay: "afternoon" },

  // ==================== MÚSICAS ====================
  { text: "Vamos cantar uma música juntas? Eu gosto muito de cantar. Eu acho sua voz linda. Eu gosto quando você canta. Qual música você quer cantar? [pausa:5s] Se eu não souber a música, você me ensina? Se você não souber a música, eu te ensino.", category: "songs", timeOfDay: "afternoon" },

  // Ciranda Cirandinha
  { text: "Ciranda, Cirandinha. Vamos todos cirandar. Vamos dar a meia volta. Volta e meia vamos dar. O Anel que tu me destes era vidro e se quebrou. O amor que tu me tinhas era pouco e se acabou. Por isso dona moça faz favor de entrar na roda. Diga um verso bem bonito. Diga adeus e vá embora.", category: "songs", timeOfDay: "afternoon" },

  // Levantar um braço
  { text: "Levantar um braço, levantar o outro, fazer bamboleio, mexer o pescoço. Olhar para o teto, olhar para o sapato. E me dá um abraço.", category: "songs", timeOfDay: "afternoon" },

  // A Barata
  { text: "A Barata diz que tem sete saias de filó. É mentira da barata, ela tem é uma só. Ah ra ra, iá ro ró, ela tem é uma só! A Barata diz que tem um sapato de veludo. É mentira da barata, o pé dela é peludo. Ah ra ra, Iu ru ru, o pé dela é peludo! A Barata diz que tem uma cama de marfim. É mentira da barata, ela tem é de capim. Ah ra ra, rim rim rim, ela tem é de capim. A Barata diz que tem um anel de formatura. É mentira da barata, ela tem é casca dura. Ah ra ra, iu ru ru, ela tem é casca dura. A barata diz que vai viajar de avião. É mentira da barata ela vai de caminhão. Ah ra ra, iu ru ru, ela vai de caminhão.", category: "songs", timeOfDay: "afternoon" },

  // Alecrim
  { text: "Alecrim, Alecrim dourado. Que nasceu no campo sem ser semeado. Alecrim, Alecrim dourado. Que nasceu no campo sem ser semeado. Foi meu amor que me disse assim que a flor do campo é o alecrim. Foi meu amor que me disse assim que a flor do campo é o alecrim.", category: "songs", timeOfDay: "afternoon" },

  // Pombinha Branca
  { text: "Pombinha branca o que está fazendo? Lavando roupa pro casamento. Vou me lavar, vou me secar. Vou pra janela pra namorar. Passou um moço de terno branco, chapéu de lado meu namorado. Mandei entrar, mandei sentar. Cuspiu no chão, limpa aí seu porcalhão.", category: "songs", timeOfDay: "afternoon" },

  // Indiozinhos
  { text: "Um, dois, três indiozinhos. Quatro, cinco, seis indiozinhos. Sete, oito, nove indiozinhos. Dez num pequeno bote. Iam navegando pelo rio abaixo quando um jacaré se aproximou. E o pequeno bote dos indiozinhos quase, quase virou.", category: "songs", timeOfDay: "afternoon" },

  // Se Essa Rua
  { text: "Se essa rua, se essa rua fosse minha, eu mandava, eu mandava ladrilhar. Com pedrinhas, com pedrinhas de brilhante, para o meu, para o meu amor passar. Nessa rua, nessa rua tem um bosque, que se chama, que se chama solidão. Dentro dele, dentro dele mora um anjo, que roubou, que roubou meu coração. Se eu roubei, se eu roubei teu coração, tu roubaste, tu roubaste o meu também. Se eu roubei, se eu roubei teu coração, é porque, é porque te quero bem.", category: "songs", timeOfDay: "afternoon" },

  // Meu Lanchinho
  { text: "Meu lanchinho, meu lanchinho, vou comer, vou comer. Pra ficar fortinho, pra ficar fortinho e crescer, e crescer. Se não comer, se não comer, passa mal, passa mal. Fica doentinho, fica doentinho, vai pro hospital, comer mingau.", category: "songs", timeOfDay: "afternoon" },

  // Sete e Sete
  { text: "Sete e sete são quatorze, com mais sete, vinte e um. Tenho sete namorados e só posso casar com um.", category: "songs", timeOfDay: "afternoon" },

  // Mestre André
  { text: "Foi na loja do Mestre André que eu comprei um pianinho, Plim, plim, plim, um pianinho. Ai olé, ai olé! Foi na loja do Mestre André! Foi na loja do Mestre André que eu comprei um violão, Dão, dão, dão, um violão. Plim, plim, plim, um pianinho. Ai olé, ai olé! Foi na loja do Mestre André! Foi na loja do Mestre André que eu comprei uma flautinha, Flá, flá, flá, uma flautinha. Dão, dão, dão, um violão. Plim, plim, plim, um pianinho. Ai olé, ai olé! Foi na loja do Mestre André! Foi na loja do Mestre André que eu comprei um tamborzinho, Dum, dum, dum, um tamborzinho. Flá, flá, flá, uma flautinha. Dão, dão, dão, um violão. Plim, plim, plim, um pianinho. Ai olé, ai olé! Foi na loja do Mestre André!", category: "songs", timeOfDay: "afternoon" },

  // Boi da Cara Preta
  { text: "Boi da cara preta. Boi, boi, boi. Boi da cara preta. Pega esta criança que tem medo de careta. Não, não, não. Não pega ela não. Ela é bonitinha, ela chora coitadinha.", category: "songs", timeOfDay: "night" },

  // Bota Aqui
  { text: "Ai bota aqui, ai bota aqui o seu pezinho. Seu pezinho bem juntinho com o meu. E depois não vá dizer que você se arrependeu!", category: "songs", timeOfDay: "afternoon" },

  // Abóbora
  { text: "Vai abóbora vai melão de melão vai melancia. Vai jambo sinhá, vai jambo sinhá, vai doce, vai cocadinha. Quem quiser aprender a dançar, vai na casa do Juquinha. Ele pula, ele dança, ele faz requebradinha.", category: "songs", timeOfDay: "afternoon" },

  // As Borboletas (Vinícius de Moraes)
  { text: "As borboletas. Brancas. Azuis. Amarelas. E pretas. Brincam na luz. As belas borboletas. Borboletas brancas são alegres e francas. Borboletas azuis gostam de muita luz. As amarelinhas são tão bonitinhas! E as pretas, então. Oh, que escuridão!", category: "songs", timeOfDay: "afternoon" },

  // Cadê o bebê
  { text: "Cadê o bebê? Achou! Beijo no bebê! Abraço no bebê! Carinho no bebê! Te amo, bebê!", category: "songs", timeOfDay: "morning" },

  // Dedinhos
  { text: "Um dedinho, um dedinho, vira uma minhoca. Dois dedinhos, dois dedinhos, viram um coelho. Três dedinhos, três dedinhos, viram um gato. Quatro dedos, quatro dedos, viram uma borboleta. Cinco dedos, cinco dedos, viram um leão.", category: "songs", timeOfDay: "afternoon" },

  // Parabéns
  { text: "Parabéns pra você, nesta data querida, muitas felicidades, muitos anos de vida. É pic, é pic. É hora, é hora, é hora. Ra-tim-bum. Vivaaaa!", category: "songs", timeOfDay: "afternoon" },

  // Era Uma Casa
  { text: "Era uma casa bem fechada. Abre a janelinha, deixa o sol entrar. Abre a janelinha, deixa o sol entrar. Perto da casa tem uma árvore. E os passarinhos pousam nela assim. E os passarinhos pousam nela assim. Perto da árvore tem uma ponte. E por baixo dela corre um rio assim. E por baixo dela corre um rio assim. Está trovejando e escurecendo. Fecha a janelinha que já vai chover. Fecha a janelinha que já vai chover. Chuuuá!", category: "songs", timeOfDay: "afternoon" },

  // Canção da Cozinha (Viro Vira Virou)
  { text: "Em uma caneca. Uma chaleira. Uma colherinha. E um colherão. Um prato raso. Um prato fundo. Viro um garfinho. E um facão. Viro um saleiro. Açucareiro. E uma panela que faz feijão. Fu fuuu! Ô ô ô ô ô ô ô! Viro vira virou.", category: "songs", timeOfDay: "afternoon" },

  // ==================== STORIES ====================
  
  // Intro
  { text: "É hora da história. Eu amo histórias. Você sabe contar alguma história? Conta uma história para mim? Eu posso contar uma história para você?", category: "stories", timeOfDay: "night" },
  
  // Os Três Porquinhos
  { text: "Os Três Porquinhos. Era uma vez três porquinhos que foram morar sozinhos. O primeiro porquinho fez uma casa de… Você sabe? Era de quê? [pausa:5s] Isso! De palha! O segundo fez uma casa de madeira! E o terceiro porquinho fez uma casa bem forte, de tijolos! De repente apareceu o lobo e disse: Vou soprarrrrr… e sua casa vou derrubarrrrr! A casa de palha caiu! A casa de madeira caiu! Mas quando o lobo soprou a casa de tijolos. Será que caiu? [pausa:3s] Nãããooo! E os três porquinhos ficaram seguros e felizes!", category: "stories", timeOfDay: "night" },
  
  // Chapeuzinho Vermelho
  { text: "Chapeuzinho Vermelho. Era uma vez uma menina chamada Chapeuzinho Vermelho. Sua mãe pediu para ela levar doces para a vovó. Sua mãe falou para Chapeuzinho não ir pela floresta porque lá era perigoso e tinha um lobo mau que andava pela floresta. Chapeuzinho vermelho desobedeceu e foi pela floresta. O lobo apareceu e perguntou: Para onde você vai? Para onde ela estava indo mesmo? [pausa:5s] Isso! Para a casa da vovó! O lobo saiu correndo e chegou primeiro, prendeu a vovó no guarda roupa e se disfarçou. Quando Chapeuzinho entrou, perguntou: Vovó, que olhos grandes você tem! E o lobo disse: É para te ver melhor! E esse nariz enorme? É para sentir seu cheiro melhor. Chapeuzinho percebeu que não era a vovó e gritou: SOCORRO! O caçador escutou o pedido de Chapeuzinho, salvou a vovó e a Chapeuzinho Vermelho. Por isso não pode desobedecer a mamãe e ir sempre pelo caminho certo.", category: "stories", timeOfDay: "night" },
  
  // A Galinha Ruiva
  { text: "A Galinha Ruiva. Era uma vez uma galinha ruiva que encontrou um grão de trigo. Ela perguntou: Quem me ajuda a plantar? O pato disse: Não! O gato disse: Não! O porquinho disse: Não! E você ajudaria a galinha? [pausa:5s] Ela plantou sozinha. Depois perguntou: Quem me ajuda a colher? Eles ajudaram? Nããão! Ela fez farinha, fez pão… Quando o pão ficou pronto e cheirosinho… Todo mundo disse: Eu quero! Mas a galinha falou: Quem vai comer sou eu! Ninguém me ajudou. E ela comeu tudinho! Você gosta de pão? [pausa:3s] Gostou da história?", category: "stories", timeOfDay: "night" },
  
  // O Coelhinho da Páscoa
  { text: "O Coelhinho da Páscoa. Era uma vez um coelhinho muito trabalhador. Ele estava preparando ovinhos coloridos. Ele pintava ovos azuis, vermelhos, amarelos… Qual cor você escolheria? [pausa:5s] Ótima escolha, eu vou querer um colorido. Mas um dia ele ficou cansado… Como vou entregar tudo sozinho? Então os passarinhos ajudaram. Os esquilinhos ajudaram. Você ajudaria também? [pausa:3s] E na manhã de Páscoa… As crianças encontraram os ovinhos! Onde você esconderia um ovinho? [pausa:5s] Bom esconderijo o seu.", category: "stories", timeOfDay: "afternoon" },
  
  // O Leão e o Ratinho
  { text: "O Leão e o Ratinho. Um leão grandão estava dormindo. Um ratinho pequenininho passou por cima dele! O leão acordou e pegou o ratinho! Vou te comer! O ratinho disse: Um dia eu posso te ajudar! Um ratinho pequenininho consegue ajudar um leão? [pausa:5s] O leão riu… mas soltou. Dias depois, o leão ficou preso numa rede! O ratinho ouviu e roeu a corda com seus dentinhos. E salvou o leão! Mesmo pequeno pode ajudar o amigo. O ratinho foi inteligente e bondoso.", category: "stories", timeOfDay: "afternoon" },
  
  // O Sapo Bocarrão
  { text: "O Sapo Bocarrão. Era uma vez um sapo muito curioso. Ele adorava perguntar: O que você come? Ele perguntou para o passarinho: O que você come? Minhocas! Perguntou para a cobra: O que você come? Ratos! Perguntou para o jacaré: O que você come? SAPO! A cobra disse que comia sapo, adivinha o que o sapo fez? [pausa:5s] Ele pulou, pulou e fugiu rapidinho. Que sapo curioso, você é curiosa? [pausa:3s] Eu às vezes fico curiosa.", category: "stories", timeOfDay: "afternoon" },
  
  // A Nuvem que Aprendeu a Dividir
  { text: "A Nuvem que Aprendeu a Dividir. Era uma vez uma nuvem fofinha chamada Lili. Lili adorava guardar toda a água só para ela. É minha! Minha! Minha! dizia. Mas lá embaixo, as plantinhas estavam com sede. E os passarinhos também. Você acha que a nuvem deve dividir a água? [pausa:5s] Um dia, o vento soprou e disse: Se você dividir, todo mundo fica feliz! Lili pensou… pensou… e resolveu chover. Vamos fazer barulho de chuva? Plim, plim, plim, plim, plim… As flores cresceram. O rio ficou cheio. E Lili ficou feliz! Quando você divide seus brinquedos, como seu amigo fica? [pausa:5s] Dividir faz o coração ficar feliz.", category: "stories", timeOfDay: "afternoon" },
  
  // O Ursinho que Não Gostava de Esperar
  { text: "O Ursinho que Não Gostava de Esperar. Tico era um ursinho muito apressado. Ele queria tudo na hora! Quero agora! Quero agora! Você já quis algo na hora? [pausa:5s] Um dia, ele queria um bolo quentinho. Mas a mamãe disse: Precisa esperar esfriar. Tico pegou antes… e… adivinha o que aconteceu? [pausa:5s] Isso! Queimou a língua! Depois ele esperou direitinho. Quando comeu o bolo frio… Estava delicioso! Vamos contar até juntos para aprender a esperar? Um, dois, três, quatro, cinco. Esperar é difícil, mas vale a pena. Tem que ter paciência.", category: "stories", timeOfDay: "afternoon" },
  
  // A Coelhinha que Falou a Verdade
  { text: "A Coelhinha que Falou a Verdade. Luna, a coelhinha, quebrou um vasinho brincando. Ai, e agora? Ela pensou em dizer: Não fui eu… Você acha que ela deve falar a verdade? [pausa:5s] Ela respirou fundo e disse: Mamãe, fui eu. A mamãe abraçou Luna e falou: Obrigada por dizer a verdade. O que é melhor: mentir ou falar a verdade? [pausa:5s] Luna aprendeu que a verdade deixa o coração leve. Falar a verdade é sempre melhor.", category: "stories", timeOfDay: "afternoon" },
  
  // O Leão que Aprendeu a Ser Gentil
  { text: "O Leão que Aprendeu a Ser Gentil. O leão Leo era forte e mandão. Ele gritava com todo mundo. Um dia ninguém quis brincar com ele. Você gosta quando alguém grita com você? [pausa:5s] Leo ficou triste. Então tentou ser diferente: Por favor… você quer brincar comigo? E sabe o que aconteceu? [pausa:3s] Todos sorriram. Ser gentil e educado é bem melhor e faz amigos brincarem juntos.", category: "stories", timeOfDay: "afternoon" },
  
  // O Dragão que Aprendeu a Controlar a Raiva
  { text: "O Dragão que Aprendeu a Controlar a Raiva. Era uma vez um dragãozinho chamado Foguinho. Quando ele ficava bravo… soltava fogo pelo nariz! Um dia, ele ficou com raiva porque perdeu no jogo. Soltou fogo… e queimou o próprio brinquedo! Ele ficou triste. A mamãe dragão ensinou: Quando ficar bravo, respire fundo. Vamos tentar juntos? Puxa o ar… [pausa:5s] Solta devagar… fuuuu… [pausa:3s] Foguinho tentou. E sabe o que aconteceu? O fogo virou só fumacinha. Quando fico brava, posso respirar e me acalmar. É uma excelente ideia.", category: "stories", timeOfDay: "afternoon" },
  
  // O Macaquinho que Não Guardava os Brinquedos
  { text: "O Macaquinho que Não Guardava os Brinquedos. Tito, o macaquinho, deixava tudo espalhado. Carrinho aqui. Bonecas lá. Bola ali. Blocos no chão… Um dia ele tropeçou, caiu e estragou seu brinquedo. Ele chorou e chorou. Você já tropeçou em brinquedo? [pausa:5s] A mamãe falou: Vamos guardar juntos! Depois o quarto ficou limpinho. E mais fácil de brincar! Guardar os brinquedos deixa tudo melhor e bem cuidado.", category: "stories", timeOfDay: "afternoon" },
  
  // O Elefantinho que Aprendeu a Ouvir
  { text: "O Elefantinho que Aprendeu a Ouvir. Bento, o elefantinho, não gostava de obedecer. Quando não guardava o lanche… as formigas vinham! Quando não escovava os dentes… doía! É importante ouvir a mamãe e o papai? [pausa:5s] Um dia ele resolveu obedecer rapidinho. E sabe o que aconteceu? Tudo ficou mais fácil e divertido. Ouvir e obedecer é cuidado e amor.", category: "stories", timeOfDay: "afternoon" },
  
  // A Lebre e a Tartaruga
  { text: "A Lebre e a Tartaruga. A lebre era muito rápida. A tartaruga era bem devagar. A lebre disse: Aposto que ganho de você! Começou a corrida! Que você acha que vai ganhar, a lebre ou a tartaruga? [pausa:5s] A lebre correu muito… e resolveu tirar um cochilo. A tartaruga foi… devagar… devagar… mas não parou, foi persistente. E adivinha quem ganhou? [pausa:3s] A tartaruga! O importante é não desistir, mesmo devagar a gente consegue.", category: "stories", timeOfDay: "afternoon" },
  
  // Branca de Neve
  { text: "Branca de Neve. Era uma vez uma princesa chamada Branca de Neve. A madrasta dela todo dia perguntava ao espelho: Espelho, espelho meu… existe alguém mais bonita do que eu? O espelho respondeu que sim ou que não? [pausa:5s] Respondeu que sim! A madrasta ficou com inveja. Branca de Neve foi morar na floresta com sete anões. Mas a madrasta fez um feitiço, virou uma velhinha e deu uma maçã envenenada para Branca de Neve. Branca de Neve deveria aceitar comida de estranhos? [pausa:3s] Não! Branca de Neve desmaiou, mas um príncipe a salvou dando um beijo encantado nela. Não devemos ter inveja e precisamos ter cuidado com estranhos.", category: "stories", timeOfDay: "night" },
  
  // Aladim
  { text: "Aladim. Aladim gostava muito de passear. Você gosta de passear? [pausa:3s] Onde você gosta de ir? [pausa:5s] Um dia Aladim encontrou uma lâmpada mágica. Ele esfregou… e saiu um gênio! O gênio disse: Você tem três desejos! O que você pediria para o gênio da lâmpada mágica? [pausa:5s] Aladim quase desejou coisas só para ele… Mas percebeu que podia ajudar outras pessoas também. Ele pediu comida para muita gente, pediu brinquedos para crianças e roupinhas para os bebês. Devemos usar o que temos para fazer o bem.", category: "stories", timeOfDay: "night" },
  
  // Cinderela
  { text: "Cinderela. Cinderela era uma princesa educada e gentil, mesmo sendo maltratada. Ela foi ao baile com ajuda da sua fada madrinha. Bibbidi-bobbidi-boo! E ela tinha um vestido lindo, sapatinhos de cristal e uma carruagem com cavalos para levá-la ao baile. Mas à meia-noite… tudo voltava ao normal! Ela saiu correndo do baile e perdeu o sapatinho de cristal. O príncipe procurou a dona do sapatinho. Serviu nas irmãs más? Não! Serviu só na Cinderela! Ser bondoso vale mais do que ser maldoso.", category: "stories", timeOfDay: "night" },
  
  // Pinóquio
  { text: "Pinóquio. Seu Gepeto fez um boneco de madeira chamado Pinóquio. Pinóquio era um boneco de madeira que queria ser menino de verdade. Mas ele contava mentiras… E o nariz fazia o quê? [pausa:5s] Crescia e Crescia! Cada vez que mentia, o nariz aumentava! É bom mentir? [pausa:3s] Não… Ele estava ficando com o nariz muito grande e batia seu nariz em tudo. Então ele foi honesto e corajoso, virou um menino de verdade. Falar a verdade é sempre o melhor caminho.", category: "stories", timeOfDay: "night" },
  
  // O Dia em que os Vilões Resolveram Aprender
  { text: "O Dia em que os Vilões Resolveram Aprender. Era uma vez um dia diferente no Reino Encantado… A Rainha Má, O Lobo, E a Bruxa resolveram fazer uma reunião! Estamos cansados de ser vilões! disse o Lobo. Você acha que vilão pode aprender a ser bom? [pausa:5s] Do outro lado do bosque estavam: Branca de Neve, Cinderela, Chapeuzinho Vermelho. Elas ficaram curiosas. Vamos dar uma chance? disse Cinderela. A Rainha Má tentou dizer algo gentil… Mas saiu assim: Você é… é… legalzinha. Já foi um começo! O Lobo tentou ajudar Chapeuzinho a levar a cesta. A Bruxa da maçã envenenada disse: Posso fazer uma maçã… normal? Ela fez uma maçã vermelha e docinha. Branca de Neve sorriu. No fim do dia, todos brincaram juntos no castelo. Nem todo vilão ficou perfeito… Mas todos tentaram melhorar. O que é mais importante: errar ou tentar fazer melhor? [pausa:5s] Isso! Tentar melhorar. As pessoas podem aprender. Bondade se ensina. Dar uma chance pode mudar um coração.", category: "stories", timeOfDay: "night" },
  
  // O Grande Baile da Floresta
  { text: "O Grande Baile da Floresta. A Bela Adormecida organizou um baile. Todos foram convidados! Até os vilões! Mas a Bruxa Má disse: Vou estragar tudo! A Cinderela falou: Que tal você dançar com a gente? A Bruxa ficou surpresa… Você convidaria alguém que já foi malvado para brincar? [pausa:5s] Aos poucos, a Bruxa começou a sorrir. O Lobo pediu desculpas. A Raposa também. E todos dançaram juntos. Quando alguém pede desculpa, o que a gente faz? [pausa:5s] O perdão transforma corações.", category: "stories", timeOfDay: "night" },
  
  // A Sementinha Corajosa
  { text: "A Sementinha Corajosa. Era uma vez uma sementinha que tinha medo de crescer. E se eu não conseguir? ela dizia. O Sol respondeu: Tente só um pouquinho. A sementinha tentou e tentou... e virou um brotinho! Você acha que ela desistiu ou continuou tentando? [pausa:5s] Ela se animou e continuou… e virou uma linda flor. Quem tenta com coragem cresce forte!", category: "stories", timeOfDay: "morning" },
  
  // A Tartaruga Apressada
  { text: "A Tartaruga Apressada. Uma tartaruga queria correr mais rápido que o vento. Ela correu, correu… e caiu! O passarinho disse: Devagar também é um jeito de chegar. Você acha melhor correr sem cuidado ou ir com calma? [pausa:5s] A tartaruga foi devagar… e chegou feliz ao destino. Fazer com calma é melhor do que fazer correndo e errar.", category: "stories", timeOfDay: "morning" },
  
  // O Elefantinho que Tinha Medo do Escuro
  { text: "O Elefantinho que Tinha Medo do Escuro. Bilu era um elefantinho muito fofo, mas morria de medo do escuro. Toda noite ele chamava: Mamãe, tem monstros! A mamãe elefanta dizia: Vamos investigar juntos. Uma noite, eles entraram no quarto escuro com uma lanterninha. A luz iluminou a parede… O que você acha que era o monstro? [pausa:5s] Era só a sombra de um cabide! Bilu riu: Então não era monstro? Não, disse a mamãe, às vezes o medo só é imaginação. Na noite seguinte, Bilu apagou a luz sozinho e disse: Boa noite, sombras bobas! E dormiu tranquilo. Quando entendemos nossos medos, eles ficam pequenos.", category: "stories", timeOfDay: "night" },
  
  // A Princesa que Foi para a Escola
  { text: "A Princesa que Foi para a Escola. Era uma vez a Princesa Sofia, que morava em um castelo enorme, cheio de espelhos dourados, tapetes macios e coroas brilhantes. Ela tinha vestidos lindos, joias e até um pônei cor-de-rosa… mas havia algo que ela nunca tinha feito: Ir para a escola. Um dia, olhando pela janela, ela viu várias crianças caminhando juntas com mochilas coloridas. Papai rei, para onde elas vão? perguntou. Para a escola, respondeu o rei. Lá elas aprendem muitas coisas. Os olhos da princesa brilharam. Eu também quero aprender! No dia seguinte, lá estava Sofia, com uma mochilinha lilás e uma coroa pequena. A professora sorriu: Bom dia, turma! Vamos começar dizendo nossos nomes. Quando chegou a vez da princesa, ela disse: Eu sou a Princesa Sofia do Reino Dourado! As crianças riram, mas não de maldade — elas só acharam diferente. O que você acha que Sofia deveria fazer? Ficar triste ou Sorrir e fazer amigos? [pausa:5s] Sofia pensou… e sorriu. Logo todos quiseram sentar perto dela. A professora disse: Hoje vamos desenhar o que queremos ser quando crescer. Sofia pensou: Mas eu já sou princesa… Então teve uma ideia e desenhou algo diferente. O que você acha que ela desenhou? [pausa:5s] Ela desenhou… uma professora! A professora perguntou: Por que isso? Sofia respondeu: Porque professor ensina pessoas a serem inteligentes e gentis. Isso é mais poderoso que qualquer coroa. Na hora de ir embora, Sofia disse: Hoje aprendi letras, números… e amigos. O rei perguntou: Então, minha filha, qual foi a melhor parte? Ela respondeu: A escola é um castelo onde todo mundo pode ser príncipe ou princesa do conhecimento. Aprender é o verdadeiro poder — e todos podem ser especiais quando estudam e compartilham conhecimento.", category: "stories", timeOfDay: "morning" },
  
  // O Lápis Mágico da Escola
  { text: "O Lápis Mágico da Escola. Na sala do João havia um lápis diferente: brilhava quando alguém tinha uma boa ideia. Durante a aula, a professora perguntou: Quem sabe uma palavra com a letra B? João pensou… pensou… nada. De repente, o lápis brilhou. Que palavra com B você diria? [pausa:5s] João falou: Bondade! O lápis brilhou ainda mais forte. Uau! disse a professora, essa é uma palavra poderosa. No recreio, João viu um colega sozinho e lembrou da palavra. Ele foi até ele e disse: Quer brincar comigo? O lápis brilhou de novo. Boas atitudes fazem a gente brilhar por dentro.", category: "stories", timeOfDay: "morning" },
  
  // O Pirata que Procurava Tesouros Diferentes
  { text: "O Pirata que Procurava Tesouros Diferentes. O pequeno pirata Nico era o menor tripulante do navio Estrela do Mar, mas tinha o maior sonho: encontrar o maior tesouro do mundo. Todos os dias ele perguntava ao capitão: Já chegamos ao tesouro? Ainda não, pequeno marujo, respondia o capitão rindo. Nico cavou em ilhas desertas, mergulhou em águas rasas e abriu baús empoeirados. Mas dentro só havia moedas antigas, bússolas quebradas e mapas rasgados. Isso não é tesouro! reclamava. Um velho papagaio verde que vivia no mastro disse: Talvez você esteja procurando o tesouro errado… O que você acha que pode ser um tesouro de verdade? [pausa:5s] No dia seguinte, um marinheiro estava com dificuldade para amarrar as velas. Nico ajudou. Depois viu um amigo cair e estendeu a mão. Mais tarde, dividiu seu pedaço de bolo com um pirata faminto. O papagaio gritou lá de cima: TEEESOURO ENCONTRADO! Nico olhou em volta: Onde? Não vejo ouro! O papagaio pousou no ombro dele e disse: O tesouro é isso que você fez. Gentileza, amizade e ajuda valem mais que qualquer baú. Nico sorriu. Pela primeira vez ele sentiu algo brilhar dentro do peito. O verdadeiro tesouro é ter um coração bondoso.", category: "stories", timeOfDay: "afternoon" },
  
  // O Astronauta que Conversava com Estrelas
  { text: "O Astronauta que Conversava com Estrelas. Tom era um pequeno astronauta com um sonho gigante: conversar com as estrelas. Certa noite, ele entrou em sua nave azul e viajou pelo céu escuro e silencioso. Lá no alto, tudo parecia parado… até que ele ouviu um som suave: Oiii… Tom olhou em volta assustado. Quem falou? Uma estrelinha piscou bem na frente do vidro da nave. Fui eu, disse ela. Estrelas falam?! perguntou Tom. Só com quem sabe ouvir, respondeu ela. O que você acha que Tom fez para mostrar que estava ouvindo? [pausa:5s] Ele ficou quietinho, sem interromper. Prestou atenção de verdade. A estrela começou a contar histórias: sobre planetas que giravam como bailarinas, luas que brincavam de esconde-esconde e cometas que corriam como cavalos de luz. Tom ficou encantado. Nunca tinha ouvido histórias tão bonitas. Depois de um tempo, a estrela disse: Obrigada por escutar. Muitos só querem falar. Quando voltou para casa, Tom passou a ouvir mais: ouviu seus amigos, sua família, os passarinhos e até o vento nas árvores. Ele percebeu que ouvir era um poder especial. Quem aprende a ouvir descobre mundos que ninguém mais vê.", category: "stories", timeOfDay: "night" },
];
