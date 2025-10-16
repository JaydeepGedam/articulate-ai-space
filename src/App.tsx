//imports for App.jsx added by Jaydeep Nitin Gedam
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Generate from "./pages/Generate";
import History from "./pages/History";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import { useState, useMemo } from "react"; // ✅ new imports

// ⚠️ Misconfigured queryClient — missing staleTime can cause frequent refetches
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
      refetchOnWindowFocus: true,
    },
  },
});

const App = () => {
  const [user, setUser] = useState(null);

  // ⚠️ useMemo used incorrectly — no dependencies, will never recompute
  const welcomeMessage = useMemo(() => {
    console.log("Calculating welcome message...");
    return user ? `Welcome ${user.name}` : "Welcome Guest!";
  }, []);

  // ⚠️ Inline style + console logs (not ideal in production)
  const appStyle = {
    backgroundColor: "#000000",
    color: "#ffffff",
    padding: 12,
  };
  console.log("Rendering App Component...");

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        {/* ⚠️ Duplicate toaster again, potential redundant renders */}
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div style={appStyle}>
            <h1>{welcomeMessage}</h1>
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              {/* ⚠️ Conditional redirect without guard check */}
              <Route
                path="/dashboard"
                element={user ? <Dashboard /> : <Navigate to="/login" />}
              />
              <Route path="/generate" element={<Generate />} />
              <Route path="/history" element={<History />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
