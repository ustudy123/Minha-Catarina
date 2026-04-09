import { useState, useEffect, useMemo } from "react";
import { PageTransition } from "@/components/PageTransition";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { usePausableAudio, getTextWithoutPauses } from "@/hooks/usePausableAudio";
import { useAudioPreloader } from "@/hooks/useAudioPreloader";
import { useLanguage } from "@/contexts/LanguageContext";
import { getTranslations } from "@/translations";
import { PlayButton } from "@/components/audio/PlayButton";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ArrowLeft, Timer, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface LanguagePhrase {
  id: string;
  text: string;
  category: string;
}

const Languages = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const tabParam = searchParams.get("tab");
  const lockedLanguage = tabParam === "english" || tabParam === "spanish" ? tabParam : null;
  const [selectedLanguage, setSelectedLanguage] = useState<"english" | "spanish">(
    (tabParam === "english" || tabParam === "spanish") ? tabParam : "english"
  );
  const [playingId, setPlayingId] = useState<string | null>(null);
  
  const pausableAudio = usePausableAudio();
  const { preloadMany, isPreloading, preloadedCount, preloadingCount } = useAudioPreloader();
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

  // Pre-load audio for current phrases when tab changes or on mount
  useEffect(() => {
    const phrases = selectedLanguage === "english" ? englishPhrases : spanishPhrases;
    
    // Extract text segments (without pause markers) for preloading
    const phrasesToPreload = phrases.flatMap(phrase => {
      // Split by pause markers and filter non-empty segments
      const segments = phrase.text
        .split(/\[(?:pausa|pause):\d+s?\]/gi)
        .map(s => s.trim())
        .filter(s => s.length > 0);
      
      return segments.map(segment => ({ text: segment }));
    });

    if (phrasesToPreload.length > 0) {
      preloadMany(phrasesToPreload, { delayMs: 150, maxConcurrent: 2 });
    }
  }, [selectedLanguage]);

  const handlePlayPhrase = async (phrase: LanguagePhrase) => {
    if (playingId === phrase.id && pausableAudio.isPlaying) {
      pausableAudio.stop();
      setPlayingId(null);
      return;
    }

    try {
      setPlayingId(phrase.id);
      // Play without translation - the phrases already contain mixed languages as-is
      // e.g., "How are you?" should be spoken in English, not translated
      await pausableAudio.play(phrase.text);
    } catch (error) {
      console.error('Error playing phrase:', error);
    }
  };

  // Reset playingId when audio stops
  useEffect(() => {
    if (playingId && !pausableAudio.isPlaying) {
      setPlayingId(null);
    }
  }, [playingId, pausableAudio.isPlaying]);

  const currentPhrases = selectedLanguage === "english" ? englishPhrases : spanishPhrases;

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
    vocabulary: (t.languageLearning.categories as any).vocabulary || "Vocabulário",
    places: (t.languageLearning.categories as any).places || "Lugares",
    food: (t.languageLearning.categories as any).food || "Comida",
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
                <h1 className="text-xl font-bold">
                  {lockedLanguage === "english" 
                    ? (language === 'pt' ? "Aprendendo Inglês" : language === 'en' ? "Learning English" : "Aprendiendo Inglés")
                    : lockedLanguage === "spanish"
                    ? (language === 'pt' ? "Aprendendo Espanhol" : language === 'en' ? "Learning Spanish" : "Aprendiendo Español")
                    : t.languageLearning.title}
                </h1>
                <p className="text-xs text-muted-foreground">
                  {t.languageLearning.subtitle}
                  {isPreloading && (
                    <span className="ml-2 inline-flex items-center gap-1">
                      <Loader2 className="w-3 h-3 animate-spin" />
                      <span className="text-primary">
                        {language === 'pt' ? `Carregando ${preloadedCount}/${preloadingCount}...` :
                         language === 'en' ? `Loading ${preloadedCount}/${preloadingCount}...` :
                         `Cargando ${preloadedCount}/${preloadingCount}...`}
                      </span>
                    </span>
                  )}
                </p>
              </div>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-6 max-w-2xl space-y-6">
          {/* Language Selection Tabs */}
          <Tabs value={selectedLanguage} onValueChange={(v) => !lockedLanguage && setSelectedLanguage(v as "english" | "spanish")}>
            {!lockedLanguage && (
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
            )}

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
                              onPlay={() => handlePlayPhrase(phrase)}
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
                              onPlay={() => handlePlayPhrase(phrase)}
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
