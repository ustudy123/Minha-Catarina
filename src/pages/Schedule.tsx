import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Plus, Clock, Calendar, MessageSquare, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";
import { getTranslations } from "@/translations";
import { toast } from "sonner";

interface ScheduledMessage {
  id: string;
  phrase: string;
  time: string;
  days: string[];
  isActive: boolean;
}

export default function Schedule() {
  const { language } = useLanguage();
  const t = getTranslations(language);

  const daysOfWeek = [
    { id: "mon", label: t.schedule.days.mon },
    { id: "tue", label: t.schedule.days.tue },
    { id: "wed", label: t.schedule.days.wed },
    { id: "thu", label: t.schedule.days.thu },
    { id: "fri", label: t.schedule.days.fri },
    { id: "sat", label: t.schedule.days.sat },
    { id: "sun", label: t.schedule.days.sun },
  ];

  const [schedules] = useState<ScheduledMessage[]>([
    {
      id: "1",
      phrase: "Bom dia, meu amor! Hora de acordar!",
      time: "07:00",
      days: ["mon", "tue", "wed", "thu", "fri"],
      isActive: true,
    },
    {
      id: "2",
      phrase: "Hora do almoço! Vamos comer bem!",
      time: "12:00",
      days: ["mon", "tue", "wed", "thu", "fri", "sat", "sun"],
      isActive: true,
    },
    {
      id: "3",
      phrase: "Boa noite! Tenha sonhos lindos!",
      time: "20:30",
      days: ["mon", "tue", "wed", "thu", "fri", "sat", "sun"],
      isActive: true,
    },
  ]);

  const handleCreateSchedule = () => {
    toast.info(t.schedule.comingSoonToast, {
      description: t.schedule.comingSoonToastDescription,
    });
  };

  const handleDeleteSchedule = (id: string) => {
    toast.info(t.schedule.comingSoonToast, {
      description: t.schedule.comingSoonToastDescription,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-purple-100 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/">
            <Button variant="ghost" size="icon" className="hover:bg-purple-100">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
            {t.schedule.title}
          </h1>
          <div className="w-10" />
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Coming Soon Banner */}
        <Card className="mb-8 border-2 border-primary/20 bg-gradient-to-r from-purple-50 to-pink-50">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-full bg-primary/10">
                <MessageSquare className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-primary mb-2">
                  {t.schedule.comingSoonTitle}
                </h3>
                <p className="text-sm text-gray-700 leading-relaxed">
                  {t.schedule.comingSoonDescription}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Create Button */}
        <div className="mb-8">
          <Button
            onClick={handleCreateSchedule}
            className="w-full md:w-auto"
            size="lg"
          >
            <Plus className="mr-2 h-5 w-5" />
            {t.schedule.createNew}
          </Button>
        </div>

        {/* Schedule List (Preview) */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            {t.schedule.exampleSchedules}
          </h2>

          {schedules.map((schedule) => (
            <Card
              key={schedule.id}
              className="hover:shadow-lg transition-all duration-300 border-2 opacity-60"
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-purple-100">
                      <Clock className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{schedule.time}</CardTitle>
                      <p className="text-sm text-gray-500 mt-1">
                        {schedule.phrase}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDeleteSchedule(schedule.id)}
                    className="hover:bg-red-50 hover:text-red-600"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 flex-wrap">
                  <Calendar className="h-4 w-4 text-gray-400" />
                  {daysOfWeek.map((day) => (
                    <Badge
                      key={day.id}
                      variant={schedule.days.includes(day.id) ? "default" : "outline"}
                      className="text-xs"
                    >
                      {day.label}
                    </Badge>
                  ))}
                  <Badge
                    variant={schedule.isActive ? "default" : "secondary"}
                    className="ml-auto"
                  >
                    {schedule.isActive ? t.schedule.active : t.schedule.inactive}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Info Card */}
        <Card className="mt-8 border-dashed border-2">
          <CardContent className="p-6 text-center">
            <p className="text-gray-600">
              {t.schedule.tip}
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
