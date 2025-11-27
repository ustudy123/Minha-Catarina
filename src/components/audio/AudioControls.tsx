import { Volume2, VolumeX, Gauge } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { formatTime } from "@/lib/audio-utils";

interface AudioControlsProps {
  volume: number;
  playbackRate: number;
  currentTime: number;
  duration: number;
  onVolumeChange: (volume: number) => void;
  onPlaybackRateChange: (rate: number) => void;
  onSeek: (time: number) => void;
  className?: string;
  compact?: boolean;
}

export const AudioControls = ({
  volume,
  playbackRate,
  currentTime,
  duration,
  onVolumeChange,
  onPlaybackRateChange,
  onSeek,
  className,
  compact = false,
}: AudioControlsProps) => {
  const handleVolumeToggle = () => {
    onVolumeChange(volume > 0 ? 0 : 1);
  };

  const playbackRates = [0.5, 0.75, 1, 1.25, 1.5, 2];

  return (
    <div className={cn("space-y-3", className)}>
      {/* Progress Bar */}
      <div className="space-y-1">
        <Slider
          value={[currentTime]}
          min={0}
          max={duration || 100}
          step={0.1}
          onValueChange={(value) => onSeek(value[0])}
          className="cursor-pointer"
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      {!compact && (
        <div className="flex items-center gap-4">
          {/* Volume Control */}
          <div className="flex items-center gap-2 flex-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleVolumeToggle}
              className="h-8 w-8"
            >
              {volume > 0 ? (
                <Volume2 className="h-4 w-4" />
              ) : (
                <VolumeX className="h-4 w-4" />
              )}
            </Button>
            <Slider
              value={[volume * 100]}
              min={0}
              max={100}
              step={1}
              onValueChange={(value) => onVolumeChange(value[0] / 100)}
              className="flex-1 max-w-[100px]"
            />
            <span className="text-xs text-muted-foreground min-w-[35px]">
              {Math.round(volume * 100)}%
            </span>
          </div>

          {/* Playback Speed */}
          <div className="flex items-center gap-2">
            <Gauge className="h-4 w-4 text-muted-foreground" />
            <div className="flex gap-1">
              {playbackRates.map((rate) => (
                <Button
                  key={rate}
                  variant={playbackRate === rate ? "secondary" : "ghost"}
                  size="sm"
                  onClick={() => onPlaybackRateChange(rate)}
                  className="h-7 px-2 text-xs"
                >
                  {rate}x
                </Button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
