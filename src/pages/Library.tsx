import { useState } from "react";
import { PageTransition } from "@/components/PageTransition";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useAudioPlayer } from "@/hooks/useAudioPlayer";
import { useTextToSpeech } from "@/hooks/useTextToSpeech";
import { useSoundEffects } from "@/hooks/useSoundEffects";
import { useLibraryAudio } from "@/hooks/useLibraryAudio";
import { useLanguage } from "@/contexts/LanguageContext";
import { useFavorites } from "@/hooks/useFavorites";
import { useSubscription } from "@/hooks/useSubscription";
import { useSavedPhrases } from "@/hooks/useSavedPhrases";
import { getTranslations } from "@/translations";
import { PlayButton } from "@/components/audio/PlayButton";
import { usePausableAudio, hasPauseMarkers, getTextWithoutPauses } from "@/hooks/usePausableAudio";
import { AudioControls } from "@/components/audio/AudioControls";
import { AutoPlayControls } from "@/components/AutoPlayControls";
import { useSequentialPlayer, PlayablePhrase } from "@/hooks/useSequentialPlayer";
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
  const { generate: generateSFX, isGenerating: isGeneratingSFX } = useSoundEffects();
  const { getAudioUrl, hasPreloadedAudio } = useLibraryAudio();
  const { language } = useLanguage();
  const { isFavorite, toggleFavorite } = useFavorites();
  const { isPremium, canAccessMyPhrases } = useSubscription();
  const { phrases: savedPhrases, isLoading: loadingSaved, removePhrase, toggleFavorite: toggleSavedFavorite } = useSavedPhrases();
  const t = getTranslations(language);

  const categories: Category[] = [
    { id: "songs", name: t.library.categories.songs || "Músicas", icon: Music },
    { id: "stories", name: t.library.categories.stories || "Histórias", icon: BookOpen },
    { id: "affection", name: t.library.categories.affection || "Carinho", icon: Heart },
    { id: "daily", name: t.library.categories.daily || "Dia a Dia", icon: Sun },
    { id: "education", name: t.library.categories.education || "Educação", icon: GraduationCap },
    { id: "playtime", name: t.library.categories.playtime || "Brincadeiras", icon: Gamepad2 },
    { id: "sounds", name: t.library.categories.sounds || "Sons", icon: Bell },
    { id: "prayers", name: t.library.categories.prayers || "Orações", icon: HandHeart },
    { id: "languages", name: t.library.categories.languagesCategory || "Idiomas", icon: Languages, isLink: true, linkTo: "/languages" },
    { id: "myPhrases", name: t.library.categories.myPhrases || "Minhas Frases", icon: Sparkles, premium: true },
  ];

  // Get prerecorded phrases from translations
  const samplePhrases: Phrase[] = t.library.prerecordedPhrases.map((phrase, index) => {
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
  });

  // Sub-category definitions per category
  const subCategoryDefinitions: Record<string, SubCategory[]> = {
    education: [
      { id: "bons-costumes", name: "Bons Costumes", icon: Award },
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
      { id: "historias", name: "Histórias", icon: BookHeart },
      { id: "poemas", name: "Poemas", icon: Feather },
    ],
  };

  const hasSubCategories = (categoryId: string) => !!subCategoryDefinitions[categoryId];

  const getSubCategoryPhraseCount = (categoryId: string, subId: string) => {
    return samplePhrases.filter(p => p.category === categoryId && p.subCategory === subId).length;
  };

  const isGenerating = isGeneratingTTS || isGeneratingSFX || pausableAudio.isLoading;

  const handlePlayPhrase = async (phrase: Phrase) => {
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
        pausableAudio.play(phrase.text, language as 'pt' | 'en' | 'es');
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
        // Sound-only phrase: just play SFX
        const { url } = await generateSFX({ prompt: phrase.soundPrompt, duration: 10 });
        if (url) {
          await audioPlayer.play(url);
        }
      } else {
        // Generate and play TTS
        const { url } = await generateTTS({ text: phrase.text, language });
        if (url) {
          await audioPlayer.play(url);
        }
        // If phrase has an associated sound effect, play it after TTS
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
  };

  const handleToggleFavorite = (phrase: Phrase) => {
    toggleFavorite({
      id: phrase.id,
      text: phrase.text,
      category: phrase.category,
      source: 'library',
      durationMinutes: 1,
    });
  };

  // Get phrase count per category
  const getPhrasesForCategory = (categoryId: string) => {
    return samplePhrases.filter(p => p.category === categoryId);
  };

  // Filtered phrases for selected category
  const filteredPhrases = selectedCategory
    ? samplePhrases.filter(phrase => {
        const matchesCategory = phrase.category === selectedCategory.id;
        const matchesTime = selectedTimeOfDay ? phrase.timeOfDay === selectedTimeOfDay : true;
        const matchesSub = selectedSubCategory ? phrase.subCategory === selectedSubCategory : true;
        const matchesSearch = searchQuery
          ? phrase.text.toLowerCase().includes(searchQuery.toLowerCase())
          : true;
        return matchesCategory && matchesTime && matchesSub && matchesSearch;
      })
    : [];

  // Time of day sub-categories for "daily"
  const timeOfDaySubCategories = [
    { id: "morning", name: language === 'pt' ? 'Manhã' : language === 'en' ? 'Morning' : 'Mañana', icon: Sun },
    { id: "afternoon", name: language === 'pt' ? 'Tarde' : language === 'en' ? 'Afternoon' : 'Tarde', icon: Sunset },
    { id: "night", name: language === 'pt' ? 'Noite' : language === 'en' ? 'Night' : 'Noche', icon: Moon },
  ];

  const getTimeOfDayPhraseCount = (timeId: string) => {
    return samplePhrases.filter(p => p.category === 'daily' && p.timeOfDay === timeId).length;
  };

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

  // Daily category - show time of day sub-categories
  if (selectedCategory && selectedCategory.id === "daily" && !selectedTimeOfDay) {
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
                    <Sun className="w-5 h-5" />
                    {selectedCategory.name}
                  </h1>
                  <p className="text-xs text-muted-foreground">
                    {language === 'pt' ? 'Escolha o período do dia' : language === 'en' ? 'Choose time of day' : 'Elige el período del día'}
                  </p>
                </div>
              </div>
            </div>
          </header>

          <main className="container mx-auto px-4 py-6 max-w-2xl space-y-6">
            <div className="space-y-3">
              {timeOfDaySubCategories.map((sub, index) => {
                const count = getTimeOfDayPhraseCount(sub.id);
                const SubIcon = sub.icon;
                return (
                  <Card
                    key={sub.id}
                    className="p-4 border-2 cursor-pointer hover-lift animate-fade-in transition-all"
                    style={{ animationDelay: `${index * 0.05}s` }}
                    onClick={() => setSelectedTimeOfDay(sub.id)}
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
    const backAction = selectedCategory.id === "daily" && selectedTimeOfDay
      ? () => { setSelectedTimeOfDay(null); setSearchQuery(""); }
      : selectedSubCategory
      ? () => { setSelectedSubCategory(null); setSearchQuery(""); }
      : () => { setSelectedCategory(null); setSearchQuery(""); };
    const headerTitle = selectedCategory.id === "daily" && selectedTimeOfDay
      ? timeOfDaySubCategories.find(s => s.id === selectedTimeOfDay)?.name || selectedCategory.name
      : selectedSubCategory && subCategoryDefinitions[selectedCategory.id]
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

            {/* Phrases */}
            <div className="space-y-2">
              {filteredPhrases.map((phrase, index) => (
                <Card
                  key={phrase.id}
                  className="p-4 border-2 hover-lift animate-fade-in"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <div className="flex items-start gap-3">
                    <PlayButton
                      isPlaying={playingId === phrase.id && (audioPlayer.isPlaying || pausableAudio.isPlaying)}
                      isLoading={isGenerating && playingId === phrase.id}
                      onPlay={() => handlePlayPhrase(phrase)}
                      onPause={() => {
                        pausableAudio.stop();
                        audioPlayer.pause();
                        setPlayingId(null);
                      }}
                      variant="secondary"
                      size="icon"
                      className="flex-shrink-0"
                    />

                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium mb-1 break-words">
                        {getTextWithoutPauses(phrase.text)}
                      </p>

                      {playingId === phrase.id && pausableAudio.isPaused && (
                        <div className="mt-2 flex items-center gap-2 text-xs text-primary animate-pulse">
                          <Timer className="w-4 h-4" />
                          <span>
                            {language === 'pt' ? 'Sua vez de falar!' : language === 'en' ? 'Your turn to speak!' : '¡Tu turno de hablar!'} ({pausableAudio.pauseTimeRemaining}s)
                          </span>
                        </div>
                      )}
                    </div>

                    <Button size="icon" variant="ghost" className="flex-shrink-0" onClick={() => handleToggleFavorite(phrase)}>
                      <Star className={cn("w-5 h-5", isFavorite(phrase.id) && "fill-highlight text-highlight")} />
                    </Button>

                    <PhraseOptionsMenu phraseId={phrase.id} phraseText={phrase.text} phraseSource="library" />
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
                : getPhrasesForCategory(cat.id).length;
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
