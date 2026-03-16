import { Link } from "react-router-dom";
import { PageTransition } from "@/components/PageTransition";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PlayButton } from "@/components/audio/PlayButton";
import { AudioControls } from "@/components/audio/AudioControls";
import { LanguageSelector } from "@/components/LanguageSelector";
import { UserMenu } from "@/components/UserMenu";
import { BluetoothGuide } from "@/components/BluetoothGuide";
import { BookOpen, Sparkles, Star, ListMusic, Bluetooth, Battery, Volume2, Crown, WifiOff, Info } from "lucide-react";
import { useState } from "react";
import { useAudioPlayer } from "@/hooks/useAudioPlayer";
import { useTextToSpeech } from "@/hooks/useTextToSpeech";
import { useLanguage } from "@/contexts/LanguageContext";
import { useVoice } from "@/contexts/VoiceContext";
import { useSubscription } from "@/hooks/useSubscription";
import { useBluetooth } from "@/hooks/useBluetooth";
import { cn } from "@/lib/utils";
import catarinaMascot from "@/assets/catarina-mascot.png";
import { getTranslations } from "@/translations";

const Index = () => {
  const [showBluetoothGuide, setShowBluetoothGuide] = useState(false);
  const { isConnected, deviceName, confirmConnection, disconnect } = useBluetooth();
  const audioPlayer = useAudioPlayer();
  const {
    generate,
    isGenerating
  } = useTextToSpeech();
  const {
    language
  } = useLanguage();
  const {
    selectedDoll
  } = useVoice();
  const {
    isPremium
  } = useSubscription();
  const t = getTranslations(language);
  const dollName = selectedDoll === 'catarina' ? 'Catarina' : 'Antônio';
  const phraseOfTheDay = t.home.phraseOfTheDayText;
  const readyToTalk = selectedDoll === 'catarina' ? t.home.readyToTalk : language === 'pt' ? '🧢 Pronto para conversar com você!' : language === 'en' ? '🧢 Ready to talk with you!' : '🧢 ¡Listo para hablar contigo!';
  const handlePlayPhraseOfDay = async () => {
    if (audioPlayer.isPlaying) {
      audioPlayer.pause();
      return;
    }
    try {
      const {
        url
      } = await generate({
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
  const quickActionsTexts = {
    pt: {
      library: {
        title: "Biblioteca",
        description: "Mais de 500 frases"
      },
      favorites: {
        title: "Favoritas",
        description: "Suas preferidas"
      },
      create: {
        title: "Crie e Converse",
        description: "Crie suas frases"
      },
      routines: {
        title: "Minhas Rotinas",
        description: "Faça do seu jeito"
      }
    },
    en: {
      library: {
        title: "Library",
        description: "500+ recorded phrases"
      },
      favorites: {
        title: "Favorites",
        description: "Your favorites"
      },
      create: {
        title: "Create & Talk",
        description: "Create new phrases"
      },
      routines: {
        title: "My Routines",
        description: "Organize sequences"
      }
    },
    es: {
      library: {
        title: "Biblioteca",
        description: "500+ frases grabadas"
      },
      favorites: {
        title: "Favoritas",
        description: "Tus preferidas"
      },
      create: {
        title: "Crea y Conversa",
        description: "Crear nuevas frases"
      },
      routines: {
        title: "Mis Rutinas",
        description: "Organiza secuencias"
      }
    }
  };
  const actionTexts = quickActionsTexts[language];
  const presentationAction = {
    icon: Info,
    title: t.home.presentation,
    description: t.home.presentationDesc,
    gradient: "from-highlight to-accent",
    href: "/presentation",
    isPremium: false
  };

  const quickActions = [{
    icon: BookOpen,
    title: actionTexts.library.title,
    description: actionTexts.library.description,
    gradient: "from-accent to-secondary",
    href: "/library",
    isPremium: false
  }, {
    icon: Star,
    title: actionTexts.favorites.title,
    description: actionTexts.favorites.description,
    gradient: "from-highlight to-primary",
    href: "/favorites",
    isPremium: false
  }, {
    icon: Sparkles,
    title: actionTexts.create.title,
    description: actionTexts.create.description,
    gradient: "from-primary to-secondary",
    href: "/create",
    isPremium: true
  }, {
    icon: ListMusic,
    title: actionTexts.routines.title,
    description: actionTexts.routines.description,
    gradient: "from-secondary to-accent",
    href: "/routines",
    isPremium: false
  }];
  return <PageTransition>
    <div className="min-h-screen bg-gradient-to-br from-muted via-background to-secondary/20">
      <header className="sticky top-0 z-50 glass border-b border-border/50 backdrop-blur-lg">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          
          <div className="flex items-center gap-2 ml-auto">
            <LanguageSelector />
            <UserMenu />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 max-w-2xl space-y-6">
        {/* Doll Status Card */}
        <Card className="relative overflow-hidden border-2 hover-lift">
          <div className="absolute inset-0 bg-gradient-primary opacity-10" />
          <div className="relative p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left">
              <div className="relative flex-shrink-0">
                {selectedDoll === 'catarina' ? <img src={catarinaMascot} alt="Catarina" className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover shadow-lg" /> : <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center shadow-lg">
                    <span className="text-4xl sm:text-5xl">👦🏻</span>
                  </div>}
                <div className={cn("absolute -bottom-1 -right-1 w-5 h-5 sm:w-6 sm:h-6 rounded-full border-4 border-card", isConnected ? "bg-success animate-pulse-glow" : "bg-muted-foreground")} />
              </div>
              
              <div className="flex-1 space-y-2 sm:space-y-3 min-w-0">
                <div className="flex flex-col sm:flex-row items-center sm:justify-between gap-2">
                  <h2 className="text-xl sm:text-2xl font-bold">{dollName}</h2>
                  <Badge variant={isConnected ? "default" : "secondary"} className="gap-1">
                    <Bluetooth className="w-3 h-3" />
                    {isConnected ? t.home.connected : t.home.disconnected}
                  </Badge>
                </div>
                
                <p className="text-sm text-muted-foreground">
                  {isConnected ? readyToTalk : t.home.tapToConnect}
                </p>

                {isConnected && <div className="flex items-center justify-center sm:justify-start gap-3 text-sm">
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Battery className="w-4 h-4" />
                      <span>{t.home.battery}</span>
                    </div>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Volume2 className="w-4 h-4" />
                      <span>{t.home.medium}</span>
                    </div>
                  </div>}
              </div>
            </div>

            {!isConnected ? (
              <Button 
                size="lg" 
                className="w-full mt-4" 
                variant="gradient" 
                onClick={() => setShowBluetoothGuide(true)}
              >
                <Bluetooth className="w-5 h-5" />
                {t.home.connectBluetooth}
              </Button>
            ) : (
              <Button 
                size="lg" 
                variant="outline" 
                className="w-full mt-4" 
                onClick={disconnect}
              >
                <WifiOff className="w-5 h-5" />
                {t.bluetooth.disconnect}
              </Button>
            )}
          </div>
        </Card>

        {/* Bluetooth Guide Drawer */}
        <BluetoothGuide
          open={showBluetoothGuide}
          onOpenChange={setShowBluetoothGuide}
          dollName={dollName}
          language={language}
          onConfirmConnection={() => {
            confirmConnection(`${dollName} Speaker`);
            setShowBluetoothGuide(false);
          }}
        />

        {/* Phrase of the Day */}
        {isConnected && <Card className="p-6 bg-gradient-accent text-accent-foreground border-2 animate-fade-in-scale">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold mb-1">{t.home.phraseOfTheDay}</h3>
                <p className="text-sm opacity-90">"{phraseOfTheDay}"</p>
              </div>
              <PlayButton isPlaying={audioPlayer.isPlaying} isLoading={isGenerating || audioPlayer.isLoading} onPlay={handlePlayPhraseOfDay} onPause={audioPlayer.pause} variant="secondary" size="sm" showWave className="flex-shrink-0" />
            </div>

            {audioPlayer.duration > 0 && <AudioControls volume={audioPlayer.volume} playbackRate={audioPlayer.playbackRate} currentTime={audioPlayer.currentTime} duration={audioPlayer.duration} onVolumeChange={audioPlayer.setVolume} onPlaybackRateChange={audioPlayer.setPlaybackRate} onSeek={audioPlayer.seek} className="mt-4" />}
          </Card>}

        {/* Quick Actions */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold px-1">{t.home.quickActions}</h3>
          
          {/* Apresentação - Full width on top */}
          <Link to={presentationAction.href}>
            <Card className="relative overflow-hidden border-2 rounded-[1.75rem] cursor-pointer group hover-lift animate-fade-in-scale">
              <div className={cn("absolute inset-0 bg-gradient-to-br opacity-10 group-hover:opacity-20 transition-opacity", presentationAction.gradient)} />
              <div className="relative p-5 sm:p-6 flex items-center gap-4 text-left">
                <div className={cn("w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br flex items-center justify-center shadow-md shrink-0", presentationAction.gradient)}>
                  <presentationAction.icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                </div>
                <div className="min-w-0">
                  <h4 className="font-semibold text-lg leading-tight">{presentationAction.title}</h4>
                  <p className="text-sm text-muted-foreground">{presentationAction.description}</p>
                </div>
              </div>
            </Card>
          </Link>

          {/* 2x2 Grid */}
          <div className="grid grid-cols-2 gap-3">
            {quickActions.map((action, index) => <Link key={index} to={action.href}>
                <Card className={cn("relative overflow-hidden border-2 cursor-pointer group hover-lift h-full", "animate-fade-in-scale")} style={{
              animationDelay: `${index * 0.1}s`
            }}>
                  <div className={cn("absolute inset-0 bg-gradient-to-br opacity-10 group-hover:opacity-20 transition-opacity", action.gradient)} />
                  
                  <div className="relative p-4 sm:p-5 space-y-3 h-full flex flex-col">
                    <div className="flex items-start justify-between">
                      <div className={cn("w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br flex items-center justify-center shadow-md", action.gradient)}>
                        <action.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                      </div>
                    </div>
                    
                    <div className="flex-1">
                      <h4 className="font-semibold text-sm sm:text-base mb-0.5 leading-tight">{action.title}</h4>
                      <p className="text-xs text-muted-foreground line-clamp-2">
                        {action.description}
                      </p>
                    </div>
                  </div>
                </Card>
              </Link>)}
          </div>
        </div>

        <div className="h-20" />
      </main>
    </div>
  </PageTransition>;
};
export default Index;