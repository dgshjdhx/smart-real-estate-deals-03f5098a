
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Terms = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">DealTracker – Terms of Service</h1>
          
          <div className="prose prose-gray max-w-none">
            <p className="mb-4">Last updated: May 1, 2025</p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">1. Acceptance of Terms</h2>
            <p className="mb-4">
              By accessing or using DealTracker ("the Service"), you confirm that you have read, understood, 
              and agree to be legally bound by these Terms of Service. If you do not agree to all terms, 
              you are not authorized to use the Service.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">2. Description of Service</h2>
            <p className="mb-4">
              DealTracker provides a platform for real estate professionals to manage, track, and organize real 
              estate deals. The Service includes features for deal tracking, reminders, and analytics.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">3. Use at Your Own Risk – No Warranty</h2>
            <p className="mb-4">
              The Service is provided "as is" and "as available" without warranties of any kind, express or implied. 
              We do not guarantee the accuracy, reliability, or availability of the Service.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">4. Waiver of Liability</h2>
            <p className="mb-4">
              To the fullest extent permitted by law, you irrevocably waive any and all claims against DealTracker, 
              its owners, team, affiliates, or vendors for any damages – direct, indirect, incidental, consequential, 
              punitive, or special – arising out of or in any way related to your use or inability to use the Service.
            </p>
            <p className="mb-4">
              This includes, without limitation:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li className="mb-2">Missed deadlines or reminders</li>
              <li className="mb-2">Incorrect or lost data</li>
              <li className="mb-2">Downtime or disruptions</li>
              <li className="mb-2">Third-party service failures (e.g., PayPal, cloud hosting)</li>
            </ul>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">5. User Responsibility</h2>
            <p className="mb-4">
              You are solely responsible for:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li className="mb-2">The accuracy and legality of the data you submit</li>
              <li className="mb-2">Maintaining the confidentiality of your account</li>
              <li className="mb-2">Compliance with all applicable laws and regulations</li>
              <li className="mb-2">Backup of your own data</li>
            </ul>
            <p className="mb-4">
              You agree not to use the Service for illegal purposes.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">6. Subscription & Payment</h2>
            <p className="mb-4">
              DealTracker offers two subscription tiers:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li className="mb-2">Free: Up to 3 open deals at any time</li>
              <li className="mb-2">Pro: Unlimited open deals</li>
            </ul>
            <p className="mb-4">
              Payments are processed securely via PayPal. Subscriptions renew automatically on a monthly basis 
              unless canceled. You may cancel your subscription at any time via your account settings. 
              No refunds will be issued for partial billing periods.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">7. Termination</h2>
            <p className="mb-4">
              We reserve the right to suspend or terminate your account at any time, without notice, 
              for any reason, including violation of these Terms.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">8. Binding Arbitration and Jurisdiction</h2>
            <p className="mb-4">
              All disputes shall be resolved exclusively by binding arbitration in Tel Aviv, Israel, 
              under Israeli law. You waive your right to a jury trial and to participate in any class action.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">9. Changes to Terms</h2>
            <p className="mb-4">
              We reserve the right to modify these Terms at any time. Continued use of the Service after 
              changes constitutes acceptance of the new terms.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">Contact Information</h2>
            <p className="mb-4">
              For any questions regarding these Terms of Service, please contact us at:
              fitai2468@gmail.com
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Terms;
