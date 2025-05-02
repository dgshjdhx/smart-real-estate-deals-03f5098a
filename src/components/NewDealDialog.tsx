
import { useState } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter,
  DialogDescription
} from "./ui/dialog";
import { Button } from "./ui/button";
import { DealStatus, ALL_STATUSES, StatusColors } from "../types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "./ui/calendar";
import { format } from "date-fns";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./ui/popover";
import { cn } from "../lib/utils";

interface NewDealDialogProps {
  open: boolean;
  onClose: () => void;
  onAddDeal: (deal: {
    propertyName: string;
    clientName: string;
    status: DealStatus;
    estimatedCloseDate: string | null;
    reminder: string | null;
    notes: string | null;
  }) => Promise<void>;
}

const NewDealDialog = ({ open, onClose, onAddDeal }: NewDealDialogProps) => {
  const [propertyName, setPropertyName] = useState("");
  const [clientName, setClientName] = useState("");
  const [status, setStatus] = useState<DealStatus>("Lead");
  const [estimatedCloseDate, setEstimatedCloseDate] = useState<Date | null>(null);
  const [reminder, setReminder] = useState("");
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await onAddDeal({
        propertyName,
        clientName,
        status,
        estimatedCloseDate: estimatedCloseDate ? estimatedCloseDate.toISOString() : null,
        reminder: reminder || null,
        notes: notes || null
      });
      
      resetForm();
      onClose();
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setPropertyName("");
    setClientName("");
    setStatus("Lead");
    setEstimatedCloseDate(null);
    setReminder("");
    setNotes("");
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add New Deal</DialogTitle>
            <DialogDescription>
              Create a new deal to track in your pipeline
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 my-4">
            <div className="grid gap-2">
              <Label htmlFor="propertyName">Property Name*</Label>
              <Input 
                id="propertyName" 
                value={propertyName} 
                onChange={(e) => setPropertyName(e.target.value)}
                placeholder="123 Main Street"
                required
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="clientName">Client Name*</Label>
              <Input 
                id="clientName" 
                value={clientName} 
                onChange={(e) => setClientName(e.target.value)}
                placeholder="John Doe"
                required
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="status">Status*</Label>
              <Select
                value={status}
                onValueChange={(value) => setStatus(value as DealStatus)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  {ALL_STATUSES.map((statusOption) => (
                    <SelectItem key={statusOption} value={statusOption}>
                      <div className="flex items-center">
                        <span className={`inline-block w-2 h-2 rounded-full ${StatusColors[statusOption]} mr-2`}></span>
                        {statusOption}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="estimatedCloseDate">Estimated Close Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !estimatedCloseDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {estimatedCloseDate ? format(estimatedCloseDate, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={estimatedCloseDate}
                    onSelect={setEstimatedCloseDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="reminder">Reminder</Label>
              <Input 
                id="reminder" 
                value={reminder} 
                onChange={(e) => setReminder(e.target.value)}
                placeholder="Follow up on inspection results"
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea 
                id="notes" 
                value={notes} 
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Additional details about this deal"
                rows={3}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting || !propertyName || !clientName}>
              {isSubmitting ? "Adding..." : "Add Deal"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NewDealDialog;
