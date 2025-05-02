
import { Clock, Kanban, Smartphone } from "lucide-react";

const FeaturesSection = () => {
  return (
    <div className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-2">Why Real Estate Agents Love DealTracker</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            The simplest way to stay on top of your deals without complicated software
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard
            icon={<Kanban size={24} />}
            title="Quick Status Tracking"
            description="Visualize your pipeline with our intuitive Kanban board. Drag deals between stages as they progress."
          />
          
          <FeatureCard
            icon={<Clock size={24} />}
            title="Built-in Reminders"
            description="Never miss a follow-up. Set reminders for each deal that appear on your dashboard when they're due."
          />
          
          <FeatureCard
            icon={<Smartphone size={24} />}
            title="Mobile Optimized"
            description="Access your deal pipeline from anywhere. Our responsive design works perfectly on all devices."
          />
        </div>
      </div>
    </div>
  );
};

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard = ({ icon, title, description }: FeatureCardProps) => {
  return (
    <div className="p-6 rounded-xl border border-gray-100 bg-white shadow-sm hover:shadow-md transition-shadow animate-fade-in">
      <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default FeaturesSection;
