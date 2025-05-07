
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { SubscriptionTier } from "@/types";

interface SubscribeButtonProps {
  tier: SubscriptionTier;
  price: number;
}

const SubscribeButton: React.FC<SubscribeButtonProps> = ({ tier, price }) => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  // PayPal client ID (public) - replace with your actual client ID from PayPal Developer Dashboard
  const PAYPAL_CLIENT_ID = "YOUR_PAYPAL_CLIENT_ID"; // Replace with your PayPal Client ID

  // Plan IDs should be obtained from your PayPal Dashboard after creating subscription plans
  const PLAN_IDS: Record<SubscriptionTier, string> = {
    'Free': '',
    'Pro': 'P-1AB23456CD789012EXYZABCD', // Example - replace with actual plan ID
    'Broker': 'P-2AB23456CD789012EXYZEFGH' // Example - replace with actual plan ID
  };
  
  const handleSubscribe = async () => {
    if (tier === 'Free') {
      // No subscription needed for free plan
      toast({
        title: "חשבון חינמי",
        description: "אתה כבר משתמש בגרסה החינמית.",
      });
      return;
    }

    setLoading(true);
    try {
      // In a production environment:
      // 1. Your server should handle the secure parts of the PayPal API calls using the secret key
      // 2. The client should only use the client ID for frontend SDK initialization
      
      toast({
        title: "מעבר ל-PayPal",
        description: "מעבירים אותך לעמוד התשלום של PayPal"
      });
      
      // For demonstration purposes - in production, integrate with PayPal JS SDK:
      // https://developer.paypal.com/sdk/js/reference/
      setTimeout(() => {
        const planId = PLAN_IDS[tier];
        // In production, you would use the PayPal JS SDK to create a subscription
        // For example:
        // window.paypal.Subscription.create({ plan_id: planId })
        
        // Mock implementation for demonstration
        window.open(
          `https://www.sandbox.paypal.com/webapps/billing/subscriptions?plan_id=${planId}`,
          "_blank"
        );
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error("שגיאה בתהליך הרישום למנוי:", error);
      toast({
        variant: "destructive",
        title: "שגיאה בהרשמה",
        description: "לא ניתן היה להתחבר לשירותי התשלום. נסה שוב מאוחר יותר.",
      });
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={handleSubscribe}
      disabled={loading || tier === 'Free'}
      variant={tier === 'Free' ? "outline" : "default"}
      className="w-full"
    >
      {loading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          מעבר לתשלום...
        </>
      ) : tier === 'Free' ? (
        "התחל בחינם"
      ) : (
        `שדרג ל-${tier}`
      )}
    </Button>
  );
};

export default SubscribeButton;
