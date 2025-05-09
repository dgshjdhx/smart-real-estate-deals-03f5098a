
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import Pricing from "./pages/Pricing";
import Features from "./pages/Features";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Payment from "./pages/Payment";
import { SubscriptionTier, MAX_DEALS } from "./types";

const queryClient = new QueryClient();

// Auth requirement component
const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const location = useLocation();
  const isAuthenticated = localStorage.getItem('authenticated') === 'true';
  
  if (!isAuthenticated) {
    // Redirect to login with return path
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  
  return children;
};

// Subscription check component
const SubscriptionCheck = ({ children }: { children: JSX.Element }) => {
  const [dealCount, setDealCount] = useState(0);
  const [currentTier, setCurrentTier] = useState<SubscriptionTier>('Free');
  const location = useLocation();
  
  useEffect(() => {
    // Get current subscription tier from localStorage
    const tier = localStorage.getItem('subscriptionTier') as SubscriptionTier || 'Free';
    setCurrentTier(tier);
    
    // Get deal count (in a real app, this would be from API)
    // For demo, we'll use localStorage
    const deals = JSON.parse(localStorage.getItem('userDeals') || '[]');
    setDealCount(deals.length);
  }, [location]);
  
  // Check if user has reached deal limit
  if (dealCount >= MAX_DEALS[currentTier] && location.pathname === '/dashboard') {
    // Redirect to pricing page if deal limit reached
    return <Navigate to="/pricing" state={{ limitReached: true }} replace />;
  }
  
  return children;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dashboard" element={
            <RequireAuth>
              <SubscriptionCheck>
                <Dashboard />
              </SubscriptionCheck>
            </RequireAuth>
          } />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/payment" element={
            <RequireAuth>
              <Payment />
            </RequireAuth>
          } />
          <Route path="/features" element={<Features />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
