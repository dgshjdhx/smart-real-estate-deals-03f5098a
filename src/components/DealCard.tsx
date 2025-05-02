
import { Deal, StatusColors, DealStatus, ALL_STATUSES } from "../types";
import { Card } from "./ui/card";
import { format } from "date-fns";
import { Clock, ChevronDown, Trash } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useIsMobile } from "../hooks/use-mobile";
import { Button } from "./ui/button";

interface DealCardProps {
  deal: Deal;
  onClick: (deal: Deal) => void;
  onStatusChange?: (deal: Deal, newStatus: DealStatus) => void;
  onDelete: () => void;
}

const DealCard = ({ deal, onClick, onStatusChange, onDelete }: DealCardProps) => {
  const isMobile = useIsMobile();
  
  const formatDate = (dateString: string | null) => {
    if (!dateString) return "";
    return format(new Date(dateString), "MMM d, yyyy");
  };

  return (
    <Card 
      className="deal-card relative group" 
      onClick={() => onClick(deal)}
    >
      <div className="flex justify-between items-start mb-2">
        <div className={`status-tag ${StatusColors[deal.status]}`}>
          {deal.status}
        </div>
        
        <div className="flex items-center gap-1">
          {isMobile && onStatusChange && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                <button className="p-1 rounded-full hover:bg-gray-100">
                  <ChevronDown className="h-4 w-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {ALL_STATUSES.map((status) => (
                  <DropdownMenuItem 
                    key={status}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (status !== deal.status) {
                        onStatusChange(deal, status);
                      }
                    }}
                    className={`${deal.status === status ? 'font-bold' : ''}`}
                  >
                    <div className="flex items-center">
                      <span className={`inline-block w-2 h-2 rounded-full ${StatusColors[status]} mr-2`}></span>
                      {status}
                    </div>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          <button 
            className="opacity-0 group-hover:opacity-100 p-1 rounded-full hover:bg-red-50 text-red-500 transition-opacity"
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            aria-label="Delete deal"
          >
            <Trash className="h-4 w-4" />
          </button>
        </div>
      </div>
      
      <h3 className="font-medium mb-2">{deal.propertyName}</h3>
      
      <div className="text-sm text-gray-700 mb-2">
        Client: {deal.clientName}
      </div>
      
      {deal.estimatedCloseDate && (
        <div className="flex items-center text-xs text-gray-500 mb-1">
          <Clock className="h-3 w-3 mr-1" />
          <span>
            Est. Close: {formatDate(deal.estimatedCloseDate)}
          </span>
        </div>
      )}
      
      {deal.reminder && (
        <div className="mt-2 p-2 bg-amber-50 text-amber-800 text-xs rounded-md">
          Reminder: {deal.reminder}
        </div>
      )}
    </Card>
  );
};

export default DealCard;
