import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Sunrise, Sun, Moon } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export type TimeOfDay = 'all' | 'morning' | 'afternoon' | 'night';

interface TimeOfDayFilterProps {
  value: TimeOfDay;
  onChange: (value: TimeOfDay) => void;
}

export function TimeOfDayFilter({ value, onChange }: TimeOfDayFilterProps) {
  const { language } = useLanguage();

  const texts = {
    pt: {
      all: 'Todas',
      morning: 'Manhã',
      afternoon: 'Tarde',
      night: 'Noite',
    },
    en: {
      all: 'All',
      morning: 'Morning',
      afternoon: 'Afternoon',
      night: 'Night',
    },
    es: {
      all: 'Todas',
      morning: 'Mañana',
      afternoon: 'Tarde',
      night: 'Noche',
    },
  };

  const t = texts[language];

  return (
    <Tabs value={value} onValueChange={(v) => onChange(v as TimeOfDay)}>
      <TabsList className="w-full grid grid-cols-4 h-12">
        <TabsTrigger value="all" className="gap-1">
          {t.all}
        </TabsTrigger>
        <TabsTrigger value="morning" className="gap-1">
          <Sunrise className="w-4 h-4" />
          {t.morning}
        </TabsTrigger>
        <TabsTrigger value="afternoon" className="gap-1">
          <Sun className="w-4 h-4" />
          {t.afternoon}
        </TabsTrigger>
        <TabsTrigger value="night" className="gap-1">
          <Moon className="w-4 h-4" />
          {t.night}
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
