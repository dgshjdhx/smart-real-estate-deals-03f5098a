
import { Button } from "./ui/button";
import { SubscriptionTier, SUBSCRIPTION_PRICES, MAX_DEALS } from "../types";
import { Check } from "lucide-react";

interface PlanProps {
  tier: SubscriptionTier;
  isPopular?: boolean;
}

const PricingPlans = () => {
  return (
    <div className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-2">Simple, Transparent Pricing</h2>
          <p className="text-gray-600">Choose the plan that fits your business needs</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <PricingCard tier="Free" />
          <PricingCard tier="Pro" isPopular />
          <PricingCard tier="Broker" />
        </div>
      </div>
    </div>
  );
};

const PricingCard = ({ tier, isPopular = false }: PlanProps) => {
  const maxDeals = MAX_DEALS[tier];
  const price = SUBSCRIPTION_PRICES[tier];
  
  return (
    <div className={`relative rounded-xl shadow-md p-6 border ${
      isPopular ? 'border-primary' : 'border-gray-200'
    } flex flex-col justify-between bg-white animate-fade-in`}>
      {isPopular && (
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-primary text-white px-4 py-1 rounded-full text-xs font-medium">
          Most Popular
        </div>
      )}
      
      <div>
        <h3 className="text-xl font-bold mb-2">{tier}</h3>
        <div className="flex items-baseline mb-4">
          <span className="text-3xl font-bold">${price}</span>
          {price > 0 && <span className="text-gray-500 ml-1">/month</span>}
        </div>
        
        <div className="mb-6">
          <p className="text-gray-600 mb-4">
            {maxDeals === Infinity ? 'Unlimited' : `Up to ${maxDeals}`} open deals
          </p>
          
          <ul className="space-y-2">
            <Feature included>Deal pipeline tracking</Feature>
            <Feature included>Reminders</Feature>
            <Feature included>Mobile friendly</Feature>
            {tier !== "Free" && <Feature included>Archive for closed deals</Feature>}
            {tier === "Broker" && (
              <>
                <Feature included>Priority support</Feature>
                <Feature included>Advanced analytics</Feature>
              </>
            )}
          </ul>
        </div>
      </div>
      
      <Button 
        variant={tier === "Free" ? "outline" : "default"} 
        className="w-full"
        disabled={tier === "Free"}
      >
        {tier === "Free" ? "Start Free" : `Upgrade to ${tier}`}
      </Button>
    </div>
  );
};

const Feature = ({ children, included }: { children: React.ReactNode; included: boolean }) => (
  <li className="flex items-center">
    {included ? (
      <Check className="h-4 w-4 text-primary mr-2 flex-shrink-0" />
    ) : (
      <div className="h-4 w-4 border border-gray-300 rounded-full mr-2 flex-shrink-0" />
    )}
    <span className="text-sm text-gray-600">{children}</span>
  </li>
);

export default PricingPlans;
