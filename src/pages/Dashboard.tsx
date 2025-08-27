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
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("user_id", userId)
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
      <div className="container mx-auto px-4 py-8">
        {/* Profile Header */}
        {profile && (
          <Card className="mb-8">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl">{profile.name}</CardTitle>
                  <CardDescription>
                    {profile.hostel} • Year {profile.year} • {profile.email}
                  </CardDescription>
                </div>
                <div className="flex gap-4">
                  <div className="text-center">
                    <div className="flex items-center gap-1">
                      <Award className="w-5 h-5 text-primary" />
                      <span className="text-2xl font-bold">{profile.points}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Points</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center gap-1">
                      <Star className="w-5 h-5 text-yellow-500" />
                      <span className="text-2xl font-bold">{profile.rating.toFixed(1)}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Rating</p>
                  </div>
                </div>
              </div>
            </CardHeader>
          </Card>
        )}

        <div className="grid md:grid-cols-2 gap-8">
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
              <div className="flex gap-2">
                <Input
                  placeholder="e.g., Web Development, Guitar, Photography"
                  value={newTeachSkill}
                  onChange={(e) => setNewTeachSkill(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && addTeachSkill()}
                />
                <Button onClick={addTeachSkill} size="icon">
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
              <div className="flex gap-2">
                <Input
                  placeholder="e.g., Spanish, Cooking, Data Science"
                  value={newLearnSkill}
                  onChange={(e) => setNewLearnSkill(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && addLearnSkill()}
                />
                <Button onClick={addLearnSkill} size="icon">
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