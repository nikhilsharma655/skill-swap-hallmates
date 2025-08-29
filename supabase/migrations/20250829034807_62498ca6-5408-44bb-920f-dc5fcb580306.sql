-- Fix security vulnerability: Restrict profile access to protect student privacy
-- Create a view for public profile information that excludes sensitive data
CREATE OR REPLACE VIEW public.public_profiles AS
SELECT 
  id,
  user_id,
  name,
  hostel,
  year,
  points,
  rating,
  created_at,
  updated_at
FROM public.profiles;

-- Grant access to the view
GRANT SELECT ON public.public_profiles TO authenticated;
GRANT SELECT ON public.public_profiles TO anon;

-- Update RLS policy on profiles table to be more restrictive
DROP POLICY IF EXISTS "Users can view all profiles" ON public.profiles;

-- Create new restrictive policies for profiles table
CREATE POLICY "Users can view their own profile" 
ON public.profiles 
FOR SELECT 
USING (auth.uid() = user_id);

-- Create policy for public profile view (this will be used by the application)
ALTER VIEW public.public_profiles SET (security_barrier = true);
CREATE POLICY "Anyone can view public profiles" 
ON public.profiles 
FOR SELECT 
USING (false); -- This ensures direct access to profiles table is blocked

-- Enable RLS on the view access through a security definer function
CREATE OR REPLACE FUNCTION public.get_public_profiles()
RETURNS TABLE (
  id uuid,
  user_id uuid,
  name text,
  hostel text,
  year integer,
  points integer,
  rating numeric,
  created_at timestamptz,
  updated_at timestamptz
)
LANGUAGE sql
SECURITY DEFINER
STABLE
AS $$
  SELECT 
    id,
    user_id,
    name,
    hostel,
    year,
    points,
    rating,
    created_at,
    updated_at
  FROM public.profiles;
$$;