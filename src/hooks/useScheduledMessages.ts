import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

export interface ScheduledMessage {
  id: string;
  user_id: string;
  phrase_id: string | null;
  custom_phrase: string | null;
  scheduled_time: string;
  repeat_days: string[];
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface CreateScheduleInput {
  phrase_id?: string;
  custom_phrase?: string;
  scheduled_time: string;
  repeat_days: string[];
  is_active?: boolean;
}

export function useScheduledMessages() {
  const { user } = useAuth();
  const [schedules, setSchedules] = useState<ScheduledMessage[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchSchedules = useCallback(async () => {
    if (!user) {
      setSchedules([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    const { data, error } = await supabase
      .from('scheduled_messages')
      .select('*')
      .eq('user_id', user.id)
      .order('scheduled_time', { ascending: true });

    if (error) {
      console.error('Error fetching schedules:', error);
      toast.error('Erro ao carregar agendamentos');
    } else {
      setSchedules(data || []);
    }
    setIsLoading(false);
  }, [user]);

  useEffect(() => {
    fetchSchedules();
  }, [fetchSchedules]);

  const createSchedule = useCallback(async (input: CreateScheduleInput) => {
    if (!user) return { error: new Error('No user logged in') };

    const { data, error } = await supabase
      .from('scheduled_messages')
      .insert({
        user_id: user.id,
        phrase_id: input.phrase_id || null,
        custom_phrase: input.custom_phrase || null,
        scheduled_time: input.scheduled_time,
        repeat_days: input.repeat_days,
        is_active: input.is_active ?? true,
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating schedule:', error);
      return { error };
    }

    setSchedules(prev => [...prev, data].sort((a, b) => 
      a.scheduled_time.localeCompare(b.scheduled_time)
    ));
    return { data, error: null };
  }, [user]);

  const updateSchedule = useCallback(async (id: string, updates: Partial<CreateScheduleInput>) => {
    if (!user) return { error: new Error('No user logged in') };

    const { data, error } = await supabase
      .from('scheduled_messages')
      .update(updates)
      .eq('id', id)
      .eq('user_id', user.id)
      .select()
      .single();

    if (error) {
      console.error('Error updating schedule:', error);
      return { error };
    }

    setSchedules(prev => 
      prev.map(s => s.id === id ? data : s).sort((a, b) => 
        a.scheduled_time.localeCompare(b.scheduled_time)
      )
    );
    return { data, error: null };
  }, [user]);

  const deleteSchedule = useCallback(async (id: string) => {
    if (!user) return { error: new Error('No user logged in') };

    const { error } = await supabase
      .from('scheduled_messages')
      .delete()
      .eq('id', id)
      .eq('user_id', user.id);

    if (error) {
      console.error('Error deleting schedule:', error);
      return { error };
    }

    setSchedules(prev => prev.filter(s => s.id !== id));
    return { error: null };
  }, [user]);

  const toggleActive = useCallback(async (id: string) => {
    const schedule = schedules.find(s => s.id === id);
    if (!schedule) return { error: new Error('Schedule not found') };

    return updateSchedule(id, { is_active: !schedule.is_active });
  }, [schedules, updateSchedule]);

  return {
    schedules,
    isLoading,
    createSchedule,
    updateSchedule,
    deleteSchedule,
    toggleActive,
    refetch: fetchSchedules,
  };
}
