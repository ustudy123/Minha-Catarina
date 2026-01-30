import { useState } from "react";
import { PageTransition } from "@/components/PageTransition";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { usePausableAudio, getTextWithoutPauses } from "@/hooks/usePausableAudio";
import { useLanguage } from "@/contexts/LanguageContext";
import { getTranslations } from "@/translations";
import { PlayButton } from "@/components/audio/PlayButton";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Timer } from "lucide-react";
import { cn } from "@/lib/utils";

interface LanguagePhrase {
  id: string;
  text: string;
  category: string;
}

const Languages = () => {
  const navigate = useNavigate();
  const [selectedLanguage, setSelectedLanguage] = useState<"english" | "spanish">("english");
  const [playingId, setPlayingId] = useState<string | null>(null);
  
  const pausableAudio = usePausableAudio();
  const { language } = useLanguage();
  const t = getTranslations(language);

  // Get phrases from translations
  const englishPhrases: LanguagePhrase[] = t.languageLearning.englishPhrases.map((phrase, index) => ({
    id: `english-${index}`,
    text: phrase.text,
    category: phrase.category,
  }));

  const spanishPhrases: LanguagePhrase[] = t.languageLearning.spanishPhrases.map((phrase, index) => ({
    id: `spanish-${index}`,
    text: phrase.text,
    category: phrase.category,
  }));

  const handlePlayPhrase = async (phrase: LanguagePhrase, targetLanguage: 'en' | 'es') => {
    if (playingId === phrase.id && pausableAudio.isPlaying) {
      pausableAudio.stop();
      setPlayingId(null);
      return;
    }

    try {
      setPlayingId(phrase.id);
      // Use pausable audio which handles the [pausa:Xs] markers
      await pausableAudio.play(phrase.text, targetLanguage);
    } catch (error) {
      console.error('Error playing phrase:', error);
    }
  };

  // Reset playingId when audio stops
  if (playingId && !pausableAudio.isPlaying) {
    setPlayingId(null);
  }

  const currentPhrases = selectedLanguage === "english" ? englishPhrases : spanishPhrases;
  const targetLanguage = selectedLanguage === "english" ? 'en' : 'es';

  // Group phrases by category
  const groupedPhrases = currentPhrases.reduce((acc, phrase) => {
    if (!acc[phrase.category]) {
      acc[phrase.category] = [];
    }
    acc[phrase.category].push(phrase);
    return acc;
  }, {} as Record<string, LanguagePhrase[]>);

  const categoryLabels: Record<string, string> = {
    colors: t.languageLearning.categories.colors,
    numbers: t.languageLearning.categories.numbers,
    greetings: t.languageLearning.categories.greetings,
    animals: t.languageLearning.categories.animals,
    family: t.languageLearning.categories.family,
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-br from-muted via-background to-accent/10">
        {/* Header */}
        <header className="sticky top-0 z-50 glass border-b border-border/50 backdrop-blur-lg">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" onClick={() => navigate('/library')}>
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="text-xl font-bold">{t.languageLearning.title}</h1>
                <p className="text-xs text-muted-foreground">{t.languageLearning.subtitle}</p>
              </div>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-6 max-w-2xl space-y-6">
          {/* Language Selection Tabs */}
          <Tabs value={selectedLanguage} onValueChange={(v) => setSelectedLanguage(v as "english" | "spanish")}>
            <TabsList className="w-full grid grid-cols-2 h-auto p-1">
              <TabsTrigger 
                value="english" 
                className="flex items-center gap-2 py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                <span className="text-xl">🇺🇸</span>
                <span className="font-medium">{t.languageLearning.learningEnglish}</span>
              </TabsTrigger>
              <TabsTrigger 
                value="spanish" 
                className="flex items-center gap-2 py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                <span className="text-xl">🇪🇸</span>
                <span className="font-medium">{t.languageLearning.learningSpanish}</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="english" className="space-y-6 mt-6">
              {currentPhrases.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">
                    {language === 'pt' ? 'Nenhuma frase disponível ainda' :
                     language === 'en' ? 'No phrases available yet' :
                     'No hay frases disponibles todavía'}
                  </p>
                </div>
              ) : (
                Object.entries(groupedPhrases).map(([category, phrases]) => (
                  <div key={category} className="space-y-3">
                    <h3 className="text-sm font-semibold text-muted-foreground flex items-center gap-2">
                      {categoryLabels[category] || category}
                      <Badge variant="secondary" className="text-xs">
                        {phrases.length}
                      </Badge>
                    </h3>
                    <div className="space-y-2">
                      {phrases.map((phrase, index) => (
                        <Card 
                          key={phrase.id}
                          className={cn(
                            "p-4 border-2 hover-lift animate-fade-in",
                            playingId === phrase.id && pausableAudio.isPlaying && "border-primary bg-primary/5"
                          )}
                          style={{ animationDelay: `${index * 0.05}s` }}
                        >
                          <div className="flex items-start gap-3">
                            <PlayButton
                              isPlaying={playingId === phrase.id && pausableAudio.isPlaying}
                              isLoading={pausableAudio.isLoading && playingId === phrase.id}
                              onPlay={() => handlePlayPhrase(phrase, 'en')}
                              onPause={() => { pausableAudio.stop(); setPlayingId(null); }}
                              variant="secondary"
                              size="icon"
                              className="flex-shrink-0"
                            />
                            
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium break-words">
                                {getTextWithoutPauses(phrase.text)}
                              </p>
                              
                              {/* Pause indicator */}
                              {playingId === phrase.id && pausableAudio.isPaused && (
                                <div className="mt-2 flex items-center gap-2 text-xs text-primary animate-pulse">
                                  <Timer className="w-4 h-4" />
                                  <span>
                                    {language === 'pt' ? 'Sua vez de falar!' :
                                     language === 'en' ? 'Your turn to speak!' :
                                     '¡Tu turno de hablar!'} 
                                    ({pausableAudio.pauseTimeRemaining}s)
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </div>
                ))
              )}
            </TabsContent>

            <TabsContent value="spanish" className="space-y-6 mt-6">
              {currentPhrases.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">
                    {language === 'pt' ? 'Nenhuma frase disponível ainda' :
                     language === 'en' ? 'No phrases available yet' :
                     'No hay frases disponibles todavía'}
                  </p>
                </div>
              ) : (
                Object.entries(groupedPhrases).map(([category, phrases]) => (
                  <div key={category} className="space-y-3">
                    <h3 className="text-sm font-semibold text-muted-foreground flex items-center gap-2">
                      {categoryLabels[category] || category}
                      <Badge variant="secondary" className="text-xs">
                        {phrases.length}
                      </Badge>
                    </h3>
                    <div className="space-y-2">
                      {phrases.map((phrase, index) => (
                        <Card 
                          key={phrase.id}
                          className={cn(
                            "p-4 border-2 hover-lift animate-fade-in",
                            playingId === phrase.id && pausableAudio.isPlaying && "border-primary bg-primary/5"
                          )}
                          style={{ animationDelay: `${index * 0.05}s` }}
                        >
                          <div className="flex items-start gap-3">
                            <PlayButton
                              isPlaying={playingId === phrase.id && pausableAudio.isPlaying}
                              isLoading={pausableAudio.isLoading && playingId === phrase.id}
                              onPlay={() => handlePlayPhrase(phrase, 'es')}
                              onPause={() => { pausableAudio.stop(); setPlayingId(null); }}
                              variant="secondary"
                              size="icon"
                              className="flex-shrink-0"
                            />
                            
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium break-words">
                                {getTextWithoutPauses(phrase.text)}
                              </p>
                              
                              {/* Pause indicator */}
                              {playingId === phrase.id && pausableAudio.isPaused && (
                                <div className="mt-2 flex items-center gap-2 text-xs text-primary animate-pulse">
                                  <Timer className="w-4 h-4" />
                                  <span>
                                    {language === 'pt' ? 'Sua vez de falar!' :
                                     language === 'en' ? 'Your turn to speak!' :
                                     '¡Tu turno de hablar!'} 
                                    ({pausableAudio.pauseTimeRemaining}s)
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </div>
                ))
              )}
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </PageTransition>
  );
};

export default Languages;
