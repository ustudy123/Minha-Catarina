import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, Users, BarChart3, ArrowLeft, Shield, Volume2 } from 'lucide-react';
import { useTranslations } from '@/contexts/LanguageContext';

const Admin = () => {
  const navigate = useNavigate();
  const t = useTranslations();

  const adminCards = [
    {
      title: t.admin?.manageLibrary || 'Gerenciar Biblioteca',
      description: t.admin?.manageLibraryDesc || 'Adicionar, editar e excluir frases',
      icon: BookOpen,
      path: '/admin/phrases',
      color: 'bg-primary/10 text-primary',
    },
    {
      title: t.admin?.manageUsers || 'Gerenciar Usuários',
      description: t.admin?.manageUsersDesc || 'Ver e gerenciar usuários',
      icon: Users,
      path: '/admin/users',
      color: 'bg-secondary/10 text-secondary-foreground',
    },
    {
      title: t.admin?.statistics || 'Estatísticas',
      description: t.admin?.statisticsDesc || 'Visualizar métricas do app',
      icon: BarChart3,
      path: '/admin/stats',
      color: 'bg-accent/10 text-accent-foreground',
    },
    {
      title: 'Gerenciar Áudios',
      description: 'Pré-gerar áudios para reprodução instantânea',
      icon: Volume2,
      path: '/admin/audio',
      color: 'bg-highlight/10 text-highlight',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6 max-w-4xl">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => navigate('/')}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-primary/10">
              <Shield className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">{t.admin?.title || 'Painel de Administração'}</h1>
              <p className="text-muted-foreground text-sm">{t.admin?.subtitle || 'Gerencie o conteúdo e usuários'}</p>
            </div>
          </div>
        </div>

        {/* Admin Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {adminCards.map((card) => (
            <Card 
              key={card.path}
              className="cursor-pointer hover:shadow-lg transition-all hover:scale-[1.02] border-border/50"
              onClick={() => navigate(card.path)}
            >
              <CardHeader>
                <div className={`w-12 h-12 rounded-xl ${card.color} flex items-center justify-center mb-2`}>
                  <card.icon className="h-6 w-6" />
                </div>
                <CardTitle className="text-lg">{card.title}</CardTitle>
                <CardDescription>{card.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Admin;
