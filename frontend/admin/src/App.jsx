import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";

import Index from "./pages/Index";
import CreateStudent from "./pages/CreateStudent";
import CreateFaculty from "./pages/CreateFaculty";
import ManageStudents from "./pages/ManageStudents";
import ManageFaculty from "./pages/ManageFaculty";
import ManageDropdowns from "./pages/ManageDropdowns";
import NotFound from "./pages/NotFound";
import { AuthProvider, useAuth } from "./context/AuthContext";
import AdminLogin from "./pages/AdminLogin";

const queryClient = new QueryClient();

// Protected Route component
const ProtectedRoute = () => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

// Auth Route component (for login page)
const AuthRoute = () => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Navigate to="/" replace /> : <Outlet />;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            {/* Public routes */}
            <Route element={<AuthRoute />}>
              <Route path="/login" element={<AdminLogin />} />
            </Route>

            {/* Protected routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/" element={<Index />} />
              <Route path="/create-student" element={<CreateStudent />} />
              <Route path="/create-faculty" element={<CreateFaculty />} />
              <Route path="/manage-students" element={<ManageStudents />} />
              <Route path="/manage-faculty" element={<ManageFaculty />} />
              <Route path="/manage-dropdowns" element={<ManageDropdowns />} />
            </Route>

            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;