
import { Deal, StatusColors } from "../types";
import { Card } from "./ui/card";
import { format } from "date-fns";
import { Clock } from "lucide-react";

interface DealCardProps {
  deal: Deal;
  onClick: (deal: Deal) => void;
}

const DealCard = ({ deal, onClick }: DealCardProps) => {
  const formatDate = (dateString: string | null) => {
    if (!dateString) return "";
    return format(new Date(dateString), "MMM d, yyyy");
  };

  return (
    <Card 
      className="deal-card cursor-pointer" 
      onClick={() => onClick(deal)}
    >
      <div className={`status-tag ${StatusColors[deal.status]} mb-2`}>
        {deal.status}
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
