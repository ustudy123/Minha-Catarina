import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { getTranslations } from '@/translations';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Loader2, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ScheduleModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (data: {
    custom_phrase: string;
    scheduled_time: string;
    repeat_days: string[];
  }) => Promise<void>;
  initialData?: {
    custom_phrase?: string;
    scheduled_time?: string;
    repeat_days?: string[];
  };
  isEdit?: boolean;
}

export function ScheduleModal({
  open,
  onOpenChange,
  onSave,
  initialData,
  isEdit = false,
}: ScheduleModalProps) {
  const { language } = useLanguage();
  const t = getTranslations(language);

  const [phrase, setPhrase] = useState(initialData?.custom_phrase || '');
  const [time, setTime] = useState(initialData?.scheduled_time || '08:00');
  const [selectedDays, setSelectedDays] = useState<string[]>(
    initialData?.repeat_days || []
  );
  const [isLoading, setIsLoading] = useState(false);

  const daysOfWeek = [
    { id: 'mon', label: t.schedule.days.mon },
    { id: 'tue', label: t.schedule.days.tue },
    { id: 'wed', label: t.schedule.days.wed },
    { id: 'thu', label: t.schedule.days.thu },
    { id: 'fri', label: t.schedule.days.fri },
    { id: 'sat', label: t.schedule.days.sat },
    { id: 'sun', label: t.schedule.days.sun },
  ];

  const toggleDay = (dayId: string) => {
    setSelectedDays((prev) =>
      prev.includes(dayId)
        ? prev.filter((d) => d !== dayId)
        : [...prev, dayId]
    );
  };

  const handleSave = async () => {
    if (!phrase.trim()) return;

    setIsLoading(true);
    try {
      await onSave({
        custom_phrase: phrase.trim(),
        scheduled_time: time,
        repeat_days: selectedDays,
      });
      onOpenChange(false);
      setPhrase('');
      setTime('08:00');
      setSelectedDays([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {isEdit ? t.schedule.editSchedule : t.schedule.createNew}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="phrase">{t.schedule.phrase}</Label>
            <Textarea
              id="phrase"
              placeholder={t.schedule.phrasePlaceholder}
              value={phrase}
              onChange={(e) => setPhrase(e.target.value)}
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="time">{t.schedule.time}</Label>
            <div className="relative">
              <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                id="time"
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>{t.schedule.repeatDays}</Label>
            <div className="flex flex-wrap gap-2">
              {daysOfWeek.map((day) => (
                <Badge
                  key={day.id}
                  variant={selectedDays.includes(day.id) ? 'default' : 'outline'}
                  className={cn(
                    'cursor-pointer transition-all',
                    selectedDays.includes(day.id)
                      ? 'bg-primary hover:bg-primary/90'
                      : 'hover:bg-primary/10'
                  )}
                  onClick={() => toggleDay(day.id)}
                >
                  {day.label}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            {t.common.cancel}
          </Button>
          <Button
            onClick={handleSave}
            disabled={!phrase.trim() || isLoading}
            variant="gradient"
          >
            {isLoading && <Loader2 className="w-4 h-4 animate-spin mr-2" />}
            {t.common.save}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
