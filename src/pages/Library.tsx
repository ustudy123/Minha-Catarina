import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAudioPlayer } from "@/hooks/useAudioPlayer";
import { useTextToSpeech } from "@/hooks/useTextToSpeech";
import { useLanguage } from "@/contexts/LanguageContext";
import { getTranslations } from "@/translations";
import { PlayButton } from "@/components/audio/PlayButton";
import { AudioControls } from "@/components/audio/AudioControls";
import { toast } from "sonner";
import {
  Search,
  Play,
  Star,
  ArrowLeft,
  Sunrise,
  Moon,
  Utensils,
  Bath,
  BookOpen,
  Music,
  Heart,
  Globe,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Phrase {
  id: string;
  text: string;
  category: string;
  isFavorite?: boolean;
}

const Library = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [playingId, setPlayingId] = useState<string | null>(null);
  
  const audioPlayer = useAudioPlayer();
  const { generate, isGenerating } = useTextToSpeech();
  const { language } = useLanguage();
  const t = getTranslations(language);

  // Get prerecorded phrases from translations
  const samplePhrases: Phrase[] = t.library.prerecordedPhrases.map((phrase, index) => ({
    id: `phrase-${index}`,
    text: phrase.text,
    category: phrase.category,
    isFavorite: index === 1 || index === 5, // Mark some as favorites by default
  }));

  const [favorites, setFavorites] = useState<string[]>(() => 
    samplePhrases.filter(p => p.isFavorite).map(p => p.id)
  );

  const categories = [
    { id: "routine", name: t.library.categories.routine, icon: Sunrise, color: "from-primary to-highlight" },
    { id: "education", name: t.library.categories.education, icon: BookOpen, color: "from-accent to-secondary" },
    { id: "songs", name: t.library.categories.songs, icon: Music, color: "from-secondary to-primary" },
    { id: "affection", name: t.library.categories.affection, icon: Heart, color: "from-highlight to-accent" },
    { id: "bedtime", name: t.library.categories.bedtime, icon: Moon, color: "from-secondary to-accent" },
    { id: "meals", name: t.library.categories.meals, icon: Utensils, color: "from-primary to-accent" },
    { id: "bath", name: t.library.categories.bath, icon: Bath, color: "from-accent to-highlight" },
    { id: "languages", name: t.library.categories.languages, icon: Globe, color: "from-secondary to-highlight" },
  ];

  const toggleFavorite = (id: string) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  };

  const handlePlayPhrase = async (phrase: Phrase) => {
    if (playingId === phrase.id && audioPlayer.isPlaying) {
      audioPlayer.pause();
      setPlayingId(null);
      return;
    }

    try {
      setPlayingId(phrase.id);
      
      // Generate voice for the phrase
      const { url } = await generate({ 
        text: phrase.text, 
        language
      });
      
      if (url) {
        await audioPlayer.play(url);
      }
    } catch (error) {
      console.error('Error playing phrase:', error);
      setPlayingId(null);
    }
  };

  const filteredPhrases = samplePhrases.filter(phrase => {
    const matchesSearch = phrase.text.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || phrase.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

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
        <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
          <TabsList className="w-full h-auto grid grid-cols-4 gap-2 bg-transparent p-0">
            <TabsTrigger 
              value="all" 
              className="rounded-xl data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              {t.library.all}
            </TabsTrigger>
            {categories.slice(0, 3).map(cat => (
              <TabsTrigger
                key={cat.id}
                value={cat.id}
                className="rounded-xl data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                <cat.icon className="w-4 h-4 mr-1" />
                {cat.name.split(' ')[0]}
              </TabsTrigger>
            ))}
          </TabsList>

          {/* Categories Grid */}
          <div className="grid grid-cols-2 gap-3 mt-4">
            {categories.map((category, index) => (
              <Card
                key={category.id}
                className={cn(
                  "relative overflow-hidden border-2 cursor-pointer group hover-lift",
                  selectedCategory === category.id && "ring-2 ring-primary",
                  "animate-fade-in-scale"
                )}
                style={{ animationDelay: `${index * 0.05}s` }}
                onClick={() => setSelectedCategory(category.id)}
              >
                <div className={cn(
                  "absolute inset-0 bg-gradient-to-br opacity-10 group-hover:opacity-20 transition-opacity",
                  category.color
                )} />
                <div className="relative p-4 flex items-center gap-3">
                  <div className={cn(
                    "w-10 h-10 rounded-xl bg-gradient-to-br flex items-center justify-center",
                    category.color
                  )}>
                    <category.icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm">{category.name}</h3>
                    <p className="text-xs text-muted-foreground">
                      {samplePhrases.filter(p => p.category === category.id).length} {t.library.phrases}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Phrases List */}
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
                      <Badge variant="secondary" className="text-xs">
                        {categories.find(c => c.id === phrase.category)?.name}
                      </Badge>
                    </div>

                    <Button
                      size="icon"
                      variant="ghost"
                      className="flex-shrink-0"
                      onClick={() => toggleFavorite(phrase.id)}
                    >
                      <Star 
                        className={cn(
                          "w-5 h-5",
                          favorites.includes(phrase.id) && "fill-highlight text-highlight"
                        )}
                      />
                    </Button>
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
        </Tabs>

        <div className="h-20" />
      </main>
    </div>
  );
};

export default Library;
