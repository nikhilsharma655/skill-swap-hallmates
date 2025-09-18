import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Home, User, Users, LogOut, MessageSquare, Menu, X } from "lucide-react";

const Navigation = () => {
  const [user, setUser] = useState<any>(null);
  const [pendingRequestsCount, setPendingRequestsCount] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  const fetchRequestsCount = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('match_requests')
        .select('id')
        .eq('teacher_id', userId)
        .in('status', ['pending', 'accepted'])
        .is('seen_at', null);

      if (error) {
        console.error('Error fetching requests count:', error);
        return;
      }

      setPendingRequestsCount(data?.length || 0);
    } catch (error) {
      console.error('Error fetching requests count:', error);
    }
  };

  useEffect(() => {
    // Get initial session
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchRequestsCount(session.user.id);
      } else {
        setPendingRequestsCount(0);
      }
    };
    getSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
        if (session?.user) {
          fetchRequestsCount(session.user.id);
        } else {
          setPendingRequestsCount(0);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  // Set up real-time subscription for new requests
  useEffect(() => {
    if (!user) return;

    const channel = supabase
      .channel('match_requests_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'match_requests',
          filter: `teacher_id=eq.${user.id}`
        },
        () => {
          // Refetch count when requests change
          fetchRequestsCount(user.id);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);

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
                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center space-x-2">
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
                    className="rounded-full relative"
                  >
                    <Link to="/requests" className="flex items-center gap-2">
                      <MessageSquare className="w-4 h-4" />
                      Requests
                      {pendingRequestsCount > 0 && (
                        <Badge 
                          variant="destructive" 
                          className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center text-xs p-0 min-w-[20px]"
                        >
                          {pendingRequestsCount > 99 ? '99+' : pendingRequestsCount}
                        </Badge>
                      )}
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
                </div>

                {/* Mobile menu button */}
                <div className="md:hidden">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  >
                    <Menu className="h-5 w-5" />
                  </Button>
                </div>
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

      {/* Mobile menu */}
      {isMobileMenuOpen && user && (
        <div className="md:hidden border-t border-border bg-background/95 backdrop-blur-md">
          <div className="px-4 py-3 space-y-3">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                navigate("/dashboard");
                setIsMobileMenuOpen(false);
              }}
              className={`block text-sm font-medium transition-colors ${
                isActive("/dashboard")
                  ? "text-primary"
                  : "text-muted-foreground"
              }`}
            >
              Dashboard
            </a>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                navigate("/matches");
                setIsMobileMenuOpen(false);
              }}
              className={`block text-sm font-medium transition-colors ${
                isActive("/matches")
                  ? "text-primary"
                  : "text-muted-foreground"
              }`}
            >
              Find Partners
            </a>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                navigate("/requests");
                setIsMobileMenuOpen(false);
              }}
              className={`flex items-center justify-between text-sm font-medium transition-colors ${
                isActive("/requests")
                  ? "text-primary"
                  : "text-muted-foreground"
              }`}
            >
              <span>Requests</span>
              {pendingRequestsCount > 0 && (
                <Badge variant="destructive" className="ml-2">
                  {pendingRequestsCount}
                </Badge>
              )}
            </a>
            <Button
              variant="ghost"
              onClick={() => {
                handleLogout();
                setIsMobileMenuOpen(false);
              }}
              className="w-full justify-start p-0 h-auto text-sm font-medium text-muted-foreground"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;