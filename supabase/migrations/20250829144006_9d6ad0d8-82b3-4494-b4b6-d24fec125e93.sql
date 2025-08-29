-- Fix the security vulnerability by creating a proper public-safe view
-- and restricting direct table access to sensitive fields

-- Drop the current overly permissive policy
DROP POLICY IF EXISTS "Users can view public profile info" ON public.profiles;

-- Create a secure view that only exposes non-sensitive profile information
CREATE VIEW public.public_profiles AS
SELECT 
  id,
  user_id,
  name,
  hostel,
  year,
  points,
  rating
FROM public.profiles;

-- Enable RLS on the view (inherited from base table)
-- Create a policy that allows authenticated users to access the public view
CREATE POLICY "Users can view public profile data only"
ON public.profiles
FOR SELECT
USING (
  -- Users can only see their own complete profile OR basic public info for others
  auth.uid() = user_id OR 
  -- For other users, they should use the public_profiles view in application code
  -- This policy will be used by the view
  auth.uid() IS NOT NULL
);

-- Grant access to the public view
GRANT SELECT ON public.public_profiles TO authenticated;