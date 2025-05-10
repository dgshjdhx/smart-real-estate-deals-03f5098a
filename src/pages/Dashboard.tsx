import { useState, useEffect } from "react";
import { Button } from "../components/ui/button";
import KanbanBoard from "../components/KanbanBoard";
import { Plus, Info } from "lucide-react";
import { Deal, DealStatus, ALL_STATUSES, MAX_DEALS } from "../types";
import { supabase } from "../integrations/supabase/client";
import { useToast } from "../hooks/use-toast";
import NewDealDialog from "../components/NewDealDialog";
import { Link } from "react-router-dom";
import { Alert, AlertDescription } from "../components/ui/alert";

const Dashboard = () => {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDealDialogOpen, setIsDealDialogOpen] = useState(false);
  const [currentTier, setCurrentTier] = useState<'Free' | 'Pro'>('Free');
  const [dealsRemaining, setDealsRemaining] = useState(0);
  const { toast } = useToast();

  useEffect(() => {
    const fetchDealsAndSubscription = async () => {
      try {
        // Get current user session
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
          setIsLoading(false);
          return;
        }
        
        const userId = session.user.id;
        
        // Fetch deals for the current user only
        const { data: dealsData, error: dealsError } = await supabase
          .from("deals")
          .select("*")
          .eq("user_id", userId);
          
        if (dealsError) throw dealsError;
        let formattedDeals: Deal[] = [];
        if (dealsData) {
          formattedDeals = dealsData.map(item => ({
            id: item.id,
            propertyName: item.propertyname,
            clientName: item.clientname,
            status: item.status as Deal['status'],
            statusUpdatedDate: item.statusupdateddate,
            estimatedCloseDate: item.estimatedclosedate,
            reminder: item.reminder,
            notes: item.notes,
            createdAt: item.createdat,
            user_id: item.user_id
          }));
          setDeals(formattedDeals);
          localStorage.setItem('userDeals', JSON.stringify(formattedDeals));
        } else {
          setDeals([]);
          localStorage.setItem('userDeals', JSON.stringify([]));
        }

        // Fetch subscription status from Supabase
        let tier: 'Free' | 'Pro' = 'Free';
        if (session) {
          const { data: usageData, error: usageError } = await supabase
            .from('user_usage')
            .select('is_premium')
            .eq('user_id', session.user.id)
            .single();
          if (!usageError && usageData && usageData.is_premium) {
            tier = 'Pro';
          }
        }
        setCurrentTier(tier);
        localStorage.setItem('subscriptionTier', tier);

        // Calculate remaining deals
        const maxDeals = MAX_DEALS[tier];
        const remaining = maxDeals === Infinity ? Infinity : Math.max(0, maxDeals - formattedDeals.length);
        setDealsRemaining(remaining);

        // Warning if close to limit
        if (tier === 'Free' && remaining === 1) {
          toast({
            title: "Deal Limit Warning",
            description: "You have only 1 deal remaining in your free plan. Consider upgrading for more deals.",
            variant: "default"
          });
        }
      } catch (error) {
        console.error("Error fetching deals or subscription:", error);
        toast({
          title: "Error fetching data",
          description: "There was a problem loading your deals or subscription status.",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };
    fetchDealsAndSubscription();
  }, [toast]);

  const handleDealStatusChange = async (dealId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from("deals")
        .update({ 
          status: newStatus, 
          statusupdateddate: new Date().toISOString() 
        })
        .eq("id", dealId);

      if (error) throw error;

      // Update local state
      setDeals(prevDeals => prevDeals.map(deal => 
        deal.id === dealId ? { ...deal, status: newStatus as any, statusUpdatedDate: new Date().toISOString() } : deal
      ));

      toast({
        title: "Status updated",
        description: `Deal status updated to ${newStatus}`,
      });
    } catch (error) {
      console.error("Error updating deal:", error);
      toast({
        title: "Error updating status",
        description: "There was a problem updating the deal status.",
        variant: "destructive"
      });
    }
  };

  const handleAddDeal = async (newDeal: Omit<Deal, 'id' | 'statusUpdatedDate' | 'createdAt'>) => {
    // Check if we've reached the deal limit
    if (currentTier === 'Free' && deals.length >= MAX_DEALS[currentTier]) {
      toast({
        title: "Deal Limit Reached",
        description: `You've reached the maximum of ${MAX_DEALS[currentTier]} deals for your ${currentTier} plan. Please upgrade to add more deals.`,
        variant: "destructive"
      });
      return;
    }
    
    try {
      // Get current user session
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        toast({
          title: "Authentication required",
          description: "You must be signed in to add deals.",
          variant: "destructive"
        });
        return;
      }
      
      // Convert data to match database column names
      const dealData = {
        propertyname: newDeal.propertyName,
        clientname: newDeal.clientName,
        status: newDeal.status,
        estimatedclosedate: newDeal.estimatedCloseDate,
        reminder: newDeal.reminder,
        notes: newDeal.notes,
        user_id: session.user.id // Always set the user_id to the current user
      };
      
      const { data, error } = await supabase
        .from("deals")
        .insert(dealData)
        .select();

      if (error) throw error;

      if (data && data.length > 0) {
        // Transform the returned data to match the Deal interface
        const formattedDeal: Deal = {
          id: data[0].id,
          propertyName: data[0].propertyname,
          clientName: data[0].clientname,
          status: data[0].status as DealStatus,
          statusUpdatedDate: data[0].statusupdateddate,
          estimatedCloseDate: data[0].estimatedclosedate,
          reminder: data[0].reminder,
          notes: data[0].notes,
          createdAt: data[0].createdat,
          user_id: data[0].user_id
        };

        // Add the new deal to state
        const updatedDeals = [...deals, formattedDeal];
        setDeals(updatedDeals);
        
        // Update localStorage
        localStorage.setItem('userDeals', JSON.stringify(updatedDeals));
        
        // Update deals remaining
        const remaining = MAX_DEALS[currentTier] === Infinity ? Infinity : Math.max(0, MAX_DEALS[currentTier] - updatedDeals.length);
        setDealsRemaining(remaining);

        toast({
          title: "Deal added",
          description: "New deal has been successfully created",
        });
        
        // Show warning if we're close to the limit
        if (currentTier === 'Free' && remaining === 1) {
          toast({
            title: "Deal Limit Warning",
            description: "You have only 1 deal remaining in your free plan. Consider upgrading for more deals.",
            variant: "default"
          });
        } else if (currentTier === 'Free' && remaining === 0) {
          toast({
            title: "Deal Limit Reached",
            description: `You've reached the maximum of ${MAX_DEALS[currentTier]} deals for your ${currentTier} plan.`,
            variant: "destructive"
          });
        }
      }
    } catch (error) {
      console.error("Error adding deal:", error);
      toast({
        title: "Error adding deal",
        description: "There was a problem creating the new deal.",
        variant: "destructive"
      });
    }
  };

  const handleDeleteDeal = async (dealId: string) => {
    try {
      const { error } = await supabase
        .from("deals")
        .delete()
        .eq("id", dealId);

      if (error) throw error;

      // Remove the deal from state
      const updatedDeals = deals.filter(deal => deal.id !== dealId);
      setDeals(updatedDeals);
      
      // Update localStorage
      localStorage.setItem('userDeals', JSON.stringify(updatedDeals));
      
      // Update deals remaining
      const remaining = MAX_DEALS[currentTier] === Infinity ? Infinity : Math.max(0, MAX_DEALS[currentTier] - updatedDeals.length);
      setDealsRemaining(remaining);

      toast({
        title: "Deal deleted",
        description: "The deal has been successfully deleted",
      });
    } catch (error) {
      console.error("Error deleting deal:", error);
      toast({
        title: "Error deleting deal",
        description: "There was a problem deleting the deal.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm py-4 px-4 border-b border-gray-200">
        <div className="container mx-auto">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">DealTracker</h1>
            <div className="flex items-center gap-3">
              {currentTier === 'Free' && (
                <Link to="/pricing" className="text-sm text-primary">
                  Upgrade to Pro
                </Link>
              )}
              <Button 
                className="flex items-center gap-1" 
                onClick={() => setIsDealDialogOpen(true)}
                disabled={currentTier === 'Free' && deals.length >= MAX_DEALS[currentTier]}
              >
                <Plus className="h-4 w-4" />
                <span>New Deal</span>
              </Button>
            </div>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <div>
              <h2 className="text-3xl font-bold">My Deal Pipeline</h2>
              <p className="text-gray-600">
                Track and manage all your deals in one place
              </p>
            </div>
            
            <div className="flex items-center gap-1 text-sm bg-gray-100 px-3 py-1 rounded-md">
              <Info className="h-4 w-4 text-gray-500" />
              <span>
                {currentTier === 'Free' 
                  ? `${dealsRemaining} of ${MAX_DEALS.Free} deals remaining` 
                  : `Unlimited deals available`}
              </span>
            </div>
          </div>
        </div>
        
        {currentTier === 'Free' && dealsRemaining === 0 && (
          <Alert className="mb-6 bg-amber-50 text-amber-800 border-amber-200">
            <AlertDescription>
              You've reached the maximum number of deals for your Free plan. 
              <Link to="/pricing" className="font-medium ml-1 underline">
                Upgrade to Pro
              </Link> to add more deals.
            </AlertDescription>
          </Alert>
        )}
        
        {isLoading ? (
          <div className="flex items-center justify-center h-96">
            <div className="text-gray-500">Loading deals...</div>
          </div>
        ) : (
          <KanbanBoard 
            deals={deals} 
            onDealStatusChange={handleDealStatusChange}
            onDeleteDeal={handleDeleteDeal}
          />
        )}

        <NewDealDialog 
          open={isDealDialogOpen} 
          onClose={() => setIsDealDialogOpen(false)}
          onAddDeal={handleAddDeal}
        />
      </main>
    </div>
  );
};

export default Dashboard;
