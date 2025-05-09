
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { Header } from "@/components/layout/Header";
import { PageTransition } from "@/components/ui/PageTransition";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/auth/Login";
import NotFound from "./pages/NotFound";

// Faculty pages
import FacultyDashboard from "./pages/faculty/Dashboard";
import FacultyStudents from "./pages/faculty/Students";
import FacultyRequests from "./pages/faculty/Requests";
import FacultyVerified from "./pages/faculty/Verified";


// Import framer-motion
import { LazyMotion, domAnimation } from "framer-motion";

const queryClient = new QueryClient();

interface ProtectedRouteProps {
  element: React.ReactNode;
  allowedRoles?: Array<"student" | "faculty" | "admin">;
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <LazyMotion features={domAnimation}>
        <AuthProvider>
          <BrowserRouter>
            <Header />
            <PageTransition>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/login" element={<Login />} />
                
                
                {/* Faculty routes */}
                <Route
                  path="/faculty"
                  element={
                    <ProtectedRoute
                      element={<FacultyDashboard />}
                      allowedRoles={["faculty"]}
                    />
                  }
                />
                <Route
                  path="/faculty/students"
                  element={
                    <ProtectedRoute
                      element={<FacultyStudents />}
                      allowedRoles={["faculty"]}
                    />
                  }
                />
                <Route
                  path="/faculty/requests"
                  element={
                    <ProtectedRoute
                      element={<FacultyRequests />}
                      allowedRoles={["faculty"]}
                    />
                  }
                />
                <Route
                  path="/faculty/verified"
                  element={
                    <ProtectedRoute
                      element={<FacultyVerified />}
                      allowedRoles={["faculty"]}
                    />
                  }
                />
                
                
                {/* Catch-all route */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </PageTransition>
            <Toaster />
            <Sonner />
          </BrowserRouter>
        </AuthProvider>
      </LazyMotion>
    </TooltipProvider>
  </QueryClientProvider>
);

// Protected route component that checks authentication and role
function ProtectedRoute({ element, allowedRoles = [] }: ProtectedRouteProps) {
  // We can't use useAuth hook directly here because it's outside of the AuthProvider context
  const userIdExists = localStorage.getItem("userId") !== null;
  
  if (!userIdExists) {
    return <Navigate to="/login" replace />;
  }
  
  // For simplicity, we'll do a basic role check based on userId
  // In a real app, you would check the actual user role from context
  const userId = localStorage.getItem("userId") || "";
  const userRole = userId.split("-")[0]; // Extract role from ID format (e.g., "student-123")
  
  if (allowedRoles.length > 0 && !allowedRoles.includes(userRole as any)) {
    // Redirect to appropriate dashboard based on role
    if (userRole === "faculty") {
      return <Navigate to="/faculty" replace />;
    } else if (userRole === "admin") {
      return <Navigate to="/admin" replace />;
    } else {
      return <Navigate to="/" replace />;
    }
  }
  
  return <>{element}</>;
}

export default App;
