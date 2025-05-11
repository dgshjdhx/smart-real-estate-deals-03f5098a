
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Privacy = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
          
          <div className="prose prose-gray max-w-none">
            <p className="mb-4">Last updated: May 1, 2025</p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">1. Information We Collect</h2>
            <p className="mb-4">
              We collect the following data when you use DealTracker:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li className="mb-2">Account details (name, email, password hash)</li>
              <li className="mb-2">Deal-related information you submit</li>
              <li className="mb-2">Usage data (logins, clicks, time on site)</li>
              <li className="mb-2">Payment data (processed securely via PayPal)</li>
            </ul>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">2. How We Use Your Information</h2>
            <p className="mb-4">
              We use your information to:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li className="mb-2">Provide and operate the Service</li>
              <li className="mb-2">Process payments and manage subscriptions</li>
              <li className="mb-2">Contact you with important service updates</li>
              <li className="mb-2">Improve and personalize user experience</li>
              <li className="mb-2">Respond to inquiries and support requests</li>
            </ul>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">3. Data Security</h2>
            <p className="mb-4">
              We implement appropriate security measures. However, no online system is 100% secure, 
              and we cannot guarantee absolute protection. Use is at your own risk.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">4. Data Sharing</h2>
            <p className="mb-4">
              We do not sell your data. We only share it with trusted service providers (e.g., hosting, 
              payment processors) for the sole purpose of operating DealTracker. We may also disclose 
              information if legally required.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">5. Your Rights</h2>
            <p className="mb-4">
              You have the right to:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li className="mb-2">Access your data</li>
              <li className="mb-2">Request corrections</li>
              <li className="mb-2">Request deletion</li>
              <li className="mb-2">Export your data in a portable format</li>
              <li className="mb-2">Object to our processing (within legal limits)</li>
            </ul>
            <p className="mb-4">
              For data requests: fitai2468@gmail.com
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">6. Cookies & Tracking</h2>
            <p className="mb-4">
              We use cookies and similar technologies to improve functionality and gather usage insights. 
              You can control cookies via your browser settings.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">7. Children's Privacy</h2>
            <p className="mb-4">
              The Service is not intended for use by individuals under the age of 18. We do not knowingly 
              collect personal information from minors.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">8. Data Retention</h2>
            <p className="mb-4">
              We retain your data as long as your account is active. Upon cancellation, your data may be 
              deleted or archived, at our discretion, after a reasonable period.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">9. Changes to Privacy Policy</h2>
            <p className="mb-4">
              We may update this Privacy Policy from time to time. Continued use of the Service means you 
              accept the updated terms.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">Contact Information</h2>
            <p className="mb-4">
              For any questions regarding this Privacy Policy, please contact us at:
              fitai2468@gmail.com
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Privacy;
