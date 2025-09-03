# SkillSwap Website Source Code

## Main Landing Page - src/pages/Index.tsx

```tsx
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
```

## Navigation Component - src/components/Navigation.tsx

```tsx
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { Menu, X, GraduationCap } from "lucide-react";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const getUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user || null);
    };
    
    getUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user || null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-xl border-b border-border/10 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-glow rounded-xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300">
              <GraduationCap className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-2xl font-black gradient-text">SkillSwap</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className={`font-medium transition-colors hover:text-primary ${
                isActive('/') ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              Home
            </Link>
            <Link 
              to="/matches" 
              className={`font-medium transition-colors hover:text-primary ${
                isActive('/matches') ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              Explore
            </Link>
            <span className="font-medium text-muted-foreground hover:text-primary transition-colors cursor-pointer">
              About
            </span>
            
            {user ? (
              <div className="flex items-center space-x-4">
                <Link to="/dashboard">
                  <Button variant="ghost" className="font-medium">
                    Dashboard
                  </Button>
                </Link>
                <Button 
                  onClick={handleSignOut}
                  variant="outline"
                  className="rounded-full px-6 py-2 hover:bg-muted"
                >
                  Sign Out
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/auth">
                  <Button 
                    variant="ghost" 
                    className="font-medium hover:bg-muted"
                  >
                    Login
                  </Button>
                </Link>
                <Link to="/auth">
                  <Button 
                    className="rounded-full px-6 py-2 bg-gradient-to-r from-primary to-primary-glow hover:scale-105 transition-all duration-300 shadow-lg"
                  >
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className="p-2"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden border-t border-border/10 bg-background/95 backdrop-blur-xl">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                to="/"
                className={`block px-3 py-2 text-base font-medium rounded-lg transition-colors ${
                  isActive('/') 
                    ? 'text-primary bg-primary/10' 
                    : 'text-muted-foreground hover:text-primary hover:bg-muted'
                }`}
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/matches"
                className={`block px-3 py-2 text-base font-medium rounded-lg transition-colors ${
                  isActive('/matches') 
                    ? 'text-primary bg-primary/10' 
                    : 'text-muted-foreground hover:text-primary hover:bg-muted'
                }`}
                onClick={() => setIsOpen(false)}
              >
                Explore
              </Link>
              <span className="block px-3 py-2 text-base font-medium text-muted-foreground hover:text-primary hover:bg-muted rounded-lg transition-colors cursor-pointer">
                About
              </span>
              
              <div className="border-t border-border/10 pt-4 mt-4">
                {user ? (
                  <div className="space-y-2">
                    <Link to="/dashboard" onClick={() => setIsOpen(false)}>
                      <Button variant="ghost" className="w-full justify-start">
                        Dashboard
                      </Button>
                    </Link>
                    <Button 
                      onClick={() => {
                        handleSignOut();
                        setIsOpen(false);
                      }}
                      variant="outline"
                      className="w-full"
                    >
                      Sign Out
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Link to="/auth" onClick={() => setIsOpen(false)}>
                      <Button variant="ghost" className="w-full justify-start">
                        Login
                      </Button>
                    </Link>
                    <Link to="/auth" onClick={() => setIsOpen(false)}>
                      <Button className="w-full bg-gradient-to-r from-primary to-primary-glow">
                        Sign Up
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
```

## Main Styles - src/index.css

```css
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap");
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    /* Light mode colors - Soft pastels with purple/blue accents */
    --background: 248 250 252;
    --foreground: 15 23 42;
    --card: 255 255 255;
    --card-foreground: 15 23 42;
    --popover: 255 255 255;
    --popover-foreground: 15 23 42;
    --primary: 124 58 237;
    --primary-glow: 139 92 246;
    --primary-soft: 124 58 237 / 0.1;
    --primary-foreground: 255 255 255;
    --secondary: 241 245 249;
    --secondary-foreground: 15 23 42;
    --muted: 248 250 252;
    --muted-foreground: 100 116 139;
    --accent: 168 85 247;
    --accent-foreground: 255 255 255;
    --destructive: 239 68 68;
    --destructive-foreground: 255 255 255;
    --border: 226 232 240;
    --input: 226 232 240;
    --ring: 124 58 237;
    --chart-1: 124 58 237;
    --chart-2: 139 92 246;
    --chart-3: 168 85 247;
    --chart-4: 196 181 253;
    --chart-5: 221 214 254;
    --radius: 0.75rem;
    
    /* Additional semantic colors */
    --success: 34 197 94;
    --warning: 245 158 11;
    --info: 59 130 246;
    
    /* Gradients */
    --gradient-primary: linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary-glow)));
    --gradient-calm: linear-gradient(135deg, hsl(248 250 252) 0%, hsl(241 245 249) 50%, hsl(230 244 248) 100%);
    --gradient-hero: linear-gradient(135deg, hsl(var(--primary) / 0.05) 0%, hsl(var(--accent) / 0.05) 50%, hsl(var(--primary-glow) / 0.05) 100%);
    --gradient-section: linear-gradient(180deg, hsl(var(--background)) 0%, hsl(var(--muted)) 100%);
    
    /* Shadows */
    --shadow-soft: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -2px rgb(0 0 0 / 0.05);
    --shadow-glow: 0 20px 25px -5px rgb(124 58 237 / 0.1), 0 10px 10px -5px rgb(124 58 237 / 0.04);
  }

  .dark {
    /* Dark mode colors */
    --background: 2 8 23;
    --foreground: 248 250 252;
    --card: 15 23 42;
    --card-foreground: 248 250 252;
    --popover: 15 23 42;
    --popover-foreground: 248 250 252;
    --primary: 139 92 246;
    --primary-glow: 168 85 247;
    --primary-soft: 139 92 246 / 0.15;
    --primary-foreground: 255 255 255;
    --secondary: 30 41 59;
    --secondary-foreground: 248 250 252;
    --muted: 30 41 59;
    --muted-foreground: 148 163 184;
    --accent: 196 181 253;
    --accent-foreground: 15 23 42;
    --destructive: 239 68 68;
    --destructive-foreground: 255 255 255;
    --border: 30 41 59;
    --input: 30 41 59;
    --ring: 139 92 246;
    
    /* Dark mode gradients */
    --gradient-calm: linear-gradient(135deg, hsl(2 8 23) 0%, hsl(15 23 42) 50%, hsl(30 41 59) 100%);
    --gradient-hero: linear-gradient(135deg, hsl(var(--primary) / 0.1) 0%, hsl(var(--accent) / 0.1) 50%, hsl(var(--primary-glow) / 0.1) 100%);
    --gradient-section: linear-gradient(180deg, hsl(var(--background)) 0%, hsl(var(--card)) 100%);
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground font-sans antialiased;
    font-family: "Inter", sans-serif;
  }
}

/* Custom utility classes */
@layer utilities {
  .calm-background {
    background: var(--gradient-calm);
    position: relative;
  }
  
  .hero-gradient {
    background: var(--gradient-hero);
  }
  
  .section-gradient {
    background: var(--gradient-section);
  }
  
  .gradient-text {
    background: var(--gradient-primary);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  
  .card-shadow {
    box-shadow: var(--shadow-soft);
  }
  
  .card-hover {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }
  
  .card-hover:hover {
    transform: translateY(-8px);
    box-shadow: var(--shadow-glow);
  }
  
  .floating-card {
    animation: float 6s ease-in-out infinite;
  }
  
  .floating-card:nth-child(2) {
    animation-delay: -2s;
  }
  
  .floating-card:nth-child(3) {
    animation-delay: -4s;
  }
  
  .floating-card:nth-child(4) {
    animation-delay: -6s;
  }
  
  .floating-shapes {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    pointer-events: none;
  }
  
  .floating-shapes::before,
  .floating-shapes::after {
    content: '';
    position: absolute;
    width: 300px;
    height: 300px;
    background: hsl(var(--primary) / 0.03);
    border-radius: 50%;
    animation: float 20s ease-in-out infinite;
  }
  
  .floating-shapes::before {
    top: 10%;
    left: 10%;
    animation-delay: -10s;
  }
  
  .floating-shapes::after {
    bottom: 10%;
    right: 10%;
    background: hsl(var(--accent) / 0.03);
    animation-delay: -15s;
  }
  
  .fade-in-up {
    animation: fadeInUp 0.8s ease-out forwards;
    opacity: 0;
    transform: translateY(30px);
  }
  
  .fade-in-up:nth-child(1) { animation-delay: 0.1s; }
  .fade-in-up:nth-child(2) { animation-delay: 0.2s; }
  .fade-in-up:nth-child(3) { animation-delay: 0.3s; }
  .fade-in-up:nth-child(4) { animation-delay: 0.4s; }
  .fade-in-up:nth-child(5) { animation-delay: 0.5s; }
  
  .breathe {
    animation: breathe 4s ease-in-out infinite;
  }
  
  .bounce-soft {
    animation: bounceSoft 2s ease-in-out infinite;
  }
  
  .bg-primary-soft {
    background-color: hsl(var(--primary-soft));
  }
}

/* Animations */
@keyframes float {
  0%, 100% {
    transform: translateY(0px) rotate(0deg);
  }
  50% {
    transform: translateY(-20px) rotate(5deg);
  }
}

@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes breathe {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
}

@keyframes bounceSoft {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5px);
  }
}

/* Scrollbar styling */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: hsl(var(--muted));
}

::-webkit-scrollbar-thumb {
  background: hsl(var(--primary) / 0.3);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: hsl(var(--primary) / 0.5);
}
```

## App Configuration - src/App.tsx

```tsx
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Matches from "./pages/Matches";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/matches" element={<Matches />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
```

## Key Features

- **Modern Design**: Soft pastel colors with purple/blue accents
- **Responsive**: Fully mobile-responsive design
- **Animations**: Smooth hover effects, floating elements, and transitions  
- **Navigation**: Sticky navigation with authentication state
- **SEO Optimized**: Semantic HTML structure with proper headings
- **Accessibility**: ARIA labels and keyboard navigation support
- **Performance**: Optimized animations and CSS gradients
- **User Experience**: Clear call-to-actions and intuitive layout

## Tech Stack

- React 18 with TypeScript
- Tailwind CSS for styling
- Lucide React for icons
- React Router for navigation
- Supabase for backend services
- Vite for build tooling