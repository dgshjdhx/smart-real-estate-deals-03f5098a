
import { useState } from "react";
import { Deal, DealStatus, ALL_STATUSES, StatusColors } from "../types";
import DealCard from "./DealCard";
import DealDetailDialog from "./DealDetailDialog";

interface KanbanBoardProps {
  deals: Deal[];
}

const KanbanBoard = ({ deals }: KanbanBoardProps) => {
  const [selectedDeal, setSelectedDeal] = useState<Deal | null>(null);
  
  // Group deals by status
  const dealsByStatus = ALL_STATUSES.reduce((acc, status) => {
    acc[status] = deals.filter(deal => deal.status === status);
    return acc;
  }, {} as Record<DealStatus, Deal[]>);
  
  const handleDealClick = (deal: Deal) => {
    setSelectedDeal(deal);
  };

  return (
    <div className="overflow-x-auto pb-4">
      <div className="flex min-w-max gap-4">
        {ALL_STATUSES.map(status => (
          <div key={status} className="w-80 flex-shrink-0">
            <div className="mb-3 font-medium flex items-center">
              <span className={`inline-block w-3 h-3 rounded-full ${StatusColors[status]} mr-2`}></span>
              {status} 
              <span className="ml-2 text-sm text-gray-500">
                ({dealsByStatus[status].length})
              </span>
            </div>
            
            <div className="bg-gray-50 p-2 rounded-lg min-h-[500px]">
              {dealsByStatus[status].map(deal => (
                <DealCard 
                  key={deal.id} 
                  deal={deal} 
                  onClick={handleDealClick} 
                />
              ))}
              
              {dealsByStatus[status].length === 0 && (
                <div className="h-20 flex items-center justify-center text-gray-400 text-sm border border-dashed border-gray-300 rounded-lg">
                  No deals in this status
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {selectedDeal && (
        <DealDetailDialog 
          deal={selectedDeal} 
          open={!!selectedDeal} 
          onClose={() => setSelectedDeal(null)}
        />
      )}
    </div>
  );
};

export default KanbanBoard;
