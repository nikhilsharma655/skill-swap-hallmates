import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, BookOpen, Trophy, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            SkillSwap
          </h1>
          <p className="text-xl text-muted-foreground mb-4">
            Learn from Your Hostel Floor
          </p>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Connect with fellow students in your campus to share skills, learn new ones, and build meaningful connections within your hostel community.
          </p>
          <div className="flex gap-4 justify-center">
            <Button asChild size="lg">
              <Link to="/auth">Get Started</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/auth">Login</Link>
            </Button>
          </div>
        </div>

        {/* Features Section */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <Card className="text-center">
            <CardHeader>
              <Users className="w-12 h-12 mx-auto mb-4 text-primary" />
              <CardTitle>Connect Locally</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Find and connect with students in your hostel who share your interests
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <BookOpen className="w-12 h-12 mx-auto mb-4 text-primary" />
              <CardTitle>Skill Sharing</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Teach what you know and learn what you need from your peers
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <Trophy className="w-12 h-12 mx-auto mb-4 text-primary" />
              <CardTitle>Earn Points</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Build your reputation by helping others and get recognized
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <MessageCircle className="w-12 h-12 mx-auto mb-4 text-primary" />
              <CardTitle>Easy Matching</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Our smart system matches you with the right learning partners
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        {/* How it Works */}
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-8">How SkillSwap Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="bg-primary text-primary-foreground w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                1
              </div>
              <h3 className="text-xl font-semibold mb-2">Sign Up</h3>
              <p className="text-muted-foreground">
                Create your profile with your hostel and year details
              </p>
            </div>
            <div>
              <div className="bg-primary text-primary-foreground w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                2
              </div>
              <h3 className="text-xl font-semibold mb-2">Add Skills</h3>
              <p className="text-muted-foreground">
                List skills you can teach and ones you want to learn
              </p>
            </div>
            <div>
              <div className="bg-primary text-primary-foreground w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                3
              </div>
              <h3 className="text-xl font-semibold mb-2">Start Learning</h3>
              <p className="text-muted-foreground">
                Get matched with peers and send learning requests
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
