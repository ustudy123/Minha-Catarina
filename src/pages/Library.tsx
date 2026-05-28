import { useState, useMemo, memo, useCallback, useEffect } from "react";
import { PageTransition } from "@/components/PageTransition";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useAudioPlayer } from "@/hooks/useAudioPlayer";
import { useTextToSpeech } from "@/hooks/useTextToSpeech";
import { useTextToSong } from "@/hooks/useTextToSong";
import { useSoundEffects } from "@/hooks/useSoundEffects";
import { useLibraryAudio } from "@/hooks/useLibraryAudio";
import { useAudioPreloader } from "@/hooks/useAudioPreloader";
import { useLanguage } from "@/contexts/LanguageContext";
import { useFavorites } from "@/hooks/useFavorites";
import { useSubscription } from "@/hooks/useSubscription";
import { useSavedPhrases } from "@/hooks/useSavedPhrases";
import { getTranslations } from "@/translations";
import { englishPhrasesData, spanishPhrasesData } from "@/data/languagePhrases";
import { PlayButton } from "@/components/audio/PlayButton";
import { usePausableAudio, hasPauseMarkers, getTextWithoutPauses } from "@/hooks/usePausableAudio";
import { AudioControls } from "@/components/audio/AudioControls";
import { AutoPlayControls } from "@/components/AutoPlayControls";
import { useSequentialPlayer } from "@/hooks/useSequentialPlayer";
import { Link, useNavigate } from "react-router-dom";
import { PhraseOptionsMenu } from "@/components/PhraseOptionsMenu";
import { PremiumGate } from "@/components/PremiumGate";
import {
  Search,
  Star,
  ArrowLeft,
  Music,
  BookOpen,
  Heart,
  Sun,
  Sunset,
  Moon,
  GraduationCap,
  Bell,
  Sparkles,
  Lock,
  Trash2,
  Plus,
  Loader2,
  HandHeart,
  Gamepad2,
  Languages,
  Timer,
  ChevronRight,
  BookOpenText,
  Rainbow,
  Hash,
  PawPrint,
  Brain,
  Palette,
  Shapes,
  Lightbulb,
  Award,
  Eye,
  Smile,
  Search as SearchIcon,
  Copy,
  BookHeart,
  Feather,
  Mic,
  MessageCircleQuestion,
  Baby,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Phrase {
  id: string;
  text: string;
  category: string;
  timeOfDay?: 'morning' | 'afternoon' | 'night';
  subCategory?: string;
  soundPrompt?: string;
  phraseKey?: string;
}

const PhraseItem = memo(({ 
  phrase, 
  index, 
  isPlaying, 
  isLoading, 
  isAutoPlaying,
  isPaused,
  pauseTimeRemaining,
  isFavorite,
  onPlay,
  onPause,
  onToggleFavorite,
  duration,
  audioControlsProps
}: {
  phrase: Phrase;
  index: number;
  isPlaying: boolean;
  isLoading: boolean;
  isAutoPlaying: boolean;
  isPaused: boolean;
  pauseTimeRemaining: number;
  isFavorite: boolean;
  onPlay: (phrase: Phrase) => void;
  onPause: () => void;
  onToggleFavorite: (phrase: Phrase) => void;
  duration: number;
  audioControlsProps: any;
}) => (
  <Card
    className={`p-4 border-2 hover-lift animate-fade-in transition-colors ${isAutoPlaying ? "border-primary bg-primary/5" : ""}`}
    style={{ animationDelay: `${index * 0.05}s` }}
  >
    <div className="flex items-start gap-3">
      <PlayButton
        isPlaying={isPlaying}
        isLoading={isLoading}
        onPlay={() => onPlay(phrase)}
        onPause={onPause}
        variant="secondary"
        size="icon"
        className="flex-shrink-0"
      />

      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium mb-1 break-words">
          {getTextWithoutPauses(phrase.text)}
        </p>

        {isPlaying && isPaused && (
          <div className="mt-2 flex items-center gap-2 text-xs text-primary animate-pulse">
            <Timer className="w-4 h-4" />
            <span>
              {pauseTimeRemaining}s
            </span>
          </div>
        )}
      </div>

      <Button size="icon" variant="ghost" className="flex-shrink-0" onClick={() => onToggleFavorite(phrase)}>
        <Star className={cn("w-5 h-5", isFavorite && "fill-highlight text-highlight")} />
      </Button>

      <PhraseOptionsMenu phraseId={phrase.id} phraseText={phrase.text} phraseSource="library" />
    </div>

    {isPlaying && duration > 0 && (
      <AudioControls
        {...audioControlsProps}
        className="mt-3"
      />
    )}
  </Card>
));

PhraseItem.displayName = "PhraseItem";

interface SubCategory {
  id: string;
  name: string;
  icon: any;
}

interface Category {
  id: string;
  name: string;
  icon: any;
  isLink?: boolean;
  linkTo?: string;
  premium?: boolean;
  // Virtual category filter
  dataCategory?: string;
  dataSubCategory?: string;
  dataTimeOfDay?: string;
}

const Library = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [selectedTimeOfDay, setSelectedTimeOfDay] = useState<string | null>(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState<string | null>(null);
  const [playingId, setPlayingId] = useState<string | null>(null);

  const audioPlayer = useAudioPlayer();
  const pausableAudio = usePausableAudio();
  const { generate: generateTTS, isGenerating: isGeneratingTTS } = useTextToSpeech();
  const { generate: generateSong, isGenerating: isGeneratingSong } = useTextToSong();
  const { generate: generateSFX, isGenerating: isGeneratingSFX } = useSoundEffects();
  const { getAudioUrl, hasPreloadedAudio } = useLibraryAudio();
  const { getAudioUrl, hasPreloadedAudio } = useLibraryAudio();
  const { preloadMany } = useAudioPreloader();
  const { isFavorite, toggleFavorite } = useFavorites();
  const { isPremium, canAccessMyPhrases } = useSubscription();
  const { phrases: savedPhrases, isLoading: loadingSaved, removePhrase, toggleFavorite: toggleSavedFavorite } = useSavedPhrases();
  const t = getTranslations(language);
  const sequentialPlayer = useSequentialPlayer();

  const categories: Category[] = [
    { id: "daily-morning", name: language === 'pt' ? "Rotina Manhã" : language === 'en' ? "Morning Routine" : "Rutina Mañana", icon: Sun, dataCategory: "daily", dataTimeOfDay: "morning" },
    { id: "daily-afternoon", name: language === 'pt' ? "Rotina Tarde" : language === 'en' ? "Afternoon Routine" : "Rutina Tarde", icon: Sunset, dataCategory: "daily", dataTimeOfDay: "afternoon" },
    { id: "daily-night", name: language === 'pt' ? "Rotina Noite" : language === 'en' ? "Night Routine" : "Rutina Noche", icon: Moon, dataCategory: "daily", dataTimeOfDay: "night" },
    { id: "acolhimento", name: language === 'pt' ? "Acolhimento" : language === 'en' ? "Welcome" : "Acogida", icon: Heart, dataCategory: "affection", dataSubCategory: "acolhimento" },
    { id: "sentimentos", name: language === 'pt' ? "Sentimentos" : language === 'en' ? "Feelings" : "Sentimientos", icon: Smile, dataCategory: "affection", dataSubCategory: "sentimentos" },
    { id: "bons-costumes", name: language === 'pt' ? "Bons Costumes" : language === 'en' ? "Good Manners" : "Buenos Modales", icon: Award, dataCategory: "education", dataSubCategory: "bons-costumes" },
    { id: "prayers", name: t.library.categories.prayers || "Orações", icon: HandHeart },
    { id: "playtime", name: t.library.categories.playtime || "Brincadeiras", icon: Gamepad2 },
    { id: "songs", name: t.library.categories.songs || "Músicas", icon: Music },
    { id: "stories", name: t.library.categories.stories || "Histórias", icon: BookOpen },
    { id: "poems", name: language === 'pt' ? "Poemas" : language === 'en' ? "Poems" : "Poemas", icon: Feather },
    { id: "education", name: t.library.categories.education || "Educação", icon: GraduationCap },
    { id: "english", name: language === 'pt' ? "Aprendendo Inglês" : language === 'en' ? "Learning English" : "Aprendiendo Inglés", icon: Languages, isLink: true, linkTo: "/languages?tab=english" },
    { id: "spanish", name: language === 'pt' ? "Aprendendo Espanhol" : language === 'en' ? "Learning Spanish" : "Aprendiendo Español", icon: Languages, isLink: true, linkTo: "/languages?tab=spanish" },
    { id: "quando-chora", name: language === 'pt' ? "Quando a Criança Chora" : language === 'en' ? "When the Child Cries" : "Cuando el Niño Llora", icon: Baby, dataCategory: "affection", dataSubCategory: "quando-chora" },
    { id: "entrevista", name: language === 'pt' ? "Entrevista com a Criança" : language === 'en' ? "Interview with the Child" : "Entrevista con el Niño", icon: MessageCircleQuestion, dataCategory: "affection", dataSubCategory: "entrevista" },
    { id: "sounds", name: language === 'pt' ? "Sons de Catarina" : language === 'en' ? "Catarina's Sounds" : "Sonidos de Catarina", icon: Mic },
    { id: "myPhrases", name: t.library.categories.myPhrases || "Minhas Frases", icon: Sparkles, premium: true },
  ];

  const subCategoryDefinitions: Record<string, SubCategory[]> = {
    education: [
      { id: "arco-iris", name: "Arco-Íris", icon: Rainbow },
      { id: "numeros", name: "Números", icon: Hash },
      { id: "animais", name: "Animais", icon: PawPrint },
      { id: "partes-do-corpo", name: "Partes do Corpo", icon: Brain },
      { id: "cores", name: "Cores", icon: Palette },
      { id: "formas-geometricas", name: "Formas Geométricas", icon: Shapes },
      { id: "outros-temas", name: "Outros Temas", icon: Lightbulb },
    ],
    playtime: [
      { id: "encontre", name: "Encontre", icon: SearchIcon },
      { id: "imitacao", name: "Imitação", icon: Copy },
      { id: "partes-do-corpo", name: "Partes do Corpo", icon: Brain },
      { id: "caretas", name: "Caretas", icon: Smile },
    ],
    prayers: [
      { id: "santo-anjo", name: "Santo Anjo", icon: HandHeart },
      { id: "pai-nosso", name: "Pai Nosso", icon: HandHeart },
      { id: "sao-longuinho", name: "São Longuinho", icon: Eye },
    ],
    stories: [
      { id: "introducao-historias", name: "Introdução", icon: BookOpen },
      { id: "tres-porquinhos", name: "Os Três Porquinhos", icon: BookHeart },
      { id: "chapeuzinho-vermelho", name: "Chapeuzinho Vermelho", icon: BookHeart },
      { id: "galinha-ruiva", name: "A Galinha Ruiva", icon: BookHeart },
      { id: "coelhinho-pascoa", name: "O Coelhinho da Páscoa", icon: BookHeart },
      { id: "leao-e-ratinho", name: "O Leão e o Ratinho", icon: BookHeart },
      { id: "sapo-bocarrao", name: "O Sapo Bocarrão", icon: BookHeart },
      { id: "nuvem-dividir", name: "A Nuvem que Aprendeu a Dividir", icon: BookHeart },
      { id: "ursinho-esperar", name: "O Ursinho que Não Gostava de Esperar", icon: BookHeart },
      { id: "coelhinha-verdade", name: "A Coelhinha que Falou a Verdade", icon: BookHeart },
      { id: "leao-gentil", name: "O Leão que Aprendeu a Ser Gentil", icon: BookHeart },
      { id: "dragao-raiva", name: "O Dragão que Aprendeu a Controlar a Raiva", icon: BookHeart },
      { id: "macaquinho-brinquedos", name: "O Macaquinho que Não Guardava os Brinquedos", icon: BookHeart },
      { id: "lebre-tartaruga", name: "A Lebre e a Tartaruga", icon: BookHeart },
      { id: "branca-de-neve", name: "Branca de Neve", icon: BookHeart },
      { id: "aladim", name: "Aladim", icon: BookHeart },
      { id: "cinderela", name: "Cinderela", icon: BookHeart },
      { id: "pinoquio", name: "Pinóquio", icon: BookHeart },
      { id: "viloes-aprender", name: "Os Vilões Resolveram Aprender", icon: BookHeart },
      { id: "grande-baile", name: "O Grande Baile da Floresta", icon: BookHeart },
      { id: "jardim-eden", name: "O Jardim do Éden", icon: BookHeart },
      { id: "sementinha-corajosa", name: "A Sementinha Corajosa", icon: BookHeart },
      { id: "tartaruga-apressada", name: "A Tartaruga Apressada", icon: BookHeart },
      { id: "princesa-escola", name: "A Princesa que Foi para a Escola", icon: BookHeart },
      { id: "lapis-magico", name: "O Lápis Mágico da Escola", icon: BookHeart },
      { id: "pirata-tesouros", name: "O Pirata que Procurava Tesouros", icon: BookHeart },
      { id: "astronauta-estrelas", name: "O Astronauta que Conversava com Estrelas", icon: BookHeart },
    ],
    poems: [
      { id: "introducao-poemas", name: "Introdução", icon: Feather },
      { id: "dedinhos", name: "Dedinhos", icon: Feather },
      { id: "batatinha", name: "Batatinha", icon: Feather },
      { id: "uni-duni", name: "Uni Duni", icon: Feather },
      { id: "1-2-3", name: "1, 2, 3...", icon: Feather },
      { id: "sou-pequena", name: "Sou Pequena", icon: Feather },
      { id: "mamae-papai", name: "Mamãe e Papai", icon: Feather },
      { id: "rei-capitao", name: "Rei Capitão", icon: Feather },
      { id: "casinha-vo", name: "Casinha da Vó", icon: Feather },
      { id: "bruxinha", name: "Bruxinha", icon: Feather },
      { id: "galinha", name: "Galinha", icon: Feather },
      { id: "colo", name: "Colo", icon: Feather },
    ],
    songs: [
      { id: "introducao-musicas", name: "Introdução", icon: Music },
      { id: "ciranda", name: "Ciranda Cirandinha", icon: Music },
      { id: "abraco", name: "Abraço", icon: Music },
      { id: "barata", name: "Barata", icon: Music },
      { id: "alecrim", name: "Alecrim", icon: Music },
      { id: "pombinha-branca", name: "Pombinha Branca", icon: Music },
      { id: "indiozinho", name: "Indiozinho", icon: Music },
      { id: "numero-zero", name: "Número Zero", icon: Music },
      { id: "mestre-andre", name: "Mestre André", icon: Music },
      { id: "boi-cara-preta", name: "Boi da Cara Preta", icon: Music },
      { id: "bota-aqui", name: "Bota Aqui", icon: Music },
      { id: "requebradinha", name: "Requebradinha", icon: Music },
      { id: "borboletas", name: "As Borboletas", icon: Music },
      { id: "achou", name: "Achou", icon: Music },
      { id: "dedinhos-musica", name: "Dedinhos", icon: Music },
      { id: "parabens", name: "Parabéns", icon: Music },
      { id: "casinha", name: "Casinha", icon: Music },
      { id: "vira-virou", name: "Vira Virou", icon: Music },
      { id: "estatua", name: "Estátua", icon: Music },
      { id: "banho", name: "Banho", icon: Music },
      { id: "parque", name: "Parque", icon: Music },
      { id: "guarda", name: "Guarda", icon: Music },
      { id: "lanchinho", name: "Meu Lanchinho", icon: Music },
    ],
  };

  const hasSubCategories = useCallback((categoryId: string) => !!subCategoryDefinitions[categoryId], [subCategoryDefinitions]);

  // Get prerecorded phrases from translations
  const samplePhrases: Phrase[] = useMemo(() => t.library.prerecordedPhrases.map((phrase, index) => {
    const categoryMap: Record<string, string> = {
      routine: 'daily',
      bedtime: 'daily',
      meals: 'daily',
      bath: 'daily',
      languages: 'education',
    };
    const mappedCategory = categoryMap[phrase.category] || phrase.category;
    const timeOfDayOptions: Array<'morning' | 'afternoon' | 'night'> = ['morning', 'afternoon', 'night'];
    const timeOfDay = phrase.timeOfDay as 'morning' | 'afternoon' | 'night' || timeOfDayOptions[index % 3];
    const phraseKey = `${language}_${mappedCategory}_${index}`;

    return {
      id: `phrase-${index}`,
      text: phrase.text,
      category: mappedCategory,
      timeOfDay,
      subCategory: (phrase as { subCategory?: string }).subCategory,
      soundPrompt: (phrase as { soundPrompt?: string }).soundPrompt,
      phraseKey,
    };
  }), [language, t.library.prerecordedPhrases]);

  const getSubCategoryPhraseCount = useCallback((categoryId: string, subId: string) => {
    return samplePhrases.filter(p => p.category === categoryId && p.subCategory === subId).length;
  }, [samplePhrases]);

  const isGenerating = isGeneratingTTS || isGeneratingSFX || isGeneratingSong || pausableAudio.isLoading;

  const handlePlayPhrase = useCallback(async (phrase: Phrase) => {
    if (playingId === phrase.id) {
      if (pausableAudio.isPlaying) {
        pausableAudio.stop();
      } else if (audioPlayer.isPlaying) {
        audioPlayer.pause();
      }
      setPlayingId(null);
      return;
    }

    pausableAudio.stop();
    audioPlayer.stop();

    try {
      setPlayingId(phrase.id);

      if (hasPauseMarkers(phrase.text)) {
        pausableAudio.play(phrase.text);
        return;
      }

      if (phrase.phraseKey) {
        const preloadedUrl = getAudioUrl(phrase.phraseKey);
        if (preloadedUrl) {
          await audioPlayer.play(preloadedUrl);
          return;
        }
      }

      if (phrase.category === 'sounds' && phrase.soundPrompt) {
        const { url } = await generateSFX({ prompt: phrase.soundPrompt, duration: 10 });
        if (url) {
          await audioPlayer.play(url);
        }
      } else if (phrase.category === 'songs') {
        // Sing the song using ElevenLabs Music API
        const { url } = await generateSong({
          text: phrase.text,
          style: 'nursery',
          language: language as 'pt' | 'en' | 'es',
        });
        if (url) {
          await audioPlayer.play(url);
        }
      } else {
        const { url } = await generateTTS({ text: phrase.text });
        if (url) {
          await audioPlayer.play(url);
        }
        if (phrase.soundPrompt && phrase.category !== 'sounds') {
          const { url: sfxUrl } = await generateSFX({ prompt: phrase.soundPrompt, duration: 10 });
          if (sfxUrl) {
            await audioPlayer.play(sfxUrl);
          }
        }
      }
    } catch (error) {
      console.error('Error playing phrase:', error);
      setPlayingId(null);
    }
  }, [playingId, pausableAudio, audioPlayer, generateSFX, generateSong, generateTTS, language, getAudioUrl]);

  const handleToggleFavorite = useCallback((phrase: Phrase) => {
    toggleFavorite({
      id: phrase.id,
      text: phrase.text,
      category: phrase.category,
      source: 'library',
      durationMinutes: 1,
    });
  }, [toggleFavorite]);

  // Get phrase count for a top-level category
  const getPhrasesForCategory = useCallback((cat: Category) => {
    if (cat.dataCategory && cat.dataSubCategory) {
      return samplePhrases.filter(p => p.category === cat.dataCategory && p.subCategory === cat.dataSubCategory);
    }
    if (cat.dataCategory && cat.dataTimeOfDay) {
      return samplePhrases.filter(p => p.category === cat.dataCategory && p.timeOfDay === cat.dataTimeOfDay);
    }
    return samplePhrases.filter(p => p.category === cat.id);
  }, [samplePhrases]);

  // Filtered phrases for selected category
  const filteredPhrases = useMemo(() => selectedCategory
    ? samplePhrases.filter(phrase => {
        // Virtual category filtering
        if (selectedCategory.dataCategory) {
          const matchesCat = phrase.category === selectedCategory.dataCategory;
          const matchesSub = selectedCategory.dataSubCategory ? phrase.subCategory === selectedCategory.dataSubCategory : true;
          const matchesTime = selectedCategory.dataTimeOfDay ? phrase.timeOfDay === selectedCategory.dataTimeOfDay : true;
          const matchesSearch = searchQuery ? phrase.text.toLowerCase().includes(searchQuery.toLowerCase()) : true;
          return matchesCat && matchesSub && matchesTime && matchesSearch;
        }
        // Regular category filtering
        const matchesCategory = phrase.category === selectedCategory.id;
        const matchesSub = selectedSubCategory ? phrase.subCategory === selectedSubCategory : true;
        const matchesSearch = searchQuery ? phrase.text.toLowerCase().includes(searchQuery.toLowerCase()) : true;
        return matchesCategory && matchesSub && matchesSearch;
      })
    : [], [selectedCategory, samplePhrases, selectedSubCategory, searchQuery]);
    : [], [selectedCategory, samplePhrases, selectedSubCategory, searchQuery]);

  // Preload audio for visible phrases in selected category for instant playback
  // Skip categories that use different APIs (songs, sounds, sfx)
  useEffect(() => {
    if (!selectedCategory) return;
    const skipCategories = ['songs', 'sounds'];
    const catId = selectedCategory.dataCategory || selectedCategory.id;
    if (skipCategories.includes(catId)) return;

    const toPreload = filteredPhrases
      .filter(p => !hasPauseMarkers(p.text) && !p.phraseKey)
      .slice(0, 20)
      .map(p => ({ text: p.text, language }));

    if (toPreload.length > 0) {
      preloadMany(toPreload, { delayMs: 200, maxConcurrent: 2 });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategory, selectedSubCategory, language]);
  // Category detail view (like routine detail)
  if (selectedCategory && selectedCategory.id === "myPhrases") {
    return (
      <PageTransition>
        <div className="min-h-screen bg-gradient-to-br from-muted via-background to-accent/10">
          <header className="sticky top-0 z-50 glass border-b border-border/50 backdrop-blur-lg">
            <div className="container mx-auto px-4 py-4">
              <div className="flex items-center gap-3">
                <Button variant="ghost" size="icon" onClick={() => setSelectedCategory(null)}>
                  <ArrowLeft className="w-5 h-5" />
                </Button>
                <div>
                  <h1 className="text-xl font-bold">{selectedCategory.name}</h1>
                  <p className="text-xs text-muted-foreground">
                    {savedPhrases.length} {savedPhrases.length === 1
                      ? (language === 'pt' ? 'frase' : language === 'en' ? 'phrase' : 'frase')
                      : (language === 'pt' ? 'frases' : language === 'en' ? 'phrases' : 'frases')}
                  </p>
                </div>
              </div>
            </div>
          </header>

          <main className="container mx-auto px-4 py-6 max-w-2xl space-y-6">
            {!canAccessMyPhrases ? (
              <PremiumGate featureName={selectedCategory.name} />
            ) : loadingSaved ? (
              <div className="text-center py-12">
                <Loader2 className="w-8 h-8 mx-auto text-primary animate-spin mb-4" />
                <p className="text-muted-foreground">
                  {language === 'pt' ? 'Carregando suas frases...' :
                   language === 'en' ? 'Loading your phrases...' :
                   'Cargando tus frases...'}
                </p>
              </div>
            ) : savedPhrases.length === 0 ? (
              <Card className="p-8 text-center border-2 border-dashed">
                <Sparkles className="w-16 h-16 mx-auto mb-4 text-muted-foreground/50" />
                <p className="text-muted-foreground mb-4">
                  {language === 'pt' ? 'Você ainda não criou nenhuma frase' :
                   language === 'en' ? 'You haven\'t created any phrases yet' :
                   'Aún no has creado ninguna frase'}
                </p>
                <Link to="/create">
                  <Button className="gap-2">
                    <Plus className="w-4 h-4" />
                    {language === 'pt' ? 'Criar Frase' :
                     language === 'en' ? 'Create Phrase' :
                     'Crear Frase'}
                  </Button>
                </Link>
              </Card>
            ) : (
              <div className="space-y-2">
                {savedPhrases.map((phrase, index) => (
                  <Card
                    key={phrase.id}
                    className="p-4 border-2 hover-lift animate-fade-in"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <div className="flex items-start gap-3">
                      <PlayButton
                        isPlaying={playingId === phrase.id && audioPlayer.isPlaying}
                        isLoading={isGenerating && playingId === phrase.id}
                        onPlay={async () => {
                          if (playingId === phrase.id && audioPlayer.isPlaying) {
                            audioPlayer.pause();
                            setPlayingId(null);
                            return;
                          }
                          try {
                            setPlayingId(phrase.id);
                            if (phrase.audioUrl) {
                              await audioPlayer.play(phrase.audioUrl);
                            } else {
                              const { url } = await generateTTS({ text: phrase.text, language: phrase.language as 'pt' | 'en' | 'es' });
                              if (url) {
                                await audioPlayer.play(url);
                              }
                            }
                          } catch (error) {
                            console.error('Error playing saved phrase:', error);
                            setPlayingId(null);
                          }
                        }}
                        onPause={audioPlayer.pause}
                        variant="secondary"
                        size="icon"
                        className="flex-shrink-0"
                      />

                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium mb-1 break-words">{phrase.text}</p>
                        <Badge variant="secondary" className="text-xs">
                          {phrase.language === 'pt' ? 'Português' :
                           phrase.language === 'en' ? 'English' : 'Español'}
                        </Badge>
                      </div>

                      <Button size="icon" variant="ghost" className="flex-shrink-0" onClick={() => toggleSavedFavorite(phrase.id)}>
                        <Star className={cn("w-5 h-5", phrase.isFavorite && "fill-highlight text-highlight")} />
                      </Button>

                      <Button size="icon" variant="ghost" className="flex-shrink-0 text-destructive hover:text-destructive" onClick={() => removePhrase(phrase.id)}>
                        <Trash2 className="w-5 h-5" />
                      </Button>

                      <PhraseOptionsMenu phraseId={phrase.id} phraseText={phrase.text} phraseSource="saved" />
                    </div>

                    {playingId === phrase.id && audioPlayer.duration > 0 && (
                      <AudioControls
                        volume={audioPlayer.volume}
                        playbackRate={audioPlayer.playbackRate}
                        currentTime={audioPlayer.currentTime}
                        duration={audioPlayer.duration}
                        onVolumeChange={audioPlayer.setVolume}
                        onPlaybackRateChange={audioPlayer.setPlaybackRate}
                        onSeek={audioPlayer.seek}
                        className="mt-3"
                      />
                    )}
                  </Card>
                ))}
              </div>
            )}

            {/* Add Phrase Button */}
            {canAccessMyPhrases && (
              <Link to="/create">
                <Card className="p-4 border-2 border-dashed cursor-pointer hover:bg-muted/50 transition-colors">
                  <div className="flex items-center justify-center gap-2 text-muted-foreground">
                    <Plus className="w-5 h-5" />
                    <span>{language === 'pt' ? 'Criar Frase' : language === 'en' ? 'Create Phrase' : 'Crear Frase'}</span>
                  </div>
                </Card>
              </Link>
            )}

            <div className="h-20" />
          </main>
        </div>
      </PageTransition>
    );
  }

  // Categories with sub-categories (education, playtime, prayers, stories)
  if (selectedCategory && hasSubCategories(selectedCategory.id) && !selectedSubCategory) {
    const subs = subCategoryDefinitions[selectedCategory.id];
    const CatIcon = selectedCategory.icon;
    return (
      <PageTransition>
        <div className="min-h-screen bg-gradient-to-br from-muted via-background to-accent/10">
          <header className="sticky top-0 z-50 glass border-b border-border/50 backdrop-blur-lg">
            <div className="container mx-auto px-4 py-4">
              <div className="flex items-center gap-3">
                <Button variant="ghost" size="icon" onClick={() => { setSelectedCategory(null); }}>
                  <ArrowLeft className="w-5 h-5" />
                </Button>
                <div>
                  <h1 className="text-xl font-bold flex items-center gap-2">
                    {CatIcon && <CatIcon className="w-5 h-5" />}
                    {selectedCategory.name}
                  </h1>
                  <p className="text-xs text-muted-foreground">
                    {language === 'pt' ? 'Escolha uma subcategoria' : language === 'en' ? 'Choose a subcategory' : 'Elige una subcategoría'}
                  </p>
                </div>
              </div>
            </div>
          </header>

          <main className="container mx-auto px-4 py-6 max-w-2xl space-y-6">
            <div className="space-y-3">
              {subs.map((sub, index) => {
                const count = getSubCategoryPhraseCount(selectedCategory.id, sub.id);
                const SubIcon = sub.icon;
                return (
                  <Card
                    key={sub.id}
                    className="p-4 border-2 cursor-pointer hover-lift animate-fade-in transition-all"
                    style={{ animationDelay: `${index * 0.05}s` }}
                    onClick={() => setSelectedSubCategory(sub.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-secondary to-accent flex items-center justify-center">
                          <SubIcon className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold">{sub.name}</h3>
                          <p className="text-xs text-muted-foreground">
                            {count} {count === 1
                              ? (language === 'pt' ? 'frase' : language === 'en' ? 'phrase' : 'frase')
                              : (language === 'pt' ? 'frases' : language === 'en' ? 'phrases' : 'frases')}
                          </p>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-muted-foreground" />
                    </div>
                  </Card>
                );
              })}
            </div>
            <div className="h-20" />
          </main>
        </div>
      </PageTransition>
    );
  }

  // Category detail view (regular categories)
  if (selectedCategory) {
    const backAction = selectedSubCategory
      ? () => { setSelectedSubCategory(null); setSearchQuery(""); }
      : () => { setSelectedCategory(null); setSearchQuery(""); };
    const headerTitle = selectedSubCategory && subCategoryDefinitions[selectedCategory.id]
      ? subCategoryDefinitions[selectedCategory.id].find(s => s.id === selectedSubCategory)?.name || selectedCategory.name
      : selectedCategory.name;

    return (
      <PageTransition>
        <div className="min-h-screen bg-gradient-to-br from-muted via-background to-accent/10">
          <header className="sticky top-0 z-50 glass border-b border-border/50 backdrop-blur-lg">
            <div className="container mx-auto px-4 py-4">
              <div className="flex items-center gap-3">
                <Button variant="ghost" size="icon" onClick={backAction}>
                  <ArrowLeft className="w-5 h-5" />
                </Button>
                <div>
                  <h1 className="text-xl font-bold flex items-center gap-2">
                    {selectedCategory.icon && <selectedCategory.icon className="w-5 h-5" />}
                    {headerTitle}
                  </h1>
                  <p className="text-xs text-muted-foreground">
                    {filteredPhrases.length} {t.library.phrasesFound}
                  </p>
                </div>
              </div>
            </div>
          </header>

          <main className="container mx-auto px-4 py-6 max-w-2xl space-y-6">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder={t.library.searchPlaceholder}
                className="pl-10 h-12 rounded-xl border-2"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Auto Play */}
            <AutoPlayControls
              phrases={filteredPhrases.map(p => ({ id: p.id, text: getTextWithoutPauses(p.text) }))}
              sequentialPlayer={sequentialPlayer}
            />

            {/* Phrases */}
            <div className="space-y-2">
              {filteredPhrases.map((phrase, index) => {
                const isAutoPlaying = sequentialPlayer.isPlaying && sequentialPlayer.currentPhraseId === phrase.id;
                return (
                  <PhraseItem 
                    key={phrase.id}
                    phrase={phrase}
                    index={index}
                    isPlaying={playingId === phrase.id && (audioPlayer.isPlaying || pausableAudio.isPlaying)}
                    isLoading={isGenerating && playingId === phrase.id}
                    isAutoPlaying={isAutoPlaying}
                    isPaused={pausableAudio.isPaused}
                    pauseTimeRemaining={pausableAudio.pauseTimeRemaining}
                    isFavorite={isFavorite(phrase.id)}
                    onPlay={handlePlayPhrase}
                    onPause={() => {
                      pausableAudio.stop();
                      audioPlayer.pause();
                      setPlayingId(null);
                    }}
                    onToggleFavorite={handleToggleFavorite}
                    duration={audioPlayer.duration}
                    audioControlsProps={{
                      volume: audioPlayer.volume,
                      playbackRate: audioPlayer.playbackRate,
                      currentTime: audioPlayer.currentTime,
                      duration: audioPlayer.duration,
                      onVolumeChange: audioPlayer.setVolume,
                      onPlaybackRateChange: audioPlayer.setPlaybackRate,
                      onSeek: audioPlayer.seek,
                    }}
                  />
                );
              })}
            </div>

            <div className="h-20" />
          </main>
        </div>
      </PageTransition>
    );
  }

  // Categories list view (like routines list)
  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-br from-muted via-background to-accent/10">
        <header className="sticky top-0 z-50 glass border-b border-border/50 backdrop-blur-lg">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" onClick={() => navigate('/')}>
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="text-xl font-bold flex items-center gap-2">
                  <BookOpenText className="w-5 h-5" />
                  {t.library.title}
                </h1>
                <p className="text-xs text-muted-foreground">{t.library.subtitle}</p>
              </div>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-6 max-w-2xl space-y-6">
          {/* Categories as cards */}
          <div className="space-y-3">
            {categories.map((cat, index) => {
              const phraseCount = cat.id === "myPhrases"
                ? savedPhrases.length
                : cat.id === "english"
                ? englishPhrasesData.length
                : cat.id === "spanish"
                ? spanishPhrasesData.length
                : getPhrasesForCategory(cat).length;
              const IconComp = cat.icon;

              return (
                <Card
                  key={cat.id}
                  className={cn(
                    "p-4 border-2 cursor-pointer hover-lift animate-fade-in transition-all",
                    cat.premium && !canAccessMyPhrases && "opacity-60"
                  )}
                  style={{ animationDelay: `${index * 0.05}s` }}
                  onClick={() => {
                    if (cat.isLink && cat.linkTo) {
                      navigate(cat.linkTo);
                    } else if (cat.premium && !canAccessMyPhrases) {
                      setSelectedCategory(cat);
                    } else {
                      setSelectedCategory(cat);
                    }
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-secondary to-accent flex items-center justify-center">
                        {IconComp && <IconComp className="w-5 h-5 text-white" />}
                      </div>
                      <div>
                        <h3 className="font-semibold flex items-center gap-2">
                          {cat.name}
                          {cat.premium && !canAccessMyPhrases && <Lock className="w-3 h-3 text-muted-foreground" />}
                        </h3>
                        <p className="text-xs text-muted-foreground">
                          {phraseCount} {phraseCount === 1
                            ? (language === 'pt' ? 'frase' : language === 'en' ? 'phrase' : 'frase')
                            : (language === 'pt' ? 'frases' : language === 'en' ? 'phrases' : 'frases')}
                        </p>
                      </div>
                    </div>

                    <ChevronRight className="w-5 h-5 text-muted-foreground" />
                  </div>
                </Card>
              );
            })}
          </div>

          <div className="h-20" />
        </main>
      </div>
    </PageTransition>
  );
};

export default Library;
