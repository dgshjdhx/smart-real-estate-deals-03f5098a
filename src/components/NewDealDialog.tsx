import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Deal, ALL_STATUSES } from "../types";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { cn } from "../lib/utils";

interface NewDealDialogProps {
  open: boolean;
  onClose: () => void;
  onAddDeal: (deal: Omit<Deal, 'id' | 'statusUpdatedDate' | 'createdAt'>) => void;
}

const NewDealDialog = ({ open, onClose, onAddDeal }: NewDealDialogProps) => {
  const [propertyName, setPropertyName] = useState("");
  const [clientName, setClientName] = useState("");
  const [status, setStatus] = useState<Deal['status']>("Lead");
  const [estimatedCloseDate, setEstimatedCloseDate] = useState<Date | null>(null);
  const [reminder, setReminder] = useState<string | null>(null);
  const [notes, setNotes] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const newDeal: Omit<Deal, 'id' | 'statusUpdatedDate' | 'createdAt'> = {
      propertyName,
      clientName,
      status,
      estimatedCloseDate: estimatedCloseDate ? estimatedCloseDate.toISOString() : null,
      reminder,
      notes
    };
    
    await onAddDeal(newDeal);
    
    // Reset form
    setPropertyName("");
    setClientName("");
    setStatus("Lead");
    setEstimatedCloseDate(null);
    setReminder(null);
    setNotes(null);
    setIsSubmitting(false);
    
    onClose();
  };

  const handleClose = () => {
    // Reset form
    setPropertyName("");
    setClientName("");
    setStatus("Lead");
    setEstimatedCloseDate(null);
    setReminder(null);
    setNotes(null);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add New Deal</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-2">
              <Label htmlFor="propertyName">Property Name</Label>
              <Input
                id="propertyName"
                placeholder="123 Main St"
                value={propertyName}
                onChange={(e) => setPropertyName(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="clientName">Client Name</Label>
              <Input
                id="clientName"
                placeholder="John Smith"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select 
                value={status} 
                onValueChange={(value) => setStatus(value as Deal['status'])}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a status" />
                </SelectTrigger>
                <SelectContent>
                  {ALL_STATUSES.map((statusOption) => (
                    <SelectItem key={statusOption} value={statusOption}>
                      {statusOption}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label>Estimated Close Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !estimatedCloseDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {estimatedCloseDate ? format(estimatedCloseDate, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={estimatedCloseDate || undefined}
                    onSelect={setEstimatedCloseDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="reminder">Reminder (Optional)</Label>
              <Input
                id="reminder"
                placeholder="Follow up with client next week"
                value={reminder || ""}
                onChange={(e) => setReminder(e.target.value || null)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="notes">Notes (Optional)</Label>
              <Textarea
                id="notes"
                placeholder="Additional details about this deal"
                value={notes || ""}
                onChange={(e) => setNotes(e.target.value || null)}
                className="min-h-[100px]"
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Adding..." : "Add Deal"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NewDealDialog;
