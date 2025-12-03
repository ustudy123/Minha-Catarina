import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export interface SavedPhrase {
  id: string;
  text: string;
  language: string;
  audioUrl?: string;
  category?: string;
  createdAt: number;
  isFavorite?: boolean;
}

interface DbPhrase {
  id: string;
  user_id: string;
  text: string;
  language: string;
  audio_url: string | null;
  category: string | null;
  is_favorite: boolean;
  created_at: string;
}

const mapDbToSavedPhrase = (dbPhrase: DbPhrase): SavedPhrase => ({
  id: dbPhrase.id,
  text: dbPhrase.text,
  language: dbPhrase.language,
  audioUrl: dbPhrase.audio_url || undefined,
  category: dbPhrase.category || undefined,
  createdAt: new Date(dbPhrase.created_at).getTime(),
  isFavorite: dbPhrase.is_favorite,
});

export const useSavedPhrases = () => {
  const { user } = useAuth();
  const [phrases, setPhrases] = useState<SavedPhrase[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch phrases from Supabase
  const fetchPhrases = useCallback(async () => {
    if (!user) {
      setPhrases([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    const { data, error } = await supabase
      .from('saved_phrases')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching phrases:', error);
    } else {
      setPhrases((data || []).map(mapDbToSavedPhrase));
    }
    setIsLoading(false);
  }, [user]);

  useEffect(() => {
    fetchPhrases();
  }, [fetchPhrases]);

  const addPhrase = useCallback(async (phrase: Omit<SavedPhrase, 'id' | 'createdAt'>) => {
    if (!user) return null;

    const { data, error } = await supabase
      .from('saved_phrases')
      .insert({
        user_id: user.id,
        text: phrase.text,
        language: phrase.language,
        audio_url: phrase.audioUrl || null,
        category: phrase.category || null,
        is_favorite: phrase.isFavorite || false,
      })
      .select()
      .single();

    if (error) {
      console.error('Error adding phrase:', error);
      return null;
    }

    const newPhrase = mapDbToSavedPhrase(data);
    setPhrases(prev => [newPhrase, ...prev]);
    return newPhrase;
  }, [user]);

  const removePhrase = useCallback(async (id: string) => {
    if (!user) return;

    const { error } = await supabase
      .from('saved_phrases')
      .delete()
      .eq('id', id)
      .eq('user_id', user.id);

    if (error) {
      console.error('Error removing phrase:', error);
      return;
    }

    setPhrases(prev => prev.filter(p => p.id !== id));
  }, [user]);

  const toggleFavorite = useCallback(async (id: string) => {
    if (!user) return;

    const phrase = phrases.find(p => p.id === id);
    if (!phrase) return;

    const newValue = !phrase.isFavorite;

    const { error } = await supabase
      .from('saved_phrases')
      .update({ is_favorite: newValue })
      .eq('id', id)
      .eq('user_id', user.id);

    if (error) {
      console.error('Error toggling favorite:', error);
      return;
    }

    setPhrases(prev => 
      prev.map(p => 
        p.id === id ? { ...p, isFavorite: newValue } : p
      )
    );
  }, [user, phrases]);

  const updatePhrase = useCallback(async (id: string, updates: Partial<SavedPhrase>) => {
    if (!user) return;

    const dbUpdates: Record<string, unknown> = {};
    if (updates.text !== undefined) dbUpdates.text = updates.text;
    if (updates.language !== undefined) dbUpdates.language = updates.language;
    if (updates.audioUrl !== undefined) dbUpdates.audio_url = updates.audioUrl;
    if (updates.category !== undefined) dbUpdates.category = updates.category;
    if (updates.isFavorite !== undefined) dbUpdates.is_favorite = updates.isFavorite;

    const { error } = await supabase
      .from('saved_phrases')
      .update(dbUpdates)
      .eq('id', id)
      .eq('user_id', user.id);

    if (error) {
      console.error('Error updating phrase:', error);
      return;
    }

    setPhrases(prev => 
      prev.map(p => 
        p.id === id ? { ...p, ...updates } : p
      )
    );
  }, [user]);

  const getPhraseById = useCallback((id: string) => {
    return phrases.find(p => p.id === id);
  }, [phrases]);

  const getFavorites = useCallback(() => {
    return phrases.filter(p => p.isFavorite);
  }, [phrases]);

  return {
    phrases,
    isLoading,
    addPhrase,
    removePhrase,
    toggleFavorite,
    updatePhrase,
    getPhraseById,
    getFavorites,
    refetch: fetchPhrases,
  };
};
