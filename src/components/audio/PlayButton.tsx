import { Button } from "@/components/ui/button";
import { Play, Pause, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { AudioWaveAnimation } from "./AudioWaveAnimation";

interface PlayButtonProps {
  isPlaying: boolean;
  isLoading: boolean;
  onPlay: () => void;
  onPause: () => void;
  variant?: "default" | "secondary" | "outline" | "ghost" | "accent" | "highlight" | "gradient" | "premium";
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
      className={cn(
        "rounded-xl transition-all duration-300",
        isPlaying && "ring-2 ring-primary ring-offset-2",
        className
      )}
    >
      {isLoading ? (
        <Loader2 className="w-5 h-5 animate-spin" />
      ) : showWave && isPlaying ? (
        <div className="flex items-center gap-1">
          <Pause className="w-5 h-5 fill-current" />
          <AudioWaveAnimation isPlaying={isPlaying} className="h-4" />
        </div>
      ) : isPlaying ? (
        <Pause className="w-5 h-5 fill-current" />
      ) : (
        <Play className="w-5 h-5 fill-current ml-0.5" />
      )}
    </Button>
  );
};
