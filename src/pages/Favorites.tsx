import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PageTransition } from "@/components/PageTransition";
import { UserMenu } from "@/components/UserMenu";
import { SpeedSelector } from "@/components/audio/SpeedSelector";
import { LanguageSelector } from "@/components/LanguageSelector";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
} from '@/components/ui/dropdown-menu';
import { Switch } from '@/components/ui/switch';
import { Check } from 'lucide-react';
import { SortablePhrase } from '@/components/SortablePhrase';
import { PlayButton } from '@/components/audio/PlayButton';
import { AudioControls } from '@/components/audio/AudioControls';
import { useFavorites } from '@/hooks/useFavorites';
import { useAudioPlayer } from '@/hooks/useAudioPlayer';
import { useTextToSpeech } from '@/hooks/useTextToSpeech';
import { useAudioPreloader } from '@/hooks/useAudioPreloader';
import { useSequentialPlayer } from '@/hooks/useSequentialPlayer';
import { useLanguage } from '@/contexts/LanguageContext';
import { toast } from 'sonner';
import {
  ArrowLeft,
  Star,
  Plus,
  MoreVertical,
  Shuffle,
  Clock,
  Play,
  Trash2,
  Square,
  Timer,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const Favorites = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const {
    favorites,
    playRandom,
    intervalMinutes,
    reorderFavorites,
    removeFavorite,
    updateSettings,
    updatePhraseDuration,
  } = useFavorites();
  const audioPlayer = useAudioPlayer();
  const { generate, isGenerating } = useTextToSpeech();
  const sequentialPlayer = useSequentialPlayer();
  const { preloadMany } = useAudioPreloader();
  const [playingId, setPlayingId] = useState<string | null>(null);

  // Preload audio for visible favorites (skip music — uses different API)
  useEffect(() => {
    const toPreload = favorites
      .filter(f => f.category !== 'música' && f.category !== 'music' && f.category !== 'Songs')
      .slice(0, 15)
      .map(f => ({ text: f.text, language }));
    if (toPreload.length > 0) {
      preloadMany(toPreload, { delayMs: 200, maxConcurrent: 2 });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [favorites, language]);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const texts = {
    pt: {
      title: 'Favoritas',
      subtitle: 'Suas frases preferidas',
      empty: 'Nenhuma frase favorita ainda',
      addPhrases: 'Adicionar Frases',
      playAll: 'Tocar Todas',
      stopAll: 'Parar',
      playRandom: 'Tocar Aleatório',
      interval: 'Intervalo',
      minutes: 'min',
      removed: 'Removido dos favoritos',
      duration: 'Duração',
      durationSet: 'Duração definida para',
      playing: 'Tocando',
      remaining: 'restante',
    },
    en: {
      title: 'Favorites',
      subtitle: 'Your favorite phrases',
      empty: 'No favorite phrases yet',
      addPhrases: 'Add Phrases',
      playAll: 'Play All',
      stopAll: 'Stop',
      playRandom: 'Play Random',
      interval: 'Interval',
      minutes: 'min',
      removed: 'Removed from favorites',
      duration: 'Duration',
      durationSet: 'Duration set to',
      playing: 'Playing',
      remaining: 'remaining',
    },
    es: {
      title: 'Favoritas',
      subtitle: 'Tus frases preferidas',
      empty: 'No hay frases favoritas aún',
      addPhrases: 'Agregar Frases',
      playAll: 'Reproducir Todas',
      stopAll: 'Parar',
      playRandom: 'Reproducir Aleatorio',
      interval: 'Intervalo',
      minutes: 'min',
      removed: 'Eliminado de favoritos',
      duration: 'Duración',
      durationSet: 'Duración definida para',
      playing: 'Reproduciendo',
      remaining: 'restante',
    },
  };

  const t = texts[language];

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = favorites.findIndex((f) => f.id === active.id);
      const newIndex = favorites.findIndex((f) => f.id === over.id);
      reorderFavorites(arrayMove(favorites, oldIndex, newIndex));
    }
  };

  const handlePlay = async (phraseId: string, text: string, category?: string) => {
    if (playingId === phraseId && audioPlayer.isPlaying) {
      audioPlayer.pause();
      setPlayingId(null);
      return;
    }

    try {
      setPlayingId(phraseId);
      const isMusic = category === 'música' || category === 'music' || category === 'Songs';
      const { url } = await generate({ 
        text, 
        language,
        contentType: isMusic ? 'música' : 'frase'
      });
      if (url) {
        await audioPlayer.play(url);
      }
    } catch (error) {
      console.error('Error playing phrase:', error);
      setPlayingId(null);
    }
  };

  const handleRemove = (id: string) => {
    removeFavorite(id);
    toast.success(t.removed);
  };

  const handleToggleRandom = () => {
    updateSettings(!playRandom, intervalMinutes);
  };

  const handleDurationChange = (phraseId: string, minutes: number) => {
    updatePhraseDuration(phraseId, minutes);
    toast.success(`${t.durationSet} ${minutes} ${t.minutes}`);
  };

  const handlePlayAll = () => {
    if (sequentialPlayer.isPlaying) {
      sequentialPlayer.stop();
    } else {
      sequentialPlayer.startPlayAll(favorites, playRandom, intervalMinutes, true);
    }
  };

  const formatTimeRemaining = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-br from-muted via-background to-primary/5">
        {/* Header */}
        <header className="sticky top-0 z-50 glass border-b border-border/50 backdrop-blur-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" onClick={() => navigate('/')}>
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="text-xl font-bold flex items-center gap-2">
                  <Star className="w-5 h-5 fill-highlight text-highlight" />
                  {t.title}
                </h1>
                <p className="text-xs text-muted-foreground">{t.subtitle}</p>
              </div>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <MoreVertical className="w-5 h-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 bg-popover">
                {/* Play Random Toggle */}
                <DropdownMenuItem 
                  onClick={handleToggleRandom}
                  className="flex items-center justify-between cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <Shuffle className="w-4 h-4" />
                    {t.playRandom}
                  </div>
                  <Switch checked={playRandom} />
                </DropdownMenuItem>
                
                <DropdownMenuSeparator />
                
                {/* Interval Submenu */}
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger className="cursor-pointer">
                    <Timer className="w-4 h-4 mr-2" />
                    {t.interval}: {intervalMinutes}s
                  </DropdownMenuSubTrigger>
                  <DropdownMenuSubContent className="bg-popover">
                    {[3, 5, 10, 15].map((secs) => (
                      <DropdownMenuItem
                        key={secs}
                        onClick={() => updateSettings(playRandom, secs)}
                        className="flex items-center justify-between cursor-pointer"
                      >
                        <span>{secs}s</span>
                        {intervalMinutes === secs && <Check className="w-4 h-4" />}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuSubContent>
                </DropdownMenuSub>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-2xl space-y-8 animate-fade-in">
        {favorites.length === 0 ? (
          <Card className="p-8 text-center border-2 border-dashed">
            <Star className="w-16 h-16 mx-auto mb-4 text-muted-foreground/50" />
            <p className="text-muted-foreground mb-4">{t.empty}</p>
            <Link to="/library">
              <Button variant="gradient">
                <Plus className="w-4 h-4 mr-2" />
                {t.addPhrases}
              </Button>
            </Link>
          </Card>
        ) : (
          <>
            {/* Play All Button */}
            <Card className={cn(
              "p-4 transition-colors",
              sequentialPlayer.isPlaying && "bg-primary/10 border-primary"
            )}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Button 
                    variant={sequentialPlayer.isPlaying ? "destructive" : "gradient"}
                    onClick={handlePlayAll}
                    className="gap-2"
                  >
                    {sequentialPlayer.isPlaying ? (
                      <>
                        <Square className="w-4 h-4" />
                        {t.stopAll}
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4" />
                        {t.playAll}
                      </>
                    )}
                  </Button>
                  
                  {playRandom && (
                    <Badge variant="secondary" className="gap-1">
                      <Shuffle className="w-3 h-3" />
                      {t.playRandom}
                    </Badge>
                  )}
                </div>

                {sequentialPlayer.isPlaying && (
                  <div className="text-right">
                    <p className="text-sm font-medium text-primary">
                      {t.playing} {sequentialPlayer.currentIndex + 1}/{favorites.length}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {formatTimeRemaining(sequentialPlayer.timeRemaining)} {t.remaining}
                    </p>
                  </div>
                )}
              </div>
            </Card>

            {/* Sortable List */}
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={favorites.map((f) => f.id)}
                strategy={verticalListSortingStrategy}
              >
                <div className="space-y-2">
                  {favorites.map((phrase) => (
                    <SortablePhrase key={phrase.id} id={phrase.id}>
                      <div className={cn(
                        "flex items-start gap-3 transition-colors",
                        sequentialPlayer.currentPhraseId === phrase.id && "bg-primary/5 -mx-3 px-3 py-2 rounded-lg"
                      )}>
                        <PlayButton
                          isPlaying={
                            (playingId === phrase.id && audioPlayer.isPlaying) ||
                            sequentialPlayer.currentPhraseId === phrase.id
                          }
                          isLoading={isGenerating && playingId === phrase.id}
                          onPlay={() => handlePlay(phrase.id, phrase.text, phrase.category)}
                          onPause={audioPlayer.pause}
                          variant="secondary"
                          size="icon"
                          className="flex-shrink-0"
                        />

                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium break-words">{phrase.text}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="secondary" className="text-xs">
                              {phrase.category}
                            </Badge>
                            
                            {/* Duration Dropdown */}
                            <DropdownMenu modal={false}>
                              <DropdownMenuTrigger asChild>
                                <button 
                                  type="button"
                                  className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full border border-border bg-background hover:bg-muted cursor-pointer"
                                >
                                  <Timer className="w-3 h-3" />
                                  {phrase.durationMinutes || 1} {t.minutes}
                                </button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent 
                                align="start" 
                                className="z-[100] bg-popover"
                                sideOffset={5}
                              >
                                {[1, 2, 3, 4, 5].map((mins) => (
                                  <DropdownMenuItem 
                                    key={mins}
                                    onClick={() => handleDurationChange(phrase.id, mins)}
                                    className={phrase.durationMinutes === mins ? "bg-muted" : ""}
                                  >
                                    <Clock className="w-4 h-4 mr-2" />
                                    {mins} {t.minutes}
                                  </DropdownMenuItem>
                                ))}
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>

                        <Button
                          variant="ghost"
                          size="icon"
                          className="flex-shrink-0 text-destructive hover:text-destructive"
                          onClick={() => handleRemove(phrase.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>

                      {playingId === phrase.id && audioPlayer.duration > 0 && !sequentialPlayer.isPlaying && (
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
                    </SortablePhrase>
                  ))}
                </div>
              </SortableContext>
            </DndContext>

            {/* Add More Button */}
            <Link to="/library">
              <Card className="p-4 border-2 border-dashed cursor-pointer hover:bg-muted/50 transition-colors">
                <div className="flex items-center justify-center gap-2 text-muted-foreground">
                  <Plus className="w-5 h-5" />
                  <span>{t.addPhrases}</span>
                </div>
              </Card>
            </Link>
          </>
        )}

        <div className="h-20" />
        </main>
      </div>
    </PageTransition>
  );
};

export default Favorites;
