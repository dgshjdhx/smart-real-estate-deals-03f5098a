
import { useState, useEffect } from "react";
import { Button } from "../components/ui/button";
import KanbanBoard from "../components/KanbanBoard";
import { Plus, Trash } from "lucide-react";
import { Deal, DealStatus, ALL_STATUSES } from "../types";
import { supabase } from "../integrations/supabase/client";
import { useToast } from "../components/ui/use-toast";
import NewDealDialog from "../components/NewDealDialog";

const Dashboard = () => {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDealDialogOpen, setIsDealDialogOpen] = useState(false);
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
    try {
      // Convert data to match database column names
      const dealData = {
        propertyname: newDeal.propertyName,
        clientname: newDeal.clientName,
        status: newDeal.status,
        estimatedclosedate: newDeal.estimatedCloseDate,
        reminder: newDeal.reminder,
        notes: newDeal.notes
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
        setDeals(prevDeals => [...prevDeals, formattedDeal]);

        toast({
          title: "Deal added",
          description: "New deal has been successfully created",
        });
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
      setDeals(prevDeals => prevDeals.filter(deal => deal.id !== dealId));

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
            <Button className="flex items-center gap-1" onClick={() => setIsDealDialogOpen(true)}>
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
