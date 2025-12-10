import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

export interface Routine {
  id: string;
  user_id: string;
  name: string;
  play_random: boolean;
  interval_minutes: number;
  created_at: string;
  updated_at: string;
}

export interface RoutinePhrase {
  id: string;
  routine_id: string;
  phrase_id: string;
  phrase_text: string;
  phrase_source: 'library' | 'saved' | 'favorites';
  position: number;
  created_at: string;
}

export function useRoutines() {
  const { user } = useAuth();
  const [routines, setRoutines] = useState<Routine[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchRoutines = useCallback(async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('routines')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching routines:', error);
        return;
      }

      setRoutines((data || []) as Routine[]);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      fetchRoutines();
    } else {
      setRoutines([]);
      setIsLoading(false);
    }
  }, [user, fetchRoutines]);

  const createRoutine = async (name: string) => {
    if (!user) return null;

    const { data, error } = await supabase
      .from('routines')
      .insert({
        user_id: user.id,
        name,
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating routine:', error);
      return null;
    }

    const newRoutine = data as Routine;
    setRoutines(prev => [newRoutine, ...prev]);
    return newRoutine;
  };

  const updateRoutine = async (id: string, updates: Partial<Pick<Routine, 'name' | 'play_random' | 'interval_minutes'>>) => {
    const { error } = await supabase
      .from('routines')
      .update(updates)
      .eq('id', id);

    if (error) {
      console.error('Error updating routine:', error);
      return false;
    }

    setRoutines(prev =>
      prev.map(r => (r.id === id ? { ...r, ...updates } : r))
    );
    return true;
  };

  const deleteRoutine = async (id: string) => {
    const { error } = await supabase
      .from('routines')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting routine:', error);
      return false;
    }

    setRoutines(prev => prev.filter(r => r.id !== id));
    return true;
  };

  const getRoutinePhrases = async (routineId: string): Promise<RoutinePhrase[]> => {
    const { data, error } = await supabase
      .from('routine_phrases')
      .select('*')
      .eq('routine_id', routineId)
      .order('position', { ascending: true });

    if (error) {
      console.error('Error fetching routine phrases:', error);
      return [];
    }

    return (data || []) as RoutinePhrase[];
  };

  const addPhraseToRoutine = async (
    routineId: string,
    phraseId: string,
    phraseText: string,
    phraseSource: 'library' | 'saved' | 'favorites'
  ) => {
    // Get current max position
    const phrases = await getRoutinePhrases(routineId);
    const maxPosition = phrases.length > 0 ? Math.max(...phrases.map(p => p.position)) : -1;

    const { data, error } = await supabase
      .from('routine_phrases')
      .insert({
        routine_id: routineId,
        phrase_id: phraseId,
        phrase_text: phraseText,
        phrase_source: phraseSource,
        position: maxPosition + 1,
      })
      .select()
      .single();

    if (error) {
      console.error('Error adding phrase to routine:', error);
      return null;
    }

    return data as RoutinePhrase;
  };

  const removePhraseFromRoutine = async (routinePhraseId: string) => {
    const { error } = await supabase
      .from('routine_phrases')
      .delete()
      .eq('id', routinePhraseId);

    if (error) {
      console.error('Error removing phrase from routine:', error);
      return false;
    }

    return true;
  };

  const reorderRoutinePhrases = async (routineId: string, phraseIds: string[]) => {
    // Update positions for all phrases
    const updates = phraseIds.map((id, index) => ({
      id,
      position: index,
    }));

    for (const update of updates) {
      await supabase
        .from('routine_phrases')
        .update({ position: update.position })
        .eq('id', update.id);
    }

    return true;
  };

  return {
    routines,
    isLoading,
    createRoutine,
    updateRoutine,
    deleteRoutine,
    getRoutinePhrases,
    addPhraseToRoutine,
    removePhraseFromRoutine,
    reorderRoutinePhrases,
    refetch: fetchRoutines,
  };
}
