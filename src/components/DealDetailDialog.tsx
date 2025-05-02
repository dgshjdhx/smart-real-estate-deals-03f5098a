
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Deal, StatusColors } from "../types";
import { format } from "date-fns";

interface DealDetailDialogProps {
  deal: Deal;
  open: boolean;
  onClose: () => void;
}

const DealDetailDialog = ({ deal, open, onClose }: DealDetailDialogProps) => {
  const formatDate = (dateString: string | null) => {
    if (!dateString) return "Not set";
    return format(new Date(dateString), "MMMM d, yyyy");
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
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
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DealDetailDialog;
