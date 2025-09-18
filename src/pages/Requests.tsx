import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle, XCircle, Clock, Send, Users, MessageSquare } from "lucide-react";
import Navigation from "@/components/Navigation";

interface Request {
  id: string;
  skill: string;
  status: string;
  created_at: string;
  requester_name: string;
  requester_hostel: string;
  requester_year: number;
  requester_email: string;
  request_type: string;
}

const Requests = () => {
  const [requests, setRequests] = useState<Request[]>([]);
  const [loading, setLoading] = useState(true);
  const [processingRequests, setProcessingRequests] = useState<Set<string>>(new Set());
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    checkAuthAndLoadRequests();
    markRequestsAsSeen();
  }, [navigate]);

  const markRequestsAsSeen = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      await supabase
        .from('match_requests')
        .update({ seen_at: new Date().toISOString() })
        .eq('teacher_id', session.user.id)
        .is('seen_at', null);
    } catch (error) {
      console.error('Error marking requests as seen:', error);
    }
  };

  const checkAuthAndLoadRequests = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/auth");
        return;
      }

      await loadRequests(session.user.id);
    } catch (error) {
      console.error("Error loading requests:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadRequests = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .rpc('get_user_requests', { user_id_param: userId });

      if (error) {
        console.error("Error fetching requests:", error);
        return;
      }

      setRequests(data || []);
    } catch (error) {
      console.error("Error processing requests:", error);
    }
  };

  const updateRequestStatus = async (requestId: string, status: 'accepted' | 'rejected') => {
    try {
      setProcessingRequests(prev => new Set(prev).add(requestId));

      const { error } = await supabase
        .from("match_requests")
        .update({ status })
        .eq("id", requestId);

      if (error) throw error;

      toast({
        title: status === 'accepted' ? "Request accepted!" : "Request rejected",
        description: `You have ${status} the learning request.`,
      });

      // Reload requests
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        await loadRequests(session.user.id);
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setProcessingRequests(prev => {
        const newSet = new Set(prev);
        newSet.delete(requestId);
        return newSet;
      });
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="text-yellow-600 border-yellow-600"><Clock className="w-3 h-3 mr-1" />Pending</Badge>;
      case 'accepted':
        return <Badge variant="default" className="bg-green-100 text-green-800 border-green-200"><CheckCircle className="w-3 h-3 mr-1" />Accepted</Badge>;
      case 'rejected':
        return <Badge variant="secondary" className="bg-red-100 text-red-800 border-red-200"><XCircle className="w-3 h-3 mr-1" />Rejected</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const incomingRequests = requests.filter(r => r.request_type === 'incoming');
  const outgoingRequests = requests.filter(r => r.request_type === 'outgoing');

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading requests...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto px-4 py-6 md:py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Learning Requests</h1>
          <p className="text-muted-foreground">
            Manage your incoming and outgoing learning requests
          </p>
        </div>

        <Tabs defaultValue="incoming" className="space-y-4 md:space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="incoming" className="flex items-center gap-1 md:gap-2 text-xs md:text-sm">
              <Users className="w-3 h-3 md:w-4 md:h-4" />
              <span className="hidden sm:inline">Incoming</span> ({incomingRequests.length})
            </TabsTrigger>
            <TabsTrigger value="outgoing" className="flex items-center gap-1 md:gap-2 text-xs md:text-sm">
              <Send className="w-3 h-3 md:w-4 md:h-4" />
              <span className="hidden sm:inline">Outgoing</span> ({outgoingRequests.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="incoming">
            {incomingRequests.length === 0 ? (
              <Card>
                <CardContent className="text-center py-12">
                  <MessageSquare className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-xl font-semibold mb-2">No incoming requests</h3>
                  <p className="text-muted-foreground mb-4">
                    When people want to learn from you, their requests will appear here
                  </p>
                  <Button onClick={() => navigate("/dashboard")}>
                    Add Skills to Teach
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {incomingRequests.map((request) => (
                  <Card key={request.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-lg">{request.requester_name}</CardTitle>
                          <CardDescription>
                            {request.requester_hostel} • Year {request.requester_year}
                          </CardDescription>
                        </div>
                        {getStatusBadge(request.status)}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold text-sm mb-1">Wants to learn:</h4>
                          <Badge variant="default">{request.skill}</Badge>
                        </div>
                        
                        <div className="text-sm text-muted-foreground">
                          Requested on {new Date(request.created_at).toLocaleDateString()}
                        </div>

                        {request.status === 'pending' && (
                          <div className="flex flex-col sm:flex-row gap-2 pt-2">
                            <Button
                              size="sm"
                              onClick={() => updateRequestStatus(request.id, 'accepted')}
                              disabled={processingRequests.has(request.id)}
                              className="flex-1"
                            >
                              <CheckCircle className="w-4 h-4 mr-1" />
                              {processingRequests.has(request.id) ? "Processing..." : "Accept"}
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => updateRequestStatus(request.id, 'rejected')}
                              disabled={processingRequests.has(request.id)}
                              className="flex-1"
                            >
                              <XCircle className="w-4 h-4 mr-1" />
                              {processingRequests.has(request.id) ? "Processing..." : "Reject"}
                            </Button>
                          </div>
                        )}

                        {request.status === 'accepted' && (
                          <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                            <p className="text-sm text-green-800">
                              <strong>Contact:</strong> {request.requester_email}
                            </p>
                            <p className="text-xs text-green-600 mt-1">
                              You can now connect with this learner to arrange your teaching session.
                            </p>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="outgoing">
            {outgoingRequests.length === 0 ? (
              <Card>
                <CardContent className="text-center py-12">
                  <Send className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-xl font-semibold mb-2">No outgoing requests</h3>
                  <p className="text-muted-foreground mb-4">
                    Find learning partners and send requests to start learning new skills
                  </p>
                  <Button onClick={() => navigate("/matches")}>
                    Find Learning Partners
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {outgoingRequests.map((request) => (
                  <Card key={request.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-lg">{request.requester_name}</CardTitle>
                          <CardDescription>
                            {request.requester_hostel} • Year {request.requester_year}
                          </CardDescription>
                        </div>
                        {getStatusBadge(request.status)}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold text-sm mb-1">You want to learn:</h4>
                          <Badge variant="outline">{request.skill}</Badge>
                        </div>
                        
                        <div className="text-sm text-muted-foreground">
                          Requested on {new Date(request.created_at).toLocaleDateString()}
                        </div>

                        {request.status === 'accepted' && (
                          <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                            <p className="text-sm text-green-800">
                              <strong>Teacher contact:</strong> {request.requester_email}
                            </p>
                            <p className="text-xs text-green-600 mt-1">
                              Your request was accepted! You can now connect with your teacher to arrange learning sessions.
                            </p>
                          </div>
                        )}

                        {request.status === 'pending' && (
                          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                            <p className="text-sm text-blue-800">
                              Your request is pending. The teacher will respond soon.
                            </p>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Requests;