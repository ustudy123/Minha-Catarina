import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Volume2, Play, Loader2, CheckCircle, XCircle, RefreshCw } from 'lucide-react';
import { useTranslations } from '@/contexts/LanguageContext';
import { supabase } from '@/integrations/supabase/client';
import { getTranslations } from '@/translations';
import { toast } from 'sonner';

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

  const languages = ['pt', 'en', 'es'] as const;

  const generateAudioForLanguage = async (lang: typeof languages[number]) => {
    const translations = getTranslations(lang);
    const phrases = translations.library.prerecordedPhrases;
    
    // Prepare phrases for generation
    const phrasesToGenerate = phrases.map((phrase, index) => {
      const isSfx = phrase.category === 'sounds';
      return {
        phraseKey: `${lang}_${phrase.category}_${index}`,
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

  const handleGenerateSingle = async (lang: typeof languages[number]) => {
    setIsGenerating(true);
    setProgress(0);
    setCurrentLanguage(lang);
    setResults([]);

    try {
      const langResults = await generateAudioForLanguage(lang);
      setResults(langResults);
      setStats({
        generated: langResults.filter(r => r.success).length,
        failed: langResults.filter(r => !r.success).length,
      });
      toast.success(`${lang.toUpperCase()}: ${langResults.filter(r => r.success).length} áudios gerados`);
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
              Gere todos os áudios da biblioteca de frases para que os usuários possam ouvi-los instantaneamente.
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
                  Gerar Todos os Áudios (PT, EN, ES)
                </>
              )}
            </Button>

            {/* Individual Language Buttons */}
            <div className="grid grid-cols-3 gap-3">
              {languages.map(lang => (
                <Button
                  key={lang}
                  variant="outline"
                  onClick={() => handleGenerateSingle(lang)}
                  disabled={isGenerating}
                >
                  {isGenerating && currentLanguage === lang ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : null}
                  {lang.toUpperCase()}
                </Button>
              ))}
            </div>

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
