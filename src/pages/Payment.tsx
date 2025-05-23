
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Button } from "../components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { SubscriptionTier } from "@/types";
import SubscribeButton from "@/components/SubscribeButton";
import { supabase } from "@/integrations/supabase/client";

const Payment = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const location = useLocation();
  const [selectedTier, setSelectedTier] = useState<SubscriptionTier>('Free');
  const [price, setPrice] = useState(0);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Check authentication and parse state passed from pricing page
  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setIsAuthenticated(!!session);
      setIsLoading(false);

      if (!session && location.state?.tier !== 'Free') {
        toast({
          title: "Authentication Required",
          description: "Please log in or sign up before subscribing to a plan.",
        });
        navigate('/login', { 
          state: { 
            from: { pathname: '/payment' }, 
            tier: location.state?.tier,
            price: location.state?.price 
          } 
        });
        return;
      }

      if (location.state && location.state.tier) {
        setSelectedTier(location.state.tier as SubscriptionTier);
        setPrice(location.state.price || 0);
      } else {
        // If no tier was selected, redirect back to pricing
        navigate('/pricing');
      }
    };
    
    checkAuth();
  }, [location.state, navigate, toast]);

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-10">
              <h1 className="text-3xl font-bold mb-4">Complete Your Subscription</h1>
              <p className="text-gray-600">You're subscribing to the {selectedTier} plan</p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100">
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Plan Details</h2>
                <div className="border-t border-b py-4 mb-4">
                  <div className="flex justify-between mb-2">
                    <span>Plan:</span>
                    <span className="font-medium">{selectedTier}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span>Price:</span>
                    <span className="font-medium">${price}{price > 0 ? '/month' : ''}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Deal Limit:</span>
                    <span className="font-medium">
                      {selectedTier === 'Free' ? '3 deals' : 'Unlimited deals'}
                    </span>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h3 className="font-medium mb-2">What's included:</h3>
                  <ul className="text-sm space-y-1 text-gray-600">
                    <li>• Deal pipeline tracking</li>
                    <li>• Reminders</li>
                    <li>• Mobile optimized</li>
                    {selectedTier !== "Free" && <li>• Closed deals archive</li>}
                    {selectedTier === "Pro" && (
                      <>
                        <li>• Advanced analytics</li>
                      </>
                    )}
                  </ul>
                </div>
              </div>
              
              <div className="space-y-4">
                <p className="text-sm text-gray-500 mb-4">
                  {selectedTier === 'Free' 
                    ? "No payment is required for the free plan. You'll have access to basic features with a limit of 3 deals."
                    : "Complete your subscription with PayPal below. You can cancel anytime."}
                </p>
                <SubscribeButton tier={selectedTier} price={price} />
              </div>
            </div>
            
            <div className="mt-6 text-center">
              <Button 
                variant="ghost" 
                onClick={() => navigate('/pricing')}
                className="text-gray-500"
              >
                Back to Pricing
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Payment;
