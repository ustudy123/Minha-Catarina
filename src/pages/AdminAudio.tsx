import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Volume2, Play, Loader2, CheckCircle, XCircle, RefreshCw, Music, Upload, Trash2 } from 'lucide-react';
import { useTranslations } from '@/contexts/LanguageContext';
import { supabase } from '@/integrations/supabase/client';
import { getTranslations } from '@/translations';
import { toast } from 'sonner';
import { libraryPhrasesData } from '@/data/libraryPhrases';
import { getLibraryAudioKey } from '@/lib/libraryAudioKey';
import { useLibraryAudio } from '@/hooks/useLibraryAudio';

const MAX_SONG_FILE_MB = 20;

// Músicas que aceitam MP3 gravado pela equipe (as que têm `audioKey`).
const songs = libraryPhrasesData
  .filter(p => p.category === 'songs' && p.audioKey)
  .map(p => ({ ...p, phraseKey: getLibraryAudioKey(p) }));

// Caminho do arquivo no bucket a partir da URL pública.
const storagePathFromUrl = (url: string) => url.split('/library-audio/')[1]?.split('?')[0];

interface GenerationResult {
  phraseKey: string;
  success: boolean;
  audioUrl?: string;
  error?: string;
}

const AdminAudio = () => {
  const navigate = useNavigate();
  const t = useTranslations();
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentLanguage, setCurrentLanguage] = useState<string | null>(null);
  const [results, setResults] = useState<GenerationResult[]>([]);
  const [stats, setStats] = useState<{ generated: number; failed: number } | null>(null);

  const { audioMap, refetch: refetchAudioMap } = useLibraryAudio();
  const [busySongKey, setBusySongKey] = useState<string | null>(null);
  const fileInputs = useRef<Record<string, HTMLInputElement | null>>({});

  const handleUploadSong = async (phraseKey: string, audioKey: string, file: File) => {
    if (!file.type.startsWith('audio/')) {
      toast.error('Envie um arquivo de áudio (MP3).');
      return;
    }
    if (file.size > MAX_SONG_FILE_MB * 1024 * 1024) {
      toast.error(`Arquivo maior que ${MAX_SONG_FILE_MB} MB.`);
      return;
    }

    setBusySongKey(phraseKey);
    try {
      // Nome com timestamp: a URL muda a cada envio e o navegador não toca
      // a versão antiga em cache.
      const fileName = `songs/${audioKey}-${Date.now()}.mp3`;
      const { error: uploadError } = await supabase.storage
        .from('library-audio')
        .upload(fileName, file, { contentType: file.type || 'audio/mpeg' });
      if (uploadError) throw uploadError;

      const { data: urlData } = supabase.storage.from('library-audio').getPublicUrl(fileName);
      const previousUrl = audioMap[phraseKey];

      const { error: dbError } = await supabase
        .from('library_audio')
        .upsert(
          { phrase_key: phraseKey, category: 'songs', language: 'pt', audio_url: urlData.publicUrl },
          { onConflict: 'phrase_key' },
        );
      if (dbError) throw dbError;

      const previousPath = previousUrl && storagePathFromUrl(previousUrl);
      if (previousPath) {
        await supabase.storage.from('library-audio').remove([previousPath]);
      }

      await refetchAudioMap();
      toast.success('Música enviada. A Biblioteca já toca esta gravação.');
    } catch (error) {
      console.error('Error uploading song:', error);
      toast.error(`Erro ao enviar: ${error instanceof Error ? error.message : 'erro desconhecido'}`);
    } finally {
      setBusySongKey(null);
    }
  };

  const handleRemoveSong = async (phraseKey: string) => {
    const currentUrl = audioMap[phraseKey];
    if (!currentUrl) return;

    setBusySongKey(phraseKey);
    try {
      const { error } = await supabase.from('library_audio').delete().eq('phrase_key', phraseKey);
      if (error) throw error;

      const path = storagePathFromUrl(currentUrl);
      if (path) {
        await supabase.storage.from('library-audio').remove([path]);
      }

      await refetchAudioMap();
      toast.success('Gravação removida. A música volta a ser gerada por IA.');
    } catch (error) {
      console.error('Error removing song:', error);
      toast.error('Erro ao remover a gravação');
    } finally {
      setBusySongKey(null);
    }
  };

  // A Biblioteca toca sempre o texto original (PT), então os áudios fixos
  // são gerados uma vez só, sem variação por idioma.
  const languages = ['pt'] as const;

  const generateAudioForLanguage = async (lang: typeof languages[number]) => {
    const translations = getTranslations(lang);
    // Músicas ficam de fora: elas recebem MP3 gravado pela equipe na seção
    // abaixo, e a geração em lote sobrescreveria essas gravações com fala.
    const phrases = translations.library.prerecordedPhrases.filter(p => p.category !== 'songs');
    
    // Prepare phrases for generation
    const phrasesToGenerate = phrases.map((phrase) => {
      const isSfx = phrase.category === 'sounds';
      return {
        phraseKey: getLibraryAudioKey(phrase),
        text: phrase.text,
        category: phrase.category,
        isSfx,
        soundPrompt: (phrase as { soundPrompt?: string }).soundPrompt,
      };
    });

    // Generate in batches of 5 to avoid timeouts
    const batchSize = 5;
    const batches = [];
    for (let i = 0; i < phrasesToGenerate.length; i += batchSize) {
      batches.push(phrasesToGenerate.slice(i, i + batchSize));
    }

    let allResults: GenerationResult[] = [];
    
    for (let i = 0; i < batches.length; i++) {
      const batch = batches[i];
      
      try {
        const response = await fetch(
          `${import.meta.env.VITE_SUPABASE_URL || 'https://vfhspeubasrdmwqxdcaw.supabase.co'}/functions/v1/generate-library-audio`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${(await supabase.auth.getSession()).data.session?.access_token}`,
            },
            body: JSON.stringify({
              phrases: batch,
              language: lang,
            }),
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }

        const data = await response.json();
        allResults = [...allResults, ...(data.results || [])];
        
      } catch (error) {
        console.error(`Error generating batch ${i + 1}:`, error);
        // Mark all phrases in this batch as failed
        allResults = [...allResults, ...batch.map(p => ({
          phraseKey: p.phraseKey,
          success: false,
          error: error instanceof Error ? error.message : 'Unknown error',
        }))];
      }

      // Update progress
      setProgress(Math.round(((i + 1) / batches.length) * 100));
    }

    return allResults;
  };

  const handleGenerateAll = async () => {
    setIsGenerating(true);
    setProgress(0);
    setResults([]);
    setStats(null);

    let allResults: GenerationResult[] = [];

    try {
      for (const lang of languages) {
        setCurrentLanguage(lang);
        setProgress(0);
        
        const langResults = await generateAudioForLanguage(lang);
        allResults = [...allResults, ...langResults];
        
        toast.success(`${lang.toUpperCase()}: ${langResults.filter(r => r.success).length} áudios gerados`);
      }

      setResults(allResults);
      setStats({
        generated: allResults.filter(r => r.success).length,
        failed: allResults.filter(r => !r.success).length,
      });

      toast.success('Geração de áudios concluída!');
      
    } catch (error) {
      console.error('Error generating audio:', error);
      toast.error('Erro ao gerar áudios');
    } finally {
      setIsGenerating(false);
      setCurrentLanguage(null);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6 max-w-4xl">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => navigate('/admin')}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-primary/10">
              <Volume2 className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Gerenciar Áudios</h1>
              <p className="text-muted-foreground text-sm">Pré-gerar áudios da biblioteca para reprodução instantânea</p>
            </div>
          </div>
        </div>

        {/* Main Card */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Play className="h-5 w-5" />
              Gerar Áudios da Biblioteca
            </CardTitle>
            <CardDescription>
              Gere os áudios das frases da biblioteca (exceto músicas) para que os usuários possam ouvi-los instantaneamente.
              Os áudios serão armazenados no Supabase Storage.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Generate All Button */}
            <Button
              onClick={handleGenerateAll}
              disabled={isGenerating}
              className="w-full"
              size="lg"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Gerando {currentLanguage?.toUpperCase()}...
                </>
              ) : (
                <>
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Gerar Áudios da Biblioteca
                </>
              )}
            </Button>

            {/* Progress */}
            {isGenerating && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Gerando áudios em {currentLanguage?.toUpperCase()}...</span>
                  <span>{progress}%</span>
                </div>
                <Progress value={progress} />
              </div>
            )}

            {/* Stats */}
            {stats && (
              <div className="flex gap-4 justify-center">
                <Badge variant="default" className="flex items-center gap-1">
                  <CheckCircle className="h-3 w-3" />
                  {stats.generated} gerados
                </Badge>
                {stats.failed > 0 && (
                  <Badge variant="destructive" className="flex items-center gap-1">
                    <XCircle className="h-3 w-3" />
                    {stats.failed} falhas
                  </Badge>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Songs with fixed audio */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Music className="h-5 w-5" />
              Músicas com Áudio Fixo
            </CardTitle>
            <CardDescription>
              Envie o MP3 final de cada música (gravado pela equipe e convertido para a voz da Catarina).
              Com gravação enviada, a Biblioteca toca o arquivo; sem gravação, a música continua sendo gerada por IA.
              Nunca envie gravações de terceiros (canais, vídeos do YouTube).
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {songs.map(song => {
              const audioUrl = audioMap[song.phraseKey];
              const isBusy = busySongKey === song.phraseKey;
              return (
                <div key={song.phraseKey} className="p-3 rounded-lg bg-muted/50 space-y-2">
                  <div className="flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-sm font-medium truncate">{song.text}</p>
                      <p className="text-xs text-muted-foreground font-mono">{song.audioKey}</p>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <Badge variant={audioUrl ? 'default' : 'secondary'}>
                        {audioUrl ? 'Gravação' : 'IA'}
                      </Badge>
                      <input
                        ref={el => { fileInputs.current[song.phraseKey] = el; }}
                        type="file"
                        accept="audio/mpeg,audio/mp3,audio/*"
                        className="hidden"
                        onChange={e => {
                          const file = e.target.files?.[0];
                          e.target.value = '';
                          if (file) handleUploadSong(song.phraseKey, song.audioKey!, file);
                        }}
                      />
                      <Button
                        size="sm"
                        variant="outline"
                        disabled={isBusy}
                        onClick={() => fileInputs.current[song.phraseKey]?.click()}
                      >
                        {isBusy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
                      </Button>
                      {audioUrl && (
                        <Button
                          size="sm"
                          variant="ghost"
                          disabled={isBusy}
                          onClick={() => handleRemoveSong(song.phraseKey)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                  {audioUrl && <audio controls preload="none" src={audioUrl} className="w-full h-8" />}
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* Results */}
        {results.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Resultados</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="max-h-96 overflow-y-auto space-y-2">
                {results.map((result, index) => (
                  <div 
                    key={index}
                    className="flex items-center justify-between p-2 rounded-lg bg-muted/50"
                  >
                    <span className="text-sm font-mono truncate flex-1">
                      {result.phraseKey}
                    </span>
                    {result.success ? (
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                    ) : (
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-destructive truncate max-w-32">
                          {result.error}
                        </span>
                        <XCircle className="h-4 w-4 text-destructive flex-shrink-0" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default AdminAudio;
