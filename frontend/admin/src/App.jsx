import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Index from "./pages/Index";
import CreateStudent from "./pages/CreateStudent";
import CreateFaculty from "./pages/CreateFaculty";
import ManageStudents from "./pages/ManageStudents";
import ManageFaculty from "./pages/ManageFaculty";
import ManageDropdowns from "./pages/ManageDropdowns";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Index />} />
          <Route path="/create-student" element={<CreateStudent />} />
          <Route path="/create-faculty" element={<CreateFaculty />} />
          <Route path="/manage-students" element={<ManageStudents />} />
          <Route path="/manage-faculty" element={<ManageFaculty />} />
          <Route path="/manage-dropdowns" element={<ManageDropdowns />} />

          {/* Catch-all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
