
import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { useToast } from "../components/ui/use-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  
  // Get the redirect path from state or default to dashboard
  const from = location.state?.from?.pathname || "/dashboard";
  const tier = location.state?.tier;
  const price = location.state?.price;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate login API call
    setTimeout(() => {
      setIsLoading(false);
      
      // Store auth state in localStorage (for demo purposes only)
      localStorage.setItem('authenticated', 'true');
      
      toast({
        title: "Logged in successfully",
        description: "Welcome back to DealTracker!",
      });
      
      // Check if user was trying to subscribe before login
      const pendingSubscription = localStorage.getItem('pendingSubscription');
      
      // Navigate based on pending actions
      if (from === '/payment' && tier) {
        navigate('/payment', { state: { tier, price } });
      } else if (pendingSubscription) {
        localStorage.removeItem('pendingSubscription');
        navigate('/payment', { state: { tier: pendingSubscription, price: pendingSubscription === 'Pro' ? 10 : 0 } });
      } else {
        navigate(from);
      }
    }, 1500);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar hideButtons={true} />
      <main className="flex-grow flex items-center justify-center py-12">
        <div className="w-full max-w-md px-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold">Welcome Back</h1>
            <p className="text-gray-600 mt-2">Sign in to access your deal pipeline</p>
            {tier && (
              <p className="text-primary mt-2">
                Sign in to continue with your {tier} subscription
              </p>
            )}
          </div>
          
          <div className="bg-white p-8 shadow-md rounded-xl border border-gray-100">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="password">Password</Label>
                  <Link to="/forgot-password" className="text-xs text-primary hover:underline">
                    Forgot password?
                  </Link>
                </div>
                <Input 
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
            </form>
          </div>
          
          <div className="text-center mt-6">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <Link to="/signup" className="text-primary hover:underline">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Login;
