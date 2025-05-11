import { Link } from "react-router-dom";
import { Button } from "./ui/button";
const Hero = () => {
  return <div className="relative overflow-hidden bg-gradient-radial from-indigo-50 to-white">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="text-center md:text-left md:pr-8">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4 animate-fade-in">
              <span className="text-primary">Organize deals.</span> Clear mind. <span className="text-primary">More closings.</span>
            </h1>
            <p className="text-lg text-gray-600 mb-8 animate-fade-in" style={{
            animationDelay: '0.1s'
          }}>A super simple tracking board for real estate agents — not a heavy CRM. Start for free, experience the difference in 5 minutes.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start animate-fade-in" style={{
            animationDelay: '0.2s'
          }}>
              <Link to="/signup">
                <Button size="lg" className="w-full sm:w-auto">
                  Start Now - Free for 3 Deals
                </Button>
              </Link>
              <Link to="/pricing">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  Upgrade to Pro
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="hidden md:block relative">
            <div className="relative z-10 bg-white rounded-xl shadow-xl p-4 transform rotate-1 animate-fade-in" style={{
            animationDelay: '0.3s'
          }}>
              <div className="relative aspect-video rounded-lg overflow-hidden bg-gradient-to-r from-blue-50 to-indigo-50 p-4">
                <div className="flex h-full">
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
      </div>
    </div>;
};
export default Hero;