
import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { SubscriptionTier } from "@/types";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

interface SubscribeButtonProps {
  tier: SubscriptionTier;
  price: number;
}

const SubscribeButton: React.FC<SubscribeButtonProps> = ({ tier, price }) => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const paypalButtonRef = useRef<HTMLDivElement>(null);
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const navigate = useNavigate();

  // Check authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // PayPal client ID - Updated to use production client ID
  const PAYPAL_CLIENT_ID = "AchaWPn6PQRnEUuG_F3LuBAs_YI8L3Ij39P1DZrFmhQxvvzxUEDmf46m9MB2-UvaGCB_5ZED94wI6jRm";

  // Plan IDs from PayPal dashboard
  const PLAN_IDS: Record<SubscriptionTier, string> = {
    'Free': '',
    'Pro': 'P-95S85872026293901NAPIKDQ',
    'Broker': ''
  };

  useEffect(() => {
    // Check authentication state
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setIsAuthenticated(!!session);
    };
    
    checkAuth();
  }, []);

  useEffect(() => {
    // Load PayPal script for Pro tier and when user is authenticated
    if (tier === 'Pro' && isAuthenticated && paypalButtonRef.current && !scriptLoaded) {
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
            onApprove: async function(data: any, actions: any) {
              // Update subscription in database
              try {
                const { data: { session } } = await supabase.auth.getSession();
                if (!session) {
                  throw new Error('No active session');
                }

                // Update the subscription in Supabase
                const { error } = await supabase
                  .from('user_usage')
                  .update({ 
                    is_premium: true,
                    updated_at: new Date().toISOString()
                  })
                  .eq('user_id', session.user.id);
                    
                if (error) {
                  throw error;
                }
                // Update localStorage immediately so UI updates
                localStorage.setItem('subscriptionTier', 'Pro');
                toast({
                  title: "Subscription Successful",
                  description: `Your ${tier} subscription (ID: ${data.subscriptionID}) has been activated.`,
                });
                // Redirect to dashboard (React navigation and hard reload fallback)
                navigate('/dashboard');
                setTimeout(() => {
                  window.location.href = '/dashboard';
                }, 500);
              } catch (err) {
                console.error("Error processing subscription:", err);
                toast({
                  variant: "destructive",
                  title: "Subscription Error",
                  description: "There was a problem activating your subscription. Please try again.",
                });
              }
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
  }, [tier, scriptLoaded, isAuthenticated, navigate, toast]);

  const handleSubscribe = () => {
    if (!isAuthenticated) {
      // Redirect to login page with return destination
      toast({
        title: "Authentication Required",
        description: "Please log in or sign up before subscribing to a plan.",
      });
      // Save the intended subscription tier and redirect path for after login
      localStorage.setItem('pendingSubscription', tier);
      navigate('/login', { state: { from: { pathname: '/payment' }, tier, price } });
      return;
    }
    
    if (tier === 'Free') {
      // Activate free plan
      localStorage.setItem('subscriptionTier', 'Free');
      toast({
        title: "Free Plan Activated",
        description: "You are now using the free version with a limit of 3 deals.",
      });
      navigate('/dashboard');
      return;
    }

    // For Pro tier, if authenticated, show PayPal button
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  if (tier === 'Pro' && isAuthenticated) {
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
