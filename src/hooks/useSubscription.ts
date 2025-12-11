import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useAdmin } from './useAdmin';

type PlanType = 'basic' | 'premium';

interface Subscription {
  id: string;
  user_id: string;
  plan_type: PlanType;
  created_at: string;
  expires_at: string | null;
}

export function useSubscription() {
  const { user } = useAuth();
  const { isAdmin } = useAdmin();
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchSubscription();
    } else {
      setSubscription(null);
      setIsLoading(false);
    }
  }, [user]);

  const fetchSubscription = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('user_subscriptions')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();

      if (error) {
        console.error('Error fetching subscription:', error);
        // Create basic subscription if none exists
        await createBasicSubscription();
        return;
      }

      if (!data) {
        // Create basic subscription if none exists
        await createBasicSubscription();
        return;
      }

      setSubscription(data as Subscription);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const createBasicSubscription = async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from('user_subscriptions')
      .insert({
        user_id: user.id,
        plan_type: 'basic',
      })
      .select()
      .single();

    if (!error && data) {
      setSubscription(data as Subscription);
    }
    setIsLoading(false);
  };

  const plan = subscription?.plan_type || 'basic';
  const isPremium = plan === 'premium';
  const hasFullAccess = isPremium || isAdmin;

  return {
    subscription,
    isLoading,
    plan,
    isPremium,
    isAdmin,
    hasFullAccess,
    canCreatePhrases: hasFullAccess,
    canAccessMyPhrases: hasFullAccess,
    maxRoutines: hasFullAccess ? Infinity : 3,
    refetch: fetchSubscription,
  };
}
