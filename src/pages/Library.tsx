import { useState } from "react";
import { PageTransition } from "@/components/PageTransition";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Phrase {
  id: string;
  text: string;
  category: string;
  timeOfDay?: 'morning' | 'afternoon' | 'night';
  soundPrompt?: string;
  phraseKey?: string; // Key for preloaded audio lookup
}

const Library = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  
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

  // Categories with Languages as a link
  const categories = [
    { id: "all", name: t.library.categories.all || "Todas", icon: null },
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

  // Get prerecorded phrases from translations with timeOfDay
  const samplePhrases: Phrase[] = t.library.prerecordedPhrases.map((phrase, index) => {
    // Map old categories to new ones
    const categoryMap: Record<string, string> = {
      routine: 'daily',
      bedtime: 'daily',
      meals: 'daily',
      bath: 'daily',
      languages: 'education',
    };
    const mappedCategory = categoryMap[phrase.category] || phrase.category;
    
    // Use timeOfDay from phrase if available, otherwise assign based on index
    const timeOfDayOptions: Array<'morning' | 'afternoon' | 'night'> = ['morning', 'afternoon', 'night'];
    const timeOfDay = phrase.timeOfDay as 'morning' | 'afternoon' | 'night' || timeOfDayOptions[index % 3];
    
    // Generate phraseKey for preloaded audio lookup
    const phraseKey = `${language}_${mappedCategory}_${index}`;
    
    return {
      id: `phrase-${index}`,
      text: phrase.text,
      category: mappedCategory,
      timeOfDay,
      soundPrompt: (phrase as { soundPrompt?: string }).soundPrompt,
      phraseKey,
    };
  });

  // Combined loading state
  const isGenerating = isGeneratingTTS || isGeneratingSFX || pausableAudio.isLoading;

  const handlePlayPhrase = async (phrase: Phrase) => {
    // If currently playing this phrase, stop it
    if (playingId === phrase.id) {
      if (pausableAudio.isPlaying) {
        pausableAudio.stop();
      } else if (audioPlayer.isPlaying) {
        audioPlayer.pause();
      }
      setPlayingId(null);
      return;
    }

    // Stop any current playback
    pausableAudio.stop();
    audioPlayer.stop();

    try {
      setPlayingId(phrase.id);
      
      // Check if phrase has pause markers - use pausable audio for these
      if (hasPauseMarkers(phrase.text)) {
        pausableAudio.play(phrase.text, language as 'pt' | 'en' | 'es');
        return;
      }
      
      // First check for preloaded audio (instant playback)
      if (phrase.phraseKey) {
        const preloadedUrl = getAudioUrl(phrase.phraseKey);
        if (preloadedUrl) {
          await audioPlayer.play(preloadedUrl);
          return;
        }
      }
      
      // Fallback: Generate on-demand
      // Use sound effects API for sounds category, otherwise use TTS
      if (phrase.category === 'sounds' && phrase.soundPrompt) {
        const { url } = await generateSFX({ prompt: phrase.soundPrompt, duration: 10 });
        if (url) {
          await audioPlayer.play(url);
        }
      } else {
        const { url } = await generateTTS({ text: phrase.text, language });
        if (url) {
          await audioPlayer.play(url);
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

  const filteredPhrases = samplePhrases.filter(phrase => {
    const matchesSearch = phrase.text.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || phrase.category === selectedCategory;
    
    // Don't show phrases if "myPhrases" category is selected (handled separately)
    if (selectedCategory === "myPhrases") return false;
    
    return matchesSearch && matchesCategory;
  });

  // Handle premium-only "Minhas Frases" category
  const isMyPhrasesSelected = selectedCategory === "myPhrases";

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-br from-muted via-background to-accent/10">
        {/* Header */}
        <header className="sticky top-0 z-50 glass border-b border-border/50 backdrop-blur-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-xl font-bold">{t.library.title}</h1>
              <p className="text-xs text-muted-foreground">{t.library.subtitle}</p>
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

        {/* Categories Tabs */}
        <Tabs value={selectedCategory} onValueChange={(value) => {
          const cat = categories.find(c => c.id === value);
          if (cat && (cat as any).isLink && (cat as any).linkTo) {
            navigate((cat as any).linkTo);
          } else {
            setSelectedCategory(value);
          }
        }}>
          <TabsList className="w-full h-auto flex flex-wrap gap-2 bg-transparent p-0 justify-start">
            {categories.map(cat => (
              <TabsTrigger
                key={cat.id}
                value={cat.id}
                disabled={(cat as any).premium && !canAccessMyPhrases}
                className={cn(
                  "rounded-xl data-[state=active]:bg-primary data-[state=active]:text-primary-foreground flex items-center gap-1",
                  (cat as any).premium && !canAccessMyPhrases && "opacity-50"
                )}
              >
                {cat.icon && <cat.icon className="w-4 h-4" />}
                {(cat as any).premium && !canAccessMyPhrases && <Lock className="w-3 h-3" />}
                {cat.name}
              </TabsTrigger>
            ))}
          </TabsList>

          {/* My Phrases - Premium Gate */}
          {isMyPhrasesSelected && !canAccessMyPhrases && (
            <div className="mt-6">
              <PremiumGate
                featureName={t.library.categories.myPhrases || "Minhas Frases"}
              />
            </div>
          )}

          {/* My Phrases - Premium Content */}
          {isMyPhrasesSelected && canAccessMyPhrases && (
            <div className="mt-6 space-y-3">
              {loadingSaved ? (
                <div className="text-center py-12">
                  <Loader2 className="w-8 h-8 mx-auto text-primary animate-spin mb-4" />
                  <p className="text-muted-foreground">
                    {language === 'pt' ? 'Carregando suas frases...' :
                     language === 'en' ? 'Loading your phrases...' :
                     'Cargando tus frases...'}
                  </p>
                </div>
              ) : savedPhrases.length === 0 ? (
                <div className="text-center py-12">
                  <Sparkles className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground mb-4">
                    {language === 'pt' ? 'Você ainda não criou nenhuma frase' :
                     language === 'en' ? 'You haven\'t created any phrases yet' :
                     'Aún no has creado ninguna frase'}
                  </p>
                  <Link to="/create-phrase">
                    <Button className="gap-2">
                      <Plus className="w-4 h-4" />
                      {language === 'pt' ? 'Criar Frase' :
                       language === 'en' ? 'Create Phrase' :
                       'Crear Frase'}
                    </Button>
                  </Link>
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between px-1">
                    <h3 className="text-sm font-semibold text-muted-foreground">
                      {savedPhrases.length} {savedPhrases.length === 1 ? 
                        (language === 'pt' ? 'frase' : language === 'en' ? 'phrase' : 'frase') :
                        (language === 'pt' ? 'frases' : language === 'en' ? 'phrases' : 'frases')}
                    </h3>
                    <Link to="/create">
                      <Button variant="ghost" size="sm" className="gap-1">
                        <Plus className="w-4 h-4" />
                        {language === 'pt' ? 'Nova Frase' : language === 'en' ? 'New Phrase' : 'Nueva Frase'}
                      </Button>
                    </Link>
                  </div>
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
                            <p className="text-sm font-medium mb-1 break-words">
                              {phrase.text}
                            </p>
                            <Badge variant="secondary" className="text-xs">
                              {phrase.language === 'pt' ? 'Português' : 
                               phrase.language === 'en' ? 'English' : 'Español'}
                            </Badge>
                          </div>

                          <Button
                            size="icon"
                            variant="ghost"
                            className="flex-shrink-0"
                            onClick={() => toggleSavedFavorite(phrase.id)}
                          >
                            <Star 
                              className={cn(
                                "w-5 h-5",
                                phrase.isFavorite && "fill-highlight text-highlight"
                              )}
                            />
                          </Button>

                          <Button
                            size="icon"
                            variant="ghost"
                            className="flex-shrink-0 text-destructive hover:text-destructive"
                            onClick={() => removePhrase(phrase.id)}
                          >
                            <Trash2 className="w-5 h-5" />
                          </Button>

                          <PhraseOptionsMenu
                            phraseId={phrase.id}
                            phraseText={phrase.text}
                            phraseSource="saved"
                          />
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
                </>
              )}
            </div>
          )}

          {/* Phrases List */}
          {!isMyPhrasesSelected && (
            <TabsContent value={selectedCategory} className="space-y-3 mt-6">
              <div className="flex items-center justify-between px-1">
                <h3 className="text-sm font-semibold text-muted-foreground">
                  {filteredPhrases.length} {t.library.phrasesFound}
                </h3>
                {searchQuery && (
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => setSearchQuery("")}
                  >
                    {t.common.clear}
                  </Button>
                )}
              </div>

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
                        <Badge variant="secondary" className="text-xs">
                          {categories.find(c => c.id === phrase.category)?.name || phrase.category}
                        </Badge>
                        
                        {/* Pause indicator */}
                        {playingId === phrase.id && pausableAudio.isPaused && (
                          <div className="mt-2 flex items-center gap-2 text-xs text-primary animate-pulse">
                            <Timer className="w-4 h-4" />
                            <span>
                              {language === 'pt' ? 'Sua vez de falar!' : language === 'en' ? 'Your turn to speak!' : '¡Tu turno de hablar!'} ({pausableAudio.pauseTimeRemaining}s)
                            </span>
                          </div>
                        )}
                      </div>

                      <Button
                        size="icon"
                        variant="ghost"
                        className="flex-shrink-0"
                        onClick={() => handleToggleFavorite(phrase)}
                      >
                        <Star 
                          className={cn(
                            "w-5 h-5",
                            isFavorite(phrase.id) && "fill-highlight text-highlight"
                          )}
                        />
                      </Button>

                      <PhraseOptionsMenu
                        phraseId={phrase.id}
                        phraseText={phrase.text}
                        phraseSource="library"
                      />
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
            </TabsContent>
          )}
        </Tabs>

        <div className="h-20" />
      </main>
      </div>
    </PageTransition>
  );
};

export default Library;
