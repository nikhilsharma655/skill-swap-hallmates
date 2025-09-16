import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Home, User, Users, LogOut, MessageSquare } from "lucide-react";

const Navigation = () => {
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  useEffect(() => {
    // Get initial session
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
    };
    getSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      navigate("/");
      toast({
        title: "Logged out",
        description: "You have been successfully logged out.",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 border-b border-border/20 bg-background/80 backdrop-blur-lg supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="font-bold text-2xl gradient-text">
            SkillSwap
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            {!user && (
              <>
                <Link to="/" className={`text-sm font-medium transition-colors hover:text-primary ${isActive("/") ? "text-primary" : "text-muted-foreground"}`}>
                  Home
                </Link>
                <Link to="/matches" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                  Explore
                </Link>
                <span className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors cursor-pointer">
                  About
                </span>
              </>
            )}
          </div>

          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <Button
                  variant={isActive("/dashboard") ? "default" : "ghost"}
                  size="sm"
                  asChild
                  className="rounded-full"
                >
                  <Link to="/dashboard" className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Dashboard
                  </Link>
                </Button>
                
                <Button
                  variant={isActive("/matches") ? "default" : "ghost"}
                  size="sm"
                  asChild
                  className="rounded-full"
                >
                  <Link to="/matches" className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    Find Partners
                  </Link>
                </Button>

                <Button
                  variant={isActive("/requests") ? "default" : "ghost"}
                  size="sm"
                  asChild
                  className="rounded-full"
                >
                  <Link to="/requests" className="flex items-center gap-2">
                    <MessageSquare className="w-4 h-4" />
                    Requests
                  </Link>
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLogout}
                  className="flex items-center gap-2 rounded-full"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </Button>
              </>
            ) : (
              <div className="flex items-center space-x-3">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  asChild
                  className="rounded-full"
                >
                  <Link to="/auth">Login</Link>
                </Button>
                
                <Button 
                  size="sm" 
                  asChild
                  className="rounded-full bg-gradient-to-r from-primary to-primary-glow hover:scale-105 transition-transform"
                >
                  <Link to="/auth">Get Started</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;