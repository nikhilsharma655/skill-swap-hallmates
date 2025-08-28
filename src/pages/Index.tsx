import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import { Users, BookOpen, Star, Zap, Target, Globe, ArrowRight, Sparkles } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center relative">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 -z-10" />
        <div className="max-w-5xl mx-auto space-y-8">
          <div className="flex items-center justify-center gap-2 text-primary mb-4">
            <Sparkles className="w-6 h-6" />
            <span className="text-sm font-medium uppercase tracking-wide">Welcome to SkillSwap</span>
            <Sparkles className="w-6 h-6" />
          </div>
          <h1 className="text-6xl md:text-7xl font-bold leading-tight">
            <span className="gradient-text">Connect.</span>{" "}
            <span className="gradient-text">Learn.</span>{" "}
            <span className="gradient-text">Grow.</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            The ultimate platform for hostel students to exchange knowledge, build skills, 
            and create lasting connections through peer-to-peer learning.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <Button size="lg" className="group glow-effect" asChild>
              <Link to="/auth" className="flex items-center gap-2">
                Get Started
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="glass-effect" asChild>
              <Link to="/matches">Explore Skills</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-b from-background to-muted/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Why Choose SkillSwap?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover the features that make learning and teaching seamless
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="card-hover border-0 card-shadow bg-gradient-to-br from-card to-background">
              <CardHeader className="text-center pb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary-glow rounded-2xl flex items-center justify-center mx-auto mb-4 glow-effect">
                  <Users className="w-8 h-8 text-primary-foreground" />
                </div>
                <CardTitle className="text-2xl">Connect Locally</CardTitle>
                <CardDescription className="text-base">
                  Find learning partners right in your hostel community for immediate collaboration
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="card-hover border-0 card-shadow bg-gradient-to-br from-card to-background">
              <CardHeader className="text-center pb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary-glow rounded-2xl flex items-center justify-center mx-auto mb-4 glow-effect">
                  <BookOpen className="w-8 h-8 text-primary-foreground" />
                </div>
                <CardTitle className="text-2xl">Skill Exchange</CardTitle>
                <CardDescription className="text-base">
                  Create a perfect balance - teach what you know, learn what you need
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="card-hover border-0 card-shadow bg-gradient-to-br from-card to-background">
              <CardHeader className="text-center pb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary-glow rounded-2xl flex items-center justify-center mx-auto mb-4 glow-effect">
                  <Star className="w-8 h-8 text-primary-foreground" />
                </div>
                <CardTitle className="text-2xl">Build Reputation</CardTitle>
                <CardDescription className="text-base">
                  Earn points and ratings as you help others grow and build your learning profile
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">How It Works</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Three simple steps to start your learning journey
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto">
            <div className="text-center space-y-6 group">
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-br from-primary to-primary-glow rounded-3xl flex items-center justify-center mx-auto glow-effect group-hover:scale-110 transition-transform duration-300">
                  <Target className="w-10 h-10 text-primary-foreground" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-accent rounded-full flex items-center justify-center text-sm font-bold">1</div>
              </div>
              <h3 className="text-2xl font-bold">Set Your Skills</h3>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Add skills you want to teach and skills you want to learn to create your learning profile
              </p>
            </div>
            
            <div className="text-center space-y-6 group">
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-br from-primary to-primary-glow rounded-3xl flex items-center justify-center mx-auto glow-effect group-hover:scale-110 transition-transform duration-300">
                  <Globe className="w-10 h-10 text-primary-foreground" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-accent rounded-full flex items-center justify-center text-sm font-bold">2</div>
              </div>
              <h3 className="text-2xl font-bold">Find Matches</h3>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Discover students in your hostel with complementary skills and learning goals
              </p>
            </div>
            
            <div className="text-center space-y-6 group">
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-br from-primary to-primary-glow rounded-3xl flex items-center justify-center mx-auto glow-effect group-hover:scale-110 transition-transform duration-300">
                  <Zap className="w-10 h-10 text-primary-foreground" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-accent rounded-full flex items-center justify-center text-sm font-bold">3</div>
              </div>
              <h3 className="text-2xl font-bold">Start Learning</h3>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Connect, collaborate, and grow together through structured learning sessions
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-primary/10 via-accent/5 to-primary/10">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-4xl font-bold gradient-text">500+</div>
              <div className="text-muted-foreground">Active Students</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold gradient-text">1,200+</div>
              <div className="text-muted-foreground">Skills Shared</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold gradient-text">850+</div>
              <div className="text-muted-foreground">Successful Matches</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold gradient-text">4.9★</div>
              <div className="text-muted-foreground">Average Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-primary-glow text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="w-full h-full bg-repeat" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }} />
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Start Your Learning Journey?</h2>
          <p className="text-xl md:text-2xl mb-10 opacity-90 max-w-3xl mx-auto">
            Join hundreds of students already growing through SkillSwap and unlock your potential today
          </p>
          <Button size="lg" variant="secondary" className="group text-lg px-8 py-6" asChild>
            <Link to="/auth" className="flex items-center gap-2">
              Join SkillSwap Today
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted/30 py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="text-2xl font-bold gradient-text mb-4">SkillSwap</div>
          <p className="text-muted-foreground mb-6">Connecting minds, building futures.</p>
          <div className="flex justify-center gap-6 text-sm text-muted-foreground">
            <Link to="/auth" className="hover:text-primary transition-colors">Get Started</Link>
            <Link to="/matches" className="hover:text-primary transition-colors">Find Skills</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;