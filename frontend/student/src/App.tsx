
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import CulturalEventPage from "./pages/forms/CulturalEventPage";
import TechnicalEventPage from "./pages/forms/TechnicalEventPage";
import SportsEventPage from "./pages/forms/SportsEventPage";
import InternshipPage from "./pages/forms/InternshipPage";
import NotFound from "./pages/NotFound";
import { AuthProvider } from "./context/AuthContext";
import ResearchPaperPage from "./pages/forms/ResearchPaperPage";
import PlacementPage from "./pages/forms/PlacementPage";
import SocietyPage from "./pages/forms/SocietyPAge";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/cultural-events" element={<CulturalEventPage />} />
            <Route path="/technical-events" element={<TechnicalEventPage />} />
            <Route path="/sports-events" element={<SportsEventPage />} />
            <Route path="/internships" element={<InternshipPage />} />
            <Route path="/research-papers" element={<ResearchPaperPage/>}/>
            <Route path="/placements" element={<PlacementPage/>}/>
            <Route path="/society" element={<SocietyPage/>}/>
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
