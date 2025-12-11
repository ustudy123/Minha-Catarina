import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Search, Users, Crown, Loader2 } from 'lucide-react';
import { useTranslations } from '@/contexts/LanguageContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface UserData {
  id: string;
  full_name: string | null;
  created_at: string;
  email?: string;
  subscription?: {
    plan_type: string;
    expires_at: string | null;
  };
}

const AdminUsers = () => {
  const navigate = useNavigate();
  const t = useTranslations();
  const [users, setUsers] = useState<UserData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPlan, setFilterPlan] = useState<string>('all');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      // Fetch profiles with subscriptions
      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select('id, full_name, created_at')
        .order('created_at', { ascending: false });

      if (profilesError) throw profilesError;

      // Fetch subscriptions
      const { data: subscriptions, error: subsError } = await supabase
        .from('user_subscriptions')
        .select('user_id, plan_type, expires_at');

      if (subsError) throw subsError;

      // Merge data
      const usersData: UserData[] = (profiles || []).map(profile => ({
        ...profile,
        subscription: subscriptions?.find(s => s.user_id === profile.id) || {
          plan_type: 'basic',
          expires_at: null,
        },
      }));

      setUsers(usersData);
    } catch (error) {
      console.error('Error fetching users:', error);
      toast.error('Erro ao carregar usuários');
    } finally {
      setIsLoading(false);
    }
  };

  const updateUserPlan = async (userId: string, newPlan: string) => {
    try {
      // Check if subscription exists
      const { data: existing } = await supabase
        .from('user_subscriptions')
        .select('id')
        .eq('user_id', userId)
        .single();

      if (existing) {
        // Update existing
        const { error } = await supabase
          .from('user_subscriptions')
          .update({ 
            plan_type: newPlan,
            expires_at: newPlan === 'premium' ? new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString() : null
          })
          .eq('user_id', userId);

        if (error) throw error;
      } else {
        // Create new
        const { error } = await supabase
          .from('user_subscriptions')
          .insert({ 
            user_id: userId, 
            plan_type: newPlan,
            expires_at: newPlan === 'premium' ? new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString() : null
          });

        if (error) throw error;
      }

      // Update local state
      setUsers(prev => prev.map(u => 
        u.id === userId 
          ? { ...u, subscription: { plan_type: newPlan, expires_at: u.subscription?.expires_at || null } }
          : u
      ));

      toast.success(`Plano alterado para ${newPlan}`);
    } catch (error) {
      console.error('Error updating plan:', error);
      toast.error('Erro ao atualizar plano');
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = !searchTerm || 
      user.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesPlan = filterPlan === 'all' || 
      user.subscription?.plan_type === filterPlan;
    
    return matchesSearch && matchesPlan;
  });

  const stats = {
    total: users.length,
    premium: users.filter(u => u.subscription?.plan_type === 'premium').length,
    basic: users.filter(u => u.subscription?.plan_type !== 'premium').length,
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6 max-w-6xl">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Button variant="ghost" size="icon" onClick={() => navigate('/admin')}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-foreground">{t.admin?.manageUsers || 'Gerenciar Usuários'}</h1>
            <p className="text-muted-foreground text-sm">{users.length} usuários cadastrados</p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-primary/10">
                <Users className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.total}</p>
                <p className="text-xs text-muted-foreground">Total</p>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-amber-500/10">
                <Crown className="h-5 w-5 text-amber-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.premium}</p>
                <p className="text-xs text-muted-foreground">Premium</p>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-muted">
                <Users className="h-5 w-5 text-muted-foreground" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.basic}</p>
                <p className="text-xs text-muted-foreground">Básico</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por nome ou ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={filterPlan} onValueChange={setFilterPlan}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Filtrar plano" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="basic">Básico</SelectItem>
              <SelectItem value="premium">Premium</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Users List */}
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : filteredUsers.length === 0 ? (
          <Card className="p-12 text-center">
            <p className="text-muted-foreground">Nenhum usuário encontrado</p>
          </Card>
        ) : (
          <div className="space-y-3">
            {filteredUsers.map(user => (
              <Card key={user.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-foreground">
                          {user.full_name || 'Usuário sem nome'}
                        </p>
                        {user.subscription?.plan_type === 'premium' && (
                          <Crown className="h-4 w-4 text-amber-500" />
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground truncate">
                        ID: {user.id}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Cadastrado em {format(new Date(user.created_at), "dd/MM/yyyy", { locale: ptBR })}
                      </p>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <Badge 
                        variant={user.subscription?.plan_type === 'premium' ? 'default' : 'secondary'}
                        className={user.subscription?.plan_type === 'premium' ? 'bg-amber-500' : ''}
                      >
                        {user.subscription?.plan_type === 'premium' ? 'Premium' : 'Básico'}
                      </Badge>
                      
                      <Select 
                        value={user.subscription?.plan_type || 'basic'}
                        onValueChange={(value) => updateUserPlan(user.id, value)}
                      >
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="basic">Básico</SelectItem>
                          <SelectItem value="premium">Premium</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminUsers;
