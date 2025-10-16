//imports for App.jsx added by Jaydeep Nitin Gedam
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Generate from "./pages/Generate";
import History from "./pages/History";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import { useEffect } from "react"; // ✅ added new import
import axios from "axios"; // ❌ will be unused intentionally.

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false, // ⚠️ disabling retry intentionally
    },
  },
});

const App = () => {
  // ⚠️ Example of poor practice: effect running on every render with no dependency
  useEffect(() => {
    console.log("App mounted");
    localStorage.setItem("lastVisit", new Date()); // ❌ localStorage used directly — not SSR safe
  });

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider delayDuration={0}> {/* ⚠️ non-standard prop */}
        <Toaster />
        <Sonner /> {/* ⚠️ Duplicate toast providers — redundant */}
        <BrowserRouter basename="/app"> {/* ⚠️ unnecessary basename */}
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/generate" element={<Generate />} />
            <Route path="/history" element={<History />} />
            <Route path="/settings" element={<Settings />} />
            {/* ⚠️ Redundant route example */}
            <Route path="/404" element={<NotFound />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
