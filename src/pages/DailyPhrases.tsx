import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Play, Heart, Clock, Sun, Sunset, Moon, BookOpen, Sparkles, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAudioPlayer } from "@/hooks/useAudioPlayer";
import { useTextToSpeech } from "@/hooks/useTextToSpeech";
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

const dailyPhrases: Phrase[] = [
  // Morning Phrases
  { id: "1", text: "Bom dia, meu amor! Hora de acordar com um sorriso!", category: "routine", timeOfDay: "morning", isFavorite: false },
  { id: "2", text: "Você é capaz de fazer coisas incríveis hoje!", category: "motivation", timeOfDay: "morning", isFavorite: false },
  { id: "3", text: "Vamos escovar os dentinhos? Deixa eles brilhando!", category: "routine", timeOfDay: "morning", isFavorite: false },
  { id: "4", text: "Que tal aprender uma palavra nova hoje? Vamos lá!", category: "educational", timeOfDay: "morning", isFavorite: false },
  
  // Afternoon Phrases
  { id: "5", text: "Hora do almoço! Vamos comer bem para crescer forte!", category: "routine", timeOfDay: "afternoon", isFavorite: false },
  { id: "6", text: "Você está se saindo muito bem! Continue assim!", category: "motivation", timeOfDay: "afternoon", isFavorite: false },
  { id: "7", text: "Que tal brincar um pouquinho agora?", category: "routine", timeOfDay: "afternoon", isFavorite: false },
  { id: "8", text: "Vamos contar até 10 juntas? 1, 2, 3...", category: "educational", timeOfDay: "afternoon", isFavorite: false },
  
  // Evening Phrases
  { id: "9", text: "Hora do banho! Vamos ficar cheirosinha!", category: "routine", timeOfDay: "evening", isFavorite: false },
  { id: "10", text: "Você foi incrível hoje! A mamãe está muito orgulhosa!", category: "motivation", timeOfDay: "evening", isFavorite: false },
  { id: "11", text: "Hora de dormir, meu amor. Tenha sonhos lindos!", category: "routine", timeOfDay: "evening", isFavorite: false },
  { id: "12", text: "Vamos agradecer pelo dia de hoje? Obrigada por tudo!", category: "educational", timeOfDay: "evening", isFavorite: false },
];

const categories = [
  { id: "all", name: "Todas", icon: Sparkles, color: "from-purple-100 to-pink-100" },
  { id: "routine", name: "Rotina", icon: Clock, color: "from-blue-100 to-cyan-100" },
  { id: "motivation", name: "Motivação", icon: Heart, color: "from-rose-100 to-pink-100" },
  { id: "educational", name: "Educacional", icon: GraduationCap, color: "from-amber-100 to-yellow-100" },
];

const timePeriods = [
  { id: "all", name: "Todo Dia", icon: Sun },
  { id: "morning", name: "Manhã", icon: Sun },
  { id: "afternoon", name: "Tarde", icon: Sunset },
  { id: "evening", name: "Noite", icon: Moon },
];

export default function DailyPhrases() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedTime, setSelectedTime] = useState("all");
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [phrases, setPhrases] = useState<Phrase[]>(dailyPhrases);
  const [currentPhrase, setCurrentPhrase] = useState<Phrase | null>(null);

  const audioPlayer = useAudioPlayer();
  const { audioUrl, isGenerating, generate } = useTextToSpeech();

  const toggleFavorite = (id: string) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(id)) {
        newFavorites.delete(id);
        toast.success("Removido dos favoritos");
      } else {
        newFavorites.add(id);
        toast.success("Adicionado aos favoritos");
      }
      return newFavorites;
    });

    setPhrases(prev => prev.map(p => 
      p.id === id ? { ...p, isFavorite: !p.isFavorite } : p
    ));
  };

  const handlePlayPhrase = async (phrase: Phrase) => {
    if (currentPhrase?.id === phrase.id && audioPlayer.isPlaying) {
      audioPlayer.pause();
      return;
    }

    setCurrentPhrase(phrase);
    
    if (!audioUrl || currentPhrase?.id !== phrase.id) {
      const { url } = await generate({ text: phrase.text, language: "pt" });
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
            Frases do Dia
          </h1>
          <div className="w-10" />
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Search */}
        <div className="mb-8">
          <Input
            type="search"
            placeholder="Buscar frases..."
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
                {period.name}
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
                  <span className="font-semibold text-sm">{category.name}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Phrases List */}
        <div className="space-y-4">
          {filteredPhrases.length === 0 ? (
            <Card className="p-8 text-center">
              <p className="text-gray-500">Nenhuma frase encontrada</p>
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
                          {phrase.category === "routine" && "Rotina"}
                          {phrase.category === "motivation" && "Motivação"}
                          {phrase.category === "educational" && "Educacional"}
                        </Badge>
                        <Badge variant="outline" className="capitalize">
                          {phrase.timeOfDay === "morning" && "Manhã"}
                          {phrase.timeOfDay === "afternoon" && "Tarde"}
                          {phrase.timeOfDay === "evening" && "Noite"}
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
