import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useSequentialPlayer, PlayablePhrase } from "@/hooks/useSequentialPlayer";
import { useLanguage } from "@/contexts/LanguageContext";
import { Play, Square, Timer } from "lucide-react";

const intervalOptions = [
  { label: "3s", value: 3 },
  { label: "5s", value: 5 },
  { label: "10s", value: 10 },
  { label: "15s", value: 15 },
];

interface AutoPlayControlsProps {
  phrases: PlayablePhrase[];
  sequentialPlayer: ReturnType<typeof useSequentialPlayer>;
}

export const AutoPlayControls = ({ phrases, sequentialPlayer }: AutoPlayControlsProps) => {
  const { language } = useLanguage();
  const [intervalSeconds, setIntervalSeconds] = useState(5);

  const handlePlayAll = () => {
    if (sequentialPlayer.isPlaying) {
      sequentialPlayer.stop();
      return;
    }
    if (phrases.length === 0) return;
    sequentialPlayer.startPlayAll(phrases, false, intervalSeconds, true);
  };

  const texts = {
    pt: { autoPlay: "Reprodução automática", playAll: "Tocar Todas", stop: "Parar", interval: "Intervalo:", playing: "Reproduzindo", of: "de", nextIn: "próxima em" },
    en: { autoPlay: "Auto Play", playAll: "Play All", stop: "Stop", interval: "Interval:", playing: "Playing", of: "of", nextIn: "next in" },
    es: { autoPlay: "Reproducción automática", playAll: "Reproducir todo", stop: "Parar", interval: "Intervalo:", playing: "Reproduciendo", of: "de", nextIn: "próxima en" },
  };
  const t = texts[language] || texts.pt;

  return (
    <Card className="p-4 border-2 border-primary/20">
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Timer className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">{t.autoPlay}</span>
          </div>
          <Button
            onClick={handlePlayAll}
            variant={sequentialPlayer.isPlaying ? "destructive" : "default"}
            size="sm"
            className="gap-2"
          >
            {sequentialPlayer.isPlaying ? (
              <>
                <Square className="w-4 h-4" />
                {t.stop}
              </>
            ) : (
              <>
                <Play className="w-4 h-4" />
                {t.playAll}
              </>
            )}
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">{t.interval}</span>
          <div className="flex gap-1">
            {intervalOptions.map((opt) => (
              <Button
                key={opt.value}
                variant={intervalSeconds === opt.value ? "secondary" : "ghost"}
                size="sm"
                onClick={() => setIntervalSeconds(opt.value)}
                className="h-7 px-3 text-xs"
                disabled={sequentialPlayer.isPlaying}
              >
                {opt.label}
              </Button>
            ))}
          </div>
        </div>

        {sequentialPlayer.isPlaying && (
          <div className="text-xs text-muted-foreground text-center animate-pulse">
            {t.playing} {sequentialPlayer.currentIndex + 1} {t.of} {sequentialPlayer.totalPhrases}
            {sequentialPlayer.timeRemaining > 0 && (
              <span> — {t.nextIn} {sequentialPlayer.timeRemaining}s</span>
            )}
          </div>
        )}
      </div>
    </Card>
  );
};
