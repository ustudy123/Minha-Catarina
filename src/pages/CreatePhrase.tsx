import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { useTextToSpeech } from "@/hooks/useTextToSpeech";
import { useAudioPlayer } from "@/hooks/useAudioPlayer";
import { useSavedPhrases } from "@/hooks/useSavedPhrases";
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
  Play,
  Save,
  Crown,
  Volume2,
  Zap,
  Globe,
} from "lucide-react";
import { cn } from "@/lib/utils";

const CreatePhrase = () => {
  const [phraseText, setPhraseText] = useState("");
  const [language, setLanguage] = useState<"pt" | "en" | "es">("pt");
  const [tokensRemaining, setTokensRemaining] = useState(1000);
  const maxTokens = 1000;
  const maxChars = 200;

  const { generate, isGenerating, audioUrl, audioBlob, reset } = useTextToSpeech();
  const audioPlayer = useAudioPlayer();
  const { addPhrase } = useSavedPhrases();

  const handleGenerate = async () => {
    if (!phraseText.trim()) {
      toast.error("Digite uma frase primeiro");
      return;
    }

    if (tokensRemaining <= 0) {
      toast.error("Tokens esgotados este mês");
      return;
    }

    try {
      await generate({ text: phraseText, language });
      setTokensRemaining(prev => Math.max(0, prev - 1));
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
      toast.error("Gere a voz primeiro");
      return;
    }

    addPhrase({
      text: phraseText,
      language,
      audioUrl,
      category: 'custom',
    });

    toast.success("Frase salva na biblioteca!");
    
    // Reset form
    setPhraseText("");
    reset();
    audioPlayer.stop();
  };

  const handleSendToDoll = () => {
    toast.info("Em breve: enviar via Bluetooth!");
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
                <div className="flex items-center gap-2">
                  <h1 className="text-xl font-bold">Criar Frase</h1>
                  <Badge variant="secondary" className="gap-1">
                    <Crown className="w-3 h-3" />
                    Plus
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">IA personalizada com voz infantil</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 max-w-2xl space-y-6">
        {/* Tokens Counter */}
        <Card className="p-5 border-2 bg-gradient-accent text-accent-foreground animate-fade-in-scale">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5" />
                <span className="font-semibold">Tokens Disponíveis</span>
              </div>
              <span className="text-lg font-bold">{tokensRemaining}/{maxTokens}</span>
            </div>
            <Progress value={(tokensRemaining / maxTokens) * 100} className="h-2" />
            <p className="text-xs opacity-90">
              Cada frase gerada consome 1 token • Renova mensalmente
            </p>
          </div>
        </Card>

        {/* Language Selection */}
        <Card className="p-5 border-2 animate-fade-in" style={{ animationDelay: "0.1s" }}>
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm font-semibold">
              <Globe className="w-4 h-4" />
              Idioma
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
                O que a Catarina deve dizer?
              </div>
              <span className={cn(
                "text-xs font-medium",
                phraseText.length > maxChars * 0.9 ? "text-warning" : "text-muted-foreground"
              )}>
                {phraseText.length}/{maxChars}
              </span>
            </div>
            
            <Textarea
              placeholder="Digite a mensagem que você quer que a Catarina fale..."
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
                disabled={!phraseText.trim() || isGenerating || tokensRemaining === 0}
                onClick={handleGenerate}
              >
                {isGenerating ? (
                  <>
                    <span className="animate-pulse">Gerando</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    Gerar Voz com IA
                  </>
                )}
              </Button>
            </div>

            {tokensRemaining === 0 && (
              <div className="p-3 rounded-xl bg-warning/10 border border-warning/20">
                <p className="text-xs text-warning-foreground">
                  ⚠️ Você usou todos os tokens deste mês. Aguarde a renovação ou faça upgrade.
                </p>
              </div>
            )}
          </div>
        </Card>

        {/* Preview & Actions */}
        {phraseText && (
          <Card className="p-5 border-2 animate-fade-in-scale">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-sm font-semibold">
                <Volume2 className="w-4 h-4" />
                Preview da Frase
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
                  Salvar
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
                <Volume2 className="w-5 h-5" />
                Enviar para Catarina
              </Button>
            </div>
          </Card>
        )}

        {/* Tips */}
        <Card className="p-5 border-2 bg-highlight/10 border-highlight/20 animate-fade-in" style={{ animationDelay: "0.3s" }}>
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            <Sparkles className="w-4 h-4" />
            Dicas para frases melhores
          </h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-highlight-foreground">•</span>
              <span>Use linguagem simples e carinhosa</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-highlight-foreground">•</span>
              <span>Frases curtas são mais naturais para crianças</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-highlight-foreground">•</span>
              <span>Inclua o nome da criança para personalizar</span>
            </li>
          </ul>
        </Card>

        {/* Upgrade Banner */}
        <Card className="relative overflow-hidden border-2 border-accent cursor-pointer group hover-lift">
          <div className="absolute inset-0 bg-gradient-to-r from-accent/20 via-secondary/20 to-highlight/20" />
          <div className="relative p-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent to-secondary flex items-center justify-center animate-pulse-glow">
              <Crown className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold mb-1">Tokens acabando?</h3>
              <p className="text-sm text-muted-foreground">
                Upgrade para Plus e tenha 1000 tokens por mês
              </p>
            </div>
            <Button variant="premium" size="sm">
              Ver Planos
            </Button>
          </div>
        </Card>

        <div className="h-20" />
      </main>
    </div>
  );
};

export default CreatePhrase;
