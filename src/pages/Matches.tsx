import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Users, MapPin, Star, Send } from "lucide-react";
import Navigation from "@/components/Navigation";

interface Match {
  id: string;
  userId: string; // Add userId field for the teacher_id
  name: string;
  hostel: string;
  year: number;
  rating: number;
  points: number;
  matchingSkills: string[];
  allTeachSkills: string[];
}

const Matches = () => {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [requestingSkills, setRequestingSkills] = useState<Set<string>>(new Set());
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    checkAuthAndLoadMatches();
  }, [navigate]);

  const checkAuthAndLoadMatches = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/auth");
        return;
      }

      await loadMatches(session.user.id);
    } catch (error) {
      console.error("Error loading matches:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadMatches = async (userId: string) => {
    try {
      // Get user's skills they want to learn
      const { data: learnSkills, error: learnError } = await supabase
        .from("skills_to_learn")
        .select("skill")
        .eq("user_id", userId);

      if (learnError) {
        console.error("Error fetching learn skills:", learnError);
        return;
      }

      if (!learnSkills || learnSkills.length === 0) {
        setMatches([]);
        return;
      }

      const skillsToLearn = learnSkills.map(s => s.skill.toLowerCase());

      // Get all users who can teach these skills (excluding current user)
      const { data: teachSkills, error: teachError } = await supabase
        .from("skills_to_teach")
        .select(`
          skill,
          user_id,
          profiles (
            id,
            name,
            hostel,
            year,
            rating,
            points,
            user_id
          )
        `)
        .neq("user_id", userId);

      if (teachError) {
        console.error("Error fetching teach skills:", teachError);
        return;
      }

      // Process matches
      const userMatches = new Map<string, Match>();

      teachSkills?.forEach((teachSkill: any) => {
        const profile = teachSkill.profiles;
        if (!profile) return;

        const skillLower = teachSkill.skill.toLowerCase();
        if (skillsToLearn.some(learnSkill => 
          skillLower.includes(learnSkill) || learnSkill.includes(skillLower)
        )) {
          const userId = profile.user_id;
          
          if (!userMatches.has(userId)) {
            userMatches.set(userId, {
              id: profile.id,
              userId: profile.user_id, // Store the user_id for teacher_id
              name: profile.name,
              hostel: profile.hostel,
              year: profile.year,
              rating: profile.rating,
              points: profile.points,
              matchingSkills: [],
              allTeachSkills: []
            });
          }

          const match = userMatches.get(userId)!;
          match.allTeachSkills.push(teachSkill.skill);
          
          if (!match.matchingSkills.includes(teachSkill.skill)) {
            match.matchingSkills.push(teachSkill.skill);
          }
        }
      });

      setMatches(Array.from(userMatches.values()));
    } catch (error) {
      console.error("Error processing matches:", error);
    }
  };

  const sendLearningRequest = async (teacherId: string, skill: string) => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      setRequestingSkills(prev => new Set(prev).add(`${teacherId}-${skill}`));

      const { error } = await supabase
        .from("match_requests")
        .insert({
          requester_id: session.user.id,
          teacher_id: teacherId,
          skill: skill,
          status: 'pending'
        });

      if (error) throw error;

      toast({
        title: "Request sent!",
        description: `Your learning request for ${skill} has been sent.`,
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setRequestingSkills(prev => {
        const newSet = new Set(prev);
        newSet.delete(`${teacherId}-${skill}`);
        return newSet;
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading matches...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Find Learning Partners</h1>
          <p className="text-muted-foreground">
            Discover fellow students who can teach you the skills you want to learn
          </p>
        </div>

        {matches.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <Users className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-xl font-semibold mb-2">No matches found</h3>
              <p className="text-muted-foreground mb-4">
                Add skills you want to learn in your dashboard to find learning partners
              </p>
              <Button onClick={() => navigate("/dashboard")}>
                Go to Dashboard
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {matches.map((match) => (
              <Card key={match.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{match.name}</CardTitle>
                      <CardDescription className="flex items-center gap-1 mt-1">
                        <MapPin className="w-4 h-4" />
                        {match.hostel} • Year {match.year}
                      </CardDescription>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500" />
                        <span className="font-semibold">{match.rating.toFixed(1)}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{match.points} pts</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-sm mb-2">Can teach you:</h4>
                      <div className="flex flex-wrap gap-1">
                        {match.matchingSkills.map((skill) => (
                          <Badge key={skill} variant="default" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {match.allTeachSkills.length > match.matchingSkills.length && (
                      <div>
                        <h4 className="font-semibold text-sm mb-2">Other skills:</h4>
                        <div className="flex flex-wrap gap-1">
                          {match.allTeachSkills
                            .filter(skill => !match.matchingSkills.includes(skill))
                            .map((skill) => (
                              <Badge key={skill} variant="outline" className="text-xs">
                                {skill}
                              </Badge>
                            ))}
                        </div>
                      </div>
                    )}

                    <div className="pt-2 space-y-2">
                      {match.matchingSkills.map((skill) => (
                        <Button
                          key={skill}
                          size="sm"
                          className="w-full text-xs"
                          onClick={() => sendLearningRequest(match.userId, skill)}
                          disabled={requestingSkills.has(`${match.userId}-${skill}`)}
                        >
                          <Send className="w-3 h-3 mr-1" />
                          {requestingSkills.has(`${match.userId}-${skill}`) 
                            ? "Sending..." 
                            : `Request to learn ${skill}`
                          }
                        </Button>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Matches;