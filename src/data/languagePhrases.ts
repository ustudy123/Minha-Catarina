// Language learning phrases data
// All phrases are educational content in Portuguese with foreign language words embedded
// Filter: no phrases containing "chupeta"

export interface LanguagePhraseData {
  text: string;
  category: string;
}

// ==================== ENGLISH LEARNING ====================
export const englishPhrasesData: LanguagePhraseData[] = [
  // Lesson 1 - Greetings & Introduction
  { text: "Hello! Vou te ensinar um pouquinho de inglês. Eu gosto de falar inglês. Hello, quer dizer Olá! Agora vamos aprender a se apresentar. My name is Catarina. What is your name? Como é o seu nome? [pausa:5s] Agora frases mágicas: Repete comigo: How are you? [pausa:3s] How are you? How are you? significa Como você está? Resposta mágica: I'm fine! Que significa Estou bem! Vamos encenar: Hello! How are you? [pausa:3s] I'm fine! Yaaay! Eu amo você. I love you. [pausa:3s] Parabéns! Você ganhou a medalha de Mini Falante de Inglês! Missão secreta: Hoje fale pelo menos 3 palavras em inglês para alguém da sua família! Bye bye, tchau, tchau!", category: "greetings" },
  
  // Lesson 2 - Castle (Princess theme)
  { text: "Bem-vindo ao meu castelo encantado! Para entrar, você precisa dizer a palavra mágica em inglês: Hello! [pausa:3s] Hello! Muito bem! Isso quer dizer Olá! Pode entrar! Qual é o seu nome? Em inglês falamos: My name is Catarina. Tente falar com seu nome agora. [pausa:5s] Agora vamos passear pelo jardim mágico. No jardim encantado temos Flowers and butterflies. Sabe o que isso significa? [pausa:5s] Flores e borboletas! Você é muito inteligente! Repete comigo: Flowers and butterflies. [pausa:3s] Flowers and butterflies. Hora do jogo! Eu falo e você repete. Coroa é Crown! [pausa:3s] Vestido é Dress! [pausa:3s] Estrela é Star! [pausa:3s] Uau! Você está virando uma princesa do inglês! Vamos aprender uma frase de princesa educada: Please é Por favor. Thank you é Obrigado ou Obrigada. Que educação real! Parabéns! Você ganhou o título de Princesa do Inglês!", category: "vocabulary" },
  
  // Lesson 3 - Numbers
  { text: "Vamos aprender os números em inglês! Repete comigo: One. [pausa:2s] Two. [pausa:2s] Three. [pausa:2s] Four. [pausa:2s] Five. [pausa:2s] Six. [pausa:2s] Seven. [pausa:2s] Eight. [pausa:2s] Nine. [pausa:2s] Ten. [pausa:2s] Muito bem! Agora você sabe contar até dez em inglês!", category: "numbers" },
  
  // Lesson 4 - Colors (expanded)
  { text: "Hello! Hora de aprender inglês! Vou te ensinar as cores hoje. Em inglês, vermelho é RED. Fala comigo: RED! [pausa:3s] Muito bem! E Azul em inglês é BLUE. Repete: BLUE! [pausa:3s] Eu gosto quando o céu fica blue. E rosa, como será que se diz rosa em inglês? [pausa:5s] Você sabe falar rosa em inglês? Deixa eu pensar um pouquinho. Rosa em inglês é pink. Eu amo a cor pink. Vou te ensinar a cor verde em inglês. Verde em inglês é green. A grama do quintal é green. O sol é yellow. Amarelo em inglês se diz yellow. Qual é sua cor favorita? [pausa:5s] Bye bye, tchau tchau! Até a próxima! Outro dia te ensino mais.", category: "colors" },
  
  // Lesson 5 - Animals (expanded)
  { text: "Você sabe como fala cachorro em inglês? [pausa:3s] Cachorro em inglês é DOG. Fala comigo: Dog! [pausa:3s] Agora você fala sozinha. Como é cachorro em inglês? [pausa:5s] Isso! Muito bem! Gato em inglês é CAT. Quer aprender mais em inglês? [pausa:3s]", category: "animals" },
  
  // Lesson 6 - Family
  { text: "Vamos aprender a família em inglês! Mamãe em inglês é Mom. Repete: Mom! [pausa:3s] Papai é Dad! [pausa:3s] Irmão é Brother! [pausa:3s] Irmã é Sister! [pausa:3s] Vovó é Grandma! [pausa:3s] Vovô é Grandpa! [pausa:3s] Família é Family! [pausa:3s] I love my family! Eu amo minha família!", category: "family" },
  
  // Lesson 7 - Counting in English
  { text: "Hello. Vamos contar em inglês? Um é ONE. [pausa:2s] Dois é TWO. [pausa:2s] Três é THREE. [pausa:2s] One, two, three. Vou contar até dez para você ver, tudo em inglês. One, two, three, four, five, six, seven, eight, nine, e ten.", category: "numbers" },
  
  // Lesson 8 - Body parts
  { text: "Cabeça em inglês é HEAD. Repete: HEAD! [pausa:3s] E Nariz em inglês é NOSE. [pausa:3s] Coração é heart. Você sabia que o heart faz tum-tum o dia todo! Ele trabalha sem parar para cuidar da gente, até quando a gente tá dormindo.", category: "vocabulary" },
  
  // Lesson 9 - School
  { text: "Na escola aprendemos muitas coisas. Escola em inglês é school. Professora em inglês é teacher. E amigo em inglês é friend. Nós vamos aprender na school. Na school, quem ensina é a teacher. Na school, encontramos os friends.", category: "vocabulary" },
  
  // Lesson 10 - Magic words
  { text: "Vou te ensinar as palavras mágicas em inglês. Você sabe quais são as palavras mágicas? [pausa:3s] Isso mesmo! Desculpa, por favor, obrigada. Desculpa em inglês é sorry. Repete comigo: sorry. [pausa:3s] Por favor em inglês é please. Repete comigo: please. [pausa:3s] E obrigada em inglês é Thanks. Repete de novo: thanks. [pausa:3s] Thanks é obrigada, sorry é desculpa e please é por favor. Devemos sempre usar as palavras mágicas, porque somos crianças educadas. Agora você pode pedir assim para mamãe: Please mamãe me dá uma comidinha?", category: "vocabulary" },
  
  // Lesson 11 - Food & Water
  { text: "Hello. Vou te ensinar uma palavra muito legal em inglês. Você pode ensinar para alguém depois. Sabe como fala água em inglês? [pausa:3s] Água em inglês é water. Mamãe quero water! E quando você estiver com fome, comida em inglês é food. Eu quero food, eu quero water. Inglês é bem legal. Vamos ver se aprendeu? Água em inglês é? [pausa:3s] Water! Comida em inglês é? [pausa:3s] Food! Nós somos muito inteligentes.", category: "vocabulary" },
];

// ==================== SPANISH LEARNING ====================
export const spanishPhrasesData: LanguagePhraseData[] = [
  // Lesson 1 - Greetings & Introduction
  { text: "¡Hola! Vamos brincar de falar espanhol? Vamos! Primeira palavra mágica: Hola! Hola significa Oi. Repete! [pausa:3s] ¡Hola! ¡Muy bien! Me llamo Catarina. Agora uma frase: ¿Cómo estás? [pausa:3s] Estoy bien significa Estou bem. Agora você já sabe se apresentar em espanhol! Você ganhou o troféu de Mini Falante de Espanhol!", category: "greetings" },
  
  // Lesson 2 - Numbers
  { text: "Vou te ensinar a contar até dez, em espanhol. Cero, uno, dos, tres, cuatro, cinco, seis, siete, ocho, nueve, diez. É bem legal, não é? Vamos tentar juntas, você pode repetir depois de mim. Cero. [pausa:2s] Uno. [pausa:2s] Dos. [pausa:2s] Tres. [pausa:2s] Cuatro. [pausa:2s] Cinco. [pausa:2s] Seis. [pausa:2s] Siete. [pausa:2s] Ocho. [pausa:2s] Nueve. [pausa:2s] Diez. [pausa:2s] Ufa, acabou!", category: "numbers" },
  
  // Lesson 3 - Places
  { text: "Eu adoro passear! Eu sei falar em espanhol. Vou te ensinar o nome de alguns lugares em español. Você vai saber falar español assim como eu! Igreja em espanhol é iglesia. [pausa:3s] Escola é escuela. [pausa:3s] Sabia que mercado e casa é igual em espanhol e português? Me gusta mucho mi casa. Voy a la iglesia con mi papá y mi mamá. Outro dia eu vou te ensinar mais palabras em espanhol!", category: "places" },
  
  // Lesson 4 - Colors
  { text: "Vamos aprender como fala as cores em espanhol! A cor amarelo em espanhol se fala amarillo. Repete: amarillo! [pausa:3s] Roxo em espanhol é púrpura. [pausa:3s] Branco em espanhol é blanco. [pausa:3s] Las nubes en el cielo son blancas. Tengo una pelota amarilla y púrpura. Aprender é muito bom! Agora você me ensina. Como é roxo em espanhol? [pausa:5s] Acertou! Branco em espanhol é blanco.", category: "colors" },
  
  // Lesson 5 - Animals
  { text: "Eu gosto de animais. Devemos proteger os animais. Mas alguns animais são perigosos e temos que ter cuidado. Vou te ensinar o nome de alguns animais em espanhol. Cavalo em español é caballo. Repete comigo essa palavra nova: caballo! [pausa:3s] Você já andou de caballo? [pausa:3s] Me gusta montar a caballo. Podemos andar de caballo juntas um dia! O que achou dessa ideia? [pausa:3s] Vamos andar de caballo? Você é corajosa! Formiga em espanhol é hormiga. La hormiga es pequeña pero muy fuerte. Muito legal essas novas palavras! Parabéns para nós duas!", category: "animals" },
  
  // Lesson 6 - Kitchen
  { text: "Hoje vou te ensinar algumas coisas que tem na cozinha em español. É muito legal! Vamos começar aprendendo como falar cozinha em español. Cozinha em español é cocina. [pausa:3s] Na cocina temos geladeira que em espanhol se fala refrigerador. [pausa:3s] Na cocina temos também fogão. Fogão em español é estufa. [pausa:3s] En la cocina hay una estufa y un refrigerador. En la cocina também temos cacerolas. Sabe o que é cacerola? [pausa:5s] Cacerola em espanhol é panela!", category: "food" },
  
  // Lesson 7 - Family
  { text: "Vou te ensinar umas palavrinhas em outra língua. É muito legal. Aprender também é divertido. Mamãe em espanhol é mami. Papai em espanhol é papá. Eu amo minha mami e meu papá também. Gostou? [pausa:3s] Eu adorei. E vovó em espanhol é abuela. Diferente né? Vovô em espanhol é abuelo. Eu amo minha abuela e meu abuelo. Gosto muito de ir na casa dos meus abuelos. E você gosta de ir na casa da sua abuela e do seu abuelo? [pausa:5s] O que mais gosta de fazer lá? [pausa:5s] Como é o nome da sua abuela? [pausa:5s] Como é o nome do seu abuelo? [pausa:5s]", category: "family" },
  
  // Lesson 8 - Toys
  { text: "Eu adoro falar em espanhol. Vou te ensinar algumas palavras bem legais em espanhol. Boneca em espanhol é muñeca. Repete comigo: muñeca! [pausa:3s] Bola em espanhol é pelota. Vamos falar juntas essas palavras? Um, dois, três e já... Muñeca! [pausa:3s] Pelota! [pausa:3s] Eu sou a muñeca Catarina, mas não sei brincar de pelota. Você gosta mais de muñeca ou de pelota? [pausa:5s] Ensina seus amigos essas palavras, eles vão gostar de aprender espanhol. Ensina sua mami e seu papi também.", category: "vocabulary" },
];
