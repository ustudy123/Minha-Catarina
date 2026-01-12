import { Language } from '@/contexts/LanguageContext';

export const translations = {
  pt: {
    // Common
    common: {
      back: "Voltar",
      save: "Salvar",
      cancel: "Cancelar",
      delete: "Excluir",
      clear: "Limpar",
      search: "Buscar",
      loading: "Carregando...",
      comingSoon: "Em breve",
    },
    
    // Languages
    languages: {
      pt: "Português",
      en: "English",
      es: "Español",
    },

    // Auth
    auth: {
      title: "Minha Catarina",
      subtitle: "Entre para acessar sua conta",
      login: "Entrar",
      signup: "Cadastrar",
      email: "Email",
      password: "Senha",
      name: "Nome",
      namePlaceholder: "Seu nome completo",
      passwordPlaceholder: "Mínimo 6 caracteres",
      loginButton: "Entrar",
      signupButton: "Criar conta",
      invalidCredentials: "Email ou senha incorretos",
      emailAlreadyRegistered: "Este email já está cadastrado",
      welcomeBack: "Bem-vinda de volta!",
      accountCreated: "Conta criada! Verifique seu email.",
      loggedOut: "Você saiu da conta",
      user: "Usuário",
      profile: "Perfil",
      settings: "Configurações",
      logout: "Sair",
      loginRequired: "Você precisa estar logado",
    },

    // Onboarding
    onboarding: {
      welcome: "Bem-vindo(a)!",
      selectDoll: "Qual boneca você adquiriu?",
      continue: "Continuar",
      catarina: "Catarina",
      antonio: "Antônio",
      catarinaDescription: "Boneca menina",
      antonioDescription: "Boneco menino",
    },
    
    // Home Page
    home: {
      title: "Minha Catarina",
      connected: "Conectada",
      disconnected: "Desconectada",
      readyToTalk: "🎀 Pronta para conversar com você!",
      tapToConnect: "Toque no botão abaixo para conectar",
      connectBluetooth: "Conectar via Bluetooth",
      battery: "Bateria",
      volume: "Volume",
      medium: "Médio",
      phraseOfTheDay: "Frase do Dia",
      phraseOfTheDayText: "Bom dia, meu amor! Que tal começarmos o dia com um sorriso?",
      quickActions: "Ações Rápidas",
      library: "Biblioteca",
      libraryDesc: "500+ frases",
      favorites: "Favoritas",
      favoritesDesc: "Suas favoritas",
      createPhrase: "Crie e Converse",
      createPhraseDesc: "IA personalizada",
      routines: "Minhas Rotinas",
      routinesDesc: "Suas sequências",
    },
    
    // Quick Actions (legacy)
    quickActions: {
      dailyPhrases: {
        title: "Frases do Dia",
        description: "Rotinas e mensagens",
      },
      library: {
        title: "Biblioteca",
        description: "500+ frases gravadas",
      },
      createPhrase: {
        title: "Criar Frase",
        description: "IA personalizada",
      },
      schedule: {
        title: "Programar",
        description: "Sequências e rotinas",
      },
    },
    
    // Create Phrase Page
    createPhrase: {
      title: "Crie e Converse",
      subtitle: "Crie frases personalizadas com IA",
      language: "Idioma",
      whatToSay: "O que {dollName} deve dizer?",
      placeholder: "Digite a mensagem que você quer que {dollName} fale...",
      generateVoice: "Gerar Voz com IA",
      generating: "Gerando",
      preview: "Preview da Frase",
      sendWhatsApp: "Enviar via WhatsApp",
      errorEnterPhrase: "Digite uma frase primeiro",
      errorGenerateFirst: "Gere a voz primeiro",
      phraseSaved: "Frase salva em Minhas Frases!",
      whatsappSoon: "Em breve: enviar via Bluetooth!",
      listenIn: "Ouvir em",
      saveToMyPhrases: "Salvar em Minhas Frases",
      tips: {
        title: "Dicas para frases melhores",
        simple: "Use linguagem simples e carinhosa",
        short: "Frases curtas são mais naturais para crianças",
        personalize: "Inclua o nome da criança para personalizar",
      },
    },
    
    // Daily Phrases Page
    dailyPhrases: {
      title: "Frases do Dia",
      searchPlaceholder: "Buscar frases...",
      noPhrasesFound: "Nenhuma frase encontrada",
      addedToFavorites: "Adicionado aos favoritos",
      removedFromFavorites: "Removido dos favoritos",
      timePeriods: {
        all: "Todo Dia",
        morning: "Manhã",
        afternoon: "Tarde",
        evening: "Noite",
      },
      categories: {
        all: "Todas",
        routine: "Rotina",
        motivation: "Motivação",
        educational: "Educacional",
      },
      phrases: [
        { id: "1", text: "Bom dia, meu amor! Hora de acordar com um sorriso!", category: "routine", timeOfDay: "morning" },
        { id: "2", text: "Você é capaz de fazer coisas incríveis hoje!", category: "motivation", timeOfDay: "morning" },
        { id: "3", text: "Vamos escovar os dentinhos? Deixa eles brilhando!", category: "routine", timeOfDay: "morning" },
        { id: "4", text: "Que tal aprender uma palavra nova hoje? Vamos lá!", category: "educational", timeOfDay: "morning" },
        { id: "5", text: "Hora do almoço! Vamos comer bem para crescer forte!", category: "routine", timeOfDay: "afternoon" },
        { id: "6", text: "Você está se saindo muito bem! Continue assim!", category: "motivation", timeOfDay: "afternoon" },
        { id: "7", text: "Que tal brincar um pouquinho agora?", category: "routine", timeOfDay: "afternoon" },
        { id: "8", text: "Vamos contar até 10 juntas? 1, 2, 3...", category: "educational", timeOfDay: "afternoon" },
        { id: "9", text: "Hora do banho! Vamos ficar cheirosinha!", category: "routine", timeOfDay: "evening" },
        { id: "10", text: "Você foi incrível hoje! A mamãe está muito orgulhosa!", category: "motivation", timeOfDay: "evening" },
        { id: "11", text: "Hora de dormir, meu amor. Tenha sonhos lindos!", category: "routine", timeOfDay: "evening" },
        { id: "12", text: "Vamos agradecer pelo dia de hoje? Obrigada por tudo!", category: "educational", timeOfDay: "evening" },
      ],
    },
    
    // Library Page
    library: {
      title: "Biblioteca de Frases",
      subtitle: "500+ frases pré-gravadas",
      searchPlaceholder: "Buscar frases...",
      all: "Todas",
      phrasesFound: "frases encontradas",
      categories: {
        all: "Todas",
        songs: "Músicas",
        stories: "Histórias e Poemas",
        affection: "Carinho",
        daily: "Dia a Dia",
        education: "Educação",
        sounds: "Sons",
        myPhrases: "Minhas Frases",
        // Legacy categories
        routine: "Rotina Diária",
        bedtime: "Hora de Dormir",
        meals: "Refeições",
        bath: "Banho",
        languages: "Idiomas",
      },
      timeOfDay: {
        morning: "Manhã",
        afternoon: "Tarde",
        night: "Noite",
      },
      phrases: "frases",
      prerecordedPhrases: [
        { text: "Bom dia, meu amor! Hora de acordar!", category: "daily", timeOfDay: "morning" },
        { text: "Você é muito especial para mim!", category: "affection", timeOfDay: "morning" },
        { text: "Vamos tomar café da manhã?", category: "daily", timeOfDay: "morning" },
        { text: "Hora do banho! Vai ser divertido!", category: "daily", timeOfDay: "night" },
        { text: "A é de amor, B é de bola, C é de casa!", category: "education", timeOfDay: "morning" },
        { text: "Boa noite! Tenha sonhos lindos!", category: "daily", timeOfDay: "night" },
        { text: "Que tal brincar um pouquinho?", category: "daily", timeOfDay: "afternoon" },
        { text: "Eu te amo muito!", category: "affection", timeOfDay: "afternoon" },
        { text: "Está na hora do almoço!", category: "daily", timeOfDay: "afternoon" },
        { text: "Vamos escovar os dentes?", category: "daily", timeOfDay: "night" },
        { text: "Parabéns! Você conseguiu!", category: "affection", timeOfDay: "afternoon" },
        { text: "Hora de descansar um pouquinho.", category: "daily", timeOfDay: "night" },
        { text: "Vamos cantar uma música?", category: "songs", timeOfDay: "afternoon" },
        { text: "Você está crescendo tão rápido!", category: "affection", timeOfDay: "afternoon" },
        { text: "É hora de estudar um pouquinho!", category: "education", timeOfDay: "morning" },
        // Parlendas e poemas tradicionais brasileiros
        { text: "Corre cutia, na casa da tia. Corre cipó, na casa da avó. Lencinho na mão, caiu no chão. Moça bonita, do meu coração... Um, dois, três!", category: "stories", timeOfDay: "morning" },
        { text: "Dedo mindinho, Seu vizinho, Pai de todos, Fura bolo, Mata piolho.", category: "stories", timeOfDay: "morning" },
        { text: "Batatinha quando nasce se esparrama pelo chão. Menininha quando dorme põe a mão no coração.", category: "stories", timeOfDay: "night" },
        { text: "Chuva e sol, casamento de espanhol. Sol e chuva, casamento de viúva.", category: "stories", timeOfDay: "afternoon" },
        { text: "Uni, duni, tê, Salamê, mingüê, Um sorvete colorê, O escolhido foi você!", category: "stories", timeOfDay: "afternoon" },
        { text: "Quem cochicha, O rabo espicha, Come pão Com lagartixa.", category: "stories", timeOfDay: "afternoon" },
        { text: "Um, dois, feijão com arroz, Três, quatro, feijão no prato, Cinco, seis, falar inglês, Sete, oito, comer biscoito, Nove, dez, comer pastéis.", category: "stories", timeOfDay: "morning" },
        { text: "Hoje é domingo, pede cachimbo. O cachimbo é de ouro, bate no touro. O touro é valente, bate na gente. A gente é fraco, cai no buraco. O buraco é fundo, acabou-se o mundo.", category: "stories", timeOfDay: "afternoon" },
        { text: "O macaco foi à feira não teve o que comprar. Comprou uma cadeira pra comadre se sentar. A cadeira esborrachou coitada da comadre. Foi parar no corredor.", category: "stories", timeOfDay: "afternoon" },
        { text: "Pedrinha rolou, Pisquei pro mocinho, Mocinho gostou. Contei pra mamãe, Mamãe nem ligou. Contei pro papai, Chinelo cantou.", category: "stories", timeOfDay: "afternoon" },
        { text: "Eu sou pequena Da perna grossa. Vestido curto, Papai não gosta.", category: "stories", timeOfDay: "afternoon" },
        { text: "Rei, capitão, soldado, ladrão. Moça bonita Do meu coração.", category: "stories", timeOfDay: "morning" },
        { text: "Papagaio louro Do bico dourado Leva essa cartinha Pro meu namorado Se tiver dormindo Bate na porta Se tiver acordado Deixe o recado.", category: "stories", timeOfDay: "afternoon" },
        { text: "A casinha da vovó trançadinha de cipó; se o café está demorando com certeza falta pó.", category: "stories", timeOfDay: "morning" },
        { text: "Era uma bruxa À meia-noite Em um castelo mal-assombrado com uma faca na mão Passando manteiga no pão.", category: "stories", timeOfDay: "night" },
        { text: "Galinha choca, comeu minhoca, saiu pulando, que nem pipoca.", category: "stories", timeOfDay: "afternoon" },
        { text: "Eu sou pequenininho, do tamanho de um botão. Carrego o papai no bolso e a mamãe no coração.", category: "stories", timeOfDay: "morning" },
        { text: "Quem vai ao ar perde lugar. Quem vai ao vento Perde o assento. Quem vai à ribeira perde a cadeira.", category: "stories", timeOfDay: "afternoon" },
        { text: "Cheirinho de colo cheirinho de pão, cheirinho gostoso do meu coração.", category: "stories", timeOfDay: "night" },
        { text: "Cheirinho bom, cheirinho de flor, bebê limpinho cheio de amor.", category: "stories", timeOfDay: "night" },
      ],
    },

    // Routines
    routines: {
      title: "Minhas Rotinas",
      subtitle: "Suas sequências de frases",
      createRoutine: "Criar Rotina",
      routineName: "Nome da rotina",
      addPhrases: "Adicionar frases",
      playRandom: "Tocar aleatório",
      interval: "Intervalo entre frases",
      minutes: "minutos",
      deleteRoutine: "Excluir rotina",
      editName: "Editar nome",
      noRoutines: "Nenhuma rotina criada",
      routineLimit: "Limite de 3 rotinas no plano básico",
      dragToReorder: "Arraste para reordenar",
      playAll: "Tocar todas",
      emptyRoutine: "Rotina vazia",
      addPhrasesHint: "Adicione frases da biblioteca",
    },

    // Favorites
    favorites: {
      title: "Favoritas",
      subtitle: "Suas frases favoritas",
      yourFavorites: "Suas frases favoritas",
      addPhrase: "Adicionar frase",
      dragToReorder: "Arraste para reordenar",
      playAll: "Tocar todas",
      noFavorites: "Nenhuma frase favorita ainda",
      addFromLibrary: "Adicionar da biblioteca",
    },

    // Premium
    premium: {
      title: "Recurso Premium",
      description: "Para usar esta funcionalidade, adquira a versão premium",
      upgrade: "Ver Planos",
      badge: "PAGO",
      premiumOnly: "Apenas para assinantes",
    },
    
    // Schedule Page (legacy)
    schedule: {
      title: "Programar Mensagens",
      createNew: "Criar Nova Programação",
      editSchedule: "Editar Programação",
      exampleSchedules: "Suas Programações",
      noSchedules: "Nenhuma programação criada ainda",
      phrase: "Frase",
      phrasePlaceholder: "Digite a frase que a Catarina vai dizer...",
      time: "Horário",
      repeatDays: "Dias de Repetição",
      comingSoonTitle: "Programação via WhatsApp em Desenvolvimento",
      comingSoonDescription: "Em breve você poderá programar mensagens automáticas para serem enviadas via WhatsApp nos horários que você definir. A Catarina estará sempre presente nos momentos importantes!",
      comingSoonToast: "Programação via WhatsApp em breve! 🚀",
      comingSoonToastDescription: "Esta funcionalidade será integrada com o WhatsApp em breve.",
      tip: "💡 Dica: Em breve você poderá criar sequências de mensagens para diferentes momentos do dia. A Catarina cuidará da rotina da sua filha mesmo quando você estiver ocupada!",
      active: "Ativo",
      inactive: "Inativo",
      scheduleCreated: "Programação criada com sucesso!",
      scheduleUpdated: "Programação atualizada!",
      scheduleDeleted: "Programação excluída",
      days: {
        mon: "Seg",
        tue: "Ter",
        wed: "Qua",
        thu: "Qui",
        fri: "Sex",
        sat: "Sáb",
        sun: "Dom",
      },
    },

    // Settings Page
    settings: {
      title: "Configurações",
      voiceSelection: "Voz da Catarina",
      voiceDescription: "Escolha a voz infantil que a boneca usará para falar",
      voiceChanged: "Voz alterada com sucesso!",
      previewError: "Erro ao reproduzir preview",
      languageTitle: "Idioma do App",
      languageDescription: "Escolha o idioma da interface e das frases",
      dollSelection: "Minha Boneca",
      dollDescription: "Escolha a boneca que você adquiriu",
      catarina: "Catarina",
      antonio: "Antônio",
      catarinaDescription: "Boneca menina",
      antonioDescription: "Boneco menino",
      dollChanged: "Boneca alterada com sucesso!",
    },

    // Profile Page
    profile: {
      title: "Meu Perfil",
      personalInfo: "Informações Pessoais",
      personalInfoDescription: "Gerencie suas informações pessoais",
      fullName: "Nome Completo",
      fullNamePlaceholder: "Seu nome completo",
      email: "Email",
      saveChanges: "Salvar Alterações",
      saveSuccess: "Perfil salvo com sucesso!",
      saveError: "Erro ao salvar perfil",
    },

    // Theme
    theme: {
      title: "Tema",
      description: "Escolha o tema visual do aplicativo",
      light: "Claro",
      dark: "Escuro",
      system: "Automático",
      themeChanged: "Tema alterado com sucesso!",
    },

    // Accent Color
    accentColor: {
      title: "Cor de Destaque",
      description: "Personalize a cor principal do aplicativo",
      colorChanged: "Cor alterada com sucesso!",
    },

    // Admin
    admin: {
      title: "Painel de Administração",
      subtitle: "Gerencie o conteúdo e usuários",
      manageLibrary: "Gerenciar Biblioteca",
      manageLibraryDesc: "Adicionar, editar e excluir frases",
      manageUsers: "Gerenciar Usuários",
      manageUsersDesc: "Ver e gerenciar usuários",
      statistics: "Estatísticas",
      statisticsDesc: "Visualizar métricas do app",
    },
    
    // Not Found Page
    notFound: {
      title: "404",
      message: "Ops! Página não encontrada",
      returnHome: "Voltar para Início",
    },
  },
  
  en: {
    // Common
    common: {
      back: "Back",
      save: "Save",
      cancel: "Cancel",
      delete: "Delete",
      clear: "Clear",
      search: "Search",
      loading: "Loading...",
      comingSoon: "Coming Soon",
    },
    
    // Languages
    languages: {
      pt: "Português",
      en: "English",
      es: "Español",
    },

    // Auth
    auth: {
      title: "My Catarina",
      subtitle: "Sign in to access your account",
      login: "Login",
      signup: "Sign Up",
      email: "Email",
      password: "Password",
      name: "Name",
      namePlaceholder: "Your full name",
      passwordPlaceholder: "Minimum 6 characters",
      loginButton: "Sign In",
      signupButton: "Create Account",
      invalidCredentials: "Invalid email or password",
      emailAlreadyRegistered: "This email is already registered",
      welcomeBack: "Welcome back!",
      accountCreated: "Account created! Check your email.",
      loggedOut: "You have been logged out",
      user: "User",
      profile: "Profile",
      settings: "Settings",
      logout: "Logout",
      loginRequired: "You need to be logged in",
    },

    // Onboarding
    onboarding: {
      welcome: "Welcome!",
      selectDoll: "Which doll did you purchase?",
      continue: "Continue",
      catarina: "Catarina",
      antonio: "Antonio",
      catarinaDescription: "Girl doll",
      antonioDescription: "Boy doll",
    },
    
    // Home Page
    home: {
      title: "My Catarina",
      connected: "Connected",
      disconnected: "Disconnected",
      readyToTalk: "🎀 Ready to talk with you!",
      tapToConnect: "Tap the button below to connect",
      connectBluetooth: "Connect via Bluetooth",
      battery: "Battery",
      volume: "Volume",
      medium: "Medium",
      phraseOfTheDay: "Phrase of the Day",
      phraseOfTheDayText: "Good morning, my love! How about starting the day with a smile?",
      quickActions: "Quick Actions",
      library: "Library",
      libraryDesc: "500+ phrases",
      favorites: "Favorites",
      favoritesDesc: "Your favorites",
      createPhrase: "Create & Chat",
      createPhraseDesc: "Custom AI",
      routines: "My Routines",
      routinesDesc: "Your sequences",
    },
    
    // Quick Actions (legacy)
    quickActions: {
      dailyPhrases: {
        title: "Daily Phrases",
        description: "Routines and messages",
      },
      library: {
        title: "Library",
        description: "500+ recorded phrases",
      },
      createPhrase: {
        title: "Create Phrase",
        description: "Custom AI",
      },
      schedule: {
        title: "Schedule",
        description: "Sequences and routines",
      },
    },
    
    // Create Phrase Page
    createPhrase: {
      title: "Create & Chat",
      subtitle: "Create custom phrases with AI",
      language: "Language",
      whatToSay: "What should {dollName} say?",
      placeholder: "Type the message you want {dollName} to say...",
      generateVoice: "Generate AI Voice",
      generating: "Generating",
      preview: "Phrase Preview",
      sendWhatsApp: "Send via WhatsApp",
      errorEnterPhrase: "Enter a phrase first",
      errorGenerateFirst: "Generate voice first",
      phraseSaved: "Phrase saved to My Phrases!",
      whatsappSoon: "Coming soon: send via Bluetooth!",
      listenIn: "Listen in",
      saveToMyPhrases: "Save to My Phrases",
      tips: {
        title: "Tips for better phrases",
        simple: "Use simple and caring language",
        short: "Short phrases are more natural for children",
        personalize: "Include the child's name to personalize",
      },
    },
    
    // Daily Phrases Page
    dailyPhrases: {
      title: "Daily Phrases",
      searchPlaceholder: "Search phrases...",
      noPhrasesFound: "No phrases found",
      addedToFavorites: "Added to favorites",
      removedFromFavorites: "Removed from favorites",
      timePeriods: {
        all: "All Day",
        morning: "Morning",
        afternoon: "Afternoon",
        evening: "Evening",
      },
      categories: {
        all: "All",
        routine: "Routine",
        motivation: "Motivation",
        educational: "Educational",
      },
      phrases: [
        { id: "1", text: "Good morning, my love! Time to wake up with a smile!", category: "routine", timeOfDay: "morning" },
        { id: "2", text: "You are capable of doing amazing things today!", category: "motivation", timeOfDay: "morning" },
        { id: "3", text: "Let's brush your teeth? Make them sparkle!", category: "routine", timeOfDay: "morning" },
        { id: "4", text: "How about learning a new word today? Let's go!", category: "educational", timeOfDay: "morning" },
        { id: "5", text: "Lunchtime! Let's eat well to grow strong!", category: "routine", timeOfDay: "afternoon" },
        { id: "6", text: "You're doing so great! Keep it up!", category: "motivation", timeOfDay: "afternoon" },
        { id: "7", text: "How about playing a little now?", category: "routine", timeOfDay: "afternoon" },
        { id: "8", text: "Let's count to 10 together? 1, 2, 3...", category: "educational", timeOfDay: "afternoon" },
        { id: "9", text: "Bath time! Let's get all clean and fresh!", category: "routine", timeOfDay: "evening" },
        { id: "10", text: "You were amazing today! Mommy is so proud!", category: "motivation", timeOfDay: "evening" },
        { id: "11", text: "Time to sleep, my love. Have beautiful dreams!", category: "routine", timeOfDay: "evening" },
        { id: "12", text: "Let's be thankful for today? Thank you for everything!", category: "educational", timeOfDay: "evening" },
      ],
    },
    
    // Library Page
    library: {
      title: "Phrase Library",
      subtitle: "500+ pre-recorded phrases",
      searchPlaceholder: "Search phrases...",
      all: "All",
      phrasesFound: "phrases found",
      categories: {
        all: "All",
        songs: "Songs",
        stories: "Stories & Poems",
        affection: "Affection",
        daily: "Daily Life",
        education: "Education",
        sounds: "Sounds",
        myPhrases: "My Phrases",
        // Legacy categories
        routine: "Daily Routine",
        bedtime: "Bedtime",
        meals: "Meals",
        bath: "Bath",
        languages: "Languages",
      },
      timeOfDay: {
        morning: "Morning",
        afternoon: "Afternoon",
        night: "Night",
      },
      phrases: "phrases",
      prerecordedPhrases: [
        { text: "Good morning, my love! Time to wake up!", category: "daily", timeOfDay: "morning" },
        { text: "You are very special to me!", category: "affection", timeOfDay: "morning" },
        { text: "Let's have breakfast?", category: "daily", timeOfDay: "morning" },
        { text: "Bath time! It's going to be fun!", category: "daily", timeOfDay: "night" },
        { text: "A is for apple, B is for ball, C is for cat!", category: "education", timeOfDay: "morning" },
        { text: "Good night! Have beautiful dreams!", category: "daily", timeOfDay: "night" },
        { text: "How about playing a little?", category: "daily", timeOfDay: "afternoon" },
        { text: "I love you so much!", category: "affection", timeOfDay: "afternoon" },
        { text: "It's lunchtime!", category: "daily", timeOfDay: "afternoon" },
        { text: "Let's brush our teeth?", category: "daily", timeOfDay: "night" },
        { text: "Congratulations! You did it!", category: "affection", timeOfDay: "afternoon" },
        { text: "Time to rest a little.", category: "daily", timeOfDay: "night" },
        { text: "Let's sing a song?", category: "songs", timeOfDay: "afternoon" },
        { text: "You're growing up so fast!", category: "affection", timeOfDay: "afternoon" },
        { text: "It's time to study a little!", category: "education", timeOfDay: "morning" },
        // Traditional Brazilian nursery rhymes - adapted translations
        { text: "Run bunny, at auntie's house. Run fast, at grandma's house. Handkerchief in hand, fell on the ground. Pretty girl, of my heart... One, two, three!", category: "stories", timeOfDay: "morning" },
        { text: "Pinky finger, Ring finger, Tall man, Pointer, Thumbkin.", category: "stories", timeOfDay: "morning" },
        { text: "Little potato when it grows spreads across the ground. Little girl when she sleeps puts her hand on her heart.", category: "stories", timeOfDay: "night" },
        { text: "Rain and sun, a Spanish wedding. Sun and rain, a widow's wedding.", category: "stories", timeOfDay: "afternoon" },
        { text: "Eeny, meeny, miny, moe, Catch a tiger by the toe, A colorful ice cream cone, The chosen one is you!", category: "stories", timeOfDay: "afternoon" },
        { text: "Those who whisper, Their tail stretches, Eating bread With a little lizard.", category: "stories", timeOfDay: "afternoon" },
        { text: "One, two, beans with rice, Three, four, beans on the plate, Five, six, speak English, Seven, eight, eat a cookie, Nine, ten, eat pastries.", category: "stories", timeOfDay: "morning" },
        { text: "Today is Sunday, asking for a pipe. The pipe is made of gold, hits the bull. The bull is brave, hits the people. The people are weak, fall in the hole. The hole is deep, the world has ended.", category: "stories", timeOfDay: "afternoon" },
        { text: "The monkey went to the fair had nothing to buy. Bought a chair for his friend to sit on. The chair broke down poor friend. Ended up in the hallway.", category: "stories", timeOfDay: "afternoon" },
        { text: "Pebble rolled, I winked at the boy, The boy liked it. I told mommy, Mommy didn't care. I told daddy, The slipper sang.", category: "stories", timeOfDay: "afternoon" },
        { text: "I am small With thick legs. Short dress, Daddy doesn't like it.", category: "stories", timeOfDay: "afternoon" },
        { text: "King, captain, soldier, thief. Pretty girl of my heart.", category: "stories", timeOfDay: "morning" },
        { text: "Golden parrot With golden beak Take this little letter To my sweetheart If sleeping Knock on the door If awake Leave the message.", category: "stories", timeOfDay: "afternoon" },
        { text: "Grandma's little house braided with vines; if the coffee is taking long it surely needs more grounds.", category: "stories", timeOfDay: "morning" },
        { text: "There was a witch At midnight In a haunted castle with a knife in hand Spreading butter on the bread.", category: "stories", timeOfDay: "night" },
        { text: "Broody hen, ate a worm, started jumping, like popcorn.", category: "stories", timeOfDay: "afternoon" },
        { text: "I am so tiny, the size of a button. I carry daddy in my pocket and mommy in my heart.", category: "stories", timeOfDay: "morning" },
        { text: "Who goes to the air loses their place. Who goes to the wind loses their seat. Who goes to the river loses their chair.", category: "stories", timeOfDay: "afternoon" },
        { text: "The smell of cuddles the smell of bread, a lovely smell from my heart.", category: "stories", timeOfDay: "night" },
        { text: "Sweet smell, the smell of flower, clean baby full of love.", category: "stories", timeOfDay: "night" },
      ],
    },

    // Routines
    routines: {
      title: "My Routines",
      subtitle: "Your phrase sequences",
      createRoutine: "Create Routine",
      routineName: "Routine name",
      addPhrases: "Add phrases",
      playRandom: "Play random",
      interval: "Interval between phrases",
      minutes: "minutes",
      deleteRoutine: "Delete routine",
      editName: "Edit name",
      noRoutines: "No routines created",
      routineLimit: "Limit of 3 routines on basic plan",
      dragToReorder: "Drag to reorder",
      playAll: "Play all",
      emptyRoutine: "Empty routine",
      addPhrasesHint: "Add phrases from the library",
    },

    // Favorites
    favorites: {
      title: "Favorites",
      subtitle: "Your favorite phrases",
      yourFavorites: "Your favorite phrases",
      addPhrase: "Add phrase",
      dragToReorder: "Drag to reorder",
      playAll: "Play all",
      noFavorites: "No favorite phrases yet",
      addFromLibrary: "Add from library",
    },

    // Premium
    premium: {
      title: "Premium Feature",
      description: "To use this feature, upgrade to premium",
      upgrade: "View Plans",
      badge: "PAID",
      premiumOnly: "Premium only",
    },
    
    // Schedule Page (legacy)
    schedule: {
      title: "Schedule Messages",
      createNew: "Create New Schedule",
      editSchedule: "Edit Schedule",
      exampleSchedules: "Your Schedules",
      noSchedules: "No schedules created yet",
      phrase: "Phrase",
      phrasePlaceholder: "Enter the phrase Catarina will say...",
      time: "Time",
      repeatDays: "Repeat Days",
      comingSoonTitle: "WhatsApp Scheduling in Development",
      comingSoonDescription: "Soon you'll be able to schedule automatic messages to be sent via WhatsApp at the times you define. Catarina will always be present in important moments!",
      comingSoonToast: "WhatsApp scheduling coming soon! 🚀",
      comingSoonToastDescription: "This feature will be integrated with WhatsApp soon.",
      tip: "💡 Tip: Soon you'll be able to create message sequences for different times of the day. Catarina will take care of your daughter's routine even when you're busy!",
      active: "Active",
      inactive: "Inactive",
      scheduleCreated: "Schedule created successfully!",
      scheduleUpdated: "Schedule updated!",
      scheduleDeleted: "Schedule deleted",
      days: {
        mon: "Mon",
        tue: "Tue",
        wed: "Wed",
        thu: "Thu",
        fri: "Fri",
        sat: "Sat",
        sun: "Sun",
      },
    },

    // Settings Page
    settings: {
      title: "Settings",
      voiceSelection: "Catarina's Voice",
      voiceDescription: "Choose the child voice that the doll will use to speak",
      voiceChanged: "Voice changed successfully!",
      previewError: "Error playing preview",
      languageTitle: "App Language",
      languageDescription: "Choose the interface and phrases language",
      dollSelection: "My Doll",
      dollDescription: "Choose the doll you purchased",
      catarina: "Catarina",
      antonio: "Antonio",
      catarinaDescription: "Girl doll",
      antonioDescription: "Boy doll",
      dollChanged: "Doll changed successfully!",
    },

    // Profile Page
    profile: {
      title: "My Profile",
      personalInfo: "Personal Information",
      personalInfoDescription: "Manage your personal information",
      fullName: "Full Name",
      fullNamePlaceholder: "Your full name",
      email: "Email",
      saveChanges: "Save Changes",
      saveSuccess: "Profile saved successfully!",
      saveError: "Error saving profile",
    },

    // Theme
    theme: {
      title: "Theme",
      description: "Choose the app's visual theme",
      light: "Light",
      dark: "Dark",
      system: "System",
      themeChanged: "Theme changed successfully!",
    },

    // Accent Color
    accentColor: {
      title: "Accent Color",
      description: "Customize the app's primary color",
      colorChanged: "Color changed successfully!",
    },

    // Admin
    admin: {
      title: "Admin Panel",
      subtitle: "Manage content and users",
      manageLibrary: "Manage Library",
      manageLibraryDesc: "Add, edit and delete phrases",
      manageUsers: "Manage Users",
      manageUsersDesc: "View and manage users",
      statistics: "Statistics",
      statisticsDesc: "View app metrics",
    },
    
    // Not Found Page
    notFound: {
      title: "404",
      message: "Oops! Page not found",
      returnHome: "Return to Home",
    },
  },
  
  es: {
    // Common
    common: {
      back: "Volver",
      save: "Guardar",
      cancel: "Cancelar",
      delete: "Eliminar",
      clear: "Limpiar",
      search: "Buscar",
      loading: "Cargando...",
      comingSoon: "Próximamente",
    },
    
    // Languages
    languages: {
      pt: "Português",
      en: "English",
      es: "Español",
    },

    // Auth
    auth: {
      title: "Mi Catarina",
      subtitle: "Inicia sesión para acceder a tu cuenta",
      login: "Iniciar Sesión",
      signup: "Registrarse",
      email: "Correo",
      password: "Contraseña",
      name: "Nombre",
      namePlaceholder: "Tu nombre completo",
      passwordPlaceholder: "Mínimo 6 caracteres",
      loginButton: "Entrar",
      signupButton: "Crear Cuenta",
      invalidCredentials: "Correo o contraseña incorrectos",
      emailAlreadyRegistered: "Este correo ya está registrado",
      welcomeBack: "¡Bienvenida de vuelta!",
      accountCreated: "¡Cuenta creada! Revisa tu correo.",
      loggedOut: "Has cerrado sesión",
      user: "Usuario",
      profile: "Perfil",
      settings: "Configuración",
      logout: "Salir",
      loginRequired: "Necesitas iniciar sesión",
    },

    // Onboarding
    onboarding: {
      welcome: "¡Bienvenido(a)!",
      selectDoll: "¿Cuál muñeca compraste?",
      continue: "Continuar",
      catarina: "Catarina",
      antonio: "Antonio",
      catarinaDescription: "Muñeca niña",
      antonioDescription: "Muñeco niño",
    },
    
    // Home Page
    home: {
      title: "Mi Catarina",
      connected: "Conectada",
      disconnected: "Desconectada",
      readyToTalk: "🎀 ¡Lista para hablar contigo!",
      tapToConnect: "Toca el botón para conectar",
      connectBluetooth: "Conectar vía Bluetooth",
      battery: "Batería",
      volume: "Volumen",
      medium: "Medio",
      phraseOfTheDay: "Frase del Día",
      phraseOfTheDayText: "¡Buenos días, mi amor! ¿Qué tal empezar el día con una sonrisa?",
      quickActions: "Acciones Rápidas",
      library: "Biblioteca",
      libraryDesc: "500+ frases",
      favorites: "Favoritas",
      favoritesDesc: "Tus favoritas",
      createPhrase: "Crea y Conversa",
      createPhraseDesc: "IA personalizada",
      routines: "Mis Rutinas",
      routinesDesc: "Tus secuencias",
    },
    
    // Quick Actions (legacy)
    quickActions: {
      dailyPhrases: {
        title: "Frases Diarias",
        description: "Rutinas y mensajes",
      },
      library: {
        title: "Biblioteca",
        description: "500+ frases grabadas",
      },
      createPhrase: {
        title: "Crear Frase",
        description: "IA personalizada",
      },
      schedule: {
        title: "Programar",
        description: "Secuencias y rutinas",
      },
    },
    
    // Create Phrase Page
    createPhrase: {
      title: "Crea y Conversa",
      subtitle: "Crea frases personalizadas con IA",
      language: "Idioma",
      whatToSay: "¿Qué debe decir {dollName}?",
      placeholder: "Escribe el mensaje que quieres que {dollName} diga...",
      generateVoice: "Generar Voz con IA",
      generating: "Generando",
      preview: "Vista Previa de la Frase",
      sendWhatsApp: "Enviar por WhatsApp",
      errorEnterPhrase: "Escribe una frase primero",
      errorGenerateFirst: "Genera la voz primero",
      phraseSaved: "¡Frase guardada en Mis Frases!",
      whatsappSoon: "Próximamente: ¡enviar vía Bluetooth!",
      listenIn: "Escuchar en",
      saveToMyPhrases: "Guardar en Mis Frases",
      tips: {
        title: "Consejos para mejores frases",
        simple: "Usa lenguaje simple y cariñoso",
        short: "Las frases cortas son más naturales para niños",
        personalize: "Incluye el nombre del niño para personalizar",
      },
    },
    
    // Daily Phrases Page
    dailyPhrases: {
      title: "Frases Diarias",
      searchPlaceholder: "Buscar frases...",
      noPhrasesFound: "No se encontraron frases",
      addedToFavorites: "Añadido a favoritos",
      removedFromFavorites: "Eliminado de favoritos",
      timePeriods: {
        all: "Todo el Día",
        morning: "Mañana",
        afternoon: "Tarde",
        evening: "Noche",
      },
      categories: {
        all: "Todas",
        routine: "Rutina",
        motivation: "Motivación",
        educational: "Educacional",
      },
      phrases: [
        { id: "1", text: "¡Buenos días, mi amor! ¡Hora de despertar con una sonrisa!", category: "routine", timeOfDay: "morning" },
        { id: "2", text: "¡Eres capaz de hacer cosas increíbles hoy!", category: "motivation", timeOfDay: "morning" },
        { id: "3", text: "¿Vamos a cepillar los dientes? ¡Que brillen!", category: "routine", timeOfDay: "morning" },
        { id: "4", text: "¿Qué tal aprender una palabra nueva hoy? ¡Vamos!", category: "educational", timeOfDay: "morning" },
        { id: "5", text: "¡Hora del almuerzo! ¡Vamos a comer bien para crecer fuerte!", category: "routine", timeOfDay: "afternoon" },
        { id: "6", text: "¡Lo estás haciendo muy bien! ¡Sigue así!", category: "motivation", timeOfDay: "afternoon" },
        { id: "7", text: "¿Qué tal jugar un poquito ahora?", category: "routine", timeOfDay: "afternoon" },
        { id: "8", text: "¿Vamos a contar hasta 10 juntas? 1, 2, 3...", category: "educational", timeOfDay: "afternoon" },
        { id: "9", text: "¡Hora del baño! ¡Vamos a quedar limpita!", category: "routine", timeOfDay: "evening" },
        { id: "10", text: "¡Estuviste increíble hoy! ¡Mamá está muy orgullosa!", category: "motivation", timeOfDay: "evening" },
        { id: "11", text: "Hora de dormir, mi amor. ¡Ten sueños hermosos!", category: "routine", timeOfDay: "evening" },
        { id: "12", text: "¿Vamos a agradecer por el día de hoy? ¡Gracias por todo!", category: "educational", timeOfDay: "evening" },
      ],
    },
    
    // Library Page
    library: {
      title: "Biblioteca de Frases",
      subtitle: "500+ frases pregrabadas",
      searchPlaceholder: "Buscar frases...",
      all: "Todas",
      phrasesFound: "frases encontradas",
      categories: {
        all: "Todas",
        songs: "Canciones",
        stories: "Historias y Poemas",
        affection: "Cariño",
        daily: "Día a Día",
        education: "Educación",
        sounds: "Sonidos",
        myPhrases: "Mis Frases",
        // Legacy categories
        routine: "Rutina Diaria",
        bedtime: "Hora de Dormir",
        meals: "Comidas",
        bath: "Baño",
        languages: "Idiomas",
      },
      timeOfDay: {
        morning: "Mañana",
        afternoon: "Tarde",
        night: "Noche",
      },
      phrases: "frases",
      prerecordedPhrases: [
        { text: "¡Buenos días, mi amor! ¡Hora de despertar!", category: "daily", timeOfDay: "morning" },
        { text: "¡Eres muy especial para mí!", category: "affection", timeOfDay: "morning" },
        { text: "¿Vamos a desayunar?", category: "daily", timeOfDay: "morning" },
        { text: "¡Hora del baño! ¡Va a ser divertido!", category: "daily", timeOfDay: "night" },
        { text: "¡A es de amor, B es de bola, C es de casa!", category: "education", timeOfDay: "morning" },
        { text: "¡Buenas noches! ¡Ten sueños hermosos!", category: "daily", timeOfDay: "night" },
        { text: "¿Qué tal jugar un poquito?", category: "daily", timeOfDay: "afternoon" },
        { text: "¡Te amo mucho!", category: "affection", timeOfDay: "afternoon" },
        { text: "¡Es hora del almuerzo!", category: "daily", timeOfDay: "afternoon" },
        { text: "¿Vamos a cepillar los dientes?", category: "daily", timeOfDay: "night" },
        { text: "¡Felicitaciones! ¡Lo lograste!", category: "affection", timeOfDay: "afternoon" },
        { text: "Hora de descansar un poquito.", category: "daily", timeOfDay: "night" },
        { text: "¿Vamos a cantar una canción?", category: "songs", timeOfDay: "afternoon" },
        { text: "¡Estás creciendo tan rápido!", category: "affection", timeOfDay: "afternoon" },
        { text: "¡Es hora de estudiar un poquito!", category: "education", timeOfDay: "morning" },
        // Rimas tradicionales brasileñas - traducciones adaptadas
        { text: "Corre ratón, en casa de la tía. Corre cipó, en casa de la abuela. Pañuelito en la mano, cayó al suelo. Niña bonita, de mi corazón... ¡Uno, dos, tres!", category: "stories", timeOfDay: "morning" },
        { text: "Dedo meñique, Su vecino, Padre de todos, Pincha pasteles, Mata piojos.", category: "stories", timeOfDay: "morning" },
        { text: "Papita cuando nace se esparce por el suelo. Niñita cuando duerme pone la mano en el corazón.", category: "stories", timeOfDay: "night" },
        { text: "Lluvia y sol, boda de español. Sol y lluvia, boda de viuda.", category: "stories", timeOfDay: "afternoon" },
        { text: "Uni, duni, te, Salamé, mingüé, Un helado de colores, ¡El elegido fuiste tú!", category: "stories", timeOfDay: "afternoon" },
        { text: "Quien cuchichea, Su cola se estira, Come pan Con lagartija.", category: "stories", timeOfDay: "afternoon" },
        { text: "Uno, dos, frijoles con arroz, Tres, cuatro, frijoles en el plato, Cinco, seis, hablar inglés, Siete, ocho, comer galletas, Nueve, diez, comer pasteles.", category: "stories", timeOfDay: "morning" },
        { text: "Hoy es domingo, pide pipa. La pipa es de oro, pega al toro. El toro es valiente, pega a la gente. La gente es débil, cae en el hoyo. El hoyo es profundo, se acabó el mundo.", category: "stories", timeOfDay: "afternoon" },
        { text: "El mono fue a la feria no tuvo qué comprar. Compró una silla para que su comadre se sentara. La silla se rompió pobrecita comadre. Fue a parar al pasillo.", category: "stories", timeOfDay: "afternoon" },
        { text: "Piedrita rodó, Le guiñé al muchachito, Al muchachito le gustó. Le conté a mamá, Mamá ni caso. Le conté a papá, La chancleta cantó.", category: "stories", timeOfDay: "afternoon" },
        { text: "Yo soy pequeña De pierna gruesa. Vestido corto, A papá no le gusta.", category: "stories", timeOfDay: "afternoon" },
        { text: "Rey, capitán, soldado, ladrón. Niña bonita De mi corazón.", category: "stories", timeOfDay: "morning" },
        { text: "Loro dorado Del pico dorado Lleva esta cartita A mi enamorado Si está dormido Toca la puerta Si está despierto Deja el recado.", category: "stories", timeOfDay: "afternoon" },
        { text: "La casita de la abuela trenzadita de cipó; si el café está demorando seguro le falta polvo.", category: "stories", timeOfDay: "morning" },
        { text: "Era una bruja A medianoche En un castillo embrujado con un cuchillo en la mano Untando mantequilla en el pan.", category: "stories", timeOfDay: "night" },
        { text: "Gallina clueca, comió lombriz, salió saltando, como palomita.", category: "stories", timeOfDay: "afternoon" },
        { text: "Yo soy pequeñito, del tamaño de un botón. Llevo a papá en el bolsillo y a mamá en el corazón.", category: "stories", timeOfDay: "morning" },
        { text: "Quien va al aire pierde lugar. Quien va al viento Pierde el asiento. Quien va al río pierde la silla.", category: "stories", timeOfDay: "afternoon" },
        { text: "Olorcito a regazo olorcito a pan, olorcito rico de mi corazón.", category: "stories", timeOfDay: "night" },
        { text: "Olorcito bueno, olorcito a flor, bebé limpito lleno de amor.", category: "stories", timeOfDay: "night" },
      ],
    },

    // Routines
    routines: {
      title: "Mis Rutinas",
      subtitle: "Tus secuencias de frases",
      createRoutine: "Crear Rutina",
      routineName: "Nombre de la rutina",
      addPhrases: "Agregar frases",
      playRandom: "Reproducir aleatorio",
      interval: "Intervalo entre frases",
      minutes: "minutos",
      deleteRoutine: "Eliminar rutina",
      editName: "Editar nombre",
      noRoutines: "No hay rutinas creadas",
      routineLimit: "Límite de 3 rutinas en plan básico",
      dragToReorder: "Arrastra para reordenar",
      playAll: "Reproducir todas",
      emptyRoutine: "Rutina vacía",
      addPhrasesHint: "Agrega frases de la biblioteca",
    },

    // Favorites
    favorites: {
      title: "Favoritas",
      subtitle: "Tus frases favoritas",
      yourFavorites: "Tus frases favoritas",
      addPhrase: "Agregar frase",
      dragToReorder: "Arrastra para reordenar",
      playAll: "Reproducir todas",
      noFavorites: "No hay frases favoritas aún",
      addFromLibrary: "Agregar de la biblioteca",
    },

    // Premium
    premium: {
      title: "Función Premium",
      description: "Para usar esta función, adquiere la versión premium",
      upgrade: "Ver Planes",
      badge: "PAGO",
      premiumOnly: "Solo premium",
    },
    
    // Schedule Page (legacy)
    schedule: {
      title: "Programar Mensajes",
      createNew: "Crear Nueva Programación",
      editSchedule: "Editar Programación",
      exampleSchedules: "Tus Programaciones",
      noSchedules: "No hay programaciones creadas aún",
      phrase: "Frase",
      phrasePlaceholder: "Escribe la frase que Catarina dirá...",
      time: "Hora",
      repeatDays: "Días de Repetición",
      comingSoonTitle: "Programación por WhatsApp en Desarrollo",
      comingSoonDescription: "Pronto podrás programar mensajes automáticos para ser enviados por WhatsApp en los horarios que definas. ¡Catarina estará siempre presente en los momentos importantes!",
      comingSoonToast: "¡Programación por WhatsApp próximamente! 🚀",
      comingSoonToastDescription: "Esta funcionalidad se integrará con WhatsApp pronto.",
      tip: "💡 Consejo: Pronto podrás crear secuencias de mensajes para diferentes momentos del día. ¡Catarina cuidará la rutina de tu hija incluso cuando estés ocupada!",
      active: "Activo",
      inactive: "Inactivo",
      scheduleCreated: "¡Programación creada con éxito!",
      scheduleUpdated: "¡Programación actualizada!",
      scheduleDeleted: "Programación eliminada",
      days: {
        mon: "Lun",
        tue: "Mar",
        wed: "Mié",
        thu: "Jue",
        fri: "Vie",
        sat: "Sáb",
        sun: "Dom",
      },
    },

    // Settings Page
    settings: {
      title: "Configuración",
      voiceSelection: "Voz de Catarina",
      voiceDescription: "Elige la voz infantil que la muñeca usará para hablar",
      voiceChanged: "¡Voz cambiada con éxito!",
      previewError: "Error al reproducir vista previa",
      languageTitle: "Idioma de la App",
      languageDescription: "Elige el idioma de la interfaz y las frases",
      dollSelection: "Mi Muñeca",
      dollDescription: "Elige la muñeca que compraste",
      catarina: "Catarina",
      antonio: "Antonio",
      catarinaDescription: "Muñeca niña",
      antonioDescription: "Muñeco niño",
      dollChanged: "¡Muñeca cambiada con éxito!",
    },

    // Profile Page
    profile: {
      title: "Mi Perfil",
      personalInfo: "Información Personal",
      personalInfoDescription: "Gestiona tu información personal",
      fullName: "Nombre Completo",
      fullNamePlaceholder: "Tu nombre completo",
      email: "Correo",
      saveChanges: "Guardar Cambios",
      saveSuccess: "¡Perfil guardado con éxito!",
      saveError: "Error al guardar perfil",
    },

    // Theme
    theme: {
      title: "Tema",
      description: "Elige el tema visual de la aplicación",
      light: "Claro",
      dark: "Oscuro",
      system: "Automático",
      themeChanged: "¡Tema cambiado con éxito!",
    },

    // Accent Color
    accentColor: {
      title: "Color de Acento",
      description: "Personaliza el color principal de la aplicación",
      colorChanged: "¡Color cambiado con éxito!",
    },

    // Admin
    admin: {
      title: "Panel de Administración",
      subtitle: "Gestiona contenido y usuarios",
      manageLibrary: "Gestionar Biblioteca",
      manageLibraryDesc: "Agregar, editar y eliminar frases",
      manageUsers: "Gestionar Usuarios",
      manageUsersDesc: "Ver y gestionar usuarios",
      statistics: "Estadísticas",
      statisticsDesc: "Ver métricas de la app",
    },
    
    // Not Found Page
    notFound: {
      title: "404",
      message: "¡Ups! Página no encontrada",
      returnHome: "Volver al Inicio",
    },
  },
};

export type TranslationKeys = typeof translations.pt;

export const getTranslations = (language: Language): TranslationKeys => {
  return translations[language];
};
