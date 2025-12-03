import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Plus, Clock, Calendar, MessageSquare, Trash2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { useLanguage } from "@/contexts/LanguageContext";
import { getTranslations } from "@/translations";
import { useScheduledMessages } from "@/hooks/useScheduledMessages";
import { ScheduleModal } from "@/components/ScheduleModal";
import { toast } from "sonner";

export default function Schedule() {
  const { language } = useLanguage();
  const t = getTranslations(language);
  const { schedules, isLoading, createSchedule, deleteSchedule, toggleActive } = useScheduledMessages();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const daysOfWeek = [
    { id: "mon", label: t.schedule.days.mon },
    { id: "tue", label: t.schedule.days.tue },
    { id: "wed", label: t.schedule.days.wed },
    { id: "thu", label: t.schedule.days.thu },
    { id: "fri", label: t.schedule.days.fri },
    { id: "sat", label: t.schedule.days.sat },
    { id: "sun", label: t.schedule.days.sun },
  ];

  const handleCreateSchedule = async (data: {
    custom_phrase: string;
    scheduled_time: string;
    repeat_days: string[];
  }) => {
    const { error } = await createSchedule({
      custom_phrase: data.custom_phrase,
      scheduled_time: data.scheduled_time,
      repeat_days: data.repeat_days,
    });

    if (error) {
      toast.error("Erro ao criar programação");
    } else {
      toast.success(t.schedule.scheduleCreated);
    }
  };

  const handleDeleteSchedule = async (id: string) => {
    const { error } = await deleteSchedule(id);
    if (error) {
      toast.error("Erro ao excluir programação");
    } else {
      toast.success(t.schedule.scheduleDeleted);
    }
  };

  const handleToggleActive = async (id: string) => {
    const { error } = await toggleActive(id);
    if (error) {
      toast.error("Erro ao atualizar programação");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-muted via-background to-secondary/20">
      {/* Header */}
      <header className="sticky top-0 z-50 glass border-b border-border/50 backdrop-blur-lg">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            {t.schedule.title}
          </h1>
          <div className="w-10" />
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Coming Soon Banner */}
        <Card className="mb-8 border-2 border-primary/20 bg-gradient-to-r from-primary/5 to-secondary/5">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-full bg-primary/10">
                <MessageSquare className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-primary mb-2">
                  {t.schedule.comingSoonTitle}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {t.schedule.comingSoonDescription}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Create Button */}
        <div className="mb-8">
          <Button
            onClick={() => setIsModalOpen(true)}
            className="w-full md:w-auto"
            size="lg"
            variant="gradient"
          >
            <Plus className="mr-2 h-5 w-5" />
            {t.schedule.createNew}
          </Button>
        </div>

        {/* Schedule List */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold mb-4">
            {t.schedule.exampleSchedules}
          </h2>

          {isLoading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : schedules.length === 0 ? (
            <Card className="border-dashed border-2">
              <CardContent className="p-8 text-center">
                <Calendar className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50" />
                <p className="text-muted-foreground">{t.schedule.noSchedules}</p>
              </CardContent>
            </Card>
          ) : (
            schedules.map((schedule) => (
              <Card
                key={schedule.id}
                className="hover:shadow-lg transition-all duration-300 border-2"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <Clock className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">
                          {schedule.scheduled_time.slice(0, 5)}
                        </CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">
                          {schedule.custom_phrase}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={schedule.is_active}
                        onCheckedChange={() => handleToggleActive(schedule.id)}
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteSchedule(schedule.id)}
                        className="hover:bg-destructive/10 hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 flex-wrap">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    {daysOfWeek.map((day) => (
                      <Badge
                        key={day.id}
                        variant={schedule.repeat_days.includes(day.id) ? "default" : "outline"}
                        className="text-xs"
                      >
                        {day.label}
                      </Badge>
                    ))}
                    <Badge
                      variant={schedule.is_active ? "default" : "secondary"}
                      className="ml-auto"
                    >
                      {schedule.is_active ? t.schedule.active : t.schedule.inactive}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Info Card */}
        <Card className="mt-8 border-dashed border-2">
          <CardContent className="p-6 text-center">
            <p className="text-muted-foreground">
              {t.schedule.tip}
            </p>
          </CardContent>
        </Card>
      </main>

      <ScheduleModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        onSave={handleCreateSchedule}
      />
    </div>
  );
}
