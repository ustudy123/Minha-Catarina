import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Plus, Pencil, Trash2, Upload, Wand2, Play, Loader2, Music } from 'lucide-react';
import { useTranslations } from '@/contexts/LanguageContext';
import { useLibraryPhrases, CreatePhraseInput } from '@/hooks/useLibraryPhrases';
import { useTextToSpeech } from '@/hooks/useTextToSpeech';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const CATEGORIES = [
  { id: 'songs', label: 'Músicas', icon: '🎵' },
  { id: 'stories', label: 'Histórias e Poemas', icon: '📖' },
  { id: 'affection', label: 'Carinho', icon: '💖' },
  { id: 'daily', label: 'Dia a Dia', icon: '☀️' },
  { id: 'education', label: 'Educação', icon: '📚' },
  { id: 'sounds', label: 'Sons', icon: '🔔' },
];

const TIME_OF_DAY = [
  { id: 'morning', label: 'Manhã', icon: '🌅' },
  { id: 'afternoon', label: 'Tarde', icon: '☀️' },
  { id: 'night', label: 'Noite', icon: '🌙' },
];

const AdminPhrases = () => {
  const navigate = useNavigate();
  const t = useTranslations();
  const { phrases, isLoading, createPhrase, updatePhrase, deletePhrase, uploadAudio } = useLibraryPhrases();
  const { generate: generateTTS, isGenerating } = useTextToSpeech();
  
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingPhrase, setEditingPhrase] = useState<string | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [generatingAudio, setGeneratingAudio] = useState<{ [key: string]: boolean }>({});
  
  const [formData, setFormData] = useState<CreatePhraseInput>({
    text_pt: '',
    text_en: '',
    text_es: '',
    category: 'daily',
    time_of_day: 'morning',
  });

  const [audioUrls, setAudioUrls] = useState<{
    audio_url_pt?: string;
    audio_url_en?: string;
    audio_url_es?: string;
  }>({});

  const resetForm = () => {
    setFormData({
      text_pt: '',
      text_en: '',
      text_es: '',
      category: 'daily',
      time_of_day: 'morning',
    });
    setAudioUrls({});
    setEditingPhrase(null);
  };

  const handleOpenDialog = (phrase?: typeof phrases[0]) => {
    if (phrase) {
      setEditingPhrase(phrase.id);
      setFormData({
        text_pt: phrase.text_pt,
        text_en: phrase.text_en || '',
        text_es: phrase.text_es || '',
        category: phrase.category,
        time_of_day: phrase.time_of_day || 'morning',
      });
      setAudioUrls({
        audio_url_pt: phrase.audio_url_pt || undefined,
        audio_url_en: phrase.audio_url_en || undefined,
        audio_url_es: phrase.audio_url_es || undefined,
      });
    } else {
      resetForm();
    }
    setIsDialogOpen(true);
  };

  const handleGenerateAudio = async (language: 'pt' | 'en' | 'es') => {
    const textKey = `text_${language}` as keyof CreatePhraseInput;
    const text = formData[textKey];
    
    if (!text) {
      toast.error(`Texto em ${language.toUpperCase()} é obrigatório`);
      return;
    }

    setGeneratingAudio(prev => ({ ...prev, [language]: true }));
    
    try {
      const result = await generateTTS({ text: text as string, language });
      if (result?.url) {
        setAudioUrls(prev => ({ ...prev, [`audio_url_${language}`]: result.url }));
        toast.success(`Áudio em ${language.toUpperCase()} gerado!`);
      }
    } catch (error) {
      console.error('Error generating audio:', error);
    } finally {
      setGeneratingAudio(prev => ({ ...prev, [language]: false }));
    }
  };

  const handleFileUpload = async (file: File, language: 'pt' | 'en' | 'es') => {
    if (!file.type.startsWith('audio/')) {
      toast.error('Por favor, selecione um arquivo de áudio');
      return;
    }

    try {
      const tempId = editingPhrase || `temp_${Date.now()}`;
      const url = await uploadAudio(file, tempId, language);
      setAudioUrls(prev => ({ ...prev, [`audio_url_${language}`]: url }));
      toast.success(`Áudio em ${language.toUpperCase()} enviado!`);
    } catch (error) {
      console.error('Error uploading audio:', error);
    }
  };

  const handleSubmit = async () => {
    if (!formData.text_pt) {
      toast.error('Texto em português é obrigatório');
      return;
    }

    try {
      const data = {
        ...formData,
        ...audioUrls,
      };

      if (editingPhrase) {
        await updatePhrase(editingPhrase, data);
      } else {
        await createPhrase(data);
      }
      
      setIsDialogOpen(false);
      resetForm();
    } catch (error) {
      console.error('Error saving phrase:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Tem certeza que deseja excluir esta frase?')) {
      await deletePhrase(id);
    }
  };

  const playAudio = (url: string) => {
    const audio = new Audio(url);
    audio.play();
  };

  const filteredPhrases = filterCategory === 'all' 
    ? phrases 
    : phrases.filter(p => p.category === filterCategory);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6 max-w-6xl">
        {/* Header */}
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate('/admin')}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-foreground">{t.admin?.manageLibrary || 'Gerenciar Biblioteca'}</h1>
              <p className="text-muted-foreground text-sm">{phrases.length} frases na biblioteca</p>
            </div>
          </div>
          
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => handleOpenDialog()}>
                <Plus className="h-4 w-4 mr-2" />
                Nova Frase
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {editingPhrase ? 'Editar Frase' : 'Nova Frase'}
                </DialogTitle>
              </DialogHeader>
              
              <div className="space-y-6 py-4">
                {/* Category & Time */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Categoria</Label>
                    <Select 
                      value={formData.category} 
                      onValueChange={(v) => setFormData(prev => ({ ...prev, category: v }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {CATEGORIES.map(cat => (
                          <SelectItem key={cat.id} value={cat.id}>
                            {cat.icon} {cat.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Período do Dia</Label>
                    <Select 
                      value={formData.time_of_day} 
                      onValueChange={(v) => setFormData(prev => ({ ...prev, time_of_day: v }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {TIME_OF_DAY.map(time => (
                          <SelectItem key={time.id} value={time.id}>
                            {time.icon} {time.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Texts and Audio Tabs */}
                <Tabs defaultValue="pt" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="pt">🇧🇷 Português</TabsTrigger>
                    <TabsTrigger value="en">🇺🇸 English</TabsTrigger>
                    <TabsTrigger value="es">🇪🇸 Español</TabsTrigger>
                  </TabsList>
                  
                  {(['pt', 'en', 'es'] as const).map(lang => (
                    <TabsContent key={lang} value={lang} className="space-y-4">
                      <div className="space-y-2">
                        <Label>
                          Texto {lang === 'pt' ? '(obrigatório)' : '(opcional)'}
                        </Label>
                        <Textarea
                          value={formData[`text_${lang}` as keyof CreatePhraseInput] as string || ''}
                          onChange={(e) => setFormData(prev => ({ 
                            ...prev, 
                            [`text_${lang}`]: e.target.value 
                          }))}
                          placeholder={`Digite o texto em ${lang === 'pt' ? 'português' : lang === 'en' ? 'inglês' : 'espanhol'}...`}
                          rows={3}
                        />
                      </div>
                      
                      {/* Audio Section */}
                      <div className="space-y-3 p-4 rounded-lg bg-muted/50">
                        <Label className="flex items-center gap-2">
                          <Music className="h-4 w-4" />
                          Áudio
                        </Label>
                        
                        {audioUrls[`audio_url_${lang}` as keyof typeof audioUrls] && (
                          <div className="flex items-center gap-2 p-2 rounded bg-background">
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => playAudio(audioUrls[`audio_url_${lang}` as keyof typeof audioUrls]!)}
                            >
                              <Play className="h-4 w-4 mr-1" />
                              Ouvir
                            </Button>
                            <span className="text-xs text-muted-foreground truncate flex-1">
                              Áudio configurado
                            </span>
                          </div>
                        )}
                        
                        <div className="flex gap-2">
                          {/* Generate with AI */}
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex-1"
                            onClick={() => handleGenerateAudio(lang)}
                            disabled={generatingAudio[lang] || !formData[`text_${lang}` as keyof CreatePhraseInput]}
                          >
                            {generatingAudio[lang] ? (
                              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                            ) : (
                              <Wand2 className="h-4 w-4 mr-2" />
                            )}
                            Gerar com IA
                          </Button>
                          
                          {/* Upload File */}
                          <div className="flex-1">
                            <Input
                              type="file"
                              accept="audio/*"
                              className="hidden"
                              id={`audio-upload-${lang}`}
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) handleFileUpload(file, lang);
                              }}
                            />
                            <Button
                              variant="outline"
                              size="sm"
                              className="w-full"
                              onClick={() => document.getElementById(`audio-upload-${lang}`)?.click()}
                            >
                              <Upload className="h-4 w-4 mr-2" />
                              Upload
                            </Button>
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                  ))}
                </Tabs>

                {/* Submit Button */}
                <Button onClick={handleSubmit} className="w-full">
                  {editingPhrase ? 'Salvar Alterações' : 'Criar Frase'}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Filter */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          <Button
            variant={filterCategory === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilterCategory('all')}
          >
            Todas
          </Button>
          {CATEGORIES.map(cat => (
            <Button
              key={cat.id}
              variant={filterCategory === cat.id ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilterCategory(cat.id)}
            >
              {cat.icon} {cat.label}
            </Button>
          ))}
        </div>

        {/* Phrases List */}
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : filteredPhrases.length === 0 ? (
          <Card className="p-12 text-center">
            <p className="text-muted-foreground">Nenhuma frase encontrada</p>
            <Button className="mt-4" onClick={() => handleOpenDialog()}>
              <Plus className="h-4 w-4 mr-2" />
              Adicionar primeira frase
            </Button>
          </Card>
        ) : (
          <div className="space-y-3">
            {filteredPhrases.map(phrase => {
              const category = CATEGORIES.find(c => c.id === phrase.category);
              const timeOfDay = TIME_OF_DAY.find(t => t.id === phrase.time_of_day);
              
              return (
                <Card key={phrase.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <p className="text-foreground font-medium line-clamp-2">
                          {phrase.text_pt}
                        </p>
                        <div className="flex items-center gap-2 mt-2 flex-wrap">
                          <Badge variant="secondary" className="text-xs">
                            {category?.icon} {category?.label}
                          </Badge>
                          {timeOfDay && (
                            <Badge variant="outline" className="text-xs">
                              {timeOfDay.icon} {timeOfDay.label}
                            </Badge>
                          )}
                          {phrase.audio_url_pt && (
                            <Badge variant="outline" className="text-xs text-green-600">
                              🎵 PT
                            </Badge>
                          )}
                          {phrase.audio_url_en && (
                            <Badge variant="outline" className="text-xs text-green-600">
                              🎵 EN
                            </Badge>
                          )}
                          {phrase.audio_url_es && (
                            <Badge variant="outline" className="text-xs text-green-600">
                              🎵 ES
                            </Badge>
                          )}
                          {!phrase.is_active && (
                            <Badge variant="destructive" className="text-xs">
                              Inativa
                            </Badge>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        {phrase.audio_url_pt && (
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => playAudio(phrase.audio_url_pt!)}
                          >
                            <Play className="h-4 w-4" />
                          </Button>
                        )}
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => handleOpenDialog(phrase)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          className="text-destructive hover:text-destructive"
                          onClick={() => handleDelete(phrase.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPhrases;
