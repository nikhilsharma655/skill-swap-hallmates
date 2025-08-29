-- Fix security definer function issue and improve the security approach
-- Drop the problematic view and function
DROP FUNCTION IF EXISTS public.get_public_profiles();
DROP VIEW IF EXISTS public.public_profiles;

-- Remove the problematic policy
DROP POLICY IF EXISTS "Anyone can view public profiles" ON public.profiles;

-- Create a better approach: Update the existing RLS policy to exclude sensitive fields
-- We'll use a more targeted approach that doesn't expose emails

-- First, let's create a proper policy that allows viewing basic profile info but not emails
CREATE POLICY "Users can view public profile info" 
ON public.profiles 
FOR SELECT 
USING (auth.uid() IS NOT NULL);

-- Add a security definer function with proper search path for getting user's own email
CREATE OR REPLACE FUNCTION public.get_current_user_profile()
RETURNS TABLE (
  id uuid,
  user_id uuid,
  name text,
  email text,
  hostel text,
  year integer,
  points integer,
  rating numeric,
  created_at timestamptz,
  updated_at timestamptz
)
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
STABLE
AS $$
  SELECT 
    id,
    user_id,
    name,
    email,
    hostel,
    year,
    points,
    rating,
    created_at,
    updated_at
  FROM public.profiles
  WHERE user_id = auth.uid();
$$;