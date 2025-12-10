import { useState } from 'react';
import { Link } from 'react-router-dom';
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
} from '@/components/ui/dropdown-menu';
import { SortablePhrase } from '@/components/SortablePhrase';
import { PlayButton } from '@/components/audio/PlayButton';
import { AudioControls } from '@/components/audio/AudioControls';
import { useFavorites } from '@/hooks/useFavorites';
import { useAudioPlayer } from '@/hooks/useAudioPlayer';
import { useTextToSpeech } from '@/hooks/useTextToSpeech';
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
} from 'lucide-react';
import { cn } from '@/lib/utils';

const Favorites = () => {
  const { language } = useLanguage();
  const {
    favorites,
    playRandom,
    intervalMinutes,
    reorderFavorites,
    removeFavorite,
    updateSettings,
  } = useFavorites();
  const audioPlayer = useAudioPlayer();
  const { generate, isGenerating } = useTextToSpeech();
  const [playingId, setPlayingId] = useState<string | null>(null);

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
      playRandom: 'Tocar Aleatório',
      interval: 'Intervalo',
      minutes: 'min',
      removed: 'Removido dos favoritos',
    },
    en: {
      title: 'Favorites',
      subtitle: 'Your favorite phrases',
      empty: 'No favorite phrases yet',
      addPhrases: 'Add Phrases',
      playAll: 'Play All',
      playRandom: 'Play Random',
      interval: 'Interval',
      minutes: 'min',
      removed: 'Removed from favorites',
    },
    es: {
      title: 'Favoritas',
      subtitle: 'Tus frases preferidas',
      empty: 'No hay frases favoritas aún',
      addPhrases: 'Agregar Frases',
      playAll: 'Reproducir Todas',
      playRandom: 'Reproducir Aleatorio',
      interval: 'Intervalo',
      minutes: 'min',
      removed: 'Eliminado de favoritos',
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

  const handlePlay = async (phraseId: string, text: string) => {
    if (playingId === phraseId && audioPlayer.isPlaying) {
      audioPlayer.pause();
      setPlayingId(null);
      return;
    }

    try {
      setPlayingId(phraseId);
      const { url } = await generate({ text, language });
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

  const handleIntervalChange = (interval: number) => {
    updateSettings(playRandom, interval);
  };

  const handleToggleRandom = () => {
    updateSettings(!playRandom, intervalMinutes);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-muted via-background to-highlight/10">
      {/* Header */}
      <header className="sticky top-0 z-50 glass border-b border-border/50 backdrop-blur-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" onClick={() => window.history.back()}>
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
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={handleToggleRandom}>
                  <Shuffle className="w-4 h-4 mr-2" />
                  {t.playRandom}
                  {playRandom && <Badge className="ml-2">ON</Badge>}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleIntervalChange(1)}>
                  <Clock className="w-4 h-4 mr-2" />
                  {t.interval}: 1 {t.minutes}
                  {intervalMinutes === 1 && <Badge className="ml-2">✓</Badge>}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleIntervalChange(3)}>
                  <Clock className="w-4 h-4 mr-2" />
                  {t.interval}: 3 {t.minutes}
                  {intervalMinutes === 3 && <Badge className="ml-2">✓</Badge>}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleIntervalChange(5)}>
                  <Clock className="w-4 h-4 mr-2" />
                  {t.interval}: 5 {t.minutes}
                  {intervalMinutes === 5 && <Badge className="ml-2">✓</Badge>}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 max-w-2xl space-y-6">
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
            {/* Settings Bar */}
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              {playRandom && (
                <Badge variant="secondary" className="gap-1">
                  <Shuffle className="w-3 h-3" />
                  {t.playRandom}
                </Badge>
              )}
              <Badge variant="outline" className="gap-1">
                <Clock className="w-3 h-3" />
                {intervalMinutes} {t.minutes}
              </Badge>
            </div>

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
                      <div className="flex items-start gap-3">
                        <PlayButton
                          isPlaying={playingId === phrase.id && audioPlayer.isPlaying}
                          isLoading={isGenerating && playingId === phrase.id}
                          onPlay={() => handlePlay(phrase.id, phrase.text)}
                          onPause={audioPlayer.pause}
                          variant="secondary"
                          size="icon"
                          className="flex-shrink-0"
                        />

                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium break-words">{phrase.text}</p>
                          <Badge variant="secondary" className="text-xs mt-1">
                            {phrase.category}
                          </Badge>
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
  );
};

export default Favorites;
