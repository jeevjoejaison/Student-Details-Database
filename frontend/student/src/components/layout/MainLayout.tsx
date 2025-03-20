import { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { LogOut, User } from "lucide-react";
import { PageTransition } from "../ui/PageTransition";

interface MainLayoutProps {
  children: ReactNode;
  title?: string;
  showBackButton?: boolean;
}

export const MainLayout = ({ 
  children, 
  title,
  showBackButton = false
}: MainLayoutProps) => {
  const { isAuthenticated, loading, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, loading, navigate]);

  const handleBackClick = () => {
    navigate(-1);
  };

  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-gradient-to-r from-purple-50 to-blue-50">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-12 w-12 rounded-full bg-purple-200 mb-4"></div>
          <div className="h-4 bg-purple-200 rounded w-36"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-50 to-blue-50 flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-10 backdrop-blur-md bg-white/80 border-b border-purple-200 px-6 py-3 shadow-sm">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
          <div className="flex items-center gap-4">
            {showBackButton && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleBackClick}
                className="hidden sm:flex text-purple-700 hover:bg-purple-100"
              >
                Back
              </Button>
            )}
            <h1 className="font-medium text-lg text-purple-900">
              {title || "Student Achievement Portal"}
            </h1>
          </div>
          
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={logout}
              className="text-red-600 hover:bg-red-50 hover:text-red-700"
            >
              <LogOut size={16} className="mr-2" />
              <span className="hidden sm:block">Logout</span>
            </Button>
          </div>
        </div>
      </header>
      
      {/* Main content */}
      <main className="flex-1 p-6">
        <div className="max-w-7xl mx-auto w-full">
          <PageTransition>
            {children}
          </PageTransition>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="border-t border-purple-200 py-4 px-6 bg-white/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto w-full text-center">
          <p className="text-sm text-purple-700">
            © {new Date().getFullYear()} Student Achievement Portal
          </p>
        </div>
      </footer>
    </div>
  );
};