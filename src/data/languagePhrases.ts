// Language learning phrases data

export interface LanguagePhraseData {
  text: string;
  category: string;
}

// ==================== ENGLISH LEARNING ====================
export const englishPhrasesData: LanguagePhraseData[] = [
  // AULA 1 - Saudações
  { text: "Hello. Vou te ensinar um pouquinho de inglês. Eu gosto de falar inglês. Hello, quer dizer Olá! Agora vamos aprender a se apresentar.", category: "greetings" },
  { text: "My name is Catarina. What is your name? Como é o seu nome?", category: "greetings" },
  { text: "Agora frases mágicas: Repete comigo: How are you?", category: "greetings" },
  { text: "How are you?", category: "greetings" },
  { text: "How are you? significa Como você está?", category: "greetings" },
  { text: "Resposta mágica: I'm fine! Que significa, Estou bem!", category: "greetings" },
  { text: "Vamos encenar: Hello! How are you?", category: "greetings" },
  { text: "I'm fine!", category: "greetings" },
  { text: "Eu amo você. I love you.", category: "greetings" },
  { text: "Parabéns! Você ganhou a medalha de Mini Falante de Inglês. Missão secreta: Hoje fale pelo menos 3 palavras em inglês para alguém da sua família!", category: "greetings" },
  { text: "Bye bye, tchau tchau.", category: "greetings" },

  // AULA 2 - Cores
  { text: "Hello! Hora de aprender inglês?", category: "colors" },
  { text: "Vou te ensinar as cores hoje. Está pronta para começar?", category: "colors" },
  { text: "Em inglês, vermelho é RED. Fala comigo: RED, RED.", category: "colors" },
  { text: "Muito bem! E Azul em inglês é BLUE.", category: "colors" },
  { text: "Repete: BLUE, BLUE. Eu gosto quando o céu fica blue.", category: "colors" },
  { text: "E rosa, como será que se diz rosa em inglês?", category: "colors" },
  { text: "Você sabe falar rosa em inglês?", category: "colors" },
  { text: "Deixa eu pensar um pouquinho. Rosa em inglês é pink. Eu amo a cor pink.", category: "colors" },
  { text: "Vou te ensinar a cor verde em inglês. Verde em inglês é green. A grama do quintal é green e o sol é yellow.", category: "colors" },
  { text: "Amarelo em inglês se diz yellow. Qual é sua cor favorita?", category: "colors" },
  { text: "A minha cor favorita é pink and white. Rosa e branco, white é branco em inglês.", category: "colors" },
  { text: "Bye bye, tchau tchau! Até mais! See you later.", category: "colors" },
  { text: "Outro dia te ensino mais. Hoje aprendemos, morango é RED, céu BLUE, vestido é PINK, nuvem é WHITE, o brócolis é GREEN e o sol é YELLOW.", category: "colors" },

  // AULA 3 - Animais
  { text: "Você sabe como fala cachorro em inglês?", category: "animals" },
  { text: "Cachorro em inglês é DOG. Fala comigo?", category: "animals" },
  { text: "Dog, dog.", category: "animals" },
  { text: "Agora você fala sozinha. Cachorro em inglês é?", category: "animals" },
  { text: "Isso mesmo, dog. Muito bem!", category: "animals" },
  { text: "Gato em inglês é CAT. Quer aprender mais em inglês?", category: "animals" },
  { text: "Eu gosto de andar de horse, horse é cavalo em inglês. Você gosta também?", category: "animals" },
  { text: "Você já viu o filme do homem aranha?", category: "animals" },
  { text: "Aranha em inglês é spider.", category: "animals" },
  { text: "Dog é cachorro, cat é gato, horse é cavalo, spider é aranha.", category: "animals" },
  { text: "Muitos animais em inglês. Ensine sua família também.", category: "animals" },

  // AULA 4 - Números
  { text: "Hello, Vamos contar em inglês?", category: "numbers" },
  { text: "Um é ONE, Dois é TWO. Três é THREE. One, two, three. One, two, three.", category: "numbers" },
  { text: "Vou contar até dez para você ouvir, tudo em inglês. Preste atenção que é bem legal.", category: "numbers" },
  { text: "One, two, three, four, five, six, seven, eight, nine e ten.", category: "numbers" },
  { text: "Mais uma vez, One, two, three, four, five, six, seven, eight, nine e ten.", category: "numbers" },
  { text: "Na escola aprendemos muitas coisas também. Escola em inglês é school. Professora em inglês é teacher, e amigo em inglês é friend.", category: "numbers" },
  { text: "Nós vamos aprender na school. Na school, quem ensina é a teacher e na school, encontramos os friends.", category: "numbers" },
  { text: "School é escola, teacher é professora e friends é amigos.", category: "numbers" },

  // AULA 5 - Partes do Corpo
  { text: "Hora de aprender inglês. Cabeça em inglês é HEAD. Repete comigo: HEAD, HEAD.", category: "vocabulary" },
  { text: "Nariz em inglês é NOSE. Coração é heart. Você sabia que o heart faz tum-tum-tum o dia todo! Ele trabalha sem parar para cuidar da gente, até quando a gente tá dormindo.", category: "vocabulary" },
  { text: "Eu tenho dois eyes e duas ears. Dois olhos e duas orelhas. Olhos em inglês é eyes e orelhas é ears.", category: "vocabulary" },
  { text: "Eu adoro aprender coisas novas, vamos ficar mais e mais inteligentes assim.", category: "vocabulary" },

  // AULA 6 - Palavras Mágicas
  { text: "Vou te ensinar as palavras mágicas em inglês. Você sabe quais são as palavras mágicas?", category: "vocabulary" },
  { text: "Isso mesmo, Desculpa, por favor e obrigada.", category: "vocabulary" },
  { text: "Desculpa em inglês é sorry. Repete comigo: sorry, sorry.", category: "vocabulary" },
  { text: "Por favor em inglês é please. Repete comigo: please, please.", category: "vocabulary" },
  { text: "E obrigada em inglês é Thanks. Repete de novo: thanks, thanks.", category: "vocabulary" },
  { text: "Thanks é obrigada, sorry é desculpa e please é por favor. Devemos sempre usar as palavras mágicas, porque somos crianças educadas.", category: "vocabulary" },
  { text: "Agora você pode pedir assim para mamãe: Please mamãe me dá uma comidinha?", category: "vocabulary" },

  // AULA 7 - Alimentos
  { text: "Hello. Vou te ensinar uma palavra muito legal em inglês. Você pode ensinar para alguém depois. Sabe como fala água em inglês?", category: "food" },
  { text: "Água em inglês é water. Mamãe quero water. E quando você estiver com fome, comida em inglês é food. Eu quero food, eu quero water.", category: "food" },
  { text: "Inglês é bem legal. Vamos ver se aprendeu?", category: "food" },
  { text: "Água em inglês é?", category: "food" },
  { text: "Water.", category: "food" },
  { text: "Comida em inglês é?", category: "food" },
  { text: "Food.", category: "food" },
  { text: "Nós somos inteligentes. Parabéns.", category: "food" },

  // AULA 8 - Outras
  { text: "Bem-vindo ao meu castelo encantado! Para entrar, você precisa dizer a palavra mágica em inglês: Hello! Diga Hello!", category: "vocabulary" },
  { text: "Muito bem! Isso quer dizer Olá! Pode entrar! Qual é o seu nome?", category: "vocabulary" },
  { text: "Em inglês falamos: My name is Catarina. Tente falar com seu nome agora.", category: "vocabulary" },
  { text: "Agora vamos passear pelo jardim mágico. No jardim encantado temos Flowers and butterflies. Sabe o que isso significa?", category: "vocabulary" },
  { text: "Flores e borboletas. Repete comigo: Flowers and butterflies, Flowers and butterflies.", category: "vocabulary" },
  { text: "Hora do jogo, Eu falo e você repete. Coroa é Crown! Coroa é Crown!", category: "vocabulary" },
  { text: "Vestido é Dress! Vestido é Dress!", category: "vocabulary" },
  { text: "Estrela é Star! Estrela é Star!", category: "vocabulary" },
  { text: "Uau! Você está virando uma princesa do inglês! Vamos aprender uma frase de princesa educada: Please é Por favor. Thank you é Obrigado.", category: "vocabulary" },
  { text: "Que educação real! Parabéns! Você ganhou o título de Princesa do Inglês.", category: "vocabulary" },
];

// ==================== SPANISH LEARNING ====================
export const spanishPhrasesData: LanguagePhraseData[] = [
  // AULA 1 - Oi
  { text: "¡Hola, vamos brincar de falar espanhol?", category: "greetings" },
  { text: "Primeira palavra mágica: Hola. Hola significa Oi. Repete, Hola! Hola!", category: "greetings" },
  { text: "¡Muy bien! Me llamo Catarina. Agora uma frase: ¿Cómo estás?", category: "greetings" },
  { text: "Estoy bien significa Estou bem. Agora você já sabe se apresentar em espanhol!", category: "greetings" },
  { text: "Você ganhou o troféu de Mini Falante de Espanhol.", category: "greetings" },

  // AULA 2 - Família
  { text: "Vou te ensinar umas palavrinhas em outra língua. É muito legal espanhol. Aprender também é divertido.", category: "family" },
  { text: "Mamãe em espanhol é mami. Papai em espanhol é papá. Eu amo minha mami e amo meu papá também. Gostou?", category: "family" },
  { text: "Eu adorei. E vovó em espanhol é abuela. Diferente né?", category: "family" },
  { text: "Vovô em espanhol é abuelo. Eu amo minha abuela e meu abuelo. Gosto muito de ir na casa dos meus abuelos. E você gosta de ir na casa da sua abuela e do seu abuelo?", category: "family" },
  { text: "Como é o nome da sua abuela?", category: "family" },
  { text: "Como é o nome do seu abuelo?", category: "family" },

  // AULA 3 - Brinquedos
  { text: "Eu adoro falar em espanhol. Vou te ensinar algumas palavras bem legais em espanhol. Boneca em espanhol é muñeca. Repete comigo: muñeca, muñeca.", category: "vocabulary" },
  { text: "Bola em espanhol é pelota. Vamos falar juntas essas palavras?", category: "vocabulary" },
  { text: "Um, dois, três e já.. Muñeca e Pelota.", category: "vocabulary" },
  { text: "Eu sou a muñeca Catarina, mas não sei brincar de pelota.", category: "vocabulary" },
  { text: "Você gosta mais de muñeca ou de pelota?", category: "vocabulary" },
  { text: "Ensina seus amigos essas palavras, eles vão gostar de aprender espanhol. Ensina sua mami e seu papi também.", category: "vocabulary" },

  // AULA 4 - Números
  { text: "Vou te ensinar a contar até dez, em espanhol, não é difícil.", category: "numbers" },
  { text: "Cero, uno, dos, tres, cuatro, cinco, seis, siete, ocho, nueve, diez. É bem legal, não é?", category: "numbers" },
  { text: "Vamos tentar juntas, você pode repetir depois de mim.", category: "numbers" },
  { text: "Cero, uno, dos, tres, cuatro, cinco, seis, siete, ocho, nueve, diez. Ufa, acabou!", category: "numbers" },

  // AULA 5 - Lugares
  { text: "Eu adoro passear. E você gosta mais de passear ou ficar em casa?", category: "places" },
  { text: "Vou te ensinar o nome de alguns lugares em español. Você vai saber falar español assim como eu.", category: "places" },
  { text: "Igreja em espanhol é iglesia, Escola é escuela. Sabia que mercado e casa é igual em espanhol e português. Me gusta mucho mi casa. Voy a la iglesia con mi papá e mi mamá.", category: "places" },
  { text: "Na sua casa tem um lugar de fazer comida?", category: "places" },
  { text: "Como se chama o lugar que faz comida?", category: "places" },
  { text: "Cozinha em español é cocina. Na cocina temos geladeira que em espanhol se fala refrigerador. Na cocina temos também fogão para fazer comidas. Fogão em español é estufa.", category: "places" },
  { text: "En la cocina hay una estufa y un refrigerador. En la cocina também temos cacerolas. Sabe o que é cacerola?", category: "places" },
  { text: "Cacerola em espanhol é panela.", category: "places" },

  // AULA 6 - Cores
  { text: "Vamos aprender como falar as cores em español. A cor amarelo em espanhol se fala amarillo. Roxo em espanhol é purpura e branco em espanhol é blanco.", category: "colors" },
  { text: "Las nubes en el cielo son blancas. Tengo una pelota amarilla e purpura.", category: "colors" },
  { text: "Aprender é muito bom. Outro dia vou te ensinar mais cores em español, tá bom?", category: "colors" },

  // AULA 7 - Animais
  { text: "Eu gosto de animais. Devemos proteger os animais, mas alguns animais são perigosos e temos que ter cuidado. Vou te ensinar o nome de alguns animais em español. Aprendendo espanhol com Catarina.", category: "animals" },
  { text: "Cavalo em español é caballo. Repete comigo essa palabra nova, caballo, caballo. Você já andou de caballo?", category: "animals" },
  { text: "Me gusta montar a caballo. Podemos andar de caballo juntas um dia, o que achou dessa ideia?", category: "animals" },
  { text: "Vamos andar de caballo?", category: "animals" },
  { text: "Você é corajosa.", category: "animals" },
  { text: "Formiga em espanhol é hormiga. La hormiga es pequeña pero muy fuerte. Muito legal essas novas palabras. Parabéns para nós duas.", category: "animals" },
];
