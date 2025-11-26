import { Button } from "@/components/ui/button";
import { Play, Pause, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { AudioWaveAnimation } from "./AudioWaveAnimation";

interface PlayButtonProps {
  isPlaying: boolean;
  isLoading: boolean;
  onPlay: () => void;
  onPause: () => void;
  variant?: "default" | "secondary" | "outline" | "ghost";
  size?: "default" | "sm" | "lg" | "icon";
  showWave?: boolean;
  className?: string;
}

export const PlayButton = ({
  isPlaying,
  isLoading,
  onPlay,
  onPause,
  variant = "secondary",
  size = "icon",
  showWave = false,
  className,
}: PlayButtonProps) => {
  const handleClick = () => {
    if (isPlaying) {
      onPause();
    } else {
      onPlay();
    }
  };

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleClick}
      disabled={isLoading}
      className={cn("rounded-xl", className)}
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : showWave && isPlaying ? (
        <AudioWaveAnimation isPlaying={isPlaying} className="w-4 h-4" />
      ) : isPlaying ? (
        <Pause className="w-4 h-4" />
      ) : (
        <Play className="w-4 h-4" />
      )}
    </Button>
  );
};
