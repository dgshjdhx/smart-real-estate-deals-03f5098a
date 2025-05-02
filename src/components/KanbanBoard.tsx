
import { useState } from "react";
import { Deal, DealStatus, ALL_STATUSES, StatusColors } from "../types";
import DealCard from "./DealCard";
import DealDetailDialog from "./DealDetailDialog";
import { useIsMobile } from "../hooks/use-mobile";

interface KanbanBoardProps {
  deals: Deal[];
  onDealStatusChange: (dealId: string, newStatus: string) => Promise<void>;
  onDeleteDeal: (dealId: string) => Promise<void>;
}

const KanbanBoard = ({ deals, onDealStatusChange, onDeleteDeal }: KanbanBoardProps) => {
  const [selectedDeal, setSelectedDeal] = useState<Deal | null>(null);
  const [draggingDeal, setDraggingDeal] = useState<Deal | null>(null);
  const isMobile = useIsMobile();
  
  // Group deals by status
  const dealsByStatus = ALL_STATUSES.reduce((acc, status) => {
    acc[status] = deals.filter(deal => deal.status === status);
    return acc;
  }, {} as Record<DealStatus, Deal[]>);
  
  const handleDealClick = (deal: Deal) => {
    setSelectedDeal(deal);
  };

  const handleDragStart = (deal: Deal) => {
    setDraggingDeal(deal);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, status: DealStatus) => {
    e.preventDefault();
    if (draggingDeal && draggingDeal.status !== status) {
      onDealStatusChange(draggingDeal.id, status);
    }
    setDraggingDeal(null);
  };

  const handleStatusChange = (deal: Deal, newStatus: DealStatus) => {
    onDealStatusChange(deal.id, newStatus);
  };

  const handleDeleteDeal = (dealId: string) => {
    onDeleteDeal(dealId);
    if (selectedDeal && selectedDeal.id === dealId) {
      setSelectedDeal(null);
    }
  };

  return (
    <div className="overflow-x-auto pb-4">
      <div className={`flex ${isMobile ? 'flex-col' : 'min-w-max'} gap-4`}>
        {ALL_STATUSES.map(status => (
          <div 
            key={status} 
            className={`${isMobile ? 'w-full mb-6' : 'w-80 flex-shrink-0'}`}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, status)}
          >
            <div className="mb-3 font-medium flex items-center">
              <span className={`inline-block w-3 h-3 rounded-full ${StatusColors[status]} mr-2`}></span>
              {status} 
              <span className="ml-2 text-sm text-gray-500">
                ({dealsByStatus[status].length})
              </span>
            </div>
            
            <div className="bg-gray-50 p-2 rounded-lg min-h-[200px]">
              {dealsByStatus[status].map(deal => (
                <div
                  key={deal.id}
                  draggable={!isMobile}
                  onDragStart={() => handleDragStart(deal)}
                  className={`${!isMobile ? 'cursor-grab active:cursor-grabbing' : ''}`}
                >
                  <DealCard 
                    deal={deal} 
                    onClick={handleDealClick}
                    onStatusChange={isMobile ? handleStatusChange : undefined}
                    onDelete={() => handleDeleteDeal(deal.id)}
                  />
                </div>
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
          onStatusChange={handleStatusChange}
          onDelete={() => handleDeleteDeal(selectedDeal.id)}
        />
      )}
    </div>
  );
};

export default KanbanBoard;
