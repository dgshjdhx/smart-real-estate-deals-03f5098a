
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Terms = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
          
          <div className="prose prose-gray max-w-none">
            <p className="mb-4">Last updated: May 1, 2025</p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">1. Acceptance of Terms</h2>
            <p className="mb-4">
              By accessing or using DealTracker, you agree to be bound by these Terms of Service. 
              If you do not agree to all the terms and conditions, you may not access or use the service.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">2. Description of Service</h2>
            <p className="mb-4">
              DealTracker provides a platform for real estate professionals to track and manage their deals. 
              The service includes features for organizing, tracking, and receiving reminders about real estate transactions.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">3. User Responsibilities</h2>
            <p className="mb-4">
              You are responsible for:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li className="mb-2">Maintaining the confidentiality of your account information</li>
              <li className="mb-2">All activities that occur under your account</li>
              <li className="mb-2">The accuracy and legality of the data you enter into the system</li>
              <li className="mb-2">Ensuring that your use of the service complies with applicable laws and regulations</li>
            </ul>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">4. Subscription and Billing</h2>
            <p className="mb-4">
              DealTracker offers different subscription tiers with varying features and limitations:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li className="mb-2">Free: Up to 3 open deals at any time</li>
              <li className="mb-2">Pro: Up to 30 open deals at any time</li>
              <li className="mb-2">Broker: Unlimited open deals</li>
            </ul>
            <p className="mb-4">
              Subscription payments are processed through PayPal. You may cancel your subscription at any time 
              through your account settings or by contacting support. No refunds will be issued for partial months.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">5. Limitation of Liability</h2>
            <p className="mb-4">
              DealTracker is not liable for:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li className="mb-2">Any missed deadlines or reminders</li>
              <li className="mb-2">Losses due to service disruptions</li>
              <li className="mb-2">Accuracy of information entered by users</li>
              <li className="mb-2">Any damages arising from use or inability to use the service</li>
            </ul>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">6. Service Termination</h2>
            <p className="mb-4">
              We reserve the right to terminate or suspend your account for any reason, including 
              violation of these Terms, at our sole discretion without notice.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">7. Changes to Terms</h2>
            <p className="mb-4">
              We may modify these Terms at any time. Continued use of DealTracker after changes 
              indicates your acceptance of the new terms.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">8. Contact Information</h2>
            <p className="mb-4">
              For questions about these Terms, please contact us at support@dealtracker.com.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Terms;
