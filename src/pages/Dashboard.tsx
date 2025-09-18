import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { Plus, X, BookOpen, GraduationCap, Star, Award } from "lucide-react";
import Navigation from "@/components/Navigation";

interface Profile {
  id: string;
  name: string;
  email: string;
  hostel: string;
  year: number;
  points: number;
  rating: number;
}

interface Skill {
  id: string;
  skill: string;
  description: string;
}

const Dashboard = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [teachSkills, setTeachSkills] = useState<Skill[]>([]);
  const [learnSkills, setLearnSkills] = useState<Skill[]>([]);
  const [newTeachSkill, setNewTeachSkill] = useState("");
  const [newLearnSkill, setNewLearnSkill] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    checkAuthAndLoadData();
  }, [navigate]);

  const checkAuthAndLoadData = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/auth");
        return;
      }

      await Promise.all([
        loadProfile(session.user.id),
        loadTeachSkills(session.user.id),
        loadLearnSkills(session.user.id)
      ]);
    } catch (error) {
      console.error("Error loading data:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadProfile = async (userId: string) => {
    // Use the secure RPC function to get current user's profile with email
    const { data, error } = await supabase
      .rpc('get_current_user_profile')
      .maybeSingle();

    if (error) {
      console.error("Error loading profile:", error);
      return;
    }

    if (data) {
      setProfile(data);
    }
  };

  const loadTeachSkills = async (userId: string) => {
    const { data, error } = await supabase
      .from("skills_to_teach")
      .select("*")
      .eq("user_id", userId);

    if (error) {
      console.error("Error loading teach skills:", error);
      return;
    }

    setTeachSkills(data || []);
  };

  const loadLearnSkills = async (userId: string) => {
    const { data, error } = await supabase
      .from("skills_to_learn")
      .select("*")
      .eq("user_id", userId);

    if (error) {
      console.error("Error loading learn skills:", error);
      return;
    }

    setLearnSkills(data || []);
  };

  const addTeachSkill = async () => {
    if (!newTeachSkill.trim()) return;

    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return;

    const { error } = await supabase
      .from("skills_to_teach")
      .insert({
        user_id: session.user.id,
        skill: newTeachSkill.trim()
      });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to add skill",
        variant: "destructive",
      });
      return;
    }

    setNewTeachSkill("");
    await loadTeachSkills(session.user.id);
    toast({
      title: "Success",
      description: "Skill added successfully!",
    });
  };

  const addLearnSkill = async () => {
    if (!newLearnSkill.trim()) return;

    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return;

    const { error } = await supabase
      .from("skills_to_learn")
      .insert({
        user_id: session.user.id,
        skill: newLearnSkill.trim()
      });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to add skill",
        variant: "destructive",
      });
      return;
    }

    setNewLearnSkill("");
    await loadLearnSkills(session.user.id);
    toast({
      title: "Success",
      description: "Skill added successfully!",
    });
  };

  const removeTeachSkill = async (skillId: string) => {
    const { error } = await supabase
      .from("skills_to_teach")
      .delete()
      .eq("id", skillId);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to remove skill",
        variant: "destructive",
      });
      return;
    }

    const { data: { session } } = await supabase.auth.getSession();
    if (session) {
      await loadTeachSkills(session.user.id);
    }
  };

  const removeLearnSkill = async (skillId: string) => {
    const { error } = await supabase
      .from("skills_to_learn")
      .delete()
      .eq("id", skillId);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to remove skill",
        variant: "destructive",
      });
      return;
    }

    const { data: { session } } = await supabase.auth.getSession();
    if (session) {
      await loadLearnSkills(session.user.id);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto px-4 py-6 md:py-8">
        {/* Profile Header */}
        {profile && (
          <Card className="mb-6 md:mb-8">
            <CardHeader className="pb-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <CardTitle className="text-xl md:text-2xl truncate">{profile.name}</CardTitle>
                  <CardDescription className="text-sm md:text-base mt-1">
                    {profile.hostel} • Year {profile.year}
                  </CardDescription>
                  <CardDescription className="text-xs md:text-sm text-muted-foreground/80 mt-1 break-all">
                    {profile.email}
                  </CardDescription>
                </div>
                <div className="flex gap-4 justify-end sm:justify-start">
                  <div className="text-center">
                    <div className="flex items-center gap-1 justify-center">
                      <Award className="w-4 h-4 md:w-5 md:h-5 text-primary" />
                      <span className="text-lg md:text-2xl font-bold">{profile.points}</span>
                    </div>
                    <p className="text-xs md:text-sm text-muted-foreground">Points</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center gap-1 justify-center">
                      <Star className="w-4 h-4 md:w-5 md:h-5 text-yellow-500" />
                      <span className="text-lg md:text-2xl font-bold">{profile.rating.toFixed(1)}</span>
                    </div>
                    <p className="text-xs md:text-sm text-muted-foreground">Rating</p>
                  </div>
                </div>
              </div>
            </CardHeader>
          </Card>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          {/* Skills I Can Teach */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GraduationCap className="w-5 h-5" />
                Skills I Can Teach
              </CardTitle>
              <CardDescription>
                Share your knowledge with fellow students
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-2">
                  <Input
                    placeholder="e.g., Web Development, Guitar"
                    value={newTeachSkill}
                    onChange={(e) => setNewTeachSkill(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && addTeachSkill()}
                    className="flex-1"
                  />
                  <Button onClick={addTeachSkill} size="icon" className="shrink-0">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              
              <div className="space-y-2">
                {teachSkills.map((skill) => (
                  <Badge key={skill.id} variant="secondary" className="mr-2 mb-2">
                    {skill.skill}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="ml-2 h-auto p-0"
                      onClick={() => removeTeachSkill(skill.id)}
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  </Badge>
                ))}
                {teachSkills.length === 0 && (
                  <p className="text-muted-foreground text-sm">
                    No skills added yet. Add some skills you can teach!
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Skills I Want to Learn */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                Skills I Want to Learn
              </CardTitle>
              <CardDescription>
                Find peers who can teach you new skills
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-2">
                  <Input
                    placeholder="e.g., Spanish, Cooking"
                    value={newLearnSkill}
                    onChange={(e) => setNewLearnSkill(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && addLearnSkill()}
                    className="flex-1"
                  />
                  <Button onClick={addLearnSkill} size="icon" className="shrink-0">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              
              <div className="space-y-2">
                {learnSkills.map((skill) => (
                  <Badge key={skill.id} variant="outline" className="mr-2 mb-2">
                    {skill.skill}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="ml-2 h-auto p-0"
                      onClick={() => removeLearnSkill(skill.id)}
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  </Badge>
                ))}
                {learnSkills.length === 0 && (
                  <p className="text-muted-foreground text-sm">
                    No skills added yet. Add some skills you want to learn!
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 text-center">
          <Button size="lg" onClick={() => navigate("/matches")}>
            Find Learning Partners
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;