import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PlayButton } from "@/components/audio/PlayButton";
import { AudioControls } from "@/components/audio/AudioControls";
import { LanguageSelector } from "@/components/LanguageSelector";
import { UserMenu } from "@/components/UserMenu";
import {
  MessageSquare,
  BookOpen,
  Sparkles,
  Calendar,
  Bluetooth,
  Battery,
  Crown,
  Volume2,
} from "lucide-react";
import { useState } from "react";
import { useAudioPlayer } from "@/hooks/useAudioPlayer";
import { useTextToSpeech } from "@/hooks/useTextToSpeech";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";
import catarinaMascot from "@/assets/catarina-mascot.png";
import { getTranslations } from "@/translations";

const Index = () => {
  const [isConnected, setIsConnected] = useState(false);
  const audioPlayer = useAudioPlayer();
  const { generate, isGenerating } = useTextToSpeech();
  const { language } = useLanguage();
  const t = getTranslations(language);

  const phraseOfTheDay = t.home.phraseOfTheDayText;

  const handlePlayPhraseOfDay = async () => {
    if (audioPlayer.isPlaying) {
      audioPlayer.pause();
      return;
    }

    try {
      const { url } = await generate({ 
        text: phraseOfTheDay, 
        language
      });
      
      if (url) {
        await audioPlayer.play(url);
      }
    } catch (error) {
      console.error('Error playing phrase:', error);
    }
  };

  const quickActions = [
    {
      icon: MessageSquare,
      title: t.quickActions.dailyPhrases.title,
      description: t.quickActions.dailyPhrases.description,
      gradient: "from-primary to-secondary",
      href: "/phrases-daily"
    },
    {
      icon: BookOpen,
      title: t.quickActions.library.title,
      description: t.quickActions.library.description,
      gradient: "from-accent to-secondary",
      href: "/library"
    },
    {
      icon: Sparkles,
      title: t.quickActions.createPhrase.title,
      description: t.quickActions.createPhrase.description,
      gradient: "from-highlight to-primary",
      href: "/create"
    },
    {
      icon: Calendar,
      title: t.quickActions.schedule.title,
      description: t.quickActions.schedule.description,
      gradient: "from-secondary to-accent",
      href: "/schedule"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-muted via-background to-secondary/20">
      {/* Header */}
      <header className="sticky top-0 z-50 glass border-b border-border/50 backdrop-blur-lg">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center">
              <Crown className="w-5 h-5 text-primary-foreground" />
            </div>
            <h1 className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              {t.home.title}
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <LanguageSelector />
            <UserMenu />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 max-w-2xl space-y-6">
        {/* Catarina Status Card */}
        <Card className="relative overflow-hidden border-2 hover-lift">
          <div className="absolute inset-0 bg-gradient-primary opacity-10" />
          <div className="relative p-6">
            <div className="flex items-start gap-4">
              <div className="relative">
                <img 
                  src={catarinaMascot} 
                  alt="Catarina" 
                  className="w-24 h-24 rounded-2xl object-cover shadow-lg"
                />
                <div className={cn(
                  "absolute -bottom-1 -right-1 w-6 h-6 rounded-full border-4 border-card",
                  isConnected ? "bg-success animate-pulse-glow" : "bg-muted-foreground"
                )} />
              </div>
              
              <div className="flex-1 space-y-3">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold">Catarina</h2>
                  <Badge 
                    variant={isConnected ? "default" : "secondary"}
                    className="gap-1"
                  >
                    <Bluetooth className="w-3 h-3" />
                    {isConnected ? t.home.connected : t.home.disconnected}
                  </Badge>
                </div>
                
                <p className="text-sm text-muted-foreground">
                  {isConnected 
                    ? t.home.readyToTalk 
                    : t.home.tapToConnect}
                </p>

                {isConnected && (
                  <div className="flex items-center gap-3 text-sm">
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Battery className="w-4 h-4" />
                      <span>85%</span>
                    </div>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Volume2 className="w-4 h-4" />
                      <span>{t.home.medium}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {!isConnected && (
              <Button 
                size="lg" 
                className="w-full mt-4"
                variant="gradient"
                onClick={() => setIsConnected(true)}
              >
                <Bluetooth className="w-5 h-5" />
                {t.home.connectBluetooth}
              </Button>
            )}
          </div>
        </Card>

        {/* Phrase of the Day */}
        {isConnected && (
          <Card className="p-6 bg-gradient-accent text-accent-foreground border-2 animate-fade-in-scale">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold mb-1">{t.home.phraseOfTheDay}</h3>
                <p className="text-sm opacity-90">
                  "{phraseOfTheDay}"
                </p>
              </div>
              <PlayButton
                isPlaying={audioPlayer.isPlaying}
                isLoading={isGenerating || audioPlayer.isLoading}
                onPlay={handlePlayPhraseOfDay}
                onPause={audioPlayer.pause}
                variant="secondary"
                size="sm"
                showWave
                className="flex-shrink-0"
              />
            </div>

            {audioPlayer.duration > 0 && (
              <AudioControls
                volume={audioPlayer.volume}
                playbackRate={audioPlayer.playbackRate}
                currentTime={audioPlayer.currentTime}
                duration={audioPlayer.duration}
                onVolumeChange={audioPlayer.setVolume}
                onPlaybackRateChange={audioPlayer.setPlaybackRate}
                onSeek={audioPlayer.seek}
                className="mt-4"
              />
            )}
          </Card>
        )}

        {/* Quick Actions Grid */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold px-1">{t.home.quickActions}</h3>
          <div className="grid grid-cols-2 gap-3">
            {quickActions.map((action, index) => (
              <Link key={index} to={action.href}>
                <Card 
                  className={cn(
                    "relative overflow-hidden border-2 cursor-pointer group hover-lift",
                    "animate-fade-in-scale"
                  )}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className={cn(
                    "absolute inset-0 bg-gradient-to-br opacity-10 group-hover:opacity-20 transition-opacity",
                    action.gradient
                  )} />
                  
                  <div className="relative p-5 space-y-3">
                    <div className={cn(
                      "w-12 h-12 rounded-xl bg-gradient-to-br flex items-center justify-center shadow-md",
                      action.gradient
                    )}>
                      <action.icon className="w-6 h-6 text-white" />
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-0.5">{action.title}</h4>
                      <p className="text-xs text-muted-foreground">
                        {action.description}
                      </p>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom Navigation Spacer */}
        <div className="h-20" />
      </main>
    </div>
  );
};

export default Index;
