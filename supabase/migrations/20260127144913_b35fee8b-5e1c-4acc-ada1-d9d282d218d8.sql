-- Add UPDATE policy for user_subscriptions table (admin-only updates)
-- This allows admins to manage all subscriptions through the admin panel

CREATE POLICY "Admins can update all subscriptions"
ON public.user_subscriptions
FOR UPDATE
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));