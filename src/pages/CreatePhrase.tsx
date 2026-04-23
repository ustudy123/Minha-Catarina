import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PageTransition } from "@/components/PageTransition";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useAudioPlayer } from "@/hooks/useAudioPlayer";
import { useTextToSpeech } from "@/hooks/useTextToSpeech";
import { useTextToSong } from "@/hooks/useTextToSong";
import { useSavedPhrases } from "@/hooks/useSavedPhrases";
import { useLanguage, Language } from "@/contexts/LanguageContext";
import { useSubscription } from "@/hooks/useSubscription";
import { useVoice } from "@/contexts/VoiceContext";
import { getTranslations } from "@/translations";
import { toast } from "sonner";
import { PlayButton } from "@/components/audio/PlayButton";
import { AudioControls } from "@/components/audio/AudioControls";
import { PremiumGate } from "@/components/PremiumGate";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  ArrowLeft,
  Sparkles,
  Save,
  Volume2,
  Music,
} from "lucide-react";
import { cn } from "@/lib/utils";

const CreatePhrase = () => {
  const navigate = useNavigate();
  const [phraseText, setPhraseText] = useState("");
  const [generatingLang, setGeneratingLang] = useState<Language | null>(null);
  const [songMode, setSongMode] = useState(false);
  const maxChars = 200;

  const { generate, isGenerating, audioUrl, audioBlob, reset } = useTextToSpeech();
  const { generate: generateSong, isGenerating: isGeneratingSong, audioUrl: songUrl } = useTextToSong();
  const audioPlayer = useAudioPlayer();
  const { addPhrase } = useSavedPhrases();
  const { language } = useLanguage();
  const { canCreatePhrases } = useSubscription();
  const { selectedDoll } = useVoice();
  const t = getTranslations(language);

  // Get doll name based on selection
  const dollName = selectedDoll === 'catarina' 
    ? (language === 'pt' ? 'a Catarina' : language === 'es' ? 'Catarina' : 'Catarina')
    : (language === 'pt' ? 'o Antônio' : language === 'es' ? 'Antônio' : 'Antônio');

  const handleGenerateAndPlay = async (targetLang: Language) => {
    if (!phraseText.trim()) {
      toast.error(t.createPhrase.errorEnterPhrase);
      return;
    }

    try {
      setGeneratingLang(targetLang);
      if (songMode) {
        const { url } = await generateSong({
          text: phraseText,
          style: 'nursery',
          language: targetLang,
        });
        if (url) await audioPlayer.play(url);
      } else {
        const { url } = await generate({ text: phraseText, language: targetLang });
        if (url) await audioPlayer.play(url);
      }
    } catch (error) {
      console.error('Error generating voice:', error);
    } finally {
      setGeneratingLang(null);
    }
  };

  const handleSave = () => {
    if (!audioBlob) {
      toast.error(t.createPhrase.errorGenerateFirst);
      return;
    }

    addPhrase({
      text: phraseText,
      language,
      audioUrl,
      category: 'custom',
    });

    toast.success(t.createPhrase.phraseSaved);
    
    // Reset form
    setPhraseText("");
    reset();
    audioPlayer.stop();
  };

  const languageButtons = [
    { lang: 'pt' as Language, flag: '🇧🇷', label: 'Português' },
    { lang: 'en' as Language, flag: '🇺🇸', label: 'English' },
    { lang: 'es' as Language, flag: '🇪🇸', label: 'Español' },
  ];

  // Show premium gate for non-premium users
  if (!canCreatePhrases) {
    return (
      <PageTransition>
        <div className="min-h-screen bg-gradient-to-br from-muted via-background to-secondary/10">
          {/* Header */}
          <header className="sticky top-0 z-50 glass border-b border-border/50 backdrop-blur-lg">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" onClick={() => navigate('/')}>
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="text-xl font-bold">{t.createPhrase.title}</h1>
                <p className="text-xs text-muted-foreground">{t.createPhrase.subtitle}</p>
              </div>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-6 max-w-2xl">
          <PremiumGate featureName={t.createPhrase.title} />
          </main>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-br from-muted via-background to-secondary/10">
        {/* Header */}
        <header className="sticky top-0 z-50 glass border-b border-border/50 backdrop-blur-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" onClick={() => navigate('/')}>
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="text-xl font-bold">{t.createPhrase.title}</h1>
                <p className="text-xs text-muted-foreground">{t.createPhrase.subtitle}</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 max-w-2xl space-y-6">
        {/* Text Input */}
        <Card className="p-5 border-2 animate-fade-in" style={{ animationDelay: "0.1s" }}>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm font-semibold">
                <Sparkles className="w-4 h-4" />
                {t.createPhrase.whatToSay.replace('{dollName}', dollName)}
              </div>
              <span className={cn(
                "text-xs font-medium",
                phraseText.length > maxChars * 0.9 ? "text-warning" : "text-muted-foreground"
              )}>
                {phraseText.length}/{maxChars}
              </span>
            </div>
            
            <Textarea
              placeholder={t.createPhrase.placeholder.replace('{dollName}', dollName)}
              className="min-h-[120px] rounded-xl border-2 resize-none text-base"
              value={phraseText}
              onChange={(e) => setPhraseText(e.target.value.slice(0, maxChars))}
              maxLength={maxChars}
            />

            {/* 3 Language Buttons */}
            <div className="grid grid-cols-3 gap-2">
              {languageButtons.map(({ lang, flag, label }) => (
                <Button
                  key={lang}
                  size="lg"
                  variant="outline"
                  className="flex-1 gap-2"
                  disabled={!phraseText.trim() || isGenerating}
                  onClick={() => handleGenerateAndPlay(lang)}
                >
                  {generatingLang === lang ? (
                    <span className="animate-pulse">...</span>
                  ) : (
                    <>
                      <span className="text-lg">{flag}</span>
                      <span className="hidden sm:inline text-xs">{label}</span>
                    </>
                  )}
                </Button>
              ))}
            </div>
          </div>
        </Card>

        {/* Preview & Actions */}
        {phraseText && (
          <Card className="p-5 border-2 animate-fade-in-scale">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-sm font-semibold">
                <Volume2 className="w-4 h-4" />
                {t.createPhrase.preview}
              </div>

              <div className="p-4 rounded-xl bg-muted/50">
                <p className="text-sm italic">"{phraseText}"</p>
              </div>

              <div className="flex gap-2">
                <PlayButton
                  isPlaying={audioPlayer.isPlaying}
                  isLoading={audioPlayer.isLoading || !audioUrl}
                  onPlay={() => audioUrl && audioPlayer.play(audioUrl)}
                  onPause={audioPlayer.pause}
                  variant="secondary"
                  size="lg"
                  showWave
                  className="flex-1 gap-2"
                />
                <Button
                  variant="outline"
                  size="lg"
                  className="flex-1"
                  onClick={handleSave}
                  disabled={!audioBlob}
                >
                  <Save className="w-5 h-5" />
                  {t.common.save}
                </Button>
              </div>

              {audioUrl && audioPlayer.duration > 0 && (
                <AudioControls
                  volume={audioPlayer.volume}
                  playbackRate={audioPlayer.playbackRate}
                  currentTime={audioPlayer.currentTime}
                  duration={audioPlayer.duration}
                  onVolumeChange={audioPlayer.setVolume}
                  onPlaybackRateChange={audioPlayer.setPlaybackRate}
                  onSeek={audioPlayer.seek}
                />
              )}
            </div>
          </Card>
        )}

        {/* Tips */}
        <Card className="p-5 border-2 bg-highlight/10 border-highlight/20 animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            <Sparkles className="w-4 h-4" />
            {t.createPhrase.tips.title}
          </h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-highlight-foreground">•</span>
              <span>{t.createPhrase.tips.simple}</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-highlight-foreground">•</span>
              <span>{t.createPhrase.tips.short}</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-highlight-foreground">•</span>
              <span>{t.createPhrase.tips.personalize}</span>
            </li>
          </ul>
        </Card>

        <div className="h-20" />
        </main>
      </div>
    </PageTransition>
  );
};

export default CreatePhrase;
