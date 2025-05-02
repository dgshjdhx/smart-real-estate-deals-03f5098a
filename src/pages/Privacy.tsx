
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
              DealTracker collects the following information:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li className="mb-2">Account information (name, email, etc.)</li>
              <li className="mb-2">Deal information that you enter into the system</li>
              <li className="mb-2">Usage data about how you interact with our service</li>
              <li className="mb-2">Payment information (processed securely by PayPal)</li>
            </ul>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">2. How We Use Your Information</h2>
            <p className="mb-4">
              We use your information to:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li className="mb-2">Provide and maintain our service</li>
              <li className="mb-2">Process payments and manage your subscription</li>
              <li className="mb-2">Improve and personalize your experience</li>
              <li className="mb-2">Communicate with you about service updates or changes</li>
              <li className="mb-2">Respond to your inquiries and provide customer support</li>
            </ul>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">3. Data Security</h2>
            <p className="mb-4">
              We implement appropriate security measures to protect your personal information from unauthorized access, 
              alteration, disclosure, or destruction. However, no method of transmission over the Internet or electronic 
              storage is 100% secure, and we cannot guarantee absolute security.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">4. Data Sharing</h2>
            <p className="mb-4">
              DealTracker respects your privacy:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li className="mb-2">We do not sell your data to third parties</li>
              <li className="mb-2">We only share your information with service providers who need it to provide functionality (e.g., payment processing)</li>
              <li className="mb-2">We may disclose information if required by law or to protect our rights</li>
            </ul>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">5. Your Rights</h2>
            <p className="mb-4">
              You have the right to:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li className="mb-2">Access your personal data</li>
              <li className="mb-2">Correct inaccurate data</li>
              <li className="mb-2">Request deletion of your data</li>
              <li className="mb-2">Object to our processing of your data</li>
              <li className="mb-2">Export your data in a portable format</li>
            </ul>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">6. Cookies and Tracking</h2>
            <p className="mb-4">
              We use cookies and similar technologies to track activity on our service and hold certain information. 
              You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">7. Children's Privacy</h2>
            <p className="mb-4">
              Our service is not intended for children under 18 years of age. We do not knowingly collect personal 
              information from children under 18.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">8. Changes to Privacy Policy</h2>
            <p className="mb-4">
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new 
              Privacy Policy on this page and updating the "Last updated" date.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">9. Contact Information</h2>
            <p className="mb-4">
              For questions about this Privacy Policy, please contact us at privacy@dealtracker.com.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Privacy;
