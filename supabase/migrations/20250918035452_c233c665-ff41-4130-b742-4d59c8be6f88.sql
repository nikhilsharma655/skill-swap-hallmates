-- Add seen_at column to track when requests are viewed
ALTER TABLE public.match_requests 
ADD COLUMN seen_at TIMESTAMP WITH TIME ZONE DEFAULT NULL;

-- Create index for performance on seen_at queries
CREATE INDEX idx_match_requests_seen_at ON public.match_requests(teacher_id, seen_at) WHERE seen_at IS NULL;