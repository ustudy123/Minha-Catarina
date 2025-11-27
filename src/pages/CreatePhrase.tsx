import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useAudioPlayer } from "@/hooks/useAudioPlayer";
import { useTextToSpeech } from "@/hooks/useTextToSpeech";
import { useSavedPhrases } from "@/hooks/useSavedPhrases";
import { useLanguage } from "@/contexts/LanguageContext";
import { getTranslations } from "@/translations";
import { toast } from "sonner";
import { PlayButton } from "@/components/audio/PlayButton";
import { AudioControls } from "@/components/audio/AudioControls";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ArrowLeft,
  Sparkles,
  Save,
  Volume2,
  Globe,
  Send,
} from "lucide-react";
import { cn } from "@/lib/utils";

const CreatePhrase = () => {
  const [phraseText, setPhraseText] = useState("");
  const maxChars = 200;

  const { generate, isGenerating, audioUrl, audioBlob, reset } = useTextToSpeech();
  const audioPlayer = useAudioPlayer();
  const { addPhrase } = useSavedPhrases();
  const { language, setLanguage } = useLanguage();
  const t = getTranslations(language);

  const handleGenerate = async () => {
    if (!phraseText.trim()) {
      toast.error(t.createPhrase.errorEnterPhrase);
      return;
    }

    try {
      await generate({ text: phraseText, language });
    } catch (error) {
      console.error('Error generating voice:', error);
    }
  };

  const handlePlayPreview = () => {
    if (audioUrl) {
      audioPlayer.play(audioUrl);
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

  const handleSendToDoll = () => {
    toast.info(t.createPhrase.whatsappSoon);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-muted via-background to-secondary/10">
      {/* Header */}
      <header className="sticky top-0 z-50 glass border-b border-border/50 backdrop-blur-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" onClick={() => window.history.back()}>
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
        {/* Language Selection */}
        <Card className="p-5 border-2 animate-fade-in" style={{ animationDelay: "0.1s" }}>
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm font-semibold">
              <Globe className="w-4 h-4" />
              {t.createPhrase.language}
            </div>
            <Select value={language} onValueChange={(value) => setLanguage(value as "pt" | "en" | "es")}>
              <SelectTrigger className="h-12 rounded-xl border-2">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pt">🇧🇷 Português</SelectItem>
                <SelectItem value="en">🇺🇸 English</SelectItem>
                <SelectItem value="es">🇪🇸 Español</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </Card>

        {/* Text Input */}
        <Card className="p-5 border-2 animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm font-semibold">
                <Sparkles className="w-4 h-4" />
                {t.createPhrase.whatToSay}
              </div>
              <span className={cn(
                "text-xs font-medium",
                phraseText.length > maxChars * 0.9 ? "text-warning" : "text-muted-foreground"
              )}>
                {phraseText.length}/{maxChars}
              </span>
            </div>
            
            <Textarea
              placeholder={t.createPhrase.placeholder}
              className="min-h-[120px] rounded-xl border-2 resize-none text-base"
              value={phraseText}
              onChange={(e) => setPhraseText(e.target.value.slice(0, maxChars))}
              maxLength={maxChars}
            />

            <div className="flex gap-2">
              <Button 
                size="lg" 
                variant="gradient" 
                className="flex-1"
                disabled={!phraseText.trim() || isGenerating}
                onClick={handleGenerate}
              >
                {isGenerating ? (
                  <>
                    <span className="animate-pulse">{t.createPhrase.generating}</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    {t.createPhrase.generateVoice}
                  </>
                )}
              </Button>
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
                  isLoading={audioPlayer.isLoading}
                  onPlay={handlePlayPreview}
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

              <Button
                size="lg" 
                variant="default" 
                className="w-full"
                onClick={handleSendToDoll}
                disabled={!audioBlob}
              >
                <Send className="w-5 h-5" />
                {t.createPhrase.sendWhatsApp}
              </Button>
            </div>
          </Card>
        )}

        {/* Tips */}
        <Card className="p-5 border-2 bg-highlight/10 border-highlight/20 animate-fade-in" style={{ animationDelay: "0.3s" }}>
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
  );
};

export default CreatePhrase;
