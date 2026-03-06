import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { useVoice, DollType } from '@/contexts/VoiceContext';
import { getTranslations } from '@/translations';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';
export default function Onboarding() {
  const {
    language
  } = useLanguage();
  const t = getTranslations(language);
  const {
    completeOnboarding
  } = useVoice();
  const navigate = useNavigate();
  const [selectedDoll, setSelectedDoll] = useState<DollType | null>(null);
  const handleContinue = () => {
    if (selectedDoll) {
      completeOnboarding(selectedDoll);
      navigate('/');
    }
  };
  return <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-primary/10 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        {/* Welcome Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            {t.onboarding?.welcome || 'Bem-vindo(a)!'}
          </h1>
          <p className="text-muted-foreground">
            {t.onboarding?.selectDoll || 'Qual boneca você adquiriu?'}
          </p>
        </div>

        {/* Doll Selection */}
        <div className="grid grid-cols-2 gap-4">
          {/* Catarina Option */}
          <Card className={cn('relative cursor-pointer transition-all hover:scale-105 border-2', selectedDoll === 'catarina' ? 'border-primary bg-primary/10 ring-2 ring-primary/30' : 'border-border/50 hover:border-primary/50')} onClick={() => setSelectedDoll('catarina')}>
            <div className="p-6 flex flex-col items-center space-y-4">
              {/* Pink ribbon icon */}
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-pink-400 to-pink-600 flex items-center justify-center shadow-lg">
                <span className="text-4xl">👧🏻</span>
              </div>
              <div className="text-center">
                <h3 className="font-bold text-lg">{t.onboarding?.catarina || 'Catarina'}</h3>
                
              </div>
              {selectedDoll === 'catarina' && <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                  <Check className="w-4 h-4 text-primary-foreground" />
                </div>}
            </div>
          </Card>

          {/* Antonio Option - Hidden but preserved */}
          <Card className={cn('hidden relative cursor-pointer transition-all hover:scale-105 border-2', selectedDoll === 'antonio' ? 'border-accent bg-accent/10 ring-2 ring-accent/30' : 'border-border/50 hover:border-accent/50')} onClick={() => setSelectedDoll('antonio')}>
            <div className="p-6 flex flex-col items-center space-y-4">
              {/* Blue cap icon */}
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center shadow-lg">
                <span className="text-4xl">👦🏻</span>
              </div>
              <div className="text-center">
                <h3 className="font-bold text-lg">{t.onboarding?.antonio || 'Antônio'}</h3>
                
              </div>
              {selectedDoll === 'antonio' && <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-accent flex items-center justify-center">
                  <Check className="w-4 h-4 text-accent-foreground" />
                </div>}
            </div>
          </Card>
        </div>

        {/* Continue Button */}
        <Button variant="gradient" size="lg" className="w-full" disabled={!selectedDoll} onClick={handleContinue}>
          {t.onboarding?.continue || 'Continuar'}
        </Button>
      </div>
    </div>;
}