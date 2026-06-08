import { useState, useEffect } from 'react';
import { UserMenu } from "@/components/UserMenu";
import { SpeedSelector } from "@/components/audio/SpeedSelector";
import { LanguageSelector } from "@/components/LanguageSelector";
import { Link, useNavigate } from 'react-router-dom';
import { PageTransition } from "@/components/PageTransition";
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger, DropdownMenuSub, DropdownMenuSubTrigger, DropdownMenuSubContent } from '@/components/ui/dropdown-menu';
import { Switch } from '@/components/ui/switch';
import { SortablePhrase } from '@/components/SortablePhrase';
import { PlayButton } from '@/components/audio/PlayButton';
import { AudioControls } from '@/components/audio/AudioControls';
import { PremiumGate } from '@/components/PremiumGate';
import { useRoutines, Routine, RoutinePhrase } from '@/hooks/useRoutines';
import { useSubscription } from '@/hooks/useSubscription';
import { useAudioPlayer } from '@/hooks/useAudioPlayer';
import { useTextToSpeech } from '@/hooks/useTextToSpeech';
import { useAudioPreloader } from '@/hooks/useAudioPreloader';
import { useSequentialPlayer, PlayablePhrase } from '@/hooks/useSequentialPlayer';
import { useLanguage } from '@/contexts/LanguageContext';
import { toast } from 'sonner';
import { ArrowLeft, Plus, MoreVertical, Shuffle, Clock, Play, Trash2, Edit, ListMusic, ChevronRight, Lock, Crown, Check, Sparkles, Square } from 'lucide-react';
import { cn } from '@/lib/utils';
import { presetRoutines, PresetRoutine } from '@/data/presetRoutines';

const Routines = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const {
    routines,
    isLoading,
    createRoutine,
    updateRoutine,
    deleteRoutine,
    getRoutinePhrases,
    addPhraseToRoutine,
    removePhraseFromRoutine,
    reorderRoutinePhrases
  } = useRoutines();
  const { isPremium, maxRoutines } = useSubscription();
  const audioPlayer = useAudioPlayer();
  const { generate, isGenerating } = useTextToSpeech();
  const sequentialPlayer = useSequentialPlayer();
  const { preloadMany } = useAudioPreloader();
  const [selectedRoutine, setSelectedRoutine] = useState<Routine | null>(null);
  const [routinePhrases, setRoutinePhrases] = useState<RoutinePhrase[]>([]);
  const [showNewRoutineDialog, setShowNewRoutineDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [newRoutineName, setNewRoutineName] = useState('');
  const [editingRoutine, setEditingRoutine] = useState<Routine | null>(null);
  const [playingId, setPlayingId] = useState<string | null>(null);
  const sensors = useSensors(useSensor(PointerSensor), useSensor(KeyboardSensor, {
    coordinateGetter: sortableKeyboardCoordinates
  }));
  const [isAddingPreset, setIsAddingPreset] = useState(false);

  const texts = {
    pt: {
      title: 'Minhas Rotinas',
      subtitle: 'Crie e gerencie suas rotinas',
      empty: 'Nenhuma rotina criada ainda',
      createRoutine: 'Criar Rotina',
      newRoutine: 'Nova Rotina',
      routineName: 'Nome da rotina',
      cancel: 'Cancelar',
      create: 'Criar',
      save: 'Salvar',
      editName: 'Editar Nome',
      playRandom: 'Tocar Aleatório',
      interval: 'Intervalo',
      minutes: 'min',
      deleteRoutine: 'Excluir Rotina',
      addPhrases: 'Adicionar Frases',
      noPhrases: 'Nenhuma frase nesta rotina',
      deleted: 'Rotina excluída',
      created: 'Rotina criada!',
      updated: 'Rotina atualizada!',
      limitReached: 'Limite de rotinas atingido',
      limitMessage: 'Plano básico permite até 3 rotinas',
      phrases: 'frases',
      presetRoutines: 'Rotinas Sugeridas',
      presetSubtitle: 'Adicione rotinas prontas com um toque',
      adding: 'Adicionando...',
      playAll: 'Tocar Todas',
      stopAll: 'Parar',
      playing: 'Tocando',
      remaining: 'restante',
      added: 'Rotina adicionada!'
    },
    en: {
      title: 'My Routines',
      subtitle: 'Create and manage your routines',
      empty: 'No routines created yet',
      createRoutine: 'Create Routine',
      newRoutine: 'New Routine',
      routineName: 'Routine name',
      cancel: 'Cancel',
      create: 'Create',
      save: 'Save',
      editName: 'Edit Name',
      playRandom: 'Play Random',
      interval: 'Interval',
      minutes: 'min',
      deleteRoutine: 'Delete Routine',
      addPhrases: 'Add Phrases',
      noPhrases: 'No phrases in this routine',
      deleted: 'Routine deleted',
      created: 'Routine created!',
      updated: 'Routine updated!',
      limitReached: 'Routine limit reached',
      limitMessage: 'Basic plan allows up to 3 routines',
      phrases: 'phrases',
      presetRoutines: 'Suggested Routines',
      presetSubtitle: 'Add ready-made routines with a tap',
      adding: 'Adding...',
      added: 'Routine added!',
      playAll: 'Play All',
      stopAll: 'Stop',
      playing: 'Playing',
      remaining: 'remaining',
    },
    es: {
      title: 'Mis Rutinas',
      subtitle: 'Crea y gestiona tus rutinas',
      empty: 'No hay rutinas creadas aún',
      createRoutine: 'Crear Rutina',
      newRoutine: 'Nueva Rutina',
      routineName: 'Nombre de la rutina',
      cancel: 'Cancelar',
      create: 'Crear',
      save: 'Guardar',
      editName: 'Editar Nombre',
      playRandom: 'Reproducir Aleatorio',
      interval: 'Intervalo',
      minutes: 'min',
      deleteRoutine: 'Eliminar Rutina',
      addPhrases: 'Agregar Frases',
      noPhrases: 'No hay frases en esta rutina',
      deleted: 'Rutina eliminada',
      created: '¡Rutina creada!',
      updated: '¡Rutina actualizada!',
      limitReached: 'Límite de rutinas alcanzado',
      limitMessage: 'El plan básico permite hasta 3 rutinas',
      phrases: 'frases',
      presetRoutines: 'Rutinas Sugeridas',
      presetSubtitle: 'Agrega rutinas listas con un toque',
      adding: 'Agregando...',
      added: '¡Rutina agregada!',
      playAll: 'Reproducir Todas',
      stopAll: 'Parar',
      playing: 'Reproduciendo',
      remaining: 'restante',
    }
  };
  const t = texts[language as keyof typeof texts] || texts.pt;

  const handlePlayAll = () => {
    if (sequentialPlayer.isPlaying) {
      sequentialPlayer.stop();
    } else {
      const playablePhrases: PlayablePhrase[] = routinePhrases.map(phrase => ({
        id: phrase.id,
        text: phrase.phrase_text,
      }));
      sequentialPlayer.startPlayAll(
        playablePhrases, 
        selectedRoutine?.play_random || false,
        selectedRoutine?.interval_minutes || 1
      );
    }
  };

  const formatTimeRemaining = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    if (selectedRoutine) {
      loadRoutinePhrases(selectedRoutine.id);
    }
  }, [selectedRoutine]);

  useEffect(() => {
    if (routinePhrases.length > 0) {
      preloadMany(
        routinePhrases.slice(0, 20).map(p => ({ text: p.phrase_text, language: language as 'pt' | 'en' | 'es' })),
        { delayMs: 200, maxConcurrent: 2 }
      );
    }
  }, [routinePhrases, language, preloadMany]);

  const loadRoutinePhrases = async (routineId: string) => {
    const phrases = await getRoutinePhrases(routineId);
    setRoutinePhrases(phrases);
  };

  const handleCreateRoutine = async () => {
    if (!newRoutineName.trim()) return;
    if (!isPremium && routines.length >= maxRoutines) {
      toast.error(t.limitReached, { description: t.limitMessage });
      return;
    }
    const routine = await createRoutine(newRoutineName.trim());
    if (routine) {
      toast.success(t.created);
      setShowNewRoutineDialog(false);
      setNewRoutineName('');
    }
  };

  const handleDeleteRoutine = async (routine: Routine) => {
    const success = await deleteRoutine(routine.id);
    if (success) {
      toast.success(t.deleted);
      if (selectedRoutine?.id === routine.id) {
        setSelectedRoutine(null);
        setRoutinePhrases([]);
      }
    }
  };

  const handleUpdateSettings = async (routine: Routine, updates: Partial<Pick<Routine, 'play_random' | 'interval_minutes'>>) => {
    await updateRoutine(routine.id, updates);
    if (selectedRoutine?.id === routine.id) {
      setSelectedRoutine({ ...selectedRoutine, ...updates });
    }
    toast.success(t.updated);
  };

  const handleEditName = async () => {
    if (!editingRoutine || !newRoutineName.trim()) return;
    await updateRoutine(editingRoutine.id, { name: newRoutineName.trim() });
    if (selectedRoutine?.id === editingRoutine.id) {
      setSelectedRoutine({ ...selectedRoutine, name: newRoutineName.trim() });
    }
    toast.success(t.updated);
    setShowEditDialog(false);
    setEditingRoutine(null);
    setNewRoutineName('');
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id && selectedRoutine) {
      const oldIndex = routinePhrases.findIndex(p => p.id === active.id);
      const newIndex = routinePhrases.findIndex(p => p.id === over.id);
      const newOrder = arrayMove(routinePhrases, oldIndex, newIndex);
      setRoutinePhrases(newOrder);
      await reorderRoutinePhrases(selectedRoutine.id, newOrder.map(p => p.id));
    }
  };

  const handlePlay = async (phrase: RoutinePhrase) => {
    if (playingId === phrase.id && audioPlayer.isPlaying) {
      audioPlayer.pause();
      setPlayingId(null);
      return;
    }
    try {
      setPlayingId(phrase.id);
      const { url } = await generate({
        text: phrase.phrase_text,
        language: language as 'pt' | 'en' | 'es'
      });
      if (url) {
        await audioPlayer.play(url);
      }
    } catch (error) {
      console.error('Error playing phrase:', error);
      setPlayingId(null);
    }
  };

  const handleRemovePhrase = async (phraseId: string) => {
    if (!selectedRoutine) return;
    await removePhraseFromRoutine(phraseId);
    setRoutinePhrases(prev => prev.filter(p => p.id !== phraseId));
  };

  const canCreateMore = isPremium || routines.length < maxRoutines;

  if (selectedRoutine) {
    return (
      <PageTransition>
        <div className="min-h-screen bg-gradient-to-br from-muted via-background to-secondary/5">
          <header className="sticky top-0 z-50 glass border-b border-border/50 backdrop-blur-lg">
            <div className="container mx-auto px-4 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Button variant="ghost" size="icon" onClick={() => setSelectedRoutine(null)}>
                    <ArrowLeft className="w-5 h-5" />
                  </Button>
                  <div>
                    <h1 className="text-xl font-bold">{selectedRoutine.name}</h1>
                    <p className="text-xs text-muted-foreground">
                      {routinePhrases.length} {t.phrases}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <SpeedSelector />
                  <LanguageSelector />
                  <UserMenu />
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="icon">
                        <MoreVertical className="w-5 h-5" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-popover">
                      <DropdownMenuItem onClick={() => {
                        setEditingRoutine(selectedRoutine);
                        setNewRoutineName(selectedRoutine.name);
                        setShowEditDialog(true);
                      }}>
                        <Edit className="w-4 h-4 mr-2" />
                        {t.editName}
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem 
                        className="flex items-center justify-between"
                        onClick={(e) => {
                          e.preventDefault();
                          handleUpdateSettings(selectedRoutine, {
                            play_random: !selectedRoutine.play_random
                          });
                        }}
                      >
                        <div className="flex items-center">
                          <Shuffle className="w-4 h-4 mr-2" />
                          {t.playRandom}
                        </div>
                        <Switch 
                          checked={selectedRoutine.play_random} 
                          onCheckedChange={(checked) => handleUpdateSettings(selectedRoutine, { play_random: checked })}
                        />
                      </DropdownMenuItem>
                      <DropdownMenuSub>
                        <DropdownMenuSubTrigger>
                          <Clock className="w-4 h-4 mr-2" />
                          {t.interval}
                        </DropdownMenuSubTrigger>
                        <DropdownMenuSubContent className="bg-popover">
                          {[1, 3, 5].map(interval => (
                            <DropdownMenuItem 
                              key={interval} 
                              onClick={() => handleUpdateSettings(selectedRoutine, { interval_minutes: interval })}
                              className="flex items-center justify-between"
                            >
                              <span>{interval} {t.minutes}</span>
                              {selectedRoutine.interval_minutes === interval && (
                                <Check className="w-4 h-4 ml-2 text-primary" />
                              )}
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuSubContent>
                      </DropdownMenuSub>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive" onClick={() => handleDeleteRoutine(selectedRoutine)}>
                        <Trash2 className="w-4 h-4 mr-2" />
                        {t.deleteRoutine}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </div>
          </header>

          <main className="container mx-auto px-4 py-8 max-w-2xl space-y-8 animate-fade-in">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              {selectedRoutine.play_random && <Badge variant="secondary" className="gap-1">
                <Shuffle className="w-3 h-3" />
                {t.playRandom}
              </Badge>}
              <Badge variant="outline" className="gap-1">
                <Clock className="w-3 h-3" />
                {selectedRoutine.interval_minutes} {t.minutes}
              </Badge>
            </div>

            {routinePhrases.length > 0 && (
              <Card className={cn("p-4 transition-colors", sequentialPlayer.isPlaying && "bg-primary/10 border-primary")}>
                <div className="flex items-center justify-between">
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
                  {sequentialPlayer.isPlaying && (
                    <div className="text-right">
                      <p className="text-sm font-medium text-primary">
                        {t.playing} {sequentialPlayer.currentIndex + 1}/{sequentialPlayer.totalPhrases}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {formatTimeRemaining(sequentialPlayer.timeRemaining)} {t.remaining}
                      </p>
                    </div>
                  )}
                </div>
              </Card>
            )}

            {routinePhrases.length === 0 ? (
              <Card className="p-8 text-center border-2 border-dashed">
                <ListMusic className="w-16 h-16 mx-auto mb-4 text-muted-foreground/50" />
                <p className="text-muted-foreground mb-4">{t.noPhrases}</p>
                <Link to="/library">
                  <Button variant="gradient">
                    <Plus className="w-4 h-4 mr-2" />
                    {t.addPhrases}
                  </Button>
                </Link>
              </Card>
            ) : (
              <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                <SortableContext items={routinePhrases.map(p => p.id)} strategy={verticalListSortingStrategy}>
                  <div className="space-y-2">
                    {routinePhrases.map(phrase => (
                      <SortablePhrase key={phrase.id} id={phrase.id}>
                        <div className={cn(
                          "flex items-start gap-3 transition-colors",
                          sequentialPlayer.currentPhraseId === phrase.id && "bg-primary/5 -mx-3 px-3 py-2 rounded-lg ring-1 ring-primary/20"
                        )}>
                          <PlayButton 
                            isPlaying={(playingId === phrase.id && audioPlayer.isPlaying) || sequentialPlayer.currentPhraseId === phrase.id} 
                            isLoading={isGenerating && playingId === phrase.id} 
                            onPlay={() => handlePlay(phrase)} 
                            onPause={audioPlayer.pause} 
                            variant="secondary" size="icon" className="flex-shrink-0" 
                          />
                          <div className="flex-1 min-w-0">
                            <p className={cn("text-sm font-medium break-words", sequentialPlayer.currentPhraseId === phrase.id && "text-primary")}>
                              {phrase.phrase_text}
                            </p>
                          </div>
                          <Button variant="ghost" size="icon" className="flex-shrink-0 text-destructive hover:text-destructive" onClick={() => handleRemovePhrase(phrase.id)}>
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
            )}

            <Link to="/library">
              <Card className="p-4 border-2 border-dashed cursor-pointer hover:bg-muted/50 transition-colors">
                <div className="flex items-center justify-center gap-2 text-muted-foreground">
                  <Plus className="w-5 h-5" />
                  <span>{t.addPhrases}</span>
                </div>
              </Card>
            </Link>

            <div className="h-20" />
          </main>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-br from-muted via-background to-secondary/5">
        <header className="sticky top-0 z-50 glass border-b border-border/50 backdrop-blur-lg">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Button variant="ghost" size="icon" onClick={() => navigate('/')}>
                  <ArrowLeft className="w-5 h-5" />
                </Button>
                <div>
                  <h1 className="text-xl font-bold flex items-center gap-2">
                    <ListMusic className="w-5 h-5" />
                    {t.title}
                  </h1>
                  <p className="text-xs text-muted-foreground">{t.subtitle}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <SpeedSelector />
                <LanguageSelector />
                <UserMenu />
              </div>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8 max-w-2xl space-y-8 animate-fade-in">
          <Button variant="gradient" size="lg" className="w-full gap-2" onClick={() => {
            if (canCreateMore) {
              setShowNewRoutineDialog(true);
            } else {
              toast.error(t.limitReached, { description: t.limitMessage });
            }
          }}>
            <Plus className="w-5 h-5" />
            {t.createRoutine}
            {!canCreateMore && <Lock className="w-4 h-4 ml-2" />}
          </Button>

          {!isPremium && routines.length >= maxRoutines && (
            <Card className="p-4 bg-primary/5 border-primary/20">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <Crown className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold">{t.limitReached}</h3>
                  <p className="text-sm text-muted-foreground">{t.limitMessage}</p>
                </div>
              </div>
            </Card>
          )}

          <div className="space-y-3">
            {routines.map((routine, index) => (
              <Card key={routine.id} className="p-4 border-2 cursor-pointer hover-lift animate-fade-in" style={{ animationDelay: `${index * 0.05}s` }} onClick={() => setSelectedRoutine(routine)}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-secondary to-accent flex items-center justify-center">
                      <ListMusic className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{routine.name}</h3>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        {routine.play_random && <Shuffle className="w-3 h-3" />}
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {routine.interval_minutes}min
                        </span>
                      </div>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground" />
                </div>
              </Card>
            ))}
          </div>

          <div className="h-20" />
        </main>

        <Dialog open={showNewRoutineDialog} onOpenChange={setShowNewRoutineDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{t.newRoutine}</DialogTitle>
            </DialogHeader>
            <Input value={newRoutineName} onChange={e => setNewRoutineName(e.target.value)} placeholder={t.routineName} className="mt-4" />
            <DialogFooter className="mt-4">
              <Button variant="outline" onClick={() => setShowNewRoutineDialog(false)}>
                {t.cancel}
              </Button>
              <Button onClick={handleCreateRoutine} disabled={!newRoutineName.trim()}>
                {t.create}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{t.editName}</DialogTitle>
            </DialogHeader>
            <Input value={newRoutineName} onChange={e => setNewRoutineName(e.target.value)} placeholder={t.routineName} className="mt-4" />
            <DialogFooter className="mt-4">
              <Button variant="outline" onClick={() => setShowEditDialog(false)}>
                {t.cancel}
              </Button>
              <Button onClick={handleEditName} disabled={!newRoutineName.trim()}>
                {t.save}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </PageTransition>
  );
};

export default Routines;
