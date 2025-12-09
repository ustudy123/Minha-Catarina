import { ArrowLeft, Volume2, Check, Play, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage, useTranslations } from '@/contexts/LanguageContext';
import { useVoice, CHILD_VOICES, ChildVoice } from '@/contexts/VoiceContext';
import { LanguageSelector } from '@/components/LanguageSelector';
import { UserMenu } from '@/components/UserMenu';
import { useState } from 'react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export default function Settings() {
  const { language } = useLanguage();
  const t = useTranslations();
  const { selectedVoice, setSelectedVoice, voices } = useVoice();
  const { session } = useAuth();
  const [previewingVoice, setPreviewingVoice] = useState<string | null>(null);

  const handleVoiceSelect = (voice: ChildVoice) => {
    setSelectedVoice(voice);
    toast.success(t.settings.voiceChanged);
  };

  const handlePreviewVoice = async (voice: ChildVoice) => {
    if (!session) {
      toast.error(t.auth.loginRequired);
      return;
    }

    setPreviewingVoice(voice.id);
    
    try {
      const previewText = language === 'pt' 
        ? 'Olá! Eu sou a Catarina, sua amiguinha!'
        : language === 'en'
        ? 'Hello! I am Catarina, your little friend!'
        : '¡Hola! ¡Soy Catarina, tu amiguita!';

      const response = await fetch(
        `https://vfhspeubasrdmwqxdcaw.supabase.co/functions/v1/text-to-speech`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session.access_token}`,
          },
          body: JSON.stringify({
            text: previewText,
            voiceId: voice.voiceId,
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to generate preview');
      }

      const data = await response.json();
      
      // Convert base64 to blob and play
      const binaryString = atob(data.audioContent);
      const bytes = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }
      const blob = new Blob([bytes], { type: 'audio/mpeg' });
      const url = URL.createObjectURL(blob);
      
      const audio = new Audio(url);
      audio.onended = () => {
        URL.revokeObjectURL(url);
        setPreviewingVoice(null);
      };
      audio.onerror = () => {
        URL.revokeObjectURL(url);
        setPreviewingVoice(null);
      };
      await audio.play();
    } catch (error) {
      console.error('Preview error:', error);
      toast.error(t.settings.previewError);
      setPreviewingVoice(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-primary/10">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/50">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/">
              <Button variant="ghost" size="icon" className="rounded-full">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              {t.settings.title}
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <LanguageSelector />
            <UserMenu />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 space-y-6">
        {/* Voice Selection */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Volume2 className="h-5 w-5 text-primary" />
              {t.settings.voiceSelection}
            </CardTitle>
            <CardDescription>
              {t.settings.voiceDescription}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {voices.map((voice) => (
              <div
                key={voice.id}
                className={`flex items-center justify-between p-4 rounded-xl border-2 transition-all cursor-pointer ${
                  selectedVoice.id === voice.id
                    ? 'border-primary bg-primary/5'
                    : 'border-border/50 hover:border-primary/50 hover:bg-muted/50'
                }`}
                onClick={() => handleVoiceSelect(voice)}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      selectedVoice.id === voice.id
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    {selectedVoice.id === voice.id ? (
                      <Check className="h-5 w-5" />
                    ) : (
                      <Volume2 className="h-5 w-5" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium">{voice.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {voice.description[language]}
                    </p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePreviewVoice(voice);
                  }}
                  disabled={previewingVoice !== null}
                  className="rounded-full"
                >
                  {previewingVoice === voice.id ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Play className="h-4 w-4" />
                  )}
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Language Settings */}
        <Card>
          <CardHeader>
            <CardTitle>{t.settings.languageTitle}</CardTitle>
            <CardDescription>
              {t.settings.languageDescription}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <LanguageSelector />
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
