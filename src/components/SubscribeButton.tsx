
import React, { useState, useEffect, useRef } from "react";
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
  const paypalButtonRef = useRef<HTMLDivElement>(null);
  const [scriptLoaded, setScriptLoaded] = useState(false);

  // PayPal client ID
  const PAYPAL_CLIENT_ID = "AZsWtiYoBnGvXGvtfH7jvjdVqaDeN2LPa8SDA1PRdmvGxsB84qLgPLwnzeSvoLF06bULeXoPlI-a-eLW";

  // Plan IDs from PayPal dashboard
  const PLAN_IDS: Record<SubscriptionTier, string> = {
    'Free': '',
    'Pro': 'P-95S85872026293901NAPIKDQ', // The Pro plan ID you provided
    'Broker': '' // Removed as requested
  };

  useEffect(() => {
    // Only load PayPal script for the Pro tier
    if (tier === 'Pro' && paypalButtonRef.current && !scriptLoaded) {
      const script = document.createElement('script');
      script.src = `https://www.paypal.com/sdk/js?client-id=${PAYPAL_CLIENT_ID}&vault=true&intent=subscription`;
      script.setAttribute('data-sdk-integration-source', 'button-factory');
      script.async = true;
      
      script.onload = () => {
        setScriptLoaded(true);
        
        // @ts-ignore - PayPal is loaded as a global variable
        if (window.paypal) {
          // @ts-ignore
          window.paypal.Buttons({
            style: {
              shape: 'rect',
              color: 'blue',
              layout: 'vertical',
              label: 'subscribe'
            },
            createSubscription: function(data: any, actions: any) {
              return actions.subscription.create({
                plan_id: PLAN_IDS[tier]
              });
            },
            onApprove: function(data: any, actions: any) {
              toast({
                title: "Subscription Successful",
                description: `Your subscription (ID: ${data.subscriptionID}) has been activated.`,
              });
              
              // Here you'd typically update the user's subscription status in your database
            },
            onError: function(err: any) {
              toast({
                variant: "destructive",
                title: "Subscription Error",
                description: "There was a problem processing your subscription. Please try again.",
              });
              console.error("PayPal error:", err);
            }
          }).render(paypalButtonRef.current);
        }
      };
      
      document.body.appendChild(script);
      return () => {
        if (document.body.contains(script)) {
          document.body.removeChild(script);
        }
      };
    }
  }, [tier, scriptLoaded]);

  const handleSubscribe = async () => {
    if (tier === 'Free') {
      toast({
        title: "Free Account",
        description: "You are already using the free version.",
      });
      return;
    }

    // For Pro tier, the PayPal button will be displayed
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  if (tier === 'Pro') {
    return (
      <div className="w-full">
        <div ref={paypalButtonRef} className="w-full"></div>
        {!scriptLoaded && (
          <Button disabled className="w-full">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Loading payment options...
          </Button>
        )}
      </div>
    );
  }

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
          Processing...
        </>
      ) : tier === 'Free' ? (
        "Start Free"
      ) : (
        `Upgrade to ${tier}`
      )}
    </Button>
  );
};

export default SubscribeButton;
