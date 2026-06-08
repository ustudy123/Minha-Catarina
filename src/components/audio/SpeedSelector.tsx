import React from 'react';
import { useVoice } from '@/contexts/VoiceContext';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu';
import { Gauge } from 'lucide-react';

export const SpeedSelector = () => {
  const { playbackSpeed, setPlaybackSpeed } = useVoice();
  
  const speeds = [0.5, 0.8, 1.0, 1.2, 1.5, 2.0];
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-2 h-9 px-3">
          <Gauge className="w-4 h-4" />
          <span className="text-sm font-medium">{playbackSpeed}x</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        <DropdownMenuLabel>Velocidade da Voz</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {speeds.map((speed) => (
          <DropdownMenuItem 
            key={speed}
            onClick={() => setPlaybackSpeed(speed)}
            className={playbackSpeed === speed ? "bg-accent font-bold" : ""}
          >
            {speed === 1.0 ? "Normal (1.0x)" : `${speed}x`}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};