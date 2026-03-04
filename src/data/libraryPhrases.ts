// Library phrases data - organized by category
// All phrases are in Portuguese (content language)
// Filter: no phrases containing "chupeta"

export interface LibraryPhraseData {
  text: string;
  category: string;
  timeOfDay?: string;
}

export const libraryPhrasesData: LibraryPhraseData[] = [
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
  
  // ==================== PRAYERS ====================
  
  // O Jardim do Éden
  { text: "O Jardim do Éden. Era uma vez… um jardim lindo, mas tão lindo que parecia um sonho! Esse jardim se chamava Éden. Quem fez esse jardim foi Deus. Ele colocou árvores cheias de frutas gostosas, rios brilhantes e muitos animaizinhos. Você consegue imaginar um jardim bem bonito? [pausa:5s] Deus colocou no jardim um homem chamado Adão. Depois, fez uma mulher chamada Eva para ser amiga dele. Eles podiam brincar, cuidar das plantas e dar nome aos animais! Que nome você daria para um elefante? [pausa:5s] Mas havia uma regra importante. No meio do jardim tinha uma árvore especial. Deus disse: Vocês podem comer de todas as árvores… menos dessa. É importante obedecer as regras? [pausa:3s] Um dia, uma serpente apareceu e começou a conversar com Eva. Ela sabia da regra… mas acabou escolhendo desobedecer. Depois, Adão também fez a mesma coisa. E naquele momento, eles perceberam que tinham feito algo errado. Que feio que eles fizeram. Como você se sente quando faz algo que não devia? [pausa:5s] Deus ficou triste, mas continuou amando Adão e Eva. Ele explicou que toda escolha tem consequência. E que obedecer é sempre o melhor caminho. Então eles tiveram que sair do jardim… Mas Deus prometeu que sempre cuidaria deles. Mesmo quando erramos, Deus deixa de amar a gente? [pausa:3s] Não. Ele sempre nos ama e nos ensina a fazer o certo. Deus nos ama. Regras existem para nos proteger. Toda escolha tem consequência. Mesmo quando erramos, podemos aprender e melhorar.", category: "prayers", timeOfDay: "night" },
  
  // ==================== PLAYTIME ====================
  
  // Entrevista com a Criança
  { text: "Vou te fazer umas perguntinhas de curiosa. É uma entrevista com você. Como é seu nome inteiro? [pausa:8s] Quantos anos você tem? [pausa:5s] O que você mais gosta de fazer? [pausa:8s] O que você não gosta de fazer? [pausa:8s] Qual é a sua comida favorita? [pausa:5s] O que você não gosta de comer? [pausa:5s] Qual o seu sonho? [pausa:8s] Qual sua cor favorita? [pausa:5s] O que você vai ser quando crescer? [pausa:8s] O que você falaria ou pediria para Jesus se encontrasse ele? [pausa:8s] Adorei suas respostas. Você é muito especial.", category: "playtime", timeOfDay: "afternoon" },
  
  // Estátua
  { text: "Mão na cabeça. Mão na cintura. Um pé na frente e o outro atrás. Agora ninguém pode se mexer. Estátua! [pausa:5s] Um braço pra cima. Um braço pra frente. Cruzando as pernas. Bumbum para trás. Agora ninguém pode se mexer. Estátua! [pausa:5s] Rodando, rodando. Braços esticados. Não pode parar, continue rodando. Quero saber quem é que consegue ficar parado. Estátua! [pausa:5s] Mão na cabeça. Mão na cintura. Um pé na frente e o outro atrás. Agora ninguém pode se mexer. Estátua! [pausa:5s] Mexendo a cabeça. Mexendo as mãos. Faz um shake shake. Até o chão. Quero saber quem é que consegue. Ficar parado. A gente vai ter que rodar. Roda, roda no lugar. Ninguém aqui pode cair. Eu vou contar pra terminar. Três, dois, um. Estátua!", category: "playtime", timeOfDay: "afternoon" },
  
  // Vamos passear no parque
  { text: "Vamos passear no parque? Eu vou, eu vou para o parque agora eu vou… Pararatimbum, pararatimbum, eu vou, eu vou…", category: "playtime", timeOfDay: "morning" },
  
  // ==================== SONGS ====================
  
  // Canção da Cozinha (Viro Vira Virou)
  { text: "Em uma caneca. Uma chaleira. Uma colherinha. E um colherão. Um prato raso. Um prato fundo. Viro um garfinho. E um facão. Viro um saleiro. Açucareiro. E uma panela que faz feijão. Fu fuuu! Ô ô ô ô ô ô ô! Viro vira virou.", category: "songs", timeOfDay: "afternoon" },
  
  // ==================== EDUCATION ====================
  
  // Hum que gostoso (alimentação)
  { text: "Hum, que gostoso.", category: "daily", timeOfDay: "afternoon" },
  { text: "Já comi tudo!", category: "daily", timeOfDay: "afternoon" },
  
  // Guarda guarda
  { text: "Guarda, guarda, guarda, bem direitinho, quem guarda tudo, acha tudo arrumadinho.", category: "education", timeOfDay: "afternoon" },
];
