import { useState } from 'react';
import { MoreVertical, Plus, ListPlus, Trash2, PlayCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useRoutines, Routine } from '@/hooks/useRoutines';
import { useLanguage } from '@/contexts/LanguageContext';
import { toast } from 'sonner';

interface PhraseOptionsMenuProps {
  phraseId: string;
  phraseText: string;
  phraseSource: 'library' | 'saved' | 'favorites';
  onRemoveFromRoutine?: (routineId: string) => void;
  currentRoutineId?: string;
  onPlayFromHere?: () => void;
}

export function PhraseOptionsMenu({
  phraseId,
  phraseText,
  phraseSource,
  onRemoveFromRoutine,
  currentRoutineId,
  onPlayFromHere,
}: PhraseOptionsMenuProps) {
  const { routines, createRoutine, addPhraseToRoutine } = useRoutines();
  const { language } = useLanguage();
  const [showNewRoutineDialog, setShowNewRoutineDialog] = useState(false);
  const [newRoutineName, setNewRoutineName] = useState('');

  const texts = {
    pt: {
      addToRoutine: 'Adicionar à rotina...',
      addToNewRoutine: 'Adicionar à nova rotina',
      removeFromRoutine: 'Remover da rotina',
      noRoutines: 'Nenhuma rotina criada',
      newRoutineTitle: 'Nova Rotina',
      routineName: 'Nome da rotina',
      cancel: 'Cancelar',
      create: 'Criar',
      addedToRoutine: 'Adicionado à rotina!',
      routineCreated: 'Rotina criada!',
      playFromHere: 'Tocar a partir daqui',
    },
    en: {
      addToRoutine: 'Add to routine...',
      addToNewRoutine: 'Add to new routine',
      removeFromRoutine: 'Remove from routine',
      noRoutines: 'No routines created',
      newRoutineTitle: 'New Routine',
      routineName: 'Routine name',
      cancel: 'Cancel',
      create: 'Create',
      addedToRoutine: 'Added to routine!',
      routineCreated: 'Routine created!',
      playFromHere: 'Play from here',
    },
    es: {
      addToRoutine: 'Agregar a rutina...',
      addToNewRoutine: 'Agregar a nueva rutina',
      removeFromRoutine: 'Eliminar de rutina',
      noRoutines: 'No hay rutinas creadas',
      newRoutineTitle: 'Nueva Rutina',
      routineName: 'Nombre de la rutina',
      cancel: 'Cancelar',
      create: 'Crear',
      addedToRoutine: '¡Agregado a la rutina!',
      routineCreated: '¡Rutina creada!',
      playFromHere: 'Reproducir desde aquí',
    },
  };

  const t = texts[language];

  const handleAddToRoutine = async (routine: Routine) => {
    await addPhraseToRoutine(routine.id, phraseId, phraseText, phraseSource);
    toast.success(t.addedToRoutine);
  };

  const handleCreateAndAdd = async () => {
    if (!newRoutineName.trim()) return;

    const routine = await createRoutine(newRoutineName.trim());
    if (routine) {
      await addPhraseToRoutine(routine.id, phraseId, phraseText, phraseSource);
      toast.success(t.routineCreated);
      setShowNewRoutineDialog(false);
      setNewRoutineName('');
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="flex-shrink-0">
            <MoreVertical className="w-5 h-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          {onPlayFromHere && (
            <>
              <DropdownMenuItem onClick={onPlayFromHere}>
                <PlayCircle className="w-4 h-4 mr-2" />
                {t.playFromHere}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
            </>
          )}
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <ListPlus className="w-4 h-4 mr-2" />
              {t.addToRoutine}
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              {routines.length > 0 ? (
                routines.map(routine => (
                  <DropdownMenuItem
                    key={routine.id}
                    onClick={() => handleAddToRoutine(routine)}
                  >
                    {routine.name}
                  </DropdownMenuItem>
                ))
              ) : (
                <DropdownMenuItem disabled>
                  {t.noRoutines}
                </DropdownMenuItem>
              )}
            </DropdownMenuSubContent>
          </DropdownMenuSub>

          <DropdownMenuItem onClick={() => setShowNewRoutineDialog(true)}>
            <Plus className="w-4 h-4 mr-2" />
            {t.addToNewRoutine}
          </DropdownMenuItem>

          {currentRoutineId && onRemoveFromRoutine && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-destructive"
                onClick={() => onRemoveFromRoutine(currentRoutineId)}
              >
                <Trash2 className="w-4 h-4 mr-2" />
                {t.removeFromRoutine}
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={showNewRoutineDialog} onOpenChange={setShowNewRoutineDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t.newRoutineTitle}</DialogTitle>
          </DialogHeader>
          <Input
            value={newRoutineName}
            onChange={(e) => setNewRoutineName(e.target.value)}
            placeholder={t.routineName}
            className="mt-4"
          />
          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={() => setShowNewRoutineDialog(false)}>
              {t.cancel}
            </Button>
            <Button onClick={handleCreateAndAdd} disabled={!newRoutineName.trim()}>
              {t.create}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
