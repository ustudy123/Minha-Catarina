import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

export const useAdmin = () => {
  const { user } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  // Usuário para o qual o papel já foi verificado. Enquanto for diferente do
  // usuário atual, a verificação ainda está pendente: sem isso, ao abrir
  // /admin direto pelo endereço, o AdminRoute via "não é admin" por um
  // instante (login chegou, checagem ainda não) e redirecionava para "/".
  const [checkedUserId, setCheckedUserId] = useState<string | null | undefined>(undefined);

  useEffect(() => {
    const checkAdminRole = async () => {
      if (!user) {
        setIsAdmin(false);
        setCheckedUserId(null);
        return;
      }

      try {
        const { data, error } = await supabase
          .rpc('has_role', { _user_id: user.id, _role: 'admin' });

        if (error) {
          console.error('Error checking admin role:', error);
          setIsAdmin(false);
        } else {
          setIsAdmin(data === true);
        }
      } catch (error) {
        console.error('Error checking admin role:', error);
        setIsAdmin(false);
      } finally {
        setCheckedUserId(user.id);
      }
    };

    checkAdminRole();
  }, [user]);

  const isLoading = checkedUserId !== (user?.id ?? null);

  return { isAdmin: isAdmin && !isLoading, isLoading };
};
