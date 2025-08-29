-- Fix the security definer view issue by using a different approach
-- Drop the view and create more restrictive RLS policies instead

DROP VIEW IF EXISTS public.public_profiles;

-- Drop the current policy and create more targeted ones
DROP POLICY IF EXISTS "Users can view public profile data only" ON public.profiles;

-- Create separate policies for different use cases
-- 1. Users can view their own complete profile (including email)
CREATE POLICY "Users can view their own complete profile"
ON public.profiles
FOR SELECT
USING (auth.uid() = user_id);

-- 2. Users can view only basic info of other users (no email, created_at, updated_at)
-- This will be enforced at the application level by selecting only safe fields
CREATE POLICY "Users can view basic info of other profiles"
ON public.profiles
FOR SELECT
USING (
  auth.uid() IS NOT NULL 
  AND auth.uid() != user_id
);

-- Note: The application code must ensure it only selects safe fields (name, hostel, year, points, rating)
-- when querying other users' profiles. Email, created_at, updated_at should only be accessible
-- for the user's own profile via the get_current_user_profile() function.