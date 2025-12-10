import { Lock, Crown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { getTranslations } from '@/translations';

interface PremiumGateProps {
  children?: React.ReactNode;
  featureName?: string;
}

export function PremiumGate({ children, featureName }: PremiumGateProps) {
  const { language } = useLanguage();
  const t = getTranslations(language);

  const texts = {
    pt: {
      title: 'Recurso Premium',
      description: 'Para usar esta funcionalidade, adquira a versão premium',
      feature: featureName || 'este recurso',
      button: 'Ver Planos',
    },
    en: {
      title: 'Premium Feature',
      description: 'To use this feature, please upgrade to premium',
      feature: featureName || 'this feature',
      button: 'View Plans',
    },
    es: {
      title: 'Función Premium',
      description: 'Para usar esta función, adquiere la versión premium',
      feature: featureName || 'esta función',
      button: 'Ver Planes',
    },
  };

  const text = texts[language];

  return (
    <Card className="text-center p-8 border-2 border-dashed border-muted-foreground/30 bg-muted/20">
      <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-highlight to-primary flex items-center justify-center">
        <Lock className="w-10 h-10 text-white" />
      </div>
      <div className="flex items-center justify-center gap-2 mb-2">
        <Crown className="w-5 h-5 text-highlight" />
        <h3 className="text-xl font-bold">{text.title}</h3>
      </div>
      <p className="text-muted-foreground mb-6 max-w-sm mx-auto">
        {text.description}
      </p>
      <Button variant="gradient" size="lg" className="gap-2">
        <Crown className="w-4 h-4" />
        {text.button}
      </Button>
      {children}
    </Card>
  );
}
