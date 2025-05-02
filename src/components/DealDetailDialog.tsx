
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Deal, StatusColors, DealStatus, ALL_STATUSES } from "../types";
import { format } from "date-fns";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useIsMobile } from "../hooks/use-mobile";
import { Trash } from "lucide-react";

interface DealDetailDialogProps {
  deal: Deal;
  open: boolean;
  onClose: () => void;
  onStatusChange: (deal: Deal, newStatus: DealStatus) => void;
  onDelete: () => void;
}

const DealDetailDialog = ({ deal, open, onClose, onStatusChange, onDelete }: DealDetailDialogProps) => {
  const formatDate = (dateString: string | null) => {
    if (!dateString) return "Not set";
    return format(new Date(dateString), "MMMM d, yyyy");
  };

  const isMobile = useIsMobile();

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className={`${isMobile ? 'w-[95vw] max-w-[95vw] p-4' : 'sm:max-w-md'}`}>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <span className="mr-2">{deal.propertyName}</span>
            <span className={`status-tag ${StatusColors[deal.status]}`}>
              {deal.status}
            </span>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 my-4">
          <div>
            <h3 className="text-sm font-medium text-gray-500">Client</h3>
            <p className="text-base">{deal.clientName}</p>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-gray-500">Status</h3>
            <Select
              defaultValue={deal.status}
              onValueChange={(value) => onStatusChange(deal, value as DealStatus)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                {ALL_STATUSES.map(status => (
                  <SelectItem key={status} value={status}>
                    <div className="flex items-center">
                      <span className={`inline-block w-2 h-2 rounded-full ${StatusColors[status]} mr-2`}></span>
                      {status}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-gray-500">Status Updated</h3>
            <p className="text-base">{formatDate(deal.statusUpdatedDate)}</p>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-gray-500">Est. Closing Date</h3>
            <p className="text-base">{formatDate(deal.estimatedCloseDate)}</p>
          </div>
          
          {deal.reminder && (
            <div>
              <h3 className="text-sm font-medium text-gray-500">Reminder</h3>
              <div className="p-2 mt-1 bg-amber-50 text-amber-800 text-sm rounded-md">
                {deal.reminder}
              </div>
            </div>
          )}
          
          {deal.notes && (
            <div>
              <h3 className="text-sm font-medium text-gray-500">Notes</h3>
              <p className="text-base whitespace-pre-wrap">{deal.notes}</p>
            </div>
          )}
        </div>
        
        <DialogFooter className="flex justify-between items-center">
          <Button variant="destructive" onClick={() => {
            onDelete();
            onClose();
          }} className="flex items-center gap-1">
            <Trash className="h-4 w-4" />
            <span>Delete</span>
          </Button>
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DealDetailDialog;
