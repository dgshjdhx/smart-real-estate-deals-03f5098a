
import { useState, useEffect } from "react";
import { Button } from "../components/ui/button";
import KanbanBoard from "../components/KanbanBoard";
import { Plus } from "lucide-react";
import { Deal } from "../types";
import { supabase } from "../integrations/supabase/client";
import { useToast } from "../components/ui/use-toast";

const Dashboard = () => {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchDeals = async () => {
      try {
        const { data, error } = await supabase
          .from("deals")
          .select("*");
        
        if (error) {
          throw error;
        }
        
        // Transform the data to match the Deal interface
        if (data) {
          const formattedDeals: Deal[] = data.map(item => ({
            id: item.id,
            propertyName: item.propertyName,
            clientName: item.clientName,
            status: item.status as Deal['status'],
            statusUpdatedDate: item.statusUpdatedDate,
            estimatedCloseDate: item.estimatedCloseDate,
            reminder: item.reminder,
            notes: item.notes,
            createdAt: item.createdAt,
            user_id: item.user_id
          }));
          
          setDeals(formattedDeals);
        } else {
          setDeals([]);
        }
      } catch (error) {
        console.error("Error fetching deals:", error);
        toast({
          title: "Error fetching deals",
          description: "There was a problem loading your deals.",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchDeals();
  }, [toast]);

  const handleDealStatusChange = async (dealId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from("deals")
        .update({ 
          status: newStatus, 
          statusUpdatedDate: new Date().toISOString() 
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

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm py-4 px-4 border-b border-gray-200">
        <div className="container mx-auto">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">DealTracker</h1>
            <Button className="flex items-center gap-1">
              <Plus className="h-4 w-4" />
              <span>New Deal</span>
            </Button>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-4">My Deal Pipeline</h2>
          <p className="text-gray-600">
            Track and manage all your deals in one place
          </p>
        </div>
        
        {isLoading ? (
          <div className="flex items-center justify-center h-96">
            <div className="text-gray-500">Loading deals...</div>
          </div>
        ) : (
          <KanbanBoard deals={deals} onDealStatusChange={handleDealStatusChange} />
        )}
      </main>
    </div>
  );
};

export default Dashboard;
