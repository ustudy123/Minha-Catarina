import React from 'react';
import { useVoice } from '@/contexts/VoiceContext';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export const SpeedSelector = () => {
  const { playbackSpeed, setPlaybackSpeed } = useVoice();
  
  const speeds = [0.5, 0.8, 1.0, 1.2, 1.5, 2.0];
  
  return (
    <div className="flex items-center gap-1 bg-muted/50 p-1 rounded-full border border-border/50">
      {speeds.map((speed) => (
        <Button
          key={speed}
          variant="ghost"
          size="sm"
          onClick={() => setPlaybackSpeed(speed)}
          className={cn(
            "h-7 px-2 text-[10px] sm:text-xs rounded-full transition-all duration-200",
            playbackSpeed === speed 
              ? "bg-primary text-primary-foreground shadow-sm font-bold" 
              : "text-muted-foreground hover:text-foreground hover:bg-background/50"
          )}
        >
          {speed === 1.0 ? "1.0x" : `${speed}x`}
        </Button>
      ))}
    </div>
  );
};