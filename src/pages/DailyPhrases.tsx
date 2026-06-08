import { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import { UserMenu } from "@/components/UserMenu";
import { SpeedSelector } from "@/components/audio/SpeedSelector";
import { LanguageSelector } from "@/components/LanguageSelector";
import { ArrowLeft, Play, Heart, Clock, Sun, Sunset, Moon, BookOpen, Sparkles, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAudioPlayer } from "@/hooks/useAudioPlayer";
import { useTextToSpeech } from "@/hooks/useTextToSpeech";
import { useAudioPreloader } from "@/hooks/useAudioPreloader";
import { useLanguage } from "@/contexts/LanguageContext";
import { getTranslations } from "@/translations";
import { useFavorites } from "@/hooks/useFavorites";
import { AudioControls } from "@/components/audio/AudioControls";
import { AutoPlayControls } from "@/components/AutoPlayControls";
import { useSequentialPlayer } from "@/hooks/useSequentialPlayer";
import { PlayButton } from "@/components/audio/PlayButton";
import { toast } from "sonner";

interface Phrase {
  id: string;
  text: string;
  category: "routine" | "motivation" | "educational";
  timeOfDay: "morning" | "afternoon" | "evening";
  isFavorite: boolean;
}

const timePeriods = [
  { id: "all", name: "timePeriods.all", icon: Sun },
  { id: "morning", name: "timePeriods.morning", icon: Sun },
  { id: "afternoon", name: "timePeriods.afternoon", icon: Sunset },
  { id: "evening", name: "timePeriods.evening", icon: Moon },
];

const categories = [
  { id: "all", name: "categories.all", icon: Sparkles },
  { id: "routine", name: "categories.routine", icon: Clock },
  { id: "motivation", name: "categories.motivation", icon: Heart },
  { id: "educational", name: "categories.educational", icon: GraduationCap },
];

export default function DailyPhrases() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedTime, setSelectedTime] = useState("all");
  const [currentPhrase, setCurrentPhrase] = useState<Phrase | null>(null);

  const audioPlayer = useAudioPlayer();
  const { audioUrl, isGenerating, generate } = useTextToSpeech();
  const { language } = useLanguage();
  const t = getTranslations(language);
  const { isFavorite, toggleFavorite: toggleFav } = useFavorites();
  const sequentialPlayer = useSequentialPlayer();
  const { preloadMany } = useAudioPreloader();

  // Get phrases from translations and add isFavorite state
  const phrases = useMemo(() => {
    const translatedPhrases = (t.dailyPhrases as any).phrases || [];
    return translatedPhrases.map((p: any) => ({
      ...p,
      isFavorite: isFavorite(p.id),
    })) as Phrase[];
  }, [t.dailyPhrases, isFavorite]);

  const handleToggleFavorite = (phrase: Phrase) => {
    const added = toggleFav({
      id: phrase.id,
      text: phrase.text,
      category: phrase.category,
      source: 'library',
      durationMinutes: 1,
    });
    if (added) {
      toast.success(t.dailyPhrases.addedToFavorites);
    } else {
      toast.success(t.dailyPhrases.removedFromFavorites);
    }
  };

  const handlePlayPhrase = async (phrase: Phrase) => {
    if (currentPhrase?.id === phrase.id && audioPlayer.isPlaying) {
      audioPlayer.pause();
      return;
    }

    setCurrentPhrase(phrase);
    
    if (!audioUrl || currentPhrase?.id !== phrase.id) {
      const { url } = await generate({ text: phrase.text, language });
      if (url) {
        await audioPlayer.play(url);
      }
    } else if (audioUrl) {
      await audioPlayer.play(audioUrl);
    }
  };

  const filteredPhrases = phrases.filter(phrase => {
    const matchesSearch = phrase.text.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || phrase.category === selectedCategory;
    const matchesTime = selectedTime === "all" || phrase.timeOfDay === selectedTime;
    return matchesSearch && matchesCategory && matchesTime;
  });

  // Preload audio for visible filtered phrases (max 15) for instant playback
  useEffect(() => {
    const toPreload = filteredPhrases.slice(0, 15).map(p => ({ text: p.text, language }));
    if (toPreload.length > 0) {
      preloadMany(toPreload, { delayMs: 200, maxConcurrent: 2 });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategory, selectedTime, searchQuery, language]);

  const getCategoryLabel = (category: string) => {
    const parts = t.dailyPhrases.categories as any;
    return parts[category] || category;
  };

  const getTimeLabel = (time: string) => {
    const parts = t.dailyPhrases.timePeriods as any;
    return parts[time] || time;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-muted via-background to-accent/10">
      {/* Header */}
      <header className="sticky top-0 z-50 glass border-b border-border/50 backdrop-blur-lg">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/">
            <Button variant="ghost" size="icon" className="hover:bg-muted">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            {t.dailyPhrases.title}
          </h1>
          <div className="w-10" />
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Search */}
        <div className="mb-8">
          <Input
            type="search"
            placeholder={t.dailyPhrases.searchPlaceholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="max-w-md mx-auto"
          />
        </div>

        {/* Time Tabs */}
        <Tabs value={selectedTime} onValueChange={setSelectedTime} className="mb-8">
          <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-4">
            {timePeriods.map((period) => (
              <TabsTrigger key={period.id} value={period.id} className="flex items-center gap-2">
                <period.icon className="h-4 w-4" />
                {getTimeLabel(period.id)}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        {/* Category Filters */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {categories.map((category) => (
            <Card
              key={category.id}
              className={`cursor-pointer transition-all duration-300 border-2 ${
                selectedCategory === category.id
                  ? "border-primary shadow-lg scale-105"
                  : "border-transparent hover:border-primary/50"
              }`}
              onClick={() => setSelectedCategory(category.id)}
            >
              <CardContent className="p-4 bg-muted/50">
                <div className="flex flex-col items-center text-center gap-2">
                  <category.icon className="h-8 w-8 text-primary" />
                  <span className="font-semibold text-sm">{getCategoryLabel(category.id)}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Auto Play */}
        <AutoPlayControls
          phrases={filteredPhrases.map(p => ({ id: p.id, text: p.text }))}
          sequentialPlayer={sequentialPlayer}
        />

        {/* Phrases List */}
        <div className="space-y-4">
          {filteredPhrases.length === 0 ? (
            <Card className="p-8 text-center">
              <p className="text-muted-foreground">{t.dailyPhrases.noPhrasesFound}</p>
            </Card>
          ) : (
            filteredPhrases.map((phrase) => (
              <Card
                key={phrase.id}
                className="hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/30"
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <PlayButton
                      isPlaying={audioPlayer.isPlaying && currentPhrase?.id === phrase.id}
                      isLoading={isGenerating && currentPhrase?.id === phrase.id}
                      onPlay={() => handlePlayPhrase(phrase)}
                      onPause={audioPlayer.pause}
                    />
                    
                    <div className="flex-1">
                      <p className="text-lg text-foreground mb-3">{phrase.text}</p>
                      <div className="flex items-center gap-2 flex-wrap">
                        <Badge variant="secondary" className="capitalize">
                          {getCategoryLabel(phrase.category)}
                        </Badge>
                        <Badge variant="outline" className="capitalize">
                          {getTimeLabel(phrase.timeOfDay)}
                        </Badge>
                      </div>
                    </div>

                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleToggleFavorite(phrase)}
                      className="hover:bg-primary/10"
                    >
                      <Heart
                        className={`h-5 w-5 ${
                          isFavorite(phrase.id) ? "fill-primary text-primary" : "text-muted-foreground"
                        }`}
                      />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Audio Controls */}
        {audioPlayer.isPlaying && audioUrl && (
          <div className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-md border-t border-border shadow-lg p-4">
            <AudioControls
              volume={audioPlayer.volume}
              playbackRate={audioPlayer.playbackRate}
              currentTime={audioPlayer.currentTime}
              duration={audioPlayer.duration}
              onVolumeChange={audioPlayer.setVolume}
              onPlaybackRateChange={audioPlayer.setPlaybackRate}
              onSeek={audioPlayer.seek}
            />
          </div>
        )}
      </main>
    </div>
  );
}
