import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Plus, Clock, Calendar, MessageSquare, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

interface ScheduledMessage {
  id: string;
  phrase: string;
  time: string;
  days: string[];
  isActive: boolean;
}

const daysOfWeek = [
  { id: "mon", label: "Seg" },
  { id: "tue", label: "Ter" },
  { id: "wed", label: "Qua" },
  { id: "thu", label: "Qui" },
  { id: "fri", label: "Sex" },
  { id: "sat", label: "Sáb" },
  { id: "sun", label: "Dom" },
];

export default function Schedule() {
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
    toast.info("Programação via WhatsApp em breve! 🚀", {
      description: "Esta funcionalidade será integrada com o WhatsApp em breve.",
    });
  };

  const handleDeleteSchedule = (id: string) => {
    toast.info("Programação via WhatsApp em breve! 🚀", {
      description: "Esta funcionalidade será integrada com o WhatsApp em breve.",
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
            Programar Mensagens
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
                  Programação via WhatsApp em Desenvolvimento
                </h3>
                <p className="text-sm text-gray-700 leading-relaxed">
                  Em breve você poderá programar mensagens automáticas para serem enviadas via WhatsApp 
                  nos horários que você definir. A Catarina estará sempre presente nos momentos importantes!
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
            Criar Nova Programação
          </Button>
        </div>

        {/* Schedule List (Preview) */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Programações Exemplo
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
                    {schedule.isActive ? "Ativo" : "Inativo"}
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
              💡 <strong>Dica:</strong> Em breve você poderá criar sequências de mensagens 
              para diferentes momentos do dia. A Catarina cuidará da rotina da sua filha 
              mesmo quando você estiver ocupada!
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
