import { cn } from "@/lib/utils";

interface AudioWaveAnimationProps {
  isPlaying: boolean;
  className?: string;
}

export const AudioWaveAnimation = ({ isPlaying, className }: AudioWaveAnimationProps) => {
  return (
    <div className={cn("flex items-center gap-0.5", className)}>
      {[...Array(4)].map((_, i) => (
        <div
          key={i}
          className={cn(
            "w-0.5 bg-current rounded-full transition-all",
            isPlaying ? "animate-pulse" : "h-2"
          )}
          style={{
            height: isPlaying ? '100%' : '8px',
            animationDelay: `${i * 0.15}s`,
            animationDuration: '0.6s',
          }}
        />
      ))}
    </div>
  );
};
