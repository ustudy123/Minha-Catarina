import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAudioPlayer } from "@/hooks/useAudioPlayer";
import { useTextToSpeech } from "@/hooks/useTextToSpeech";
import { useLanguage } from "@/contexts/LanguageContext";
import { useFavorites } from "@/hooks/useFavorites";
import { useSubscription } from "@/hooks/useSubscription";
import { getTranslations } from "@/translations";
import { PlayButton } from "@/components/audio/PlayButton";
import { AudioControls } from "@/components/audio/AudioControls";
import { TimeOfDayFilter } from "@/components/TimeOfDayFilter";
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
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Phrase {
  id: string;
  text: string;
  category: string;
  timeOfDay?: 'morning' | 'afternoon' | 'night';
}

const Library = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedTimeOfDay, setSelectedTimeOfDay] = useState<'all' | 'morning' | 'afternoon' | 'night'>('all');
  const [playingId, setPlayingId] = useState<string | null>(null);
  
  const audioPlayer = useAudioPlayer();
  const { generate, isGenerating } = useTextToSpeech();
  const { language } = useLanguage();
  const { isFavorite, toggleFavorite } = useFavorites();
  const { isPremium, canAccessMyPhrases } = useSubscription();
  const t = getTranslations(language);

  // New 8 categories
  const categories = [
    { id: "all", name: t.library.categories.all || "Todas", icon: null },
    { id: "songs", name: t.library.categories.songs || "Músicas", icon: Music },
    { id: "stories", name: t.library.categories.stories || "Histórias", icon: BookOpen },
    { id: "affection", name: t.library.categories.affection || "Carinho", icon: Heart },
    { id: "daily", name: t.library.categories.daily || "Dia a Dia", icon: Sun },
    { id: "education", name: t.library.categories.education || "Educação", icon: GraduationCap },
    { id: "sounds", name: t.library.categories.sounds || "Sons", icon: Bell },
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
    
    // Assign timeOfDay based on index for demo
    const timeOfDayOptions: Array<'morning' | 'afternoon' | 'night'> = ['morning', 'afternoon', 'night'];
    const timeOfDay = timeOfDayOptions[index % 3];
    
    return {
      id: `phrase-${index}`,
      text: phrase.text,
      category: mappedCategory,
      timeOfDay,
    };
  });

  const handlePlayPhrase = async (phrase: Phrase) => {
    if (playingId === phrase.id && audioPlayer.isPlaying) {
      audioPlayer.pause();
      setPlayingId(null);
      return;
    }

    try {
      setPlayingId(phrase.id);
      const { url } = await generate({ text: phrase.text, language });
      if (url) {
        await audioPlayer.play(url);
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
    });
  };

  const filteredPhrases = samplePhrases.filter(phrase => {
    const matchesSearch = phrase.text.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || phrase.category === selectedCategory;
    const matchesTimeOfDay = selectedTimeOfDay === 'all' || phrase.timeOfDay === selectedTimeOfDay;
    
    // Don't show phrases if "myPhrases" category is selected (handled separately)
    if (selectedCategory === "myPhrases") return false;
    
    return matchesSearch && matchesCategory && matchesTimeOfDay;
  });

  // Handle premium-only "Minhas Frases" category
  const isMyPhrasesSelected = selectedCategory === "myPhrases";

  return (
    <div className="min-h-screen bg-gradient-to-br from-muted via-background to-accent/10">
      {/* Header */}
      <header className="sticky top-0 z-50 glass border-b border-border/50 backdrop-blur-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => window.history.back()}>
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
        {/* Time of Day Filter */}
        <TimeOfDayFilter
          value={selectedTimeOfDay}
          onChange={setSelectedTimeOfDay}
        />

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

        {/* Categories Tabs - 8 new categories */}
        <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
          <TabsList className="w-full h-auto flex flex-wrap gap-2 bg-transparent p-0 justify-start">
            {categories.map(cat => (
              <TabsTrigger
                key={cat.id}
                value={cat.id}
                disabled={cat.premium && !canAccessMyPhrases}
                className={cn(
                  "rounded-xl data-[state=active]:bg-primary data-[state=active]:text-primary-foreground flex items-center gap-1",
                  cat.premium && !canAccessMyPhrases && "opacity-50"
                )}
              >
                {cat.icon && <cat.icon className="w-4 h-4" />}
                {cat.premium && !canAccessMyPhrases && <Lock className="w-3 h-3" />}
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
            <div className="mt-6 text-center py-12">
              <Sparkles className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">
                {language === 'pt' ? 'Suas frases personalizadas aparecerão aqui' :
                 language === 'en' ? 'Your custom phrases will appear here' :
                 'Tus frases personalizadas aparecerán aquí'}
              </p>
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
                        isPlaying={playingId === phrase.id && audioPlayer.isPlaying}
                        isLoading={isGenerating && playingId === phrase.id}
                        onPlay={() => handlePlayPhrase(phrase)}
                        onPause={audioPlayer.pause}
                        variant="secondary"
                        size="icon"
                        className="flex-shrink-0"
                      />
                      
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium mb-1 break-words">
                          {phrase.text}
                        </p>
                        <div className="flex gap-2">
                          <Badge variant="secondary" className="text-xs">
                            {categories.find(c => c.id === phrase.category)?.name || phrase.category}
                          </Badge>
                          {phrase.timeOfDay && (
                            <Badge variant="outline" className="text-xs">
                              {phrase.timeOfDay === 'morning' ? '🌅' : phrase.timeOfDay === 'afternoon' ? '☀️' : '🌙'}
                            </Badge>
                          )}
                        </div>
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
  );
};

export default Library;
