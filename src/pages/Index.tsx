import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Navigation from "@/components/Navigation";
import { Users, BookOpen, Star, Zap, Target, Globe, ArrowRight, Sparkles, Search, CheckCircle, Heart, Award, Shield } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen calm-background">
      <div className="floating-shapes"></div>
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 hero-gradient -z-10" />
        <div className="floating-shapes"></div>
        <div className="container mx-auto px-6 py-24 text-center relative">
          <div className="max-w-6xl mx-auto space-y-10">
            <div className="flex items-center justify-center gap-3 text-primary mb-6 fade-in-up breathe">
              <Sparkles className="w-6 h-6 bounce-soft" />
              <span className="text-sm font-semibold uppercase tracking-wider bg-primary-soft px-4 py-2 rounded-full">
                Welcome to SkillSwap
              </span>
              <Sparkles className="w-6 h-6 bounce-soft" />
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black leading-tight fade-in-up">
              <span className="gradient-text">Connect.</span>{" "}
              <span className="gradient-text">Learn.</span>{" "}
              <span className="gradient-text">Grow.</span>
            </h1>
            
            <p className="text-xl md:text-2xl lg:text-3xl text-muted-foreground max-w-4xl mx-auto leading-relaxed fade-in-up">
              The ultimate platform for hostel students to exchange knowledge, build skills, 
              and create lasting connections through peer-to-peer learning.
            </p>

            {/* Search Bar */}
            <div className="max-w-md mx-auto relative fade-in-up">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input 
                placeholder="Search for skills..." 
                className="pl-12 h-14 text-lg rounded-full border-border/20 bg-background/80 backdrop-blur-xl shadow-lg"
              />
            </div>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center pt-8 fade-in-up">
              <Button 
                size="lg" 
                className="group rounded-full px-8 py-6 text-lg font-semibold bg-gradient-to-r from-primary to-primary-glow hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl" 
                asChild
              >
                <Link to="/auth" className="flex items-center gap-2">
                  Get Started
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="rounded-full px-8 py-6 text-lg font-semibold bg-background/80 backdrop-blur-xl border-border/20 hover:bg-background/90 transition-all duration-300 shadow-lg" 
                asChild
              >
                <Link to="/matches">Explore Skills</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose SkillSwap Section */}
      <section className="py-24 section-gradient relative">
        <div className="floating-shapes"></div>
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-black mb-6 gradient-text">Why Choose SkillSwap?</h2>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Discover the features that make learning and teaching seamless
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="card-hover border-0 card-shadow floating-card group">
              <CardHeader className="text-center pb-8 pt-8">
                <div className="w-20 h-20 bg-gradient-to-br from-primary to-primary-glow rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Users className="w-10 h-10 text-primary-foreground" />
                </div>
                <CardTitle className="text-2xl font-bold mb-3">Peer-to-Peer Learning</CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  Connect with fellow students for authentic, collaborative learning experiences
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="card-hover border-0 card-shadow floating-card group">
              <CardHeader className="text-center pb-8 pt-8">
                <div className="w-20 h-20 bg-gradient-to-br from-success to-success/80 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Target className="w-10 h-10 text-white" />
                </div>
                <CardTitle className="text-2xl font-bold mb-3">Build Real Skills</CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  Learn practical skills that matter for your career and personal growth
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="card-hover border-0 card-shadow floating-card group">
              <CardHeader className="text-center pb-8 pt-8">
                <div className="w-20 h-20 bg-gradient-to-br from-info to-info/80 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Shield className="w-10 h-10 text-white" />
                </div>
                <CardTitle className="text-2xl font-bold mb-3">Verified Community</CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  Safe, trusted environment with verified student profiles and ratings
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="card-hover border-0 card-shadow floating-card group">
              <CardHeader className="text-center pb-8 pt-8">
                <div className="w-20 h-20 bg-gradient-to-br from-warning to-warning/80 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Heart className="w-10 h-10 text-white" />
                </div>
                <CardTitle className="text-2xl font-bold mb-3">Fun & Engaging</CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  Gamified learning with points, achievements, and social features
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 calm-background relative">
        <div className="floating-shapes"></div>
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-black mb-6 gradient-text">How It Works</h2>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Three simple steps to start your learning journey
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-16 max-w-6xl mx-auto">
            <div className="text-center space-y-8 group">
              <div className="relative">
                <div className="w-24 h-24 bg-gradient-to-br from-primary to-primary-glow rounded-full flex items-center justify-center mx-auto shadow-2xl group-hover:scale-110 transition-all duration-500">
                  <Target className="w-12 h-12 text-primary-foreground" />
                </div>
                <div className="absolute -top-3 -right-3 w-10 h-10 bg-gradient-to-br from-accent to-info rounded-full flex items-center justify-center text-lg font-black text-white shadow-lg">1</div>
              </div>
              <h3 className="text-3xl font-black">Set Your Skills</h3>
              <p className="text-muted-foreground text-lg leading-relaxed max-w-sm mx-auto">
                Add skills you want to teach and skills you want to learn to create your learning profile
              </p>
            </div>
            
            <div className="text-center space-y-8 group">
              <div className="relative">
                <div className="w-24 h-24 bg-gradient-to-br from-success to-success/80 rounded-full flex items-center justify-center mx-auto shadow-2xl group-hover:scale-110 transition-all duration-500">
                  <Globe className="w-12 h-12 text-white" />
                </div>
                <div className="absolute -top-3 -right-3 w-10 h-10 bg-gradient-to-br from-accent to-info rounded-full flex items-center justify-center text-lg font-black text-white shadow-lg">2</div>
              </div>
              <h3 className="text-3xl font-black">Find Matches</h3>
              <p className="text-muted-foreground text-lg leading-relaxed max-w-sm mx-auto">
                Discover students in your hostel with complementary skills and learning goals
              </p>
            </div>
            
            <div className="text-center space-y-8 group">
              <div className="relative">
                <div className="w-24 h-24 bg-gradient-to-br from-warning to-warning/80 rounded-full flex items-center justify-center mx-auto shadow-2xl group-hover:scale-110 transition-all duration-500">
                  <Zap className="w-12 h-12 text-white" />
                </div>
                <div className="absolute -top-3 -right-3 w-10 h-10 bg-gradient-to-br from-accent to-info rounded-full flex items-center justify-center text-lg font-black text-white shadow-lg">3</div>
              </div>
              <h3 className="text-3xl font-black">Start Learning</h3>
              <p className="text-muted-foreground text-lg leading-relaxed max-w-sm mx-auto">
                Connect, collaborate, and grow together through structured learning sessions
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 section-gradient relative">
        <div className="floating-shapes"></div>
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12 text-center">
            <div className="space-y-4 group">
              <div className="text-5xl md:text-6xl font-black gradient-text group-hover:scale-110 transition-transform duration-300">500+</div>
              <div className="text-lg font-semibold text-muted-foreground">Active Students</div>
            </div>
            <div className="space-y-4 group">
              <div className="text-5xl md:text-6xl font-black gradient-text group-hover:scale-110 transition-transform duration-300">1,200+</div>
              <div className="text-lg font-semibold text-muted-foreground">Skills Shared</div>
            </div>
            <div className="space-y-4 group">
              <div className="text-5xl md:text-6xl font-black gradient-text group-hover:scale-110 transition-transform duration-300">850+</div>
              <div className="text-lg font-semibold text-muted-foreground">Successful Matches</div>
            </div>
            <div className="space-y-4 group">
              <div className="text-5xl md:text-6xl font-black gradient-text group-hover:scale-110 transition-transform duration-300">4.9★</div>
              <div className="text-lg font-semibold text-muted-foreground">Average Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-primary via-primary-glow to-accent text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="floating-shapes"></div>
          <div className="w-full h-full bg-repeat" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.15'%3E%3Ccircle cx='40' cy='40' r='3'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }} />
        </div>
        <div className="container mx-auto px-6 text-center relative z-10">
          <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight">Ready to Start Your Learning Journey?</h2>
          <p className="text-xl md:text-2xl mb-12 opacity-95 max-w-4xl mx-auto leading-relaxed">
            Join hundreds of students already growing through SkillSwap and unlock your potential today
          </p>
          <Button 
            size="lg" 
            variant="secondary" 
            className="group text-xl px-12 py-8 rounded-full font-bold bg-white text-primary hover:bg-white/90 hover:scale-105 transition-all duration-300 shadow-2xl" 
            asChild
          >
            <Link to="/auth" className="flex items-center gap-3">
              Join SkillSwap Today
              <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="section-gradient py-16 border-t border-border/20 relative">
        <div className="floating-shapes"></div>
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="md:col-span-2">
              <div className="text-3xl font-black gradient-text mb-4">SkillSwap</div>
              <p className="text-muted-foreground mb-6 text-lg leading-relaxed max-w-md">
                Made by students, for students. Connecting minds, building futures.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold text-lg mb-4">Quick Links</h4>
              <div className="space-y-3">
                <Link to="/auth" className="block text-muted-foreground hover:text-primary transition-colors">Get Started</Link>
                <Link to="/matches" className="block text-muted-foreground hover:text-primary transition-colors">Explore Skills</Link>
                <span className="block text-muted-foreground hover:text-primary transition-colors cursor-pointer">About</span>
              </div>
            </div>
            
            <div>
              <h4 className="font-bold text-lg mb-4">Support</h4>
              <div className="space-y-3">
                <span className="block text-muted-foreground hover:text-primary transition-colors cursor-pointer">Contact</span>
                <span className="block text-muted-foreground hover:text-primary transition-colors cursor-pointer">Privacy Policy</span>
                <span className="block text-muted-foreground hover:text-primary transition-colors cursor-pointer">Social Media</span>
              </div>
            </div>
          </div>
          
          <div className="border-t border-border/20 pt-8 text-center">
            <p className="text-muted-foreground">
              © 2024 SkillSwap. Made with ❤️ by students, for students.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;