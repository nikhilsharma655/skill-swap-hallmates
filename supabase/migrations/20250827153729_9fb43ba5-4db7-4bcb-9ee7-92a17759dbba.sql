-- Create profiles table for user information
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  hostel TEXT NOT NULL,
  year INTEGER NOT NULL,
  points INTEGER DEFAULT 0,
  rating DECIMAL(3,2) DEFAULT 0.0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create skills_to_teach table
CREATE TABLE public.skills_to_teach (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  skill TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create skills_to_learn table  
CREATE TABLE public.skills_to_learn (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  skill TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create match_requests table
CREATE TABLE public.match_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  requester_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  teacher_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  skill TEXT NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'declined', 'completed')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skills_to_teach ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skills_to_learn ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.match_requests ENABLE ROW LEVEL SECURITY;

-- Create policies for profiles
CREATE POLICY "Users can view all profiles" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can insert their own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own profile" ON public.profiles FOR UPDATE USING (auth.uid() = user_id);

-- Create policies for skills_to_teach
CREATE POLICY "Users can view all teaching skills" ON public.skills_to_teach FOR SELECT USING (true);
CREATE POLICY "Users can manage their own teaching skills" ON public.skills_to_teach FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own teaching skills" ON public.skills_to_teach FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own teaching skills" ON public.skills_to_teach FOR DELETE USING (auth.uid() = user_id);

-- Create policies for skills_to_learn
CREATE POLICY "Users can view their own learning skills" ON public.skills_to_learn FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can manage their own learning skills" ON public.skills_to_learn FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own learning skills" ON public.skills_to_learn FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own learning skills" ON public.skills_to_learn FOR DELETE USING (auth.uid() = user_id);

-- Create policies for match_requests
CREATE POLICY "Users can view their own match requests" ON public.match_requests FOR SELECT USING (auth.uid() = requester_id OR auth.uid() = teacher_id);
CREATE POLICY "Users can create match requests" ON public.match_requests FOR INSERT WITH CHECK (auth.uid() = requester_id);
CREATE POLICY "Teachers can update match requests" ON public.match_requests FOR UPDATE USING (auth.uid() = teacher_id);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic timestamp updates on profiles
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, name, email, hostel, year)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'name', ''),
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'hostel', ''),
    COALESCE((NEW.raw_user_meta_data->>'year')::INTEGER, 1)
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to automatically create profile on signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();