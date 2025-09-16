-- Fix search_path for handle_new_user function
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, name, email, hostel, year, points, rating)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'name', 'Anonymous User'),
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'hostel', 'Not specified'),
    COALESCE((NEW.raw_user_meta_data->>'year')::integer, 1),
    0,
    0.00
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = 'public';

-- Fix search_path for get_user_requests function
CREATE OR REPLACE FUNCTION get_user_requests(user_id_param UUID)
RETURNS TABLE (
  id UUID,
  skill TEXT,
  status TEXT,
  created_at TIMESTAMPTZ,
  requester_name TEXT,
  requester_hostel TEXT,
  requester_year INTEGER,
  requester_email TEXT,
  request_type TEXT
) 
SECURITY DEFINER
SET search_path = 'public'
AS $$
BEGIN
  -- Get incoming requests (where user is the teacher)
  RETURN QUERY
  SELECT 
    mr.id,
    mr.skill,
    mr.status,
    mr.created_at,
    p.name as requester_name,
    p.hostel as requester_hostel,
    p.year as requester_year,
    p.email as requester_email,
    'incoming'::TEXT as request_type
  FROM match_requests mr
  JOIN profiles p ON p.user_id = mr.requester_id
  WHERE mr.teacher_id = user_id_param
  
  UNION ALL
  
  -- Get outgoing requests (where user is the requester)
  SELECT 
    mr.id,
    mr.skill,
    mr.status,
    mr.created_at,
    p.name as requester_name,
    p.hostel as requester_hostel,
    p.year as requester_year,
    p.email as requester_email,
    'outgoing'::TEXT as request_type
  FROM match_requests mr
  JOIN profiles p ON p.user_id = mr.teacher_id
  WHERE mr.requester_id = user_id_param
  
  ORDER BY created_at DESC;
END;
$$ LANGUAGE plpgsql;