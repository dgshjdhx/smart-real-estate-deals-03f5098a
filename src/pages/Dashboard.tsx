
import { useState, useEffect } from "react";
import { mockDeals } from "../data/mockDeals";
import { Button } from "../components/ui/button";
import KanbanBoard from "../components/KanbanBoard";
import { Plus } from "lucide-react";

const Dashboard = () => {
  const [deals, setDeals] = useState(mockDeals);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);

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
          <KanbanBoard deals={deals} />
        )}
      </main>
    </div>
  );
};

export default Dashboard;
