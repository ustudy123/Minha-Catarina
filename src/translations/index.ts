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
      quickActions: "Ações Rápidas",
    },
    
    // Quick Actions
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
      title: "Criar Frase",
      subtitle: "IA personalizada com voz infantil",
      language: "Idioma",
      whatToSay: "O que a Catarina deve dizer?",
      placeholder: "Digite a mensagem que você quer que a Catarina fale...",
      generateVoice: "Gerar Voz com IA",
      generating: "Gerando",
      preview: "Preview da Frase",
      sendWhatsApp: "Enviar via WhatsApp",
      errorEnterPhrase: "Digite uma frase primeiro",
      errorGenerateFirst: "Gere a voz primeiro",
      phraseSaved: "Frase salva na biblioteca!",
      whatsappSoon: "Em breve: enviar via Bluetooth!",
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
    },
    
    // Library Page
    library: {
      title: "Biblioteca de Frases",
      subtitle: "500+ frases pré-gravadas",
      searchPlaceholder: "Buscar frases...",
      all: "Todas",
      phrasesFound: "frases encontradas",
      categories: {
        routine: "Rotina Diária",
        education: "Educação",
        songs: "Músicas",
        affection: "Carinho",
        bedtime: "Hora de Dormir",
        meals: "Refeições",
        bath: "Banho",
        languages: "Idiomas",
      },
      phrases: "frases",
      prerecordedPhrases: [
        { text: "Bom dia, meu amor! Hora de acordar!", category: "routine" },
        { text: "Você é muito especial para mim!", category: "affection" },
        { text: "Vamos tomar café da manhã?", category: "meals" },
        { text: "Hora do banho! Vai ser divertido!", category: "bath" },
        { text: "A é de amor, B é de bola, C é de casa!", category: "education" },
        { text: "Boa noite! Tenha sonhos lindos!", category: "bedtime" },
        { text: "Que tal brincar um pouquinho?", category: "routine" },
        { text: "Eu te amo muito!", category: "affection" },
        { text: "Está na hora do almoço!", category: "meals" },
        { text: "Vamos escovar os dentes?", category: "bath" },
        { text: "Parabéns! Você conseguiu!", category: "affection" },
        { text: "Hora de descansar um pouquinho.", category: "bedtime" },
        { text: "Vamos cantar uma música?", category: "songs" },
        { text: "Você está crescendo tão rápido!", category: "affection" },
        { text: "É hora de estudar um pouquinho!", category: "education" },
      ],
    },
    
    // Schedule Page
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
      quickActions: "Quick Actions",
    },
    
    // Quick Actions
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
      title: "Create Phrase",
      subtitle: "Custom AI with child voice",
      language: "Language",
      whatToSay: "What should Catarina say?",
      placeholder: "Type the message you want Catarina to say...",
      generateVoice: "Generate AI Voice",
      generating: "Generating",
      preview: "Phrase Preview",
      sendWhatsApp: "Send via WhatsApp",
      errorEnterPhrase: "Enter a phrase first",
      errorGenerateFirst: "Generate voice first",
      phraseSaved: "Phrase saved to library!",
      whatsappSoon: "Coming soon: send via Bluetooth!",
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
    },
    
    // Library Page
    library: {
      title: "Phrase Library",
      subtitle: "500+ pre-recorded phrases",
      searchPlaceholder: "Search phrases...",
      all: "All",
      phrasesFound: "phrases found",
      categories: {
        routine: "Daily Routine",
        education: "Education",
        songs: "Songs",
        affection: "Affection",
        bedtime: "Bedtime",
        meals: "Meals",
        bath: "Bath",
        languages: "Languages",
      },
      phrases: "phrases",
      prerecordedPhrases: [
        { text: "Good morning, my love! Time to wake up!", category: "routine" },
        { text: "You are very special to me!", category: "affection" },
        { text: "Let's have breakfast?", category: "meals" },
        { text: "Bath time! It's going to be fun!", category: "bath" },
        { text: "A is for apple, B is for ball, C is for cat!", category: "education" },
        { text: "Good night! Have beautiful dreams!", category: "bedtime" },
        { text: "How about playing a little?", category: "routine" },
        { text: "I love you so much!", category: "affection" },
        { text: "It's lunchtime!", category: "meals" },
        { text: "Let's brush our teeth?", category: "bath" },
        { text: "Congratulations! You did it!", category: "affection" },
        { text: "Time to rest a little.", category: "bedtime" },
        { text: "Let's sing a song?", category: "songs" },
        { text: "You're growing up so fast!", category: "affection" },
        { text: "It's time to study a little!", category: "education" },
      ],
    },
    
    // Schedule Page
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
      quickActions: "Acciones Rápidas",
    },
    
    // Quick Actions
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
      title: "Crear Frase",
      subtitle: "IA personalizada con voz infantil",
      language: "Idioma",
      whatToSay: "¿Qué debe decir Catarina?",
      placeholder: "Escribe el mensaje que quieres que Catarina diga...",
      generateVoice: "Generar Voz con IA",
      generating: "Generando",
      preview: "Vista Previa de la Frase",
      sendWhatsApp: "Enviar por WhatsApp",
      errorEnterPhrase: "Escribe una frase primero",
      errorGenerateFirst: "Genera la voz primero",
      phraseSaved: "¡Frase guardada en la biblioteca!",
      whatsappSoon: "Próximamente: ¡enviar vía Bluetooth!",
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
    },
    
    // Library Page
    library: {
      title: "Biblioteca de Frases",
      subtitle: "500+ frases pregrabadas",
      searchPlaceholder: "Buscar frases...",
      all: "Todas",
      phrasesFound: "frases encontradas",
      categories: {
        routine: "Rutina Diaria",
        education: "Educación",
        songs: "Canciones",
        affection: "Cariño",
        bedtime: "Hora de Dormir",
        meals: "Comidas",
        bath: "Baño",
        languages: "Idiomas",
      },
      phrases: "frases",
      prerecordedPhrases: [
        { text: "¡Buenos días, mi amor! ¡Hora de despertar!", category: "routine" },
        { text: "¡Eres muy especial para mí!", category: "affection" },
        { text: "¿Vamos a desayunar?", category: "meals" },
        { text: "¡Hora del baño! ¡Va a ser divertido!", category: "bath" },
        { text: "¡A es de amor, B es de bola, C es de casa!", category: "education" },
        { text: "¡Buenas noches! ¡Ten sueños hermosos!", category: "bedtime" },
        { text: "¿Qué tal jugar un poquito?", category: "routine" },
        { text: "¡Te amo mucho!", category: "affection" },
        { text: "¡Es hora del almuerzo!", category: "meals" },
        { text: "¿Vamos a cepillar los dientes?", category: "bath" },
        { text: "¡Felicitaciones! ¡Lo lograste!", category: "affection" },
        { text: "Hora de descansar un poquito.", category: "bedtime" },
        { text: "¿Vamos a cantar una canción?", category: "songs" },
        { text: "¡Estás creciendo tan rápido!", category: "affection" },
        { text: "¡Es hora de estudiar un poquito!", category: "education" },
      ],
    },
    
    // Schedule Page
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
