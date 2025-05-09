
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PricingPlans from "../components/PricingPlans";

const Pricing = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Simple, Transparent Pricing</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Choose the plan that's right for your real estate business. No hidden fees. 
              Cancel anytime.
            </p>
          </div>
        </div>
        <PricingPlans />
        
        <div className="bg-gray-50 py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl font-bold mb-6 text-center">Frequently Asked Questions</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">What happens if I exceed my deal limit?</h3>
                  <p className="text-gray-600">
                    Once you reach your plan's deal limit, you'll need to upgrade to add more open deals or close 
                    existing deals to free up space. You'll always maintain access to your existing deals.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2">Can I cancel my subscription anytime?</h3>
                  <p className="text-gray-600">
                    Yes, you can cancel your subscription at any time through your account settings. 
                    Your access will continue until the end of your current billing period.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2">How do payments work?</h3>
                  <p className="text-gray-600">
                    All payments are processed securely through PayPal. We don't store your payment information. 
                    You'll be billed monthly on the date you initially subscribed.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2">What's included in the Pro plan?</h3>
                  <p className="text-gray-600">
                    The Pro plan includes up to 30 open deals, closed deal archives, priority support, and advanced analytics.
                    The Free plan allows only up to 3 open deals with basic features.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Pricing;
