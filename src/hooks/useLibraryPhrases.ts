import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

export interface LibraryPhrase {
  id: string;
  text_pt: string;
  text_en: string | null;
  text_es: string | null;
  category: string;
  time_of_day: string | null;
  audio_url_pt: string | null;
  audio_url_en: string | null;
  audio_url_es: string | null;
  is_active: boolean;
  created_by: string | null;
  created_at: string;
  updated_at: string;
}

export interface CreatePhraseInput {
  text_pt: string;
  text_en?: string;
  text_es?: string;
  category: string;
  time_of_day?: string;
  audio_url_pt?: string;
  audio_url_en?: string;
  audio_url_es?: string;
}

export const useLibraryPhrases = () => {
  const { user } = useAuth();
  const [phrases, setPhrases] = useState<LibraryPhrase[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchPhrases = async () => {
    try {
      const { data, error } = await supabase
        .from('library_phrases')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPhrases(data || []);
    } catch (error) {
      console.error('Error fetching library phrases:', error);
      toast.error('Erro ao carregar frases');
    } finally {
      setIsLoading(false);
    }
  };

  const createPhrase = async (input: CreatePhraseInput) => {
    try {
      const { data, error } = await supabase
        .from('library_phrases')
        .insert({
          ...input,
          created_by: user?.id,
        })
        .select()
        .single();

      if (error) throw error;
      setPhrases(prev => [data, ...prev]);
      toast.success('Frase criada com sucesso!');
      return data;
    } catch (error) {
      console.error('Error creating phrase:', error);
      toast.error('Erro ao criar frase');
      throw error;
    }
  };

  const updatePhrase = async (id: string, input: Partial<CreatePhraseInput> & { is_active?: boolean }) => {
    try {
      const { data, error } = await supabase
        .from('library_phrases')
        .update(input)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      setPhrases(prev => prev.map(p => p.id === id ? data : p));
      toast.success('Frase atualizada!');
      return data;
    } catch (error) {
      console.error('Error updating phrase:', error);
      toast.error('Erro ao atualizar frase');
      throw error;
    }
  };

  const deletePhrase = async (id: string) => {
    try {
      const { error } = await supabase
        .from('library_phrases')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setPhrases(prev => prev.filter(p => p.id !== id));
      toast.success('Frase excluída!');
    } catch (error) {
      console.error('Error deleting phrase:', error);
      toast.error('Erro ao excluir frase');
      throw error;
    }
  };

  const uploadAudio = async (file: File, phraseId: string, language: 'pt' | 'en' | 'es') => {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${phraseId}_${language}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('library-audio')
        .upload(filePath, file, { upsert: true });

      if (uploadError) throw uploadError;

      const { data: urlData } = supabase.storage
        .from('library-audio')
        .getPublicUrl(filePath);

      return urlData.publicUrl;
    } catch (error) {
      console.error('Error uploading audio:', error);
      toast.error('Erro ao fazer upload do áudio');
      throw error;
    }
  };

  useEffect(() => {
    fetchPhrases();
  }, []);

  return {
    phrases,
    isLoading,
    createPhrase,
    updatePhrase,
    deletePhrase,
    uploadAudio,
    refetch: fetchPhrases,
  };
};
