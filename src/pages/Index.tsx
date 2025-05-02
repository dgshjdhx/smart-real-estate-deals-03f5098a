
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import FeaturesSection from "../components/FeaturesSection";
import PricingPlans from "../components/PricingPlans";

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <FeaturesSection />
        <PricingPlans />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
