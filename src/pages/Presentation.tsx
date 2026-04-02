import { useState } from "react";
import { PageTransition } from "@/components/PageTransition";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlayButton } from "@/components/audio/PlayButton";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTextToSpeech } from "@/hooks/useTextToSpeech";
import { useAudioPlayer } from "@/hooks/useAudioPlayer";
import { useSequentialPlayer, PlayablePhrase } from "@/hooks/useSequentialPlayer";
import { getTranslations } from "@/translations";
import { ArrowLeft, Heart, Play, Square, Timer } from "lucide-react";
import { useNavigate } from "react-router-dom";
import catarinaMascot from "@/assets/catarina-mascot.png";

const presentationPhrases: Record<string, string[]> = {
  pt: [
    "Oi eu sou a boneca Catarina da Carmell. Estou muito feliz que você vai cuidar de mim. Como é o seu nome?",
    "Que nome lindo você tem. Quem escolheu o seu nome?",
    "Quantos anos você tem?",
    "Muito prazer em te conhecer! Me dá um abraço bem gostoso?",
    "Obrigada pelo carinho! Gostei muito de você! O que você gosta de fazer?",
    "Vamos ser amigas e brincar muito juntas! Me mostra a sua casa?",
  ],
  en: [
    "Hi! I'm Catarina, your special little friend!",
    "I love chatting, singing, and telling stories!",
    "You can ask me to say anything!",
    "I speak Portuguese, English, and Spanish!",
    "Let's be best friends? Connect me via Bluetooth!",
    "I have a library with over 500 phrases!",
    "You can create new phrases just for me to say!",
    "I can also follow routines with multiple phrases in sequence!",
  ],
  es: [
    "¡Hola! ¡Soy Catarina, tu amiguita especial!",
    "¡Me encanta conversar, cantar y contar historias!",
    "¡Puedes pedirme que diga cualquier cosa!",
    "¡Hablo portugués, inglés y español!",
    "¿Vamos a ser mejores amigas? ¡Conéctame por Bluetooth!",
    "¡Tengo una biblioteca con más de 500 frases!",
    "¡Puedes crear frases nuevas solo para que yo las diga!",
    "¡También puedo seguir rutinas con varias frases en secuencia!",
  ],
};

const intervalOptions = [
  { label: "3s", value: 3 },
  { label: "5s", value: 5 },
  { label: "10s", value: 10 },
  { label: "15s", value: 15 },
];

const Presentation = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const { generate, isGenerating } = useTextToSpeech();
  const audioPlayer = useAudioPlayer();
  const sequentialPlayer = useSequentialPlayer();
  const t = getTranslations(language);
  const phrases = presentationPhrases[language] || presentationPhrases.pt;
  const [intervalSeconds, setIntervalSeconds] = useState(5);

  const handlePlay = async (text: string) => {
    if (audioPlayer.isPlaying) {
      audioPlayer.pause();
      return;
    }
    try {
      const { url } = await generate({ text, language });
      if (url) {
        await audioPlayer.play(url);
      }
    } catch (error) {
      console.error("Error playing phrase:", error);
    }
  };

  const handlePlayAll = () => {
    if (sequentialPlayer.isPlaying) {
      sequentialPlayer.stop();
      return;
    }
    const playablePhrases: PlayablePhrase[] = phrases.map((text, i) => ({
      id: `presentation-${i}`,
      text,
    }));
    sequentialPlayer.startPlayAll(playablePhrases, false, intervalSeconds, true);
  };

  const pageTitle = language === "en"
    ? "Meet Catarina"
    : language === "es"
    ? "Conoce a Catarina"
    : "Apresentação Catarina";

  const subtitle = language === "en"
    ? "Get to know your special friend!"
    : language === "es"
    ? "¡Conoce a tu amiga especial!"
    : "Conheça sua amiguinha especial!";

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-br from-muted via-background to-secondary/20">
        <header className="sticky top-0 z-50 glass border-b border-border/50 backdrop-blur-lg">
          <div className="container mx-auto px-4 py-4 flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => navigate("/")}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-lg font-bold">{pageTitle}</h1>
          </div>
        </header>

        <main className="container mx-auto px-4 py-6 max-w-2xl space-y-6">
          {/* Hero */}
          <Card className="relative overflow-hidden border-2">
            <div className="absolute inset-0 bg-gradient-primary opacity-10" />
            <div className="relative p-6 flex flex-col items-center text-center gap-4">
              <img
                src={catarinaMascot}
                alt="Catarina"
                className="w-28 h-28 rounded-2xl object-cover shadow-lg"
              />
              <div>
                <h2 className="text-2xl font-bold mb-1">Catarina</h2>
                <p className="text-muted-foreground text-sm">{subtitle}</p>
              </div>
            </div>
          </Card>

          {/* Auto-play Controls */}
          <Card className="p-4 border-2 border-primary/20">
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Timer className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium">
                    {language === "en" ? "Auto Play" : language === "es" ? "Reproducción automática" : "Reprodução automática"}
                  </span>
                </div>
                <Button
                  onClick={handlePlayAll}
                  variant={sequentialPlayer.isPlaying ? "destructive" : "default"}
                  size="sm"
                  className="gap-2"
                >
                  {sequentialPlayer.isPlaying ? (
                    <>
                      <Square className="w-4 h-4" />
                      {language === "en" ? "Stop" : "Parar"}
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4" />
                      {language === "en" ? "Play All" : language === "es" ? "Reproducir todo" : "Tocar Todas"}
                    </>
                  )}
                </Button>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">
                  {language === "en" ? "Interval:" : "Intervalo:"}
                </span>
                <div className="flex gap-1">
                  {intervalOptions.map((opt) => (
                    <Button
                      key={opt.value}
                      variant={intervalSeconds === opt.value ? "secondary" : "ghost"}
                      size="sm"
                      onClick={() => setIntervalSeconds(opt.value)}
                      className="h-7 px-3 text-xs"
                      disabled={sequentialPlayer.isPlaying}
                    >
                      {opt.label}
                    </Button>
                  ))}
                </div>
              </div>

              {sequentialPlayer.isPlaying && (
                <div className="text-xs text-muted-foreground text-center animate-pulse">
                  {language === "en"
                    ? `Playing ${sequentialPlayer.currentIndex + 1} of ${sequentialPlayer.totalPhrases}`
                    : `Reproduzindo ${sequentialPlayer.currentIndex + 1} de ${sequentialPlayer.totalPhrases}`}
                  {sequentialPlayer.timeRemaining > 0 && (
                    <span> — {language === "en" ? "next in" : "próxima em"} {sequentialPlayer.timeRemaining}s</span>
                  )}
                </div>
              )}
            </div>
          </Card>

          {/* Phrases */}
          <div className="space-y-3">
            {phrases.map((phrase, index) => {
              const isCurrentPlaying = sequentialPlayer.isPlaying && sequentialPlayer.currentPhraseId === `presentation-${index}`;
              return (
                <Card
                  key={index}
                  className={`p-4 border animate-fade-in-scale flex items-center gap-3 transition-colors ${isCurrentPlaying ? "border-primary bg-primary/5" : ""}`}
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Heart className="w-4 h-4 text-primary" />
                  </div>
                  <p className="flex-1 text-sm">{phrase}</p>
                  <PlayButton
                    isPlaying={isCurrentPlaying}
                    isLoading={isGenerating || audioPlayer.isLoading}
                    onPlay={() => handlePlay(phrase)}
                    onPause={audioPlayer.pause}
                    size="sm"
                  />
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

export default Presentation;
