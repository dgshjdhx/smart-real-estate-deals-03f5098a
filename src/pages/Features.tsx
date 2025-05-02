
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FeaturesSection from "../components/FeaturesSection";
import { Kanban, Bell, Archive } from "lucide-react";

const Features = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <div className="bg-gradient-radial from-indigo-50 to-white py-16">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <h1 className="text-4xl font-bold mb-4">Features That Make a Difference</h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                DealTracker is designed specifically for real estate agents who want a simple, 
                effective way to track their deals without complex software.
              </p>
            </div>
          </div>
        </div>
        
        <FeaturesSection />
        
        <div className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              <div>
                <div className="inline-flex items-center mb-4 bg-primary/10 px-3 py-1 rounded-full">
                  <Kanban className="h-4 w-4 text-primary mr-2" />
                  <span className="text-sm font-medium text-primary">Deal Pipeline</span>
                </div>
                <h2 className="text-3xl font-bold mb-4">Visual Deal Tracking</h2>
                <p className="text-lg text-gray-600 mb-4">
                  Our intuitive Kanban board gives you an at-a-glance view of where every deal stands. 
                  Quickly identify bottlenecks and prioritize your follow-ups.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mr-2 flex-shrink-0">
                      <span className="text-green-600 text-xl">✓</span>
                    </div>
                    <span>Track deal progress through 9 customized stages</span>
                  </li>
                  <li className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mr-2 flex-shrink-0">
                      <span className="text-green-600 text-xl">✓</span>
                    </div>
                    <span>Visually distinguish deal stages with color coding</span>
                  </li>
                  <li className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mr-2 flex-shrink-0">
                      <span className="text-green-600 text-xl">✓</span>
                    </div>
                    <span>Get essential deal info at a glance</span>
                  </li>
                </ul>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                <div className="flex">
                  <div className="w-1/3 px-2">
                    <div className="text-sm font-medium mb-2">Lead</div>
                    <div className="deal-card">
                      <div className="status-tag status-lead mb-2">Lead</div>
                      <div className="text-sm font-medium">123 Main St</div>
                    </div>
                  </div>
                  <div className="w-1/3 px-2">
                    <div className="text-sm font-medium mb-2">Under Contract</div>
                    <div className="deal-card">
                      <div className="status-tag status-underContract mb-2">Under Contract</div>
                      <div className="text-sm font-medium">456 Oak Ave</div>
                    </div>
                  </div>
                  <div className="w-1/3 px-2">
                    <div className="text-sm font-medium mb-2">Closing</div>
                    <div className="deal-card">
                      <div className="status-tag status-closingScheduled mb-2">Closing Scheduled</div>
                      <div className="text-sm font-medium">789 Pine Rd</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              <div className="order-2 md:order-1 bg-white p-6 rounded-xl shadow-md border border-gray-100">
                <div className="p-4 bg-amber-50 text-amber-800 text-sm rounded-md mb-4">
                  <div className="font-medium mb-1">Today's Reminders</div>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <Bell className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Call John Smith about the Oak Avenue inspection</span>
                    </li>
                    <li className="flex items-start">
                      <Bell className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Follow up on loan approval for Pine Road property</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="order-1 md:order-2">
                <div className="inline-flex items-center mb-4 bg-primary/10 px-3 py-1 rounded-full">
                  <Bell className="h-4 w-4 text-primary mr-2" />
                  <span className="text-sm font-medium text-primary">Reminders</span>
                </div>
                <h2 className="text-3xl font-bold mb-4">Never Miss a Follow-Up</h2>
                <p className="text-lg text-gray-600 mb-4">
                  Attach custom reminders to any deal that appear on your dashboard when they're due. 
                  Stay on top of critical tasks without a separate task management system.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mr-2 flex-shrink-0">
                      <span className="text-green-600 text-xl">✓</span>
                    </div>
                    <span>Centralized view of all reminders</span>
                  </li>
                  <li className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mr-2 flex-shrink-0">
                      <span className="text-green-600 text-xl">✓</span>
                    </div>
                    <span>Visual indicators on deal cards</span>
                  </li>
                  <li className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mr-2 flex-shrink-0">
                      <span className="text-green-600 text-xl">✓</span>
                    </div>
                    <span>Customize reminders for each deal</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        <div className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              <div>
                <div className="inline-flex items-center mb-4 bg-primary/10 px-3 py-1 rounded-full">
                  <Archive className="h-4 w-4 text-primary mr-2" />
                  <span className="text-sm font-medium text-primary">Deal Archive</span>
                </div>
                <h2 className="text-3xl font-bold mb-4">Access Your Deal History</h2>
                <p className="text-lg text-gray-600 mb-4">
                  All closed deals are automatically moved to your archive, where you can reference them 
                  anytime. Search and filter by property, client, or date.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mr-2 flex-shrink-0">
                      <span className="text-green-600 text-xl">✓</span>
                    </div>
                    <span>Comprehensive deal history at your fingertips</span>
                  </li>
                  <li className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mr-2 flex-shrink-0">
                      <span className="text-green-600 text-xl">✓</span>
                    </div>
                    <span>Advanced search and filtering capabilities</span>
                  </li>
                  <li className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mr-2 flex-shrink-0">
                      <span className="text-green-600 text-xl">✓</span>
                    </div>
                    <span>Keep your active pipeline clean and focused</span>
                  </li>
                </ul>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                <div className="text-center mb-4">
                  <div className="inline-flex items-center">
                    <Archive className="h-4 w-4 text-gray-500 mr-2" />
                    <span className="font-medium">Closed Deals Archive</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="p-3 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="text-sm text-gray-500">April 15, 2025</div>
                    <div className="font-medium">123 Main St</div>
                    <div className="text-sm">Client: John Smith</div>
                  </div>
                  <div className="p-3 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="text-sm text-gray-500">March 27, 2025</div>
                    <div className="font-medium">456 Oak Ave</div>
                    <div className="text-sm">Client: Emma Johnson</div>
                  </div>
                  <div className="p-3 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="text-sm text-gray-500">February 12, 2025</div>
                    <div className="font-medium">789 Pine Rd</div>
                    <div className="text-sm">Client: Michael Williams</div>
                  </div>
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

export default Features;
