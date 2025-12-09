import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Play, Heart, Clock, Sun, Sunset, Moon, BookOpen, Sparkles, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAudioPlayer } from "@/hooks/useAudioPlayer";
import { useTextToSpeech } from "@/hooks/useTextToSpeech";
import { useLanguage } from "@/contexts/LanguageContext";
import { getTranslations } from "@/translations";
import { AudioControls } from "@/components/audio/AudioControls";
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
  { id: "all", name: "categories.all", icon: Sparkles, color: "from-purple-100 to-pink-100" },
  { id: "routine", name: "categories.routine", icon: Clock, color: "from-blue-100 to-cyan-100" },
  { id: "motivation", name: "categories.motivation", icon: Heart, color: "from-rose-100 to-pink-100" },
  { id: "educational", name: "categories.educational", icon: GraduationCap, color: "from-amber-100 to-yellow-100" },
];

export default function DailyPhrases() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedTime, setSelectedTime] = useState("all");
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [currentPhrase, setCurrentPhrase] = useState<Phrase | null>(null);

  const audioPlayer = useAudioPlayer();
  const { audioUrl, isGenerating, generate } = useTextToSpeech();
  const { language } = useLanguage();
  const t = getTranslations(language);

  // Get phrases from translations and add isFavorite state
  const phrases = useMemo(() => {
    const translatedPhrases = (t.dailyPhrases as any).phrases || [];
    return translatedPhrases.map((p: any) => ({
      ...p,
      isFavorite: favorites.has(p.id),
    })) as Phrase[];
  }, [t.dailyPhrases, favorites]);

  const toggleFavorite = (id: string) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(id)) {
        newFavorites.delete(id);
        toast.success(t.dailyPhrases.removedFromFavorites);
      } else {
        newFavorites.add(id);
        toast.success(t.dailyPhrases.addedToFavorites);
      }
      return newFavorites;
    });
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

  const getCategoryLabel = (category: string) => {
    const parts = t.dailyPhrases.categories as any;
    return parts[category] || category;
  };

  const getTimeLabel = (time: string) => {
    const parts = t.dailyPhrases.timePeriods as any;
    return parts[time] || time;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-purple-100 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/">
            <Button variant="ghost" size="icon" className="hover:bg-purple-100">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
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
              <CardContent className={`p-4 bg-gradient-to-br ${category.color}`}>
                <div className="flex flex-col items-center text-center gap-2">
                  <category.icon className="h-8 w-8 text-primary" />
                  <span className="font-semibold text-sm">{getCategoryLabel(category.id)}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Phrases List */}
        <div className="space-y-4">
          {filteredPhrases.length === 0 ? (
            <Card className="p-8 text-center">
              <p className="text-gray-500">{t.dailyPhrases.noPhrasesFound}</p>
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
                      <p className="text-lg text-gray-800 mb-3">{phrase.text}</p>
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
                      onClick={() => toggleFavorite(phrase.id)}
                      className="hover:bg-pink-100"
                    >
                      <Heart
                        className={`h-5 w-5 ${
                          favorites.has(phrase.id) ? "fill-pink-500 text-pink-500" : "text-gray-400"
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
          <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-purple-100 shadow-lg p-4">
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
